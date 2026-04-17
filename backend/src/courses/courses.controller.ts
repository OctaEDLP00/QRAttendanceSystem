import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import type { Course } from '../../types/index';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) { }

  @Get()
  listCourses(): Course[] {
    return this.coursesService.listCourses();
  }

  @Get('teacher/:teacherId')
  listCoursesByTeacher(@Param('teacherId') teacherId: string): Course[] {
    return this.coursesService.listCoursesByTeacher(teacherId);
  }

  @Post()
  createCourse(
    @Body('name') name: string,
    @Body('teacherId') teacherId: string,
    @Body('institutionId') institutionId: string,
  ): Course {
    return this.coursesService.createCourse(name, teacherId, institutionId);
  }

  @Get(':id')
  getCourse(@Param('id') id: string): Course {
    return this.coursesService.getCourse(id);
  }
}
