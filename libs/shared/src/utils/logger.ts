import type { LoggerService } from '@nestjs/common';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export type StructuredLogger = Readonly<{
  debug(message: string, meta?: Record<string, unknown>): void;
  info(message: string, meta?: Record<string, unknown>): void;
  warn(message: string, meta?: Record<string, unknown>): void;
  error(message: string, meta?: Record<string, unknown>): void;
}>;

/**
 * Adapta el LoggerService de NestJS (Logger, PinoLogger, WinstonLogger) al
 * contrato MinimalLogger usado por BaseSqsConsumer.
 * Inyectar en vez de instanciar create_prefixed_logger directamente.
 */
export class NestLoggerAdapter {
  constructor(private readonly nest_logger: LoggerService) {}

  log(message: string): void {
    this.nest_logger.log(message);
  }

  warn(message: string): void {
    this.nest_logger.warn(message);
  }

  error(message: string): void {
    this.nest_logger.error(message);
  }
}

/**
 * Adapta el LoggerService de NestJS al contrato StructuredLogger.
 * Serializa el meta como JSON al final del mensaje.
 */
export class NestStructuredLoggerAdapter implements StructuredLogger {
  constructor(
    private readonly nest_logger: LoggerService,
    private readonly scope: string,
    private readonly trace_id?: string,
  ) {}

  private prefix(): string {
    return this.trace_id
      ? `[${this.scope}][${this.trace_id}]`
      : `[${this.scope}]`;
  }

  private format(message: string, meta?: Record<string, unknown>): string {
    const payload =
      meta && Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : '';
    return `${this.prefix()} ${message}${payload}`;
  }

  debug(message: string, meta?: Record<string, unknown>): void {
    this.nest_logger.debug?.(this.format(message, meta));
  }

  info(message: string, meta?: Record<string, unknown>): void {
    this.nest_logger.log(this.format(message, meta));
  }

  warn(message: string, meta?: Record<string, unknown>): void {
    this.nest_logger.warn(this.format(message, meta));
  }

  error(message: string, meta?: Record<string, unknown>): void {
    this.nest_logger.error(this.format(message, meta));
  }
}
