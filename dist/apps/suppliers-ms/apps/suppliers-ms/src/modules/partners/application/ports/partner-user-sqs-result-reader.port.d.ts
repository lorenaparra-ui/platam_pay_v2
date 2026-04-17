import type { SqsIdempotencyResultPollPort } from '@platam/shared';
import type { PartnerCreateUserIdempotencyResult } from '@app/transversal-data';
export declare const PARTNER_USER_SQS_RESULT_READER_PORT: unique symbol;
export type PartnerUserSqsCompletedResult = PartnerCreateUserIdempotencyResult;
export interface PartnerUserSqsResultReaderPort extends SqsIdempotencyResultPollPort<PartnerUserSqsCompletedResult> {
}
