import { Inject, Injectable } from '@nestjs/common';
import { CREDIT_APPLICATION_REPOSITORY } from '@modules/credit-applications/credit-applications.tokens';
import { CreditApplicationRepository } from '@modules/credit-applications/domain/ports/credit-application.ports';
import { build_credit_application_public_fields } from '@modules/credit-applications/application/mapping/credit-application-public-fields.builder';
import { ListCreditApplicationsByPartnerRequest } from './list-credit-applications-by-partner.request';
import { ListCreditApplicationsByPartnerItemResponse } from './list-credit-applications-by-partner.response';

@Injectable()
export class ListCreditApplicationsByPartnerUseCase {
  constructor(
    @Inject(CREDIT_APPLICATION_REPOSITORY)
    private readonly credit_application_repository: CreditApplicationRepository,
  ) {}

  async execute(
    req: ListCreditApplicationsByPartnerRequest,
  ): Promise<ListCreditApplicationsByPartnerItemResponse[]> {
    const rows = await this.credit_application_repository.find_by_partner_id(req.partnerId);
    return rows.map(
      (r) =>
        new ListCreditApplicationsByPartnerItemResponse(
          build_credit_application_public_fields(r),
        ),
    );
  }
}
