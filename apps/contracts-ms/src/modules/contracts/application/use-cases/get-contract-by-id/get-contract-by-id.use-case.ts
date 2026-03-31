import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CONTRACT_REFERENCE_LOOKUP } from '@common/ports/contract-reference-lookup.port';
import type { ContractReferenceLookupPort } from '@common/ports/contract-reference-lookup.port';
import { CONTRACT_REPOSITORY } from '@modules/contracts/contracts.tokens';
import type { ContractRepository } from '@modules/contracts/domain/ports/contract.repository.port';
import { build_contract_public_response } from '@modules/contracts/application/mapping/contract-public-fields.builder';

@Injectable()
export class GetContractByIdUseCase {
  constructor(
    @Inject(CONTRACT_REPOSITORY)
    private readonly contract_repository: ContractRepository,
    @Inject(CONTRACT_REFERENCE_LOOKUP)
    private readonly lookup: ContractReferenceLookupPort,
  ) {}

  async execute(internal_id: number) {
    const row = await this.contract_repository.find_by_id(internal_id);
    if (row === null) {
      throw new NotFoundException('contract not found');
    }
    return build_contract_public_response(row, this.lookup);
  }
}
