import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeormSqsIdempotencyBaseAdapter } from '@app/transversal-data';
import { PartnerCreateUserSqsIdempotencyEntity } from '@app/transversal-data';
import type {
  PartnerCreateUserCachedResult,
  PartnerCreateUserSqsIdempotencyPort,
} from '@modules/users/domain/ports/partner-create-user-sqs-idempotency.port';

@Injectable()
export class TypeormPartnerCreateUserSqsIdempotencyAdapter
  extends TypeormSqsIdempotencyBaseAdapter<
    PartnerCreateUserSqsIdempotencyEntity,
    PartnerCreateUserCachedResult
  >
  implements PartnerCreateUserSqsIdempotencyPort
{
  constructor(
    @InjectRepository(PartnerCreateUserSqsIdempotencyEntity)
    repo: Repository<PartnerCreateUserSqsIdempotencyEntity>,
  ) {
    super(repo);
  }
}
