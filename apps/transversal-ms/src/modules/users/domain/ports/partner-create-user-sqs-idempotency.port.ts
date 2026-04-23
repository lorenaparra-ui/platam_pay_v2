import type { SqsIdempotencyPort } from '@platam/shared';
import type { PartnerCreateUserIdempotencyResult } from '@app/transversal-data';

export type PartnerCreateUserCachedResult = PartnerCreateUserIdempotencyResult;

/** Alias tipado del resultado genérico para mantener compatibilidad con el código existente. */
export type PartnerCreateUserIdempotencyBeginResult = Awaited<
  ReturnType<SqsIdempotencyPort<PartnerCreateUserCachedResult>['begin']>
>;

export interface PartnerCreateUserSqsIdempotencyPort
  extends SqsIdempotencyPort<PartnerCreateUserCachedResult> {}
