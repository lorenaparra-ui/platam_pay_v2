import { Inject, Injectable } from "@nestjs/common";
import {
  PARTNERS_REPOSITORY,
  type PartnerRepositoryPort,
} from "@partners/domain/ports/partner.repository.port";

@Injectable()
export class DeletePartnerByExternalIdUseCase {
  constructor(
    @Inject(PARTNERS_REPOSITORY)
    private readonly repository: PartnerRepositoryPort,
  ) {}

  execute(externalId: string): Promise<boolean> {
    return this.repository.deleteByExternalId(externalId);
  }
}
