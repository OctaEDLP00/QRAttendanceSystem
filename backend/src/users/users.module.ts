import { Module } from '@nestjs/common';
import { CoursesModule } from '../courses/courses.module.js';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';

@Module({
  imports: [CoursesModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
