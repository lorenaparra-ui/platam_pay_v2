import { Inject, Injectable } from "@nestjs/common";
import type { CreditFacilityRepositoryPort } from "../../domain/ports/credit-facility.repository.port";
import {
  CREDIT_FACILITY_REPOSITORY,
  type CreateCreditFacilityInput,
} from "../../domain/ports/credit-facility.repository.port";
import type { CreditFacility } from "../../domain/models/credit-facility.model";

@Injectable()
export class CreateCreditFacilityUseCase {
  constructor(
    @Inject(CREDIT_FACILITY_REPOSITORY)
    private readonly repository: CreditFacilityRepositoryPort,
  ) {}

  async run(input: CreateCreditFacilityInput): Promise<CreditFacility> {
    return this.repository.create(input);
  }
}
