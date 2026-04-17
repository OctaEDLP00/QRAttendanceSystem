import { Module } from '@nestjs/common';
import { CoursesModule } from '~/courses/courses.module';
import { UsersController } from '~/users/users.controller';
import { UsersService } from '~/users/users.service';

@Module({
  imports: [CoursesModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
