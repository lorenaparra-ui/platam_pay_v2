export type SqsIdempotencyBeginResult<TResult> = Readonly<{
    status: 'proceed';
}> | Readonly<{
    status: 'duplicate';
    result: TResult;
}> | Readonly<{
    status: 'conflict';
}>;
export interface SqsIdempotencyPort<TResult> {
    begin(key: string, correlation_id: string): Promise<SqsIdempotencyBeginResult<TResult>>;
    complete(key: string, result: TResult): Promise<void>;
    release(key: string): Promise<void>;
}
export interface SqsIdempotencyResultPollPort<TResult> {
    wait_for_completed_result(idempotency_key: string): Promise<TResult>;
}
