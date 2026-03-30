import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StatusEntity } from '@app/transversal-data';
import type { StatusRepository } from '@modules/transversal/catalog/domain/ports/status.repository.port';
import type { StatusRef } from '@modules/transversal/catalog/domain/models/status.models';

const STATUS_REF_SELECT = {
  id: true,
  externalId: true,
} as const;

@Injectable()
export class TypeormStatusRepository implements StatusRepository {
  constructor(
    @InjectRepository(StatusEntity)
    private readonly repo: Repository<StatusEntity>,
  ) {}

  async find_by_external_id(external_id: string): Promise<StatusRef | null> {
    const row = await this.repo.findOne({
      where: { externalId: external_id },
      select: STATUS_REF_SELECT,
    });
    return row
      ? { id: row.id, external_id: row.externalId }
      : null;
  }

  async find_by_internal_id(internal_id: number): Promise<StatusRef | null> {
    const row = await this.repo.findOne({
      where: { id: internal_id },
      select: STATUS_REF_SELECT,
    });
    return row
      ? { id: row.id, external_id: row.externalId }
      : null;
  }
}
