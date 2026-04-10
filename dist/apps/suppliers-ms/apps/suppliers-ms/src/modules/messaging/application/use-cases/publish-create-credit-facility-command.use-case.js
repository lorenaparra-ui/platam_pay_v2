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
exports.PublishCreateCreditFacilityCommandUseCase = void 0;
const common_1 = require("@nestjs/common");
const outbound_message_publisher_port_1 = require("../../domain/ports/outbound-message-publisher.port");
const products_create_credit_facility_queue_url_port_1 = require("../../domain/ports/products-create-credit-facility-queue-url.port");
const validation_failed_error_1 = require("../exceptions/validation-failed.error");
let PublishCreateCreditFacilityCommandUseCase = class PublishCreateCreditFacilityCommandUseCase {
    message_publisher;
    queue_url_port;
    constructor(message_publisher, queue_url_port) {
        this.message_publisher = message_publisher;
        this.queue_url_port = queue_url_port;
    }
    async execute(command) {
        const queue_url = this.queue_url_port.get_create_credit_facility_queue_url();
        if (queue_url === undefined || queue_url.trim().length === 0) {
            throw new validation_failed_error_1.ValidationFailedError('Cola PRODUCTS_SQS_CREATE_CREDIT_FACILITY_QUEUE_URL no configurada');
        }
        const body = JSON.stringify({
            event: 'create-credit-facility',
            version: '1.0',
            correlationId: command.correlation_id,
            payload: {
                external_id: command.external_id,
                contract_id: command.contract_id,
                total_limit: command.total_limit,
                state: command.state,
            },
        });
        await this.message_publisher.publish({ queue_url, body });
    }
};
exports.PublishCreateCreditFacilityCommandUseCase = PublishCreateCreditFacilityCommandUseCase;
exports.PublishCreateCreditFacilityCommandUseCase = PublishCreateCreditFacilityCommandUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(outbound_message_publisher_port_1.OUTBOUND_MESSAGE_PUBLISHER_PORT)),
    __param(1, (0, common_1.Inject)(products_create_credit_facility_queue_url_port_1.PRODUCTS_CREATE_CREDIT_FACILITY_QUEUE_URL_PORT)),
    __metadata("design:paramtypes", [Object, Object])
], PublishCreateCreditFacilityCommandUseCase);
//# sourceMappingURL=publish-create-credit-facility-command.use-case.js.map