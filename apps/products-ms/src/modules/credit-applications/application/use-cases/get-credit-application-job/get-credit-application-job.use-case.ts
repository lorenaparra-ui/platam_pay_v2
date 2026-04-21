import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CREDIT_APPLICATION_JOB_REPOSITORY } from '@modules/credit-applications/credit-applications.tokens';
import type { CreditApplicationJobRepository } from '@modules/credit-applications/domain/ports/credit-application-job.port';
import { GetCreditApplicationJobRequest } from './get-credit-application-job.request';
import { GetCreditApplicationJobResponse } from './get-credit-application-job.response';

@Injectable()
export class GetCreditApplicationJobUseCase {
  constructor(
    @Inject(CREDIT_APPLICATION_JOB_REPOSITORY)
    private readonly job_repository: CreditApplicationJobRepository,
  ) {}

  async execute(req: GetCreditApplicationJobRequest): Promise<GetCreditApplicationJobResponse> {
    const job = await this.job_repository.find_by_external_id(req.jobId);
    if (!job) {
      throw new NotFoundException(`job no encontrado: ${req.jobId}`);
    }
    return new GetCreditApplicationJobResponse(
      job.externalId,
      job.status,
      job.step,
      job.resolvedIds.credit_application_external_id ?? null,
      job.errorMessage,
    );
  }
}
