import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreditApplicationEntity } from '@app/products-data';
import { CreditApplicationRepository } from '@modules/credit-applications/domain/ports/credit-application.ports';
import {
  CreditApplication,
  CreateCreditApplicationProps,
  UpdateCreditApplicationProps,
} from '@modules/credit-applications/domain/models/credit-application.models';
import { CreditApplicationMapper } from '@infrastructure/database/mappers/credit-application.mapper';

const CREDIT_APPLICATION_SELECT = {
  id: true,
  externalId: true,
  person: { id: true },
  partner: { id: true },
  partnerCategory: { id: true },
  business: { id: true },
  salesRepresentative: { id: true },
  numberOfLocations: true,
  numberOfEmployees: true,
  businessSeniority: true,
  sectorExperience: true,
  businessFlagshipM2: true,
  businessHasRent: true,
  businessRentAmount: true,
  monthlyIncome: true,
  monthlyExpenses: true,
  monthlyPurchases: true,
  currentPurchases: true,
  totalAssets: true,
  requestedCreditLine: true,
  isCurrentClient: true,
  status: true,
  submissionDate: true,
  approvalDate: true,
  rejectionReason: true,
  creditStudyDate: true,
  creditScore: true,
  creditDecision: true,
  approvedCreditLine: true,
  analystReport: true,
  riskProfile: true,
  privacyPolicyAccepted: true,
  privacyPolicyDate: true,
  createdAt: true,
  updatedAt: true,
} as const;

@Injectable()
export class TypeormCreditApplicationRepository implements CreditApplicationRepository {
  constructor(
    @InjectRepository(CreditApplicationEntity)
    private readonly repo: Repository<CreditApplicationEntity>,
  ) {}

  async find_by_external_id(external_id: string): Promise<CreditApplication | null> {
    const row = await this.repo.findOne({
      where: { externalId: external_id },
      select: CREDIT_APPLICATION_SELECT,
    });
    return row ? CreditApplicationMapper.to_domain(row) : null;
  }

  async find_all(): Promise<CreditApplication[]> {
    const rows = await this.repo.find({
      select: CREDIT_APPLICATION_SELECT,
      order: { id: 'DESC' },
    });
    return rows.map((r) => CreditApplicationMapper.to_domain(r));
  }

  async find_by_partner_id(partner_id: number): Promise<CreditApplication[]> {
    const rows = await this.repo.find({
      where: { partner: { id: partner_id } },
      select: CREDIT_APPLICATION_SELECT,
      order: { id: 'DESC' },
    });
    return rows.map((r) => CreditApplicationMapper.to_domain(r));
  }

  async find_by_sales_representative_id(
    sales_representative_id: number,
  ): Promise<CreditApplication[]> {
    const rows = await this.repo.find({
      where: { salesRepresentative: { id: sales_representative_id } },
      select: CREDIT_APPLICATION_SELECT,
      order: { id: 'DESC' },
    });
    return rows.map((r) => CreditApplicationMapper.to_domain(r));
  }

  async create(props: CreateCreditApplicationProps): Promise<CreditApplication> {
    const rows = await this.repo.query<Record<string, unknown>[]>(
      `INSERT INTO products_schema.credit_applications (
        external_id,
        person_id, partner_id, partner_category_id, business_id, sales_representative_id,
        status, is_current_client, privacy_policy_accepted,
        number_of_locations, number_of_employees, business_seniority, sector_experience,
        business_flagship_m2, business_has_rent, business_rent_amount,
        monthly_income, monthly_expenses, monthly_purchases, current_purchases,
        total_assets, requested_credit_line, submission_date, privacy_policy_date
      ) VALUES (
        COALESCE($1::uuid, gen_random_uuid()),
        $2, $3, $4, $5, $6,
        $7::products_schema.credit_application_status, $8, $9,
        $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24
      )
      RETURNING *`,
      [
        props.external_id ?? null,
        props.person_id ?? null,
        props.partner_id ?? null,
        props.partner_category_id ?? null,
        props.business_id ?? null,
        props.sales_representative_id,
        props.status,
        props.is_current_client ?? false,
        props.privacy_policy_accepted ?? false,
        props.number_of_locations ?? null,
        props.number_of_employees ?? null,
        props.business_seniority ?? null,
        props.sector_experience ?? null,
        props.business_flagship_m2 ?? null,
        props.business_has_rent ?? null,
        props.business_rent_amount ?? null,
        props.monthly_income ?? null,
        props.monthly_expenses ?? null,
        props.monthly_purchases ?? null,
        props.current_purchases ?? null,
        props.total_assets ?? null,
        props.requested_credit_line ?? null,
        props.submission_date ?? null,
        props.privacy_policy_date ?? null,
      ],
    );
    return CreditApplicationMapper.from_raw_row(rows[0]);
  }

