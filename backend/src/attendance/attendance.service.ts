import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import type { Attendance, AttendanceStatus } from '../../types/index';

@Injectable()
export class AttendanceService {
  private attendances: Attendance[] = [];

  register(
    studentId: string,
    courseId: string,
    latitude: number,
    longitude: number,
  ): Attendance {
    const record: Attendance = {
      id: randomUUID(),
      studentId,
      courseId,
      latitude,
      longitude,
      status: 'PRESENT' as AttendanceStatus,
      timestamp: new Date(),
    };

    this.attendances.push(record);
    return record;
  }

  getCourseAttendance(courseId: string): Attendance[] {
    return this.attendances.filter(record => record.courseId === courseId);
  }

  getStudentHistory(studentId: string): Attendance[] {
    return this.attendances.filter(record => record.studentId === studentId);
  }
}
