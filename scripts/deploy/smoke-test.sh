#!/usr/bin/env bash
set -Eeuo pipefail

BASE_URL="${SITE_SMOKE_URL:-}"
if [[ -z "$BASE_URL" ]]; then
  SITE_HOST="${SITE_HOST:-}"
  [[ -n "$SITE_HOST" ]] || { echo "ERROR: set SITE_SMOKE_URL or SITE_HOST" >&2; exit 1; }
  BASE_URL="https://${SITE_HOST}"
fi

check_url() {
  local path="$1"
  local url="${BASE_URL%/}${path}"
  local status
  status="$(curl --silent --show-error --location --max-time 20 --output /dev/null --write-out '%{http_code}' "$url" || true)"
  if [[ "$status" -lt 200 || "$status" -ge 400 ]]; then
    echo "ERROR: $url returned HTTP $status" >&2
    return 1
  fi
  echo "OK: $url ($status)"
}

check_url '/'
check_url '/cv'
check_url '/robots.txt'
check_url '/sitemap.xml'
