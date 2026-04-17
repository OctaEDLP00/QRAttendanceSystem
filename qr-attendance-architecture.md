# QR-Attendance System --- Unified Architecture and Implementation Guide

## 1. Executive Summary

QR-Attendance System is a comprehensive attendance tracking platform designed for educational institutions and organizations. The system leverages **dynamic QR codes**, **geofencing validation**, and **offline synchronization** to ensure reliable, fraud-resistant attendance recording.

The solution consists of:

- **Backend API** (NestJS) - Centralized REST API with modular architecture
- **Web Application** (Astro) - Admin dashboard for QR generation and attendance management
- **Mobile Application** (Expo SDK 55) - Student attendance registration via QR scanning, including QR generation in the student section
- **Web Application** (Astro) - Two web views: teacher dashboard for institution/course management and student-like dashboards for subject-level QR access
- **Database** (PostgreSQL + Prisma ORM) - Type-safe data persistence
- **Monorepo** (pnpm workspace) - Unified development and deployment

**Current Implementation Status**: ~20% complete (basic NestJS modules, Astro setup, Expo SDK 55 app structure)

**Key Technologies**:
- Backend: NestJS 11.1.18, TypeScript 6.0.2, Prisma ORM
- Frontend: Astro 6.1.5, Node >=22.12.0
- Mobile: Expo SDK 55.0.14, React Native 0.85.0, React 19.2.5
- Database: PostgreSQL
- Package Manager: pnpm with workspace configuration

## 2. Project Structure (Current Implementation)

The project uses a **flat pnpm workspace** structure instead of nested apps/ directories:

```
qr-attendance-system/
│
├── backend/                          # NestJS API
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── modules/
│   │   │   ├── auth/                 # ✅ Implemented
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   └── auth.module.ts
│   │   │   ├── attendance/           # ✅ Implemented
│   │   │   │   ├── attendance.controller.ts
│   │   │   │   ├── attendance.service.ts
│   │   │   │   └── attendance.module.ts
│   │   │   ├── qr/                   # ✅ Implemented
│   │   │   │   ├── qr.controller.ts
│   │   │   │   ├── qr.service.ts
│   │   │   │   └── qr.module.ts
│   │   │   ├── courses/              # ✅ Implemented
│   │   │   │   ├── courses.controller.ts
│   │   │   │   ├── courses.service.ts
│   │   │   │   └── courses.module.ts
│   │   │   ├── institutions/         # ✅ Implemented
│   │   │   │   ├── institutions.controller.ts
│   │   │   │   ├── institutions.service.ts
│   │   │   │   └── institutions.module.ts
│   │   │   └── students/             # ✅ Implemented (partial)
│   │   │       ├── students.controller.spec.ts
│   │   │       └── students.controller.ts
│   │   ├── controllers/              # Legacy structure
│   │   └── services/                 # Legacy structure
│   ├── types/                        # ✅ Shared TypeScript types moved here
│   │   ├── interfaces/
│   │   ├── enums/
│   │   └── index.ts
│   ├── prisma/                      # ✅ Schema created
│   ├── test/
│   ├── package.json                  # NestJS 11.1.18
│   └── tsconfig.json
│
├── frontend/                         # Astro Web App
│   ├── src/
│   │   ├── components/
│   │   │   └── Welcome.astro         # ✅ Basic component
│   │   ├── layouts/
│   │   │   └── Layout.astro          # ✅ Basic layout
│   │   └── pages/
│   │       └── index.astro           # ✅ Basic page
│   ├── public/
│   ├── package.json                  # Astro 6.1.5
│   └── astro.config.mjs
│
├── mobile/                           # Expo React Native App
│   ├── app/
│   │   ├── _layout.tsx               # ✅ Expo Router setup
│   │   ├── modal.tsx
│   │   └── (tabs)/                   # ✅ Tab-based navigation
│   │       ├── _layout.tsx
│   │       ├── explore.tsx
│   │       └── index.tsx
│   ├── components/                   # ✅ Basic components
│   ├── constants/
│   ├── hooks/
│   ├── assets/
│   ├── package.json                  # Expo 55.0.14
│   └── app.json
│
├── types/                            # ✅ Shared TypeScript types
│   ├── src/
│   │   ├── interfaces/
│   │   ├── enums/
│   │   └── index.ts                  # Barrel exports
│   ├── package.json
│   ├── tsconfig.json
│   └── dist/                         # Built output
│
├── docker/                           # ✅ Docker setup complete
│   ├── postgres/
│   │   └── init.sql                # Initial DB setup
│   └── docker-compose.yml          # Full stack orchestration
│
├── pnpm-workspace.yaml               # ✅ Configured
├── pnpm-lock.yaml                    # ✅ Generated
├── package.json                      # Root workspace
├── README.md
└── .gitignore                        # ✅ Unified
```

