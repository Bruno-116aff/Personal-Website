#!/usr/bin/env sh
set -eu

SCRIPT_DIRECTORY=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
DATA_DIRECTORY=${CONTACT_DATA_DIRECTORY:-"$SCRIPT_DIRECTORY/data/prod/contact-api"}

mkdir -p "$DATA_DIRECTORY"
chown 1000:1000 "$DATA_DIRECTORY"
chmod 770 "$DATA_DIRECTORY"

printf 'Prepared %s for container user node (1000:1000)\n' "$DATA_DIRECTORY"
