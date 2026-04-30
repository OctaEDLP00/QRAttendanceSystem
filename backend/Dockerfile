# Backend Dockerfile
FROM node:25-alpine

RUN npm install -g pnpm

WORKDIR /app

# Copy pnpm workspace files from root
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml /app/

# Copy all source files without specific paths
COPY . /app/

# Install backend dependencies only
RUN cd /app && pnpm install --filter backend --frozen-lockfile && pnpm prune --production

# Build backend
WORKDIR /app/backend
RUN pnpm build

# Create nodejs user
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
RUN chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 3000
CMD ["pnpm", "start:prod"]
