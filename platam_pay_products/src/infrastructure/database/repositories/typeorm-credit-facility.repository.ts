import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { CreditFacilityEntity, CategoryEntity } from "@libs/database";
import type {
  CreditFacilityRepositoryPort,
  CreateCreditFacilityWithCategoriesInput,
} from "../../../modules/credit-facilities/domain/ports/credit-facility.repository.port";
import type { CreditFacility } from "../../../modules/credit-facilities/domain/models/credit-facility.model";
import { CreditFacilityMapper } from "../mappers/credit-facility.mapper";

@Injectable()
export class TypeOrmCreditFacilityRepository
  implements CreditFacilityRepositoryPort
{
  constructor(
    @InjectDataSource()
    private readonly data_source: DataSource,
  ) {}

  async create_with_categories(
    input: CreateCreditFacilityWithCategoriesInput,
  ): Promise<CreditFacility> {
    return this.data_source.transaction(async (manager) => {
      const facility = manager.create(CreditFacilityEntity, {
        contractId: input.contract_id,
        statusId: input.status_id,
        totalLimit: input.total_limit,
      });
      const saved_facility = await manager.save(CreditFacilityEntity, facility);

      for (const cat of input.categories) {
        const row = manager.create(CategoryEntity, {
          creditFacilityId: saved_facility.id,
          partnerId: cat.partner_id ?? null,
          name: cat.name,
          discountPercentage: cat.discount_percentage,
          interestRate: cat.interest_rate,
          disbursementFeePercent: cat.disbursement_fee_percent,
          minimumDisbursementFee: cat.minimum_disbursement_fee,
          delayDays: cat.delay_days,
          termDays: cat.term_days,
          statusId: cat.status_id,
        });
        await manager.save(CategoryEntity, row);
      }

      const full = await manager.findOne(CreditFacilityEntity, {
        where: { id: saved_facility.id },
        relations: { categories: true },
      });
      if (!full) {
        throw new Error(
          "credit_facilities: registro no encontrado tras crear categorías",
        );
      }
      return CreditFacilityMapper.to_domain(full);
    });
  }
}
