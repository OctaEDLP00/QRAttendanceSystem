// backend/types/interfaces/qr-session.ts
export interface QRSession {
  id: string;
  courseId: string;
  studentId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}
