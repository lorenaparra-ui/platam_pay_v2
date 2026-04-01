import type { SqsIdempotencyResultPollPort } from '@platam/shared';
import type { PartnerCreateUserIdempotencyResult } from '@app/transversal-data';

export const PARTNER_USER_SQS_RESULT_READER_PORT = Symbol(
  'PARTNER_USER_SQS_RESULT_READER_PORT',
);

export type PartnerUserSqsCompletedResult = PartnerCreateUserIdempotencyResult;

export interface PartnerUserSqsResultReaderPort
  extends SqsIdempotencyResultPollPort<PartnerUserSqsCompletedResult> {}
