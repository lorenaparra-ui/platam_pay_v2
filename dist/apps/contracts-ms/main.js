/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("reflect-metadata");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MONOREPO_ENV_PATH = void 0;
exports.resolveMonorepoRoot = resolveMonorepoRoot;
const path = __importStar(__webpack_require__(3));
const fs = __importStar(__webpack_require__(4));
const dotenv = __importStar(__webpack_require__(5));
function findRootFrom(startDir) {
    let dir = path.resolve(startDir);
    for (let i = 0; i < 12; i++) {
        if (fs.existsSync(path.join(dir, 'nest-cli.json'))) {
            return dir;
        }
        const parent = path.dirname(dir);
        if (parent === dir)
            break;
        dir = parent;
    }
    return undefined;
}
function resolveMonorepoRoot() {
    return (findRootFrom(__dirname) ??
        findRootFrom(process.cwd()) ??
        path.resolve(process.cwd()));
}
const monorepoRoot = resolveMonorepoRoot();
exports.MONOREPO_ENV_PATH = path.join(monorepoRoot, '.env');
if (fs.existsSync(exports.MONOREPO_ENV_PATH)) {
    dotenv.config({ path: exports.MONOREPO_ENV_PATH });
}


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const dotenv_config_1 = __webpack_require__(2);
const common_1 = __webpack_require__(6);
const config_1 = __webpack_require__(8);
const infrastructure_module_1 = __webpack_require__(11);
const contracts_module_1 = __webpack_require__(96);
const app_config_1 = __importDefault(__webpack_require__(103));
const sqs_config_1 = __webpack_require__(104);
const app_controller_1 = __webpack_require__(105);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [app_config_1.default, sqs_config_1.sqs_config],
                envFilePath: dotenv_config_1.MONOREPO_ENV_PATH,
            }),
            infrastructure_module_1.InfrastructureModule,
            contracts_module_1.ContractsModule,
        ],
        controllers: [app_controller_1.appController],
    })
], AppModule);


/***/ }),
/* 11 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InfrastructureModule = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(12);
const config_1 = __webpack_require__(8);
const products_data_1 = __webpack_require__(13);
const postgres_type_orm_config_service_1 = __webpack_require__(66);
const typeorm_contract_repository_1 = __webpack_require__(68);
const typeorm_contract_reference_lookup_adapter_1 = __webpack_require__(71);
const contracts_tokens_1 = __webpack_require__(72);
const contract_reference_lookup_port_1 = __webpack_require__(73);
const sqs_module_1 = __webpack_require__(74);
const zapsign_signature_provider_adapter_1 = __webpack_require__(95);
const signature_provider_port_1 = __webpack_require__(92);
let InfrastructureModule = class InfrastructureModule {
};
exports.InfrastructureModule = InfrastructureModule;
exports.InfrastructureModule = InfrastructureModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useClass: postgres_type_orm_config_service_1.PostgresTypeOrmConfigService,
            }),
            typeorm_1.TypeOrmModule.forFeature([products_data_1.ContractEntity]),
            sqs_module_1.SqsModule,
        ],
        providers: [
            typeorm_contract_reference_lookup_adapter_1.TypeormContractReferenceLookupAdapter,
            {
                provide: contract_reference_lookup_port_1.CONTRACT_REFERENCE_LOOKUP,
                useExisting: typeorm_contract_reference_lookup_adapter_1.TypeormContractReferenceLookupAdapter,
            },
            {
                provide: contracts_tokens_1.CONTRACT_REPOSITORY,
                useClass: typeorm_contract_repository_1.TypeormContractRepository,
            },
            zapsign_signature_provider_adapter_1.ZapSignSignatureProviderAdapter,
            {
                provide: signature_provider_port_1.SIGNATURE_PROVIDER,
                useExisting: zapsign_signature_provider_adapter_1.ZapSignSignatureProviderAdapter,
            },
        ],
        exports: [
            contracts_tokens_1.CONTRACT_REPOSITORY,
            contract_reference_lookup_port_1.CONTRACT_REFERENCE_LOOKUP,
            signature_provider_port_1.SIGNATURE_PROVIDER,
            sqs_module_1.SqsModule,
            typeorm_1.TypeOrmModule,
        ],
    })
], InfrastructureModule);


/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(14), exports);
__exportStar(__webpack_require__(15), exports);
__exportStar(__webpack_require__(43), exports);
__exportStar(__webpack_require__(54), exports);
__exportStar(__webpack_require__(55), exports);
__exportStar(__webpack_require__(42), exports);
__exportStar(__webpack_require__(56), exports);
__exportStar(__webpack_require__(57), exports);
__exportStar(__webpack_require__(65), exports);


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PRODUCTS_DATA_ENTITIES = void 0;
const category_entity_1 = __webpack_require__(15);
const contract_entity_1 = __webpack_require__(43);
const contract_template_entity_1 = __webpack_require__(54);
const credit_application_entity_1 = __webpack_require__(55);
const credit_facility_entity_1 = __webpack_require__(42);
const document_entity_1 = __webpack_require__(56);
exports.PRODUCTS_DATA_ENTITIES = [
    credit_facility_entity_1.CreditFacilityEntity,
    category_entity_1.CategoryEntity,
    credit_application_entity_1.CreditApplicationEntity,
    contract_entity_1.ContractEntity,
    contract_template_entity_1.ContractTemplateEntity,
    document_entity_1.DocumentEntity,
];


/***/ }),
/* 15 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoryEntity = void 0;
const typeorm_1 = __webpack_require__(16);
const shared_1 = __webpack_require__(17);
const base_external_id_entity_1 = __webpack_require__(41);
const credit_facility_entity_1 = __webpack_require__(42);
const partners_entity_1 = __webpack_require__(44);
let CategoryEntity = class CategoryEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    creditFacilityId;
    partnerId;
    name;
    discountPercentage;
    interestRate;
    disbursementFeePercent;
    minimumDisbursementFee;
    delayDays;
    termDays;
    state;
    creditFacility;
    partner;
};
exports.CategoryEntity = CategoryEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'credit_facility_id', type: 'bigint' }),
    __metadata("design:type", Number)
], CategoryEntity.prototype, "creditFacilityId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'partner_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], CategoryEntity.prototype, "partnerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], CategoryEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'discount_percentage',
        type: 'decimal',
        precision: 8,
        scale: 4,
    }),
    __metadata("design:type", String)
], CategoryEntity.prototype, "discountPercentage", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'interest_rate',
        type: 'decimal',
        precision: 8,
        scale: 4,
    }),
    __metadata("design:type", String)
], CategoryEntity.prototype, "interestRate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'disbursement_fee_percent',
        type: 'decimal',
        precision: 8,
        scale: 4,
        nullable: true,
    }),
    __metadata("design:type", Object)
], CategoryEntity.prototype, "disbursementFeePercent", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'minimum_disbursement_fee',
        type: 'decimal',
        precision: 18,
        scale: 4,
        nullable: true,
    }),
    __metadata("design:type", Object)
], CategoryEntity.prototype, "minimumDisbursementFee", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'delay_days', type: 'int' }),
    __metadata("design:type", Number)
], CategoryEntity.prototype, "delayDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'term_days', type: 'int' }),
    __metadata("design:type", Number)
], CategoryEntity.prototype, "termDays", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'state',
        type: 'enum',
        enum: shared_1.CategoryState,
        enumName: 'credit_facility_state',
        default: shared_1.CategoryState.ACTIVE,
    }),
    __metadata("design:type", typeof (_a = typeof shared_1.CategoryState !== "undefined" && shared_1.CategoryState) === "function" ? _a : Object)
], CategoryEntity.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => credit_facility_entity_1.CreditFacilityEntity, (cf) => cf.categories, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'credit_facility_id' }),
    __metadata("design:type", typeof (_b = typeof credit_facility_entity_1.CreditFacilityEntity !== "undefined" && credit_facility_entity_1.CreditFacilityEntity) === "function" ? _b : Object)
], CategoryEntity.prototype, "creditFacility", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => partners_entity_1.PartnersEntity, (p) => p.categories, {
        nullable: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'partner_id' }),
    __metadata("design:type", Object)
], CategoryEntity.prototype, "partner", void 0);
exports.CategoryEntity = CategoryEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'categories', schema: 'products_schema' })
], CategoryEntity);


/***/ }),
/* 16 */
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),
/* 17 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SQS_CLIENT = exports.QUEUES_CONFIG = void 0;
var sqs_tokens_1 = __webpack_require__(18);
Object.defineProperty(exports, "QUEUES_CONFIG", ({ enumerable: true, get: function () { return sqs_tokens_1.QUEUES_CONFIG; } }));
Object.defineProperty(exports, "SQS_CLIENT", ({ enumerable: true, get: function () { return sqs_tokens_1.SQS_CLIENT; } }));
__exportStar(__webpack_require__(19), exports);
__exportStar(__webpack_require__(21), exports);
__exportStar(__webpack_require__(22), exports);
__exportStar(__webpack_require__(23), exports);
__exportStar(__webpack_require__(24), exports);
__exportStar(__webpack_require__(25), exports);
__exportStar(__webpack_require__(26), exports);
__exportStar(__webpack_require__(27), exports);
__exportStar(__webpack_require__(28), exports);
__exportStar(__webpack_require__(29), exports);
__exportStar(__webpack_require__(30), exports);
__exportStar(__webpack_require__(31), exports);
__exportStar(__webpack_require__(32), exports);
__exportStar(__webpack_require__(33), exports);
__exportStar(__webpack_require__(34), exports);
__exportStar(__webpack_require__(36), exports);
__exportStar(__webpack_require__(37), exports);
__exportStar(__webpack_require__(40), exports);


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QUEUES_CONFIG = exports.SQS_CLIENT = void 0;
exports.SQS_CLIENT = Symbol('SQS_CLIENT');
exports.QUEUES_CONFIG = Symbol('QUEUES_CONFIG');


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.create_sqs_client = create_sqs_client;
const client_sqs_1 = __webpack_require__(20);
function create_sqs_client(options) {
    const config = {
        region: options.region,
        ...(options.endpoint ? { endpoint: options.endpoint } : {}),
        ...(options.credentials ? { credentials: options.credentials } : {}),
    };
    return new client_sqs_1.SQSClient(config);
}


/***/ }),
/* 20 */
/***/ ((module) => {

module.exports = require("@aws-sdk/client-sqs");

/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SqsPublishFailedError = void 0;
class SqsPublishFailedError extends Error {
    cause;
    constructor(message, cause) {
        super(message);
        this.name = 'SqsPublishFailedError';
        this.cause = cause;
    }
}
exports.SqsPublishFailedError = SqsPublishFailedError;


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseConsumer = exports.BaseSqsConsumer = void 0;
const client_sqs_1 = __webpack_require__(20);
const sleep_ms = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const INITIAL_BACKOFF_MS = 1000;
const MAX_BACKOFF_MS = 30_000;
class BaseSqsConsumer {
    sqs_client;
    logger;
    stopped = false;
    poll_promise;
    constructor(sqs_client, logger) {
        this.sqs_client = sqs_client;
        this.logger = logger;
    }
    start() {
        if (this.poll_promise) {
            return;
        }
        const queue_url = this.resolve_queue_url();
        if (!queue_url) {
            this.logger.warn(this.inactive_reason_message());
            return;
        }
        this.logger.log(this.active_log_message(queue_url));
        this.poll_promise = this.poll_loop(queue_url);
    }
    stop() {
        this.stopped = true;
    }
    inactive_reason_message() {
        return 'Cola SQS de entrada no configurada; worker inactivo.';
    }
    active_log_message(queue_url) {
        return `Worker SQS escuchando: ${queue_url}`;
    }
    async poll_loop(queue_url) {
        let backoff_ms = INITIAL_BACKOFF_MS;
        while (!this.stopped) {
            try {
                const { wait_time_seconds, max_number_of_messages, visibility_timeout_seconds } = this.get_poll_settings();
                const response = await this.sqs_client.send(new client_sqs_1.ReceiveMessageCommand({
                    QueueUrl: queue_url,
                    MaxNumberOfMessages: max_number_of_messages,
                    WaitTimeSeconds: wait_time_seconds,
                    VisibilityTimeout: visibility_timeout_seconds,
                    MessageAttributeNames: ['All'],
                    AttributeNames: ['All'],
                }));
                backoff_ms = INITIAL_BACKOFF_MS;
                const messages = response.Messages ?? [];
                for (const raw of messages) {
                    await this.process_one(queue_url, raw);
                }
            }
            catch (err) {
                const text = err instanceof Error ? err.message : String(err);
                this.logger.error(`Error en ciclo ReceiveMessage: ${text}`);
                await sleep_ms(backoff_ms);
                backoff_ms = Math.min(backoff_ms * 2, MAX_BACKOFF_MS);
            }
        }
    }
    async process_one(queue_url, raw) {
        if (!raw.Body || !raw.ReceiptHandle) {
            return;
        }
        const message = {
            body: raw.Body,
            receipt_handle: raw.ReceiptHandle,
            message_id: raw.MessageId,
        };
        let should_delete = false;
        try {
            should_delete = await this.handle(message);
        }
        catch (err) {
            const text = err instanceof Error ? err.message : String(err);
            this.logger.error(`Error no controlado al procesar mensaje: ${text}`);
            should_delete = false;
        }
        if (should_delete) {
            await this.sqs_client.send(new client_sqs_1.DeleteMessageCommand({
                QueueUrl: queue_url,
                ReceiptHandle: message.receipt_handle,
            }));
        }
    }
}
exports.BaseSqsConsumer = BaseSqsConsumer;
exports.BaseConsumer = BaseSqsConsumer;


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BasePublisher = exports.BaseSqsPublisher = void 0;
const client_sqs_1 = __webpack_require__(20);
const sqs_publish_failed_error_1 = __webpack_require__(22);
class BaseSqsPublisher {
    sqs_client;
    constructor(sqs_client) {
        this.sqs_client = sqs_client;
    }
    enrich_send_input(input) {
        return input;
    }
    async send_message(input) {
        const to_send = this.enrich_send_input(input);
        try {
            await this.sqs_client.send(new client_sqs_1.SendMessageCommand(to_send));
        }
        catch (cause) {
            const text = cause instanceof Error ? cause.message : String(cause);
            throw new sqs_publish_failed_error_1.SqsPublishFailedError(`Fallo SendMessage en SQS: ${text}`, cause);
        }
    }
}
exports.BaseSqsPublisher = BaseSqsPublisher;
exports.BasePublisher = BaseSqsPublisher;


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BusinessSeniorityCatalogState = exports.RolePermissionLinkState = exports.PermissionDefinitionState = exports.RoleDefinitionState = exports.PurchaseOrderRecordState = exports.BankAccountRecordState = exports.ShareholderRecordState = exports.LegalRepresentativeLifecycleState = exports.PersonRecordState = exports.BusinessLifecycleState = exports.CatalogActivationState = exports.UserState = exports.SalesRepresentativeRecordState = exports.PartnerOnboardingSagaStatus = exports.SupplierState = exports.PartnerState = exports.DocumentVerificationStatus = exports.ContractTemplateCatalogStatus = exports.ContractCatalogStatus = exports.CreditApplicationStatus = exports.CategoryState = exports.CreditFacilityState = void 0;
var CreditFacilityState;
(function (CreditFacilityState) {
    CreditFacilityState["ACTIVE"] = "active";
    CreditFacilityState["INACTIVE"] = "inactive";
})(CreditFacilityState || (exports.CreditFacilityState = CreditFacilityState = {}));
var CategoryState;
(function (CategoryState) {
    CategoryState["ACTIVE"] = "active";
    CategoryState["INACTIVE"] = "inactive";
})(CategoryState || (exports.CategoryState = CategoryState = {}));
var CreditApplicationStatus;
(function (CreditApplicationStatus) {
    CreditApplicationStatus["IN_PROGRESS"] = "in_progress";
    CreditApplicationStatus["DUPLICATE"] = "duplicate";
    CreditApplicationStatus["UNDER_REVIEW"] = "under_review";
    CreditApplicationStatus["SARLAFT_MATCH"] = "sarlaft_match";
    CreditApplicationStatus["EXPERIAN_QUERY_ERROR"] = "experian_query_error";
    CreditApplicationStatus["AI_AGENT_ERROR"] = "ai_agent_error";
    CreditApplicationStatus["IN_INTERVIEW"] = "in_interview";
    CreditApplicationStatus["HCPJ_QUERY_ERROR"] = "hcpj_query_error";
    CreditApplicationStatus["PENDING_AUTHORIZATION"] = "pending_authorization";
    CreditApplicationStatus["AUTHORIZED"] = "authorized";
    CreditApplicationStatus["REJECTED"] = "rejected";
    CreditApplicationStatus["CANCELLED"] = "cancelled";
    CreditApplicationStatus["CLOSED"] = "closed";
})(CreditApplicationStatus || (exports.CreditApplicationStatus = CreditApplicationStatus = {}));
var ContractCatalogStatus;
(function (ContractCatalogStatus) {
    ContractCatalogStatus["PENDING"] = "pending";
    ContractCatalogStatus["SIGNED"] = "signed";
    ContractCatalogStatus["CANCELLED"] = "cancelled";
})(ContractCatalogStatus || (exports.ContractCatalogStatus = ContractCatalogStatus = {}));
var ContractTemplateCatalogStatus;
(function (ContractTemplateCatalogStatus) {
    ContractTemplateCatalogStatus["ACTIVE"] = "active";
    ContractTemplateCatalogStatus["INACTIVE"] = "inactive";
})(ContractTemplateCatalogStatus || (exports.ContractTemplateCatalogStatus = ContractTemplateCatalogStatus = {}));
var DocumentVerificationStatus;
(function (DocumentVerificationStatus) {
    DocumentVerificationStatus["PENDING"] = "pending";
    DocumentVerificationStatus["VERIFIED"] = "verified";
    DocumentVerificationStatus["REJECTED"] = "rejected";
})(DocumentVerificationStatus || (exports.DocumentVerificationStatus = DocumentVerificationStatus = {}));
var PartnerState;
(function (PartnerState) {
    PartnerState["ACTIVE"] = "active";
    PartnerState["INACTIVE"] = "inactive";
})(PartnerState || (exports.PartnerState = PartnerState = {}));
var SupplierState;
(function (SupplierState) {
    SupplierState["ACTIVE"] = "active";
    SupplierState["INACTIVE"] = "inactive";
})(SupplierState || (exports.SupplierState = SupplierState = {}));
var PartnerOnboardingSagaStatus;
(function (PartnerOnboardingSagaStatus) {
    PartnerOnboardingSagaStatus["RUNNING"] = "RUNNING";
    PartnerOnboardingSagaStatus["COMPLETED"] = "COMPLETED";
    PartnerOnboardingSagaStatus["FAILED"] = "FAILED";
    PartnerOnboardingSagaStatus["COMPENSATING"] = "COMPENSATING";
})(PartnerOnboardingSagaStatus || (exports.PartnerOnboardingSagaStatus = PartnerOnboardingSagaStatus = {}));
var SalesRepresentativeRecordState;
(function (SalesRepresentativeRecordState) {
    SalesRepresentativeRecordState["ACTIVE"] = "active";
    SalesRepresentativeRecordState["INACTIVE"] = "inactive";
})(SalesRepresentativeRecordState || (exports.SalesRepresentativeRecordState = SalesRepresentativeRecordState = {}));
var UserState;
(function (UserState) {
    UserState["ACTIVE"] = "active";
    UserState["INACTIVE"] = "inactive";
})(UserState || (exports.UserState = UserState = {}));
var CatalogActivationState;
(function (CatalogActivationState) {
    CatalogActivationState["ACTIVE"] = "active";
    CatalogActivationState["INACTIVE"] = "inactive";
})(CatalogActivationState || (exports.CatalogActivationState = CatalogActivationState = {}));
var BusinessLifecycleState;
(function (BusinessLifecycleState) {
    BusinessLifecycleState["ACTIVE"] = "active";
    BusinessLifecycleState["INACTIVE"] = "inactive";
})(BusinessLifecycleState || (exports.BusinessLifecycleState = BusinessLifecycleState = {}));
var PersonRecordState;
(function (PersonRecordState) {
    PersonRecordState["ACTIVE"] = "active";
    PersonRecordState["INACTIVE"] = "inactive";
})(PersonRecordState || (exports.PersonRecordState = PersonRecordState = {}));
var LegalRepresentativeLifecycleState;
(function (LegalRepresentativeLifecycleState) {
    LegalRepresentativeLifecycleState["ACTIVE"] = "active";
    LegalRepresentativeLifecycleState["INACTIVE"] = "inactive";
})(LegalRepresentativeLifecycleState || (exports.LegalRepresentativeLifecycleState = LegalRepresentativeLifecycleState = {}));
var ShareholderRecordState;
(function (ShareholderRecordState) {
    ShareholderRecordState["ACTIVE"] = "active";
    ShareholderRecordState["INACTIVE"] = "inactive";
})(ShareholderRecordState || (exports.ShareholderRecordState = ShareholderRecordState = {}));
var BankAccountRecordState;
(function (BankAccountRecordState) {
    BankAccountRecordState["ACTIVE"] = "active";
    BankAccountRecordState["INACTIVE"] = "inactive";
})(BankAccountRecordState || (exports.BankAccountRecordState = BankAccountRecordState = {}));
var PurchaseOrderRecordState;
(function (PurchaseOrderRecordState) {
    PurchaseOrderRecordState["ACTIVE"] = "active";
    PurchaseOrderRecordState["INACTIVE"] = "inactive";
})(PurchaseOrderRecordState || (exports.PurchaseOrderRecordState = PurchaseOrderRecordState = {}));
var RoleDefinitionState;
(function (RoleDefinitionState) {
    RoleDefinitionState["ACTIVE"] = "active";
    RoleDefinitionState["INACTIVE"] = "inactive";
})(RoleDefinitionState || (exports.RoleDefinitionState = RoleDefinitionState = {}));
var PermissionDefinitionState;
(function (PermissionDefinitionState) {
    PermissionDefinitionState["ACTIVE"] = "active";
    PermissionDefinitionState["INACTIVE"] = "inactive";
})(PermissionDefinitionState || (exports.PermissionDefinitionState = PermissionDefinitionState = {}));
var RolePermissionLinkState;
(function (RolePermissionLinkState) {
    RolePermissionLinkState["ACTIVE"] = "active";
    RolePermissionLinkState["INACTIVE"] = "inactive";
})(RolePermissionLinkState || (exports.RolePermissionLinkState = RolePermissionLinkState = {}));
var BusinessSeniorityCatalogState;
(function (BusinessSeniorityCatalogState) {
    BusinessSeniorityCatalogState["ACTIVE"] = "active";
    BusinessSeniorityCatalogState["INACTIVE"] = "inactive";
})(BusinessSeniorityCatalogState || (exports.BusinessSeniorityCatalogState = BusinessSeniorityCatalogState = {}));


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DocIssueDateTypes = exports.DocTypes = exports.GenderTypes = exports.OwnerTypes = exports.AccountTypes = void 0;
var AccountTypes;
(function (AccountTypes) {
    AccountTypes["Saving"] = "saving";
    AccountTypes["Checking"] = "checking";
})(AccountTypes || (exports.AccountTypes = AccountTypes = {}));
var OwnerTypes;
(function (OwnerTypes) {
    OwnerTypes["PERSONAL"] = "personal";
    OwnerTypes["BUSINESS"] = "business";
})(OwnerTypes || (exports.OwnerTypes = OwnerTypes = {}));
var GenderTypes;
(function (GenderTypes) {
    GenderTypes["MALE"] = "male";
    GenderTypes["FEMALE"] = "female";
    GenderTypes["OTHER"] = "other";
})(GenderTypes || (exports.GenderTypes = GenderTypes = {}));
var DocTypes;
(function (DocTypes) {
    DocTypes["CITIZENSHIP"] = "citizenship";
    DocTypes["PASSPORT"] = "passport";
    DocTypes["OTHER"] = "other";
})(DocTypes || (exports.DocTypes = DocTypes = {}));
var DocIssueDateTypes;
(function (DocIssueDateTypes) {
    DocIssueDateTypes["NATIONALITY"] = "nationality";
    DocIssueDateTypes["RESIDENCE"] = "residence";
    DocIssueDateTypes["WORK"] = "work";
})(DocIssueDateTypes || (exports.DocIssueDateTypes = DocIssueDateTypes = {}));


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Entity = void 0;
class Entity {
    props;
    constructor(props) {
        this.props = props;
    }
    equals(other) {
        if (other === undefined) {
            return false;
        }
        return this.id === other.id;
    }
}
exports.Entity = Entity;


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DOMAIN_EVENT_BUS = exports.DomainEventBus = void 0;
class DomainEventBus {
    handlers = new Map();
    subscribe(event_name, handler) {
        if (!this.handlers.has(event_name)) {
            this.handlers.set(event_name, []);
        }
        this.handlers.get(event_name).push(handler);
    }
    async publish(event) {
        const event_name = event.constructor.name;
        const fns = this.handlers.get(event_name) ?? [];
        await Promise.allSettled(fns.map((fn) => fn(event)));
    }
    async publish_many(events) {
        await Promise.allSettled(events.map((e) => this.publish(e)));
    }
}
exports.DomainEventBus = DomainEventBus;
exports.DOMAIN_EVENT_BUS = Symbol('DOMAIN_EVENT_BUS');


/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NestStructuredLoggerAdapter = exports.NestLoggerAdapter = void 0;
class NestLoggerAdapter {
    nest_logger;
    constructor(nest_logger) {
        this.nest_logger = nest_logger;
    }
    log(message) {
        this.nest_logger.log(message);
    }
    warn(message) {
        this.nest_logger.warn(message);
    }
    error(message) {
        this.nest_logger.error(message);
    }
}
exports.NestLoggerAdapter = NestLoggerAdapter;
class NestStructuredLoggerAdapter {
    nest_logger;
    scope;
    trace_id;
    constructor(nest_logger, scope, trace_id) {
        this.nest_logger = nest_logger;
        this.scope = scope;
        this.trace_id = trace_id;
    }
    prefix() {
        return this.trace_id
            ? `[${this.scope}][${this.trace_id}]`
            : `[${this.scope}]`;
    }
    format(message, meta) {
        const payload = meta && Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : '';
        return `${this.prefix()} ${message}${payload}`;
    }
    debug(message, meta) {
        this.nest_logger.debug?.(this.format(message, meta));
    }
    info(message, meta) {
        this.nest_logger.log(this.format(message, meta));
    }
    warn(message, meta) {
        this.nest_logger.warn(this.format(message, meta));
    }
    error(message, meta) {
        this.nest_logger.error(this.format(message, meta));
    }
}
exports.NestStructuredLoggerAdapter = NestStructuredLoggerAdapter;


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.new_uuid = new_uuid;
const crypto_1 = __webpack_require__(35);
function new_uuid() {
    return (0, crypto_1.randomUUID)();
}


/***/ }),
/* 35 */
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.to_iso_utc = to_iso_utc;
exports.is_before = is_before;
function to_iso_utc(date) {
    return date.toISOString();
}
function is_before(a, b) {
    return a.getTime() < b.getTime();
}


