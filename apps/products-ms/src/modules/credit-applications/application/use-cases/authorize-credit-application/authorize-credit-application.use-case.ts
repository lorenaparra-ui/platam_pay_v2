import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreditApplicationStatus } from '@platam/shared';
import { CREDIT_APPLICATION_REPOSITORY, REMINDER_SCHEDULER_PORT } from '@modules/credit-applications/credit-applications.tokens';
import { CreditApplicationRepository } from '@modules/credit-applications/domain/ports/credit-application.ports';
import type { ReminderSchedulerPort } from '@modules/credit-applications/domain/ports/reminder-scheduler.port';
import { AuthorizeCreditApplicationRequest } from './authorize-credit-application.request';
import { AuthorizeCreditApplicationResponse } from './authorize-credit-application.response';

@Injectable()
export class AuthorizeCreditApplicationUseCase {
  private readonly logger = new Logger(AuthorizeCreditApplicationUseCase.name);

  constructor(
    @Inject(CREDIT_APPLICATION_REPOSITORY)
    private readonly credit_application_repository: CreditApplicationRepository,
    @Inject(REMINDER_SCHEDULER_PORT)
    private readonly reminder_scheduler: ReminderSchedulerPort,
  ) {}

  async execute(
    req: AuthorizeCreditApplicationRequest,
  ): Promise<AuthorizeCreditApplicationResponse> {
    const application = await this.credit_application_repository.find_by_external_id(req.externalId);

    if (application === null) {
      return new AuthorizeCreditApplicationResponse('not_found');
    }

    if (application.status !== CreditApplicationStatus.PENDING_AUTHORIZATION) {
      return new AuthorizeCreditApplicationResponse('already_authorized');
    }

    await this.credit_application_repository.update_by_external_id(req.externalId, {
      status: CreditApplicationStatus.IN_PROGRESS,
      privacy_policy_accepted: true,
      privacy_policy_date: new Date(),
    });

    try {
      await this.reminder_scheduler.cancel_reminders(req.externalId);
    } catch (err: unknown) {
      const text = err instanceof Error ? err.message : String(err);
      this.logger.warn(
        `[Auth][externalId=${req.externalId}][step=cancel_reminders_failed] ${text}`,
      );
    }

    this.logger.log(
      `[Auth][externalId=${req.externalId}][step=authorized][newStatus=in_progress]`,
    );

    return new AuthorizeCreditApplicationResponse('authorized');
  }
}
