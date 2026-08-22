FROM node:20-bookworm-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG VITE_CONTACT_API_URL
ARG VITE_SITE_URL
ARG VITE_GA4_MEASUREMENT_ID
ARG VITE_GITHUB_URL
ARG VITE_LINKEDIN_URL
ENV VITE_CONTACT_API_URL=$VITE_CONTACT_API_URL
ENV VITE_SITE_URL=$VITE_SITE_URL
ENV VITE_GA4_MEASUREMENT_ID=$VITE_GA4_MEASUREMENT_ID
ENV VITE_GITHUB_URL=$VITE_GITHUB_URL
ENV VITE_LINKEDIN_URL=$VITE_LINKEDIN_URL
RUN npm run build

FROM nginx:1.27-alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 CMD ["wget", "-q", "-O", "/dev/null", "http://127.0.0.1:8080/"]
