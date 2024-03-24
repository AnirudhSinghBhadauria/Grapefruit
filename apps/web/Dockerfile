FROM node:18-alpine AS base

FROM base AS builder
RUN npm install -g pnpm

RUN corepack enable && corepack prepare pnpm@latest --activate
ENV PNPM_HOME=/usr/local/bin
# RUN pnpm add --global @upleveled/preflight@latest

# RUN pnpm setup

RUN apk add --no-cache libc6-compat
RUN apk update

# Setting working directory
WORKDIR /app

RUN pnpm add -g turbo
COPY . .

# Here "api" is on of our apps
RUN turbo prune web --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN npm install -g pnpm

RUN corepack enable && corepack prepare pnpm@latest --activate
ENV PNPM_HOME=/usr/local/bin

# RUN pnpm add --global @upleveled/preflight@latest
RUN pnpm add -g turbo
RUN pnpm install

RUN pnpm turbo build --filter=web...


FROM base AS runner
WORKDIR /app

RUN npm install -g pnpm

RUN corepack enable && corepack prepare pnpm@latest --activate
ENV PNPM_HOME=/usr/local/bin

# RUN pnpm add --global @upleveled/preflight@latest

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
# RUN chown -R nextjs:nodejs /app
USER nextjs

COPY --from=installer /app/apps/web/next.config.js .
COPY --from=installer /app/apps/web/package.json .

COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

CMD node apps/web/server.js