import { Module } from '@nestjs/common';
import { CoursesModule } from '~/courses/courses.module';
import { InstitutionsController } from '~/institutions/institutions.controller';
import { InstitutionsService } from '~/institutions/institutions.service';

@Module({
  imports: [CoursesModule],
  controllers: [InstitutionsController],
  providers: [InstitutionsService],
  exports: [InstitutionsService],
})
export class InstitutionsModule { }
