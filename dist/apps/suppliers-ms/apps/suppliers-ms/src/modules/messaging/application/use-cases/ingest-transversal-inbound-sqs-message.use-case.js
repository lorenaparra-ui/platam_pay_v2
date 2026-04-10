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
var IngestTransversalInboundSqsMessageUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngestTransversalInboundSqsMessageUseCase = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const files_uploaded_inbound_dto_1 = require("../dto/files-uploaded-inbound.dto");
const transversal_inbound_message_dto_1 = require("../dto/transversal-inbound-message.dto");
const process_transversal_inbound_message_use_case_1 = require("./process-transversal-inbound-message.use-case");
const process_files_uploaded_inbound_use_case_1 = require("./process-files-uploaded-inbound.use-case");
function is_files_uploaded_event(v) {
    return (typeof v === 'object' &&
        v !== null &&
        'event' in v &&
        v.event === 'files-uploaded');
}
let IngestTransversalInboundSqsMessageUseCase = IngestTransversalInboundSqsMessageUseCase_1 = class IngestTransversalInboundSqsMessageUseCase {
    process_transversal_inbound_message;
    process_files_uploaded_inbound;
    logger = new common_1.Logger(IngestTransversalInboundSqsMessageUseCase_1.name);
    constructor(process_transversal_inbound_message, process_files_uploaded_inbound) {
        this.process_transversal_inbound_message = process_transversal_inbound_message;
        this.process_files_uploaded_inbound = process_files_uploaded_inbound;
    }
    async execute(command) {
        let parsed;
        try {
            parsed = JSON.parse(command.body);
        }
        catch {
            this.logger.warn('Cuerpo de mensaje no es JSON válido; se dejará para reintento.');
            return command.delete_on_validation_error;
        }
        if (is_files_uploaded_event(parsed)) {
            const files_dto = (0, class_transformer_1.plainToInstance)(files_uploaded_inbound_dto_1.FilesUploadedInboundDto, parsed, {
                enableImplicitConversion: true,
            });
            const files_errors = (0, class_validator_1.validateSync)(files_dto, { forbidUnknownValues: false });
            if (files_errors.length > 0) {
                const message = files_errors
                    .map((e) => Object.values(e.constraints ?? {}).join(', '))
                    .join('; ');
                this.logger.warn(JSON.stringify({ msg: 'files_uploaded_dto_invalid', detail: message }));
                return command.delete_on_validation_error;
            }
            try {
                await this.process_files_uploaded_inbound.execute(files_dto);
                return true;
            }
            catch (err) {
                const text = err instanceof Error ? err.message : String(err);
                this.logger.error(JSON.stringify({ msg: 'files_uploaded_process_failed', error: text }));
                return false;
            }
        }
        const dto = (0, class_transformer_1.plainToInstance)(transversal_inbound_message_dto_1.TransversalInboundMessageDto, parsed, {
            enableImplicitConversion: true,
        });
        const errors = (0, class_validator_1.validateSync)(dto, { forbidUnknownValues: false });
        if (errors.length > 0) {
            const message = errors
                .map((e) => Object.values(e.constraints ?? {}).join(', '))
                .join('; ');
            this.logger.warn(`DTO entrante inválido: ${message}`);
            return command.delete_on_validation_error;
        }
        try {
            await this.process_transversal_inbound_message.execute(dto);
            return true;
        }
        catch (err) {
            const text = err instanceof Error ? err.message : String(err);
            this.logger.error(`Error al procesar mensaje: ${text}`);
            return false;
        }
    }
};
exports.IngestTransversalInboundSqsMessageUseCase = IngestTransversalInboundSqsMessageUseCase;
exports.IngestTransversalInboundSqsMessageUseCase = IngestTransversalInboundSqsMessageUseCase = IngestTransversalInboundSqsMessageUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [process_transversal_inbound_message_use_case_1.ProcessTransversalInboundMessageUseCase,
        process_files_uploaded_inbound_use_case_1.ProcessFilesUploadedInboundUseCase])
], IngestTransversalInboundSqsMessageUseCase);
//# sourceMappingURL=ingest-transversal-inbound-sqs-message.use-case.js.map