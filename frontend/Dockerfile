# Frontend Dockerfile
FROM node:25-alpine

RUN npm install -g pnpm

WORKDIR /app

# Copy workspace configuration files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy frontend package.json for caching
COPY frontend/package.json ./frontend/package.json
COPY backend/package.json ./backend/package.json

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy frontend source code
COPY frontend/ ./frontend/

# Build frontend
WORKDIR /app/frontend
RUN pnpm dlx astro@latest telemetry disable
RUN pnpm build

# Create nodejs user
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
RUN chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 4321
ENV HOST=0.0.0.0
ENV PORT=4321
CMD ["node", "./dist/server/entry.mjs"]
