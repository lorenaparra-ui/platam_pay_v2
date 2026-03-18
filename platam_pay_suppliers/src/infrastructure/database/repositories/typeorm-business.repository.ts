import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Business } from '@businesses/domain/models/business.model';
import {
  BusinessRepositoryPort,
  CreateBusinessPayload,
  UpdateBusinessPayload,
} from '@businesses/domain/ports/business.repository.port';
import { BusinessEntity } from '@libs/database';
import { BusinessMapper } from '../mappers/business.mapper';

@Injectable()
export class TypeOrmBusinessRepository implements BusinessRepositoryPort {
  constructor(
    @InjectRepository(BusinessEntity)
    private readonly repository: Repository<BusinessEntity>,
  ) {}

  async findAll(): Promise<Business[]> {
    const entities = await this.repository.find({
      order: { id: 'DESC' },
    });
    return entities.map((e) => BusinessMapper.toDomain(e));
  }

  async findById(id: number): Promise<Business | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? BusinessMapper.toDomain(entity) : null;
  }

  async findByExternalId(externalId: string): Promise<Business | null> {
    const entity = await this.repository.findOne({ where: { externalId } });
    return entity ? BusinessMapper.toDomain(entity) : null;
  }

  async create(payload: CreateBusinessPayload): Promise<Business> {
    const entity = BusinessMapper.toCreateEntity(payload);
    const saved = await this.repository.save(entity);
    const full = await this.repository.findOne({ where: { id: saved.id } });
    if (!full) throw new Error('Unexpected: business not found after create');
    return BusinessMapper.toDomain(full);
  }

  async updateByExternalId(
    externalId: string,
    payload: UpdateBusinessPayload,
  ): Promise<Business | null> {
    const existing = await this.repository.findOne({ where: { externalId } });
    if (!existing) return null;
    const updated = BusinessMapper.applyUpdate(existing, payload);
    const saved = await this.repository.save(updated);
    return BusinessMapper.toDomain(saved);
  }

  async deleteByExternalId(externalId: string): Promise<boolean> {
    const result = await this.repository.delete({ externalId });
    return (result.affected ?? 0) > 0;
  }
}
