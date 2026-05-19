FROM node:20-alpine AS builder
WORKDIR /build

COPY next-app/package.json next-app/package-lock.json ./
RUN npm ci

COPY next-app/tsconfig.json next-app/next.config.ts ./
COPY next-app/src/ ./src/
COPY next-app/public/ ./public/
COPY next-app/migrations/ ./migrations/
COPY next-app/scripts/ ./scripts/
COPY next-app/legacy ./legacy/

ENV DOCKER=1
ENV LEGACY_ROOT=/build/legacy
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV DOCKER=1

COPY --from=builder /build/public ./public
COPY --from=builder /build/migrations ./migrations
COPY --from=builder /build/scripts ./scripts
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/package.json ./

COPY --from=builder /build/dist/standalone ./
COPY --from=builder /build/dist/static ./dist/static

COPY next-app/legacy ./legacy

EXPOSE 3000

CMD ["sh", "-c", "node --import tsx scripts/migrate.ts && exec node server.js"]
