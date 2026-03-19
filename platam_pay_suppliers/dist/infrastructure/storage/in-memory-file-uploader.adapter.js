"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var InMemoryFileUploaderAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryFileUploaderAdapter = void 0;
const common_1 = require("@nestjs/common");
let InMemoryFileUploaderAdapter = InMemoryFileUploaderAdapter_1 = class InMemoryFileUploaderAdapter {
    logger = new common_1.Logger(InMemoryFileUploaderAdapter_1.name);
    async upload(payload) {
        this.logger.warn(`InMemoryFileUploader: simulating upload for key=${payload.key}. Configure FILE_UPLOADER with S3/transversal in production.`);
        return {
            key: payload.key,
            location: `https://storage.example.com/${payload.key}`,
        };
    }
};
exports.InMemoryFileUploaderAdapter = InMemoryFileUploaderAdapter;
exports.InMemoryFileUploaderAdapter = InMemoryFileUploaderAdapter = InMemoryFileUploaderAdapter_1 = __decorate([
    (0, common_1.Injectable)()
], InMemoryFileUploaderAdapter);
//# sourceMappingURL=in-memory-file-uploader.adapter.js.map