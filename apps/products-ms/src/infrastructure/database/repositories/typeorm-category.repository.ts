import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from '@app/products-data';
import { CategoryRepository } from '@modules/categories/domain/ports/category.ports';
import {
  Category,
  CreateCategoryProps,
  UpdateCategoryProps,
} from '@modules/categories/domain/models/category.models';
import { CategoryMapper } from '@infrastructure/database/mappers/category.mapper';

const CATEGORY_SELECT = {
  id: true,
  externalId: true,
  creditFacilityId: true,
  partnerId: true,
  name: true,
  discountPercentage: true,
  interestRate: true,
  disbursementFeePercent: true,
  minimumDisbursementFee: true,
  delayDays: true,
  termDays: true,
  state: true,
  createdAt: true,
  updatedAt: true,
} as const;

@Injectable()
export class TypeormCategoryRepository implements CategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly repo: Repository<CategoryEntity>,
  ) {}

  async find_by_external_id(external_id: string): Promise<Category | null> {
    const row = await this.repo.findOne({
      where: { externalId: external_id },
      select: CATEGORY_SELECT,
    });
    return row ? CategoryMapper.to_domain(row) : null;
  }

  async find_all(filter?: {
    credit_facility_id?: number;
  }): Promise<Category[]> {
    const rows = await this.repo.find({
      where: filter?.credit_facility_id
        ? { creditFacilityId: filter.credit_facility_id }
        : {},
      select: CATEGORY_SELECT,
      order: { id: 'ASC' },
    });
    return rows.map((r) => CategoryMapper.to_domain(r));
  }

  async create(props: CreateCategoryProps): Promise<Category> {
    const rows = await this.repo.query(
      `INSERT INTO products_schema.categories (
        external_id, credit_facility_id, partner_id, name,
        discount_percentage, interest_rate, disbursement_fee_percent,
        minimum_disbursement_fee, delay_days, term_days, state
      ) VALUES (
        gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10::products_schema.credit_facility_state
      )
      RETURNING id, external_id, created_at, updated_at, credit_facility_id, partner_id, name,
        discount_percentage, interest_rate, disbursement_fee_percent, minimum_disbursement_fee,
        delay_days, term_days, state`,
      [
        props.credit_facility_id,
        props.partner_id,
        props.name,
        props.discount_percentage,
        props.interest_rate,
        props.disbursement_fee_percent,
        props.minimum_disbursement_fee,
        props.delay_days,
        props.term_days,
        props.state,
      ],
    );
    return CategoryMapper.from_raw_row(rows[0] as Record<string, unknown>);
  }

  async update_by_external_id(
    external_id: string,
    patch: UpdateCategoryProps,
  ): Promise<Category | null> {
    const existing = await this.repo.findOne({
      where: { externalId: external_id },
      select: { id: true },
    });
    if (!existing) {
      return null;
    }

    const columns: string[] = [];
    const values: unknown[] = [];
    let i = 1;

    const add = (col: string, val: unknown) => {
      columns.push(`"${col}" = $${i}`);
      values.push(val);
      i += 1;
    };

    if (patch.credit_facility_id !== undefined) {
      add('credit_facility_id', patch.credit_facility_id);
    }
    if (patch.partner_id !== undefined) {
      add('partner_id', patch.partner_id);
    }
    if (patch.name !== undefined) {
      add('name', patch.name);
    }
    if (patch.discount_percentage !== undefined) {
      add('discount_percentage', patch.discount_percentage);
    }
    if (patch.interest_rate !== undefined) {
      add('interest_rate', patch.interest_rate);
    }
    if (patch.disbursement_fee_percent !== undefined) {
      add('disbursement_fee_percent', patch.disbursement_fee_percent);
    }
    if (patch.minimum_disbursement_fee !== undefined) {
      add('minimum_disbursement_fee', patch.minimum_disbursement_fee);
    }
    if (patch.delay_days !== undefined) {
      add('delay_days', patch.delay_days);
    }
    if (patch.term_days !== undefined) {
      add('term_days', patch.term_days);
    }
    if (patch.state !== undefined) {
      add('state', patch.state);
    }

    if (columns.length === 0) {
      return this.find_by_external_id(external_id);
    }

    columns.push(`"updated_at" = now()`);
    values.push(existing.id);
    await this.repo.query(
      `UPDATE products_schema.categories SET ${columns.join(', ')} WHERE id = $${i}`,
      values,
    );

    return this.find_by_external_id(external_id);
  }

  async delete_by_external_id(external_id: string): Promise<boolean> {
    const result = await this.repo.delete({ externalId: external_id });
    return (result.affected ?? 0) > 0;
  }
}
