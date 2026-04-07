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
const products_data_1 = __webpack_require__(11);
const infrastructure_module_1 = __webpack_require__(61);
const categories_module_1 = __webpack_require__(113);
const credit_facilities_module_1 = __webpack_require__(114);
const app_config_1 = __importDefault(__webpack_require__(115));
const sqs_config_1 = __webpack_require__(116);
const app_controller_1 = __webpack_require__(117);
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
            products_data_1.ProductsDataModule,
            categories_module_1.CategoriesModule,
            credit_facilities_module_1.CreditFacilitiesModule,
        ],
        controllers: [app_controller_1.appController],
    })
], AppModule);


/***/ }),
/* 11 */
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
__exportStar(__webpack_require__(12), exports);
__exportStar(__webpack_require__(39), exports);
__exportStar(__webpack_require__(49), exports);
__exportStar(__webpack_require__(50), exports);
__exportStar(__webpack_require__(38), exports);
__exportStar(__webpack_require__(51), exports);
__exportStar(__webpack_require__(52), exports);
__exportStar(__webpack_require__(60), exports);


/***/ }),
/* 12 */
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
const typeorm_1 = __webpack_require__(13);
const shared_1 = __webpack_require__(14);
const base_external_id_entity_1 = __webpack_require__(37);
const credit_facility_entity_1 = __webpack_require__(38);
const partners_entity_1 = __webpack_require__(40);
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
        enum: shared_1.Statuses,
        enumName: 'credit_facility_state',
        default: shared_1.Statuses.ACTIVE,
    }),
    __metadata("design:type", typeof (_a = typeof shared_1.Statuses !== "undefined" && shared_1.Statuses) === "function" ? _a : Object)
], CategoryEntity.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => credit_facility_entity_1.CreditFacilityEntity, (cf) => cf.categories, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'credit_facility_id' }),
    __metadata("design:type", typeof (_b = typeof credit_facility_entity_1.CreditFacilityEntity !== "undefined" && credit_facility_entity_1.CreditFacilityEntity) === "function" ? _b : Object)
], CategoryEntity.prototype, "creditFacility", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => partners_entity_1.PartnersEntity, {
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
/* 13 */
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),
/* 14 */
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
var sqs_tokens_1 = __webpack_require__(15);
Object.defineProperty(exports, "QUEUES_CONFIG", ({ enumerable: true, get: function () { return sqs_tokens_1.QUEUES_CONFIG; } }));
Object.defineProperty(exports, "SQS_CLIENT", ({ enumerable: true, get: function () { return sqs_tokens_1.SQS_CLIENT; } }));
__exportStar(__webpack_require__(16), exports);
__exportStar(__webpack_require__(18), exports);
__exportStar(__webpack_require__(19), exports);
__exportStar(__webpack_require__(20), exports);
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
__exportStar(__webpack_require__(32), exports);
__exportStar(__webpack_require__(33), exports);
__exportStar(__webpack_require__(36), exports);


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QUEUES_CONFIG = exports.SQS_CLIENT = void 0;
exports.SQS_CLIENT = Symbol('SQS_CLIENT');
exports.QUEUES_CONFIG = Symbol('QUEUES_CONFIG');


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.create_sqs_client = create_sqs_client;
const client_sqs_1 = __webpack_require__(17);
function create_sqs_client(options) {
    const config = {
        region: options.region,
        ...(options.endpoint ? { endpoint: options.endpoint } : {}),
        ...(options.credentials ? { credentials: options.credentials } : {}),
    };
    return new client_sqs_1.SQSClient(config);
}


/***/ }),
/* 17 */
/***/ ((module) => {

module.exports = require("@aws-sdk/client-sqs");

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 19 */
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
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseConsumer = exports.BaseSqsConsumer = void 0;
const client_sqs_1 = __webpack_require__(17);
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
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BasePublisher = exports.BaseSqsPublisher = void 0;
const client_sqs_1 = __webpack_require__(17);
const sqs_publish_failed_error_1 = __webpack_require__(19);
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
/* 22 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StatusesCreditApplications = exports.Statuses = exports.StatusesCreditFacilities = void 0;
var StatusesCreditFacilities;
(function (StatusesCreditFacilities) {
    StatusesCreditFacilities["ACTIVE"] = "active";
    StatusesCreditFacilities["INACTIVE"] = "inactive";
})(StatusesCreditFacilities || (exports.StatusesCreditFacilities = StatusesCreditFacilities = {}));
exports.Statuses = StatusesCreditFacilities;
var StatusesCreditApplications;
(function (StatusesCreditApplications) {
    StatusesCreditApplications["IN_PROGRESS"] = "in_progress";
    StatusesCreditApplications["DUPLICATE"] = "duplicate";
    StatusesCreditApplications["UNDER_REVIEW"] = "under_review";
    StatusesCreditApplications["SARLAFT_MATCH"] = "sarlaft_match";
    StatusesCreditApplications["EXPERIAN_QUERY_ERROR"] = "experian_query_error";
    StatusesCreditApplications["AI_AGENT_ERROR"] = "ai_agent_error";
    StatusesCreditApplications["IN_INTERVIEW"] = "in_interview";
    StatusesCreditApplications["HCPJ_QUERY_ERROR"] = "hcpj_query_error";
    StatusesCreditApplications["PENDING_AUTHORIZATION"] = "pending_authorization";
    StatusesCreditApplications["AUTHORIZED"] = "authorized";
    StatusesCreditApplications["REJECTED"] = "rejected";
    StatusesCreditApplications["CANCELLED"] = "cancelled";
    StatusesCreditApplications["CLOSED"] = "closed";
})(StatusesCreditApplications || (exports.StatusesCreditApplications = StatusesCreditApplications = {}));


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 25 */
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
/* 26 */
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
/* 27 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 29 */
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
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.new_uuid = new_uuid;
const crypto_1 = __webpack_require__(31);
function new_uuid() {
    return (0, crypto_1.randomUUID)();
}


/***/ }),
/* 31 */
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),
/* 32 */
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
/* 33 */
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
const class_transformer_1 = __webpack_require__(34);
const class_validator_1 = __webpack_require__(35);
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
/* 34 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 35 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 36 */
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseExternalIdEntity = void 0;
const typeorm_1 = __webpack_require__(13);
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
/* 38 */
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
const typeorm_1 = __webpack_require__(13);
const shared_1 = __webpack_require__(14);
const base_external_id_entity_1 = __webpack_require__(37);
const category_entity_1 = __webpack_require__(12);
const contract_entity_1 = __webpack_require__(39);
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
        enum: shared_1.Statuses,
        enumName: 'credit_facility_state',
        default: shared_1.Statuses.ACTIVE,
    }),
    __metadata("design:type", typeof (_b = typeof shared_1.Statuses !== "undefined" && shared_1.Statuses) === "function" ? _b : Object)
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
/* 39 */
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
exports.ContractEntity = void 0;
const typeorm_1 = __webpack_require__(13);
const base_external_id_entity_1 = __webpack_require__(37);
let ContractEntity = class ContractEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    userId;
    contractTemplateId;
    zapsignToken;
    statusId;
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
    (0, typeorm_1.Column)({ name: 'status_id', type: 'bigint' }),
    __metadata("design:type", Number)
], ContractEntity.prototype, "statusId", void 0);
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
/* 40 */
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
exports.PartnersEntity = void 0;
const typeorm_1 = __webpack_require__(13);
const shared_1 = __webpack_require__(14);
const base_external_id_entity_1 = __webpack_require__(41);
const supplier_entity_1 = __webpack_require__(42);
let PartnersEntity = class PartnersEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    supplier;
    acronym;
    logoUrl;
    coBrandingLogoUrl;
    primaryColor;
    secondaryColor;
    lightColor;
    notificationEmail;
    webhookUrl;
    sendSalesRepVoucher;
    disbursementNotificationEmail;
    state;
};
exports.PartnersEntity = PartnersEntity;
__decorate([
    (0, typeorm_1.OneToOne)(() => supplier_entity_1.SupplierEntity, (s) => s.partner, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'supplier_id', referencedColumnName: 'id' }),
    __metadata("design:type", typeof (_a = typeof supplier_entity_1.SupplierEntity !== "undefined" && supplier_entity_1.SupplierEntity) === "function" ? _a : Object)
], PartnersEntity.prototype, "supplier", void 0);
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
        length: 20,
        nullable: true,
    }),
    __metadata("design:type", Object)
], PartnersEntity.prototype, "primaryColor", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'secondary_color',
        type: 'varchar',
        length: 20,
        nullable: true,
    }),
    __metadata("design:type", Object)
], PartnersEntity.prototype, "secondaryColor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'light_color', type: 'varchar', length: 20, nullable: true }),
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
        name: 'send_sales_rep_voucher',
        type: 'boolean',
        default: false,
    }),
    __metadata("design:type", Boolean)
], PartnersEntity.prototype, "sendSalesRepVoucher", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'disbursement_notification_email',
        type: 'varchar',
        nullable: true,
    }),
    __metadata("design:type", Object)
], PartnersEntity.prototype, "disbursementNotificationEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'state',
        type: 'enum',
        enum: shared_1.Statuses,
        enumName: 'partner_state',
        default: shared_1.Statuses.ACTIVE,
    }),
    __metadata("design:type", typeof (_b = typeof shared_1.Statuses !== "undefined" && shared_1.Statuses) === "function" ? _b : Object)
], PartnersEntity.prototype, "state", void 0);
exports.PartnersEntity = PartnersEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'partners', schema: 'suppliers_schema' })
], PartnersEntity);


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
const typeorm_1 = __webpack_require__(13);
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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SupplierEntity = void 0;
const typeorm_1 = __webpack_require__(13);
const base_external_id_entity_1 = __webpack_require__(41);
const bank_account_entity_1 = __webpack_require__(43);
const business_entity_1 = __webpack_require__(45);
const legal_representative_entity_1 = __webpack_require__(48);
const partners_entity_1 = __webpack_require__(40);
let SupplierEntity = class SupplierEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    business;
    businessId;
    legalRepresentative;
    legalRepresentativeId;
    bankAccount;
    partner;
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
    (0, typeorm_1.OneToOne)(() => legal_representative_entity_1.LegalRepresentativeEntity, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'legal_representative_id', referencedColumnName: 'id' }),
    __metadata("design:type", Object)
], SupplierEntity.prototype, "legalRepresentative", void 0);
__decorate([
    (0, typeorm_1.RelationId)((s) => s.legalRepresentative),
    __metadata("design:type", Object)
], SupplierEntity.prototype, "legalRepresentativeId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => bank_account_entity_1.BankAccountEntity, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'bank_account_id' }),
    __metadata("design:type", Object)
], SupplierEntity.prototype, "bankAccount", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => partners_entity_1.PartnersEntity, (p) => p.supplier),
    __metadata("design:type", Object)
], SupplierEntity.prototype, "partner", void 0);
exports.SupplierEntity = SupplierEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'suppliers', schema: 'suppliers_schema' })
], SupplierEntity);


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BankAccountEntity = void 0;
const typeorm_1 = __webpack_require__(13);
const base_external_id_entity_1 = __webpack_require__(41);
const aes_256_transformer_1 = __webpack_require__(44);
let BankAccountEntity = class BankAccountEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    bankEntity;
    accountNumber;
    bankCertification;
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
exports.BankAccountEntity = BankAccountEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'bank_accounts', schema: 'suppliers_schema' })
], BankAccountEntity);


