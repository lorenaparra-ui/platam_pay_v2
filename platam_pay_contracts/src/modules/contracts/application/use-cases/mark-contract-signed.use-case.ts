import { Inject, Injectable, Logger } from "@nestjs/common";
import {
  CONTRACT_REPOSITORY,
  type ContractRepositoryPort,
} from "@contracts/domain/ports/contract.repository.port";
import {
  CONTRACT_SIGNER_REPOSITORY,
  type ContractSignerRepositoryPort,
} from "@contracts/domain/ports/contract-signer.repository.port";
import {
  SIGNATURE_PROVIDER,
  type SignatureProviderPort,
} from "@contracts/domain/ports/signature-provider.port";
import type { MarkContractSignedInput } from "../dto/mark-contract-signed.input";

@Injectable()
export class MarkContractSignedUseCase {
  private readonly logger = new Logger(MarkContractSignedUseCase.name);

  constructor(
    @Inject(SIGNATURE_PROVIDER)
    private readonly signatureProvider: SignatureProviderPort,
    @Inject(CONTRACT_REPOSITORY)
    private readonly contractRepository: ContractRepositoryPort,
    @Inject(CONTRACT_SIGNER_REPOSITORY)
    private readonly contractSignerRepository: ContractSignerRepositoryPort,
  ) {}

  async execute(input: MarkContractSignedInput): Promise<boolean> {
    const normalizedEvent = this.signatureProvider.normalizeSignedWebhook(
      input.payload,
    );
    if (!normalizedEvent) {
      this.logger.warn("Webhook de firma ignorado: payload sin evento signed");
      return false;
    }

    const signer =
      await this.contractSignerRepository.findByProviderSignerToken(
        normalizedEvent.providerSignerToken,
      );
    if (!signer) {
      this.logger.warn(
        `No se encontro signer para token ${normalizedEvent.providerSignerToken}`,
      );
      return false;
    }

    await this.contractSignerRepository.updateSignedByProviderToken(
      normalizedEvent.providerSignerToken,
      {
        statusId: input.signerSignedStatusId,
        signedAt: normalizedEvent.signedAt,
        signUrl: normalizedEvent.signUrl ?? normalizedEvent.signedFileUrl,
        ipAddress: normalizedEvent.ipAddress,
        geoLatitude: normalizedEvent.geoLatitude,
        geoLongitude: normalizedEvent.geoLongitude,
        documentPhotoUrl: normalizedEvent.documentPhotoUrl,
        documentVersePhotoUrl: normalizedEvent.documentVersePhotoUrl,
        selfiePhotoUrl: normalizedEvent.selfiePhotoUrl,
        signatureImageUrl: normalizedEvent.signatureImageUrl,
      },
    );

    const contract = await this.contractRepository.findByProviderToken(
      normalizedEvent.providerDocumentToken,
    );
    if (!contract) {
      this.logger.warn(
        `No se encontro contrato para token ${normalizedEvent.providerDocumentToken}`,
      );
      return false;
    }

    await this.contractRepository.updateSignedDataById(contract.id, {
      statusId: input.contractSignedStatusId,
      signedFileUrl: normalizedEvent.signedFileUrl,
      formAnswersJson: normalizedEvent.rawPayload,
    });

    return true;
  }
}
