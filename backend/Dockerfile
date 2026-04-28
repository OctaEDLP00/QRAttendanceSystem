# Backend Dockerfile
FROM node:25-alpine
RUN npm install -g pnpm
WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY backend/package.json ./backend/
RUN pnpm install --filter backend... --frozen-lockfile
COPY backend/ ./backend/
WORKDIR /app/backend
RUN addgroup -g 1001 -S nodejs \
    adduser -S nodejs -u 1001 \
    chown -R nodejs:nodejs /app
USER nodejs
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start:prod"]
