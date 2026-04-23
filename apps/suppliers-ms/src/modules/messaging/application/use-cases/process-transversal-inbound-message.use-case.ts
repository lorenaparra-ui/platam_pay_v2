import { Injectable, Logger } from '@nestjs/common';
import type { UseCase } from '@platam/shared';
import { TransversalInboundMessageDto } from '../dto/transversal-inbound-message.dto';
import { TransversalEventType } from '../dto/transversal-outbound-event.dto';
import {
  type CreateBusinessForJobInput,
  CreateBusinessForJobUseCase,
} from '@modules/businesses/application/use-cases/create-business-for-job/create-business-for-job.use-case';

type CreateBusinessJobPayload = {
  job_id?: unknown;
  person_internal_id?: unknown;
  city_internal_id?: unknown;
  entity_type?: unknown;
  business_name?: unknown;
  business_address?: unknown;
  business_type?: unknown;
  relationship_to_business?: unknown;
  already_exists?: unknown;
  business_internal_id?: unknown;
};

@Injectable()
export class ProcessTransversalInboundMessageUseCase
  implements UseCase<TransversalInboundMessageDto, void>
{
  private readonly logger = new Logger(ProcessTransversalInboundMessageUseCase.name);

  constructor(private readonly create_business_for_job: CreateBusinessForJobUseCase) {}

  async execute(dto: TransversalInboundMessageDto): Promise<void> {
    switch (dto.eventType) {
      case TransversalEventType.credit_application_business_requested:
        await this.handle_create_business(dto);
        return;
      default:
        this.logger.log(
          `Mensaje transversal recibido: event_type=${dto.eventType} correlation_id=${dto.correlationId}`,
        );
    }
  }

  private async handle_create_business(dto: TransversalInboundMessageDto): Promise<void> {
    const p = dto.payload as CreateBusinessJobPayload;

    const job_id = typeof p.job_id === 'string' ? p.job_id : null;
    if (!job_id) {
      this.logger.warn(`[CreateBusiness] job_id faltante correlation_id=${dto.correlationId}`);
      return;
    }

    const person_internal_id =
      typeof p.person_internal_id === 'number' ? p.person_internal_id : null;
    if (person_internal_id === null) {
      this.logger.warn(`[CreateBusiness] person_internal_id faltante job_id=${job_id}`);
      return;
    }

    const input: CreateBusinessForJobInput = {
      job_id,
      person_internal_id,
      city_internal_id:
        typeof p.city_internal_id === 'number' ? p.city_internal_id : null,
      entity_type: typeof p.entity_type === 'string' ? p.entity_type : 'natural',
      business_name: typeof p.business_name === 'string' ? p.business_name : null,
      business_address: typeof p.business_address === 'string' ? p.business_address : null,
      business_type: typeof p.business_type === 'string' ? p.business_type : null,
      relationship_to_business:
        typeof p.relationship_to_business === 'string' ? p.relationship_to_business : null,
      already_exists: p.already_exists === true,
      business_internal_id:
        typeof p.business_internal_id === 'number' ? p.business_internal_id : undefined,
    };

    try {
      await this.create_business_for_job.execute(input);
    } catch (err: unknown) {
      this.logger.error(
        `[CreateBusiness] error job_id=${job_id}: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }
}