**Workspace Configuration** (`pnpm-workspace.yaml`):
```yaml
packages:
  - ./frontend/*
  - ./backend/*
  - ./mobile/*
allowBuilds:
  '@nestjs/core': true
  esbuild: true
  sharp: true
  unrs-resolver: true
```

## 3. Architecture Principles

The system follows **Clean Architecture** combined with **Hexagonal Architecture (Ports & Adapters)**:

```
┌───────────────────────────────┐
│         Presentation          │  ← Controllers, UI, API
│   (Interfaces / Adapters)     │
└───────────────┬───────────────┘
                │
┌───────────────▼───────────────┐
│      Application Layer        │  ← Use Cases, Services
│     (Business Logic)          │
└───────────────┬───────────────┘
                │
┌───────────────▼───────────────┐
│        Domain Layer           │  ← Entities, Rules
│    (Core Business Rules)      │
└───────────────┬───────────────┘
                │
┌───────────────▼───────────────┐
│    Infrastructure Layer       │  ← DB, External APIs
│   (Frameworks & Drivers)      │
└───────────────────────────────┘
```

**Benefits**:
- Framework independence
- High testability
- Easy to maintain and scale
- Clear separation of concerns

## 4. Backend Architecture (NestJS)

### Current Implementation
- ✅ NestJS CLI-generated structure
- ✅ Basic modules: auth, attendance, students
- ❌ Missing: QR module, users module, courses module, institutions module, notifications module
- ❌ No Prisma setup
- ❌ No DTOs, guards, interceptors

### Required Modules Structure
```
backend/src/
├── modules/
│   ├── auth/                    # ✅ Basic implementation
│   ├── attendance/              # ✅ Basic implementation
│   ├── students/                # ✅ Partial (rename to users?)
│   ├── qr/                      # ❌ Missing - QR token management
│   ├── courses/                 # ❌ Missing - Course management
│   ├── institutions/            # ❌ Missing - Multi-tenant support
│   └── notifications/           # ❌ Missing - Push notifications
├── common/                      # ❌ Missing
│   ├── guards/                  # JWT, Role-based
│   ├── decorators/              # @Roles, @CurrentUser
│   ├── interceptors/            # Logging, response transformation
│   └── exceptions/              # Custom error handling
├── interfaces/                  # ❌ Missing
│   ├── dto/                     # Request/Response DTOs
│   └── enums/                   # Role, AttendanceStatus, etc.
├── prisma/                      # ❌ Missing
│   └── schema.prisma
└── main.ts
```

### API Endpoints (Planned)
```
Auth:
POST   /auth/login
POST   /auth/refresh
POST   /auth/logout

QR Sessions:
POST   /qr/student/:studentId/course/:courseId   # Student generates QR in mobile app
GET    /qr/session/:courseId                     # Get active session for a course
DELETE /qr/session/:id                           # Expire QR

Attendance:
POST   /attendance/register                      # Register attendance by student QR
POST   /attendance/scan                          # Teacher scans student QR in web app
GET    /attendance/course/:id                    # Get course attendance
GET    /attendance/student/:id                   # Get student history

Users / Teachers:
GET    /users                   # List users (admin)
POST   /users                   # Create user
GET    /users/:id               # Get user details
GET    /users/:id/institutions  # Get institutions for a teacher
POST   /users/:id/institutions  # Assign an institution to a teacher
GET    /users/:id/courses       # Get courses for a user (student or teacher)

Courses:
GET    /courses                      # List courses
GET    /courses/teacher/:teacherId   # List courses by teacher
POST   /courses                      # Create course
GET    /courses/:id                  # Get course details

Institutions:
GET    /institutions                     # List institutions
GET    /institutions/teacher/:teacherId  # List institutions managed by a teacher
POST   /institutions                     # Create institution
```

