import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  SUPPLIERS_REFERENCE_LOOKUP,
  SuppliersReferenceLookupPort,
} from '@common/ports/suppliers-reference-lookup.port';
import { BUSINESS_REPOSITORY } from '@modules/businesses/businesses.tokens';
import { BusinessRepository } from '@modules/businesses/domain/repositories/business.repository';
import { build_business_public_fields } from '@modules/businesses/application/mapping/business-public-fields.builder';
import { GetBusinessByExternalIdRequest } from './get-business-by-external-id.request';
import { GetBusinessByExternalIdResponse } from './get-business-by-external-id.response';

@Injectable()
export class GetBusinessByExternalIdUseCase {
  constructor(
    @Inject(BUSINESS_REPOSITORY)
    private readonly business_repository: BusinessRepository,
    @Inject(SUPPLIERS_REFERENCE_LOOKUP)
    private readonly lookup: SuppliersReferenceLookupPort,
  ) {}

  async execute(
    req: GetBusinessByExternalIdRequest,
  ): Promise<GetBusinessByExternalIdResponse> {
    const row = await this.business_repository.find_by_external_id(req.external_id);
    if (row === null) {
      throw new NotFoundException('business not found');
    }
    const fields = await build_business_public_fields(row, this.lookup);
    return new GetBusinessByExternalIdResponse(fields);
  }
}
