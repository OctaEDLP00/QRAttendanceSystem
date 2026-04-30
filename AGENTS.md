# QR Attendance System - Agent Instructions

Welcome! This is a **monorepo project** containing a QR code-based attendance system with three main packages: backend (NestJS), frontend (Astro), and mobile (React Native/Expo).

## Project Overview

The QR Attendance System is a full-stack application that allows organizations to track attendance using QR codes. Users can generate QR codes, scan them for attendance marking, and view attendance records with proper role-based access control.

**Architecture:**
- **Backend**: NestJS REST API with Prisma ORM and PostgreSQL
- **Frontend**: Astro static site with Tailwind CSS for web access
- **Mobile**: React Native/Expo app for iOS and Android scanning
- **Database**: PostgreSQL with Prisma migrations
- **Package Manager**: pnpm (monorepo with workspace)

## Key Technologies

| Layer           | Technology        | Version |
| --------------- | ----------------- | ------- |
| Backend         | NestJS            | Latest  |
| ORM             | Prisma            | Latest  |
| Frontend        | Astro             | Latest  |
| Mobile          | React Native/Expo | Latest  |
| Styling         | Tailwind CSS      | Latest  |
| Language        | TypeScript        | 6.x+    |
| Package Manager | pnpm              | Latest  |

## Project Structure

```
qr-attendance-system/
├── backend/          # NestJS API server
├── frontend/         # Astro web application
├── mobile/           # Expo React Native app
├── docker/           # Docker configuration
└── .agents/          # Agent skills and configurations
    └── skills/
        ├── astro/
        ├── tailwind-css-patterns/
        ├── nestjs-best-practices/
        ├── prisma-*/
        ├── expo-*/
        └── ...
```

## Build and Run Commands

### Development
```bash
# Install dependencies (root)
pnpm i

# Development mode
pnpm dev                # Frontend dev server
pnpm dev:backend       # Backend dev server with hot reload
pnpm start:mobile      # Expo mobile dev server

# Database
pnpm db:generate       # Generate Prisma client
pnpm db:push          # Push schema to database
```

### Production
```bash
pnpm build            # Build all packages
pnpm build:backend    # Build backend only
pnpm build:frontend   # Build frontend only
```

### Testing and Linting
```bash
pnpm test:backend     # Run unit tests
pnpm test:e2e:backend # Run E2E tests
pnpm lint:backend     # Lint backend
pnpm lint:mobile      # Lint mobile
pnpm format:backend   # Format backend code
```

## Package-Specific Guides

This monorepo uses **nested AGENTS.md files** for each package. The agent system automatically reads the closest AGENTS.md in the directory tree, so instructions are tailored to each package:

### [Backend Package](./backend/AGENTS.md)
- NestJS framework patterns and best practices
- Prisma ORM configuration and migrations
- REST API design and endpoint standards
- Database schema and migrations
- **Relevant Skills**: nestjs-best-practices, prisma-*, nodejs-backend-patterns, typescript-advanced-types

### [Frontend Package](./frontend/AGENTS.md)
- Astro framework and component development
- Tailwind CSS styling patterns
- Web accessibility (WCAG 2.2)
- SEO optimization
- Responsive design principles
- **Relevant Skills**: astro, tailwind-css-patterns, accessibility, seo, frontend-design

### [Mobile Package](./mobile/AGENTS.md)
- React Native and Expo framework
- Native UI component development
- Cross-platform styling
- Data fetching and API integration
- iOS and Android deployment
- **Relevant Skills**: expo-*, building-native-ui, native-data-fetching, expo-tailwind-setup

## Code Style Guidelines

### General
- Use **TypeScript** for all code (no plain JavaScript)
- Follow **ESLint** configuration in each package
- Use **Prettier** for consistent formatting
- Write **clear, descriptive variable and function names**
- Add comments for complex logic

### Naming Conventions
- **Folders**: kebab-case (`my-folder/`)
- **Files**: kebab-case or PascalCase depending on framework conventions
- **Variables/Functions**: camelCase
- **Classes**: PascalCase
- **Constants**: UPPER_SNAKE_CASE

### Git & Commits
- Use meaningful commit messages (present tense, descriptive)
- Keep commits atomic and focused on one feature/fix
- Reference issue numbers when applicable: `feat: add QR generation (#42)`
- Common prefixes: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`

## Database

### PostgreSQL Setup
The project uses PostgreSQL with Prisma ORM. Connection details are configured in `.env` files.

### Migrations
```bash
pnpm db:generate      # Generate Prisma client based on schema
pnpm db:push         # Push schema changes to dev database
```

See [backend/AGENTS.md](./backend/AGENTS.md) for detailed database instructions.

## Security Considerations

- **Environment Variables**: Never commit `.env` files; use `.env.example`
- **API Authentication**: Use JWT tokens for REST API endpoints
- **CORS**: Configure appropriate CORS policies between frontend and backend
- **Input Validation**: Validate all user inputs in both frontend and backend
- **Database**: Use Prisma's parameterized queries to prevent SQL injection
- **Secrets**: Keep API keys and secrets in environment variables

## Docker & Deployment

The project includes Docker configuration for containerized deployment:
- Backend runs on port 3000
- Frontend serves on port 3000 (static)
- PostgreSQL database connection required

See `docker/` folder for Docker setup and `docker-compose.yml` for orchestration.

## Testing Strategy

### Backend
- Unit tests for services and controllers
- E2E tests for API endpoints
- Run tests before submitting PRs

### Frontend
- Component testing for critical UI elements
- Visual regression testing recommended

### Mobile
- Device testing on both iOS and Android
- Consider using Detox for E2E testing

## Common Workflows

### Adding a New Feature
1. Create feature branch: `git checkout -b feat/feature-name`
2. Implement feature in appropriate package
3. Add/update tests
4. Run linting and formatting
5. Create pull request with clear description

### Database Schema Changes
1. Update `backend/prisma/schema.prisma`
2. Create migration: `pnpm db:generate`
3. Review migration file
4. Apply to database: `pnpm db:push`
5. Commit schema and migration

### Updating Dependencies
- Use `pnpm update` carefully; test thoroughly
- Check for breaking changes in changelogs
- Update type definitions if needed

## Troubleshooting

### Port Already in Use
- Backend: `lsof -i :3000` to find and kill process
- Frontend: `lsof -i :3000` or use `pnpm dev -- --port 3001`
- Mobile: Clear Expo cache with `npx expo r -c`

### Database Connection Issues
- Verify PostgreSQL is running
- Check `.env` DATABASE_URL is correct
- Reset database: `pnpm db:push --force-reset` (dev only)

### pnpm Workspace Issues
- Clear cache: `pnpm store prune`
- Reinstall: `pnpm i --force`

## Additional Resources

- [Astro Documentation](https://docs.astro.build)
- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [React Native Documentation](https://reactnative.dev)
- [Expo Documentation](https://docs.expo.dev)

---

**When working on this project, always check the package-specific AGENTS.md files for detailed instructions tailored to that part of the codebase.**
