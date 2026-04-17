import { Module } from '@nestjs/common';
import { AttendanceController } from '~/attendance/attendance.controller';
import { AttendanceService } from '~/attendance/attendance.service';
import { QrModule } from '~/qr/qr.module';

@Module({
  imports: [QrModule],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule { }
