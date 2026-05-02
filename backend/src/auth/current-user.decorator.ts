import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

export interface CurrentUserData {
  id: string;
  name: string;
  email: string;
  role: string;
  institutionId: string | null;
}

export const CurrentUser = createParamDecorator(
  (data: keyof CurrentUserData | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request.user as CurrentUserData;

    if (data) {
      return user[data];
    }
    return user;
  },
);
