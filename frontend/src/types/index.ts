// Shared types for the QR Attendance System
// Based on Prisma schema models

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
  password?: string | null;
  role: Role;
  institutionId?: string | null;
  createdAt: Date | string;
}

export interface Institution {
  id: string;
  name: string;
  createdAt: Date | string;
}

export interface Course {
  id: string;
  name: string;
  teacherId: string;
  institutionId: string;
  createdAt: Date | string;
}

export interface Attendance {
  id: string;
  studentId: string;
  courseId: string;
  status: AttendanceStatus;
  latitude: number;
  longitude: number;
  timestamp: Date | string;
}

export interface QRSession {
  id: string;
  courseId: string;
  studentId?: string | null;
  token: string;
  expiresAt: Date | string;
  createdAt: Date | string;
}

// Auth types
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: User;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: Role;
}

// API response types
export interface ApiError {
  error: string;
  message?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

// Course creation
export interface CreateCourseRequest {
  name: string;
  institutionId: string;
  teacherId: string;
}

// Attendance registration
export interface RegisterAttendanceRequest {
  studentId: string;
  courseId: string;
  latitude: number;
  longitude: number;
}

// QR generation
export interface CreateQRSessionRequest {
  courseId: string;
}

export interface ScanQRRequest {
  qrToken: string;
  courseId: string;
  latitude: number;
  longitude: number;
}