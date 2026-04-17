import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import type { QRSession } from '../../types/index';

interface QrSessionInternal extends QRSession {
  active: boolean;
}

@Injectable()
export class QrService {
  private sessions: QrSessionInternal[] = [];

  createSession(courseId: string): QRSession {
    const session: QrSessionInternal = {
      id: randomUUID(),
      courseId,
      studentId: '',
      token: randomUUID(),
      expiresAt: new Date(Date.now() + 60_000),
      createdAt: new Date(),
      active: true,
    };

    this.sessions = this.sessions.map(existing => {
      if (existing.courseId === courseId && !existing.studentId) {
        return { ...existing, active: false };
      }
      return existing;
    });

    this.sessions.push(session);
    const { active, ...publicSession } = session;
    return publicSession;
  }

  createStudentSession(studentId: string, courseId: string): QRSession {
    const session: QrSessionInternal = {
      id: randomUUID(),
      courseId,
      studentId,
      token: randomUUID(),
      expiresAt: new Date(Date.now() + 60_000),
      createdAt: new Date(),
      active: true,
    };

    this.sessions = this.sessions.map(existing => {
      if (existing.courseId === courseId && existing.studentId === studentId) {
        return { ...existing, active: false };
      }
      return existing;
    });

    this.sessions.push(session);
    const { active, ...publicSession } = session;
    return publicSession;
  }

  getActiveSession(courseId: string): QRSession {
    const session = this.sessions.find(
      session => session.courseId === courseId && session.active && session.expiresAt > new Date(),
    );

    if (!session) {
      throw new NotFoundException('No active QR session found for this course');
    }

    const { active, ...publicSession } = session;
    return publicSession;
  }

  getSessionByToken(courseId: string, token: string): QRSession {
    const session = this.sessions.find(
      session => session.courseId === courseId && session.token === token && session.active && session.expiresAt > new Date(),
    );

    if (!session) {
      throw new NotFoundException('Invalid or expired QR session');
    }

    const { active, ...publicSession } = session;
    return publicSession;
  }

  expireSession(id: string) {
    const session = this.sessions.find(session => session.id === id);
    if (!session) {
      throw new NotFoundException('QR session not found');
    }

    session.active = false;
    session.expiresAt = new Date();
    return { success: true };
  }
}
