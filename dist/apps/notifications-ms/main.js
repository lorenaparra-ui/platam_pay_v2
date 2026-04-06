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
const app_config_1 = __importDefault(__webpack_require__(50));
const notifications_providers_config_1 = __importDefault(__webpack_require__(51));
const sqs_config_1 = __webpack_require__(52);
const app_controller_1 = __webpack_require__(53);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [app_config_1.default, sqs_config_1.sqs_config, notifications_providers_config_1.default],
                envFilePath: dotenv_config_1.MONOREPO_ENV_PATH,
            }),
            infrastructure_module_1.InfrastructureModule,
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
const sqs_module_1 = __webpack_require__(12);
let InfrastructureModule = class InfrastructureModule {
};
exports.InfrastructureModule = InfrastructureModule;
exports.InfrastructureModule = InfrastructureModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [sqs_module_1.SqsModule],
        exports: [sqs_module_1.SqsModule],
    })
], InfrastructureModule);


/***/ }),
/* 12 */
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
const shared_1 = __webpack_require__(13);
const messaging_application_module_1 = __webpack_require__(36);
const notification_inbound_sqs_consumer_1 = __webpack_require__(49);
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
                    notifications_inbound_queue_url: config_service.get('sqs.inbound_queue_url'),
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
            notification_inbound_sqs_consumer_1.NotificationInboundSqsConsumer,
        ],
        exports: [shared_1.SQS_CLIENT, shared_1.QUEUES_CONFIG],
    })
], SqsModule);


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
exports.SQS_CLIENT = exports.QUEUES_CONFIG = void 0;
var sqs_tokens_1 = __webpack_require__(14);
Object.defineProperty(exports, "QUEUES_CONFIG", ({ enumerable: true, get: function () { return sqs_tokens_1.QUEUES_CONFIG; } }));
Object.defineProperty(exports, "SQS_CLIENT", ({ enumerable: true, get: function () { return sqs_tokens_1.SQS_CLIENT; } }));
__exportStar(__webpack_require__(15), exports);
__exportStar(__webpack_require__(17), exports);
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
__exportStar(__webpack_require__(31), exports);
__exportStar(__webpack_require__(32), exports);
__exportStar(__webpack_require__(35), exports);


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QUEUES_CONFIG = exports.SQS_CLIENT = void 0;
exports.SQS_CLIENT = Symbol('SQS_CLIENT');
exports.QUEUES_CONFIG = Symbol('QUEUES_CONFIG');


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.create_sqs_client = create_sqs_client;
const client_sqs_1 = __webpack_require__(16);
function create_sqs_client(options) {
    const config = {
        region: options.region,
        ...(options.endpoint ? { endpoint: options.endpoint } : {}),
        ...(options.credentials ? { credentials: options.credentials } : {}),
    };
    return new client_sqs_1.SQSClient(config);
}


/***/ }),
/* 16 */
/***/ ((module) => {

module.exports = require("@aws-sdk/client-sqs");

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 18 */
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
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseConsumer = exports.BaseSqsConsumer = void 0;
const client_sqs_1 = __webpack_require__(16);
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
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BasePublisher = exports.BaseSqsPublisher = void 0;
const client_sqs_1 = __webpack_require__(16);
const sqs_publish_failed_error_1 = __webpack_require__(18);
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
/* 21 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Statuses = void 0;
var Statuses;
(function (Statuses) {
    Statuses["ACTIVE"] = "active";
    Statuses["INACTIVE"] = "inactive";
})(Statuses || (exports.Statuses = Statuses = {}));


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 24 */
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
/* 25 */
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
/* 26 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 28 */
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
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.new_uuid = new_uuid;
const crypto_1 = __webpack_require__(30);
function new_uuid() {
    return (0, crypto_1.randomUUID)();
}


/***/ }),
/* 30 */
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),
/* 31 */
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
/* 32 */
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
const class_transformer_1 = __webpack_require__(33);
const class_validator_1 = __webpack_require__(34);
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
/* 33 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 34 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 35 */
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
/* 36 */
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
const notifications_application_module_1 = __webpack_require__(37);
const ingest_notification_sqs_message_use_case_1 = __webpack_require__(47);
let MessagingApplicationModule = class MessagingApplicationModule {
};
exports.MessagingApplicationModule = MessagingApplicationModule;
exports.MessagingApplicationModule = MessagingApplicationModule = __decorate([
    (0, common_1.Module)({
        imports: [notifications_application_module_1.NotificationsApplicationModule],
        providers: [ingest_notification_sqs_message_use_case_1.IngestNotificationSqsMessageUseCase],
        exports: [ingest_notification_sqs_message_use_case_1.IngestNotificationSqsMessageUseCase],
    })
], MessagingApplicationModule);


