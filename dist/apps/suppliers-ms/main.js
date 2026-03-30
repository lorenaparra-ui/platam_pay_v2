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
    constructor() {
        this.aws_region = 'us-east-2';
        this.transversal_sqs_wait_time_seconds = 20;
        this.transversal_sqs_max_number_of_messages = 10;
        this.transversal_sqs_visibility_timeout_seconds = 30;
        this.transversal_sqs_delete_on_validation_error = false;
    }
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
        transversal_data_1.UserEntity,
        transversal_data_1.CityEntity,
    ],
    synchronize: false,
    migrationsRun: false,
    migrationsTableName: "typeorm_migrations",
};
exports["default"] = TypeormConfig;


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
    constructor(data_source) {
        this.data_source = data_source;
        this.logger = new common_1.Logger(SqlProductsCreditFacilitySyncAdapter_1.name);
    }
    async ensure_credit_facility(input) {
        const existing = (await this.data_source.query(`SELECT 1 FROM products_schema.credit_facilities WHERE external_id = $1::uuid LIMIT 1`, [input.credit_facility_external_id]));
        if (existing.length > 0) {
            this.logger.debug(`credit_facility ya existe external_id=${input.credit_facility_external_id}`);
            return;
        }
        await this.data_source.query(`INSERT INTO products_schema.credit_facilities (
        external_id, contract_id, status_id, total_limit
      ) VALUES (
        $1::uuid,
        $2,
        (SELECT id FROM transversal_schema.statuses WHERE external_id = $3::uuid LIMIT 1),
        $4::numeric
      )`, [
            input.credit_facility_external_id,
            input.contract_id,
            input.status_external_id,
            input.total_limit,
        ]);
    }
};
exports.SqlProductsCreditFacilitySyncAdapter = SqlProductsCreditFacilitySyncAdapter;
exports.SqlProductsCreditFacilitySyncAdapter = SqlProductsCreditFacilitySyncAdapter = SqlProductsCreditFacilitySyncAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _a : Object])
], SqlProductsCreditFacilitySyncAdapter);


/***/ },

