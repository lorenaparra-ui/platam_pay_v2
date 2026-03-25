import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContractEntity, ContractSignerEntity } from "@libs/database";
import {
  CONTRACT_REPOSITORY,
} from "./domain/ports/contract.repository.port";
import {
  CONTRACT_SIGNER_REPOSITORY,
} from "./domain/ports/contract-signer.repository.port";
import { SIGNATURE_PROVIDER } from "./domain/ports/signature-provider.port";
import { TypeOrmContractRepository } from "@infrastructure/database/repositories/typeorm-contract.repository";
import { TypeOrmContractSignerRepository } from "@infrastructure/database/repositories/typeorm-contract-signer.repository";
import { ZapSignSignatureProviderAdapter } from "@infrastructure/signature-providers/zapsign/zapsign-signature-provider.adapter";
import { CreateContractFromApprovalUseCase } from "./application/use-cases/create-contract-from-approval.use-case";
import { MarkContractSignedUseCase } from "./application/use-cases/mark-contract-signed.use-case";
import { CancelContractUseCase } from "./application/use-cases/cancel-contract.use-case";
import { FindContractByExternalIdUseCase } from "./application/use-cases/find-contract-by-external-id.use-case";
import { ContractsInternalController } from "./presentation/contracts-internal.controller";

@Module({
  imports: [TypeOrmModule.forFeature([ContractEntity, ContractSignerEntity])],
  controllers: [ContractsInternalController],
  providers: [
    {
      provide: CONTRACT_REPOSITORY,
      useClass: TypeOrmContractRepository,
    },
    {
      provide: CONTRACT_SIGNER_REPOSITORY,
      useClass: TypeOrmContractSignerRepository,
    },
    {
      provide: SIGNATURE_PROVIDER,
      useClass: ZapSignSignatureProviderAdapter,
    },
    CreateContractFromApprovalUseCase,
    MarkContractSignedUseCase,
    CancelContractUseCase,
    FindContractByExternalIdUseCase,
  ],
  exports: [
    CONTRACT_REPOSITORY,
    CONTRACT_SIGNER_REPOSITORY,
    SIGNATURE_PROVIDER,
    CreateContractFromApprovalUseCase,
    MarkContractSignedUseCase,
    CancelContractUseCase,
    FindContractByExternalIdUseCase,
  ],
})
export class ContractsModule {}
