# Prisma Database Setup

This directory contains Prisma ORM configuration for the QR Attendance System.

## Files

- `schema.prisma` - Database schema definition
- `seed.ts` - Database seeding script
- `.env` - Prisma-specific environment variables

## Database Schema

The schema includes the following models:
- **Institution** - Multi-tenant support
- **User** - Users with roles (ADMIN, TEACHER, STUDENT, PARENT)
- **Course** - Courses taught by teachers
- **Attendance** - Attendance records with geolocation
- **QRSession** - Dynamic QR code sessions

## Setup

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set up environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your database URL
   ```

3. **Generate Prisma client:**
   ```bash
   pnpm db:generate
   ```

4. **Push schema to database:**
   ```bash
   pnpm db:push
   ```

5. **Seed database:**
   ```bash
   pnpm db:seed
   ```

## Available Commands

```bash
# Generate Prisma client
pnpm db:generate

# Push schema changes to database (development)
pnpm db:push

# Create and run migrations (production)
pnpm db:migrate

# Open Prisma Studio (database GUI)
pnpm db:studio

# Seed database with sample data
pnpm db:seed
```

## Development Workflow

1. **Make schema changes** in `schema.prisma`
2. **Generate client:** `pnpm db:generate`
3. **Push changes:** `pnpm db:push` (for development)
4. **Create migration:** `pnpm db:migrate` (for production)

## Environment Variables

Required environment variables in `.env`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
```

## Prisma Studio

Prisma Studio provides a GUI for database management:

```bash
pnpm db:studio
```

This opens a web interface at `http://localhost:5555`

## Troubleshooting

### Connection Issues
- Ensure PostgreSQL is running
- Check DATABASE_URL format
- Verify database exists

### Migration Issues
- Reset database: `pnpm db:push --force-reset`
- Check migration history: `npx prisma migrate status`

### Type Issues
- Regenerate client: `pnpm db:generate`
- Check TypeScript compilation
