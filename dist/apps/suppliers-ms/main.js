/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/suppliers-ms/src/app.controller.ts"
/*!*************************************************!*\
  !*** ./apps/suppliers-ms/src/app.controller.ts ***!
  \*************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const health_response_dto_1 = __webpack_require__(/*! @common/dto/health-response.dto */ "./apps/suppliers-ms/src/common/dto/health-response.dto.ts");
let appController = class appController {
    health() {
        return { status: 'ok', service: 'suppliers-ms' };
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


/***/ },

/***/ "./apps/suppliers-ms/src/app.module.ts"
/*!*********************************************!*\
  !*** ./apps/suppliers-ms/src/app.module.ts ***!
  \*********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const dotenv_config_1 = __webpack_require__(/*! ./config/dotenv.config */ "./apps/suppliers-ms/src/config/dotenv.config.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const infrastructure_module_1 = __webpack_require__(/*! @infrastructure/infrastructure.module */ "./apps/suppliers-ms/src/infrastructure/infrastructure.module.ts");
const businesses_module_1 = __webpack_require__(/*! @modules/businesses/businesses.module */ "./apps/suppliers-ms/src/modules/businesses/businesses.module.ts");
const partners_module_1 = __webpack_require__(/*! @modules/partners/partners.module */ "./apps/suppliers-ms/src/modules/partners/partners.module.ts");
const suppliers_module_1 = __webpack_require__(/*! @modules/suppliers/suppliers.module */ "./apps/suppliers-ms/src/modules/suppliers/suppliers.module.ts");
const bank_accounts_module_1 = __webpack_require__(/*! @modules/bank-accounts/bank-accounts.module */ "./apps/suppliers-ms/src/modules/bank-accounts/bank-accounts.module.ts");
const sales_representatives_module_1 = __webpack_require__(/*! @modules/sales-representatives/sales-representatives.module */ "./apps/suppliers-ms/src/modules/sales-representatives/sales-representatives.module.ts");
const app_config_1 = __importDefault(__webpack_require__(/*! ./config/app.config */ "./apps/suppliers-ms/src/config/app.config.ts"));
const sqs_config_1 = __webpack_require__(/*! ./config/sqs.config */ "./apps/suppliers-ms/src/config/sqs.config.ts");
const app_controller_1 = __webpack_require__(/*! ./app.controller */ "./apps/suppliers-ms/src/app.controller.ts");
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
            businesses_module_1.BusinessesModule,
            partners_module_1.PartnersModule,
            suppliers_module_1.SuppliersModule,
            bank_accounts_module_1.BankAccountsModule,
            sales_representatives_module_1.SalesRepresentativesModule,
        ],
        controllers: [app_controller_1.appController],
    })
], AppModule);


/***/ },

/***/ "./apps/suppliers-ms/src/common/dto/health-response.dto.ts"
/*!*****************************************************************!*\
  !*** ./apps/suppliers-ms/src/common/dto/health-response.dto.ts ***!
  \*****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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
    (0, swagger_1.ApiProperty)({ example: 'suppliers-ms' }),
    __metadata("design:type", String)
], HealthResponseDto.prototype, "service", void 0);


/***/ },

/***/ "./apps/suppliers-ms/src/common/ports/suppliers-reference-lookup.port.ts"
/*!*******************************************************************************!*\
  !*** ./apps/suppliers-ms/src/common/ports/suppliers-reference-lookup.port.ts ***!
  \*******************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SUPPLIERS_REFERENCE_LOOKUP = void 0;
exports.SUPPLIERS_REFERENCE_LOOKUP = Symbol('SUPPLIERS_REFERENCE_LOOKUP');


/***/ },

/***/ "./apps/suppliers-ms/src/config/app.config.ts"
/*!****************************************************!*\
  !*** ./apps/suppliers-ms/src/config/app.config.ts ***!
  \****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
exports["default"] = (0, config_1.registerAs)('config', () => {
    return {
        partner_onboarding: {
            default_status_external_id: (process.env.PARTNER_ONBOARDING_DEFAULT_STATUS_EXTERNAL_ID ?? '').trim(),
            default_country_code: (process.env.PARTNER_ONBOARDING_DEFAULT_COUNTRY_CODE ?? 'CO').trim(),
            sqs_user_poll_timeout_ms: Number(process.env.PARTNER_ONBOARDING_SQS_POLL_TIMEOUT_MS ?? 60000),
            sqs_user_poll_interval_ms: Number(process.env.PARTNER_ONBOARDING_SQS_POLL_INTERVAL_MS ?? 300),
        },
        environment: process.env.APP_ENV || 'development',
        port: process.env.SUPPLIERS_MS_PORT || 8081,
        rues_api_base_url: process.env.RUES_API_BASE_URL || 'https://ollama-rues.5n921h.easypanel.host',
        cognito: {
            region: process.env.COGNITO_REGION || 'us-east-2',
            userPoolId: process.env.COGNITO_USER_POOL_ID || 'us-east-2_Nx4vYRz63',
            clientId: process.env.COGNITO_CLIENT_ID || 'k2fca9hhf0he0tadlhfcj7ntj',
            clientSecret: process.env.COGNITO_CLIENT_SECRET || 'v8i20s8mrur0hm84mftdkmjsisml1kvmv5oe43smbti3qi38p4n',
        },
        mfa: {
            issuer: process.env.MFA_ISSUER || 'Platam Pay',
        },
        storage: {
            s3: {
                region: process.env.AWS_S3_REGION || 'us-east-1',
                bucket: process.env.AWS_S3_BUCKET ?? '',
                endpoint: process.env.AWS_S3_ENDPOINT,
                force_path_style: process.env.AWS_S3_FORCE_PATH_STYLE === 'true',
                access_key_id: process.env.AWS_ACCESS_KEY_ID,
                secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
            },
        },
    };
});


/***/ },

/***/ "./apps/suppliers-ms/src/config/dotenv.config.ts"
/*!*******************************************************!*\
  !*** ./apps/suppliers-ms/src/config/dotenv.config.ts ***!
  \*******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const path = __importStar(__webpack_require__(/*! path */ "path"));
const fs = __importStar(__webpack_require__(/*! fs */ "fs"));
const dotenv = __importStar(__webpack_require__(/*! dotenv */ "dotenv"));
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


/***/ },

/***/ "./apps/suppliers-ms/src/config/sqs.config.ts"
/*!****************************************************!*\
  !*** ./apps/suppliers-ms/src/config/sqs.config.ts ***!
  \****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.get_sqs_config_from_env = get_sqs_config_from_env;
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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


/***/ },

/***/ "./apps/suppliers-ms/src/config/typeorm.config.ts"
/*!********************************************************!*\
  !*** ./apps/suppliers-ms/src/config/typeorm.config.ts ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ./dotenv.config */ "./apps/suppliers-ms/src/config/dotenv.config.ts");
const suppliers_data_1 = __webpack_require__(/*! @app/suppliers-data */ "./libs/suppliers-data/src/index.ts");
const transversal_data_1 = __webpack_require__(/*! @app/transversal-data */ "./libs/transversal-data/src/index.ts");
const TypeormConfig = {
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USERNAME,
    port: Number(process.env.TYPEORM_PORT ?? 5432),
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    entities: [
        ...suppliers_data_1.SUPPLIERS_DATA_ENTITIES,
        transversal_data_1.PersonEntity,
        transversal_data_1.RoleEntity,
        transversal_data_1.UserEntity,
        transversal_data_1.CityEntity,
        transversal_data_1.PartnerCreateUserSqsIdempotencyEntity,
    ],
    synchronize: false,
    migrationsRun: false,
    migrationsTableName: "typeorm_migrations",
};
exports["default"] = TypeormConfig;


/***/ },

/***/ "./apps/suppliers-ms/src/infrastructure/database/adapters/partner-saga-compensation.adapter.ts"
/*!*****************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/infrastructure/database/adapters/partner-saga-compensation.adapter.ts ***!
  \*****************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
var PartnerSagaCompensationAdapter_1;
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PartnerSagaCompensationAdapter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const suppliers_data_1 = __webpack_require__(/*! @app/suppliers-data */ "./libs/suppliers-data/src/index.ts");
let PartnerSagaCompensationAdapter = PartnerSagaCompensationAdapter_1 = class PartnerSagaCompensationAdapter {
    data_source;
    partner_repo;
    supplier_repo;
    business_repo;
    bank_account_repo;
    logger = new common_1.Logger(PartnerSagaCompensationAdapter_1.name);
    constructor(data_source, partner_repo, supplier_repo, business_repo, bank_account_repo) {
        this.data_source = data_source;
        this.partner_repo = partner_repo;
        this.supplier_repo = supplier_repo;
        this.business_repo = business_repo;
        this.bank_account_repo = bank_account_repo;
    }
    async delete_credit_facility(credit_facility_external_id) {
        try {
            await this.data_source.query(`DELETE FROM products_schema.credit_facilities WHERE external_id = $1::uuid`, [credit_facility_external_id]);
            this.logger.warn(`[Compensación] credit_facility eliminada external_id=${credit_facility_external_id}`);
        }
        catch (err) {
            this.logger.error(`[Compensación] Error al eliminar credit_facility external_id=${credit_facility_external_id}: ${String(err)}`);
        }
    }
    async delete_partner(partner_external_id) {
        try {
            await this.partner_repo.delete({ externalId: partner_external_id });
            this.logger.warn(`[Compensación] partner eliminado external_id=${partner_external_id}`);
        }
        catch (err) {
            this.logger.error(`[Compensación] Error al eliminar partner external_id=${partner_external_id}: ${String(err)}`);
        }
    }
    async delete_supplier(supplier_external_id) {
        try {
            await this.supplier_repo.delete({ externalId: supplier_external_id });
            this.logger.warn(`[Compensación] supplier eliminado external_id=${supplier_external_id}`);
        }
        catch (err) {
            this.logger.error(`[Compensación] Error al eliminar supplier external_id=${supplier_external_id}: ${String(err)}`);
        }
    }
    async delete_business(business_external_id) {
        try {
            await this.business_repo.delete({ externalId: business_external_id });
            this.logger.warn(`[Compensación] business eliminado external_id=${business_external_id}`);
        }
        catch (err) {
            this.logger.error(`[Compensación] Error al eliminar business external_id=${business_external_id}: ${String(err)}`);
        }
    }
    async delete_bank_account(bank_account_external_id) {
        try {
            await this.bank_account_repo.delete({ externalId: bank_account_external_id });
            this.logger.warn(`[Compensación] bank_account eliminado external_id=${bank_account_external_id}`);
        }
        catch (err) {
            this.logger.error(`[Compensación] Error al eliminar bank_account external_id=${bank_account_external_id}: ${String(err)}`);
        }
    }
};
exports.PartnerSagaCompensationAdapter = PartnerSagaCompensationAdapter;
exports.PartnerSagaCompensationAdapter = PartnerSagaCompensationAdapter = PartnerSagaCompensationAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __param(1, (0, typeorm_1.InjectRepository)(suppliers_data_1.PartnersEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(suppliers_data_1.SupplierEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(suppliers_data_1.BusinessEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(suppliers_data_1.BankAccountEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _e : Object])
], PartnerSagaCompensationAdapter);


/***/ },

/***/ "./apps/suppliers-ms/src/infrastructure/database/adapters/sql-products-credit-facility-sync.adapter.ts"
/*!*************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/infrastructure/database/adapters/sql-products-credit-facility-sync.adapter.ts ***!
  \*************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
var SqlProductsCreditFacilitySyncAdapter_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SqlProductsCreditFacilitySyncAdapter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
let SqlProductsCreditFacilitySyncAdapter = SqlProductsCreditFacilitySyncAdapter_1 = class SqlProductsCreditFacilitySyncAdapter {
    data_source;
    logger = new common_1.Logger(SqlProductsCreditFacilitySyncAdapter_1.name);
    constructor(data_source) {
        this.data_source = data_source;
    }
    async create_credit_facility(input) {
        const existing = (await this.data_source.query(`SELECT id FROM products_schema.credit_facilities WHERE external_id = $1::uuid LIMIT 1`, [input.credit_facility_external_id]));
        if (existing.length > 0) {
            this.logger.debug(`credit_facility ya existe external_id=${input.credit_facility_external_id}`);
            return { internal_id: existing[0].id };
        }
        let contract_internal_id = null;
        if (input.contract_id !== null && input.contract_id !== undefined) {
            const contract_rows = await this.data_source.query(`SELECT id FROM products_schema.contracts WHERE external_id = $1::uuid LIMIT 1`, [input.contract_id]);
            if (contract_rows.length === 0) {
                throw new Error(`Contrato no encontrado: external_id=${input.contract_id}`);
            }
            contract_internal_id = Number(contract_rows[0].id);
        }
        const rows = (await this.data_source.query(`INSERT INTO products_schema.credit_facilities (
        external_id, contract_id, state, total_limit, business_id
      ) VALUES (
        $1::uuid,
        $2::bigint,
        $3::products_schema.credit_facility_state,
        $4::numeric,
        $5::bigint
      ) RETURNING id`, [
            input.credit_facility_external_id,
            contract_internal_id,
            input.state,
            input.total_limit,
            input.business_id,
        ]));
        return { internal_id: rows[0].id };
    }
    async update_credit_facility_state(credit_facility_external_id, state) {
        await this.data_source.query(`UPDATE products_schema.credit_facilities
         SET state = $2::products_schema.credit_facility_state
       WHERE external_id = $1::uuid`, [credit_facility_external_id, state]);
        this.logger.debug(`credit_facility estado actualizado external_id=${credit_facility_external_id} → ${state}`);
    }
};
exports.SqlProductsCreditFacilitySyncAdapter = SqlProductsCreditFacilitySyncAdapter;
exports.SqlProductsCreditFacilitySyncAdapter = SqlProductsCreditFacilitySyncAdapter = SqlProductsCreditFacilitySyncAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _a : Object])
], SqlProductsCreditFacilitySyncAdapter);


/***/ },

/***/ "./apps/suppliers-ms/src/infrastructure/database/adapters/typeorm-partner-user-sqs-result-poll.adapter.ts"
/*!****************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/infrastructure/database/adapters/typeorm-partner-user-sqs-result-poll.adapter.ts ***!
  \****************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.TypeormPartnerUserSqsResultPollAdapter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const transversal_data_1 = __webpack_require__(/*! @app/transversal-data */ "./libs/transversal-data/src/index.ts");
let TypeormPartnerUserSqsResultPollAdapter = class TypeormPartnerUserSqsResultPollAdapter extends transversal_data_1.TypeormSqsIdempotencyPollBaseAdapter {
    constructor(repo, config_service) {
        const po = config_service.get('config.partner_onboarding');
        super(repo, {
            timeout_ms: po?.sqs_user_poll_timeout_ms ?? 60_000,
            interval_ms: po?.sqs_user_poll_interval_ms ?? 300,
        });
    }
    validate_result(raw) {
        if (typeof raw !== 'object' || raw === null) {
            return false;
        }
        const r = raw;
        return (typeof r['user_external_id'] === 'string' &&
            r['user_external_id'].length > 0 &&
            typeof r['person_external_id'] === 'string' &&
            r['person_external_id'].length > 0);
    }
};
exports.TypeormPartnerUserSqsResultPollAdapter = TypeormPartnerUserSqsResultPollAdapter;
exports.TypeormPartnerUserSqsResultPollAdapter = TypeormPartnerUserSqsResultPollAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transversal_data_1.PartnerCreateUserSqsIdempotencyEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], TypeormPartnerUserSqsResultPollAdapter);


/***/ },

/***/ "./apps/suppliers-ms/src/infrastructure/database/common/typeorm-suppliers-reference-lookup.adapter.ts"
/*!************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/infrastructure/database/common/typeorm-suppliers-reference-lookup.adapter.ts ***!
  \************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TypeormSuppliersReferenceLookupAdapter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const transversal_data_1 = __webpack_require__(/*! @app/transversal-data */ "./libs/transversal-data/src/index.ts");
const suppliers_data_1 = __webpack_require__(/*! @app/suppliers-data */ "./libs/suppliers-data/src/index.ts");
let TypeormSuppliersReferenceLookupAdapter = class TypeormSuppliersReferenceLookupAdapter {
    users;
    persons;
    cities;
    businesses;
    bank_accounts;
    partners;
    suppliers;
    constructor(users, persons, cities, businesses, bank_accounts, partners, suppliers) {
        this.users = users;
        this.persons = persons;
        this.cities = cities;
        this.businesses = businesses;
        this.bank_accounts = bank_accounts;
        this.partners = partners;
        this.suppliers = suppliers;
    }
    async get_user_internal_id_by_external_id(external_id) {
        const row = await this.users.findOne({
            where: { externalId: external_id },
            select: { id: true },
        });
        return row?.id ?? null;
    }
    async get_person_internal_id_by_external_id(external_id) {
        const row = await this.persons.findOne({
            where: { externalId: external_id },
            select: { id: true },
        });
        return row?.id ?? null;
    }
    async get_city_internal_id_by_external_id(external_id) {
        const row = await this.cities.findOne({
            where: { externalId: external_id },
            select: { id: true },
        });
        return row?.id ?? null;
    }
    async get_business_internal_id_by_external_id(external_id) {
        const row = await this.businesses.findOne({
            where: { externalId: external_id },
            select: { id: true },
        });
        return row?.id ?? null;
    }
    async get_partner_internal_id_by_external_id(external_id) {
        const row = await this.partners.findOne({
            where: { externalId: external_id },
            select: { id: true },
        });
        return row?.id ?? null;
    }
    async get_partner_external_id_by_internal_id(internal_id) {
        const row = await this.partners.findOne({
            where: { id: internal_id },
            select: { externalId: true },
        });
        return row?.externalId ?? null;
    }
    async get_user_external_id_by_internal_id(internal_id) {
        const row = await this.users.findOne({
            where: { id: internal_id },
            select: { externalId: true },
        });
        return row?.externalId ?? null;
    }
    async get_person_external_id_by_internal_id(internal_id) {
        const row = await this.persons.findOne({
            where: { id: internal_id },
            select: { externalId: true },
        });
        return row?.externalId ?? null;
    }
    async get_city_external_id_by_internal_id(internal_id) {
        const row = await this.cities.findOne({
            where: { id: internal_id },
            select: { externalId: true },
        });
        return row?.externalId ?? null;
    }
    async get_business_external_id_by_internal_id(internal_id) {
        const row = await this.businesses.findOne({
            where: { id: internal_id },
            select: { externalId: true },
        });
        return row?.externalId ?? null;
    }
    async get_bank_account_external_id_by_internal_id(internal_id) {
        const row = await this.bank_accounts.findOne({
            where: { id: internal_id },
            select: { externalId: true },
        });
        return row?.externalId ?? null;
    }
    async get_bank_account_internal_id_by_external_id(external_id) {
        const row = await this.bank_accounts.findOne({
            where: { externalId: external_id },
            select: { id: true },
        });
        return row?.id ?? null;
    }
    async get_supplier_external_id_by_internal_id(internal_id) {
        const row = await this.suppliers.findOne({
            where: { id: internal_id },
            select: { externalId: true },
        });
        return row?.externalId ?? null;
    }
};
exports.TypeormSuppliersReferenceLookupAdapter = TypeormSuppliersReferenceLookupAdapter;
exports.TypeormSuppliersReferenceLookupAdapter = TypeormSuppliersReferenceLookupAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transversal_data_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(transversal_data_1.PersonEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(transversal_data_1.CityEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(suppliers_data_1.BusinessEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(suppliers_data_1.BankAccountEntity)),
    __param(5, (0, typeorm_1.InjectRepository)(suppliers_data_1.PartnersEntity)),
    __param(6, (0, typeorm_1.InjectRepository)(suppliers_data_1.SupplierEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _e : Object, typeof (_f = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _f : Object, typeof (_g = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _g : Object])
], TypeormSuppliersReferenceLookupAdapter);


/***/ },

/***/ "./apps/suppliers-ms/src/infrastructure/database/mappers/bank-account.mapper.ts"
/*!**************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/infrastructure/database/mappers/bank-account.mapper.ts ***!
  \**************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BankAccountMapper = void 0;
const bank_account_entity_1 = __webpack_require__(/*! @modules/bank-accounts/domain/entities/bank-account.entity */ "./apps/suppliers-ms/src/modules/bank-accounts/domain/entities/bank-account.entity.ts");
class BankAccountMapper {
    static to_domain(row) {
        return new bank_account_entity_1.BankAccount(row.id, row.externalId, row.bankEntity, row.accountNumber, row.bankCertification ?? null, row.createdAt, row.updatedAt);
    }
    static from_raw_row(row) {
        return new bank_account_entity_1.BankAccount(Number(row['id']), String(row['external_id']), String(row['bank_entity']), String(row['account_number']), row['bank_certification'] ?? null, new Date(String(row['created_at'])), new Date(String(row['updated_at'])));
    }
}
exports.BankAccountMapper = BankAccountMapper;


/***/ },

/***/ "./apps/suppliers-ms/src/infrastructure/database/mappers/business.mapper.ts"
/*!**********************************************************************************!*\
  !*** ./apps/suppliers-ms/src/infrastructure/database/mappers/business.mapper.ts ***!
  \**********************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BusinessMapper = void 0;
const business_entity_1 = __webpack_require__(/*! @modules/businesses/domain/entities/business.entity */ "./apps/suppliers-ms/src/modules/businesses/domain/entities/business.entity.ts");
class BusinessMapper {
    static to_domain(row) {
        return new business_entity_1.Business(row.id, row.externalId, row.personId, row.cityId, row.entityType, row.businessName ?? null, row.businessAddress ?? null, row.businessType ?? null, row.relationshipToBusiness ?? null, row.legalName ?? null, row.tradeName ?? null, row.taxId ?? null, row.yearOfEstablishment ?? null, row.createdAt, row.updatedAt);
    }
    static from_raw_row(row) {
        return new business_entity_1.Business(Number(row['id']), String(row['external_id']), Number(row['person_id']), row['city_id'] === null || row['city_id'] === undefined
            ? null
            : Number(row['city_id']), String(row['entity_type']), row['business_name'] ?? null, row['business_address'] ?? null, row['business_type'] ?? null, row['relationship_to_business'] ?? null, row['legal_name'] ?? null, row['trade_name'] ?? null, row['tax_id'] ?? null, row['year_of_establishment'] === null ||
            row['year_of_establishment'] === undefined
            ? null
            : Number(row['year_of_establishment']), new Date(String(row['created_at'])), new Date(String(row['updated_at'])));
    }
}
exports.BusinessMapper = BusinessMapper;


/***/ },

/***/ "./apps/suppliers-ms/src/infrastructure/database/mappers/legal-representative.mapper.ts"
/*!**********************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/infrastructure/database/mappers/legal-representative.mapper.ts ***!
  \**********************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LegalRepresentativeMapper = void 0;
const legal_representative_entity_1 = __webpack_require__(/*! @modules/legal-representatives/domain/entities/legal-representative.entity */ "./apps/suppliers-ms/src/modules/legal-representatives/domain/entities/legal-representative.entity.ts");
exports.LegalRepresentativeMapper = {
    to_domain(row) {
        return new legal_representative_entity_1.LegalRepresentative(Number(row.id), row.externalId, row.businessId, row.personId, row.isPrimary, row.createdAt, row.updatedAt);
    },
    from_raw_row(row) {
        return new legal_representative_entity_1.LegalRepresentative(Number(row.id), String(row.external_id), Number(row.business_id), Number(row.person_id), Boolean(row.is_primary), row.created_at, row.updated_at);
    },
};


/***/ },

/***/ "./apps/suppliers-ms/src/infrastructure/database/mappers/partner.mapper.ts"
/*!*********************************************************************************!*\
  !*** ./apps/suppliers-ms/src/infrastructure/database/mappers/partner.mapper.ts ***!
  \*********************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PartnerMapper = void 0;
const partner_entity_1 = __webpack_require__(/*! @modules/partners/domain/entities/partner.entity */ "./apps/suppliers-ms/src/modules/partners/domain/entities/partner.entity.ts");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
class PartnerMapper {
    static to_domain(row) {
        return new partner_entity_1.Partner({
            internal_id: row.id,
            supplier_id: row.supplier.id,
            external_id: row.externalId,
            acronym: row.acronym ?? null,
            logo_url: row.logoUrl ?? null,
            co_branding_logo_url: row.coBrandingLogoUrl ?? null,
            primary_color: row.primaryColor ?? null,
            secondary_color: row.secondaryColor ?? null,
            light_color: row.lightColor ?? null,
            notification_email: row.notificationEmail ?? null,
            webhook_url: row.webhookUrl ?? null,
            send_sales_rep_voucher: row.sendSalesRepVoucher,
            disbursement_notification_email: row.disbursementNotificationEmail ?? null,
            state: row.state,
            created_at: row.createdAt,
            updated_at: row.updatedAt,
        });
    }
    static from_raw_row(row) {
        const state_raw = String(row['state'] ?? shared_1.PartnerState.ACTIVE);
        const state = state_raw === shared_1.PartnerState.INACTIVE
            ? shared_1.PartnerState.INACTIVE
            : shared_1.PartnerState.ACTIVE;
        return new partner_entity_1.Partner({
            internal_id: Number(row['id']),
            supplier_id: Number(row['supplier_id']),
            external_id: String(row['external_id']),
            acronym: row['acronym'] ?? null,
            logo_url: row['logo_url'] ?? null,
            co_branding_logo_url: row['co_branding_logo_url'] ?? null,
            primary_color: row['primary_color'] ?? null,
            secondary_color: row['secondary_color'] ?? null,
            light_color: row['light_color'] ?? null,
            notification_email: row['notification_email'] ?? null,
            webhook_url: row['webhook_url'] ?? null,
            send_sales_rep_voucher: Boolean(row['send_sales_rep_voucher']),
            disbursement_notification_email: row['disbursement_notification_email'] ?? null,
            state,
            created_at: new Date(String(row['created_at'])),
            updated_at: new Date(String(row['updated_at'])),
        });
    }
}
exports.PartnerMapper = PartnerMapper;


/***/ },

/***/ "./apps/suppliers-ms/src/infrastructure/database/mappers/sales-representative.mapper.ts"
/*!**********************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/infrastructure/database/mappers/sales-representative.mapper.ts ***!
  \**********************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SalesRepresentativeMapper = void 0;
const sales_representative_entity_1 = __webpack_require__(/*! @modules/sales-representatives/domain/entities/sales-representative.entity */ "./apps/suppliers-ms/src/modules/sales-representatives/domain/entities/sales-representative.entity.ts");
class SalesRepresentativeMapper {
    static to_domain(row) {
        const user_id = row.userId === null || row.userId === undefined
            ? null
            : Number(row.userId);
        const loaded_user = SalesRepresentativeMapper.loaded_user_from_row(row);
        return new sales_representative_entity_1.SalesRepresentative(Number(row.id), row.externalId, Number(row.partnerId), user_id, row.createdAt, row.updatedAt, loaded_user);
    }
    static loaded_user_from_row(row) {
        const u = row.user;
        if (!u?.person || !u.role) {
            return undefined;
        }
        const from_person = `${u.person.firstName} ${u.person.lastName}`.trim();
        const display_name = from_person.length > 0 ? from_person : (u.email ?? '').trim();
        if (!display_name) {
            return undefined;
        }
        return {
            external_id: u.externalId,
            display_name,
            role_name: u.role.name,
            state: u.state,
        };
    }
    static from_raw_row(row) {
        const user_raw = row['user_id'];
        return new sales_representative_entity_1.SalesRepresentative(Number(row['id']), String(row['external_id']), Number(row['partner_id']), user_raw === null || user_raw === undefined ? null : Number(user_raw), new Date(String(row['created_at'])), new Date(String(row['updated_at'])));
    }
}
exports.SalesRepresentativeMapper = SalesRepresentativeMapper;


/***/ },

/***/ "./apps/suppliers-ms/src/infrastructure/database/mappers/supplier.mapper.ts"
/*!**********************************************************************************!*\
  !*** ./apps/suppliers-ms/src/infrastructure/database/mappers/supplier.mapper.ts ***!
  \**********************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SupplierMapper = void 0;
const supplier_entity_1 = __webpack_require__(/*! @modules/suppliers/domain/entities/supplier.entity */ "./apps/suppliers-ms/src/modules/suppliers/domain/entities/supplier.entity.ts");
class SupplierMapper {
    static to_domain(row, bank_account_id) {
        return new supplier_entity_1.Supplier(row.id, row.externalId, row.businessId, bank_account_id, row.createdAt, row.updatedAt);
    }
    static from_raw_row(row) {
        return new supplier_entity_1.Supplier(Number(row['id']), String(row['external_id']), Number(row['business_id']), row['bank_account_id'] === null || row['bank_account_id'] === undefined
            ? null
            : Number(row['bank_account_id']), new Date(String(row['created_at'])), new Date(String(row['updated_at'])));
    }
}
exports.SupplierMapper = SupplierMapper;


/***/ },

/***/ "./apps/suppliers-ms/src/infrastructure/database/repositories/typeorm-bank-account.repository.ts"
/*!*******************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/infrastructure/database/repositories/typeorm-bank-account.repository.ts ***!
  \*******************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.TypeormBankAccountRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const suppliers_data_1 = __webpack_require__(/*! @app/suppliers-data */ "./libs/suppliers-data/src/index.ts");
const bank_account_mapper_1 = __webpack_require__(/*! @infrastructure/database/mappers/bank-account.mapper */ "./apps/suppliers-ms/src/infrastructure/database/mappers/bank-account.mapper.ts");
const BANK_ACCOUNT_SELECT = {
    id: true,
    externalId: true,
    bankEntity: true,
    accountNumber: true,
    bankCertification: true,
    createdAt: true,
    updatedAt: true,
};
let TypeormBankAccountRepository = class TypeormBankAccountRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async find_by_external_id(external_id) {
        const row = await this.repo.findOne({
            where: { externalId: external_id },
            select: BANK_ACCOUNT_SELECT,
        });
        return row ? bank_account_mapper_1.BankAccountMapper.to_domain(row) : null;
    }
    async find_all() {
        const rows = await this.repo.find({
            select: BANK_ACCOUNT_SELECT,
            order: { id: 'ASC' },
        });
        return rows.map((r) => bank_account_mapper_1.BankAccountMapper.to_domain(r));
    }
    async create(props) {
        const rows = await this.repo.query(`INSERT INTO suppliers_schema.bank_accounts (
        external_id, bank_entity, account_number, bank_certification
      ) VALUES (gen_random_uuid(), $1, $2, $3)
      RETURNING id, external_id, bank_entity, account_number, bank_certification, created_at, updated_at`, [props.bank_entity, props.account_number, props.bank_certification]);
        return bank_account_mapper_1.BankAccountMapper.from_raw_row(rows[0]);
    }
    async update_by_external_id(external_id, patch) {
        const fields = {};
        if (patch.bank_entity !== undefined)
            fields.bankEntity = patch.bank_entity;
        if (patch.account_number !== undefined)
            fields.accountNumber = patch.account_number;
        if (patch.bank_certification !== undefined)
            fields.bankCertification = patch.bank_certification ?? undefined;
        if (Object.keys(fields).length === 0) {
            return this.find_by_external_id(external_id);
        }
        await this.repo
            .createQueryBuilder()
            .update(suppliers_data_1.BankAccountEntity)
            .set({ ...fields, updatedAt: () => 'now()' })
            .where('"external_id" = :external_id', { external_id })
            .execute();
        return this.find_by_external_id(external_id);
    }
    async delete_by_external_id(external_id) {
        const result = await this.repo.delete({ externalId: external_id });
        return (result.affected ?? 0) > 0;
    }
};
exports.TypeormBankAccountRepository = TypeormBankAccountRepository;
exports.TypeormBankAccountRepository = TypeormBankAccountRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(suppliers_data_1.BankAccountEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], TypeormBankAccountRepository);


/***/ },

/***/ "./apps/suppliers-ms/src/infrastructure/database/repositories/typeorm-business.repository.ts"
/*!***************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/infrastructure/database/repositories/typeorm-business.repository.ts ***!
  \***************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.TypeormBusinessRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const suppliers_data_1 = __webpack_require__(/*! @app/suppliers-data */ "./libs/suppliers-data/src/index.ts");
const business_mapper_1 = __webpack_require__(/*! @infrastructure/database/mappers/business.mapper */ "./apps/suppliers-ms/src/infrastructure/database/mappers/business.mapper.ts");
const BUSINESS_SELECT = {
    id: true,
    externalId: true,
    personId: true,
    cityId: true,
    entityType: true,
    businessName: true,
    businessAddress: true,
    businessType: true,
    relationshipToBusiness: true,
    legalName: true,
    tradeName: true,
    taxId: true,
    yearOfEstablishment: true,
    createdAt: true,
    updatedAt: true,
};
let TypeormBusinessRepository = class TypeormBusinessRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async find_by_external_id(external_id) {
        const row = await this.repo.findOne({
            where: { externalId: external_id },
            select: BUSINESS_SELECT,
        });
        return row ? business_mapper_1.BusinessMapper.to_domain(row) : null;
    }
    async find_all() {
        const rows = await this.repo.find({
            select: BUSINESS_SELECT,
            order: { id: 'ASC' },
        });
        return rows.map((r) => business_mapper_1.BusinessMapper.to_domain(r));
    }
    async create(props) {
        const rows = await this.repo.query(`INSERT INTO suppliers_schema.businesses (
        external_id, person_id, city_id, entity_type, business_name, business_address,
        business_type, relationship_to_business, legal_name, trade_name, tax_id, year_of_establishment
      ) VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING id, external_id, created_at, updated_at, person_id, city_id, entity_type,
        business_name, business_address, business_type, relationship_to_business,
        legal_name, trade_name, tax_id, year_of_establishment`, [
            props.person_id,
            props.city_id,
            props.entity_type,
            props.business_name,
            props.business_address,
            props.business_type,
            props.relationship_to_business,
            props.legal_name,
            props.trade_name,
            props.tax_id,
            props.year_of_establishment,
        ]);
        return business_mapper_1.BusinessMapper.from_raw_row(rows[0]);
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
        if (patch.person_id !== undefined) {
            add('person_id', patch.person_id);
        }
        if (patch.city_id !== undefined) {
            add('city_id', patch.city_id);
        }
        if (patch.entity_type !== undefined) {
            add('entity_type', patch.entity_type);
        }
        if (patch.business_name !== undefined) {
            add('business_name', patch.business_name);
        }
        if (patch.business_address !== undefined) {
            add('business_address', patch.business_address);
        }
        if (patch.business_type !== undefined) {
            add('business_type', patch.business_type);
        }
        if (patch.relationship_to_business !== undefined) {
            add('relationship_to_business', patch.relationship_to_business);
        }
        if (patch.legal_name !== undefined) {
            add('legal_name', patch.legal_name);
        }
        if (patch.trade_name !== undefined) {
            add('trade_name', patch.trade_name);
        }
        if (patch.tax_id !== undefined) {
            add('tax_id', patch.tax_id);
        }
        if (patch.year_of_establishment !== undefined) {
            add('year_of_establishment', patch.year_of_establishment);
        }
        if (columns.length === 0) {
            return this.find_by_external_id(external_id);
        }
        columns.push(`"updated_at" = now()`);
        values.push(existing.id);
        await this.repo.query(`UPDATE suppliers_schema.businesses SET ${columns.join(', ')} WHERE id = $${i}`, values);
        return this.find_by_external_id(external_id);
    }
    async delete_by_external_id(external_id) {
        const result = await this.repo.delete({ externalId: external_id });
        return (result.affected ?? 0) > 0;
    }
};
exports.TypeormBusinessRepository = TypeormBusinessRepository;
exports.TypeormBusinessRepository = TypeormBusinessRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(suppliers_data_1.BusinessEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], TypeormBusinessRepository);


/***/ },

/***/ "./apps/suppliers-ms/src/infrastructure/database/repositories/typeorm-legal-representative.repository.ts"
/*!***************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/infrastructure/database/repositories/typeorm-legal-representative.repository.ts ***!
  \***************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.TypeormLegalRepresentativeRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const suppliers_data_1 = __webpack_require__(/*! @app/suppliers-data */ "./libs/suppliers-data/src/index.ts");
const legal_representative_mapper_1 = __webpack_require__(/*! @infrastructure/database/mappers/legal-representative.mapper */ "./apps/suppliers-ms/src/infrastructure/database/mappers/legal-representative.mapper.ts");
let TypeormLegalRepresentativeRepository = class TypeormLegalRepresentativeRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(props) {
        const rows = await this.repo.query(`INSERT INTO suppliers_schema.legal_representatives (
        external_id, business_id, person_id, is_primary
      ) VALUES (gen_random_uuid(), $1, $2, $3)
      RETURNING id, external_id, created_at, updated_at, business_id, person_id, is_primary`, [props.business_id, props.person_id, props.is_primary]);
        return legal_representative_mapper_1.LegalRepresentativeMapper.from_raw_row(rows[0]);
    }
};
exports.TypeormLegalRepresentativeRepository = TypeormLegalRepresentativeRepository;
exports.TypeormLegalRepresentativeRepository = TypeormLegalRepresentativeRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(suppliers_data_1.LegalRepresentativeEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], TypeormLegalRepresentativeRepository);


/***/ },

/***/ "./apps/suppliers-ms/src/infrastructure/database/repositories/typeorm-partner-onboarding-saga.repository.ts"
/*!******************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/infrastructure/database/repositories/typeorm-partner-onboarding-saga.repository.ts ***!
  \******************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.TypeormPartnerOnboardingSagaRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const suppliers_data_1 = __webpack_require__(/*! @app/suppliers-data */ "./libs/suppliers-data/src/index.ts");
const SAGA_SELECT = {
    externalId: true,
    correlationId: true,
    status: true,
    currentStep: true,
    creditFacilityExternalId: true,
    userExternalId: true,
    personExternalId: true,
    businessExternalId: true,
    bankAccountExternalId: true,
    partnerExternalId: true,
    errorMessage: true,
};
let TypeormPartnerOnboardingSagaRepository = class TypeormPartnerOnboardingSagaRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create_initial(record) {
        const row = this.repo.create({
            externalId: record.external_id,
            correlationId: record.correlation_id,
            status: record.status,
            currentStep: record.current_step,
        });
        await this.repo.save(row);
    }
    async update_by_external_id(external_id, patch) {
        const existing = await this.repo.findOne({
            where: { externalId: external_id },
        });
        if (!existing) {
            return;
        }
        if (patch.status !== undefined) {
            existing.status = patch.status;
        }
        if (patch.current_step !== undefined) {
            existing.currentStep = patch.current_step;
        }
        if (patch.credit_facility_external_id !== undefined) {
            existing.creditFacilityExternalId = patch.credit_facility_external_id;
        }
        if (patch.user_external_id !== undefined) {
            existing.userExternalId = patch.user_external_id;
        }
        if (patch.person_external_id !== undefined) {
            existing.personExternalId = patch.person_external_id;
        }
        if (patch.business_external_id !== undefined) {
            existing.businessExternalId = patch.business_external_id;
        }
        if (patch.bank_account_external_id !== undefined) {
            existing.bankAccountExternalId = patch.bank_account_external_id;
        }
        if (patch.partner_external_id !== undefined) {
            existing.partnerExternalId = patch.partner_external_id;
        }
        if (patch.error_message !== undefined) {
            existing.errorMessage = patch.error_message;
        }
        await this.repo.save(existing);
    }
    async find_by_external_id(external_id) {
        const row = await this.repo.findOne({
            where: { externalId: external_id },
            select: SAGA_SELECT,
        });
        if (!row)
            return null;
        return {
            external_id: row.externalId,
            correlation_id: row.correlationId,
            status: row.status,
            current_step: row.currentStep,
            credit_facility_external_id: row.creditFacilityExternalId ?? null,
            user_external_id: row.userExternalId ?? null,
            person_external_id: row.personExternalId ?? null,
            business_external_id: row.businessExternalId ?? null,
            bank_account_external_id: row.bankAccountExternalId ?? null,
            partner_external_id: row.partnerExternalId ?? null,
            error_message: row.errorMessage ?? null,
        };
    }
};
exports.TypeormPartnerOnboardingSagaRepository = TypeormPartnerOnboardingSagaRepository;
exports.TypeormPartnerOnboardingSagaRepository = TypeormPartnerOnboardingSagaRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(suppliers_data_1.PartnerOnboardingSagaEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], TypeormPartnerOnboardingSagaRepository);


/***/ },

/***/ "./apps/suppliers-ms/src/infrastructure/database/repositories/typeorm-partner.repository.ts"
/*!**************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/infrastructure/database/repositories/typeorm-partner.repository.ts ***!
  \**************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.TypeormPartnerRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const suppliers_data_1 = __webpack_require__(/*! @app/suppliers-data */ "./libs/suppliers-data/src/index.ts");
const partner_mapper_1 = __webpack_require__(/*! @infrastructure/database/mappers/partner.mapper */ "./apps/suppliers-ms/src/infrastructure/database/mappers/partner.mapper.ts");
const PARTNER_SELECT = {
    id: true,
    externalId: true,
    acronym: true,
    logoUrl: true,
    coBrandingLogoUrl: true,
    primaryColor: true,
    secondaryColor: true,
    lightColor: true,
    notificationEmail: true,
    webhookUrl: true,
    sendSalesRepVoucher: true,
    disbursementNotificationEmail: true,
    state: true,
    createdAt: true,
    updatedAt: true,
    supplier: { id: true },
};
let TypeormPartnerRepository = class TypeormPartnerRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async find_by_external_id(external_id) {
        const row = await this.repo.findOne({
            where: { externalId: external_id },
            select: PARTNER_SELECT,
        });
        return row ? partner_mapper_1.PartnerMapper.to_domain(row) : null;
    }
    async find_all() {
        const rows = await this.repo.find({
            relations: ['supplier'],
            select: PARTNER_SELECT,
            order: { id: 'ASC' },
        });
        return rows.map((r) => partner_mapper_1.PartnerMapper.to_domain(r));
    }
    async create(props) {
        const rows = await this.repo.query(`INSERT INTO suppliers_schema.partners (
        supplier_id, external_id, acronym, logo_url, co_branding_logo_url,
        primary_color, secondary_color, light_color,
        notification_email, webhook_url, send_sales_rep_voucher,
        disbursement_notification_email
      ) VALUES (
        $1, gen_random_uuid(), $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
      )
      RETURNING id, supplier_id, external_id, acronym, logo_url, co_branding_logo_url,
        primary_color, secondary_color, light_color,
        notification_email, webhook_url, send_sales_rep_voucher,
        disbursement_notification_email, state, created_at, updated_at`, [
            props.supplier_id,
            props.acronym,
            props.logo_url,
            props.co_branding_logo_url,
            props.primary_color,
            props.secondary_color,
            props.light_color,
            props.notification_email,
            props.webhook_url,
            props.send_sales_rep_voucher,
            props.disbursement_notification_email,
        ]);
        return partner_mapper_1.PartnerMapper.from_raw_row(rows[0]);
    }
    async update_by_external_id(external_id, patch) {
        const fields = {};
        if (patch.acronym !== undefined)
            fields.acronym = patch.acronym ?? undefined;
        if (patch.logo_url !== undefined)
            fields.logoUrl = patch.logo_url ?? undefined;
        if (patch.co_branding_logo_url !== undefined)
            fields.coBrandingLogoUrl = patch.co_branding_logo_url ?? undefined;
        if (patch.primary_color !== undefined)
            fields.primaryColor = patch.primary_color ?? undefined;
        if (patch.secondary_color !== undefined)
            fields.secondaryColor = patch.secondary_color ?? undefined;
        if (patch.light_color !== undefined)
            fields.lightColor = patch.light_color ?? undefined;
        if (patch.notification_email !== undefined)
            fields.notificationEmail = patch.notification_email ?? undefined;
        if (patch.webhook_url !== undefined)
            fields.webhookUrl = patch.webhook_url ?? undefined;
        if (patch.send_sales_rep_voucher !== undefined)
            fields.sendSalesRepVoucher = patch.send_sales_rep_voucher;
        if (patch.disbursement_notification_email !== undefined)
            fields.disbursementNotificationEmail =
                patch.disbursement_notification_email ?? undefined;
        if (patch.state !== undefined)
            fields.state = patch.state;
        if (Object.keys(fields).length === 0) {
            return this.find_by_external_id(external_id);
        }
        await this.repo
            .createQueryBuilder()
            .update(suppliers_data_1.PartnersEntity)
            .set({
            ...fields,
            updatedAt: () => 'now()',
        })
            .where('"external_id" = :external_id', { external_id })
            .execute();
        return this.find_by_external_id(external_id);
    }
    async delete_by_external_id(external_id) {
        const result = await this.repo.delete({ externalId: external_id });
        return (result.affected ?? 0) > 0;
    }
};
exports.TypeormPartnerRepository = TypeormPartnerRepository;
exports.TypeormPartnerRepository = TypeormPartnerRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(suppliers_data_1.PartnersEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], TypeormPartnerRepository);


/***/ },

/***/ "./apps/suppliers-ms/src/infrastructure/database/repositories/typeorm-sales-representative.repository.ts"
/*!***************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/infrastructure/database/repositories/typeorm-sales-representative.repository.ts ***!
  \***************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.TypeormSalesRepresentativeRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const suppliers_data_1 = __webpack_require__(/*! @app/suppliers-data */ "./libs/suppliers-data/src/index.ts");
const sales_representative_mapper_1 = __webpack_require__(/*! @infrastructure/database/mappers/sales-representative.mapper */ "./apps/suppliers-ms/src/infrastructure/database/mappers/sales-representative.mapper.ts");
let TypeormSalesRepresentativeRepository = class TypeormSalesRepresentativeRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    with_user_graph_qb() {
        return this.repo
            .createQueryBuilder('sr')
            .leftJoinAndSelect('sr.user', 'u')
            .leftJoinAndSelect('u.person', 'p')
            .leftJoinAndSelect('u.role', 'r');
    }
    async find_by_external_id(external_id) {
        const row = await this.with_user_graph_qb()
            .where('sr.externalId = :external_id', { external_id })
            .getOne();
        return row ? sales_representative_mapper_1.SalesRepresentativeMapper.to_domain(row) : null;
    }
    async find_all(partner_id_filter) {
        const qb = this.with_user_graph_qb().orderBy('sr.id', 'ASC');
        if (partner_id_filter !== undefined) {
            qb.andWhere('sr.partnerId = :partner_id', {
                partner_id: partner_id_filter,
            });
        }
        const rows = await qb.getMany();
        return rows.map((r) => sales_representative_mapper_1.SalesRepresentativeMapper.to_domain(r));
    }
    async create(props) {
        const rows = await this.repo.query(`INSERT INTO suppliers_schema.sales_representatives (
        external_id, partner_id, user_id
      ) VALUES (gen_random_uuid(), $1, $2)
      RETURNING id, external_id, partner_id, user_id, created_at, updated_at`, [props.partner_id, props.user_id]);
        return sales_representative_mapper_1.SalesRepresentativeMapper.from_raw_row(rows[0]);
    }
    async update_user_by_external_id(external_id, user_id) {
        const qb = this.repo
            .createQueryBuilder()
            .update(suppliers_data_1.SalesRepresentativeEntity)
            .where('"external_id" = :external_id', { external_id });
        if (user_id === null) {
            await qb
                .set({
                userId: () => 'NULL',
                updatedAt: () => 'now()',
            })
                .execute();
        }
        else {
            await qb
                .set({
                userId: user_id,
                updatedAt: () => 'now()',
            })
                .execute();
        }
        return this.find_by_external_id(external_id);
    }
    async delete_by_external_id(external_id) {
        const result = await this.repo.delete({ externalId: external_id });
        return (result.affected ?? 0) > 0;
    }
};
exports.TypeormSalesRepresentativeRepository = TypeormSalesRepresentativeRepository;
exports.TypeormSalesRepresentativeRepository = TypeormSalesRepresentativeRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(suppliers_data_1.SalesRepresentativeEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], TypeormSalesRepresentativeRepository);


/***/ },

/***/ "./apps/suppliers-ms/src/infrastructure/database/repositories/typeorm-supplier.repository.ts"
/*!***************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/infrastructure/database/repositories/typeorm-supplier.repository.ts ***!
  \***************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.TypeormSupplierRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const suppliers_data_1 = __webpack_require__(/*! @app/suppliers-data */ "./libs/suppliers-data/src/index.ts");
const supplier_mapper_1 = __webpack_require__(/*! @infrastructure/database/mappers/supplier.mapper */ "./apps/suppliers-ms/src/infrastructure/database/mappers/supplier.mapper.ts");
const SUPPLIER_ORM_SELECT = {
    id: true,
    externalId: true,
    businessId: true,
    createdAt: true,
    updatedAt: true,
};
let TypeormSupplierRepository = class TypeormSupplierRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async load_bank_account_id(supplier_id) {
        const rows = await this.repo.query(`SELECT bank_account_id FROM suppliers_schema.suppliers WHERE id = $1`, [supplier_id]);
        const r = rows[0];
        return r?.bank_account_id ?? null;
    }
    async find_by_external_id(external_id) {
        const row = await this.repo.findOne({
            where: { externalId: external_id },
            select: SUPPLIER_ORM_SELECT,
        });
        if (!row) {
            return null;
        }
        const bank_account_id = await this.load_bank_account_id(row.id);
        return supplier_mapper_1.SupplierMapper.to_domain(row, bank_account_id);
    }
    async find_all() {
        const rows = await this.repo.find({
            select: SUPPLIER_ORM_SELECT,
            order: { id: 'ASC' },
        });
        const out = [];
        for (const row of rows) {
            const bank_account_id = await this.load_bank_account_id(row.id);
            out.push(supplier_mapper_1.SupplierMapper.to_domain(row, bank_account_id));
        }
        return out;
    }
    async create(props) {
        const rows = await this.repo.query(`INSERT INTO suppliers_schema.suppliers (
        external_id, business_id, bank_account_id
      ) VALUES (gen_random_uuid(), $1, $2)
      RETURNING id, external_id, business_id, bank_account_id, created_at, updated_at`, [props.business_id, props.bank_account_id]);
        return supplier_mapper_1.SupplierMapper.from_raw_row(rows[0]);
    }
    async update_by_external_id(external_id, patch) {
        const existing = await this.repo.findOne({
            where: { externalId: external_id },
            select: { id: true },
        });
        if (!existing) {
            return null;
        }
        if (patch.bank_account_id === undefined) {
            return this.find_by_external_id(external_id);
        }
        await this.repo.query(`UPDATE suppliers_schema.suppliers SET bank_account_id = $1, updated_at = now() WHERE id = $2`, [patch.bank_account_id, existing.id]);
        return this.find_by_external_id(external_id);
    }
    async delete_by_external_id(external_id) {
        const result = await this.repo.delete({ externalId: external_id });
        return (result.affected ?? 0) > 0;
    }
};
exports.TypeormSupplierRepository = TypeormSupplierRepository;
exports.TypeormSupplierRepository = TypeormSupplierRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(suppliers_data_1.SupplierEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], TypeormSupplierRepository);


/***/ },

/***/ "./apps/suppliers-ms/src/infrastructure/database/services/postgres-type-orm-config.service.ts"
/*!****************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/infrastructure/database/services/postgres-type-orm-config.service.ts ***!
  \****************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_config_1 = __importDefault(__webpack_require__(/*! @config/typeorm.config */ "./apps/suppliers-ms/src/config/typeorm.config.ts"));
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


/***/ },

/***/ "./apps/suppliers-ms/src/infrastructure/infrastructure.module.ts"
/*!***********************************************************************!*\
  !*** ./apps/suppliers-ms/src/infrastructure/infrastructure.module.ts ***!
  \***********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InfrastructureModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const postgres_type_orm_config_service_1 = __webpack_require__(/*! ./database/services/postgres-type-orm-config.service */ "./apps/suppliers-ms/src/infrastructure/database/services/postgres-type-orm-config.service.ts");
const sqs_module_1 = __webpack_require__(/*! ./messaging/sqs/sqs.module */ "./apps/suppliers-ms/src/infrastructure/messaging/sqs/sqs.module.ts");
const messaging_application_module_1 = __webpack_require__(/*! @messaging/messaging-application.module */ "./apps/suppliers-ms/src/modules/messaging/messaging-application.module.ts");
const typeorm_business_repository_1 = __webpack_require__(/*! ./database/repositories/typeorm-business.repository */ "./apps/suppliers-ms/src/infrastructure/database/repositories/typeorm-business.repository.ts");
const typeorm_partner_repository_1 = __webpack_require__(/*! ./database/repositories/typeorm-partner.repository */ "./apps/suppliers-ms/src/infrastructure/database/repositories/typeorm-partner.repository.ts");
const typeorm_supplier_repository_1 = __webpack_require__(/*! ./database/repositories/typeorm-supplier.repository */ "./apps/suppliers-ms/src/infrastructure/database/repositories/typeorm-supplier.repository.ts");
const typeorm_bank_account_repository_1 = __webpack_require__(/*! ./database/repositories/typeorm-bank-account.repository */ "./apps/suppliers-ms/src/infrastructure/database/repositories/typeorm-bank-account.repository.ts");
const typeorm_suppliers_reference_lookup_adapter_1 = __webpack_require__(/*! ./database/common/typeorm-suppliers-reference-lookup.adapter */ "./apps/suppliers-ms/src/infrastructure/database/common/typeorm-suppliers-reference-lookup.adapter.ts");
const typeorm_partner_onboarding_saga_repository_1 = __webpack_require__(/*! ./database/repositories/typeorm-partner-onboarding-saga.repository */ "./apps/suppliers-ms/src/infrastructure/database/repositories/typeorm-partner-onboarding-saga.repository.ts");
const sql_products_credit_facility_sync_adapter_1 = __webpack_require__(/*! ./database/adapters/sql-products-credit-facility-sync.adapter */ "./apps/suppliers-ms/src/infrastructure/database/adapters/sql-products-credit-facility-sync.adapter.ts");
const typeorm_partner_user_sqs_result_poll_adapter_1 = __webpack_require__(/*! ./database/adapters/typeorm-partner-user-sqs-result-poll.adapter */ "./apps/suppliers-ms/src/infrastructure/database/adapters/typeorm-partner-user-sqs-result-poll.adapter.ts");
const partner_saga_compensation_adapter_1 = __webpack_require__(/*! ./database/adapters/partner-saga-compensation.adapter */ "./apps/suppliers-ms/src/infrastructure/database/adapters/partner-saga-compensation.adapter.ts");
const typeorm_legal_representative_repository_1 = __webpack_require__(/*! ./database/repositories/typeorm-legal-representative.repository */ "./apps/suppliers-ms/src/infrastructure/database/repositories/typeorm-legal-representative.repository.ts");
const typeorm_sales_representative_repository_1 = __webpack_require__(/*! ./database/repositories/typeorm-sales-representative.repository */ "./apps/suppliers-ms/src/infrastructure/database/repositories/typeorm-sales-representative.repository.ts");
const sqs_transversal_user_person_writer_adapter_1 = __webpack_require__(/*! ./messaging/sqs/adapters/sqs-transversal-user-person-writer.adapter */ "./apps/suppliers-ms/src/infrastructure/messaging/sqs/adapters/sqs-transversal-user-person-writer.adapter.ts");
const partner_onboarding_saga_repository_port_1 = __webpack_require__(/*! @modules/partners/application/ports/partner-onboarding-saga.repository.port */ "./apps/suppliers-ms/src/modules/partners/application/ports/partner-onboarding-saga.repository.port.ts");
const products_credit_facility_sync_port_1 = __webpack_require__(/*! @modules/partners/application/ports/products-credit-facility-sync.port */ "./apps/suppliers-ms/src/modules/partners/application/ports/products-credit-facility-sync.port.ts");
const transversal_user_person_writer_port_1 = __webpack_require__(/*! @modules/partners/application/ports/transversal-user-person-writer.port */ "./apps/suppliers-ms/src/modules/partners/application/ports/transversal-user-person-writer.port.ts");
const partner_user_sqs_result_reader_port_1 = __webpack_require__(/*! @modules/partners/application/ports/partner-user-sqs-result-reader.port */ "./apps/suppliers-ms/src/modules/partners/application/ports/partner-user-sqs-result-reader.port.ts");
const partner_onboarding_files_port_1 = __webpack_require__(/*! @modules/partners/application/ports/partner-onboarding-files.port */ "./apps/suppliers-ms/src/modules/partners/application/ports/partner-onboarding-files.port.ts");
const partner_saga_compensation_port_1 = __webpack_require__(/*! @modules/partners/application/ports/partner-saga-compensation.port */ "./apps/suppliers-ms/src/modules/partners/application/ports/partner-saga-compensation.port.ts");
const sqs_partner_onboarding_files_adapter_1 = __webpack_require__(/*! ./messaging/sqs/adapters/sqs-partner-onboarding-files.adapter */ "./apps/suppliers-ms/src/infrastructure/messaging/sqs/adapters/sqs-partner-onboarding-files.adapter.ts");
const suppliers_reference_lookup_port_1 = __webpack_require__(/*! @common/ports/suppliers-reference-lookup.port */ "./apps/suppliers-ms/src/common/ports/suppliers-reference-lookup.port.ts");
const suppliers_data_1 = __webpack_require__(/*! @app/suppliers-data */ "./libs/suppliers-data/src/index.ts");
const transversal_data_1 = __webpack_require__(/*! @app/transversal-data */ "./libs/transversal-data/src/index.ts");
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
            typeorm_1.TypeOrmModule.forFeature([
                suppliers_data_1.BankAccountEntity,
                suppliers_data_1.BusinessEntity,
                suppliers_data_1.PartnerOnboardingSagaEntity,
                suppliers_data_1.PartnersEntity,
                suppliers_data_1.SupplierEntity,
                suppliers_data_1.LegalRepresentativeEntity,
                suppliers_data_1.SalesRepresentativeEntity,
                transversal_data_1.PartnerCreateUserSqsIdempotencyEntity,
                transversal_data_1.PersonEntity,
                transversal_data_1.RoleEntity,
                transversal_data_1.UserEntity,
                transversal_data_1.CityEntity,
            ]),
            sqs_module_1.SqsModule,
            messaging_application_module_1.MessagingApplicationModule,
        ],
        providers: [
            typeorm_business_repository_1.TypeormBusinessRepository,
            typeorm_partner_repository_1.TypeormPartnerRepository,
            typeorm_supplier_repository_1.TypeormSupplierRepository,
            typeorm_bank_account_repository_1.TypeormBankAccountRepository,
            typeorm_partner_onboarding_saga_repository_1.TypeormPartnerOnboardingSagaRepository,
            typeorm_legal_representative_repository_1.TypeormLegalRepresentativeRepository,
            typeorm_sales_representative_repository_1.TypeormSalesRepresentativeRepository,
            typeorm_partner_user_sqs_result_poll_adapter_1.TypeormPartnerUserSqsResultPollAdapter,
            sql_products_credit_facility_sync_adapter_1.SqlProductsCreditFacilitySyncAdapter,
            sqs_transversal_user_person_writer_adapter_1.SqsTransversalUserPersonWriterAdapter,
            typeorm_suppliers_reference_lookup_adapter_1.TypeormSuppliersReferenceLookupAdapter,
            {
                provide: suppliers_reference_lookup_port_1.SUPPLIERS_REFERENCE_LOOKUP,
                useExisting: typeorm_suppliers_reference_lookup_adapter_1.TypeormSuppliersReferenceLookupAdapter,
            },
            {
                provide: partner_onboarding_saga_repository_port_1.PARTNER_ONBOARDING_SAGA_REPOSITORY,
                useExisting: typeorm_partner_onboarding_saga_repository_1.TypeormPartnerOnboardingSagaRepository,
            },
            {
                provide: products_credit_facility_sync_port_1.PRODUCTS_CREDIT_FACILITY_SYNC_PORT,
                useExisting: sql_products_credit_facility_sync_adapter_1.SqlProductsCreditFacilitySyncAdapter,
            },
            {
                provide: transversal_user_person_writer_port_1.TRANSVERSAL_USER_PERSON_WRITER_PORT,
                useExisting: sqs_transversal_user_person_writer_adapter_1.SqsTransversalUserPersonWriterAdapter,
            },
            {
                provide: partner_user_sqs_result_reader_port_1.PARTNER_USER_SQS_RESULT_READER_PORT,
                useExisting: typeorm_partner_user_sqs_result_poll_adapter_1.TypeormPartnerUserSqsResultPollAdapter,
            },
            sqs_partner_onboarding_files_adapter_1.SqsPartnerOnboardingFilesAdapter,
            {
                provide: partner_onboarding_files_port_1.PARTNER_ONBOARDING_FILES_PORT,
                useExisting: sqs_partner_onboarding_files_adapter_1.SqsPartnerOnboardingFilesAdapter,
            },
            partner_saga_compensation_adapter_1.PartnerSagaCompensationAdapter,
            {
                provide: partner_saga_compensation_port_1.PARTNER_SAGA_COMPENSATION_PORT,
                useExisting: partner_saga_compensation_adapter_1.PartnerSagaCompensationAdapter,
            },
        ],
        exports: [
            typeorm_business_repository_1.TypeormBusinessRepository,
            typeorm_partner_repository_1.TypeormPartnerRepository,
            typeorm_supplier_repository_1.TypeormSupplierRepository,
            typeorm_bank_account_repository_1.TypeormBankAccountRepository,
            typeorm_partner_onboarding_saga_repository_1.TypeormPartnerOnboardingSagaRepository,
            typeorm_legal_representative_repository_1.TypeormLegalRepresentativeRepository,
            typeorm_sales_representative_repository_1.TypeormSalesRepresentativeRepository,
            typeorm_partner_user_sqs_result_poll_adapter_1.TypeormPartnerUserSqsResultPollAdapter,
            suppliers_reference_lookup_port_1.SUPPLIERS_REFERENCE_LOOKUP,
            partner_onboarding_saga_repository_port_1.PARTNER_ONBOARDING_SAGA_REPOSITORY,
            products_credit_facility_sync_port_1.PRODUCTS_CREDIT_FACILITY_SYNC_PORT,
            transversal_user_person_writer_port_1.TRANSVERSAL_USER_PERSON_WRITER_PORT,
            partner_user_sqs_result_reader_port_1.PARTNER_USER_SQS_RESULT_READER_PORT,
            partner_onboarding_files_port_1.PARTNER_ONBOARDING_FILES_PORT,
            partner_saga_compensation_port_1.PARTNER_SAGA_COMPENSATION_PORT,
        ],
    })
], InfrastructureModule);


/***/ },

/***/ "./apps/suppliers-ms/src/infrastructure/messaging/sqs/adapters/config-outbound-products-queue-url.adapter.ts"
/*!*******************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/infrastructure/messaging/sqs/adapters/config-outbound-products-queue-url.adapter.ts ***!
  \*******************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.ConfigOutboundProductsQueueUrlAdapter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let ConfigOutboundProductsQueueUrlAdapter = class ConfigOutboundProductsQueueUrlAdapter {
    config_service;
    constructor(config_service) {
        this.config_service = config_service;
    }
    get_outbound_queue_url() {
        return this.config_service.getOrThrow('sqs.products_outbound_queue_url');
    }
};
exports.ConfigOutboundProductsQueueUrlAdapter = ConfigOutboundProductsQueueUrlAdapter;
exports.ConfigOutboundProductsQueueUrlAdapter = ConfigOutboundProductsQueueUrlAdapter = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], ConfigOutboundProductsQueueUrlAdapter);


/***/ },

/***/ "./apps/suppliers-ms/src/infrastructure/messaging/sqs/adapters/config-outbound-transversal-queue-url.adapter.ts"
/*!**********************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/infrastructure/messaging/sqs/adapters/config-outbound-transversal-queue-url.adapter.ts ***!
  \**********************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.ConfigOutboundTransversalQueueUrlAdapter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
let ConfigOutboundTransversalQueueUrlAdapter = class ConfigOutboundTransversalQueueUrlAdapter {
    queues_config;
    constructor(queues_config) {
        this.queues_config = queues_config;
    }
    get_outbound_queue_url() {
        return this.queues_config.outbound_queue_url;
    }
};
exports.ConfigOutboundTransversalQueueUrlAdapter = ConfigOutboundTransversalQueueUrlAdapter;
exports.ConfigOutboundTransversalQueueUrlAdapter = ConfigOutboundTransversalQueueUrlAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(shared_1.QUEUES_CONFIG)),
    __metadata("design:paramtypes", [Object])
], ConfigOutboundTransversalQueueUrlAdapter);


/***/ },

/***/ "./apps/suppliers-ms/src/infrastructure/messaging/sqs/adapters/config-products-create-categories-queue-url.adapter.ts"
/*!****************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/infrastructure/messaging/sqs/adapters/config-products-create-categories-queue-url.adapter.ts ***!
  \****************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.ConfigProductsCreateCategoriesQueueUrlAdapter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let ConfigProductsCreateCategoriesQueueUrlAdapter = class ConfigProductsCreateCategoriesQueueUrlAdapter {
    config_service;
    constructor(config_service) {
        this.config_service = config_service;
    }
    get_create_categories_queue_url() {
        return this.config_service.get('sqs.products_create_categories_queue_url');
    }
};
exports.ConfigProductsCreateCategoriesQueueUrlAdapter = ConfigProductsCreateCategoriesQueueUrlAdapter;
exports.ConfigProductsCreateCategoriesQueueUrlAdapter = ConfigProductsCreateCategoriesQueueUrlAdapter = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], ConfigProductsCreateCategoriesQueueUrlAdapter);


/***/ },

/***/ "./apps/suppliers-ms/src/infrastructure/messaging/sqs/adapters/config-products-create-credit-facility-queue-url.adapter.ts"
/*!*********************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/infrastructure/messaging/sqs/adapters/config-products-create-credit-facility-queue-url.adapter.ts ***!
  \*********************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.ConfigProductsCreateCreditFacilityQueueUrlAdapter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let ConfigProductsCreateCreditFacilityQueueUrlAdapter = class ConfigProductsCreateCreditFacilityQueueUrlAdapter {
    config_service;
    constructor(config_service) {
        this.config_service = config_service;
    }
    get_create_credit_facility_queue_url() {
        return this.config_service.get('sqs.products_create_credit_facility_queue_url');
    }
};
exports.ConfigProductsCreateCreditFacilityQueueUrlAdapter = ConfigProductsCreateCreditFacilityQueueUrlAdapter;
exports.ConfigProductsCreateCreditFacilityQueueUrlAdapter = ConfigProductsCreateCreditFacilityQueueUrlAdapter = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], ConfigProductsCreateCreditFacilityQueueUrlAdapter);


/***/ },

/***/ "./apps/suppliers-ms/src/infrastructure/messaging/sqs/adapters/config-transversal-create-partner-user-queue-url.adapter.ts"
/*!*********************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/infrastructure/messaging/sqs/adapters/config-transversal-create-partner-user-queue-url.adapter.ts ***!
  \*********************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.ConfigTransversalCreatePartnerUserQueueUrlAdapter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
let ConfigTransversalCreatePartnerUserQueueUrlAdapter = class ConfigTransversalCreatePartnerUserQueueUrlAdapter {
    queues_config;
    constructor(queues_config) {
        this.queues_config = queues_config;
    }
    get_create_partner_user_queue_url() {
        return this.queues_config.create_partner_user_queue_url;
    }
};
exports.ConfigTransversalCreatePartnerUserQueueUrlAdapter = ConfigTransversalCreatePartnerUserQueueUrlAdapter;
exports.ConfigTransversalCreatePartnerUserQueueUrlAdapter = ConfigTransversalCreatePartnerUserQueueUrlAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(shared_1.QUEUES_CONFIG)),
    __metadata("design:paramtypes", [Object])
], ConfigTransversalCreatePartnerUserQueueUrlAdapter);


/***/ },

/***/ "./apps/suppliers-ms/src/infrastructure/messaging/sqs/adapters/config-transversal-create-person-queue-url.adapter.ts"
/*!***************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/infrastructure/messaging/sqs/adapters/config-transversal-create-person-queue-url.adapter.ts ***!
  \***************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.ConfigTransversalCreatePersonQueueUrlAdapter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
let ConfigTransversalCreatePersonQueueUrlAdapter = class ConfigTransversalCreatePersonQueueUrlAdapter {
    queues_config;
    constructor(queues_config) {
        this.queues_config = queues_config;
    }
    get_create_person_queue_url() {
        return this.queues_config.create_person_queue_url;
    }
};
exports.ConfigTransversalCreatePersonQueueUrlAdapter = ConfigTransversalCreatePersonQueueUrlAdapter;
exports.ConfigTransversalCreatePersonQueueUrlAdapter = ConfigTransversalCreatePersonQueueUrlAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(shared_1.QUEUES_CONFIG)),
    __metadata("design:paramtypes", [Object])
], ConfigTransversalCreatePersonQueueUrlAdapter);


/***/ },

/***/ "./apps/suppliers-ms/src/infrastructure/messaging/sqs/adapters/config-transversal-upload-files-queue-url.adapter.ts"
/*!**************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/infrastructure/messaging/sqs/adapters/config-transversal-upload-files-queue-url.adapter.ts ***!
  \**************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.ConfigTransversalUploadFilesQueueUrlAdapter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
let ConfigTransversalUploadFilesQueueUrlAdapter = class ConfigTransversalUploadFilesQueueUrlAdapter {
    queues_config;
    constructor(queues_config) {
        this.queues_config = queues_config;
    }
    get_upload_files_queue_url() {
        return this.queues_config.upload_files_queue_url;
    }
};
exports.ConfigTransversalUploadFilesQueueUrlAdapter = ConfigTransversalUploadFilesQueueUrlAdapter;
exports.ConfigTransversalUploadFilesQueueUrlAdapter = ConfigTransversalUploadFilesQueueUrlAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(shared_1.QUEUES_CONFIG)),
    __metadata("design:paramtypes", [Object])
], ConfigTransversalUploadFilesQueueUrlAdapter);


/***/ },

/***/ "./apps/suppliers-ms/src/infrastructure/messaging/sqs/adapters/sqs-message-publisher.adapter.ts"
/*!******************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/infrastructure/messaging/sqs/adapters/sqs-message-publisher.adapter.ts ***!
  \******************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
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


/***/ },

/***/ "./apps/suppliers-ms/src/infrastructure/messaging/sqs/adapters/sqs-partner-onboarding-files.adapter.ts"
/*!*************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/infrastructure/messaging/sqs/adapters/sqs-partner-onboarding-files.adapter.ts ***!
  \*************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.SqsPartnerOnboardingFilesAdapter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const publish_upload_files_event_use_case_1 = __webpack_require__(/*! @messaging/application/use-cases/publish-upload-files-event.use-case */ "./apps/suppliers-ms/src/modules/messaging/application/use-cases/publish-upload-files-event.use-case.ts");
const files_uploaded_correlation_awaiter_service_1 = __webpack_require__(/*! @messaging/application/services/files-uploaded-correlation-awaiter.service */ "./apps/suppliers-ms/src/modules/messaging/application/services/files-uploaded-correlation-awaiter.service.ts");
const DEFAULT_UPLOAD_AWAIT_MS = 120_000;
let SqsPartnerOnboardingFilesAdapter = class SqsPartnerOnboardingFilesAdapter {
    publish_upload_files;
    files_uploaded_awaiter;
    constructor(publish_upload_files, files_uploaded_awaiter) {
        this.publish_upload_files = publish_upload_files;
        this.files_uploaded_awaiter = files_uploaded_awaiter;
    }
    async resolve_urls(input) {
        const has_any = this.has_payload(input.bank_certification) ||
            this.has_payload(input.logo) ||
            this.has_payload(input.co_branding);
        if (!has_any) {
            return {
                bank_certification_url: '',
                logo_url: '',
                co_branding_url: '',
            };
        }
        await this.publish_upload_files.execute({
            correlation_id: input.correlation_id,
            idempotency_key: input.idempotency_key,
            files: {
                bank_certification: this.to_inline_payload(input.bank_certification),
                logo: this.to_inline_payload(input.logo),
                co_branding: this.to_inline_payload(input.co_branding),
            },
            file_folders: input.file_folders,
        });
        const timeout_ms = Number(process.env.PARTNER_FILES_UPLOAD_AWAIT_MS ?? DEFAULT_UPLOAD_AWAIT_MS);
        const urls = await this.files_uploaded_awaiter.wait(input.correlation_id, timeout_ms);
        return {
            bank_certification_url: urls.bank_certification_url ?? '',
            logo_url: urls.logo_url ?? '',
            co_branding_url: urls.co_branding_url ?? '',
        };
    }
    has_payload(f) {
        return (f !== undefined &&
            typeof f.content_base64 === 'string' &&
            f.content_base64.trim().length > 0);
    }
    to_inline_payload(f) {
        if (!this.has_payload(f) || f === undefined) {
            return undefined;
        }
        const mime = f.mimetype.trim().length > 0 ? f.mimetype : 'application/octet-stream';
        return `data:${mime};base64,${f.content_base64}`;
    }
};
exports.SqsPartnerOnboardingFilesAdapter = SqsPartnerOnboardingFilesAdapter;
exports.SqsPartnerOnboardingFilesAdapter = SqsPartnerOnboardingFilesAdapter = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof publish_upload_files_event_use_case_1.PublishUploadFilesEventUseCase !== "undefined" && publish_upload_files_event_use_case_1.PublishUploadFilesEventUseCase) === "function" ? _a : Object, typeof (_b = typeof files_uploaded_correlation_awaiter_service_1.FilesUploadedCorrelationAwaiter !== "undefined" && files_uploaded_correlation_awaiter_service_1.FilesUploadedCorrelationAwaiter) === "function" ? _b : Object])
], SqsPartnerOnboardingFilesAdapter);


/***/ },

/***/ "./apps/suppliers-ms/src/infrastructure/messaging/sqs/adapters/sqs-transversal-user-person-writer.adapter.ts"
/*!*******************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/infrastructure/messaging/sqs/adapters/sqs-transversal-user-person-writer.adapter.ts ***!
  \*******************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.SqsTransversalUserPersonWriterAdapter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const publish_create_partner_user_command_use_case_1 = __webpack_require__(/*! @messaging/application/use-cases/publish-create-partner-user-command.use-case */ "./apps/suppliers-ms/src/modules/messaging/application/use-cases/publish-create-partner-user-command.use-case.ts");
let SqsTransversalUserPersonWriterAdapter = class SqsTransversalUserPersonWriterAdapter {
    publish_create_partner_user;
    constructor(publish_create_partner_user) {
        this.publish_create_partner_user = publish_create_partner_user;
    }
    async publish_create_partner_user_command(input) {
        await this.publish_create_partner_user.execute(input);
    }
};
exports.SqsTransversalUserPersonWriterAdapter = SqsTransversalUserPersonWriterAdapter;
exports.SqsTransversalUserPersonWriterAdapter = SqsTransversalUserPersonWriterAdapter = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof publish_create_partner_user_command_use_case_1.PublishCreatePartnerUserCommandUseCase !== "undefined" && publish_create_partner_user_command_use_case_1.PublishCreatePartnerUserCommandUseCase) === "function" ? _a : Object])
], SqsTransversalUserPersonWriterAdapter);


/***/ },

/***/ "./apps/suppliers-ms/src/infrastructure/messaging/sqs/consumers/transversal-inbound-sqs.consumer.ts"
/*!**********************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/infrastructure/messaging/sqs/consumers/transversal-inbound-sqs.consumer.ts ***!
  \**********************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
var TransversalInboundSqsConsumer_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransversalInboundSqsConsumer = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const ingest_transversal_inbound_sqs_message_use_case_1 = __webpack_require__(/*! @messaging/application/use-cases/ingest-transversal-inbound-sqs-message.use-case */ "./apps/suppliers-ms/src/modules/messaging/application/use-cases/ingest-transversal-inbound-sqs-message.use-case.ts");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
let TransversalInboundSqsConsumer = TransversalInboundSqsConsumer_1 = class TransversalInboundSqsConsumer extends shared_1.BaseConsumer {
    queues_config;
    config_service;
    ingest_transversal_inbound;
    nest_logger = new common_1.Logger(TransversalInboundSqsConsumer_1.name);
    constructor(sqs_client, queues_config, config_service, ingest_transversal_inbound) {
        super(sqs_client, {
            log: (m) => this.nest_logger.log(m),
            warn: (m) => this.nest_logger.warn(m),
            error: (m) => this.nest_logger.error(m),
        });
        this.queues_config = queues_config;
        this.config_service = config_service;
        this.ingest_transversal_inbound = ingest_transversal_inbound;
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
        return 'Cola de entrada SQS no configurada (TRANSVERSAL_SQS_INBOUND_QUEUE_URL); worker inactivo.';
    }
    async handle(message) {
        const delete_on_validation_error = this.config_service.get('sqs.delete_on_validation_error') ?? false;
        return this.ingest_transversal_inbound.execute({
            body: message.body,
            delete_on_validation_error,
        });
    }
};
exports.TransversalInboundSqsConsumer = TransversalInboundSqsConsumer;
exports.TransversalInboundSqsConsumer = TransversalInboundSqsConsumer = TransversalInboundSqsConsumer_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(shared_1.SQS_CLIENT)),
    __param(1, (0, common_1.Inject)(shared_1.QUEUES_CONFIG)),
    __metadata("design:paramtypes", [Object, Object, typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof ingest_transversal_inbound_sqs_message_use_case_1.IngestTransversalInboundSqsMessageUseCase !== "undefined" && ingest_transversal_inbound_sqs_message_use_case_1.IngestTransversalInboundSqsMessageUseCase) === "function" ? _b : Object])
], TransversalInboundSqsConsumer);


/***/ },

/***/ "./apps/suppliers-ms/src/infrastructure/messaging/sqs/sqs.module.ts"
/*!**************************************************************************!*\
  !*** ./apps/suppliers-ms/src/infrastructure/messaging/sqs/sqs.module.ts ***!
  \**************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SqsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
const sqs_message_publisher_adapter_1 = __webpack_require__(/*! ./adapters/sqs-message-publisher.adapter */ "./apps/suppliers-ms/src/infrastructure/messaging/sqs/adapters/sqs-message-publisher.adapter.ts");
const config_outbound_transversal_queue_url_adapter_1 = __webpack_require__(/*! ./adapters/config-outbound-transversal-queue-url.adapter */ "./apps/suppliers-ms/src/infrastructure/messaging/sqs/adapters/config-outbound-transversal-queue-url.adapter.ts");
const config_outbound_products_queue_url_adapter_1 = __webpack_require__(/*! ./adapters/config-outbound-products-queue-url.adapter */ "./apps/suppliers-ms/src/infrastructure/messaging/sqs/adapters/config-outbound-products-queue-url.adapter.ts");
const transversal_inbound_sqs_consumer_1 = __webpack_require__(/*! ./consumers/transversal-inbound-sqs.consumer */ "./apps/suppliers-ms/src/infrastructure/messaging/sqs/consumers/transversal-inbound-sqs.consumer.ts");
const messaging_application_module_1 = __webpack_require__(/*! @messaging/messaging-application.module */ "./apps/suppliers-ms/src/modules/messaging/messaging-application.module.ts");
const outbound_message_publisher_port_1 = __webpack_require__(/*! @messaging/domain/ports/outbound-message-publisher.port */ "./apps/suppliers-ms/src/modules/messaging/domain/ports/outbound-message-publisher.port.ts");
const transversal_outbound_queue_url_port_1 = __webpack_require__(/*! @messaging/domain/ports/transversal-outbound-queue-url.port */ "./apps/suppliers-ms/src/modules/messaging/domain/ports/transversal-outbound-queue-url.port.ts");
const products_outbound_queue_url_port_1 = __webpack_require__(/*! @messaging/domain/ports/products-outbound-queue-url.port */ "./apps/suppliers-ms/src/modules/messaging/domain/ports/products-outbound-queue-url.port.ts");
const transversal_upload_files_queue_url_port_1 = __webpack_require__(/*! @messaging/domain/ports/transversal-upload-files-queue-url.port */ "./apps/suppliers-ms/src/modules/messaging/domain/ports/transversal-upload-files-queue-url.port.ts");
const config_transversal_upload_files_queue_url_adapter_1 = __webpack_require__(/*! ./adapters/config-transversal-upload-files-queue-url.adapter */ "./apps/suppliers-ms/src/infrastructure/messaging/sqs/adapters/config-transversal-upload-files-queue-url.adapter.ts");
const transversal_create_partner_user_queue_url_port_1 = __webpack_require__(/*! @messaging/domain/ports/transversal-create-partner-user-queue-url.port */ "./apps/suppliers-ms/src/modules/messaging/domain/ports/transversal-create-partner-user-queue-url.port.ts");
const config_transversal_create_partner_user_queue_url_adapter_1 = __webpack_require__(/*! ./adapters/config-transversal-create-partner-user-queue-url.adapter */ "./apps/suppliers-ms/src/infrastructure/messaging/sqs/adapters/config-transversal-create-partner-user-queue-url.adapter.ts");
const transversal_create_person_queue_url_port_1 = __webpack_require__(/*! @messaging/domain/ports/transversal-create-person-queue-url.port */ "./apps/suppliers-ms/src/modules/messaging/domain/ports/transversal-create-person-queue-url.port.ts");
const config_transversal_create_person_queue_url_adapter_1 = __webpack_require__(/*! ./adapters/config-transversal-create-person-queue-url.adapter */ "./apps/suppliers-ms/src/infrastructure/messaging/sqs/adapters/config-transversal-create-person-queue-url.adapter.ts");
const publish_products_event_use_case_1 = __webpack_require__(/*! @messaging/application/use-cases/publish-products-event.use-case */ "./apps/suppliers-ms/src/modules/messaging/application/use-cases/publish-products-event.use-case.ts");
const products_create_credit_facility_queue_url_port_1 = __webpack_require__(/*! @messaging/domain/ports/products-create-credit-facility-queue-url.port */ "./apps/suppliers-ms/src/modules/messaging/domain/ports/products-create-credit-facility-queue-url.port.ts");
const config_products_create_credit_facility_queue_url_adapter_1 = __webpack_require__(/*! ./adapters/config-products-create-credit-facility-queue-url.adapter */ "./apps/suppliers-ms/src/infrastructure/messaging/sqs/adapters/config-products-create-credit-facility-queue-url.adapter.ts");
const products_create_categories_queue_url_port_1 = __webpack_require__(/*! @messaging/domain/ports/products-create-categories-queue-url.port */ "./apps/suppliers-ms/src/modules/messaging/domain/ports/products-create-categories-queue-url.port.ts");
const config_products_create_categories_queue_url_adapter_1 = __webpack_require__(/*! ./adapters/config-products-create-categories-queue-url.adapter */ "./apps/suppliers-ms/src/infrastructure/messaging/sqs/adapters/config-products-create-categories-queue-url.adapter.ts");
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


/***/ },

/***/ "./apps/suppliers-ms/src/modules/bank-accounts/application/mapping/bank-account-public-fields.builder.ts"
/*!***************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/bank-accounts/application/mapping/bank-account-public-fields.builder.ts ***!
  \***************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.build_bank_account_public_fields = build_bank_account_public_fields;
function build_bank_account_public_fields(account) {
    return {
        internal_id: account.internal_id,
        external_id: account.external_id,
        bank_entity: account.bank_entity,
        account_number: account.account_number,
        bank_certification: account.bank_certification,
        created_at: account.created_at,
        updated_at: account.updated_at,
    };
}


/***/ },

/***/ "./apps/suppliers-ms/src/modules/bank-accounts/application/use-cases/create-bank-account/create-bank-account.request.ts"
/*!******************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/bank-accounts/application/use-cases/create-bank-account/create-bank-account.request.ts ***!
  \******************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateBankAccountRequest = void 0;
class CreateBankAccountRequest {
    bank_entity;
    account_number;
    bank_certification;
    constructor(bank_entity, account_number, bank_certification) {
        this.bank_entity = bank_entity;
        this.account_number = account_number;
        this.bank_certification = bank_certification;
    }
}
exports.CreateBankAccountRequest = CreateBankAccountRequest;


/***/ },

/***/ "./apps/suppliers-ms/src/modules/bank-accounts/application/use-cases/create-bank-account/create-bank-account.response.ts"
/*!*******************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/bank-accounts/application/use-cases/create-bank-account/create-bank-account.response.ts ***!
  \*******************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateBankAccountResponse = void 0;
class CreateBankAccountResponse {
    internal_id;
    external_id;
    bank_entity;
    account_number;
    bank_certification;
    created_at;
    updated_at;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.CreateBankAccountResponse = CreateBankAccountResponse;


/***/ },

/***/ "./apps/suppliers-ms/src/modules/bank-accounts/application/use-cases/create-bank-account/create-bank-account.use-case.ts"
/*!*******************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/bank-accounts/application/use-cases/create-bank-account/create-bank-account.use-case.ts ***!
  \*******************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.CreateBankAccountUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const bank_accounts_tokens_1 = __webpack_require__(/*! @modules/bank-accounts/bank-accounts.tokens */ "./apps/suppliers-ms/src/modules/bank-accounts/bank-accounts.tokens.ts");
const bank_account_repository_1 = __webpack_require__(/*! @modules/bank-accounts/domain/repositories/bank-account.repository */ "./apps/suppliers-ms/src/modules/bank-accounts/domain/repositories/bank-account.repository.ts");
const bank_account_public_fields_builder_1 = __webpack_require__(/*! @modules/bank-accounts/application/mapping/bank-account-public-fields.builder */ "./apps/suppliers-ms/src/modules/bank-accounts/application/mapping/bank-account-public-fields.builder.ts");
const create_bank_account_response_1 = __webpack_require__(/*! ./create-bank-account.response */ "./apps/suppliers-ms/src/modules/bank-accounts/application/use-cases/create-bank-account/create-bank-account.response.ts");
let CreateBankAccountUseCase = class CreateBankAccountUseCase {
    bank_account_repository;
    constructor(bank_account_repository) {
        this.bank_account_repository = bank_account_repository;
    }
    async execute(req) {
        if (req.bank_entity.trim().length === 0) {
            throw new common_1.BadRequestException('bank_entity required');
        }
        if (req.account_number.trim().length === 0) {
            throw new common_1.BadRequestException('account_number required');
        }
        const created = await this.bank_account_repository.create({
            bank_entity: req.bank_entity.trim(),
            account_number: req.account_number.trim(),
            bank_certification: req.bank_certification,
        });
        const fields = (0, bank_account_public_fields_builder_1.build_bank_account_public_fields)(created);
        return new create_bank_account_response_1.CreateBankAccountResponse(fields);
    }
};
exports.CreateBankAccountUseCase = CreateBankAccountUseCase;
exports.CreateBankAccountUseCase = CreateBankAccountUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(bank_accounts_tokens_1.BANK_ACCOUNT_REPOSITORY)),
    __metadata("design:paramtypes", [typeof (_a = typeof bank_account_repository_1.BankAccountRepository !== "undefined" && bank_account_repository_1.BankAccountRepository) === "function" ? _a : Object])
], CreateBankAccountUseCase);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/bank-accounts/application/use-cases/delete-bank-account-by-external-id/delete-bank-account-by-external-id.use-case.ts"
/*!*************************************************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/bank-accounts/application/use-cases/delete-bank-account-by-external-id/delete-bank-account-by-external-id.use-case.ts ***!
  \*************************************************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.DeleteBankAccountByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const bank_accounts_tokens_1 = __webpack_require__(/*! @modules/bank-accounts/bank-accounts.tokens */ "./apps/suppliers-ms/src/modules/bank-accounts/bank-accounts.tokens.ts");
const bank_account_repository_1 = __webpack_require__(/*! @modules/bank-accounts/domain/repositories/bank-account.repository */ "./apps/suppliers-ms/src/modules/bank-accounts/domain/repositories/bank-account.repository.ts");
let DeleteBankAccountByExternalIdUseCase = class DeleteBankAccountByExternalIdUseCase {
    bank_account_repository;
    constructor(bank_account_repository) {
        this.bank_account_repository = bank_account_repository;
    }
    async execute(req) {
        const ok = await this.bank_account_repository.delete_by_external_id(req.external_id);
        if (!ok) {
            throw new common_1.NotFoundException('bank account not found');
        }
    }
};
exports.DeleteBankAccountByExternalIdUseCase = DeleteBankAccountByExternalIdUseCase;
exports.DeleteBankAccountByExternalIdUseCase = DeleteBankAccountByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(bank_accounts_tokens_1.BANK_ACCOUNT_REPOSITORY)),
    __metadata("design:paramtypes", [typeof (_a = typeof bank_account_repository_1.BankAccountRepository !== "undefined" && bank_account_repository_1.BankAccountRepository) === "function" ? _a : Object])
], DeleteBankAccountByExternalIdUseCase);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/bank-accounts/application/use-cases/get-bank-account-by-external-id/get-bank-account-by-external-id.response.ts"
/*!*******************************************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/bank-accounts/application/use-cases/get-bank-account-by-external-id/get-bank-account-by-external-id.response.ts ***!
  \*******************************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetBankAccountByExternalIdResponse = void 0;
class GetBankAccountByExternalIdResponse {
    internal_id;
    external_id;
    bank_entity;
    account_number;
    bank_certification;
    created_at;
    updated_at;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.GetBankAccountByExternalIdResponse = GetBankAccountByExternalIdResponse;


/***/ },

/***/ "./apps/suppliers-ms/src/modules/bank-accounts/application/use-cases/get-bank-account-by-external-id/get-bank-account-by-external-id.use-case.ts"
/*!*******************************************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/bank-accounts/application/use-cases/get-bank-account-by-external-id/get-bank-account-by-external-id.use-case.ts ***!
  \*******************************************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.GetBankAccountByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const bank_accounts_tokens_1 = __webpack_require__(/*! @modules/bank-accounts/bank-accounts.tokens */ "./apps/suppliers-ms/src/modules/bank-accounts/bank-accounts.tokens.ts");
const bank_account_repository_1 = __webpack_require__(/*! @modules/bank-accounts/domain/repositories/bank-account.repository */ "./apps/suppliers-ms/src/modules/bank-accounts/domain/repositories/bank-account.repository.ts");
const bank_account_public_fields_builder_1 = __webpack_require__(/*! @modules/bank-accounts/application/mapping/bank-account-public-fields.builder */ "./apps/suppliers-ms/src/modules/bank-accounts/application/mapping/bank-account-public-fields.builder.ts");
const get_bank_account_by_external_id_response_1 = __webpack_require__(/*! ./get-bank-account-by-external-id.response */ "./apps/suppliers-ms/src/modules/bank-accounts/application/use-cases/get-bank-account-by-external-id/get-bank-account-by-external-id.response.ts");
let GetBankAccountByExternalIdUseCase = class GetBankAccountByExternalIdUseCase {
    bank_account_repository;
    constructor(bank_account_repository) {
        this.bank_account_repository = bank_account_repository;
    }
    async execute(req) {
        const row = await this.bank_account_repository.find_by_external_id(req.external_id);
        if (row === null) {
            throw new common_1.NotFoundException('bank account not found');
        }
        const fields = (0, bank_account_public_fields_builder_1.build_bank_account_public_fields)(row);
        return new get_bank_account_by_external_id_response_1.GetBankAccountByExternalIdResponse(fields);
    }
};
exports.GetBankAccountByExternalIdUseCase = GetBankAccountByExternalIdUseCase;
exports.GetBankAccountByExternalIdUseCase = GetBankAccountByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(bank_accounts_tokens_1.BANK_ACCOUNT_REPOSITORY)),
    __metadata("design:paramtypes", [typeof (_a = typeof bank_account_repository_1.BankAccountRepository !== "undefined" && bank_account_repository_1.BankAccountRepository) === "function" ? _a : Object])
], GetBankAccountByExternalIdUseCase);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/bank-accounts/application/use-cases/list-bank-accounts/list-bank-accounts.response.ts"
/*!*****************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/bank-accounts/application/use-cases/list-bank-accounts/list-bank-accounts.response.ts ***!
  \*****************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListBankAccountsItemResponse = void 0;
class ListBankAccountsItemResponse {
    internal_id;
    external_id;
    bank_entity;
    account_number;
    bank_certification;
    created_at;
    updated_at;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.ListBankAccountsItemResponse = ListBankAccountsItemResponse;


/***/ },

/***/ "./apps/suppliers-ms/src/modules/bank-accounts/application/use-cases/list-bank-accounts/list-bank-accounts.use-case.ts"
/*!*****************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/bank-accounts/application/use-cases/list-bank-accounts/list-bank-accounts.use-case.ts ***!
  \*****************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.ListBankAccountsUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const bank_accounts_tokens_1 = __webpack_require__(/*! @modules/bank-accounts/bank-accounts.tokens */ "./apps/suppliers-ms/src/modules/bank-accounts/bank-accounts.tokens.ts");
const bank_account_repository_1 = __webpack_require__(/*! @modules/bank-accounts/domain/repositories/bank-account.repository */ "./apps/suppliers-ms/src/modules/bank-accounts/domain/repositories/bank-account.repository.ts");
const bank_account_public_fields_builder_1 = __webpack_require__(/*! @modules/bank-accounts/application/mapping/bank-account-public-fields.builder */ "./apps/suppliers-ms/src/modules/bank-accounts/application/mapping/bank-account-public-fields.builder.ts");
const list_bank_accounts_response_1 = __webpack_require__(/*! ./list-bank-accounts.response */ "./apps/suppliers-ms/src/modules/bank-accounts/application/use-cases/list-bank-accounts/list-bank-accounts.response.ts");
let ListBankAccountsUseCase = class ListBankAccountsUseCase {
    bank_account_repository;
    constructor(bank_account_repository) {
        this.bank_account_repository = bank_account_repository;
    }
    async execute() {
        const rows = await this.bank_account_repository.find_all();
        return rows.map((row) => new list_bank_accounts_response_1.ListBankAccountsItemResponse((0, bank_account_public_fields_builder_1.build_bank_account_public_fields)(row)));
    }
};
exports.ListBankAccountsUseCase = ListBankAccountsUseCase;
exports.ListBankAccountsUseCase = ListBankAccountsUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(bank_accounts_tokens_1.BANK_ACCOUNT_REPOSITORY)),
    __metadata("design:paramtypes", [typeof (_a = typeof bank_account_repository_1.BankAccountRepository !== "undefined" && bank_account_repository_1.BankAccountRepository) === "function" ? _a : Object])
], ListBankAccountsUseCase);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/bank-accounts/application/use-cases/update-bank-account-by-external-id/update-bank-account-by-external-id.response.ts"
/*!*************************************************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/bank-accounts/application/use-cases/update-bank-account-by-external-id/update-bank-account-by-external-id.response.ts ***!
  \*************************************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateBankAccountByExternalIdResponse = void 0;
class UpdateBankAccountByExternalIdResponse {
    internal_id;
    external_id;
    bank_entity;
    account_number;
    bank_certification;
    created_at;
    updated_at;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.UpdateBankAccountByExternalIdResponse = UpdateBankAccountByExternalIdResponse;


/***/ },

/***/ "./apps/suppliers-ms/src/modules/bank-accounts/application/use-cases/update-bank-account-by-external-id/update-bank-account-by-external-id.use-case.ts"
/*!*************************************************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/bank-accounts/application/use-cases/update-bank-account-by-external-id/update-bank-account-by-external-id.use-case.ts ***!
  \*************************************************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.UpdateBankAccountByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const bank_accounts_tokens_1 = __webpack_require__(/*! @modules/bank-accounts/bank-accounts.tokens */ "./apps/suppliers-ms/src/modules/bank-accounts/bank-accounts.tokens.ts");
const bank_account_repository_1 = __webpack_require__(/*! @modules/bank-accounts/domain/repositories/bank-account.repository */ "./apps/suppliers-ms/src/modules/bank-accounts/domain/repositories/bank-account.repository.ts");
const bank_account_public_fields_builder_1 = __webpack_require__(/*! @modules/bank-accounts/application/mapping/bank-account-public-fields.builder */ "./apps/suppliers-ms/src/modules/bank-accounts/application/mapping/bank-account-public-fields.builder.ts");
const update_bank_account_by_external_id_response_1 = __webpack_require__(/*! ./update-bank-account-by-external-id.response */ "./apps/suppliers-ms/src/modules/bank-accounts/application/use-cases/update-bank-account-by-external-id/update-bank-account-by-external-id.response.ts");
let UpdateBankAccountByExternalIdUseCase = class UpdateBankAccountByExternalIdUseCase {
    bank_account_repository;
    constructor(bank_account_repository) {
        this.bank_account_repository = bank_account_repository;
    }
    async execute(req) {
        const patch = {};
        if (req.bank_entity !== undefined) {
            if (req.bank_entity.trim().length === 0) {
                throw new common_1.BadRequestException('bank_entity required');
            }
            patch.bank_entity = req.bank_entity.trim();
        }
        if (req.account_number !== undefined) {
            if (req.account_number.trim().length === 0) {
                throw new common_1.BadRequestException('account_number required');
            }
            patch.account_number = req.account_number.trim();
        }
        if (req.bank_certification !== undefined) {
            patch.bank_certification = req.bank_certification;
        }
        const updated = await this.bank_account_repository.update_by_external_id(req.external_id, patch);
        if (updated === null) {
            throw new common_1.NotFoundException('bank account not found');
        }
        const fields = (0, bank_account_public_fields_builder_1.build_bank_account_public_fields)(updated);
        return new update_bank_account_by_external_id_response_1.UpdateBankAccountByExternalIdResponse(fields);
    }
};
exports.UpdateBankAccountByExternalIdUseCase = UpdateBankAccountByExternalIdUseCase;
exports.UpdateBankAccountByExternalIdUseCase = UpdateBankAccountByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(bank_accounts_tokens_1.BANK_ACCOUNT_REPOSITORY)),
    __metadata("design:paramtypes", [typeof (_a = typeof bank_account_repository_1.BankAccountRepository !== "undefined" && bank_account_repository_1.BankAccountRepository) === "function" ? _a : Object])
], UpdateBankAccountByExternalIdUseCase);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/bank-accounts/bank-accounts.module.ts"
/*!*****************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/bank-accounts/bank-accounts.module.ts ***!
  \*****************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BankAccountsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const infrastructure_module_1 = __webpack_require__(/*! @infrastructure/infrastructure.module */ "./apps/suppliers-ms/src/infrastructure/infrastructure.module.ts");
const typeorm_bank_account_repository_1 = __webpack_require__(/*! @infrastructure/database/repositories/typeorm-bank-account.repository */ "./apps/suppliers-ms/src/infrastructure/database/repositories/typeorm-bank-account.repository.ts");
const bank_accounts_tokens_1 = __webpack_require__(/*! ./bank-accounts.tokens */ "./apps/suppliers-ms/src/modules/bank-accounts/bank-accounts.tokens.ts");
const create_bank_account_use_case_1 = __webpack_require__(/*! ./application/use-cases/create-bank-account/create-bank-account.use-case */ "./apps/suppliers-ms/src/modules/bank-accounts/application/use-cases/create-bank-account/create-bank-account.use-case.ts");
const get_bank_account_by_external_id_use_case_1 = __webpack_require__(/*! ./application/use-cases/get-bank-account-by-external-id/get-bank-account-by-external-id.use-case */ "./apps/suppliers-ms/src/modules/bank-accounts/application/use-cases/get-bank-account-by-external-id/get-bank-account-by-external-id.use-case.ts");
const list_bank_accounts_use_case_1 = __webpack_require__(/*! ./application/use-cases/list-bank-accounts/list-bank-accounts.use-case */ "./apps/suppliers-ms/src/modules/bank-accounts/application/use-cases/list-bank-accounts/list-bank-accounts.use-case.ts");
const update_bank_account_by_external_id_use_case_1 = __webpack_require__(/*! ./application/use-cases/update-bank-account-by-external-id/update-bank-account-by-external-id.use-case */ "./apps/suppliers-ms/src/modules/bank-accounts/application/use-cases/update-bank-account-by-external-id/update-bank-account-by-external-id.use-case.ts");
const delete_bank_account_by_external_id_use_case_1 = __webpack_require__(/*! ./application/use-cases/delete-bank-account-by-external-id/delete-bank-account-by-external-id.use-case */ "./apps/suppliers-ms/src/modules/bank-accounts/application/use-cases/delete-bank-account-by-external-id/delete-bank-account-by-external-id.use-case.ts");
let BankAccountsModule = class BankAccountsModule {
};
exports.BankAccountsModule = BankAccountsModule;
exports.BankAccountsModule = BankAccountsModule = __decorate([
    (0, common_1.Module)({
        imports: [infrastructure_module_1.InfrastructureModule],
        providers: [
            {
                provide: bank_accounts_tokens_1.BANK_ACCOUNT_REPOSITORY,
                useExisting: typeorm_bank_account_repository_1.TypeormBankAccountRepository,
            },
            create_bank_account_use_case_1.CreateBankAccountUseCase,
            get_bank_account_by_external_id_use_case_1.GetBankAccountByExternalIdUseCase,
            list_bank_accounts_use_case_1.ListBankAccountsUseCase,
            update_bank_account_by_external_id_use_case_1.UpdateBankAccountByExternalIdUseCase,
            delete_bank_account_by_external_id_use_case_1.DeleteBankAccountByExternalIdUseCase,
        ],
        exports: [
            bank_accounts_tokens_1.BANK_ACCOUNT_REPOSITORY,
            create_bank_account_use_case_1.CreateBankAccountUseCase,
            get_bank_account_by_external_id_use_case_1.GetBankAccountByExternalIdUseCase,
            list_bank_accounts_use_case_1.ListBankAccountsUseCase,
            update_bank_account_by_external_id_use_case_1.UpdateBankAccountByExternalIdUseCase,
            delete_bank_account_by_external_id_use_case_1.DeleteBankAccountByExternalIdUseCase,
        ],
    })
], BankAccountsModule);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/bank-accounts/bank-accounts.tokens.ts"
/*!*****************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/bank-accounts/bank-accounts.tokens.ts ***!
  \*****************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BANK_ACCOUNT_REPOSITORY = void 0;
exports.BANK_ACCOUNT_REPOSITORY = Symbol('BANK_ACCOUNT_REPOSITORY');


/***/ },

/***/ "./apps/suppliers-ms/src/modules/bank-accounts/domain/entities/bank-account.entity.ts"
/*!********************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/bank-accounts/domain/entities/bank-account.entity.ts ***!
  \********************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BankAccount = void 0;
class BankAccount {
    internal_id;
    external_id;
    bank_entity;
    account_number;
    bank_certification;
    created_at;
    updated_at;
    constructor(internal_id, external_id, bank_entity, account_number, bank_certification, created_at, updated_at) {
        this.internal_id = internal_id;
        this.external_id = external_id;
        this.bank_entity = bank_entity;
        this.account_number = account_number;
        this.bank_certification = bank_certification;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
exports.BankAccount = BankAccount;


/***/ },

/***/ "./apps/suppliers-ms/src/modules/bank-accounts/domain/repositories/bank-account.repository.ts"
/*!****************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/bank-accounts/domain/repositories/bank-account.repository.ts ***!
  \****************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ "./apps/suppliers-ms/src/modules/businesses/application/mapping/business-public-fields.builder.ts"
/*!********************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/businesses/application/mapping/business-public-fields.builder.ts ***!
  \********************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.build_business_public_fields = build_business_public_fields;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
async function build_business_public_fields(business, lookup) {
    const [person_external_id, city_external_id] = await Promise.all([
        lookup.get_person_external_id_by_internal_id(business.person_id),
        business.city_id === null
            ? Promise.resolve(null)
            : lookup.get_city_external_id_by_internal_id(business.city_id),
    ]);
    if (!person_external_id) {
        throw new common_1.InternalServerErrorException();
    }
    return {
        internal_id: business.internal_id,
        external_id: business.external_id,
        person_external_id,
        city_external_id,
        entity_type: business.entity_type,
        business_name: business.business_name,
        business_address: business.business_address,
        business_type: business.business_type,
        relationship_to_business: business.relationship_to_business,
        legal_name: business.legal_name,
        trade_name: business.trade_name,
        tax_id: business.tax_id,
        year_of_establishment: business.year_of_establishment,
        created_at: business.created_at,
        updated_at: business.updated_at,
    };
}


/***/ },

/***/ "./apps/suppliers-ms/src/modules/businesses/application/use-cases/create-business/create-business.request.ts"
/*!*******************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/businesses/application/use-cases/create-business/create-business.request.ts ***!
  \*******************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateBusinessRequest = void 0;
class CreateBusinessRequest {
    person_internal_id;
    city_external_id;
    entity_type;
    business_name;
    business_address;
    business_type;
    relationship_to_business;
    legal_name;
    trade_name;
    tax_id;
    year_of_establishment;
    constructor(person_internal_id, city_external_id, entity_type, business_name, business_address, business_type, relationship_to_business, legal_name, trade_name, tax_id, year_of_establishment) {
        this.person_internal_id = person_internal_id;
        this.city_external_id = city_external_id;
        this.entity_type = entity_type;
        this.business_name = business_name;
        this.business_address = business_address;
        this.business_type = business_type;
        this.relationship_to_business = relationship_to_business;
        this.legal_name = legal_name;
        this.trade_name = trade_name;
        this.tax_id = tax_id;
        this.year_of_establishment = year_of_establishment;
    }
}
exports.CreateBusinessRequest = CreateBusinessRequest;


/***/ },

/***/ "./apps/suppliers-ms/src/modules/businesses/application/use-cases/create-business/create-business.response.ts"
/*!********************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/businesses/application/use-cases/create-business/create-business.response.ts ***!
  \********************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateBusinessResponse = void 0;
class CreateBusinessResponse {
    internal_id;
    external_id;
    person_external_id;
    city_external_id;
    entity_type;
    business_name;
    business_address;
    business_type;
    relationship_to_business;
    legal_name;
    trade_name;
    tax_id;
    year_of_establishment;
    created_at;
    updated_at;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.CreateBusinessResponse = CreateBusinessResponse;


/***/ },

/***/ "./apps/suppliers-ms/src/modules/businesses/application/use-cases/create-business/create-business.use-case.ts"
/*!********************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/businesses/application/use-cases/create-business/create-business.use-case.ts ***!
  \********************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.CreateBusinessUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const suppliers_reference_lookup_port_1 = __webpack_require__(/*! @common/ports/suppliers-reference-lookup.port */ "./apps/suppliers-ms/src/common/ports/suppliers-reference-lookup.port.ts");
const businesses_tokens_1 = __webpack_require__(/*! @modules/businesses/businesses.tokens */ "./apps/suppliers-ms/src/modules/businesses/businesses.tokens.ts");
const business_repository_1 = __webpack_require__(/*! @modules/businesses/domain/repositories/business.repository */ "./apps/suppliers-ms/src/modules/businesses/domain/repositories/business.repository.ts");
const business_public_fields_builder_1 = __webpack_require__(/*! @modules/businesses/application/mapping/business-public-fields.builder */ "./apps/suppliers-ms/src/modules/businesses/application/mapping/business-public-fields.builder.ts");
const create_business_response_1 = __webpack_require__(/*! ./create-business.response */ "./apps/suppliers-ms/src/modules/businesses/application/use-cases/create-business/create-business.response.ts");
let CreateBusinessUseCase = class CreateBusinessUseCase {
    business_repository;
    lookup;
    constructor(business_repository, lookup) {
        this.business_repository = business_repository;
        this.lookup = lookup;
    }
    async execute(req) {
        let city_id = null;
        if (req.city_external_id !== null) {
            const c_id = await this.lookup.get_city_internal_id_by_external_id(req.city_external_id);
            if (c_id === null) {
                throw new common_1.NotFoundException('city not found');
            }
            city_id = c_id;
        }
        const created = await this.business_repository.create({
            person_id: req.person_internal_id,
            city_id,
            entity_type: req.entity_type,
            business_name: req.business_name,
            business_address: req.business_address,
            business_type: req.business_type,
            relationship_to_business: req.relationship_to_business,
            legal_name: req.legal_name,
            trade_name: req.trade_name,
            tax_id: req.tax_id,
            year_of_establishment: req.year_of_establishment,
        });
        const fields = await (0, business_public_fields_builder_1.build_business_public_fields)(created, this.lookup);
        return new create_business_response_1.CreateBusinessResponse(fields);
    }
};
exports.CreateBusinessUseCase = CreateBusinessUseCase;
exports.CreateBusinessUseCase = CreateBusinessUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(businesses_tokens_1.BUSINESS_REPOSITORY)),
    __param(1, (0, common_1.Inject)(suppliers_reference_lookup_port_1.SUPPLIERS_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [typeof (_a = typeof business_repository_1.BusinessRepository !== "undefined" && business_repository_1.BusinessRepository) === "function" ? _a : Object, typeof (_b = typeof suppliers_reference_lookup_port_1.SuppliersReferenceLookupPort !== "undefined" && suppliers_reference_lookup_port_1.SuppliersReferenceLookupPort) === "function" ? _b : Object])
], CreateBusinessUseCase);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/businesses/application/use-cases/delete-business-by-external-id/delete-business-by-external-id.use-case.ts"
/*!**************************************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/businesses/application/use-cases/delete-business-by-external-id/delete-business-by-external-id.use-case.ts ***!
  \**************************************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.DeleteBusinessByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const businesses_tokens_1 = __webpack_require__(/*! @modules/businesses/businesses.tokens */ "./apps/suppliers-ms/src/modules/businesses/businesses.tokens.ts");
const business_repository_1 = __webpack_require__(/*! @modules/businesses/domain/repositories/business.repository */ "./apps/suppliers-ms/src/modules/businesses/domain/repositories/business.repository.ts");
let DeleteBusinessByExternalIdUseCase = class DeleteBusinessByExternalIdUseCase {
    business_repository;
    constructor(business_repository) {
        this.business_repository = business_repository;
    }
    async execute(req) {
        const ok = await this.business_repository.delete_by_external_id(req.external_id);
        if (!ok) {
            throw new common_1.NotFoundException('business not found');
        }
    }
};
exports.DeleteBusinessByExternalIdUseCase = DeleteBusinessByExternalIdUseCase;
exports.DeleteBusinessByExternalIdUseCase = DeleteBusinessByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(businesses_tokens_1.BUSINESS_REPOSITORY)),
    __metadata("design:paramtypes", [typeof (_a = typeof business_repository_1.BusinessRepository !== "undefined" && business_repository_1.BusinessRepository) === "function" ? _a : Object])
], DeleteBusinessByExternalIdUseCase);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/businesses/application/use-cases/get-business-by-external-id/get-business-by-external-id.response.ts"
/*!********************************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/businesses/application/use-cases/get-business-by-external-id/get-business-by-external-id.response.ts ***!
  \********************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetBusinessByExternalIdResponse = void 0;
class GetBusinessByExternalIdResponse {
    internal_id;
    external_id;
    person_external_id;
    city_external_id;
    entity_type;
    business_name;
    business_address;
    business_type;
    relationship_to_business;
    legal_name;
    trade_name;
    tax_id;
    year_of_establishment;
    created_at;
    updated_at;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.GetBusinessByExternalIdResponse = GetBusinessByExternalIdResponse;


/***/ },

/***/ "./apps/suppliers-ms/src/modules/businesses/application/use-cases/get-business-by-external-id/get-business-by-external-id.use-case.ts"
/*!********************************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/businesses/application/use-cases/get-business-by-external-id/get-business-by-external-id.use-case.ts ***!
  \********************************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.GetBusinessByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const suppliers_reference_lookup_port_1 = __webpack_require__(/*! @common/ports/suppliers-reference-lookup.port */ "./apps/suppliers-ms/src/common/ports/suppliers-reference-lookup.port.ts");
const businesses_tokens_1 = __webpack_require__(/*! @modules/businesses/businesses.tokens */ "./apps/suppliers-ms/src/modules/businesses/businesses.tokens.ts");
const business_repository_1 = __webpack_require__(/*! @modules/businesses/domain/repositories/business.repository */ "./apps/suppliers-ms/src/modules/businesses/domain/repositories/business.repository.ts");
const business_public_fields_builder_1 = __webpack_require__(/*! @modules/businesses/application/mapping/business-public-fields.builder */ "./apps/suppliers-ms/src/modules/businesses/application/mapping/business-public-fields.builder.ts");
const get_business_by_external_id_response_1 = __webpack_require__(/*! ./get-business-by-external-id.response */ "./apps/suppliers-ms/src/modules/businesses/application/use-cases/get-business-by-external-id/get-business-by-external-id.response.ts");
let GetBusinessByExternalIdUseCase = class GetBusinessByExternalIdUseCase {
    business_repository;
    lookup;
    constructor(business_repository, lookup) {
        this.business_repository = business_repository;
        this.lookup = lookup;
    }
    async execute(req) {
        const row = await this.business_repository.find_by_external_id(req.external_id);
        if (row === null) {
            throw new common_1.NotFoundException('business not found');
        }
        const fields = await (0, business_public_fields_builder_1.build_business_public_fields)(row, this.lookup);
        return new get_business_by_external_id_response_1.GetBusinessByExternalIdResponse(fields);
    }
};
exports.GetBusinessByExternalIdUseCase = GetBusinessByExternalIdUseCase;
exports.GetBusinessByExternalIdUseCase = GetBusinessByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(businesses_tokens_1.BUSINESS_REPOSITORY)),
    __param(1, (0, common_1.Inject)(suppliers_reference_lookup_port_1.SUPPLIERS_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [typeof (_a = typeof business_repository_1.BusinessRepository !== "undefined" && business_repository_1.BusinessRepository) === "function" ? _a : Object, typeof (_b = typeof suppliers_reference_lookup_port_1.SuppliersReferenceLookupPort !== "undefined" && suppliers_reference_lookup_port_1.SuppliersReferenceLookupPort) === "function" ? _b : Object])
], GetBusinessByExternalIdUseCase);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/businesses/application/use-cases/list-businesses/list-businesses.response.ts"
/*!********************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/businesses/application/use-cases/list-businesses/list-businesses.response.ts ***!
  \********************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListBusinessesItemResponse = void 0;
class ListBusinessesItemResponse {
    internal_id;
    external_id;
    person_external_id;
    city_external_id;
    entity_type;
    business_name;
    business_address;
    business_type;
    relationship_to_business;
    legal_name;
    trade_name;
    tax_id;
    year_of_establishment;
    created_at;
    updated_at;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.ListBusinessesItemResponse = ListBusinessesItemResponse;


/***/ },

/***/ "./apps/suppliers-ms/src/modules/businesses/application/use-cases/list-businesses/list-businesses.use-case.ts"
/*!********************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/businesses/application/use-cases/list-businesses/list-businesses.use-case.ts ***!
  \********************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.ListBusinessesUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const suppliers_reference_lookup_port_1 = __webpack_require__(/*! @common/ports/suppliers-reference-lookup.port */ "./apps/suppliers-ms/src/common/ports/suppliers-reference-lookup.port.ts");
const businesses_tokens_1 = __webpack_require__(/*! @modules/businesses/businesses.tokens */ "./apps/suppliers-ms/src/modules/businesses/businesses.tokens.ts");
const business_repository_1 = __webpack_require__(/*! @modules/businesses/domain/repositories/business.repository */ "./apps/suppliers-ms/src/modules/businesses/domain/repositories/business.repository.ts");
const business_public_fields_builder_1 = __webpack_require__(/*! @modules/businesses/application/mapping/business-public-fields.builder */ "./apps/suppliers-ms/src/modules/businesses/application/mapping/business-public-fields.builder.ts");
const list_businesses_response_1 = __webpack_require__(/*! ./list-businesses.response */ "./apps/suppliers-ms/src/modules/businesses/application/use-cases/list-businesses/list-businesses.response.ts");
let ListBusinessesUseCase = class ListBusinessesUseCase {
    business_repository;
    lookup;
    constructor(business_repository, lookup) {
        this.business_repository = business_repository;
        this.lookup = lookup;
    }
    async execute() {
        const rows = await this.business_repository.find_all();
        const out = [];
        for (const row of rows) {
            const fields = await (0, business_public_fields_builder_1.build_business_public_fields)(row, this.lookup);
            out.push(new list_businesses_response_1.ListBusinessesItemResponse(fields));
        }
        return out;
    }
};
exports.ListBusinessesUseCase = ListBusinessesUseCase;
exports.ListBusinessesUseCase = ListBusinessesUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(businesses_tokens_1.BUSINESS_REPOSITORY)),
    __param(1, (0, common_1.Inject)(suppliers_reference_lookup_port_1.SUPPLIERS_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [typeof (_a = typeof business_repository_1.BusinessRepository !== "undefined" && business_repository_1.BusinessRepository) === "function" ? _a : Object, typeof (_b = typeof suppliers_reference_lookup_port_1.SuppliersReferenceLookupPort !== "undefined" && suppliers_reference_lookup_port_1.SuppliersReferenceLookupPort) === "function" ? _b : Object])
], ListBusinessesUseCase);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/businesses/application/use-cases/update-business-by-external-id/update-business-by-external-id.response.ts"
/*!**************************************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/businesses/application/use-cases/update-business-by-external-id/update-business-by-external-id.response.ts ***!
  \**************************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateBusinessByExternalIdResponse = void 0;
class UpdateBusinessByExternalIdResponse {
    internal_id;
    external_id;
    person_external_id;
    city_external_id;
    entity_type;
    business_name;
    business_address;
    business_type;
    relationship_to_business;
    legal_name;
    trade_name;
    tax_id;
    year_of_establishment;
    created_at;
    updated_at;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.UpdateBusinessByExternalIdResponse = UpdateBusinessByExternalIdResponse;


/***/ },

/***/ "./apps/suppliers-ms/src/modules/businesses/application/use-cases/update-business-by-external-id/update-business-by-external-id.use-case.ts"
/*!**************************************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/businesses/application/use-cases/update-business-by-external-id/update-business-by-external-id.use-case.ts ***!
  \**************************************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.UpdateBusinessByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const suppliers_reference_lookup_port_1 = __webpack_require__(/*! @common/ports/suppliers-reference-lookup.port */ "./apps/suppliers-ms/src/common/ports/suppliers-reference-lookup.port.ts");
const businesses_tokens_1 = __webpack_require__(/*! @modules/businesses/businesses.tokens */ "./apps/suppliers-ms/src/modules/businesses/businesses.tokens.ts");
const business_repository_1 = __webpack_require__(/*! @modules/businesses/domain/repositories/business.repository */ "./apps/suppliers-ms/src/modules/businesses/domain/repositories/business.repository.ts");
const business_public_fields_builder_1 = __webpack_require__(/*! @modules/businesses/application/mapping/business-public-fields.builder */ "./apps/suppliers-ms/src/modules/businesses/application/mapping/business-public-fields.builder.ts");
const update_business_by_external_id_response_1 = __webpack_require__(/*! ./update-business-by-external-id.response */ "./apps/suppliers-ms/src/modules/businesses/application/use-cases/update-business-by-external-id/update-business-by-external-id.response.ts");
let UpdateBusinessByExternalIdUseCase = class UpdateBusinessByExternalIdUseCase {
    business_repository;
    lookup;
    constructor(business_repository, lookup) {
        this.business_repository = business_repository;
        this.lookup = lookup;
    }
    async execute(req) {
        const patch = {};
        if (req.person_external_id !== undefined) {
            const id = await this.lookup.get_person_internal_id_by_external_id(req.person_external_id);
            if (id === null) {
                throw new common_1.NotFoundException('person not found');
            }
            patch.person_id = id;
        }
        if (req.city_external_id !== undefined) {
            if (req.city_external_id === null) {
                patch.city_id = null;
            }
            else {
                const id = await this.lookup.get_city_internal_id_by_external_id(req.city_external_id);
                if (id === null) {
                    throw new common_1.NotFoundException('city not found');
                }
                patch.city_id = id;
            }
        }
        if (req.entity_type !== undefined) {
            patch.entity_type = req.entity_type;
        }
        if (req.business_name !== undefined) {
            patch.business_name = req.business_name;
        }
        if (req.business_address !== undefined) {
            patch.business_address = req.business_address;
        }
        if (req.business_type !== undefined) {
            patch.business_type = req.business_type;
        }
        if (req.relationship_to_business !== undefined) {
            patch.relationship_to_business = req.relationship_to_business;
        }
        if (req.legal_name !== undefined) {
            patch.legal_name = req.legal_name;
        }
        if (req.trade_name !== undefined) {
            patch.trade_name = req.trade_name;
        }
        if (req.tax_id !== undefined) {
            patch.tax_id = req.tax_id;
        }
        if (req.year_of_establishment !== undefined) {
            patch.year_of_establishment = req.year_of_establishment;
        }
        const updated = await this.business_repository.update_by_external_id(req.external_id, patch);
        if (updated === null) {
            throw new common_1.NotFoundException('business not found');
        }
        const fields = await (0, business_public_fields_builder_1.build_business_public_fields)(updated, this.lookup);
        return new update_business_by_external_id_response_1.UpdateBusinessByExternalIdResponse(fields);
    }
};
exports.UpdateBusinessByExternalIdUseCase = UpdateBusinessByExternalIdUseCase;
exports.UpdateBusinessByExternalIdUseCase = UpdateBusinessByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(businesses_tokens_1.BUSINESS_REPOSITORY)),
    __param(1, (0, common_1.Inject)(suppliers_reference_lookup_port_1.SUPPLIERS_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [typeof (_a = typeof business_repository_1.BusinessRepository !== "undefined" && business_repository_1.BusinessRepository) === "function" ? _a : Object, typeof (_b = typeof suppliers_reference_lookup_port_1.SuppliersReferenceLookupPort !== "undefined" && suppliers_reference_lookup_port_1.SuppliersReferenceLookupPort) === "function" ? _b : Object])
], UpdateBusinessByExternalIdUseCase);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/businesses/businesses.module.ts"
/*!***********************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/businesses/businesses.module.ts ***!
  \***********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BusinessesModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const infrastructure_module_1 = __webpack_require__(/*! @infrastructure/infrastructure.module */ "./apps/suppliers-ms/src/infrastructure/infrastructure.module.ts");
const typeorm_business_repository_1 = __webpack_require__(/*! @infrastructure/database/repositories/typeorm-business.repository */ "./apps/suppliers-ms/src/infrastructure/database/repositories/typeorm-business.repository.ts");
const businesses_tokens_1 = __webpack_require__(/*! ./businesses.tokens */ "./apps/suppliers-ms/src/modules/businesses/businesses.tokens.ts");
const create_business_use_case_1 = __webpack_require__(/*! ./application/use-cases/create-business/create-business.use-case */ "./apps/suppliers-ms/src/modules/businesses/application/use-cases/create-business/create-business.use-case.ts");
const get_business_by_external_id_use_case_1 = __webpack_require__(/*! ./application/use-cases/get-business-by-external-id/get-business-by-external-id.use-case */ "./apps/suppliers-ms/src/modules/businesses/application/use-cases/get-business-by-external-id/get-business-by-external-id.use-case.ts");
const list_businesses_use_case_1 = __webpack_require__(/*! ./application/use-cases/list-businesses/list-businesses.use-case */ "./apps/suppliers-ms/src/modules/businesses/application/use-cases/list-businesses/list-businesses.use-case.ts");
const update_business_by_external_id_use_case_1 = __webpack_require__(/*! ./application/use-cases/update-business-by-external-id/update-business-by-external-id.use-case */ "./apps/suppliers-ms/src/modules/businesses/application/use-cases/update-business-by-external-id/update-business-by-external-id.use-case.ts");
const delete_business_by_external_id_use_case_1 = __webpack_require__(/*! ./application/use-cases/delete-business-by-external-id/delete-business-by-external-id.use-case */ "./apps/suppliers-ms/src/modules/businesses/application/use-cases/delete-business-by-external-id/delete-business-by-external-id.use-case.ts");
let BusinessesModule = class BusinessesModule {
};
exports.BusinessesModule = BusinessesModule;
exports.BusinessesModule = BusinessesModule = __decorate([
    (0, common_1.Module)({
        imports: [infrastructure_module_1.InfrastructureModule],
        providers: [
            {
                provide: businesses_tokens_1.BUSINESS_REPOSITORY,
                useExisting: typeorm_business_repository_1.TypeormBusinessRepository,
            },
            create_business_use_case_1.CreateBusinessUseCase,
            get_business_by_external_id_use_case_1.GetBusinessByExternalIdUseCase,
            list_businesses_use_case_1.ListBusinessesUseCase,
            update_business_by_external_id_use_case_1.UpdateBusinessByExternalIdUseCase,
            delete_business_by_external_id_use_case_1.DeleteBusinessByExternalIdUseCase,
        ],
        exports: [
            businesses_tokens_1.BUSINESS_REPOSITORY,
            create_business_use_case_1.CreateBusinessUseCase,
            get_business_by_external_id_use_case_1.GetBusinessByExternalIdUseCase,
            list_businesses_use_case_1.ListBusinessesUseCase,
            update_business_by_external_id_use_case_1.UpdateBusinessByExternalIdUseCase,
            delete_business_by_external_id_use_case_1.DeleteBusinessByExternalIdUseCase,
        ],
    })
], BusinessesModule);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/businesses/businesses.tokens.ts"
/*!***********************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/businesses/businesses.tokens.ts ***!
  \***********************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BUSINESS_REPOSITORY = void 0;
exports.BUSINESS_REPOSITORY = Symbol('BUSINESS_REPOSITORY');


/***/ },

/***/ "./apps/suppliers-ms/src/modules/businesses/domain/entities/business.entity.ts"
/*!*************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/businesses/domain/entities/business.entity.ts ***!
  \*************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Business = void 0;
class Business {
    internal_id;
    external_id;
    person_id;
    city_id;
    entity_type;
    business_name;
    business_address;
    business_type;
    relationship_to_business;
    legal_name;
    trade_name;
    tax_id;
    year_of_establishment;
    created_at;
    updated_at;
    constructor(internal_id, external_id, person_id, city_id, entity_type, business_name, business_address, business_type, relationship_to_business, legal_name, trade_name, tax_id, year_of_establishment, created_at, updated_at) {
        this.internal_id = internal_id;
        this.external_id = external_id;
        this.person_id = person_id;
        this.city_id = city_id;
        this.entity_type = entity_type;
        this.business_name = business_name;
        this.business_address = business_address;
        this.business_type = business_type;
        this.relationship_to_business = relationship_to_business;
        this.legal_name = legal_name;
        this.trade_name = trade_name;
        this.tax_id = tax_id;
        this.year_of_establishment = year_of_establishment;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
exports.Business = Business;


/***/ },

/***/ "./apps/suppliers-ms/src/modules/businesses/domain/repositories/business.repository.ts"
/*!*********************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/businesses/domain/repositories/business.repository.ts ***!
  \*********************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ "./apps/suppliers-ms/src/modules/legal-representatives/application/use-cases/create-legal-representative/create-legal-representative.request.ts"
/*!******************************************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/legal-representatives/application/use-cases/create-legal-representative/create-legal-representative.request.ts ***!
  \******************************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateLegalRepresentativeRequest = void 0;
class CreateLegalRepresentativeRequest {
    person_internal_id;
    is_primary;
    business_internal_id;
    constructor(person_internal_id, is_primary, business_internal_id) {
        this.person_internal_id = person_internal_id;
        this.is_primary = is_primary;
        this.business_internal_id = business_internal_id;
    }
}
exports.CreateLegalRepresentativeRequest = CreateLegalRepresentativeRequest;


/***/ },

/***/ "./apps/suppliers-ms/src/modules/legal-representatives/application/use-cases/create-legal-representative/create-legal-representative.response.ts"
/*!*******************************************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/legal-representatives/application/use-cases/create-legal-representative/create-legal-representative.response.ts ***!
  \*******************************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateLegalRepresentativeResponse = void 0;
class CreateLegalRepresentativeResponse {
    external_id;
    constructor(external_id) {
        this.external_id = external_id;
    }
}
exports.CreateLegalRepresentativeResponse = CreateLegalRepresentativeResponse;


/***/ },

/***/ "./apps/suppliers-ms/src/modules/legal-representatives/application/use-cases/create-legal-representative/create-legal-representative.use-case.ts"
/*!*******************************************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/legal-representatives/application/use-cases/create-legal-representative/create-legal-representative.use-case.ts ***!
  \*******************************************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.CreateLegalRepresentativeUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const legal_representatives_tokens_1 = __webpack_require__(/*! @modules/legal-representatives/legal-representatives.tokens */ "./apps/suppliers-ms/src/modules/legal-representatives/legal-representatives.tokens.ts");
const create_legal_representative_response_1 = __webpack_require__(/*! ./create-legal-representative.response */ "./apps/suppliers-ms/src/modules/legal-representatives/application/use-cases/create-legal-representative/create-legal-representative.response.ts");
let CreateLegalRepresentativeUseCase = class CreateLegalRepresentativeUseCase {
    legal_representatives;
    constructor(legal_representatives) {
        this.legal_representatives = legal_representatives;
    }
    async execute(req) {
        const created = await this.legal_representatives.create({
            business_id: req.business_internal_id,
            person_id: req.person_internal_id,
            is_primary: req.is_primary,
        });
        return new create_legal_representative_response_1.CreateLegalRepresentativeResponse(created.external_id);
    }
};
exports.CreateLegalRepresentativeUseCase = CreateLegalRepresentativeUseCase;
exports.CreateLegalRepresentativeUseCase = CreateLegalRepresentativeUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(legal_representatives_tokens_1.LEGAL_REPRESENTATIVE_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], CreateLegalRepresentativeUseCase);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/legal-representatives/domain/entities/legal-representative.entity.ts"
/*!************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/legal-representatives/domain/entities/legal-representative.entity.ts ***!
  \************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LegalRepresentative = void 0;
class LegalRepresentative {
    internal_id;
    external_id;
    business_id;
    person_id;
    is_primary;
    created_at;
    updated_at;
    constructor(internal_id, external_id, business_id, person_id, is_primary, created_at, updated_at) {
        this.internal_id = internal_id;
        this.external_id = external_id;
        this.business_id = business_id;
        this.person_id = person_id;
        this.is_primary = is_primary;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
exports.LegalRepresentative = LegalRepresentative;


/***/ },

/***/ "./apps/suppliers-ms/src/modules/legal-representatives/legal-representatives.module.ts"
/*!*********************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/legal-representatives/legal-representatives.module.ts ***!
  \*********************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LegalRepresentativesModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const infrastructure_module_1 = __webpack_require__(/*! @infrastructure/infrastructure.module */ "./apps/suppliers-ms/src/infrastructure/infrastructure.module.ts");
const typeorm_legal_representative_repository_1 = __webpack_require__(/*! @infrastructure/database/repositories/typeorm-legal-representative.repository */ "./apps/suppliers-ms/src/infrastructure/database/repositories/typeorm-legal-representative.repository.ts");
const legal_representatives_tokens_1 = __webpack_require__(/*! ./legal-representatives.tokens */ "./apps/suppliers-ms/src/modules/legal-representatives/legal-representatives.tokens.ts");
const create_legal_representative_use_case_1 = __webpack_require__(/*! ./application/use-cases/create-legal-representative/create-legal-representative.use-case */ "./apps/suppliers-ms/src/modules/legal-representatives/application/use-cases/create-legal-representative/create-legal-representative.use-case.ts");
let LegalRepresentativesModule = class LegalRepresentativesModule {
};
exports.LegalRepresentativesModule = LegalRepresentativesModule;
exports.LegalRepresentativesModule = LegalRepresentativesModule = __decorate([
    (0, common_1.Module)({
        imports: [infrastructure_module_1.InfrastructureModule],
        providers: [
            {
                provide: legal_representatives_tokens_1.LEGAL_REPRESENTATIVE_REPOSITORY,
                useExisting: typeorm_legal_representative_repository_1.TypeormLegalRepresentativeRepository,
            },
            create_legal_representative_use_case_1.CreateLegalRepresentativeUseCase,
        ],
        exports: [legal_representatives_tokens_1.LEGAL_REPRESENTATIVE_REPOSITORY, create_legal_representative_use_case_1.CreateLegalRepresentativeUseCase],
    })
], LegalRepresentativesModule);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/legal-representatives/legal-representatives.tokens.ts"
/*!*********************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/legal-representatives/legal-representatives.tokens.ts ***!
  \*********************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LEGAL_REPRESENTATIVE_REPOSITORY = void 0;
exports.LEGAL_REPRESENTATIVE_REPOSITORY = Symbol('LEGAL_REPRESENTATIVE_REPOSITORY');


/***/ },

/***/ "./apps/suppliers-ms/src/modules/messaging/application/dto/files-uploaded-inbound.dto.ts"
/*!***********************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/messaging/application/dto/files-uploaded-inbound.dto.ts ***!
  \***********************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.FilesUploadedInboundDto = exports.FilesUploadedPayloadDto = exports.FilesUploadedItemDto = void 0;
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class FilesUploadedItemDto {
    url;
    folder;
}
exports.FilesUploadedItemDto = FilesUploadedItemDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilesUploadedItemDto.prototype, "url", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilesUploadedItemDto.prototype, "folder", void 0);
class FilesUploadedPayloadDto {
    files;
}
exports.FilesUploadedPayloadDto = FilesUploadedPayloadDto;
__decorate([
    (0, class_transformer_1.Expose)({ name: 'files' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => FilesUploadedItemDto),
    __metadata("design:type", Array)
], FilesUploadedPayloadDto.prototype, "files", void 0);
class FilesUploadedInboundDto {
    event;
    correlation_id;
    payload;
}
exports.FilesUploadedInboundDto = FilesUploadedInboundDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['files-uploaded']),
    __metadata("design:type", String)
], FilesUploadedInboundDto.prototype, "event", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'correlationId' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilesUploadedInboundDto.prototype, "correlation_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => FilesUploadedPayloadDto),
    __metadata("design:type", FilesUploadedPayloadDto)
], FilesUploadedInboundDto.prototype, "payload", void 0);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/messaging/application/dto/transversal-inbound-message.dto.ts"
/*!****************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/messaging/application/dto/transversal-inbound-message.dto.ts ***!
  \****************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const transversal_outbound_event_dto_1 = __webpack_require__(/*! ./transversal-outbound-event.dto */ "./apps/suppliers-ms/src/modules/messaging/application/dto/transversal-outbound-event.dto.ts");
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


/***/ },

/***/ "./apps/suppliers-ms/src/modules/messaging/application/dto/transversal-outbound-event.dto.ts"
/*!***************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/messaging/application/dto/transversal-outbound-event.dto.ts ***!
  \***************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
var TransversalEventType;
(function (TransversalEventType) {
    TransversalEventType["health_ping"] = "health_ping";
    TransversalEventType["partner_onboarding_user_upsert_requested"] = "partner_onboarding_user_upsert_requested";
    TransversalEventType["partner_onboarding_person_upsert_requested"] = "partner_onboarding_person_upsert_requested";
    TransversalEventType["partner_onboarding_files_upload_requested"] = "partner_onboarding_files_upload_requested";
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


/***/ },

/***/ "./apps/suppliers-ms/src/modules/messaging/application/exceptions/validation-failed.error.ts"
/*!***************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/messaging/application/exceptions/validation-failed.error.ts ***!
  \***************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValidationFailedError = void 0;
class ValidationFailedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationFailedError';
    }
}
exports.ValidationFailedError = ValidationFailedError;


/***/ },

/***/ "./apps/suppliers-ms/src/modules/messaging/application/services/files-uploaded-correlation-awaiter.service.ts"
/*!********************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/messaging/application/services/files-uploaded-correlation-awaiter.service.ts ***!
  \********************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FilesUploadedCorrelationAwaiter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let FilesUploadedCorrelationAwaiter = class FilesUploadedCorrelationAwaiter {
    pending = new Map();
    early = new Map();
    wait(correlation_id, timeout_ms) {
        const early = this.early.get(correlation_id);
        if (early !== undefined) {
            this.early.delete(correlation_id);
            return Promise.resolve(early);
        }
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                this.pending.delete(correlation_id);
                reject(new Error('PARTNER_FILES_UPLOAD_TIMEOUT'));
            }, timeout_ms);
            this.pending.set(correlation_id, { resolve, reject, timer });
        });
    }
    complete(correlation_id, urls) {
        const p = this.pending.get(correlation_id);
        if (p !== undefined) {
            clearTimeout(p.timer);
            this.pending.delete(correlation_id);
            p.resolve(urls);
            return;
        }
        this.early.set(correlation_id, urls);
    }
};
exports.FilesUploadedCorrelationAwaiter = FilesUploadedCorrelationAwaiter;
exports.FilesUploadedCorrelationAwaiter = FilesUploadedCorrelationAwaiter = __decorate([
    (0, common_1.Injectable)()
], FilesUploadedCorrelationAwaiter);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/messaging/application/use-cases/ingest-transversal-inbound-sqs-message.use-case.ts"
/*!**************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/messaging/application/use-cases/ingest-transversal-inbound-sqs-message.use-case.ts ***!
  \**************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IngestTransversalInboundSqsMessageUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const files_uploaded_inbound_dto_1 = __webpack_require__(/*! ../dto/files-uploaded-inbound.dto */ "./apps/suppliers-ms/src/modules/messaging/application/dto/files-uploaded-inbound.dto.ts");
const transversal_inbound_message_dto_1 = __webpack_require__(/*! ../dto/transversal-inbound-message.dto */ "./apps/suppliers-ms/src/modules/messaging/application/dto/transversal-inbound-message.dto.ts");
const process_transversal_inbound_message_use_case_1 = __webpack_require__(/*! ./process-transversal-inbound-message.use-case */ "./apps/suppliers-ms/src/modules/messaging/application/use-cases/process-transversal-inbound-message.use-case.ts");
const process_files_uploaded_inbound_use_case_1 = __webpack_require__(/*! ./process-files-uploaded-inbound.use-case */ "./apps/suppliers-ms/src/modules/messaging/application/use-cases/process-files-uploaded-inbound.use-case.ts");
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
    __metadata("design:paramtypes", [typeof (_a = typeof process_transversal_inbound_message_use_case_1.ProcessTransversalInboundMessageUseCase !== "undefined" && process_transversal_inbound_message_use_case_1.ProcessTransversalInboundMessageUseCase) === "function" ? _a : Object, typeof (_b = typeof process_files_uploaded_inbound_use_case_1.ProcessFilesUploadedInboundUseCase !== "undefined" && process_files_uploaded_inbound_use_case_1.ProcessFilesUploadedInboundUseCase) === "function" ? _b : Object])
], IngestTransversalInboundSqsMessageUseCase);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/messaging/application/use-cases/process-files-uploaded-inbound.use-case.ts"
/*!******************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/messaging/application/use-cases/process-files-uploaded-inbound.use-case.ts ***!
  \******************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ProcessFilesUploadedInboundUseCase_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProcessFilesUploadedInboundUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const files_uploaded_correlation_awaiter_service_1 = __webpack_require__(/*! ../services/files-uploaded-correlation-awaiter.service */ "./apps/suppliers-ms/src/modules/messaging/application/services/files-uploaded-correlation-awaiter.service.ts");
const FOLDER_BANK = 'bank-certifications';
const FOLDER_LOGO = 'logos/logo';
const FOLDER_CO_BRANDING = 'logos/co-branding';
let ProcessFilesUploadedInboundUseCase = ProcessFilesUploadedInboundUseCase_1 = class ProcessFilesUploadedInboundUseCase {
    awaiter;
    logger = new common_1.Logger(ProcessFilesUploadedInboundUseCase_1.name);
    constructor(awaiter) {
        this.awaiter = awaiter;
    }
    async execute(dto) {
        const urls = this.map_payload_to_legacy_urls(dto.payload.files);
        this.logger.log(JSON.stringify({
            msg: 'files_uploaded_received',
            correlation_id: dto.correlation_id,
            file_count: dto.payload.files.length,
        }));
        this.awaiter.complete(dto.correlation_id, urls);
    }
    map_payload_to_legacy_urls(files) {
        const by_folder = new Map();
        for (const f of files) {
            by_folder.set(f.folder.trim(), f.url);
        }
        const bank = by_folder.get(FOLDER_BANK);
        const logo = by_folder.get(FOLDER_LOGO);
        const cob = by_folder.get(FOLDER_CO_BRANDING);
        return {
            ...(bank !== undefined ? { bank_certification_url: bank } : {}),
            ...(logo !== undefined ? { logo_url: logo } : {}),
            ...(cob !== undefined ? { co_branding_url: cob } : {}),
        };
    }
};
exports.ProcessFilesUploadedInboundUseCase = ProcessFilesUploadedInboundUseCase;
exports.ProcessFilesUploadedInboundUseCase = ProcessFilesUploadedInboundUseCase = ProcessFilesUploadedInboundUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof files_uploaded_correlation_awaiter_service_1.FilesUploadedCorrelationAwaiter !== "undefined" && files_uploaded_correlation_awaiter_service_1.FilesUploadedCorrelationAwaiter) === "function" ? _a : Object])
], ProcessFilesUploadedInboundUseCase);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/messaging/application/use-cases/process-transversal-inbound-message.use-case.ts"
/*!***********************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/messaging/application/use-cases/process-transversal-inbound-message.use-case.ts ***!
  \***********************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProcessTransversalInboundMessageUseCase_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProcessTransversalInboundMessageUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let ProcessTransversalInboundMessageUseCase = ProcessTransversalInboundMessageUseCase_1 = class ProcessTransversalInboundMessageUseCase {
    logger = new common_1.Logger(ProcessTransversalInboundMessageUseCase_1.name);
    async execute(dto) {
        this.logger.log(`Mensaje transversal recibido: event_type=${dto.event_type} correlation_id=${dto.correlation_id}`);
    }
};
exports.ProcessTransversalInboundMessageUseCase = ProcessTransversalInboundMessageUseCase;
exports.ProcessTransversalInboundMessageUseCase = ProcessTransversalInboundMessageUseCase = ProcessTransversalInboundMessageUseCase_1 = __decorate([
    (0, common_1.Injectable)()
], ProcessTransversalInboundMessageUseCase);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/messaging/application/use-cases/publish-create-categories-command.use-case.ts"
/*!*********************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/messaging/application/use-cases/publish-create-categories-command.use-case.ts ***!
  \*********************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PublishCreateCategoriesCommandUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const outbound_message_publisher_port_1 = __webpack_require__(/*! @messaging/domain/ports/outbound-message-publisher.port */ "./apps/suppliers-ms/src/modules/messaging/domain/ports/outbound-message-publisher.port.ts");
const products_create_categories_queue_url_port_1 = __webpack_require__(/*! @messaging/domain/ports/products-create-categories-queue-url.port */ "./apps/suppliers-ms/src/modules/messaging/domain/ports/products-create-categories-queue-url.port.ts");
const transversal_outbound_event_dto_1 = __webpack_require__(/*! ../dto/transversal-outbound-event.dto */ "./apps/suppliers-ms/src/modules/messaging/application/dto/transversal-outbound-event.dto.ts");
const validation_failed_error_1 = __webpack_require__(/*! ../exceptions/validation-failed.error */ "./apps/suppliers-ms/src/modules/messaging/application/exceptions/validation-failed.error.ts");
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
            correlation_id: command.correlation_id,
            event_type: transversal_outbound_event_dto_1.TransversalEventType.partner_onboarding_category_batch_requested,
            payload: {
                credit_facility_external_id: command.credit_facility_external_id,
                partner_id: command.partner_id,
                state: command.state,
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


/***/ },

/***/ "./apps/suppliers-ms/src/modules/messaging/application/use-cases/publish-create-credit-facility-command.use-case.ts"
/*!**************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/messaging/application/use-cases/publish-create-credit-facility-command.use-case.ts ***!
  \**************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PublishCreateCreditFacilityCommandUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const outbound_message_publisher_port_1 = __webpack_require__(/*! @messaging/domain/ports/outbound-message-publisher.port */ "./apps/suppliers-ms/src/modules/messaging/domain/ports/outbound-message-publisher.port.ts");
const products_create_credit_facility_queue_url_port_1 = __webpack_require__(/*! @messaging/domain/ports/products-create-credit-facility-queue-url.port */ "./apps/suppliers-ms/src/modules/messaging/domain/ports/products-create-credit-facility-queue-url.port.ts");
const transversal_outbound_event_dto_1 = __webpack_require__(/*! ../dto/transversal-outbound-event.dto */ "./apps/suppliers-ms/src/modules/messaging/application/dto/transversal-outbound-event.dto.ts");
const validation_failed_error_1 = __webpack_require__(/*! ../exceptions/validation-failed.error */ "./apps/suppliers-ms/src/modules/messaging/application/exceptions/validation-failed.error.ts");
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
            correlation_id: command.correlation_id,
            event_type: transversal_outbound_event_dto_1.TransversalEventType.partner_onboarding_credit_facility_requested,
            payload: {
                credit_facility_external_id: command.external_id,
                contract_id: command.contract_id,
                total_limit: command.total_limit,
                state: command.state,
                business_id: command.business_id,
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


/***/ },

/***/ "./apps/suppliers-ms/src/modules/messaging/application/use-cases/publish-create-partner-user-command.use-case.ts"
/*!***********************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/messaging/application/use-cases/publish-create-partner-user-command.use-case.ts ***!
  \***********************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PublishCreatePartnerUserCommandUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const outbound_message_publisher_port_1 = __webpack_require__(/*! @messaging/domain/ports/outbound-message-publisher.port */ "./apps/suppliers-ms/src/modules/messaging/domain/ports/outbound-message-publisher.port.ts");
const transversal_create_partner_user_queue_url_port_1 = __webpack_require__(/*! @messaging/domain/ports/transversal-create-partner-user-queue-url.port */ "./apps/suppliers-ms/src/modules/messaging/domain/ports/transversal-create-partner-user-queue-url.port.ts");
const validation_failed_error_1 = __webpack_require__(/*! ../exceptions/validation-failed.error */ "./apps/suppliers-ms/src/modules/messaging/application/exceptions/validation-failed.error.ts");
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


/***/ },

/***/ "./apps/suppliers-ms/src/modules/messaging/application/use-cases/publish-create-person-command.use-case.ts"
/*!*****************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/messaging/application/use-cases/publish-create-person-command.use-case.ts ***!
  \*****************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PublishCreatePersonCommandUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const outbound_message_publisher_port_1 = __webpack_require__(/*! @messaging/domain/ports/outbound-message-publisher.port */ "./apps/suppliers-ms/src/modules/messaging/domain/ports/outbound-message-publisher.port.ts");
const transversal_create_person_queue_url_port_1 = __webpack_require__(/*! @messaging/domain/ports/transversal-create-person-queue-url.port */ "./apps/suppliers-ms/src/modules/messaging/domain/ports/transversal-create-person-queue-url.port.ts");
const validation_failed_error_1 = __webpack_require__(/*! ../exceptions/validation-failed.error */ "./apps/suppliers-ms/src/modules/messaging/application/exceptions/validation-failed.error.ts");
let PublishCreatePersonCommandUseCase = class PublishCreatePersonCommandUseCase {
    message_publisher;
    create_person_queue_url;
    constructor(message_publisher, create_person_queue_url) {
        this.message_publisher = message_publisher;
        this.create_person_queue_url = create_person_queue_url;
    }
    async execute(command) {
        const queue_url = this.create_person_queue_url.get_create_person_queue_url();
        if (queue_url === undefined || queue_url.trim().length === 0) {
            throw new validation_failed_error_1.ValidationFailedError('Cola TRANSVERSAL_SQS_CREATE_PERSON_QUEUE_URL no configurada para alta de persona');
        }
        const body = JSON.stringify({
            event: 'create-person',
            version: '1.0',
            correlationId: command.correlation_id,
            idempotencyKey: command.idempotency_key,
            payload: {
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
exports.PublishCreatePersonCommandUseCase = PublishCreatePersonCommandUseCase;
exports.PublishCreatePersonCommandUseCase = PublishCreatePersonCommandUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(outbound_message_publisher_port_1.OUTBOUND_MESSAGE_PUBLISHER_PORT)),
    __param(1, (0, common_1.Inject)(transversal_create_person_queue_url_port_1.TRANSVERSAL_CREATE_PERSON_QUEUE_URL_PORT)),
    __metadata("design:paramtypes", [Object, Object])
], PublishCreatePersonCommandUseCase);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/messaging/application/use-cases/publish-products-event.use-case.ts"
/*!**********************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/messaging/application/use-cases/publish-products-event.use-case.ts ***!
  \**********************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const outbound_message_publisher_port_1 = __webpack_require__(/*! @messaging/domain/ports/outbound-message-publisher.port */ "./apps/suppliers-ms/src/modules/messaging/domain/ports/outbound-message-publisher.port.ts");
const products_outbound_queue_url_port_1 = __webpack_require__(/*! @messaging/domain/ports/products-outbound-queue-url.port */ "./apps/suppliers-ms/src/modules/messaging/domain/ports/products-outbound-queue-url.port.ts");
const transversal_outbound_event_dto_1 = __webpack_require__(/*! ../dto/transversal-outbound-event.dto */ "./apps/suppliers-ms/src/modules/messaging/application/dto/transversal-outbound-event.dto.ts");
const validation_failed_error_1 = __webpack_require__(/*! ../exceptions/validation-failed.error */ "./apps/suppliers-ms/src/modules/messaging/application/exceptions/validation-failed.error.ts");
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
            throw new validation_failed_error_1.ValidationFailedError(`Evento products-ms inválido: ${message}`);
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


/***/ },

/***/ "./apps/suppliers-ms/src/modules/messaging/application/use-cases/publish-transversal-event.use-case.ts"
/*!*************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/messaging/application/use-cases/publish-transversal-event.use-case.ts ***!
  \*************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PublishTransversalEventUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const outbound_message_publisher_port_1 = __webpack_require__(/*! @messaging/domain/ports/outbound-message-publisher.port */ "./apps/suppliers-ms/src/modules/messaging/domain/ports/outbound-message-publisher.port.ts");
const transversal_outbound_queue_url_port_1 = __webpack_require__(/*! @messaging/domain/ports/transversal-outbound-queue-url.port */ "./apps/suppliers-ms/src/modules/messaging/domain/ports/transversal-outbound-queue-url.port.ts");
const transversal_outbound_event_dto_1 = __webpack_require__(/*! ../dto/transversal-outbound-event.dto */ "./apps/suppliers-ms/src/modules/messaging/application/dto/transversal-outbound-event.dto.ts");
const validation_failed_error_1 = __webpack_require__(/*! ../exceptions/validation-failed.error */ "./apps/suppliers-ms/src/modules/messaging/application/exceptions/validation-failed.error.ts");
let PublishTransversalEventUseCase = class PublishTransversalEventUseCase {
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
            throw new validation_failed_error_1.ValidationFailedError(`Evento transversal inválido: ${message}`);
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
exports.PublishTransversalEventUseCase = PublishTransversalEventUseCase;
exports.PublishTransversalEventUseCase = PublishTransversalEventUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(outbound_message_publisher_port_1.OUTBOUND_MESSAGE_PUBLISHER_PORT)),
    __param(1, (0, common_1.Inject)(transversal_outbound_queue_url_port_1.TRANSVERSAL_OUTBOUND_QUEUE_URL_PORT)),
    __metadata("design:paramtypes", [Object, Object])
], PublishTransversalEventUseCase);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/messaging/application/use-cases/publish-upload-files-event.use-case.ts"
/*!**************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/messaging/application/use-cases/publish-upload-files-event.use-case.ts ***!
  \**************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PublishUploadFilesEventUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const outbound_message_publisher_port_1 = __webpack_require__(/*! @messaging/domain/ports/outbound-message-publisher.port */ "./apps/suppliers-ms/src/modules/messaging/domain/ports/outbound-message-publisher.port.ts");
const transversal_upload_files_queue_url_port_1 = __webpack_require__(/*! @messaging/domain/ports/transversal-upload-files-queue-url.port */ "./apps/suppliers-ms/src/modules/messaging/domain/ports/transversal-upload-files-queue-url.port.ts");
const validation_failed_error_1 = __webpack_require__(/*! ../exceptions/validation-failed.error */ "./apps/suppliers-ms/src/modules/messaging/application/exceptions/validation-failed.error.ts");
let PublishUploadFilesEventUseCase = class PublishUploadFilesEventUseCase {
    message_publisher;
    upload_queue_url;
    config_service;
    constructor(message_publisher, upload_queue_url, config_service) {
        this.message_publisher = message_publisher;
        this.upload_queue_url = upload_queue_url;
        this.config_service = config_service;
    }
    async execute(command) {
        const queue_url = this.upload_queue_url.get_upload_files_queue_url();
        if (queue_url === undefined || queue_url.trim().length === 0) {
            throw new validation_failed_error_1.ValidationFailedError('Cola TRANSVERSAL_SQS_UPLOAD_FILES_QUEUE_URL no configurada para publish upload-files');
        }
        const bucket = (this.config_service.get('config.storage.s3.bucket') ?? '').trim();
        if (bucket.length === 0) {
            throw new validation_failed_error_1.ValidationFailedError('Bucket S3 no configurado (config.storage.s3.bucket / AWS_S3_BUCKET)');
        }
        const payload_files = [];
        const add = (slot, raw) => {
            if (typeof raw !== 'string' || raw.trim().length === 0) {
                return;
            }
            const folder = this.folder_for_slot(command.file_folders, slot);
            if (folder.length === 0) {
                throw new validation_failed_error_1.ValidationFailedError(`folder no definido para slot ${slot}`);
            }
            payload_files.push({ file: raw, folder });
        };
        add('bank_certification', command.files.bank_certification);
        add('logo', command.files.logo);
        add('co_branding', command.files.co_branding);
        if (payload_files.length === 0) {
            throw new validation_failed_error_1.ValidationFailedError('upload-files sin archivos en payload');
        }
        const body = JSON.stringify({
            event: 'upload-files',
            version: '1.0',
            correlationId: command.correlation_id,
            idempotencyKey: command.idempotency_key,
            payload: {
                bucket,
                files: payload_files,
            },
        });
        await this.message_publisher.publish({ queue_url, body });
    }
    folder_for_slot(folders, slot) {
        const raw = folders === undefined
            ? undefined
            : slot === 'bank_certification'
                ? folders.bank_certification
                : slot === 'logo'
                    ? folders.logo
                    : folders.co_branding;
        if (typeof raw !== 'string') {
            return '';
        }
        return raw.trim();
    }
};
exports.PublishUploadFilesEventUseCase = PublishUploadFilesEventUseCase;
exports.PublishUploadFilesEventUseCase = PublishUploadFilesEventUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(outbound_message_publisher_port_1.OUTBOUND_MESSAGE_PUBLISHER_PORT)),
    __param(1, (0, common_1.Inject)(transversal_upload_files_queue_url_port_1.TRANSVERSAL_UPLOAD_FILES_QUEUE_URL_PORT)),
    __metadata("design:paramtypes", [Object, Object, typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], PublishUploadFilesEventUseCase);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/messaging/domain/ports/outbound-message-publisher.port.ts"
/*!*************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/messaging/domain/ports/outbound-message-publisher.port.ts ***!
  \*************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OUTBOUND_MESSAGE_PUBLISHER_PORT = void 0;
exports.OUTBOUND_MESSAGE_PUBLISHER_PORT = Symbol('OUTBOUND_MESSAGE_PUBLISHER_PORT');


/***/ },

/***/ "./apps/suppliers-ms/src/modules/messaging/domain/ports/products-create-categories-queue-url.port.ts"
/*!***********************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/messaging/domain/ports/products-create-categories-queue-url.port.ts ***!
  \***********************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PRODUCTS_CREATE_CATEGORIES_QUEUE_URL_PORT = void 0;
exports.PRODUCTS_CREATE_CATEGORIES_QUEUE_URL_PORT = Symbol('PRODUCTS_CREATE_CATEGORIES_QUEUE_URL_PORT');


/***/ },

/***/ "./apps/suppliers-ms/src/modules/messaging/domain/ports/products-create-credit-facility-queue-url.port.ts"
/*!****************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/messaging/domain/ports/products-create-credit-facility-queue-url.port.ts ***!
  \****************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PRODUCTS_CREATE_CREDIT_FACILITY_QUEUE_URL_PORT = void 0;
exports.PRODUCTS_CREATE_CREDIT_FACILITY_QUEUE_URL_PORT = Symbol('PRODUCTS_CREATE_CREDIT_FACILITY_QUEUE_URL_PORT');


/***/ },

/***/ "./apps/suppliers-ms/src/modules/messaging/domain/ports/products-outbound-queue-url.port.ts"
/*!**************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/messaging/domain/ports/products-outbound-queue-url.port.ts ***!
  \**************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PRODUCTS_OUTBOUND_QUEUE_URL_PORT = void 0;
exports.PRODUCTS_OUTBOUND_QUEUE_URL_PORT = Symbol('PRODUCTS_OUTBOUND_QUEUE_URL_PORT');


/***/ },

/***/ "./apps/suppliers-ms/src/modules/messaging/domain/ports/transversal-create-partner-user-queue-url.port.ts"
/*!****************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/messaging/domain/ports/transversal-create-partner-user-queue-url.port.ts ***!
  \****************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TRANSVERSAL_CREATE_PARTNER_USER_QUEUE_URL_PORT = void 0;
exports.TRANSVERSAL_CREATE_PARTNER_USER_QUEUE_URL_PORT = Symbol('TRANSVERSAL_CREATE_PARTNER_USER_QUEUE_URL_PORT');


/***/ },

/***/ "./apps/suppliers-ms/src/modules/messaging/domain/ports/transversal-create-person-queue-url.port.ts"
/*!**********************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/messaging/domain/ports/transversal-create-person-queue-url.port.ts ***!
  \**********************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TRANSVERSAL_CREATE_PERSON_QUEUE_URL_PORT = void 0;
exports.TRANSVERSAL_CREATE_PERSON_QUEUE_URL_PORT = Symbol('TRANSVERSAL_CREATE_PERSON_QUEUE_URL_PORT');


/***/ },

/***/ "./apps/suppliers-ms/src/modules/messaging/domain/ports/transversal-outbound-queue-url.port.ts"
/*!*****************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/messaging/domain/ports/transversal-outbound-queue-url.port.ts ***!
  \*****************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TRANSVERSAL_OUTBOUND_QUEUE_URL_PORT = void 0;
exports.TRANSVERSAL_OUTBOUND_QUEUE_URL_PORT = Symbol('TRANSVERSAL_OUTBOUND_QUEUE_URL_PORT');


/***/ },

/***/ "./apps/suppliers-ms/src/modules/messaging/domain/ports/transversal-upload-files-queue-url.port.ts"
/*!*********************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/messaging/domain/ports/transversal-upload-files-queue-url.port.ts ***!
  \*********************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TRANSVERSAL_UPLOAD_FILES_QUEUE_URL_PORT = void 0;
exports.TRANSVERSAL_UPLOAD_FILES_QUEUE_URL_PORT = Symbol('TRANSVERSAL_UPLOAD_FILES_QUEUE_URL_PORT');


/***/ },

/***/ "./apps/suppliers-ms/src/modules/messaging/messaging-application.module.ts"
/*!*********************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/messaging/messaging-application.module.ts ***!
  \*********************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessagingApplicationModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const publish_transversal_event_use_case_1 = __webpack_require__(/*! ./application/use-cases/publish-transversal-event.use-case */ "./apps/suppliers-ms/src/modules/messaging/application/use-cases/publish-transversal-event.use-case.ts");
const publish_upload_files_event_use_case_1 = __webpack_require__(/*! ./application/use-cases/publish-upload-files-event.use-case */ "./apps/suppliers-ms/src/modules/messaging/application/use-cases/publish-upload-files-event.use-case.ts");
const publish_create_partner_user_command_use_case_1 = __webpack_require__(/*! ./application/use-cases/publish-create-partner-user-command.use-case */ "./apps/suppliers-ms/src/modules/messaging/application/use-cases/publish-create-partner-user-command.use-case.ts");
const publish_create_person_command_use_case_1 = __webpack_require__(/*! ./application/use-cases/publish-create-person-command.use-case */ "./apps/suppliers-ms/src/modules/messaging/application/use-cases/publish-create-person-command.use-case.ts");
const publish_create_credit_facility_command_use_case_1 = __webpack_require__(/*! ./application/use-cases/publish-create-credit-facility-command.use-case */ "./apps/suppliers-ms/src/modules/messaging/application/use-cases/publish-create-credit-facility-command.use-case.ts");
const publish_create_categories_command_use_case_1 = __webpack_require__(/*! ./application/use-cases/publish-create-categories-command.use-case */ "./apps/suppliers-ms/src/modules/messaging/application/use-cases/publish-create-categories-command.use-case.ts");
const process_transversal_inbound_message_use_case_1 = __webpack_require__(/*! ./application/use-cases/process-transversal-inbound-message.use-case */ "./apps/suppliers-ms/src/modules/messaging/application/use-cases/process-transversal-inbound-message.use-case.ts");
const process_files_uploaded_inbound_use_case_1 = __webpack_require__(/*! ./application/use-cases/process-files-uploaded-inbound.use-case */ "./apps/suppliers-ms/src/modules/messaging/application/use-cases/process-files-uploaded-inbound.use-case.ts");
const ingest_transversal_inbound_sqs_message_use_case_1 = __webpack_require__(/*! ./application/use-cases/ingest-transversal-inbound-sqs-message.use-case */ "./apps/suppliers-ms/src/modules/messaging/application/use-cases/ingest-transversal-inbound-sqs-message.use-case.ts");
const files_uploaded_correlation_awaiter_service_1 = __webpack_require__(/*! ./application/services/files-uploaded-correlation-awaiter.service */ "./apps/suppliers-ms/src/modules/messaging/application/services/files-uploaded-correlation-awaiter.service.ts");
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


/***/ },

/***/ "./apps/suppliers-ms/src/modules/partners/application/mapping/partner-public-fields.builder.ts"
/*!*****************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/partners/application/mapping/partner-public-fields.builder.ts ***!
  \*****************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.build_partner_public_fields = build_partner_public_fields;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
async function build_partner_public_fields(partner, lookup) {
    const supplier_external_id = await lookup.get_supplier_external_id_by_internal_id(partner.supplier_id);
    if (supplier_external_id === null) {
        throw new common_1.InternalServerErrorException();
    }
    return {
        internal_id: partner.internal_id,
        external_id: partner.external_id,
        supplier_external_id,
        acronym: partner.acronym,
        logo_url: partner.logo_url,
        co_branding_logo_url: partner.co_branding_logo_url,
        primary_color: partner.primary_color,
        secondary_color: partner.secondary_color,
        light_color: partner.light_color,
        notification_email: partner.notification_email,
        webhook_url: partner.webhook_url,
        send_sales_rep_voucher: partner.send_sales_rep_voucher,
        disbursement_notification_email: partner.disbursement_notification_email,
        state: partner.state,
        created_at: partner.created_at,
        updated_at: partner.updated_at,
    };
}


/***/ },

/***/ "./apps/suppliers-ms/src/modules/partners/application/ports/partner-onboarding-files.port.ts"
/*!***************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/partners/application/ports/partner-onboarding-files.port.ts ***!
  \***************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PARTNER_ONBOARDING_FILES_PORT = void 0;
exports.PARTNER_ONBOARDING_FILES_PORT = Symbol('PARTNER_ONBOARDING_FILES_PORT');


/***/ },

/***/ "./apps/suppliers-ms/src/modules/partners/application/ports/partner-onboarding-saga.repository.port.ts"
/*!*************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/partners/application/ports/partner-onboarding-saga.repository.port.ts ***!
  \*************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PARTNER_ONBOARDING_SAGA_REPOSITORY = exports.PartnerOnboardingSagaStatus = void 0;
var shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
Object.defineProperty(exports, "PartnerOnboardingSagaStatus", ({ enumerable: true, get: function () { return shared_1.PartnerOnboardingSagaStatus; } }));
exports.PARTNER_ONBOARDING_SAGA_REPOSITORY = Symbol('PARTNER_ONBOARDING_SAGA_REPOSITORY');


/***/ },

/***/ "./apps/suppliers-ms/src/modules/partners/application/ports/partner-saga-compensation.port.ts"
/*!****************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/partners/application/ports/partner-saga-compensation.port.ts ***!
  \****************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PARTNER_SAGA_COMPENSATION_PORT = void 0;
exports.PARTNER_SAGA_COMPENSATION_PORT = Symbol('PARTNER_SAGA_COMPENSATION_PORT');


/***/ },

/***/ "./apps/suppliers-ms/src/modules/partners/application/ports/partner-user-sqs-result-reader.port.ts"
/*!*********************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/partners/application/ports/partner-user-sqs-result-reader.port.ts ***!
  \*********************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PARTNER_USER_SQS_RESULT_READER_PORT = void 0;
exports.PARTNER_USER_SQS_RESULT_READER_PORT = Symbol('PARTNER_USER_SQS_RESULT_READER_PORT');


/***/ },

/***/ "./apps/suppliers-ms/src/modules/partners/application/ports/products-credit-facility-sync.port.ts"
/*!********************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/partners/application/ports/products-credit-facility-sync.port.ts ***!
  \********************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PRODUCTS_CREDIT_FACILITY_SYNC_PORT = void 0;
exports.PRODUCTS_CREDIT_FACILITY_SYNC_PORT = Symbol('PRODUCTS_CREDIT_FACILITY_SYNC_PORT');


/***/ },

/***/ "./apps/suppliers-ms/src/modules/partners/application/ports/transversal-user-person-writer.port.ts"
/*!*********************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/partners/application/ports/transversal-user-person-writer.port.ts ***!
  \*********************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TRANSVERSAL_USER_PERSON_WRITER_PORT = void 0;
exports.TRANSVERSAL_USER_PERSON_WRITER_PORT = Symbol('TRANSVERSAL_USER_PERSON_WRITER_PORT');


/***/ },

/***/ "./apps/suppliers-ms/src/modules/partners/application/use-cases/create-partner-orchestrator/create-partner-orchestrator.response.ts"
/*!******************************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/partners/application/use-cases/create-partner-orchestrator/create-partner-orchestrator.response.ts ***!
  \******************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePartnerOrchestratorResponse = void 0;
class CreatePartnerOrchestratorResponse {
    saga_external_id;
    correlation_id;
    credit_facility_external_id;
    user_external_id;
    person_external_id;
    legal_representative_external_id;
    business_external_id;
    bank_certification_url;
    logo_url;
    co_branding_url;
    bank_account_external_id;
    supplier_external_id;
    partner_external_id;
    constructor(saga_external_id, correlation_id, credit_facility_external_id, user_external_id, person_external_id, legal_representative_external_id, business_external_id, bank_certification_url, logo_url, co_branding_url, bank_account_external_id, supplier_external_id, partner_external_id) {
        this.saga_external_id = saga_external_id;
        this.correlation_id = correlation_id;
        this.credit_facility_external_id = credit_facility_external_id;
        this.user_external_id = user_external_id;
        this.person_external_id = person_external_id;
        this.legal_representative_external_id = legal_representative_external_id;
        this.business_external_id = business_external_id;
        this.bank_certification_url = bank_certification_url;
        this.logo_url = logo_url;
        this.co_branding_url = co_branding_url;
        this.bank_account_external_id = bank_account_external_id;
        this.supplier_external_id = supplier_external_id;
        this.partner_external_id = partner_external_id;
    }
}
exports.CreatePartnerOrchestratorResponse = CreatePartnerOrchestratorResponse;


/***/ },

/***/ "./apps/suppliers-ms/src/modules/partners/application/use-cases/create-partner-orchestrator/create-partner-orchestrator.use-case.ts"
/*!******************************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/partners/application/use-cases/create-partner-orchestrator/create-partner-orchestrator.use-case.ts ***!
  \******************************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
var CreatePartnerOrchestratorUseCase_1;
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePartnerOrchestratorUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
const create_business_use_case_1 = __webpack_require__(/*! @modules/businesses/application/use-cases/create-business/create-business.use-case */ "./apps/suppliers-ms/src/modules/businesses/application/use-cases/create-business/create-business.use-case.ts");
const create_business_request_1 = __webpack_require__(/*! @modules/businesses/application/use-cases/create-business/create-business.request */ "./apps/suppliers-ms/src/modules/businesses/application/use-cases/create-business/create-business.request.ts");
const create_bank_account_use_case_1 = __webpack_require__(/*! @modules/bank-accounts/application/use-cases/create-bank-account/create-bank-account.use-case */ "./apps/suppliers-ms/src/modules/bank-accounts/application/use-cases/create-bank-account/create-bank-account.use-case.ts");
const create_bank_account_request_1 = __webpack_require__(/*! @modules/bank-accounts/application/use-cases/create-bank-account/create-bank-account.request */ "./apps/suppliers-ms/src/modules/bank-accounts/application/use-cases/create-bank-account/create-bank-account.request.ts");
const publish_create_person_command_use_case_1 = __webpack_require__(/*! @messaging/application/use-cases/publish-create-person-command.use-case */ "./apps/suppliers-ms/src/modules/messaging/application/use-cases/publish-create-person-command.use-case.ts");
const publish_create_credit_facility_command_use_case_1 = __webpack_require__(/*! @messaging/application/use-cases/publish-create-credit-facility-command.use-case */ "./apps/suppliers-ms/src/modules/messaging/application/use-cases/publish-create-credit-facility-command.use-case.ts");
const publish_create_categories_command_use_case_1 = __webpack_require__(/*! @messaging/application/use-cases/publish-create-categories-command.use-case */ "./apps/suppliers-ms/src/modules/messaging/application/use-cases/publish-create-categories-command.use-case.ts");
const partner_onboarding_saga_repository_port_1 = __webpack_require__(/*! @modules/partners/application/ports/partner-onboarding-saga.repository.port */ "./apps/suppliers-ms/src/modules/partners/application/ports/partner-onboarding-saga.repository.port.ts");
const partner_user_sqs_result_reader_port_1 = __webpack_require__(/*! @modules/partners/application/ports/partner-user-sqs-result-reader.port */ "./apps/suppliers-ms/src/modules/partners/application/ports/partner-user-sqs-result-reader.port.ts");
const partner_onboarding_files_port_1 = __webpack_require__(/*! @modules/partners/application/ports/partner-onboarding-files.port */ "./apps/suppliers-ms/src/modules/partners/application/ports/partner-onboarding-files.port.ts");
const products_credit_facility_sync_port_1 = __webpack_require__(/*! @modules/partners/application/ports/products-credit-facility-sync.port */ "./apps/suppliers-ms/src/modules/partners/application/ports/products-credit-facility-sync.port.ts");
const partner_saga_compensation_port_1 = __webpack_require__(/*! @modules/partners/application/ports/partner-saga-compensation.port */ "./apps/suppliers-ms/src/modules/partners/application/ports/partner-saga-compensation.port.ts");
const create_partner_orchestrator_response_1 = __webpack_require__(/*! ./create-partner-orchestrator.response */ "./apps/suppliers-ms/src/modules/partners/application/use-cases/create-partner-orchestrator/create-partner-orchestrator.response.ts");
const suppliers_reference_lookup_port_1 = __webpack_require__(/*! @common/ports/suppliers-reference-lookup.port */ "./apps/suppliers-ms/src/common/ports/suppliers-reference-lookup.port.ts");
const create_legal_representative_use_case_1 = __webpack_require__(/*! @modules/legal-representatives/application/use-cases/create-legal-representative/create-legal-representative.use-case */ "./apps/suppliers-ms/src/modules/legal-representatives/application/use-cases/create-legal-representative/create-legal-representative.use-case.ts");
const create_legal_representative_request_1 = __webpack_require__(/*! @modules/legal-representatives/application/use-cases/create-legal-representative/create-legal-representative.request */ "./apps/suppliers-ms/src/modules/legal-representatives/application/use-cases/create-legal-representative/create-legal-representative.request.ts");
const create_supplier_use_case_1 = __webpack_require__(/*! @modules/suppliers/application/use-cases/create-supplier/create-supplier.use-case */ "./apps/suppliers-ms/src/modules/suppliers/application/use-cases/create-supplier/create-supplier.use-case.ts");
const create_supplier_request_1 = __webpack_require__(/*! @modules/suppliers/application/use-cases/create-supplier/create-supplier.request */ "./apps/suppliers-ms/src/modules/suppliers/application/use-cases/create-supplier/create-supplier.request.ts");
const create_partner_use_case_1 = __webpack_require__(/*! @modules/partners/application/use-cases/create-partner/create-partner.use-case */ "./apps/suppliers-ms/src/modules/partners/application/use-cases/create-partner/create-partner.use-case.ts");
const create_partner_request_1 = __webpack_require__(/*! @modules/partners/application/use-cases/create-partner/create-partner.request */ "./apps/suppliers-ms/src/modules/partners/application/use-cases/create-partner/create-partner.request.ts");
const TOTAL_STEPS = 9;
const PARTNER_ONBOARDING_FILE_FOLDERS = {
    bank_certification: 'bank-certifications',
    logo: 'logos/logo',
    co_branding: 'logos/co-branding',
};
let CreatePartnerOrchestratorUseCase = CreatePartnerOrchestratorUseCase_1 = class CreatePartnerOrchestratorUseCase {
    saga_repository;
    partner_user_sqs_result;
    files_port;
    suppliers_lookup;
    credit_facility_sync;
    compensation;
    create_bank_account;
    create_business;
    create_supplier;
    create_partner;
    create_legal_representative;
    publish_create_person;
    publish_create_credit_facility;
    publish_create_categories;
    logger = new common_1.Logger(CreatePartnerOrchestratorUseCase_1.name);
    constructor(saga_repository, partner_user_sqs_result, files_port, suppliers_lookup, credit_facility_sync, compensation, create_bank_account, create_business, create_supplier, create_partner, create_legal_representative, publish_create_person, publish_create_credit_facility, publish_create_categories) {
        this.saga_repository = saga_repository;
        this.partner_user_sqs_result = partner_user_sqs_result;
        this.files_port = files_port;
        this.suppliers_lookup = suppliers_lookup;
        this.credit_facility_sync = credit_facility_sync;
        this.compensation = compensation;
        this.create_bank_account = create_bank_account;
        this.create_business = create_business;
        this.create_supplier = create_supplier;
        this.create_partner = create_partner;
        this.create_legal_representative = create_legal_representative;
        this.publish_create_person = publish_create_person;
        this.publish_create_credit_facility = publish_create_credit_facility;
        this.publish_create_categories = publish_create_categories;
    }
    async start_async(command, files) {
        const saga_external_id = (0, shared_1.new_uuid)();
        const correlation_id = (0, shared_1.new_uuid)();
        await this.saga_repository.create_initial({
            external_id: saga_external_id,
            correlation_id,
            status: shared_1.PartnerOnboardingSagaStatus.RUNNING,
            current_step: 0,
        });
        void this.run(command, files, saga_external_id, correlation_id);
        return saga_external_id;
    }
    async run(command, files, saga_external_id, correlation_id) {
        const credit_facility_external_id = (0, shared_1.new_uuid)();
        const created = {};
        try {
            this.log_step(0, correlation_id, 'archivos → S3 (transversal-ms)');
            const file_urls = await this.files_port.resolve_urls({
                correlation_id,
                idempotency_key: saga_external_id,
                bank_certification: files.bank_certification,
                logo: files.logo,
                co_branding: files.co_branding,
                file_folders: PARTNER_ONBOARDING_FILE_FOLDERS,
            });
            this.log_step(1, correlation_id, 'crear bank_account');
            const bank_cert_url = file_urls.bank_certification_url.trim().length > 0
                ? file_urls.bank_certification_url.trim()
                : null;
            const bank_account = await this.create_bank_account.execute(new create_bank_account_request_1.CreateBankAccountRequest(command.bank_entity, command.account_number, bank_cert_url));
            created.bank_account_external_id = bank_account.external_id;
            await this.saga_repository.update_by_external_id(saga_external_id, {
                current_step: 1,
                bank_account_external_id: bank_account.external_id,
            });
            this.log_step(2, correlation_id, 'publicar create-person (RL) → SQS');
            const lr = command.legal_representative;
            const lr_idempotency_key = `${saga_external_id}__legal_representative`;
            let lr_person_external_id = null;
            let person_internal_id = null;
            if (lr !== null) {
                await this.publish_create_person.execute({
                    correlation_id,
                    idempotency_key: lr_idempotency_key,
                    country_code: command.country_code,
                    first_name: lr.first_name,
                    last_name: lr.last_name,
                    doc_type: lr.doc_type,
                    doc_number: lr.doc_number,
                    phone: lr.phone,
                    city_external_id: command.city_id,
                });
                const lr_sqs_result = await this.partner_user_sqs_result.wait_for_completed_result(lr_idempotency_key);
                lr_person_external_id = lr_sqs_result.person_external_id;
                person_internal_id =
                    await this.suppliers_lookup.get_person_internal_id_by_external_id(lr_person_external_id);
                await this.saga_repository.update_by_external_id(saga_external_id, {
                    current_step: 2,
                    person_external_id: lr_person_external_id,
                });
            }
            else {
                await this.saga_repository.update_by_external_id(saga_external_id, { current_step: 2 });
            }
            this.log_step(3, correlation_id, 'crear business');
            if (person_internal_id === null) {
                throw new Error('person_internal_id requerido para crear business (legal_representative es null)');
            }
            const business = await this.create_business.execute(new create_business_request_1.CreateBusinessRequest(person_internal_id, command.city_id, command.entity_type, command.business_name, command.business_address, command.business_type, command.relationship_to_business, command.legal_name, command.trade_name, command.tax_id, command.year_of_establishment));
            created.business_external_id = business.external_id;
            await this.saga_repository.update_by_external_id(saga_external_id, {
                current_step: 3,
                business_external_id: business.external_id,
            });
            this.log_step(4, correlation_id, 'crear credit_facility INACTIVE → products_schema');
            const cf = await this.credit_facility_sync.create_credit_facility({
                credit_facility_external_id,
                contract_id: command.contract_id,
                total_limit: command.total_limit,
                state: shared_1.CreditFacilityState.INACTIVE,
                business_id: business.internal_id,
            });
            created.credit_facility_external_id = credit_facility_external_id;
            await this.publish_create_credit_facility.execute({
                correlation_id,
                external_id: credit_facility_external_id,
                contract_id: command.contract_id,
                total_limit: command.total_limit,
                state: shared_1.CreditFacilityState.INACTIVE,
                business_id: business.internal_id,
            });
            await this.saga_repository.update_by_external_id(saga_external_id, { current_step: 4 });
            this.log_step(5, correlation_id, 'crear supplier');
            const supplier = await this.create_supplier.execute(new create_supplier_request_1.CreateSupplierRequest(business.internal_id, bank_account.internal_id));
            created.supplier_external_id = supplier.external_id;
            await this.saga_repository.update_by_external_id(saga_external_id, { current_step: 5 });
            this.log_step(6, correlation_id, 'crear legal_representative');
            let legal_representative_external_id = null;
            if (lr !== null) {
                const lr_row = await this.create_legal_representative.execute(new create_legal_representative_request_1.CreateLegalRepresentativeRequest(person_internal_id, true, business.internal_id));
                legal_representative_external_id = lr_row.external_id;
            }
            await this.saga_repository.update_by_external_id(saga_external_id, { current_step: 6 });
            this.log_step(7, correlation_id, 'crear partner');
            const logo_stored = file_urls.logo_url.trim().length > 0 ? file_urls.logo_url.trim() : null;
            const co_branding_stored = file_urls.co_branding_url.trim().length > 0
                ? file_urls.co_branding_url.trim()
                : null;
            const partner = await this.create_partner.execute(new create_partner_request_1.CreatePartnerRequest(supplier.internal_id, command.acronym, logo_stored, co_branding_stored, command.primary_color, command.secondary_color, command.light_color, command.notification_email, command.webhook_url, command.send_sales_rep_voucher, command.disbursement_notification_email));
            created.partner_external_id = partner.external_id;
            await this.saga_repository.update_by_external_id(saga_external_id, { current_step: 7 });
            this.log_step(8, correlation_id, 'publicar categorías → SQS');
            await this.publish_create_categories.execute({
                correlation_id,
                credit_facility_external_id,
                partner_id: partner.internal_id,
                state: shared_1.CreditFacilityState.INACTIVE,
                categories: command.categories,
            });
            await this.saga_repository.update_by_external_id(saga_external_id, { current_step: 8 });
            this.log_step(9, correlation_id, 'activar credit_facility → ACTIVE');
            await this.credit_facility_sync.update_credit_facility_state(credit_facility_external_id, shared_1.CreditFacilityState.ACTIVE);
            await this.saga_repository.update_by_external_id(saga_external_id, {
                current_step: 9,
                status: shared_1.PartnerOnboardingSagaStatus.COMPLETED,
                credit_facility_external_id,
                partner_external_id: partner.external_id,
            });
            this.logger.log(`[Saga][COMPLETED][correlation_id=${correlation_id}] partner=${partner.external_id}`);
            void this.build_response(saga_external_id, correlation_id, credit_facility_external_id, lr_person_external_id, legal_representative_external_id, business.external_id, file_urls.bank_certification_url, file_urls.logo_url, file_urls.co_branding_url, bank_account.external_id, supplier.external_id, partner.external_id);
        }
        catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            this.logger.error(`[Saga][FAILED][correlation_id=${correlation_id}] ${message}`);
            await this.saga_repository.update_by_external_id(saga_external_id, {
                status: shared_1.PartnerOnboardingSagaStatus.COMPENSATING,
                error_message: message,
            });
            await this.compensate(correlation_id, created);
            await this.saga_repository.update_by_external_id(saga_external_id, {
                status: shared_1.PartnerOnboardingSagaStatus.FAILED,
            });
        }
    }
    async compensate(correlation_id, created) {
        this.logger.warn(`[Saga][COMPENSATING][correlation_id=${correlation_id}] iniciando rollback`);
        if (created.partner_external_id) {
            await this.compensation.delete_partner(created.partner_external_id);
        }
        if (created.supplier_external_id) {
            await this.compensation.delete_supplier(created.supplier_external_id);
        }
        if (created.credit_facility_external_id) {
            await this.compensation.delete_credit_facility(created.credit_facility_external_id);
        }
        if (created.business_external_id) {
            await this.compensation.delete_business(created.business_external_id);
        }
        if (created.bank_account_external_id) {
            await this.compensation.delete_bank_account(created.bank_account_external_id);
        }
    }
    build_response(saga_external_id, correlation_id, credit_facility_external_id, lr_person_external_id, legal_representative_external_id, business_external_id, bank_certification_url, logo_url, co_branding_url, bank_account_external_id, supplier_external_id, partner_external_id) {
        return new create_partner_orchestrator_response_1.CreatePartnerOrchestratorResponse(saga_external_id, correlation_id, credit_facility_external_id, null, lr_person_external_id, legal_representative_external_id, business_external_id, bank_certification_url, logo_url, co_branding_url, bank_account_external_id, supplier_external_id, partner_external_id);
    }
    log_step(step_index, correlation_id, label) {
        this.logger.debug(`[Saga][${step_index}/${TOTAL_STEPS}][correlation_id=${correlation_id}] ${label}`);
    }
};
exports.CreatePartnerOrchestratorUseCase = CreatePartnerOrchestratorUseCase;
exports.CreatePartnerOrchestratorUseCase = CreatePartnerOrchestratorUseCase = CreatePartnerOrchestratorUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(partner_onboarding_saga_repository_port_1.PARTNER_ONBOARDING_SAGA_REPOSITORY)),
    __param(1, (0, common_1.Inject)(partner_user_sqs_result_reader_port_1.PARTNER_USER_SQS_RESULT_READER_PORT)),
    __param(2, (0, common_1.Inject)(partner_onboarding_files_port_1.PARTNER_ONBOARDING_FILES_PORT)),
    __param(3, (0, common_1.Inject)(suppliers_reference_lookup_port_1.SUPPLIERS_REFERENCE_LOOKUP)),
    __param(4, (0, common_1.Inject)(products_credit_facility_sync_port_1.PRODUCTS_CREDIT_FACILITY_SYNC_PORT)),
    __param(5, (0, common_1.Inject)(partner_saga_compensation_port_1.PARTNER_SAGA_COMPENSATION_PORT)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, typeof (_a = typeof create_bank_account_use_case_1.CreateBankAccountUseCase !== "undefined" && create_bank_account_use_case_1.CreateBankAccountUseCase) === "function" ? _a : Object, typeof (_b = typeof create_business_use_case_1.CreateBusinessUseCase !== "undefined" && create_business_use_case_1.CreateBusinessUseCase) === "function" ? _b : Object, typeof (_c = typeof create_supplier_use_case_1.CreateSupplierUseCase !== "undefined" && create_supplier_use_case_1.CreateSupplierUseCase) === "function" ? _c : Object, typeof (_d = typeof create_partner_use_case_1.CreatePartnerUseCase !== "undefined" && create_partner_use_case_1.CreatePartnerUseCase) === "function" ? _d : Object, typeof (_e = typeof create_legal_representative_use_case_1.CreateLegalRepresentativeUseCase !== "undefined" && create_legal_representative_use_case_1.CreateLegalRepresentativeUseCase) === "function" ? _e : Object, typeof (_f = typeof publish_create_person_command_use_case_1.PublishCreatePersonCommandUseCase !== "undefined" && publish_create_person_command_use_case_1.PublishCreatePersonCommandUseCase) === "function" ? _f : Object, typeof (_g = typeof publish_create_credit_facility_command_use_case_1.PublishCreateCreditFacilityCommandUseCase !== "undefined" && publish_create_credit_facility_command_use_case_1.PublishCreateCreditFacilityCommandUseCase) === "function" ? _g : Object, typeof (_h = typeof publish_create_categories_command_use_case_1.PublishCreateCategoriesCommandUseCase !== "undefined" && publish_create_categories_command_use_case_1.PublishCreateCategoriesCommandUseCase) === "function" ? _h : Object])
], CreatePartnerOrchestratorUseCase);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/partners/application/use-cases/create-partner/create-partner.request.ts"
/*!***************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/partners/application/use-cases/create-partner/create-partner.request.ts ***!
  \***************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePartnerRequest = void 0;
class CreatePartnerRequest {
    supplier_internal_id;
    acronym;
    logo_url;
    co_branding_logo_url;
    primary_color;
    secondary_color;
    light_color;
    notification_email;
    webhook_url;
    send_sales_rep_voucher;
    disbursement_notification_email;
    constructor(supplier_internal_id, acronym, logo_url, co_branding_logo_url, primary_color, secondary_color, light_color, notification_email, webhook_url, send_sales_rep_voucher, disbursement_notification_email) {
        this.supplier_internal_id = supplier_internal_id;
        this.acronym = acronym;
        this.logo_url = logo_url;
        this.co_branding_logo_url = co_branding_logo_url;
        this.primary_color = primary_color;
        this.secondary_color = secondary_color;
        this.light_color = light_color;
        this.notification_email = notification_email;
        this.webhook_url = webhook_url;
        this.send_sales_rep_voucher = send_sales_rep_voucher;
        this.disbursement_notification_email = disbursement_notification_email;
    }
}
exports.CreatePartnerRequest = CreatePartnerRequest;


/***/ },

/***/ "./apps/suppliers-ms/src/modules/partners/application/use-cases/create-partner/create-partner.response.ts"
/*!****************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/partners/application/use-cases/create-partner/create-partner.response.ts ***!
  \****************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePartnerResponse = void 0;
class CreatePartnerResponse {
    internal_id;
    external_id;
    supplier_external_id;
    acronym;
    logo_url;
    co_branding_logo_url;
    primary_color;
    secondary_color;
    light_color;
    notification_email;
    webhook_url;
    send_sales_rep_voucher;
    disbursement_notification_email;
    state;
    created_at;
    updated_at;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.CreatePartnerResponse = CreatePartnerResponse;


/***/ },

/***/ "./apps/suppliers-ms/src/modules/partners/application/use-cases/create-partner/create-partner.use-case.ts"
/*!****************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/partners/application/use-cases/create-partner/create-partner.use-case.ts ***!
  \****************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.CreatePartnerUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const suppliers_reference_lookup_port_1 = __webpack_require__(/*! @common/ports/suppliers-reference-lookup.port */ "./apps/suppliers-ms/src/common/ports/suppliers-reference-lookup.port.ts");
const partners_tokens_1 = __webpack_require__(/*! @modules/partners/partners.tokens */ "./apps/suppliers-ms/src/modules/partners/partners.tokens.ts");
const partner_repository_1 = __webpack_require__(/*! @modules/partners/domain/repositories/partner.repository */ "./apps/suppliers-ms/src/modules/partners/domain/repositories/partner.repository.ts");
const partner_public_fields_builder_1 = __webpack_require__(/*! @modules/partners/application/mapping/partner-public-fields.builder */ "./apps/suppliers-ms/src/modules/partners/application/mapping/partner-public-fields.builder.ts");
const partner_created_event_1 = __webpack_require__(/*! @modules/partners/domain/events/partner-created.event */ "./apps/suppliers-ms/src/modules/partners/domain/events/partner-created.event.ts");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
const create_partner_response_1 = __webpack_require__(/*! ./create-partner.response */ "./apps/suppliers-ms/src/modules/partners/application/use-cases/create-partner/create-partner.response.ts");
let CreatePartnerUseCase = class CreatePartnerUseCase {
    partner_repository;
    lookup;
    event_bus;
    constructor(partner_repository, lookup, event_bus) {
        this.partner_repository = partner_repository;
        this.lookup = lookup;
        this.event_bus = event_bus;
    }
    async execute(req) {
        const created = await this.partner_repository.create({
            supplier_id: req.supplier_internal_id,
            acronym: req.acronym,
            logo_url: req.logo_url,
            co_branding_logo_url: req.co_branding_logo_url,
            primary_color: req.primary_color,
            secondary_color: req.secondary_color,
            light_color: req.light_color,
            notification_email: req.notification_email,
            webhook_url: req.webhook_url,
            send_sales_rep_voucher: req.send_sales_rep_voucher,
            disbursement_notification_email: req.disbursement_notification_email,
        });
        await this.event_bus?.publish(new partner_created_event_1.PartnerCreatedEvent(created.external_id, created.supplier_id));
        const fields = await (0, partner_public_fields_builder_1.build_partner_public_fields)(created, this.lookup);
        return new create_partner_response_1.CreatePartnerResponse(fields);
    }
};
exports.CreatePartnerUseCase = CreatePartnerUseCase;
exports.CreatePartnerUseCase = CreatePartnerUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(partners_tokens_1.PARTNER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(suppliers_reference_lookup_port_1.SUPPLIERS_REFERENCE_LOOKUP)),
    __param(2, (0, common_1.Optional)()),
    __param(2, (0, common_1.Inject)(shared_1.DOMAIN_EVENT_BUS)),
    __metadata("design:paramtypes", [typeof (_a = typeof partner_repository_1.PartnerRepository !== "undefined" && partner_repository_1.PartnerRepository) === "function" ? _a : Object, Object, Object])
], CreatePartnerUseCase);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/partners/application/use-cases/delete-partner-by-external-id/delete-partner-by-external-id.use-case.ts"
/*!**********************************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/partners/application/use-cases/delete-partner-by-external-id/delete-partner-by-external-id.use-case.ts ***!
  \**********************************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.DeletePartnerByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const partners_tokens_1 = __webpack_require__(/*! @modules/partners/partners.tokens */ "./apps/suppliers-ms/src/modules/partners/partners.tokens.ts");
const partner_repository_1 = __webpack_require__(/*! @modules/partners/domain/repositories/partner.repository */ "./apps/suppliers-ms/src/modules/partners/domain/repositories/partner.repository.ts");
let DeletePartnerByExternalIdUseCase = class DeletePartnerByExternalIdUseCase {
    partner_repository;
    constructor(partner_repository) {
        this.partner_repository = partner_repository;
    }
    async execute(req) {
        const ok = await this.partner_repository.delete_by_external_id(req.external_id);
        if (!ok) {
            throw new common_1.NotFoundException('partner not found');
        }
    }
};
exports.DeletePartnerByExternalIdUseCase = DeletePartnerByExternalIdUseCase;
exports.DeletePartnerByExternalIdUseCase = DeletePartnerByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(partners_tokens_1.PARTNER_REPOSITORY)),
    __metadata("design:paramtypes", [typeof (_a = typeof partner_repository_1.PartnerRepository !== "undefined" && partner_repository_1.PartnerRepository) === "function" ? _a : Object])
], DeletePartnerByExternalIdUseCase);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/partners/application/use-cases/get-partner-by-external-id/get-partner-by-external-id.response.ts"
/*!****************************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/partners/application/use-cases/get-partner-by-external-id/get-partner-by-external-id.response.ts ***!
  \****************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetPartnerByExternalIdResponse = void 0;
class GetPartnerByExternalIdResponse {
    internal_id;
    external_id;
    supplier_external_id;
    acronym;
    logo_url;
    co_branding_logo_url;
    primary_color;
    secondary_color;
    light_color;
    notification_email;
    webhook_url;
    send_sales_rep_voucher;
    disbursement_notification_email;
    state;
    created_at;
    updated_at;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.GetPartnerByExternalIdResponse = GetPartnerByExternalIdResponse;


/***/ },

/***/ "./apps/suppliers-ms/src/modules/partners/application/use-cases/get-partner-by-external-id/get-partner-by-external-id.use-case.ts"
/*!****************************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/partners/application/use-cases/get-partner-by-external-id/get-partner-by-external-id.use-case.ts ***!
  \****************************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.GetPartnerByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const suppliers_reference_lookup_port_1 = __webpack_require__(/*! @common/ports/suppliers-reference-lookup.port */ "./apps/suppliers-ms/src/common/ports/suppliers-reference-lookup.port.ts");
const partners_tokens_1 = __webpack_require__(/*! @modules/partners/partners.tokens */ "./apps/suppliers-ms/src/modules/partners/partners.tokens.ts");
const partner_repository_1 = __webpack_require__(/*! @modules/partners/domain/repositories/partner.repository */ "./apps/suppliers-ms/src/modules/partners/domain/repositories/partner.repository.ts");
const partner_public_fields_builder_1 = __webpack_require__(/*! @modules/partners/application/mapping/partner-public-fields.builder */ "./apps/suppliers-ms/src/modules/partners/application/mapping/partner-public-fields.builder.ts");
const get_partner_by_external_id_response_1 = __webpack_require__(/*! ./get-partner-by-external-id.response */ "./apps/suppliers-ms/src/modules/partners/application/use-cases/get-partner-by-external-id/get-partner-by-external-id.response.ts");
let GetPartnerByExternalIdUseCase = class GetPartnerByExternalIdUseCase {
    partner_repository;
    lookup;
    constructor(partner_repository, lookup) {
        this.partner_repository = partner_repository;
        this.lookup = lookup;
    }
    async execute(req) {
        const row = await this.partner_repository.find_by_external_id(req.external_id);
        if (row === null) {
            throw new common_1.NotFoundException('partner not found');
        }
        const fields = await (0, partner_public_fields_builder_1.build_partner_public_fields)(row, this.lookup);
        return new get_partner_by_external_id_response_1.GetPartnerByExternalIdResponse(fields);
    }
};
exports.GetPartnerByExternalIdUseCase = GetPartnerByExternalIdUseCase;
exports.GetPartnerByExternalIdUseCase = GetPartnerByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(partners_tokens_1.PARTNER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(suppliers_reference_lookup_port_1.SUPPLIERS_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [typeof (_a = typeof partner_repository_1.PartnerRepository !== "undefined" && partner_repository_1.PartnerRepository) === "function" ? _a : Object, Object])
], GetPartnerByExternalIdUseCase);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/partners/application/use-cases/list-partners/list-partners.response.ts"
/*!**************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/partners/application/use-cases/list-partners/list-partners.response.ts ***!
  \**************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListPartnersItemResponse = void 0;
class ListPartnersItemResponse {
    internal_id;
    external_id;
    supplier_external_id;
    acronym;
    logo_url;
    co_branding_logo_url;
    primary_color;
    secondary_color;
    light_color;
    notification_email;
    webhook_url;
    send_sales_rep_voucher;
    disbursement_notification_email;
    state;
    created_at;
    updated_at;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.ListPartnersItemResponse = ListPartnersItemResponse;


/***/ },

/***/ "./apps/suppliers-ms/src/modules/partners/application/use-cases/list-partners/list-partners.use-case.ts"
/*!**************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/partners/application/use-cases/list-partners/list-partners.use-case.ts ***!
  \**************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.ListPartnersUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const suppliers_reference_lookup_port_1 = __webpack_require__(/*! @common/ports/suppliers-reference-lookup.port */ "./apps/suppliers-ms/src/common/ports/suppliers-reference-lookup.port.ts");
const partners_tokens_1 = __webpack_require__(/*! @modules/partners/partners.tokens */ "./apps/suppliers-ms/src/modules/partners/partners.tokens.ts");
const partner_repository_1 = __webpack_require__(/*! @modules/partners/domain/repositories/partner.repository */ "./apps/suppliers-ms/src/modules/partners/domain/repositories/partner.repository.ts");
const partner_public_fields_builder_1 = __webpack_require__(/*! @modules/partners/application/mapping/partner-public-fields.builder */ "./apps/suppliers-ms/src/modules/partners/application/mapping/partner-public-fields.builder.ts");
const list_partners_response_1 = __webpack_require__(/*! ./list-partners.response */ "./apps/suppliers-ms/src/modules/partners/application/use-cases/list-partners/list-partners.response.ts");
let ListPartnersUseCase = class ListPartnersUseCase {
    partner_repository;
    lookup;
    constructor(partner_repository, lookup) {
        this.partner_repository = partner_repository;
        this.lookup = lookup;
    }
    async execute() {
        const rows = await this.partner_repository.find_all();
        const out = [];
        for (const row of rows) {
            const fields = await (0, partner_public_fields_builder_1.build_partner_public_fields)(row, this.lookup);
            out.push(new list_partners_response_1.ListPartnersItemResponse(fields));
        }
        return out;
    }
};
exports.ListPartnersUseCase = ListPartnersUseCase;
exports.ListPartnersUseCase = ListPartnersUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(partners_tokens_1.PARTNER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(suppliers_reference_lookup_port_1.SUPPLIERS_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [typeof (_a = typeof partner_repository_1.PartnerRepository !== "undefined" && partner_repository_1.PartnerRepository) === "function" ? _a : Object, Object])
], ListPartnersUseCase);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/partners/application/use-cases/update-partner-by-external-id/update-partner-by-external-id.request.ts"
/*!*********************************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/partners/application/use-cases/update-partner-by-external-id/update-partner-by-external-id.request.ts ***!
  \*********************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdatePartnerByExternalIdRequest = void 0;
class UpdatePartnerByExternalIdRequest {
    external_id;
    acronym;
    logo_url;
    co_branding_logo_url;
    primary_color;
    secondary_color;
    light_color;
    notification_email;
    webhook_url;
    send_sales_rep_voucher;
    disbursement_notification_email;
    state;
    constructor(external_id, acronym, logo_url, co_branding_logo_url, primary_color, secondary_color, light_color, notification_email, webhook_url, send_sales_rep_voucher, disbursement_notification_email, state) {
        this.external_id = external_id;
        this.acronym = acronym;
        this.logo_url = logo_url;
        this.co_branding_logo_url = co_branding_logo_url;
        this.primary_color = primary_color;
        this.secondary_color = secondary_color;
        this.light_color = light_color;
        this.notification_email = notification_email;
        this.webhook_url = webhook_url;
        this.send_sales_rep_voucher = send_sales_rep_voucher;
        this.disbursement_notification_email = disbursement_notification_email;
        this.state = state;
    }
}
exports.UpdatePartnerByExternalIdRequest = UpdatePartnerByExternalIdRequest;


/***/ },

/***/ "./apps/suppliers-ms/src/modules/partners/application/use-cases/update-partner-by-external-id/update-partner-by-external-id.response.ts"
/*!**********************************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/partners/application/use-cases/update-partner-by-external-id/update-partner-by-external-id.response.ts ***!
  \**********************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdatePartnerByExternalIdResponse = void 0;
class UpdatePartnerByExternalIdResponse {
    internal_id;
    external_id;
    supplier_external_id;
    acronym;
    logo_url;
    co_branding_logo_url;
    primary_color;
    secondary_color;
    light_color;
    notification_email;
    webhook_url;
    send_sales_rep_voucher;
    disbursement_notification_email;
    state;
    created_at;
    updated_at;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.UpdatePartnerByExternalIdResponse = UpdatePartnerByExternalIdResponse;


/***/ },

/***/ "./apps/suppliers-ms/src/modules/partners/application/use-cases/update-partner-by-external-id/update-partner-by-external-id.use-case.ts"
/*!**********************************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/partners/application/use-cases/update-partner-by-external-id/update-partner-by-external-id.use-case.ts ***!
  \**********************************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.UpdatePartnerByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const suppliers_reference_lookup_port_1 = __webpack_require__(/*! @common/ports/suppliers-reference-lookup.port */ "./apps/suppliers-ms/src/common/ports/suppliers-reference-lookup.port.ts");
const partners_tokens_1 = __webpack_require__(/*! @modules/partners/partners.tokens */ "./apps/suppliers-ms/src/modules/partners/partners.tokens.ts");
const partner_repository_1 = __webpack_require__(/*! @modules/partners/domain/repositories/partner.repository */ "./apps/suppliers-ms/src/modules/partners/domain/repositories/partner.repository.ts");
const partner_public_fields_builder_1 = __webpack_require__(/*! @modules/partners/application/mapping/partner-public-fields.builder */ "./apps/suppliers-ms/src/modules/partners/application/mapping/partner-public-fields.builder.ts");
const update_partner_by_external_id_response_1 = __webpack_require__(/*! ./update-partner-by-external-id.response */ "./apps/suppliers-ms/src/modules/partners/application/use-cases/update-partner-by-external-id/update-partner-by-external-id.response.ts");
let UpdatePartnerByExternalIdUseCase = class UpdatePartnerByExternalIdUseCase {
    partner_repository;
    lookup;
    constructor(partner_repository, lookup) {
        this.partner_repository = partner_repository;
        this.lookup = lookup;
    }
    async execute(req) {
        const patch = {};
        if (req.acronym !== undefined) {
            patch.acronym = req.acronym;
        }
        if (req.logo_url !== undefined) {
            patch.logo_url = req.logo_url;
        }
        if (req.co_branding_logo_url !== undefined) {
            patch.co_branding_logo_url = req.co_branding_logo_url;
        }
        if (req.primary_color !== undefined) {
            patch.primary_color = req.primary_color;
        }
        if (req.secondary_color !== undefined) {
            patch.secondary_color = req.secondary_color;
        }
        if (req.light_color !== undefined) {
            patch.light_color = req.light_color;
        }
        if (req.notification_email !== undefined) {
            patch.notification_email = req.notification_email;
        }
        if (req.webhook_url !== undefined) {
            patch.webhook_url = req.webhook_url;
        }
        if (req.send_sales_rep_voucher !== undefined) {
            patch.send_sales_rep_voucher = req.send_sales_rep_voucher;
        }
        if (req.disbursement_notification_email !== undefined) {
            patch.disbursement_notification_email =
                req.disbursement_notification_email;
        }
        if (req.state !== undefined) {
            patch.state = req.state;
        }
        const updated = await this.partner_repository.update_by_external_id(req.external_id, patch);
        if (updated === null) {
            throw new common_1.NotFoundException('partner not found');
        }
        const fields = await (0, partner_public_fields_builder_1.build_partner_public_fields)(updated, this.lookup);
        return new update_partner_by_external_id_response_1.UpdatePartnerByExternalIdResponse(fields);
    }
};
exports.UpdatePartnerByExternalIdUseCase = UpdatePartnerByExternalIdUseCase;
exports.UpdatePartnerByExternalIdUseCase = UpdatePartnerByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(partners_tokens_1.PARTNER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(suppliers_reference_lookup_port_1.SUPPLIERS_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [typeof (_a = typeof partner_repository_1.PartnerRepository !== "undefined" && partner_repository_1.PartnerRepository) === "function" ? _a : Object, Object])
], UpdatePartnerByExternalIdUseCase);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/partners/domain/entities/partner.entity.ts"
/*!**********************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/partners/domain/entities/partner.entity.ts ***!
  \**********************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Partner = void 0;
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
class Partner extends shared_1.Entity {
    constructor(props) {
        super(props);
    }
    get id() {
        return this.props.external_id;
    }
    get internal_id() {
        return this.props.internal_id;
    }
    get supplier_id() {
        return this.props.supplier_id;
    }
    get external_id() {
        return this.props.external_id;
    }
    get acronym() {
        return this.props.acronym;
    }
    get logo_url() {
        return this.props.logo_url;
    }
    get co_branding_logo_url() {
        return this.props.co_branding_logo_url;
    }
    get primary_color() {
        return this.props.primary_color;
    }
    get secondary_color() {
        return this.props.secondary_color;
    }
    get light_color() {
        return this.props.light_color;
    }
    get notification_email() {
        return this.props.notification_email;
    }
    get webhook_url() {
        return this.props.webhook_url;
    }
    get send_sales_rep_voucher() {
        return this.props.send_sales_rep_voucher;
    }
    get disbursement_notification_email() {
        return this.props.disbursement_notification_email;
    }
    get state() {
        return this.props.state;
    }
    get created_at() {
        return this.props.created_at;
    }
    get updated_at() {
        return this.props.updated_at;
    }
    toPrimitives() {
        return { ...this.props };
    }
}
exports.Partner = Partner;


/***/ },

/***/ "./apps/suppliers-ms/src/modules/partners/domain/events/partner-created.event.ts"
/*!***************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/partners/domain/events/partner-created.event.ts ***!
  \***************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PartnerCreatedEvent = void 0;
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
class PartnerCreatedEvent {
    partner_external_id;
    supplier_id;
    correlation_id;
    eventId;
    occurredAt;
    aggregateId;
    constructor(partner_external_id, supplier_id, correlation_id) {
        this.partner_external_id = partner_external_id;
        this.supplier_id = supplier_id;
        this.correlation_id = correlation_id;
        this.eventId = (0, shared_1.new_uuid)();
        this.occurredAt = new Date();
        this.aggregateId = partner_external_id;
    }
}
exports.PartnerCreatedEvent = PartnerCreatedEvent;


/***/ },

/***/ "./apps/suppliers-ms/src/modules/partners/domain/repositories/partner.repository.ts"
/*!******************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/partners/domain/repositories/partner.repository.ts ***!
  \******************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ "./apps/suppliers-ms/src/modules/partners/partners.module.ts"
/*!*******************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/partners/partners.module.ts ***!
  \*******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PartnersModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const platform_express_1 = __webpack_require__(/*! @nestjs/platform-express */ "@nestjs/platform-express");
const multer_1 = __webpack_require__(/*! multer */ "multer");
const infrastructure_module_1 = __webpack_require__(/*! @infrastructure/infrastructure.module */ "./apps/suppliers-ms/src/infrastructure/infrastructure.module.ts");
const messaging_application_module_1 = __webpack_require__(/*! @messaging/messaging-application.module */ "./apps/suppliers-ms/src/modules/messaging/messaging-application.module.ts");
const bank_accounts_module_1 = __webpack_require__(/*! @modules/bank-accounts/bank-accounts.module */ "./apps/suppliers-ms/src/modules/bank-accounts/bank-accounts.module.ts");
const businesses_module_1 = __webpack_require__(/*! @modules/businesses/businesses.module */ "./apps/suppliers-ms/src/modules/businesses/businesses.module.ts");
const legal_representatives_module_1 = __webpack_require__(/*! @modules/legal-representatives/legal-representatives.module */ "./apps/suppliers-ms/src/modules/legal-representatives/legal-representatives.module.ts");
const suppliers_module_1 = __webpack_require__(/*! @modules/suppliers/suppliers.module */ "./apps/suppliers-ms/src/modules/suppliers/suppliers.module.ts");
const typeorm_partner_repository_1 = __webpack_require__(/*! @infrastructure/database/repositories/typeorm-partner.repository */ "./apps/suppliers-ms/src/infrastructure/database/repositories/typeorm-partner.repository.ts");
const partners_tokens_1 = __webpack_require__(/*! ./partners.tokens */ "./apps/suppliers-ms/src/modules/partners/partners.tokens.ts");
const create_partner_use_case_1 = __webpack_require__(/*! ./application/use-cases/create-partner/create-partner.use-case */ "./apps/suppliers-ms/src/modules/partners/application/use-cases/create-partner/create-partner.use-case.ts");
const get_partner_by_external_id_use_case_1 = __webpack_require__(/*! ./application/use-cases/get-partner-by-external-id/get-partner-by-external-id.use-case */ "./apps/suppliers-ms/src/modules/partners/application/use-cases/get-partner-by-external-id/get-partner-by-external-id.use-case.ts");
const list_partners_use_case_1 = __webpack_require__(/*! ./application/use-cases/list-partners/list-partners.use-case */ "./apps/suppliers-ms/src/modules/partners/application/use-cases/list-partners/list-partners.use-case.ts");
const update_partner_by_external_id_use_case_1 = __webpack_require__(/*! ./application/use-cases/update-partner-by-external-id/update-partner-by-external-id.use-case */ "./apps/suppliers-ms/src/modules/partners/application/use-cases/update-partner-by-external-id/update-partner-by-external-id.use-case.ts");
const delete_partner_by_external_id_use_case_1 = __webpack_require__(/*! ./application/use-cases/delete-partner-by-external-id/delete-partner-by-external-id.use-case */ "./apps/suppliers-ms/src/modules/partners/application/use-cases/delete-partner-by-external-id/delete-partner-by-external-id.use-case.ts");
const create_partner_orchestrator_use_case_1 = __webpack_require__(/*! ./application/use-cases/create-partner-orchestrator/create-partner-orchestrator.use-case */ "./apps/suppliers-ms/src/modules/partners/application/use-cases/create-partner-orchestrator/create-partner-orchestrator.use-case.ts");
const partners_controller_1 = __webpack_require__(/*! ./presentation/partners.controller */ "./apps/suppliers-ms/src/modules/partners/presentation/partners.controller.ts");
let PartnersModule = class PartnersModule {
};
exports.PartnersModule = PartnersModule;
exports.PartnersModule = PartnersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            infrastructure_module_1.InfrastructureModule,
            messaging_application_module_1.MessagingApplicationModule,
            bank_accounts_module_1.BankAccountsModule,
            businesses_module_1.BusinessesModule,
            legal_representatives_module_1.LegalRepresentativesModule,
            suppliers_module_1.SuppliersModule,
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.memoryStorage)(),
                limits: { fileSize: 12 * 1024 * 1024 },
            }),
        ],
        controllers: [partners_controller_1.PartnersController],
        providers: [
            {
                provide: partners_tokens_1.PARTNER_REPOSITORY,
                useExisting: typeorm_partner_repository_1.TypeormPartnerRepository,
            },
            create_partner_use_case_1.CreatePartnerUseCase,
            get_partner_by_external_id_use_case_1.GetPartnerByExternalIdUseCase,
            list_partners_use_case_1.ListPartnersUseCase,
            update_partner_by_external_id_use_case_1.UpdatePartnerByExternalIdUseCase,
            delete_partner_by_external_id_use_case_1.DeletePartnerByExternalIdUseCase,
            create_partner_orchestrator_use_case_1.CreatePartnerOrchestratorUseCase,
        ],
        exports: [
            partners_tokens_1.PARTNER_REPOSITORY,
            create_partner_use_case_1.CreatePartnerUseCase,
            get_partner_by_external_id_use_case_1.GetPartnerByExternalIdUseCase,
            list_partners_use_case_1.ListPartnersUseCase,
            update_partner_by_external_id_use_case_1.UpdatePartnerByExternalIdUseCase,
            delete_partner_by_external_id_use_case_1.DeletePartnerByExternalIdUseCase,
        ],
    })
], PartnersModule);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/partners/partners.tokens.ts"
/*!*******************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/partners/partners.tokens.ts ***!
  \*******************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PARTNER_REPOSITORY = void 0;
exports.PARTNER_REPOSITORY = Symbol('PARTNER_REPOSITORY');


/***/ },

/***/ "./apps/suppliers-ms/src/modules/partners/presentation/dto/create-partner-payload.dto.ts"
/*!***********************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/partners/presentation/dto/create-partner-payload.dto.ts ***!
  \***********************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.CreatePartnerPayloadDto = exports.PartnerCategoryPayloadDto = exports.CreatePartnerCreditFacilityPayloadDto = exports.CreatePartnerBankAccountPayloadDto = exports.CreatePartnerPartnerSectionPayloadDto = exports.CreatePartnerBusinessPayloadDto = exports.LegalRepresentativePayloadDto = exports.OperatingUserPayloadDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const UUID_V4_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function trim_optional_string(v) {
    if (v === null || v === undefined) {
        return null;
    }
    const t = String(v).trim();
    return t.length > 0 ? t : null;
}
let BusinessCityReferenceV4Constraint = class BusinessCityReferenceV4Constraint {
    validate(business, _args) {
        if (business === null || business === undefined || typeof business !== 'object') {
            return false;
        }
        const o = business;
        const primary = trim_optional_string(o.cityId);
        const legacy = trim_optional_string(o.cityExternalId);
        const valid_primary = primary !== null && UUID_V4_RE.test(primary);
        const valid_legacy = legacy !== null && UUID_V4_RE.test(legacy);
        return valid_primary || valid_legacy;
    }
    defaultMessage() {
        return 'business requiere cityId (UUID v4) o cityExternalId legado con UUID v4.';
    }
};
BusinessCityReferenceV4Constraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'business_city_reference_v4', async: false })
], BusinessCityReferenceV4Constraint);
class OperatingUserPayloadDto {
    firstName;
    lastName;
    docType;
    docNumber;
    phone;
    email;
}
exports.OperatingUserPayloadDto = OperatingUserPayloadDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OperatingUserPayloadDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OperatingUserPayloadDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tipo de documento (catálogo / código).' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OperatingUserPayloadDto.prototype, "docType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OperatingUserPayloadDto.prototype, "docNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        nullable: true,
        description: 'Teléfono como texto (p. ej. E.164 o número local).',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(32),
    __metadata("design:type", Object)
], OperatingUserPayloadDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], OperatingUserPayloadDto.prototype, "email", void 0);
class LegalRepresentativePayloadDto {
    firstName;
    lastName;
    docType;
    docNumber;
    phone;
    email;
}
exports.LegalRepresentativePayloadDto = LegalRepresentativePayloadDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LegalRepresentativePayloadDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LegalRepresentativePayloadDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LegalRepresentativePayloadDto.prototype, "docType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LegalRepresentativePayloadDto.prototype, "docNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        nullable: true,
        description: 'Teléfono como texto (p. ej. E.164 o número local).',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(32),
    __metadata("design:type", Object)
], LegalRepresentativePayloadDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], LegalRepresentativePayloadDto.prototype, "email", void 0);
class CreatePartnerBusinessPayloadDto {
    cityId;
    cityExternalId;
    entityType;
    businessName;
    businessAddress;
    businessType;
    legalName;
    tradeName;
    taxId;
    yearOfEstablishment;
    legalRepresentative;
}
exports.CreatePartnerBusinessPayloadDto = CreatePartnerBusinessPayloadDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'UUID v4 de ciudad en catálogo transversal (contrato HTTP). Si aún migra desde cityExternalId, puede omitirse si envía el legado.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(36),
    __metadata("design:type", String)
], CreatePartnerBusinessPayloadDto.prototype, "cityId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Alias legado de cityId; mismo UUID v4. Preferir cityId en clientes nuevos.',
        deprecated: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(36),
    __metadata("design:type", String)
], CreatePartnerBusinessPayloadDto.prototype, "cityExternalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePartnerBusinessPayloadDto.prototype, "entityType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePartnerBusinessPayloadDto.prototype, "businessName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePartnerBusinessPayloadDto.prototype, "businessAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePartnerBusinessPayloadDto.prototype, "businessType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePartnerBusinessPayloadDto.prototype, "legalName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePartnerBusinessPayloadDto.prototype, "tradeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        nullable: false,
        description: 'Identificación fiscal (NIT, etc.) como string; evitar number.',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(64),
    __metadata("design:type", String)
], CreatePartnerBusinessPayloadDto.prototype, "taxId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: false }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreatePartnerBusinessPayloadDto.prototype, "yearOfEstablishment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: LegalRepresentativePayloadDto, nullable: false }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => LegalRepresentativePayloadDto),
    __metadata("design:type", LegalRepresentativePayloadDto)
], CreatePartnerBusinessPayloadDto.prototype, "legalRepresentative", void 0);
class CreatePartnerPartnerSectionPayloadDto {
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
}
exports.CreatePartnerPartnerSectionPayloadDto = CreatePartnerPartnerSectionPayloadDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreatePartnerPartnerSectionPayloadDto.prototype, "acronym", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        nullable: true,
        description: 'URL inicial si no se sube archivo `logo`. Si hay archivo, el archivo tiene prioridad.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreatePartnerPartnerSectionPayloadDto.prototype, "logoUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        nullable: true,
        description: 'URL inicial si no se sube `coBranding`. Si hay archivo, el archivo tiene prioridad.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreatePartnerPartnerSectionPayloadDto.prototype, "coBrandingLogoUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreatePartnerPartnerSectionPayloadDto.prototype, "primaryColor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreatePartnerPartnerSectionPayloadDto.prototype, "secondaryColor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreatePartnerPartnerSectionPayloadDto.prototype, "lightColor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", Object)
], CreatePartnerPartnerSectionPayloadDto.prototype, "notificationEmail", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreatePartnerPartnerSectionPayloadDto.prototype, "webhookUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Por defecto `false` si se omite.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreatePartnerPartnerSectionPayloadDto.prototype, "sendSalesRepVoucher", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", Object)
], CreatePartnerPartnerSectionPayloadDto.prototype, "disbursementNotificationEmail", void 0);
class CreatePartnerBankAccountPayloadDto {
    bankEntity;
    accountNumber;
}
exports.CreatePartnerBankAccountPayloadDto = CreatePartnerBankAccountPayloadDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePartnerBankAccountPayloadDto.prototype, "bankEntity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cuenta como string; no usar number para evitar precisión.',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(64),
    __metadata("design:type", String)
], CreatePartnerBankAccountPayloadDto.prototype, "accountNumber", void 0);
class CreatePartnerCreditFacilityPayloadDto {
    contractId;
    totalLimit;
}
exports.CreatePartnerCreditFacilityPayloadDto = CreatePartnerCreditFacilityPayloadDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((o) => o.contractId !== null &&
        o.contractId !== undefined &&
        String(o.contractId).trim() !== ''),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", Object)
], CreatePartnerCreditFacilityPayloadDto.prototype, "contractId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Límite total: entero JSON o string decimal no negativo, sin notación científica. ' +
            'Se serializa a string hacia dominio/integraciones; convención monetaria: unidad mínima (p. ej. centavos) acordada con producto.',
    }),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === null || value === undefined) {
            return value;
        }
        if (typeof value === 'number' && Number.isFinite(value)) {
            return String(value);
        }
        if (typeof value === 'string') {
            return value.trim();
        }
        return String(value);
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^(0|[1-9]\d*)(\.\d+)?$/, {
        message: 'totalLimit debe ser un número no negativo (número JSON o string decimal)',
    }),
    __metadata("design:type", String)
], CreatePartnerCreditFacilityPayloadDto.prototype, "totalLimit", void 0);
class PartnerCategoryPayloadDto {
    name;
    discountPercentage;
    interestRate;
    disbursementFeePercent;
    minimumDisbursementFee;
    delayDays;
    termDays;
}
exports.PartnerCategoryPayloadDto = PartnerCategoryPayloadDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PartnerCategoryPayloadDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({ allowNaN: false, allowInfinity: false }),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], PartnerCategoryPayloadDto.prototype, "discountPercentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({ allowNaN: false, allowInfinity: false }),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], PartnerCategoryPayloadDto.prototype, "interestRate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({ allowNaN: false, allowInfinity: false }),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], PartnerCategoryPayloadDto.prototype, "disbursementFeePercent", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({ allowNaN: false, allowInfinity: false }),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], PartnerCategoryPayloadDto.prototype, "minimumDisbursementFee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], PartnerCategoryPayloadDto.prototype, "delayDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], PartnerCategoryPayloadDto.prototype, "termDays", void 0);
class CreatePartnerPayloadDto {
    operatingUser;
    business;
    partner;
    bankAccount;
    creditFacility;
    category;
    countryCode;
}
exports.CreatePartnerPayloadDto = CreatePartnerPayloadDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: OperatingUserPayloadDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => OperatingUserPayloadDto),
    __metadata("design:type", OperatingUserPayloadDto)
], CreatePartnerPayloadDto.prototype, "operatingUser", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: CreatePartnerBusinessPayloadDto }),
    (0, class_validator_1.Validate)(BusinessCityReferenceV4Constraint),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CreatePartnerBusinessPayloadDto),
    __metadata("design:type", CreatePartnerBusinessPayloadDto)
], CreatePartnerPayloadDto.prototype, "business", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: CreatePartnerPartnerSectionPayloadDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CreatePartnerPartnerSectionPayloadDto),
    __metadata("design:type", CreatePartnerPartnerSectionPayloadDto)
], CreatePartnerPayloadDto.prototype, "partner", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: CreatePartnerBankAccountPayloadDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CreatePartnerBankAccountPayloadDto),
    __metadata("design:type", CreatePartnerBankAccountPayloadDto)
], CreatePartnerPayloadDto.prototype, "bankAccount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: CreatePartnerCreditFacilityPayloadDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CreatePartnerCreditFacilityPayloadDto),
    __metadata("design:type", CreatePartnerCreditFacilityPayloadDto)
], CreatePartnerPayloadDto.prototype, "creditFacility", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [PartnerCategoryPayloadDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PartnerCategoryPayloadDto),
    __metadata("design:type", Array)
], CreatePartnerPayloadDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Sobrescribe PARTNER_ONBOARDING_DEFAULT_COUNTRY_CODE (p. ej. ISO 3166-1 alpha-2).',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(8),
    __metadata("design:type", Object)
], CreatePartnerPayloadDto.prototype, "countryCode", void 0);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/partners/presentation/dto/update-partner-payload.dto.ts"
/*!***********************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/partners/presentation/dto/update-partner-payload.dto.ts ***!
  \***********************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.UpdatePartnerPayloadDto = exports.UpdateCreditFacilityPayloadDto = exports.UpdateBankAccountPayloadDto = exports.UpdatePartnerSectionPayloadDto = exports.UpdateBusinessPayloadDto = exports.UpdateLegalRepresentativePayloadDto = exports.UpdateOperatingUserPayloadDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
const create_partner_payload_dto_1 = __webpack_require__(/*! ./create-partner-payload.dto */ "./apps/suppliers-ms/src/modules/partners/presentation/dto/create-partner-payload.dto.ts");
class UpdateOperatingUserPayloadDto {
    firstName;
    lastName;
    docType;
    docNumber;
    phone;
    email;
}
exports.UpdateOperatingUserPayloadDto = UpdateOperatingUserPayloadDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateOperatingUserPayloadDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateOperatingUserPayloadDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateOperatingUserPayloadDto.prototype, "docType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateOperatingUserPayloadDto.prototype, "docNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        nullable: true,
        description: 'Teléfono como texto (mismo criterio que POST).',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(32),
    __metadata("design:type", Object)
], UpdateOperatingUserPayloadDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateOperatingUserPayloadDto.prototype, "email", void 0);
class UpdateLegalRepresentativePayloadDto {
    firstName;
    lastName;
    docType;
    docNumber;
    phone;
    email;
}
exports.UpdateLegalRepresentativePayloadDto = UpdateLegalRepresentativePayloadDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLegalRepresentativePayloadDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLegalRepresentativePayloadDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLegalRepresentativePayloadDto.prototype, "docType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLegalRepresentativePayloadDto.prototype, "docNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        nullable: true,
        description: 'Teléfono como texto.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(32),
    __metadata("design:type", Object)
], UpdateLegalRepresentativePayloadDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateLegalRepresentativePayloadDto.prototype, "email", void 0);
class UpdateBusinessPayloadDto {
    cityId;
    entityType;
    businessName;
    businessAddress;
    businessType;
    legalName;
    tradeName;
    taxId;
    yearOfEstablishment;
    legalRepresentative;
}
exports.UpdateBusinessPayloadDto = UpdateBusinessPayloadDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        nullable: true,
        description: 'UUID v4 ciudad (catálogo transversal). Parcial: solo si se actualiza ciudad.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", Object)
], UpdateBusinessPayloadDto.prototype, "cityId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBusinessPayloadDto.prototype, "entityType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], UpdateBusinessPayloadDto.prototype, "businessName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], UpdateBusinessPayloadDto.prototype, "businessAddress", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], UpdateBusinessPayloadDto.prototype, "businessType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], UpdateBusinessPayloadDto.prototype, "legalName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], UpdateBusinessPayloadDto.prototype, "tradeName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(64),
    __metadata("design:type", Object)
], UpdateBusinessPayloadDto.prototype, "taxId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Object)
], UpdateBusinessPayloadDto.prototype, "yearOfEstablishment", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: UpdateLegalRepresentativePayloadDto,
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => UpdateLegalRepresentativePayloadDto),
    __metadata("design:type", Object)
], UpdateBusinessPayloadDto.prototype, "legalRepresentative", void 0);
class UpdatePartnerSectionPayloadDto {
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
}
exports.UpdatePartnerSectionPayloadDto = UpdatePartnerSectionPayloadDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], UpdatePartnerSectionPayloadDto.prototype, "acronym", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        nullable: true,
        description: 'Si se envía archivo `logo`, el archivo tiene prioridad sobre esta URL.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], UpdatePartnerSectionPayloadDto.prototype, "logoUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        nullable: true,
        description: 'Si se envía archivo coBranding, el archivo tiene prioridad sobre esta URL.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], UpdatePartnerSectionPayloadDto.prototype, "coBrandingLogoUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], UpdatePartnerSectionPayloadDto.prototype, "primaryColor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], UpdatePartnerSectionPayloadDto.prototype, "secondaryColor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], UpdatePartnerSectionPayloadDto.prototype, "lightColor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", Object)
], UpdatePartnerSectionPayloadDto.prototype, "notificationEmail", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], UpdatePartnerSectionPayloadDto.prototype, "webhookUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdatePartnerSectionPayloadDto.prototype, "sendSalesRepVoucher", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", Object)
], UpdatePartnerSectionPayloadDto.prototype, "disbursementNotificationEmail", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: shared_1.PartnerState,
        description: 'Estado operativo del partner (`active` | `inactive`).',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)([shared_1.PartnerState.ACTIVE, shared_1.PartnerState.INACTIVE]),
    __metadata("design:type", typeof (_a = typeof shared_1.PartnerState !== "undefined" && shared_1.PartnerState) === "function" ? _a : Object)
], UpdatePartnerSectionPayloadDto.prototype, "state", void 0);
class UpdateBankAccountPayloadDto {
    bankEntity;
    accountNumber;
}
exports.UpdateBankAccountPayloadDto = UpdateBankAccountPayloadDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBankAccountPayloadDto.prototype, "bankEntity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Cuenta como string (mismo criterio que POST).',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(64),
    __metadata("design:type", String)
], UpdateBankAccountPayloadDto.prototype, "accountNumber", void 0);
class UpdateCreditFacilityPayloadDto {
    contractId;
    totalLimit;
}
exports.UpdateCreditFacilityPayloadDto = UpdateCreditFacilityPayloadDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((o) => o.contractId !== null &&
        o.contractId !== undefined &&
        String(o.contractId).trim() !== ''),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", Object)
], UpdateCreditFacilityPayloadDto.prototype, "contractId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Misma convención que POST (string no negativo tras normalización).',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === null || value === undefined) {
            return value;
        }
        if (typeof value === 'number' && Number.isFinite(value)) {
            return String(value);
        }
        if (typeof value === 'string') {
            return value.trim();
        }
        return String(value);
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(0|[1-9]\d*)(\.\d+)?$/, {
        message: 'totalLimit debe ser un número no negativo (número JSON o string decimal)',
    }),
    __metadata("design:type", String)
], UpdateCreditFacilityPayloadDto.prototype, "totalLimit", void 0);
class UpdatePartnerPayloadDto {
    operatingUser;
    business;
    partner;
    bankAccount;
    creditFacility;
    category;
}
exports.UpdatePartnerPayloadDto = UpdatePartnerPayloadDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: UpdateOperatingUserPayloadDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => UpdateOperatingUserPayloadDto),
    __metadata("design:type", UpdateOperatingUserPayloadDto)
], UpdatePartnerPayloadDto.prototype, "operatingUser", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: UpdateBusinessPayloadDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => UpdateBusinessPayloadDto),
    __metadata("design:type", UpdateBusinessPayloadDto)
], UpdatePartnerPayloadDto.prototype, "business", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: UpdatePartnerSectionPayloadDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => UpdatePartnerSectionPayloadDto),
    __metadata("design:type", UpdatePartnerSectionPayloadDto)
], UpdatePartnerPayloadDto.prototype, "partner", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: UpdateBankAccountPayloadDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => UpdateBankAccountPayloadDto),
    __metadata("design:type", UpdateBankAccountPayloadDto)
], UpdatePartnerPayloadDto.prototype, "bankAccount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: UpdateCreditFacilityPayloadDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => UpdateCreditFacilityPayloadDto),
    __metadata("design:type", UpdateCreditFacilityPayloadDto)
], UpdatePartnerPayloadDto.prototype, "creditFacility", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [create_partner_payload_dto_1.PartnerCategoryPayloadDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_partner_payload_dto_1.PartnerCategoryPayloadDto),
    __metadata("design:type", Array)
], UpdatePartnerPayloadDto.prototype, "category", void 0);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/partners/presentation/guards/update-partner-payload-supported.guard.ts"
/*!**************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/partners/presentation/guards/update-partner-payload-supported.guard.ts ***!
  \**************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.assert_update_partner_payload_supported = assert_update_partner_payload_supported;
exports.update_payload_has_partner_changes = update_payload_has_partner_changes;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
function object_has_defined_values(obj) {
    if (obj === null || obj === undefined) {
        return false;
    }
    return Object.values(obj).some((v) => v !== undefined);
}
function assert_update_partner_payload_supported(dto) {
    const unsupported = [];
    if (object_has_defined_values(dto.operatingUser)) {
        unsupported.push('operatingUser');
    }
    if (object_has_defined_values(dto.business)) {
        unsupported.push('business');
    }
    if (object_has_defined_values(dto.bankAccount)) {
        unsupported.push('bankAccount');
    }
    if (object_has_defined_values(dto.creditFacility)) {
        unsupported.push('creditFacility');
    }
    if (dto.category !== undefined && dto.category.length > 0) {
        unsupported.push('category');
    }
    if (unsupported.length > 0) {
        throw new common_1.HttpException(`Actualización no implementada para: ${unsupported.join(', ')}. Solo se persisten campos de la sección partner (camelCase) y URLs de logo/coBranding vía multipart.`, common_1.HttpStatus.NOT_IMPLEMENTED);
    }
}
function update_payload_has_partner_changes(dto) {
    return object_has_defined_values(dto.partner);
}


/***/ },

/***/ "./apps/suppliers-ms/src/modules/partners/presentation/mappers/create-partner-payload.mapper.ts"
/*!******************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/partners/presentation/mappers/create-partner-payload.mapper.ts ***!
  \******************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.map_create_partner_payload_to_command = map_create_partner_payload_to_command;
const UUID_V4_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function trim_or_null(s) {
    if (s === null || s === undefined) {
        return null;
    }
    const t = s.trim();
    return t.length > 0 ? t : null;
}
function pick_city_external_id_from_business(b) {
    const primary = trim_or_null(b.cityId ?? null);
    const legacy = trim_or_null(b.cityExternalId ?? null);
    if (primary !== null && UUID_V4_RE.test(primary)) {
        return primary;
    }
    if (legacy !== null && UUID_V4_RE.test(legacy)) {
        return legacy;
    }
    return null;
}
function phone_from_payload(v) {
    if (v === null || v === undefined) {
        return null;
    }
    if (typeof v === 'number' && Number.isFinite(v)) {
        return String(Math.trunc(v));
    }
    const t = String(v).trim();
    return t.length > 0 ? t : null;
}
function tax_id_from_payload(v) {
    return trim_or_null(v ?? null);
}
function map_create_partner_payload_to_command(dto, defaults) {
    const country_from_dto = trim_or_null(dto.countryCode ?? null);
    const country_code = country_from_dto !== null ? country_from_dto : defaults.country_code;
    const lr = dto.business.legalRepresentative;
    const legal_representative = lr === null || lr === undefined
        ? null
        : {
            first_name: lr.firstName,
            last_name: lr.lastName,
            doc_type: lr.docType,
            doc_number: lr.docNumber,
            phone: phone_from_payload(lr.phone ?? null),
            email: lr.email,
        };
    return {
        city_id: pick_city_external_id_from_business(dto.business),
        entity_type: dto.business.entityType,
        business_name: dto.business.businessName ?? null,
        business_address: dto.business.businessAddress ?? null,
        business_type: dto.business.businessType ?? null,
        relationship_to_business: null,
        legal_name: dto.business.legalName ?? null,
        trade_name: dto.business.tradeName ?? null,
        tax_id: tax_id_from_payload(dto.business.taxId),
        year_of_establishment: dto.business.yearOfEstablishment ?? null,
        bank_entity: dto.bankAccount.bankEntity,
        account_number: dto.bankAccount.accountNumber.trim(),
        acronym: dto.partner.acronym ?? null,
        primary_color: dto.partner.primaryColor ?? null,
        secondary_color: dto.partner.secondaryColor ?? null,
        light_color: dto.partner.lightColor ?? null,
        notification_email: dto.partner.notificationEmail ?? null,
        webhook_url: dto.partner.webhookUrl ?? null,
        send_sales_rep_voucher: dto.partner.sendSalesRepVoucher ?? false,
        disbursement_notification_email: dto.partner.disbursementNotificationEmail ?? null,
        contract_id: trim_or_null(dto.creditFacility.contractId ?? null),
        total_limit: dto.creditFacility.totalLimit.trim(),
        country_code,
        first_name: dto.operatingUser.firstName,
        last_name: dto.operatingUser.lastName,
        doc_type: dto.operatingUser.docType,
        doc_number: dto.operatingUser.docNumber,
        phone: phone_from_payload(dto.operatingUser.phone ?? null),
        email: dto.operatingUser.email,
        legal_representative,
        categories: dto.category.map((c) => ({
            name: c.name,
            discount_percentage: String(c.discountPercentage),
            interest_rate: String(c.interestRate),
            disbursement_fee_percent: c.disbursementFeePercent !== null && c.disbursementFeePercent !== undefined
                ? String(c.disbursementFeePercent)
                : null,
            minimum_disbursement_fee: c.minimumDisbursementFee !== null && c.minimumDisbursementFee !== undefined
                ? String(c.minimumDisbursementFee)
                : null,
            delay_days: c.delayDays,
            term_days: c.termDays,
        })),
    };
}


/***/ },

/***/ "./apps/suppliers-ms/src/modules/partners/presentation/mappers/update-partner-payload.mapper.ts"
/*!******************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/partners/presentation/mappers/update-partner-payload.mapper.ts ***!
  \******************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.map_update_partner_payload_to_request = map_update_partner_payload_to_request;
const update_partner_by_external_id_request_1 = __webpack_require__(/*! @modules/partners/application/use-cases/update-partner-by-external-id/update-partner-by-external-id.request */ "./apps/suppliers-ms/src/modules/partners/application/use-cases/update-partner-by-external-id/update-partner-by-external-id.request.ts");
function map_update_partner_payload_to_request(external_id, dto, urls) {
    const p = dto.partner;
    return new update_partner_by_external_id_request_1.UpdatePartnerByExternalIdRequest(external_id, p?.acronym, urls.logo_url, urls.co_branding_logo_url, p?.primaryColor, p?.secondaryColor, p?.lightColor, p?.notificationEmail, p?.webhookUrl, p?.sendSalesRepVoucher, p?.disbursementNotificationEmail, p?.state);
}


/***/ },

/***/ "./apps/suppliers-ms/src/modules/partners/presentation/partners.controller.ts"
/*!************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/partners/presentation/partners.controller.ts ***!
  \************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PartnersController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
const platform_express_1 = __webpack_require__(/*! @nestjs/platform-express */ "@nestjs/platform-express");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const create_partner_orchestrator_use_case_1 = __webpack_require__(/*! @modules/partners/application/use-cases/create-partner-orchestrator/create-partner-orchestrator.use-case */ "./apps/suppliers-ms/src/modules/partners/application/use-cases/create-partner-orchestrator/create-partner-orchestrator.use-case.ts");
const update_partner_by_external_id_use_case_1 = __webpack_require__(/*! @modules/partners/application/use-cases/update-partner-by-external-id/update-partner-by-external-id.use-case */ "./apps/suppliers-ms/src/modules/partners/application/use-cases/update-partner-by-external-id/update-partner-by-external-id.use-case.ts");
const partner_onboarding_files_port_1 = __webpack_require__(/*! @modules/partners/application/ports/partner-onboarding-files.port */ "./apps/suppliers-ms/src/modules/partners/application/ports/partner-onboarding-files.port.ts");
const partner_onboarding_saga_repository_port_1 = __webpack_require__(/*! @modules/partners/application/ports/partner-onboarding-saga.repository.port */ "./apps/suppliers-ms/src/modules/partners/application/ports/partner-onboarding-saga.repository.port.ts");
const create_partner_payload_dto_1 = __webpack_require__(/*! ./dto/create-partner-payload.dto */ "./apps/suppliers-ms/src/modules/partners/presentation/dto/create-partner-payload.dto.ts");
const update_partner_payload_dto_1 = __webpack_require__(/*! ./dto/update-partner-payload.dto */ "./apps/suppliers-ms/src/modules/partners/presentation/dto/update-partner-payload.dto.ts");
const create_partner_payload_mapper_1 = __webpack_require__(/*! ./mappers/create-partner-payload.mapper */ "./apps/suppliers-ms/src/modules/partners/presentation/mappers/create-partner-payload.mapper.ts");
const update_partner_payload_mapper_1 = __webpack_require__(/*! ./mappers/update-partner-payload.mapper */ "./apps/suppliers-ms/src/modules/partners/presentation/mappers/update-partner-payload.mapper.ts");
const update_partner_payload_supported_guard_1 = __webpack_require__(/*! ./guards/update-partner-payload-supported.guard */ "./apps/suppliers-ms/src/modules/partners/presentation/guards/update-partner-payload-supported.guard.ts");
let PartnersController = class PartnersController {
    create_partner_orchestrator;
    update_partner;
    config_service;
    partner_files;
    saga_repository;
    constructor(create_partner_orchestrator, update_partner, config_service, partner_files, saga_repository) {
        this.create_partner_orchestrator = create_partner_orchestrator;
        this.update_partner = update_partner;
        this.config_service = config_service;
        this.partner_files = partner_files;
        this.saga_repository = saga_repository;
    }
    async create(payload_raw, files) {
        let parsed;
        try {
            parsed = JSON.parse(payload_raw);
        }
        catch {
            throw new common_1.BadRequestException('payload debe ser JSON válido');
        }
        const dto = (0, class_transformer_1.plainToInstance)(create_partner_payload_dto_1.CreatePartnerPayloadDto, parsed, {
            enableImplicitConversion: true,
        });
        const errors = (0, class_validator_1.validateSync)(dto, { forbidUnknownValues: false });
        if (errors.length > 0) {
            const message = errors
                .map((e) => Object.values(e.constraints ?? {}).join(', '))
                .join('; ');
            throw new common_1.BadRequestException(message);
        }
        const app_config = this.config_service.get('config');
        const command = (0, create_partner_payload_mapper_1.map_create_partner_payload_to_command)(dto, {
            country_code: (app_config?.partner_onboarding?.default_country_code ?? 'CO').trim() || null,
        });
        const uploaded = this.to_uploaded_meta(files);
        const saga_id = await this.create_partner_orchestrator.start_async(command, {
            bank_certification: uploaded.bank_certification,
            logo: uploaded.logo,
            co_branding: uploaded.co_branding,
        });
        return {
            saga_id,
            status: 'RUNNING',
            message: `Saga iniciada. Consulta el estado en GET /partners/sagas/${saga_id}`,
        };
    }
    async get_saga_status(saga_id) {
        const saga = await this.saga_repository.find_by_external_id(saga_id);
        if (!saga) {
            throw new common_1.NotFoundException('saga not found');
        }
        return saga;
    }
    async update(id, payload_raw, files) {
        const file_correlation_id = (0, shared_1.new_uuid)();
        let patch = {};
        const raw = payload_raw?.trim() ?? '';
        if (raw.length > 0) {
            try {
                patch = JSON.parse(raw);
            }
            catch {
                throw new common_1.BadRequestException('payload debe ser JSON válido');
            }
        }
        const dto = (0, class_transformer_1.plainToInstance)(update_partner_payload_dto_1.UpdatePartnerPayloadDto, patch, {
            enableImplicitConversion: true,
        });
        const errors = (0, class_validator_1.validateSync)(dto, { forbidUnknownValues: false });
        if (errors.length > 0) {
            const message = errors
                .map((e) => Object.values(e.constraints ?? {}).join(', '))
                .join('; ');
            throw new common_1.BadRequestException(message);
        }
        (0, update_partner_payload_supported_guard_1.assert_update_partner_payload_supported)(dto);
        const uploaded = this.to_uploaded_meta(files);
        if (this.multipart_has_binary(uploaded.bank_certification)) {
            throw new common_1.HttpException('La actualización de certificación bancaria por PATCH no está implementada', common_1.HttpStatus.NOT_IMPLEMENTED);
        }
        const has_logo_file = this.multipart_has_binary(uploaded.logo);
        const has_cob_file = this.multipart_has_binary(uploaded.co_branding);
        const partner_dirty = (0, update_partner_payload_supported_guard_1.update_payload_has_partner_changes)(dto);
        if (!partner_dirty && !has_logo_file && !has_cob_file) {
            throw new common_1.BadRequestException('Sin cambios: indique campos en partner, logo o coBranding (JSON o archivo)');
        }
        let logo_merge = dto.partner?.logoUrl;
        let co_branding_merge = dto.partner?.coBrandingLogoUrl;
        if (has_logo_file || has_cob_file) {
            const urls = await this.partner_files.resolve_urls({
                correlation_id: file_correlation_id,
                idempotency_key: file_correlation_id,
                bank_certification: undefined,
                logo: uploaded.logo,
                co_branding: uploaded.co_branding,
            });
            if (has_logo_file) {
                logo_merge = urls.logo_url.length > 0 ? urls.logo_url : null;
            }
            if (has_cob_file) {
                co_branding_merge = urls.co_branding_url.length > 0 ? urls.co_branding_url : null;
            }
        }
        const urls_for_request = {
            logo_url: logo_merge,
            co_branding_logo_url: co_branding_merge,
        };
        const req = (0, update_partner_payload_mapper_1.map_update_partner_payload_to_request)(id, dto, urls_for_request);
        return this.update_partner.execute(req);
    }
    multipart_has_binary(f) {
        return (f !== undefined &&
            typeof f.content_base64 === 'string' &&
            f.content_base64.trim().length > 0);
    }
    to_uploaded_meta(files) {
        const first = (arr) => arr?.[0];
        const meta = (f) => f === undefined
            ? undefined
            : {
                originalname: f.originalname,
                mimetype: f.mimetype,
                size: f.size,
                content_base64: f.buffer !== undefined && f.buffer.length > 0
                    ? f.buffer.toString('base64')
                    : undefined,
            };
        return {
            bank_certification: meta(first(files.bankCertification)),
            logo: meta(first(files.logo)),
            co_branding: meta(first(files.coBranding)),
        };
    }
};
exports.PartnersController = PartnersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, swagger_1.ApiOperation)({
        summary: 'Alta orquestada de partner (saga async + SQS)',
        description: 'Inicia la saga en segundo plano. Retorna 202 con `saga_id`. ' +
            'Consultar `GET /partners/sagas/{sagaId}` para obtener el resultado y estado.',
    }),
    (0, swagger_1.ApiAcceptedResponse)({
        description: 'Saga iniciada. Consultar /partners/sagas/:sagaId para el estado.',
        schema: {
            type: 'object',
            properties: {
                saga_id: { type: 'string', format: 'uuid' },
                status: { type: 'string', example: 'RUNNING' },
                message: { type: 'string' },
            },
        },
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                payload: { type: 'string' },
                bankCertification: { type: 'string', format: 'binary' },
                logo: { type: 'string', format: 'binary' },
                coBranding: { type: 'string', format: 'binary' },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'bankCertification', maxCount: 1 },
        { name: 'logo', maxCount: 1 },
        { name: 'coBranding', maxCount: 1 },
    ])),
    __param(0, (0, common_1.Body)('payload')),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], PartnersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('sagas/:sagaId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Estado de una saga de onboarding de partner',
        description: 'Retorna el estado, paso actual y datos creados de la saga. ' +
            'Cuando status=COMPLETED, partner_external_id y credit_facility_external_id están disponibles.',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Estado de la saga',
    }),
    __param(0, (0, common_1.Param)('sagaId', new common_1.ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], PartnersController.prototype, "get_saga_status", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Actualizar partner (parcial)',
        description: 'Multipart opcional; `payload` es JSON **camelCase** **parcial**. ' +
            'Solo se persisten campos de `partner` y URLs finales de `logo` / `coBranding`. ' +
            '`bankCertification` en PATCH → 501.',
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                payload: { type: 'string' },
                bankCertification: { type: 'string', format: 'binary' },
                logo: { type: 'string', format: 'binary' },
                coBranding: { type: 'string', format: 'binary' },
            },
        },
    }),
    (0, swagger_1.ApiOkResponse)({ description: 'Entidad partner actualizada (campos públicos).' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'bankCertification', maxCount: 1 },
        { name: 'logo', maxCount: 1 },
        { name: 'coBranding', maxCount: 1 },
    ])),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(1, (0, common_1.Body)('payload')),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], PartnersController.prototype, "update", null);
exports.PartnersController = PartnersController = __decorate([
    (0, swagger_1.ApiTags)('partners'),
    (0, swagger_1.ApiExtraModels)(create_partner_payload_dto_1.CreatePartnerPayloadDto, update_partner_payload_dto_1.UpdatePartnerPayloadDto),
    (0, common_1.Controller)('partners'),
    __param(3, (0, common_1.Inject)(partner_onboarding_files_port_1.PARTNER_ONBOARDING_FILES_PORT)),
    __param(4, (0, common_1.Inject)(partner_onboarding_saga_repository_port_1.PARTNER_ONBOARDING_SAGA_REPOSITORY)),
    __metadata("design:paramtypes", [typeof (_a = typeof create_partner_orchestrator_use_case_1.CreatePartnerOrchestratorUseCase !== "undefined" && create_partner_orchestrator_use_case_1.CreatePartnerOrchestratorUseCase) === "function" ? _a : Object, typeof (_b = typeof update_partner_by_external_id_use_case_1.UpdatePartnerByExternalIdUseCase !== "undefined" && update_partner_by_external_id_use_case_1.UpdatePartnerByExternalIdUseCase) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object, Object, Object])
], PartnersController);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/sales-representatives/application/mapping/sales-representative-public-fields.builder.ts"
/*!*******************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/sales-representatives/application/mapping/sales-representative-public-fields.builder.ts ***!
  \*******************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.build_sales_representative_public_fields = build_sales_representative_public_fields;
async function build_sales_representative_public_fields(rep, lookup) {
    const partner_external_id = await lookup.get_partner_external_id_by_internal_id(rep.partner_id);
    if (partner_external_id === null) {
        return null;
    }
    const lu = rep.loaded_user;
    const user_external_id = lu !== undefined
        ? lu.external_id
        : rep.user_id === null
            ? null
            : await lookup.get_user_external_id_by_internal_id(rep.user_id);
    return {
        internal_id: rep.internal_id,
        external_id: rep.external_id,
        partner_external_id,
        user_external_id,
        user_display_name: lu?.display_name ?? null,
        user_role_name: lu?.role_name ?? null,
        user_state: lu?.state ?? null,
        created_at: rep.created_at,
        updated_at: rep.updated_at,
    };
}


/***/ },

/***/ "./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/create-sales-representative/create-sales-representative.request.ts"
/*!******************************************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/create-sales-representative/create-sales-representative.request.ts ***!
  \******************************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateSalesRepresentativeRequest = void 0;
class CreateSalesRepresentativeRequest {
    partner_external_id;
    user_external_id;
    constructor(partner_external_id, user_external_id) {
        this.partner_external_id = partner_external_id;
        this.user_external_id = user_external_id;
    }
}
exports.CreateSalesRepresentativeRequest = CreateSalesRepresentativeRequest;


/***/ },

/***/ "./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/create-sales-representative/create-sales-representative.response.ts"
/*!*******************************************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/create-sales-representative/create-sales-representative.response.ts ***!
  \*******************************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateSalesRepresentativeResponse = void 0;
class CreateSalesRepresentativeResponse {
    internal_id;
    external_id;
    partner_external_id;
    user_external_id;
    user_display_name;
    user_role_name;
    user_state;
    created_at;
    updated_at;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.CreateSalesRepresentativeResponse = CreateSalesRepresentativeResponse;


/***/ },

/***/ "./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/create-sales-representative/create-sales-representative.use-case.ts"
/*!*******************************************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/create-sales-representative/create-sales-representative.use-case.ts ***!
  \*******************************************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.CreateSalesRepresentativeUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const suppliers_reference_lookup_port_1 = __webpack_require__(/*! @common/ports/suppliers-reference-lookup.port */ "./apps/suppliers-ms/src/common/ports/suppliers-reference-lookup.port.ts");
const sales_representatives_tokens_1 = __webpack_require__(/*! @modules/sales-representatives/sales-representatives.tokens */ "./apps/suppliers-ms/src/modules/sales-representatives/sales-representatives.tokens.ts");
const sales_representative_repository_1 = __webpack_require__(/*! @modules/sales-representatives/domain/repositories/sales-representative.repository */ "./apps/suppliers-ms/src/modules/sales-representatives/domain/repositories/sales-representative.repository.ts");
const sales_representative_public_fields_builder_1 = __webpack_require__(/*! @modules/sales-representatives/application/mapping/sales-representative-public-fields.builder */ "./apps/suppliers-ms/src/modules/sales-representatives/application/mapping/sales-representative-public-fields.builder.ts");
const create_sales_representative_response_1 = __webpack_require__(/*! ./create-sales-representative.response */ "./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/create-sales-representative/create-sales-representative.response.ts");
let CreateSalesRepresentativeUseCase = class CreateSalesRepresentativeUseCase {
    sales_representative_repository;
    lookup;
    constructor(sales_representative_repository, lookup) {
        this.sales_representative_repository = sales_representative_repository;
        this.lookup = lookup;
    }
    async execute(req) {
        const partner_id = await this.lookup.get_partner_internal_id_by_external_id(req.partner_external_id);
        if (partner_id === null) {
            throw new common_1.BadRequestException('partner not found');
        }
        let user_id = null;
        if (req.user_external_id !== undefined && req.user_external_id !== null) {
            const trimmed = req.user_external_id.trim();
            if (trimmed.length === 0) {
                throw new common_1.BadRequestException('user_external_id invalid');
            }
            const resolved = await this.lookup.get_user_internal_id_by_external_id(trimmed);
            if (resolved === null) {
                throw new common_1.BadRequestException('user not found');
            }
            user_id = resolved;
        }
        const created = await this.sales_representative_repository.create({
            partner_id,
            user_id,
        });
        const reloaded = await this.sales_representative_repository.find_by_external_id(created.external_id);
        if (reloaded === null) {
            throw new common_1.InternalServerErrorException();
        }
        const fields = await (0, sales_representative_public_fields_builder_1.build_sales_representative_public_fields)(reloaded, this.lookup);
        if (fields === null) {
            throw new common_1.InternalServerErrorException();
        }
        return new create_sales_representative_response_1.CreateSalesRepresentativeResponse(fields);
    }
};
exports.CreateSalesRepresentativeUseCase = CreateSalesRepresentativeUseCase;
exports.CreateSalesRepresentativeUseCase = CreateSalesRepresentativeUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(sales_representatives_tokens_1.SALES_REPRESENTATIVE_REPOSITORY)),
    __param(1, (0, common_1.Inject)(suppliers_reference_lookup_port_1.SUPPLIERS_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [typeof (_a = typeof sales_representative_repository_1.SalesRepresentativeRepository !== "undefined" && sales_representative_repository_1.SalesRepresentativeRepository) === "function" ? _a : Object, Object])
], CreateSalesRepresentativeUseCase);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/delete-sales-representative-by-external-id/delete-sales-representative-by-external-id.request.ts"
/*!************************************************************************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/delete-sales-representative-by-external-id/delete-sales-representative-by-external-id.request.ts ***!
  \************************************************************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeleteSalesRepresentativeByExternalIdRequest = void 0;
class DeleteSalesRepresentativeByExternalIdRequest {
    external_id;
    constructor(external_id) {
        this.external_id = external_id;
    }
}
exports.DeleteSalesRepresentativeByExternalIdRequest = DeleteSalesRepresentativeByExternalIdRequest;


/***/ },

/***/ "./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/delete-sales-representative-by-external-id/delete-sales-representative-by-external-id.use-case.ts"
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/delete-sales-representative-by-external-id/delete-sales-representative-by-external-id.use-case.ts ***!
  \*************************************************************************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.DeleteSalesRepresentativeByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sales_representatives_tokens_1 = __webpack_require__(/*! @modules/sales-representatives/sales-representatives.tokens */ "./apps/suppliers-ms/src/modules/sales-representatives/sales-representatives.tokens.ts");
const sales_representative_repository_1 = __webpack_require__(/*! @modules/sales-representatives/domain/repositories/sales-representative.repository */ "./apps/suppliers-ms/src/modules/sales-representatives/domain/repositories/sales-representative.repository.ts");
let DeleteSalesRepresentativeByExternalIdUseCase = class DeleteSalesRepresentativeByExternalIdUseCase {
    sales_representative_repository;
    constructor(sales_representative_repository) {
        this.sales_representative_repository = sales_representative_repository;
    }
    async execute(req) {
        const ok = await this.sales_representative_repository.delete_by_external_id(req.external_id);
        if (!ok) {
            throw new common_1.NotFoundException('sales representative not found');
        }
    }
};
exports.DeleteSalesRepresentativeByExternalIdUseCase = DeleteSalesRepresentativeByExternalIdUseCase;
exports.DeleteSalesRepresentativeByExternalIdUseCase = DeleteSalesRepresentativeByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(sales_representatives_tokens_1.SALES_REPRESENTATIVE_REPOSITORY)),
    __metadata("design:paramtypes", [typeof (_a = typeof sales_representative_repository_1.SalesRepresentativeRepository !== "undefined" && sales_representative_repository_1.SalesRepresentativeRepository) === "function" ? _a : Object])
], DeleteSalesRepresentativeByExternalIdUseCase);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/get-sales-representative-by-external-id/get-sales-representative-by-external-id.request.ts"
/*!******************************************************************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/get-sales-representative-by-external-id/get-sales-representative-by-external-id.request.ts ***!
  \******************************************************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetSalesRepresentativeByExternalIdRequest = void 0;
class GetSalesRepresentativeByExternalIdRequest {
    external_id;
    constructor(external_id) {
        this.external_id = external_id;
    }
}
exports.GetSalesRepresentativeByExternalIdRequest = GetSalesRepresentativeByExternalIdRequest;


/***/ },

/***/ "./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/get-sales-representative-by-external-id/get-sales-representative-by-external-id.response.ts"
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/get-sales-representative-by-external-id/get-sales-representative-by-external-id.response.ts ***!
  \*******************************************************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetSalesRepresentativeByExternalIdResponse = void 0;
class GetSalesRepresentativeByExternalIdResponse {
    internal_id;
    external_id;
    partner_external_id;
    user_external_id;
    user_display_name;
    user_role_name;
    user_state;
    created_at;
    updated_at;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.GetSalesRepresentativeByExternalIdResponse = GetSalesRepresentativeByExternalIdResponse;


/***/ },

/***/ "./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/get-sales-representative-by-external-id/get-sales-representative-by-external-id.use-case.ts"
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/get-sales-representative-by-external-id/get-sales-representative-by-external-id.use-case.ts ***!
  \*******************************************************************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.GetSalesRepresentativeByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const suppliers_reference_lookup_port_1 = __webpack_require__(/*! @common/ports/suppliers-reference-lookup.port */ "./apps/suppliers-ms/src/common/ports/suppliers-reference-lookup.port.ts");
const sales_representatives_tokens_1 = __webpack_require__(/*! @modules/sales-representatives/sales-representatives.tokens */ "./apps/suppliers-ms/src/modules/sales-representatives/sales-representatives.tokens.ts");
const sales_representative_repository_1 = __webpack_require__(/*! @modules/sales-representatives/domain/repositories/sales-representative.repository */ "./apps/suppliers-ms/src/modules/sales-representatives/domain/repositories/sales-representative.repository.ts");
const sales_representative_public_fields_builder_1 = __webpack_require__(/*! @modules/sales-representatives/application/mapping/sales-representative-public-fields.builder */ "./apps/suppliers-ms/src/modules/sales-representatives/application/mapping/sales-representative-public-fields.builder.ts");
const get_sales_representative_by_external_id_response_1 = __webpack_require__(/*! ./get-sales-representative-by-external-id.response */ "./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/get-sales-representative-by-external-id/get-sales-representative-by-external-id.response.ts");
let GetSalesRepresentativeByExternalIdUseCase = class GetSalesRepresentativeByExternalIdUseCase {
    sales_representative_repository;
    lookup;
    constructor(sales_representative_repository, lookup) {
        this.sales_representative_repository = sales_representative_repository;
        this.lookup = lookup;
    }
    async execute(req) {
        const row = await this.sales_representative_repository.find_by_external_id(req.external_id);
        if (row === null) {
            throw new common_1.NotFoundException('sales representative not found');
        }
        const fields = await (0, sales_representative_public_fields_builder_1.build_sales_representative_public_fields)(row, this.lookup);
        if (fields === null) {
            throw new common_1.InternalServerErrorException();
        }
        return new get_sales_representative_by_external_id_response_1.GetSalesRepresentativeByExternalIdResponse(fields);
    }
};
exports.GetSalesRepresentativeByExternalIdUseCase = GetSalesRepresentativeByExternalIdUseCase;
exports.GetSalesRepresentativeByExternalIdUseCase = GetSalesRepresentativeByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(sales_representatives_tokens_1.SALES_REPRESENTATIVE_REPOSITORY)),
    __param(1, (0, common_1.Inject)(suppliers_reference_lookup_port_1.SUPPLIERS_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [typeof (_a = typeof sales_representative_repository_1.SalesRepresentativeRepository !== "undefined" && sales_representative_repository_1.SalesRepresentativeRepository) === "function" ? _a : Object, Object])
], GetSalesRepresentativeByExternalIdUseCase);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/list-sales-representatives/list-sales-representatives.request.ts"
/*!****************************************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/list-sales-representatives/list-sales-representatives.request.ts ***!
  \****************************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListSalesRepresentativesRequest = void 0;
class ListSalesRepresentativesRequest {
    partner_external_id;
    constructor(partner_external_id) {
        this.partner_external_id = partner_external_id;
    }
}
exports.ListSalesRepresentativesRequest = ListSalesRepresentativesRequest;


/***/ },

/***/ "./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/list-sales-representatives/list-sales-representatives.use-case.ts"
/*!*****************************************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/list-sales-representatives/list-sales-representatives.use-case.ts ***!
  \*****************************************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.ListSalesRepresentativesUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const suppliers_reference_lookup_port_1 = __webpack_require__(/*! @common/ports/suppliers-reference-lookup.port */ "./apps/suppliers-ms/src/common/ports/suppliers-reference-lookup.port.ts");
const sales_representatives_tokens_1 = __webpack_require__(/*! @modules/sales-representatives/sales-representatives.tokens */ "./apps/suppliers-ms/src/modules/sales-representatives/sales-representatives.tokens.ts");
const sales_representative_repository_1 = __webpack_require__(/*! @modules/sales-representatives/domain/repositories/sales-representative.repository */ "./apps/suppliers-ms/src/modules/sales-representatives/domain/repositories/sales-representative.repository.ts");
const sales_representative_public_fields_builder_1 = __webpack_require__(/*! @modules/sales-representatives/application/mapping/sales-representative-public-fields.builder */ "./apps/suppliers-ms/src/modules/sales-representatives/application/mapping/sales-representative-public-fields.builder.ts");
let ListSalesRepresentativesUseCase = class ListSalesRepresentativesUseCase {
    sales_representative_repository;
    lookup;
    constructor(sales_representative_repository, lookup) {
        this.sales_representative_repository = sales_representative_repository;
        this.lookup = lookup;
    }
    async execute(req) {
        let partner_id_filter;
        if (req.partner_external_id !== undefined) {
            const trimmed = req.partner_external_id.trim();
            if (trimmed.length === 0) {
                throw new common_1.BadRequestException('partner_external_id invalid');
            }
            const resolved = await this.lookup.get_partner_internal_id_by_external_id(trimmed);
            if (resolved === null) {
                throw new common_1.BadRequestException('partner not found');
            }
            partner_id_filter = resolved;
        }
        const rows = await this.sales_representative_repository.find_all(partner_id_filter);
        const out = [];
        for (const row of rows) {
            const fields = await (0, sales_representative_public_fields_builder_1.build_sales_representative_public_fields)(row, this.lookup);
            if (fields === null) {
                throw new common_1.InternalServerErrorException();
            }
            out.push(fields);
        }
        return out;
    }
};
exports.ListSalesRepresentativesUseCase = ListSalesRepresentativesUseCase;
exports.ListSalesRepresentativesUseCase = ListSalesRepresentativesUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(sales_representatives_tokens_1.SALES_REPRESENTATIVE_REPOSITORY)),
    __param(1, (0, common_1.Inject)(suppliers_reference_lookup_port_1.SUPPLIERS_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [typeof (_a = typeof sales_representative_repository_1.SalesRepresentativeRepository !== "undefined" && sales_representative_repository_1.SalesRepresentativeRepository) === "function" ? _a : Object, Object])
], ListSalesRepresentativesUseCase);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/update-sales-representative-by-external-id/update-sales-representative-by-external-id.request.ts"
/*!************************************************************************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/update-sales-representative-by-external-id/update-sales-representative-by-external-id.request.ts ***!
  \************************************************************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateSalesRepresentativeUserByExternalIdRequest = void 0;
class UpdateSalesRepresentativeUserByExternalIdRequest {
    external_id;
    user_external_id;
    constructor(external_id, user_external_id) {
        this.external_id = external_id;
        this.user_external_id = user_external_id;
    }
}
exports.UpdateSalesRepresentativeUserByExternalIdRequest = UpdateSalesRepresentativeUserByExternalIdRequest;


/***/ },

/***/ "./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/update-sales-representative-by-external-id/update-sales-representative-by-external-id.response.ts"
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/update-sales-representative-by-external-id/update-sales-representative-by-external-id.response.ts ***!
  \*************************************************************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateSalesRepresentativeByExternalIdResponse = void 0;
class UpdateSalesRepresentativeByExternalIdResponse {
    internal_id;
    external_id;
    partner_external_id;
    user_external_id;
    user_display_name;
    user_role_name;
    user_state;
    created_at;
    updated_at;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.UpdateSalesRepresentativeByExternalIdResponse = UpdateSalesRepresentativeByExternalIdResponse;


/***/ },

/***/ "./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/update-sales-representative-by-external-id/update-sales-representative-by-external-id.use-case.ts"
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/update-sales-representative-by-external-id/update-sales-representative-by-external-id.use-case.ts ***!
  \*************************************************************************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.UpdateSalesRepresentativeByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const suppliers_reference_lookup_port_1 = __webpack_require__(/*! @common/ports/suppliers-reference-lookup.port */ "./apps/suppliers-ms/src/common/ports/suppliers-reference-lookup.port.ts");
const sales_representatives_tokens_1 = __webpack_require__(/*! @modules/sales-representatives/sales-representatives.tokens */ "./apps/suppliers-ms/src/modules/sales-representatives/sales-representatives.tokens.ts");
const sales_representative_repository_1 = __webpack_require__(/*! @modules/sales-representatives/domain/repositories/sales-representative.repository */ "./apps/suppliers-ms/src/modules/sales-representatives/domain/repositories/sales-representative.repository.ts");
const sales_representative_public_fields_builder_1 = __webpack_require__(/*! @modules/sales-representatives/application/mapping/sales-representative-public-fields.builder */ "./apps/suppliers-ms/src/modules/sales-representatives/application/mapping/sales-representative-public-fields.builder.ts");
const update_sales_representative_by_external_id_response_1 = __webpack_require__(/*! ./update-sales-representative-by-external-id.response */ "./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/update-sales-representative-by-external-id/update-sales-representative-by-external-id.response.ts");
let UpdateSalesRepresentativeByExternalIdUseCase = class UpdateSalesRepresentativeByExternalIdUseCase {
    sales_representative_repository;
    lookup;
    constructor(sales_representative_repository, lookup) {
        this.sales_representative_repository = sales_representative_repository;
        this.lookup = lookup;
    }
    async execute(req) {
        if (req.user_external_id === undefined) {
            throw new common_1.BadRequestException('user_external_id required for patch');
        }
        let user_internal_id;
        if (req.user_external_id === null) {
            user_internal_id = null;
        }
        else {
            const trimmed = req.user_external_id.trim();
            if (trimmed.length === 0) {
                throw new common_1.BadRequestException('user_external_id invalid');
            }
            const resolved = await this.lookup.get_user_internal_id_by_external_id(trimmed);
            if (resolved === null) {
                throw new common_1.BadRequestException('user not found');
            }
            user_internal_id = resolved;
        }
        const updated = await this.sales_representative_repository.update_user_by_external_id(req.external_id, user_internal_id);
        if (updated === null) {
            throw new common_1.NotFoundException('sales representative not found');
        }
        const fields = await (0, sales_representative_public_fields_builder_1.build_sales_representative_public_fields)(updated, this.lookup);
        if (fields === null) {
            throw new common_1.InternalServerErrorException();
        }
        return new update_sales_representative_by_external_id_response_1.UpdateSalesRepresentativeByExternalIdResponse(fields);
    }
};
exports.UpdateSalesRepresentativeByExternalIdUseCase = UpdateSalesRepresentativeByExternalIdUseCase;
exports.UpdateSalesRepresentativeByExternalIdUseCase = UpdateSalesRepresentativeByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(sales_representatives_tokens_1.SALES_REPRESENTATIVE_REPOSITORY)),
    __param(1, (0, common_1.Inject)(suppliers_reference_lookup_port_1.SUPPLIERS_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [typeof (_a = typeof sales_representative_repository_1.SalesRepresentativeRepository !== "undefined" && sales_representative_repository_1.SalesRepresentativeRepository) === "function" ? _a : Object, Object])
], UpdateSalesRepresentativeByExternalIdUseCase);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/sales-representatives/domain/entities/sales-representative.entity.ts"
/*!************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/sales-representatives/domain/entities/sales-representative.entity.ts ***!
  \************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SalesRepresentative = void 0;
class SalesRepresentative {
    internal_id;
    external_id;
    partner_id;
    user_id;
    created_at;
    updated_at;
    loaded_user;
    constructor(internal_id, external_id, partner_id, user_id, created_at, updated_at, loaded_user) {
        this.internal_id = internal_id;
        this.external_id = external_id;
        this.partner_id = partner_id;
        this.user_id = user_id;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.loaded_user = loaded_user;
    }
}
exports.SalesRepresentative = SalesRepresentative;


/***/ },

/***/ "./apps/suppliers-ms/src/modules/sales-representatives/domain/repositories/sales-representative.repository.ts"
/*!********************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/sales-representatives/domain/repositories/sales-representative.repository.ts ***!
  \********************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ "./apps/suppliers-ms/src/modules/sales-representatives/presentation/dto/create-sales-representative-body.dto.ts"
/*!**********************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/sales-representatives/presentation/dto/create-sales-representative-body.dto.ts ***!
  \**********************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.CreateSalesRepresentativeBodyDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateSalesRepresentativeBodyDto {
    partner_external_id;
    user_external_id;
}
exports.CreateSalesRepresentativeBodyDto = CreateSalesRepresentativeBodyDto;
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", String)
], CreateSalesRepresentativeBodyDto.prototype, "partner_external_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ format: 'uuid' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", String)
], CreateSalesRepresentativeBodyDto.prototype, "user_external_id", void 0);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/sales-representatives/presentation/dto/list-sales-representatives-query.dto.ts"
/*!**********************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/sales-representatives/presentation/dto/list-sales-representatives-query.dto.ts ***!
  \**********************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.ListSalesRepresentativesQueryDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class ListSalesRepresentativesQueryDto {
    partner_external_id;
}
exports.ListSalesRepresentativesQueryDto = ListSalesRepresentativesQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ format: 'uuid' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", String)
], ListSalesRepresentativesQueryDto.prototype, "partner_external_id", void 0);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/sales-representatives/presentation/dto/patch-sales-representative-body.dto.ts"
/*!*********************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/sales-representatives/presentation/dto/patch-sales-representative-body.dto.ts ***!
  \*********************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PatchSalesRepresentativeBodyDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class PatchSalesRepresentativeBodyDto {
    user_external_id;
}
exports.PatchSalesRepresentativeBodyDto = PatchSalesRepresentativeBodyDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        format: 'uuid',
        nullable: true,
        description: 'UUID del usuario a vincular, o null para desvincular',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", Object)
], PatchSalesRepresentativeBodyDto.prototype, "user_external_id", void 0);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/sales-representatives/presentation/dto/sales-representative-response.dto.ts"
/*!*******************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/sales-representatives/presentation/dto/sales-representative-response.dto.ts ***!
  \*******************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.SalesRepresentativeResponseDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
class SalesRepresentativeResponseDto {
    internal_id;
    external_id;
    partner_external_id;
    user_external_id;
    user_display_name;
    user_role_name;
    user_state;
    created_at;
    updated_at;
}
exports.SalesRepresentativeResponseDto = SalesRepresentativeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SalesRepresentativeResponseDto.prototype, "internal_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], SalesRepresentativeResponseDto.prototype, "external_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], SalesRepresentativeResponseDto.prototype, "partner_external_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], SalesRepresentativeResponseDto.prototype, "user_external_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, description: 'Nombre para mostrar (persona o email)' }),
    __metadata("design:type", Object)
], SalesRepresentativeResponseDto.prototype, "user_display_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], SalesRepresentativeResponseDto.prototype, "user_role_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: shared_1.UserState, nullable: true }),
    __metadata("design:type", Object)
], SalesRepresentativeResponseDto.prototype, "user_state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], SalesRepresentativeResponseDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], SalesRepresentativeResponseDto.prototype, "updated_at", void 0);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/sales-representatives/presentation/sales-representatives.controller.ts"
/*!**************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/sales-representatives/presentation/sales-representatives.controller.ts ***!
  \**************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SalesRepresentativesController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const create_sales_representative_use_case_1 = __webpack_require__(/*! @modules/sales-representatives/application/use-cases/create-sales-representative/create-sales-representative.use-case */ "./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/create-sales-representative/create-sales-representative.use-case.ts");
const create_sales_representative_request_1 = __webpack_require__(/*! @modules/sales-representatives/application/use-cases/create-sales-representative/create-sales-representative.request */ "./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/create-sales-representative/create-sales-representative.request.ts");
const get_sales_representative_by_external_id_use_case_1 = __webpack_require__(/*! @modules/sales-representatives/application/use-cases/get-sales-representative-by-external-id/get-sales-representative-by-external-id.use-case */ "./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/get-sales-representative-by-external-id/get-sales-representative-by-external-id.use-case.ts");
const get_sales_representative_by_external_id_request_1 = __webpack_require__(/*! @modules/sales-representatives/application/use-cases/get-sales-representative-by-external-id/get-sales-representative-by-external-id.request */ "./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/get-sales-representative-by-external-id/get-sales-representative-by-external-id.request.ts");
const list_sales_representatives_use_case_1 = __webpack_require__(/*! @modules/sales-representatives/application/use-cases/list-sales-representatives/list-sales-representatives.use-case */ "./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/list-sales-representatives/list-sales-representatives.use-case.ts");
const list_sales_representatives_request_1 = __webpack_require__(/*! @modules/sales-representatives/application/use-cases/list-sales-representatives/list-sales-representatives.request */ "./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/list-sales-representatives/list-sales-representatives.request.ts");
const update_sales_representative_by_external_id_use_case_1 = __webpack_require__(/*! @modules/sales-representatives/application/use-cases/update-sales-representative-by-external-id/update-sales-representative-by-external-id.use-case */ "./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/update-sales-representative-by-external-id/update-sales-representative-by-external-id.use-case.ts");
const update_sales_representative_by_external_id_request_1 = __webpack_require__(/*! @modules/sales-representatives/application/use-cases/update-sales-representative-by-external-id/update-sales-representative-by-external-id.request */ "./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/update-sales-representative-by-external-id/update-sales-representative-by-external-id.request.ts");
const delete_sales_representative_by_external_id_use_case_1 = __webpack_require__(/*! @modules/sales-representatives/application/use-cases/delete-sales-representative-by-external-id/delete-sales-representative-by-external-id.use-case */ "./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/delete-sales-representative-by-external-id/delete-sales-representative-by-external-id.use-case.ts");
const delete_sales_representative_by_external_id_request_1 = __webpack_require__(/*! @modules/sales-representatives/application/use-cases/delete-sales-representative-by-external-id/delete-sales-representative-by-external-id.request */ "./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/delete-sales-representative-by-external-id/delete-sales-representative-by-external-id.request.ts");
const create_sales_representative_body_dto_1 = __webpack_require__(/*! ./dto/create-sales-representative-body.dto */ "./apps/suppliers-ms/src/modules/sales-representatives/presentation/dto/create-sales-representative-body.dto.ts");
const patch_sales_representative_body_dto_1 = __webpack_require__(/*! ./dto/patch-sales-representative-body.dto */ "./apps/suppliers-ms/src/modules/sales-representatives/presentation/dto/patch-sales-representative-body.dto.ts");
const list_sales_representatives_query_dto_1 = __webpack_require__(/*! ./dto/list-sales-representatives-query.dto */ "./apps/suppliers-ms/src/modules/sales-representatives/presentation/dto/list-sales-representatives-query.dto.ts");
const sales_representative_response_dto_1 = __webpack_require__(/*! ./dto/sales-representative-response.dto */ "./apps/suppliers-ms/src/modules/sales-representatives/presentation/dto/sales-representative-response.dto.ts");
let SalesRepresentativesController = class SalesRepresentativesController {
    create_sales_representative;
    get_by_external_id;
    list_sales_representatives;
    update_by_external_id;
    delete_by_external_id;
    constructor(create_sales_representative, get_by_external_id, list_sales_representatives, update_by_external_id, delete_by_external_id) {
        this.create_sales_representative = create_sales_representative;
        this.get_by_external_id = get_by_external_id;
        this.list_sales_representatives = list_sales_representatives;
        this.update_by_external_id = update_by_external_id;
        this.delete_by_external_id = delete_by_external_id;
    }
    async list(query) {
        return this.list_sales_representatives.execute(new list_sales_representatives_request_1.ListSalesRepresentativesRequest(query.partner_external_id));
    }
    async create(body) {
        return this.create_sales_representative.execute(new create_sales_representative_request_1.CreateSalesRepresentativeRequest(body.partner_external_id, body.user_external_id));
    }
    async get_one(external_id) {
        return this.get_by_external_id.execute(new get_sales_representative_by_external_id_request_1.GetSalesRepresentativeByExternalIdRequest(external_id));
    }
    async patch(external_id, body) {
        return this.update_by_external_id.execute(new update_sales_representative_by_external_id_request_1.UpdateSalesRepresentativeUserByExternalIdRequest(external_id, body.user_external_id));
    }
    async remove(external_id) {
        await this.delete_by_external_id.execute(new delete_sales_representative_by_external_id_request_1.DeleteSalesRepresentativeByExternalIdRequest(external_id));
    }
};
exports.SalesRepresentativesController = SalesRepresentativesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar representantes de ventas',
        description: 'Lista todos los representantes, o filtra por `partner_external_id` si se envía en query.',
    }),
    (0, swagger_1.ApiOkResponse)({ type: [sales_representative_response_dto_1.SalesRepresentativeResponseDto] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof list_sales_representatives_query_dto_1.ListSalesRepresentativesQueryDto !== "undefined" && list_sales_representatives_query_dto_1.ListSalesRepresentativesQueryDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], SalesRepresentativesController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Crear representante de ventas' }),
    (0, swagger_1.ApiCreatedResponse)({ type: sales_representative_response_dto_1.SalesRepresentativeResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof create_sales_representative_body_dto_1.CreateSalesRepresentativeBodyDto !== "undefined" && create_sales_representative_body_dto_1.CreateSalesRepresentativeBodyDto) === "function" ? _h : Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], SalesRepresentativesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':external_id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener representante por external_id' }),
    (0, swagger_1.ApiOkResponse)({ type: sales_representative_response_dto_1.SalesRepresentativeResponseDto }),
    __param(0, (0, common_1.Param)('external_id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], SalesRepresentativesController.prototype, "get_one", null);
__decorate([
    (0, common_1.Patch)(':external_id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Actualizar vínculo de usuario del representante',
        description: 'Envíe `user_external_id` (UUID) o `null` para desvincular. El campo debe incluirse en el cuerpo.',
    }),
    (0, swagger_1.ApiOkResponse)({ type: sales_representative_response_dto_1.SalesRepresentativeResponseDto }),
    __param(0, (0, common_1.Param)('external_id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_l = typeof patch_sales_representative_body_dto_1.PatchSalesRepresentativeBodyDto !== "undefined" && patch_sales_representative_body_dto_1.PatchSalesRepresentativeBodyDto) === "function" ? _l : Object]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], SalesRepresentativesController.prototype, "patch", null);
__decorate([
    (0, common_1.Delete)(':external_id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar representante por external_id' }),
    (0, swagger_1.ApiNoContentResponse)(),
    __param(0, (0, common_1.Param)('external_id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
], SalesRepresentativesController.prototype, "remove", null);
exports.SalesRepresentativesController = SalesRepresentativesController = __decorate([
    (0, swagger_1.ApiTags)('sales-representatives'),
    (0, swagger_1.ApiExtraModels)(create_sales_representative_body_dto_1.CreateSalesRepresentativeBodyDto, patch_sales_representative_body_dto_1.PatchSalesRepresentativeBodyDto, sales_representative_response_dto_1.SalesRepresentativeResponseDto),
    (0, common_1.Controller)('sales-representatives'),
    __metadata("design:paramtypes", [typeof (_a = typeof create_sales_representative_use_case_1.CreateSalesRepresentativeUseCase !== "undefined" && create_sales_representative_use_case_1.CreateSalesRepresentativeUseCase) === "function" ? _a : Object, typeof (_b = typeof get_sales_representative_by_external_id_use_case_1.GetSalesRepresentativeByExternalIdUseCase !== "undefined" && get_sales_representative_by_external_id_use_case_1.GetSalesRepresentativeByExternalIdUseCase) === "function" ? _b : Object, typeof (_c = typeof list_sales_representatives_use_case_1.ListSalesRepresentativesUseCase !== "undefined" && list_sales_representatives_use_case_1.ListSalesRepresentativesUseCase) === "function" ? _c : Object, typeof (_d = typeof update_sales_representative_by_external_id_use_case_1.UpdateSalesRepresentativeByExternalIdUseCase !== "undefined" && update_sales_representative_by_external_id_use_case_1.UpdateSalesRepresentativeByExternalIdUseCase) === "function" ? _d : Object, typeof (_e = typeof delete_sales_representative_by_external_id_use_case_1.DeleteSalesRepresentativeByExternalIdUseCase !== "undefined" && delete_sales_representative_by_external_id_use_case_1.DeleteSalesRepresentativeByExternalIdUseCase) === "function" ? _e : Object])
], SalesRepresentativesController);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/sales-representatives/sales-representatives.module.ts"
/*!*********************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/sales-representatives/sales-representatives.module.ts ***!
  \*********************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SalesRepresentativesModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const infrastructure_module_1 = __webpack_require__(/*! @infrastructure/infrastructure.module */ "./apps/suppliers-ms/src/infrastructure/infrastructure.module.ts");
const typeorm_sales_representative_repository_1 = __webpack_require__(/*! @infrastructure/database/repositories/typeorm-sales-representative.repository */ "./apps/suppliers-ms/src/infrastructure/database/repositories/typeorm-sales-representative.repository.ts");
const sales_representatives_tokens_1 = __webpack_require__(/*! ./sales-representatives.tokens */ "./apps/suppliers-ms/src/modules/sales-representatives/sales-representatives.tokens.ts");
const create_sales_representative_use_case_1 = __webpack_require__(/*! ./application/use-cases/create-sales-representative/create-sales-representative.use-case */ "./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/create-sales-representative/create-sales-representative.use-case.ts");
const get_sales_representative_by_external_id_use_case_1 = __webpack_require__(/*! ./application/use-cases/get-sales-representative-by-external-id/get-sales-representative-by-external-id.use-case */ "./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/get-sales-representative-by-external-id/get-sales-representative-by-external-id.use-case.ts");
const list_sales_representatives_use_case_1 = __webpack_require__(/*! ./application/use-cases/list-sales-representatives/list-sales-representatives.use-case */ "./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/list-sales-representatives/list-sales-representatives.use-case.ts");
const update_sales_representative_by_external_id_use_case_1 = __webpack_require__(/*! ./application/use-cases/update-sales-representative-by-external-id/update-sales-representative-by-external-id.use-case */ "./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/update-sales-representative-by-external-id/update-sales-representative-by-external-id.use-case.ts");
const delete_sales_representative_by_external_id_use_case_1 = __webpack_require__(/*! ./application/use-cases/delete-sales-representative-by-external-id/delete-sales-representative-by-external-id.use-case */ "./apps/suppliers-ms/src/modules/sales-representatives/application/use-cases/delete-sales-representative-by-external-id/delete-sales-representative-by-external-id.use-case.ts");
const sales_representatives_controller_1 = __webpack_require__(/*! ./presentation/sales-representatives.controller */ "./apps/suppliers-ms/src/modules/sales-representatives/presentation/sales-representatives.controller.ts");
let SalesRepresentativesModule = class SalesRepresentativesModule {
};
exports.SalesRepresentativesModule = SalesRepresentativesModule;
exports.SalesRepresentativesModule = SalesRepresentativesModule = __decorate([
    (0, common_1.Module)({
        imports: [infrastructure_module_1.InfrastructureModule],
        controllers: [sales_representatives_controller_1.SalesRepresentativesController],
        providers: [
            {
                provide: sales_representatives_tokens_1.SALES_REPRESENTATIVE_REPOSITORY,
                useExisting: typeorm_sales_representative_repository_1.TypeormSalesRepresentativeRepository,
            },
            create_sales_representative_use_case_1.CreateSalesRepresentativeUseCase,
            get_sales_representative_by_external_id_use_case_1.GetSalesRepresentativeByExternalIdUseCase,
            list_sales_representatives_use_case_1.ListSalesRepresentativesUseCase,
            update_sales_representative_by_external_id_use_case_1.UpdateSalesRepresentativeByExternalIdUseCase,
            delete_sales_representative_by_external_id_use_case_1.DeleteSalesRepresentativeByExternalIdUseCase,
        ],
        exports: [
            sales_representatives_tokens_1.SALES_REPRESENTATIVE_REPOSITORY,
            create_sales_representative_use_case_1.CreateSalesRepresentativeUseCase,
            get_sales_representative_by_external_id_use_case_1.GetSalesRepresentativeByExternalIdUseCase,
            list_sales_representatives_use_case_1.ListSalesRepresentativesUseCase,
            update_sales_representative_by_external_id_use_case_1.UpdateSalesRepresentativeByExternalIdUseCase,
            delete_sales_representative_by_external_id_use_case_1.DeleteSalesRepresentativeByExternalIdUseCase,
        ],
    })
], SalesRepresentativesModule);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/sales-representatives/sales-representatives.tokens.ts"
/*!*********************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/sales-representatives/sales-representatives.tokens.ts ***!
  \*********************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SALES_REPRESENTATIVE_REPOSITORY = void 0;
exports.SALES_REPRESENTATIVE_REPOSITORY = Symbol('SALES_REPRESENTATIVE_REPOSITORY');


/***/ },

/***/ "./apps/suppliers-ms/src/modules/suppliers/application/mapping/supplier-public-fields.builder.ts"
/*!*******************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/suppliers/application/mapping/supplier-public-fields.builder.ts ***!
  \*******************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.build_supplier_public_fields = build_supplier_public_fields;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
async function build_supplier_public_fields(supplier, lookup) {
    const business_external_id = await lookup.get_business_external_id_by_internal_id(supplier.business_id);
    if (!business_external_id) {
        throw new common_1.InternalServerErrorException();
    }
    let bank_account_external_id = null;
    if (supplier.bank_account_id !== null) {
        bank_account_external_id =
            await lookup.get_bank_account_external_id_by_internal_id(supplier.bank_account_id);
        if (!bank_account_external_id) {
            throw new common_1.InternalServerErrorException();
        }
    }
    return {
        internal_id: supplier.internal_id,
        external_id: supplier.external_id,
        business_external_id,
        bank_account_external_id,
        created_at: supplier.created_at,
        updated_at: supplier.updated_at,
    };
}


/***/ },

/***/ "./apps/suppliers-ms/src/modules/suppliers/application/use-cases/create-supplier/create-supplier.request.ts"
/*!******************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/suppliers/application/use-cases/create-supplier/create-supplier.request.ts ***!
  \******************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateSupplierRequest = void 0;
class CreateSupplierRequest {
    business_internal_id;
    bank_account_internal_id;
    constructor(business_internal_id, bank_account_internal_id) {
        this.business_internal_id = business_internal_id;
        this.bank_account_internal_id = bank_account_internal_id;
    }
}
exports.CreateSupplierRequest = CreateSupplierRequest;


/***/ },

/***/ "./apps/suppliers-ms/src/modules/suppliers/application/use-cases/create-supplier/create-supplier.response.ts"
/*!*******************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/suppliers/application/use-cases/create-supplier/create-supplier.response.ts ***!
  \*******************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateSupplierResponse = void 0;
class CreateSupplierResponse {
    internal_id;
    external_id;
    business_external_id;
    bank_account_external_id;
    created_at;
    updated_at;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.CreateSupplierResponse = CreateSupplierResponse;


/***/ },

/***/ "./apps/suppliers-ms/src/modules/suppliers/application/use-cases/create-supplier/create-supplier.use-case.ts"
/*!*******************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/suppliers/application/use-cases/create-supplier/create-supplier.use-case.ts ***!
  \*******************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.CreateSupplierUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const suppliers_reference_lookup_port_1 = __webpack_require__(/*! @common/ports/suppliers-reference-lookup.port */ "./apps/suppliers-ms/src/common/ports/suppliers-reference-lookup.port.ts");
const suppliers_tokens_1 = __webpack_require__(/*! @modules/suppliers/suppliers.tokens */ "./apps/suppliers-ms/src/modules/suppliers/suppliers.tokens.ts");
const supplier_repository_1 = __webpack_require__(/*! @modules/suppliers/domain/repositories/supplier.repository */ "./apps/suppliers-ms/src/modules/suppliers/domain/repositories/supplier.repository.ts");
const supplier_public_fields_builder_1 = __webpack_require__(/*! @modules/suppliers/application/mapping/supplier-public-fields.builder */ "./apps/suppliers-ms/src/modules/suppliers/application/mapping/supplier-public-fields.builder.ts");
const create_supplier_response_1 = __webpack_require__(/*! ./create-supplier.response */ "./apps/suppliers-ms/src/modules/suppliers/application/use-cases/create-supplier/create-supplier.response.ts");
let CreateSupplierUseCase = class CreateSupplierUseCase {
    supplier_repository;
    lookup;
    constructor(supplier_repository, lookup) {
        this.supplier_repository = supplier_repository;
        this.lookup = lookup;
    }
    async execute(req) {
        const created = await this.supplier_repository.create({
            business_id: req.business_internal_id,
            bank_account_id: req.bank_account_internal_id,
        });
        const fields = await (0, supplier_public_fields_builder_1.build_supplier_public_fields)(created, this.lookup);
        return new create_supplier_response_1.CreateSupplierResponse(fields);
    }
};
exports.CreateSupplierUseCase = CreateSupplierUseCase;
exports.CreateSupplierUseCase = CreateSupplierUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(suppliers_tokens_1.SUPPLIER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(suppliers_reference_lookup_port_1.SUPPLIERS_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [typeof (_a = typeof supplier_repository_1.SupplierRepository !== "undefined" && supplier_repository_1.SupplierRepository) === "function" ? _a : Object, typeof (_b = typeof suppliers_reference_lookup_port_1.SuppliersReferenceLookupPort !== "undefined" && suppliers_reference_lookup_port_1.SuppliersReferenceLookupPort) === "function" ? _b : Object])
], CreateSupplierUseCase);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/suppliers/application/use-cases/delete-supplier-by-external-id/delete-supplier-by-external-id.use-case.ts"
/*!*************************************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/suppliers/application/use-cases/delete-supplier-by-external-id/delete-supplier-by-external-id.use-case.ts ***!
  \*************************************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.DeleteSupplierByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const suppliers_tokens_1 = __webpack_require__(/*! @modules/suppliers/suppliers.tokens */ "./apps/suppliers-ms/src/modules/suppliers/suppliers.tokens.ts");
const supplier_repository_1 = __webpack_require__(/*! @modules/suppliers/domain/repositories/supplier.repository */ "./apps/suppliers-ms/src/modules/suppliers/domain/repositories/supplier.repository.ts");
let DeleteSupplierByExternalIdUseCase = class DeleteSupplierByExternalIdUseCase {
    supplier_repository;
    constructor(supplier_repository) {
        this.supplier_repository = supplier_repository;
    }
    async execute(req) {
        const ok = await this.supplier_repository.delete_by_external_id(req.external_id);
        if (!ok) {
            throw new common_1.NotFoundException('supplier not found');
        }
    }
};
exports.DeleteSupplierByExternalIdUseCase = DeleteSupplierByExternalIdUseCase;
exports.DeleteSupplierByExternalIdUseCase = DeleteSupplierByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(suppliers_tokens_1.SUPPLIER_REPOSITORY)),
    __metadata("design:paramtypes", [typeof (_a = typeof supplier_repository_1.SupplierRepository !== "undefined" && supplier_repository_1.SupplierRepository) === "function" ? _a : Object])
], DeleteSupplierByExternalIdUseCase);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/suppliers/application/use-cases/get-supplier-by-external-id/get-supplier-by-external-id.response.ts"
/*!*******************************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/suppliers/application/use-cases/get-supplier-by-external-id/get-supplier-by-external-id.response.ts ***!
  \*******************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetSupplierByExternalIdResponse = void 0;
class GetSupplierByExternalIdResponse {
    internal_id;
    external_id;
    business_external_id;
    bank_account_external_id;
    created_at;
    updated_at;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.GetSupplierByExternalIdResponse = GetSupplierByExternalIdResponse;


/***/ },

/***/ "./apps/suppliers-ms/src/modules/suppliers/application/use-cases/get-supplier-by-external-id/get-supplier-by-external-id.use-case.ts"
/*!*******************************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/suppliers/application/use-cases/get-supplier-by-external-id/get-supplier-by-external-id.use-case.ts ***!
  \*******************************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.GetSupplierByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const suppliers_reference_lookup_port_1 = __webpack_require__(/*! @common/ports/suppliers-reference-lookup.port */ "./apps/suppliers-ms/src/common/ports/suppliers-reference-lookup.port.ts");
const suppliers_tokens_1 = __webpack_require__(/*! @modules/suppliers/suppliers.tokens */ "./apps/suppliers-ms/src/modules/suppliers/suppliers.tokens.ts");
const supplier_repository_1 = __webpack_require__(/*! @modules/suppliers/domain/repositories/supplier.repository */ "./apps/suppliers-ms/src/modules/suppliers/domain/repositories/supplier.repository.ts");
const supplier_public_fields_builder_1 = __webpack_require__(/*! @modules/suppliers/application/mapping/supplier-public-fields.builder */ "./apps/suppliers-ms/src/modules/suppliers/application/mapping/supplier-public-fields.builder.ts");
const get_supplier_by_external_id_response_1 = __webpack_require__(/*! ./get-supplier-by-external-id.response */ "./apps/suppliers-ms/src/modules/suppliers/application/use-cases/get-supplier-by-external-id/get-supplier-by-external-id.response.ts");
let GetSupplierByExternalIdUseCase = class GetSupplierByExternalIdUseCase {
    supplier_repository;
    lookup;
    constructor(supplier_repository, lookup) {
        this.supplier_repository = supplier_repository;
        this.lookup = lookup;
    }
    async execute(req) {
        const row = await this.supplier_repository.find_by_external_id(req.external_id);
        if (row === null) {
            throw new common_1.NotFoundException('supplier not found');
        }
        const fields = await (0, supplier_public_fields_builder_1.build_supplier_public_fields)(row, this.lookup);
        return new get_supplier_by_external_id_response_1.GetSupplierByExternalIdResponse(fields);
    }
};
exports.GetSupplierByExternalIdUseCase = GetSupplierByExternalIdUseCase;
exports.GetSupplierByExternalIdUseCase = GetSupplierByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(suppliers_tokens_1.SUPPLIER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(suppliers_reference_lookup_port_1.SUPPLIERS_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [typeof (_a = typeof supplier_repository_1.SupplierRepository !== "undefined" && supplier_repository_1.SupplierRepository) === "function" ? _a : Object, typeof (_b = typeof suppliers_reference_lookup_port_1.SuppliersReferenceLookupPort !== "undefined" && suppliers_reference_lookup_port_1.SuppliersReferenceLookupPort) === "function" ? _b : Object])
], GetSupplierByExternalIdUseCase);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/suppliers/application/use-cases/list-suppliers/list-suppliers.response.ts"
/*!*****************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/suppliers/application/use-cases/list-suppliers/list-suppliers.response.ts ***!
  \*****************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListSuppliersItemResponse = void 0;
class ListSuppliersItemResponse {
    internal_id;
    external_id;
    business_external_id;
    bank_account_external_id;
    created_at;
    updated_at;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.ListSuppliersItemResponse = ListSuppliersItemResponse;


/***/ },

/***/ "./apps/suppliers-ms/src/modules/suppliers/application/use-cases/list-suppliers/list-suppliers.use-case.ts"
/*!*****************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/suppliers/application/use-cases/list-suppliers/list-suppliers.use-case.ts ***!
  \*****************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.ListSuppliersUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const suppliers_reference_lookup_port_1 = __webpack_require__(/*! @common/ports/suppliers-reference-lookup.port */ "./apps/suppliers-ms/src/common/ports/suppliers-reference-lookup.port.ts");
const suppliers_tokens_1 = __webpack_require__(/*! @modules/suppliers/suppliers.tokens */ "./apps/suppliers-ms/src/modules/suppliers/suppliers.tokens.ts");
const supplier_repository_1 = __webpack_require__(/*! @modules/suppliers/domain/repositories/supplier.repository */ "./apps/suppliers-ms/src/modules/suppliers/domain/repositories/supplier.repository.ts");
const supplier_public_fields_builder_1 = __webpack_require__(/*! @modules/suppliers/application/mapping/supplier-public-fields.builder */ "./apps/suppliers-ms/src/modules/suppliers/application/mapping/supplier-public-fields.builder.ts");
const list_suppliers_response_1 = __webpack_require__(/*! ./list-suppliers.response */ "./apps/suppliers-ms/src/modules/suppliers/application/use-cases/list-suppliers/list-suppliers.response.ts");
let ListSuppliersUseCase = class ListSuppliersUseCase {
    supplier_repository;
    lookup;
    constructor(supplier_repository, lookup) {
        this.supplier_repository = supplier_repository;
        this.lookup = lookup;
    }
    async execute() {
        const rows = await this.supplier_repository.find_all();
        const out = [];
        for (const row of rows) {
            const fields = await (0, supplier_public_fields_builder_1.build_supplier_public_fields)(row, this.lookup);
            out.push(new list_suppliers_response_1.ListSuppliersItemResponse(fields));
        }
        return out;
    }
};
exports.ListSuppliersUseCase = ListSuppliersUseCase;
exports.ListSuppliersUseCase = ListSuppliersUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(suppliers_tokens_1.SUPPLIER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(suppliers_reference_lookup_port_1.SUPPLIERS_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [typeof (_a = typeof supplier_repository_1.SupplierRepository !== "undefined" && supplier_repository_1.SupplierRepository) === "function" ? _a : Object, typeof (_b = typeof suppliers_reference_lookup_port_1.SuppliersReferenceLookupPort !== "undefined" && suppliers_reference_lookup_port_1.SuppliersReferenceLookupPort) === "function" ? _b : Object])
], ListSuppliersUseCase);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/suppliers/application/use-cases/update-supplier-by-external-id/update-supplier-by-external-id.response.ts"
/*!*************************************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/suppliers/application/use-cases/update-supplier-by-external-id/update-supplier-by-external-id.response.ts ***!
  \*************************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateSupplierByExternalIdResponse = void 0;
class UpdateSupplierByExternalIdResponse {
    internal_id;
    external_id;
    business_external_id;
    bank_account_external_id;
    created_at;
    updated_at;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.UpdateSupplierByExternalIdResponse = UpdateSupplierByExternalIdResponse;


/***/ },

/***/ "./apps/suppliers-ms/src/modules/suppliers/application/use-cases/update-supplier-by-external-id/update-supplier-by-external-id.use-case.ts"
/*!*************************************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/suppliers/application/use-cases/update-supplier-by-external-id/update-supplier-by-external-id.use-case.ts ***!
  \*************************************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.UpdateSupplierByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const suppliers_reference_lookup_port_1 = __webpack_require__(/*! @common/ports/suppliers-reference-lookup.port */ "./apps/suppliers-ms/src/common/ports/suppliers-reference-lookup.port.ts");
const suppliers_tokens_1 = __webpack_require__(/*! @modules/suppliers/suppliers.tokens */ "./apps/suppliers-ms/src/modules/suppliers/suppliers.tokens.ts");
const supplier_repository_1 = __webpack_require__(/*! @modules/suppliers/domain/repositories/supplier.repository */ "./apps/suppliers-ms/src/modules/suppliers/domain/repositories/supplier.repository.ts");
const supplier_public_fields_builder_1 = __webpack_require__(/*! @modules/suppliers/application/mapping/supplier-public-fields.builder */ "./apps/suppliers-ms/src/modules/suppliers/application/mapping/supplier-public-fields.builder.ts");
const update_supplier_by_external_id_response_1 = __webpack_require__(/*! ./update-supplier-by-external-id.response */ "./apps/suppliers-ms/src/modules/suppliers/application/use-cases/update-supplier-by-external-id/update-supplier-by-external-id.response.ts");
let UpdateSupplierByExternalIdUseCase = class UpdateSupplierByExternalIdUseCase {
    supplier_repository;
    lookup;
    constructor(supplier_repository, lookup) {
        this.supplier_repository = supplier_repository;
        this.lookup = lookup;
    }
    async execute(req) {
        const patch = {};
        if (req.bank_account_external_id !== undefined) {
            if (req.bank_account_external_id === null) {
                patch.bank_account_id = null;
            }
            else {
                const id = await this.lookup.get_bank_account_internal_id_by_external_id(req.bank_account_external_id);
                if (id === null) {
                    throw new common_1.NotFoundException('bank account not found');
                }
                patch.bank_account_id = id;
            }
        }
        const updated = await this.supplier_repository.update_by_external_id(req.external_id, patch);
        if (updated === null) {
            throw new common_1.NotFoundException('supplier not found');
        }
        const fields = await (0, supplier_public_fields_builder_1.build_supplier_public_fields)(updated, this.lookup);
        return new update_supplier_by_external_id_response_1.UpdateSupplierByExternalIdResponse(fields);
    }
};
exports.UpdateSupplierByExternalIdUseCase = UpdateSupplierByExternalIdUseCase;
exports.UpdateSupplierByExternalIdUseCase = UpdateSupplierByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(suppliers_tokens_1.SUPPLIER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(suppliers_reference_lookup_port_1.SUPPLIERS_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [typeof (_a = typeof supplier_repository_1.SupplierRepository !== "undefined" && supplier_repository_1.SupplierRepository) === "function" ? _a : Object, typeof (_b = typeof suppliers_reference_lookup_port_1.SuppliersReferenceLookupPort !== "undefined" && suppliers_reference_lookup_port_1.SuppliersReferenceLookupPort) === "function" ? _b : Object])
], UpdateSupplierByExternalIdUseCase);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/suppliers/domain/entities/supplier.entity.ts"
/*!************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/suppliers/domain/entities/supplier.entity.ts ***!
  \************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Supplier = void 0;
class Supplier {
    internal_id;
    external_id;
    business_id;
    bank_account_id;
    created_at;
    updated_at;
    constructor(internal_id, external_id, business_id, bank_account_id, created_at, updated_at) {
        this.internal_id = internal_id;
        this.external_id = external_id;
        this.business_id = business_id;
        this.bank_account_id = bank_account_id;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
exports.Supplier = Supplier;


/***/ },

/***/ "./apps/suppliers-ms/src/modules/suppliers/domain/repositories/supplier.repository.ts"
/*!********************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/suppliers/domain/repositories/supplier.repository.ts ***!
  \********************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ "./apps/suppliers-ms/src/modules/suppliers/suppliers.module.ts"
/*!*********************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/suppliers/suppliers.module.ts ***!
  \*********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SuppliersModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const infrastructure_module_1 = __webpack_require__(/*! @infrastructure/infrastructure.module */ "./apps/suppliers-ms/src/infrastructure/infrastructure.module.ts");
const typeorm_supplier_repository_1 = __webpack_require__(/*! @infrastructure/database/repositories/typeorm-supplier.repository */ "./apps/suppliers-ms/src/infrastructure/database/repositories/typeorm-supplier.repository.ts");
const suppliers_tokens_1 = __webpack_require__(/*! ./suppliers.tokens */ "./apps/suppliers-ms/src/modules/suppliers/suppliers.tokens.ts");
const create_supplier_use_case_1 = __webpack_require__(/*! ./application/use-cases/create-supplier/create-supplier.use-case */ "./apps/suppliers-ms/src/modules/suppliers/application/use-cases/create-supplier/create-supplier.use-case.ts");
const get_supplier_by_external_id_use_case_1 = __webpack_require__(/*! ./application/use-cases/get-supplier-by-external-id/get-supplier-by-external-id.use-case */ "./apps/suppliers-ms/src/modules/suppliers/application/use-cases/get-supplier-by-external-id/get-supplier-by-external-id.use-case.ts");
const list_suppliers_use_case_1 = __webpack_require__(/*! ./application/use-cases/list-suppliers/list-suppliers.use-case */ "./apps/suppliers-ms/src/modules/suppliers/application/use-cases/list-suppliers/list-suppliers.use-case.ts");
const update_supplier_by_external_id_use_case_1 = __webpack_require__(/*! ./application/use-cases/update-supplier-by-external-id/update-supplier-by-external-id.use-case */ "./apps/suppliers-ms/src/modules/suppliers/application/use-cases/update-supplier-by-external-id/update-supplier-by-external-id.use-case.ts");
const delete_supplier_by_external_id_use_case_1 = __webpack_require__(/*! ./application/use-cases/delete-supplier-by-external-id/delete-supplier-by-external-id.use-case */ "./apps/suppliers-ms/src/modules/suppliers/application/use-cases/delete-supplier-by-external-id/delete-supplier-by-external-id.use-case.ts");
let SuppliersModule = class SuppliersModule {
};
exports.SuppliersModule = SuppliersModule;
exports.SuppliersModule = SuppliersModule = __decorate([
    (0, common_1.Module)({
        imports: [infrastructure_module_1.InfrastructureModule],
        providers: [
            { provide: suppliers_tokens_1.SUPPLIER_REPOSITORY, useExisting: typeorm_supplier_repository_1.TypeormSupplierRepository },
            create_supplier_use_case_1.CreateSupplierUseCase,
            get_supplier_by_external_id_use_case_1.GetSupplierByExternalIdUseCase,
            list_suppliers_use_case_1.ListSuppliersUseCase,
            update_supplier_by_external_id_use_case_1.UpdateSupplierByExternalIdUseCase,
            delete_supplier_by_external_id_use_case_1.DeleteSupplierByExternalIdUseCase,
        ],
        exports: [
            suppliers_tokens_1.SUPPLIER_REPOSITORY,
            create_supplier_use_case_1.CreateSupplierUseCase,
            get_supplier_by_external_id_use_case_1.GetSupplierByExternalIdUseCase,
            list_suppliers_use_case_1.ListSuppliersUseCase,
            update_supplier_by_external_id_use_case_1.UpdateSupplierByExternalIdUseCase,
            delete_supplier_by_external_id_use_case_1.DeleteSupplierByExternalIdUseCase,
        ],
    })
], SuppliersModule);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/suppliers/suppliers.tokens.ts"
/*!*********************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/suppliers/suppliers.tokens.ts ***!
  \*********************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SUPPLIER_REPOSITORY = void 0;
exports.SUPPLIER_REPOSITORY = Symbol('SUPPLIER_REPOSITORY');


/***/ },

/***/ "./libs/products-data/src/entities/base-external-id.entity.ts"
/*!********************************************************************!*\
  !*** ./libs/products-data/src/entities/base-external-id.entity.ts ***!
  \********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
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


/***/ },

/***/ "./libs/products-data/src/entities/category.entity.ts"
/*!************************************************************!*\
  !*** ./libs/products-data/src/entities/category.entity.ts ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.CategoryEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
const base_external_id_entity_1 = __webpack_require__(/*! ./base-external-id.entity */ "./libs/products-data/src/entities/base-external-id.entity.ts");
const suppliers_data_1 = __webpack_require__(/*! @app/suppliers-data */ "./libs/suppliers-data/src/index.ts");
const credit_facility_entity_1 = __webpack_require__(/*! ./credit-facility.entity */ "./libs/products-data/src/entities/credit-facility.entity.ts");
let CategoryEntity = class CategoryEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    name;
    modality;
    discountPercentage;
    interestRate;
    disbursementFeePercent;
    minimumDisbursementFee;
    delayDays;
    termDays;
    installmentFrequency;
    installmentCount;
    initialPaymentPct;
    state;
    partner;
    partnerId;
    creditFacility;
};
exports.CategoryEntity = CategoryEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'name', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], CategoryEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'modality',
        type: 'enum',
        enum: shared_1.ModalityTypes,
        enumName: 'loan_request_modality',
    }),
    __metadata("design:type", typeof (_a = typeof shared_1.ModalityTypes !== "undefined" && shared_1.ModalityTypes) === "function" ? _a : Object)
], CategoryEntity.prototype, "modality", void 0);
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
        name: 'installment_frequency',
        type: 'enum',
        enum: shared_1.InstallmentFrequencyTypes,
        enumName: 'category_installment_frequency',
    }),
    __metadata("design:type", typeof (_b = typeof shared_1.InstallmentFrequencyTypes !== "undefined" && shared_1.InstallmentFrequencyTypes) === "function" ? _b : Object)
], CategoryEntity.prototype, "installmentFrequency", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'installment_count', type: 'int' }),
    __metadata("design:type", Number)
], CategoryEntity.prototype, "installmentCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'initial_payment_pct', type: 'decimal', precision: 8, scale: 4 }),
    __metadata("design:type", String)
], CategoryEntity.prototype, "initialPaymentPct", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'state',
        type: 'enum',
        enum: shared_1.CategoryState,
        enumName: 'credit_facility_state',
        default: shared_1.CategoryState.ACTIVE,
    }),
    __metadata("design:type", typeof (_c = typeof shared_1.CategoryState !== "undefined" && shared_1.CategoryState) === "function" ? _c : Object)
], CategoryEntity.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => suppliers_data_1.PartnersEntity, (p) => p.categories, {
        nullable: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'partner_id' }),
    __metadata("design:type", Object)
], CategoryEntity.prototype, "partner", void 0);
__decorate([
    (0, typeorm_1.RelationId)((c) => c.partner),
    __metadata("design:type", Object)
], CategoryEntity.prototype, "partnerId", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => credit_facility_entity_1.CreditFacilityEntity, (creditFacility) => creditFacility.categories),
    __metadata("design:type", Array)
], CategoryEntity.prototype, "creditFacility", void 0);
exports.CategoryEntity = CategoryEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'categories', schema: 'products_schema' })
], CategoryEntity);


/***/ },

/***/ "./libs/products-data/src/entities/contract-template.entity.ts"
/*!*********************************************************************!*\
  !*** ./libs/products-data/src/entities/contract-template.entity.ts ***!
  \*********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.ContractTemplateEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
const base_external_id_entity_1 = __webpack_require__(/*! ./base-external-id.entity */ "./libs/products-data/src/entities/base-external-id.entity.ts");
let ContractTemplateEntity = class ContractTemplateEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    name;
    description;
    templateUrl;
    version;
    state;
};
exports.ContractTemplateEntity = ContractTemplateEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'name', type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], ContractTemplateEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'description', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ContractTemplateEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'template_url',
        type: 'text',
        nullable: false,
        comment: 'URL del template en S3'
    }),
    __metadata("design:type", String)
], ContractTemplateEntity.prototype, "templateUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'version', type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", Object)
], ContractTemplateEntity.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'state',
        type: 'enum',
        enum: shared_1.ContractTemplateCatalogStatus,
        enumName: 'credit_facility_state',
        default: shared_1.ContractTemplateCatalogStatus.ACTIVE,
    }),
    __metadata("design:type", typeof (_a = typeof shared_1.ContractTemplateCatalogStatus !== "undefined" && shared_1.ContractTemplateCatalogStatus) === "function" ? _a : Object)
], ContractTemplateEntity.prototype, "state", void 0);
exports.ContractTemplateEntity = ContractTemplateEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'contract_templates', schema: 'products_schema' })
], ContractTemplateEntity);


/***/ },

/***/ "./libs/products-data/src/entities/contract.entity.ts"
/*!************************************************************!*\
  !*** ./libs/products-data/src/entities/contract.entity.ts ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.ContractEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
const base_external_id_entity_1 = __webpack_require__(/*! ./base-external-id.entity */ "./libs/products-data/src/entities/base-external-id.entity.ts");
const contract_template_entity_1 = __webpack_require__(/*! ./contract-template.entity */ "./libs/products-data/src/entities/contract-template.entity.ts");
let ContractEntity = class ContractEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    userId;
    contractTemplate;
    contractTemplateId;
    zapsignToken;
    originalFileUrl;
    signedFileUrl;
    formAnswersJson;
    state;
};
exports.ContractEntity = ContractEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], ContractEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => contract_template_entity_1.ContractTemplateEntity, {
        nullable: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'contract_template_id', referencedColumnName: 'id' }),
    __metadata("design:type", Object)
], ContractEntity.prototype, "contractTemplate", void 0);
__decorate([
    (0, typeorm_1.RelationId)((c) => c.contractTemplate),
    __metadata("design:type", Object)
], ContractEntity.prototype, "contractTemplateId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'zapsign_token', type: 'varchar', nullable: true, unique: true }),
    __metadata("design:type", Object)
], ContractEntity.prototype, "zapsignToken", void 0);
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
__decorate([
    (0, typeorm_1.Column)({
        name: 'state',
        type: 'enum',
        enum: shared_1.ContractCatalogStatus,
        enumName: 'contract_catalog_status',
        default: shared_1.ContractCatalogStatus.PENDING,
    }),
    __metadata("design:type", typeof (_c = typeof shared_1.ContractCatalogStatus !== "undefined" && shared_1.ContractCatalogStatus) === "function" ? _c : Object)
], ContractEntity.prototype, "state", void 0);
exports.ContractEntity = ContractEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'contracts', schema: 'products_schema' })
], ContractEntity);


/***/ },

/***/ "./libs/products-data/src/entities/credit-facility.entity.ts"
/*!*******************************************************************!*\
  !*** ./libs/products-data/src/entities/credit-facility.entity.ts ***!
  \*******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.CreditFacilityEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
const base_external_id_entity_1 = __webpack_require__(/*! ./base-external-id.entity */ "./libs/products-data/src/entities/base-external-id.entity.ts");
const contract_entity_1 = __webpack_require__(/*! ./contract.entity */ "./libs/products-data/src/entities/contract.entity.ts");
const suppliers_data_1 = __webpack_require__(/*! @app/suppliers-data */ "./libs/suppliers-data/src/index.ts");
const category_entity_1 = __webpack_require__(/*! ./category.entity */ "./libs/products-data/src/entities/category.entity.ts");
let CreditFacilityEntity = class CreditFacilityEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    contract;
    state;
    totalLimit;
    business;
    businessId;
    categories;
};
exports.CreditFacilityEntity = CreditFacilityEntity;
__decorate([
    (0, typeorm_1.OneToOne)(() => contract_entity_1.ContractEntity, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'contract_id', referencedColumnName: 'id' }),
    __metadata("design:type", Object)
], CreditFacilityEntity.prototype, "contract", void 0);
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
    (0, typeorm_1.ManyToOne)(() => suppliers_data_1.BusinessEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'business_id', referencedColumnName: 'id' }),
    __metadata("design:type", typeof (_c = typeof suppliers_data_1.BusinessEntity !== "undefined" && suppliers_data_1.BusinessEntity) === "function" ? _c : Object)
], CreditFacilityEntity.prototype, "business", void 0);
__decorate([
    (0, typeorm_1.RelationId)((cf) => cf.business),
    __metadata("design:type", Number)
], CreditFacilityEntity.prototype, "businessId", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => category_entity_1.CategoryEntity, (category) => category.creditFacility),
    (0, typeorm_1.JoinTable)({
        name: 'client_category_assignments',
        joinColumn: { name: 'credit_facility_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
        schema: 'products_schema',
    }),
    __metadata("design:type", Array)
], CreditFacilityEntity.prototype, "categories", void 0);
exports.CreditFacilityEntity = CreditFacilityEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'credit_facilities', schema: 'products_schema' })
], CreditFacilityEntity);


/***/ },

/***/ "./libs/shared/src/domain/domain-event.interface.ts"
/*!**********************************************************!*\
  !*** ./libs/shared/src/domain/domain-event.interface.ts ***!
  \**********************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ "./libs/shared/src/domain/entity.base.ts"
/*!***********************************************!*\
  !*** ./libs/shared/src/domain/entity.base.ts ***!
  \***********************************************/
(__unused_webpack_module, exports) {


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


/***/ },

/***/ "./libs/shared/src/domain/event-bus.ts"
/*!*********************************************!*\
  !*** ./libs/shared/src/domain/event-bus.ts ***!
  \*********************************************/
(__unused_webpack_module, exports) {


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


/***/ },

/***/ "./libs/shared/src/domain/repository.interface.ts"
/*!********************************************************!*\
  !*** ./libs/shared/src/domain/repository.interface.ts ***!
  \********************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ "./libs/shared/src/domain/roles.enum.ts"
/*!**********************************************!*\
  !*** ./libs/shared/src/domain/roles.enum.ts ***!
  \**********************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = exports.BackOfficeRoles = exports.PartnerRoles = void 0;
var PartnerRoles;
(function (PartnerRoles) {
    PartnerRoles["PARTNER_ADMIN"] = "PARTNER_ADMIN";
    PartnerRoles["PARTNER_OPERATIONS"] = "PARTNER_OPERATIONS";
    PartnerRoles["CUSTOMER"] = "CUSTOMER";
    PartnerRoles["SALES_MANAGER"] = "SALES_MANAGER";
    PartnerRoles["SALES_REPRESENTATIVE"] = "SALES_REPRESENTATIVE";
})(PartnerRoles || (exports.PartnerRoles = PartnerRoles = {}));
var BackOfficeRoles;
(function (BackOfficeRoles) {
    BackOfficeRoles["BACK_OFFICE_ADMIN"] = "BACK_OFFICE_ADMIN";
    BackOfficeRoles["BACK_OFFICE_ANALYST"] = "BACK_OFFICE_ANALYST";
})(BackOfficeRoles || (exports.BackOfficeRoles = BackOfficeRoles = {}));
var Roles;
(function (Roles) {
    Roles["PARTNER_ADMIN"] = "PARTNER_ADMIN";
    Roles["PARTNER_OPERATIONS"] = "PARTNER_OPERATIONS";
    Roles["CUSTOMER"] = "CUSTOMER";
    Roles["SALES_MANAGER"] = "SALES_MANAGER";
    Roles["SALES_REPRESENTATIVE"] = "SALES_REPRESENTATIVE";
    Roles["BACK_OFFICE_ADMIN"] = "BACK_OFFICE_ADMIN";
    Roles["BACK_OFFICE_ANALYST"] = "BACK_OFFICE_ANALYST";
})(Roles || (exports.Roles = Roles = {}));


/***/ },

/***/ "./libs/shared/src/domain/statuses.enum.ts"
/*!*************************************************!*\
  !*** ./libs/shared/src/domain/statuses.enum.ts ***!
  \*************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BatchLogsStatus = exports.PaymentsMethod = exports.PaymentsStatus = exports.AdjustmentsStatus = exports.DisbursementBatchesStatus = exports.DisbursementStatus = exports.LoanStatus = exports.LoanRequestStatus = exports.SarlaftCheckStatus = exports.ExperianQueryStatus = exports.BusinessSeniorityCatalogState = exports.RolePermissionLinkState = exports.PermissionDefinitionState = exports.RoleDefinitionState = exports.PurchaseOrderRecordState = exports.BankAccountRecordState = exports.ShareholderRecordState = exports.LegalRepresentativeLifecycleState = exports.PersonRecordState = exports.BusinessLifecycleState = exports.CatalogActivationState = exports.UserState = exports.SalesRepresentativeRecordState = exports.PartnerOnboardingSagaStatus = exports.SupplierState = exports.PartnerState = exports.DocumentVerificationStatus = exports.ContractTemplateCatalogStatus = exports.ContractCatalogStatus = exports.CreditApplicationStatus = exports.CategoryState = exports.CreditFacilityState = void 0;
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
var ExperianQueryStatus;
(function (ExperianQueryStatus) {
    ExperianQueryStatus["PENDING"] = "pending";
    ExperianQueryStatus["COMPLETED"] = "completed";
    ExperianQueryStatus["ERROR"] = "error";
})(ExperianQueryStatus || (exports.ExperianQueryStatus = ExperianQueryStatus = {}));
var SarlaftCheckStatus;
(function (SarlaftCheckStatus) {
    SarlaftCheckStatus["PENDING"] = "pending";
    SarlaftCheckStatus["COMPLETED"] = "completed";
    SarlaftCheckStatus["ERROR"] = "error";
})(SarlaftCheckStatus || (exports.SarlaftCheckStatus = SarlaftCheckStatus = {}));
var LoanRequestStatus;
(function (LoanRequestStatus) {
    LoanRequestStatus["DRAFT"] = "draft";
    LoanRequestStatus["PENDING_CLIENT_APPROVAL"] = "pending_client_approval";
    LoanRequestStatus["PENDING_PARTNER_APPROVAL"] = "pending_partner_approval";
    LoanRequestStatus["PENDING_PLATAM_REVIEW"] = "pending_platam_review";
    LoanRequestStatus["APPROVED"] = "approved";
    LoanRequestStatus["REJECTED"] = "rejected";
    LoanRequestStatus["CANCELLED"] = "cancelled";
})(LoanRequestStatus || (exports.LoanRequestStatus = LoanRequestStatus = {}));
var LoanStatus;
(function (LoanStatus) {
    LoanStatus["ACTIVE"] = "active";
    LoanStatus["LATE"] = "late";
    LoanStatus["DEFAULT"] = "default";
    LoanStatus["PAID"] = "paid";
    LoanStatus["CANCELLED"] = "cancelled";
})(LoanStatus || (exports.LoanStatus = LoanStatus = {}));
var DisbursementStatus;
(function (DisbursementStatus) {
    DisbursementStatus["PENDING"] = "pending";
    DisbursementStatus["DISBURSED"] = "disbursed";
    DisbursementStatus["FAILED"] = "failed";
})(DisbursementStatus || (exports.DisbursementStatus = DisbursementStatus = {}));
var DisbursementBatchesStatus;
(function (DisbursementBatchesStatus) {
    DisbursementBatchesStatus["PENDING"] = "pending";
    DisbursementBatchesStatus["GENERATED"] = "generated";
    DisbursementBatchesStatus["PROCESSING"] = "processing";
    DisbursementBatchesStatus["DISBURSED"] = "disbursed";
    DisbursementBatchesStatus["PARTIAL_FAILED"] = "partial_failed";
})(DisbursementBatchesStatus || (exports.DisbursementBatchesStatus = DisbursementBatchesStatus = {}));
var AdjustmentsStatus;
(function (AdjustmentsStatus) {
    AdjustmentsStatus["PENDING"] = "pending";
    AdjustmentsStatus["APPLIED"] = "applied";
})(AdjustmentsStatus || (exports.AdjustmentsStatus = AdjustmentsStatus = {}));
var PaymentsStatus;
(function (PaymentsStatus) {
    PaymentsStatus["APPLIED"] = "applied";
    PaymentsStatus["PENDING_REVIEW"] = "pending_review";
    PaymentsStatus["REVERSED"] = "reversed";
})(PaymentsStatus || (exports.PaymentsStatus = PaymentsStatus = {}));
var PaymentsMethod;
(function (PaymentsMethod) {
    PaymentsMethod["PAYVALIDA"] = "payvalida";
    PaymentsMethod["TRANSFER"] = "transfer";
    PaymentsMethod["DEPOSIT"] = "deposit";
    PaymentsMethod["OTHER"] = "other";
})(PaymentsMethod || (exports.PaymentsMethod = PaymentsMethod = {}));
var BatchLogsStatus;
(function (BatchLogsStatus) {
    BatchLogsStatus["SUCCESS"] = "success";
    BatchLogsStatus["PARTIAL"] = "partial";
    BatchLogsStatus["FAILED"] = "failed";
})(BatchLogsStatus || (exports.BatchLogsStatus = BatchLogsStatus = {}));


/***/ },

/***/ "./libs/shared/src/domain/types.enum.ts"
/*!**********************************************!*\
  !*** ./libs/shared/src/domain/types.enum.ts ***!
  \**********************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActionType = exports.EntityType = exports.UsuraRateType = exports.PaymentMethodType = exports.PaymentType = exports.PaymentChannelType = exports.AdjustmentsType = exports.BatchType = exports.DisbursementType = exports.LoanRequestChannel = exports.LoanRequestProductType = exports.AiAgentAnalysisRecommendation = exports.WebQueryType = exports.SarlaftCheckStatuses = exports.ExperianQueryTypes = exports.InstallmentFrequencyTypes = exports.ModalityTypes = exports.DocIssueDateTypes = exports.DocTypes = exports.GenderTypes = exports.OwnerTypes = exports.AccountTypes = void 0;
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
var ModalityTypes;
(function (ModalityTypes) {
    ModalityTypes["BULLET"] = "bullet";
    ModalityTypes["CUOTAS"] = "cuotas";
})(ModalityTypes || (exports.ModalityTypes = ModalityTypes = {}));
var InstallmentFrequencyTypes;
(function (InstallmentFrequencyTypes) {
    InstallmentFrequencyTypes["MONTHLY"] = "monthly";
    InstallmentFrequencyTypes["BIWEEKLY"] = "biweekly";
    InstallmentFrequencyTypes["WEEKLY"] = "weekly";
})(InstallmentFrequencyTypes || (exports.InstallmentFrequencyTypes = InstallmentFrequencyTypes = {}));
var ExperianQueryTypes;
(function (ExperianQueryTypes) {
    ExperianQueryTypes["HCPN"] = "hcpn";
    ExperianQueryTypes["HCPJ"] = "hcpj";
})(ExperianQueryTypes || (exports.ExperianQueryTypes = ExperianQueryTypes = {}));
var SarlaftCheckStatuses;
(function (SarlaftCheckStatuses) {
    SarlaftCheckStatuses["CLEAN"] = "clean";
    SarlaftCheckStatuses["ALERT"] = "alert";
    SarlaftCheckStatuses["BLOCKED"] = "blocked";
})(SarlaftCheckStatuses || (exports.SarlaftCheckStatuses = SarlaftCheckStatuses = {}));
var WebQueryType;
(function (WebQueryType) {
    WebQueryType["BDME"] = "bdme";
    WebQueryType["RAMA_JUDICIAL"] = "rama_judicial";
})(WebQueryType || (exports.WebQueryType = WebQueryType = {}));
var AiAgentAnalysisRecommendation;
(function (AiAgentAnalysisRecommendation) {
    AiAgentAnalysisRecommendation["HITL"] = "hitl";
    AiAgentAnalysisRecommendation["AUTO_APPROVE"] = "auto_approve";
    AiAgentAnalysisRecommendation["AUTO_REJECT"] = "auto_reject";
})(AiAgentAnalysisRecommendation || (exports.AiAgentAnalysisRecommendation = AiAgentAnalysisRecommendation = {}));
var LoanRequestProductType;
(function (LoanRequestProductType) {
    LoanRequestProductType["BNPL_PARTNER"] = "bnpl_partner";
    LoanRequestProductType["BNPL_SUPPLIER"] = "bnpl_supplier";
})(LoanRequestProductType || (exports.LoanRequestProductType = LoanRequestProductType = {}));
var LoanRequestChannel;
(function (LoanRequestChannel) {
    LoanRequestChannel["SR_PORTAL"] = "sr_portal";
    LoanRequestChannel["CLIENT_PORTAL"] = "client_portal";
    LoanRequestChannel["API"] = "api";
})(LoanRequestChannel || (exports.LoanRequestChannel = LoanRequestChannel = {}));
var DisbursementType;
(function (DisbursementType) {
    DisbursementType["PARTNER"] = "partner";
    DisbursementType["SUPPLIER"] = "supplier";
})(DisbursementType || (exports.DisbursementType = DisbursementType = {}));
var BatchType;
(function (BatchType) {
    BatchType["MANUAL"] = "manual";
    BatchType["ACH"] = "ach";
})(BatchType || (exports.BatchType = BatchType = {}));
var AdjustmentsType;
(function (AdjustmentsType) {
    AdjustmentsType["PARTIAL_RETURN"] = "partial_return";
    AdjustmentsType["TOTAL_RETURN"] = "total_return";
    AdjustmentsType["CLIENT_PAYS_PARTNER"] = "client_pays_partner";
    AdjustmentsType["CATEGORY_CHANGE"] = "category_change";
    AdjustmentsType["OTHER"] = "other";
})(AdjustmentsType || (exports.AdjustmentsType = AdjustmentsType = {}));
var PaymentChannelType;
(function (PaymentChannelType) {
    PaymentChannelType["PAYVALIDA"] = "payvalida";
    PaymentChannelType["MANUAL_CLIENT"] = "manual_client";
    PaymentChannelType["MANUAL_LOAN"] = "manual_loan";
})(PaymentChannelType || (exports.PaymentChannelType = PaymentChannelType = {}));
var PaymentType;
(function (PaymentType) {
    PaymentType["NORMAL_PAYMENT"] = "normal_payment";
    PaymentType["INSTALLMENT_PAYMENT"] = "installment_payment";
    PaymentType["PARTIAL_CANCELLATION"] = "partial_cancellation";
    PaymentType["TOTAL_CANCELLATION"] = "total_cancellation";
    PaymentType["PAYMENT_TO_PARTNER"] = "payment_to_partner";
})(PaymentType || (exports.PaymentType = PaymentType = {}));
var PaymentMethodType;
(function (PaymentMethodType) {
    PaymentMethodType["PAYVALIDA"] = "payvalida";
    PaymentMethodType["TRANSFER"] = "transfer";
    PaymentMethodType["DEPOSIT"] = "deposit";
    PaymentMethodType["OTHER"] = "other";
})(PaymentMethodType || (exports.PaymentMethodType = PaymentMethodType = {}));
var UsuraRateType;
(function (UsuraRateType) {
    UsuraRateType["USURY"] = "usury";
    UsuraRateType["FIXED"] = "fixed";
    UsuraRateType["ORDINARY"] = "ordinary";
    UsuraRateType["CONSUMPTION"] = "consumption";
    UsuraRateType["PRODUCTIVE_URBAN"] = "productive_urban";
    UsuraRateType["PRODUCTIVE_RURAL"] = "productive_rural";
    UsuraRateType["POPULAR_URBAN"] = "popular_urban";
    UsuraRateType["POPULAR_RURAL"] = "popular_rural";
    UsuraRateType["HIGH_AMOUNT"] = "high_amount";
})(UsuraRateType || (exports.UsuraRateType = UsuraRateType = {}));
var EntityType;
(function (EntityType) {
    EntityType["LOAN"] = "loan";
    EntityType["PAYMENT"] = "payment";
    EntityType["LOAN_REQUEST"] = "loan_request";
})(EntityType || (exports.EntityType = EntityType = {}));
var ActionType;
(function (ActionType) {
    ActionType["FIELD_UPDATE"] = "field_update";
    ActionType["REVERSAL"] = "reversal";
    ActionType["RECALCULATION"] = "recalculation";
})(ActionType || (exports.ActionType = ActionType = {}));


/***/ },

/***/ "./libs/shared/src/domain/use-case.interface.ts"
/*!******************************************************!*\
  !*** ./libs/shared/src/domain/use-case.interface.ts ***!
  \******************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ "./libs/shared/src/index.ts"
/*!**********************************!*\
  !*** ./libs/shared/src/index.ts ***!
  \**********************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
var sqs_tokens_1 = __webpack_require__(/*! ./messaging/sqs.tokens */ "./libs/shared/src/messaging/sqs.tokens.ts");
Object.defineProperty(exports, "QUEUES_CONFIG", ({ enumerable: true, get: function () { return sqs_tokens_1.QUEUES_CONFIG; } }));
Object.defineProperty(exports, "SQS_CLIENT", ({ enumerable: true, get: function () { return sqs_tokens_1.SQS_CLIENT; } }));
__exportStar(__webpack_require__(/*! ./messaging/sqs-client */ "./libs/shared/src/messaging/sqs-client.ts"), exports);
__exportStar(__webpack_require__(/*! ./messaging/sqs-message.interface */ "./libs/shared/src/messaging/sqs-message.interface.ts"), exports);
__exportStar(__webpack_require__(/*! ./messaging/sqs-publish-failed.error */ "./libs/shared/src/messaging/sqs-publish-failed.error.ts"), exports);
__exportStar(__webpack_require__(/*! ./messaging/base.consumer */ "./libs/shared/src/messaging/base.consumer.ts"), exports);
__exportStar(__webpack_require__(/*! ./messaging/base.publisher */ "./libs/shared/src/messaging/base.publisher.ts"), exports);
__exportStar(__webpack_require__(/*! ./messaging/sqs-idempotency.port */ "./libs/shared/src/messaging/sqs-idempotency.port.ts"), exports);
__exportStar(__webpack_require__(/*! ./domain/statuses.enum */ "./libs/shared/src/domain/statuses.enum.ts"), exports);
__exportStar(__webpack_require__(/*! ./domain/roles.enum */ "./libs/shared/src/domain/roles.enum.ts"), exports);
__exportStar(__webpack_require__(/*! ./domain/types.enum */ "./libs/shared/src/domain/types.enum.ts"), exports);
__exportStar(__webpack_require__(/*! ./domain/domain-event.interface */ "./libs/shared/src/domain/domain-event.interface.ts"), exports);
__exportStar(__webpack_require__(/*! ./domain/entity.base */ "./libs/shared/src/domain/entity.base.ts"), exports);
__exportStar(__webpack_require__(/*! ./domain/event-bus */ "./libs/shared/src/domain/event-bus.ts"), exports);
__exportStar(__webpack_require__(/*! ./domain/use-case.interface */ "./libs/shared/src/domain/use-case.interface.ts"), exports);
__exportStar(__webpack_require__(/*! ./domain/repository.interface */ "./libs/shared/src/domain/repository.interface.ts"), exports);
__exportStar(__webpack_require__(/*! ./utils/logger */ "./libs/shared/src/utils/logger.ts"), exports);
__exportStar(__webpack_require__(/*! ./utils/id-generator */ "./libs/shared/src/utils/id-generator.ts"), exports);
__exportStar(__webpack_require__(/*! ./utils/date.utils */ "./libs/shared/src/utils/date.utils.ts"), exports);
__exportStar(__webpack_require__(/*! ./utils/pagination.dto */ "./libs/shared/src/utils/pagination.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./utils/error-codes */ "./libs/shared/src/utils/error-codes.ts"), exports);


/***/ },

/***/ "./libs/shared/src/messaging/base.consumer.ts"
/*!****************************************************!*\
  !*** ./libs/shared/src/messaging/base.consumer.ts ***!
  \****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseConsumer = exports.BaseSqsConsumer = void 0;
const client_sqs_1 = __webpack_require__(/*! @aws-sdk/client-sqs */ "@aws-sdk/client-sqs");
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


/***/ },

/***/ "./libs/shared/src/messaging/base.publisher.ts"
/*!*****************************************************!*\
  !*** ./libs/shared/src/messaging/base.publisher.ts ***!
  \*****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BasePublisher = exports.BaseSqsPublisher = void 0;
const client_sqs_1 = __webpack_require__(/*! @aws-sdk/client-sqs */ "@aws-sdk/client-sqs");
const sqs_publish_failed_error_1 = __webpack_require__(/*! ./sqs-publish-failed.error */ "./libs/shared/src/messaging/sqs-publish-failed.error.ts");
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


/***/ },

/***/ "./libs/shared/src/messaging/sqs-client.ts"
/*!*************************************************!*\
  !*** ./libs/shared/src/messaging/sqs-client.ts ***!
  \*************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.create_sqs_client = create_sqs_client;
const client_sqs_1 = __webpack_require__(/*! @aws-sdk/client-sqs */ "@aws-sdk/client-sqs");
function create_sqs_client(options) {
    const config = {
        region: options.region,
        ...(options.endpoint ? { endpoint: options.endpoint } : {}),
        ...(options.credentials ? { credentials: options.credentials } : {}),
    };
    return new client_sqs_1.SQSClient(config);
}


/***/ },

/***/ "./libs/shared/src/messaging/sqs-idempotency.port.ts"
/*!***********************************************************!*\
  !*** ./libs/shared/src/messaging/sqs-idempotency.port.ts ***!
  \***********************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ "./libs/shared/src/messaging/sqs-message.interface.ts"
/*!************************************************************!*\
  !*** ./libs/shared/src/messaging/sqs-message.interface.ts ***!
  \************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ "./libs/shared/src/messaging/sqs-publish-failed.error.ts"
/*!***************************************************************!*\
  !*** ./libs/shared/src/messaging/sqs-publish-failed.error.ts ***!
  \***************************************************************/
(__unused_webpack_module, exports) {


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


/***/ },

/***/ "./libs/shared/src/messaging/sqs.tokens.ts"
/*!*************************************************!*\
  !*** ./libs/shared/src/messaging/sqs.tokens.ts ***!
  \*************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QUEUES_CONFIG = exports.SQS_CLIENT = void 0;
exports.SQS_CLIENT = Symbol('SQS_CLIENT');
exports.QUEUES_CONFIG = Symbol('QUEUES_CONFIG');


/***/ },

/***/ "./libs/shared/src/utils/date.utils.ts"
/*!*********************************************!*\
  !*** ./libs/shared/src/utils/date.utils.ts ***!
  \*********************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.to_iso_utc = to_iso_utc;
exports.is_before = is_before;
function to_iso_utc(date) {
    return date.toISOString();
}
function is_before(a, b) {
    return a.getTime() < b.getTime();
}


/***/ },

/***/ "./libs/shared/src/utils/error-codes.ts"
/*!**********************************************!*\
  !*** ./libs/shared/src/utils/error-codes.ts ***!
  \**********************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceErrorCode = void 0;
var ServiceErrorCode;
(function (ServiceErrorCode) {
    ServiceErrorCode["VALIDATION_FAILED"] = "VALIDATION_FAILED";
    ServiceErrorCode["NOT_FOUND"] = "NOT_FOUND";
    ServiceErrorCode["CONFLICT"] = "CONFLICT";
    ServiceErrorCode["INTERNAL"] = "INTERNAL";
})(ServiceErrorCode || (exports.ServiceErrorCode = ServiceErrorCode = {}));


/***/ },

/***/ "./libs/shared/src/utils/id-generator.ts"
/*!***********************************************!*\
  !*** ./libs/shared/src/utils/id-generator.ts ***!
  \***********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.new_uuid = new_uuid;
const crypto_1 = __webpack_require__(/*! crypto */ "crypto");
function new_uuid() {
    return (0, crypto_1.randomUUID)();
}


/***/ },

/***/ "./libs/shared/src/utils/logger.ts"
/*!*****************************************!*\
  !*** ./libs/shared/src/utils/logger.ts ***!
  \*****************************************/
(__unused_webpack_module, exports) {


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


/***/ },

/***/ "./libs/shared/src/utils/pagination.dto.ts"
/*!*************************************************!*\
  !*** ./libs/shared/src/utils/pagination.dto.ts ***!
  \*************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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


/***/ },

/***/ "./libs/suppliers-data/src/entities/bank-account.entity.ts"
/*!*****************************************************************!*\
  !*** ./libs/suppliers-data/src/entities/bank-account.entity.ts ***!
  \*****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_external_id_entity_1 = __webpack_require__(/*! ./base-external-id.entity */ "./libs/suppliers-data/src/entities/base-external-id.entity.ts");
const aes_256_transformer_1 = __webpack_require__(/*! ../transformers/aes-256.transformer */ "./libs/suppliers-data/src/transformers/aes-256.transformer.ts");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
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


/***/ },

/***/ "./libs/suppliers-data/src/entities/base-external-id.entity.ts"
/*!*********************************************************************!*\
  !*** ./libs/suppliers-data/src/entities/base-external-id.entity.ts ***!
  \*********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
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


/***/ },

/***/ "./libs/suppliers-data/src/entities/business-seniority.entity.ts"
/*!***********************************************************************!*\
  !*** ./libs/suppliers-data/src/entities/business-seniority.entity.ts ***!
  \***********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_external_id_entity_1 = __webpack_require__(/*! ./base-external-id.entity */ "./libs/suppliers-data/src/entities/base-external-id.entity.ts");
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


/***/ },

/***/ "./libs/suppliers-data/src/entities/business.entity.ts"
/*!*************************************************************!*\
  !*** ./libs/suppliers-data/src/entities/business.entity.ts ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const person_entity_1 = __webpack_require__(/*! ../../../transversal-data/src/entities/person.entity */ "./libs/transversal-data/src/entities/person.entity.ts");
const base_external_id_entity_1 = __webpack_require__(/*! ./base-external-id.entity */ "./libs/suppliers-data/src/entities/base-external-id.entity.ts");
const business_seniority_entity_1 = __webpack_require__(/*! ./business-seniority.entity */ "./libs/suppliers-data/src/entities/business-seniority.entity.ts");
const city_entity_1 = __webpack_require__(/*! ../../../transversal-data/src/entities/city.entity */ "./libs/transversal-data/src/entities/city.entity.ts");
let BusinessEntity = class BusinessEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    person;
    personId;
    businessSeniority;
    businessSeniorityId;
    city;
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
    (0, typeorm_1.OneToOne)(() => city_entity_1.CityEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'city_id', referencedColumnName: 'id' }),
    __metadata("design:type", typeof (_c = typeof city_entity_1.CityEntity !== "undefined" && city_entity_1.CityEntity) === "function" ? _c : Object)
], BusinessEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.RelationId)((b) => b.city),
    __metadata("design:type", Number)
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


/***/ },

/***/ "./libs/suppliers-data/src/entities/legal-representative.entity.ts"
/*!*************************************************************************!*\
  !*** ./libs/suppliers-data/src/entities/legal-representative.entity.ts ***!
  \*************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const person_entity_1 = __webpack_require__(/*! ../../../transversal-data/src/entities/person.entity */ "./libs/transversal-data/src/entities/person.entity.ts");
const base_external_id_entity_1 = __webpack_require__(/*! ./base-external-id.entity */ "./libs/suppliers-data/src/entities/base-external-id.entity.ts");
const business_entity_1 = __webpack_require__(/*! ./business.entity */ "./libs/suppliers-data/src/entities/business.entity.ts");
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


/***/ },

/***/ "./libs/suppliers-data/src/entities/order.entity.ts"
/*!**********************************************************!*\
  !*** ./libs/suppliers-data/src/entities/order.entity.ts ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_external_id_entity_1 = __webpack_require__(/*! ./base-external-id.entity */ "./libs/suppliers-data/src/entities/base-external-id.entity.ts");
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


/***/ },

/***/ "./libs/suppliers-data/src/entities/partner-onboarding-saga.entity.ts"
/*!****************************************************************************!*\
  !*** ./libs/suppliers-data/src/entities/partner-onboarding-saga.entity.ts ***!
  \****************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
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


/***/ },

/***/ "./libs/suppliers-data/src/entities/partners.entity.ts"
/*!*************************************************************!*\
  !*** ./libs/suppliers-data/src/entities/partners.entity.ts ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const category_entity_1 = __webpack_require__(/*! ../../../products-data/src/entities/category.entity */ "./libs/products-data/src/entities/category.entity.ts");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
const base_external_id_entity_1 = __webpack_require__(/*! ./base-external-id.entity */ "./libs/suppliers-data/src/entities/base-external-id.entity.ts");
const business_entity_1 = __webpack_require__(/*! ./business.entity */ "./libs/suppliers-data/src/entities/business.entity.ts");
const sales_representative_entity_1 = __webpack_require__(/*! ./sales-representative.entity */ "./libs/suppliers-data/src/entities/sales-representative.entity.ts");
const supplier_entity_1 = __webpack_require__(/*! ./supplier.entity */ "./libs/suppliers-data/src/entities/supplier.entity.ts");
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


/***/ },

/***/ "./libs/suppliers-data/src/entities/sales-representative.entity.ts"
/*!*************************************************************************!*\
  !*** ./libs/suppliers-data/src/entities/sales-representative.entity.ts ***!
  \*************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
const base_external_id_entity_1 = __webpack_require__(/*! ./base-external-id.entity */ "./libs/suppliers-data/src/entities/base-external-id.entity.ts");
const partners_entity_1 = __webpack_require__(/*! ./partners.entity */ "./libs/suppliers-data/src/entities/partners.entity.ts");
const transversal_data_1 = __webpack_require__(/*! @app/transversal-data */ "./libs/transversal-data/src/index.ts");
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


/***/ },

/***/ "./libs/suppliers-data/src/entities/shareholder.entity.ts"
/*!****************************************************************!*\
  !*** ./libs/suppliers-data/src/entities/shareholder.entity.ts ***!
  \****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const person_entity_1 = __webpack_require__(/*! ../../../transversal-data/src/entities/person.entity */ "./libs/transversal-data/src/entities/person.entity.ts");
const base_external_id_entity_1 = __webpack_require__(/*! ./base-external-id.entity */ "./libs/suppliers-data/src/entities/base-external-id.entity.ts");
const business_entity_1 = __webpack_require__(/*! ./business.entity */ "./libs/suppliers-data/src/entities/business.entity.ts");
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


/***/ },

/***/ "./libs/suppliers-data/src/entities/supplier.entity.ts"
/*!*************************************************************!*\
  !*** ./libs/suppliers-data/src/entities/supplier.entity.ts ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_external_id_entity_1 = __webpack_require__(/*! ./base-external-id.entity */ "./libs/suppliers-data/src/entities/base-external-id.entity.ts");
const bank_account_entity_1 = __webpack_require__(/*! ./bank-account.entity */ "./libs/suppliers-data/src/entities/bank-account.entity.ts");
const business_entity_1 = __webpack_require__(/*! ./business.entity */ "./libs/suppliers-data/src/entities/business.entity.ts");
const partners_entity_1 = __webpack_require__(/*! ./partners.entity */ "./libs/suppliers-data/src/entities/partners.entity.ts");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
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


/***/ },

/***/ "./libs/suppliers-data/src/index.ts"
/*!******************************************!*\
  !*** ./libs/suppliers-data/src/index.ts ***!
  \******************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
__exportStar(__webpack_require__(/*! ./suppliers-data.entities */ "./libs/suppliers-data/src/suppliers-data.entities.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/bank-account.entity */ "./libs/suppliers-data/src/entities/bank-account.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/business.entity */ "./libs/suppliers-data/src/entities/business.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/business-seniority.entity */ "./libs/suppliers-data/src/entities/business-seniority.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/legal-representative.entity */ "./libs/suppliers-data/src/entities/legal-representative.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/partners.entity */ "./libs/suppliers-data/src/entities/partners.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/partner-onboarding-saga.entity */ "./libs/suppliers-data/src/entities/partner-onboarding-saga.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/order.entity */ "./libs/suppliers-data/src/entities/order.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/sales-representative.entity */ "./libs/suppliers-data/src/entities/sales-representative.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/shareholder.entity */ "./libs/suppliers-data/src/entities/shareholder.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/supplier.entity */ "./libs/suppliers-data/src/entities/supplier.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./suppliers-data.module */ "./libs/suppliers-data/src/suppliers-data.module.ts"), exports);
__exportStar(__webpack_require__(/*! ./suppliers-data.service */ "./libs/suppliers-data/src/suppliers-data.service.ts"), exports);
__exportStar(__webpack_require__(/*! ./transformers/aes-256.transformer */ "./libs/suppliers-data/src/transformers/aes-256.transformer.ts"), exports);


/***/ },

/***/ "./libs/suppliers-data/src/suppliers-data.entities.ts"
/*!************************************************************!*\
  !*** ./libs/suppliers-data/src/suppliers-data.entities.ts ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SUPPLIERS_DATA_ENTITIES = void 0;
const bank_account_entity_1 = __webpack_require__(/*! ./entities/bank-account.entity */ "./libs/suppliers-data/src/entities/bank-account.entity.ts");
const business_entity_1 = __webpack_require__(/*! ./entities/business.entity */ "./libs/suppliers-data/src/entities/business.entity.ts");
const business_seniority_entity_1 = __webpack_require__(/*! ./entities/business-seniority.entity */ "./libs/suppliers-data/src/entities/business-seniority.entity.ts");
const legal_representative_entity_1 = __webpack_require__(/*! ./entities/legal-representative.entity */ "./libs/suppliers-data/src/entities/legal-representative.entity.ts");
const partners_entity_1 = __webpack_require__(/*! ./entities/partners.entity */ "./libs/suppliers-data/src/entities/partners.entity.ts");
const order_entity_1 = __webpack_require__(/*! ./entities/order.entity */ "./libs/suppliers-data/src/entities/order.entity.ts");
const sales_representative_entity_1 = __webpack_require__(/*! ./entities/sales-representative.entity */ "./libs/suppliers-data/src/entities/sales-representative.entity.ts");
const shareholder_entity_1 = __webpack_require__(/*! ./entities/shareholder.entity */ "./libs/suppliers-data/src/entities/shareholder.entity.ts");
const supplier_entity_1 = __webpack_require__(/*! ./entities/supplier.entity */ "./libs/suppliers-data/src/entities/supplier.entity.ts");
const partner_onboarding_saga_entity_1 = __webpack_require__(/*! ./entities/partner-onboarding-saga.entity */ "./libs/suppliers-data/src/entities/partner-onboarding-saga.entity.ts");
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


/***/ },

/***/ "./libs/suppliers-data/src/suppliers-data.module.ts"
/*!**********************************************************!*\
  !*** ./libs/suppliers-data/src/suppliers-data.module.ts ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SuppliersDataModule = exports.SUPPLIERS_DATA_ENTITIES = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const suppliers_data_service_1 = __webpack_require__(/*! ./suppliers-data.service */ "./libs/suppliers-data/src/suppliers-data.service.ts");
const suppliers_data_entities_1 = __webpack_require__(/*! ./suppliers-data.entities */ "./libs/suppliers-data/src/suppliers-data.entities.ts");
var suppliers_data_entities_2 = __webpack_require__(/*! ./suppliers-data.entities */ "./libs/suppliers-data/src/suppliers-data.entities.ts");
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


/***/ },

/***/ "./libs/suppliers-data/src/suppliers-data.service.ts"
/*!***********************************************************!*\
  !*** ./libs/suppliers-data/src/suppliers-data.service.ts ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SuppliersDataService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let SuppliersDataService = class SuppliersDataService {
};
exports.SuppliersDataService = SuppliersDataService;
exports.SuppliersDataService = SuppliersDataService = __decorate([
    (0, common_1.Injectable)()
], SuppliersDataService);


/***/ },

/***/ "./libs/suppliers-data/src/transformers/aes-256.transformer.ts"
/*!*********************************************************************!*\
  !*** ./libs/suppliers-data/src/transformers/aes-256.transformer.ts ***!
  \*********************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BankAccountEncryptionTransformer = void 0;
exports.BankAccountEncryptionTransformer = {
    to: (value) => value,
    from: (value) => value,
};


/***/ },

/***/ "./libs/transversal-data/src/adapters/typeorm-sqs-idempotency-poll.base-adapter.ts"
/*!*****************************************************************************************!*\
  !*** ./libs/transversal-data/src/adapters/typeorm-sqs-idempotency-poll.base-adapter.ts ***!
  \*****************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TypeormSqsIdempotencyPollBaseAdapter = void 0;
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
class TypeormSqsIdempotencyPollBaseAdapter {
    repo;
    poll_config;
    constructor(repo, poll_config) {
        this.repo = repo;
        this.poll_config = poll_config;
    }
    async wait_for_completed_result(idempotency_key) {
        const deadline = Date.now() + this.poll_config.timeout_ms;
        while (Date.now() < deadline) {
            const row = await this.repo.findOne({
                where: { idempotency_key },
                select: { result: true },
            });
            const raw = row?.result;
            if (raw !== null && raw !== undefined && this.validate_result(raw)) {
                return raw;
            }
            await sleep(this.poll_config.interval_ms);
        }
        throw new Error(`[SqsIdempotencyPoll] Tiempo de espera agotado (${this.poll_config.timeout_ms}ms) para la clave: ${idempotency_key}`);
    }
}
exports.TypeormSqsIdempotencyPollBaseAdapter = TypeormSqsIdempotencyPollBaseAdapter;


/***/ },

/***/ "./libs/transversal-data/src/adapters/typeorm-sqs-idempotency.base-adapter.ts"
/*!************************************************************************************!*\
  !*** ./libs/transversal-data/src/adapters/typeorm-sqs-idempotency.base-adapter.ts ***!
  \************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TypeormSqsIdempotencyBaseAdapter = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const PG_UNIQUE_VIOLATION = '23505';
const STALE_PROCESSING_MS = 30 * 60 * 1000;
class TypeormSqsIdempotencyBaseAdapter {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async begin(key, correlation_id) {
        const row = this.repo.create({
            idempotency_key: key,
            correlation_id,
            result: null,
        });
        try {
            await this.repo.save(row);
            return { status: 'proceed' };
        }
        catch (err) {
            if (!this.is_unique_violation(err)) {
                throw err;
            }
        }
        const existing = await this.repo.findOne({
            where: { idempotency_key: key },
        });
        if (existing === null) {
            return { status: 'conflict' };
        }
        if (existing.result !== null && existing.result !== undefined) {
            return { status: 'duplicate', result: existing.result };
        }
        const age_ms = Date.now() - existing.created_at.getTime();
        if (age_ms > STALE_PROCESSING_MS) {
            await this.repo.delete({ idempotency_key: key });
            return this.begin(key, correlation_id);
        }
        return { status: 'conflict' };
    }
    async complete(key, result) {
        await this.repo.update({ idempotency_key: key }, { result });
    }
    async release(key) {
        await this.repo.delete({ idempotency_key: key });
    }
    is_unique_violation(err) {
        return err instanceof typeorm_1.QueryFailedError && err.driverError !== undefined
            ? String(err.driverError.code) === PG_UNIQUE_VIOLATION
            : false;
    }
}
exports.TypeormSqsIdempotencyBaseAdapter = TypeormSqsIdempotencyBaseAdapter;


/***/ },

/***/ "./libs/transversal-data/src/entities/audit-log.entity.ts"
/*!****************************************************************!*\
  !*** ./libs/transversal-data/src/entities/audit-log.entity.ts ***!
  \****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.AuditLogEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
const user_entity_1 = __webpack_require__(/*! ./user.entity */ "./libs/transversal-data/src/entities/user.entity.ts");
let AuditLogEntity = class AuditLogEntity {
    id;
    externalId;
    entityType;
    entityId;
    action;
    fieldName;
    oldValue;
    newValue;
    reasonCode;
    notes;
    performedBy;
    performedById;
    performedAt;
};
exports.AuditLogEntity = AuditLogEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], AuditLogEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'external_id',
        type: 'uuid',
        unique: true,
        insert: false,
        update: false,
    }),
    __metadata("design:type", String)
], AuditLogEntity.prototype, "externalId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'entity_type',
        type: 'enum',
        enum: shared_1.EntityType,
        enumName: 'audit_log_entity_type',
    }),
    __metadata("design:type", typeof (_a = typeof shared_1.EntityType !== "undefined" && shared_1.EntityType) === "function" ? _a : Object)
], AuditLogEntity.prototype, "entityType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'entity_id', type: 'bigint' }),
    __metadata("design:type", Number)
], AuditLogEntity.prototype, "entityId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'action',
        type: 'enum',
        enum: shared_1.ActionType,
        enumName: 'audit_log_action_type',
    }),
    __metadata("design:type", typeof (_b = typeof shared_1.ActionType !== "undefined" && shared_1.ActionType) === "function" ? _b : Object)
], AuditLogEntity.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'field_name', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], AuditLogEntity.prototype, "fieldName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'old_value', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], AuditLogEntity.prototype, "oldValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'new_value', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], AuditLogEntity.prototype, "newValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reason_code', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], AuditLogEntity.prototype, "reasonCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'notes', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], AuditLogEntity.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, {
        nullable: false,
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'performed_by', referencedColumnName: 'id' }),
    __metadata("design:type", typeof (_c = typeof user_entity_1.UserEntity !== "undefined" && user_entity_1.UserEntity) === "function" ? _c : Object)
], AuditLogEntity.prototype, "performedBy", void 0);
__decorate([
    (0, typeorm_1.RelationId)((a) => a.performedBy),
    __metadata("design:type", Number)
], AuditLogEntity.prototype, "performedById", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'performed_at', type: 'timestamptz' }),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], AuditLogEntity.prototype, "performedAt", void 0);
exports.AuditLogEntity = AuditLogEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'audit_logs', schema: 'transversal_schema' }),
    (0, typeorm_1.Index)('IDX_audit_logs_entity_type_entity_id', ['entityType', 'entityId']),
    (0, typeorm_1.Index)('IDX_audit_logs_performed_at', ['performedAt'])
], AuditLogEntity);


/***/ },

/***/ "./libs/transversal-data/src/entities/base-external-id.entity.ts"
/*!***********************************************************************!*\
  !*** ./libs/transversal-data/src/entities/base-external-id.entity.ts ***!
  \***********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
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


/***/ },

/***/ "./libs/transversal-data/src/entities/base-sqs-idempotency.entity.ts"
/*!***************************************************************************!*\
  !*** ./libs/transversal-data/src/entities/base-sqs-idempotency.entity.ts ***!
  \***************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.BaseSqsIdempotencyEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
class BaseSqsIdempotencyEntity {
    id;
    idempotency_key;
    correlation_id;
    result;
    created_at;
}
exports.BaseSqsIdempotencyEntity = BaseSqsIdempotencyEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", String)
], BaseSqsIdempotencyEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'idempotency_key', type: 'varchar', length: 512, unique: true }),
    __metadata("design:type", String)
], BaseSqsIdempotencyEntity.prototype, "idempotency_key", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'correlation_id', type: 'uuid' }),
    __metadata("design:type", String)
], BaseSqsIdempotencyEntity.prototype, "correlation_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'result', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], BaseSqsIdempotencyEntity.prototype, "result", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], BaseSqsIdempotencyEntity.prototype, "created_at", void 0);


/***/ },

/***/ "./libs/transversal-data/src/entities/catalog-status-types.entity.ts"
/*!***************************************************************************!*\
  !*** ./libs/transversal-data/src/entities/catalog-status-types.entity.ts ***!
  \***************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.StatusEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
const base_external_id_entity_1 = __webpack_require__(/*! ../../../products-data/src/entities/base-external-id.entity */ "./libs/products-data/src/entities/base-external-id.entity.ts");
let StatusEntity = class StatusEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    entityType;
    code;
    displayName;
    description;
    isActive;
    get state() {
        return this.isActive
            ? shared_1.CatalogActivationState.ACTIVE
            : shared_1.CatalogActivationState.INACTIVE;
    }
    set state(v) {
        this.isActive = v === shared_1.CatalogActivationState.ACTIVE;
    }
};
exports.StatusEntity = StatusEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'entity_type', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], StatusEntity.prototype, "entityType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'code', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], StatusEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'display_name', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], StatusEntity.prototype, "displayName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'description', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], StatusEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], StatusEntity.prototype, "isActive", void 0);
exports.StatusEntity = StatusEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'catalog_status_types', schema: 'transversal_schema' }),
    (0, typeorm_1.Index)(['entityType', 'code'], { unique: true })
], StatusEntity);


/***/ },

/***/ "./libs/transversal-data/src/entities/city.entity.ts"
/*!***********************************************************!*\
  !*** ./libs/transversal-data/src/entities/city.entity.ts ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_external_id_entity_1 = __webpack_require__(/*! ../../../products-data/src/entities/base-external-id.entity */ "./libs/products-data/src/entities/base-external-id.entity.ts");
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


/***/ },

/***/ "./libs/transversal-data/src/entities/currency.entity.ts"
/*!***************************************************************!*\
  !*** ./libs/transversal-data/src/entities/currency.entity.ts ***!
  \***************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.CurrencyEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
const base_external_id_entity_1 = __webpack_require__(/*! ../../../products-data/src/entities/base-external-id.entity */ "./libs/products-data/src/entities/base-external-id.entity.ts");
let CurrencyEntity = class CurrencyEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    code;
    name;
    symbol;
    decimalPlaces;
    thousandSeparator;
    decimalSeparator;
    isActive;
    get state() {
        return this.isActive
            ? shared_1.CatalogActivationState.ACTIVE
            : shared_1.CatalogActivationState.INACTIVE;
    }
    set state(v) {
        this.isActive = v === shared_1.CatalogActivationState.ACTIVE;
    }
};
exports.CurrencyEntity = CurrencyEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'code', type: 'varchar', length: 3 }),
    __metadata("design:type", String)
], CurrencyEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name', type: 'varchar', length: 120 }),
    __metadata("design:type", String)
], CurrencyEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'symbol', type: 'varchar', length: 10, nullable: true }),
    __metadata("design:type", Object)
], CurrencyEntity.prototype, "symbol", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'decimal_places', type: 'int', default: 2 }),
    __metadata("design:type", Number)
], CurrencyEntity.prototype, "decimalPlaces", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'thousand_separator',
        type: 'varchar',
        length: 1,
        nullable: true,
    }),
    __metadata("design:type", Object)
], CurrencyEntity.prototype, "thousandSeparator", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'decimal_separator',
        type: 'varchar',
        length: 1,
        nullable: true,
    }),
    __metadata("design:type", Object)
], CurrencyEntity.prototype, "decimalSeparator", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], CurrencyEntity.prototype, "isActive", void 0);
exports.CurrencyEntity = CurrencyEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'currencies', schema: 'transversal_schema' }),
    (0, typeorm_1.Index)(['code'], { unique: true })
], CurrencyEntity);


/***/ },

/***/ "./libs/transversal-data/src/entities/global-param.entity.ts"
/*!*******************************************************************!*\
  !*** ./libs/transversal-data/src/entities/global-param.entity.ts ***!
  \*******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.GlobalParamEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const user_entity_1 = __webpack_require__(/*! ./user.entity */ "./libs/transversal-data/src/entities/user.entity.ts");
let GlobalParamEntity = class GlobalParamEntity {
    id;
    externalId;
    code;
    value;
    description;
    validFrom;
    createdBy;
    createdById;
    createdAt;
};
exports.GlobalParamEntity = GlobalParamEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], GlobalParamEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'external_id',
        type: 'uuid',
        unique: true,
        insert: false,
        update: false,
    }),
    __metadata("design:type", String)
], GlobalParamEntity.prototype, "externalId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'code', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], GlobalParamEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'value', type: 'jsonb' }),
    __metadata("design:type", Object)
], GlobalParamEntity.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'description', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], GlobalParamEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'valid_from', type: 'date' }),
    __metadata("design:type", String)
], GlobalParamEntity.prototype, "validFrom", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, {
        nullable: false,
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by', referencedColumnName: 'id' }),
    __metadata("design:type", typeof (_a = typeof user_entity_1.UserEntity !== "undefined" && user_entity_1.UserEntity) === "function" ? _a : Object)
], GlobalParamEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.RelationId)((g) => g.createdBy),
    __metadata("design:type", Number)
], GlobalParamEntity.prototype, "createdById", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
        type: 'timestamptz',
        insert: false,
        update: false,
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], GlobalParamEntity.prototype, "createdAt", void 0);
exports.GlobalParamEntity = GlobalParamEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'global_params', schema: 'transversal_schema' }),
    (0, typeorm_1.Index)('UQ_global_params_code_valid_from', ['code', 'validFrom'], { unique: true })
], GlobalParamEntity);


/***/ },

/***/ "./libs/transversal-data/src/entities/partner-create-user-sqs-idempotency.entity.ts"
/*!******************************************************************************************!*\
  !*** ./libs/transversal-data/src/entities/partner-create-user-sqs-idempotency.entity.ts ***!
  \******************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PartnerCreateUserSqsIdempotencyEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_sqs_idempotency_entity_1 = __webpack_require__(/*! ./base-sqs-idempotency.entity */ "./libs/transversal-data/src/entities/base-sqs-idempotency.entity.ts");
let PartnerCreateUserSqsIdempotencyEntity = class PartnerCreateUserSqsIdempotencyEntity extends base_sqs_idempotency_entity_1.BaseSqsIdempotencyEntity {
    result = null;
};
exports.PartnerCreateUserSqsIdempotencyEntity = PartnerCreateUserSqsIdempotencyEntity;
exports.PartnerCreateUserSqsIdempotencyEntity = PartnerCreateUserSqsIdempotencyEntity = __decorate([
    (0, typeorm_1.Entity)({ schema: 'transversal_schema', name: 'partner_create_user_sqs_idempotency' })
], PartnerCreateUserSqsIdempotencyEntity);


/***/ },

/***/ "./libs/transversal-data/src/entities/permission.entity.ts"
/*!*****************************************************************!*\
  !*** ./libs/transversal-data/src/entities/permission.entity.ts ***!
  \*****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PermissionEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_external_id_entity_1 = __webpack_require__(/*! ../../../products-data/src/entities/base-external-id.entity */ "./libs/products-data/src/entities/base-external-id.entity.ts");
let PermissionEntity = class PermissionEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    code;
    description;
};
exports.PermissionEntity = PermissionEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'code', type: 'varchar', length: 120, unique: true }),
    __metadata("design:type", String)
], PermissionEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'description', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], PermissionEntity.prototype, "description", void 0);
exports.PermissionEntity = PermissionEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'permissions', schema: 'transversal_schema' })
], PermissionEntity);


/***/ },

/***/ "./libs/transversal-data/src/entities/person.entity.ts"
/*!*************************************************************!*\
  !*** ./libs/transversal-data/src/entities/person.entity.ts ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PersonEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_external_id_entity_1 = __webpack_require__(/*! ../../../products-data/src/entities/base-external-id.entity */ "./libs/products-data/src/entities/base-external-id.entity.ts");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
const city_entity_1 = __webpack_require__(/*! ./city.entity */ "./libs/transversal-data/src/entities/city.entity.ts");
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
    cityId;
    bankAccountId;
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
    (0, typeorm_1.RelationId)((p) => p.city),
    __metadata("design:type", Number)
], PersonEntity.prototype, "cityId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bank_account_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], PersonEntity.prototype, "bankAccountId", void 0);
exports.PersonEntity = PersonEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'persons', schema: 'transversal_schema' })
], PersonEntity);


/***/ },

/***/ "./libs/transversal-data/src/entities/role-permission.entity.ts"
/*!**********************************************************************!*\
  !*** ./libs/transversal-data/src/entities/role-permission.entity.ts ***!
  \**********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.RolePermissionEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_external_id_entity_1 = __webpack_require__(/*! ../../../products-data/src/entities/base-external-id.entity */ "./libs/products-data/src/entities/base-external-id.entity.ts");
let RolePermissionEntity = class RolePermissionEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    roleId;
    permissionId;
};
exports.RolePermissionEntity = RolePermissionEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'role_id', type: 'bigint' }),
    __metadata("design:type", Number)
], RolePermissionEntity.prototype, "roleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'permission_id', type: 'bigint' }),
    __metadata("design:type", Number)
], RolePermissionEntity.prototype, "permissionId", void 0);
exports.RolePermissionEntity = RolePermissionEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'role_permissions', schema: 'transversal_schema' }),
    (0, typeorm_1.Index)(['roleId', 'permissionId'], { unique: true })
], RolePermissionEntity);


/***/ },

/***/ "./libs/transversal-data/src/entities/role.entity.ts"
/*!***********************************************************!*\
  !*** ./libs/transversal-data/src/entities/role.entity.ts ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.RoleEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
const base_external_id_entity_1 = __webpack_require__(/*! ./base-external-id.entity */ "./libs/transversal-data/src/entities/base-external-id.entity.ts");
let RoleEntity = class RoleEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    name;
    description;
};
exports.RoleEntity = RoleEntity;
__decorate([
    (0, typeorm_1.Column)({
        name: 'name',
        type: 'enum',
        enum: shared_1.Roles,
        enumName: 'roles_name',
        unique: true,
    }),
    __metadata("design:type", typeof (_a = typeof shared_1.Roles !== "undefined" && shared_1.Roles) === "function" ? _a : Object)
], RoleEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'description', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], RoleEntity.prototype, "description", void 0);
exports.RoleEntity = RoleEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'roles', schema: 'transversal_schema' })
], RoleEntity);


/***/ },

/***/ "./libs/transversal-data/src/entities/upload-files-idempotency.entity.ts"
/*!*******************************************************************************!*\
  !*** ./libs/transversal-data/src/entities/upload-files-idempotency.entity.ts ***!
  \*******************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadFilesIdempotencyEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_sqs_idempotency_entity_1 = __webpack_require__(/*! ./base-sqs-idempotency.entity */ "./libs/transversal-data/src/entities/base-sqs-idempotency.entity.ts");
let UploadFilesIdempotencyEntity = class UploadFilesIdempotencyEntity extends base_sqs_idempotency_entity_1.BaseSqsIdempotencyEntity {
    result = null;
};
exports.UploadFilesIdempotencyEntity = UploadFilesIdempotencyEntity;
exports.UploadFilesIdempotencyEntity = UploadFilesIdempotencyEntity = __decorate([
    (0, typeorm_1.Entity)({ schema: 'transversal_schema', name: 'upload_files_idempotency' })
], UploadFilesIdempotencyEntity);


/***/ },

/***/ "./libs/transversal-data/src/entities/user.entity.ts"
/*!***********************************************************!*\
  !*** ./libs/transversal-data/src/entities/user.entity.ts ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.UserEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const role_entity_1 = __webpack_require__(/*! ./role.entity */ "./libs/transversal-data/src/entities/role.entity.ts");
const person_entity_1 = __webpack_require__(/*! ./person.entity */ "./libs/transversal-data/src/entities/person.entity.ts");
const base_external_id_entity_1 = __webpack_require__(/*! ./base-external-id.entity */ "./libs/transversal-data/src/entities/base-external-id.entity.ts");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
let UserEntity = class UserEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    cognitoSub;
    email;
    role;
    roleId;
    parent;
    parent_id;
    children;
    state;
    person;
    lastLoginAt;
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'cognito_sub', type: 'uuid', unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "cognitoSub", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email', type: 'varchar', length: 320, unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => role_entity_1.RoleEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'role_id', referencedColumnName: 'id' }),
    __metadata("design:type", typeof (_a = typeof role_entity_1.RoleEntity !== "undefined" && role_entity_1.RoleEntity) === "function" ? _a : Object)
], UserEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.RelationId)((u) => u.role),
    __metadata("design:type", Number)
], UserEntity.prototype, "roleId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => UserEntity, (user) => user.children, {
        nullable: true,
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'parent_id', referencedColumnName: 'id' }),
    __metadata("design:type", Object)
], UserEntity.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.RelationId)((u) => u.parent),
    __metadata("design:type", Object)
], UserEntity.prototype, "parent_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserEntity, (user) => user.parent),
    __metadata("design:type", Array)
], UserEntity.prototype, "children", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'state',
        type: 'enum',
        enum: shared_1.UserState,
        enumName: 'user_state',
        default: shared_1.UserState.ACTIVE,
    }),
    __metadata("design:type", typeof (_b = typeof shared_1.UserState !== "undefined" && shared_1.UserState) === "function" ? _b : Object)
], UserEntity.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => person_entity_1.PersonEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'person_id', referencedColumnName: 'id' }),
    __metadata("design:type", typeof (_c = typeof person_entity_1.PersonEntity !== "undefined" && person_entity_1.PersonEntity) === "function" ? _c : Object)
], UserEntity.prototype, "person", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_login_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], UserEntity.prototype, "lastLoginAt", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'users', schema: 'transversal_schema' })
], UserEntity);


/***/ },

/***/ "./libs/transversal-data/src/index.ts"
/*!********************************************!*\
  !*** ./libs/transversal-data/src/index.ts ***!
  \********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
__exportStar(__webpack_require__(/*! ./transversal-data.entities */ "./libs/transversal-data/src/transversal-data.entities.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/base-sqs-idempotency.entity */ "./libs/transversal-data/src/entities/base-sqs-idempotency.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/city.entity */ "./libs/transversal-data/src/entities/city.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/currency.entity */ "./libs/transversal-data/src/entities/currency.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/permission.entity */ "./libs/transversal-data/src/entities/permission.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/person.entity */ "./libs/transversal-data/src/entities/person.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/role.entity */ "./libs/transversal-data/src/entities/role.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/role-permission.entity */ "./libs/transversal-data/src/entities/role-permission.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/catalog-status-types.entity */ "./libs/transversal-data/src/entities/catalog-status-types.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/partner-create-user-sqs-idempotency.entity */ "./libs/transversal-data/src/entities/partner-create-user-sqs-idempotency.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/upload-files-idempotency.entity */ "./libs/transversal-data/src/entities/upload-files-idempotency.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/user.entity */ "./libs/transversal-data/src/entities/user.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/global-param.entity */ "./libs/transversal-data/src/entities/global-param.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/audit-log.entity */ "./libs/transversal-data/src/entities/audit-log.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./adapters/typeorm-sqs-idempotency.base-adapter */ "./libs/transversal-data/src/adapters/typeorm-sqs-idempotency.base-adapter.ts"), exports);
__exportStar(__webpack_require__(/*! ./adapters/typeorm-sqs-idempotency-poll.base-adapter */ "./libs/transversal-data/src/adapters/typeorm-sqs-idempotency-poll.base-adapter.ts"), exports);
__exportStar(__webpack_require__(/*! ./transversal-data.module */ "./libs/transversal-data/src/transversal-data.module.ts"), exports);
__exportStar(__webpack_require__(/*! ./transversal-data.service */ "./libs/transversal-data/src/transversal-data.service.ts"), exports);


/***/ },

/***/ "./libs/transversal-data/src/transversal-data.entities.ts"
/*!****************************************************************!*\
  !*** ./libs/transversal-data/src/transversal-data.entities.ts ***!
  \****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TRANSVERSAL_DATA_ENTITIES = void 0;
const city_entity_1 = __webpack_require__(/*! ./entities/city.entity */ "./libs/transversal-data/src/entities/city.entity.ts");
const currency_entity_1 = __webpack_require__(/*! ./entities/currency.entity */ "./libs/transversal-data/src/entities/currency.entity.ts");
const permission_entity_1 = __webpack_require__(/*! ./entities/permission.entity */ "./libs/transversal-data/src/entities/permission.entity.ts");
const person_entity_1 = __webpack_require__(/*! ./entities/person.entity */ "./libs/transversal-data/src/entities/person.entity.ts");
const role_entity_1 = __webpack_require__(/*! ./entities/role.entity */ "./libs/transversal-data/src/entities/role.entity.ts");
const role_permission_entity_1 = __webpack_require__(/*! ./entities/role-permission.entity */ "./libs/transversal-data/src/entities/role-permission.entity.ts");
const catalog_status_types_entity_1 = __webpack_require__(/*! ./entities/catalog-status-types.entity */ "./libs/transversal-data/src/entities/catalog-status-types.entity.ts");
const partner_create_user_sqs_idempotency_entity_1 = __webpack_require__(/*! ./entities/partner-create-user-sqs-idempotency.entity */ "./libs/transversal-data/src/entities/partner-create-user-sqs-idempotency.entity.ts");
const upload_files_idempotency_entity_1 = __webpack_require__(/*! ./entities/upload-files-idempotency.entity */ "./libs/transversal-data/src/entities/upload-files-idempotency.entity.ts");
const audit_log_entity_1 = __webpack_require__(/*! ./entities/audit-log.entity */ "./libs/transversal-data/src/entities/audit-log.entity.ts");
const global_param_entity_1 = __webpack_require__(/*! ./entities/global-param.entity */ "./libs/transversal-data/src/entities/global-param.entity.ts");
const user_entity_1 = __webpack_require__(/*! ./entities/user.entity */ "./libs/transversal-data/src/entities/user.entity.ts");
exports.TRANSVERSAL_DATA_ENTITIES = [
    city_entity_1.CityEntity,
    currency_entity_1.CurrencyEntity,
    permission_entity_1.PermissionEntity,
    person_entity_1.PersonEntity,
    role_entity_1.RoleEntity,
    role_permission_entity_1.RolePermissionEntity,
    catalog_status_types_entity_1.StatusEntity,
    upload_files_idempotency_entity_1.UploadFilesIdempotencyEntity,
    partner_create_user_sqs_idempotency_entity_1.PartnerCreateUserSqsIdempotencyEntity,
    user_entity_1.UserEntity,
    global_param_entity_1.GlobalParamEntity,
    audit_log_entity_1.AuditLogEntity,
];


/***/ },

/***/ "./libs/transversal-data/src/transversal-data.module.ts"
/*!**************************************************************!*\
  !*** ./libs/transversal-data/src/transversal-data.module.ts ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransversalDataModule = exports.TRANSVERSAL_DATA_ENTITIES = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const transversal_data_service_1 = __webpack_require__(/*! ./transversal-data.service */ "./libs/transversal-data/src/transversal-data.service.ts");
const transversal_data_entities_1 = __webpack_require__(/*! ./transversal-data.entities */ "./libs/transversal-data/src/transversal-data.entities.ts");
var transversal_data_entities_2 = __webpack_require__(/*! ./transversal-data.entities */ "./libs/transversal-data/src/transversal-data.entities.ts");
Object.defineProperty(exports, "TRANSVERSAL_DATA_ENTITIES", ({ enumerable: true, get: function () { return transversal_data_entities_2.TRANSVERSAL_DATA_ENTITIES; } }));
let TransversalDataModule = class TransversalDataModule {
};
exports.TransversalDataModule = TransversalDataModule;
exports.TransversalDataModule = TransversalDataModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([...transversal_data_entities_1.TRANSVERSAL_DATA_ENTITIES])],
        providers: [transversal_data_service_1.TransversalDataService],
        exports: [typeorm_1.TypeOrmModule, transversal_data_service_1.TransversalDataService],
    })
], TransversalDataModule);


/***/ },

/***/ "./libs/transversal-data/src/transversal-data.service.ts"
/*!***************************************************************!*\
  !*** ./libs/transversal-data/src/transversal-data.service.ts ***!
  \***************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransversalDataService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let TransversalDataService = class TransversalDataService {
};
exports.TransversalDataService = TransversalDataService;
exports.TransversalDataService = TransversalDataService = __decorate([
    (0, common_1.Injectable)()
], TransversalDataService);


/***/ },

/***/ "@aws-sdk/client-sqs"
/*!**************************************!*\
  !*** external "@aws-sdk/client-sqs" ***!
  \**************************************/
(module) {

module.exports = require("@aws-sdk/client-sqs");

/***/ },

/***/ "@nestjs/common"
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
(module) {

module.exports = require("@nestjs/common");

/***/ },

/***/ "@nestjs/config"
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
(module) {

module.exports = require("@nestjs/config");

/***/ },

/***/ "@nestjs/core"
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
(module) {

module.exports = require("@nestjs/core");

/***/ },

/***/ "@nestjs/platform-express"
/*!*******************************************!*\
  !*** external "@nestjs/platform-express" ***!
  \*******************************************/
(module) {

module.exports = require("@nestjs/platform-express");

/***/ },

/***/ "@nestjs/swagger"
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
(module) {

module.exports = require("@nestjs/swagger");

/***/ },

/***/ "@nestjs/typeorm"
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
(module) {

module.exports = require("@nestjs/typeorm");

/***/ },

/***/ "class-transformer"
/*!************************************!*\
  !*** external "class-transformer" ***!
  \************************************/
(module) {

module.exports = require("class-transformer");

/***/ },

/***/ "class-validator"
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
(module) {

module.exports = require("class-validator");

/***/ },

/***/ "crypto"
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
(module) {

module.exports = require("crypto");

/***/ },

/***/ "dotenv"
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
(module) {

module.exports = require("dotenv");

/***/ },

/***/ "fs"
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
(module) {

module.exports = require("fs");

/***/ },

/***/ "multer"
/*!*************************!*\
  !*** external "multer" ***!
  \*************************/
(module) {

module.exports = require("multer");

/***/ },

/***/ "path"
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
(module) {

module.exports = require("path");

/***/ },

/***/ "reflect-metadata"
/*!***********************************!*\
  !*** external "reflect-metadata" ***!
  \***********************************/
(module) {

module.exports = require("reflect-metadata");

/***/ },

/***/ "typeorm"
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
(module) {

module.exports = require("typeorm");

/***/ }

/******/ 	});
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
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
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
/*!***************************************!*\
  !*** ./apps/suppliers-ms/src/main.ts ***!
  \***************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
__webpack_require__(/*! ./config/dotenv.config */ "./apps/suppliers-ms/src/config/dotenv.config.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./apps/suppliers-ms/src/app.module.ts");
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
        .setTitle('Suppliers MS')
        .setDescription('HTTP y mensajería SQS del microservicio Suppliers')
        .setVersion('1.0')
        .addServer('/')
        .build();
    const swagger_document = swagger_1.SwaggerModule.createDocument(app, swagger_config);
    swagger_1.SwaggerModule.setup('docs', app, swagger_document, {
        jsonDocumentUrl: 'docs/json',
    });
    const config_service = app.get(config_1.ConfigService);
    const port = Number(config_service.get('config.port') ?? 8080);
    await app.listen(port);
    const logger = new common_1.Logger('Bootstrap');
    logger.log(`Suppliers MS (HTTP + SQS) escuchando en puerto ${port}`);
    logger.log(`Swagger UI: http://localhost:${port}/docs`);
}
void bootstrap();

})();

/******/ })()
;