  async update_by_external_id(
    external_id: string,
    patch: UpdateCreditApplicationProps,
  ): Promise<CreditApplication | null> {
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

    if (patch.status !== undefined) add('status', patch.status);
    if (patch.person_id !== undefined) add('person_id', patch.person_id);
    if (patch.partner_id !== undefined) add('partner_id', patch.partner_id);
    if (patch.partner_category_id !== undefined) add('partner_category_id', patch.partner_category_id);
    if (patch.business_id !== undefined) add('business_id', patch.business_id);
    if (patch.sales_representative_id !== undefined) add('sales_representative_id', patch.sales_representative_id);
    if (patch.is_current_client !== undefined) add('is_current_client', patch.is_current_client);
    if (patch.privacy_policy_accepted !== undefined) add('privacy_policy_accepted', patch.privacy_policy_accepted);
    if (patch.number_of_locations !== undefined) add('number_of_locations', patch.number_of_locations);
    if (patch.number_of_employees !== undefined) add('number_of_employees', patch.number_of_employees);
    if (patch.business_seniority !== undefined) add('business_seniority', patch.business_seniority);
    if (patch.sector_experience !== undefined) add('sector_experience', patch.sector_experience);
    if (patch.business_flagship_m2 !== undefined) add('business_flagship_m2', patch.business_flagship_m2);
    if (patch.business_has_rent !== undefined) add('business_has_rent', patch.business_has_rent);
    if (patch.business_rent_amount !== undefined) add('business_rent_amount', patch.business_rent_amount);
    if (patch.monthly_income !== undefined) add('monthly_income', patch.monthly_income);
    if (patch.monthly_expenses !== undefined) add('monthly_expenses', patch.monthly_expenses);
    if (patch.monthly_purchases !== undefined) add('monthly_purchases', patch.monthly_purchases);
    if (patch.current_purchases !== undefined) add('current_purchases', patch.current_purchases);
    if (patch.total_assets !== undefined) add('total_assets', patch.total_assets);
    if (patch.requested_credit_line !== undefined) add('requested_credit_line', patch.requested_credit_line);
    if (patch.submission_date !== undefined) add('submission_date', patch.submission_date);
    if (patch.approval_date !== undefined) add('approval_date', patch.approval_date);
    if (patch.rejection_reason !== undefined) add('rejection_reason', patch.rejection_reason);
    if (patch.credit_study_date !== undefined) add('credit_study_date', patch.credit_study_date);
    if (patch.credit_score !== undefined) add('credit_score', patch.credit_score);
    if (patch.credit_decision !== undefined) add('credit_decision', patch.credit_decision);
    if (patch.approved_credit_line !== undefined) add('approved_credit_line', patch.approved_credit_line);
    if (patch.analyst_report !== undefined) add('analyst_report', patch.analyst_report);
    if (patch.risk_profile !== undefined) add('risk_profile', patch.risk_profile);
    if (patch.privacy_policy_date !== undefined) add('privacy_policy_date', patch.privacy_policy_date);

    if (columns.length === 0) {
      return this.find_by_external_id(external_id);
    }

    columns.push(`"updated_at" = now()`);
    values.push(existing.id);
    await this.repo.query(
      `UPDATE products_schema.credit_applications SET ${columns.join(', ')} WHERE id = $${i}`,
      values,
    );

    return this.find_by_external_id(external_id);
  }

  async delete_by_external_id(external_id: string): Promise<boolean> {
    const result = await this.repo.delete({ externalId: external_id });
    return (result.affected ?? 0) > 0;
  }
}
