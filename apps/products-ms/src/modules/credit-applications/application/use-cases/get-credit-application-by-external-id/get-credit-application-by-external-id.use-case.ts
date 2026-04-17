import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CREDIT_APPLICATION_REPOSITORY } from '@modules/credit-applications/credit-applications.tokens';
import { CreditApplicationRepository } from '@modules/credit-applications/domain/ports/credit-application.ports';
import { build_credit_application_public_fields } from '@modules/credit-applications/application/mapping/credit-application-public-fields.builder';
import { GetCreditApplicationByExternalIdRequest } from './get-credit-application-by-external-id.request';
import { GetCreditApplicationByExternalIdResponse } from './get-credit-application-by-external-id.response';

@Injectable()
export class GetCreditApplicationByExternalIdUseCase {
  constructor(
    @Inject(CREDIT_APPLICATION_REPOSITORY)
    private readonly credit_application_repository: CreditApplicationRepository,
  ) {}

  async execute(
    req: GetCreditApplicationByExternalIdRequest,
  ): Promise<GetCreditApplicationByExternalIdResponse> {
    const row = await this.credit_application_repository.find_by_external_id(
      req.externalId,
    );
    if (!row) {
      throw new NotFoundException('credit application not found');
    }

    const fields = build_credit_application_public_fields(row);
    return new GetCreditApplicationByExternalIdResponse(fields);
  }
}
