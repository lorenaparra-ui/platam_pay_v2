import type { LoggerService } from '@nestjs/common';
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';
export type StructuredLogger = Readonly<{
    debug(message: string, meta?: Record<string, unknown>): void;
    info(message: string, meta?: Record<string, unknown>): void;
    warn(message: string, meta?: Record<string, unknown>): void;
    error(message: string, meta?: Record<string, unknown>): void;
}>;
export declare class NestLoggerAdapter {
    private readonly nest_logger;
    constructor(nest_logger: LoggerService);
    log(message: string): void;
    warn(message: string): void;
    error(message: string): void;
}
export declare class NestStructuredLoggerAdapter implements StructuredLogger {
    private readonly nest_logger;
    private readonly scope;
    private readonly trace_id?;
    constructor(nest_logger: LoggerService, scope: string, trace_id?: string | undefined);
    private prefix;
    private format;
    debug(message: string, meta?: Record<string, unknown>): void;
    info(message: string, meta?: Record<string, unknown>): void;
    warn(message: string, meta?: Record<string, unknown>): void;
    error(message: string, meta?: Record<string, unknown>): void;
}
