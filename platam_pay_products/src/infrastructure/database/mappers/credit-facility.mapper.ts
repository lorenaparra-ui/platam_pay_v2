import type { CreditFacility } from "../../../modules/credit-facilities/domain/models/credit-facility.model";
import { CreditFacilityEntity } from "@libs/database";
import { CategoryMapper } from "./category.mapper";

export class CreditFacilityMapper {
  static to_domain(entity: CreditFacilityEntity): CreditFacility {
    const categories = (entity.categories ?? []).map((c) =>
      CategoryMapper.to_domain(c),
    );
    return {
      id: Number(entity.id),
      external_id: entity.externalId,
      contract_id: entity.contractId ?? null,
      status_id: Number(entity.statusId),
      total_limit: String(entity.totalLimit),
      created_at: entity.createdAt,
      updated_at: entity.updatedAt,
      categories,
    };
  }
}
