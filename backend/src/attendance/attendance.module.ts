import { Module } from '@nestjs/common';
import { QrModule } from '../qr/qr.module.js';
import { AttendanceController } from './attendance.controller.js';
import { AttendanceService } from './attendance.service.js';

@Module({
  imports: [QrModule],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule { }
