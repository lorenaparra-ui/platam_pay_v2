export declare class SqsPublishFailedError extends Error {
    readonly cause?: unknown;
    constructor(message: string, cause?: unknown);
}
