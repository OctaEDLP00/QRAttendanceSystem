import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { QrService } from '../qr/qr.service.js';
import { AttendanceService } from './attendance.service.js';

@Controller('attendance')
export class AttendanceController {
  constructor(
    private readonly attendanceService: AttendanceService,
    private readonly qrService: QrService,
  ) { }

  @Post('register')
  async register(
    @Body('studentId') studentId: string,
    @Body('courseId') courseId: string,
    @Body('latitude') latitude: number,
    @Body('longitude') longitude: number,
  ) {
    return this.attendanceService.register(
      studentId,
      courseId,
      latitude,
      longitude,
    );
  }

  @Post('scan')
  async scanAttendance(
    @Body('qrToken') qrToken: string,
    @Body('courseId') courseId: string,
    @Body('latitude') latitude: number,
    @Body('longitude') longitude: number,
  ) {
    const session = await this.qrService.getSessionByToken(courseId, qrToken);
    if (!session.studentId) {
      throw new NotFoundException('No student associated with this QR session');
    }
    const attendance = await this.attendanceService.register(
      session.studentId,
      courseId,
      latitude,
      longitude,
    );
    await this.qrService.expireSession(session.id);
    return attendance;
  }

  @Get('course/:id')
  async getCourseAttendance(@Param('id') courseId: string) {
    return this.attendanceService.getCourseAttendance(courseId);
  }

  @Get('student/:id')
  async getStudentHistory(@Param('id') studentId: string) {
    return this.attendanceService.getStudentHistory(studentId);
  }
}