/***/ "./apps/suppliers-ms/src/infrastructure/database/adapters/sql-transversal-user-person-writer.adapter.ts"
/*!**************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/infrastructure/database/adapters/sql-transversal-user-person-writer.adapter.ts ***!
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
var SqlTransversalUserPersonWriterAdapter_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SqlTransversalUserPersonWriterAdapter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const crypto_1 = __webpack_require__(/*! crypto */ "crypto");
let SqlTransversalUserPersonWriterAdapter = SqlTransversalUserPersonWriterAdapter_1 = class SqlTransversalUserPersonWriterAdapter {
    constructor(data_source) {
        this.data_source = data_source;
        this.logger = new common_1.Logger(SqlTransversalUserPersonWriterAdapter_1.name);
    }
    async create_user_and_person(input) {
        const user_external_id = (0, crypto_1.randomUUID)();
        const person_external_id = (0, crypto_1.randomUUID)();
        const cognito_sub = (0, crypto_1.randomUUID)();
        let city_id = null;
        if (input.city_external_id !== null && input.city_external_id.length > 0) {
            const city_rows = (await this.data_source.query(`SELECT id FROM transversal_schema.cities WHERE external_id = $1::uuid LIMIT 1`, [input.city_external_id]));
            if (!city_rows?.length) {
                throw new common_1.NotFoundException('city not found');
            }
            city_id = Number(city_rows[0].id);
        }
        const query_runner = this.data_source.createQueryRunner();
        await query_runner.connect();
        await query_runner.startTransaction();
        try {
            const user_rows = (await query_runner.query(`INSERT INTO transversal_schema.users (
          external_id, cognito_sub, email, role_id, status_id, last_login_at
        ) VALUES (
          $1::uuid, $2::uuid, $3, NULL,
          (SELECT get_status_id('users', 'active')),
          NULL
        )
        RETURNING id, external_id`, [user_external_id, cognito_sub, input.email]));
            const user_id = Number(user_rows[0].id);
            await query_runner.query(`INSERT INTO transversal_schema.persons (
          external_id, user_id, country_code, first_name, last_name, doc_type, doc_number,
          doc_issue_date, birth_date, gender, phone, residential_address, business_address, city_id
        ) VALUES (
          $1::uuid, $2, $3, $4, $5, $6, $7,
          NULL, NULL, NULL, $8, NULL, NULL, $9
        )`, [
                person_external_id,
                user_id,
                input.country_code,
                input.first_name,
                input.last_name,
                input.doc_type,
                input.doc_number,
                input.phone,
                city_id,
            ]);
            await query_runner.commitTransaction();
        }
        catch (err) {
            await query_runner.rollbackTransaction();
            const code = err && typeof err === 'object' && 'code' in err
                ? String(err.code)
                : '';
            if (code === '23505') {
                throw new common_1.ConflictException('user or person already exists');
            }
            const message = err instanceof Error ? err.message : String(err);
            this.logger.error(`transversal user/person tx failed: ${message}`);
            throw err;
        }
        finally {
            await query_runner.release();
        }
        return { user_external_id, person_external_id };
    }
};
exports.SqlTransversalUserPersonWriterAdapter = SqlTransversalUserPersonWriterAdapter;
exports.SqlTransversalUserPersonWriterAdapter = SqlTransversalUserPersonWriterAdapter = SqlTransversalUserPersonWriterAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _a : Object])
], SqlTransversalUserPersonWriterAdapter);


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
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TypeormSuppliersReferenceLookupAdapter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const transversal_data_1 = __webpack_require__(/*! @app/transversal-data */ "./libs/transversal-data/src/index.ts");
const suppliers_data_1 = __webpack_require__(/*! @app/suppliers-data */ "./libs/suppliers-data/src/index.ts");
let TypeormSuppliersReferenceLookupAdapter = class TypeormSuppliersReferenceLookupAdapter {
    constructor(users, persons, cities, businesses, bank_accounts, partners) {
        this.users = users;
        this.persons = persons;
        this.cities = cities;
        this.businesses = businesses;
        this.bank_accounts = bank_accounts;
        this.partners = partners;
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
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _e : Object, typeof (_f = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _f : Object])
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
        return new business_entity_1.Business(row.id, row.externalId, row.personId, row.cityId ?? null, row.entityType, row.businessName ?? null, row.businessAddress ?? null, row.businessType ?? null, row.relationshipToBusiness ?? null, row.legalName ?? null, row.tradeName ?? null, row.taxId ?? null, row.yearOfEstablishment ?? null, row.createdAt, row.updatedAt);
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

/***/ "./apps/suppliers-ms/src/infrastructure/database/mappers/partner.mapper.ts"
/*!*********************************************************************************!*\
  !*** ./apps/suppliers-ms/src/infrastructure/database/mappers/partner.mapper.ts ***!
  \*********************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PartnerMapper = void 0;
const partner_entity_1 = __webpack_require__(/*! @modules/partners/domain/entities/partner.entity */ "./apps/suppliers-ms/src/modules/partners/domain/entities/partner.entity.ts");
class PartnerMapper {
    static to_domain(row) {
        return new partner_entity_1.Partner(row.id, row.externalId, row.businessId, row.acronym ?? null, row.logoUrl ?? null, row.coBrandingLogoUrl ?? null, row.primaryColor ?? null, row.secondaryColor ?? null, row.lightColor ?? null, row.salesRepRoleName ?? null, row.salesRepRoleNamePlural ?? null, row.apiKeyHash, row.notificationEmail ?? null, row.webhookUrl ?? null, row.sendSalesRepVoucher, row.disbursementNotificationEmail ?? null, row.defaultRepId ?? null, row.statusId, row.createdAt, row.updatedAt);
    }
    static from_raw_row(row) {
        return new partner_entity_1.Partner(Number(row['id']), String(row['external_id']), Number(row['business_id']), row['acronym'] ?? null, row['logo_url'] ?? null, row['co_branding_logo_url'] ?? null, row['primary_color'] ?? null, row['secondary_color'] ?? null, row['light_color'] ?? null, row['sales_rep_role_name'] ?? null, row['sales_rep_role_name_plural'] ?? null, Boolean(row['api_key_hash']), row['notification_email'] ?? null, row['webhook_url'] ?? null, Boolean(row['send_sales_rep_voucher']), row['disbursement_notification_email'] ?? null, row['default_rep_id'] === null || row['default_rep_id'] === undefined
            ? null
            : Number(row['default_rep_id']), Number(row['status_id']), new Date(String(row['created_at'])), new Date(String(row['updated_at'])));
    }
}
exports.PartnerMapper = PartnerMapper;


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
        if (patch.bank_entity !== undefined) {
            add('bank_entity', patch.bank_entity);
        }
        if (patch.account_number !== undefined) {
            add('account_number', patch.account_number);
        }
        if (patch.bank_certification !== undefined) {
            add('bank_certification', patch.bank_certification);
        }
        if (columns.length === 0) {
            return this.find_by_external_id(external_id);
        }
        columns.push(`"updated_at" = now()`);
        values.push(existing.id);
        await this.repo.query(`UPDATE suppliers_schema.bank_accounts SET ${columns.join(', ')} WHERE id = $${i}`, values);
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
let TypeormPartnerOnboardingSagaRepository = class TypeormPartnerOnboardingSagaRepository {
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
    businessId: true,
    acronym: true,
    logoUrl: true,
    coBrandingLogoUrl: true,
    primaryColor: true,
    secondaryColor: true,
    lightColor: true,
    salesRepRoleName: true,
    salesRepRoleNamePlural: true,
    apiKeyHash: true,
    notificationEmail: true,
    webhookUrl: true,
    sendSalesRepVoucher: true,
    disbursementNotificationEmail: true,
    defaultRepId: true,
    statusId: true,
    createdAt: true,
    updatedAt: true,
};
let TypeormPartnerRepository = class TypeormPartnerRepository {
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
            select: PARTNER_SELECT,
            order: { id: 'ASC' },
        });
        return rows.map((r) => partner_mapper_1.PartnerMapper.to_domain(r));
    }
    async create(props) {
        const rows = await this.repo.query(`INSERT INTO suppliers_schema.partners (
        external_id, business_id, acronym, logo_url, co_branding_logo_url,
        primary_color, secondary_color, light_color,
        sales_rep_role_name, sales_rep_role_name_plural,
        api_key_hash, notification_email, webhook_url, send_sales_rep_voucher,
        disbursement_notification_email
      ) VALUES (
        gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, false, $10, $11, $12, $13
      )
      RETURNING id, external_id, business_id, acronym, logo_url, co_branding_logo_url,
        primary_color, secondary_color, light_color,
        sales_rep_role_name, sales_rep_role_name_plural,
        api_key_hash, notification_email, webhook_url, send_sales_rep_voucher,
        disbursement_notification_email, default_rep_id, status_id, created_at, updated_at`, [
            props.business_id,
            props.acronym,
            props.logo_url,
            props.co_branding_logo_url,
            props.primary_color,
            props.secondary_color,
            props.light_color,
            props.sales_rep_role_name ?? 'Sales Rep',
            props.sales_rep_role_name_plural ?? 'Sales Reps',
            props.notification_email,
            props.webhook_url,
            props.send_sales_rep_voucher,
            props.disbursement_notification_email,
        ]);
        return partner_mapper_1.PartnerMapper.from_raw_row(rows[0]);
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
        if (patch.business_id !== undefined) {
            add('business_id', patch.business_id);
        }
        if (patch.acronym !== undefined) {
            add('acronym', patch.acronym);
        }
        if (patch.logo_url !== undefined) {
            add('logo_url', patch.logo_url);
        }
        if (patch.co_branding_logo_url !== undefined) {
            add('co_branding_logo_url', patch.co_branding_logo_url);
        }
        if (patch.primary_color !== undefined) {
            add('primary_color', patch.primary_color);
        }
        if (patch.secondary_color !== undefined) {
            add('secondary_color', patch.secondary_color);
        }
        if (patch.light_color !== undefined) {
            add('light_color', patch.light_color);
        }
        if (patch.sales_rep_role_name !== undefined) {
            add('sales_rep_role_name', patch.sales_rep_role_name);
        }
        if (patch.sales_rep_role_name_plural !== undefined) {
            add('sales_rep_role_name_plural', patch.sales_rep_role_name_plural);
        }
        if (patch.notification_email !== undefined) {
            add('notification_email', patch.notification_email);
        }
        if (patch.webhook_url !== undefined) {
            add('webhook_url', patch.webhook_url);
        }
        if (patch.send_sales_rep_voucher !== undefined) {
            add('send_sales_rep_voucher', patch.send_sales_rep_voucher);
        }
        if (patch.disbursement_notification_email !== undefined) {
            add('disbursement_notification_email', patch.disbursement_notification_email);
        }
        if (columns.length === 0) {
            return this.find_by_external_id(external_id);
        }
        columns.push(`"updated_at" = now()`);
        values.push(existing.id);
        await this.repo.query(`UPDATE suppliers_schema.partners SET ${columns.join(', ')} WHERE id = $${i}`, values);
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
        let bank_account_id = null;
        if (props.new_bank_account !== null) {
            const b = props.new_bank_account;
            const ba_rows = await this.repo.query(`INSERT INTO suppliers_schema.bank_accounts (
          external_id, bank_entity, account_number, bank_certification
        ) VALUES (gen_random_uuid(), $1, $2, $3)
        RETURNING id`, [b.bank_entity, b.account_number, b.bank_certification]);
            bank_account_id = Number(ba_rows[0].id);
        }
        const rows = await this.repo.query(`INSERT INTO suppliers_schema.suppliers (
        external_id, business_id, bank_account_id
      ) VALUES (gen_random_uuid(), $1, $2)
      RETURNING id, external_id, business_id, bank_account_id, created_at, updated_at`, [props.business_id, bank_account_id]);
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
const sql_transversal_user_person_writer_adapter_1 = __webpack_require__(/*! ./database/adapters/sql-transversal-user-person-writer.adapter */ "./apps/suppliers-ms/src/infrastructure/database/adapters/sql-transversal-user-person-writer.adapter.ts");
const partner_onboarding_saga_repository_port_1 = __webpack_require__(/*! @modules/partners/application/ports/partner-onboarding-saga.repository.port */ "./apps/suppliers-ms/src/modules/partners/application/ports/partner-onboarding-saga.repository.port.ts");
const products_credit_facility_sync_port_1 = __webpack_require__(/*! @modules/partners/application/ports/products-credit-facility-sync.port */ "./apps/suppliers-ms/src/modules/partners/application/ports/products-credit-facility-sync.port.ts");
const transversal_user_person_writer_port_1 = __webpack_require__(/*! @modules/partners/application/ports/transversal-user-person-writer.port */ "./apps/suppliers-ms/src/modules/partners/application/ports/transversal-user-person-writer.port.ts");
const partner_onboarding_files_port_1 = __webpack_require__(/*! @modules/partners/application/ports/partner-onboarding-files.port */ "./apps/suppliers-ms/src/modules/partners/application/ports/partner-onboarding-files.port.ts");
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
                transversal_data_1.PersonEntity,
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
            sql_products_credit_facility_sync_adapter_1.SqlProductsCreditFacilitySyncAdapter,
            sql_transversal_user_person_writer_adapter_1.SqlTransversalUserPersonWriterAdapter,
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
                useExisting: sql_transversal_user_person_writer_adapter_1.SqlTransversalUserPersonWriterAdapter,
            },
            sqs_partner_onboarding_files_adapter_1.SqsPartnerOnboardingFilesAdapter,
            {
                provide: partner_onboarding_files_port_1.PARTNER_ONBOARDING_FILES_PORT,
                useExisting: sqs_partner_onboarding_files_adapter_1.SqsPartnerOnboardingFilesAdapter,
            },
        ],
        exports: [
            typeorm_business_repository_1.TypeormBusinessRepository,
            typeorm_partner_repository_1.TypeormPartnerRepository,
            typeorm_supplier_repository_1.TypeormSupplierRepository,
            typeorm_bank_account_repository_1.TypeormBankAccountRepository,
            typeorm_partner_onboarding_saga_repository_1.TypeormPartnerOnboardingSagaRepository,
            suppliers_reference_lookup_port_1.SUPPLIERS_REFERENCE_LOOKUP,
            partner_onboarding_saga_repository_port_1.PARTNER_ONBOARDING_SAGA_REPOSITORY,
            products_credit_facility_sync_port_1.PRODUCTS_CREDIT_FACILITY_SYNC_PORT,
            transversal_user_person_writer_port_1.TRANSVERSAL_USER_PERSON_WRITER_PORT,
            partner_onboarding_files_port_1.PARTNER_ONBOARDING_FILES_PORT,
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
    constructor(sqs_client, queues_config, config_service, ingest_transversal_inbound) {
        super(sqs_client, {
            log: (m) => this.nest_logger.log(m),
            warn: (m) => this.nest_logger.warn(m),
            error: (m) => this.nest_logger.error(m),
        });
        this.queues_config = queues_config;
        this.config_service = config_service;
        this.ingest_transversal_inbound = ingest_transversal_inbound;
        this.nest_logger = new common_1.Logger(TransversalInboundSqsConsumer_1.name);
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
const publish_products_event_use_case_1 = __webpack_require__(/*! @messaging/application/use-cases/publish-products-event.use-case */ "./apps/suppliers-ms/src/modules/messaging/application/use-cases/publish-products-event.use-case.ts");
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
            {
                provide: transversal_outbound_queue_url_port_1.TRANSVERSAL_OUTBOUND_QUEUE_URL_PORT,
                useExisting: config_outbound_transversal_queue_url_adapter_1.ConfigOutboundTransversalQueueUrlAdapter,
            },
            {
                provide: transversal_upload_files_queue_url_port_1.TRANSVERSAL_UPLOAD_FILES_QUEUE_URL_PORT,
                useExisting: config_transversal_upload_files_queue_url_adapter_1.ConfigTransversalUploadFilesQueueUrlAdapter,
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
            transversal_outbound_queue_url_port_1.TRANSVERSAL_OUTBOUND_QUEUE_URL_PORT,
            transversal_upload_files_queue_url_port_1.TRANSVERSAL_UPLOAD_FILES_QUEUE_URL_PORT,
            products_outbound_queue_url_port_1.PRODUCTS_OUTBOUND_QUEUE_URL_PORT,
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
        external_id: account.external_id,
        bank_entity: account.bank_entity,
        account_number: account.account_number,
        bank_certification: account.bank_certification,
        created_at: account.created_at,
        updated_at: account.updated_at,
    };
}


/***/ },

