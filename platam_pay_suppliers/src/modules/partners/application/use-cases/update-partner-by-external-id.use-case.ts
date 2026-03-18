import { Inject, Injectable } from "@nestjs/common";
import {
  PARTNERS_REPOSITORY,
  type PartnerRepositoryPort,
  type UpdatePartnerPayload,
} from "@partners/domain/ports/partner.repository.port";
import { Partner } from "@partners/domain/models/partner.model";

@Injectable()
export class UpdatePartnerByExternalIdUseCase {
  constructor(
    @Inject(PARTNERS_REPOSITORY)
    private readonly repository: PartnerRepositoryPort,
  ) {}

  execute(
    externalId: string,
    payload: UpdatePartnerPayload,
  ): Promise<Partner | null> {
    return this.repository.updateByExternalId(externalId, payload);
  }
}
