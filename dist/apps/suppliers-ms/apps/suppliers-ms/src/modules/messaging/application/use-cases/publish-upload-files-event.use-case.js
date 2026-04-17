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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublishUploadFilesEventUseCase = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const outbound_message_publisher_port_1 = require("../../domain/ports/outbound-message-publisher.port");
const transversal_upload_files_queue_url_port_1 = require("../../domain/ports/transversal-upload-files-queue-url.port");
const validation_failed_error_1 = require("../exceptions/validation-failed.error");
let PublishUploadFilesEventUseCase = class PublishUploadFilesEventUseCase {
    message_publisher;
    upload_queue_url;
    config_service;
    constructor(message_publisher, upload_queue_url, config_service) {
        this.message_publisher = message_publisher;
        this.upload_queue_url = upload_queue_url;
        this.config_service = config_service;
    }
    async execute(command) {
        const queue_url = this.upload_queue_url.get_upload_files_queue_url();
        if (queue_url === undefined || queue_url.trim().length === 0) {
            throw new validation_failed_error_1.ValidationFailedError('Cola TRANSVERSAL_SQS_UPLOAD_FILES_QUEUE_URL no configurada para publish upload-files');
        }
        const bucket = (this.config_service.get('config.storage.s3.bucket') ?? '').trim();
        if (bucket.length === 0) {
            throw new validation_failed_error_1.ValidationFailedError('Bucket S3 no configurado (config.storage.s3.bucket / AWS_S3_BUCKET)');
        }
        const payload_files = [];
        const add = (slot, raw) => {
            if (typeof raw !== 'string' || raw.trim().length === 0) {
                return;
            }
            const folder = this.folder_for_slot(command.file_folders, slot);
            if (folder.length === 0) {
                throw new validation_failed_error_1.ValidationFailedError(`folder no definido para slot ${slot}`);
            }
            payload_files.push({ file: raw, folder });
        };
        add('bank_certification', command.files.bank_certification);
        add('logo', command.files.logo);
        add('co_branding', command.files.co_branding);
        if (payload_files.length === 0) {
            throw new validation_failed_error_1.ValidationFailedError('upload-files sin archivos en payload');
        }
        const body = JSON.stringify({
            event: 'upload-files',
            version: '1.0',
            correlationId: command.correlation_id,
            idempotencyKey: command.idempotency_key,
            payload: {
                bucket,
                files: payload_files,
            },
        });
        await this.message_publisher.publish({ queue_url, body });
    }
    folder_for_slot(folders, slot) {
        const raw = folders === undefined
            ? undefined
            : slot === 'bank_certification'
                ? folders.bank_certification
                : slot === 'logo'
                    ? folders.logo
                    : folders.co_branding;
        if (typeof raw !== 'string') {
            return '';
        }
        return raw.trim();
    }
};
exports.PublishUploadFilesEventUseCase = PublishUploadFilesEventUseCase;
exports.PublishUploadFilesEventUseCase = PublishUploadFilesEventUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(outbound_message_publisher_port_1.OUTBOUND_MESSAGE_PUBLISHER_PORT)),
    __param(1, (0, common_1.Inject)(transversal_upload_files_queue_url_port_1.TRANSVERSAL_UPLOAD_FILES_QUEUE_URL_PORT)),
    __metadata("design:paramtypes", [Object, Object, config_1.ConfigService])
], PublishUploadFilesEventUseCase);
//# sourceMappingURL=publish-upload-files-event.use-case.js.map