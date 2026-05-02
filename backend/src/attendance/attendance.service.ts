import { Injectable } from '@nestjs/common';
import { type Attendance, AttendanceStatus } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) { }

  async register(
    studentId: string,
    courseId: string,
    latitude: number,
    longitude: number,
  ): Promise<Attendance> {
    return this.prisma.attendance.create({
      data: {
        studentId,
        courseId,
        latitude,
        longitude,
        status: AttendanceStatus.PRESENT,
      },
    });
  }

  async getCourseAttendance(courseId: string): Promise<Attendance[]> {
    return this.prisma.attendance.findMany({
      where: { courseId },
      include: { student: true },
    });
  }

  async getStudentHistory(studentId: string): Promise<Attendance[]> {
    return this.prisma.attendance.findMany({
      where: { studentId },
    });
  }
}