/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BankAccountEncryptionTransformer = void 0;
exports.BankAccountEncryptionTransformer = {
    to: (value) => value,
    from: (value) => value,
};


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
exports.BusinessEntity = void 0;
const typeorm_1 = __webpack_require__(13);
const person_entity_1 = __webpack_require__(46);
const base_external_id_entity_1 = __webpack_require__(41);
const business_seniority_entity_1 = __webpack_require__(47);
let BusinessEntity = class BusinessEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    person;
    personId;
    businessSeniority;
    businessSeniorityId;
    cityId;
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
    (0, typeorm_1.Column)({ name: 'city_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], BusinessEntity.prototype, "cityId", void 0);
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PersonEntity = void 0;
const typeorm_1 = __webpack_require__(13);
const base_external_id_entity_1 = __webpack_require__(37);
let PersonEntity = class PersonEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    countryCode;
    firstName;
    lastName;
    docType;
    docNumber;
    docIssueDate;
    birthDate;
    gender;
    phone;
    residentialAddress;
    businessAddress;
    cityId;
};
exports.PersonEntity = PersonEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'country_code', type: 'varchar', length: 2, nullable: true }),
    __metadata("design:type", Object)
], PersonEntity.prototype, "countryCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'first_name', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], PersonEntity.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_name', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], PersonEntity.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'doc_type', type: 'varchar', length: 100 }),
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
    (0, typeorm_1.Column)({ name: 'residential_address', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], PersonEntity.prototype, "residentialAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'business_address', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], PersonEntity.prototype, "businessAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'city_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], PersonEntity.prototype, "cityId", void 0);
exports.PersonEntity = PersonEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'persons', schema: 'transversal_schema' })
], PersonEntity);


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BusinessSeniorityEntity = void 0;
const typeorm_1 = __webpack_require__(13);
const base_external_id_entity_1 = __webpack_require__(41);
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
exports.LegalRepresentativeEntity = void 0;
const typeorm_1 = __webpack_require__(13);
const person_entity_1 = __webpack_require__(46);
const base_external_id_entity_1 = __webpack_require__(41);
let LegalRepresentativeEntity = class LegalRepresentativeEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    person;
    personId;
    isPrimary;
};
exports.LegalRepresentativeEntity = LegalRepresentativeEntity;
__decorate([
    (0, typeorm_1.ManyToOne)(() => person_entity_1.PersonEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'person_id', referencedColumnName: 'id' }),
    __metadata("design:type", typeof (_a = typeof person_entity_1.PersonEntity !== "undefined" && person_entity_1.PersonEntity) === "function" ? _a : Object)
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
    (0, typeorm_1.Entity)({ name: 'legal_representatives', schema: 'suppliers_schema' })
], LegalRepresentativeEntity);


/***/ }),
/* 49 */
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
exports.ContractTemplateEntity = void 0;
const typeorm_1 = __webpack_require__(13);
const base_external_id_entity_1 = __webpack_require__(37);
let ContractTemplateEntity = class ContractTemplateEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    templateFamilyKey;
    version;
    effectiveFrom;
    effectiveTo;
    zapsignTemplateRef;
    statusId;
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
    (0, typeorm_1.Column)({ name: 'status_id', type: 'bigint' }),
    __metadata("design:type", Number)
], ContractTemplateEntity.prototype, "statusId", void 0);
exports.ContractTemplateEntity = ContractTemplateEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'contract_templates', schema: 'products_schema' })
], ContractTemplateEntity);


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
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreditApplicationEntity = void 0;
const typeorm_1 = __webpack_require__(13);
const base_external_id_entity_1 = __webpack_require__(37);
const contract_entity_1 = __webpack_require__(39);
const shared_1 = __webpack_require__(14);
let CreditApplicationEntity = class CreditApplicationEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    personId;
    partnerId;
    partnerCategoryId;
    businessId;
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
        enum: shared_1.StatusesCreditApplications,
        enumName: 'credit_application_status',
        default: shared_1.StatusesCreditApplications.IN_PROGRESS,
    }),
    __metadata("design:type", typeof (_a = typeof shared_1.StatusesCreditApplications !== "undefined" && shared_1.StatusesCreditApplications) === "function" ? _a : Object)
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DocumentEntity = void 0;
const typeorm_1 = __webpack_require__(13);
const base_external_id_entity_1 = __webpack_require__(37);
const credit_application_entity_1 = __webpack_require__(50);
let DocumentEntity = class DocumentEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    documentType;
    documentUrl;
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
/* 52 */
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
const typeorm_1 = __webpack_require__(53);
const suppliers_data_module_1 = __webpack_require__(54);
const person_entity_1 = __webpack_require__(46);
const category_entity_1 = __webpack_require__(12);
const contract_entity_1 = __webpack_require__(39);
const contract_template_entity_1 = __webpack_require__(49);
const credit_application_entity_1 = __webpack_require__(50);
const credit_facility_entity_1 = __webpack_require__(38);
const document_entity_1 = __webpack_require__(51);
const products_data_service_1 = __webpack_require__(60);
exports.PRODUCTS_DATA_ENTITIES = [
    credit_facility_entity_1.CreditFacilityEntity,
    category_entity_1.CategoryEntity,
    credit_application_entity_1.CreditApplicationEntity,
    contract_entity_1.ContractEntity,
    contract_template_entity_1.ContractTemplateEntity,
    document_entity_1.DocumentEntity,
];
exports.PRODUCTS_MS_TYPEORM_ENTITIES = [
    person_entity_1.PersonEntity,
    ...suppliers_data_module_1.SUPPLIERS_DATA_ENTITIES,
    ...exports.PRODUCTS_DATA_ENTITIES,
];
let ProductsDataModule = class ProductsDataModule {
};
exports.ProductsDataModule = ProductsDataModule;
exports.ProductsDataModule = ProductsDataModule = __decorate([
    (0, common_1.Module)({
        imports: [suppliers_data_module_1.SuppliersDataModule, typeorm_1.TypeOrmModule.forFeature([...exports.PRODUCTS_DATA_ENTITIES])],
        providers: [products_data_service_1.ProductsDataService],
        exports: [suppliers_data_module_1.SuppliersDataModule, typeorm_1.TypeOrmModule, products_data_service_1.ProductsDataService],
    })
], ProductsDataModule);


/***/ }),
/* 53 */
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),
/* 54 */
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
const typeorm_1 = __webpack_require__(53);
const bank_account_entity_1 = __webpack_require__(43);
const business_entity_1 = __webpack_require__(45);
const business_seniority_entity_1 = __webpack_require__(47);
const legal_representative_entity_1 = __webpack_require__(48);
const partners_entity_1 = __webpack_require__(40);
const order_entity_1 = __webpack_require__(55);
const sales_representative_entity_1 = __webpack_require__(56);
const shareholder_entity_1 = __webpack_require__(57);
const supplier_entity_1 = __webpack_require__(42);
const partner_onboarding_saga_entity_1 = __webpack_require__(58);
const suppliers_data_service_1 = __webpack_require__(59);
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
let SuppliersDataModule = class SuppliersDataModule {
};
exports.SuppliersDataModule = SuppliersDataModule;
exports.SuppliersDataModule = SuppliersDataModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([...exports.SUPPLIERS_DATA_ENTITIES])],
        providers: [suppliers_data_service_1.SuppliersDataService],
        exports: [typeorm_1.TypeOrmModule, suppliers_data_service_1.SuppliersDataService],
    })
], SuppliersDataModule);


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PurchaseOrderEntity = void 0;
const typeorm_1 = __webpack_require__(13);
const base_external_id_entity_1 = __webpack_require__(41);
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SalesRepresentativeEntity = void 0;
const typeorm_1 = __webpack_require__(13);
const base_external_id_entity_1 = __webpack_require__(41);
let SalesRepresentativeEntity = class SalesRepresentativeEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    partnerId;
    userId;
};
exports.SalesRepresentativeEntity = SalesRepresentativeEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'partner_id', type: 'bigint' }),
    __metadata("design:type", Number)
], SalesRepresentativeEntity.prototype, "partnerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], SalesRepresentativeEntity.prototype, "userId", void 0);
exports.SalesRepresentativeEntity = SalesRepresentativeEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'sales_representatives', schema: 'suppliers_schema' })
], SalesRepresentativeEntity);


/***/ }),
/* 57 */
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
exports.ShareholderEntity = void 0;
const typeorm_1 = __webpack_require__(13);
const person_entity_1 = __webpack_require__(46);
const base_external_id_entity_1 = __webpack_require__(41);
const business_entity_1 = __webpack_require__(45);
let ShareholderEntity = class ShareholderEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    business;
    businessId;
    person;
    personId;
    ownershipPercentage;
    evaluationOrder;
    creditCheckRequired;
    creditCheckCompleted;
    isLegalRepresentative;
};
exports.ShareholderEntity = ShareholderEntity;
__decorate([
    (0, typeorm_1.ManyToOne)(() => business_entity_1.BusinessEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'business_id', referencedColumnName: 'id' }),
    __metadata("design:type", typeof (_a = typeof business_entity_1.BusinessEntity !== "undefined" && business_entity_1.BusinessEntity) === "function" ? _a : Object)
], ShareholderEntity.prototype, "business", void 0);
__decorate([
    (0, typeorm_1.RelationId)((s) => s.business),
    __metadata("design:type", Number)
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
        name: 'is_legal_representative',
        type: 'boolean',
        default: false,
        nullable: false,
    }),
    __metadata("design:type", Boolean)
], ShareholderEntity.prototype, "isLegalRepresentative", void 0);
exports.ShareholderEntity = ShareholderEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'shareholders', schema: 'suppliers_schema' })
], ShareholderEntity);


