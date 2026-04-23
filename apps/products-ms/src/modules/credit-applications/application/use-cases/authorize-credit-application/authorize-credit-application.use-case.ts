import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreditApplicationStatus, new_uuid, QUEUES_CONFIG, type SqsQueuesUrlsConfig } from '@platam/shared';
import { CREDIT_APPLICATION_REPOSITORY, REMINDER_SCHEDULER_PORT } from '@modules/credit-applications/credit-applications.tokens';
import { CreditApplicationRepository } from '@modules/credit-applications/domain/ports/credit-application.ports';
import type { ReminderSchedulerPort } from '@modules/credit-applications/domain/ports/reminder-scheduler.port';
import {
  OUTBOUND_MESSAGE_PUBLISHER_PORT,
  type OutboundMessagePublisherPort,
} from '@messaging/domain/ports/outbound-message-publisher.port';
import { TransversalEventType } from '@messaging/application/dto/transversal-outbound-event.dto';
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
    @Inject(OUTBOUND_MESSAGE_PUBLISHER_PORT)
    private readonly publisher: OutboundMessagePublisherPort,
    @Inject(QUEUES_CONFIG)
    private readonly queues: SqsQueuesUrlsConfig,
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

    const inbound_url = this.queues.inbound_queue_url;
    if (inbound_url) {
      try {
        await this.publisher.publish({
          queue_url: inbound_url,
          body: JSON.stringify({
            event_type: TransversalEventType.credit_application_pipeline_start,
            correlation_id: new_uuid(),
            payload: { credit_application_external_id: req.externalId },
          }),
        });
        this.logger.log(
          `[Auth][externalId=${req.externalId}][step=pipeline_trigger_published]`,
        );
      } catch (err: unknown) {
        const text = err instanceof Error ? err.message : String(err);
        this.logger.error(
          `[Auth][externalId=${req.externalId}][step=pipeline_trigger_failed] ${text}`,
        );
      }
    } else {
      this.logger.warn(
        `[Auth][externalId=${req.externalId}] inbound_queue_url no configurado — pipeline no disparado`,
      );
    }

    return new AuthorizeCreditApplicationResponse('authorized');
  }
}
