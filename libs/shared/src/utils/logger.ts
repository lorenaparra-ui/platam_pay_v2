export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export type StructuredLogger = Readonly<{
  debug(message: string, meta?: Record<string, unknown>): void;
  info(message: string, meta?: Record<string, unknown>): void;
  warn(message: string, meta?: Record<string, unknown>): void;
  error(message: string, meta?: Record<string, unknown>): void;
}>;

/**
 * Logger mínimo con prefijo y correlación opcional (`traceId`); sustituible por Pino/Winston en bootstrap.
 */
export function create_prefixed_logger(scope: string, trace_id?: string): StructuredLogger {
  const prefix = trace_id ? `[${scope}][${trace_id}]` : `[${scope}]`;

  const line = (level: LogLevel, message: string, meta?: Record<string, unknown>): void => {
    const payload = meta && Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : '';
    const text = `${prefix} ${message}${payload}`;
    if (level === 'error') {
      console.error(text);
    } else if (level === 'warn') {
      console.warn(text);
    } else {
      console.log(text);
    }
  };

  return {
    debug: (m, meta) => line('debug', m, meta),
    info: (m, meta) => line('info', m, meta),
    warn: (m, meta) => line('warn', m, meta),
    error: (m, meta) => line('error', m, meta),
  };
}