/***/ }),
/* 58 */
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
exports.PartnerOnboardingSagaEntity = void 0;
const typeorm_1 = __webpack_require__(13);
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
    __metadata("design:type", String)
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
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], PartnerOnboardingSagaEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], PartnerOnboardingSagaEntity.prototype, "updatedAt", void 0);
exports.PartnerOnboardingSagaEntity = PartnerOnboardingSagaEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'partner_onboarding_sagas', schema: 'suppliers_schema' })
], PartnerOnboardingSagaEntity);


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
/* 61 */
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
const typeorm_1 = __webpack_require__(53);
const config_1 = __webpack_require__(8);
const postgres_type_orm_config_service_1 = __webpack_require__(62);
const sqs_module_1 = __webpack_require__(64);
const products_data_1 = __webpack_require__(11);
const typeorm_category_repository_1 = __webpack_require__(106);
const typeorm_credit_facility_repository_1 = __webpack_require__(109);
const categories_tokens_1 = __webpack_require__(79);
const credit_facilities_tokens_1 = __webpack_require__(73);
const products_reference_lookup_port_1 = __webpack_require__(80);
const typeorm_products_reference_lookup_adapter_1 = __webpack_require__(112);
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
            products_data_1.ProductsDataModule,
            sqs_module_1.SqsModule,
        ],
        providers: [
            typeorm_products_reference_lookup_adapter_1.TypeormProductsReferenceLookupAdapter,
            {
                provide: products_reference_lookup_port_1.PRODUCTS_REFERENCE_LOOKUP,
                useExisting: typeorm_products_reference_lookup_adapter_1.TypeormProductsReferenceLookupAdapter,
            },
            {
                provide: categories_tokens_1.CATEGORY_REPOSITORY,
                useClass: typeorm_category_repository_1.TypeormCategoryRepository,
            },
            {
                provide: credit_facilities_tokens_1.CREDIT_FACILITY_REPOSITORY,
                useClass: typeorm_credit_facility_repository_1.TypeormCreditFacilityRepository,
            },
        ],
        exports: [
            categories_tokens_1.CATEGORY_REPOSITORY,
            credit_facilities_tokens_1.CREDIT_FACILITY_REPOSITORY,
            products_reference_lookup_port_1.PRODUCTS_REFERENCE_LOOKUP,
        ],
    })
], InfrastructureModule);


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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PostgresTypeOrmConfigService = void 0;
const common_1 = __webpack_require__(6);
const typeorm_config_1 = __importDefault(__webpack_require__(63));
let PostgresTypeOrmConfigService = class PostgresTypeOrmConfigService {
    constructor() { }
    createTypeOrmOptions() {
        return typeorm_config_1.default;
    }
};
exports.PostgresTypeOrmConfigService = PostgresTypeOrmConfigService;
exports.PostgresTypeOrmConfigService = PostgresTypeOrmConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PostgresTypeOrmConfigService);


/***/ }),
/* 63 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(2);
const products_data_1 = __webpack_require__(11);
const TypeormConfig = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USERNAME,
    port: Number(process.env.TYPEORM_PORT ?? 5432),
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    entities: [...products_data_1.PRODUCTS_MS_TYPEORM_ENTITIES],
    synchronize: false,
    migrationsRun: false,
    migrationsTableName: 'typeorm_migrations',
};
exports["default"] = TypeormConfig;


/***/ }),
/* 64 */
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
const shared_1 = __webpack_require__(14);
const sqs_message_publisher_adapter_1 = __webpack_require__(65);
const config_outbound_products_queue_url_adapter_1 = __webpack_require__(66);
const products_inbound_sqs_consumer_1 = __webpack_require__(67);
const messaging_application_module_1 = __webpack_require__(85);
const outbound_message_publisher_port_1 = __webpack_require__(87);
const products_outbound_queue_url_port_1 = __webpack_require__(88);
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
            products_inbound_sqs_consumer_1.ProductsInboundSqsConsumer,
            {
                provide: outbound_message_publisher_port_1.OUTBOUND_MESSAGE_PUBLISHER_PORT,
                useExisting: sqs_message_publisher_adapter_1.SqsMessagePublisherAdapter,
            },
            config_outbound_products_queue_url_adapter_1.ConfigOutboundProductsQueueUrlAdapter,
            {
                provide: products_outbound_queue_url_port_1.PRODUCTS_OUTBOUND_QUEUE_URL_PORT,
                useExisting: config_outbound_products_queue_url_adapter_1.ConfigOutboundProductsQueueUrlAdapter,
            },
        ],
        exports: [
            shared_1.SQS_CLIENT,
            shared_1.QUEUES_CONFIG,
            outbound_message_publisher_port_1.OUTBOUND_MESSAGE_PUBLISHER_PORT,
            products_outbound_queue_url_port_1.PRODUCTS_OUTBOUND_QUEUE_URL_PORT,
        ],
    })
], SqsModule);


/***/ }),
/* 65 */
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
exports.SqsMessagePublisherAdapter = void 0;
const common_1 = __webpack_require__(6);
const shared_1 = __webpack_require__(14);
let SqsMessagePublisherAdapter = class SqsMessagePublisherAdapter extends shared_1.BasePublisher {
    constructor(sqs_client) {
        super(sqs_client);
    }
    enrich_send_input(input) {
        if (input.MessageGroupId) {
            return input;
        }
        try {
            const parsed = JSON.parse(input.MessageBody ?? '{}');
            const group = parsed.correlation_id;
            if (typeof group === 'string' && group.length > 0) {
                return { ...input, MessageGroupId: group };
            }
        }
        catch {
        }
        return input;
    }
    async publish(command) {
        const message_attributes = command.message_attributes
            ? Object.fromEntries(Object.entries(command.message_attributes).map(([key, attr]) => [
                key,
                {
                    DataType: attr.data_type,
                    StringValue: attr.string_value,
                },
            ]))
            : undefined;
        await this.send_message({
            QueueUrl: command.queue_url,
            MessageBody: command.body,
            MessageAttributes: message_attributes,
            MessageGroupId: command.message_group_id,
            MessageDeduplicationId: command.message_deduplication_id,
        });
    }
};
exports.SqsMessagePublisherAdapter = SqsMessagePublisherAdapter;
exports.SqsMessagePublisherAdapter = SqsMessagePublisherAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(shared_1.SQS_CLIENT)),
    __metadata("design:paramtypes", [Object])
], SqsMessagePublisherAdapter);


/***/ }),
/* 66 */
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
exports.ConfigOutboundProductsQueueUrlAdapter = void 0;
const common_1 = __webpack_require__(6);
const shared_1 = __webpack_require__(14);
let ConfigOutboundProductsQueueUrlAdapter = class ConfigOutboundProductsQueueUrlAdapter {
    queues_config;
    constructor(queues_config) {
        this.queues_config = queues_config;
    }
    get_outbound_queue_url() {
        return this.queues_config.outbound_queue_url;
    }
};
exports.ConfigOutboundProductsQueueUrlAdapter = ConfigOutboundProductsQueueUrlAdapter;
exports.ConfigOutboundProductsQueueUrlAdapter = ConfigOutboundProductsQueueUrlAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(shared_1.QUEUES_CONFIG)),
    __metadata("design:paramtypes", [Object])
], ConfigOutboundProductsQueueUrlAdapter);


/***/ }),
/* 67 */
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
var ProductsInboundSqsConsumer_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductsInboundSqsConsumer = void 0;
const common_1 = __webpack_require__(6);
const config_1 = __webpack_require__(8);
const ingest_products_inbound_sqs_message_use_case_1 = __webpack_require__(68);
const shared_1 = __webpack_require__(14);
let ProductsInboundSqsConsumer = ProductsInboundSqsConsumer_1 = class ProductsInboundSqsConsumer extends shared_1.BaseConsumer {
    queues_config;
    config_service;
    ingest_products_inbound;
    nest_logger = new common_1.Logger(ProductsInboundSqsConsumer_1.name);
    constructor(sqs_client, queues_config, config_service, ingest_products_inbound) {
        super(sqs_client, {
            log: (m) => this.nest_logger.log(m),
            warn: (m) => this.nest_logger.warn(m),
            error: (m) => this.nest_logger.error(m),
        });
        this.queues_config = queues_config;
        this.config_service = config_service;
        this.ingest_products_inbound = ingest_products_inbound;
    }
    onModuleInit() {
        this.start();
    }
    onModuleDestroy() {
        this.stop();
    }
    resolve_queue_url() {
        return this.queues_config.inbound_queue_url;
    }
    get_poll_settings() {
        return {
            wait_time_seconds: this.config_service.getOrThrow('sqs.wait_time_seconds'),
            max_number_of_messages: this.config_service.getOrThrow('sqs.max_number_of_messages'),
            visibility_timeout_seconds: this.config_service.getOrThrow('sqs.visibility_timeout_seconds'),
        };
    }
    inactive_reason_message() {
        return 'Cola de entrada SQS no configurada (PRODUCTS_SQS_INBOUND_QUEUE_URL); worker inactivo.';
    }
    async handle(message) {
        const delete_on_validation_error = this.config_service.get('sqs.delete_on_validation_error') ?? false;
        return this.ingest_products_inbound.execute({
            body: message.body,
            delete_on_validation_error,
        });
    }
};
exports.ProductsInboundSqsConsumer = ProductsInboundSqsConsumer;
exports.ProductsInboundSqsConsumer = ProductsInboundSqsConsumer = ProductsInboundSqsConsumer_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(shared_1.SQS_CLIENT)),
    __param(1, (0, common_1.Inject)(shared_1.QUEUES_CONFIG)),
    __metadata("design:paramtypes", [Object, Object, typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof ingest_products_inbound_sqs_message_use_case_1.IngestProductsInboundSqsMessageUseCase !== "undefined" && ingest_products_inbound_sqs_message_use_case_1.IngestProductsInboundSqsMessageUseCase) === "function" ? _b : Object])
], ProductsInboundSqsConsumer);


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
var IngestProductsInboundSqsMessageUseCase_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IngestProductsInboundSqsMessageUseCase = void 0;
const common_1 = __webpack_require__(6);
const class_transformer_1 = __webpack_require__(34);
const class_validator_1 = __webpack_require__(35);
const transversal_inbound_message_dto_1 = __webpack_require__(69);
const process_products_inbound_message_use_case_1 = __webpack_require__(71);
let IngestProductsInboundSqsMessageUseCase = IngestProductsInboundSqsMessageUseCase_1 = class IngestProductsInboundSqsMessageUseCase {
    process_products_inbound_message;
    logger = new common_1.Logger(IngestProductsInboundSqsMessageUseCase_1.name);
    constructor(process_products_inbound_message) {
        this.process_products_inbound_message = process_products_inbound_message;
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
            await this.process_products_inbound_message.execute(dto);
            return true;
        }
        catch (err) {
            const text = err instanceof Error ? err.message : String(err);
            this.logger.error(`Error al procesar mensaje: ${text}`);
            return false;
        }
    }
};
exports.IngestProductsInboundSqsMessageUseCase = IngestProductsInboundSqsMessageUseCase;
exports.IngestProductsInboundSqsMessageUseCase = IngestProductsInboundSqsMessageUseCase = IngestProductsInboundSqsMessageUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof process_products_inbound_message_use_case_1.ProcessProductsInboundMessageUseCase !== "undefined" && process_products_inbound_message_use_case_1.ProcessProductsInboundMessageUseCase) === "function" ? _a : Object])
], IngestProductsInboundSqsMessageUseCase);


/***/ }),
/* 69 */
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
exports.TransversalInboundMessageDto = void 0;
const class_validator_1 = __webpack_require__(35);
const transversal_outbound_event_dto_1 = __webpack_require__(70);
class TransversalInboundMessageDto {
    correlation_id;
    event_type;
    payload;
    trace_id;
}
exports.TransversalInboundMessageDto = TransversalInboundMessageDto;
__decorate([
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", String)
], TransversalInboundMessageDto.prototype, "correlation_id", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(transversal_outbound_event_dto_1.TransversalEventType),
    __metadata("design:type", typeof (_a = typeof transversal_outbound_event_dto_1.TransversalEventType !== "undefined" && transversal_outbound_event_dto_1.TransversalEventType) === "function" ? _a : Object)
], TransversalInboundMessageDto.prototype, "event_type", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", typeof (_b = typeof Record !== "undefined" && Record) === "function" ? _b : Object)
], TransversalInboundMessageDto.prototype, "payload", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(256),
    __metadata("design:type", String)
], TransversalInboundMessageDto.prototype, "trace_id", void 0);


