export type LogLevel = 'debug' | 'info' | 'warn' | 'error';
export type StructuredLogger = Readonly<{
    debug(message: string, meta?: Record<string, unknown>): void;
    info(message: string, meta?: Record<string, unknown>): void;
    warn(message: string, meta?: Record<string, unknown>): void;
    error(message: string, meta?: Record<string, unknown>): void;
}>;
export declare function create_prefixed_logger(scope: string, trace_id?: string): StructuredLogger;