## 5. Database Schema (Prisma)

**Location**: `backend/src/prisma/schema.prisma` (to be created)

**Note**: Shared types are currently maintained under `backend/types/`. Once the backend model stabilizes, the same shared type definitions will be copied to `frontend` and `mobile` for consistent cross-platform typing.

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Institution {
  id        String   @id @default(uuid())
  name      String
  createdAt DateTime @default(now())

  users     User[]
  courses   Course[]
  @@map("institutions")
}

model User {
  id            String   @id @default(uuid())
  name          String
  email         String   @unique
  password      String
  role          Role
  institutionId String
  createdAt     DateTime @default(now())

  institution   Institution @relation(fields: [institutionId], references: [id])
  attendances   Attendance[]
  courses       Course[]     @relation("TeacherCourses")
  @@map("users")
}

model Course {
  id            String   @id @default(uuid())
  name          String
  teacherId     String
  institutionId String
  createdAt     DateTime @default(now())

  teacher       User         @relation("TeacherCourses", fields: [teacherId], references: [id])
  institution   Institution  @relation(fields: [institutionId], references: [id])
  attendances   Attendance[]
  qrSessions    QRSession[]
  @@map("courses")
}

model Attendance {
  id        String           @id @default(uuid())
  studentId String
  courseId  String
  status    AttendanceStatus
  latitude  Float
  longitude Float
  timestamp DateTime         @default(now())

  student   User   @relation(fields: [studentId], references: [id])
  course    Course @relation(fields: [courseId], references: [id])
  @@map("attendances")
}

model QRSession {
  id        String   @id @default(uuid())
  courseId  String
  token     String   @unique
  expiresAt DateTime
  createdAt DateTime @default(now())

  course    Course @relation(fields: [courseId], references: [id])
  @@map("qr_sessions")
}

enum Role {
  ADMIN
  TEACHER
  STUDENT
  PARENT
}

enum AttendanceStatus {
  PRESENT
  LATE
  ABSENT
  INVALID_LOCATION
}
```

## 6. Frontend Architecture (Astro)

### Current Implementation
- ✅ Astro 6.1.5 with recommended template
- ✅ Basic layout and welcome component
- ❌ No admin dashboard, QR generation, attendance views

### Required Structure
```
frontend/src/
├── components/
│   ├── ui/                     # Reusable UI components
│   ├── QRGenerator.astro       # QR creation component
│   ├── AttendanceTable.astro   # Attendance display
│   ├── CourseManager.astro     # Course CRUD
│   └── UserManager.astro       # User management
├── layouts/
│   ├── Layout.astro            # ✅ Basic layout
│   └── AdminLayout.astro       # Admin-specific layout
├── pages/
│   ├── index.astro             # ✅ Basic page
│   ├── dashboard.astro         # Admin dashboard
│   ├── courses.astro           # Course management
│   ├── attendance.astro        # Attendance reports
│   └── qr.astro                # QR generation panel
├── services/
│   └── api.ts                  # Backend API client
└── types/
    └── index.ts                # Shared types (from packages/types)
