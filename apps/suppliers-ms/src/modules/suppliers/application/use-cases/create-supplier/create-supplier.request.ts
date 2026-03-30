import { NewSupplierBankAccountProps } from '@modules/suppliers/domain/entities/supplier.entity';

export class CreateSupplierRequest {
  constructor(
    readonly business_external_id: string,
    readonly new_bank_account: NewSupplierBankAccountProps | null,
  ) {}
}
