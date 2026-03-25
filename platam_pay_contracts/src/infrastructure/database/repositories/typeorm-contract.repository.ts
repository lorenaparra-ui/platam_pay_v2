import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ContractEntity } from "@libs/database";
import { Repository } from "typeorm";
import type {
  ContractRepositoryPort,
  CreateContractInput,
  MarkContractSignedInput,
} from "@contracts/domain/ports/contract.repository.port";
import type { Contract } from "@contracts/domain/models/contract.model";
import { ContractMapper } from "@infrastructure/database/mappers/contract.mapper";

@Injectable()
export class TypeOrmContractRepository implements ContractRepositoryPort {
  constructor(
    @InjectRepository(ContractEntity)
    private readonly repository: Repository<ContractEntity>,
  ) {}

  async create(input: CreateContractInput): Promise<Contract> {
    const entity = ContractMapper.toCreateEntity(input);
    const saved = await this.repository.save(entity);
    return ContractMapper.toDomain(saved);
  }

  async findByExternalId(externalId: string): Promise<Contract | null> {
    const entity = await this.repository.findOne({ where: { externalId } });
    return entity ? ContractMapper.toDomain(entity) : null;
  }

  async findByProviderToken(providerToken: string): Promise<Contract | null> {
    const entity = await this.repository.findOne({
      where: { zapsignToken: providerToken },
    });
    return entity ? ContractMapper.toDomain(entity) : null;
  }

  async updateSignedDataById(
    id: number,
    input: MarkContractSignedInput,
  ): Promise<Contract | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;
    ContractMapper.applySignedData(entity, input);
    const saved = await this.repository.save(entity);
    return ContractMapper.toDomain(saved);
  }

  async updateStatusById(id: number, statusId: number): Promise<Contract | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;
    entity.statusId = statusId;
    const saved = await this.repository.save(entity);
    return ContractMapper.toDomain(saved);
  }
}
