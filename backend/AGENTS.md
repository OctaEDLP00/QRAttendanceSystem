# Backend Package - Agent Instructions

Welcome to the **backend** package! This is a NestJS REST API server that powers the QR Attendance System.

## Quick Overview

The backend is built with **NestJS** and uses **Prisma** as the ORM for PostgreSQL. It provides REST API endpoints for attendance tracking, user management, QR code generation, and authentication.

**Tech Stack:**
- **Framework**: NestJS (Node.js framework)
- **ORM**: Prisma with PostgreSQL
- **Language**: TypeScript
- **Package Manager**: pnpm
- **Testing**: Jest (unit and E2E)
- **Linting**: ESLint

## Project Structure

```
backend/
├── src/
│   ├── main.ts                 # Application entry point
│   ├── app.module.ts          # Root module
│   ├── attendance/            # Attendance management module
│   ├── auth/                  # Authentication module
│   ├── courses/               # Course management module
│   ├── institutions/          # Institution management module
│   ├── qr/                    # QR code generation module
│   ├── users/                 # User management module
│   └── types/                 # Shared TypeScript types and interfaces
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── seed.ts                # Database seeding
│   └── migrations/            # Database migrations
├── test/                      # E2E tests
└── package.json
```

## Build and Run Commands

### Development
```bash
# Install dependencies (from root or backend folder)
pnpm i

# Start development server with hot reload
pnpm dev:backend

# Generate Prisma client
pnpm db:generate

# Push schema to dev database
pnpm db:push

# Run database seeding
pnpm db:seed
```

### Production Build
```bash
# Build backend
pnpm build:backend

# Start production server
pnpm start:backend
```

### Testing
```bash
# Run unit tests
pnpm test:backend

# Run E2E tests
pnpm test:e2e:backend

# Run tests with coverage
pnpm test:backend -- --coverage
```

### Code Quality
```bash
# Lint code
pnpm lint:backend

# Format code
pnpm format:backend
```

## NestJS Architecture

### Module Structure
Each feature is organized as a **NestJS Module** containing:
- **Controller**: Handles HTTP requests/responses
- **Service**: Business logic and data operations
- **Module**: Aggregates controller and service, handles dependency injection

### Example: Attendance Module
```
attendance/
├── attendance.controller.ts    # HTTP endpoints
├── attendance.service.ts       # Business logic
└── attendance.module.ts        # Module definition
```

### Module Pattern
```typescript
// attendance.module.ts
@Module({
  controllers: [AttendanceController],
  providers: [AttendanceService],
  exports: [AttendanceService], // If used by other modules
})
export class AttendanceModule {}
```

## Database (Prisma)

### Schema Changes Workflow
1. **Edit** `prisma/schema.prisma`
2. **Generate** migration: `pnpm db:generate`
3. **Review** generated migration file in `prisma/migrations/`
4. **Apply** to database: `pnpm db:push`
5. **Commit** both schema and migration

### Common Prisma Commands
```bash
pnpm db:generate    # Generate Prisma client after schema changes
pnpm db:push       # Push schema to database (dev)
pnpm db:seed       # Run seed script (db/seed.ts)
pnpm db:studio     # Open Prisma Studio UI
```

### Prisma Best Practices
- Use proper **relations** (one-to-many, many-to-many)
- Add **indexes** for frequently queried fields
- Use **@unique** constraints where appropriate
- Keep schema **normalized** to avoid data duplication
- Add **timestamps** (createdAt, updatedAt) for auditing

### Query Patterns
```typescript
// Service example with Prisma
@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  // Find with relations
  async getAttendance(id: string) {
    return this.prisma.attendance.findUnique({
      where: { id },
      include: { user: true, course: true }, // Include related data
    });
  }

  // List with filtering
  async listAttendance(filter: AttendanceFilter) {
    return this.prisma.attendance.findMany({
      where: filter,
      orderBy: { createdAt: 'desc' },
    });
  }
}
```

## REST API Conventions

### Endpoints
- **GET** `/api/resource` - List resources
- **GET** `/api/resource/:id` - Get single resource
- **POST** `/api/resource` - Create resource
- **PATCH** `/api/resource/:id` - Update resource
- **DELETE** `/api/resource/:id` - Delete resource

### Controllers
```typescript
@Controller('api/attendance')
export class AttendanceController {
  constructor(private service: AttendanceService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() createDto: CreateAttendanceDto) {
    return this.service.create(createDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateAttendanceDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
```

## Authentication & Authorization

- Use **JWT tokens** for authentication
- Implement **role-based access control (RBAC)**
- Validate tokens in **auth guards**
- Protect endpoints with appropriate guards
- See `auth/` module for implementation

