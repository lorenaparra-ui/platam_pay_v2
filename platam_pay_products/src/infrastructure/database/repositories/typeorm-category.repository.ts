import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { CategoryEntity } from "@libs/database";
import type {
  CategoryRepositoryPort,
  CategoryCreateInput,
  CategoryLineInput,
  CategoryUpdateInput,
} from "../../../modules/categories/domain/ports/category.repository.port";
import type { Category } from "../../../modules/categories/domain/models/category.model";
import { CategoryMapper } from "../mappers/category.mapper";

@Injectable()
export class TypeOrmCategoryRepository implements CategoryRepositoryPort {
  constructor(
    @InjectDataSource()
    private readonly data_source: DataSource,
  ) {}

  async create(input: CategoryCreateInput): Promise<Category> {
    const repo = this.data_source.getRepository(CategoryEntity);
    const row = repo.create({
      creditFacilityId: input.credit_facility_id,
      partnerId: input.partner_id ?? null,
      name: input.name,
      discountPercentage: input.discount_percentage,
      interestRate: input.interest_rate,
      disbursementFeePercent: input.disbursement_fee_percent,
      minimumDisbursementFee: input.minimum_disbursement_fee,
      delayDays: input.delay_days,
      termDays: input.term_days,
      statusId: input.status_id,
    });
    const saved = await repo.save(row);
    const full = await repo.findOne({ where: { id: saved.id } });
    if (!full) throw new Error("categories: fila no encontrada tras crear");
    return CategoryMapper.to_domain(full);
  }

  async create_bulk(
    credit_facility_id: number,
    items: CategoryLineInput[],
  ): Promise<Category[]> {
    return this.data_source.transaction(async (manager) => {
      const repo = manager.getRepository(CategoryEntity);
      const out: Category[] = [];
      for (const it of items) {
        const row = repo.create({
          creditFacilityId: credit_facility_id,
          partnerId: it.partner_id ?? null,
          name: it.name,
          discountPercentage: it.discount_percentage,
          interestRate: it.interest_rate,
          disbursementFeePercent: it.disbursement_fee_percent,
          minimumDisbursementFee: it.minimum_disbursement_fee,
          delayDays: it.delay_days,
          termDays: it.term_days,
          statusId: it.status_id,
        });
        const saved = await repo.save(row);
        const full = await repo.findOne({ where: { id: saved.id } });
        if (!full) throw new Error("categories: error en creación masiva");
        out.push(CategoryMapper.to_domain(full));
      }
      return out;
    });
  }

  async find_by_external_id(external_id: string): Promise<Category | null> {
    const repo = this.data_source.getRepository(CategoryEntity);
    const row = await repo.findOne({ where: { externalId: external_id } });
    return row ? CategoryMapper.to_domain(row) : null;
  }

  async find_by_credit_facility_id(
    credit_facility_id: number,
  ): Promise<Category[]> {
    const repo = this.data_source.getRepository(CategoryEntity);
    const rows = await repo.find({
      where: { creditFacilityId: credit_facility_id },
      order: { id: "ASC" },
    });
    return rows.map((r) => CategoryMapper.to_domain(r));
  }

  async update_by_external_id(
    external_id: string,
    input: CategoryUpdateInput,
  ): Promise<Category | null> {
    const repo = this.data_source.getRepository(CategoryEntity);
    const row = await repo.findOne({ where: { externalId: external_id } });
    if (!row) return null;
    if (input.partner_id !== undefined) row.partnerId = input.partner_id;
    if (input.name !== undefined) row.name = input.name;
    if (input.delay_days !== undefined) row.delayDays = input.delay_days;
    if (input.disbursement_fee_percent !== undefined)
      row.disbursementFeePercent = input.disbursement_fee_percent;
    if (input.discount_percentage !== undefined)
      row.discountPercentage = input.discount_percentage;
    if (input.interest_rate !== undefined)
      row.interestRate = input.interest_rate;
    if (input.minimum_disbursement_fee !== undefined)
      row.minimumDisbursementFee = input.minimum_disbursement_fee;
    if (input.term_days !== undefined) row.termDays = input.term_days;
    if (input.status_id !== undefined) row.statusId = input.status_id;
    await repo.save(row);
    const full = await repo.findOne({ where: { id: row.id } });
    return full ? CategoryMapper.to_domain(full) : null;
  }

  async delete_by_external_id(external_id: string): Promise<boolean> {
    const repo = this.data_source.getRepository(CategoryEntity);
    const result = await repo.delete({ externalId: external_id });
    return (result.affected ?? 0) > 0;
  }
}
