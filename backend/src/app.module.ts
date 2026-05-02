import { Module } from '@nestjs/common';
import { AttendanceModule } from './attendance/attendance.module.js';
import { AuthModule } from './auth/auth.module.js';
import { CoursesModule } from './courses/courses.module.js';
import { InstitutionsModule } from './institutions/institutions.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { QrModule } from './qr/qr.module.js';
import { UsersModule } from './users/users.module.js';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    AttendanceModule,
    UsersModule,
    QrModule,
    CoursesModule,
    InstitutionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
