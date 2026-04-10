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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqsPartnerOnboardingFilesAdapter = void 0;
const common_1 = require("@nestjs/common");
const publish_upload_files_event_use_case_1 = require("../../../../modules/messaging/application/use-cases/publish-upload-files-event.use-case");
const files_uploaded_correlation_awaiter_service_1 = require("../../../../modules/messaging/application/services/files-uploaded-correlation-awaiter.service");
const DEFAULT_UPLOAD_AWAIT_MS = 120_000;
let SqsPartnerOnboardingFilesAdapter = class SqsPartnerOnboardingFilesAdapter {
    publish_upload_files;
    files_uploaded_awaiter;
    constructor(publish_upload_files, files_uploaded_awaiter) {
        this.publish_upload_files = publish_upload_files;
        this.files_uploaded_awaiter = files_uploaded_awaiter;
    }
    async resolve_urls(input) {
        const has_any = this.has_payload(input.bank_certification) ||
            this.has_payload(input.logo) ||
            this.has_payload(input.co_branding);
        if (!has_any) {
            return {
                bank_certification_url: '',
                logo_url: '',
                co_branding_url: '',
            };
        }
        await this.publish_upload_files.execute({
            correlation_id: input.correlation_id,
            idempotency_key: input.idempotency_key,
            files: {
                bank_certification: this.to_inline_payload(input.bank_certification),
                logo: this.to_inline_payload(input.logo),
                co_branding: this.to_inline_payload(input.co_branding),
            },
            file_folders: input.file_folders,
        });
        const timeout_ms = Number(process.env.PARTNER_FILES_UPLOAD_AWAIT_MS ?? DEFAULT_UPLOAD_AWAIT_MS);
        const urls = await this.files_uploaded_awaiter.wait(input.correlation_id, timeout_ms);
        return {
            bank_certification_url: urls.bank_certification_url ?? '',
            logo_url: urls.logo_url ?? '',
            co_branding_url: urls.co_branding_url ?? '',
        };
    }
    has_payload(f) {
        return (f !== undefined &&
            typeof f.content_base64 === 'string' &&
            f.content_base64.trim().length > 0);
    }
    to_inline_payload(f) {
        if (!this.has_payload(f) || f === undefined) {
            return undefined;
        }
        const mime = f.mimetype.trim().length > 0 ? f.mimetype : 'application/octet-stream';
        return `data:${mime};base64,${f.content_base64}`;
    }
};
exports.SqsPartnerOnboardingFilesAdapter = SqsPartnerOnboardingFilesAdapter;
exports.SqsPartnerOnboardingFilesAdapter = SqsPartnerOnboardingFilesAdapter = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [publish_upload_files_event_use_case_1.PublishUploadFilesEventUseCase,
        files_uploaded_correlation_awaiter_service_1.FilesUploadedCorrelationAwaiter])
], SqsPartnerOnboardingFilesAdapter);
//# sourceMappingURL=sqs-partner-onboarding-files.adapter.js.map