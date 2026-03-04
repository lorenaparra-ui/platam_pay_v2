import { Inject, Injectable } from "@nestjs/common";
import {
  PARTNERS_REPOSITORY,
  type PartnerRepositoryPort,
  type PartnerStatusCode,
} from "@partners/domain/ports/partner.repository.port";
import { Partner } from "@partners/domain/models/partner.model";

@Injectable()
export class ChangePartnerStatusUseCase {
  constructor(
    @Inject(PARTNERS_REPOSITORY)
    private readonly repository: PartnerRepositoryPort,
  ) {}

  execute(
    externalId: string,
    statusCode: PartnerStatusCode,
  ): Promise<Partner | null> {
    return this.repository.setStatusByExternalId(externalId, statusCode);
  }
}
