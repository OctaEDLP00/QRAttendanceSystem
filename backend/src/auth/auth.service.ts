import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

@Injectable()
export class AuthService {
  login(email: string, password: string) {
    return {
      accessToken: randomUUID(),
      refreshToken: randomUUID(),
      expiresIn: 60 * 60 * 24,
      user: { email },
    };
  }

  refresh(refreshToken: string) {
    return {
      accessToken: randomUUID(),
      expiresIn: 900,
      refreshToken,
    };
  }

  logout() {
    return { success: true };
  }
}
