import { Inject, Injectable } from "@nestjs/common";
import type { Contract } from "@contracts/domain/models/contract.model";
import type { ContractSigner } from "@contracts/domain/models/contract-signer.model";
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
  type SignatureDocumentSnapshotSigner,
  type SignatureProviderPort,
} from "@contracts/domain/ports/signature-provider.port";

export interface FindContractByExternalIdOutput {
  contract: Contract;
  signer: ContractSigner | null;
  providerDocumentStatus: string | null;
  synchronizedWithProvider: boolean;
}

@Injectable()
export class FindContractByExternalIdUseCase {
  constructor(
    @Inject(CONTRACT_REPOSITORY)
    private readonly contractRepository: ContractRepositoryPort,
    @Inject(CONTRACT_SIGNER_REPOSITORY)
    private readonly contractSignerRepository: ContractSignerRepositoryPort,
    @Inject(SIGNATURE_PROVIDER)
    private readonly signatureProvider: SignatureProviderPort,
  ) {}

  async execute(externalId: string): Promise<FindContractByExternalIdOutput | null> {
    let contract = await this.contractRepository.findByExternalId(externalId);
    if (!contract) {
      return null;
    }

    let signer = await this.contractSignerRepository.findByContractId(contract.id);
    let providerDocumentStatus: string | null = null;
    let synchronizedWithProvider = false;

    if (contract.providerToken) {
      const snapshot = await this.signatureProvider.getDocumentSnapshot(contract.providerToken);
      if (snapshot) {
        providerDocumentStatus = snapshot.documentStatus;
        synchronizedWithProvider = true;

        if (snapshot.signedFileUrl && snapshot.signedFileUrl !== contract.signedFileUrl) {
          const updatedContract = await this.contractRepository.updateSignedDataById(
            contract.id,
            {
              statusId: contract.statusId,
              signedFileUrl: snapshot.signedFileUrl,
              formAnswersJson: snapshot.rawPayload,
            },
          );
          if (updatedContract) {
            contract = updatedContract;
          }
        }

        if (signer) {
          const providerSigner = this.pickSnapshotSigner(snapshot.signers, signer);
          if (providerSigner && signer.providerSignerToken) {
            const nextSignUrl = snapshot.signedFileUrl ?? providerSigner.signUrl ?? signer.signUrl;
            const updatedSigner =
              await this.contractSignerRepository.updateSignedByProviderToken(
                signer.providerSignerToken,
                {
                  statusId: signer.statusId,
                  signedAt: providerSigner.signedAt ?? signer.signedAt,
                  signUrl: nextSignUrl,
                  ipAddress: providerSigner.ipAddress ?? signer.ipAddress,
                  geoLatitude: providerSigner.geoLatitude ?? signer.geoLatitude,
                  geoLongitude: providerSigner.geoLongitude ?? signer.geoLongitude,
                  documentPhotoUrl: providerSigner.documentPhotoUrl ?? signer.documentPhotoUrl,
                  documentVersePhotoUrl:
                    providerSigner.documentVersePhotoUrl ?? signer.documentVersePhotoUrl,
                  selfiePhotoUrl: providerSigner.selfiePhotoUrl ?? signer.selfiePhotoUrl,
                  signatureImageUrl: providerSigner.signatureImageUrl ?? signer.signatureImageUrl,
                },
              );
            if (updatedSigner) {
              signer = updatedSigner;
            }
          }
        }
      }
    }

    return {
      contract,
      signer,
      providerDocumentStatus,
      synchronizedWithProvider,
    };
  }

  private pickSnapshotSigner(
    signers: SignatureDocumentSnapshotSigner[],
    signer: ContractSigner,
  ): SignatureDocumentSnapshotSigner | null {
    if (signers.length === 0) return null;
    if (!signer.providerSignerToken) return signers[0];
    return (
      signers.find((item) => item.providerSignerToken === signer.providerSignerToken) ??
      signers[0]
    );
  }
}