/***/ }),
/* 70 */
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
exports.TransversalOutboundEventDto = exports.TransversalEventType = void 0;
const class_validator_1 = __webpack_require__(35);
var TransversalEventType;
(function (TransversalEventType) {
    TransversalEventType["health_ping"] = "health_ping";
    TransversalEventType["partner_onboarding_credit_facility_requested"] = "partner_onboarding_credit_facility_requested";
    TransversalEventType["partner_onboarding_category_batch_requested"] = "partner_onboarding_category_batch_requested";
})(TransversalEventType || (exports.TransversalEventType = TransversalEventType = {}));
class TransversalOutboundEventDto {
    correlation_id;
    event_type;
    payload;
    trace_id;
}
exports.TransversalOutboundEventDto = TransversalOutboundEventDto;
__decorate([
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", String)
], TransversalOutboundEventDto.prototype, "correlation_id", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(TransversalEventType),
    __metadata("design:type", String)
], TransversalOutboundEventDto.prototype, "event_type", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", typeof (_a = typeof Record !== "undefined" && Record) === "function" ? _a : Object)
], TransversalOutboundEventDto.prototype, "payload", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(256),
    __metadata("design:type", String)
], TransversalOutboundEventDto.prototype, "trace_id", void 0);


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
var ProcessProductsInboundMessageUseCase_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProcessProductsInboundMessageUseCase = void 0;
const common_1 = __webpack_require__(6);
const shared_1 = __webpack_require__(14);
const transversal_outbound_event_dto_1 = __webpack_require__(70);
const create_credit_facility_use_case_1 = __webpack_require__(72);
const create_credit_facility_request_1 = __webpack_require__(77);
const create_category_use_case_1 = __webpack_require__(78);
const create_category_request_1 = __webpack_require__(84);
const credit_facilities_tokens_1 = __webpack_require__(73);
function parse_facility_state(raw) {
    if (raw === undefined) {
        return null;
    }
    const v = raw.trim().toLowerCase();
    if (v === shared_1.Statuses.ACTIVE) {
        return shared_1.Statuses.ACTIVE;
    }
    if (v === shared_1.Statuses.INACTIVE) {
        return shared_1.Statuses.INACTIVE;
    }
    return null;
}
let ProcessProductsInboundMessageUseCase = ProcessProductsInboundMessageUseCase_1 = class ProcessProductsInboundMessageUseCase {
    credit_facility_repository;
    create_credit_facility;
    create_category;
    logger = new common_1.Logger(ProcessProductsInboundMessageUseCase_1.name);
    constructor(credit_facility_repository, create_credit_facility, create_category) {
        this.credit_facility_repository = credit_facility_repository;
        this.create_credit_facility = create_credit_facility;
        this.create_category = create_category;
    }
    async execute(dto) {
        switch (dto.event_type) {
            case transversal_outbound_event_dto_1.TransversalEventType.partner_onboarding_credit_facility_requested:
                await this.handle_credit_facility(dto);
                return;
            case transversal_outbound_event_dto_1.TransversalEventType.partner_onboarding_category_batch_requested:
                await this.handle_category_batch(dto);
                return;
            default:
                this.logger.log(`Mensaje products-ms recibido: event_type=${dto.event_type} correlation_id=${dto.correlation_id}`);
        }
    }
    async handle_credit_facility(dto) {
        const payload = dto.payload;
        const external_id = payload.credit_facility_external_id;
        const total_limit = payload.total_limit;
        const state = parse_facility_state(payload.state);
        if (external_id === undefined ||
            external_id.length === 0 ||
            total_limit === undefined ||
            state === null) {
            this.logger.warn(`Payload inválido para credit_facility correlation_id=${dto.correlation_id}`);
            return;
        }
        const existing = await this.credit_facility_repository.find_by_external_id(external_id);
        if (existing !== null) {
            this.logger.debug(`[Saga][products] credit facility ya existe external_id=${external_id} correlation_id=${dto.correlation_id}`);
            return;
        }
        await this.create_credit_facility.execute(new create_credit_facility_request_1.CreateCreditFacilityRequest(payload.contract_id ?? null, total_limit, state, external_id));
        this.logger.debug(`[Saga][products] credit facility creada external_id=${external_id} correlation_id=${dto.correlation_id}`);
    }
    async handle_category_batch(dto) {
        const payload = dto.payload;
        const cf = payload.credit_facility_external_id;
        const state = parse_facility_state(payload.state);
        const categories = payload.categories;
        if (cf === undefined ||
            cf.length === 0 ||
            state === null ||
            !Array.isArray(categories) ||
            categories.length === 0) {
            this.logger.warn(`Payload inválido para category_batch correlation_id=${dto.correlation_id}`);
            return;
        }
        const partner_id = payload.partner_id === undefined ? null : payload.partner_id;
        for (const item of categories) {
            if (item.name === undefined ||
                item.discount_percentage === undefined ||
                item.interest_rate === undefined ||
                item.delay_days === undefined ||
                item.term_days === undefined) {
                this.logger.warn(`Ítem de categoría incompleto correlation_id=${dto.correlation_id}`);
                continue;
            }
            await this.create_category.execute(new create_category_request_1.CreateCategoryRequest(cf, partner_id, item.name, item.discount_percentage, item.interest_rate, item.disbursement_fee_percent ?? null, item.minimum_disbursement_fee ?? null, item.delay_days, item.term_days, state));
        }
        this.logger.debug(`[Saga][products] categorías creadas count=${categories.length} correlation_id=${dto.correlation_id}`);
    }
};
exports.ProcessProductsInboundMessageUseCase = ProcessProductsInboundMessageUseCase;
exports.ProcessProductsInboundMessageUseCase = ProcessProductsInboundMessageUseCase = ProcessProductsInboundMessageUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(credit_facilities_tokens_1.CREDIT_FACILITY_REPOSITORY)),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof create_credit_facility_use_case_1.CreateCreditFacilityUseCase !== "undefined" && create_credit_facility_use_case_1.CreateCreditFacilityUseCase) === "function" ? _a : Object, typeof (_b = typeof create_category_use_case_1.CreateCategoryUseCase !== "undefined" && create_category_use_case_1.CreateCategoryUseCase) === "function" ? _b : Object])
], ProcessProductsInboundMessageUseCase);


/***/ }),
/* 72 */
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
exports.CreateCreditFacilityUseCase = void 0;
const common_1 = __webpack_require__(6);
const credit_facilities_tokens_1 = __webpack_require__(73);
const credit_facility_ports_1 = __webpack_require__(74);
const credit_facility_public_fields_builder_1 = __webpack_require__(75);
const create_credit_facility_response_1 = __webpack_require__(76);
let CreateCreditFacilityUseCase = class CreateCreditFacilityUseCase {
    credit_facility_repository;
    constructor(credit_facility_repository) {
        this.credit_facility_repository = credit_facility_repository;
    }
    async execute(req) {
        const created = await this.credit_facility_repository.create({
            contract_id: req.contract_id,
            total_limit: req.total_limit,
            state: req.state,
            external_id: req.external_id,
        });
        const fields = (0, credit_facility_public_fields_builder_1.build_credit_facility_public_fields)(created);
        return new create_credit_facility_response_1.CreateCreditFacilityResponse(fields);
    }
};
exports.CreateCreditFacilityUseCase = CreateCreditFacilityUseCase;
exports.CreateCreditFacilityUseCase = CreateCreditFacilityUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(credit_facilities_tokens_1.CREDIT_FACILITY_REPOSITORY)),
    __metadata("design:paramtypes", [typeof (_a = typeof credit_facility_ports_1.CreditFacilityRepository !== "undefined" && credit_facility_ports_1.CreditFacilityRepository) === "function" ? _a : Object])
], CreateCreditFacilityUseCase);


