import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PurchaseOrder } from "@suppliers/domain/models/purchase-order.model";
import {
  CreatePurchaseOrderPayload,
  PurchaseOrderRepositoryPort,
} from "@suppliers/domain/ports/purchase-order.repository.port";
import { PurchaseOrderEntity } from "../entities/purchase-order.entity";
import { PurchaseOrderMapper } from "../mappers/purchase-order.mapper";

@Injectable()
export class TypeOrmPurchaseOrderRepository
  implements PurchaseOrderRepositoryPort
{
  constructor(
    @InjectRepository(PurchaseOrderEntity)
    private readonly repository: Repository<PurchaseOrderEntity>
  ) {}

  async findAll(): Promise<PurchaseOrder[]> {
    const entities = await this.repository.find({
      order: { createdAt: "DESC" },
    });
    return entities.map(PurchaseOrderMapper.toDomain);
  }

  async findById(id: number): Promise<PurchaseOrder | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? PurchaseOrderMapper.toDomain(entity) : null;
  }

  async findByExternalId(externalId: string): Promise<PurchaseOrder | null> {
    const entity = await this.repository.findOne({ where: { externalId } });
    return entity ? PurchaseOrderMapper.toDomain(entity) : null;
  }

  async findBySupplierId(supplierId: number): Promise<PurchaseOrder[]> {
    const entities = await this.repository.find({
      where: { supplierId },
      order: { createdAt: "DESC" },
    });
    return entities.map(PurchaseOrderMapper.toDomain);
  }

  async create(payload: CreatePurchaseOrderPayload): Promise<PurchaseOrder> {
    const partial = PurchaseOrderMapper.toCreateEntity(payload);
    const saved = await this.repository.save(
      partial as PurchaseOrderEntity
    );
    return PurchaseOrderMapper.toDomain(saved);
  }
}
