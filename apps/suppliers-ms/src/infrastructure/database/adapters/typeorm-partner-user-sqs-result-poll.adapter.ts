import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  TypeormSqsIdempotencyPollBaseAdapter,
  PartnerCreateUserSqsIdempotencyEntity,
} from '@app/transversal-data';
import type { PartnerUserSqsResultReaderPort } from '@modules/partners/application/ports/partner-user-sqs-result-reader.port';
import type { PartnerCreateUserIdempotencyResult } from '@app/transversal-data';

type PartnerOnboardingConfig = {
  readonly sqs_user_poll_timeout_ms: number;
  readonly sqs_user_poll_interval_ms: number;
};

@Injectable()
export class TypeormPartnerUserSqsResultPollAdapter
  extends TypeormSqsIdempotencyPollBaseAdapter<
    PartnerCreateUserSqsIdempotencyEntity,
    PartnerCreateUserIdempotencyResult
  >
  implements PartnerUserSqsResultReaderPort
{
  constructor(
    @InjectRepository(PartnerCreateUserSqsIdempotencyEntity)
    repo: Repository<PartnerCreateUserSqsIdempotencyEntity>,
    config_service: ConfigService,
  ) {
    const po = config_service.get<PartnerOnboardingConfig>('config.partner_onboarding');
    super(repo, {
      timeout_ms: po?.sqs_user_poll_timeout_ms ?? 60_000,
      interval_ms: po?.sqs_user_poll_interval_ms ?? 300,
    });
  }

  protected validate_result(raw: unknown): raw is PartnerCreateUserIdempotencyResult {
    if (typeof raw !== 'object' || raw === null) {
      return false;
    }
    const r = raw as Record<string, unknown>;
    return (
      typeof r['user_external_id'] === 'string' &&
      r['user_external_id'].length > 0 &&
      typeof r['person_external_id'] === 'string' &&
      r['person_external_id'].length > 0
    );
  }
}