/***/ }),
/* 73 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CREDIT_FACILITY_REPOSITORY = void 0;
exports.CREDIT_FACILITY_REPOSITORY = Symbol('CREDIT_FACILITY_REPOSITORY');


/***/ }),
/* 74 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 75 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.build_credit_facility_public_fields = build_credit_facility_public_fields;
function build_credit_facility_public_fields(row) {
    return {
        external_id: row.external_id,
        contract_id: row.contract_id,
        state: row.state,
        total_limit: row.total_limit,
        created_at: row.created_at,
        updated_at: row.updated_at,
    };
}


/***/ }),
/* 76 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateCreditFacilityResponse = void 0;
class CreateCreditFacilityResponse {
    external_id;
    contract_id;
    state;
    total_limit;
    created_at;
    updated_at;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.CreateCreditFacilityResponse = CreateCreditFacilityResponse;


/***/ }),
/* 77 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateCreditFacilityRequest = void 0;
class CreateCreditFacilityRequest {
    contract_id;
    total_limit;
    state;
    external_id;
    constructor(contract_id, total_limit, state, external_id) {
        this.contract_id = contract_id;
        this.total_limit = total_limit;
        this.state = state;
        this.external_id = external_id;
    }
}
exports.CreateCreditFacilityRequest = CreateCreditFacilityRequest;


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateCategoryUseCase = void 0;
const common_1 = __webpack_require__(6);
const categories_tokens_1 = __webpack_require__(79);
const products_reference_lookup_port_1 = __webpack_require__(80);
const category_ports_1 = __webpack_require__(81);
const category_public_fields_builder_1 = __webpack_require__(82);
const create_category_response_1 = __webpack_require__(83);
let CreateCategoryUseCase = class CreateCategoryUseCase {
    category_repository;
    reference_lookup;
    constructor(category_repository, reference_lookup) {
        this.category_repository = category_repository;
        this.reference_lookup = reference_lookup;
    }
    async execute(req) {
        const credit_facility_id = await this.reference_lookup.get_credit_facility_internal_id_by_external_id(req.credit_facility_external_id);
        if (credit_facility_id === null) {
            throw new common_1.NotFoundException('credit facility not found');
        }
        const partner_id = req.partner_id;
        const created = await this.category_repository.create({
            credit_facility_id,
            partner_id,
            name: req.name,
            discount_percentage: req.discount_percentage,
            interest_rate: req.interest_rate,
            disbursement_fee_percent: req.disbursement_fee_percent,
            minimum_disbursement_fee: req.minimum_disbursement_fee,
            delay_days: req.delay_days,
            term_days: req.term_days,
            state: req.state,
        });
        const fields = await (0, category_public_fields_builder_1.build_category_public_fields)(created, this.reference_lookup);
        return new create_category_response_1.CreateCategoryResponse(fields);
    }
};
exports.CreateCategoryUseCase = CreateCategoryUseCase;
exports.CreateCategoryUseCase = CreateCategoryUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(categories_tokens_1.CATEGORY_REPOSITORY)),
    __param(1, (0, common_1.Inject)(products_reference_lookup_port_1.PRODUCTS_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [typeof (_a = typeof category_ports_1.CategoryRepository !== "undefined" && category_ports_1.CategoryRepository) === "function" ? _a : Object, Object])
], CreateCategoryUseCase);


/***/ }),
/* 79 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CATEGORY_REPOSITORY = void 0;
exports.CATEGORY_REPOSITORY = Symbol('CATEGORY_REPOSITORY');


/***/ }),
/* 80 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PRODUCTS_REFERENCE_LOOKUP = void 0;
exports.PRODUCTS_REFERENCE_LOOKUP = Symbol('PRODUCTS_REFERENCE_LOOKUP');


/***/ }),
/* 81 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 82 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.build_category_public_fields = build_category_public_fields;
async function build_category_public_fields(row, lookup) {
    const credit_facility_external_id = await lookup.get_credit_facility_external_id_by_internal_id(row.credit_facility_id);
    const partner_external_id = row.partner_id === null
        ? null
        : await lookup.get_partner_external_id_by_internal_id(row.partner_id);
    if (credit_facility_external_id === null ||
        (row.partner_id !== null && partner_external_id === null)) {
        throw new Error('category reference resolution failed');
    }
    return {
        external_id: row.external_id,
        credit_facility_external_id,
        partner_external_id,
        name: row.name,
        discount_percentage: row.discount_percentage,
        interest_rate: row.interest_rate,
        disbursement_fee_percent: row.disbursement_fee_percent,
        minimum_disbursement_fee: row.minimum_disbursement_fee,
        delay_days: row.delay_days,
        term_days: row.term_days,
        state: row.state,
        created_at: row.created_at,
        updated_at: row.updated_at,
    };
}


/***/ }),
/* 83 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateCategoryResponse = void 0;
class CreateCategoryResponse {
    external_id;
    credit_facility_external_id;
    partner_external_id;
    name;
    discount_percentage;
    interest_rate;
    disbursement_fee_percent;
    minimum_disbursement_fee;
    delay_days;
    term_days;
    state;
    created_at;
    updated_at;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.CreateCategoryResponse = CreateCategoryResponse;


/***/ }),
/* 84 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateCategoryRequest = void 0;
class CreateCategoryRequest {
    credit_facility_external_id;
    partner_id;
    name;
    discount_percentage;
    interest_rate;
    disbursement_fee_percent;
    minimum_disbursement_fee;
    delay_days;
    term_days;
    state;
    constructor(credit_facility_external_id, partner_id, name, discount_percentage, interest_rate, disbursement_fee_percent, minimum_disbursement_fee, delay_days, term_days, state) {
        this.credit_facility_external_id = credit_facility_external_id;
        this.partner_id = partner_id;
        this.name = name;
        this.discount_percentage = discount_percentage;
        this.interest_rate = interest_rate;
        this.disbursement_fee_percent = disbursement_fee_percent;
        this.minimum_disbursement_fee = minimum_disbursement_fee;
        this.delay_days = delay_days;
        this.term_days = term_days;
        this.state = state;
    }
}
exports.CreateCategoryRequest = CreateCategoryRequest;


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
const publish_products_event_use_case_1 = __webpack_require__(86);
const process_products_inbound_message_use_case_1 = __webpack_require__(71);
const ingest_products_inbound_sqs_message_use_case_1 = __webpack_require__(68);
const credit_facilities_application_module_1 = __webpack_require__(90);
const categories_application_module_1 = __webpack_require__(98);
let MessagingApplicationModule = class MessagingApplicationModule {
};
exports.MessagingApplicationModule = MessagingApplicationModule;
exports.MessagingApplicationModule = MessagingApplicationModule = __decorate([
    (0, common_1.Module)({
        imports: [credit_facilities_application_module_1.CreditFacilitiesApplicationModule, categories_application_module_1.CategoriesApplicationModule],
        providers: [
            publish_products_event_use_case_1.PublishProductsEventUseCase,
            process_products_inbound_message_use_case_1.ProcessProductsInboundMessageUseCase,
            ingest_products_inbound_sqs_message_use_case_1.IngestProductsInboundSqsMessageUseCase,
        ],
        exports: [
            publish_products_event_use_case_1.PublishProductsEventUseCase,
            process_products_inbound_message_use_case_1.ProcessProductsInboundMessageUseCase,
            ingest_products_inbound_sqs_message_use_case_1.IngestProductsInboundSqsMessageUseCase,
        ],
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PublishProductsEventUseCase = void 0;
const common_1 = __webpack_require__(6);
const class_transformer_1 = __webpack_require__(34);
const class_validator_1 = __webpack_require__(35);
const outbound_message_publisher_port_1 = __webpack_require__(87);
const products_outbound_queue_url_port_1 = __webpack_require__(88);
const transversal_outbound_event_dto_1 = __webpack_require__(70);
const validation_failed_error_1 = __webpack_require__(89);
let PublishProductsEventUseCase = class PublishProductsEventUseCase {
    message_publisher;
    outbound_queue_url;
    constructor(message_publisher, outbound_queue_url) {
        this.message_publisher = message_publisher;
        this.outbound_queue_url = outbound_queue_url;
    }
    async execute(raw) {
        const dto = (0, class_transformer_1.plainToInstance)(transversal_outbound_event_dto_1.TransversalOutboundEventDto, raw, {
            enableImplicitConversion: true,
        });
        const errors = (0, class_validator_1.validateSync)(dto, { forbidUnknownValues: false });
        if (errors.length > 0) {
            const message = errors
                .map((e) => Object.values(e.constraints ?? {}).join(', '))
                .join('; ');
            throw new validation_failed_error_1.ValidationFailedError(`Evento inválido: ${message}`);
        }
        const queue_url = this.outbound_queue_url.get_outbound_queue_url();
        const body = JSON.stringify({
            correlation_id: dto.correlation_id,
            event_type: dto.event_type,
            payload: dto.payload,
            trace_id: dto.trace_id,
        });
        await this.message_publisher.publish({ queue_url, body });
    }
};
exports.PublishProductsEventUseCase = PublishProductsEventUseCase;
exports.PublishProductsEventUseCase = PublishProductsEventUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(outbound_message_publisher_port_1.OUTBOUND_MESSAGE_PUBLISHER_PORT)),
    __param(1, (0, common_1.Inject)(products_outbound_queue_url_port_1.PRODUCTS_OUTBOUND_QUEUE_URL_PORT)),
    __metadata("design:paramtypes", [Object, Object])
], PublishProductsEventUseCase);


/***/ }),
/* 87 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OUTBOUND_MESSAGE_PUBLISHER_PORT = void 0;
exports.OUTBOUND_MESSAGE_PUBLISHER_PORT = Symbol('OUTBOUND_MESSAGE_PUBLISHER_PORT');


/***/ }),
/* 88 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PRODUCTS_OUTBOUND_QUEUE_URL_PORT = void 0;
exports.PRODUCTS_OUTBOUND_QUEUE_URL_PORT = Symbol('PRODUCTS_OUTBOUND_QUEUE_URL_PORT');


/***/ }),
/* 89 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValidationFailedError = void 0;
class ValidationFailedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationFailedError';
    }
}
exports.ValidationFailedError = ValidationFailedError;


/***/ }),
/* 90 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreditFacilitiesApplicationModule = void 0;
const common_1 = __webpack_require__(6);
const create_credit_facility_use_case_1 = __webpack_require__(72);
const get_credit_facility_by_external_id_use_case_1 = __webpack_require__(91);
const list_credit_facilities_use_case_1 = __webpack_require__(93);
const update_credit_facility_by_external_id_use_case_1 = __webpack_require__(95);
const delete_credit_facility_by_external_id_use_case_1 = __webpack_require__(97);
let CreditFacilitiesApplicationModule = class CreditFacilitiesApplicationModule {
};
exports.CreditFacilitiesApplicationModule = CreditFacilitiesApplicationModule;
exports.CreditFacilitiesApplicationModule = CreditFacilitiesApplicationModule = __decorate([
    (0, common_1.Module)({
        providers: [
            create_credit_facility_use_case_1.CreateCreditFacilityUseCase,
            get_credit_facility_by_external_id_use_case_1.GetCreditFacilityByExternalIdUseCase,
            list_credit_facilities_use_case_1.ListCreditFacilitiesUseCase,
            update_credit_facility_by_external_id_use_case_1.UpdateCreditFacilityByExternalIdUseCase,
            delete_credit_facility_by_external_id_use_case_1.DeleteCreditFacilityByExternalIdUseCase,
        ],
        exports: [
            create_credit_facility_use_case_1.CreateCreditFacilityUseCase,
            get_credit_facility_by_external_id_use_case_1.GetCreditFacilityByExternalIdUseCase,
            list_credit_facilities_use_case_1.ListCreditFacilitiesUseCase,
            update_credit_facility_by_external_id_use_case_1.UpdateCreditFacilityByExternalIdUseCase,
            delete_credit_facility_by_external_id_use_case_1.DeleteCreditFacilityByExternalIdUseCase,
        ],
    })
], CreditFacilitiesApplicationModule);


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
exports.GetCreditFacilityByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(6);
const credit_facilities_tokens_1 = __webpack_require__(73);
const credit_facility_ports_1 = __webpack_require__(74);
const credit_facility_public_fields_builder_1 = __webpack_require__(75);
const get_credit_facility_by_external_id_response_1 = __webpack_require__(92);
let GetCreditFacilityByExternalIdUseCase = class GetCreditFacilityByExternalIdUseCase {
    credit_facility_repository;
    constructor(credit_facility_repository) {
        this.credit_facility_repository = credit_facility_repository;
    }
    async execute(req) {
        const row = await this.credit_facility_repository.find_by_external_id(req.external_id);
        if (row === null) {
            throw new common_1.NotFoundException('credit facility not found');
        }
        const fields = (0, credit_facility_public_fields_builder_1.build_credit_facility_public_fields)(row);
        return new get_credit_facility_by_external_id_response_1.GetCreditFacilityByExternalIdResponse(fields);
    }
};
exports.GetCreditFacilityByExternalIdUseCase = GetCreditFacilityByExternalIdUseCase;
exports.GetCreditFacilityByExternalIdUseCase = GetCreditFacilityByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(credit_facilities_tokens_1.CREDIT_FACILITY_REPOSITORY)),
    __metadata("design:paramtypes", [typeof (_a = typeof credit_facility_ports_1.CreditFacilityRepository !== "undefined" && credit_facility_ports_1.CreditFacilityRepository) === "function" ? _a : Object])
], GetCreditFacilityByExternalIdUseCase);


/***/ }),
/* 92 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetCreditFacilityByExternalIdResponse = void 0;
class GetCreditFacilityByExternalIdResponse {
    external_id;
    contract_id;
    state;
    total_limit;
    created_at;
    updated_at;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.GetCreditFacilityByExternalIdResponse = GetCreditFacilityByExternalIdResponse;


/***/ }),
/* 93 */
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
exports.ListCreditFacilitiesUseCase = void 0;
const common_1 = __webpack_require__(6);
const credit_facilities_tokens_1 = __webpack_require__(73);
const credit_facility_ports_1 = __webpack_require__(74);
const credit_facility_public_fields_builder_1 = __webpack_require__(75);
const list_credit_facilities_response_1 = __webpack_require__(94);
let ListCreditFacilitiesUseCase = class ListCreditFacilitiesUseCase {
    credit_facility_repository;
    constructor(credit_facility_repository) {
        this.credit_facility_repository = credit_facility_repository;
    }
    async execute() {
        const rows = await this.credit_facility_repository.find_all();
        return rows.map((r) => new list_credit_facilities_response_1.ListCreditFacilitiesItemResponse((0, credit_facility_public_fields_builder_1.build_credit_facility_public_fields)(r)));
    }
};
exports.ListCreditFacilitiesUseCase = ListCreditFacilitiesUseCase;
exports.ListCreditFacilitiesUseCase = ListCreditFacilitiesUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(credit_facilities_tokens_1.CREDIT_FACILITY_REPOSITORY)),
    __metadata("design:paramtypes", [typeof (_a = typeof credit_facility_ports_1.CreditFacilityRepository !== "undefined" && credit_facility_ports_1.CreditFacilityRepository) === "function" ? _a : Object])
], ListCreditFacilitiesUseCase);


