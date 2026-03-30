export type CachedUploadFilesResult = Readonly<{
  files: ReadonlyArray<Readonly<{ url: string; folder: string }>>;
}>;

export type UploadIdempotencyBeginResult =
  | Readonly<{ status: 'proceed' }>
  | Readonly<{ status: 'duplicate'; result: CachedUploadFilesResult }>
  | Readonly<{ status: 'conflict' }>;

/**
 * Evita ejecuciones duplicadas para la misma idempotencyKey (reintentos SQS).
 */
export interface UploadFilesIdempotencyPort {
  begin(key: string, correlation_id: string): Promise<UploadIdempotencyBeginResult>;
  complete(key: string, result: CachedUploadFilesResult): Promise<void>;
  release(key: string): Promise<void>;
}
