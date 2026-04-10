"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagingApplicationModule = void 0;
const common_1 = require("@nestjs/common");
const publish_transversal_event_use_case_1 = require("./application/use-cases/publish-transversal-event.use-case");
const publish_upload_files_event_use_case_1 = require("./application/use-cases/publish-upload-files-event.use-case");
const publish_create_partner_user_command_use_case_1 = require("./application/use-cases/publish-create-partner-user-command.use-case");
const publish_create_person_command_use_case_1 = require("./application/use-cases/publish-create-person-command.use-case");
const publish_create_credit_facility_command_use_case_1 = require("./application/use-cases/publish-create-credit-facility-command.use-case");
const publish_create_categories_command_use_case_1 = require("./application/use-cases/publish-create-categories-command.use-case");
const process_transversal_inbound_message_use_case_1 = require("./application/use-cases/process-transversal-inbound-message.use-case");
const process_files_uploaded_inbound_use_case_1 = require("./application/use-cases/process-files-uploaded-inbound.use-case");
const ingest_transversal_inbound_sqs_message_use_case_1 = require("./application/use-cases/ingest-transversal-inbound-sqs-message.use-case");
const files_uploaded_correlation_awaiter_service_1 = require("./application/services/files-uploaded-correlation-awaiter.service");
let MessagingApplicationModule = class MessagingApplicationModule {
};
exports.MessagingApplicationModule = MessagingApplicationModule;
exports.MessagingApplicationModule = MessagingApplicationModule = __decorate([
    (0, common_1.Module)({
        providers: [
            files_uploaded_correlation_awaiter_service_1.FilesUploadedCorrelationAwaiter,
            publish_transversal_event_use_case_1.PublishTransversalEventUseCase,
            publish_upload_files_event_use_case_1.PublishUploadFilesEventUseCase,
            publish_create_partner_user_command_use_case_1.PublishCreatePartnerUserCommandUseCase,
            publish_create_person_command_use_case_1.PublishCreatePersonCommandUseCase,
            publish_create_credit_facility_command_use_case_1.PublishCreateCreditFacilityCommandUseCase,
            publish_create_categories_command_use_case_1.PublishCreateCategoriesCommandUseCase,
            process_transversal_inbound_message_use_case_1.ProcessTransversalInboundMessageUseCase,
            process_files_uploaded_inbound_use_case_1.ProcessFilesUploadedInboundUseCase,
            ingest_transversal_inbound_sqs_message_use_case_1.IngestTransversalInboundSqsMessageUseCase,
        ],
        exports: [
            files_uploaded_correlation_awaiter_service_1.FilesUploadedCorrelationAwaiter,
            publish_transversal_event_use_case_1.PublishTransversalEventUseCase,
            publish_upload_files_event_use_case_1.PublishUploadFilesEventUseCase,
            publish_create_partner_user_command_use_case_1.PublishCreatePartnerUserCommandUseCase,
            publish_create_person_command_use_case_1.PublishCreatePersonCommandUseCase,
            publish_create_credit_facility_command_use_case_1.PublishCreateCreditFacilityCommandUseCase,
            publish_create_categories_command_use_case_1.PublishCreateCategoriesCommandUseCase,
            process_transversal_inbound_message_use_case_1.ProcessTransversalInboundMessageUseCase,
            process_files_uploaded_inbound_use_case_1.ProcessFilesUploadedInboundUseCase,
            ingest_transversal_inbound_sqs_message_use_case_1.IngestTransversalInboundSqsMessageUseCase,
        ],
    })
], MessagingApplicationModule);
//# sourceMappingURL=messaging-application.module.js.map