/***/ }),
/* 94 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListCreditFacilitiesItemResponse = void 0;
class ListCreditFacilitiesItemResponse {
    external_id;
    contract_id;
    state;
    total_limit;
    created_at;
    updated_at;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.ListCreditFacilitiesItemResponse = ListCreditFacilitiesItemResponse;


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateCreditFacilityByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(6);
const credit_facilities_tokens_1 = __webpack_require__(73);
const credit_facility_ports_1 = __webpack_require__(74);
const credit_facility_public_fields_builder_1 = __webpack_require__(75);
const update_credit_facility_by_external_id_response_1 = __webpack_require__(96);
let UpdateCreditFacilityByExternalIdUseCase = class UpdateCreditFacilityByExternalIdUseCase {
    credit_facility_repository;
    constructor(credit_facility_repository) {
        this.credit_facility_repository = credit_facility_repository;
    }
    async execute(req) {
        const patch = {};
        if (req.contract_id !== undefined) {
            patch.contract_id = req.contract_id;
        }
        if (req.total_limit !== undefined) {
            patch.total_limit = req.total_limit;
        }
        if (req.state !== undefined) {
            patch.state = req.state;
        }
        const updated = await this.credit_facility_repository.update_by_external_id(req.external_id, patch);
        if (updated === null) {
            throw new common_1.NotFoundException('credit facility not found');
        }
        const fields = (0, credit_facility_public_fields_builder_1.build_credit_facility_public_fields)(updated);
        return new update_credit_facility_by_external_id_response_1.UpdateCreditFacilityByExternalIdResponse(fields);
    }
};
exports.UpdateCreditFacilityByExternalIdUseCase = UpdateCreditFacilityByExternalIdUseCase;
exports.UpdateCreditFacilityByExternalIdUseCase = UpdateCreditFacilityByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(credit_facilities_tokens_1.CREDIT_FACILITY_REPOSITORY)),
    __metadata("design:paramtypes", [typeof (_a = typeof credit_facility_ports_1.CreditFacilityRepository !== "undefined" && credit_facility_ports_1.CreditFacilityRepository) === "function" ? _a : Object])
], UpdateCreditFacilityByExternalIdUseCase);


/***/ }),
/* 96 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateCreditFacilityByExternalIdResponse = void 0;
class UpdateCreditFacilityByExternalIdResponse {
    external_id;
    contract_id;
    state;
    total_limit;
    created_at;
    updated_at;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.UpdateCreditFacilityByExternalIdResponse = UpdateCreditFacilityByExternalIdResponse;


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeleteCreditFacilityByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(6);
const credit_facilities_tokens_1 = __webpack_require__(73);
const credit_facility_ports_1 = __webpack_require__(74);
let DeleteCreditFacilityByExternalIdUseCase = class DeleteCreditFacilityByExternalIdUseCase {
    credit_facility_repository;
    constructor(credit_facility_repository) {
        this.credit_facility_repository = credit_facility_repository;
    }
    async execute(req) {
        const ok = await this.credit_facility_repository.delete_by_external_id(req.external_id);
        if (!ok) {
            throw new common_1.NotFoundException('credit facility not found');
        }
    }
};
exports.DeleteCreditFacilityByExternalIdUseCase = DeleteCreditFacilityByExternalIdUseCase;
exports.DeleteCreditFacilityByExternalIdUseCase = DeleteCreditFacilityByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(credit_facilities_tokens_1.CREDIT_FACILITY_REPOSITORY)),
    __metadata("design:paramtypes", [typeof (_a = typeof credit_facility_ports_1.CreditFacilityRepository !== "undefined" && credit_facility_ports_1.CreditFacilityRepository) === "function" ? _a : Object])
], DeleteCreditFacilityByExternalIdUseCase);


/***/ }),
/* 98 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesApplicationModule = void 0;
const common_1 = __webpack_require__(6);
const create_category_use_case_1 = __webpack_require__(78);
const get_category_by_external_id_use_case_1 = __webpack_require__(99);
const list_categories_use_case_1 = __webpack_require__(101);
const update_category_by_external_id_use_case_1 = __webpack_require__(103);
const delete_category_by_external_id_use_case_1 = __webpack_require__(105);
let CategoriesApplicationModule = class CategoriesApplicationModule {
};
exports.CategoriesApplicationModule = CategoriesApplicationModule;
exports.CategoriesApplicationModule = CategoriesApplicationModule = __decorate([
    (0, common_1.Module)({
        providers: [
            create_category_use_case_1.CreateCategoryUseCase,
            get_category_by_external_id_use_case_1.GetCategoryByExternalIdUseCase,
            list_categories_use_case_1.ListCategoriesUseCase,
            update_category_by_external_id_use_case_1.UpdateCategoryByExternalIdUseCase,
            delete_category_by_external_id_use_case_1.DeleteCategoryByExternalIdUseCase,
        ],
        exports: [
            create_category_use_case_1.CreateCategoryUseCase,
            get_category_by_external_id_use_case_1.GetCategoryByExternalIdUseCase,
            list_categories_use_case_1.ListCategoriesUseCase,
            update_category_by_external_id_use_case_1.UpdateCategoryByExternalIdUseCase,
            delete_category_by_external_id_use_case_1.DeleteCategoryByExternalIdUseCase,
        ],
    })
], CategoriesApplicationModule);


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetCategoryByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(6);
const categories_tokens_1 = __webpack_require__(79);
const products_reference_lookup_port_1 = __webpack_require__(80);
const category_ports_1 = __webpack_require__(81);
const category_public_fields_builder_1 = __webpack_require__(82);
const get_category_by_external_id_response_1 = __webpack_require__(100);
let GetCategoryByExternalIdUseCase = class GetCategoryByExternalIdUseCase {
    category_repository;
    reference_lookup;
    constructor(category_repository, reference_lookup) {
        this.category_repository = category_repository;
        this.reference_lookup = reference_lookup;
    }
    async execute(req) {
        const row = await this.category_repository.find_by_external_id(req.external_id);
        if (row === null) {
            throw new common_1.NotFoundException('category not found');
        }
        const fields = await (0, category_public_fields_builder_1.build_category_public_fields)(row, this.reference_lookup);
        return new get_category_by_external_id_response_1.GetCategoryByExternalIdResponse(fields);
    }
};
exports.GetCategoryByExternalIdUseCase = GetCategoryByExternalIdUseCase;
exports.GetCategoryByExternalIdUseCase = GetCategoryByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(categories_tokens_1.CATEGORY_REPOSITORY)),
    __param(1, (0, common_1.Inject)(products_reference_lookup_port_1.PRODUCTS_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [typeof (_a = typeof category_ports_1.CategoryRepository !== "undefined" && category_ports_1.CategoryRepository) === "function" ? _a : Object, Object])
], GetCategoryByExternalIdUseCase);


/***/ }),
/* 100 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetCategoryByExternalIdResponse = void 0;
class GetCategoryByExternalIdResponse {
    external_id;
    credit_facility_external_id;
    partner_external_id;
    name;
    discount_percentage;
    interest_rate;
    disbursement_fee_percent;
    minimum_disbursement_fee;
    delay_days;
    term_days;
    state;
    created_at;
    updated_at;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.GetCategoryByExternalIdResponse = GetCategoryByExternalIdResponse;


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListCategoriesUseCase = void 0;
const common_1 = __webpack_require__(6);
const categories_tokens_1 = __webpack_require__(79);
const products_reference_lookup_port_1 = __webpack_require__(80);
const category_ports_1 = __webpack_require__(81);
const category_public_fields_builder_1 = __webpack_require__(82);
const list_categories_response_1 = __webpack_require__(102);
let ListCategoriesUseCase = class ListCategoriesUseCase {
    category_repository;
    reference_lookup;
    constructor(category_repository, reference_lookup) {
        this.category_repository = category_repository;
        this.reference_lookup = reference_lookup;
    }
    async execute(req) {
        let credit_facility_id;
        if (req.credit_facility_external_id !== undefined) {
            const id = await this.reference_lookup.get_credit_facility_internal_id_by_external_id(req.credit_facility_external_id);
            if (id === null) {
                throw new common_1.NotFoundException('credit facility not found');
            }
            credit_facility_id = id;
        }
        const rows = await this.category_repository.find_all(credit_facility_id !== undefined ? { credit_facility_id } : undefined);
        const out = [];
        for (const row of rows) {
            const fields = await (0, category_public_fields_builder_1.build_category_public_fields)(row, this.reference_lookup);
            out.push(new list_categories_response_1.ListCategoriesItemResponse(fields));
        }
        return out;
    }
};
exports.ListCategoriesUseCase = ListCategoriesUseCase;
exports.ListCategoriesUseCase = ListCategoriesUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(categories_tokens_1.CATEGORY_REPOSITORY)),
    __param(1, (0, common_1.Inject)(products_reference_lookup_port_1.PRODUCTS_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [typeof (_a = typeof category_ports_1.CategoryRepository !== "undefined" && category_ports_1.CategoryRepository) === "function" ? _a : Object, Object])
], ListCategoriesUseCase);


/***/ }),
/* 102 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListCategoriesItemResponse = void 0;
class ListCategoriesItemResponse {
    external_id;
    credit_facility_external_id;
    partner_external_id;
    name;
    discount_percentage;
    interest_rate;
    disbursement_fee_percent;
    minimum_disbursement_fee;
    delay_days;
    term_days;
    state;
    created_at;
    updated_at;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.ListCategoriesItemResponse = ListCategoriesItemResponse;


/***/ }),
/* 103 */
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
exports.UpdateCategoryByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(6);
const categories_tokens_1 = __webpack_require__(79);
const products_reference_lookup_port_1 = __webpack_require__(80);
const category_ports_1 = __webpack_require__(81);
const category_public_fields_builder_1 = __webpack_require__(82);
const update_category_by_external_id_response_1 = __webpack_require__(104);
let UpdateCategoryByExternalIdUseCase = class UpdateCategoryByExternalIdUseCase {
    category_repository;
    reference_lookup;
    constructor(category_repository, reference_lookup) {
        this.category_repository = category_repository;
        this.reference_lookup = reference_lookup;
    }
    async execute(req) {
        const patch = {};
        if (req.credit_facility_external_id !== undefined) {
            const id = await this.reference_lookup.get_credit_facility_internal_id_by_external_id(req.credit_facility_external_id);
            if (id === null) {
                throw new common_1.NotFoundException('credit facility not found');
            }
            patch.credit_facility_id = id;
        }
        if (req.partner_id !== undefined) {
            patch.partner_id = req.partner_id;
        }
        if (req.name !== undefined) {
            patch.name = req.name;
        }
        if (req.discount_percentage !== undefined) {
            patch.discount_percentage = req.discount_percentage;
        }
        if (req.interest_rate !== undefined) {
            patch.interest_rate = req.interest_rate;
        }
        if (req.disbursement_fee_percent !== undefined) {
            patch.disbursement_fee_percent = req.disbursement_fee_percent;
        }
        if (req.minimum_disbursement_fee !== undefined) {
            patch.minimum_disbursement_fee = req.minimum_disbursement_fee;
        }
        if (req.delay_days !== undefined) {
            patch.delay_days = req.delay_days;
        }
        if (req.term_days !== undefined) {
            patch.term_days = req.term_days;
        }
        if (req.state !== undefined) {
            patch.state = req.state;
        }
        const updated = await this.category_repository.update_by_external_id(req.external_id, patch);
        if (updated === null) {
            throw new common_1.NotFoundException('category not found');
        }
        const fields = await (0, category_public_fields_builder_1.build_category_public_fields)(updated, this.reference_lookup);
        return new update_category_by_external_id_response_1.UpdateCategoryByExternalIdResponse(fields);
    }
};
exports.UpdateCategoryByExternalIdUseCase = UpdateCategoryByExternalIdUseCase;
exports.UpdateCategoryByExternalIdUseCase = UpdateCategoryByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(categories_tokens_1.CATEGORY_REPOSITORY)),
    __param(1, (0, common_1.Inject)(products_reference_lookup_port_1.PRODUCTS_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [typeof (_a = typeof category_ports_1.CategoryRepository !== "undefined" && category_ports_1.CategoryRepository) === "function" ? _a : Object, Object])
], UpdateCategoryByExternalIdUseCase);


