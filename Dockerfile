FROM node:20-bookworm-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/contact-api/package.json apps/contact-api/package.json
RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*
RUN npm ci

COPY . .

ARG VITE_CONTACT_API_URL
ARG VITE_GA4_MEASUREMENT_ID
ARG VITE_GITHUB_URL
ARG VITE_LINKEDIN_URL
ENV VITE_CONTACT_API_URL=$VITE_CONTACT_API_URL
ENV VITE_GA4_MEASUREMENT_ID=$VITE_GA4_MEASUREMENT_ID
ENV VITE_GITHUB_URL=$VITE_GITHUB_URL
ENV VITE_LINKEDIN_URL=$VITE_LINKEDIN_URL
RUN npm run build

FROM nginx:1.27-alpine AS runtime

COPY infra/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080
