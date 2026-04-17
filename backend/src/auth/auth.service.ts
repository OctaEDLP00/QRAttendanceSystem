import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
  login(email: string, password: string) {
    return {
      accessToken: randomUUID(),
      refreshToken: randomUUID(),
      expiresIn: 900,
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
