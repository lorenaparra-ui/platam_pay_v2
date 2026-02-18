import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreditApplicationBnpl } from '@transversal/domain/models/credit-application-bnpl.model';
import { CreditApplicationBnplRepositoryPort } from '@transversal/domain/ports/credit-application-bnpl.repository.port';
import { CreditApplicationBnplEntity } from '../entities/credit-application-bnpl.entity';
import { CreditApplicationBnplMapper } from '../mappers/credit-application-bnpl.mapper';

@Injectable()
export class TypeOrmCreditApplicationBnplRepository implements CreditApplicationBnplRepositoryPort {
  constructor(
    @InjectRepository(CreditApplicationBnplEntity)
    private readonly repository: Repository<CreditApplicationBnplEntity>,
  ) {}

  async findAll(): Promise<CreditApplicationBnpl[]> {
    const entities = await this.repository.find({
      order: { id: 'DESC' },
    });
    return entities.map((entity) =>
      CreditApplicationBnplMapper.toDomain(entity),
    );
  }

  async findById(id: number): Promise<CreditApplicationBnpl | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? CreditApplicationBnplMapper.toDomain(entity) : null;
  }

  async findByExternalId(
    externalId: string,
  ): Promise<CreditApplicationBnpl | null> {
    const entity = await this.repository.findOne({ where: { externalId } });
    return entity ? CreditApplicationBnplMapper.toDomain(entity) : null;
  }
}