/***/ "./apps/suppliers-ms/src/modules/bank-accounts/application/use-cases/create-bank-account/create-bank-account.response.ts"
/*!*******************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/bank-accounts/application/use-cases/create-bank-account/create-bank-account.response.ts ***!
  \*******************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateBankAccountResponse = void 0;
class CreateBankAccountResponse {
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

/***/ "./apps/suppliers-ms/src/modules/businesses/application/use-cases/create-business/create-business.response.ts"
/*!********************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/businesses/application/use-cases/create-business/create-business.response.ts ***!
  \********************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateBusinessResponse = void 0;
class CreateBusinessResponse {
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
    constructor(business_repository, lookup) {
        this.business_repository = business_repository;
        this.lookup = lookup;
    }
    async execute(req) {
        const person_id = await this.lookup.get_person_internal_id_by_external_id(req.person_external_id);
        if (person_id === null) {
            throw new common_1.NotFoundException('person not found');
        }
        let city_id = null;
        if (req.city_external_id !== null) {
            const c_id = await this.lookup.get_city_internal_id_by_external_id(req.city_external_id);
            if (c_id === null) {
                throw new common_1.NotFoundException('city not found');
            }
            city_id = c_id;
        }
        const created = await this.business_repository.create({
            person_id,
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
    constructor() {
        this.pending = new Map();
        this.early = new Map();
    }
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
    constructor(process_transversal_inbound_message, process_files_uploaded_inbound) {
        this.process_transversal_inbound_message = process_transversal_inbound_message;
        this.process_files_uploaded_inbound = process_files_uploaded_inbound;
        this.logger = new common_1.Logger(IngestTransversalInboundSqsMessageUseCase_1.name);
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
    constructor(awaiter) {
        this.awaiter = awaiter;
        this.logger = new common_1.Logger(ProcessFilesUploadedInboundUseCase_1.name);
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
    constructor() {
        this.logger = new common_1.Logger(ProcessTransversalInboundMessageUseCase_1.name);
    }
    async execute(dto) {
        this.logger.log(`Mensaje transversal recibido: event_type=${dto.event_type} correlation_id=${dto.correlation_id}`);
    }
};
exports.ProcessTransversalInboundMessageUseCase = ProcessTransversalInboundMessageUseCase;
exports.ProcessTransversalInboundMessageUseCase = ProcessTransversalInboundMessageUseCase = ProcessTransversalInboundMessageUseCase_1 = __decorate([
    (0, common_1.Injectable)()
], ProcessTransversalInboundMessageUseCase);


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

/***/ "./apps/suppliers-ms/src/modules/messaging/domain/ports/products-outbound-queue-url.port.ts"
/*!**************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/messaging/domain/ports/products-outbound-queue-url.port.ts ***!
  \**************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PRODUCTS_OUTBOUND_QUEUE_URL_PORT = void 0;
exports.PRODUCTS_OUTBOUND_QUEUE_URL_PORT = Symbol('PRODUCTS_OUTBOUND_QUEUE_URL_PORT');


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
            process_transversal_inbound_message_use_case_1.ProcessTransversalInboundMessageUseCase,
            process_files_uploaded_inbound_use_case_1.ProcessFilesUploadedInboundUseCase,
            ingest_transversal_inbound_sqs_message_use_case_1.IngestTransversalInboundSqsMessageUseCase,
        ],
        exports: [
            files_uploaded_correlation_awaiter_service_1.FilesUploadedCorrelationAwaiter,
            publish_transversal_event_use_case_1.PublishTransversalEventUseCase,
            publish_upload_files_event_use_case_1.PublishUploadFilesEventUseCase,
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
    const business_external_id = await lookup.get_business_external_id_by_internal_id(partner.business_id);
    if (!business_external_id) {
        throw new common_1.InternalServerErrorException();
    }
    return {
        external_id: partner.external_id,
        business_external_id,
        acronym: partner.acronym,
        logo_url: partner.logo_url,
        co_branding_logo_url: partner.co_branding_logo_url,
        primary_color: partner.primary_color,
        secondary_color: partner.secondary_color,
        light_color: partner.light_color,
        sales_rep_role_name: partner.sales_rep_role_name,
        sales_rep_role_name_plural: partner.sales_rep_role_name_plural,
        notification_email: partner.notification_email,
        webhook_url: partner.webhook_url,
        send_sales_rep_voucher: partner.send_sales_rep_voucher,
        disbursement_notification_email: partner.disbursement_notification_email,
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
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PARTNER_ONBOARDING_SAGA_REPOSITORY = void 0;
exports.PARTNER_ONBOARDING_SAGA_REPOSITORY = Symbol('PARTNER_ONBOARDING_SAGA_REPOSITORY');


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
    constructor(saga_external_id, correlation_id, credit_facility_external_id, user_external_id, person_external_id, business_external_id, bank_certification_url, logo_url, co_branding_url, bank_account_external_id, partner_external_id) {
        this.saga_external_id = saga_external_id;
        this.correlation_id = correlation_id;
        this.credit_facility_external_id = credit_facility_external_id;
        this.user_external_id = user_external_id;
        this.person_external_id = person_external_id;
        this.business_external_id = business_external_id;
        this.bank_certification_url = bank_certification_url;
        this.logo_url = logo_url;
        this.co_branding_url = co_branding_url;
        this.bank_account_external_id = bank_account_external_id;
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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePartnerOrchestratorUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const crypto_1 = __webpack_require__(/*! crypto */ "crypto");
const create_business_use_case_1 = __webpack_require__(/*! @modules/businesses/application/use-cases/create-business/create-business.use-case */ "./apps/suppliers-ms/src/modules/businesses/application/use-cases/create-business/create-business.use-case.ts");
const create_bank_account_use_case_1 = __webpack_require__(/*! @modules/bank-accounts/application/use-cases/create-bank-account/create-bank-account.use-case */ "./apps/suppliers-ms/src/modules/bank-accounts/application/use-cases/create-bank-account/create-bank-account.use-case.ts");
const create_partner_use_case_1 = __webpack_require__(/*! @modules/partners/application/use-cases/create-partner/create-partner.use-case */ "./apps/suppliers-ms/src/modules/partners/application/use-cases/create-partner/create-partner.use-case.ts");
const publish_transversal_event_use_case_1 = __webpack_require__(/*! @messaging/application/use-cases/publish-transversal-event.use-case */ "./apps/suppliers-ms/src/modules/messaging/application/use-cases/publish-transversal-event.use-case.ts");
const publish_products_event_use_case_1 = __webpack_require__(/*! @messaging/application/use-cases/publish-products-event.use-case */ "./apps/suppliers-ms/src/modules/messaging/application/use-cases/publish-products-event.use-case.ts");
const transversal_outbound_event_dto_1 = __webpack_require__(/*! @messaging/application/dto/transversal-outbound-event.dto */ "./apps/suppliers-ms/src/modules/messaging/application/dto/transversal-outbound-event.dto.ts");
const partner_onboarding_saga_repository_port_1 = __webpack_require__(/*! @modules/partners/application/ports/partner-onboarding-saga.repository.port */ "./apps/suppliers-ms/src/modules/partners/application/ports/partner-onboarding-saga.repository.port.ts");
const products_credit_facility_sync_port_1 = __webpack_require__(/*! @modules/partners/application/ports/products-credit-facility-sync.port */ "./apps/suppliers-ms/src/modules/partners/application/ports/products-credit-facility-sync.port.ts");
const transversal_user_person_writer_port_1 = __webpack_require__(/*! @modules/partners/application/ports/transversal-user-person-writer.port */ "./apps/suppliers-ms/src/modules/partners/application/ports/transversal-user-person-writer.port.ts");
const partner_onboarding_files_port_1 = __webpack_require__(/*! @modules/partners/application/ports/partner-onboarding-files.port */ "./apps/suppliers-ms/src/modules/partners/application/ports/partner-onboarding-files.port.ts");
const create_partner_orchestrator_response_1 = __webpack_require__(/*! ./create-partner-orchestrator.response */ "./apps/suppliers-ms/src/modules/partners/application/use-cases/create-partner-orchestrator/create-partner-orchestrator.response.ts");
const suppliers_reference_lookup_port_1 = __webpack_require__(/*! @common/ports/suppliers-reference-lookup.port */ "./apps/suppliers-ms/src/common/ports/suppliers-reference-lookup.port.ts");
const TOTAL_STEPS = 8;
const PARTNER_ONBOARDING_FILE_FOLDERS = {
    bank_certification: 'bank-certifications',
    logo: 'logos/logo',
    co_branding: 'logos/co-branding',
};
let CreatePartnerOrchestratorUseCase = CreatePartnerOrchestratorUseCase_1 = class CreatePartnerOrchestratorUseCase {
    constructor(saga_repository, credit_facility_sync, user_person_writer, files_port, suppliers_lookup, create_business, create_bank_account, create_partner, publish_transversal, publish_products) {
        this.saga_repository = saga_repository;
        this.credit_facility_sync = credit_facility_sync;
        this.user_person_writer = user_person_writer;
        this.files_port = files_port;
        this.suppliers_lookup = suppliers_lookup;
        this.create_business = create_business;
        this.create_bank_account = create_bank_account;
        this.create_partner = create_partner;
        this.publish_transversal = publish_transversal;
        this.publish_products = publish_products;
        this.logger = new common_1.Logger(CreatePartnerOrchestratorUseCase_1.name);
    }
    async execute(command, files) {
        const correlation_id = (0, crypto_1.randomUUID)();
        const saga_external_id = (0, crypto_1.randomUUID)();
        const credit_facility_external_id = (0, crypto_1.randomUUID)();
        await this.saga_repository.create_initial({
            external_id: saga_external_id,
            correlation_id,
            status: 'RUNNING',
            current_step: 0,
        });
        try {
            this.log_step(1, correlation_id, 'archivos: cola TRANSVERSAL_SQS_UPLOAD_FILES_QUEUE_URL → S3 (transversal-ms)');
            const file_urls = await this.files_port.resolve_urls({
                correlation_id,
                idempotency_key: saga_external_id,
                bank_certification: files.bank_certification,
                logo: files.logo,
                co_branding: files.co_branding,
                file_folders: PARTNER_ONBOARDING_FILE_FOLDERS,
            });
            await this.publish_transversal.execute({
                correlation_id,
                event_type: transversal_outbound_event_dto_1.TransversalEventType.partner_onboarding_files_upload_requested,
                payload: {
                    bank_certification_url: file_urls.bank_certification_url,
                    logo_url: file_urls.logo_url,
                    co_branding_url: file_urls.co_branding_url,
                },
            });
            await this.saga_repository.update_by_external_id(saga_external_id, {
                current_step: 1,
            });
            const example_user_external_id = 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d';
            const example_person_external_id = 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e';
            const example_business_external_id = 'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f';
            const example_bank_account_external_id = 'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a';
            const example_partner_external_id = 'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b';
            return new create_partner_orchestrator_response_1.CreatePartnerOrchestratorResponse(saga_external_id, correlation_id, credit_facility_external_id, example_user_external_id, example_person_external_id, example_business_external_id, file_urls.bank_certification_url, file_urls.logo_url, file_urls.co_branding_url, example_bank_account_external_id, example_partner_external_id);
        }
        catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            await this.saga_repository.update_by_external_id(saga_external_id, {
                status: 'FAILED',
                error_message: message,
            });
            throw err;
        }
    }
    log_step(step_index, correlation_id, label) {
        this.logger.debug(`[Saga][${step_index}/${TOTAL_STEPS}][correlation_id=${correlation_id}] ${label}`);
    }
};
exports.CreatePartnerOrchestratorUseCase = CreatePartnerOrchestratorUseCase;
exports.CreatePartnerOrchestratorUseCase = CreatePartnerOrchestratorUseCase = CreatePartnerOrchestratorUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(partner_onboarding_saga_repository_port_1.PARTNER_ONBOARDING_SAGA_REPOSITORY)),
    __param(1, (0, common_1.Inject)(products_credit_facility_sync_port_1.PRODUCTS_CREDIT_FACILITY_SYNC_PORT)),
    __param(2, (0, common_1.Inject)(transversal_user_person_writer_port_1.TRANSVERSAL_USER_PERSON_WRITER_PORT)),
    __param(3, (0, common_1.Inject)(partner_onboarding_files_port_1.PARTNER_ONBOARDING_FILES_PORT)),
    __param(4, (0, common_1.Inject)(suppliers_reference_lookup_port_1.SUPPLIERS_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, typeof (_a = typeof create_business_use_case_1.CreateBusinessUseCase !== "undefined" && create_business_use_case_1.CreateBusinessUseCase) === "function" ? _a : Object, typeof (_b = typeof create_bank_account_use_case_1.CreateBankAccountUseCase !== "undefined" && create_bank_account_use_case_1.CreateBankAccountUseCase) === "function" ? _b : Object, typeof (_c = typeof create_partner_use_case_1.CreatePartnerUseCase !== "undefined" && create_partner_use_case_1.CreatePartnerUseCase) === "function" ? _c : Object, typeof (_d = typeof publish_transversal_event_use_case_1.PublishTransversalEventUseCase !== "undefined" && publish_transversal_event_use_case_1.PublishTransversalEventUseCase) === "function" ? _d : Object, typeof (_e = typeof publish_products_event_use_case_1.PublishProductsEventUseCase !== "undefined" && publish_products_event_use_case_1.PublishProductsEventUseCase) === "function" ? _e : Object])
], CreatePartnerOrchestratorUseCase);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/partners/application/use-cases/create-partner/create-partner.response.ts"
/*!****************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/partners/application/use-cases/create-partner/create-partner.response.ts ***!
  \****************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePartnerResponse = void 0;
class CreatePartnerResponse {
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePartnerUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const suppliers_reference_lookup_port_1 = __webpack_require__(/*! @common/ports/suppliers-reference-lookup.port */ "./apps/suppliers-ms/src/common/ports/suppliers-reference-lookup.port.ts");
const partners_tokens_1 = __webpack_require__(/*! @modules/partners/partners.tokens */ "./apps/suppliers-ms/src/modules/partners/partners.tokens.ts");
const partner_repository_1 = __webpack_require__(/*! @modules/partners/domain/repositories/partner.repository */ "./apps/suppliers-ms/src/modules/partners/domain/repositories/partner.repository.ts");
const partner_public_fields_builder_1 = __webpack_require__(/*! @modules/partners/application/mapping/partner-public-fields.builder */ "./apps/suppliers-ms/src/modules/partners/application/mapping/partner-public-fields.builder.ts");
const create_partner_response_1 = __webpack_require__(/*! ./create-partner.response */ "./apps/suppliers-ms/src/modules/partners/application/use-cases/create-partner/create-partner.response.ts");
let CreatePartnerUseCase = class CreatePartnerUseCase {
    constructor(partner_repository, lookup) {
        this.partner_repository = partner_repository;
        this.lookup = lookup;
    }
    async execute(req) {
        const business_id = await this.lookup.get_business_internal_id_by_external_id(req.business_external_id);
        if (business_id === null) {
            throw new common_1.NotFoundException('business not found');
        }
        const created = await this.partner_repository.create({
            business_id,
            acronym: req.acronym,
            logo_url: req.logo_url,
            co_branding_logo_url: req.co_branding_logo_url,
            primary_color: req.primary_color,
            secondary_color: req.secondary_color,
            light_color: req.light_color,
            sales_rep_role_name: req.sales_rep_role_name,
            sales_rep_role_name_plural: req.sales_rep_role_name_plural,
            notification_email: req.notification_email,
            webhook_url: req.webhook_url,
            send_sales_rep_voucher: req.send_sales_rep_voucher,
            disbursement_notification_email: req.disbursement_notification_email,
        });
        const fields = await (0, partner_public_fields_builder_1.build_partner_public_fields)(created, this.lookup);
        return new create_partner_response_1.CreatePartnerResponse(fields);
    }
};
exports.CreatePartnerUseCase = CreatePartnerUseCase;
exports.CreatePartnerUseCase = CreatePartnerUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(partners_tokens_1.PARTNER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(suppliers_reference_lookup_port_1.SUPPLIERS_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [typeof (_a = typeof partner_repository_1.PartnerRepository !== "undefined" && partner_repository_1.PartnerRepository) === "function" ? _a : Object, typeof (_b = typeof suppliers_reference_lookup_port_1.SuppliersReferenceLookupPort !== "undefined" && suppliers_reference_lookup_port_1.SuppliersReferenceLookupPort) === "function" ? _b : Object])
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetPartnerByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const suppliers_reference_lookup_port_1 = __webpack_require__(/*! @common/ports/suppliers-reference-lookup.port */ "./apps/suppliers-ms/src/common/ports/suppliers-reference-lookup.port.ts");
const partners_tokens_1 = __webpack_require__(/*! @modules/partners/partners.tokens */ "./apps/suppliers-ms/src/modules/partners/partners.tokens.ts");
const partner_repository_1 = __webpack_require__(/*! @modules/partners/domain/repositories/partner.repository */ "./apps/suppliers-ms/src/modules/partners/domain/repositories/partner.repository.ts");
const partner_public_fields_builder_1 = __webpack_require__(/*! @modules/partners/application/mapping/partner-public-fields.builder */ "./apps/suppliers-ms/src/modules/partners/application/mapping/partner-public-fields.builder.ts");
const get_partner_by_external_id_response_1 = __webpack_require__(/*! ./get-partner-by-external-id.response */ "./apps/suppliers-ms/src/modules/partners/application/use-cases/get-partner-by-external-id/get-partner-by-external-id.response.ts");
let GetPartnerByExternalIdUseCase = class GetPartnerByExternalIdUseCase {
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
    __metadata("design:paramtypes", [typeof (_a = typeof partner_repository_1.PartnerRepository !== "undefined" && partner_repository_1.PartnerRepository) === "function" ? _a : Object, typeof (_b = typeof suppliers_reference_lookup_port_1.SuppliersReferenceLookupPort !== "undefined" && suppliers_reference_lookup_port_1.SuppliersReferenceLookupPort) === "function" ? _b : Object])
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListPartnersUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const suppliers_reference_lookup_port_1 = __webpack_require__(/*! @common/ports/suppliers-reference-lookup.port */ "./apps/suppliers-ms/src/common/ports/suppliers-reference-lookup.port.ts");
const partners_tokens_1 = __webpack_require__(/*! @modules/partners/partners.tokens */ "./apps/suppliers-ms/src/modules/partners/partners.tokens.ts");
const partner_repository_1 = __webpack_require__(/*! @modules/partners/domain/repositories/partner.repository */ "./apps/suppliers-ms/src/modules/partners/domain/repositories/partner.repository.ts");
const partner_public_fields_builder_1 = __webpack_require__(/*! @modules/partners/application/mapping/partner-public-fields.builder */ "./apps/suppliers-ms/src/modules/partners/application/mapping/partner-public-fields.builder.ts");
const list_partners_response_1 = __webpack_require__(/*! ./list-partners.response */ "./apps/suppliers-ms/src/modules/partners/application/use-cases/list-partners/list-partners.response.ts");
let ListPartnersUseCase = class ListPartnersUseCase {
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
    __metadata("design:paramtypes", [typeof (_a = typeof partner_repository_1.PartnerRepository !== "undefined" && partner_repository_1.PartnerRepository) === "function" ? _a : Object, typeof (_b = typeof suppliers_reference_lookup_port_1.SuppliersReferenceLookupPort !== "undefined" && suppliers_reference_lookup_port_1.SuppliersReferenceLookupPort) === "function" ? _b : Object])
], ListPartnersUseCase);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/partners/application/use-cases/update-partner-by-external-id/update-partner-by-external-id.response.ts"
/*!**********************************************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/partners/application/use-cases/update-partner-by-external-id/update-partner-by-external-id.response.ts ***!
  \**********************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdatePartnerByExternalIdResponse = void 0;
class UpdatePartnerByExternalIdResponse {
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdatePartnerByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const suppliers_reference_lookup_port_1 = __webpack_require__(/*! @common/ports/suppliers-reference-lookup.port */ "./apps/suppliers-ms/src/common/ports/suppliers-reference-lookup.port.ts");
const partners_tokens_1 = __webpack_require__(/*! @modules/partners/partners.tokens */ "./apps/suppliers-ms/src/modules/partners/partners.tokens.ts");
const partner_repository_1 = __webpack_require__(/*! @modules/partners/domain/repositories/partner.repository */ "./apps/suppliers-ms/src/modules/partners/domain/repositories/partner.repository.ts");
const partner_public_fields_builder_1 = __webpack_require__(/*! @modules/partners/application/mapping/partner-public-fields.builder */ "./apps/suppliers-ms/src/modules/partners/application/mapping/partner-public-fields.builder.ts");
const update_partner_by_external_id_response_1 = __webpack_require__(/*! ./update-partner-by-external-id.response */ "./apps/suppliers-ms/src/modules/partners/application/use-cases/update-partner-by-external-id/update-partner-by-external-id.response.ts");
let UpdatePartnerByExternalIdUseCase = class UpdatePartnerByExternalIdUseCase {
    constructor(partner_repository, lookup) {
        this.partner_repository = partner_repository;
        this.lookup = lookup;
    }
    async execute(req) {
        const patch = {};
        if (req.business_external_id !== undefined) {
            const id = await this.lookup.get_business_internal_id_by_external_id(req.business_external_id);
            if (id === null) {
                throw new common_1.NotFoundException('business not found');
            }
            patch.business_id = id;
        }
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
        if (req.sales_rep_role_name !== undefined) {
            patch.sales_rep_role_name = req.sales_rep_role_name;
        }
        if (req.sales_rep_role_name_plural !== undefined) {
            patch.sales_rep_role_name_plural = req.sales_rep_role_name_plural;
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
    __metadata("design:paramtypes", [typeof (_a = typeof partner_repository_1.PartnerRepository !== "undefined" && partner_repository_1.PartnerRepository) === "function" ? _a : Object, typeof (_b = typeof suppliers_reference_lookup_port_1.SuppliersReferenceLookupPort !== "undefined" && suppliers_reference_lookup_port_1.SuppliersReferenceLookupPort) === "function" ? _b : Object])
], UpdatePartnerByExternalIdUseCase);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/partners/domain/entities/partner.entity.ts"
/*!**********************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/partners/domain/entities/partner.entity.ts ***!
  \**********************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Partner = void 0;
class Partner {
    constructor(internal_id, external_id, business_id, acronym, logo_url, co_branding_logo_url, primary_color, secondary_color, light_color, sales_rep_role_name, sales_rep_role_name_plural, api_key_hash, notification_email, webhook_url, send_sales_rep_voucher, disbursement_notification_email, default_rep_id, status_id, created_at, updated_at) {
        this.internal_id = internal_id;
        this.external_id = external_id;
        this.business_id = business_id;
        this.acronym = acronym;
        this.logo_url = logo_url;
        this.co_branding_logo_url = co_branding_logo_url;
        this.primary_color = primary_color;
        this.secondary_color = secondary_color;
        this.light_color = light_color;
        this.sales_rep_role_name = sales_rep_role_name;
        this.sales_rep_role_name_plural = sales_rep_role_name_plural;
        this.api_key_hash = api_key_hash;
        this.notification_email = notification_email;
        this.webhook_url = webhook_url;
        this.send_sales_rep_voucher = send_sales_rep_voucher;
        this.disbursement_notification_email = disbursement_notification_email;
        this.default_rep_id = default_rep_id;
        this.status_id = status_id;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
exports.Partner = Partner;


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

/***/ "./apps/suppliers-ms/src/modules/partners/presentation/dto/create-partner-orchestrator-response.dto.ts"
/*!*************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/partners/presentation/dto/create-partner-orchestrator-response.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePartnerOrchestratorResponseDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class CreatePartnerOrchestratorResponseDto {
}
exports.CreatePartnerOrchestratorResponseDto = CreatePartnerOrchestratorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreatePartnerOrchestratorResponseDto.prototype, "sagaExternalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreatePartnerOrchestratorResponseDto.prototype, "correlationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreatePartnerOrchestratorResponseDto.prototype, "creditFacilityExternalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreatePartnerOrchestratorResponseDto.prototype, "userExternalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreatePartnerOrchestratorResponseDto.prototype, "personExternalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreatePartnerOrchestratorResponseDto.prototype, "businessExternalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreatePartnerOrchestratorResponseDto.prototype, "bankCertificationUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreatePartnerOrchestratorResponseDto.prototype, "logoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreatePartnerOrchestratorResponseDto.prototype, "coBrandingUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreatePartnerOrchestratorResponseDto.prototype, "bankAccountExternalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreatePartnerOrchestratorResponseDto.prototype, "partnerExternalId", void 0);


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
exports.CreatePartnerPayloadDto = exports.PartnerCategoryPayloadDto = void 0;
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class PartnerCategoryPayloadDto {
}
exports.PartnerCategoryPayloadDto = PartnerCategoryPayloadDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PartnerCategoryPayloadDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PartnerCategoryPayloadDto.prototype, "discountPercentage", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PartnerCategoryPayloadDto.prototype, "interestRate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], PartnerCategoryPayloadDto.prototype, "disbursementFeePercent", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], PartnerCategoryPayloadDto.prototype, "minimumDisbursementFee", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PartnerCategoryPayloadDto.prototype, "delayDays", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PartnerCategoryPayloadDto.prototype, "termDays", void 0);
class CreatePartnerPayloadDto {
}
exports.CreatePartnerPayloadDto = CreatePartnerPayloadDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((o) => o.cityId !== null && o.cityId !== undefined && o.cityId !== ''),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", Object)
], CreatePartnerPayloadDto.prototype, "cityId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreatePartnerPayloadDto.prototype, "entityType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreatePartnerPayloadDto.prototype, "businessName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreatePartnerPayloadDto.prototype, "businessAddress", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreatePartnerPayloadDto.prototype, "businessType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreatePartnerPayloadDto.prototype, "relationshipToBusiness", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreatePartnerPayloadDto.prototype, "legalName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreatePartnerPayloadDto.prototype, "tradeName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreatePartnerPayloadDto.prototype, "taxId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Object)
], CreatePartnerPayloadDto.prototype, "yearOfEstablishment", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePartnerPayloadDto.prototype, "bankEntity", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePartnerPayloadDto.prototype, "accountNumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreatePartnerPayloadDto.prototype, "acronym", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreatePartnerPayloadDto.prototype, "secondaryColor", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreatePartnerPayloadDto.prototype, "lightColor", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", Object)
], CreatePartnerPayloadDto.prototype, "notificationEmail", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreatePartnerPayloadDto.prototype, "webhookUrl", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreatePartnerPayloadDto.prototype, "sendSalesRepVoucher", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", Object)
], CreatePartnerPayloadDto.prototype, "disbursementNotificationEmail", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((o) => o.contractId !== null &&
        o.contractId !== undefined &&
        o.contractId !== ''),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", Object)
], CreatePartnerPayloadDto.prototype, "contractId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", String)
], CreatePartnerPayloadDto.prototype, "statusId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePartnerPayloadDto.prototype, "totalLimit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(2),
    __metadata("design:type", Object)
], CreatePartnerPayloadDto.prototype, "countryCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePartnerPayloadDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePartnerPayloadDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePartnerPayloadDto.prototype, "docType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePartnerPayloadDto.prototype, "docNumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreatePartnerPayloadDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreatePartnerPayloadDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PartnerCategoryPayloadDto),
    __metadata("design:type", Array)
], CreatePartnerPayloadDto.prototype, "categories", void 0);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/partners/presentation/mappers/create-partner-orchestrator-response.mapper.ts"
/*!********************************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/partners/presentation/mappers/create-partner-orchestrator-response.mapper.ts ***!
  \********************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.map_orchestrator_result_to_http = map_orchestrator_result_to_http;
const create_partner_orchestrator_response_dto_1 = __webpack_require__(/*! ../dto/create-partner-orchestrator-response.dto */ "./apps/suppliers-ms/src/modules/partners/presentation/dto/create-partner-orchestrator-response.dto.ts");
function map_orchestrator_result_to_http(res) {
    const dto = new create_partner_orchestrator_response_dto_1.CreatePartnerOrchestratorResponseDto();
    dto.sagaExternalId = res.saga_external_id;
    dto.correlationId = res.correlation_id;
    dto.creditFacilityExternalId = res.credit_facility_external_id;
    dto.userExternalId = res.user_external_id;
    dto.personExternalId = res.person_external_id;
    dto.businessExternalId = res.business_external_id;
    dto.bankCertificationUrl = res.bank_certification_url;
    dto.logoUrl = res.logo_url;
    dto.coBrandingUrl = res.co_branding_url;
    dto.bankAccountExternalId = res.bank_account_external_id;
    dto.partnerExternalId = res.partner_external_id;
    return dto;
}


