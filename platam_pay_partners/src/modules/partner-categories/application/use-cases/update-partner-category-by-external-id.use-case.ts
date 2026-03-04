import { Inject, Injectable } from "@nestjs/common";
import { PartnerCategory } from "@partner-categories/domain/models/partner-category.model";
import {
  PARTNER_CATEGORIES_REPOSITORY,
  type PartnerCategoryRepositoryPort,
  type UpdatePartnerCategoryPayload,
} from "@partner-categories/domain/ports/partner-category.repository.port";

@Injectable()
export class UpdatePartnerCategoryByExternalIdUseCase {
  constructor(
    @Inject(PARTNER_CATEGORIES_REPOSITORY)
    private readonly repository: PartnerCategoryRepositoryPort,
  ) {}

  execute(
    externalId: string,
    payload: UpdatePartnerCategoryPayload,
  ): Promise<PartnerCategory | null> {
    return this.repository.updateByExternalId(externalId, payload);
  }
}
