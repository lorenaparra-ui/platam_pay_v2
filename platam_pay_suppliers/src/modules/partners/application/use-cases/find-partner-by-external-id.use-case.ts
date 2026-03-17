import { Inject, Injectable } from "@nestjs/common";
import {
  PARTNERS_REPOSITORY,
  type PartnerRepositoryPort,
} from "@partners/domain/ports/partner.repository.port";
import { Partner } from "@partners/domain/models/partner.model";

@Injectable()
export class FindPartnerByExternalIdUseCase {
  constructor(
    @Inject(PARTNERS_REPOSITORY)
    private readonly repository: PartnerRepositoryPort,
  ) {}

  execute(externalId: string): Promise<Partner | null> {
    return this.repository.findByExternalId(externalId);
  }
}
