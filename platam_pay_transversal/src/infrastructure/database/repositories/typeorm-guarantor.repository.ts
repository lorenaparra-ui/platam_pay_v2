import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type {
  CreateGuarantorPayload,
  GuarantorRepositoryPort,
} from '@persons/domain/ports/guarantor.repository.port';
import { Guarantor } from '@persons/domain/models/guarantor.model';
import { GuarantorEntity } from '../entities/guarantor.entity';
import { GuarantorMapper } from '../mappers/guarantor.mapper';

@Injectable()
export class TypeOrmGuarantorRepository implements GuarantorRepositoryPort {
  constructor(
    @InjectRepository(GuarantorEntity)
    private readonly repository: Repository<GuarantorEntity>,
  ) {}

  async findAll(): Promise<Guarantor[]> {
    const entities = await this.repository.find({
      order: { creditApplicationId: 'ASC', id: 'ASC' },
    });
    return entities.map(GuarantorMapper.toDomain);
  }

  async findById(id: number): Promise<Guarantor | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? GuarantorMapper.toDomain(entity) : null;
  }

  async findByExternalId(externalId: string): Promise<Guarantor | null> {
    const entity = await this.repository.findOne({ where: { externalId } });
    return entity ? GuarantorMapper.toDomain(entity) : null;
  }

  async findByCreditApplicationId(
    creditApplicationId: number,
  ): Promise<Guarantor[]> {
    const entities = await this.repository.find({
      where: { creditApplicationId },
      order: { isPrimaryGuarantor: 'DESC', id: 'ASC' },
    });
    return entities.map(GuarantorMapper.toDomain);
  }

  async findByPersonId(personId: number): Promise<Guarantor[]> {
    const entities = await this.repository.find({
      where: { personId },
      order: { creditApplicationId: 'ASC' },
    });
    return entities.map(GuarantorMapper.toDomain);
  }

  async create(payload: CreateGuarantorPayload): Promise<Guarantor> {
    const entity = GuarantorMapper.toCreateEntity(payload);
    const saved = await this.repository.save(entity);
    return GuarantorMapper.toDomain(saved);
  }
}
