"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationFailedError = void 0;
class ValidationFailedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationFailedError';
    }
}
exports.ValidationFailedError = ValidationFailedError;
//# sourceMappingURL=validation-failed.error.js.map