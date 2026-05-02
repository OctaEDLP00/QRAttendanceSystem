import { Injectable, NotFoundException } from '@nestjs/common';
import type { QRSession } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class QrService {
  constructor(private prisma: PrismaService) { }

  async createSession(courseId: string): Promise<QRSession> {
    await this.prisma.qRSession.updateMany({
      where: { courseId, expiresAt: { gt: new Date() } },
      data: { expiresAt: new Date() },
    });

    return this.prisma.qRSession.create({
      data: {
        courseId,
        token: crypto.randomUUID(),
        expiresAt: new Date(Date.now() + 60_000),
      },
    });
  }

  async createStudentSession(
    studentId: string,
    courseId: string,
  ): Promise<QRSession> {
    await this.prisma.qRSession.updateMany({
      where: { courseId, studentId, expiresAt: { gt: new Date() } },
      data: { expiresAt: new Date() },
    });

    return this.prisma.qRSession.create({
      data: {
        courseId,
        studentId,
        token: crypto.randomUUID(),
        expiresAt: new Date(Date.now() + 60_000),
      },
    });
  }

  async getActiveSession(courseId: string): Promise<QRSession> {
    const session = await this.prisma.qRSession.findFirst({
      where: {
        courseId,
        expiresAt: { gt: new Date() },
      },
    });

    if (!session) {
      throw new NotFoundException('No active QR session found for this course');
    }

    return session;
  }

  async getSessionByToken(courseId: string, token: string): Promise<QRSession> {
    const session = await this.prisma.qRSession.findFirst({
      where: {
        courseId,
        token,
        expiresAt: { gt: new Date() },
      },
    });

    if (!session) {
      throw new NotFoundException('Invalid or expired QR session');
    }

    return session;
  }

  async expireSession(id: string): Promise<{ success: boolean }> {
    await this.prisma.qRSession.update({
      where: { id },
      data: { expiresAt: new Date() },
    });
    return { success: true };
  }
}
