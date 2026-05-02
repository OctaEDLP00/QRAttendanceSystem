import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { QrService } from './qr.service.js';

@Controller('qr')
export class QrController {
  constructor(private readonly qrService: QrService) { }

  @Post('session')
  async createSession(@Body('courseId') courseId: string) {
    return this.qrService.createSession(courseId);
  }

  @Post('student/:studentId/course/:courseId')
  async createStudentSession(
    @Param('studentId') studentId: string,
    @Param('courseId') courseId: string,
  ) {
    return this.qrService.createStudentSession(studentId, courseId);
  }

  @Get('session/:courseId')
  async getActiveSession(@Param('courseId') courseId: string) {
    return this.qrService.getActiveSession(courseId);
  }

  @Delete('session/:id')
  async expireSession(@Param('id') id: string) {
    return this.qrService.expireSession(id);
  }
}
