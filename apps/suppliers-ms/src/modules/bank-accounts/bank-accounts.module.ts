import { Module } from '@nestjs/common';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { TypeormBankAccountRepository } from '@infrastructure/database/repositories/typeorm-bank-account.repository';
import { BANK_ACCOUNT_REPOSITORY } from './bank-accounts.tokens';
import { CreateBankAccountUseCase } from './application/use-cases/create-bank-account/create-bank-account.use-case';
import { GetBankAccountByExternalIdUseCase } from './application/use-cases/get-bank-account-by-external-id/get-bank-account-by-external-id.use-case';
import { ListBankAccountsUseCase } from './application/use-cases/list-bank-accounts/list-bank-accounts.use-case';
import { UpdateBankAccountByExternalIdUseCase } from './application/use-cases/update-bank-account-by-external-id/update-bank-account-by-external-id.use-case';
import { DeleteBankAccountByExternalIdUseCase } from './application/use-cases/delete-bank-account-by-external-id/delete-bank-account-by-external-id.use-case';

@Module({
  imports: [InfrastructureModule],
  providers: [
    {
      provide: BANK_ACCOUNT_REPOSITORY,
      useExisting: TypeormBankAccountRepository,
    },
    CreateBankAccountUseCase,
    GetBankAccountByExternalIdUseCase,
    ListBankAccountsUseCase,
    UpdateBankAccountByExternalIdUseCase,
    DeleteBankAccountByExternalIdUseCase,
  ],
  exports: [
    BANK_ACCOUNT_REPOSITORY,
    CreateBankAccountUseCase,
    GetBankAccountByExternalIdUseCase,
    ListBankAccountsUseCase,
    UpdateBankAccountByExternalIdUseCase,
    DeleteBankAccountByExternalIdUseCase,
  ],
})
export class BankAccountsModule {}
