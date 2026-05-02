import { Injectable, NotFoundException } from '@nestjs/common';
import type { Institution } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class InstitutionsService {
  constructor(private prisma: PrismaService) { }

  async listInstitutions(): Promise<Institution[]> {
    return this.prisma.institution.findMany();
  }

  async getInstitutionsByIds(ids: string[]): Promise<Institution[]> {
    return this.prisma.institution.findMany({
      where: { id: { in: ids } },
    });
  }

  async createInstitution(name: string): Promise<Institution> {
    return this.prisma.institution.create({
      data: { name },
    });
  }

  async getInstitution(id: string): Promise<Institution> {
    const institution = await this.prisma.institution.findUnique({
      where: { id },
    });
    if (!institution) {
      throw new NotFoundException('Institution not found');
    }
    return institution;
  }
}
