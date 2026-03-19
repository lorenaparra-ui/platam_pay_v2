"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withRetry = withRetry;
const DEFAULT_MAX_ATTEMPTS = 3;
const DEFAULT_INITIAL_MS = 500;
async function withRetry(fn, options = {}) {
    const maxAttempts = options.max_attempts ?? DEFAULT_MAX_ATTEMPTS;
    const initialMs = options.initial_delay_ms ?? DEFAULT_INITIAL_MS;
    const maxDelayMs = options.max_delay_ms ?? 10_000;
    let lastError;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        }
        catch (err) {
            lastError = err;
            if (attempt === maxAttempts)
                break;
            const delay = Math.min(initialMs * Math.pow(2, attempt - 1), maxDelayMs);
            await new Promise((r) => setTimeout(r, delay));
        }
    }
    throw lastError;
}
//# sourceMappingURL=event-handler-retry.util.js.map