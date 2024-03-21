FROM node:18-alpine AS base

FROM base AS builder
RUN npm install -g pnpm

RUN corepack enable && corepack prepare pnpm@latest --activate
ENV PNPM_HOME=/usr/local/bin
RUN pnpm add --global @upleveled/preflight@latest

# RUN pnpm setup

RUN apk add --no-cache libc6-compat
RUN apk update

# Setting working directory
WORKDIR /app

# Set the shell to /bin/sh
# ENV SHELL /bin/sh
# RUN pnpm setup
RUN pnpm add -g turbo
COPY . .

# Here "api" is on of our apps
RUN turbo prune api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app

# ENV SHELL /bin/sh

# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN npm install -g pnpm
RUN pnpm install

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN pnpm turbo build --filter=api...

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 expressjs
RUN adduser --system --uid 1001 expressjs
USER expressjs
COPY --from=installer /app .

CMD node apps/api/dist/index.js