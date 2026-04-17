import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CoursesService } from '~/courses/courses.service';
import { InstitutionsService } from '~/institutions/institutions.service';

@Controller('institutions')
export class InstitutionsController {
  constructor(
    private readonly institutionsService: InstitutionsService,
    private readonly coursesService: CoursesService,
  ) { }

  @Get()
  listInstitutions() {
    return this.institutionsService.listInstitutions();
  }

  @Get('teacher/:teacherId')
  listInstitutionsByTeacher(@Param('teacherId') teacherId: string) {
    const courses = this.coursesService.listCoursesByTeacher(teacherId);
    const institutionIds = Array.from(new Set(courses.map(course => course.institutionId)));
    return this.institutionsService.getInstitutionsByIds(institutionIds);
  }

  @Post()
  createInstitution(@Body('name') name: string) {
    return this.institutionsService.createInstitution(name);
  }
}
