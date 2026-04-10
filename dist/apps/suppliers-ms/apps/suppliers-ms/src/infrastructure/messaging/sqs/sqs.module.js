"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqsModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const shared_1 = require("../../../../../../libs/shared/src");
const sqs_message_publisher_adapter_1 = require("./adapters/sqs-message-publisher.adapter");
const config_outbound_transversal_queue_url_adapter_1 = require("./adapters/config-outbound-transversal-queue-url.adapter");
const config_outbound_products_queue_url_adapter_1 = require("./adapters/config-outbound-products-queue-url.adapter");
const transversal_inbound_sqs_consumer_1 = require("./consumers/transversal-inbound-sqs.consumer");
const messaging_application_module_1 = require("../../../modules/messaging/messaging-application.module");
const outbound_message_publisher_port_1 = require("../../../modules/messaging/domain/ports/outbound-message-publisher.port");
const transversal_outbound_queue_url_port_1 = require("../../../modules/messaging/domain/ports/transversal-outbound-queue-url.port");
const products_outbound_queue_url_port_1 = require("../../../modules/messaging/domain/ports/products-outbound-queue-url.port");
const transversal_upload_files_queue_url_port_1 = require("../../../modules/messaging/domain/ports/transversal-upload-files-queue-url.port");
const config_transversal_upload_files_queue_url_adapter_1 = require("./adapters/config-transversal-upload-files-queue-url.adapter");
const transversal_create_partner_user_queue_url_port_1 = require("../../../modules/messaging/domain/ports/transversal-create-partner-user-queue-url.port");
const config_transversal_create_partner_user_queue_url_adapter_1 = require("./adapters/config-transversal-create-partner-user-queue-url.adapter");
const transversal_create_person_queue_url_port_1 = require("../../../modules/messaging/domain/ports/transversal-create-person-queue-url.port");
const config_transversal_create_person_queue_url_adapter_1 = require("./adapters/config-transversal-create-person-queue-url.adapter");
const publish_products_event_use_case_1 = require("../../../modules/messaging/application/use-cases/publish-products-event.use-case");
const products_create_credit_facility_queue_url_port_1 = require("../../../modules/messaging/domain/ports/products-create-credit-facility-queue-url.port");
const config_products_create_credit_facility_queue_url_adapter_1 = require("./adapters/config-products-create-credit-facility-queue-url.adapter");
const products_create_categories_queue_url_port_1 = require("../../../modules/messaging/domain/ports/products-create-categories-queue-url.port");
const config_products_create_categories_queue_url_adapter_1 = require("./adapters/config-products-create-categories-queue-url.adapter");
let SqsModule = class SqsModule {
};
exports.SqsModule = SqsModule;
exports.SqsModule = SqsModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [config_1.ConfigModule, messaging_application_module_1.MessagingApplicationModule],
        providers: [
            {
                provide: shared_1.QUEUES_CONFIG,
                useFactory: (config_service) => ({
                    outbound_queue_url: config_service.getOrThrow('sqs.outbound_queue_url'),
                    inbound_queue_url: config_service.get('sqs.inbound_queue_url'),
                    upload_files_queue_url: config_service.get('sqs.upload_files_queue_url'),
                    create_partner_user_queue_url: config_service.get('sqs.create_partner_user_queue_url'),
                    create_person_queue_url: config_service.get('sqs.create_person_queue_url'),
                    suppliers_callback_queue_url: config_service.get('sqs.suppliers_callback_queue_url'),
                }),
                inject: [config_1.ConfigService],
            },
            {
                provide: shared_1.SQS_CLIENT,
                useFactory: (config_service) => (0, shared_1.create_sqs_client)({
                    region: config_service.getOrThrow('sqs.region'),
                    endpoint: config_service.get('sqs.endpoint'),
                }),
                inject: [config_1.ConfigService],
            },
            sqs_message_publisher_adapter_1.SqsMessagePublisherAdapter,
            transversal_inbound_sqs_consumer_1.TransversalInboundSqsConsumer,
            publish_products_event_use_case_1.PublishProductsEventUseCase,
            {
                provide: outbound_message_publisher_port_1.OUTBOUND_MESSAGE_PUBLISHER_PORT,
                useExisting: sqs_message_publisher_adapter_1.SqsMessagePublisherAdapter,
            },
            config_outbound_transversal_queue_url_adapter_1.ConfigOutboundTransversalQueueUrlAdapter,
            config_transversal_upload_files_queue_url_adapter_1.ConfigTransversalUploadFilesQueueUrlAdapter,
            config_transversal_create_partner_user_queue_url_adapter_1.ConfigTransversalCreatePartnerUserQueueUrlAdapter,
            {
                provide: transversal_outbound_queue_url_port_1.TRANSVERSAL_OUTBOUND_QUEUE_URL_PORT,
                useExisting: config_outbound_transversal_queue_url_adapter_1.ConfigOutboundTransversalQueueUrlAdapter,
            },
            {
                provide: transversal_upload_files_queue_url_port_1.TRANSVERSAL_UPLOAD_FILES_QUEUE_URL_PORT,
                useExisting: config_transversal_upload_files_queue_url_adapter_1.ConfigTransversalUploadFilesQueueUrlAdapter,
            },
            {
                provide: transversal_create_partner_user_queue_url_port_1.TRANSVERSAL_CREATE_PARTNER_USER_QUEUE_URL_PORT,
                useExisting: config_transversal_create_partner_user_queue_url_adapter_1.ConfigTransversalCreatePartnerUserQueueUrlAdapter,
            },
            config_transversal_create_person_queue_url_adapter_1.ConfigTransversalCreatePersonQueueUrlAdapter,
            {
                provide: transversal_create_person_queue_url_port_1.TRANSVERSAL_CREATE_PERSON_QUEUE_URL_PORT,
                useExisting: config_transversal_create_person_queue_url_adapter_1.ConfigTransversalCreatePersonQueueUrlAdapter,
            },
            config_outbound_products_queue_url_adapter_1.ConfigOutboundProductsQueueUrlAdapter,
            {
                provide: products_outbound_queue_url_port_1.PRODUCTS_OUTBOUND_QUEUE_URL_PORT,
                useExisting: config_outbound_products_queue_url_adapter_1.ConfigOutboundProductsQueueUrlAdapter,
            },
            config_products_create_credit_facility_queue_url_adapter_1.ConfigProductsCreateCreditFacilityQueueUrlAdapter,
            {
                provide: products_create_credit_facility_queue_url_port_1.PRODUCTS_CREATE_CREDIT_FACILITY_QUEUE_URL_PORT,
                useExisting: config_products_create_credit_facility_queue_url_adapter_1.ConfigProductsCreateCreditFacilityQueueUrlAdapter,
            },
            config_products_create_categories_queue_url_adapter_1.ConfigProductsCreateCategoriesQueueUrlAdapter,
            {
                provide: products_create_categories_queue_url_port_1.PRODUCTS_CREATE_CATEGORIES_QUEUE_URL_PORT,
                useExisting: config_products_create_categories_queue_url_adapter_1.ConfigProductsCreateCategoriesQueueUrlAdapter,
            },
        ],
        exports: [
            shared_1.SQS_CLIENT,
            shared_1.QUEUES_CONFIG,
            outbound_message_publisher_port_1.OUTBOUND_MESSAGE_PUBLISHER_PORT,
            transversal_outbound_queue_url_port_1.TRANSVERSAL_OUTBOUND_QUEUE_URL_PORT,
            transversal_upload_files_queue_url_port_1.TRANSVERSAL_UPLOAD_FILES_QUEUE_URL_PORT,
            transversal_create_partner_user_queue_url_port_1.TRANSVERSAL_CREATE_PARTNER_USER_QUEUE_URL_PORT,
            transversal_create_person_queue_url_port_1.TRANSVERSAL_CREATE_PERSON_QUEUE_URL_PORT,
            products_outbound_queue_url_port_1.PRODUCTS_OUTBOUND_QUEUE_URL_PORT,
            products_create_credit_facility_queue_url_port_1.PRODUCTS_CREATE_CREDIT_FACILITY_QUEUE_URL_PORT,
            products_create_categories_queue_url_port_1.PRODUCTS_CREATE_CATEGORIES_QUEUE_URL_PORT,
            publish_products_event_use_case_1.PublishProductsEventUseCase,
        ],
    })
], SqsModule);
//# sourceMappingURL=sqs.module.js.map