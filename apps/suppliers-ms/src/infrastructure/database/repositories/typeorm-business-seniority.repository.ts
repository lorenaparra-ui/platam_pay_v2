import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessSeniorityEntity } from '@app/suppliers-data';
import {
  BusinessSeniorityItem,
  BusinessSeniorityRepository,
} from '@modules/businesses/domain/repositories/business-seniority.repository';

@Injectable()
export class TypeormBusinessSeniorityRepository implements BusinessSeniorityRepository {
  constructor(
    @InjectRepository(BusinessSeniorityEntity)
    private readonly repo: Repository<BusinessSeniorityEntity>,
  ) {}

  async find_all(): Promise<BusinessSeniorityItem[]> {
    const rows = await this.repo.find({
      select: { externalId: true, description: true, rangeStart: true, rangeEnd: true },
      order: { rangeStart: 'ASC' },
    });
    return rows.map((r) => ({
      externalId: r.externalId,
      description: r.description,
      rangeStart: r.rangeStart,
      rangeEnd: r.rangeEnd,
    }));
  }
}
