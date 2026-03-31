import { Module } from '@nestjs/common';
import { CreateContractUseCase } from './application/use-cases/create-contract/create-contract.use-case';
import { GetContractByExternalIdUseCase } from './application/use-cases/get-contract-by-external-id/get-contract-by-external-id.use-case';
import { GetContractByIdUseCase } from './application/use-cases/get-contract-by-id/get-contract-by-id.use-case';
import { ListContractsUseCase } from './application/use-cases/list-contracts/list-contracts.use-case';
import { UpdateContractByExternalIdUseCase } from './application/use-cases/update-contract-by-external-id/update-contract-by-external-id.use-case';
import { DeleteContractByExternalIdUseCase } from './application/use-cases/delete-contract-by-external-id/delete-contract-by-external-id.use-case';

@Module({
  providers: [
    CreateContractUseCase,
    GetContractByIdUseCase,
    GetContractByExternalIdUseCase,
    ListContractsUseCase,
    UpdateContractByExternalIdUseCase,
    DeleteContractByExternalIdUseCase,
  ],
  exports: [
    CreateContractUseCase,
    GetContractByIdUseCase,
    GetContractByExternalIdUseCase,
    ListContractsUseCase,
    UpdateContractByExternalIdUseCase,
    DeleteContractByExternalIdUseCase,
  ],
})
export class ContractsApplicationModule {}
