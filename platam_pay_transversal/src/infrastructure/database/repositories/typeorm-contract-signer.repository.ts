import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type {
  ContractSignerRepositoryPort,
  CreateContractSignerPayload,
} from '@persons/domain/ports/contract-signer.repository.port';
import { ContractSigner } from '@persons/domain/models/contract-signer.model';
import { ContractSignerEntity } from '@libs/database';
import { ContractSignerMapper } from '../mappers/persons/contract-signer.mapper';

@Injectable()
export class TypeOrmContractSignerRepository
  implements ContractSignerRepositoryPort
{
  constructor(
    @InjectRepository(ContractSignerEntity)
    private readonly repository: Repository<ContractSignerEntity>,
  ) {}

  async findAll(): Promise<ContractSigner[]> {
    const entities = await this.repository.find({
      order: { contractId: 'ASC', id: 'ASC' },
    });
    return entities.map(ContractSignerMapper.toDomain);
  }

  async findById(id: number): Promise<ContractSigner | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? ContractSignerMapper.toDomain(entity) : null;
  }

  async findByExternalId(externalId: string): Promise<ContractSigner | null> {
    const entity = await this.repository.findOne({ where: { externalId } });
    return entity ? ContractSignerMapper.toDomain(entity) : null;
  }

  async findByContractId(contractId: number): Promise<ContractSigner[]> {
    const entities = await this.repository.find({
      where: { contractId },
      order: { id: 'ASC' },
    });
    return entities.map(ContractSignerMapper.toDomain);
  }

  async findByPersonId(personId: number): Promise<ContractSigner[]> {
    const entities = await this.repository.find({
      where: { personId },
      order: { contractId: 'ASC' },
    });
    return entities.map(ContractSignerMapper.toDomain);
  }

  async create(
    payload: CreateContractSignerPayload,
  ): Promise<ContractSigner> {
    const entity = ContractSignerMapper.toCreateEntity(payload);
    const saved = await this.repository.save(entity);
    return ContractSignerMapper.toDomain(saved);
  }
}
