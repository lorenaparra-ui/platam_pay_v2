import { Inject, Injectable } from '@nestjs/common';
import { CREDIT_APPLICATION_REPOSITORY } from '@modules/credit-applications/credit-applications.tokens';
import { CreditApplicationRepository } from '@modules/credit-applications/domain/ports/credit-application.ports';
import { build_credit_application_public_fields } from '@modules/credit-applications/application/mapping/credit-application-public-fields.builder';
import { ListCreditApplicationsItemResponse } from './list-credit-applications.response';

@Injectable()
export class ListCreditApplicationsUseCase {
  constructor(
    @Inject(CREDIT_APPLICATION_REPOSITORY)
    private readonly credit_application_repository: CreditApplicationRepository,
  ) {}

  async execute(): Promise<ListCreditApplicationsItemResponse[]> {
    const rows = await this.credit_application_repository.find_all();
    return rows.map(
      (r) =>
        new ListCreditApplicationsItemResponse(
          build_credit_application_public_fields(r),
        ),
    );
  }
}
