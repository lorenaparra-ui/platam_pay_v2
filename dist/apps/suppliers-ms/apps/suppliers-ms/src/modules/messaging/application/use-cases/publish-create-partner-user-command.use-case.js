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
exports.PublishCreatePartnerUserCommandUseCase = void 0;
const common_1 = require("@nestjs/common");
const outbound_message_publisher_port_1 = require("../../domain/ports/outbound-message-publisher.port");
const transversal_create_partner_user_queue_url_port_1 = require("../../domain/ports/transversal-create-partner-user-queue-url.port");
const validation_failed_error_1 = require("../exceptions/validation-failed.error");
let PublishCreatePartnerUserCommandUseCase = class PublishCreatePartnerUserCommandUseCase {
    message_publisher;
    create_user_queue_url;
    constructor(message_publisher, create_user_queue_url) {
        this.message_publisher = message_publisher;
        this.create_user_queue_url = create_user_queue_url;
    }
    async execute(command) {
        const queue_url = this.create_user_queue_url.get_create_partner_user_queue_url();
        if (queue_url === undefined || queue_url.trim().length === 0) {
            throw new validation_failed_error_1.ValidationFailedError('Cola TRANSVERSAL_SQS_CREATE_USER_QUEUE_URL no configurada para create-partner-user');
        }
        const body = JSON.stringify({
            event: 'create-partner-user',
            version: '1.0',
            correlationId: command.correlation_id,
            idempotencyKey: command.idempotency_key,
            payload: {
                email: command.email,
                country_code: command.country_code,
                first_name: command.first_name,
                last_name: command.last_name,
                doc_type: command.doc_type,
                doc_number: command.doc_number,
                phone: command.phone,
                city_external_id: command.city_external_id,
            },
        });
        await this.message_publisher.publish({ queue_url, body });
    }
};
exports.PublishCreatePartnerUserCommandUseCase = PublishCreatePartnerUserCommandUseCase;
exports.PublishCreatePartnerUserCommandUseCase = PublishCreatePartnerUserCommandUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(outbound_message_publisher_port_1.OUTBOUND_MESSAGE_PUBLISHER_PORT)),
    __param(1, (0, common_1.Inject)(transversal_create_partner_user_queue_url_port_1.TRANSVERSAL_CREATE_PARTNER_USER_QUEUE_URL_PORT)),
    __metadata("design:paramtypes", [Object, Object])
], PublishCreatePartnerUserCommandUseCase);
//# sourceMappingURL=publish-create-partner-user-command.use-case.js.map