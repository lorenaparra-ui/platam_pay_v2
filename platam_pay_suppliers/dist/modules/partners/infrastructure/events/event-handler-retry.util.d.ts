export interface RetryOptions {
    max_attempts?: number;
    initial_delay_ms?: number;
    max_delay_ms?: number;
}
export declare function withRetry<T>(fn: () => Promise<T>, options?: RetryOptions): Promise<T>;
