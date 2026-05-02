import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import type { Role } from '../generated/prisma/client.js';
import { UsersService } from './users.service.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  async listUsers() {
    return this.usersService.listUsers();
  }

  @Post()
  async createUser(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('role') role: string,
    @Body('institutionId') institutionId?: string,
  ) {
    return this.usersService.createUser(
      name,
      email,
      role as Role,
      institutionId,
    );
  }

  @Post(':id/institutions')
  async assignInstitution(
    @Param('id') id: string,
    @Body('institutionId') institutionId: string,
  ) {
    return this.usersService.assignInstitution(id, institutionId);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }
}
