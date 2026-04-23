import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AsyncJobStatus, AsyncJobStep, new_uuid } from '@platam/shared';
import { CREDIT_APPLICATION_JOB_REPOSITORY } from '@modules/credit-applications/credit-applications.tokens';
import type { CreditApplicationJobRecord, CreditApplicationJobRepository } from '@modules/credit-applications/domain/ports/credit-application-job.port';
import {
  CLIENT_REGISTRATION_PORT,
  ClientRegistrationPort,
} from '@modules/credit-applications/application/ports/client-registration.port';
import { PublishCreateBusinessJobUseCase } from '@messaging/application/use-cases/publish-create-business-job.use-case';

const POLL_INTERVAL_MS = 5_000;

@Injectable()
export class CreditApplicationJobWorkerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(CreditApplicationJobWorkerService.name);
  private timer: NodeJS.Timeout | null = null;

  constructor(
    @Inject(CREDIT_APPLICATION_JOB_REPOSITORY)
    private readonly job_repo: CreditApplicationJobRepository,
    @Inject(CLIENT_REGISTRATION_PORT)
    private readonly client_registration: ClientRegistrationPort,
    @InjectDataSource()
    private readonly ds: DataSource,
    private readonly publish_create_business_job: PublishCreateBusinessJobUseCase,
  ) {}

  onModuleInit(): void {
    this.timer = setInterval(() => void this.tick(), POLL_INTERVAL_MS);
  }

  onModuleDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private async tick(): Promise<void> {
    try {
      await this.process_awaiting_person_jobs();
    } catch (err: unknown) {
      this.logger.error(`Error en tick del worker: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  private async process_awaiting_person_jobs(): Promise<void> {
    const jobs = await this.job_repo.find_by_step(AsyncJobStep.AWAITING_PERSON_CREATION);
    for (const job of jobs) {
      await this.handle_awaiting_person(job).catch((err: unknown) => {
        this.logger.error(
          `[job=${job.externalId}] Error procesando AWAITING_PERSON_CREATION: ${err instanceof Error ? err.message : String(err)}`,
        );
      });
    }
  }

  private async handle_awaiting_person(job: CreditApplicationJobRecord): Promise<void> {
    const sqs_idempotency_key = `job_create_person_${job.externalId}`;

    const rows: Array<{ result: unknown }> = await this.ds.query(
      `SELECT result
       FROM transversal_schema.partner_create_user_sqs_idempotency
       WHERE idempotency_key = $1 AND result IS NOT NULL
       LIMIT 1`,
      [sqs_idempotency_key],
    );

    if (!rows.length || rows[0].result === null) {
      return;
    }

    const raw = rows[0].result as Record<string, unknown>;
    const person_external_id = typeof raw['person_external_id'] === 'string'
      ? raw['person_external_id']
      : null;

    if (!person_external_id) {
      this.logger.warn(`[job=${job.externalId}] person_external_id vacío en idempotencia`);
      return;
    }

    const person_id = await this.client_registration.get_person_internal_id_by_external_id(
      person_external_id,
    );
    if (person_id === null) {
      this.logger.warn(`[job=${job.externalId}] person no encontrado por external_id=${person_external_id}`);
      return;
    }

    if (job.payload.email || job.payload.birth_date) {
      await this.client_registration.patch_person_email_and_birth_date(
        person_id,
        job.payload.email ?? null,
        job.payload.birth_date ?? null,
      );
    }

    const business_id = await this.client_registration.find_business_by_person_id(person_id);

    if (business_id !== null) {
      await this.job_repo.update_status_and_step(
        job.id,
        AsyncJobStatus.RUNNING,
        AsyncJobStep.AWAITING_BUSINESS_CREATION,
        { person_internal_id: person_id, person_external_id, business_internal_id: business_id },
      );
      await this.publish_create_business_job.execute_already_resolved(
        job.externalId,
        person_id,
        business_id,
      );
    } else {
      await this.job_repo.update_status_and_step(
        job.id,
        AsyncJobStatus.RUNNING,
        AsyncJobStep.AWAITING_BUSINESS_CREATION,
        { person_internal_id: person_id, person_external_id },
      );
      await this.publish_create_business_job.execute(job.externalId, person_id, {
        city_internal_id: job.resolvedIds.city_internal_id ?? null,
        entity_type: job.payload.business_type,
        business_name: job.payload.business_name,
        business_address: job.payload.business_address,
        business_type: job.payload.business_type,
        relationship_to_business: job.payload.relationship_to_business,
      });
    }

    this.logger.log(
      `[job=${job.externalId}] AWAITING_PERSON_CREATION → AWAITING_BUSINESS_CREATION person_id=${person_id}`,
    );
  }
}
