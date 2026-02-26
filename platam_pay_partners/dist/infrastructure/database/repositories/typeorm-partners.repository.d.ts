import { Repository } from "typeorm";
import { Partner } from "@partners/domain/models/partner.model";
import { PartnerRepositoryPort } from "@partners/domain/ports/partner.repository.port";
import { PartnersEntity } from "@infrastructure/database/entities/partners.entity";
export declare class TypeOrmPartnersRepository implements PartnerRepositoryPort {
    private readonly repository;
    constructor(repository: Repository<PartnersEntity>);
    findAll(): Promise<Partner[]>;
    findById(id: number): Promise<Partner | null>;
    findByExternalId(externalId: string): Promise<Partner | null>;
}
