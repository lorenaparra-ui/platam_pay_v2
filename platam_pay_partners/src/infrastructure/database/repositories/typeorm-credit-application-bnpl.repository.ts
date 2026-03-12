import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreditApplicationBnpl } from "@credit-applications-bnpl/domain/models/credit-application-bnpl.model";
import {
  CreateCreditApplicationBnplPayload,
  CreditApplicationBnplRepositoryPort,
  UpdateCreditApplicationBnplPayload,
} from "@credit-applications-bnpl/domain/ports/credit-application-bnpl.repository.port";
import { CreditApplicationBnplEntity } from "../entities/credit-application-bnpl.entity";
import { CreditApplicationBnplMapper } from "../mappers/credit-application-bnpl.mapper";

@Injectable()
export class TypeOrmCreditApplicationBnplRepository
  implements CreditApplicationBnplRepositoryPort
{
  constructor(
    @InjectRepository(CreditApplicationBnplEntity)
    private readonly repository: Repository<CreditApplicationBnplEntity>,
  ) {}

  async findAll(): Promise<CreditApplicationBnpl[]> {
    const entities = await this.repository.find({ order: { id: "DESC" } });
    return entities.map(CreditApplicationBnplMapper.toDomain);
  }

  async findById(id: number): Promise<CreditApplicationBnpl | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? CreditApplicationBnplMapper.toDomain(entity) : null;
  }

  async findByExternalId(externalId: string): Promise<CreditApplicationBnpl | null> {
    const entity = await this.repository.findOne({ where: { externalId } });
    return entity ? CreditApplicationBnplMapper.toDomain(entity) : null;
  }

  async create(payload: CreateCreditApplicationBnplPayload): Promise<CreditApplicationBnpl> {
    const entity = CreditApplicationBnplMapper.toCreateEntity(payload);
    const saved = await this.repository.save(entity);
    const full = await this.repository.findOne({ where: { id: saved.id } });
    if (!full) throw new Error("Unexpected: credit application not found after create");
    return CreditApplicationBnplMapper.toDomain(full);
  }

  async updateByExternalId(
    externalId: string,
    payload: UpdateCreditApplicationBnplPayload,
  ): Promise<CreditApplicationBnpl | null> {
    const existing = await this.repository.findOne({ where: { externalId } });
    if (!existing) return null;
    const updated = CreditApplicationBnplMapper.applyUpdate(existing, payload);
    const saved = await this.repository.save(updated);
    return CreditApplicationBnplMapper.toDomain(saved);
  }

  async deleteByExternalId(externalId: string): Promise<boolean> {
    const result = await this.repository.delete({ externalId });
    return (result.affected ?? 0) > 0;
  }
}
