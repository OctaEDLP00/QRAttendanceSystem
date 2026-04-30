# Frontend Dockerfile
FROM node:25-alpine

RUN npm install -g pnpm

WORKDIR /app

# Copy pnpm workspace files from root
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml /app/

# Copy all source files without specific paths
COPY . /app/

# Install frontend dependencies only
RUN cd /app && pnpm install --filter frontend --frozen-lockfile && pnpm prune --production

# Build frontend
WORKDIR /app/frontend
RUN pnpm build

# Create nodejs user
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
RUN chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 4321
CMD ["pnpm", "preview"]
