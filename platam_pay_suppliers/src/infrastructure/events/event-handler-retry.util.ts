/**
 * Reintentos con backoff exponencial en handlers de eventos.
 */
const DEFAULT_MAX_ATTEMPTS = 3;
const DEFAULT_INITIAL_MS = 500;

export interface RetryOptions {
  max_attempts?: number;
  initial_delay_ms?: number;
  max_delay_ms?: number;
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {},
): Promise<T> {
  const maxAttempts = options.max_attempts ?? DEFAULT_MAX_ATTEMPTS;
  const initialMs = options.initial_delay_ms ?? DEFAULT_INITIAL_MS;
  const maxDelayMs = options.max_delay_ms ?? 10_000;

  let lastError: unknown;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt === maxAttempts) break;
      const delay = Math.min(initialMs * Math.pow(2, attempt - 1), maxDelayMs);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw lastError;
}
