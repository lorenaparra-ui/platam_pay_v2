import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import {
  CONTRACT_REPOSITORY,
  type ContractRepositoryPort,
} from "@contracts/domain/ports/contract.repository.port";
import {
  SIGNATURE_PROVIDER,
  type SignatureProviderPort,
} from "@contracts/domain/ports/signature-provider.port";

@Injectable()
export class CancelContractUseCase {
  constructor(
    @Inject(CONTRACT_REPOSITORY)
    private readonly contractRepository: ContractRepositoryPort,
    @Inject(SIGNATURE_PROVIDER)
    private readonly signatureProvider: SignatureProviderPort,
  ) {}

  async execute(externalId: string, cancelledStatusId: number): Promise<void> {
    const contract = await this.contractRepository.findByExternalId(externalId);
    if (!contract) {
      throw new NotFoundException("Contrato no encontrado");
    }

    if (contract.providerToken) {
      await this.signatureProvider.cancelDocument(contract.providerToken);
    }

    await this.contractRepository.updateStatusById(contract.id, cancelledStatusId);
  }
}
