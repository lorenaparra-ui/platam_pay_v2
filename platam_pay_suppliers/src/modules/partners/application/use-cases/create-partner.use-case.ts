import { Inject, Injectable } from "@nestjs/common";
import {
  PARTNERS_REPOSITORY,
  type CreatePartnerPayload,
  type PartnerRepositoryPort,
} from "@partners/domain/ports/partner.repository.port";
import { Partner } from "@partners/domain/models/partner.model";

@Injectable()
export class CreatePartnerUseCase {
  constructor(
    @Inject(PARTNERS_REPOSITORY)
    private readonly repository: PartnerRepositoryPort,
  ) {}

  execute(payload: CreatePartnerPayload): Promise<Partner> {
    return this.repository.create(payload);
  }
}
