import { Module } from '@nestjs/common';
import { CreateContractUseCase } from './application/use-cases/create-contract/create-contract.use-case';
import { GetContractByExternalIdUseCase } from './application/use-cases/get-contract-by-external-id/get-contract-by-external-id.use-case';
import { GetContractByIdUseCase } from './application/use-cases/get-contract-by-id/get-contract-by-id.use-case';
import { ListContractsUseCase } from './application/use-cases/list-contracts/list-contracts.use-case';
import { UpdateContractByExternalIdUseCase } from './application/use-cases/update-contract-by-external-id/update-contract-by-external-id.use-case';
import { DeleteContractByExternalIdUseCase } from './application/use-cases/delete-contract-by-external-id/delete-contract-by-external-id.use-case';
import { CreateContractWithZapsignUseCase } from './application/use-cases/create-contract-with-zapsign/create-contract-with-zapsign.use-case';
import { ProcessZapSignWebhookUseCase } from './application/use-cases/process-zapsign-webhook/process-zapsign-webhook.use-case';

@Module({
  providers: [
    CreateContractUseCase,
    CreateContractWithZapsignUseCase,
    ProcessZapSignWebhookUseCase,
    GetContractByIdUseCase,
    GetContractByExternalIdUseCase,
    ListContractsUseCase,
    UpdateContractByExternalIdUseCase,
    DeleteContractByExternalIdUseCase,
  ],
  exports: [
    CreateContractUseCase,
    CreateContractWithZapsignUseCase,
    ProcessZapSignWebhookUseCase,
    GetContractByIdUseCase,
    GetContractByExternalIdUseCase,
    ListContractsUseCase,
    UpdateContractByExternalIdUseCase,
    DeleteContractByExternalIdUseCase,
  ],
})
export class ContractsApplicationModule {}
