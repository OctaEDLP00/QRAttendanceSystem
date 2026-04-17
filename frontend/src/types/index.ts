// frontend/src/types/index.ts - Shared types from backend

// Re-export types from backend
export enum Role {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  PARENT = 'PARENT',
}

export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  LATE = 'LATE',
  ABSENT = 'ABSENT',
  INVALID_LOCATION = 'INVALID_LOCATION',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  institutionId?: string;
  institutionIds?: string[];
  createdAt: Date;
}

export interface Course {
  id: string;
  name: string;
  teacherId: string;
  institutionId: string;
  createdAt: Date;
}

export interface Attendance {
  id: string;
  studentId: string;
  courseId: string;
  status: AttendanceStatus;
  latitude: number;
  longitude: number;
  timestamp: Date;
}

export interface Institution {
  id: string;
  name: string;
  createdAt: Date;
}

export interface QRSession {
  id: string;
  courseId: string;
  studentId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginResponse {
  user: User;
  tokens: AuthToken;
}

export interface ApiError {
  status: number;
  message: string;
}

export type ApiResponse<T> =
  | { success: true; data: T; status: number }
  | { success: false; error: ApiError };
