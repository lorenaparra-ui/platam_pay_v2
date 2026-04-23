import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { type QueryDeepPartialEntity, Repository } from 'typeorm';
import { PartnerEntity } from '@app/suppliers-data';
import { PartnerRepository } from '@modules/partners/domain/repositories/partner.repository';
import {
  Partner,
  CreatePartnerProps,
  UpdatePartnerProps,
} from '@modules/partners/domain/entities/partner.entity';
import { PartnerMapper } from '@infrastructure/database/mappers/partner.mapper';

const PARTNER_SELECT = {
  id: true,
  externalId: true,
  acronym: true,
  logoUrl: true,
  coBrandingLogoUrl: true,
  primaryColor: true,
  secondaryColor: true,
  lightColor: true,
  notificationEmail: true,
  webhookUrl: true,
  sendSalesRepVoucher: true,
  disbursementNotificationEmail: true,
  state: true,
  createdAt: true,
  updatedAt: true,
  supplier: { id: true },
} as const;

@Injectable()
export class TypeormPartnerRepository implements PartnerRepository {
  constructor(
    @InjectRepository(PartnerEntity)
    private readonly repo: Repository<PartnerEntity>,
  ) {}

  async find_by_external_id(external_id: string): Promise<Partner | null> {
    const row = await this.repo.findOne({
      where: { externalId: external_id },
      relations: ['supplier'],
      select: PARTNER_SELECT,
    });
    return row ? PartnerMapper.to_domain(row) : null;
  }

  async find_all(): Promise<Partner[]> {
    const rows = await this.repo.find({
      relations: ['supplier'],
      select: PARTNER_SELECT,
      order: { id: 'ASC' },
    });
    return rows.map((r) => PartnerMapper.to_domain(r));
  }

  async create(props: CreatePartnerProps): Promise<Partner> {
    const rows = await this.repo.query(
      `INSERT INTO suppliers_schema.partners (
        supplier_id, external_id, acronym, logo_url, co_branding_logo_url,
        primary_color, secondary_color, light_color,
        notification_email, webhook_url, send_sales_rep_voucher,
        disbursement_notification_email
      ) VALUES (
        $1, gen_random_uuid(), $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
      )
      RETURNING id, supplier_id, external_id, acronym, logo_url, co_branding_logo_url,
        primary_color, secondary_color, light_color,
        notification_email, webhook_url, send_sales_rep_voucher,
        disbursement_notification_email, state, created_at, updated_at`,
      [
        props.supplier_id,
        props.acronym,
        props.logo_url,
        props.co_branding_logo_url,
        props.primary_color,
        props.secondary_color,
        props.light_color,
        props.notification_email,
        props.webhook_url,
        props.send_sales_rep_voucher,
        props.disbursement_notification_email,
      ],
    );
    return PartnerMapper.from_raw_row(rows[0] as Record<string, unknown>);
  }

  async update_by_external_id(
    external_id: string,
    patch: UpdatePartnerProps,
  ): Promise<Partner | null> {
    const fields: Partial<PartnerEntity> = {};

    if (patch.acronym !== undefined) fields.acronym = patch.acronym ?? undefined;
    if (patch.logo_url !== undefined) fields.logoUrl = patch.logo_url ?? undefined;
    if (patch.co_branding_logo_url !== undefined)
      fields.coBrandingLogoUrl = patch.co_branding_logo_url ?? undefined;
    if (patch.primary_color !== undefined) fields.primaryColor = patch.primary_color ?? undefined;
    if (patch.secondary_color !== undefined)
      fields.secondaryColor = patch.secondary_color ?? undefined;
    if (patch.light_color !== undefined) fields.lightColor = patch.light_color ?? undefined;
    if (patch.notification_email !== undefined)
      fields.notificationEmail = patch.notification_email ?? undefined;
    if (patch.webhook_url !== undefined) fields.webhookUrl = patch.webhook_url ?? undefined;
    if (patch.send_sales_rep_voucher !== undefined)
      fields.sendSalesRepVoucher = patch.send_sales_rep_voucher;
    if (patch.disbursement_notification_email !== undefined)
      fields.disbursementNotificationEmail =
        patch.disbursement_notification_email ?? undefined;
    if (patch.state !== undefined) fields.state = patch.state;

    if (Object.keys(fields).length === 0) {
      return this.find_by_external_id(external_id);
    }

    await this.repo
      .createQueryBuilder()
      .update(PartnerEntity)
      .set({
        ...fields,
        updatedAt: () => 'now()',
      } as QueryDeepPartialEntity<PartnerEntity>)
      .where('"external_id" = :external_id', { external_id })
      .execute();

    return this.find_by_external_id(external_id);
  }

  async delete_by_external_id(external_id: string): Promise<boolean> {
    const result = await this.repo.delete({ externalId: external_id });
    return (result.affected ?? 0) > 0;
  }
}