/***/ },

/***/ "./apps/suppliers-ms/src/modules/partners/presentation/mappers/create-partner-payload.mapper.ts"
/*!******************************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/partners/presentation/mappers/create-partner-payload.mapper.ts ***!
  \******************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.map_create_partner_payload_to_command = map_create_partner_payload_to_command;
function map_create_partner_payload_to_command(dto) {
    return {
        city_id: dto.cityId ?? null,
        entity_type: dto.entityType,
        business_name: dto.businessName ?? null,
        business_address: dto.businessAddress ?? null,
        business_type: dto.businessType ?? null,
        relationship_to_business: dto.relationshipToBusiness ?? null,
        legal_name: dto.legalName ?? null,
        trade_name: dto.tradeName ?? null,
        tax_id: dto.taxId ?? null,
        year_of_establishment: dto.yearOfEstablishment ?? null,
        bank_entity: dto.bankEntity,
        account_number: dto.accountNumber,
        acronym: dto.acronym ?? null,
        secondary_color: dto.secondaryColor ?? null,
        light_color: dto.lightColor ?? null,
        notification_email: dto.notificationEmail ?? null,
        webhook_url: dto.webhookUrl ?? null,
        send_sales_rep_voucher: dto.sendSalesRepVoucher,
        disbursement_notification_email: dto.disbursementNotificationEmail ?? null,
        contract_id: dto.contractId ?? null,
        status_id: dto.statusId,
        total_limit: dto.totalLimit,
        country_code: dto.countryCode ?? null,
        first_name: dto.firstName,
        last_name: dto.lastName,
        doc_type: dto.docType,
        doc_number: dto.docNumber,
        phone: dto.phone ?? null,
        email: dto.email,
        categories: (dto.categories ?? []).map((c) => ({
            name: c.name,
            discount_percentage: c.discountPercentage,
            interest_rate: c.interestRate,
            disbursement_fee_percent: c.disbursementFeePercent ?? null,
            minimum_disbursement_fee: c.minimumDisbursementFee ?? null,
            delay_days: c.delayDays,
            term_days: c.termDays,
        })),
    };
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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PartnersController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const crypto_1 = __webpack_require__(/*! crypto */ "crypto");
const platform_express_1 = __webpack_require__(/*! @nestjs/platform-express */ "@nestjs/platform-express");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const create_partner_orchestrator_use_case_1 = __webpack_require__(/*! @modules/partners/application/use-cases/create-partner-orchestrator/create-partner-orchestrator.use-case */ "./apps/suppliers-ms/src/modules/partners/application/use-cases/create-partner-orchestrator/create-partner-orchestrator.use-case.ts");
const update_partner_by_external_id_use_case_1 = __webpack_require__(/*! @modules/partners/application/use-cases/update-partner-by-external-id/update-partner-by-external-id.use-case */ "./apps/suppliers-ms/src/modules/partners/application/use-cases/update-partner-by-external-id/update-partner-by-external-id.use-case.ts");
const partner_onboarding_files_port_1 = __webpack_require__(/*! @modules/partners/application/ports/partner-onboarding-files.port */ "./apps/suppliers-ms/src/modules/partners/application/ports/partner-onboarding-files.port.ts");
const create_partner_payload_dto_1 = __webpack_require__(/*! ./dto/create-partner-payload.dto */ "./apps/suppliers-ms/src/modules/partners/presentation/dto/create-partner-payload.dto.ts");
const create_partner_payload_mapper_1 = __webpack_require__(/*! ./mappers/create-partner-payload.mapper */ "./apps/suppliers-ms/src/modules/partners/presentation/mappers/create-partner-payload.mapper.ts");
const create_partner_orchestrator_response_mapper_1 = __webpack_require__(/*! ./mappers/create-partner-orchestrator-response.mapper */ "./apps/suppliers-ms/src/modules/partners/presentation/mappers/create-partner-orchestrator-response.mapper.ts");
let PartnersController = class PartnersController {
    constructor(create_partner_orchestrator, update_partner, partner_files) {
        this.create_partner_orchestrator = create_partner_orchestrator;
        this.update_partner = update_partner;
        this.partner_files = partner_files;
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
        const command = (0, create_partner_payload_mapper_1.map_create_partner_payload_to_command)(dto);
        const uploaded = this.to_uploaded_meta(files);
        const result = await this.create_partner_orchestrator.execute(command, {
            bank_certification: uploaded.bank_certification,
            logo: uploaded.logo,
            co_branding: uploaded.co_branding,
        });
        return (0, create_partner_orchestrator_response_mapper_1.map_orchestrator_result_to_http)(result);
    }
    async update(id, payload_raw, files) {
        const file_correlation_id = (0, crypto_1.randomUUID)();
        let patch = {};
        if (payload_raw !== undefined && payload_raw.length > 0) {
            try {
                patch = JSON.parse(payload_raw);
            }
            catch {
                throw new common_1.BadRequestException('payload debe ser JSON válido');
            }
        }
        const uploaded = this.to_uploaded_meta(files);
        let logo_url = patch.logoUrl === null || patch.logoUrl === undefined
            ? undefined
            : String(patch.logoUrl);
        let co_branding_url = patch.coBrandingUrl === null || patch.coBrandingUrl === undefined
            ? undefined
            : String(patch.coBrandingUrl);
        if (uploaded.logo !== undefined ||
            uploaded.co_branding !== undefined ||
            uploaded.bank_certification !== undefined) {
            const urls = await this.partner_files.resolve_urls({
                correlation_id: file_correlation_id,
                idempotency_key: file_correlation_id,
                bank_certification: uploaded.bank_certification,
                logo: uploaded.logo,
                co_branding: uploaded.co_branding,
            });
            if (uploaded.logo !== undefined) {
                logo_url = urls.logo_url;
            }
            if (uploaded.co_branding !== undefined) {
                co_branding_url = urls.co_branding_url;
            }
        }
        return {
            logo_url,
            co_branding_url,
        };
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
    (0, swagger_1.ApiOperation)({ summary: 'Alta orquestada de partner (saga + SQS)' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: 'Campo `payload` (JSON string) + archivos opcionales bankCertification, logo, coBranding',
        schema: {
            type: 'object',
            properties: {
                payload: { type: 'string', description: 'JSON CreatePartnerPayloadDto' },
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
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], PartnersController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar partner (multipart opcional para logos)' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
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
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], PartnersController.prototype, "update", null);
exports.PartnersController = PartnersController = __decorate([
    (0, swagger_1.ApiTags)('partners'),
    (0, common_1.Controller)('partners'),
    __param(2, (0, common_1.Inject)(partner_onboarding_files_port_1.PARTNER_ONBOARDING_FILES_PORT)),
    __metadata("design:paramtypes", [typeof (_a = typeof create_partner_orchestrator_use_case_1.CreatePartnerOrchestratorUseCase !== "undefined" && create_partner_orchestrator_use_case_1.CreatePartnerOrchestratorUseCase) === "function" ? _a : Object, typeof (_b = typeof update_partner_by_external_id_use_case_1.UpdatePartnerByExternalIdUseCase !== "undefined" && update_partner_by_external_id_use_case_1.UpdatePartnerByExternalIdUseCase) === "function" ? _b : Object, Object])
], PartnersController);


/***/ },

/***/ "./apps/suppliers-ms/src/modules/suppliers/domain/entities/supplier.entity.ts"
/*!************************************************************************************!*\
  !*** ./apps/suppliers-ms/src/modules/suppliers/domain/entities/supplier.entity.ts ***!
  \************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Supplier = void 0;
class Supplier {
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
let SuppliersModule = class SuppliersModule {
};
exports.SuppliersModule = SuppliersModule;
exports.SuppliersModule = SuppliersModule = __decorate([
    (0, common_1.Module)({
        providers: [],
        exports: [],
    })
], SuppliersModule);


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

/***/ "./libs/shared/src/domain/repository.interface.ts"
/*!********************************************************!*\
  !*** ./libs/shared/src/domain/repository.interface.ts ***!
  \********************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));


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
__exportStar(__webpack_require__(/*! ./domain/domain-event.interface */ "./libs/shared/src/domain/domain-event.interface.ts"), exports);
__exportStar(__webpack_require__(/*! ./domain/entity.base */ "./libs/shared/src/domain/entity.base.ts"), exports);
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
    constructor(sqs_client, logger) {
        this.sqs_client = sqs_client;
        this.logger = logger;
        this.stopped = false;
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
exports.create_prefixed_logger = create_prefixed_logger;
function create_prefixed_logger(scope, trace_id) {
    const prefix = trace_id ? `[${scope}][${trace_id}]` : `[${scope}]`;
    const line = (level, message, meta) => {
        const payload = meta && Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : '';
        const text = `${prefix} ${message}${payload}`;
        if (level === 'error') {
            console.error(text);
        }
        else if (level === 'warn') {
            console.warn(text);
        }
        else {
            console.log(text);
        }
    };
    return {
        debug: (m, meta) => line('debug', m, meta),
        info: (m, meta) => line('info', m, meta),
        warn: (m, meta) => line('warn', m, meta),
        error: (m, meta) => line('error', m, meta),
    };
}


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
    constructor() {
        this.offset = 0;
        this.limit = 20;
    }
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BankAccountEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_external_id_entity_1 = __webpack_require__(/*! ./base-external-id.entity */ "./libs/suppliers-data/src/entities/base-external-id.entity.ts");
const aes_256_transformer_1 = __webpack_require__(/*! ../transformers/aes-256.transformer */ "./libs/suppliers-data/src/transformers/aes-256.transformer.ts");
let BankAccountEntity = class BankAccountEntity extends base_external_id_entity_1.BaseExternalIdEntity {
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BusinessEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const person_entity_1 = __webpack_require__(/*! ../../../transversal-data/src/entities/person.entity */ "./libs/transversal-data/src/entities/person.entity.ts");
const base_external_id_entity_1 = __webpack_require__(/*! ./base-external-id.entity */ "./libs/suppliers-data/src/entities/base-external-id.entity.ts");
let BusinessEntity = class BusinessEntity extends base_external_id_entity_1.BaseExternalIdEntity {
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


/***/ },

/***/ "./libs/suppliers-data/src/entities/onboarding.entity.ts"
/*!***************************************************************!*\
  !*** ./libs/suppliers-data/src/entities/onboarding.entity.ts ***!
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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OnboardingEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_external_id_entity_1 = __webpack_require__(/*! ./base-external-id.entity */ "./libs/suppliers-data/src/entities/base-external-id.entity.ts");
let OnboardingEntity = class OnboardingEntity extends base_external_id_entity_1.BaseExternalIdEntity {
};
exports.OnboardingEntity = OnboardingEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'bigint' }),
    __metadata("design:type", Number)
], OnboardingEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_product_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "userProductId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'partner_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "partnerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'partner_category_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "partnerCategoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sales_rep_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "salesRepId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'business_name',
        type: 'varchar',
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "businessName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'business_relation_id',
        type: 'bigint',
        nullable: true,
        default: () => "get_status_id('credit_applications_bnpl', 'business_relation')",
    }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "businessRelationId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'business_type_name',
        type: 'varchar',
        length: 250,
        nullable: true,
    }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "businessTypeName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'business_type_code', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "businessTypeCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'business_address', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "businessAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'business_city',
        type: 'varchar',
        length: 120,
        nullable: true,
    }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "businessCity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'business_rent_amount', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "businessRentAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'number_of_locations', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "numberOfLocations", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'number_of_employees', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "numberOfEmployees", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'business_seniority_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "businessSeniorityId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sector_experience', type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "sectorExperience", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'relationship_to_business', type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "relationshipToBusiness", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'monthly_income', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "monthlyIncome", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'monthly_expenses', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "monthlyExpenses", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'monthly_purchases', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "monthlyPurchases", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'current_purchases', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "currentPurchases", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_assets', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "totalAssets", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'requested_credit_line', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "requestedCreditLine", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_current_client', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], OnboardingEntity.prototype, "isCurrentClient", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status_id',
        type: 'bigint',
        default: () => "get_status_id('credit_applications_bnpl', 'authorized')",
    }),
    __metadata("design:type", Number)
], OnboardingEntity.prototype, "statusId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'submission_date', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "submissionDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'approval_date', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "approvalDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'rejection_reason',
        type: 'varchar',
        length: 500,
        nullable: true,
    }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "rejectionReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'credit_study_date', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "creditStudyDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'credit_score',
        type: 'decimal',
        precision: 8,
        scale: 2,
        nullable: true,
    }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "creditScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'credit_decision', type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "creditDecision", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'approved_credit_line', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "approvedCreditLine", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'analyst_report', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "analystReport", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'risk_profile', type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "riskProfile", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'privacy_policy_accepted', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], OnboardingEntity.prototype, "privacyPolicyAccepted", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'privacy_policy_date', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "privacyPolicyDate", void 0);
