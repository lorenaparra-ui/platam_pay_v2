import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreditFacilityEntity } from "@libs/database";
import type {
  CreditFacilityRepositoryPort,
  CreateCreditFacilityInput,
} from "../../../modules/credit-facilities/domain/ports/credit-facility.repository.port";
import type { CreditFacility } from "../../../modules/credit-facilities/domain/models/credit-facility.model";
import { CreditFacilityMapper } from "../mappers/credit-facility.mapper";

@Injectable()
export class TypeOrmCreditFacilityRepository
  implements CreditFacilityRepositoryPort
{
  constructor(
    @InjectRepository(CreditFacilityEntity)
    private readonly repository: Repository<CreditFacilityEntity>,
  ) {}

  async create(input: CreateCreditFacilityInput): Promise<CreditFacility> {
    const row = this.repository.create({
      contractId: input.contract_id,
      statusId: input.status_id,
      totalLimit: input.total_limit,
    });
    const saved = await this.repository.save(row);
    const full = await this.repository.findOne({ where: { id: saved.id } });
    if (!full) {
      throw new Error("credit_facilities: registro no encontrado tras crear");
    }
    return CreditFacilityMapper.to_domain(full);
  }
}