```

### Key Features to Implement
- **QR Generation Panel**: Real-time QR display for teachers
- **Admin Dashboard**: Overview of attendance statistics
- **Course Management**: CRUD operations for courses
- **Attendance Reports**: Filterable attendance records
- **API Integration**: HTTP client for backend communication

## 7. Mobile Architecture (Expo SDK 55)

### Current Implementation
- ✅ Expo SDK 55.0.14 with expo-router
- ✅ Tab-based navigation structure
- ✅ Basic components and hooks
- ❌ No QR scanning, GPS, offline storage, API client

### Required Structure
```
mobile/
├── app/
│   ├── (auth)/                 # Authentication screens
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── (tabs)/                 # ✅ Tab navigation
│   │   ├── _layout.tsx
│   │   ├── index.tsx           # Dashboard
│   │   ├── scan.tsx            # QR Scanner
│   │   └── profile.tsx         # User profile
│   └── _layout.tsx             # ✅ Root layout
├── components/
│   ├── QRScanner.tsx           # QR scanning component
│   ├── AttendanceCard.tsx      # Attendance display
│   └── OfflineIndicator.tsx    # Offline status
├── services/
│   ├── api.ts                  # Backend API client
│   ├── storage.ts              # Local storage (AsyncStorage)
│   ├── geolocation.ts          # GPS services
│   └── notifications.ts        # Push notifications
├── hooks/
│   ├── useAuth.ts              # Authentication hook
│   ├── useOfflineSync.ts       # Offline sync hook
│   └── useQRScan.ts            # QR scanning hook
├── types/
│   └── index.ts                # Shared types
└── constants/
    └── config.ts               # App configuration
```

### Key Features to Implement
- **Authentication**: JWT-based login/logout
- **QR Scanning**: Camera permissions and barcode scanning
- **Geolocation**: GPS validation with Haversine distance calculation
- **Offline Storage**: SQLite/AsyncStorage for local attendance records
- **Background Sync**: Automatic data synchronization when online
- **Push Notifications**: Attendance confirmations and alerts

## 8. Shared Types and Interfaces

**Location**: `types/` (shared types library)

Create a shared types library for type safety across all applications:

```
types/
├── src/
│   ├── interfaces/
│   │   ├── user.ts
│   │   ├── course.ts
│   │   ├── attendance.ts
│   │   └── qr-session.ts
│   ├── enums/
│   │   ├── role.ts
│   │   ├── attendance-status.ts
│   │   └── notification-type.ts
│   └── index.ts                # Barrel exports
├── package.json
├── tsconfig.json
└── dist/                       # Built output
```

Example interfaces:

```typescript
// types/src/interfaces/user.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  institutionId: string;
  createdAt: Date;
}

// types/src/enums/role.ts
export enum Role {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  PARENT = 'PARENT'
}
```

**Integration**: Each package (backend, frontend, mobile) should reference this types library via relative imports or by building and copying the dist folder.

## 9. QR Dynamic Generation Strategy

QR tokens contain encrypted data:
```json
{
  "token": "unique-session-id",
  "courseId": "course-uuid",
  "timestamp": 1640995200,
  "exp": 1640995260
}
```

**Security Features**:
- 30-60 second expiration
- One-time use validation
- HMAC-SHA256 signing
- Automatic cleanup of expired sessions

**Generation Flow**:
1. Teacher requests QR via web dashboard
2. Backend generates signed token
3. Token stored in database with expiration
4. QR displayed in classroom
5. Students scan and submit with GPS data

## 10. Geofencing Validation

Uses **Haversine formula** for distance calculation:

```typescript
function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
}
```

**Validation Rules**:
- Distance ≤ 50 meters = VALID
- Distance > 50 meters = INVALID_LOCATION
- GPS accuracy check required

## 11. Offline Synchronization Strategy

**Mobile Offline Flow**:
1. Student scans QR offline
2. Record stored locally with `pending_sync` status
3. Background service monitors connectivity
4. When online, batch sync pending records
5. Update local status to `synced`

**Local Storage Schema**:
```typescript
interface PendingAttendance {
  id: string;
  qrToken: string;
  timestamp: Date;
  latitude: number;
  longitude: number;
  synced: boolean;
  retryCount: number;
}
```

**Sync Algorithm**:
- Exponential backoff for retries
- Conflict resolution (server wins)
- Batch processing for efficiency

## 12. Authentication & Security

**JWT + Refresh Token Strategy**:
- Access Token: 15 minutes
- Refresh Token: 7 days (stored in DB)
- Automatic token rotation

**Security Measures**:
- HTTPS required
- Rate limiting
- Input validation with DTOs
- SQL injection prevention via Prisma
- Audit logging
- Device fingerprinting

**Multi-Tenant Support**:
- Institution-scoped queries
- Row-level security
- Institution-based access control

## 13. Docker & Deployment

**Current Docker Setup** (minimal):
```
docker/
└── postgres/  # PostgreSQL container config
```

**Required Docker Compose**:
```yaml
# docker-compose.yml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: qr_attendance
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./backend
    ports:
      - "3000:3000"
    depends_on:
      - postgres
    environment:
      DATABASE_URL: postgresql://postgres:password@postgres:5432/qr_attendance

