import { AttendanceStatus } from "../enums/attendance-status.js";

// types/src/interfaces/attendance.ts
export interface Attendance {
  id: string;
  studentId: string;
  courseId: string;
  status: AttendanceStatus;
  latitude: number;
  longitude: number;
  timestamp: Date;
}
