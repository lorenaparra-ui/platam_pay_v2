"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ProcessFilesUploadedInboundUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessFilesUploadedInboundUseCase = void 0;
const common_1 = require("@nestjs/common");
const files_uploaded_correlation_awaiter_service_1 = require("../services/files-uploaded-correlation-awaiter.service");
const FOLDER_BANK = 'bank-certifications';
const FOLDER_LOGO = 'logos/logo';
const FOLDER_CO_BRANDING = 'logos/co-branding';
let ProcessFilesUploadedInboundUseCase = ProcessFilesUploadedInboundUseCase_1 = class ProcessFilesUploadedInboundUseCase {
    awaiter;
    logger = new common_1.Logger(ProcessFilesUploadedInboundUseCase_1.name);
    constructor(awaiter) {
        this.awaiter = awaiter;
    }
    async execute(dto) {
        const urls = this.map_payload_to_legacy_urls(dto.payload.files);
        this.logger.log(JSON.stringify({
            msg: 'files_uploaded_received',
            correlation_id: dto.correlation_id,
            file_count: dto.payload.files.length,
        }));
        this.awaiter.complete(dto.correlation_id, urls);
    }
    map_payload_to_legacy_urls(files) {
        const by_folder = new Map();
        for (const f of files) {
            by_folder.set(f.folder.trim(), f.url);
        }
        const bank = by_folder.get(FOLDER_BANK);
        const logo = by_folder.get(FOLDER_LOGO);
        const cob = by_folder.get(FOLDER_CO_BRANDING);
        return {
            ...(bank !== undefined ? { bank_certification_url: bank } : {}),
            ...(logo !== undefined ? { logo_url: logo } : {}),
            ...(cob !== undefined ? { co_branding_url: cob } : {}),
        };
    }
};
exports.ProcessFilesUploadedInboundUseCase = ProcessFilesUploadedInboundUseCase;
exports.ProcessFilesUploadedInboundUseCase = ProcessFilesUploadedInboundUseCase = ProcessFilesUploadedInboundUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [files_uploaded_correlation_awaiter_service_1.FilesUploadedCorrelationAwaiter])
], ProcessFilesUploadedInboundUseCase);
//# sourceMappingURL=process-files-uploaded-inbound.use-case.js.map