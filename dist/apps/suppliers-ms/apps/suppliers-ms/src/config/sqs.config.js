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
exports.sqs_config = void 0;
exports.get_sqs_config_from_env = get_sqs_config_from_env;
const config_1 = require("@nestjs/config");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class SqsEnv {
    aws_region = 'us-east-2';
    transversal_sqs_outbound_queue_url;
    transversal_sqs_inbound_queue_url;
    transversal_sqs_upload_files_queue_url;
    transversal_sqs_create_user_queue_url;
    transversal_sqs_create_person_queue_url;
    transversal_sqs_suppliers_callback_queue_url;
    products_sqs_create_credit_facility_queue_url;
    products_sqs_create_categories_queue_url;
    transversal_sqs_wait_time_seconds = 20;
    transversal_sqs_max_number_of_messages = 10;
    transversal_sqs_visibility_timeout_seconds = 30;
    transversal_sqs_delete_on_validation_error = false;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], SqsEnv.prototype, "aws_region", void 0);
__decorate([
    (0, class_validator_1.IsUrl)({ require_tld: false }),
    __metadata("design:type", String)
], SqsEnv.prototype, "transversal_sqs_outbound_queue_url", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value === '' || value === undefined ? undefined : value)),
    (0, class_validator_1.IsUrl)({ require_tld: false }),
    __metadata("design:type", String)
], SqsEnv.prototype, "transversal_sqs_inbound_queue_url", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value === '' || value === undefined ? undefined : value)),
    (0, class_validator_1.IsUrl)({ require_tld: false }),
    __metadata("design:type", String)
], SqsEnv.prototype, "transversal_sqs_upload_files_queue_url", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value === '' || value === undefined ? undefined : value)),
    (0, class_validator_1.IsUrl)({ require_tld: false }),
    __metadata("design:type", String)
], SqsEnv.prototype, "transversal_sqs_create_user_queue_url", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value === '' || value === undefined ? undefined : value)),
    (0, class_validator_1.IsUrl)({ require_tld: false }),
    __metadata("design:type", String)
], SqsEnv.prototype, "transversal_sqs_create_person_queue_url", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value === '' || value === undefined ? undefined : value)),
    (0, class_validator_1.IsUrl)({ require_tld: false }),
    __metadata("design:type", String)
], SqsEnv.prototype, "transversal_sqs_suppliers_callback_queue_url", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value === '' || value === undefined ? undefined : value)),
    (0, class_validator_1.IsUrl)({ require_tld: false }),
    __metadata("design:type", String)
], SqsEnv.prototype, "products_sqs_create_credit_facility_queue_url", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value === '' || value === undefined ? undefined : value)),
    (0, class_validator_1.IsUrl)({ require_tld: false }),
    __metadata("design:type", String)
], SqsEnv.prototype, "products_sqs_create_categories_queue_url", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(20),
    __metadata("design:type", Object)
], SqsEnv.prototype, "transversal_sqs_wait_time_seconds", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(10),
    __metadata("design:type", Object)
], SqsEnv.prototype, "transversal_sqs_max_number_of_messages", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(43200),
    __metadata("design:type", Object)
], SqsEnv.prototype, "transversal_sqs_visibility_timeout_seconds", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Object)
], SqsEnv.prototype, "transversal_sqs_delete_on_validation_error", void 0);
function validate_sqs_env(config) {
    const validated = (0, class_transformer_1.plainToInstance)(SqsEnv, config, { enableImplicitConversion: true });
    const errors = (0, class_validator_1.validateSync)(validated, { skipMissingProperties: false });
    if (errors.length > 0) {
        const message = errors.map((e) => Object.values(e.constraints ?? {}).join(', ')).join('; ');
        throw new Error(`Configuración SQS inválida: ${message}`);
    }
    return validated;
}
function get_sqs_config_from_env() {
    const env = validate_sqs_env({
        aws_region: process.env.AWS_REGION ?? 'us-east-1',
        transversal_sqs_outbound_queue_url: process.env.TRANSVERSAL_SQS_OUTBOUND_QUEUE_URL,
        transversal_sqs_inbound_queue_url: process.env.TRANSVERSAL_SQS_INBOUND_QUEUE_URL,
        transversal_sqs_upload_files_queue_url: process.env.TRANSVERSAL_SQS_UPLOAD_FILES_QUEUE_URL,
        transversal_sqs_create_user_queue_url: process.env.TRANSVERSAL_SQS_CREATE_USER_QUEUE_URL,
        transversal_sqs_create_person_queue_url: process.env.TRANSVERSAL_SQS_CREATE_PERSON_QUEUE_URL,
        transversal_sqs_suppliers_callback_queue_url: process.env.TRANSVERSAL_SQS_SUPPLIERS_CALLBACK_QUEUE_URL,
        products_sqs_create_credit_facility_queue_url: process.env.PRODUCTS_SQS_CREATE_CREDIT_FACILITY_QUEUE_URL,
        products_sqs_create_categories_queue_url: process.env.PRODUCTS_SQS_CREATE_CATEGORIES_QUEUE_URL,
        transversal_sqs_wait_time_seconds: process.env.TRANSVERSAL_SQS_WAIT_TIME_SECONDS ?? 20,
        transversal_sqs_max_number_of_messages: process.env.TRANSVERSAL_SQS_MAX_NUMBER_OF_MESSAGES ?? 10,
        transversal_sqs_visibility_timeout_seconds: process.env.TRANSVERSAL_SQS_VISIBILITY_TIMEOUT_SECONDS ?? 30,
        transversal_sqs_delete_on_validation_error: process.env.TRANSVERSAL_SQS_DELETE_ON_VALIDATION_ERROR === 'true',
    });
    const trim_url = (v) => {
        if (v === undefined) {
            return undefined;
        }
        const t = v.trim();
        return t.length > 0 ? t : undefined;
    };
    return {
        region: env.aws_region,
        outbound_queue_url: env.transversal_sqs_outbound_queue_url.trim(),
        inbound_queue_url: trim_url(env.transversal_sqs_inbound_queue_url),
        upload_files_queue_url: trim_url(env.transversal_sqs_upload_files_queue_url),
        create_partner_user_queue_url: trim_url(env.transversal_sqs_create_user_queue_url),
        create_person_queue_url: trim_url(env.transversal_sqs_create_person_queue_url),
        suppliers_callback_queue_url: trim_url(env.transversal_sqs_suppliers_callback_queue_url),
        products_create_credit_facility_queue_url: trim_url(env.products_sqs_create_credit_facility_queue_url),
        products_create_categories_queue_url: trim_url(env.products_sqs_create_categories_queue_url),
        wait_time_seconds: env.transversal_sqs_wait_time_seconds,
        max_number_of_messages: env.transversal_sqs_max_number_of_messages,
        visibility_timeout_seconds: env.transversal_sqs_visibility_timeout_seconds,
        delete_on_validation_error: env.transversal_sqs_delete_on_validation_error,
    };
}
exports.sqs_config = (0, config_1.registerAs)('sqs', () => get_sqs_config_from_env());
//# sourceMappingURL=sqs.config.js.map