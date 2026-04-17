import { Module } from '@nestjs/common';
import { AttendanceModule } from './attendance/attendance.module';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { InstitutionsModule } from './institutions/institutions.module';
import { QrModule } from './qr/qr.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
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
