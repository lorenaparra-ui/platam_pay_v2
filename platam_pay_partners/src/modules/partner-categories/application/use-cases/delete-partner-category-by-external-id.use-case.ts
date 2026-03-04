import { Inject, Injectable } from "@nestjs/common";
import {
  PARTNER_CATEGORIES_REPOSITORY,
  type PartnerCategoryRepositoryPort,
} from "@partner-categories/domain/ports/partner-category.repository.port";

@Injectable()
export class DeletePartnerCategoryByExternalIdUseCase {
  constructor(
    @Inject(PARTNER_CATEGORIES_REPOSITORY)
    private readonly repository: PartnerCategoryRepositoryPort,
  ) {}

  execute(externalId: string): Promise<boolean> {
    return this.repository.deleteByExternalId(externalId);
  }
}
