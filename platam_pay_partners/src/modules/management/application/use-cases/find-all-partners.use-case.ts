import { Inject, Injectable } from "@nestjs/common";
import {
  PARTNERS_REPOSITORY,
  type PartnerRepositoryPort,
} from "@partners/domain/ports/partner.repository.port";
import { Partner } from "@partners/domain/models/partner.model";

@Injectable()
export class FindAllPartnersUseCase {
  constructor(
    @Inject(PARTNERS_REPOSITORY)
    private readonly repository: PartnerRepositoryPort,
  ) {}

  execute(search?: string): Promise<Partner[]> {
    return this.repository.findAll(search);
  }
}
