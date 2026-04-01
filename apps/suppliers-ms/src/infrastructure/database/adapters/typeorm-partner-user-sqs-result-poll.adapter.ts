import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PartnerCreateUserSqsIdempotencyEntity } from '@app/transversal-data';
import type { PartnerUserSqsResultReaderPort } from '@modules/partners/application/ports/partner-user-sqs-result-reader.port';

type PartnerOnboardingConfig = {
  readonly sqs_user_poll_timeout_ms: number;
  readonly sqs_user_poll_interval_ms: number;
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@Injectable()
export class TypeormPartnerUserSqsResultPollAdapter implements PartnerUserSqsResultReaderPort {
  constructor(
    @InjectRepository(PartnerCreateUserSqsIdempotencyEntity)
    private readonly repo: Repository<PartnerCreateUserSqsIdempotencyEntity>,
    private readonly config_service: ConfigService,
  ) {}

  async wait_for_completed_result(
    idempotency_key: string,
  ): Promise<{ user_external_id: string; person_external_id: string }> {
    const po = this.config_service.get<PartnerOnboardingConfig>('config.partner_onboarding');
    const timeout_ms = po?.sqs_user_poll_timeout_ms ?? 60000;
    const interval_ms = po?.sqs_user_poll_interval_ms ?? 300;
    const deadline = Date.now() + timeout_ms;

    while (Date.now() < deadline) {
      const row = await this.repo.findOne({
        where: { idempotency_key },
        select: { result: true },
      });
      const r = row?.result;
      if (
        r !== null &&
        r !== undefined &&
        typeof r.user_external_id === 'string' &&
        r.user_external_id.length > 0 &&
        typeof r.person_external_id === 'string' &&
        r.person_external_id.length > 0
      ) {
        return {
          user_external_id: r.user_external_id,
          person_external_id: r.person_external_id,
        };
      }
      await sleep(interval_ms);
    }

    throw new Error(
      'Tiempo de espera agotado: transversal-ms no completó el mensaje SQS (usuario/persona)',
    );
  }
}