volumes:
  postgres_data:
```

**Deployment Strategy**:
- Backend: Docker container on cloud (AWS/GCP/Azure)
- Frontend: Vercel/Netlify static hosting
- Mobile: Expo EAS Build for app stores
- Database: Managed PostgreSQL (RDS/Cloud SQL)

## 14. CI/CD Pipeline

**GitHub Actions Workflow** (to be created: `.github/workflows/ci.yml`):

```yaml
name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '23'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm --filter backend lint
      - run: pnpm --filter backend test
      - run: pnpm --filter backend build

  frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm --filter frontend build

  mobile:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm --filter mobile lint
```

## 15. Implementation Roadmap

### Phase 1: Core Infrastructure (Current: ~25% Complete)
- [x] Set up pnpm workspace
- [x] Initialize NestJS backend with basic modules
- [x] Set up Astro frontend
- [x] Configure Expo mobile app
- [x] Create Prisma schema and migrations
- [x] Add shared types package
- [x] Set up Docker environment

### Phase 2: Core Features (Target: 60% Complete)
- [ ] Implement QR generation and validation
- [ ] Add geofencing validation
- [ ] Build admin dashboard (QR panel, attendance reports)
- [ ] Implement mobile QR scanning
- [ ] Add GPS location services
- [ ] Create API integration layer
- [ ] Implement offline storage and sync

### Phase 3: Advanced Features (Target: 100% Complete)
- [ ] Add multi-tenant support (institutions)
- [ ] Implement push notifications
- [ ] Add course and user management
- [ ] Create comprehensive reporting
- [ ] Add analytics dashboard
- [ ] Implement CI/CD pipeline
- [ ] Add monitoring and logging

### Phase 4: Production & Scale
- [ ] Security hardening
- [ ] Performance optimization
- [ ] Load testing
- [ ] Documentation completion
- [ ] Deployment automation

## 16. Development Commands

**Root Commands**:
```bash
# Install all dependencies
pnpm install

# Run all tests
pnpm test

# Build all packages
pnpm build
```

**Backend**:
```bash
cd backend
pnpm start:dev    # Development server
pnpm test         # Run tests
pnpm build        # Build for production
```

**Frontend**:
```bash
cd frontend
pnpm dev          # Development server
pnpm build        # Build for production
pnpm preview      # Preview production build
```

**Mobile**:
```bash
cd mobile
pnpm start        # Expo development server
pnpm android      # Run on Android
pnpm ios          # Run on iOS
```

## 17. Testing Strategy

**Backend Testing**:
- Unit tests for services and controllers
- Integration tests for API endpoints
- E2E tests for critical flows

**Frontend Testing**:
- Component testing with Astro's testing utilities
- E2E testing with Playwright

**Mobile Testing**:
- Unit tests for hooks and utilities
- Integration tests for API calls
- E2E tests with Detox

## 18. Monitoring & Observability

**Tools to Implement**:
- **Logging**: Pino for structured logging
- **Monitoring**: Prometheus + Grafana
- **Error Tracking**: Sentry
- **Performance**: Application Insights

**Key Metrics**:
- API response times
- QR generation success rate
- Attendance validation accuracy
- Mobile app crash rates
- Database query performance

## Conclusion

This unified architecture document provides a comprehensive roadmap for building the QR-Attendance System. The current implementation is in its early stages (~20% complete), with solid foundations in place using modern technologies.

Key priorities for immediate development:
1. Complete Prisma database setup
2. Implement QR generation and validation
3. Build core mobile scanning functionality
4. Create admin dashboard
5. Add offline synchronization

The architecture supports scalability, security, and maintainability while following industry best practices for full-stack development.</content>
<parameter name="filePath">c:\Users\Octav\OneDrive\Desktop\Dev\qr-attendance-system\qr-attendance-unified-architecture.md