/***/ }),
/* 37 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaginationRequestDto = void 0;
const class_transformer_1 = __webpack_require__(38);
const class_validator_1 = __webpack_require__(39);
class PaginationRequestDto {
    offset = 0;
    limit = 20;
}
exports.PaginationRequestDto = PaginationRequestDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], PaginationRequestDto.prototype, "offset", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(500),
    __metadata("design:type", Object)
], PaginationRequestDto.prototype, "limit", void 0);


/***/ }),
/* 38 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 39 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceErrorCode = void 0;
var ServiceErrorCode;
(function (ServiceErrorCode) {
    ServiceErrorCode["VALIDATION_FAILED"] = "VALIDATION_FAILED";
    ServiceErrorCode["NOT_FOUND"] = "NOT_FOUND";
    ServiceErrorCode["CONFLICT"] = "CONFLICT";
    ServiceErrorCode["INTERNAL"] = "INTERNAL";
})(ServiceErrorCode || (exports.ServiceErrorCode = ServiceErrorCode = {}));


/***/ }),
/* 41 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseExternalIdEntity = void 0;
const typeorm_1 = __webpack_require__(16);
class BaseExternalIdEntity {
    id;
    externalId;
    createdAt;
    updatedAt;
}
exports.BaseExternalIdEntity = BaseExternalIdEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], BaseExternalIdEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'external_id',
        type: 'uuid',
        unique: true,
        insert: false,
        update: false,
    }),
    __metadata("design:type", String)
], BaseExternalIdEntity.prototype, "externalId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
        type: 'timestamptz',
        insert: false,
        update: false,
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], BaseExternalIdEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'updated_at',
        type: 'timestamptz',
        insert: false,
        update: false,
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], BaseExternalIdEntity.prototype, "updatedAt", void 0);


/***/ }),
/* 42 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreditFacilityEntity = void 0;
const typeorm_1 = __webpack_require__(16);
const shared_1 = __webpack_require__(17);
const base_external_id_entity_1 = __webpack_require__(41);
const category_entity_1 = __webpack_require__(15);
const contract_entity_1 = __webpack_require__(43);
let CreditFacilityEntity = class CreditFacilityEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    contractId;
    state;
    totalLimit;
    categories;
};
exports.CreditFacilityEntity = CreditFacilityEntity;
__decorate([
    (0, typeorm_1.OneToOne)(() => contract_entity_1.ContractEntity, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'contract_id', referencedColumnName: 'id' }),
    __metadata("design:type", Object)
], CreditFacilityEntity.prototype, "contractId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'state',
        type: 'enum',
        enum: shared_1.CreditFacilityState,
        enumName: 'credit_facility_state',
        default: shared_1.CreditFacilityState.ACTIVE,
    }),
    __metadata("design:type", typeof (_b = typeof shared_1.CreditFacilityState !== "undefined" && shared_1.CreditFacilityState) === "function" ? _b : Object)
], CreditFacilityEntity.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'total_limit',
        type: 'decimal',
        precision: 18,
        scale: 4,
    }),
    __metadata("design:type", String)
], CreditFacilityEntity.prototype, "totalLimit", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => category_entity_1.CategoryEntity, (category) => category.creditFacility),
    __metadata("design:type", Array)
], CreditFacilityEntity.prototype, "categories", void 0);
exports.CreditFacilityEntity = CreditFacilityEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'credit_facilities', schema: 'products_schema' })
], CreditFacilityEntity);


/***/ }),
/* 43 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContractEntity = void 0;
const typeorm_1 = __webpack_require__(16);
const shared_1 = __webpack_require__(17);
const base_external_id_entity_1 = __webpack_require__(41);
let ContractEntity = class ContractEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    userId;
    contractTemplateId;
    zapsignToken;
    state;
    originalFileUrl;
    signedFileUrl;
    formAnswersJson;
};
exports.ContractEntity = ContractEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], ContractEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contract_template_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], ContractEntity.prototype, "contractTemplateId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'zapsign_token', type: 'varchar', nullable: true, unique: true }),
    __metadata("design:type", Object)
], ContractEntity.prototype, "zapsignToken", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'state',
        type: 'enum',
        enum: shared_1.ContractCatalogStatus,
        enumName: 'contract_catalog_status',
        default: shared_1.ContractCatalogStatus.PENDING,
    }),
    __metadata("design:type", typeof (_a = typeof shared_1.ContractCatalogStatus !== "undefined" && shared_1.ContractCatalogStatus) === "function" ? _a : Object)
], ContractEntity.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'original_file_url', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ContractEntity.prototype, "originalFileUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'signed_file_url', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ContractEntity.prototype, "signedFileUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'form_answers_json', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], ContractEntity.prototype, "formAnswersJson", void 0);
exports.ContractEntity = ContractEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'contracts', schema: 'products_schema' })
], ContractEntity);


/***/ }),
/* 44 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PartnersEntity = void 0;
const typeorm_1 = __webpack_require__(16);
const category_entity_1 = __webpack_require__(15);
const shared_1 = __webpack_require__(17);
const base_external_id_entity_1 = __webpack_require__(45);
const business_entity_1 = __webpack_require__(46);
const sales_representative_entity_1 = __webpack_require__(52);
const supplier_entity_1 = __webpack_require__(53);
const transversal_data_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@app/transversal-data'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
let PartnersEntity = class PartnersEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    business;
    supplier;
    alias;
    acronym;
    logoUrl;
    coBrandingLogoUrl;
    primaryColor;
    secondaryColor;
    lightColor;
    notificationEmail;
    webhookUrl;
    disbursementNotificationEmail;
    apiKeyHash;
    sendSalesRepVoucher;
    roles;
    salesRepresentatives;
    categories;
    countryCode;
    state;
};
exports.PartnersEntity = PartnersEntity;
__decorate([
    (0, typeorm_1.ManyToOne)(() => business_entity_1.BusinessEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'business_id', referencedColumnName: 'id' }),
    __metadata("design:type", typeof (_a = typeof business_entity_1.BusinessEntity !== "undefined" && business_entity_1.BusinessEntity) === "function" ? _a : Object)
], PartnersEntity.prototype, "business", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => supplier_entity_1.SupplierEntity, (s) => s.partner, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'supplier_id', referencedColumnName: 'id' }),
    __metadata("design:type", typeof (_b = typeof supplier_entity_1.SupplierEntity !== "undefined" && supplier_entity_1.SupplierEntity) === "function" ? _b : Object)
], PartnersEntity.prototype, "supplier", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'alias',
        type: 'varchar',
        length: 100,
        unique: true,
        nullable: true,
    }),
    __metadata("design:type", Object)
], PartnersEntity.prototype, "alias", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'acronym', type: 'varchar', length: 10, nullable: true }),
    __metadata("design:type", Object)
], PartnersEntity.prototype, "acronym", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'logo_url', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], PartnersEntity.prototype, "logoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'co_branding_logo_url', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], PartnersEntity.prototype, "coBrandingLogoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'primary_color',
        type: 'varchar',
        length: 7,
        nullable: true,
    }),
    __metadata("design:type", Object)
], PartnersEntity.prototype, "primaryColor", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'secondary_color',
        type: 'varchar',
        length: 7,
        nullable: true,
    }),
    __metadata("design:type", Object)
], PartnersEntity.prototype, "secondaryColor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'light_color', type: 'varchar', length: 7, nullable: true }),
    __metadata("design:type", Object)
], PartnersEntity.prototype, "lightColor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'notification_email', type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], PartnersEntity.prototype, "notificationEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'webhook_url', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], PartnersEntity.prototype, "webhookUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'disbursement_notification_email',
        type: 'varchar',
        nullable: true,
    }),
    __metadata("design:type", Object)
], PartnersEntity.prototype, "disbursementNotificationEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'api_key_hash', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], PartnersEntity.prototype, "apiKeyHash", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'send_sales_rep_voucher',
        type: 'boolean',
        default: false,
    }),
    __metadata("design:type", Boolean)
], PartnersEntity.prototype, "sendSalesRepVoucher", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => transversal_data_1.RoleEntity, (r) => r.partner),
    (0, typeorm_1.JoinColumn)({ name: 'partner_id', referencedColumnName: 'id' }),
    __metadata("design:type", Array)
], PartnersEntity.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sales_representative_entity_1.SalesRepresentativeEntity, (sr) => sr.partner),
    __metadata("design:type", Array)
], PartnersEntity.prototype, "salesRepresentatives", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => category_entity_1.CategoryEntity, (c) => c.partner),
    __metadata("design:type", Array)
], PartnersEntity.prototype, "categories", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country_code', type: 'varchar', length: 2, nullable: true }),
    __metadata("design:type", Object)
], PartnersEntity.prototype, "countryCode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'state',
        type: 'enum',
        enum: shared_1.PartnerState,
        enumName: 'partner_state',
        default: shared_1.PartnerState.ACTIVE,
    }),
    __metadata("design:type", typeof (_c = typeof shared_1.PartnerState !== "undefined" && shared_1.PartnerState) === "function" ? _c : Object)
], PartnersEntity.prototype, "state", void 0);
exports.PartnersEntity = PartnersEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'partners', schema: 'suppliers_schema' }),
    (0, typeorm_1.Index)('IDX_partners_state', ['state']),
    (0, typeorm_1.Index)('IDX_partners_business_id', ['business'])
], PartnersEntity);


/***/ }),
/* 45 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseExternalIdEntity = void 0;
const typeorm_1 = __webpack_require__(16);
class BaseExternalIdEntity {
    id;
    externalId;
    createdAt;
    updatedAt;
}
exports.BaseExternalIdEntity = BaseExternalIdEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], BaseExternalIdEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'external_id',
        type: 'uuid',
        unique: true,
        insert: false,
        update: false,
    }),
    __metadata("design:type", String)
], BaseExternalIdEntity.prototype, "externalId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
        type: 'timestamptz',
        insert: false,
        update: false,
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], BaseExternalIdEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'updated_at',
        type: 'timestamptz',
        insert: false,
        update: false,
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], BaseExternalIdEntity.prototype, "updatedAt", void 0);


/***/ }),
/* 46 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BusinessEntity = void 0;
const typeorm_1 = __webpack_require__(16);
const person_entity_1 = __webpack_require__(47);
const base_external_id_entity_1 = __webpack_require__(45);
const business_seniority_entity_1 = __webpack_require__(51);
const city_entity_1 = __webpack_require__(50);
let BusinessEntity = class BusinessEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    person;
    personId;
    businessSeniority;
    businessSeniorityId;
    city;
    entityType;
    businessName;
    businessAddress;
    businessType;
    relationshipToBusiness;
    legalName;
    tradeName;
    taxId;
    yearOfEstablishment;
};
exports.BusinessEntity = BusinessEntity;
__decorate([
    (0, typeorm_1.ManyToOne)(() => person_entity_1.PersonEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'person_id', referencedColumnName: 'id' }),
    __metadata("design:type", typeof (_a = typeof person_entity_1.PersonEntity !== "undefined" && person_entity_1.PersonEntity) === "function" ? _a : Object)
], BusinessEntity.prototype, "person", void 0);
__decorate([
    (0, typeorm_1.RelationId)((b) => b.person),
    __metadata("design:type", Number)
], BusinessEntity.prototype, "personId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => business_seniority_entity_1.BusinessSeniorityEntity, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'business_seniority_id', referencedColumnName: 'id' }),
    __metadata("design:type", Object)
], BusinessEntity.prototype, "businessSeniority", void 0);
__decorate([
    (0, typeorm_1.RelationId)((b) => b.businessSeniority),
    __metadata("design:type", Object)
], BusinessEntity.prototype, "businessSeniorityId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => city_entity_1.CityEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'city_id', referencedColumnName: 'id' }),
    __metadata("design:type", typeof (_c = typeof city_entity_1.CityEntity !== "undefined" && city_entity_1.CityEntity) === "function" ? _c : Object)
], BusinessEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'entity_type', type: 'varchar', length: 10 }),
    __metadata("design:type", String)
], BusinessEntity.prototype, "entityType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'business_name', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], BusinessEntity.prototype, "businessName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'business_address', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], BusinessEntity.prototype, "businessAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'business_type', type: 'varchar', length: 10, nullable: true }),
    __metadata("design:type", Object)
], BusinessEntity.prototype, "businessType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'relationship_to_business', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], BusinessEntity.prototype, "relationshipToBusiness", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'legal_name', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], BusinessEntity.prototype, "legalName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'trade_name', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], BusinessEntity.prototype, "tradeName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tax_id', type: 'varchar', length: 50, unique: true, nullable: true }),
    __metadata("design:type", Object)
], BusinessEntity.prototype, "taxId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'year_of_establishment', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], BusinessEntity.prototype, "yearOfEstablishment", void 0);
exports.BusinessEntity = BusinessEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'businesses', schema: 'suppliers_schema' })
], BusinessEntity);


/***/ }),
/* 47 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PersonEntity = void 0;
const typeorm_1 = __webpack_require__(16);
const base_external_id_entity_1 = __webpack_require__(41);
const bank_account_entity_1 = __webpack_require__(48);
const shared_1 = __webpack_require__(17);
const city_entity_1 = __webpack_require__(50);
let PersonEntity = class PersonEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    firstName;
    lastName;
    docType;
    docNumber;
    docIssueDate;
    birthDate;
    gender;
    phone;
    email;
    residentialAddress;
    city;
    bankAccount;
};
exports.PersonEntity = PersonEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'first_name', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], PersonEntity.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_name', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], PersonEntity.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'doc_type',
        type: 'enum',
        enum: shared_1.DocTypes,
        enumName: 'persons_doc_type_enum',
    }),
    __metadata("design:type", String)
], PersonEntity.prototype, "docType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'doc_number', type: 'varchar', unique: true }),
    __metadata("design:type", String)
], PersonEntity.prototype, "docNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'doc_issue_date', type: 'date', nullable: true }),
    __metadata("design:type", Object)
], PersonEntity.prototype, "docIssueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'birth_date', type: 'date', nullable: true }),
    __metadata("design:type", Object)
], PersonEntity.prototype, "birthDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'gender', type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", Object)
], PersonEntity.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'phone', type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], PersonEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email', type: 'varchar', length: 320, unique: true, nullable: true }),
    __metadata("design:type", Object)
], PersonEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'residential_address', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], PersonEntity.prototype, "residentialAddress", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => city_entity_1.CityEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'city_id', referencedColumnName: 'id' }),
    __metadata("design:type", typeof (_c = typeof city_entity_1.CityEntity !== "undefined" && city_entity_1.CityEntity) === "function" ? _c : Object)
], PersonEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => bank_account_entity_1.BankAccountEntity, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'bank_account_id' }),
    __metadata("design:type", Object)
], PersonEntity.prototype, "bankAccount", void 0);
exports.PersonEntity = PersonEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'persons', schema: 'transversal_schema' })
], PersonEntity);


/***/ }),
/* 48 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BankAccountEntity = void 0;
const typeorm_1 = __webpack_require__(16);
const base_external_id_entity_1 = __webpack_require__(45);
const aes_256_transformer_1 = __webpack_require__(49);
const shared_1 = __webpack_require__(17);
let BankAccountEntity = class BankAccountEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    bankEntity;
    accountNumber;
    bankCertification;
    accountType;
};
exports.BankAccountEntity = BankAccountEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'bank_entity', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], BankAccountEntity.prototype, "bankEntity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'account_number',
        type: 'varchar',
        length: 500,
        transformer: aes_256_transformer_1.BankAccountEncryptionTransformer,
    }),
    __metadata("design:type", String)
], BankAccountEntity.prototype, "accountNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bank_certification', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], BankAccountEntity.prototype, "bankCertification", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'account_type',
        type: 'enum',
        enum: shared_1.AccountTypes,
    }),
    __metadata("design:type", typeof (_a = typeof shared_1.AccountTypes !== "undefined" && shared_1.AccountTypes) === "function" ? _a : Object)
], BankAccountEntity.prototype, "accountType", void 0);
exports.BankAccountEntity = BankAccountEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'bank_accounts', schema: 'suppliers_schema' })
], BankAccountEntity);


/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BankAccountEncryptionTransformer = void 0;
exports.BankAccountEncryptionTransformer = {
    to: (value) => value,
    from: (value) => value,
};


/***/ }),
/* 50 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CityEntity = void 0;
const typeorm_1 = __webpack_require__(16);
const base_external_id_entity_1 = __webpack_require__(41);
let CityEntity = class CityEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    countryName;
    countryCode;
    stateName;
    stateCode;
    cityName;
    currencyId;
};
exports.CityEntity = CityEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'country_name', type: 'varchar', length: 120 }),
    __metadata("design:type", String)
], CityEntity.prototype, "countryName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country_code', type: 'varchar', length: 2 }),
    __metadata("design:type", String)
], CityEntity.prototype, "countryCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'state_name', type: 'varchar', length: 120 }),
    __metadata("design:type", String)
], CityEntity.prototype, "stateName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'state_code', type: 'varchar', length: 3, nullable: true }),
    __metadata("design:type", Object)
], CityEntity.prototype, "stateCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'city_name', type: 'varchar', length: 120 }),
    __metadata("design:type", String)
], CityEntity.prototype, "cityName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'currency_id', type: 'bigint' }),
    __metadata("design:type", Number)
], CityEntity.prototype, "currencyId", void 0);
exports.CityEntity = CityEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'cities', schema: 'transversal_schema' }),
    (0, typeorm_1.Index)(['countryCode', 'stateName', 'cityName'], { unique: true })
], CityEntity);


/***/ }),
/* 51 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BusinessSeniorityEntity = void 0;
const typeorm_1 = __webpack_require__(16);
const base_external_id_entity_1 = __webpack_require__(45);
let BusinessSeniorityEntity = class BusinessSeniorityEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    description;
    rangeStart;
    rangeEnd;
};
exports.BusinessSeniorityEntity = BusinessSeniorityEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'description', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], BusinessSeniorityEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'range_start', type: 'int' }),
    __metadata("design:type", Number)
], BusinessSeniorityEntity.prototype, "rangeStart", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'range_end', type: 'int' }),
    __metadata("design:type", Number)
], BusinessSeniorityEntity.prototype, "rangeEnd", void 0);
exports.BusinessSeniorityEntity = BusinessSeniorityEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'business_seniority', schema: 'suppliers_schema' })
], BusinessSeniorityEntity);


/***/ }),
/* 52 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SalesRepresentativeEntity = void 0;
const typeorm_1 = __webpack_require__(16);
const shared_1 = __webpack_require__(17);
const base_external_id_entity_1 = __webpack_require__(45);
const partners_entity_1 = __webpack_require__(44);
const transversal_data_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@app/transversal-data'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
let SalesRepresentativeEntity = class SalesRepresentativeEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    partner;
    partnerId;
    state;
    user;
    userId;
};
exports.SalesRepresentativeEntity = SalesRepresentativeEntity;
__decorate([
    (0, typeorm_1.ManyToOne)(() => partners_entity_1.PartnersEntity, (p) => p.salesRepresentatives, {
        nullable: false,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'partner_id', referencedColumnName: 'id' }),
    __metadata("design:type", typeof (_a = typeof partners_entity_1.PartnersEntity !== "undefined" && partners_entity_1.PartnersEntity) === "function" ? _a : Object)
], SalesRepresentativeEntity.prototype, "partner", void 0);
__decorate([
    (0, typeorm_1.RelationId)((sr) => sr.partner),
    __metadata("design:type", Number)
], SalesRepresentativeEntity.prototype, "partnerId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'state',
        type: 'enum',
        enum: shared_1.SalesRepresentativeRecordState,
        enumName: 'sales_representative_state',
        default: shared_1.SalesRepresentativeRecordState.ACTIVE,
    }),
    __metadata("design:type", typeof (_b = typeof shared_1.SalesRepresentativeRecordState !== "undefined" && shared_1.SalesRepresentativeRecordState) === "function" ? _b : Object)
], SalesRepresentativeEntity.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => transversal_data_1.UserEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id', referencedColumnName: 'id' }),
    __metadata("design:type", typeof (_c = typeof transversal_data_1.UserEntity !== "undefined" && transversal_data_1.UserEntity) === "function" ? _c : Object)
], SalesRepresentativeEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.RelationId)((sr) => sr.user),
    __metadata("design:type", Number)
], SalesRepresentativeEntity.prototype, "userId", void 0);
exports.SalesRepresentativeEntity = SalesRepresentativeEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'sales_representatives', schema: 'suppliers_schema' })
], SalesRepresentativeEntity);


/***/ }),
/* 53 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SupplierEntity = void 0;
const typeorm_1 = __webpack_require__(16);
const base_external_id_entity_1 = __webpack_require__(45);
const bank_account_entity_1 = __webpack_require__(48);
const business_entity_1 = __webpack_require__(46);
const partners_entity_1 = __webpack_require__(44);
const shared_1 = __webpack_require__(17);
let SupplierEntity = class SupplierEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    business;
    businessId;
    bankAccount;
    partner;
    state;
};
exports.SupplierEntity = SupplierEntity;
__decorate([
    (0, typeorm_1.OneToOne)(() => business_entity_1.BusinessEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'business_id', referencedColumnName: 'id' }),
    __metadata("design:type", typeof (_a = typeof business_entity_1.BusinessEntity !== "undefined" && business_entity_1.BusinessEntity) === "function" ? _a : Object)
], SupplierEntity.prototype, "business", void 0);
__decorate([
    (0, typeorm_1.RelationId)((s) => s.business),
    __metadata("design:type", Number)
], SupplierEntity.prototype, "businessId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => bank_account_entity_1.BankAccountEntity, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'bank_account_id' }),
    __metadata("design:type", Object)
], SupplierEntity.prototype, "bankAccount", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => partners_entity_1.PartnersEntity, (p) => p.supplier),
    __metadata("design:type", Object)
], SupplierEntity.prototype, "partner", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'state',
        type: 'enum',
        enum: shared_1.SupplierState,
        default: shared_1.SupplierState.ACTIVE,
    }),
    __metadata("design:type", typeof (_d = typeof shared_1.SupplierState !== "undefined" && shared_1.SupplierState) === "function" ? _d : Object)
], SupplierEntity.prototype, "state", void 0);
exports.SupplierEntity = SupplierEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'suppliers', schema: 'suppliers_schema' })
], SupplierEntity);


/***/ }),
/* 54 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContractTemplateEntity = void 0;
const typeorm_1 = __webpack_require__(16);
const shared_1 = __webpack_require__(17);
const base_external_id_entity_1 = __webpack_require__(41);
let ContractTemplateEntity = class ContractTemplateEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    templateFamilyKey;
    version;
    effectiveFrom;
    effectiveTo;
    zapsignTemplateRef;
    state;
};
exports.ContractTemplateEntity = ContractTemplateEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'template_family_key', type: 'varchar', length: 120 }),
    __metadata("design:type", String)
], ContractTemplateEntity.prototype, "templateFamilyKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'version', type: 'int' }),
    __metadata("design:type", Number)
], ContractTemplateEntity.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'effective_from', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], ContractTemplateEntity.prototype, "effectiveFrom", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'effective_to', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], ContractTemplateEntity.prototype, "effectiveTo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'zapsign_template_ref',
        type: 'varchar',
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", Object)
], ContractTemplateEntity.prototype, "zapsignTemplateRef", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'state',
        type: 'enum',
        enum: shared_1.ContractTemplateCatalogStatus,
        enumName: 'credit_facility_state',
        default: shared_1.ContractTemplateCatalogStatus.ACTIVE,
    }),
    __metadata("design:type", typeof (_c = typeof shared_1.ContractTemplateCatalogStatus !== "undefined" && shared_1.ContractTemplateCatalogStatus) === "function" ? _c : Object)
], ContractTemplateEntity.prototype, "state", void 0);
exports.ContractTemplateEntity = ContractTemplateEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'contract_templates', schema: 'products_schema' })
], ContractTemplateEntity);


/***/ }),
/* 55 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreditApplicationEntity = void 0;
const typeorm_1 = __webpack_require__(16);
const sales_representative_entity_1 = __webpack_require__(52);
const shared_1 = __webpack_require__(17);
const base_external_id_entity_1 = __webpack_require__(41);
const contract_entity_1 = __webpack_require__(43);
let CreditApplicationEntity = class CreditApplicationEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    personId;
    partnerId;
    partnerCategoryId;
    businessId;
    salesRepresentative;
    numberOfLocations;
    numberOfEmployees;
    businessSeniority;
    sectorExperience;
    businessFlagshipM2;
    businessHasRent;
    businessRentAmount;
    monthlyIncome;
    monthlyExpenses;
    monthlyPurchases;
    currentPurchases;
    totalAssets;
    requestedCreditLine;
    isCurrentClient;
    status;
    contract;
    submissionDate;
    approvalDate;
    rejectionReason;
    creditStudyDate;
    creditScore;
    creditDecision;
    approvedCreditLine;
    analystReport;
    riskProfile;
    privacyPolicyAccepted;
    privacyPolicyDate;
};
exports.CreditApplicationEntity = CreditApplicationEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'person_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationEntity.prototype, "personId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'partner_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationEntity.prototype, "partnerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'partner_category_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationEntity.prototype, "partnerCategoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'business_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationEntity.prototype, "businessId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sales_representative_entity_1.SalesRepresentativeEntity, { nullable: true }),
    (0, typeorm_1.JoinColumn)({
        name: 'sales_representative_id',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", Object)
], CreditApplicationEntity.prototype, "salesRepresentative", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'number_of_locations', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationEntity.prototype, "numberOfLocations", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'number_of_employees', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationEntity.prototype, "numberOfEmployees", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'business_seniority', type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationEntity.prototype, "businessSeniority", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sector_experience', type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationEntity.prototype, "sectorExperience", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'business_flagship_m2', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationEntity.prototype, "businessFlagshipM2", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'business_has_rent', type: 'boolean', nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationEntity.prototype, "businessHasRent", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'business_rent_amount', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationEntity.prototype, "businessRentAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'monthly_income', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationEntity.prototype, "monthlyIncome", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'monthly_expenses', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationEntity.prototype, "monthlyExpenses", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'monthly_purchases', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationEntity.prototype, "monthlyPurchases", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'current_purchases', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationEntity.prototype, "currentPurchases", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_assets', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationEntity.prototype, "totalAssets", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'requested_credit_line', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationEntity.prototype, "requestedCreditLine", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'is_current_client',
        type: 'boolean',
        default: false,
        nullable: false,
    }),
    __metadata("design:type", Boolean)
], CreditApplicationEntity.prototype, "isCurrentClient", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        type: 'enum',
        enum: shared_1.CreditApplicationStatus,
        enumName: 'credit_application_status',
        default: shared_1.CreditApplicationStatus.IN_PROGRESS,
    }),
    __metadata("design:type", typeof (_b = typeof shared_1.CreditApplicationStatus !== "undefined" && shared_1.CreditApplicationStatus) === "function" ? _b : Object)
], CreditApplicationEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => contract_entity_1.ContractEntity, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'contract_id', referencedColumnName: 'id' }),
    __metadata("design:type", Object)
], CreditApplicationEntity.prototype, "contract", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'submission_date', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationEntity.prototype, "submissionDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'approval_date', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationEntity.prototype, "approvalDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'rejection_reason',
        type: 'varchar',
        length: 500,
        nullable: true,
    }),
    __metadata("design:type", Object)
], CreditApplicationEntity.prototype, "rejectionReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'credit_study_date', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationEntity.prototype, "creditStudyDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'credit_score',
        type: 'decimal',
        precision: 8,
        scale: 2,
        nullable: true,
    }),
    __metadata("design:type", Object)
], CreditApplicationEntity.prototype, "creditScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'credit_decision', type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationEntity.prototype, "creditDecision", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'approved_credit_line', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationEntity.prototype, "approvedCreditLine", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'analyst_report', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationEntity.prototype, "analystReport", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'risk_profile', type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationEntity.prototype, "riskProfile", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'privacy_policy_accepted',
        type: 'boolean',
        default: false,
        nullable: false,
    }),
    __metadata("design:type", Boolean)
], CreditApplicationEntity.prototype, "privacyPolicyAccepted", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'privacy_policy_date', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationEntity.prototype, "privacyPolicyDate", void 0);
exports.CreditApplicationEntity = CreditApplicationEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'credit_applications', schema: 'products_schema' })
], CreditApplicationEntity);


/***/ }),
/* 56 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DocumentEntity = void 0;
const typeorm_1 = __webpack_require__(16);
const shared_1 = __webpack_require__(17);
const base_external_id_entity_1 = __webpack_require__(41);
const credit_application_entity_1 = __webpack_require__(55);
let DocumentEntity = class DocumentEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    documentType;
    documentUrl;
    verificationStatus;
    creditApplication;
    creditApplicationId;
};
exports.DocumentEntity = DocumentEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'document_type', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], DocumentEntity.prototype, "documentType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'document_url', type: 'text' }),
    __metadata("design:type", String)
], DocumentEntity.prototype, "documentUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'verification_status',
        type: 'enum',
        enum: shared_1.DocumentVerificationStatus,
        enumName: 'document_verification_status',
        nullable: true,
    }),
    __metadata("design:type", Object)
], DocumentEntity.prototype, "verificationStatus", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => credit_application_entity_1.CreditApplicationEntity, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'credit_application_id', referencedColumnName: 'id' }),
    __metadata("design:type", Object)
], DocumentEntity.prototype, "creditApplication", void 0);
__decorate([
    (0, typeorm_1.RelationId)((d) => d.creditApplication),
    __metadata("design:type", Object)
], DocumentEntity.prototype, "creditApplicationId", void 0);
exports.DocumentEntity = DocumentEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'documents', schema: 'products_schema' })
], DocumentEntity);


/***/ }),
/* 57 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductsDataModule = exports.PRODUCTS_MS_TYPEORM_ENTITIES = exports.PRODUCTS_DATA_ENTITIES = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(12);
const suppliers_data_module_1 = __webpack_require__(58);
const suppliers_data_entities_1 = __webpack_require__(60);
const person_entity_1 = __webpack_require__(47);
const products_data_service_1 = __webpack_require__(65);
const products_data_entities_1 = __webpack_require__(14);
var products_data_entities_2 = __webpack_require__(14);
Object.defineProperty(exports, "PRODUCTS_DATA_ENTITIES", ({ enumerable: true, get: function () { return products_data_entities_2.PRODUCTS_DATA_ENTITIES; } }));
exports.PRODUCTS_MS_TYPEORM_ENTITIES = [
    person_entity_1.PersonEntity,
    ...suppliers_data_entities_1.SUPPLIERS_DATA_ENTITIES,
    ...products_data_entities_1.PRODUCTS_DATA_ENTITIES,
];
let ProductsDataModule = class ProductsDataModule {
};
exports.ProductsDataModule = ProductsDataModule;
exports.ProductsDataModule = ProductsDataModule = __decorate([
    (0, common_1.Module)({
        imports: [suppliers_data_module_1.SuppliersDataModule, typeorm_1.TypeOrmModule.forFeature([...products_data_entities_1.PRODUCTS_DATA_ENTITIES])],
        providers: [products_data_service_1.ProductsDataService],
        exports: [suppliers_data_module_1.SuppliersDataModule, typeorm_1.TypeOrmModule, products_data_service_1.ProductsDataService],
    })
], ProductsDataModule);


/***/ }),
/* 58 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SuppliersDataModule = exports.SUPPLIERS_DATA_ENTITIES = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(12);
const suppliers_data_service_1 = __webpack_require__(59);
const suppliers_data_entities_1 = __webpack_require__(60);
var suppliers_data_entities_2 = __webpack_require__(60);
Object.defineProperty(exports, "SUPPLIERS_DATA_ENTITIES", ({ enumerable: true, get: function () { return suppliers_data_entities_2.SUPPLIERS_DATA_ENTITIES; } }));
let SuppliersDataModule = class SuppliersDataModule {
};
exports.SuppliersDataModule = SuppliersDataModule;
exports.SuppliersDataModule = SuppliersDataModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([...suppliers_data_entities_1.SUPPLIERS_DATA_ENTITIES])],
        providers: [suppliers_data_service_1.SuppliersDataService],
        exports: [typeorm_1.TypeOrmModule, suppliers_data_service_1.SuppliersDataService],
    })
], SuppliersDataModule);


/***/ }),
/* 59 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SuppliersDataService = void 0;
const common_1 = __webpack_require__(6);
let SuppliersDataService = class SuppliersDataService {
};
exports.SuppliersDataService = SuppliersDataService;
exports.SuppliersDataService = SuppliersDataService = __decorate([
    (0, common_1.Injectable)()
], SuppliersDataService);


/***/ }),
/* 60 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SUPPLIERS_DATA_ENTITIES = void 0;
const bank_account_entity_1 = __webpack_require__(48);
const business_entity_1 = __webpack_require__(46);
const business_seniority_entity_1 = __webpack_require__(51);
const legal_representative_entity_1 = __webpack_require__(61);
const partners_entity_1 = __webpack_require__(44);
const order_entity_1 = __webpack_require__(62);
const sales_representative_entity_1 = __webpack_require__(52);
const shareholder_entity_1 = __webpack_require__(63);
const supplier_entity_1 = __webpack_require__(53);
const partner_onboarding_saga_entity_1 = __webpack_require__(64);
exports.SUPPLIERS_DATA_ENTITIES = [
    bank_account_entity_1.BankAccountEntity,
    business_entity_1.BusinessEntity,
    business_seniority_entity_1.BusinessSeniorityEntity,
    legal_representative_entity_1.LegalRepresentativeEntity,
    partners_entity_1.PartnersEntity,
    partner_onboarding_saga_entity_1.PartnerOnboardingSagaEntity,
    order_entity_1.PurchaseOrderEntity,
    sales_representative_entity_1.SalesRepresentativeEntity,
    shareholder_entity_1.ShareholderEntity,
    supplier_entity_1.SupplierEntity,
];


/***/ }),
/* 61 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LegalRepresentativeEntity = void 0;
const typeorm_1 = __webpack_require__(16);
const person_entity_1 = __webpack_require__(47);
const base_external_id_entity_1 = __webpack_require__(45);
const business_entity_1 = __webpack_require__(46);
let LegalRepresentativeEntity = class LegalRepresentativeEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    business;
    businessId;
    person;
    personId;
    isPrimary;
};
exports.LegalRepresentativeEntity = LegalRepresentativeEntity;
__decorate([
    (0, typeorm_1.ManyToOne)(() => business_entity_1.BusinessEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'business_id', referencedColumnName: 'id' }),
    __metadata("design:type", typeof (_a = typeof business_entity_1.BusinessEntity !== "undefined" && business_entity_1.BusinessEntity) === "function" ? _a : Object)
], LegalRepresentativeEntity.prototype, "business", void 0);
__decorate([
    (0, typeorm_1.RelationId)((lr) => lr.business),
    __metadata("design:type", Number)
], LegalRepresentativeEntity.prototype, "businessId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => person_entity_1.PersonEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'person_id', referencedColumnName: 'id' }),
    __metadata("design:type", typeof (_b = typeof person_entity_1.PersonEntity !== "undefined" && person_entity_1.PersonEntity) === "function" ? _b : Object)
], LegalRepresentativeEntity.prototype, "person", void 0);
__decorate([
    (0, typeorm_1.RelationId)((lr) => lr.person),
    __metadata("design:type", Number)
], LegalRepresentativeEntity.prototype, "personId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_primary', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], LegalRepresentativeEntity.prototype, "isPrimary", void 0);
exports.LegalRepresentativeEntity = LegalRepresentativeEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'legal_representatives', schema: 'suppliers_schema' }),
    (0, typeorm_1.Index)('IDX_legal_representatives_business_id', ['business']),
    (0, typeorm_1.Index)('IDX_legal_representatives_person_id', ['person'])
], LegalRepresentativeEntity);


/***/ }),
/* 62 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PurchaseOrderEntity = void 0;
const typeorm_1 = __webpack_require__(16);
const base_external_id_entity_1 = __webpack_require__(45);
let PurchaseOrderEntity = class PurchaseOrderEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    userId;
    supplierId;
    amount;
    documentUrl;
};
exports.PurchaseOrderEntity = PurchaseOrderEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], PurchaseOrderEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'supplier_id', type: 'bigint' }),
    __metadata("design:type", Number)
], PurchaseOrderEntity.prototype, "supplierId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'amount',
        type: 'decimal',
        precision: 18,
        scale: 2,
    }),
    __metadata("design:type", String)
], PurchaseOrderEntity.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'document_url', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], PurchaseOrderEntity.prototype, "documentUrl", void 0);
exports.PurchaseOrderEntity = PurchaseOrderEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'purchase_orders', schema: 'suppliers_schema' })
], PurchaseOrderEntity);


/***/ }),
/* 63 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ShareholderEntity = void 0;
const typeorm_1 = __webpack_require__(16);
const person_entity_1 = __webpack_require__(47);
const base_external_id_entity_1 = __webpack_require__(45);
const business_entity_1 = __webpack_require__(46);
let ShareholderEntity = class ShareholderEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    businessId;
    person;
    personId;
    shareholder_business;
    shareholder_business_id;
    ownershipPercentage;
    evaluationOrder;
    creditCheckRequired;
    creditCheckCompleted;
    created_at;
    updated_at;
};
exports.ShareholderEntity = ShareholderEntity;
__decorate([
    (0, typeorm_1.ManyToOne)(() => business_entity_1.BusinessEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'business_id', referencedColumnName: 'id' }),
    __metadata("design:type", typeof (_a = typeof business_entity_1.BusinessEntity !== "undefined" && business_entity_1.BusinessEntity) === "function" ? _a : Object)
], ShareholderEntity.prototype, "businessId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => person_entity_1.PersonEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'person_id', referencedColumnName: 'id' }),
    __metadata("design:type", typeof (_b = typeof person_entity_1.PersonEntity !== "undefined" && person_entity_1.PersonEntity) === "function" ? _b : Object)
], ShareholderEntity.prototype, "person", void 0);
__decorate([
    (0, typeorm_1.RelationId)((s) => s.person),
    __metadata("design:type", Number)
], ShareholderEntity.prototype, "personId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => business_entity_1.BusinessEntity, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'shareholder_business_id', referencedColumnName: 'id' }),
    __metadata("design:type", Object)
], ShareholderEntity.prototype, "shareholder_business", void 0);
__decorate([
    (0, typeorm_1.RelationId)((s) => s.shareholder_business),
    __metadata("design:type", Object)
], ShareholderEntity.prototype, "shareholder_business_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'ownership_percentage',
        type: 'decimal',
        precision: 5,
        scale: 4,
        nullable: true,
    }),
    __metadata("design:type", Object)
], ShareholderEntity.prototype, "ownershipPercentage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'evaluation_order', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], ShareholderEntity.prototype, "evaluationOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'credit_check_required',
        type: 'boolean',
        default: false,
        nullable: false,
    }),
    __metadata("design:type", Boolean)
], ShareholderEntity.prototype, "creditCheckRequired", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'credit_check_completed',
        type: 'boolean',
        default: false,
        nullable: false,
    }),
    __metadata("design:type", Boolean)
], ShareholderEntity.prototype, "creditCheckCompleted", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'created_at',
        type: 'timestamptz',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], ShareholderEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'updated_at',
        type: 'timestamptz',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], ShareholderEntity.prototype, "updated_at", void 0);
exports.ShareholderEntity = ShareholderEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'shareholders', schema: 'suppliers_schema' })
], ShareholderEntity);


/***/ }),
/* 64 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PartnerOnboardingSagaEntity = void 0;
const typeorm_1 = __webpack_require__(16);
const shared_1 = __webpack_require__(17);
let PartnerOnboardingSagaEntity = class PartnerOnboardingSagaEntity {
    id;
    externalId;
    correlationId;
    status;
    currentStep;
    creditFacilityExternalId;
    userExternalId;
    personExternalId;
    businessExternalId;
    bankAccountExternalId;
    partnerExternalId;
    errorMessage;
    createdAt;
    updatedAt;
};
exports.PartnerOnboardingSagaEntity = PartnerOnboardingSagaEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", String)
], PartnerOnboardingSagaEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'external_id', type: 'uuid', unique: true }),
    __metadata("design:type", String)
], PartnerOnboardingSagaEntity.prototype, "externalId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'correlation_id', type: 'uuid' }),
    __metadata("design:type", String)
], PartnerOnboardingSagaEntity.prototype, "correlationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 32 }),
    __metadata("design:type", typeof (_a = typeof shared_1.PartnerOnboardingSagaStatus !== "undefined" && shared_1.PartnerOnboardingSagaStatus) === "function" ? _a : Object)
], PartnerOnboardingSagaEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'current_step', type: 'smallint', default: 0 }),
    __metadata("design:type", Number)
], PartnerOnboardingSagaEntity.prototype, "currentStep", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'credit_facility_external_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], PartnerOnboardingSagaEntity.prototype, "creditFacilityExternalId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_external_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], PartnerOnboardingSagaEntity.prototype, "userExternalId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'person_external_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], PartnerOnboardingSagaEntity.prototype, "personExternalId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'business_external_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], PartnerOnboardingSagaEntity.prototype, "businessExternalId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bank_account_external_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], PartnerOnboardingSagaEntity.prototype, "bankAccountExternalId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'partner_external_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], PartnerOnboardingSagaEntity.prototype, "partnerExternalId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'error_message', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], PartnerOnboardingSagaEntity.prototype, "errorMessage", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], PartnerOnboardingSagaEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], PartnerOnboardingSagaEntity.prototype, "updatedAt", void 0);
exports.PartnerOnboardingSagaEntity = PartnerOnboardingSagaEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'partner_onboarding_sagas', schema: 'suppliers_schema' })
], PartnerOnboardingSagaEntity);


/***/ }),
/* 65 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductsDataService = void 0;
const common_1 = __webpack_require__(6);
let ProductsDataService = class ProductsDataService {
};
exports.ProductsDataService = ProductsDataService;
exports.ProductsDataService = ProductsDataService = __decorate([
    (0, common_1.Injectable)()
], ProductsDataService);


/***/ }),
/* 66 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PostgresTypeOrmConfigService = void 0;
const common_1 = __webpack_require__(6);
const typeorm_config_1 = __importDefault(__webpack_require__(67));
let PostgresTypeOrmConfigService = class PostgresTypeOrmConfigService {
    createTypeOrmOptions() {
        return typeorm_config_1.default;
    }
};
exports.PostgresTypeOrmConfigService = PostgresTypeOrmConfigService;
exports.PostgresTypeOrmConfigService = PostgresTypeOrmConfigService = __decorate([
    (0, common_1.Injectable)()
], PostgresTypeOrmConfigService);


/***/ }),
/* 67 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(2);
const products_data_1 = __webpack_require__(13);
const TypeormConfig = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USERNAME,
    port: Number(process.env.TYPEORM_PORT ?? 5432),
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    entities: [products_data_1.ContractEntity],
    synchronize: false,
    migrationsRun: false,
    migrationsTableName: 'typeorm_migrations',
};
exports["default"] = TypeormConfig;


/***/ }),
/* 68 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TypeormContractRepository = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(12);
const typeorm_2 = __webpack_require__(16);
const products_data_1 = __webpack_require__(13);
const contract_mapper_1 = __webpack_require__(69);
const CONTRACT_SELECT = {
    id: true,
    externalId: true,
    userId: true,
    contractTemplateId: true,
    zapsignToken: true,
    state: true,
    originalFileUrl: true,
    signedFileUrl: true,
    formAnswersJson: true,
    createdAt: true,
    updatedAt: true,
};
let TypeormContractRepository = class TypeormContractRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async sync_credit_application_contract_link(contract_internal_id, credit_application_internal_id) {
        await this.repo.query(`UPDATE products_schema.credit_applications
       SET contract_id = NULL
       WHERE contract_id = $1`, [contract_internal_id]);
        if (credit_application_internal_id !== null) {
            await this.repo.query(`UPDATE products_schema.credit_applications
         SET contract_id = $1
         WHERE id = $2`, [contract_internal_id, credit_application_internal_id]);
        }
    }
    async find_by_id(internal_id) {
        const row = await this.repo.findOne({
            where: { id: internal_id },
            select: CONTRACT_SELECT,
        });
        return row ? contract_mapper_1.ContractMapper.to_domain(row) : null;
    }
    async find_by_external_id(external_id) {
        const row = await this.repo.findOne({
            where: { externalId: external_id },
            select: CONTRACT_SELECT,
        });
        return row ? contract_mapper_1.ContractMapper.to_domain(row) : null;
    }
    async find_by_zapsign_token(zapsign_token) {
        const row = await this.repo.findOne({
            where: { zapsignToken: zapsign_token },
            select: CONTRACT_SELECT,
        });
        return row ? contract_mapper_1.ContractMapper.to_domain(row) : null;
    }
    async find_page(filters, offset, limit) {
        const qb = this.repo.createQueryBuilder('contract');
        if (filters.user_id !== undefined) {
            qb.andWhere('contract.userId = :uid', { uid: filters.user_id });
        }
        if (filters.credit_application_internal_id !== undefined) {
            qb.andWhere(`contract.id IN (
          SELECT ca.contract_id FROM products_schema.credit_applications ca
          WHERE ca.id = :app_id AND ca.contract_id IS NOT NULL
        )`, { app_id: filters.credit_application_internal_id });
        }
        if (filters.status !== undefined) {
            qb.andWhere('contract.state = :st', { st: filters.status });
        }
        qb.orderBy('contract.id', 'ASC').skip(offset).take(limit);
        const [rows, total] = await qb.getManyAndCount();
        return { items: rows.map((r) => contract_mapper_1.ContractMapper.to_domain(r)), total };
    }
    async create(props) {
        const rows = await this.repo.query(`INSERT INTO products_schema.contracts (
        external_id, user_id, contract_template_id, zapsign_token, state,
        original_file_url, signed_file_url, form_answers_json
      ) VALUES (
        COALESCE($1::uuid, gen_random_uuid()), $2, $3, $4, $5::products_schema.contract_catalog_status, $6, $7, $8::jsonb
      )
      RETURNING id, external_id, created_at, updated_at, user_id,
        contract_template_id, zapsign_token, state, original_file_url, signed_file_url, form_answers_json`, [
            props.external_id ?? null,
            props.user_id,
            props.contract_template_id,
            props.zapsign_token,
            props.status,
            props.original_file_url,
            props.signed_file_url,
            props.form_answers_json === null || props.form_answers_json === undefined
                ? null
                : JSON.stringify(props.form_answers_json),
        ]);
        const created = contract_mapper_1.ContractMapper.from_raw_row(rows[0]);
        await this.sync_credit_application_contract_link(created.internal_id, props.credit_application_internal_id);
        return created;
    }
    async update_by_external_id(external_id, patch) {
        const existing = await this.repo.findOne({
            where: { externalId: external_id },
            select: { id: true },
        });
        if (!existing) {
            return null;
        }
        const columns = [];
        const values = [];
        let i = 1;
        const add = (col, val) => {
            columns.push(`"${col}" = $${i}`);
            values.push(val);
            i += 1;
        };
        if (patch.contract_template_id !== undefined) {
            add('contract_template_id', patch.contract_template_id);
        }
        if (patch.zapsign_token !== undefined) {
            add('zapsign_token', patch.zapsign_token);
        }
        if (patch.status !== undefined) {
            columns.push(`"state" = $${i}::products_schema.contract_catalog_status`);
            values.push(patch.status);
            i += 1;
        }
        if (patch.original_file_url !== undefined) {
            add('original_file_url', patch.original_file_url);
        }
        if (patch.signed_file_url !== undefined) {
            add('signed_file_url', patch.signed_file_url);
        }
        if (patch.form_answers_json !== undefined) {
            columns.push(`"form_answers_json" = $${i}::jsonb`);
            values.push(patch.form_answers_json === null
                ? null
                : JSON.stringify(patch.form_answers_json));
            i += 1;
        }
        if (columns.length > 0) {
            columns.push(`"updated_at" = now()`);
            values.push(existing.id);
            await this.repo.query(`UPDATE products_schema.contracts SET ${columns.join(', ')} WHERE id = $${i}`, values);
        }
        if (patch.credit_application_internal_id !== undefined) {
            await this.sync_credit_application_contract_link(existing.id, patch.credit_application_internal_id);
        }
        return this.find_by_external_id(external_id);
    }
    async delete_by_external_id(external_id) {
        const result = await this.repo.delete({ externalId: external_id });
        return (result.affected ?? 0) > 0;
    }
};
exports.TypeormContractRepository = TypeormContractRepository;
exports.TypeormContractRepository = TypeormContractRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(products_data_1.ContractEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], TypeormContractRepository);


/***/ }),
/* 69 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContractMapper = void 0;
const contract_models_1 = __webpack_require__(70);
function parse_contract_state(value) {
    if (value === 'pending' || value === 'signed' || value === 'cancelled') {
        return value;
    }
    return 'pending';
}
class ContractMapper {
    static to_domain(row) {
        return new contract_models_1.Contract(row.id, row.externalId, row.userId ?? null, row.contractTemplateId ?? null, row.zapsignToken ?? null, row.state, row.originalFileUrl ?? null, row.signedFileUrl ?? null, row.formAnswersJson ?? null, row.createdAt, row.updatedAt);
    }
    static from_raw_row(row) {
        const form_json = row['form_answers_json'];
        return new contract_models_1.Contract(Number(row['id']), String(row['external_id']), row['user_id'] === null || row['user_id'] === undefined
            ? null
            : Number(row['user_id']), row['contract_template_id'] === null || row['contract_template_id'] === undefined
            ? null
            : Number(row['contract_template_id']), row['zapsign_token'] === null || row['zapsign_token'] === undefined
            ? null
            : String(row['zapsign_token']), parse_contract_state(row['state']), row['original_file_url'] === null || row['original_file_url'] === undefined
            ? null
            : String(row['original_file_url']), row['signed_file_url'] === null || row['signed_file_url'] === undefined
            ? null
            : String(row['signed_file_url']), form_json !== null &&
            form_json !== undefined &&
            typeof form_json === 'object' &&
            !Array.isArray(form_json)
            ? form_json
            : null, new Date(String(row['created_at'])), new Date(String(row['updated_at'])));
    }
}
exports.ContractMapper = ContractMapper;


/***/ }),
/* 70 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Contract = void 0;
class Contract {
    internal_id;
    external_id;
    user_id;
    contract_template_id;
    zapsign_token;
    status;
    original_file_url;
    signed_file_url;
    form_answers_json;
    created_at;
    updated_at;
    constructor(internal_id, external_id, user_id, contract_template_id, zapsign_token, status, original_file_url, signed_file_url, form_answers_json, created_at, updated_at) {
        this.internal_id = internal_id;
        this.external_id = external_id;
        this.user_id = user_id;
        this.contract_template_id = contract_template_id;
        this.zapsign_token = zapsign_token;
        this.status = status;
        this.original_file_url = original_file_url;
        this.signed_file_url = signed_file_url;
        this.form_answers_json = form_answers_json;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
exports.Contract = Contract;


/***/ }),
/* 71 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TypeormContractReferenceLookupAdapter = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(12);
const typeorm_2 = __webpack_require__(16);
function row_id_as_number(value) {
    if (value === null || value === undefined) {
        return null;
    }
    if (typeof value === 'number' && Number.isFinite(value)) {
        return value;
    }
    if (typeof value === 'string' && value.length > 0) {
        const n = Number(value);
        return Number.isFinite(n) ? n : null;
    }
    return null;
}
const CONTRACT_CATALOG_STATUSES = new Set([
    'pending',
    'signed',
    'cancelled',
]);
function as_contract_catalog_status(code) {
    if (code === null || code === undefined || code.length === 0) {
        return null;
    }
    if (!CONTRACT_CATALOG_STATUSES.has(code)) {
        return null;
    }
    return code;
}
let TypeormContractReferenceLookupAdapter = class TypeormContractReferenceLookupAdapter {
    data_source;
    constructor(data_source) {
        this.data_source = data_source;
    }
    async get_user_internal_id_by_external_id(external_id) {
        const rows = await this.data_source.query(`SELECT id FROM transversal_schema.users WHERE external_id = $1::uuid LIMIT 1`, [external_id]);
        return rows.length === 0 ? null : row_id_as_number(rows[0].id);
    }
    async get_application_internal_id_by_external_id(external_id) {
        const rows = await this.data_source.query(`SELECT id FROM products_schema.credit_applications WHERE external_id = $1::uuid LIMIT 1`, [external_id]);
        return rows.length === 0 ? null : row_id_as_number(rows[0].id);
    }
    async get_contract_catalog_status_by_external_id(external_id) {
        const rows = await this.data_source.query(`SELECT code
       FROM transversal_schema.catalog_status_types
       WHERE external_id = $1::uuid AND entity_type = 'contracts'
       LIMIT 1`, [external_id]);
        if (rows.length === 0) {
            return null;
        }
        return as_contract_catalog_status(rows[0].code);
    }
    async get_contract_status_external_id_by_catalog_status(status) {
        const rows = await this.data_source.query(`SELECT external_id::text AS external_id
       FROM transversal_schema.catalog_status_types
       WHERE entity_type = 'contracts' AND code = $1
       LIMIT 1`, [status]);
        const v = rows[0]?.external_id;
        return v === undefined || v === null || v.length === 0 ? null : v;
    }
    async get_contract_template_internal_id_by_external_id(external_id) {
        const rows = await this.data_source.query(`SELECT id FROM products_schema.contract_templates
       WHERE external_id = $1::uuid
       LIMIT 1`, [external_id]);
        return rows.length === 0 ? null : row_id_as_number(rows[0].id);
    }
    async get_default_contract_template_internal_id() {
        const rows = await this.data_source.query(`SELECT id
       FROM products_schema.contract_templates
       WHERE version = 1
       ORDER BY id ASC
       LIMIT 1`);
        return rows.length === 0 ? null : row_id_as_number(rows[0].id);
    }
    async get_contract_template_external_id_by_internal_id(internal_id) {
        const rows = await this.data_source.query(`SELECT external_id::text AS external_id
       FROM products_schema.contract_templates
       WHERE id = $1
       LIMIT 1`, [internal_id]);
        const v = rows[0]?.external_id;
        return v === undefined || v === null || v.length === 0 ? null : v;
    }
    async get_zapsign_template_ref_by_internal_id(template_internal_id) {
        const rows = await this.data_source.query(`SELECT zapsign_template_ref
       FROM products_schema.contract_templates
       WHERE id = $1
       LIMIT 1`, [template_internal_id]);
        const ref = rows[0]?.zapsign_template_ref;
        if (ref === undefined || ref === null || String(ref).trim().length === 0) {
            return null;
        }
        return String(ref).trim();
    }
};
exports.TypeormContractReferenceLookupAdapter = TypeormContractReferenceLookupAdapter;
exports.TypeormContractReferenceLookupAdapter = TypeormContractReferenceLookupAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _a : Object])
], TypeormContractReferenceLookupAdapter);


/***/ }),
/* 72 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CONTRACT_REPOSITORY = void 0;
exports.CONTRACT_REPOSITORY = Symbol('CONTRACT_REPOSITORY');


/***/ }),
/* 73 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CONTRACT_REFERENCE_LOOKUP = void 0;
exports.CONTRACT_REFERENCE_LOOKUP = Symbol('CONTRACT_REFERENCE_LOOKUP');


/***/ }),
/* 74 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SqsModule = void 0;
const common_1 = __webpack_require__(6);
const config_1 = __webpack_require__(8);
const shared_1 = __webpack_require__(17);
const contracts_create_inbound_sqs_consumer_1 = __webpack_require__(75);
const contracts_get_inbound_sqs_consumer_1 = __webpack_require__(81);
const messaging_application_module_1 = __webpack_require__(85);
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
                    contracts_create_inbound_queue_url: config_service.get('sqs.create_contract_queue_url'),
                    contracts_get_inbound_queue_url: config_service.get('sqs.get_contract_queue_url'),
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
            contracts_create_inbound_sqs_consumer_1.ContractsCreateInboundSqsConsumer,
            contracts_get_inbound_sqs_consumer_1.ContractsGetInboundSqsConsumer,
        ],
        exports: [shared_1.SQS_CLIENT, shared_1.QUEUES_CONFIG],
    })
], SqsModule);


/***/ }),
/* 75 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var ContractsCreateInboundSqsConsumer_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContractsCreateInboundSqsConsumer = void 0;
const common_1 = __webpack_require__(6);
const config_1 = __webpack_require__(8);
const ingest_contracts_create_sqs_message_use_case_1 = __webpack_require__(76);
const shared_1 = __webpack_require__(17);
let ContractsCreateInboundSqsConsumer = ContractsCreateInboundSqsConsumer_1 = class ContractsCreateInboundSqsConsumer extends shared_1.BaseConsumer {
    queues_config;
    config_service;
    ingest;
    nest_logger = new common_1.Logger(ContractsCreateInboundSqsConsumer_1.name);
    constructor(sqs_client, queues_config, config_service, ingest) {
        super(sqs_client, {
            log: (m) => this.nest_logger.log(m),
            warn: (m) => this.nest_logger.warn(m),
            error: (m) => this.nest_logger.error(m),
        });
        this.queues_config = queues_config;
        this.config_service = config_service;
        this.ingest = ingest;
    }
    onModuleInit() {
        this.start();
    }
    onModuleDestroy() {
        this.stop();
    }
    resolve_queue_url() {
        return this.queues_config.contracts_create_inbound_queue_url;
    }
    get_poll_settings() {
        return {
            wait_time_seconds: this.config_service.getOrThrow('sqs.wait_time_seconds'),
            max_number_of_messages: this.config_service.getOrThrow('sqs.max_number_of_messages'),
            visibility_timeout_seconds: this.config_service.getOrThrow('sqs.visibility_timeout_seconds'),
        };
    }
    inactive_reason_message() {
        return 'Cola create-contract SQS no configurada (CONTRACTS_SQS_CREATE_CONTRACT_QUEUE_URL); worker inactivo.';
    }
    async handle(message) {
        const delete_on_validation_error = this.config_service.get('sqs.delete_on_validation_error') ?? false;
        return this.ingest.execute({
            body: message.body,
            delete_on_validation_error,
        });
    }
};
exports.ContractsCreateInboundSqsConsumer = ContractsCreateInboundSqsConsumer;
exports.ContractsCreateInboundSqsConsumer = ContractsCreateInboundSqsConsumer = ContractsCreateInboundSqsConsumer_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(shared_1.SQS_CLIENT)),
    __param(1, (0, common_1.Inject)(shared_1.QUEUES_CONFIG)),
    __metadata("design:paramtypes", [Object, Object, typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof ingest_contracts_create_sqs_message_use_case_1.IngestContractsCreateSqsMessageUseCase !== "undefined" && ingest_contracts_create_sqs_message_use_case_1.IngestContractsCreateSqsMessageUseCase) === "function" ? _b : Object])
], ContractsCreateInboundSqsConsumer);


/***/ }),
/* 76 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var IngestContractsCreateSqsMessageUseCase_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IngestContractsCreateSqsMessageUseCase = void 0;
const common_1 = __webpack_require__(6);
const class_transformer_1 = __webpack_require__(38);
const class_validator_1 = __webpack_require__(39);
const contracts_sqs_create_payload_dto_1 = __webpack_require__(77);
const create_contract_use_case_1 = __webpack_require__(78);
let IngestContractsCreateSqsMessageUseCase = IngestContractsCreateSqsMessageUseCase_1 = class IngestContractsCreateSqsMessageUseCase {
    create_contract;
    logger = new common_1.Logger(IngestContractsCreateSqsMessageUseCase_1.name);
    constructor(create_contract) {
        this.create_contract = create_contract;
    }
    async execute(cmd) {
        let parsed;
        try {
            parsed = JSON.parse(cmd.body);
        }
        catch {
            this.logger.warn('Cuerpo de mensaje create-contract no es JSON válido; se dejará para reintento.');
            return cmd.delete_on_validation_error;
        }
        const dto = (0, class_transformer_1.plainToInstance)(contracts_sqs_create_payload_dto_1.ContractsSqsCreatePayloadDto, parsed, {
            enableImplicitConversion: true,
        });
        const errors = (0, class_validator_1.validateSync)(dto, { forbidUnknownValues: false });
        if (errors.length > 0) {
            const message = errors
                .map((e) => Object.values(e.constraints ?? {}).join(', '))
                .join('; ');
            this.logger.warn(`Mensaje create-contract inválido: ${message}`);
            return cmd.delete_on_validation_error;
        }
        try {
            await this.create_contract.execute({
                external_id: dto.external_id,
                user_external_id: dto.user_external_id,
                application_external_id: dto.application_external_id,
                contract_template_external_id: dto.contract_template_external_id,
                status_external_id: dto.status_external_id,
                zapsign_token: dto.zapsign_token,
                original_file_url: dto.original_file_url,
                signed_file_url: dto.signed_file_url,
                form_answers_json: dto.form_answers_json,
            });
            if (dto.correlation_id !== undefined) {
                this.logger.log(`create-contract procesado; correlation_id=${dto.correlation_id}`);
            }
            return true;
        }
        catch (err) {
            const text = err instanceof Error ? err.message : String(err);
            this.logger.error(`Error al procesar create-contract: ${text}`);
            return false;
        }
    }
};
exports.IngestContractsCreateSqsMessageUseCase = IngestContractsCreateSqsMessageUseCase;
exports.IngestContractsCreateSqsMessageUseCase = IngestContractsCreateSqsMessageUseCase = IngestContractsCreateSqsMessageUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof create_contract_use_case_1.CreateContractUseCase !== "undefined" && create_contract_use_case_1.CreateContractUseCase) === "function" ? _a : Object])
], IngestContractsCreateSqsMessageUseCase);


/***/ }),
/* 77 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContractsSqsCreatePayloadDto = void 0;
const class_validator_1 = __webpack_require__(39);
class ContractsSqsCreatePayloadDto {
    correlation_id;
    external_id;
    user_external_id;
    application_external_id;
    contract_template_external_id;
    status_external_id;
    zapsign_token;
    original_file_url;
    signed_file_url;
    form_answers_json;
}
exports.ContractsSqsCreatePayloadDto = ContractsSqsCreatePayloadDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", String)
], ContractsSqsCreatePayloadDto.prototype, "correlation_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", String)
], ContractsSqsCreatePayloadDto.prototype, "external_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", String)
], ContractsSqsCreatePayloadDto.prototype, "user_external_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", String)
], ContractsSqsCreatePayloadDto.prototype, "application_external_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", String)
], ContractsSqsCreatePayloadDto.prototype, "contract_template_external_id", void 0);
__decorate([
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", String)
], ContractsSqsCreatePayloadDto.prototype, "status_external_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((_, v) => v !== null && v !== undefined),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(2048),
    __metadata("design:type", Object)
], ContractsSqsCreatePayloadDto.prototype, "zapsign_token", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((_, v) => v !== null && v !== undefined),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], ContractsSqsCreatePayloadDto.prototype, "original_file_url", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((_, v) => v !== null && v !== undefined),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], ContractsSqsCreatePayloadDto.prototype, "signed_file_url", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], ContractsSqsCreatePayloadDto.prototype, "form_answers_json", void 0);


/***/ }),
/* 78 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateContractUseCase = void 0;
const common_1 = __webpack_require__(6);
const contract_reference_lookup_port_1 = __webpack_require__(73);
const contracts_tokens_1 = __webpack_require__(72);
const contract_public_fields_builder_1 = __webpack_require__(79);
let CreateContractUseCase = class CreateContractUseCase {
    contract_repository;
    lookup;
    constructor(contract_repository, lookup) {
        this.contract_repository = contract_repository;
        this.lookup = lookup;
    }
    async execute(command) {
        let user_id = null;
        const user_ext = command.user_external_id;
        if (user_ext !== undefined && user_ext !== null && String(user_ext).trim().length > 0) {
            const resolved = await this.lookup.get_user_internal_id_by_external_id(user_ext);
            if (resolved === null) {
                throw new common_1.NotFoundException('user not found');
            }
            user_id = resolved;
        }
        let credit_application_internal_id = null;
        if (command.application_external_id !== undefined) {
            const app_id = await this.lookup.get_application_internal_id_by_external_id(command.application_external_id);
            if (app_id === null) {
                throw new common_1.NotFoundException('application not found');
            }
            credit_application_internal_id = app_id;
        }
        const status = await this.lookup.get_contract_catalog_status_by_external_id(command.status_external_id);
        if (status === null) {
            throw new common_1.NotFoundException('status not found');
        }
        let contract_template_id = null;
        if (command.contract_template_external_id !== undefined) {
            const tid = await this.lookup.get_contract_template_internal_id_by_external_id(command.contract_template_external_id);
            if (tid === null) {
                throw new common_1.NotFoundException('contract template not found');
            }
            contract_template_id = tid;
        }
        else {
            const defaulted = await this.lookup.get_default_contract_template_internal_id();
            if (defaulted === null) {
                throw new common_1.NotFoundException('default contract template not configured');
            }
            contract_template_id = defaulted;
        }
        const created = await this.contract_repository.create({
            external_id: command.external_id,
            user_id,
            contract_template_id,
            zapsign_token: command.zapsign_token ?? null,
            status,
            original_file_url: command.original_file_url ?? null,
            signed_file_url: command.signed_file_url ?? null,
            form_answers_json: command.form_answers_json ?? null,
            credit_application_internal_id,
        });
        return (0, contract_public_fields_builder_1.build_contract_public_response)(created, this.lookup);
    }
};
exports.CreateContractUseCase = CreateContractUseCase;
exports.CreateContractUseCase = CreateContractUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(contracts_tokens_1.CONTRACT_REPOSITORY)),
    __param(1, (0, common_1.Inject)(contract_reference_lookup_port_1.CONTRACT_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [Object, Object])
], CreateContractUseCase);


/***/ }),
/* 79 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.build_contract_public_response = build_contract_public_response;
const contract_public_response_dto_1 = __webpack_require__(80);
async function build_contract_public_response(contract, lookup) {
    const status_external_id = await lookup.get_contract_status_external_id_by_catalog_status(contract.status);
    const contract_template_external_id = contract.contract_template_id === null
        ? null
        : await lookup.get_contract_template_external_id_by_internal_id(contract.contract_template_id);
    return new contract_public_response_dto_1.ContractPublicResponseDto({
        id: contract.internal_id,
        external_id: contract.external_id,
        user_id: contract.user_id,
        contract_template_external_id,
        status_external_id,
        original_file_url: contract.original_file_url,
        signed_file_url: contract.signed_file_url,
        form_answers_json: contract.form_answers_json,
        created_at: contract.created_at.toISOString(),
        updated_at: contract.updated_at.toISOString(),
    });
}


/***/ }),
/* 80 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContractPublicResponseDto = void 0;
const swagger_1 = __webpack_require__(9);
class ContractPublicResponseDto {
    id;
    external_id;
    user_id;
    contract_template_external_id;
    status_external_id;
    original_file_url;
    signed_file_url;
    form_answers_json;
    created_at;
    updated_at;
    constructor(init) {
        Object.assign(this, init);
    }
}
exports.ContractPublicResponseDto = ContractPublicResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ContractPublicResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], ContractPublicResponseDto.prototype, "external_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], ContractPublicResponseDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        format: 'uuid',
        nullable: true,
        description: 'Plantilla usada para instanciar el contrato (si aplica).',
    }),
    __metadata("design:type", Object)
], ContractPublicResponseDto.prototype, "contract_template_external_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ format: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], ContractPublicResponseDto.prototype, "status_external_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], ContractPublicResponseDto.prototype, "original_file_url", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], ContractPublicResponseDto.prototype, "signed_file_url", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        nullable: true,
        description: 'JSON almacenado; puede contener datos sensibles según el formulario.',
    }),
    __metadata("design:type", Object)
], ContractPublicResponseDto.prototype, "form_answers_json", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ContractPublicResponseDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ContractPublicResponseDto.prototype, "updated_at", void 0);


/***/ }),
/* 81 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var ContractsGetInboundSqsConsumer_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContractsGetInboundSqsConsumer = void 0;
const common_1 = __webpack_require__(6);
const config_1 = __webpack_require__(8);
const ingest_contracts_get_sqs_message_use_case_1 = __webpack_require__(82);
const shared_1 = __webpack_require__(17);
let ContractsGetInboundSqsConsumer = ContractsGetInboundSqsConsumer_1 = class ContractsGetInboundSqsConsumer extends shared_1.BaseConsumer {
    queues_config;
    config_service;
    ingest;
    nest_logger = new common_1.Logger(ContractsGetInboundSqsConsumer_1.name);
    constructor(sqs_client, queues_config, config_service, ingest) {
        super(sqs_client, {
            log: (m) => this.nest_logger.log(m),
            warn: (m) => this.nest_logger.warn(m),
            error: (m) => this.nest_logger.error(m),
        });
        this.queues_config = queues_config;
        this.config_service = config_service;
        this.ingest = ingest;
    }
    onModuleInit() {
        this.start();
    }
    onModuleDestroy() {
        this.stop();
    }
    resolve_queue_url() {
        return this.queues_config.contracts_get_inbound_queue_url;
    }
    get_poll_settings() {
        return {
            wait_time_seconds: this.config_service.getOrThrow('sqs.wait_time_seconds'),
            max_number_of_messages: this.config_service.getOrThrow('sqs.max_number_of_messages'),
            visibility_timeout_seconds: this.config_service.getOrThrow('sqs.visibility_timeout_seconds'),
        };
    }
    inactive_reason_message() {
        return 'Cola get-contract SQS no configurada (CONTRACTS_SQS_GET_CONTRACT_QUEUE_URL); worker inactivo.';
    }
    async handle(message) {
        const delete_on_validation_error = this.config_service.get('sqs.delete_on_validation_error') ?? false;
        return this.ingest.execute({
            body: message.body,
            delete_on_validation_error,
        });
    }
};
exports.ContractsGetInboundSqsConsumer = ContractsGetInboundSqsConsumer;
exports.ContractsGetInboundSqsConsumer = ContractsGetInboundSqsConsumer = ContractsGetInboundSqsConsumer_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(shared_1.SQS_CLIENT)),
    __param(1, (0, common_1.Inject)(shared_1.QUEUES_CONFIG)),
    __metadata("design:paramtypes", [Object, Object, typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof ingest_contracts_get_sqs_message_use_case_1.IngestContractsGetSqsMessageUseCase !== "undefined" && ingest_contracts_get_sqs_message_use_case_1.IngestContractsGetSqsMessageUseCase) === "function" ? _b : Object])
], ContractsGetInboundSqsConsumer);


/***/ }),
/* 82 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var IngestContractsGetSqsMessageUseCase_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IngestContractsGetSqsMessageUseCase = void 0;
const common_1 = __webpack_require__(6);
const class_transformer_1 = __webpack_require__(38);
const class_validator_1 = __webpack_require__(39);
const contracts_sqs_get_payload_dto_1 = __webpack_require__(83);
const get_contract_by_external_id_use_case_1 = __webpack_require__(84);
let IngestContractsGetSqsMessageUseCase = IngestContractsGetSqsMessageUseCase_1 = class IngestContractsGetSqsMessageUseCase {
    get_contract;
    logger = new common_1.Logger(IngestContractsGetSqsMessageUseCase_1.name);
    constructor(get_contract) {
        this.get_contract = get_contract;
    }
    async execute(cmd) {
        let parsed;
        try {
            parsed = JSON.parse(cmd.body);
        }
        catch {
            this.logger.warn('Cuerpo de mensaje get-contract no es JSON válido; se dejará para reintento.');
            return cmd.delete_on_validation_error;
        }
        const dto = (0, class_transformer_1.plainToInstance)(contracts_sqs_get_payload_dto_1.ContractsSqsGetPayloadDto, parsed, {
            enableImplicitConversion: true,
        });
        const errors = (0, class_validator_1.validateSync)(dto, { forbidUnknownValues: false });
        if (errors.length > 0) {
            const message = errors
                .map((e) => Object.values(e.constraints ?? {}).join(', '))
                .join('; ');
            this.logger.warn(`Mensaje get-contract inválido: ${message}`);
            return cmd.delete_on_validation_error;
        }
        try {
            const row = await this.get_contract.execute(dto.contract_external_id);
            const log_id = dto.correlation_id ?? 'sin_correlation';
            this.logger.log(`get-contract ok; correlation_id=${log_id} contract_external_id=${row.external_id} internal_id=${row.id}`);
            return true;
        }
        catch (err) {
            const text = err instanceof Error ? err.message : String(err);
            this.logger.error(`Error al procesar get-contract: ${text}`);
            return false;
        }
    }
};
exports.IngestContractsGetSqsMessageUseCase = IngestContractsGetSqsMessageUseCase;
exports.IngestContractsGetSqsMessageUseCase = IngestContractsGetSqsMessageUseCase = IngestContractsGetSqsMessageUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof get_contract_by_external_id_use_case_1.GetContractByExternalIdUseCase !== "undefined" && get_contract_by_external_id_use_case_1.GetContractByExternalIdUseCase) === "function" ? _a : Object])
], IngestContractsGetSqsMessageUseCase);


/***/ }),
/* 83 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContractsSqsGetPayloadDto = void 0;
const class_validator_1 = __webpack_require__(39);
class ContractsSqsGetPayloadDto {
    correlation_id;
    contract_external_id;
}
exports.ContractsSqsGetPayloadDto = ContractsSqsGetPayloadDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", String)
], ContractsSqsGetPayloadDto.prototype, "correlation_id", void 0);
__decorate([
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", String)
], ContractsSqsGetPayloadDto.prototype, "contract_external_id", void 0);


/***/ }),
/* 84 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetContractByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(6);
const contract_reference_lookup_port_1 = __webpack_require__(73);
const contracts_tokens_1 = __webpack_require__(72);
const contract_public_fields_builder_1 = __webpack_require__(79);
let GetContractByExternalIdUseCase = class GetContractByExternalIdUseCase {
    contract_repository;
    lookup;
    constructor(contract_repository, lookup) {
        this.contract_repository = contract_repository;
        this.lookup = lookup;
    }
    async execute(external_id) {
        const row = await this.contract_repository.find_by_external_id(external_id);
        if (row === null) {
            throw new common_1.NotFoundException('contract not found');
        }
        return (0, contract_public_fields_builder_1.build_contract_public_response)(row, this.lookup);
    }
};
exports.GetContractByExternalIdUseCase = GetContractByExternalIdUseCase;
exports.GetContractByExternalIdUseCase = GetContractByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(contracts_tokens_1.CONTRACT_REPOSITORY)),
    __param(1, (0, common_1.Inject)(contract_reference_lookup_port_1.CONTRACT_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [Object, Object])
], GetContractByExternalIdUseCase);


/***/ }),
/* 85 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessagingApplicationModule = void 0;
const common_1 = __webpack_require__(6);
const contracts_application_module_1 = __webpack_require__(86);
const ingest_contracts_create_sqs_message_use_case_1 = __webpack_require__(76);
const ingest_contracts_get_sqs_message_use_case_1 = __webpack_require__(82);
let MessagingApplicationModule = class MessagingApplicationModule {
};
exports.MessagingApplicationModule = MessagingApplicationModule;
exports.MessagingApplicationModule = MessagingApplicationModule = __decorate([
    (0, common_1.Module)({
        imports: [contracts_application_module_1.ContractsApplicationModule],
        providers: [ingest_contracts_create_sqs_message_use_case_1.IngestContractsCreateSqsMessageUseCase, ingest_contracts_get_sqs_message_use_case_1.IngestContractsGetSqsMessageUseCase],
        exports: [ingest_contracts_create_sqs_message_use_case_1.IngestContractsCreateSqsMessageUseCase, ingest_contracts_get_sqs_message_use_case_1.IngestContractsGetSqsMessageUseCase],
    })
], MessagingApplicationModule);


/***/ }),
/* 86 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContractsApplicationModule = void 0;
const common_1 = __webpack_require__(6);
const create_contract_use_case_1 = __webpack_require__(78);
const get_contract_by_external_id_use_case_1 = __webpack_require__(84);
const get_contract_by_id_use_case_1 = __webpack_require__(87);
const list_contracts_use_case_1 = __webpack_require__(88);
const update_contract_by_external_id_use_case_1 = __webpack_require__(89);
const delete_contract_by_external_id_use_case_1 = __webpack_require__(90);
const create_contract_with_zapsign_use_case_1 = __webpack_require__(91);
const process_zapsign_webhook_use_case_1 = __webpack_require__(94);
let ContractsApplicationModule = class ContractsApplicationModule {
};
exports.ContractsApplicationModule = ContractsApplicationModule;
exports.ContractsApplicationModule = ContractsApplicationModule = __decorate([
    (0, common_1.Module)({
        providers: [
            create_contract_use_case_1.CreateContractUseCase,
            create_contract_with_zapsign_use_case_1.CreateContractWithZapsignUseCase,
            process_zapsign_webhook_use_case_1.ProcessZapSignWebhookUseCase,
            get_contract_by_id_use_case_1.GetContractByIdUseCase,
            get_contract_by_external_id_use_case_1.GetContractByExternalIdUseCase,
            list_contracts_use_case_1.ListContractsUseCase,
            update_contract_by_external_id_use_case_1.UpdateContractByExternalIdUseCase,
            delete_contract_by_external_id_use_case_1.DeleteContractByExternalIdUseCase,
        ],
        exports: [
            create_contract_use_case_1.CreateContractUseCase,
            create_contract_with_zapsign_use_case_1.CreateContractWithZapsignUseCase,
            process_zapsign_webhook_use_case_1.ProcessZapSignWebhookUseCase,
            get_contract_by_id_use_case_1.GetContractByIdUseCase,
            get_contract_by_external_id_use_case_1.GetContractByExternalIdUseCase,
            list_contracts_use_case_1.ListContractsUseCase,
            update_contract_by_external_id_use_case_1.UpdateContractByExternalIdUseCase,
            delete_contract_by_external_id_use_case_1.DeleteContractByExternalIdUseCase,
        ],
    })
], ContractsApplicationModule);


/***/ }),
/* 87 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetContractByIdUseCase = void 0;
const common_1 = __webpack_require__(6);
const contract_reference_lookup_port_1 = __webpack_require__(73);
const contracts_tokens_1 = __webpack_require__(72);
const contract_public_fields_builder_1 = __webpack_require__(79);
let GetContractByIdUseCase = class GetContractByIdUseCase {
    contract_repository;
    lookup;
    constructor(contract_repository, lookup) {
        this.contract_repository = contract_repository;
        this.lookup = lookup;
    }
    async execute(internal_id) {
        const row = await this.contract_repository.find_by_id(internal_id);
        if (row === null) {
            throw new common_1.NotFoundException('contract not found');
        }
        return (0, contract_public_fields_builder_1.build_contract_public_response)(row, this.lookup);
    }
};
exports.GetContractByIdUseCase = GetContractByIdUseCase;
exports.GetContractByIdUseCase = GetContractByIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(contracts_tokens_1.CONTRACT_REPOSITORY)),
    __param(1, (0, common_1.Inject)(contract_reference_lookup_port_1.CONTRACT_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [Object, Object])
], GetContractByIdUseCase);


/***/ }),
/* 88 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListContractsUseCase = void 0;
const common_1 = __webpack_require__(6);
const contract_reference_lookup_port_1 = __webpack_require__(73);
const contracts_tokens_1 = __webpack_require__(72);
const contract_public_fields_builder_1 = __webpack_require__(79);
let ListContractsUseCase = class ListContractsUseCase {
    contract_repository;
    lookup;
    constructor(contract_repository, lookup) {
        this.contract_repository = contract_repository;
        this.lookup = lookup;
    }
    async execute(query) {
        let status;
        if (query.status_external_id !== undefined) {
            const resolved = await this.lookup.get_contract_catalog_status_by_external_id(query.status_external_id);
            if (resolved === null) {
                return {
                    items: [],
                    total: 0,
                    offset: query.offset,
                    limit: query.limit,
                };
            }
            status = resolved;
        }
        const filters = {
            user_id: query.user_id,
            credit_application_internal_id: query.credit_application_id,
            status,
        };
        const { items, total } = await this.contract_repository.find_page(filters, query.offset, query.limit);
        const mapped = await Promise.all(items.map((c) => (0, contract_public_fields_builder_1.build_contract_public_response)(c, this.lookup)));
        return {
            items: mapped,
            total,
            offset: query.offset,
            limit: query.limit,
        };
    }
};
exports.ListContractsUseCase = ListContractsUseCase;
exports.ListContractsUseCase = ListContractsUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(contracts_tokens_1.CONTRACT_REPOSITORY)),
    __param(1, (0, common_1.Inject)(contract_reference_lookup_port_1.CONTRACT_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [Object, Object])
], ListContractsUseCase);


/***/ }),
/* 89 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateContractByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(6);
const contract_reference_lookup_port_1 = __webpack_require__(73);
const contracts_tokens_1 = __webpack_require__(72);
const contract_public_fields_builder_1 = __webpack_require__(79);
let UpdateContractByExternalIdUseCase = class UpdateContractByExternalIdUseCase {
    contract_repository;
    lookup;
    constructor(contract_repository, lookup) {
        this.contract_repository = contract_repository;
        this.lookup = lookup;
    }
    async execute(external_id, command) {
        const patch = {};
        if (command.application_external_id !== undefined) {
            if (command.application_external_id === null) {
                patch.credit_application_internal_id = null;
            }
            else {
                const app_id = await this.lookup.get_application_internal_id_by_external_id(command.application_external_id);
                if (app_id === null) {
                    throw new common_1.NotFoundException('application not found');
                }
                patch.credit_application_internal_id = app_id;
            }
        }
        if (command.contract_template_external_id !== undefined) {
            if (command.contract_template_external_id === null) {
                patch.contract_template_id = null;
            }
            else {
                const tpl_id = await this.lookup.get_contract_template_internal_id_by_external_id(command.contract_template_external_id);
                if (tpl_id === null) {
                    throw new common_1.NotFoundException('contract template not found');
                }
                patch.contract_template_id = tpl_id;
            }
        }
        if (command.status_external_id !== undefined) {
            const status = await this.lookup.get_contract_catalog_status_by_external_id(command.status_external_id);
            if (status === null) {
                throw new common_1.NotFoundException('status not found');
            }
            patch.status = status;
        }
        if (command.zapsign_token !== undefined) {
            patch.zapsign_token = command.zapsign_token;
        }
        if (command.original_file_url !== undefined) {
            patch.original_file_url = command.original_file_url;
        }
        if (command.signed_file_url !== undefined) {
            patch.signed_file_url = command.signed_file_url;
        }
        if (command.form_answers_json !== undefined) {
            patch.form_answers_json = command.form_answers_json;
        }
        const updated = await this.contract_repository.update_by_external_id(external_id, patch);
        if (updated === null) {
            throw new common_1.NotFoundException('contract not found');
        }
        return (0, contract_public_fields_builder_1.build_contract_public_response)(updated, this.lookup);
    }
};
exports.UpdateContractByExternalIdUseCase = UpdateContractByExternalIdUseCase;
exports.UpdateContractByExternalIdUseCase = UpdateContractByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(contracts_tokens_1.CONTRACT_REPOSITORY)),
    __param(1, (0, common_1.Inject)(contract_reference_lookup_port_1.CONTRACT_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [Object, Object])
], UpdateContractByExternalIdUseCase);


/***/ }),
/* 90 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeleteContractByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(6);
const contracts_tokens_1 = __webpack_require__(72);
let DeleteContractByExternalIdUseCase = class DeleteContractByExternalIdUseCase {
    contract_repository;
    constructor(contract_repository) {
        this.contract_repository = contract_repository;
    }
    async execute(external_id) {
        const ok = await this.contract_repository.delete_by_external_id(external_id);
        if (!ok) {
            throw new common_1.NotFoundException('contract not found');
        }
    }
};
exports.DeleteContractByExternalIdUseCase = DeleteContractByExternalIdUseCase;
exports.DeleteContractByExternalIdUseCase = DeleteContractByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(contracts_tokens_1.CONTRACT_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], DeleteContractByExternalIdUseCase);


/***/ }),
/* 91 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateContractWithZapsignUseCase = void 0;
const common_1 = __webpack_require__(6);
const config_1 = __webpack_require__(8);
const contract_reference_lookup_port_1 = __webpack_require__(73);
const contracts_tokens_1 = __webpack_require__(72);
const signature_provider_port_1 = __webpack_require__(92);
const contract_public_fields_builder_1 = __webpack_require__(79);
const zapsign_replacements_builder_1 = __webpack_require__(93);
let CreateContractWithZapsignUseCase = class CreateContractWithZapsignUseCase {
    signature_provider;
    contract_repository;
    lookup;
    config_service;
    constructor(signature_provider, contract_repository, lookup, config_service) {
        this.signature_provider = signature_provider;
        this.contract_repository = contract_repository;
        this.lookup = lookup;
        this.config_service = config_service;
    }
    async execute(input) {
        let user_id = null;
        const user_ext = input.user_external_id;
        if (user_ext !== undefined && user_ext !== null && String(user_ext).trim().length > 0) {
            const resolved = await this.lookup.get_user_internal_id_by_external_id(user_ext);
            if (resolved === null) {
                throw new common_1.NotFoundException('user not found');
            }
            user_id = resolved;
        }
        let credit_application_internal_id = null;
        if (input.application_external_id !== undefined) {
            const app_id = await this.lookup.get_application_internal_id_by_external_id(input.application_external_id);
            if (app_id === null) {
                throw new common_1.NotFoundException('application not found');
            }
            credit_application_internal_id = app_id;
        }
        const status = await this.lookup.get_contract_catalog_status_by_external_id(input.status_external_id);
        if (status === null) {
            throw new common_1.NotFoundException('status not found');
        }
        let contract_template_id = null;
        if (input.contract_template_external_id !== undefined) {
            const tid = await this.lookup.get_contract_template_internal_id_by_external_id(input.contract_template_external_id);
            if (tid === null) {
                throw new common_1.NotFoundException('contract template not found');
            }
            contract_template_id = tid;
        }
        else {
            const defaulted = await this.lookup.get_default_contract_template_internal_id();
            if (defaulted === null) {
                throw new common_1.NotFoundException('default contract template not configured');
            }
            contract_template_id = defaulted;
        }
        const zapsign_template_ref = await this.lookup.get_zapsign_template_ref_by_internal_id(contract_template_id);
        if (zapsign_template_ref === null) {
            throw new common_1.BadRequestException('La plantilla no tiene zapsign_template_ref configurado en base de datos');
        }
        const dynamic_replacements = (0, zapsign_replacements_builder_1.build_zapsign_replacements)(input.template_data, input.replacements);
        if (dynamic_replacements.length === 0) {
            throw new common_1.BadRequestException('Debe enviar template_data y/o replacements para sustituir variables en la plantilla');
        }
        const sandbox = input.sandbox ??
            (this.config_service.get('config.signature.zapsign.sandbox_default') ?? true);
        const folder_path = input.folder_path?.trim() ||
            this.config_service.get('config.signature.zapsign.folder_path_default') ||
            '/';
        const signature_result = await this.signature_provider.create_document_from_template({
            template_id: zapsign_template_ref,
            folder_path,
            sandbox,
            signer_name: input.signer_name,
            signer_email: input.signer_email,
            signer_phone_country: input.signer_phone_country,
            signer_phone_number: input.signer_phone_number,
            replacements: dynamic_replacements,
        });
        const zapsign_envelope = {
            create_response: signature_result.raw_response,
            signer_token: signature_result.signer.provider_signer_token,
            sign_url: signature_result.signer.sign_url,
        };
        const merged_form = input.form_answers_json === undefined || input.form_answers_json === null
            ? { zapsign: zapsign_envelope }
            : { ...input.form_answers_json, zapsign: zapsign_envelope };
        const created = await this.contract_repository.create({
            external_id: input.external_id,
            user_id,
            contract_template_id,
            zapsign_token: signature_result.provider_document_token,
            status,
            original_file_url: signature_result.original_file_url,
            signed_file_url: null,
            form_answers_json: merged_form,
            credit_application_internal_id,
        });
        return (0, contract_public_fields_builder_1.build_contract_public_response)(created, this.lookup);
    }
};
exports.CreateContractWithZapsignUseCase = CreateContractWithZapsignUseCase;
exports.CreateContractWithZapsignUseCase = CreateContractWithZapsignUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(signature_provider_port_1.SIGNATURE_PROVIDER)),
    __param(1, (0, common_1.Inject)(contracts_tokens_1.CONTRACT_REPOSITORY)),
    __param(2, (0, common_1.Inject)(contract_reference_lookup_port_1.CONTRACT_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [Object, Object, Object, typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], CreateContractWithZapsignUseCase);


/***/ }),
/* 92 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SIGNATURE_PROVIDER = void 0;
exports.SIGNATURE_PROVIDER = Symbol('SIGNATURE_PROVIDER');


/***/ }),
/* 93 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.build_zapsign_replacements = build_zapsign_replacements;
function build_zapsign_replacements(template_data, explicit) {
    const replacement_map = new Map();
    if (template_data !== undefined) {
        for (const [raw_key, raw_value] of Object.entries(template_data)) {
            if (raw_value == null)
                continue;
            const normalized_value = String(raw_value);
            for (const variant of variable_name_variants(raw_key)) {
                if (!replacement_map.has(variant)) {
                    replacement_map.set(variant, normalized_value);
                }
            }
        }
    }
    if (explicit !== undefined) {
        for (const r of explicit) {
            replacement_map.set(r.from, r.to);
        }
    }
    return [...replacement_map.entries()].map(([from, to]) => ({ from, to }));
}
function variable_name_variants(raw_key) {
    const cleaned = raw_key
        .replaceAll('{{', '')
        .replaceAll('}}', '')
        .trim()
        .replace(/\s+/g, ' ');
    const no_accents = cleaned.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const snake_case = no_accents
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '');
    const spaced_from_snake = snake_case.replace(/_/g, ' ');
    const base_variants = [
        cleaned,
        cleaned.toUpperCase(),
        cleaned.toLowerCase(),
        no_accents,
        no_accents.toUpperCase(),
        no_accents.toLowerCase(),
        snake_case,
        spaced_from_snake,
        spaced_from_snake.toUpperCase(),
        spaced_from_snake.toLowerCase(),
    ];
    const accent_aware_variants = base_variants.flatMap((value) => [
        value,
        apply_accent_word_aliases(value),
    ]);
    const with_braces = accent_aware_variants.flatMap((value) => [
        value,
        `{{${value}}}`,
        `{{ ${value} }}`,
    ]);
    return with_braces.filter((value, index, array) => value.length > 0 && array.indexOf(value) === index);
}
function apply_accent_word_aliases(value) {
    const aliases = {
        NUMERO: 'NÚMERO',
        ELECTRONICO: 'ELECTRÓNICO',
        DIRECCION: 'DIRECCIÓN',
        TELEFONO: 'TELÉFONO',
        IDENTIFICACION: 'IDENTIFICACIÓN',
    };
    let transformed = value;
    for (const [plain, accented] of Object.entries(aliases)) {
        transformed = transformed
            .replaceAll(plain, accented)
            .replaceAll(plain.toLowerCase(), accented.toLowerCase());
    }
    return transformed;
}


/***/ }),
/* 94 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProcessZapSignWebhookUseCase = void 0;
const common_1 = __webpack_require__(6);
const config_1 = __webpack_require__(8);
const contracts_tokens_1 = __webpack_require__(72);
const signature_provider_port_1 = __webpack_require__(92);
let ProcessZapSignWebhookUseCase = class ProcessZapSignWebhookUseCase {
    signature_provider;
    contract_repository;
    config_service;
    constructor(signature_provider, contract_repository, config_service) {
        this.signature_provider = signature_provider;
        this.contract_repository = contract_repository;
        this.config_service = config_service;
    }
    async execute(payload, webhook_secret_header) {
        const expected = this.config_service.get('config.signature.zapsign.webhook_secret');
        if (expected !== undefined && expected.length > 0) {
            const got = (webhook_secret_header ?? '').trim();
            if (got !== expected) {
                throw new common_1.UnauthorizedException('webhook secret inválido');
            }
        }
        const normalized = this.signature_provider.normalize_signed_webhook(payload);
        if (normalized === null) {
            throw new common_1.BadRequestException('payload de webhook no reconocido');
        }
        const contract = await this.contract_repository.find_by_zapsign_token(normalized.provider_document_token);
        if (contract === null) {
            throw new common_1.NotFoundException('contrato no encontrado para el token de documento');
        }
        const prev_form = contract.form_answers_json ?? {};
        const webhook_envelope = {
            signed_at: normalized.signed_at.toISOString(),
            provider_signer_token: normalized.provider_signer_token,
            sign_url: normalized.sign_url,
            ip_address: normalized.ip_address,
            geo_latitude: normalized.geo_latitude,
            geo_longitude: normalized.geo_longitude,
            document_photo_url: normalized.document_photo_url,
            document_verse_photo_url: normalized.document_verse_photo_url,
            selfie_photo_url: normalized.selfie_photo_url,
            signature_image_url: normalized.signature_image_url,
        };
        await this.contract_repository.update_by_external_id(contract.external_id, {
            signed_file_url: normalized.signed_file_url ?? contract.signed_file_url,
            form_answers_json: {
                ...prev_form,
                zapsign_webhook: webhook_envelope,
            },
        });
    }
};
exports.ProcessZapSignWebhookUseCase = ProcessZapSignWebhookUseCase;
exports.ProcessZapSignWebhookUseCase = ProcessZapSignWebhookUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(signature_provider_port_1.SIGNATURE_PROVIDER)),
    __param(1, (0, common_1.Inject)(contracts_tokens_1.CONTRACT_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object, typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], ProcessZapSignWebhookUseCase);


/***/ }),
/* 95 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ZapSignSignatureProviderAdapter_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ZapSignSignatureProviderAdapter = void 0;
const common_1 = __webpack_require__(6);
const config_1 = __webpack_require__(8);
let ZapSignSignatureProviderAdapter = ZapSignSignatureProviderAdapter_1 = class ZapSignSignatureProviderAdapter {
    config_service;
    logger = new common_1.Logger(ZapSignSignatureProviderAdapter_1.name);
    constructor(config_service) {
        this.config_service = config_service;
    }
    async create_document_from_template(input) {
        const base_url = this.config_service.get('config.signature.zapsign.base_url');
        const api_token = this.config_service.get('config.signature.zapsign.api_token');
        if (!base_url?.trim() || !api_token?.trim()) {
            throw new Error('Configuración incompleta para ZapSign (base_url / api_token)');
        }
        const url = `${base_url.replace(/\/$/, '')}/models/create-doc/`;
        const body = {
            name: `pp_contract_${input.template_id}_${Date.now()}`,
            sandbox: input.sandbox,
            folder_path: input.folder_path,
            signer_name: input.signer_name,
            signer_email: input.signer_email,
            signer_phone_country: input.signer_phone_country,
            signer_phone_number: input.signer_phone_number,
            template_id: input.template_id,
            data: input.replacements.map((r) => ({ de: r.from, para: r.to })),
            replacements: input.replacements.map((r) => ({ de: r.from, para: r.to })),
        };
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${api_token}`,
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            const text = await response.text();
            this.logger.error(`ZapSign create-doc HTTP ${response.status}`);
            throw new Error('Error al crear documento en proveedor de firma');
        }
        const result = (await response.json());
        const signer = result.signers?.[0];
        if (!result.token || !signer?.token) {
            throw new Error('Respuesta inválida del proveedor de firma');
        }
        return {
            provider_document_token: result.token,
            original_file_url: result.original_file ?? null,
            signer: {
                provider_signer_token: signer.token,
                sign_url: signer.sign_url ?? null,
            },
            raw_response: result,
        };
    }
    async cancel_document(provider_document_token) {
        const base_url = this.config_service.get('config.signature.zapsign.base_url');
        const api_token = this.config_service.get('config.signature.zapsign.api_token');
        if (!base_url?.trim() || !api_token?.trim()) {
            throw new Error('Configuración incompleta para ZapSign');
        }
        const url = `${base_url.replace(/\/$/, '')}/docs/${encodeURIComponent(provider_document_token)}/`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${api_token}` },
        });
        if (!response.ok && response.status !== 404) {
            throw new Error('Error al cancelar documento en proveedor de firma');
        }
    }
    async get_document_snapshot(provider_document_token) {
        const base_url = this.config_service.get('config.signature.zapsign.base_url');
        const api_token = this.config_service.get('config.signature.zapsign.api_token');
        if (!base_url?.trim() || !api_token?.trim()) {
            throw new Error('Configuración incompleta para ZapSign');
        }
        const url = `${base_url.replace(/\/$/, '')}/docs/${encodeURIComponent(provider_document_token)}/`;
        const response = await fetch(url, {
            method: 'GET',
            headers: { Authorization: `Bearer ${api_token}` },
        });
        if (response.status === 404) {
            return null;
        }
        if (!response.ok) {
            this.logger.error(`ZapSign get-doc HTTP ${response.status}`);
            throw new Error('Error al consultar documento en proveedor de firma');
        }
        const result = (await response.json());
        const signers = this.extract_snapshot_signers(result);
        return {
            provider_document_token: result.token ?? provider_document_token,
            document_status: result.status ?? null,
            signed_file_url: result.signed_file ?? null,
            signers,
            raw_payload: result,
        };
    }
    normalize_signed_webhook(payload) {
        const document_token = this.pick_string(payload, 'token');
        const signed_file_url = this.pick_string(payload, 'signed_file');
        const signers = payload['signers'];
        if (!Array.isArray(signers) || signers.length === 0 || !document_token) {
            return null;
        }
        const first_signer = signers[0];
        const signer_token = this.pick_string(first_signer, 'token');
        const signed_at_raw = this.pick_string_many(first_signer, ['signed_at', 'signedAt']) ??
            this.pick_string_many(payload, ['signed_at', 'signedAt', 'event_date']);
        if (!signer_token || !signed_at_raw) {
            return null;
        }
        const nested_geo = this.pick_object(first_signer, 'geolocation');
        const geo_latitude = this.pick_string_many(first_signer, ['geo_latitude', 'latitude']) ??
            (nested_geo ? this.pick_string_many(nested_geo, ['latitude']) : null);
        const geo_longitude = this.pick_string_many(first_signer, ['geo_longitude', 'longitude']) ??
            (nested_geo ? this.pick_string_many(nested_geo, ['longitude']) : null);
        return {
            provider_document_token: document_token,
            provider_signer_token: signer_token,
            signed_at: new Date(signed_at_raw),
            signed_file_url: signed_file_url ?? null,
            sign_url: this.pick_string_many(first_signer, ['sign_url', 'signUrl']) ??
                signed_file_url ??
                this.pick_string_many(payload, ['signed_file', 'signedFile']),
            ip_address: this.pick_string_many(first_signer, ['ip', 'ip_address', 'ipAddress']),
            geo_latitude,
            geo_longitude,
            document_photo_url: this.pick_string(first_signer, 'document_photo_url'),
            document_verse_photo_url: this.pick_string(first_signer, 'document_verse_photo_url'),
            selfie_photo_url: this.pick_string(first_signer, 'selfie_photo_url'),
            signature_image_url: this.pick_string(first_signer, 'signature_image'),
            raw_payload: payload,
        };
    }
    extract_snapshot_signers(payload) {
        if (!Array.isArray(payload.signers)) {
            return [];
        }
        const out = [];
        for (const signer_raw of payload.signers) {
            const signer = signer_raw;
            const token = this.pick_string_many(signer, ['token']);
            if (!token)
                continue;
            out.push({
                provider_signer_token: token,
                sign_url: this.pick_string_many(signer, ['sign_url', 'signUrl']),
                signed_at: this.parse_date_or_null(this.pick_string_many(signer, ['signed_at', 'signedAt'])),
                ip_address: this.pick_string_many(signer, ['ip', 'ip_address', 'ipAddress']),
                geo_latitude: this.pick_string_many(signer, ['geo_latitude', 'latitude']),
                geo_longitude: this.pick_string_many(signer, ['geo_longitude', 'longitude']),
                document_photo_url: this.pick_string_many(signer, [
                    'document_photo_url',
                    'documentPhotoUrl',
                ]),
                document_verse_photo_url: this.pick_string_many(signer, [
                    'document_verse_photo_url',
                    'documentVersePhotoUrl',
                ]),
                selfie_photo_url: this.pick_string_many(signer, ['selfie_photo_url', 'selfiePhotoUrl']),
                signature_image_url: this.pick_string_many(signer, ['signature_image', 'signatureImage']),
            });
        }
        return out;
    }
    pick_string(source, key) {
        const value = source[key];
        return typeof value === 'string' ? value : null;
    }
    pick_string_many(source, keys) {
        for (const key of keys) {
            const value = source[key];
            if (typeof value === 'string' && value.trim().length > 0) {
                return value;
            }
        }
        return null;
    }
    pick_object(source, key) {
        const value = source[key];
        if (!value || typeof value !== 'object' || Array.isArray(value)) {
            return null;
        }
        return value;
    }
    parse_date_or_null(raw) {
        if (!raw)
            return null;
        const parsed = new Date(raw);
        return Number.isNaN(parsed.getTime()) ? null : parsed;
    }
};
exports.ZapSignSignatureProviderAdapter = ZapSignSignatureProviderAdapter;
exports.ZapSignSignatureProviderAdapter = ZapSignSignatureProviderAdapter = ZapSignSignatureProviderAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], ZapSignSignatureProviderAdapter);


/***/ }),
/* 96 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContractsModule = void 0;
const common_1 = __webpack_require__(6);
const contracts_application_module_1 = __webpack_require__(86);
const contracts_controller_1 = __webpack_require__(97);
const zapsign_webhook_controller_1 = __webpack_require__(102);
let ContractsModule = class ContractsModule {
};
exports.ContractsModule = ContractsModule;
exports.ContractsModule = ContractsModule = __decorate([
    (0, common_1.Module)({
        imports: [contracts_application_module_1.ContractsApplicationModule],
        controllers: [contracts_controller_1.ContractsController, zapsign_webhook_controller_1.ZapSignWebhookController],
    })
], ContractsModule);


/***/ }),
/* 97 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContractsController = void 0;
const common_1 = __webpack_require__(6);
const swagger_1 = __webpack_require__(9);
const create_contract_http_dto_1 = __webpack_require__(98);
const create_contract_with_zapsign_http_dto_1 = __webpack_require__(99);
const update_contract_http_dto_1 = __webpack_require__(100);
const list_contracts_query_dto_1 = __webpack_require__(101);
const contract_public_response_dto_1 = __webpack_require__(80);
const create_contract_use_case_1 = __webpack_require__(78);
const get_contract_by_id_use_case_1 = __webpack_require__(87);
const get_contract_by_external_id_use_case_1 = __webpack_require__(84);
const list_contracts_use_case_1 = __webpack_require__(88);
const update_contract_by_external_id_use_case_1 = __webpack_require__(89);
const delete_contract_by_external_id_use_case_1 = __webpack_require__(90);
const create_contract_with_zapsign_use_case_1 = __webpack_require__(91);
let ContractsController = class ContractsController {
    create_contract;
    create_contract_with_zapsign;
    get_by_id;
    get_by_external_id;
    list_contracts;
    update_contract;
    delete_contract;
    constructor(create_contract, create_contract_with_zapsign, get_by_id, get_by_external_id, list_contracts, update_contract, delete_contract) {
        this.create_contract = create_contract;
        this.create_contract_with_zapsign = create_contract_with_zapsign;
        this.get_by_id = get_by_id;
        this.get_by_external_id = get_by_external_id;
        this.list_contracts = list_contracts;
        this.update_contract = update_contract;
        this.delete_contract = delete_contract;
    }
    async create(body) {
        return this.create_contract.execute({
            external_id: body.external_id,
            user_external_id: body.user_external_id,
            application_external_id: body.application_external_id,
            contract_template_external_id: body.contract_template_external_id,
            status_external_id: body.status_external_id,
            zapsign_token: body.zapsign_token,
            original_file_url: body.original_file_url,
            signed_file_url: body.signed_file_url,
            form_answers_json: body.form_answers_json,
        });
    }
    async create_with_zapsign(body) {
        return this.create_contract_with_zapsign.execute({
            external_id: body.external_id,
            user_external_id: body.user_external_id,
            application_external_id: body.application_external_id,
            contract_template_external_id: body.contract_template_external_id,
            status_external_id: body.status_external_id,
            signer_name: body.signer_name,
            signer_email: body.signer_email,
            signer_phone_country: body.signer_phone_country,
            signer_phone_number: body.signer_phone_number,
            sandbox: body.sandbox,
            folder_path: body.folder_path,
            template_data: body.template_data,
            replacements: body.replacements,
            form_answers_json: body.form_answers_json,
        });
    }
    async list(query) {
        return this.list_contracts.execute({
            offset: query.offset,
            limit: query.limit,
            user_id: query.user_id,
            credit_application_id: query.credit_application_id,
            status_external_id: query.status_external_id,
        });
    }
    async getByExternalId(externalId) {
        return this.get_by_external_id.execute(externalId);
    }
    async getById(id) {
        return this.get_by_id.execute(id);
    }
    async update(externalId, body) {
        return this.update_contract.execute(externalId, {
            application_external_id: body.application_external_id,
            contract_template_external_id: body.contract_template_external_id,
            status_external_id: body.status_external_id,
            zapsign_token: body.zapsign_token,
            original_file_url: body.original_file_url,
            signed_file_url: body.signed_file_url,
            form_answers_json: body.form_answers_json,
        });
    }
    async remove(externalId) {
        await this.delete_contract.execute(externalId);
    }
};
exports.ContractsController = ContractsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear contrato' }),
    (0, swagger_1.ApiCreatedResponse)({ type: contract_public_response_dto_1.ContractPublicResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof create_contract_http_dto_1.CreateContractHttpDto !== "undefined" && create_contract_http_dto_1.CreateContractHttpDto) === "function" ? _h : Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], ContractsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('with-zapsign'),
    (0, swagger_1.ApiOperation)({
        summary: 'Crear contrato vía plantilla ZapSign',
        description: 'Crea el documento en ZapSign usando `zapsign_template_ref` de la plantilla en BD y persiste el contrato con `zapsign_token` y URLs devueltas.',
    }),
    (0, swagger_1.ApiCreatedResponse)({ type: contract_public_response_dto_1.ContractPublicResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof create_contract_with_zapsign_http_dto_1.CreateContractWithZapsignHttpDto !== "undefined" && create_contract_with_zapsign_http_dto_1.CreateContractWithZapsignHttpDto) === "function" ? _k : Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], ContractsController.prototype, "create_with_zapsign", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar contratos (paginado + filtros opcionales)' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Listado paginado' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_m = typeof list_contracts_query_dto_1.ListContractsQueryDto !== "undefined" && list_contracts_query_dto_1.ListContractsQueryDto) === "function" ? _m : Object]),
    __metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
], ContractsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('by-external-id/:externalId'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener contrato por external_id' }),
    (0, swagger_1.ApiOkResponse)({ type: contract_public_response_dto_1.ContractPublicResponseDto }),
    __param(0, (0, common_1.Param)('externalId', new common_1.ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], ContractsController.prototype, "getByExternalId", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener contrato por id interno' }),
    (0, swagger_1.ApiOkResponse)({ type: contract_public_response_dto_1.ContractPublicResponseDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_q = typeof Promise !== "undefined" && Promise) === "function" ? _q : Object)
], ContractsController.prototype, "getById", null);
__decorate([
    (0, common_1.Patch)(':externalId'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar contrato por external_id' }),
    (0, swagger_1.ApiOkResponse)({ type: contract_public_response_dto_1.ContractPublicResponseDto }),
    __param(0, (0, common_1.Param)('externalId', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_r = typeof update_contract_http_dto_1.UpdateContractHttpDto !== "undefined" && update_contract_http_dto_1.UpdateContractHttpDto) === "function" ? _r : Object]),
    __metadata("design:returntype", typeof (_s = typeof Promise !== "undefined" && Promise) === "function" ? _s : Object)
], ContractsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':externalId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar contrato por external_id' }),
    (0, swagger_1.ApiNoContentResponse)(),
    __param(0, (0, common_1.Param)('externalId', new common_1.ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_t = typeof Promise !== "undefined" && Promise) === "function" ? _t : Object)
], ContractsController.prototype, "remove", null);
exports.ContractsController = ContractsController = __decorate([
    (0, swagger_1.ApiTags)('contracts'),
    (0, common_1.Controller)('contracts'),
    __metadata("design:paramtypes", [typeof (_a = typeof create_contract_use_case_1.CreateContractUseCase !== "undefined" && create_contract_use_case_1.CreateContractUseCase) === "function" ? _a : Object, typeof (_b = typeof create_contract_with_zapsign_use_case_1.CreateContractWithZapsignUseCase !== "undefined" && create_contract_with_zapsign_use_case_1.CreateContractWithZapsignUseCase) === "function" ? _b : Object, typeof (_c = typeof get_contract_by_id_use_case_1.GetContractByIdUseCase !== "undefined" && get_contract_by_id_use_case_1.GetContractByIdUseCase) === "function" ? _c : Object, typeof (_d = typeof get_contract_by_external_id_use_case_1.GetContractByExternalIdUseCase !== "undefined" && get_contract_by_external_id_use_case_1.GetContractByExternalIdUseCase) === "function" ? _d : Object, typeof (_e = typeof list_contracts_use_case_1.ListContractsUseCase !== "undefined" && list_contracts_use_case_1.ListContractsUseCase) === "function" ? _e : Object, typeof (_f = typeof update_contract_by_external_id_use_case_1.UpdateContractByExternalIdUseCase !== "undefined" && update_contract_by_external_id_use_case_1.UpdateContractByExternalIdUseCase) === "function" ? _f : Object, typeof (_g = typeof delete_contract_by_external_id_use_case_1.DeleteContractByExternalIdUseCase !== "undefined" && delete_contract_by_external_id_use_case_1.DeleteContractByExternalIdUseCase) === "function" ? _g : Object])
], ContractsController);


/***/ }),
/* 98 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateContractHttpDto = void 0;
const swagger_1 = __webpack_require__(9);
const class_validator_1 = __webpack_require__(39);
class CreateContractHttpDto {
    external_id;
    user_external_id;
    application_external_id;
    contract_template_external_id;
    status_external_id;
    zapsign_token;
    original_file_url;
    signed_file_url;
    form_answers_json;
}
exports.CreateContractHttpDto = CreateContractHttpDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4'),
    (0, swagger_1.ApiPropertyOptional)({ format: 'uuid' }),
    __metadata("design:type", String)
], CreateContractHttpDto.prototype, "external_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4'),
    (0, swagger_1.ApiPropertyOptional)({
        format: 'uuid',
        description: 'Usuario (transversal_schema.users). Opcional si el flujo crea el contrato antes del titular.',
    }),
    __metadata("design:type", String)
], CreateContractHttpDto.prototype, "user_external_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4'),
    (0, swagger_1.ApiPropertyOptional)({ format: 'uuid' }),
    __metadata("design:type", String)
], CreateContractHttpDto.prototype, "application_external_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4'),
    (0, swagger_1.ApiPropertyOptional)({
        format: 'uuid',
        description: 'Plantilla (products_schema.contract_templates; sin anclaje por categoría/facility en DDL). Si no se envía, se usa la primera plantilla con version = 1.',
    }),
    __metadata("design:type", String)
], CreateContractHttpDto.prototype, "contract_template_external_id", void 0);
__decorate([
    (0, class_validator_1.IsUUID)('4'),
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], CreateContractHttpDto.prototype, "status_external_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((_, v) => v !== null),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(2048),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Object)
], CreateContractHttpDto.prototype, "zapsign_token", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((_, v) => v !== null),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Object)
], CreateContractHttpDto.prototype, "original_file_url", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((_, v) => v !== null),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Object)
], CreateContractHttpDto.prototype, "signed_file_url", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, swagger_1.ApiPropertyOptional)({ type: 'object', additionalProperties: true }),
    __metadata("design:type", Object)
], CreateContractHttpDto.prototype, "form_answers_json", void 0);


/***/ }),
/* 99 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateContractWithZapsignHttpDto = exports.ZapsignReplacementHttpDto = void 0;
const swagger_1 = __webpack_require__(9);
const class_transformer_1 = __webpack_require__(38);
const class_validator_1 = __webpack_require__(39);
class ZapsignReplacementHttpDto {
    from;
    to;
}
exports.ZapsignReplacementHttpDto = ZapsignReplacementHttpDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(512),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ZapsignReplacementHttpDto.prototype, "from", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(8192),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ZapsignReplacementHttpDto.prototype, "to", void 0);
class CreateContractWithZapsignHttpDto {
    external_id;
    user_external_id;
    application_external_id;
    contract_template_external_id;
    status_external_id;
    signer_name;
    signer_email;
    signer_phone_country;
    signer_phone_number;
    sandbox;
    folder_path;
    template_data;
    replacements;
    form_answers_json;
}
exports.CreateContractWithZapsignHttpDto = CreateContractWithZapsignHttpDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4'),
    (0, swagger_1.ApiPropertyOptional)({ format: 'uuid' }),
    __metadata("design:type", String)
], CreateContractWithZapsignHttpDto.prototype, "external_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4'),
    (0, swagger_1.ApiPropertyOptional)({ format: 'uuid' }),
    __metadata("design:type", String)
], CreateContractWithZapsignHttpDto.prototype, "user_external_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4'),
    (0, swagger_1.ApiPropertyOptional)({ format: 'uuid' }),
    __metadata("design:type", String)
], CreateContractWithZapsignHttpDto.prototype, "application_external_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4'),
    (0, swagger_1.ApiPropertyOptional)({
        format: 'uuid',
        description: 'Plantilla; se usa `zapsign_template_ref` de la fila para ZapSign.',
    }),
    __metadata("design:type", String)
], CreateContractWithZapsignHttpDto.prototype, "contract_template_external_id", void 0);
__decorate([
    (0, class_validator_1.IsUUID)('4'),
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], CreateContractWithZapsignHttpDto.prototype, "status_external_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateContractWithZapsignHttpDto.prototype, "signer_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateContractWithZapsignHttpDto.prototype, "signer_email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(8),
    (0, swagger_1.ApiProperty)({ description: 'Código país teléfono, ej. +57 o 57' }),
    __metadata("design:type", String)
], CreateContractWithZapsignHttpDto.prototype, "signer_phone_country", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(32),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateContractWithZapsignHttpDto.prototype, "signer_phone_number", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiPropertyOptional)({ description: 'Por defecto según ZAPSIGN_SANDBOX_DEFAULT' }),
    __metadata("design:type", Boolean)
], CreateContractWithZapsignHttpDto.prototype, "sandbox", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(512),
    (0, swagger_1.ApiPropertyOptional)({ description: 'Carpeta en ZapSign; por defecto config' }),
    __metadata("design:type", String)
], CreateContractWithZapsignHttpDto.prototype, "folder_path", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, swagger_1.ApiPropertyOptional)({ type: 'object', additionalProperties: true }),
    __metadata("design:type", typeof (_a = typeof Record !== "undefined" && Record) === "function" ? _a : Object)
], CreateContractWithZapsignHttpDto.prototype, "template_data", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ZapsignReplacementHttpDto),
    (0, swagger_1.ApiPropertyOptional)({ type: [ZapsignReplacementHttpDto] }),
    __metadata("design:type", Array)
], CreateContractWithZapsignHttpDto.prototype, "replacements", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((_, v) => v !== null),
    (0, class_validator_1.IsObject)(),
    (0, swagger_1.ApiPropertyOptional)({
        type: 'object',
        additionalProperties: true,
        description: 'JSON adicional a fusionar en form_answers_json (sin datos sensibles).',
    }),
    __metadata("design:type", Object)
], CreateContractWithZapsignHttpDto.prototype, "form_answers_json", void 0);


/***/ }),
/* 100 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateContractHttpDto = void 0;
const swagger_1 = __webpack_require__(9);
const class_validator_1 = __webpack_require__(39);
class UpdateContractHttpDto {
    application_external_id;
    contract_template_external_id;
    status_external_id;
    zapsign_token;
    original_file_url;
    signed_file_url;
    form_answers_json;
}
exports.UpdateContractHttpDto = UpdateContractHttpDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4'),
    (0, swagger_1.ApiPropertyOptional)({ format: 'uuid' }),
    __metadata("design:type", Object)
], UpdateContractHttpDto.prototype, "application_external_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((_, v) => v !== null && v !== undefined),
    (0, class_validator_1.IsUUID)('4'),
    (0, swagger_1.ApiPropertyOptional)({
        format: 'uuid',
        nullable: true,
        description: 'Plantilla; null desvincula contract_template_id.',
    }),
    __metadata("design:type", Object)
], UpdateContractHttpDto.prototype, "contract_template_external_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4'),
    (0, swagger_1.ApiPropertyOptional)({ format: 'uuid' }),
    __metadata("design:type", String)
], UpdateContractHttpDto.prototype, "status_external_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((_, v) => v !== null && v !== undefined),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(2048),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Object)
], UpdateContractHttpDto.prototype, "zapsign_token", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((_, v) => v !== null && v !== undefined),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Object)
], UpdateContractHttpDto.prototype, "original_file_url", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((_, v) => v !== null && v !== undefined),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Object)
], UpdateContractHttpDto.prototype, "signed_file_url", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Object)
], UpdateContractHttpDto.prototype, "form_answers_json", void 0);


/***/ }),
/* 101 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListContractsQueryDto = void 0;
const swagger_1 = __webpack_require__(9);
const class_transformer_1 = __webpack_require__(38);
const class_validator_1 = __webpack_require__(39);
const shared_1 = __webpack_require__(17);
class ListContractsQueryDto extends shared_1.PaginationRequestDto {
    user_id;
    credit_application_id;
    status_external_id;
}
exports.ListContractsQueryDto = ListContractsQueryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], ListContractsQueryDto.prototype, "user_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filtra por solicitud vinculada (credit_applications.id interno).',
    }),
    __metadata("design:type", Number)
], ListContractsQueryDto.prototype, "credit_application_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4'),
    (0, swagger_1.ApiPropertyOptional)({ format: 'uuid' }),
    __metadata("design:type", String)
], ListContractsQueryDto.prototype, "status_external_id", void 0);


/***/ }),
/* 102 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ZapSignWebhookController = void 0;
const common_1 = __webpack_require__(6);
const swagger_1 = __webpack_require__(9);
const process_zapsign_webhook_use_case_1 = __webpack_require__(94);
let ZapSignWebhookController = class ZapSignWebhookController {
    process_webhook;
    constructor(process_webhook) {
        this.process_webhook = process_webhook;
    }
    async handle_zapsign(body, webhook_secret) {
        if (body === null || typeof body !== 'object' || Array.isArray(body)) {
            throw new common_1.BadRequestException('body inválido');
        }
        await this.process_webhook.execute(body, webhook_secret);
    }
};
exports.ZapSignWebhookController = ZapSignWebhookController;
__decorate([
    (0, common_1.Post)('zapsign'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({
        summary: 'Webhook ZapSign',
        description: 'Recibe el payload de firma completada. Actualiza `signed_file_url` y anexa metadatos bajo `form_answers_json.zapsign_webhook`. ' +
            'Si `ZAPSIGN_WEBHOOK_SECRET` está definido en el servidor, debe enviarse el mismo valor en el header `X-Zapsign-Webhook-Secret`.',
    }),
    (0, swagger_1.ApiHeader)({
        name: 'X-Zapsign-Webhook-Secret',
        required: false,
        description: 'Obligatorio cuando el servidor tiene ZAPSIGN_WEBHOOK_SECRET configurado.',
    }),
    (0, swagger_1.ApiBody)({ schema: { type: 'object', additionalProperties: true } }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-zapsign-webhook-secret')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], ZapSignWebhookController.prototype, "handle_zapsign", null);
exports.ZapSignWebhookController = ZapSignWebhookController = __decorate([
    (0, swagger_1.ApiTags)('webhooks'),
    (0, common_1.Controller)('webhooks'),
    __metadata("design:paramtypes", [typeof (_a = typeof process_zapsign_webhook_use_case_1.ProcessZapSignWebhookUseCase !== "undefined" && process_zapsign_webhook_use_case_1.ProcessZapSignWebhookUseCase) === "function" ? _a : Object])
], ZapSignWebhookController);


/***/ }),
/* 103 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(8);
exports["default"] = (0, config_1.registerAs)('config', () => {
    return {
        environment: process.env.APP_ENV || 'development',
        port: process.env.CONTRACTS_MS_PORT || 8084,
        signature: {
            zapsign: {
                base_url: (process.env.ZAPSIGN_BASE_URL ?? '').trim(),
                api_token: (process.env.ZAPSIGN_API_TOKEN ?? '').trim(),
                sandbox_default: process.env.ZAPSIGN_SANDBOX_DEFAULT !== 'false',
                folder_path_default: (process.env.ZAPSIGN_FOLDER_PATH_DEFAULT ?? '/').trim() || '/',
                webhook_secret: (process.env.ZAPSIGN_WEBHOOK_SECRET ?? '').trim(),
            },
        },
    };
});


/***/ }),
/* 104 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sqs_config = void 0;
exports.get_contracts_sqs_config_from_env = get_contracts_sqs_config_from_env;
const config_1 = __webpack_require__(8);
const class_transformer_1 = __webpack_require__(38);
const class_validator_1 = __webpack_require__(39);
const CONTRACTS_SQS_OUTBOUND_QUEUE_URL_DEFAULT = 'http://127.0.0.1:4566/000000000000/contracts-ms-outbound-placeholder';
class ContractsSqsEnv {
    aws_region = 'us-east-1';
    aws_sqs_endpoint;
    contracts_sqs_outbound_queue_url;
    contracts_sqs_create_contract_queue_url;
    contracts_sqs_get_contract_queue_url;
    contracts_sqs_wait_time_seconds = 20;
    contracts_sqs_max_number_of_messages = 10;
    contracts_sqs_visibility_timeout_seconds = 30;
    contracts_sqs_delete_on_validation_error = false;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], ContractsSqsEnv.prototype, "aws_region", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value === '' || value === undefined ? undefined : value)),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContractsSqsEnv.prototype, "aws_sqs_endpoint", void 0);
__decorate([
    (0, class_validator_1.IsUrl)({ require_tld: false }),
    __metadata("design:type", String)
], ContractsSqsEnv.prototype, "contracts_sqs_outbound_queue_url", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value === '' || value === undefined ? undefined : value)),
    (0, class_validator_1.IsUrl)({ require_tld: false }),
    __metadata("design:type", String)
], ContractsSqsEnv.prototype, "contracts_sqs_create_contract_queue_url", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value === '' || value === undefined ? undefined : value)),
    (0, class_validator_1.IsUrl)({ require_tld: false }),
    __metadata("design:type", String)
], ContractsSqsEnv.prototype, "contracts_sqs_get_contract_queue_url", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(20),
    __metadata("design:type", Object)
], ContractsSqsEnv.prototype, "contracts_sqs_wait_time_seconds", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(10),
    __metadata("design:type", Object)
], ContractsSqsEnv.prototype, "contracts_sqs_max_number_of_messages", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(43200),
    __metadata("design:type", Object)
], ContractsSqsEnv.prototype, "contracts_sqs_visibility_timeout_seconds", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Object)
], ContractsSqsEnv.prototype, "contracts_sqs_delete_on_validation_error", void 0);
function validate_contracts_sqs_env(config) {
    const validated = (0, class_transformer_1.plainToInstance)(ContractsSqsEnv, config, { enableImplicitConversion: true });
    const errors = (0, class_validator_1.validateSync)(validated, { skipMissingProperties: false });
    if (errors.length > 0) {
        const message = errors.map((e) => Object.values(e.constraints ?? {}).join(', ')).join('; ');
        throw new Error(`Configuración SQS inválida: ${message}`);
    }
    return validated;
}
function get_contracts_sqs_config_from_env() {
    const outbound_raw = process.env.CONTRACTS_SQS_OUTBOUND_QUEUE_URL?.trim();
    const env = validate_contracts_sqs_env({
        aws_region: process.env.AWS_REGION ?? 'us-east-1',
        aws_sqs_endpoint: process.env.AWS_SQS_ENDPOINT,
        contracts_sqs_outbound_queue_url: outbound_raw && outbound_raw.length > 0
            ? outbound_raw
            : CONTRACTS_SQS_OUTBOUND_QUEUE_URL_DEFAULT,
        contracts_sqs_create_contract_queue_url: process.env.CONTRACTS_SQS_CREATE_CONTRACT_QUEUE_URL,
        contracts_sqs_get_contract_queue_url: process.env.CONTRACTS_SQS_GET_CONTRACT_QUEUE_URL,
        contracts_sqs_wait_time_seconds: process.env.CONTRACTS_SQS_WAIT_TIME_SECONDS ?? 20,
        contracts_sqs_max_number_of_messages: process.env.CONTRACTS_SQS_MAX_NUMBER_OF_MESSAGES ?? 10,
        contracts_sqs_visibility_timeout_seconds: process.env.CONTRACTS_SQS_VISIBILITY_TIMEOUT_SECONDS ?? 30,
        contracts_sqs_delete_on_validation_error: process.env.CONTRACTS_SQS_DELETE_ON_VALIDATION_ERROR === 'true',
    });
    return {
        region: env.aws_region,
        endpoint: env.aws_sqs_endpoint,
        outbound_queue_url: env.contracts_sqs_outbound_queue_url,
        create_contract_queue_url: env.contracts_sqs_create_contract_queue_url,
        get_contract_queue_url: env.contracts_sqs_get_contract_queue_url,
        wait_time_seconds: env.contracts_sqs_wait_time_seconds,
        max_number_of_messages: env.contracts_sqs_max_number_of_messages,
        visibility_timeout_seconds: env.contracts_sqs_visibility_timeout_seconds,
        delete_on_validation_error: env.contracts_sqs_delete_on_validation_error,
    };
}
exports.sqs_config = (0, config_1.registerAs)('sqs', () => get_contracts_sqs_config_from_env());


/***/ }),
/* 105 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.appController = void 0;
const common_1 = __webpack_require__(6);
const swagger_1 = __webpack_require__(9);
const health_response_dto_1 = __webpack_require__(106);
let appController = class appController {
    health() {
        return { status: 'ok', service: 'contracts-ms' };
    }
};
exports.appController = appController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Estado del servicio' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Servicio operativo', type: health_response_dto_1.HealthResponseDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_a = typeof health_response_dto_1.HealthResponseDto !== "undefined" && health_response_dto_1.HealthResponseDto) === "function" ? _a : Object)
], appController.prototype, "health", null);
exports.appController = appController = __decorate([
    (0, swagger_1.ApiTags)('health'),
    (0, common_1.Controller)('health')
], appController);


/***/ }),
/* 106 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HealthResponseDto = void 0;
const swagger_1 = __webpack_require__(9);
class HealthResponseDto {
    status;
    service;
}
exports.HealthResponseDto = HealthResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ok' }),
    __metadata("design:type", String)
], HealthResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'contracts-ms' }),
    __metadata("design:type", String)
], HealthResponseDto.prototype, "service", void 0);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(1);
__webpack_require__(2);
const common_1 = __webpack_require__(6);
const core_1 = __webpack_require__(7);
const config_1 = __webpack_require__(8);
const swagger_1 = __webpack_require__(9);
const app_module_1 = __webpack_require__(10);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    const swagger_config = new swagger_1.DocumentBuilder()
        .setTitle('Contracts MS')
        .setDescription('HTTP y mensajería SQS del microservicio de contratos')
        .setVersion('1.0')
        .addServer('/')
        .build();
    const swagger_document = swagger_1.SwaggerModule.createDocument(app, swagger_config);
    swagger_1.SwaggerModule.setup('docs', app, swagger_document, {
        jsonDocumentUrl: 'docs/json',
    });
    const config_service = app.get(config_1.ConfigService);
    const port = Number(config_service.get('config.port') ?? 8084);
    await app.listen(port);
    const logger = new common_1.Logger('Bootstrap');
    logger.log(`Contracts MS (HTTP + SQS) escuchando en puerto ${port}`);
    logger.log(`Swagger UI: http://localhost:${port}/docs`);
}
void bootstrap();

})();

/******/ })()
;