/***/ }),
/* 37 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationsApplicationModule = void 0;
const common_1 = __webpack_require__(6);
const notifications_infrastructure_module_1 = __webpack_require__(38);
const dispatch_notification_use_case_1 = __webpack_require__(45);
let NotificationsApplicationModule = class NotificationsApplicationModule {
};
exports.NotificationsApplicationModule = NotificationsApplicationModule;
exports.NotificationsApplicationModule = NotificationsApplicationModule = __decorate([
    (0, common_1.Module)({
        imports: [notifications_infrastructure_module_1.NotificationsInfrastructureModule],
        providers: [dispatch_notification_use_case_1.DispatchNotificationUseCase],
        exports: [dispatch_notification_use_case_1.DispatchNotificationUseCase],
    })
], NotificationsApplicationModule);


/***/ }),
/* 38 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationsInfrastructureModule = void 0;
const common_1 = __webpack_require__(6);
const config_1 = __webpack_require__(8);
const email_sender_port_1 = __webpack_require__(39);
const twilio_messaging_port_1 = __webpack_require__(40);
const resend_email_adapter_1 = __webpack_require__(41);
const twilio_messaging_adapter_1 = __webpack_require__(43);
let NotificationsInfrastructureModule = class NotificationsInfrastructureModule {
};
exports.NotificationsInfrastructureModule = NotificationsInfrastructureModule;
exports.NotificationsInfrastructureModule = NotificationsInfrastructureModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [
            resend_email_adapter_1.ResendEmailAdapter,
            {
                provide: email_sender_port_1.EMAIL_SENDER_PORT,
                useExisting: resend_email_adapter_1.ResendEmailAdapter,
            },
            twilio_messaging_adapter_1.TwilioMessagingAdapter,
            {
                provide: twilio_messaging_port_1.TWILIO_MESSAGING_PORT,
                useExisting: twilio_messaging_adapter_1.TwilioMessagingAdapter,
            },
        ],
        exports: [email_sender_port_1.EMAIL_SENDER_PORT, twilio_messaging_port_1.TWILIO_MESSAGING_PORT],
    })
], NotificationsInfrastructureModule);


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EMAIL_SENDER_PORT = void 0;
exports.EMAIL_SENDER_PORT = Symbol('EMAIL_SENDER_PORT');


/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TWILIO_MESSAGING_PORT = void 0;
exports.TWILIO_MESSAGING_PORT = Symbol('TWILIO_MESSAGING_PORT');


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
var ResendEmailAdapter_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResendEmailAdapter = void 0;
const common_1 = __webpack_require__(6);
const config_1 = __webpack_require__(8);
const resend_1 = __webpack_require__(42);
let ResendEmailAdapter = ResendEmailAdapter_1 = class ResendEmailAdapter {
    config_service;
    logger = new common_1.Logger(ResendEmailAdapter_1.name);
    constructor(config_service) {
        this.config_service = config_service;
    }
    async send(request) {
        const api_key = this.config_service.get('notifications.resend_api_key') ?? '';
        if (!api_key) {
            throw new Error('RESEND_API_KEY no configurada');
        }
        const default_from = this.config_service.get('notifications.email_from_default') ?? '';
        const from = (request.from_override ?? default_from).trim();
        if (!from) {
            throw new Error('NOTIFICATIONS_EMAIL_FROM no configurada y sin fromOverride en el mensaje');
        }
        const resend = new resend_1.Resend(api_key);
        const html = request.html?.trim() ?? '';
        const text = request.text?.trim() ?? '';
        const { error } = html.length > 0
            ? await resend.emails.send({
                from,
                to: [...request.to],
                subject: request.subject,
                html,
                ...(text.length > 0 ? { text } : {}),
            })
            : await resend.emails.send({
                from,
                to: [...request.to],
                subject: request.subject,
                text,
            });
        if (error) {
            this.logger.error(`[Resend][step=send_failed][name=${error.name ?? 'unknown'}]`);
            throw new Error(error.message);
        }
    }
};
exports.ResendEmailAdapter = ResendEmailAdapter;
exports.ResendEmailAdapter = ResendEmailAdapter = ResendEmailAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], ResendEmailAdapter);


/***/ }),
/* 42 */
/***/ ((module) => {

module.exports = require("resend");

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var TwilioMessagingAdapter_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TwilioMessagingAdapter = void 0;
const common_1 = __webpack_require__(6);
const config_1 = __webpack_require__(8);
const twilio_1 = __importDefault(__webpack_require__(44));
let TwilioMessagingAdapter = TwilioMessagingAdapter_1 = class TwilioMessagingAdapter {
    config_service;
    logger = new common_1.Logger(TwilioMessagingAdapter_1.name);
    constructor(config_service) {
        this.config_service = config_service;
    }
    async send_sms(request) {
        const from = (this.config_service.get('notifications.twilio_from_sms') ?? '').trim();
        if (!from) {
            throw new Error('TWILIO_FROM_SMS no configurado');
        }
        const client = this.create_client();
        try {
            await client.messages.create({
                body: request.body,
                from,
                to: request.to_e164,
            });
        }
        catch (err) {
            this.log_twilio_error('sms', err);
            throw err instanceof Error ? err : new Error(String(err));
        }
    }
    async send_whatsapp(request) {
        const from_raw = (this.config_service.get('notifications.twilio_from_whatsapp') ?? '').trim();
        if (!from_raw) {
            throw new Error('TWILIO_FROM_WHATSAPP no configurado');
        }
        const from = from_raw.startsWith('whatsapp:') ? from_raw : `whatsapp:${from_raw}`;
        const to = request.to_e164.startsWith('whatsapp:')
            ? request.to_e164
            : `whatsapp:${request.to_e164}`;
        const client = this.create_client();
        try {
            await client.messages.create({
                body: request.body,
                from,
                to,
            });
        }
        catch (err) {
            this.log_twilio_error('whatsapp', err);
            throw err instanceof Error ? err : new Error(String(err));
        }
    }
    create_client() {
        const sid = (this.config_service.get('notifications.twilio_account_sid') ?? '').trim();
        const token = (this.config_service.get('notifications.twilio_auth_token') ?? '').trim();
        if (!sid || !token) {
            throw new Error('Twilio no configurado (TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN)');
        }
        return (0, twilio_1.default)(sid, token);
    }
    log_twilio_error(channel, err) {
        const code = typeof err === 'object' &&
            err !== null &&
            'code' in err &&
            (typeof err.code === 'number' ||
                typeof err.code === 'string')
            ? String(err.code)
            : 'n/a';
        const status = typeof err === 'object' &&
            err !== null &&
            'status' in err &&
            typeof err.status === 'number'
            ? String(err.status)
            : 'n/a';
        this.logger.error(`[Twilio][channel=${channel}][step=send_failed][code=${code}][status=${status}]`);
    }
};
exports.TwilioMessagingAdapter = TwilioMessagingAdapter;
exports.TwilioMessagingAdapter = TwilioMessagingAdapter = TwilioMessagingAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], TwilioMessagingAdapter);


