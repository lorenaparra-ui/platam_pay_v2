import { Injectable, Logger } from "@nestjs/common";
import type { PartnerCategoriesServicePort } from "../events/handlers/partner-categories-create.handler";

@Injectable()
export class PartnerCategoriesServiceStubAdapter implements PartnerCategoriesServicePort {
  private readonly logger = new Logger(PartnerCategoriesServiceStubAdapter.name);

  async createCreditFacilityAndCategories(): Promise<{ credit_facility_id: number }> {
    this.logger.warn(
      "PartnerCategoriesServiceStub: no-op. Configure PARTNER_CATEGORIES_SERVICE with products client in production.",
    );
    return { credit_facility_id: 0 };
  }
}
