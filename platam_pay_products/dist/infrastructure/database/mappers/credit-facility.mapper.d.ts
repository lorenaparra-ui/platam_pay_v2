import type { CreditFacility } from "../../../modules/credit-facilities/domain/models/credit-facility.model";
import { CreditFacilityEntity } from "@libs/database";
export declare class CreditFacilityMapper {
    static to_domain(entity: CreditFacilityEntity): CreditFacility;
}