/***/ }),
/* 44 */
/***/ ((module) => {

module.exports = require("twilio");

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var DispatchNotificationUseCase_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DispatchNotificationUseCase = void 0;
const common_1 = __webpack_require__(6);
const notification_channel_enum_1 = __webpack_require__(46);
const email_sender_port_1 = __webpack_require__(39);
const twilio_messaging_port_1 = __webpack_require__(40);
let DispatchNotificationUseCase = DispatchNotificationUseCase_1 = class DispatchNotificationUseCase {
    email_sender;
    twilio;
    logger = new common_1.Logger(DispatchNotificationUseCase_1.name);
    constructor(email_sender, twilio) {
        this.email_sender = email_sender;
        this.twilio = twilio;
    }
    async execute(command) {
        const { correlation_id, channel } = command;
        switch (channel) {
            case notification_channel_enum_1.NotificationChannel.email: {
                const p = command.payload;
                await this.email_sender.send({
                    to: p.to,
                    subject: p.subject,
                    html: p.html,
                    text: p.text,
                    from_override: p.from_override,
                });
                this.logger.log(`[Notify][correlationId=${correlation_id}][channel=email][step=sent][recipients=${p.to.length}]`);
                return;
            }
            case notification_channel_enum_1.NotificationChannel.sms:
                await this.twilio.send_sms({
                    to_e164: command.payload.to_e164,
                    body: command.payload.body,
                });
                this.logger.log(`[Notify][correlationId=${correlation_id}][channel=sms][step=sent]`);
                return;
            case notification_channel_enum_1.NotificationChannel.whatsapp:
                await this.twilio.send_whatsapp({
                    to_e164: command.payload.to_e164,
                    body: command.payload.body,
                });
                this.logger.log(`[Notify][correlationId=${correlation_id}][channel=whatsapp][step=sent]`);
                return;
            default: {
                const _exhaustive = channel;
                void _exhaustive;
                throw new Error(`Canal no soportado: ${String(channel)}`);
            }
        }
    }
};
exports.DispatchNotificationUseCase = DispatchNotificationUseCase;
exports.DispatchNotificationUseCase = DispatchNotificationUseCase = DispatchNotificationUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(email_sender_port_1.EMAIL_SENDER_PORT)),
    __param(1, (0, common_1.Inject)(twilio_messaging_port_1.TWILIO_MESSAGING_PORT)),
    __metadata("design:paramtypes", [Object, Object])
], DispatchNotificationUseCase);


