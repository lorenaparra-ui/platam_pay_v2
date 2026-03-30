import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankAccountEntity } from '@app/suppliers-data';
import { BankAccountRepository } from '@modules/bank-accounts/domain/repositories/bank-account.repository';
import {
  BankAccount,
  CreateBankAccountProps,
  UpdateBankAccountProps,
} from '@modules/bank-accounts/domain/entities/bank-account.entity';
import { BankAccountMapper } from '@infrastructure/database/mappers/bank-account.mapper';

const BANK_ACCOUNT_SELECT = {
  id: true,
  externalId: true,
  bankEntity: true,
  accountNumber: true,
  bankCertification: true,
  createdAt: true,
  updatedAt: true,
} as const;

@Injectable()
export class TypeormBankAccountRepository implements BankAccountRepository {
  constructor(
    @InjectRepository(BankAccountEntity)
    private readonly repo: Repository<BankAccountEntity>,
  ) {}

  async find_by_external_id(external_id: string): Promise<BankAccount | null> {
    const row = await this.repo.findOne({
      where: { externalId: external_id },
      select: BANK_ACCOUNT_SELECT,
    });
    return row ? BankAccountMapper.to_domain(row) : null;
  }

  async find_all(): Promise<BankAccount[]> {
    const rows = await this.repo.find({
      select: BANK_ACCOUNT_SELECT,
      order: { id: 'ASC' },
    });
    return rows.map((r) => BankAccountMapper.to_domain(r));
  }

  async create(props: CreateBankAccountProps): Promise<BankAccount> {
    const rows = await this.repo.query(
      `INSERT INTO suppliers_schema.bank_accounts (
        external_id, bank_entity, account_number, bank_certification
      ) VALUES (gen_random_uuid(), $1, $2, $3)
      RETURNING id, external_id, bank_entity, account_number, bank_certification, created_at, updated_at`,
      [props.bank_entity, props.account_number, props.bank_certification],
    );
    return BankAccountMapper.from_raw_row(rows[0] as Record<string, unknown>);
  }

  async update_by_external_id(
    external_id: string,
    patch: UpdateBankAccountProps,
  ): Promise<BankAccount | null> {
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

    if (patch.bank_entity !== undefined) {
      add('bank_entity', patch.bank_entity);
    }
    if (patch.account_number !== undefined) {
      add('account_number', patch.account_number);
    }
    if (patch.bank_certification !== undefined) {
      add('bank_certification', patch.bank_certification);
    }

    if (columns.length === 0) {
      return this.find_by_external_id(external_id);
    }

    columns.push(`"updated_at" = now()`);
    values.push(existing.id);
    await this.repo.query(
      `UPDATE suppliers_schema.bank_accounts SET ${columns.join(', ')} WHERE id = $${i}`,
      values,
    );

    return this.find_by_external_id(external_id);
  }

  async delete_by_external_id(external_id: string): Promise<boolean> {
    const result = await this.repo.delete({ externalId: external_id });
    return (result.affected ?? 0) > 0;
  }
}
