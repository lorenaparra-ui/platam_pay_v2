import { BankAccountEntity } from '@app/suppliers-data';
import { BankAccount } from '@modules/bank-accounts/domain/entities/bank-account.entity';

export class BankAccountMapper {
  static to_domain(row: BankAccountEntity): BankAccount {
    return new BankAccount(
      row.id,
      row.externalId,
      row.bankEntity,
      row.accountNumber,
      row.bankCertification ?? null,
      row.createdAt,
      row.updatedAt,
    );
  }

  static from_raw_row(row: Record<string, unknown>): BankAccount {
    return new BankAccount(
      Number(row['id']),
      String(row['external_id']),
      String(row['bank_entity']),
      String(row['account_number']),
      (row['bank_certification'] as string | null) ?? null,
      new Date(String(row['created_at'])),
      new Date(String(row['updated_at'])),
    );
  }
}
