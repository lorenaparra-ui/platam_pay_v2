import { Inject, Injectable } from "@nestjs/common";
import { PartnerCategory } from "@partner-categories/domain/models/partner-category.model";
import {
  PARTNER_CATEGORIES_REPOSITORY,
  type PartnerCategoryRepositoryPort,
} from "@partner-categories/domain/ports/partner-category.repository.port";

@Injectable()
export class FindCategoriesByPartnerUseCase {
  constructor(
    @Inject(PARTNER_CATEGORIES_REPOSITORY)
    private readonly repository: PartnerCategoryRepositoryPort,
  ) {}

  execute(partnerExternalId: string): Promise<PartnerCategory[]> {
    return this.repository.findAll(partnerExternalId);
  }
}
