# Docker Setup for QR Attendance System

This directory contains Docker configuration files for running the QR Attendance System in containers.

## Files

- `docker-compose.yml` - Main orchestration file for the full stack
- `postgres/init.sql` - Initial database setup script
- `../backend/Dockerfile` - Backend container configuration
- `../frontend/Dockerfile` - Frontend container configuration

## Quick Start

1. **Start all services:**
   ```bash
   docker-compose up -d
   ```

2. **View running containers:**
   ```bash
   docker-compose ps
   ```

3. **View logs:**
   ```bash
   docker-compose logs -f
   ```

4. **Stop all services:**
   ```bash
   docker-compose down
   ```

## Services

### PostgreSQL Database
- **Port:** 5432
- **Database:** qr_attendance
- **User:** postgres
- **Password:** password
- **Volume:** postgres_data (persistent data)

### Backend API
- **Port:** 3000
- **Environment:** Development
- **Depends on:** PostgreSQL

### Frontend App
- **Port:** 4321
- **Build:** Production build

## Development Workflow

For development, you might want to run services individually:

```bash
# Start only database
docker-compose up postgres -d

# Start backend with hot reload (from backend directory)
pnpm start:dev

# Start frontend with hot reload (from frontend directory)
pnpm dev
```

## Database Management

### Access PostgreSQL
```bash
docker-compose exec postgres psql -U postgres -d qr_attendance
```

### Reset Database
```bash
docker-compose down -v  # Remove volumes
docker-compose up postgres -d  # Recreate with init script
```

## Troubleshooting

### Port Conflicts
If ports 5432, 3000, or 4321 are in use, modify the `docker-compose.yml` ports mapping.

### Database Connection Issues
Ensure the DATABASE_URL in backend environment matches the PostgreSQL service configuration.

### Build Issues
Clear Docker cache if builds fail:
```bash
docker system prune -a
```
