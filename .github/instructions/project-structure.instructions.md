---
name: project-structure
description: "Maintain QR Attendance System monorepo structure: pnpm workspace organization, NestJS module patterns, shared packages, consistent file naming. Use when: adding new modules, organizing code, ensuring consistency across backend/frontend/mobile."
applyTo: "**/*"
---

# QR Attendance System - Project Structure Guidelines

## Overview
This instruction ensures consistent organization of the QR Attendance System monorepo. Follow these patterns for all new code additions and refactoring.

## Pnpm Workspace Organization

### Package Structure
```
qr-attendance-system/
├── backend/          # NestJS API
├── frontend/         # Astro web app
├── mobile/           # Expo React Native app
└── packages/         # Shared packages (future)
    └── types/        # Shared TypeScript types
```

### Workspace Configuration
- Use `pnpm-workspace.yaml` for package inclusion
- Keep flat structure (no nested `apps/` folder)
- Include all packages in workspace for shared dependencies

## Backend (NestJS) Structure

### Module Organization
```
backend/src/
├── modules/              # Feature modules
│   ├── auth/            # Authentication module
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   ├── dto/         # Request/Response DTOs
│   │   └── guards/      # Module-specific guards
│   └── [feature]/       # Other feature modules
├── common/              # Shared infrastructure
│   ├── guards/          # Global guards (JWT, Roles)
│   ├── decorators/      # Custom decorators (@Roles)
│   ├── interceptors/    # Global interceptors
│   └── exceptions/      # Custom exceptions
├── interfaces/          # Type definitions
│   ├── dto/            # Data Transfer Objects
│   └── enums/          # Enums (Role, Status)
└── prisma/             # Database schema
    └── schema.prisma
```

### Module Creation Rules
- **One module per feature**: auth, attendance, qr, users, courses, etc.
- **Controller-Service-Module pattern**: Always include all three files
- **DTOs required**: Create request/response DTOs for all endpoints
- **Guards for protection**: Use JWT and role-based guards
- **Consistent naming**: `[feature].controller.ts`, `[feature].service.ts`, `[feature].module.ts`

### File Naming Conventions
- Controllers: `[feature].controller.ts`
- Services: `[feature].service.ts`
- Modules: `[feature].module.ts`
- DTOs: `[operation].dto.ts` (e.g., `login.dto.ts`, `create-user.dto.ts`)
- Guards: `[purpose].guard.ts` (e.g., `jwt.guard.ts`, `roles.guard.ts`)
- Interceptors: `[purpose].interceptor.ts`
- Enums: `[type].enum.ts` (e.g., `role.enum.ts`)

## Frontend (Astro) Structure

### Component Organization
```
frontend/src/
├── components/
│   ├── ui/             # Reusable UI components
│   └── [feature]/      # Feature-specific components
├── layouts/
├── pages/
├── services/           # API client services
└── types/              # Local type definitions
```

### Component Patterns
- Use `.astro` for page components
- Create reusable components in `components/ui/`
- Feature-specific components in `components/[feature]/`
- Consistent naming: `PascalCase.astro`

## Mobile (Expo) Structure

### App Organization
```
mobile/
├── app/                # Expo Router screens
│   ├── (tabs)/        # Tab navigation
│   ├── (auth)/        # Auth flow screens
│   └── _layout.tsx    # Root layout
├── components/         # Reusable components
├── services/           # API, storage, geolocation
├── hooks/              # Custom React hooks
├── types/              # TypeScript types
└── constants/          # App constants
```

### Screen Patterns
- Use Expo Router file-based routing
- Group related screens in route groups: `(tabs)`, `(auth)`
- Consistent screen naming: `kebab-case.tsx`

## Shared Packages

### Types Package (Future)
```
packages/types/
├── src/
│   ├── interfaces/    # Shared interfaces
│   ├── enums/         # Shared enums
│   └── index.ts       # Barrel exports
├── package.json
└── tsconfig.json
```

### Package Creation Rules
- Create when types are shared across 2+ packages
- Use barrel exports (`index.ts`) for clean imports
- Version independently
- Include in workspace configuration

## Code Organization Principles

### Separation of Concerns
- **Controllers**: Handle HTTP requests/responses only
- **Services**: Contain business logic
- **DTOs**: Define data contracts
- **Guards**: Handle authentication/authorization
- **Interceptors**: Handle cross-cutting concerns (logging, transformation)

### Import Organization
- Group imports: Node modules, then local imports
- Use absolute imports within packages
- Prefer barrel exports for clean imports

### Error Handling
- Use custom exceptions in backend
- Implement global exception filters
- Return consistent error responses

## Integration with Architecture Document

Always reference `qr-attendance-unified-architecture.md` for:
- Module requirements and API endpoints
- Database schema compliance
- Authentication patterns
- Security best practices

When adding new features:
1. Check the unified architecture document
2. Follow established patterns
3. Update documentation if patterns evolve
4. Ensure consistency across all packages

## Validation Checklist

Before committing new code:
- [ ] Module structure follows patterns above
- [ ] File naming is consistent
- [ ] DTOs created for new endpoints
- [ ] Guards applied where needed
- [ ] Imports organized properly
- [ ] Types shared via packages/types when appropriate
- [ ] Documentation updated in unified architecture file</content>
<parameter name="filePath">c:\Users\Octav\OneDrive\Desktop\Dev\qr-attendance-system\.github\instructions\project-structure.instructions.md