import { Body, Controller, Get, Post } from '@nestjs/common';
import { InstitutionsService } from './institutions.service.js';

@Controller('institutions')
export class InstitutionsController {
  constructor(private readonly institutionsService: InstitutionsService) { }

  @Get()
  async listInstitutions() {
    return this.institutionsService.listInstitutions();
  }

  @Get('teacher/:teacherId')
  async listInstitutionsByTeacher() {
    return this.institutionsService.listInstitutions();
  }

  @Post()
  async createInstitution(@Body('name') name: string) {
    return this.institutionsService.createInstitution(name);
  }
}
