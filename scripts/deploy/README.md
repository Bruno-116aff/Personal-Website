# Production deployment helpers

The GitHub CD workflow uploads the production Compose file, the SQLite data
preparation script and these helpers to the server directory held in the
`DEPLOY_PATH` secret. The production `.env` is never committed and must already
exist on the VPS at `$DEPLOY_PATH/.env`; the workflow never uploads or
overwrites this file.

`release.sh` accepts these environment variables:

- `FRONTEND_IMAGE` and `CONTACT_API_IMAGE` — immutable GHCR image references;
- `DEPLOY_FRONTEND` and `DEPLOY_CONTACT_API` — `true` for services to update;
- `FIRST_LAUNCH=true` — requires both images, prepares SQLite storage and starts
  both services;
- `GHCR_USERNAME` and `GHCR_TOKEN_FILE` — optional private-GHCR pull credentials;
- `DEPLOY_ENV_FILE`, `COMPOSE_FILE` and `DEPLOY_STATE_FILE` — optional paths.

Selective releases use `docker compose up -d --no-deps` for only the selected
service. The previous image references are stored in `.deploy-state` so
`rollback.sh` can restore the services changed by the latest release. The
frontend and contact API Docker images both expose a container health check;
public HTTP checks are run separately by `smoke-test.sh`.

Required GitHub secrets:

- `DEPLOY_HOST`, `DEPLOY_PORT` (optional), `DEPLOY_USER`, `DEPLOY_PATH`;
- `DEPLOY_SSH_PRIVATE_KEY`;
- `GHCR_READ_TOKEN` if the GHCR packages are private;
- `VITE_CONTACT_API_URL`, `VITE_SITE_URL`, `VITE_GA4_MEASUREMENT_ID`,
  `VITE_GITHUB_URL` and `VITE_LINKEDIN_URL` as applicable to the public build.

The server must have Docker Engine, the Compose plugin, the external Traefik
network and a user permitted to run Docker. DNS and Cloudflare/TLS certificate
configuration remain VPS-owned infrastructure inputs; this application compose
only supplies routing labels to the existing Traefik instance.

Add these labels to the existing `traefik` service in the server-owned Traefik
compose. They redirect every host except `ivan.hubko.me` to the canonical site;
the application compose remains responsible for the primary host and `/api`.

```yaml
    labels:
      - "traefik.enable=true"
      - "traefik.docker.network=traffic_net"
      - "traefik.http.middlewares.hubko-catchall-redirect.redirectregex.regex=^https?://[^/]+(?:/.*)?$"
      - "traefik.http.middlewares.hubko-catchall-redirect.redirectregex.replacement=https://ivan.hubko.me/"
      - "traefik.http.middlewares.hubko-catchall-redirect.redirectregex.permanent=true"
      - "traefik.http.routers.hubko-catchall-http.rule=(Host(`hubko.me`) || HostRegexp(`^.+[.]hubko[.]me$`)) && !Host(`ivan.hubko.me`)"
      - "traefik.http.routers.hubko-catchall-http.entrypoints=web"
      - "traefik.http.routers.hubko-catchall-http.priority=1"
      - "traefik.http.routers.hubko-catchall-http.middlewares=hubko-catchall-redirect"
      - "traefik.http.routers.hubko-catchall-http.service=noop@internal"
      - "traefik.http.routers.hubko-catchall-https.rule=(Host(`hubko.me`) || HostRegexp(`^.+[.]hubko[.]me$`)) && !Host(`ivan.hubko.me`)"
      - "traefik.http.routers.hubko-catchall-https.entrypoints=websecure"
      - "traefik.http.routers.hubko-catchall-https.priority=1"
      - "traefik.http.routers.hubko-catchall-https.tls=true"
      - "traefik.http.routers.hubko-catchall-https.middlewares=hubko-catchall-redirect"
      - "traefik.http.routers.hubko-catchall-https.service=noop@internal"
```

Cloudflare must have DNS records that send the requested hostnames to this VPS;
otherwise Traefik cannot receive an unknown subdomain request. HTTPS for the
catch-all hosts also requires a Cloudflare/origin certificate covering those
hostnames.
