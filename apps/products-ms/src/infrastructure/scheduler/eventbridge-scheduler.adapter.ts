import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SchedulerClient,
  CreateScheduleCommand,
  DeleteScheduleCommand,
  ResourceNotFoundException,
  FlexibleTimeWindowMode,
  ActionAfterCompletion,
} from '@aws-sdk/client-scheduler';
import type {
  ReminderSchedulerPort,
  ScheduleReminderParams,
} from '@modules/credit-applications/domain/ports/reminder-scheduler.port';

/** Nombre del schedule = "platam-auth-{reminder_type}_{channel_short}-{externalId}" */
type ChannelShort = 'wa' | 'email';

@Injectable()
export class EventBridgeSchedulerAdapter implements ReminderSchedulerPort {
  private readonly logger = new Logger(EventBridgeSchedulerAdapter.name);

  constructor(private readonly config_service: ConfigService) {}

  async schedule_reminder(params: ScheduleReminderParams): Promise<void> {
    const client = this.create_client();
    const group_name = this.get_group_name();
    const role_arn = this.get_role_arn();
    const target_arn = this.get_target_arn();

    const channel_short: ChannelShort =
      params.notification.channel === 'whatsapp_template' ? 'wa' : 'email';

    const schedule_name = this.build_schedule_name(
      params.credit_application_external_id,
      params.reminder_type,
      channel_short,
    );

    const fire_at_expression = `at(${params.fire_at.toISOString().replace(/\.\d{3}Z$/, '')})`;

    const sqs_envelope = this.build_sqs_envelope(
      params.credit_application_external_id,
      params.reminder_type,
      channel_short,
      params.notification,
    );

    try {
      await client.send(
        new CreateScheduleCommand({
          Name: schedule_name,
          GroupName: group_name,
          ScheduleExpression: fire_at_expression,
          ScheduleExpressionTimezone: 'UTC',
          Target: {
            Arn: target_arn,
            RoleArn: role_arn,
            Input: JSON.stringify(sqs_envelope),
          },
          FlexibleTimeWindow: { Mode: FlexibleTimeWindowMode.OFF },
          ActionAfterCompletion: ActionAfterCompletion.DELETE,
        }),
      );
      this.logger.log(
        `[Scheduler][step=created][name=${schedule_name}][fireAt=${params.fire_at.toISOString()}]`,
      );
    } catch (err: unknown) {
      const text = err instanceof Error ? err.message : String(err);
      this.logger.error(`[Scheduler][step=create_failed][name=${schedule_name}] ${text}`);
      throw err instanceof Error ? err : new Error(text);
    }
  }

  async cancel_reminders(credit_application_external_id: string): Promise<void> {
    const client = this.create_client();
    const group_name = this.get_group_name();

    const names: string[] = [];
    for (const reminder_type of ['reminder_1', 'reminder_2'] as const) {
      for (const channel_short of ['wa', 'email'] as const) {
        names.push(
          this.build_schedule_name(credit_application_external_id, reminder_type, channel_short),
        );
      }
    }

    for (const schedule_name of names) {
      try {
        await client.send(
          new DeleteScheduleCommand({ Name: schedule_name, GroupName: group_name }),
        );
        this.logger.log(`[Scheduler][step=cancelled][name=${schedule_name}]`);
      } catch (err: unknown) {
        if (err instanceof ResourceNotFoundException) {
          this.logger.log(
            `[Scheduler][step=cancel_not_found][name=${schedule_name}] — ya ejecutado o no creado`,
          );
          continue;
        }
        const text = err instanceof Error ? err.message : String(err);
        this.logger.warn(`[Scheduler][step=cancel_failed][name=${schedule_name}] ${text}`);
      }
    }
  }

  private build_schedule_name(
    external_id: string,
    reminder_type: string,
    channel_short: ChannelShort,
  ): string {
    return `platam-auth-${reminder_type}_${channel_short}-${external_id}`;
  }

  private build_sqs_envelope(
    external_id: string,
    reminder_type: string,
    channel_short: ChannelShort,
    notification: ScheduleReminderParams['notification'],
  ): Record<string, unknown> {
    const correlation_id = `reminder-${reminder_type}-${channel_short}-${external_id}`;
    if (notification.channel === 'whatsapp_template') {
      return {
        event: 'send-notification',
        version: '1.0',
        correlation_id,
        channel: 'whatsapp_template',
        payload: {
          to_e164: notification.to_e164,
          content_sid: notification.content_sid,
          content_variables: notification.content_variables,
        },
      };
    }
    return {
      event: 'send-notification',
      version: '1.0',
      correlation_id,
      channel: 'email',
      payload: {
        to: notification.to,
        subject: notification.subject,
        html: notification.html,
      },
    };
  }

  private create_client(): SchedulerClient {
    const region =
      this.config_service.get<string>('sqs.region') ??
      process.env.AWS_REGION ??
      'us-east-1';
    return new SchedulerClient({ region });
  }

  private get_group_name(): string {
    return (
      process.env.EVENTBRIDGE_SCHEDULER_GROUP_NAME ??
      'platam-auth-reminders'
    );
  }

  private get_role_arn(): string {
    const arn = process.env.EVENTBRIDGE_SCHEDULER_ROLE_ARN;
    if (!arn) throw new Error('EVENTBRIDGE_SCHEDULER_ROLE_ARN no configurado');
    return arn;
  }

  private get_target_arn(): string {
    const arn =
      process.env.EVENTBRIDGE_SCHEDULER_TARGET_ARN ??
      this.config_service.get<string>('sqs.notifications_inbound_queue_url');
    if (!arn) throw new Error('EVENTBRIDGE_SCHEDULER_TARGET_ARN no configurado');
    return arn;
  }
}
