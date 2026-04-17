import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import type { Role, User } from '../../types/index';

@Injectable()
export class UsersService {
  private users: User[] = [];

  listUsers(): User[] {
    return this.users;
  }

  createUser(
    name: string,
    email: string,
    role: Role,
    institutionId?: string,
    institutionIds: string[] = [],
  ): User {
    const user: User = {
      id: randomUUID(),
      name,
      email,
      role,
      institutionId,
      institutionIds,
      createdAt: new Date(),
    };

    this.users.push(user);
    return user;
  }

  assignInstitution(userId: string, institutionId: string): User {
    const user = this.getUser(userId);
    user.institutionIds = Array.from(new Set([...(user.institutionIds ?? []), institutionId]));
    return user;
  }

  getUser(id: string): User {
    const user = this.users.find(item => item.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
