import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StatusEntity } from '../entities/status.entity';
import { StatusRepositoryPort } from '../../../modules/transversal/domain/ports/status.repository.port';
import { Status } from '../../../modules/transversal/domain/models/status.model';
import { StatusMapper } from '../mappers/status.mapper';

@Injectable()
export class TypeOrmStatusRepository implements StatusRepositoryPort {
  constructor(
    @InjectRepository(StatusEntity)
    private readonly repository: Repository<StatusEntity>,
  ) {}

  async findAll(): Promise<Status[]> {
    const entities = await this.repository.find({
      order: { entityType: 'ASC', code: 'ASC' },
    });
    return entities.map(StatusMapper.toDomain);
  }

  async findById(id: number): Promise<Status | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? StatusMapper.toDomain(entity) : null;
  }

  async findByExternalId(externalId: string): Promise<Status | null> {
    const entity = await this.repository.findOne({ where: { externalId } });
    return entity ? StatusMapper.toDomain(entity) : null;
  }

  async findByEntityTypeAndCode(entityType: string, code: string): Promise<Status | null> {
    const entity = await this.repository.findOne({
      where: { entityType, code },
    });
    return entity ? StatusMapper.toDomain(entity) : null;
  }

  async findByEntityType(entityType: string): Promise<Status[]> {
    const entities = await this.repository.find({
      where: { entityType, isActive: true },
      order: { code: 'ASC' },
    });
    return entities.map(StatusMapper.toDomain);
  }
}
