"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqsPublishFailedError = void 0;
class SqsPublishFailedError extends Error {
    constructor(message, cause) {
        super(message);
        this.name = 'SqsPublishFailedError';
        this.cause = cause;
    }
}
exports.SqsPublishFailedError = SqsPublishFailedError;
//# sourceMappingURL=sqs-publish-failed.error.js.map