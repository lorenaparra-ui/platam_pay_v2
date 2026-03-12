import { DataSource, Repository } from "typeorm";
import { CreatePartnerCategoryPayload, PartnerCategoryRepositoryPort, UpdatePartnerCategoryPayload } from "@partner-categories/domain/ports/partner-category.repository.port";
import { PartnerCategory } from "@partner-categories/domain/models/partner-category.model";
import { PartnerCategoriesEntity } from "@infrastructure/database/entities/partner-categories.entity";
import { PartnersEntity } from "@infrastructure/database/entities/partners.entity";
export declare class TypeOrmPartnerCategoriesRepository implements PartnerCategoryRepositoryPort {
    private readonly categoriesRepository;
    private readonly partnersRepository;
    private readonly dataSource;
    constructor(categoriesRepository: Repository<PartnerCategoriesEntity>, partnersRepository: Repository<PartnersEntity>, dataSource: DataSource);
    findAll(partnerExternalId?: string): Promise<PartnerCategory[]>;
    findByExternalId(externalId: string): Promise<PartnerCategory | null>;
    findByPartnerExternalId(partnerExternalId: string): Promise<PartnerCategory[]>;
    create(payload: CreatePartnerCategoryPayload): Promise<PartnerCategory | null>;
    updateByExternalId(externalId: string, payload: UpdatePartnerCategoryPayload): Promise<PartnerCategory | null>;
    deleteByExternalId(externalId: string): Promise<boolean>;
    private ensurePartnerCategoryStatusId;
    private statusIdBelongsToEntity;
}