/***/ }),
/* 104 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateCategoryByExternalIdResponse = void 0;
class UpdateCategoryByExternalIdResponse {
    external_id;
    credit_facility_external_id;
    partner_external_id;
    name;
    discount_percentage;
    interest_rate;
    disbursement_fee_percent;
    minimum_disbursement_fee;
    delay_days;
    term_days;
    state;
    created_at;
    updated_at;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.UpdateCategoryByExternalIdResponse = UpdateCategoryByExternalIdResponse;


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeleteCategoryByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(6);
const categories_tokens_1 = __webpack_require__(79);
const category_ports_1 = __webpack_require__(81);
let DeleteCategoryByExternalIdUseCase = class DeleteCategoryByExternalIdUseCase {
    category_repository;
    constructor(category_repository) {
        this.category_repository = category_repository;
    }
    async execute(req) {
        const ok = await this.category_repository.delete_by_external_id(req.external_id);
        if (!ok) {
            throw new common_1.NotFoundException('category not found');
        }
    }
};
exports.DeleteCategoryByExternalIdUseCase = DeleteCategoryByExternalIdUseCase;
exports.DeleteCategoryByExternalIdUseCase = DeleteCategoryByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(categories_tokens_1.CATEGORY_REPOSITORY)),
    __metadata("design:paramtypes", [typeof (_a = typeof category_ports_1.CategoryRepository !== "undefined" && category_ports_1.CategoryRepository) === "function" ? _a : Object])
], DeleteCategoryByExternalIdUseCase);


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TypeormCategoryRepository = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(53);
const typeorm_2 = __webpack_require__(13);
const products_data_1 = __webpack_require__(11);
const category_mapper_1 = __webpack_require__(107);
const CATEGORY_SELECT = {
    id: true,
    externalId: true,
    creditFacilityId: true,
    partnerId: true,
    name: true,
    discountPercentage: true,
    interestRate: true,
    disbursementFeePercent: true,
    minimumDisbursementFee: true,
    delayDays: true,
    termDays: true,
    state: true,
    createdAt: true,
    updatedAt: true,
};
let TypeormCategoryRepository = class TypeormCategoryRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async find_by_external_id(external_id) {
        const row = await this.repo.findOne({
            where: { externalId: external_id },
            select: CATEGORY_SELECT,
        });
        return row ? category_mapper_1.CategoryMapper.to_domain(row) : null;
    }
    async find_all(filter) {
        const rows = await this.repo.find({
            where: filter?.credit_facility_id
                ? { creditFacilityId: filter.credit_facility_id }
                : {},
            select: CATEGORY_SELECT,
            order: { id: 'ASC' },
        });
        return rows.map((r) => category_mapper_1.CategoryMapper.to_domain(r));
    }
    async create(props) {
        const rows = await this.repo.query(`INSERT INTO products_schema.categories (
        external_id, credit_facility_id, partner_id, name,
        discount_percentage, interest_rate, disbursement_fee_percent,
        minimum_disbursement_fee, delay_days, term_days, state
      ) VALUES (
        gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10::products_schema.credit_facility_state
      )
      RETURNING id, external_id, created_at, updated_at, credit_facility_id, partner_id, name,
        discount_percentage, interest_rate, disbursement_fee_percent, minimum_disbursement_fee,
        delay_days, term_days, state`, [
            props.credit_facility_id,
            props.partner_id,
            props.name,
            props.discount_percentage,
            props.interest_rate,
            props.disbursement_fee_percent,
            props.minimum_disbursement_fee,
            props.delay_days,
            props.term_days,
            props.state,
        ]);
        return category_mapper_1.CategoryMapper.from_raw_row(rows[0]);
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
        if (patch.credit_facility_id !== undefined) {
            add('credit_facility_id', patch.credit_facility_id);
        }
        if (patch.partner_id !== undefined) {
            add('partner_id', patch.partner_id);
        }
        if (patch.name !== undefined) {
            add('name', patch.name);
        }
        if (patch.discount_percentage !== undefined) {
            add('discount_percentage', patch.discount_percentage);
        }
        if (patch.interest_rate !== undefined) {
            add('interest_rate', patch.interest_rate);
        }
        if (patch.disbursement_fee_percent !== undefined) {
            add('disbursement_fee_percent', patch.disbursement_fee_percent);
        }
        if (patch.minimum_disbursement_fee !== undefined) {
            add('minimum_disbursement_fee', patch.minimum_disbursement_fee);
        }
        if (patch.delay_days !== undefined) {
            add('delay_days', patch.delay_days);
        }
        if (patch.term_days !== undefined) {
            add('term_days', patch.term_days);
        }
        if (patch.state !== undefined) {
            add('state', patch.state);
        }
        if (columns.length === 0) {
            return this.find_by_external_id(external_id);
        }
        columns.push(`"updated_at" = now()`);
        values.push(existing.id);
        await this.repo.query(`UPDATE products_schema.categories SET ${columns.join(', ')} WHERE id = $${i}`, values);
        return this.find_by_external_id(external_id);
    }
    async delete_by_external_id(external_id) {
        const result = await this.repo.delete({ externalId: external_id });
        return (result.affected ?? 0) > 0;
    }
};
exports.TypeormCategoryRepository = TypeormCategoryRepository;
exports.TypeormCategoryRepository = TypeormCategoryRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(products_data_1.CategoryEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], TypeormCategoryRepository);


/***/ }),
/* 107 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoryMapper = void 0;
const category_models_1 = __webpack_require__(108);
const shared_1 = __webpack_require__(14);
class CategoryMapper {
    static to_domain(row) {
        return new category_models_1.Category(row.id, row.externalId, row.creditFacilityId, row.partnerId ?? null, row.name, row.discountPercentage, row.interestRate, row.disbursementFeePercent ?? null, row.minimumDisbursementFee ?? null, row.delayDays, row.termDays, row.state, row.createdAt, row.updatedAt);
    }
    static from_raw_row(row) {
        const state_raw = String(row['state'] ?? shared_1.Statuses.ACTIVE);
        const state = state_raw === shared_1.Statuses.INACTIVE
            ? shared_1.Statuses.INACTIVE
            : shared_1.Statuses.ACTIVE;
        return new category_models_1.Category(Number(row['id']), String(row['external_id']), Number(row['credit_facility_id']), row['partner_id'] === null || row['partner_id'] === undefined
            ? null
            : Number(row['partner_id']), String(row['name']), String(row['discount_percentage']), String(row['interest_rate']), row['disbursement_fee_percent'] === null ||
            row['disbursement_fee_percent'] === undefined
            ? null
            : String(row['disbursement_fee_percent']), row['minimum_disbursement_fee'] === null ||
            row['minimum_disbursement_fee'] === undefined
            ? null
            : String(row['minimum_disbursement_fee']), Number(row['delay_days']), Number(row['term_days']), state, new Date(String(row['created_at'])), new Date(String(row['updated_at'])));
    }
}
exports.CategoryMapper = CategoryMapper;


/***/ }),
/* 108 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Category = void 0;
class Category {
    internal_id;
    external_id;
    credit_facility_id;
    partner_id;
    name;
    discount_percentage;
    interest_rate;
    disbursement_fee_percent;
    minimum_disbursement_fee;
    delay_days;
    term_days;
    state;
    created_at;
    updated_at;
    constructor(internal_id, external_id, credit_facility_id, partner_id, name, discount_percentage, interest_rate, disbursement_fee_percent, minimum_disbursement_fee, delay_days, term_days, state, created_at, updated_at) {
        this.internal_id = internal_id;
        this.external_id = external_id;
        this.credit_facility_id = credit_facility_id;
        this.partner_id = partner_id;
        this.name = name;
        this.discount_percentage = discount_percentage;
        this.interest_rate = interest_rate;
        this.disbursement_fee_percent = disbursement_fee_percent;
        this.minimum_disbursement_fee = minimum_disbursement_fee;
        this.delay_days = delay_days;
        this.term_days = term_days;
        this.state = state;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
exports.Category = Category;


/***/ }),
/* 109 */
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
exports.TypeormCreditFacilityRepository = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(53);
const typeorm_2 = __webpack_require__(13);
const products_data_1 = __webpack_require__(11);
const credit_facility_mapper_1 = __webpack_require__(110);
const CREDIT_FACILITY_SELECT = {
    id: true,
    externalId: true,
    contractId: true,
    state: true,
    totalLimit: true,
    createdAt: true,
    updatedAt: true,
};
let TypeormCreditFacilityRepository = class TypeormCreditFacilityRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async find_by_external_id(external_id) {
        const row = await this.repo.findOne({
            where: { externalId: external_id },
            select: CREDIT_FACILITY_SELECT,
        });
        return row ? credit_facility_mapper_1.CreditFacilityMapper.to_domain(row) : null;
    }
    async find_all() {
        const rows = await this.repo.find({
            select: CREDIT_FACILITY_SELECT,
            order: { id: 'ASC' },
        });
        return rows.map((r) => credit_facility_mapper_1.CreditFacilityMapper.to_domain(r));
    }
    async create(props) {
        const rows = await this.repo.query(`INSERT INTO products_schema.credit_facilities (
        external_id, contract_id, state, total_limit
      ) VALUES (
        COALESCE($1::uuid, gen_random_uuid()), $2, $3::products_schema.credit_facility_state, $4
      )
      RETURNING id, external_id, created_at, updated_at, contract_id, state, total_limit`, [
            props.external_id ?? null,
            props.contract_id,
            props.state,
            props.total_limit,
        ]);
        return credit_facility_mapper_1.CreditFacilityMapper.from_raw_row(rows[0]);
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
        if (patch.contract_id !== undefined) {
            add('contract_id', patch.contract_id);
        }
        if (patch.state !== undefined) {
            add('state', patch.state);
        }
        if (patch.total_limit !== undefined) {
            add('total_limit', patch.total_limit);
        }
        if (columns.length === 0) {
            return this.find_by_external_id(external_id);
        }
        columns.push(`"updated_at" = now()`);
        values.push(existing.id);
        await this.repo.query(`UPDATE products_schema.credit_facilities SET ${columns.join(', ')} WHERE id = $${i}`, values);
        return this.find_by_external_id(external_id);
    }
    async delete_by_external_id(external_id) {
        const result = await this.repo.delete({ externalId: external_id });
        return (result.affected ?? 0) > 0;
    }
};
exports.TypeormCreditFacilityRepository = TypeormCreditFacilityRepository;
exports.TypeormCreditFacilityRepository = TypeormCreditFacilityRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(products_data_1.CreditFacilityEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], TypeormCreditFacilityRepository);