exports.OnboardingEntity = OnboardingEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'credit_applications_bnpl', schema: 'suppliers_schema' })
], OnboardingEntity);


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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PartnerOnboardingSagaEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let PartnerOnboardingSagaEntity = class PartnerOnboardingSagaEntity {
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PartnersEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_external_id_entity_1 = __webpack_require__(/*! ./base-external-id.entity */ "./libs/suppliers-data/src/entities/base-external-id.entity.ts");
let PartnersEntity = class PartnersEntity extends base_external_id_entity_1.BaseExternalIdEntity {
};
exports.PartnersEntity = PartnersEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'business_id', type: 'bigint' }),
    __metadata("design:type", Number)
], PartnersEntity.prototype, "businessId", void 0);
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
    (0, typeorm_1.Column)({
        name: 'sales_rep_role_name',
        type: 'varchar',
        length: 50,
        default: 'Sales Rep',
        nullable: true,
    }),
    __metadata("design:type", Object)
], PartnersEntity.prototype, "salesRepRoleName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'sales_rep_role_name_plural',
        type: 'varchar',
        length: 50,
        default: 'Sales Reps',
        nullable: true,
    }),
    __metadata("design:type", Object)
], PartnersEntity.prototype, "salesRepRoleNamePlural", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'api_key_hash',
        type: 'boolean',
        default: false,
    }),
    __metadata("design:type", Boolean)
], PartnersEntity.prototype, "apiKeyHash", void 0);
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
    (0, typeorm_1.Column)({ name: 'default_rep_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], PartnersEntity.prototype, "defaultRepId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status_id',
        type: 'bigint',
        nullable: false,
        default: () => "get_status_id('partners', 'active')",
    }),
    __metadata("design:type", Number)
], PartnersEntity.prototype, "statusId", void 0);
exports.PartnersEntity = PartnersEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'partners', schema: 'suppliers_schema' })
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SalesRepresentativeEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_external_id_entity_1 = __webpack_require__(/*! ./base-external-id.entity */ "./libs/suppliers-data/src/entities/base-external-id.entity.ts");
let SalesRepresentativeEntity = class SalesRepresentativeEntity extends base_external_id_entity_1.BaseExternalIdEntity {
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
__decorate([
    (0, typeorm_1.Column)({ name: 'name', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], SalesRepresentativeEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'role', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], SalesRepresentativeEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status_id', type: 'bigint' }),
    __metadata("design:type", Number)
], SalesRepresentativeEntity.prototype, "statusId", void 0);
exports.SalesRepresentativeEntity = SalesRepresentativeEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'sales_representatives', schema: 'suppliers_schema' })
], SalesRepresentativeEntity);


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SupplierEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_external_id_entity_1 = __webpack_require__(/*! ./base-external-id.entity */ "./libs/suppliers-data/src/entities/base-external-id.entity.ts");
const bank_account_entity_1 = __webpack_require__(/*! ./bank-account.entity */ "./libs/suppliers-data/src/entities/bank-account.entity.ts");
let SupplierEntity = class SupplierEntity extends base_external_id_entity_1.BaseExternalIdEntity {
};
exports.SupplierEntity = SupplierEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'business_id', type: 'bigint', unique: true }),
    __metadata("design:type", Number)
], SupplierEntity.prototype, "businessId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => bank_account_entity_1.BankAccountEntity, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'bank_account_id' }),
    __metadata("design:type", Object)
], SupplierEntity.prototype, "bankAccount", void 0);
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
__exportStar(__webpack_require__(/*! ./entities/bank-account.entity */ "./libs/suppliers-data/src/entities/bank-account.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/business.entity */ "./libs/suppliers-data/src/entities/business.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/onboarding.entity */ "./libs/suppliers-data/src/entities/onboarding.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/partners.entity */ "./libs/suppliers-data/src/entities/partners.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/partner-onboarding-saga.entity */ "./libs/suppliers-data/src/entities/partner-onboarding-saga.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/order.entity */ "./libs/suppliers-data/src/entities/order.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/sales-representative.entity */ "./libs/suppliers-data/src/entities/sales-representative.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/supplier.entity */ "./libs/suppliers-data/src/entities/supplier.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./suppliers-data.module */ "./libs/suppliers-data/src/suppliers-data.module.ts"), exports);
__exportStar(__webpack_require__(/*! ./suppliers-data.service */ "./libs/suppliers-data/src/suppliers-data.service.ts"), exports);
__exportStar(__webpack_require__(/*! ./transformers/aes-256.transformer */ "./libs/suppliers-data/src/transformers/aes-256.transformer.ts"), exports);


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
const bank_account_entity_1 = __webpack_require__(/*! ./entities/bank-account.entity */ "./libs/suppliers-data/src/entities/bank-account.entity.ts");
const business_entity_1 = __webpack_require__(/*! ./entities/business.entity */ "./libs/suppliers-data/src/entities/business.entity.ts");
const onboarding_entity_1 = __webpack_require__(/*! ./entities/onboarding.entity */ "./libs/suppliers-data/src/entities/onboarding.entity.ts");
const partners_entity_1 = __webpack_require__(/*! ./entities/partners.entity */ "./libs/suppliers-data/src/entities/partners.entity.ts");
const order_entity_1 = __webpack_require__(/*! ./entities/order.entity */ "./libs/suppliers-data/src/entities/order.entity.ts");
const sales_representative_entity_1 = __webpack_require__(/*! ./entities/sales-representative.entity */ "./libs/suppliers-data/src/entities/sales-representative.entity.ts");
const supplier_entity_1 = __webpack_require__(/*! ./entities/supplier.entity */ "./libs/suppliers-data/src/entities/supplier.entity.ts");
const partner_onboarding_saga_entity_1 = __webpack_require__(/*! ./entities/partner-onboarding-saga.entity */ "./libs/suppliers-data/src/entities/partner-onboarding-saga.entity.ts");
const suppliers_data_service_1 = __webpack_require__(/*! ./suppliers-data.service */ "./libs/suppliers-data/src/suppliers-data.service.ts");
exports.SUPPLIERS_DATA_ENTITIES = [
    bank_account_entity_1.BankAccountEntity,
    business_entity_1.BusinessEntity,
    onboarding_entity_1.OnboardingEntity,
    partners_entity_1.PartnersEntity,
    partner_onboarding_saga_entity_1.PartnerOnboardingSagaEntity,
    order_entity_1.PurchaseOrderEntity,
    sales_representative_entity_1.SalesRepresentativeEntity,
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

/***/ "./libs/transversal-data/src/entities/business-seniority.entity.ts"
/*!*************************************************************************!*\
  !*** ./libs/transversal-data/src/entities/business-seniority.entity.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BusinessSeniorityEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_external_id_entity_1 = __webpack_require__(/*! ./base-external-id.entity */ "./libs/transversal-data/src/entities/base-external-id.entity.ts");
