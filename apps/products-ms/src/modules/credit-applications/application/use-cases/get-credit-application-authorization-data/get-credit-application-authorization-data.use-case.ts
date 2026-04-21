import { Inject, Injectable } from '@nestjs/common';
import { CreditApplicationStatus } from '@platam/shared';
import { CREDIT_APPLICATION_REPOSITORY } from '@modules/credit-applications/credit-applications.tokens';
import { CreditApplicationRepository } from '@modules/credit-applications/domain/ports/credit-application.ports';
import { GetCreditApplicationAuthorizationDataRequest } from './get-credit-application-authorization-data.request';
import {
  AuthorizationLandingStatus,
  GetCreditApplicationAuthorizationDataResponse,
} from './get-credit-application-authorization-data.response';

@Injectable()
export class GetCreditApplicationAuthorizationDataUseCase {
  constructor(
    @Inject(CREDIT_APPLICATION_REPOSITORY)
    private readonly credit_application_repository: CreditApplicationRepository,
  ) {}

  async execute(
    req: GetCreditApplicationAuthorizationDataRequest,
  ): Promise<GetCreditApplicationAuthorizationDataResponse> {
    const application = await this.credit_application_repository.find_by_external_id(req.externalId);

    if (application === null) {
      return new GetCreditApplicationAuthorizationDataResponse('not_found', req.externalId);
    }

    const status: AuthorizationLandingStatus =
      application.status === CreditApplicationStatus.PENDING_AUTHORIZATION
        ? 'pending'
        : 'already_authorized';

    return new GetCreditApplicationAuthorizationDataResponse(status, req.externalId);
  }
}