/***/ }),
/* 110 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreditFacilityMapper = void 0;
const credit_facility_models_1 = __webpack_require__(111);
const shared_1 = __webpack_require__(14);
function contract_join_to_external_id(ref) {
    if (ref === null || ref === undefined) {
        return null;
    }
    return ref.externalId ?? null;
}
class CreditFacilityMapper {
    static to_domain(row) {
        return new credit_facility_models_1.CreditFacility(row.id, row.externalId, contract_join_to_external_id(row.contractId), row.state, row.totalLimit, row.createdAt, row.updatedAt);
    }
    static from_raw_row(row) {
        const state_raw = String(row['state'] ?? shared_1.Statuses.ACTIVE);
        const state = state_raw === shared_1.Statuses.INACTIVE
            ? shared_1.Statuses.INACTIVE
            : shared_1.Statuses.ACTIVE;
        return new credit_facility_models_1.CreditFacility(Number(row['id']), String(row['external_id']), row['contract_id'] === null || row['contract_id'] === undefined
            ? null
            : String(row['contract_id']), state, String(row['total_limit']), new Date(String(row['created_at'])), new Date(String(row['updated_at'])));
    }
}
exports.CreditFacilityMapper = CreditFacilityMapper;


/***/ }),
/* 111 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreditFacility = void 0;
class CreditFacility {
    internal_id;
    external_id;
    contract_id;
    state;
    total_limit;
    created_at;
    updated_at;
    constructor(internal_id, external_id, contract_id, state, total_limit, created_at, updated_at) {
        this.internal_id = internal_id;
        this.external_id = external_id;
        this.contract_id = contract_id;
        this.state = state;
        this.total_limit = total_limit;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
exports.CreditFacility = CreditFacility;


/***/ }),
/* 112 */
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
exports.TypeormProductsReferenceLookupAdapter = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(53);
const typeorm_2 = __webpack_require__(13);
const products_data_1 = __webpack_require__(11);
let TypeormProductsReferenceLookupAdapter = class TypeormProductsReferenceLookupAdapter {
    credit_facilities;
    data_source;
    constructor(credit_facilities, data_source) {
        this.credit_facilities = credit_facilities;
        this.data_source = data_source;
    }
    async get_credit_facility_internal_id_by_external_id(external_id) {
        const row = await this.credit_facilities.findOne({
            where: { externalId: external_id },
            select: { id: true },
        });
        return row?.id ?? null;
    }
    async get_credit_facility_external_id_by_internal_id(internal_id) {
        const row = await this.credit_facilities.findOne({
            where: { id: internal_id },
            select: { externalId: true },
        });
        return row?.externalId ?? null;
    }
    async get_partner_external_id_by_internal_id(internal_id) {
        const rows = await this.data_source.query(`SELECT external_id::text AS external_id
         FROM suppliers_schema.partners
         WHERE id = $1
         LIMIT 1`, [internal_id]);
        const v = rows[0]?.external_id;
        return v === undefined || v === null || v.length === 0 ? null : v;
    }
};
exports.TypeormProductsReferenceLookupAdapter = TypeormProductsReferenceLookupAdapter;
exports.TypeormProductsReferenceLookupAdapter = TypeormProductsReferenceLookupAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(products_data_1.CreditFacilityEntity)),
    __param(1, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _b : Object])
], TypeormProductsReferenceLookupAdapter);


/***/ }),
/* 113 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesModule = void 0;
const common_1 = __webpack_require__(6);
const categories_application_module_1 = __webpack_require__(98);
let CategoriesModule = class CategoriesModule {
};
exports.CategoriesModule = CategoriesModule;
exports.CategoriesModule = CategoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [categories_application_module_1.CategoriesApplicationModule],
        exports: [categories_application_module_1.CategoriesApplicationModule],
    })
], CategoriesModule);


/***/ }),
/* 114 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreditFacilitiesModule = void 0;
const common_1 = __webpack_require__(6);
const credit_facilities_application_module_1 = __webpack_require__(90);
let CreditFacilitiesModule = class CreditFacilitiesModule {
};
exports.CreditFacilitiesModule = CreditFacilitiesModule;
exports.CreditFacilitiesModule = CreditFacilitiesModule = __decorate([
    (0, common_1.Module)({
        imports: [credit_facilities_application_module_1.CreditFacilitiesApplicationModule],
        exports: [credit_facilities_application_module_1.CreditFacilitiesApplicationModule],
    })
], CreditFacilitiesModule);


/***/ }),
/* 115 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(8);
exports["default"] = (0, config_1.registerAs)('config', () => {
    return {
        environment: process.env.APP_ENV || 'development',
        port: process.env.PRODUCTS_MS_PORT || 8083,
    };
});


/***/ }),
/* 116 */
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
exports.get_products_sqs_config_from_env = get_products_sqs_config_from_env;
const config_1 = __webpack_require__(8);
const class_transformer_1 = __webpack_require__(34);
const class_validator_1 = __webpack_require__(35);
const PRODUCTS_SQS_OUTBOUND_QUEUE_URL_DEFAULT = 'http://127.0.0.1:4566/000000000000/products-ms-outbound-placeholder';
class ProductsSqsEnv {
    aws_region = 'us-east-1';
    aws_sqs_endpoint;
    products_sqs_outbound_queue_url;
    products_sqs_inbound_queue_url;
    products_sqs_wait_time_seconds = 20;
    products_sqs_max_number_of_messages = 10;
    products_sqs_visibility_timeout_seconds = 30;
    products_sqs_delete_on_validation_error = false;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], ProductsSqsEnv.prototype, "aws_region", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value === '' || value === undefined ? undefined : value)),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductsSqsEnv.prototype, "aws_sqs_endpoint", void 0);
__decorate([
    (0, class_validator_1.IsUrl)({ require_tld: false }),
    __metadata("design:type", String)
], ProductsSqsEnv.prototype, "products_sqs_outbound_queue_url", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value === '' || value === undefined ? undefined : value)),
    (0, class_validator_1.IsUrl)({ require_tld: false }),
    __metadata("design:type", String)
], ProductsSqsEnv.prototype, "products_sqs_inbound_queue_url", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(20),
    __metadata("design:type", Object)
], ProductsSqsEnv.prototype, "products_sqs_wait_time_seconds", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(10),
    __metadata("design:type", Object)
], ProductsSqsEnv.prototype, "products_sqs_max_number_of_messages", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(43200),
    __metadata("design:type", Object)
], ProductsSqsEnv.prototype, "products_sqs_visibility_timeout_seconds", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Object)
], ProductsSqsEnv.prototype, "products_sqs_delete_on_validation_error", void 0);
function validate_products_sqs_env(config) {
    const validated = (0, class_transformer_1.plainToInstance)(ProductsSqsEnv, config, { enableImplicitConversion: true });
    const errors = (0, class_validator_1.validateSync)(validated, { skipMissingProperties: false });
    if (errors.length > 0) {
        const message = errors.map((e) => Object.values(e.constraints ?? {}).join(', ')).join('; ');
        throw new Error(`Configuración SQS inválida: ${message}`);
    }
    return validated;
}
function get_products_sqs_config_from_env() {
    const outbound_raw = process.env.PRODUCTS_SQS_OUTBOUND_QUEUE_URL?.trim();
    const env = validate_products_sqs_env({
        aws_region: process.env.AWS_REGION ?? 'us-east-1',
        aws_sqs_endpoint: process.env.AWS_SQS_ENDPOINT,
        products_sqs_outbound_queue_url: outbound_raw && outbound_raw.length > 0
            ? outbound_raw
            : PRODUCTS_SQS_OUTBOUND_QUEUE_URL_DEFAULT,
        products_sqs_inbound_queue_url: process.env.PRODUCTS_SQS_INBOUND_QUEUE_URL,
        products_sqs_wait_time_seconds: process.env.PRODUCTS_SQS_WAIT_TIME_SECONDS ?? 20,
        products_sqs_max_number_of_messages: process.env.PRODUCTS_SQS_MAX_NUMBER_OF_MESSAGES ?? 10,
        products_sqs_visibility_timeout_seconds: process.env.PRODUCTS_SQS_VISIBILITY_TIMEOUT_SECONDS ?? 30,
        products_sqs_delete_on_validation_error: process.env.PRODUCTS_SQS_DELETE_ON_VALIDATION_ERROR === 'true',
    });
    return {
        region: env.aws_region,
        endpoint: env.aws_sqs_endpoint,
        outbound_queue_url: env.products_sqs_outbound_queue_url,
        inbound_queue_url: env.products_sqs_inbound_queue_url,
        wait_time_seconds: env.products_sqs_wait_time_seconds,
        max_number_of_messages: env.products_sqs_max_number_of_messages,
        visibility_timeout_seconds: env.products_sqs_visibility_timeout_seconds,
        delete_on_validation_error: env.products_sqs_delete_on_validation_error,
    };
}
exports.sqs_config = (0, config_1.registerAs)('sqs', () => get_products_sqs_config_from_env());


/***/ }),
/* 117 */
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
const health_response_dto_1 = __webpack_require__(118);
let appController = class appController {
    health() {
        return { status: 'ok', service: 'products-ms' };
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
/* 118 */
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
    (0, swagger_1.ApiProperty)({ example: 'products-ms' }),
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
        .setTitle('Products MS')
        .setDescription('HTTP y mensajería SQS del microservicio Products')
        .setVersion('1.0')
        .addServer('/')
        .build();
    const swagger_document = swagger_1.SwaggerModule.createDocument(app, swagger_config);
    swagger_1.SwaggerModule.setup('docs', app, swagger_document, {
        jsonDocumentUrl: 'docs/json',
    });
    const config_service = app.get(config_1.ConfigService);
    const port = Number(config_service.get('config.port') ?? 8083);
    await app.listen(port);
    const logger = new common_1.Logger('Bootstrap');
    logger.log(`Products MS (HTTP + SQS) escuchando en puerto ${port}`);
    logger.log(`Swagger UI: http://localhost:${port}/docs`);
}
void bootstrap();

})();

/******/ })()
;