let BusinessSeniorityEntity = class BusinessSeniorityEntity extends base_external_id_entity_1.BaseExternalIdEntity {
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
    (0, typeorm_1.Entity)({ name: 'business_seniority', schema: 'transversal_schema' })
], BusinessSeniorityEntity);


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

/***/ "./libs/transversal-data/src/entities/contract-signer.entity.ts"
/*!**********************************************************************!*\
  !*** ./libs/transversal-data/src/entities/contract-signer.entity.ts ***!
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContractSignerEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_external_id_entity_1 = __webpack_require__(/*! ../../../products-data/src/entities/base-external-id.entity */ "./libs/products-data/src/entities/base-external-id.entity.ts");
let ContractSignerEntity = class ContractSignerEntity extends base_external_id_entity_1.BaseExternalIdEntity {
};
exports.ContractSignerEntity = ContractSignerEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'contract_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], ContractSignerEntity.prototype, "contractId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'person_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], ContractSignerEntity.prototype, "personId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'zapsign_signer_token', type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], ContractSignerEntity.prototype, "zapsignSignerToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status_id', type: 'bigint' }),
    __metadata("design:type", Number)
], ContractSignerEntity.prototype, "statusId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sign_url', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ContractSignerEntity.prototype, "signUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ip_address', type: 'varchar', length: 45, nullable: true }),
    __metadata("design:type", Object)
], ContractSignerEntity.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'geo_latitude', type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", Object)
], ContractSignerEntity.prototype, "geoLatitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'geo_longitude', type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", Object)
], ContractSignerEntity.prototype, "geoLongitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'signed_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], ContractSignerEntity.prototype, "signedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'document_photo_url', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ContractSignerEntity.prototype, "documentPhotoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'document_verse_photo_url', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ContractSignerEntity.prototype, "documentVersePhotoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'selfie_photo_url', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ContractSignerEntity.prototype, "selfiePhotoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'signature_image_url', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ContractSignerEntity.prototype, "signatureImageUrl", void 0);
exports.ContractSignerEntity = ContractSignerEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'contract_signers', schema: 'transversal_schema' })
], ContractSignerEntity);


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
const base_external_id_entity_1 = __webpack_require__(/*! ../../../products-data/src/entities/base-external-id.entity */ "./libs/products-data/src/entities/base-external-id.entity.ts");
let CurrencyEntity = class CurrencyEntity extends base_external_id_entity_1.BaseExternalIdEntity {
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

/***/ "./libs/transversal-data/src/entities/document-type.entity.ts"
/*!********************************************************************!*\
  !*** ./libs/transversal-data/src/entities/document-type.entity.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DocumentTypeEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_external_id_entity_1 = __webpack_require__(/*! ../../../products-data/src/entities/base-external-id.entity */ "./libs/products-data/src/entities/base-external-id.entity.ts");
