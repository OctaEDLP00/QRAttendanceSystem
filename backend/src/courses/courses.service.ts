import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import type { Course } from '../../types/index';

@Injectable()
export class CoursesService {
  private courses: Course[] = [];

  listCourses(): Course[] {
    return this.courses;
  }

  listCoursesByTeacher(teacherId: string): Course[] {
    return this.courses.filter(course => course.teacherId === teacherId);
  }

  listCoursesByInstitutionIds(institutionIds: string[]): Course[] {
    return this.courses.filter(course => institutionIds.includes(course.institutionId));
  }

  createCourse(name: string, teacherId: string, institutionId: string): Course {
    const course: Course = {
      id: randomUUID(),
      name,
      teacherId,
      institutionId,
      createdAt: new Date(),
    };

    this.courses.push(course);
    return course;
  }

  getCourse(id: string): Course {
    const course = this.courses.find(item => item.id === id);
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
  }
}
