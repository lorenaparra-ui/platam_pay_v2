/**
 * Contrato genérico de idempotencia SQS.
 * Reutilizable por cualquier microservicio que necesite protegerse contra
 * entregas duplicadas o reintentos de mensajes SQS.
 *
 * TResult = forma del resultado que se almacena como JSONB en la tabla.
 */

export type SqsIdempotencyBeginResult<TResult> =
  | Readonly<{ status: 'proceed' }>
  | Readonly<{ status: 'duplicate'; result: TResult }>
  | Readonly<{ status: 'conflict' }>;

export interface SqsIdempotencyPort<TResult> {
  /**
   * Intenta registrar una nueva entrada de idempotencia.
   * - 'proceed'   → primer procesamiento, procede normalmente.
   * - 'duplicate' → ya fue procesado; devuelve el resultado cacheado.
   * - 'conflict'  → está siendo procesado por otra instancia; reintentar más tarde.
   */
  begin(key: string, correlation_id: string): Promise<SqsIdempotencyBeginResult<TResult>>;

  /** Persiste el resultado exitoso y marca el registro como completado. */
  complete(key: string, result: TResult): Promise<void>;

  /** Elimina el registro de idempotencia (ante errores irrecuperables). */
  release(key: string): Promise<void>;
}

/**
 * Puerto de polling: espera hasta que otro microservicio complete un mensaje
 * SQS asíncrono y persista su resultado en la tabla de idempotencia compartida.
 */
export interface SqsIdempotencyResultPollPort<TResult> {
  wait_for_completed_result(idempotency_key: string): Promise<TResult>;
}
