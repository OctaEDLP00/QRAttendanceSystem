import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QrService } from '~/qr/qr.service';
import type { Attendance } from '../../types/index';
import { AttendanceService } from './attendance.service.js';

@Controller('attendance')
export class AttendanceController {
  constructor(
    private readonly attendanceService: AttendanceService,
    private readonly qrService: QrService,
  ) { }

  @Post('register')
  register(
    @Body('studentId') studentId: string,
    @Body('courseId') courseId: string,
    @Body('latitude') latitude: number,
    @Body('longitude') longitude: number,
  ): Attendance {
    return this.attendanceService.register(studentId, courseId, latitude, longitude);
  }

  @Post('scan')
  scanAttendance(
    @Body('qrToken') qrToken: string,
    @Body('courseId') courseId: string,
    @Body('latitude') latitude: number,
    @Body('longitude') longitude: number,
  ): Attendance {
    const session = this.qrService.getSessionByToken(courseId, qrToken);
    const attendance = this.attendanceService.register(session.studentId, courseId, latitude, longitude);
    this.qrService.expireSession(session.id);
    return attendance;
  }

  @Get('course/:id')
  getCourseAttendance(@Param('id') courseId: string): Attendance[] {
    return this.attendanceService.getCourseAttendance(courseId);
  }

  @Get('student/:id')
  getStudentHistory(@Param('id') studentId: string): Attendance[] {
    return this.attendanceService.getStudentHistory(studentId);
  }
}
