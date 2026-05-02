import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CoursesService } from './courses.service.js';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) { }

  @Get()
  async listCourses() {
    return this.coursesService.listCourses();
  }

  @Get('teacher/:teacherId')
  async listCoursesByTeacher(@Param('teacherId') teacherId: string) {
    return this.coursesService.listCoursesByTeacher(teacherId);
  }

  @Post()
  async createCourse(
    @Body('name') name: string,
    @Body('teacherId') teacherId: string,
    @Body('institutionId') institutionId: string,
  ) {
    return this.coursesService.createCourse(name, teacherId, institutionId);
  }

  @Get(':id')
  async getCourse(@Param('id') id: string) {
    return this.coursesService.getCourse(id);
  }
}
