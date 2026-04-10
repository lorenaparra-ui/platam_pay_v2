import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { TypeormSqsIdempotencyPollBaseAdapter, PartnerCreateUserSqsIdempotencyEntity } from '@app/transversal-data';
import type { PartnerUserSqsResultReaderPort } from '@modules/partners/application/ports/partner-user-sqs-result-reader.port';
import type { PartnerCreateUserIdempotencyResult } from '@app/transversal-data';
export declare class TypeormPartnerUserSqsResultPollAdapter extends TypeormSqsIdempotencyPollBaseAdapter<PartnerCreateUserSqsIdempotencyEntity, PartnerCreateUserIdempotencyResult> implements PartnerUserSqsResultReaderPort {
    constructor(repo: Repository<PartnerCreateUserSqsIdempotencyEntity>, config_service: ConfigService);
    protected validate_result(raw: unknown): raw is PartnerCreateUserIdempotencyResult;
}
