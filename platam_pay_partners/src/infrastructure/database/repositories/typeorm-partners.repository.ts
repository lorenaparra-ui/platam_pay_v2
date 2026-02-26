import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Partner } from "@partners/domain/models/partner.model";
import { PartnerRepositoryPort } from "@partners/domain/ports/partner.repository.port";
import { PartnersEntity } from "@infrastructure/database/entities/partners.entity";
import { PartnersMapper } from "@infrastructure/database/mappers/partners.mapper";

@Injectable()
export class TypeOrmPartnersRepository implements PartnerRepositoryPort {
  constructor(
    @InjectRepository(PartnersEntity)
    private readonly repository: Repository<PartnersEntity>,
  ) {}

  async findAll(): Promise<Partner[]> {
    const partners = await this.repository.find({
      order: { createdAt: "DESC" },
    });

    return partners.map((partner) => PartnersMapper.toDomain(partner));
  }

  async findById(id: number): Promise<Partner | null> {
    const partner = await this.repository.findOne({ where: { id } });
    if (!partner) {
      return null;
    }

    return PartnersMapper.toDomain(partner);
  }

  async findByExternalId(externalId: string): Promise<Partner | null> {
    const partner = await this.repository.findOne({ where: { externalId } });
    if (!partner) {
      return null;
    }

    return PartnersMapper.toDomain(partner);
  }
}
