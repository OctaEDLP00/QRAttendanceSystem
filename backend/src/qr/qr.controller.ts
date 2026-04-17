import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import type { QRSession } from '../../types/index';
import { QrService } from './qr.service';

@Controller('qr')
export class QrController {
  constructor(private readonly qrService: QrService) { }

  @Post('session')
  createSession(@Body('courseId') courseId: string): QRSession {
    return this.qrService.createSession(courseId);
  }

  @Post('student/:studentId/course/:courseId')
  createStudentSession(
    @Param('studentId') studentId: string,
    @Param('courseId') courseId: string,
  ): QRSession {
    return this.qrService.createStudentSession(studentId, courseId);
  }

  @Get('session/:courseId')
  getActiveSession(@Param('courseId') courseId: string): QRSession {
    return this.qrService.getActiveSession(courseId);
  }

  @Delete('session/:id')
  expireSession(@Param('id') id: string) {
    return this.qrService.expireSession(id);
  }
}
