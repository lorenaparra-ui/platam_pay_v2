export class SqsPublishFailedError extends Error {
  readonly cause?: unknown;

  constructor(message: string, cause?: unknown) {
    super(message);
    this.name = 'SqsPublishFailedError';
    this.cause = cause;
  }
}
