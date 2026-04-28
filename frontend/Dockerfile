# Frontend Dockerfile
FROM node:25-alpine
RUN npm install -g pnpm
WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY frontend/package.json ./frontend/
RUN pnpm install --filter frontend... --frozen-lockfile
COPY frontend/ ./frontend/
WORKDIR /app/frontend
RUN addgroup -g 1001 -S nodejs \
    adduser -S nodejs -u 1001 \
    chown -R nodejs:nodejs /app
USER nodejs
RUN pnpm build
EXPOSE 4321
CMD ["pnpm", "preview"]
