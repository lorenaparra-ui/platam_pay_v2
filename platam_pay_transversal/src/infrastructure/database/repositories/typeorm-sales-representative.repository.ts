import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type {
  CreateSalesRepresentativePayload,
  SalesRepresentativeRepositoryPort,
} from '@persons/domain/ports/sales-representative.repository.port';
import { SalesRepresentative } from '@persons/domain/models/sales-representative.model';
import { SalesRepresentativeEntity } from '../entities/sales-representative.entity';
import { SalesRepresentativeMapper } from '../mappers/sales-representative.mapper';

@Injectable()
export class TypeOrmSalesRepresentativeRepository
  implements SalesRepresentativeRepositoryPort
{
  constructor(
    @InjectRepository(SalesRepresentativeEntity)
    private readonly repository: Repository<SalesRepresentativeEntity>,
  ) {}

  async findAll(): Promise<SalesRepresentative[]> {
    const entities = await this.repository.find({
      order: { partnerId: 'ASC', id: 'ASC' },
    });
    return entities.map(SalesRepresentativeMapper.toDomain);
  }

  async findById(id: number): Promise<SalesRepresentative | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? SalesRepresentativeMapper.toDomain(entity) : null;
  }

  async findByExternalId(externalId: string): Promise<SalesRepresentative | null> {
    const entity = await this.repository.findOne({ where: { externalId } });
    return entity ? SalesRepresentativeMapper.toDomain(entity) : null;
  }

  async findByPartnerId(partnerId: number): Promise<SalesRepresentative[]> {
    const entities = await this.repository.find({
      where: { partnerId },
      order: { id: 'ASC' },
    });
    return entities.map(SalesRepresentativeMapper.toDomain);
  }

  async findByUserId(userId: number): Promise<SalesRepresentative | null> {
    const entity = await this.repository.findOne({ where: { userId } });
    return entity ? SalesRepresentativeMapper.toDomain(entity) : null;
  }

  async create(
    payload: CreateSalesRepresentativePayload,
  ): Promise<SalesRepresentative> {
    const partial = SalesRepresentativeMapper.toCreateEntity(payload);
    const saved = await this.repository.save(
      partial as SalesRepresentativeEntity,
    );
    return SalesRepresentativeMapper.toDomain(saved);
  }
}
