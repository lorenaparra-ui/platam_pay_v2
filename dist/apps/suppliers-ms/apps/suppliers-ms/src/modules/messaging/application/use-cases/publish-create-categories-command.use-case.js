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
exports.PublishCreateCategoriesCommandUseCase = void 0;
const common_1 = require("@nestjs/common");
const outbound_message_publisher_port_1 = require("../../domain/ports/outbound-message-publisher.port");
const products_create_categories_queue_url_port_1 = require("../../domain/ports/products-create-categories-queue-url.port");
const validation_failed_error_1 = require("../exceptions/validation-failed.error");
let PublishCreateCategoriesCommandUseCase = class PublishCreateCategoriesCommandUseCase {
    message_publisher;
    queue_url_port;
    constructor(message_publisher, queue_url_port) {
        this.message_publisher = message_publisher;
        this.queue_url_port = queue_url_port;
    }
    async execute(command) {
        const queue_url = this.queue_url_port.get_create_categories_queue_url();
        if (queue_url === undefined || queue_url.trim().length === 0) {
            throw new validation_failed_error_1.ValidationFailedError('Cola PRODUCTS_SQS_CREATE_CATEGORIES_QUEUE_URL no configurada');
        }
        const body = JSON.stringify({
            event: 'create-categories-batch',
            version: '1.0',
            correlationId: command.correlation_id,
            payload: {
                credit_facility_id: command.credit_facility_id,
                partner_id: command.partner_id,
                categories: command.categories,
            },
        });
        await this.message_publisher.publish({ queue_url, body });
    }
};
exports.PublishCreateCategoriesCommandUseCase = PublishCreateCategoriesCommandUseCase;
exports.PublishCreateCategoriesCommandUseCase = PublishCreateCategoriesCommandUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(outbound_message_publisher_port_1.OUTBOUND_MESSAGE_PUBLISHER_PORT)),
    __param(1, (0, common_1.Inject)(products_create_categories_queue_url_port_1.PRODUCTS_CREATE_CATEGORIES_QUEUE_URL_PORT)),
    __metadata("design:paramtypes", [Object, Object])
], PublishCreateCategoriesCommandUseCase);
//# sourceMappingURL=publish-create-categories-command.use-case.js.map