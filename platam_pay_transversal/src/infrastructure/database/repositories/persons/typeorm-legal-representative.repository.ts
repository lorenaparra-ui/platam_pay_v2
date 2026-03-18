import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type {
  CreateLegalRepresentativePayload,
  LegalRepresentativeRepositoryPort,
} from '@persons/domain/ports/legal-representative.repository.port';
import { LegalRepresentative } from '@persons/domain/models/legal-representative.model';
import { LegalRepresentativeEntity } from '@libs/database';
import { LegalRepresentativeMapper } from '../mappers/persons/legal-representative.mapper';

@Injectable()
export class TypeOrmLegalRepresentativeRepository
  implements LegalRepresentativeRepositoryPort
{
  constructor(
    @InjectRepository(LegalRepresentativeEntity)
    private readonly repository: Repository<LegalRepresentativeEntity>,
  ) {}

  async findAll(): Promise<LegalRepresentative[]> {
    const entities = await this.repository.find({
      order: { companyId: 'ASC', personId: 'ASC' },
    });
    return entities.map(LegalRepresentativeMapper.toDomain);
  }

  async findById(id: number): Promise<LegalRepresentative | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? LegalRepresentativeMapper.toDomain(entity) : null;
  }

  async findByExternalId(externalId: string): Promise<LegalRepresentative | null> {
    const entity = await this.repository.findOne({ where: { externalId } });
    return entity ? LegalRepresentativeMapper.toDomain(entity) : null;
  }

  async findByCompanyId(companyId: number): Promise<LegalRepresentative[]> {
    const entities = await this.repository.find({
      where: { companyId },
      order: { isPrimary: 'DESC', personId: 'ASC' },
    });
    return entities.map(LegalRepresentativeMapper.toDomain);
  }

  async findByPersonId(personId: number): Promise<LegalRepresentative[]> {
    const entities = await this.repository.find({
      where: { personId },
      order: { companyId: 'ASC' },
    });
    return entities.map(LegalRepresentativeMapper.toDomain);
  }

  async create(
    payload: CreateLegalRepresentativePayload,
  ): Promise<LegalRepresentative> {
    const entity = LegalRepresentativeMapper.toCreateEntity(payload);
    const saved = await this.repository.save(entity);
    return LegalRepresentativeMapper.toDomain(saved);
  }
}
