#!/usr/bin/env bash
set -Eeuo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
ENV_FILE="${DEPLOY_ENV_FILE:-$ROOT_DIR/.env}"
COMPOSE_FILE="${COMPOSE_FILE:-$ROOT_DIR/infra/docker-compose.prod.yml}"
STATE_FILE="${DEPLOY_STATE_FILE:-$ROOT_DIR/.deploy-state}"

[[ -f "$ENV_FILE" ]] || { echo "ERROR: production environment file is missing: $ENV_FILE" >&2; exit 1; }
[[ -f "$STATE_FILE" ]] || { echo "No previous deployment state exists; rollback is not available."; exit 0; }

# The state file is generated locally from Docker image names and is not a user input.
# shellcheck disable=SC1090
source "$STATE_FILE"

compose() {
  docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" "$@"
}

SERVICES=()
if [[ "${DEPLOYED_FRONTEND:-false}" == "true" && -n "${PREVIOUS_FRONTEND:-}" ]]; then
  export FRONTEND_IMAGE="$PREVIOUS_FRONTEND"
  SERVICES+=(frontend)
fi
if [[ "${DEPLOYED_CONTACT_API:-false}" == "true" && -n "${PREVIOUS_CONTACT_API:-}" ]]; then
  export CONTACT_API_IMAGE="$PREVIOUS_CONTACT_API"
  SERVICES+=(contact-api)
fi

if [[ "${#SERVICES[@]}" -eq 0 ]]; then
  echo "No previous image is available for rollback."
  exit 0
fi

compose config >/dev/null
compose pull "${SERVICES[@]}"
compose up -d --no-deps --force-recreate "${SERVICES[@]}"

echo "Rollback completed for: ${SERVICES[*]}"
