"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesUploadedCorrelationAwaiter = void 0;
const common_1 = require("@nestjs/common");
let FilesUploadedCorrelationAwaiter = class FilesUploadedCorrelationAwaiter {
    pending = new Map();
    early = new Map();
    wait(correlation_id, timeout_ms) {
        const early = this.early.get(correlation_id);
        if (early !== undefined) {
            this.early.delete(correlation_id);
            return Promise.resolve(early);
        }
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                this.pending.delete(correlation_id);
                reject(new Error('PARTNER_FILES_UPLOAD_TIMEOUT'));
            }, timeout_ms);
            this.pending.set(correlation_id, { resolve, reject, timer });
        });
    }
    complete(correlation_id, urls) {
        const p = this.pending.get(correlation_id);
        if (p !== undefined) {
            clearTimeout(p.timer);
            this.pending.delete(correlation_id);
            p.resolve(urls);
            return;
        }
        this.early.set(correlation_id, urls);
    }
};
exports.FilesUploadedCorrelationAwaiter = FilesUploadedCorrelationAwaiter;
exports.FilesUploadedCorrelationAwaiter = FilesUploadedCorrelationAwaiter = __decorate([
    (0, common_1.Injectable)()
], FilesUploadedCorrelationAwaiter);
//# sourceMappingURL=files-uploaded-correlation-awaiter.service.js.map