## Error Handling

```typescript
// Use NestJS HttpException for consistent errors
import { HttpException, HttpStatus } from '@nestjs/common';

if (!resource) {
  throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
}

// Global exception filter handles responses
```

## Validation

Use **class-validator** for DTO validation:
```typescript
import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
```

## Testing

### Unit Tests
```bash
pnpm test:backend -- --watch
```

Place tests next to source files: `service.spec.ts`

### E2E Tests
```bash
pnpm test:e2e:backend
```

Tests in `test/` folder test full API workflows.

## Dependencies to Use (Skills)

When working on backend code, leverage these specialized skills:

### [nestjs-best-practices](../.agents/skills/nestjs-best-practices/SKILL.md)
- Module organization
- Dependency injection patterns
- Middleware and guards
- Decorators and interceptors
- Production-ready architecture

### [prisma-client-api](../.agents/skills/prisma-client-api/SKILL.md)
- Database queries and CRUD operations
- Filtering, sorting, pagination
- Relations and includes
- Transactions and raw queries

### [prisma-database-setup](../.agents/skills/prisma-database-setup/SKILL.md)
- PostgreSQL connection configuration
- Connection pooling
- Database setup and management

### [prisma-cli](../.agents/skills/prisma-cli/SKILL.md)
- Migration management
- Schema generation
- Prisma CLI commands

### [nodejs-backend-patterns](../.agents/skills/nodejs-backend-patterns/SKILL.md)
- Express/Fastify patterns
- Middleware patterns
- API design
- Error handling strategies

### [nodejs-best-practices](../.agents/skills/nodejs-best-practices/SKILL.md)
- Async patterns
- Performance optimization
- Security best practices
- Architecture decisions

### [typescript-advanced-types](../.agents/skills/typescript-advanced-types/SKILL.md)
- Complex type definitions
- Generic types for reusability
- Type utilities and helpers
- Type-safe patterns

## Code Style Guidelines

### TypeScript
- Use **strict mode** in tsconfig
- Avoid **any** type; use proper types
- Use **interfaces** for object contracts
- Use **generics** for reusable components

### Naming
- **Modules**: PascalCase with `module.ts` suffix
- **Controllers**: PascalCase with `controller.ts` suffix
- **Services**: PascalCase with `service.ts` suffix
- **DTOs**: PascalCase with `dto.ts` suffix

### File Organization
```
feature/
├── feature.controller.ts
├── feature.service.ts
├── feature.module.ts
├── dto/
│   ├── create-feature.dto.ts
│   └── update-feature.dto.ts
└── feature.service.spec.ts
```

## Environment Variables

Create `.env` file (DO NOT COMMIT):
```
DATABASE_URL=postgresql://user:password@localhost:5432/qr_attendance
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

Use `.env.example` as template.

## Security Best Practices

- **Input Validation**: Validate all inputs with class-validator
- **SQL Injection**: Use Prisma's parameterized queries (built-in)
- **CORS**: Configure appropriate CORS policies
- **JWT**: Use strong secrets and short expiration times
- **Rate Limiting**: Consider rate limiting for public endpoints
- **Secrets**: Never commit sensitive data; use environment variables

## Common Workflows

### Adding a New Feature
1. Create new module folder: `src/feature-name/`
2. Create `.controller.ts`, `.service.ts`, `.module.ts`
3. Add DTOs in `dto/` subfolder
4. Add Prisma models to schema if needed
5. Write tests
6. Import module in `app.module.ts`

### Creating a Database Migration
1. Update `prisma/schema.prisma`
2. Run `pnpm db:generate`
3. Review migration in `prisma/migrations/`
4. Run `pnpm db:push`
5. Commit schema and migration

### Debugging
```bash
# Add DEBUG=* to see detailed logs
DEBUG=* pnpm dev:backend

# Use Prisma Studio to inspect database
pnpm db:studio
```

## Troubleshooting

### Database Connection Failed
- Ensure PostgreSQL is running
- Check DATABASE_URL in `.env`
- Verify credentials and port

### Port 3000 Already in Use
```bash
# Linux/Mac
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force
```

### Prisma Client Not Found
```bash
pnpm db:generate
```

### Tests Failing
- Run with `--verbose` flag for details
- Check database is seeded
- Ensure `.env` is correct

## Additional Resources

- [NestJS Official Docs](https://docs.nestjs.com)
- [Prisma ORM Guide](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Jest Testing Framework](https://jestjs.io)

---

**Always run tests before committing changes to ensure code quality and prevent regressions.**
