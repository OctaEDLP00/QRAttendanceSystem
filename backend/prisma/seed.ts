import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '@prisma/client/extension';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL!;

const pool = new Pool({ connectionString });
const adapter = new PrismaBetterSqlite3(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding database...');

  // Create default institution
  const institution = await prisma.institution.upsert({
    where: { id: 'default-institution' },
    update: {},
    create: {
      id: 'default-institution',
      name: 'Default Institution',
    },
  });

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@school.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@school.com',
      password: '$2b$10$dummy.hash.for.development.only', // Change in production
      role: 'ADMIN',
      institutionId: institution.id,
    },
  });

  // Create sample teacher
  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@school.com' },
    update: {},
    create: {
      name: 'John Teacher',
      email: 'teacher@school.com',
      password: '$2b$10$dummy.hash.for.development.only', // Change in production
      role: 'TEACHER',
      institutionId: institution.id,
    },
  });

  // Create sample student
  const student = await prisma.user.upsert({
    where: { email: 'student@school.com' },
    update: {},
    create: {
      name: 'Jane Student',
      email: 'student@school.com',
      password: '$2b$10$dummy.hash.for.development.only', // Change in production
      role: 'STUDENT',
      institutionId: institution.id,
    },
  });

  // Create sample course
  const course = await prisma.course.upsert({
    where: { id: 'sample-course-1' },
    update: {},
    create: {
      id: 'sample-course-1',
      name: 'Mathematics 101',
      teacherId: teacher.id,
      institutionId: institution.id,
    },
  });

  console.log('✅ Database seeded successfully');
  console.log('📊 Created:', {
    institution: institution.name,
    admin: admin.email,
    teacher: teacher.email,
    student: student.email,
    course: course.name,
  });
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
