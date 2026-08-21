FROM node:20-bookworm-slim

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/contact-api/package.json apps/contact-api/package.json
RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*
RUN npm ci --include=dev

COPY apps/contact-api apps/contact-api
RUN mkdir /data && chown node:node /data

ENV NODE_ENV=production
ENV CONTACT_API_PORT=3001
ENV CONTACT_DATABASE_PATH=/data/contact.sqlite

USER node
EXPOSE 3001

CMD ["npm", "run", "start", "--workspace=@ivan-hubko/contact-api"]
