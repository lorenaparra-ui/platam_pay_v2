import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, ILike, Repository } from "typeorm";
import { BadRequestException, Injectable } from "@nestjs/common";
import { Partner } from "@partners/domain/models/partner.model";
import {
  CreatePartnerPayload,
  PartnerRepositoryPort,
  PartnerStatusCode,
  UpdatePartnerPayload,
} from "@partners/domain/ports/partner.repository.port";
import { PartnersEntity } from "@infrastructure/database/entities/partners.entity";
import { PartnerCategoriesEntity } from "@infrastructure/database/entities/partner-categories.entity";
import { PartnersMapper } from "@infrastructure/database/mappers/partners.mapper";

@Injectable()
export class TypeOrmPartnersRepository implements PartnerRepositoryPort {
  constructor(
    @InjectRepository(PartnersEntity)
    private readonly repository: Repository<PartnersEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async findAll(search?: string): Promise<Partner[]> {
    const trimmedSearch = search?.trim();
    const where = trimmedSearch
      ? [{ acronym: ILike(`%${trimmedSearch}%`) }]
      : undefined;

    const partners = await this.repository.find({
      where,
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

  async create(payload: CreatePartnerPayload): Promise<Partner> {
    await this.ensureBusinessIdExists(payload.businessId);
    if (payload.statusId !== undefined) {
      await this.ensurePartnerStatusId(payload.statusId);
    }

    return this.dataSource.transaction(async (manager) => {
      const partnersRepository = manager.getRepository(PartnersEntity);
      const categoriesRepository = manager.getRepository(
        PartnerCategoriesEntity,
      );

      const createdPartner = await partnersRepository.save(
        partnersRepository.create({
          businessId: payload.businessId,
          acronym: payload.acronym,
          logoUrl: payload.logoUrl ?? null,
          coBrandingLogoUrl: payload.coBrandingLogoUrl ?? null,
          primaryColor: payload.primaryColor ?? null,
          secondaryColor: payload.secondaryColor ?? null,
          lightColor: payload.lightColor ?? null,
          salesRepRoleName: payload.salesRepRoleName ?? null,
          salesRepRoleNamePlural: payload.salesRepRoleNamePlural ?? null,
          notificationEmail: payload.notificationEmail ?? null,
          webhookUrl: payload.webhookUrl ?? null,
          sendSalesRepVoucher: payload.sendSalesRepVoucher ?? false,
          disbursementNotificationEmail:
            payload.disbursementNotificationEmail ?? null,
          defaultRepId: payload.defaultRepId ?? null,
          defaultCategoryId: payload.defaultCategoryId ?? null,
          statusId: payload.statusId,
        }),
      );

      if ((payload.categories?.length ?? 0) > 0) {
        const categoriesToCreate = payload.categories!.map((category) =>
          categoriesRepository.create({
            partnerId: createdPartner.id,
            name: category.name,
            discountPercentage: category.discountPercentage,
            interestRate: category.interestRate,
            disbursementFeePercent: category.disbursementFeePercent ?? null,
            minimumDisbursementFee: category.minimumDisbursementFee ?? null,
            delayDays: category.delayDays,
            termDays: category.termDays,
          }),
        );

        const createdCategories =
          await categoriesRepository.save(categoriesToCreate);
        if (
          payload.defaultCategoryId === undefined &&
          payload.defaultCategoryIndex !== undefined &&
          createdCategories[payload.defaultCategoryIndex] !== undefined
        ) {
          createdPartner.defaultCategoryId =
            createdCategories[payload.defaultCategoryIndex].id;
          await partnersRepository.save(createdPartner);
        }
      }

      return PartnersMapper.toDomain(createdPartner);
    });
  }

  async updateByExternalId(
    externalId: string,
    payload: UpdatePartnerPayload,
  ): Promise<Partner | null> {
    if (payload.businessId !== undefined) {
      await this.ensureBusinessIdExists(payload.businessId);
    }
    if (payload.statusId !== undefined) {
      await this.ensurePartnerStatusId(payload.statusId);
    }

    const existing = await this.repository.findOne({ where: { externalId } });
    if (!existing) {
      return null;
    }

    const sanitizedPayload = Object.fromEntries(
      Object.entries(payload).filter(([, value]) => value !== undefined),
    ) as Partial<PartnersEntity>;
    Object.assign(existing, sanitizedPayload);
    const updated = await this.repository.save(existing);
    return PartnersMapper.toDomain(updated);
  }

  async deleteByExternalId(externalId: string): Promise<boolean> {
    const result = await this.repository.delete({ externalId });
    return (result.affected ?? 0) > 0;
  }

  async setStatusByExternalId(
    externalId: string,
    statusCode: PartnerStatusCode,
  ): Promise<Partner | null> {
    const statusId = await this.resolveStatusId("partners", statusCode);
    if (!statusId) {
      return null;
    }

    const partner = await this.repository.findOne({ where: { externalId } });
    if (!partner) {
      return null;
    }

    partner.statusId = statusId;
    const updated = await this.repository.save(partner);
    return PartnersMapper.toDomain(updated);
  }

  private async resolveStatusId(
    entityType: string,
    code: string,
  ): Promise<number | null> {
    const rawResult: unknown = await this.dataSource.query(
      `SELECT id FROM statuses WHERE entity_type = $1 AND code = $2 AND is_active = true LIMIT 1`,
      [entityType, code],
    );

    if (!Array.isArray(rawResult) || rawResult[0] === undefined) {
      return null;
    }

    const rows = rawResult as unknown[];
    const firstRow: unknown = rows[0];
    if (
      typeof firstRow !== "object" ||
      firstRow === null ||
      !("id" in firstRow)
    ) {
      return null;
    }

    const id = (firstRow as { id: unknown }).id;
    if (typeof id !== "number" && typeof id !== "string") {
      return null;
    }

    return Number(id);
  }

  private async ensurePartnerStatusId(statusId: number): Promise<void> {
    const belongsToPartners = await this.statusIdBelongsToEntity(
      statusId,
      "partners",
    );
    if (!belongsToPartners) {
      throw new BadRequestException(
        `Invalid statusId ${statusId} for partners entity`,
      );
    }
  }

  private async statusIdBelongsToEntity(
    statusId: number,
    entityType: string,
  ): Promise<boolean> {
    const rawResult: unknown = await this.dataSource.query(
      `SELECT 1
       FROM statuses
       WHERE id = $1
         AND entity_type = $2
         AND is_active = true
       LIMIT 1`,
      [statusId, entityType],
    );

    return Array.isArray(rawResult) && rawResult.length > 0;
  }

  private async ensureBusinessIdExists(businessId: number): Promise<void> {
    const rawResult: unknown = await this.dataSource.query(
      `SELECT 1 FROM businesses WHERE id = $1 LIMIT 1`,
      [businessId],
    );
    if (!Array.isArray(rawResult) || rawResult.length === 0) {
      throw new BadRequestException(`Invalid businessId ${businessId}`);
    }
  }
}
