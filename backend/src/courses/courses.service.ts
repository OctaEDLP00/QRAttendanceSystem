import { Injectable, NotFoundException } from '@nestjs/common';
import type { Course, Institution, User } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) { }

  async listCourses(): Promise<
    (Course & { teacher: User; institution: Institution })[]
  > {
    return this.prisma.course.findMany({
      include: { teacher: true, institution: true },
    });
  }

  async listCoursesByTeacher(teacherId: string): Promise<Course[]> {
    return this.prisma.course.findMany({
      where: { teacherId },
    });
  }

  async listCoursesByInstitutionIds(
    institutionIds: string[],
  ): Promise<Course[]> {
    return this.prisma.course.findMany({
      where: { institutionId: { in: institutionIds } },
    });
  }

  async createCourse(
    name: string,
    teacherId: string,
    institutionId: string,
  ): Promise<Course> {
    return this.prisma.course.create({
      data: { name, teacherId, institutionId },
    });
  }

  async getCourse(id: string): Promise<Course> {
    const course = await this.prisma.course.findUnique({
      where: { id },
    });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
  }
}
