import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CoursesService } from '~/courses/courses.service';
import type { Role, User } from '../../types/index';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly coursesService: CoursesService,
  ) { }

  @Get()
  listUsers(): User[] {
    return this.usersService.listUsers();
  }

  @Post()
  createUser(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('role') role: string,
    @Body('institutionId') institutionId: string,
    @Body('institutionIds') institutionIds: string[] = [],
  ): User {
    return this.usersService.createUser(
      name,
      email,
      role as unknown as Role,
      institutionId,
      institutionIds,
    );
  }

  @Post(':id/institutions')
  assignInstitution(
    @Param('id') id: string,
    @Body('institutionId') institutionId: string,
  ): User {
    return this.usersService.assignInstitution(id, institutionId);
  }

  @Get(':id/institutions')
  listUserInstitutions(@Param('id') id: string): string[] {
    const user = this.usersService.getUser(id);
    return user.institutionIds ?? (user.institutionId ? [user.institutionId] : []);
  }

  @Get(':id/courses')
  listUserCourses(@Param('id') id: string) {
    const user = this.usersService.getUser(id);
    const institutionIds = user.institutionIds ?? (user.institutionId ? [user.institutionId] : []);
    return this.coursesService.listCoursesByInstitutionIds(institutionIds);
  }

  @Get(':id')
  getUser(@Param('id') id: string): User {
    return this.usersService.getUser(id);
  }
}
