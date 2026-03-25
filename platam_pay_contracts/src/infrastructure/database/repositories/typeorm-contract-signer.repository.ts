import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ContractSignerEntity } from "@libs/database";
import { Repository } from "typeorm";
import type {
  ContractSignerRepositoryPort,
  CreateContractSignerInput,
  MarkContractSignerSignedInput,
} from "@contracts/domain/ports/contract-signer.repository.port";
import type { ContractSigner } from "@contracts/domain/models/contract-signer.model";
import { ContractSignerMapper } from "@infrastructure/database/mappers/contract-signer.mapper";

@Injectable()
export class TypeOrmContractSignerRepository
  implements ContractSignerRepositoryPort
{
  constructor(
    @InjectRepository(ContractSignerEntity)
    private readonly repository: Repository<ContractSignerEntity>,
  ) {}

  async create(input: CreateContractSignerInput): Promise<ContractSigner> {
    const entity = ContractSignerMapper.toCreateEntity(input);
    const saved = await this.repository.save(entity);
    return ContractSignerMapper.toDomain(saved);
  }

  async findByProviderSignerToken(
    providerSignerToken: string,
  ): Promise<ContractSigner | null> {
    const entity = await this.repository.findOne({
      where: { zapsignSignerToken: providerSignerToken },
    });
    return entity ? ContractSignerMapper.toDomain(entity) : null;
  }

  async findByContractId(contractId: number): Promise<ContractSigner | null> {
    const entity = await this.repository.findOne({
      where: { contractId },
      order: { id: "DESC" },
    });
    return entity ? ContractSignerMapper.toDomain(entity) : null;
  }

  async updateSignedByProviderToken(
    providerSignerToken: string,
    input: MarkContractSignerSignedInput,
  ): Promise<ContractSigner | null> {
    const entity = await this.repository.findOne({
      where: { zapsignSignerToken: providerSignerToken },
    });
    if (!entity) return null;
    ContractSignerMapper.applySignedData(entity, input);
    const saved = await this.repository.save(entity);
    return ContractSignerMapper.toDomain(saved);
  }
}
