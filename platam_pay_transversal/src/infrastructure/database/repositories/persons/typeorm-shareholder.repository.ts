import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type {
  CreateShareholderPayload,
  ShareholderRepositoryPort,
} from '@persons/domain/ports/shareholder.repository.port';
import { Shareholder } from '@persons/domain/models/shareholder.model';
import { ShareholderEntity } from '@libs/database';
import { ShareholderMapper } from '../mappers/persons/shareholder.mapper';

@Injectable()
export class TypeOrmShareholderRepository implements ShareholderRepositoryPort {
  constructor(
    @InjectRepository(ShareholderEntity)
    private readonly repository: Repository<ShareholderEntity>,
  ) {}

  async findAll(): Promise<Shareholder[]> {
    const entities = await this.repository.find({
      order: { companyId: 'ASC', evaluationOrder: 'ASC' },
    });
    return entities.map(ShareholderMapper.toDomain);
  }

  async findById(id: number): Promise<Shareholder | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? ShareholderMapper.toDomain(entity) : null;
  }

  async findByExternalId(externalId: string): Promise<Shareholder | null> {
    const entity = await this.repository.findOne({ where: { externalId } });
    return entity ? ShareholderMapper.toDomain(entity) : null;
  }

  async findByCompanyId(companyId: number): Promise<Shareholder[]> {
    const entities = await this.repository.find({
      where: { companyId },
      order: { evaluationOrder: 'ASC', id: 'ASC' },
    });
    return entities.map(ShareholderMapper.toDomain);
  }

  async findByPersonId(personId: number): Promise<Shareholder[]> {
    const entities = await this.repository.find({
      where: { personId },
      order: { companyId: 'ASC' },
    });
    return entities.map(ShareholderMapper.toDomain);
  }

  async create(payload: CreateShareholderPayload): Promise<Shareholder> {
    const entity = ShareholderMapper.toCreateEntity(payload);
    const saved = await this.repository.save(entity);
    return ShareholderMapper.toDomain(saved);
  }
}
