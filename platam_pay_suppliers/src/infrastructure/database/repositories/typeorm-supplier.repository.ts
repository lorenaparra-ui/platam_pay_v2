import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Supplier } from "@suppliers/domain/models/supplier.model";
import {
  CreateSupplierPayload,
  SupplierRepositoryPort,
  UpdateSupplierPayload,
} from "@suppliers/domain/ports/supplier.repository.port";
import { SupplierEntity } from "../entities/supplier.entity";
import { SupplierMapper } from "../mappers/supplier.mapper";

@Injectable()
export class TypeOrmSupplierRepository implements SupplierRepositoryPort {
  constructor(
    @InjectRepository(SupplierEntity)
    private readonly repository: Repository<SupplierEntity>
  ) {}

  async findAll(): Promise<Supplier[]> {
    const entities = await this.repository.find({
      order: { createdAt: "DESC" },
    });
    return entities.map(SupplierMapper.toDomain);
  }

  async findById(id: number): Promise<Supplier | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? SupplierMapper.toDomain(entity) : null;
  }

  async findByExternalId(externalId: string): Promise<Supplier | null> {
    const entity = await this.repository.findOne({ where: { externalId } });
    return entity ? SupplierMapper.toDomain(entity) : null;
  }

  async findByBusinessId(businessId: number): Promise<Supplier | null> {
    const entity = await this.repository.findOne({ where: { businessId } });
    return entity ? SupplierMapper.toDomain(entity) : null;
  }

  async create(payload: CreateSupplierPayload): Promise<Supplier> {
    const partial = SupplierMapper.toCreateEntity(payload);
    const saved = await this.repository.save(partial as SupplierEntity);
    return SupplierMapper.toDomain(saved);
  }

  async updateByExternalId(
    externalId: string,
    payload: UpdateSupplierPayload
  ): Promise<Supplier | null> {
    const entity = await this.repository.findOne({ where: { externalId } });
    if (!entity) return null;
    if (payload.bankAccount !== undefined) entity.bankAccount = payload.bankAccount;
    const saved = await this.repository.save(entity);
    return SupplierMapper.toDomain(saved);
  }

  async deleteByExternalId(externalId: string): Promise<boolean> {
    const result = await this.repository.delete({ externalId });
    return (result.affected ?? 0) > 0;
  }
}