/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationChannel = void 0;
var NotificationChannel;
(function (NotificationChannel) {
    NotificationChannel["email"] = "email";
    NotificationChannel["sms"] = "sms";
    NotificationChannel["whatsapp"] = "whatsapp";
})(NotificationChannel || (exports.NotificationChannel = NotificationChannel = {}));


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
var IngestNotificationSqsMessageUseCase_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IngestNotificationSqsMessageUseCase = void 0;
const common_1 = __webpack_require__(6);
const class_transformer_1 = __webpack_require__(33);
const class_validator_1 = __webpack_require__(34);
const dispatch_notification_use_case_1 = __webpack_require__(45);
const notification_channel_enum_1 = __webpack_require__(46);
const send_notification_payload_dto_1 = __webpack_require__(48);
let IngestNotificationSqsMessageUseCase = IngestNotificationSqsMessageUseCase_1 = class IngestNotificationSqsMessageUseCase {
    dispatch;
    logger = new common_1.Logger(IngestNotificationSqsMessageUseCase_1.name);
    constructor(dispatch) {
        this.dispatch = dispatch;
    }
    async execute(command) {
        let parsed;
        try {
            parsed = JSON.parse(command.body);
        }
        catch {
            this.logger.warn('[Notify][step=parse] cuerpo no es JSON válido.');
            return command.delete_on_validation_error;
        }
        const correlation_for_log = this.try_correlation_id(parsed) ?? 'unknown';
        const envelope = (0, class_transformer_1.plainToInstance)(send_notification_payload_dto_1.SendNotificationInboundEnvelopeDto, parsed, {
            enableImplicitConversion: true,
        });
        const env_errors = (0, class_validator_1.validateSync)(envelope, { forbidUnknownValues: false });
        if (env_errors.length > 0) {
            const message = env_errors
                .map((e) => Object.values(e.constraints ?? {}).join(', '))
                .join('; ');
            this.logger.warn(`[Notify][correlationId=${correlation_for_log}][step=envelope_validation] ${message}`);
            return command.delete_on_validation_error;
        }
        const payload_result = this.validate_payload(envelope.channel, envelope.payload);
        if (!payload_result.ok) {
            this.logger.warn(`[Notify][correlationId=${envelope.correlation_id}][step=payload_validation] ${payload_result.error}`);
            return command.delete_on_validation_error;
        }
        try {
            await this.dispatch.execute({
                correlation_id: envelope.correlation_id,
                channel: envelope.channel,
                payload: payload_result.payload,
            });
            return true;
        }
        catch (err) {
            const text = err instanceof Error ? err.message : String(err);
            this.logger.error(`[Notify][correlationId=${envelope.correlation_id}][step=dispatch_failed] ${text}`);
            return false;
        }
    }
    validate_payload(channel, raw) {
        switch (channel) {
            case notification_channel_enum_1.NotificationChannel.email: {
                const dto = (0, class_transformer_1.plainToInstance)(send_notification_payload_dto_1.EmailNotificationPayloadDto, raw, {
                    enableImplicitConversion: true,
                });
                const errors = (0, class_validator_1.validateSync)(dto, { forbidUnknownValues: false });
                if (errors.length > 0) {
                    return {
                        ok: false,
                        error: errors.map((e) => Object.values(e.constraints ?? {}).join(', ')).join('; '),
                    };
                }
                const html = dto.html?.trim();
                const text = dto.text?.trim();
                if (!html && !text) {
                    return { ok: false, error: 'email requiere html o text no vacío' };
                }
                return { ok: true, payload: dto };
            }
            case notification_channel_enum_1.NotificationChannel.sms: {
                const dto = (0, class_transformer_1.plainToInstance)(send_notification_payload_dto_1.SmsNotificationPayloadDto, raw, {
                    enableImplicitConversion: true,
                });
                const errors = (0, class_validator_1.validateSync)(dto, { forbidUnknownValues: false });
                if (errors.length > 0) {
                    return {
                        ok: false,
                        error: errors.map((e) => Object.values(e.constraints ?? {}).join(', ')).join('; '),
                    };
                }
                return { ok: true, payload: dto };
            }
            case notification_channel_enum_1.NotificationChannel.whatsapp: {
                const dto = (0, class_transformer_1.plainToInstance)(send_notification_payload_dto_1.WhatsappNotificationPayloadDto, raw, {
                    enableImplicitConversion: true,
                });
                const errors = (0, class_validator_1.validateSync)(dto, { forbidUnknownValues: false });
                if (errors.length > 0) {
                    return {
                        ok: false,
                        error: errors.map((e) => Object.values(e.constraints ?? {}).join(', ')).join('; '),
                    };
                }
                return { ok: true, payload: dto };
            }
            default: {
                const _exhaustive = channel;
                void _exhaustive;
                return { ok: false, error: 'canal desconocido' };
            }
        }
    }
    try_correlation_id(parsed) {
        if (typeof parsed !== 'object' || parsed === null) {
            return undefined;
        }
        const o = parsed;
        if (typeof o.correlationId === 'string') {
            return o.correlationId;
        }
        if (typeof o.correlation_id === 'string') {
            return o.correlation_id;
        }
        return undefined;
    }
};
exports.IngestNotificationSqsMessageUseCase = IngestNotificationSqsMessageUseCase;
exports.IngestNotificationSqsMessageUseCase = IngestNotificationSqsMessageUseCase = IngestNotificationSqsMessageUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof dispatch_notification_use_case_1.DispatchNotificationUseCase !== "undefined" && dispatch_notification_use_case_1.DispatchNotificationUseCase) === "function" ? _a : Object])
], IngestNotificationSqsMessageUseCase);


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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SendNotificationInboundEnvelopeDto = exports.WhatsappNotificationPayloadDto = exports.SmsNotificationPayloadDto = exports.EmailNotificationPayloadDto = void 0;
const class_transformer_1 = __webpack_require__(33);
const class_validator_1 = __webpack_require__(34);
const notification_channel_enum_1 = __webpack_require__(46);
class EmailNotificationPayloadDto {
    to;
    subject;
    html;
    text;
    from_override;
}
exports.EmailNotificationPayloadDto = EmailNotificationPayloadDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.IsEmail)({}, { each: true }),
    __metadata("design:type", Array)
], EmailNotificationPayloadDto.prototype, "to", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(998),
    __metadata("design:type", String)
], EmailNotificationPayloadDto.prototype, "subject", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmailNotificationPayloadDto.prototype, "html", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmailNotificationPayloadDto.prototype, "text", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ obj }) => {
        if (typeof obj !== 'object' || obj === null)
            return undefined;
        const r = obj;
        return r.fromOverride ?? r.from_override;
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], EmailNotificationPayloadDto.prototype, "from_override", void 0);
class SmsNotificationPayloadDto {
    to_e164;
    body;
}
exports.SmsNotificationPayloadDto = SmsNotificationPayloadDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ obj }) => {
        if (typeof obj !== 'object' || obj === null)
            return undefined;
        const r = obj;
        return r.toE164 ?? r.to_e164;
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\+[1-9]\d{1,14}$/, {
        message: 'to_e164 debe ser E.164 (ej. +573001234567)',
    }),
    __metadata("design:type", String)
], SmsNotificationPayloadDto.prototype, "to_e164", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(1600),
    __metadata("design:type", String)
], SmsNotificationPayloadDto.prototype, "body", void 0);
class WhatsappNotificationPayloadDto {
    to_e164;
    body;
}
exports.WhatsappNotificationPayloadDto = WhatsappNotificationPayloadDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ obj }) => {
        if (typeof obj !== 'object' || obj === null)
            return undefined;
        const r = obj;
        return r.toE164 ?? r.to_e164;
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\+[1-9]\d{1,14}$/, {
        message: 'to_e164 debe ser E.164 (ej. +573001234567)',
    }),
    __metadata("design:type", String)
], WhatsappNotificationPayloadDto.prototype, "to_e164", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(4096),
    __metadata("design:type", String)
], WhatsappNotificationPayloadDto.prototype, "body", void 0);
class SendNotificationInboundEnvelopeDto {
    event;
    version;
    correlation_id;
    channel;
    payload;
}
exports.SendNotificationInboundEnvelopeDto = SendNotificationInboundEnvelopeDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsIn)(['send-notification']),
    __metadata("design:type", String)
], SendNotificationInboundEnvelopeDto.prototype, "event", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsIn)(['1.0']),
    __metadata("design:type", String)
], SendNotificationInboundEnvelopeDto.prototype, "version", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ obj }) => {
        if (typeof obj !== 'object' || obj === null)
            return undefined;
        const r = obj;
        if (typeof r.correlationId === 'string')
            return r.correlationId;
        if (typeof r.correlation_id === 'string')
            return r.correlation_id;
        return undefined;
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], SendNotificationInboundEnvelopeDto.prototype, "correlation_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsEnum)(notification_channel_enum_1.NotificationChannel),
    __metadata("design:type", typeof (_a = typeof notification_channel_enum_1.NotificationChannel !== "undefined" && notification_channel_enum_1.NotificationChannel) === "function" ? _a : Object)
], SendNotificationInboundEnvelopeDto.prototype, "channel", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", typeof (_b = typeof Record !== "undefined" && Record) === "function" ? _b : Object)
], SendNotificationInboundEnvelopeDto.prototype, "payload", void 0);


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var NotificationInboundSqsConsumer_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationInboundSqsConsumer = void 0;
const common_1 = __webpack_require__(6);
const config_1 = __webpack_require__(8);
const ingest_notification_sqs_message_use_case_1 = __webpack_require__(47);
const shared_1 = __webpack_require__(13);
let NotificationInboundSqsConsumer = NotificationInboundSqsConsumer_1 = class NotificationInboundSqsConsumer extends shared_1.BaseConsumer {
    queues_config;
    config_service;
    ingest;
    nest_logger = new common_1.Logger(NotificationInboundSqsConsumer_1.name);
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
        return this.queues_config.notifications_inbound_queue_url;
    }
    get_poll_settings() {
        return {
            wait_time_seconds: this.config_service.getOrThrow('sqs.wait_time_seconds'),
            max_number_of_messages: this.config_service.getOrThrow('sqs.max_number_of_messages'),
            visibility_timeout_seconds: this.config_service.getOrThrow('sqs.visibility_timeout_seconds'),
        };
    }
    inactive_reason_message() {
        return 'Cola notifications SQS no configurada (NOTIFICATIONS_SQS_INBOUND_QUEUE_URL); worker inactivo.';
    }
    async handle(message) {
        const delete_on_validation_error = this.config_service.get('sqs.delete_on_validation_error') ?? false;
        this.nest_logger.log(`[Notify][step=consumer_handle][messageId=${message.message_id ?? 'n/a'}]`);
        return this.ingest.execute({
            body: message.body,
            delete_on_validation_error,
        });
    }
};
exports.NotificationInboundSqsConsumer = NotificationInboundSqsConsumer;
exports.NotificationInboundSqsConsumer = NotificationInboundSqsConsumer = NotificationInboundSqsConsumer_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(shared_1.SQS_CLIENT)),
    __param(1, (0, common_1.Inject)(shared_1.QUEUES_CONFIG)),
    __metadata("design:paramtypes", [Object, Object, typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof ingest_notification_sqs_message_use_case_1.IngestNotificationSqsMessageUseCase !== "undefined" && ingest_notification_sqs_message_use_case_1.IngestNotificationSqsMessageUseCase) === "function" ? _b : Object])
], NotificationInboundSqsConsumer);