let DocumentTypeEntity = class DocumentTypeEntity extends base_external_id_entity_1.BaseExternalIdEntity {
};
exports.DocumentTypeEntity = DocumentTypeEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'document_type', type: 'varchar' }),
    __metadata("design:type", String)
], DocumentTypeEntity.prototype, "documentType", void 0);
exports.DocumentTypeEntity = DocumentTypeEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'documents', schema: 'transversal_schema' })
], DocumentTypeEntity);


/***/ },

/***/ "./libs/transversal-data/src/entities/guarantor.entity.ts"
/*!****************************************************************!*\
  !*** ./libs/transversal-data/src/entities/guarantor.entity.ts ***!
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GuarantorEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_external_id_entity_1 = __webpack_require__(/*! ../../../products-data/src/entities/base-external-id.entity */ "./libs/products-data/src/entities/base-external-id.entity.ts");
let GuarantorEntity = class GuarantorEntity extends base_external_id_entity_1.BaseExternalIdEntity {
};
exports.GuarantorEntity = GuarantorEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'credit_application_id', type: 'bigint' }),
    __metadata("design:type", Number)
], GuarantorEntity.prototype, "creditApplicationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'person_id', type: 'bigint' }),
    __metadata("design:type", Number)
], GuarantorEntity.prototype, "personId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contract_signer_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], GuarantorEntity.prototype, "contractSignerId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'guarantor_type',
        type: 'varchar',
        length: 20,
    }),
    __metadata("design:type", String)
], GuarantorEntity.prototype, "guarantorType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'relationship_to_applicant',
        type: 'varchar',
        length: 100,
        nullable: true,
    }),
    __metadata("design:type", Object)
], GuarantorEntity.prototype, "relationshipToApplicant", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_primary_guarantor', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], GuarantorEntity.prototype, "isPrimaryGuarantor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'selected_after_credit_check', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], GuarantorEntity.prototype, "selectedAfterCreditCheck", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'signature_url', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], GuarantorEntity.prototype, "signatureUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'signature_date', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], GuarantorEntity.prototype, "signatureDate", void 0);
exports.GuarantorEntity = GuarantorEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'guarantors', schema: 'transversal_schema' })
], GuarantorEntity);


