import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import {
  CreatePartnerCategoryPayload,
  PartnerCategoryRepositoryPort,
  UpdatePartnerCategoryPayload,
} from "@partner-categories/domain/ports/partner-category.repository.port";
import { PartnerCategory } from "@partner-categories/domain/models/partner-category.model";
import { PartnerCategoriesEntity } from "@infrastructure/database/entities/partner-categories.entity";
import { PartnerCategoriesMapper } from "@infrastructure/database/mappers/partner-categories.mapper";
import { PartnersEntity } from "@infrastructure/database/entities/partners.entity";

@Injectable()
export class TypeOrmPartnerCategoriesRepository implements PartnerCategoryRepositoryPort {
  constructor(
    @InjectRepository(PartnerCategoriesEntity)
    private readonly categoriesRepository: Repository<PartnerCategoriesEntity>,
    @InjectRepository(PartnersEntity)
    private readonly partnersRepository: Repository<PartnersEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async findAll(partnerExternalId?: string): Promise<PartnerCategory[]> {
    if (partnerExternalId !== undefined) {
      return this.findByPartnerExternalId(partnerExternalId);
    }

    const categories = await this.categoriesRepository.find({
      order: { createdAt: "DESC" },
    });
    return categories.map((category) =>
      PartnerCategoriesMapper.toDomain(category),
    );
  }

  async findByExternalId(externalId: string): Promise<PartnerCategory | null> {
    const category = await this.categoriesRepository.findOne({
      where: { externalId },
    });
    if (!category) {
      return null;
    }

    return PartnerCategoriesMapper.toDomain(category);
  }

  async findByPartnerExternalId(
    partnerExternalId: string,
  ): Promise<PartnerCategory[]> {
    const partner = await this.partnersRepository.findOne({
      where: { externalId: partnerExternalId },
      select: { id: true },
    });
    if (!partner) {
      return [];
    }

    const categories = await this.categoriesRepository.find({
      where: { partnerId: partner.id },
      order: { createdAt: "ASC" },
    });

    return categories.map((category) =>
      PartnerCategoriesMapper.toDomain(category),
    );
  }

  async create(
    payload: CreatePartnerCategoryPayload,
  ): Promise<PartnerCategory | null> {
    if (payload.statusId !== undefined) {
      await this.ensurePartnerCategoryStatusId(payload.statusId);
    }

    const partner = await this.partnersRepository.findOne({
      where: { externalId: payload.partnerExternalId },
      select: { id: true },
    });
    if (!partner) {
      return null;
    }

    const created = await this.categoriesRepository.save(
      this.categoriesRepository.create({
        partnerId: partner.id,
        name: payload.name,
        discountPercentage: payload.discountPercentage,
        interestRate: payload.interestRate,
        disbursementFeePercent: payload.disbursementFeePercent ?? null,
        minimumDisbursementFee: payload.minimumDisbursementFee ?? null,
        delayDays: payload.delayDays,
        termDays: payload.termDays,
        statusId: payload.statusId,
      }),
    );

    return PartnerCategoriesMapper.toDomain(created);
  }

  async updateByExternalId(
    externalId: string,
    payload: UpdatePartnerCategoryPayload,
  ): Promise<PartnerCategory | null> {
    if (payload.statusId !== undefined) {
      await this.ensurePartnerCategoryStatusId(payload.statusId);
    }

    const existing = await this.categoriesRepository.findOne({
      where: { externalId },
    });
    if (!existing) {
      return null;
    }

    const sanitizedPayload = Object.fromEntries(
      Object.entries(payload).filter(([, value]) => value !== undefined),
    ) as Partial<PartnerCategoriesEntity>;
    Object.assign(existing, sanitizedPayload);
    const updated = await this.categoriesRepository.save(existing);
    return PartnerCategoriesMapper.toDomain(updated);
  }

  async deleteByExternalId(externalId: string): Promise<boolean> {
    const result = await this.categoriesRepository.delete({ externalId });
    return (result.affected ?? 0) > 0;
  }

  private async ensurePartnerCategoryStatusId(statusId: number): Promise<void> {
    const belongsToPartnerCategories = await this.statusIdBelongsToEntity(
      statusId,
      "partner_categories",
    );
    if (!belongsToPartnerCategories) {
      throw new BadRequestException(
        `Invalid statusId ${statusId} for partner_categories entity`,
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
}
