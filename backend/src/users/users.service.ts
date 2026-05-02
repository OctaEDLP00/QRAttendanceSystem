import { Injectable, NotFoundException } from '@nestjs/common';
import type { Role, User } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async listUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async createUser(
    name: string,
    email: string,
    role: Role,
    institutionId?: string,
  ): Promise<User> {
    return this.prisma.user.create({
      data: { name, email, role, institutionId: institutionId ?? null },
    });
  }

  async assignInstitution(
    userId: string,
    institutionId: string,
  ): Promise<User> {
    await this.getUser(userId);

    return this.prisma.user.update({
      where: { id: userId },
      data: { institutionId },
    });
  }

  async getUser(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
