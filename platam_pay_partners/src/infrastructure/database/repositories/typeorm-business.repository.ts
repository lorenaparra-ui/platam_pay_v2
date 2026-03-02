import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import type { BusinessRepositoryPort } from "../../../modules/businesses/domain/ports/business.repository.port";
import type { Business } from "../../../modules/businesses/domain/models/business.model";
import { BusinessEntity } from "../entities/business.entity";
import { BusinessMapper } from "../mappers/business.mapper";

@Injectable()
export class TypeOrmBusinessRepository implements BusinessRepositoryPort {
  constructor(
    @InjectRepository(BusinessEntity)
    private readonly repository: Repository<BusinessEntity>,
  ) {}

  async findAll(): Promise<Business[]> {
    const entities = await this.repository.find({
      order: { createdAt: "DESC" },
    });
    return entities.map((e) => BusinessMapper.toDomain(e));
  }

  async findById(id: number): Promise<Business | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? BusinessMapper.toDomain(entity) : null;
  }

  async findByExternalId(externalId: string): Promise<Business | null> {
    const entity = await this.repository.findOne({ where: { externalId } });
    return entity ? BusinessMapper.toDomain(entity) : null;
  }
}