/***/ }),
/* 50 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(8);
exports["default"] = (0, config_1.registerAs)('config', () => ({
    environment: process.env.APP_ENV || 'development',
    port: process.env.NOTIFICATIONS_MS_PORT || 8085,
}));


/***/ }),
/* 51 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(8);
exports["default"] = (0, config_1.registerAs)('notifications', () => ({
    resend_api_key: (process.env.RESEND_API_KEY ?? '').trim(),
    email_from_default: (process.env.NOTIFICATIONS_EMAIL_FROM ?? '').trim(),
    twilio_account_sid: (process.env.TWILIO_ACCOUNT_SID ?? '').trim(),
    twilio_auth_token: (process.env.TWILIO_AUTH_TOKEN ?? '').trim(),
    twilio_from_sms: (process.env.TWILIO_FROM_SMS ?? '').trim(),
    twilio_from_whatsapp: (process.env.TWILIO_FROM_WHATSAPP ?? '').trim(),
}));


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sqs_config = void 0;
exports.get_notifications_sqs_config_from_env = get_notifications_sqs_config_from_env;
const config_1 = __webpack_require__(8);
const class_transformer_1 = __webpack_require__(33);
const class_validator_1 = __webpack_require__(34);
const NOTIFICATIONS_SQS_OUTBOUND_QUEUE_URL_DEFAULT = 'http://127.0.0.1:4566/000000000000/notifications-ms-outbound-placeholder';
class NotificationsSqsEnv {
    aws_region = 'us-east-1';
    aws_sqs_endpoint;
    notifications_sqs_outbound_queue_url;
    notifications_sqs_inbound_queue_url;
    notifications_sqs_wait_time_seconds = 20;
    notifications_sqs_max_number_of_messages = 10;
    notifications_sqs_visibility_timeout_seconds = 30;
    notifications_sqs_delete_on_validation_error = false;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], NotificationsSqsEnv.prototype, "aws_region", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value === '' || value === undefined ? undefined : value)),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NotificationsSqsEnv.prototype, "aws_sqs_endpoint", void 0);
__decorate([
    (0, class_validator_1.IsUrl)({ require_tld: false }),
    __metadata("design:type", String)
], NotificationsSqsEnv.prototype, "notifications_sqs_outbound_queue_url", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value === '' || value === undefined ? undefined : value)),
    (0, class_validator_1.IsUrl)({ require_tld: false }),
    __metadata("design:type", String)
], NotificationsSqsEnv.prototype, "notifications_sqs_inbound_queue_url", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(20),
    __metadata("design:type", Object)
], NotificationsSqsEnv.prototype, "notifications_sqs_wait_time_seconds", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(10),
    __metadata("design:type", Object)
], NotificationsSqsEnv.prototype, "notifications_sqs_max_number_of_messages", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(43200),
    __metadata("design:type", Object)
], NotificationsSqsEnv.prototype, "notifications_sqs_visibility_timeout_seconds", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Object)
], NotificationsSqsEnv.prototype, "notifications_sqs_delete_on_validation_error", void 0);
function validate_notifications_sqs_env(config) {
    const validated = (0, class_transformer_1.plainToInstance)(NotificationsSqsEnv, config, {
        enableImplicitConversion: true,
    });
    const errors = (0, class_validator_1.validateSync)(validated, { skipMissingProperties: false });
    if (errors.length > 0) {
        const message = errors.map((e) => Object.values(e.constraints ?? {}).join(', ')).join('; ');
        throw new Error(`Configuración SQS inválida (notifications-ms): ${message}`);
    }
    return validated;
}
function get_notifications_sqs_config_from_env() {
    const outbound_raw = process.env.NOTIFICATIONS_SQS_OUTBOUND_QUEUE_URL?.trim();
    const env = validate_notifications_sqs_env({
        aws_region: process.env.AWS_REGION ?? 'us-east-1',
        aws_sqs_endpoint: process.env.AWS_SQS_ENDPOINT,
        notifications_sqs_outbound_queue_url: outbound_raw && outbound_raw.length > 0
            ? outbound_raw
            : NOTIFICATIONS_SQS_OUTBOUND_QUEUE_URL_DEFAULT,
        notifications_sqs_inbound_queue_url: process.env.NOTIFICATIONS_SQS_INBOUND_QUEUE_URL,
        notifications_sqs_wait_time_seconds: process.env.NOTIFICATIONS_SQS_WAIT_TIME_SECONDS ?? 20,
        notifications_sqs_max_number_of_messages: process.env.NOTIFICATIONS_SQS_MAX_NUMBER_OF_MESSAGES ?? 10,
        notifications_sqs_visibility_timeout_seconds: process.env.NOTIFICATIONS_SQS_VISIBILITY_TIMEOUT_SECONDS ?? 30,
        notifications_sqs_delete_on_validation_error: process.env.NOTIFICATIONS_SQS_DELETE_ON_VALIDATION_ERROR === 'true',
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
        endpoint: env.aws_sqs_endpoint,
        outbound_queue_url: env.notifications_sqs_outbound_queue_url,
        inbound_queue_url: trim_url(env.notifications_sqs_inbound_queue_url),
        wait_time_seconds: env.notifications_sqs_wait_time_seconds,
        max_number_of_messages: env.notifications_sqs_max_number_of_messages,
        visibility_timeout_seconds: env.notifications_sqs_visibility_timeout_seconds,
        delete_on_validation_error: env.notifications_sqs_delete_on_validation_error,
    };
}
exports.sqs_config = (0, config_1.registerAs)('sqs', () => get_notifications_sqs_config_from_env());


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.appController = void 0;
const common_1 = __webpack_require__(6);
const swagger_1 = __webpack_require__(9);
const health_response_dto_1 = __webpack_require__(54);
let appController = class appController {
    health() {
        return { status: 'ok', service: 'notifications-ms' };
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
    (0, swagger_1.ApiProperty)({ example: 'notifications-ms' }),
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
        .setTitle('Notifications MS')
        .setDescription('Notificaciones por correo (Resend), SMS y WhatsApp (Twilio); entrada asíncrona vía SQS')
        .setVersion('1.0')
        .addServer('/')
        .build();
    const swagger_document = swagger_1.SwaggerModule.createDocument(app, swagger_config);
    swagger_1.SwaggerModule.setup('docs', app, swagger_document, {
        jsonDocumentUrl: 'docs/json',
    });
    const config_service = app.get(config_1.ConfigService);
    const port = Number(config_service.get('config.port') ?? 8085);
    await app.listen(port);
    const logger = new common_1.Logger('Bootstrap');
    logger.log(`Notifications MS (HTTP + SQS) escuchando en puerto ${port}`);
    logger.log(`Swagger UI: http://localhost:${port}/docs`);
}
void bootstrap();

})();

/******/ })()
;