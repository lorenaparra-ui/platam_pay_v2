import { Inject, Injectable } from '@nestjs/common';
import type { ContractCatalogStatus } from '@platam/shared';
import { CONTRACT_REFERENCE_LOOKUP } from '@common/ports/contract-reference-lookup.port';
import type { ContractReferenceLookupPort } from '@common/ports/contract-reference-lookup.port';
import { CONTRACT_REPOSITORY } from '@modules/contracts/contracts.tokens';
import type { ContractRepository } from '@modules/contracts/domain/ports/contract.repository.port';
import { build_contract_public_response } from '@modules/contracts/application/mapping/contract-public-fields.builder';
import type { PaginatedResponseDto } from '@platam/shared';
import type { ContractPublicResponseDto } from '@modules/contracts/presentation/dto/contract-public-response.dto';

export type ListContractsQuery = Readonly<{
  offset: number;
  limit: number;
  user_id?: number;
  /** credit_applications.id (interno). */
  credit_application_id?: number;
  status_external_id?: string;
}>;

@Injectable()
export class ListContractsUseCase {
  constructor(
    @Inject(CONTRACT_REPOSITORY)
    private readonly contract_repository: ContractRepository,
    @Inject(CONTRACT_REFERENCE_LOOKUP)
    private readonly lookup: ContractReferenceLookupPort,
  ) {}

  async execute(
    query: ListContractsQuery,
  ): Promise<PaginatedResponseDto<ContractPublicResponseDto>> {
    let status: ContractCatalogStatus | undefined;
    if (query.status_external_id !== undefined) {
      const resolved = await this.lookup.get_contract_catalog_status_by_external_id(
        query.status_external_id,
      );
      if (resolved === null) {
        return {
          items: [],
          total: 0,
          offset: query.offset,
          limit: query.limit,
        };
      }
      status = resolved;
    }

    const filters = {
      user_id: query.user_id,
      credit_application_internal_id: query.credit_application_id,
      status,
    };

    const { items, total } = await this.contract_repository.find_page(
      filters,
      query.offset,
      query.limit,
    );

    const mapped = await Promise.all(
      items.map((c) => build_contract_public_response(c, this.lookup)),
    );

    return {
      items: mapped,
      total,
      offset: query.offset,
      limit: query.limit,
    };
  }
}
