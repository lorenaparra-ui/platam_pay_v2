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
    if (patch.state !== undefined) {
      add('state', patch.state);
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
