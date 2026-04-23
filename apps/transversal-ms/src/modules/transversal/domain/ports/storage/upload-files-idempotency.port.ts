import type { SqsIdempotencyPort } from '@platam/shared';
import type { UploadFilesIdempotencyResult } from '@app/transversal-data';

/**
 * El resultado cacheado mantiene la forma { files: [...] } para preservar
 * compatibilidad con los use-cases existentes que acceden a `result.files`.
 */
export type CachedUploadFilesResult = Readonly<{
  files: UploadFilesIdempotencyResult;
}>;

/** Alias tipado del resultado genérico de begin. */
export type UploadIdempotencyBeginResult = Awaited<
  ReturnType<SqsIdempotencyPort<CachedUploadFilesResult>['begin']>
>;

export interface UploadFilesIdempotencyPort
  extends SqsIdempotencyPort<CachedUploadFilesResult> {}
