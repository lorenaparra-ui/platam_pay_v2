import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PartnersEntity } from '@app/suppliers-data';
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
  businessId: true,
  acronym: true,
  logoUrl: true,
  coBrandingLogoUrl: true,
  primaryColor: true,
  secondaryColor: true,
  lightColor: true,
  salesRepRoleName: true,
  salesRepRoleNamePlural: true,
  apiKeyHash: true,
  notificationEmail: true,
  webhookUrl: true,
  sendSalesRepVoucher: true,
  disbursementNotificationEmail: true,
  defaultRepId: true,
  statusId: true,
  createdAt: true,
  updatedAt: true,
} as const;

@Injectable()
export class TypeormPartnerRepository implements PartnerRepository {
  constructor(
    @InjectRepository(PartnersEntity)
    private readonly repo: Repository<PartnersEntity>,
  ) {}

  async find_by_external_id(external_id: string): Promise<Partner | null> {
    const row = await this.repo.findOne({
      where: { externalId: external_id },
      select: PARTNER_SELECT,
    });
    return row ? PartnerMapper.to_domain(row) : null;
  }

  async find_all(): Promise<Partner[]> {
    const rows = await this.repo.find({
      select: PARTNER_SELECT,
      order: { id: 'ASC' },
    });
    return rows.map((r) => PartnerMapper.to_domain(r));
  }

  async create(props: CreatePartnerProps): Promise<Partner> {
    const rows = await this.repo.query(
      `INSERT INTO suppliers_schema.partners (
        external_id, business_id, acronym, logo_url, co_branding_logo_url,
        primary_color, secondary_color, light_color,
        sales_rep_role_name, sales_rep_role_name_plural,
        api_key_hash, notification_email, webhook_url, send_sales_rep_voucher,
        disbursement_notification_email
      ) VALUES (
        gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, false, $10, $11, $12, $13
      )
      RETURNING id, external_id, business_id, acronym, logo_url, co_branding_logo_url,
        primary_color, secondary_color, light_color,
        sales_rep_role_name, sales_rep_role_name_plural,
        api_key_hash, notification_email, webhook_url, send_sales_rep_voucher,
        disbursement_notification_email, default_rep_id, status_id, created_at, updated_at`,
      [
        props.business_id,
        props.acronym,
        props.logo_url,
        props.co_branding_logo_url,
        props.primary_color,
        props.secondary_color,
        props.light_color,
        props.sales_rep_role_name ?? 'Sales Rep',
        props.sales_rep_role_name_plural ?? 'Sales Reps',
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

    if (patch.business_id !== undefined) {
      add('business_id', patch.business_id);
    }
    if (patch.acronym !== undefined) {
      add('acronym', patch.acronym);
    }
    if (patch.logo_url !== undefined) {
      add('logo_url', patch.logo_url);
    }
    if (patch.co_branding_logo_url !== undefined) {
      add('co_branding_logo_url', patch.co_branding_logo_url);
    }
    if (patch.primary_color !== undefined) {
      add('primary_color', patch.primary_color);
    }
    if (patch.secondary_color !== undefined) {
      add('secondary_color', patch.secondary_color);
    }
    if (patch.light_color !== undefined) {
      add('light_color', patch.light_color);
    }
    if (patch.sales_rep_role_name !== undefined) {
      add('sales_rep_role_name', patch.sales_rep_role_name);
    }
    if (patch.sales_rep_role_name_plural !== undefined) {
      add('sales_rep_role_name_plural', patch.sales_rep_role_name_plural);
    }
    if (patch.notification_email !== undefined) {
      add('notification_email', patch.notification_email);
    }
    if (patch.webhook_url !== undefined) {
      add('webhook_url', patch.webhook_url);
    }
    if (patch.send_sales_rep_voucher !== undefined) {
      add('send_sales_rep_voucher', patch.send_sales_rep_voucher);
    }
    if (patch.disbursement_notification_email !== undefined) {
      add(
        'disbursement_notification_email',
        patch.disbursement_notification_email,
      );
    }

    if (columns.length === 0) {
      return this.find_by_external_id(external_id);
    }

    columns.push(`"updated_at" = now()`);
    values.push(existing.id);
    await this.repo.query(
      `UPDATE suppliers_schema.partners SET ${columns.join(', ')} WHERE id = $${i}`,
      values,
    );

    return this.find_by_external_id(external_id);
  }

  async delete_by_external_id(external_id: string): Promise<boolean> {
    const result = await this.repo.delete({ externalId: external_id });
    return (result.affected ?? 0) > 0;
  }
}
