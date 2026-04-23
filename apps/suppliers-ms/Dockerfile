# Imagen del monorepo: contexto = raíz del repo (ver docker-compose).
# Webpack externaliza dependencias de Node; el runtime necesita node_modules de producción.

FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
COPY nest-cli.json tsconfig.json ./
COPY apps ./apps
COPY libs ./libs
COPY database ./database

RUN npm ci \
  && npx nest build suppliers-ms --builder webpack \
  && npm prune --omit=dev

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/dist/apps/suppliers-ms/main.js ./main.js

USER node
EXPOSE 8081

CMD ["node", "main.js"]
