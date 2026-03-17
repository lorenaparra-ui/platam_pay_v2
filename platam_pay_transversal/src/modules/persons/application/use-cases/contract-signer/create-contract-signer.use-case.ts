import { Inject, Injectable } from '@nestjs/common';
import { ContractSigner } from '../../../domain/models/contract-signer.model';
import type { CreateContractSignerPayload } from '../../../domain/ports/contract-signer.repository.port';
import {
  CONTRACT_SIGNER_REPOSITORY,
  type ContractSignerRepositoryPort,
} from '../../../domain/ports/contract-signer.repository.port';
import type { CreateContractSignerRequestDto } from '../../dto/create-contract-signer-request.dto';

@Injectable()
export class CreateContractSignerUseCase {
  constructor(
    @Inject(CONTRACT_SIGNER_REPOSITORY)
    private readonly repository: ContractSignerRepositoryPort,
  ) {}

  async execute(dto: CreateContractSignerRequestDto): Promise<ContractSigner> {
    const payload: CreateContractSignerPayload = {
      contractId: dto.contractId ?? null,
      personId: dto.personId ?? null,
      zapsignSignerToken: dto.zapsignSignerToken ?? null,
      statusId: dto.statusId,
      signUrl: dto.signUrl ?? null,
      ipAddress: dto.ipAddress ?? null,
      geoLatitude: dto.geoLatitude ?? null,
      geoLongitude: dto.geoLongitude ?? null,
      signedAt: dto.signedAt ? new Date(dto.signedAt) : null,
      documentPhotoUrl: dto.documentPhotoUrl ?? null,
      documentVersePhotoUrl: dto.documentVersePhotoUrl ?? null,
      selfiePhotoUrl: dto.selfiePhotoUrl ?? null,
      signatureImageUrl: dto.signatureImageUrl ?? null,
    };
    return this.repository.create(payload);
  }
}
