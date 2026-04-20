import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { CategoryEntity } from '@app/products-data';
import { CategoryRepository } from '@modules/categories/domain/ports/category.ports';
import {
  Category,
  CreateCategoryProps,
  UpdateCategoryProps,
} from '@modules/categories/domain/models/category.models';
import { CategoryMapper } from '@infrastructure/database/mappers/category.mapper';

/** Sin `partnerId`: es @RelationId y TypeORM no lo admite en find select/where. */
const CATEGORY_SELECT = {
  id: true,
  externalId: true,
  name: true,
  modality: true,
  discountPercentage: true,
  interestRate: true,
  disbursementFeePercent: true,
  minimumDisbursementFee: true,
  delayDays: true,
  termDays: true,
  installmentFrequency: true,
  installmentCount: true,
  initialPaymentPct: true,
  state: true,
  createdAt: true,
  updatedAt: true,
  partner: {
    id: true,
  },
  creditFacility: {
    id: true,
  },
} as const;

const CATEGORY_RELATIONS = {
  creditFacility: true,
  partner: true,
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
      relations: CATEGORY_RELATIONS,
    });
    return row ? CategoryMapper.to_domain(row) : null;
  }

  async find_all(filter?: {
    credit_facility_id?: number;
    partner_id?: number;
  }): Promise<Category[]> {
    const where: Record<string, unknown> = {};
    if (filter?.credit_facility_id !== undefined) {
      where['creditFacility'] = { id: Equal(filter.credit_facility_id) };
    }
    if (filter?.partner_id !== undefined) {
      where['partner'] = { id: Equal(filter.partner_id) };
    }
    const rows = await this.repo.find({
      where,
      select: CATEGORY_SELECT,
      relations: CATEGORY_RELATIONS,
      order: { id: 'ASC' },
    });
    return rows.map((r) => CategoryMapper.to_domain(r));
  }

  async create(props: CreateCategoryProps): Promise<Category> {
    return await this.repo.manager.transaction(async (manager) => {
      const rows = await manager.query(
        `INSERT INTO products_schema.categories (
        external_id, partner_id, name, modality,
        discount_percentage, interest_rate, disbursement_fee_percent,
        minimum_disbursement_fee, delay_days, term_days,
        installment_frequency, installment_count, initial_payment_pct,
        state
      ) VALUES (
        gen_random_uuid(), $1, $2, $3::products_schema.loan_request_modality,
        $4, $5, $6, $7, $8, $9,
        $10::products_schema.category_installment_frequency, $11, $12,
        $13::products_schema.credit_facility_state
      )
      RETURNING id, external_id, created_at, updated_at, partner_id, name, modality,
        discount_percentage, interest_rate, disbursement_fee_percent, minimum_disbursement_fee,
        delay_days, term_days, installment_frequency, installment_count, initial_payment_pct,
        state`,
        [
          props.partner_id,
          props.name,
          props.modality,
          props.discount_percentage,
          props.interest_rate,
          props.disbursement_fee_percent,
          props.minimum_disbursement_fee,
          props.delay_days,
          props.term_days,
          props.installment_frequency,
          props.installment_count,
          props.initial_payment_pct,
          props.state,
        ],
      );
      const raw = rows[0] as Record<string, unknown>;
      await manager.query(
        `INSERT INTO products_schema.client_category_assignments (credit_facility_id, category_id)
         VALUES ($1, $2)`,
        [props.credit_facility_id, Number(raw['id'])],
      );
      return CategoryMapper.from_raw_row({
        ...raw,
        credit_facility_id: props.credit_facility_id,
      });
    });
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

    if (patch.credit_facility_id !== undefined) {
      await this.repo.query(
        `UPDATE products_schema.client_category_assignments
         SET credit_facility_id = $1
         WHERE category_id = $2`,
        [patch.credit_facility_id, existing.id],
      );
    }

    const columns: string[] = [];
    const values: unknown[] = [];
    let i = 1;

    const add = (col: string, val: unknown) => {
      columns.push(`"${col}" = $${i}`);
      values.push(val);
      i += 1;
    };

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

    if (columns.length > 0) {
      columns.push(`"updated_at" = now()`);
      values.push(existing.id);
      await this.repo.query(
        `UPDATE products_schema.categories SET ${columns.join(', ')} WHERE id = $${i}`,
        values,
      );
    }

    return this.find_by_external_id(external_id);
  }

  async delete_by_external_id(external_id: string): Promise<boolean> {
    const result = await this.repo.delete({ externalId: external_id });
    return (result.affected ?? 0) > 0;
  }
}
