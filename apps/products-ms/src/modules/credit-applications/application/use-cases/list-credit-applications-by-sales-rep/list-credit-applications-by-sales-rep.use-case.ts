import { Inject, Injectable } from '@nestjs/common';
import { CREDIT_APPLICATION_REPOSITORY } from '@modules/credit-applications/credit-applications.tokens';
import { CreditApplicationRepository } from '@modules/credit-applications/domain/ports/credit-application.ports';
import { build_credit_application_public_fields } from '@modules/credit-applications/application/mapping/credit-application-public-fields.builder';
import { ListCreditApplicationsBySalesRepRequest } from './list-credit-applications-by-sales-rep.request';
import { ListCreditApplicationsBySalesRepItemResponse } from './list-credit-applications-by-sales-rep.response';

@Injectable()
export class ListCreditApplicationsBySalesRepUseCase {
  constructor(
    @Inject(CREDIT_APPLICATION_REPOSITORY)
    private readonly credit_application_repository: CreditApplicationRepository,
  ) {}

  async execute(
    req: ListCreditApplicationsBySalesRepRequest,
  ): Promise<ListCreditApplicationsBySalesRepItemResponse[]> {
    const rows = await this.credit_application_repository.find_by_sales_representative_id(
      req.salesRepresentativeId,
    );
    return rows.map(
      (r) =>
        new ListCreditApplicationsBySalesRepItemResponse(
          build_credit_application_public_fields(r),
        ),
    );
  }
}
