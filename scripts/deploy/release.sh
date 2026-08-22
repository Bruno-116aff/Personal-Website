#!/usr/bin/env bash
set -Eeuo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
ENV_FILE="${DEPLOY_ENV_FILE:-$ROOT_DIR/.env}"
COMPOSE_FILE="${COMPOSE_FILE:-$ROOT_DIR/infra/docker-compose.prod.yml}"
STATE_FILE="${DEPLOY_STATE_FILE:-$ROOT_DIR/.deploy-state}"
GHCR_TOKEN_FILE="${GHCR_TOKEN_FILE:-$ROOT_DIR/.ghcr-token.ci}"

FRONTEND_IMAGE="${FRONTEND_IMAGE:-}"
CONTACT_API_IMAGE="${CONTACT_API_IMAGE:-}"
DEPLOY_FRONTEND="${DEPLOY_FRONTEND:-false}"
DEPLOY_CONTACT_API="${DEPLOY_CONTACT_API:-false}"
FIRST_LAUNCH="${FIRST_LAUNCH:-false}"
GHCR_USERNAME="${GHCR_USERNAME:-}"

cleanup() {
  rm -f -- "$ROOT_DIR/.release.env.ci" "$GHCR_TOKEN_FILE"
}
trap cleanup EXIT

fail() {
  echo "ERROR: $*" >&2
  exit 1
}

if [[ "$FIRST_LAUNCH" == "true" ]]; then
  DEPLOY_FRONTEND=true
  DEPLOY_CONTACT_API=true
fi

if [[ "$DEPLOY_FRONTEND" != "true" && "$DEPLOY_CONTACT_API" != "true" ]]; then
  echo "Nothing to deploy. Set DEPLOY_FRONTEND and/or DEPLOY_CONTACT_API to true."
  exit 0
fi

[[ -f "$ENV_FILE" ]] || fail "production environment file is missing: $ENV_FILE"
[[ -f "$COMPOSE_FILE" ]] || fail "production Compose file is missing: $COMPOSE_FILE"

if [[ "$FIRST_LAUNCH" == "true" ]]; then
  [[ -n "$FRONTEND_IMAGE" ]] || fail "FIRST_LAUNCH requires FRONTEND_IMAGE"
  [[ -n "$CONTACT_API_IMAGE" ]] || fail "FIRST_LAUNCH requires CONTACT_API_IMAGE"
fi

if [[ -f "$GHCR_TOKEN_FILE" ]]; then
  [[ -n "$GHCR_USERNAME" ]] || fail "GHCR_USERNAME is required when GHCR_TOKEN_FILE is provided"
  docker login ghcr.io --username "$GHCR_USERNAME" --password-stdin < "$GHCR_TOKEN_FILE"
fi

cd "$ROOT_DIR"

prepare_data_directory() {
  local script="$ROOT_DIR/infra/prepare-prod-data.sh"
  [[ -f "$script" ]] || fail "data preparation script is missing: $script"
  if [[ "$(id -u)" -eq 0 ]]; then
    sh "$script"
  elif command -v sudo >/dev/null 2>&1; then
    sudo sh "$script"
  else
    fail "preparing SQLite storage requires root or sudo"
  fi
}

compose() {
  docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" "$@"
}

current_image() {
  local service="$1"
  local container
  container="$(compose ps -q "$service" 2>/dev/null || true)"
  if [[ -n "$container" ]]; then
    docker inspect --format '{{.Config.Image}}' "$container" 2>/dev/null || true
  fi
}

wait_healthy() {
  local service="$1"
  local container=""
  local status=""
  for _ in {1..30}; do
    container="$(compose ps -q "$service" 2>/dev/null || true)"
    if [[ -n "$container" ]]; then
      status="$(docker inspect --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' "$container" 2>/dev/null || true)"
      if [[ "$status" == "healthy" || "$status" == "running" ]]; then
        echo "$service is $status"
        return 0
      fi
      if [[ "$status" == "unhealthy" || "$status" == "exited" || "$status" == "dead" ]]; then
        docker logs --tail 100 "$container" >&2 || true
        fail "$service did not become healthy"
      fi
    fi
    sleep 2
  done
  fail "$service did not become healthy within 60 seconds"
}

prepare_data_directory

PREVIOUS_FRONTEND="$(current_image frontend)"
PREVIOUS_CONTACT_API="$(current_image contact-api)"
{
  printf 'PREVIOUS_FRONTEND=%q\n' "$PREVIOUS_FRONTEND"
  printf 'PREVIOUS_CONTACT_API=%q\n' "$PREVIOUS_CONTACT_API"
  printf 'DEPLOYED_FRONTEND=%q\n' "$DEPLOY_FRONTEND"
  printf 'DEPLOYED_CONTACT_API=%q\n' "$DEPLOY_CONTACT_API"
} > "$STATE_FILE"
chmod 600 "$STATE_FILE"

if [[ -n "$FRONTEND_IMAGE" ]]; then export FRONTEND_IMAGE; fi
if [[ -n "$CONTACT_API_IMAGE" ]]; then export CONTACT_API_IMAGE; fi

compose config >/dev/null

SERVICES=()
if [[ "$DEPLOY_FRONTEND" == "true" ]]; then SERVICES+=(frontend); fi
if [[ "$DEPLOY_CONTACT_API" == "true" ]]; then SERVICES+=(contact-api); fi

compose pull "${SERVICES[@]}"
compose up -d --no-deps --force-recreate "${SERVICES[@]}"
for service in "${SERVICES[@]}"; do
  wait_healthy "$service"
done

echo "Release completed for: ${SERVICES[*]}"
