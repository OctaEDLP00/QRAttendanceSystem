# Backend Dockerfile
FROM node:25-alpine

RUN npm install -g pnpm

WORKDIR /app

# Copy workspace configuration files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy backend package.json for caching
COPY backend/package.json ./backend/package.json
COPY frontend/package.json ./frontend/package.json

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy backend source code
COPY backend/ ./backend/

# Build backend
WORKDIR /app/backend
RUN pnpm build

# Create nodejs user
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
RUN chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 3000
CMD ["pnpm", "start:prod"]
