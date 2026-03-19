import { DataSource, Repository } from "typeorm";
import { Partner } from "@partners/domain/models/partner.model";
import { CreatePartnerPayload, PartnerRepositoryPort, PartnerStatusCode, UpdatePartnerPayload } from "@partners/domain/ports/partner.repository.port";
import { PartnersEntity } from "@libs/database";
export declare class TypeOrmPartnersRepository implements PartnerRepositoryPort {
    private readonly repository;
    private readonly dataSource;
    constructor(repository: Repository<PartnersEntity>, dataSource: DataSource);
    findAll(search?: string): Promise<Partner[]>;
    findById(id: number): Promise<Partner | null>;
    findByExternalId(externalId: string): Promise<Partner | null>;
    create(payload: CreatePartnerPayload): Promise<Partner>;
    updateByExternalId(externalId: string, payload: UpdatePartnerPayload): Promise<Partner | null>;
    deleteByExternalId(externalId: string): Promise<boolean>;
    setStatusByExternalId(externalId: string, statusCode: PartnerStatusCode): Promise<Partner | null>;
    private resolveStatusId;
    private ensurePartnerStatusId;
    private statusIdBelongsToEntity;
    private ensureBusinessIdExists;
}