/***/ },

/***/ "./libs/transversal-data/src/entities/legal-representative.entity.ts"
/*!***************************************************************************!*\
  !*** ./libs/transversal-data/src/entities/legal-representative.entity.ts ***!
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
exports.LegalRepresentativeEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_external_id_entity_1 = __webpack_require__(/*! ../../../products-data/src/entities/base-external-id.entity */ "./libs/products-data/src/entities/base-external-id.entity.ts");
let LegalRepresentativeEntity = class LegalRepresentativeEntity extends base_external_id_entity_1.BaseExternalIdEntity {
};
exports.LegalRepresentativeEntity = LegalRepresentativeEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'company_id', type: 'bigint' }),
    __metadata("design:type", Number)
], LegalRepresentativeEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'person_id', type: 'bigint' }),
    __metadata("design:type", Number)
], LegalRepresentativeEntity.prototype, "personId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_primary', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], LegalRepresentativeEntity.prototype, "isPrimary", void 0);
exports.LegalRepresentativeEntity = LegalRepresentativeEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'legal_representatives', schema: 'transversal_schema' })
], LegalRepresentativeEntity);


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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PersonEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_external_id_entity_1 = __webpack_require__(/*! ../../../products-data/src/entities/base-external-id.entity */ "./libs/products-data/src/entities/base-external-id.entity.ts");
let PersonEntity = class PersonEntity extends base_external_id_entity_1.BaseExternalIdEntity {
};
exports.PersonEntity = PersonEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'bigint' }),
    __metadata("design:type", Number)
], PersonEntity.prototype, "userId", void 0);
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_external_id_entity_1 = __webpack_require__(/*! ../../../products-data/src/entities/base-external-id.entity */ "./libs/products-data/src/entities/base-external-id.entity.ts");
let RoleEntity = class RoleEntity extends base_external_id_entity_1.BaseExternalIdEntity {
};
exports.RoleEntity = RoleEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'name', type: 'varchar', length: 80, unique: true }),
    __metadata("design:type", String)
], RoleEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'description', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], RoleEntity.prototype, "description", void 0);
exports.RoleEntity = RoleEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'roles', schema: 'transversal_schema' })
], RoleEntity);


/***/ },

/***/ "./libs/transversal-data/src/entities/shareholder.entity.ts"
/*!******************************************************************!*\
  !*** ./libs/transversal-data/src/entities/shareholder.entity.ts ***!
  \******************************************************************/
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
exports.ShareholderEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_external_id_entity_1 = __webpack_require__(/*! ../../../products-data/src/entities/base-external-id.entity */ "./libs/products-data/src/entities/base-external-id.entity.ts");
let ShareholderEntity = class ShareholderEntity extends base_external_id_entity_1.BaseExternalIdEntity {
};
exports.ShareholderEntity = ShareholderEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'company_id', type: 'bigint' }),
    __metadata("design:type", Number)
], ShareholderEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'person_id', type: 'bigint' }),
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
    (0, typeorm_1.Column)({ name: 'credit_check_required', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ShareholderEntity.prototype, "creditCheckRequired", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'credit_check_completed', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ShareholderEntity.prototype, "creditCheckCompleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_legal_representative', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ShareholderEntity.prototype, "isLegalRepresentative", void 0);
exports.ShareholderEntity = ShareholderEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'shareholders', schema: 'transversal_schema' })
], ShareholderEntity);


/***/ },

/***/ "./libs/transversal-data/src/entities/status.entity.ts"
/*!*************************************************************!*\
  !*** ./libs/transversal-data/src/entities/status.entity.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StatusEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_external_id_entity_1 = __webpack_require__(/*! ../../../products-data/src/entities/base-external-id.entity */ "./libs/products-data/src/entities/base-external-id.entity.ts");
let StatusEntity = class StatusEntity extends base_external_id_entity_1.BaseExternalIdEntity {
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
    (0, typeorm_1.Entity)({ name: 'statuses', schema: 'transversal_schema' }),
    (0, typeorm_1.Index)(['entityType', 'code'], { unique: true })
], StatusEntity);


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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadFilesIdempotencyEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let UploadFilesIdempotencyEntity = class UploadFilesIdempotencyEntity {
};
exports.UploadFilesIdempotencyEntity = UploadFilesIdempotencyEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", String)
], UploadFilesIdempotencyEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'idempotency_key', type: 'varchar', length: 512, unique: true }),
    __metadata("design:type", String)
], UploadFilesIdempotencyEntity.prototype, "idempotency_key", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'correlation_id', type: 'uuid' }),
    __metadata("design:type", String)
], UploadFilesIdempotencyEntity.prototype, "correlation_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'result_files', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], UploadFilesIdempotencyEntity.prototype, "result_files", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], UploadFilesIdempotencyEntity.prototype, "created_at", void 0);
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_external_id_entity_1 = __webpack_require__(/*! ../../../products-data/src/entities/base-external-id.entity */ "./libs/products-data/src/entities/base-external-id.entity.ts");
let UserEntity = class UserEntity extends base_external_id_entity_1.BaseExternalIdEntity {
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'cognito_sub', type: 'uuid', unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "cognitoSub", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email', type: 'varchar', unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'role_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], UserEntity.prototype, "roleId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status_id',
        type: 'bigint',
        default: () => "get_status_id('users', 'active')",
    }),
    __metadata("design:type", Number)
], UserEntity.prototype, "statusId", void 0);
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
__exportStar(__webpack_require__(/*! ./entities/business-seniority.entity */ "./libs/transversal-data/src/entities/business-seniority.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/city.entity */ "./libs/transversal-data/src/entities/city.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/contract-signer.entity */ "./libs/transversal-data/src/entities/contract-signer.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/currency.entity */ "./libs/transversal-data/src/entities/currency.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/document-type.entity */ "./libs/transversal-data/src/entities/document-type.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/guarantor.entity */ "./libs/transversal-data/src/entities/guarantor.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/legal-representative.entity */ "./libs/transversal-data/src/entities/legal-representative.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/permission.entity */ "./libs/transversal-data/src/entities/permission.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/person.entity */ "./libs/transversal-data/src/entities/person.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/role.entity */ "./libs/transversal-data/src/entities/role.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/role-permission.entity */ "./libs/transversal-data/src/entities/role-permission.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/shareholder.entity */ "./libs/transversal-data/src/entities/shareholder.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/status.entity */ "./libs/transversal-data/src/entities/status.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/upload-files-idempotency.entity */ "./libs/transversal-data/src/entities/upload-files-idempotency.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/user.entity */ "./libs/transversal-data/src/entities/user.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./transversal-data.module */ "./libs/transversal-data/src/transversal-data.module.ts"), exports);
__exportStar(__webpack_require__(/*! ./transversal-data.service */ "./libs/transversal-data/src/transversal-data.service.ts"), exports);


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
const business_seniority_entity_1 = __webpack_require__(/*! ./entities/business-seniority.entity */ "./libs/transversal-data/src/entities/business-seniority.entity.ts");
const city_entity_1 = __webpack_require__(/*! ./entities/city.entity */ "./libs/transversal-data/src/entities/city.entity.ts");
const contract_signer_entity_1 = __webpack_require__(/*! ./entities/contract-signer.entity */ "./libs/transversal-data/src/entities/contract-signer.entity.ts");
const currency_entity_1 = __webpack_require__(/*! ./entities/currency.entity */ "./libs/transversal-data/src/entities/currency.entity.ts");
const document_type_entity_1 = __webpack_require__(/*! ./entities/document-type.entity */ "./libs/transversal-data/src/entities/document-type.entity.ts");
const guarantor_entity_1 = __webpack_require__(/*! ./entities/guarantor.entity */ "./libs/transversal-data/src/entities/guarantor.entity.ts");
const legal_representative_entity_1 = __webpack_require__(/*! ./entities/legal-representative.entity */ "./libs/transversal-data/src/entities/legal-representative.entity.ts");
const permission_entity_1 = __webpack_require__(/*! ./entities/permission.entity */ "./libs/transversal-data/src/entities/permission.entity.ts");
const person_entity_1 = __webpack_require__(/*! ./entities/person.entity */ "./libs/transversal-data/src/entities/person.entity.ts");
const role_entity_1 = __webpack_require__(/*! ./entities/role.entity */ "./libs/transversal-data/src/entities/role.entity.ts");
const role_permission_entity_1 = __webpack_require__(/*! ./entities/role-permission.entity */ "./libs/transversal-data/src/entities/role-permission.entity.ts");
const shareholder_entity_1 = __webpack_require__(/*! ./entities/shareholder.entity */ "./libs/transversal-data/src/entities/shareholder.entity.ts");
const status_entity_1 = __webpack_require__(/*! ./entities/status.entity */ "./libs/transversal-data/src/entities/status.entity.ts");
const upload_files_idempotency_entity_1 = __webpack_require__(/*! ./entities/upload-files-idempotency.entity */ "./libs/transversal-data/src/entities/upload-files-idempotency.entity.ts");
const user_entity_1 = __webpack_require__(/*! ./entities/user.entity */ "./libs/transversal-data/src/entities/user.entity.ts");
const transversal_data_service_1 = __webpack_require__(/*! ./transversal-data.service */ "./libs/transversal-data/src/transversal-data.service.ts");
exports.TRANSVERSAL_DATA_ENTITIES = [
    business_seniority_entity_1.BusinessSeniorityEntity,
    city_entity_1.CityEntity,
    contract_signer_entity_1.ContractSignerEntity,
    currency_entity_1.CurrencyEntity,
    document_type_entity_1.DocumentTypeEntity,
    guarantor_entity_1.GuarantorEntity,
    legal_representative_entity_1.LegalRepresentativeEntity,
    permission_entity_1.PermissionEntity,
    person_entity_1.PersonEntity,
    role_entity_1.RoleEntity,
    role_permission_entity_1.RolePermissionEntity,
    shareholder_entity_1.ShareholderEntity,
    status_entity_1.StatusEntity,
    upload_files_idempotency_entity_1.UploadFilesIdempotencyEntity,
    user_entity_1.UserEntity,
];
let TransversalDataModule = class TransversalDataModule {
};
exports.TransversalDataModule = TransversalDataModule;
exports.TransversalDataModule = TransversalDataModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([...exports.TRANSVERSAL_DATA_ENTITIES])],
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