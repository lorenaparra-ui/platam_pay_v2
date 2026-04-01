import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupplierEntity } from '@app/suppliers-data';
import { SupplierRepository } from '@modules/suppliers/domain/repositories/supplier.repository';
import {
  Supplier,
  CreateSupplierProps,
  UpdateSupplierProps,
} from '@modules/suppliers/domain/entities/supplier.entity';

import { SupplierMapper } from '@infrastructure/database/mappers/supplier.mapper';

const SUPPLIER_ORM_SELECT = {
  id: true,
  externalId: true,
  businessId: true,
  createdAt: true,
  updatedAt: true,
} as const;

@Injectable()
export class TypeormSupplierRepository implements SupplierRepository {
  constructor(
    @InjectRepository(SupplierEntity)
    private readonly repo: Repository<SupplierEntity>,
  ) {}

  private async load_bank_account_id(supplier_id: number): Promise<number | null> {
    const rows = await this.repo.query(
      `SELECT bank_account_id FROM suppliers_schema.suppliers WHERE id = $1`,
      [supplier_id],
    );
    const r = rows[0] as { bank_account_id: number | null } | undefined;
    return r?.bank_account_id ?? null;
  }

  async find_by_external_id(external_id: string): Promise<Supplier | null> {
    const row = await this.repo.findOne({
      where: { externalId: external_id },
      select: SUPPLIER_ORM_SELECT,
    });
    if (!row) {
      return null;
    }
    const bank_account_id = await this.load_bank_account_id(row.id);
    return SupplierMapper.to_domain(row, bank_account_id);
  }

  async find_all(): Promise<Supplier[]> {
    const rows = await this.repo.find({
      select: SUPPLIER_ORM_SELECT,
      order: { id: 'ASC' },
    });
    const out: Supplier[] = [];
    for (const row of rows) {
      const bank_account_id = await this.load_bank_account_id(row.id);
      out.push(SupplierMapper.to_domain(row, bank_account_id));
    }
    return out;
  }

  async create(props: CreateSupplierProps): Promise<Supplier> {
    const rows = await this.repo.query(
      `INSERT INTO suppliers_schema.suppliers (
        external_id, business_id, bank_account_id
      ) VALUES (gen_random_uuid(), $1, $2)
      RETURNING id, external_id, business_id, bank_account_id, created_at, updated_at`,
      [props.business_id, props.bank_account_id],
    );
    return SupplierMapper.from_raw_row(rows[0] as Record<string, unknown>);
  }

  async update_by_external_id(
    external_id: string,
    patch: UpdateSupplierProps,
  ): Promise<Supplier | null> {
    const existing = await this.repo.findOne({
      where: { externalId: external_id },
      select: { id: true },
    });
    if (!existing) {
      return null;
    }

    if (patch.bank_account_id === undefined) {
      return this.find_by_external_id(external_id);
    }

    await this.repo.query(
      `UPDATE suppliers_schema.suppliers SET bank_account_id = $1, updated_at = now() WHERE id = $2`,
      [patch.bank_account_id, existing.id],
    );

    return this.find_by_external_id(external_id);
  }

  async delete_by_external_id(external_id: string): Promise<boolean> {
    const result = await this.repo.delete({ externalId: external_id });
    return (result.affected ?? 0) > 0;
  }
}
