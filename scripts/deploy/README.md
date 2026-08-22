# Production deployment helpers

The GitHub CD workflow does not upload or replace the production Compose file.
Prepare the server directory once; it contains only the stable application
compose and the server-owned environment file:

```text
$DEPLOY_PATH/docker-compose.prod.yml
$DEPLOY_PATH/.env
```

The production `.env` is never committed or uploaded by GitHub. The workflow
connects over SSH, supplies immutable image references for the selected services,
then runs `docker compose pull` and `docker compose up -d` against that server
compose.

Selective releases use `docker compose up -d --no-deps` for only the selected
service. The workflow stores previous image references in a small server-side
`.deploy-state` file so a failed release can be rolled back. The frontend and
contact API Docker images both expose a container health check; public HTTP
checks run in GitHub Actions after deployment.

Required GitHub secrets:

- `DEPLOY_HOST`, `DEPLOY_PORT` (optional), `DEPLOY_USER`, `DEPLOY_PATH`;
- `DEPLOY_SSH_PRIVATE_KEY`;
- `GHCR_READ_TOKEN` when the GHCR packages are private; optionally
  `GHCR_USERNAME` when the token belongs to a different account than the
  repository owner;
- `VITE_CONTACT_API_URL`, `VITE_SITE_URL`, `VITE_GA4_MEASUREMENT_ID`,
  `VITE_GITHUB_URL` and `VITE_LINKEDIN_URL` as applicable to the public build.

When needed, the GitHub-hosted CD job passes the GHCR read token to the remote
Docker command over SSH only for the pull and rollback operation. It uses a
temporary Docker config and removes it when the command exits; the token is not
stored in the server `.env` or passed into either application container. Public
images require no GHCR read token.

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
