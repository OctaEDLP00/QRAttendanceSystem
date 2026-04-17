"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("@prisma/client");
const pg_1 = require("pg");
const connectionString = process.env.DATABASE_URL;
const pool = new pg_1.Pool({ connectionString });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    console.log('🌱 Seeding database...');
    const institution = await prisma.institution.upsert({
        where: { id: 'default-institution' },
        update: {},
        create: {
            id: 'default-institution',
            name: 'Default Institution',
        },
    });
    const admin = await prisma.user.upsert({
        where: { email: 'admin@school.com' },
        update: {},
        create: {
            name: 'Admin User',
            email: 'admin@school.com',
            password: '$2b$10$dummy.hash.for.development.only',
            role: 'ADMIN',
            institutionId: institution.id,
        },
    });
    const teacher = await prisma.user.upsert({
        where: { email: 'teacher@school.com' },
        update: {},
        create: {
            name: 'John Teacher',
            email: 'teacher@school.com',
            password: '$2b$10$dummy.hash.for.development.only',
            role: 'TEACHER',
            institutionId: institution.id,
        },
    });
    const student = await prisma.user.upsert({
        where: { email: 'student@school.com' },
        update: {},
        create: {
            name: 'Jane Student',
            email: 'student@school.com',
            password: '$2b$10$dummy.hash.for.development.only',
            role: 'STUDENT',
            institutionId: institution.id,
        },
    });
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
//# sourceMappingURL=seed.js.map