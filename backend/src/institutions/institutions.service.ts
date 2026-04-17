import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import type { Institution } from '../../types/index';

@Injectable()
export class InstitutionsService {
  private institutions: Institution[] = [];

  listInstitutions(): Institution[] {
    return this.institutions;
  }

  getInstitutionsByIds(ids: string[]): Institution[] {
    return this.institutions.filter(institution => ids.includes(institution.id));
  }

  createInstitution(name: string): Institution {
    const institution: Institution = {
      id: randomUUID(),
      name,
      createdAt: new Date(),
    };

    this.institutions.push(institution);
    return institution;
  }

  getInstitution(id: string): Institution {
    const institution = this.institutions.find(item => item.id === id);
    if (!institution) {
      throw new NotFoundException('Institution not found');
    }
    return institution;
  }
}
