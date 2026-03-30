import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessEntity } from '@app/suppliers-data';
import { BusinessRepository } from '@modules/businesses/domain/repositories/business.repository';
import {
  Business,
  CreateBusinessProps,
  UpdateBusinessProps,
} from '@modules/businesses/domain/entities/business.entity';
import { BusinessMapper } from '@infrastructure/database/mappers/business.mapper';

const BUSINESS_SELECT = {
  id: true,
  externalId: true,
  personId: true,
  cityId: true,
  entityType: true,
  businessName: true,
  businessAddress: true,
  businessType: true,
  relationshipToBusiness: true,
  legalName: true,
  tradeName: true,
  taxId: true,
  yearOfEstablishment: true,
  createdAt: true,
  updatedAt: true,
} as const;

@Injectable()
export class TypeormBusinessRepository implements BusinessRepository {
  constructor(
    @InjectRepository(BusinessEntity)
    private readonly repo: Repository<BusinessEntity>,
  ) {}

  async find_by_external_id(external_id: string): Promise<Business | null> {
    const row = await this.repo.findOne({
      where: { externalId: external_id },
      select: BUSINESS_SELECT,
    });
    return row ? BusinessMapper.to_domain(row) : null;
  }

  async find_all(): Promise<Business[]> {
    const rows = await this.repo.find({
      select: BUSINESS_SELECT,
      order: { id: 'ASC' },
    });
    return rows.map((r) => BusinessMapper.to_domain(r));
  }

  async create(props: CreateBusinessProps): Promise<Business> {
    const rows = await this.repo.query(
      `INSERT INTO suppliers_schema.businesses (
        external_id, person_id, city_id, entity_type, business_name, business_address,
        business_type, relationship_to_business, legal_name, trade_name, tax_id, year_of_establishment
      ) VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING id, external_id, created_at, updated_at, person_id, city_id, entity_type,
        business_name, business_address, business_type, relationship_to_business,
        legal_name, trade_name, tax_id, year_of_establishment`,
      [
        props.person_id,
        props.city_id,
        props.entity_type,
        props.business_name,
        props.business_address,
        props.business_type,
        props.relationship_to_business,
        props.legal_name,
        props.trade_name,
        props.tax_id,
        props.year_of_establishment,
      ],
    );
    return BusinessMapper.from_raw_row(rows[0] as Record<string, unknown>);
  }

  async update_by_external_id(
    external_id: string,
    patch: UpdateBusinessProps,
  ): Promise<Business | null> {
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

    if (patch.person_id !== undefined) {
      add('person_id', patch.person_id);
    }
    if (patch.city_id !== undefined) {
      add('city_id', patch.city_id);
    }
    if (patch.entity_type !== undefined) {
      add('entity_type', patch.entity_type);
    }
    if (patch.business_name !== undefined) {
      add('business_name', patch.business_name);
    }
    if (patch.business_address !== undefined) {
      add('business_address', patch.business_address);
    }
    if (patch.business_type !== undefined) {
      add('business_type', patch.business_type);
    }
    if (patch.relationship_to_business !== undefined) {
      add('relationship_to_business', patch.relationship_to_business);
    }
    if (patch.legal_name !== undefined) {
      add('legal_name', patch.legal_name);
    }
    if (patch.trade_name !== undefined) {
      add('trade_name', patch.trade_name);
    }
    if (patch.tax_id !== undefined) {
      add('tax_id', patch.tax_id);
    }
    if (patch.year_of_establishment !== undefined) {
      add('year_of_establishment', patch.year_of_establishment);
    }

    if (columns.length === 0) {
      return this.find_by_external_id(external_id);
    }

    columns.push(`"updated_at" = now()`);
    values.push(existing.id);
    await this.repo.query(
      `UPDATE suppliers_schema.businesses SET ${columns.join(', ')} WHERE id = $${i}`,
      values,
    );

    return this.find_by_external_id(external_id);
  }

  async delete_by_external_id(external_id: string): Promise<boolean> {
    const result = await this.repo.delete({ externalId: external_id });
    return (result.affected ?? 0) > 0;
  }
}
