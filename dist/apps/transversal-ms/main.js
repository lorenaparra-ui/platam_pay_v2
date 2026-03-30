/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/transversal-ms/src/app.controller.ts"
/*!***************************************************!*\
  !*** ./apps/transversal-ms/src/app.controller.ts ***!
  \***************************************************/
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
const health_response_dto_1 = __webpack_require__(/*! @common/dto/health-response.dto */ "./apps/transversal-ms/src/common/dto/health-response.dto.ts");
let appController = class appController {
    health() {
        return { status: 'ok', service: 'transversal-ms' };
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

/***/ "./apps/transversal-ms/src/app.module.ts"
/*!***********************************************!*\
  !*** ./apps/transversal-ms/src/app.module.ts ***!
  \***********************************************/
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
const dotenv_config_1 = __webpack_require__(/*! ./config/dotenv.config */ "./apps/transversal-ms/src/config/dotenv.config.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const infrastructure_module_1 = __webpack_require__(/*! @infrastructure/infrastructure.module */ "./apps/transversal-ms/src/infrastructure/infrastructure.module.ts");
const persons_module_1 = __webpack_require__(/*! @modules/persons/persons.module */ "./apps/transversal-ms/src/modules/persons/persons.module.ts");
const users_module_1 = __webpack_require__(/*! @modules/users/users.module */ "./apps/transversal-ms/src/modules/users/users.module.ts");
const app_config_1 = __importDefault(__webpack_require__(/*! ./config/app.config */ "./apps/transversal-ms/src/config/app.config.ts"));
const sqs_config_1 = __webpack_require__(/*! ./config/sqs.config */ "./apps/transversal-ms/src/config/sqs.config.ts");
const app_controller_1 = __webpack_require__(/*! ./app.controller */ "./apps/transversal-ms/src/app.controller.ts");
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
            persons_module_1.PersonsModule,
            users_module_1.UsersModule,
        ],
        controllers: [app_controller_1.appController],
    })
], AppModule);


/***/ },

/***/ "./apps/transversal-ms/src/common/dto/health-response.dto.ts"
/*!*******************************************************************!*\
  !*** ./apps/transversal-ms/src/common/dto/health-response.dto.ts ***!
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
    (0, swagger_1.ApiProperty)({ example: 'transversal-ms' }),
    __metadata("design:type", String)
], HealthResponseDto.prototype, "service", void 0);


/***/ },

/***/ "./apps/transversal-ms/src/config/app.config.ts"
/*!******************************************************!*\
  !*** ./apps/transversal-ms/src/config/app.config.ts ***!
  \******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
exports["default"] = (0, config_1.registerAs)('config', () => {
    return {
        environment: process.env.APP_ENV || 'development',
        port: process.env.TRANSVERSAL_MS_PORT || 8080,
        rues_api_base_url: process.env.RUES_API_BASE_URL || 'https://ollama-rues.5n921h.easypanel.host',
        cognito: {
            region: process.env.COGNITO_REGION ?? process.env.AWS_REGION ?? 'us-east-1',
            userPoolId: process.env.COGNITO_USER_POOL_ID ?? '',
            clientId: process.env.COGNITO_CLIENT_ID ?? '',
            clientSecret: process.env.COGNITO_CLIENT_SECRET ?? '',
        },
        mfa: {
            issuer: process.env.MFA_ISSUER || 'Platam Pay',
        },
        storage: {
            s3: {
                region: process.env.AWS_S3_REGION || 'us-east-2',
                bucket: process.env.AWS_S3_BUCKET ?? '',
                public_base_url: process.env.AWS_S3_PUBLIC_BASE_URL ?? '',
            },
        },
    };
});


/***/ },

/***/ "./apps/transversal-ms/src/config/dotenv.config.ts"
/*!*********************************************************!*\
  !*** ./apps/transversal-ms/src/config/dotenv.config.ts ***!
  \*********************************************************/
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

/***/ "./apps/transversal-ms/src/config/sqs.config.ts"
/*!******************************************************!*\
  !*** ./apps/transversal-ms/src/config/sqs.config.ts ***!
  \******************************************************/
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

/***/ "./apps/transversal-ms/src/config/typeorm.config.ts"
/*!**********************************************************!*\
  !*** ./apps/transversal-ms/src/config/typeorm.config.ts ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ./dotenv.config */ "./apps/transversal-ms/src/config/dotenv.config.ts");
const transversal_data_1 = __webpack_require__(/*! @app/transversal-data */ "./libs/transversal-data/src/index.ts");
const TypeormConfig = {
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USERNAME,
    port: Number(process.env.TYPEORM_PORT ?? 5432),
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    entities: [...transversal_data_1.TRANSVERSAL_DATA_ENTITIES],
    synchronize: false,
    migrationsRun: false,
    migrationsTableName: "typeorm_migrations",
};
exports["default"] = TypeormConfig;


/***/ },

/***/ "./apps/transversal-ms/src/infrastructure/database/adapters/typeorm-upload-files-idempotency.adapter.ts"
/*!**************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/infrastructure/database/adapters/typeorm-upload-files-idempotency.adapter.ts ***!
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
exports.TypeormUploadFilesIdempotencyAdapter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const transversal_data_1 = __webpack_require__(/*! @app/transversal-data */ "./libs/transversal-data/src/index.ts");
const PG_UNIQUE_VIOLATION = '23505';
const STALE_PROCESSING_MS = 30 * 60 * 1000;
let TypeormUploadFilesIdempotencyAdapter = class TypeormUploadFilesIdempotencyAdapter {
    constructor(repo) {
        this.repo = repo;
    }
    async begin(key, correlation_id) {
        const row = this.repo.create({
            idempotency_key: key,
            correlation_id,
            result_files: null,
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
        if (existing.result_files !== null) {
            return {
                status: 'duplicate',
                result: { files: existing.result_files },
            };
        }
        const age_ms = Date.now() - existing.created_at.getTime();
        if (age_ms > STALE_PROCESSING_MS) {
            await this.repo.delete({ idempotency_key: key });
            return this.begin(key, correlation_id);
        }
        return { status: 'conflict' };
    }
    async complete(key, result) {
        await this.repo.update({ idempotency_key: key }, { result_files: [...result.files] });
    }
    async release(key) {
        await this.repo.delete({ idempotency_key: key });
    }
    is_unique_violation(err) {
        return err instanceof typeorm_2.QueryFailedError && err.driverError !== undefined
            ? String(err.driverError.code) === PG_UNIQUE_VIOLATION
            : false;
    }
};
exports.TypeormUploadFilesIdempotencyAdapter = TypeormUploadFilesIdempotencyAdapter;
exports.TypeormUploadFilesIdempotencyAdapter = TypeormUploadFilesIdempotencyAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transversal_data_1.UploadFilesIdempotencyEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], TypeormUploadFilesIdempotencyAdapter);


/***/ },

/***/ "./apps/transversal-ms/src/infrastructure/database/common/typeorm-person-reference-lookup.adapter.ts"
/*!***********************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/infrastructure/database/common/typeorm-person-reference-lookup.adapter.ts ***!
  \***********************************************************************************************************/
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
exports.TypeormPersonReferenceLookupAdapter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
let TypeormPersonReferenceLookupAdapter = class TypeormPersonReferenceLookupAdapter {
    constructor(data_source) {
        this.data_source = data_source;
    }
    async get_user_internal_id_by_external_id(external_id) {
        const rows = (await this.data_source.query(`SELECT id FROM transversal_schema.users WHERE external_id = $1::uuid LIMIT 1`, [external_id]));
        if (!rows?.length) {
            return null;
        }
        return Number(rows[0].id);
    }
    async get_user_external_id_by_internal_id(internal_id) {
        const rows = (await this.data_source.query(`SELECT external_id::text AS external_id FROM transversal_schema.users WHERE id = $1 LIMIT 1`, [internal_id]));
        if (!rows?.length) {
            return null;
        }
        return rows[0].external_id;
    }
    async get_city_internal_id_by_external_id(external_id) {
        const rows = (await this.data_source.query(`SELECT id FROM transversal_schema.cities WHERE external_id = $1::uuid LIMIT 1`, [external_id]));
        if (!rows?.length) {
            return null;
        }
        return Number(rows[0].id);
    }
    async get_city_external_id_by_internal_id(internal_id) {
        if (internal_id === null) {
            return null;
        }
        const rows = (await this.data_source.query(`SELECT external_id::text AS external_id FROM transversal_schema.cities WHERE id = $1 LIMIT 1`, [internal_id]));
        if (!rows?.length) {
            return null;
        }
        return rows[0].external_id;
    }
};
exports.TypeormPersonReferenceLookupAdapter = TypeormPersonReferenceLookupAdapter;
exports.TypeormPersonReferenceLookupAdapter = TypeormPersonReferenceLookupAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _a : Object])
], TypeormPersonReferenceLookupAdapter);


/***/ },

/***/ "./apps/transversal-ms/src/infrastructure/database/common/typeorm-user-reference-lookup.adapter.ts"
/*!*********************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/infrastructure/database/common/typeorm-user-reference-lookup.adapter.ts ***!
  \*********************************************************************************************************/
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
exports.TypeormUserReferenceLookupAdapter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
let TypeormUserReferenceLookupAdapter = class TypeormUserReferenceLookupAdapter {
    constructor(data_source) {
        this.data_source = data_source;
    }
    async get_role_internal_id_by_external_id(external_id) {
        const rows = (await this.data_source.query(`SELECT id FROM transversal_schema.roles WHERE external_id = $1::uuid LIMIT 1`, [external_id]));
        if (!rows?.length) {
            return null;
        }
        return Number(rows[0].id);
    }
    async get_role_external_id_by_internal_id(internal_id) {
        if (internal_id === null) {
            return null;
        }
        const rows = (await this.data_source.query(`SELECT external_id::text AS external_id FROM transversal_schema.roles WHERE id = $1 LIMIT 1`, [internal_id]));
        if (!rows?.length) {
            return null;
        }
        return rows[0].external_id;
    }
    async get_status_internal_id_by_external_id(external_id) {
        const rows = (await this.data_source.query(`SELECT id FROM transversal_schema.statuses WHERE external_id = $1::uuid LIMIT 1`, [external_id]));
        if (!rows?.length) {
            return null;
        }
        return Number(rows[0].id);
    }
    async get_status_external_id_by_internal_id(internal_id) {
        const rows = (await this.data_source.query(`SELECT external_id::text AS external_id FROM transversal_schema.statuses WHERE id = $1 LIMIT 1`, [internal_id]));
        if (!rows?.length) {
            return null;
        }
        return rows[0].external_id;
    }
};
exports.TypeormUserReferenceLookupAdapter = TypeormUserReferenceLookupAdapter;
exports.TypeormUserReferenceLookupAdapter = TypeormUserReferenceLookupAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _a : Object])
], TypeormUserReferenceLookupAdapter);


/***/ },

/***/ "./apps/transversal-ms/src/infrastructure/database/mappers/person.mapper.ts"
/*!**********************************************************************************!*\
  !*** ./apps/transversal-ms/src/infrastructure/database/mappers/person.mapper.ts ***!
  \**********************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PersonMapper = void 0;
const person_models_1 = __webpack_require__(/*! @modules/persons/domain/models/person.models */ "./apps/transversal-ms/src/modules/persons/domain/models/person.models.ts");
function parse_date_only(value) {
    if (value === null || value === undefined) {
        return null;
    }
    if (value instanceof Date) {
        return value;
    }
    const s = String(value);
    return s.length >= 10 ? new Date(s.slice(0, 10)) : new Date(s);
}
class PersonMapper {
    static to_domain(row) {
        return new person_models_1.Person(row.id, row.externalId, row.userId, row.countryCode ?? null, row.firstName, row.lastName, row.docType, row.docNumber, row.docIssueDate ? parse_date_only(row.docIssueDate) : null, row.birthDate ? parse_date_only(row.birthDate) : null, row.gender ?? null, row.phone ?? null, row.residentialAddress ?? null, row.businessAddress ?? null, row.cityId ?? null, row.createdAt, row.updatedAt);
    }
    static from_raw_row(row) {
        return new person_models_1.Person(Number(row['id']), String(row['external_id']), Number(row['user_id']), row['country_code'] === null || row['country_code'] === undefined
            ? null
            : String(row['country_code']), String(row['first_name']), String(row['last_name']), String(row['doc_type']), String(row['doc_number']), parse_date_only(row['doc_issue_date']), parse_date_only(row['birth_date']), row['gender'] === null || row['gender'] === undefined
            ? null
            : String(row['gender']), row['phone'] === null || row['phone'] === undefined
            ? null
            : String(row['phone']), row['residential_address'] === null ||
            row['residential_address'] === undefined
            ? null
            : String(row['residential_address']), row['business_address'] === null || row['business_address'] === undefined
            ? null
            : String(row['business_address']), row['city_id'] === null || row['city_id'] === undefined
            ? null
            : Number(row['city_id']), new Date(String(row['created_at'])), new Date(String(row['updated_at'])));
    }
}
exports.PersonMapper = PersonMapper;


/***/ },

/***/ "./apps/transversal-ms/src/infrastructure/database/mappers/user.mapper.ts"
/*!********************************************************************************!*\
  !*** ./apps/transversal-ms/src/infrastructure/database/mappers/user.mapper.ts ***!
  \********************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserMapper = void 0;
const user_models_1 = __webpack_require__(/*! @modules/users/domain/models/user.models */ "./apps/transversal-ms/src/modules/users/domain/models/user.models.ts");
class UserMapper {
    static to_domain(row) {
        return new user_models_1.User(row.id, row.externalId, row.cognitoSub, row.email, row.roleId ?? null, row.statusId, row.lastLoginAt ?? null, row.createdAt, row.updatedAt);
    }
    static from_raw_row(row) {
        return new user_models_1.User(Number(row['id']), String(row['external_id']), String(row['cognito_sub']), String(row['email']), row['role_id'] === null || row['role_id'] === undefined
            ? null
            : Number(row['role_id']), Number(row['status_id']), row['last_login_at'] === null || row['last_login_at'] === undefined
            ? null
            : new Date(String(row['last_login_at'])), new Date(String(row['created_at'])), new Date(String(row['updated_at'])));
    }
}
exports.UserMapper = UserMapper;


/***/ },

/***/ "./apps/transversal-ms/src/infrastructure/database/repositories/typeorm-person.repository.ts"
/*!***************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/infrastructure/database/repositories/typeorm-person.repository.ts ***!
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
exports.TypeormPersonRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const transversal_data_1 = __webpack_require__(/*! @app/transversal-data */ "./libs/transversal-data/src/index.ts");
const person_mapper_1 = __webpack_require__(/*! @infrastructure/database/mappers/person.mapper */ "./apps/transversal-ms/src/infrastructure/database/mappers/person.mapper.ts");
const PERSON_SELECT = {
    id: true,
    externalId: true,
    userId: true,
    countryCode: true,
    firstName: true,
    lastName: true,
    docType: true,
    docNumber: true,
    docIssueDate: true,
    birthDate: true,
    gender: true,
    phone: true,
    residentialAddress: true,
    businessAddress: true,
    cityId: true,
    createdAt: true,
    updatedAt: true,
};
let TypeormPersonRepository = class TypeormPersonRepository {
    constructor(repo) {
        this.repo = repo;
    }
    async find_by_external_id(external_id) {
        const row = await this.repo.findOne({
            where: { externalId: external_id },
            select: PERSON_SELECT,
        });
        return row ? person_mapper_1.PersonMapper.to_domain(row) : null;
    }
    async find_all() {
        const rows = await this.repo.find({
            select: PERSON_SELECT,
            order: { id: 'ASC' },
        });
        return rows.map((r) => person_mapper_1.PersonMapper.to_domain(r));
    }
    async create(props) {
        const rows = await this.repo.query(`INSERT INTO transversal_schema.persons (
        external_id, user_id, country_code, first_name, last_name, doc_type, doc_number,
        doc_issue_date, birth_date, gender, phone, residential_address, business_address, city_id
      ) VALUES (
        gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
      )
      RETURNING id, external_id, created_at, updated_at, user_id, country_code, first_name, last_name,
        doc_type, doc_number, doc_issue_date, birth_date, gender, phone, residential_address,
        business_address, city_id`, [
            props.user_id,
            props.country_code,
            props.first_name,
            props.last_name,
            props.doc_type,
            props.doc_number,
            props.doc_issue_date,
            props.birth_date,
            props.gender,
            props.phone,
            props.residential_address,
            props.business_address,
            props.city_id,
        ]);
        return person_mapper_1.PersonMapper.from_raw_row(rows[0]);
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
        if (patch.user_id !== undefined) {
            add('user_id', patch.user_id);
        }
        if (patch.country_code !== undefined) {
            add('country_code', patch.country_code);
        }
        if (patch.first_name !== undefined) {
            add('first_name', patch.first_name);
        }
        if (patch.last_name !== undefined) {
            add('last_name', patch.last_name);
        }
        if (patch.doc_type !== undefined) {
            add('doc_type', patch.doc_type);
        }
        if (patch.doc_number !== undefined) {
            add('doc_number', patch.doc_number);
        }
        if (patch.doc_issue_date !== undefined) {
            add('doc_issue_date', patch.doc_issue_date);
        }
        if (patch.birth_date !== undefined) {
            add('birth_date', patch.birth_date);
        }
        if (patch.gender !== undefined) {
            add('gender', patch.gender);
        }
        if (patch.phone !== undefined) {
            add('phone', patch.phone);
        }
        if (patch.residential_address !== undefined) {
            add('residential_address', patch.residential_address);
        }
        if (patch.business_address !== undefined) {
            add('business_address', patch.business_address);
        }
        if (patch.city_id !== undefined) {
            add('city_id', patch.city_id);
        }
        if (columns.length === 0) {
            return this.find_by_external_id(external_id);
        }
        columns.push(`"updated_at" = now()`);
        values.push(existing.id);
        await this.repo.query(`UPDATE transversal_schema.persons SET ${columns.join(', ')} WHERE id = $${i}`, values);
        return this.find_by_external_id(external_id);
    }
    async delete_by_external_id(external_id) {
        const result = await this.repo.delete({ externalId: external_id });
        return (result.affected ?? 0) > 0;
    }
};
exports.TypeormPersonRepository = TypeormPersonRepository;
exports.TypeormPersonRepository = TypeormPersonRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transversal_data_1.PersonEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], TypeormPersonRepository);


/***/ },

/***/ "./apps/transversal-ms/src/infrastructure/database/repositories/typeorm-user.repository.ts"
/*!*************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/infrastructure/database/repositories/typeorm-user.repository.ts ***!
  \*************************************************************************************************/
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
exports.TypeormUserRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const transversal_data_1 = __webpack_require__(/*! @app/transversal-data */ "./libs/transversal-data/src/index.ts");
const user_mapper_1 = __webpack_require__(/*! @infrastructure/database/mappers/user.mapper */ "./apps/transversal-ms/src/infrastructure/database/mappers/user.mapper.ts");
const USER_SELECT = {
    id: true,
    externalId: true,
    cognitoSub: true,
    email: true,
    roleId: true,
    statusId: true,
    lastLoginAt: true,
    createdAt: true,
    updatedAt: true,
};
let TypeormUserRepository = class TypeormUserRepository {
    constructor(repo) {
        this.repo = repo;
    }
    async find_by_external_id(external_id) {
        const row = await this.repo.findOne({
            where: { externalId: external_id },
            select: USER_SELECT,
        });
        return row ? user_mapper_1.UserMapper.to_domain(row) : null;
    }
    async find_all() {
        const rows = await this.repo.find({
            select: USER_SELECT,
            order: { id: 'ASC' },
        });
        return rows.map((r) => user_mapper_1.UserMapper.to_domain(r));
    }
    async create(props) {
        const rows = await this.repo.query(`INSERT INTO transversal_schema.users (
        external_id, cognito_sub, email, role_id, status_id, last_login_at
      ) VALUES (
        gen_random_uuid(), $1, $2, $3, $4, $5
      )
      RETURNING id, external_id, created_at, updated_at, cognito_sub, email, role_id, status_id, last_login_at`, [
            props.cognito_sub,
            props.email,
            props.role_id,
            props.status_id,
            props.last_login_at,
        ]);
        return user_mapper_1.UserMapper.from_raw_row(rows[0]);
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
        if (patch.cognito_sub !== undefined) {
            add('cognito_sub', patch.cognito_sub);
        }
        if (patch.email !== undefined) {
            add('email', patch.email);
        }
        if (patch.role_id !== undefined) {
            add('role_id', patch.role_id);
        }
        if (patch.status_id !== undefined) {
            add('status_id', patch.status_id);
        }
        if (patch.last_login_at !== undefined) {
            add('last_login_at', patch.last_login_at);
        }
        if (columns.length === 0) {
            return this.find_by_external_id(external_id);
        }
        columns.push(`"updated_at" = now()`);
        values.push(existing.id);
        await this.repo.query(`UPDATE transversal_schema.users SET ${columns.join(', ')} WHERE id = $${i}`, values);
        return this.find_by_external_id(external_id);
    }
    async delete_by_external_id(external_id) {
        const result = await this.repo.delete({ externalId: external_id });
        return (result.affected ?? 0) > 0;
    }
};
exports.TypeormUserRepository = TypeormUserRepository;
exports.TypeormUserRepository = TypeormUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transversal_data_1.UserEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], TypeormUserRepository);


/***/ },

/***/ "./apps/transversal-ms/src/infrastructure/database/services/postgres-type-orm-config.service.ts"
/*!******************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/infrastructure/database/services/postgres-type-orm-config.service.ts ***!
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PostgresTypeOrmConfigService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_config_1 = __importDefault(__webpack_require__(/*! @config/typeorm.config */ "./apps/transversal-ms/src/config/typeorm.config.ts"));
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

/***/ "./apps/transversal-ms/src/infrastructure/infrastructure.module.ts"
/*!*************************************************************************!*\
  !*** ./apps/transversal-ms/src/infrastructure/infrastructure.module.ts ***!
  \*************************************************************************/
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
const transversal_data_1 = __webpack_require__(/*! @app/transversal-data */ "./libs/transversal-data/src/index.ts");
const postgres_type_orm_config_service_1 = __webpack_require__(/*! ./database/services/postgres-type-orm-config.service */ "./apps/transversal-ms/src/infrastructure/database/services/postgres-type-orm-config.service.ts");
const storage_module_1 = __webpack_require__(/*! @infrastructure/storage/storage.module */ "./apps/transversal-ms/src/infrastructure/storage/storage.module.ts");
const sqs_module_1 = __webpack_require__(/*! ./messaging/sqs/sqs.module */ "./apps/transversal-ms/src/infrastructure/messaging/sqs/sqs.module.ts");
const typeorm_upload_files_idempotency_adapter_1 = __webpack_require__(/*! @infrastructure/database/adapters/typeorm-upload-files-idempotency.adapter */ "./apps/transversal-ms/src/infrastructure/database/adapters/typeorm-upload-files-idempotency.adapter.ts");
const transversal_tokens_1 = __webpack_require__(/*! @modules/transversal/transversal.tokens */ "./apps/transversal-ms/src/modules/transversal/transversal.tokens.ts");
const typeorm_person_repository_1 = __webpack_require__(/*! @infrastructure/database/repositories/typeorm-person.repository */ "./apps/transversal-ms/src/infrastructure/database/repositories/typeorm-person.repository.ts");
const typeorm_user_repository_1 = __webpack_require__(/*! @infrastructure/database/repositories/typeorm-user.repository */ "./apps/transversal-ms/src/infrastructure/database/repositories/typeorm-user.repository.ts");
const persons_tokens_1 = __webpack_require__(/*! @modules/persons/persons.tokens */ "./apps/transversal-ms/src/modules/persons/persons.tokens.ts");
const users_tokens_1 = __webpack_require__(/*! @modules/users/users.tokens */ "./apps/transversal-ms/src/modules/users/users.tokens.ts");
const person_reference_lookup_port_1 = __webpack_require__(/*! @modules/persons/domain/ports/person-reference-lookup.port */ "./apps/transversal-ms/src/modules/persons/domain/ports/person-reference-lookup.port.ts");
const user_reference_lookup_port_1 = __webpack_require__(/*! @modules/users/domain/ports/user-reference-lookup.port */ "./apps/transversal-ms/src/modules/users/domain/ports/user-reference-lookup.port.ts");
const typeorm_person_reference_lookup_adapter_1 = __webpack_require__(/*! @infrastructure/database/common/typeorm-person-reference-lookup.adapter */ "./apps/transversal-ms/src/infrastructure/database/common/typeorm-person-reference-lookup.adapter.ts");
const typeorm_user_reference_lookup_adapter_1 = __webpack_require__(/*! @infrastructure/database/common/typeorm-user-reference-lookup.adapter */ "./apps/transversal-ms/src/infrastructure/database/common/typeorm-user-reference-lookup.adapter.ts");
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
            transversal_data_1.TransversalDataModule,
            storage_module_1.StorageModule,
            sqs_module_1.SqsModule,
        ],
        providers: [
            typeorm_upload_files_idempotency_adapter_1.TypeormUploadFilesIdempotencyAdapter,
            {
                provide: transversal_tokens_1.UPLOAD_FILES_IDEMPOTENCY_PORT,
                useExisting: typeorm_upload_files_idempotency_adapter_1.TypeormUploadFilesIdempotencyAdapter,
            },
            {
                provide: persons_tokens_1.PERSON_REPOSITORY,
                useClass: typeorm_person_repository_1.TypeormPersonRepository,
            },
            {
                provide: users_tokens_1.USER_REPOSITORY,
                useClass: typeorm_user_repository_1.TypeormUserRepository,
            },
            typeorm_person_reference_lookup_adapter_1.TypeormPersonReferenceLookupAdapter,
            typeorm_user_reference_lookup_adapter_1.TypeormUserReferenceLookupAdapter,
            {
                provide: person_reference_lookup_port_1.PERSON_REFERENCE_LOOKUP,
                useExisting: typeorm_person_reference_lookup_adapter_1.TypeormPersonReferenceLookupAdapter,
            },
            {
                provide: user_reference_lookup_port_1.USER_REFERENCE_LOOKUP,
                useExisting: typeorm_user_reference_lookup_adapter_1.TypeormUserReferenceLookupAdapter,
            },
        ],
        exports: [
            transversal_data_1.TransversalDataModule,
            transversal_tokens_1.UPLOAD_FILES_IDEMPOTENCY_PORT,
            persons_tokens_1.PERSON_REPOSITORY,
            users_tokens_1.USER_REPOSITORY,
            person_reference_lookup_port_1.PERSON_REFERENCE_LOOKUP,
            user_reference_lookup_port_1.USER_REFERENCE_LOOKUP,
        ],
    })
], InfrastructureModule);


/***/ },

/***/ "./apps/transversal-ms/src/infrastructure/messaging/sqs/adapters/config-outbound-transversal-queue-url.adapter.ts"
/*!************************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/infrastructure/messaging/sqs/adapters/config-outbound-transversal-queue-url.adapter.ts ***!
  \************************************************************************************************************************/
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

/***/ "./apps/transversal-ms/src/infrastructure/messaging/sqs/adapters/sqs-message-publisher.adapter.ts"
/*!********************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/infrastructure/messaging/sqs/adapters/sqs-message-publisher.adapter.ts ***!
  \********************************************************************************************************/
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

/***/ "./apps/transversal-ms/src/infrastructure/messaging/sqs/consumers/transversal-inbound-sqs.consumer.ts"
/*!************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/infrastructure/messaging/sqs/consumers/transversal-inbound-sqs.consumer.ts ***!
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
var TransversalInboundSqsConsumer_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransversalInboundSqsConsumer = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const ingest_transversal_inbound_sqs_message_use_case_1 = __webpack_require__(/*! @messaging/application/use-cases/ingest-transversal-inbound-sqs-message.use-case */ "./apps/transversal-ms/src/modules/messaging/application/use-cases/ingest-transversal-inbound-sqs-message.use-case.ts");
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

/***/ "./apps/transversal-ms/src/infrastructure/messaging/sqs/consumers/upload-files.consumer.ts"
/*!*************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/infrastructure/messaging/sqs/consumers/upload-files.consumer.ts ***!
  \*************************************************************************************************/
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
var UploadFilesSqsConsumer_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadFilesSqsConsumer = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const ingest_upload_files_sqs_message_use_case_1 = __webpack_require__(/*! @modules/transversal/application/use-cases/ingest-upload-files-sqs-message.use-case */ "./apps/transversal-ms/src/modules/transversal/application/use-cases/ingest-upload-files-sqs-message.use-case.ts");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
let UploadFilesSqsConsumer = UploadFilesSqsConsumer_1 = class UploadFilesSqsConsumer extends shared_1.BaseConsumer {
    constructor(sqs_client, queues_config, config_service, ingest_upload_files) {
        super(sqs_client, {
            log: (m) => this.nest_logger.log(m),
            warn: (m) => this.nest_logger.warn(m),
            error: (m) => this.nest_logger.error(m),
        });
        this.queues_config = queues_config;
        this.config_service = config_service;
        this.ingest_upload_files = ingest_upload_files;
        this.nest_logger = new common_1.Logger(UploadFilesSqsConsumer_1.name);
    }
    onModuleInit() {
        this.start();
    }
    onModuleDestroy() {
        this.stop();
    }
    resolve_queue_url() {
        return this.queues_config.upload_files_queue_url;
    }
    get_poll_settings() {
        return {
            wait_time_seconds: this.config_service.getOrThrow('sqs.wait_time_seconds'),
            max_number_of_messages: this.config_service.getOrThrow('sqs.max_number_of_messages'),
            visibility_timeout_seconds: this.config_service.getOrThrow('sqs.visibility_timeout_seconds'),
        };
    }
    inactive_reason_message() {
        return 'Cola upload-files SQS no configurada (TRANSVERSAL_SQS_UPLOAD_FILES_QUEUE_URL); worker inactivo. Configure DLQ y maxReceiveCount en la cola para mensajes irrecuperables.';
    }
    async handle(message) {
        const delete_on_validation_error = this.config_service.get('sqs.delete_on_validation_error') ?? false;
        this.nest_logger.log(`[UploadFiles][step=consumer_handle][messageId=${message.message_id ?? 'n/a'}]`);
        return this.ingest_upload_files.execute({
            body: message.body,
            delete_on_validation_error,
        });
    }
};
exports.UploadFilesSqsConsumer = UploadFilesSqsConsumer;
exports.UploadFilesSqsConsumer = UploadFilesSqsConsumer = UploadFilesSqsConsumer_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(shared_1.SQS_CLIENT)),
    __param(1, (0, common_1.Inject)(shared_1.QUEUES_CONFIG)),
    __metadata("design:paramtypes", [Object, Object, typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof ingest_upload_files_sqs_message_use_case_1.IngestUploadFilesSqsMessageUseCase !== "undefined" && ingest_upload_files_sqs_message_use_case_1.IngestUploadFilesSqsMessageUseCase) === "function" ? _b : Object])
], UploadFilesSqsConsumer);


/***/ },

/***/ "./apps/transversal-ms/src/infrastructure/messaging/sqs/sqs.module.ts"
/*!****************************************************************************!*\
  !*** ./apps/transversal-ms/src/infrastructure/messaging/sqs/sqs.module.ts ***!
  \****************************************************************************/
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
const credential_providers_1 = __webpack_require__(/*! @aws-sdk/credential-providers */ "@aws-sdk/credential-providers");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
const sqs_message_publisher_adapter_1 = __webpack_require__(/*! ./adapters/sqs-message-publisher.adapter */ "./apps/transversal-ms/src/infrastructure/messaging/sqs/adapters/sqs-message-publisher.adapter.ts");
const config_outbound_transversal_queue_url_adapter_1 = __webpack_require__(/*! ./adapters/config-outbound-transversal-queue-url.adapter */ "./apps/transversal-ms/src/infrastructure/messaging/sqs/adapters/config-outbound-transversal-queue-url.adapter.ts");
const transversal_inbound_sqs_consumer_1 = __webpack_require__(/*! ./consumers/transversal-inbound-sqs.consumer */ "./apps/transversal-ms/src/infrastructure/messaging/sqs/consumers/transversal-inbound-sqs.consumer.ts");
const upload_files_consumer_1 = __webpack_require__(/*! ./consumers/upload-files.consumer */ "./apps/transversal-ms/src/infrastructure/messaging/sqs/consumers/upload-files.consumer.ts");
const messaging_application_module_1 = __webpack_require__(/*! @messaging/messaging-application.module */ "./apps/transversal-ms/src/modules/messaging/messaging-application.module.ts");
const transversal_upload_module_1 = __webpack_require__(/*! @modules/transversal/transversal-upload.module */ "./apps/transversal-ms/src/modules/transversal/transversal-upload.module.ts");
const outbound_message_publisher_port_1 = __webpack_require__(/*! @messaging/domain/ports/outbound-message-publisher.port */ "./apps/transversal-ms/src/modules/messaging/domain/ports/outbound-message-publisher.port.ts");
const transversal_outbound_queue_url_port_1 = __webpack_require__(/*! @messaging/domain/ports/transversal-outbound-queue-url.port */ "./apps/transversal-ms/src/modules/messaging/domain/ports/transversal-outbound-queue-url.port.ts");
let SqsModule = class SqsModule {
};
exports.SqsModule = SqsModule;
exports.SqsModule = SqsModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [config_1.ConfigModule, messaging_application_module_1.MessagingApplicationModule, transversal_upload_module_1.TransversalUploadModule],
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
                    credentials: (0, credential_providers_1.fromNodeProviderChain)(),
                    use_queue_url_as_endpoint: false,
                }),
                inject: [config_1.ConfigService],
            },
            sqs_message_publisher_adapter_1.SqsMessagePublisherAdapter,
            transversal_inbound_sqs_consumer_1.TransversalInboundSqsConsumer,
            upload_files_consumer_1.UploadFilesSqsConsumer,
            {
                provide: outbound_message_publisher_port_1.OUTBOUND_MESSAGE_PUBLISHER_PORT,
                useExisting: sqs_message_publisher_adapter_1.SqsMessagePublisherAdapter,
            },
            config_outbound_transversal_queue_url_adapter_1.ConfigOutboundTransversalQueueUrlAdapter,
            {
                provide: transversal_outbound_queue_url_port_1.TRANSVERSAL_OUTBOUND_QUEUE_URL_PORT,
                useExisting: config_outbound_transversal_queue_url_adapter_1.ConfigOutboundTransversalQueueUrlAdapter,
            },
        ],
        exports: [
            shared_1.SQS_CLIENT,
            shared_1.QUEUES_CONFIG,
            outbound_message_publisher_port_1.OUTBOUND_MESSAGE_PUBLISHER_PORT,
            transversal_outbound_queue_url_port_1.TRANSVERSAL_OUTBOUND_QUEUE_URL_PORT,
        ],
    })
], SqsModule);


/***/ },

/***/ "./apps/transversal-ms/src/infrastructure/storage/http/http-remote-file-fetch.adapter.ts"
/*!***********************************************************************************************!*\
  !*** ./apps/transversal-ms/src/infrastructure/storage/http/http-remote-file-fetch.adapter.ts ***!
  \***********************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var HttpRemoteFileFetchAdapter_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpRemoteFileFetchAdapter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const MAX_BYTES = 15 * 1024 * 1024;
let HttpRemoteFileFetchAdapter = HttpRemoteFileFetchAdapter_1 = class HttpRemoteFileFetchAdapter {
    constructor() {
        this.logger = new common_1.Logger(HttpRemoteFileFetchAdapter_1.name);
    }
    async fetch_as_buffer(url) {
        const parsed = this.parse_http_url(url);
        if (!parsed) {
            throw new Error('REMOTE_FETCH_INVALID_URL');
        }
        const response = await fetch(parsed.toString(), {
            redirect: 'follow',
            signal: AbortSignal.timeout(60_000),
        });
        if (!response.ok) {
            this.logger.warn(`remote_fetch_failed status=${String(response.status)}`);
            throw new Error('REMOTE_FETCH_FAILED');
        }
        const length_header = response.headers.get('content-length');
        if (length_header) {
            const n = Number(length_header);
            if (Number.isFinite(n) && n > MAX_BYTES) {
                throw new Error('REMOTE_FETCH_TOO_LARGE');
            }
        }
        const array_buffer = await response.arrayBuffer();
        if (array_buffer.byteLength > MAX_BYTES) {
            throw new Error('REMOTE_FETCH_TOO_LARGE');
        }
        const buffer = Buffer.from(array_buffer);
        const content_type = response.headers.get('content-type') ?? undefined;
        return { buffer, content_type: content_type?.split(';')[0]?.trim() };
    }
    parse_http_url(url) {
        try {
            const u = new URL(url);
            if (u.protocol !== 'http:' && u.protocol !== 'https:') {
                return null;
            }
            return u;
        }
        catch {
            return null;
        }
    }
};
exports.HttpRemoteFileFetchAdapter = HttpRemoteFileFetchAdapter;
exports.HttpRemoteFileFetchAdapter = HttpRemoteFileFetchAdapter = HttpRemoteFileFetchAdapter_1 = __decorate([
    (0, common_1.Injectable)()
], HttpRemoteFileFetchAdapter);


/***/ },

/***/ "./apps/transversal-ms/src/infrastructure/storage/s3.adapter.ts"
/*!**********************************************************************!*\
  !*** ./apps/transversal-ms/src/infrastructure/storage/s3.adapter.ts ***!
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
var S3Adapter_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.S3Adapter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const client_s3_1 = __webpack_require__(/*! @aws-sdk/client-s3 */ "@aws-sdk/client-s3");
const storage_error_1 = __webpack_require__(/*! @modules/transversal/domain/errors/storage.error */ "./apps/transversal-ms/src/modules/transversal/domain/errors/storage.error.ts");
const CONFIG_KEY = 'config.storage.s3';
let S3Adapter = S3Adapter_1 = class S3Adapter {
    constructor(config_service) {
        this.config_service = config_service;
        this.logger = new common_1.Logger(S3Adapter_1.name);
        const region = this.config_service.get(`${CONFIG_KEY}.region`) ?? 'us-east-1';
        const init = { region };
        this.client = new client_s3_1.S3Client(init);
    }
    async upload(params) {
        const bucket = params.bucket.trim();
        if (bucket.length === 0) {
            throw new storage_error_1.StorageDomainError('STORAGE_INVALID_INPUT', 'bucket vacío');
        }
        const key = params.path.replace(/^\/+/, '');
        if (key.length === 0) {
            throw new storage_error_1.StorageDomainError('STORAGE_INVALID_INPUT', 'path vacío');
        }
        try {
            await this.client.send(new client_s3_1.PutObjectCommand({
                Bucket: bucket,
                Key: key,
                Body: params.file,
                ContentType: params.content_type ?? 'application/octet-stream',
            }));
            return this.resolve_public_url(bucket, key);
        }
        catch (error) {
            throw this.map_error(error, 'upload', bucket, key);
        }
    }
    resolve_public_url(bucket, key) {
        const public_base = this.config_service.get(`${CONFIG_KEY}.public_base_url`);
        const trimmed = typeof public_base === 'string' && public_base.trim().length > 0
            ? public_base.trim().replace(/\/$/, '')
            : undefined;
        if (trimmed !== undefined) {
            return `${trimmed}/${key}`;
        }
        return `s3://${bucket}/${key}`;
    }
    map_error(error, operation, bucket, key) {
        if (error instanceof storage_error_1.StorageDomainError) {
            return error;
        }
        const code = this.aws_error_code(error);
        let domain;
        if (code === 'AccessDenied' || code === 'Forbidden') {
            domain = new storage_error_1.StorageDomainError('STORAGE_ACCESS_DENIED', `Access denied during ${operation}`, error);
        }
        else if (code === 'InvalidArgument' || code === 'InvalidRequest') {
            domain = new storage_error_1.StorageDomainError('STORAGE_INVALID_INPUT', `Invalid input during ${operation}`, error);
        }
        else {
            domain = new storage_error_1.StorageDomainError('STORAGE_UNKNOWN', `Storage error during ${operation}`, error);
        }
        this.logger.warn(`[UploadFiles][step=s3_adapter][bucket=${bucket}][key=${key}] operation=${operation} code=${domain.code}`);
        return domain;
    }
    aws_error_code(error) {
        if (typeof error !== 'object' || error === null) {
            return undefined;
        }
        const e = error;
        return e.name ?? e.Code ?? e.code;
    }
};
exports.S3Adapter = S3Adapter;
exports.S3Adapter = S3Adapter = S3Adapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], S3Adapter);


/***/ },

/***/ "./apps/transversal-ms/src/infrastructure/storage/storage.module.ts"
/*!**************************************************************************!*\
  !*** ./apps/transversal-ms/src/infrastructure/storage/storage.module.ts ***!
  \**************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StorageModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const s3_adapter_1 = __webpack_require__(/*! @infrastructure/storage/s3.adapter */ "./apps/transversal-ms/src/infrastructure/storage/s3.adapter.ts");
const http_remote_file_fetch_adapter_1 = __webpack_require__(/*! @infrastructure/storage/http/http-remote-file-fetch.adapter */ "./apps/transversal-ms/src/infrastructure/storage/http/http-remote-file-fetch.adapter.ts");
const transversal_tokens_1 = __webpack_require__(/*! @modules/transversal/transversal.tokens */ "./apps/transversal-ms/src/modules/transversal/transversal.tokens.ts");
let StorageModule = class StorageModule {
};
exports.StorageModule = StorageModule;
exports.StorageModule = StorageModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [
            s3_adapter_1.S3Adapter,
            http_remote_file_fetch_adapter_1.HttpRemoteFileFetchAdapter,
            {
                provide: transversal_tokens_1.STORAGE_PORT,
                useExisting: s3_adapter_1.S3Adapter,
            },
            {
                provide: transversal_tokens_1.REMOTE_FILE_FETCH_PORT,
                useExisting: http_remote_file_fetch_adapter_1.HttpRemoteFileFetchAdapter,
            },
        ],
        exports: [transversal_tokens_1.STORAGE_PORT, transversal_tokens_1.REMOTE_FILE_FETCH_PORT],
    })
], StorageModule);


/***/ },

/***/ "./apps/transversal-ms/src/modules/messaging/application/dto/transversal-inbound-message.dto.ts"
/*!******************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/messaging/application/dto/transversal-inbound-message.dto.ts ***!
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransversalInboundMessageDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const transversal_outbound_event_dto_1 = __webpack_require__(/*! ./transversal-outbound-event.dto */ "./apps/transversal-ms/src/modules/messaging/application/dto/transversal-outbound-event.dto.ts");
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

/***/ "./apps/transversal-ms/src/modules/messaging/application/dto/transversal-outbound-event.dto.ts"
/*!*****************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/messaging/application/dto/transversal-outbound-event.dto.ts ***!
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

/***/ "./apps/transversal-ms/src/modules/messaging/application/exceptions/validation-failed.error.ts"
/*!*****************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/messaging/application/exceptions/validation-failed.error.ts ***!
  \*****************************************************************************************************/
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

/***/ "./apps/transversal-ms/src/modules/messaging/application/use-cases/ingest-transversal-inbound-sqs-message.use-case.ts"
/*!****************************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/messaging/application/use-cases/ingest-transversal-inbound-sqs-message.use-case.ts ***!
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
var IngestTransversalInboundSqsMessageUseCase_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IngestTransversalInboundSqsMessageUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const transversal_inbound_message_dto_1 = __webpack_require__(/*! ../dto/transversal-inbound-message.dto */ "./apps/transversal-ms/src/modules/messaging/application/dto/transversal-inbound-message.dto.ts");
const process_transversal_inbound_message_use_case_1 = __webpack_require__(/*! ./process-transversal-inbound-message.use-case */ "./apps/transversal-ms/src/modules/messaging/application/use-cases/process-transversal-inbound-message.use-case.ts");
let IngestTransversalInboundSqsMessageUseCase = IngestTransversalInboundSqsMessageUseCase_1 = class IngestTransversalInboundSqsMessageUseCase {
    constructor(process_transversal_inbound_message) {
        this.process_transversal_inbound_message = process_transversal_inbound_message;
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
    __metadata("design:paramtypes", [typeof (_a = typeof process_transversal_inbound_message_use_case_1.ProcessTransversalInboundMessageUseCase !== "undefined" && process_transversal_inbound_message_use_case_1.ProcessTransversalInboundMessageUseCase) === "function" ? _a : Object])
], IngestTransversalInboundSqsMessageUseCase);


/***/ },

/***/ "./apps/transversal-ms/src/modules/messaging/application/use-cases/process-transversal-inbound-message.use-case.ts"
/*!*************************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/messaging/application/use-cases/process-transversal-inbound-message.use-case.ts ***!
  \*************************************************************************************************************************/
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

/***/ "./apps/transversal-ms/src/modules/messaging/application/use-cases/publish-files-uploaded-event.use-case.ts"
/*!******************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/messaging/application/use-cases/publish-files-uploaded-event.use-case.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PublishFilesUploadedEventUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const outbound_message_publisher_port_1 = __webpack_require__(/*! @messaging/domain/ports/outbound-message-publisher.port */ "./apps/transversal-ms/src/modules/messaging/domain/ports/outbound-message-publisher.port.ts");
const transversal_outbound_queue_url_port_1 = __webpack_require__(/*! @messaging/domain/ports/transversal-outbound-queue-url.port */ "./apps/transversal-ms/src/modules/messaging/domain/ports/transversal-outbound-queue-url.port.ts");
let PublishFilesUploadedEventUseCase = class PublishFilesUploadedEventUseCase {
    constructor(message_publisher, outbound_queue_url) {
        this.message_publisher = message_publisher;
        this.outbound_queue_url = outbound_queue_url;
    }
    async execute(command) {
        const queue_url = this.outbound_queue_url.get_outbound_queue_url();
        const body = JSON.stringify({
            event: 'files-uploaded',
            correlationId: command.correlation_id,
            payload: {
                files: command.files.map((f) => ({
                    url: f.url,
                    folder: f.folder,
                })),
            },
        });
        await this.message_publisher.publish({ queue_url, body });
    }
};
exports.PublishFilesUploadedEventUseCase = PublishFilesUploadedEventUseCase;
exports.PublishFilesUploadedEventUseCase = PublishFilesUploadedEventUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(outbound_message_publisher_port_1.OUTBOUND_MESSAGE_PUBLISHER_PORT)),
    __param(1, (0, common_1.Inject)(transversal_outbound_queue_url_port_1.TRANSVERSAL_OUTBOUND_QUEUE_URL_PORT)),
    __metadata("design:paramtypes", [Object, Object])
], PublishFilesUploadedEventUseCase);


/***/ },

/***/ "./apps/transversal-ms/src/modules/messaging/application/use-cases/publish-transversal-event.use-case.ts"
/*!***************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/messaging/application/use-cases/publish-transversal-event.use-case.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PublishTransversalEventUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const outbound_message_publisher_port_1 = __webpack_require__(/*! @messaging/domain/ports/outbound-message-publisher.port */ "./apps/transversal-ms/src/modules/messaging/domain/ports/outbound-message-publisher.port.ts");
const transversal_outbound_queue_url_port_1 = __webpack_require__(/*! @messaging/domain/ports/transversal-outbound-queue-url.port */ "./apps/transversal-ms/src/modules/messaging/domain/ports/transversal-outbound-queue-url.port.ts");
const transversal_outbound_event_dto_1 = __webpack_require__(/*! ../dto/transversal-outbound-event.dto */ "./apps/transversal-ms/src/modules/messaging/application/dto/transversal-outbound-event.dto.ts");
const validation_failed_error_1 = __webpack_require__(/*! ../exceptions/validation-failed.error */ "./apps/transversal-ms/src/modules/messaging/application/exceptions/validation-failed.error.ts");
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

/***/ "./apps/transversal-ms/src/modules/messaging/domain/ports/outbound-message-publisher.port.ts"
/*!***************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/messaging/domain/ports/outbound-message-publisher.port.ts ***!
  \***************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OUTBOUND_MESSAGE_PUBLISHER_PORT = void 0;
exports.OUTBOUND_MESSAGE_PUBLISHER_PORT = Symbol('OUTBOUND_MESSAGE_PUBLISHER_PORT');


/***/ },

/***/ "./apps/transversal-ms/src/modules/messaging/domain/ports/transversal-outbound-queue-url.port.ts"
/*!*******************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/messaging/domain/ports/transversal-outbound-queue-url.port.ts ***!
  \*******************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TRANSVERSAL_OUTBOUND_QUEUE_URL_PORT = void 0;
exports.TRANSVERSAL_OUTBOUND_QUEUE_URL_PORT = Symbol('TRANSVERSAL_OUTBOUND_QUEUE_URL_PORT');


/***/ },

/***/ "./apps/transversal-ms/src/modules/messaging/messaging-application.module.ts"
/*!***********************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/messaging/messaging-application.module.ts ***!
  \***********************************************************************************/
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
const publish_transversal_event_use_case_1 = __webpack_require__(/*! ./application/use-cases/publish-transversal-event.use-case */ "./apps/transversal-ms/src/modules/messaging/application/use-cases/publish-transversal-event.use-case.ts");
const publish_files_uploaded_event_use_case_1 = __webpack_require__(/*! ./application/use-cases/publish-files-uploaded-event.use-case */ "./apps/transversal-ms/src/modules/messaging/application/use-cases/publish-files-uploaded-event.use-case.ts");
const process_transversal_inbound_message_use_case_1 = __webpack_require__(/*! ./application/use-cases/process-transversal-inbound-message.use-case */ "./apps/transversal-ms/src/modules/messaging/application/use-cases/process-transversal-inbound-message.use-case.ts");
const ingest_transversal_inbound_sqs_message_use_case_1 = __webpack_require__(/*! ./application/use-cases/ingest-transversal-inbound-sqs-message.use-case */ "./apps/transversal-ms/src/modules/messaging/application/use-cases/ingest-transversal-inbound-sqs-message.use-case.ts");
let MessagingApplicationModule = class MessagingApplicationModule {
};
exports.MessagingApplicationModule = MessagingApplicationModule;
exports.MessagingApplicationModule = MessagingApplicationModule = __decorate([
    (0, common_1.Module)({
        providers: [
            publish_transversal_event_use_case_1.PublishTransversalEventUseCase,
            publish_files_uploaded_event_use_case_1.PublishFilesUploadedEventUseCase,
            process_transversal_inbound_message_use_case_1.ProcessTransversalInboundMessageUseCase,
            ingest_transversal_inbound_sqs_message_use_case_1.IngestTransversalInboundSqsMessageUseCase,
        ],
        exports: [
            publish_transversal_event_use_case_1.PublishTransversalEventUseCase,
            publish_files_uploaded_event_use_case_1.PublishFilesUploadedEventUseCase,
            process_transversal_inbound_message_use_case_1.ProcessTransversalInboundMessageUseCase,
            ingest_transversal_inbound_sqs_message_use_case_1.IngestTransversalInboundSqsMessageUseCase,
        ],
    })
], MessagingApplicationModule);


/***/ },

/***/ "./apps/transversal-ms/src/modules/persons/application/mapping/person-public-fields.builder.ts"
/*!*****************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/persons/application/mapping/person-public-fields.builder.ts ***!
  \*****************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.build_person_public_fields = build_person_public_fields;
async function build_person_public_fields(row, lookup) {
    const user_external_id = await lookup.get_user_external_id_by_internal_id(row.user_id);
    const city_external_id = await lookup.get_city_external_id_by_internal_id(row.city_id);
    if (user_external_id === null) {
        throw new Error('person user reference resolution failed');
    }
    if (row.city_id !== null && city_external_id === null) {
        throw new Error('person city reference resolution failed');
    }
    return {
        external_id: row.external_id,
        user_external_id,
        country_code: row.country_code,
        first_name: row.first_name,
        last_name: row.last_name,
        doc_type: row.doc_type,
        doc_number: row.doc_number,
        doc_issue_date: row.doc_issue_date,
        birth_date: row.birth_date,
        gender: row.gender,
        phone: row.phone,
        residential_address: row.residential_address,
        business_address: row.business_address,
        city_external_id,
        created_at: row.created_at,
        updated_at: row.updated_at,
    };
}


/***/ },

/***/ "./apps/transversal-ms/src/modules/persons/application/use-cases/create-person/create-person.response.ts"
/*!***************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/persons/application/use-cases/create-person/create-person.response.ts ***!
  \***************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePersonResponse = void 0;
class CreatePersonResponse {
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.CreatePersonResponse = CreatePersonResponse;


/***/ },

/***/ "./apps/transversal-ms/src/modules/persons/application/use-cases/create-person/create-person.use-case.ts"
/*!***************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/persons/application/use-cases/create-person/create-person.use-case.ts ***!
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePersonUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const persons_tokens_1 = __webpack_require__(/*! @modules/persons/persons.tokens */ "./apps/transversal-ms/src/modules/persons/persons.tokens.ts");
const person_reference_lookup_port_1 = __webpack_require__(/*! @modules/persons/domain/ports/person-reference-lookup.port */ "./apps/transversal-ms/src/modules/persons/domain/ports/person-reference-lookup.port.ts");
const person_ports_1 = __webpack_require__(/*! @modules/persons/domain/ports/person.ports */ "./apps/transversal-ms/src/modules/persons/domain/ports/person.ports.ts");
const person_public_fields_builder_1 = __webpack_require__(/*! @modules/persons/application/mapping/person-public-fields.builder */ "./apps/transversal-ms/src/modules/persons/application/mapping/person-public-fields.builder.ts");
const create_person_response_1 = __webpack_require__(/*! ./create-person.response */ "./apps/transversal-ms/src/modules/persons/application/use-cases/create-person/create-person.response.ts");
let CreatePersonUseCase = class CreatePersonUseCase {
    constructor(person_repository, reference_lookup) {
        this.person_repository = person_repository;
        this.reference_lookup = reference_lookup;
    }
    async execute(req) {
        const user_id = await this.reference_lookup.get_user_internal_id_by_external_id(req.user_external_id);
        if (user_id === null) {
            throw new common_1.NotFoundException('user not found');
        }
        let city_id = null;
        if (req.city_external_id !== null) {
            city_id = await this.reference_lookup.get_city_internal_id_by_external_id(req.city_external_id);
            if (city_id === null) {
                throw new common_1.NotFoundException('city not found');
            }
        }
        const created = await this.person_repository.create({
            user_id,
            country_code: req.country_code,
            first_name: req.first_name,
            last_name: req.last_name,
            doc_type: req.doc_type,
            doc_number: req.doc_number,
            doc_issue_date: req.doc_issue_date,
            birth_date: req.birth_date,
            gender: req.gender,
            phone: req.phone,
            residential_address: req.residential_address,
            business_address: req.business_address,
            city_id,
        });
        const fields = await (0, person_public_fields_builder_1.build_person_public_fields)(created, this.reference_lookup);
        return new create_person_response_1.CreatePersonResponse(fields);
    }
};
exports.CreatePersonUseCase = CreatePersonUseCase;
exports.CreatePersonUseCase = CreatePersonUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(persons_tokens_1.PERSON_REPOSITORY)),
    __param(1, (0, common_1.Inject)(person_reference_lookup_port_1.PERSON_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [typeof (_a = typeof person_ports_1.PersonRepository !== "undefined" && person_ports_1.PersonRepository) === "function" ? _a : Object, typeof (_b = typeof person_reference_lookup_port_1.PersonReferenceLookupPort !== "undefined" && person_reference_lookup_port_1.PersonReferenceLookupPort) === "function" ? _b : Object])
], CreatePersonUseCase);


/***/ },

/***/ "./apps/transversal-ms/src/modules/persons/application/use-cases/delete-person-by-external-id/delete-person-by-external-id.use-case.ts"
/*!*********************************************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/persons/application/use-cases/delete-person-by-external-id/delete-person-by-external-id.use-case.ts ***!
  \*********************************************************************************************************************************************/
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
exports.DeletePersonByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const persons_tokens_1 = __webpack_require__(/*! @modules/persons/persons.tokens */ "./apps/transversal-ms/src/modules/persons/persons.tokens.ts");
const person_ports_1 = __webpack_require__(/*! @modules/persons/domain/ports/person.ports */ "./apps/transversal-ms/src/modules/persons/domain/ports/person.ports.ts");
let DeletePersonByExternalIdUseCase = class DeletePersonByExternalIdUseCase {
    constructor(person_repository) {
        this.person_repository = person_repository;
    }
    async execute(req) {
        const ok = await this.person_repository.delete_by_external_id(req.external_id);
        if (!ok) {
            throw new common_1.NotFoundException('person not found');
        }
    }
};
exports.DeletePersonByExternalIdUseCase = DeletePersonByExternalIdUseCase;
exports.DeletePersonByExternalIdUseCase = DeletePersonByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(persons_tokens_1.PERSON_REPOSITORY)),
    __metadata("design:paramtypes", [typeof (_a = typeof person_ports_1.PersonRepository !== "undefined" && person_ports_1.PersonRepository) === "function" ? _a : Object])
], DeletePersonByExternalIdUseCase);


/***/ },

/***/ "./apps/transversal-ms/src/modules/persons/application/use-cases/get-person-by-external-id/get-person-by-external-id.response.ts"
/*!***************************************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/persons/application/use-cases/get-person-by-external-id/get-person-by-external-id.response.ts ***!
  \***************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetPersonByExternalIdResponse = void 0;
class GetPersonByExternalIdResponse {
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.GetPersonByExternalIdResponse = GetPersonByExternalIdResponse;


/***/ },

/***/ "./apps/transversal-ms/src/modules/persons/application/use-cases/get-person-by-external-id/get-person-by-external-id.use-case.ts"
/*!***************************************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/persons/application/use-cases/get-person-by-external-id/get-person-by-external-id.use-case.ts ***!
  \***************************************************************************************************************************************/
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
exports.GetPersonByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const persons_tokens_1 = __webpack_require__(/*! @modules/persons/persons.tokens */ "./apps/transversal-ms/src/modules/persons/persons.tokens.ts");
const person_reference_lookup_port_1 = __webpack_require__(/*! @modules/persons/domain/ports/person-reference-lookup.port */ "./apps/transversal-ms/src/modules/persons/domain/ports/person-reference-lookup.port.ts");
const person_ports_1 = __webpack_require__(/*! @modules/persons/domain/ports/person.ports */ "./apps/transversal-ms/src/modules/persons/domain/ports/person.ports.ts");
const person_public_fields_builder_1 = __webpack_require__(/*! @modules/persons/application/mapping/person-public-fields.builder */ "./apps/transversal-ms/src/modules/persons/application/mapping/person-public-fields.builder.ts");
const get_person_by_external_id_response_1 = __webpack_require__(/*! ./get-person-by-external-id.response */ "./apps/transversal-ms/src/modules/persons/application/use-cases/get-person-by-external-id/get-person-by-external-id.response.ts");
let GetPersonByExternalIdUseCase = class GetPersonByExternalIdUseCase {
    constructor(person_repository, reference_lookup) {
        this.person_repository = person_repository;
        this.reference_lookup = reference_lookup;
    }
    async execute(req) {
        const row = await this.person_repository.find_by_external_id(req.external_id);
        if (row === null) {
            throw new common_1.NotFoundException('person not found');
        }
        const fields = await (0, person_public_fields_builder_1.build_person_public_fields)(row, this.reference_lookup);
        return new get_person_by_external_id_response_1.GetPersonByExternalIdResponse(fields);
    }
};
exports.GetPersonByExternalIdUseCase = GetPersonByExternalIdUseCase;
exports.GetPersonByExternalIdUseCase = GetPersonByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(persons_tokens_1.PERSON_REPOSITORY)),
    __param(1, (0, common_1.Inject)(person_reference_lookup_port_1.PERSON_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [typeof (_a = typeof person_ports_1.PersonRepository !== "undefined" && person_ports_1.PersonRepository) === "function" ? _a : Object, typeof (_b = typeof person_reference_lookup_port_1.PersonReferenceLookupPort !== "undefined" && person_reference_lookup_port_1.PersonReferenceLookupPort) === "function" ? _b : Object])
], GetPersonByExternalIdUseCase);


/***/ },

/***/ "./apps/transversal-ms/src/modules/persons/application/use-cases/list-persons/list-persons.response.ts"
/*!*************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/persons/application/use-cases/list-persons/list-persons.response.ts ***!
  \*************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListPersonsItemResponse = void 0;
class ListPersonsItemResponse {
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.ListPersonsItemResponse = ListPersonsItemResponse;


/***/ },

/***/ "./apps/transversal-ms/src/modules/persons/application/use-cases/list-persons/list-persons.use-case.ts"
/*!*************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/persons/application/use-cases/list-persons/list-persons.use-case.ts ***!
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListPersonsUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const persons_tokens_1 = __webpack_require__(/*! @modules/persons/persons.tokens */ "./apps/transversal-ms/src/modules/persons/persons.tokens.ts");
const person_reference_lookup_port_1 = __webpack_require__(/*! @modules/persons/domain/ports/person-reference-lookup.port */ "./apps/transversal-ms/src/modules/persons/domain/ports/person-reference-lookup.port.ts");
const person_ports_1 = __webpack_require__(/*! @modules/persons/domain/ports/person.ports */ "./apps/transversal-ms/src/modules/persons/domain/ports/person.ports.ts");
const person_public_fields_builder_1 = __webpack_require__(/*! @modules/persons/application/mapping/person-public-fields.builder */ "./apps/transversal-ms/src/modules/persons/application/mapping/person-public-fields.builder.ts");
const list_persons_response_1 = __webpack_require__(/*! ./list-persons.response */ "./apps/transversal-ms/src/modules/persons/application/use-cases/list-persons/list-persons.response.ts");
let ListPersonsUseCase = class ListPersonsUseCase {
    constructor(person_repository, reference_lookup) {
        this.person_repository = person_repository;
        this.reference_lookup = reference_lookup;
    }
    async execute() {
        const rows = await this.person_repository.find_all();
        const out = [];
        for (const row of rows) {
            const fields = await (0, person_public_fields_builder_1.build_person_public_fields)(row, this.reference_lookup);
            out.push(new list_persons_response_1.ListPersonsItemResponse(fields));
        }
        return out;
    }
};
exports.ListPersonsUseCase = ListPersonsUseCase;
exports.ListPersonsUseCase = ListPersonsUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(persons_tokens_1.PERSON_REPOSITORY)),
    __param(1, (0, common_1.Inject)(person_reference_lookup_port_1.PERSON_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [typeof (_a = typeof person_ports_1.PersonRepository !== "undefined" && person_ports_1.PersonRepository) === "function" ? _a : Object, typeof (_b = typeof person_reference_lookup_port_1.PersonReferenceLookupPort !== "undefined" && person_reference_lookup_port_1.PersonReferenceLookupPort) === "function" ? _b : Object])
], ListPersonsUseCase);


/***/ },

/***/ "./apps/transversal-ms/src/modules/persons/application/use-cases/update-person-by-external-id/update-person-by-external-id.response.ts"
/*!*********************************************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/persons/application/use-cases/update-person-by-external-id/update-person-by-external-id.response.ts ***!
  \*********************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdatePersonByExternalIdResponse = void 0;
class UpdatePersonByExternalIdResponse {
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.UpdatePersonByExternalIdResponse = UpdatePersonByExternalIdResponse;


/***/ },

/***/ "./apps/transversal-ms/src/modules/persons/application/use-cases/update-person-by-external-id/update-person-by-external-id.use-case.ts"
/*!*********************************************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/persons/application/use-cases/update-person-by-external-id/update-person-by-external-id.use-case.ts ***!
  \*********************************************************************************************************************************************/
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
exports.UpdatePersonByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const persons_tokens_1 = __webpack_require__(/*! @modules/persons/persons.tokens */ "./apps/transversal-ms/src/modules/persons/persons.tokens.ts");
const person_reference_lookup_port_1 = __webpack_require__(/*! @modules/persons/domain/ports/person-reference-lookup.port */ "./apps/transversal-ms/src/modules/persons/domain/ports/person-reference-lookup.port.ts");
const person_ports_1 = __webpack_require__(/*! @modules/persons/domain/ports/person.ports */ "./apps/transversal-ms/src/modules/persons/domain/ports/person.ports.ts");
const person_public_fields_builder_1 = __webpack_require__(/*! @modules/persons/application/mapping/person-public-fields.builder */ "./apps/transversal-ms/src/modules/persons/application/mapping/person-public-fields.builder.ts");
const update_person_by_external_id_response_1 = __webpack_require__(/*! ./update-person-by-external-id.response */ "./apps/transversal-ms/src/modules/persons/application/use-cases/update-person-by-external-id/update-person-by-external-id.response.ts");
let UpdatePersonByExternalIdUseCase = class UpdatePersonByExternalIdUseCase {
    constructor(person_repository, reference_lookup) {
        this.person_repository = person_repository;
        this.reference_lookup = reference_lookup;
    }
    async execute(req) {
        const patch = {};
        if (req.user_external_id !== undefined) {
            const user_id = await this.reference_lookup.get_user_internal_id_by_external_id(req.user_external_id);
            if (user_id === null) {
                throw new common_1.NotFoundException('user not found');
            }
            patch.user_id = user_id;
        }
        if (req.country_code !== undefined) {
            patch.country_code = req.country_code;
        }
        if (req.first_name !== undefined) {
            patch.first_name = req.first_name;
        }
        if (req.last_name !== undefined) {
            patch.last_name = req.last_name;
        }
        if (req.doc_type !== undefined) {
            patch.doc_type = req.doc_type;
        }
        if (req.doc_number !== undefined) {
            patch.doc_number = req.doc_number;
        }
        if (req.doc_issue_date !== undefined) {
            patch.doc_issue_date = req.doc_issue_date;
        }
        if (req.birth_date !== undefined) {
            patch.birth_date = req.birth_date;
        }
        if (req.gender !== undefined) {
            patch.gender = req.gender;
        }
        if (req.phone !== undefined) {
            patch.phone = req.phone;
        }
        if (req.residential_address !== undefined) {
            patch.residential_address = req.residential_address;
        }
        if (req.business_address !== undefined) {
            patch.business_address = req.business_address;
        }
        if (req.city_external_id !== undefined) {
            if (req.city_external_id === null) {
                patch.city_id = null;
            }
            else {
                const city_id = await this.reference_lookup.get_city_internal_id_by_external_id(req.city_external_id);
                if (city_id === null) {
                    throw new common_1.NotFoundException('city not found');
                }
                patch.city_id = city_id;
            }
        }
        const updated = await this.person_repository.update_by_external_id(req.external_id, patch);
        if (updated === null) {
            throw new common_1.NotFoundException('person not found');
        }
        const fields = await (0, person_public_fields_builder_1.build_person_public_fields)(updated, this.reference_lookup);
        return new update_person_by_external_id_response_1.UpdatePersonByExternalIdResponse(fields);
    }
};
exports.UpdatePersonByExternalIdUseCase = UpdatePersonByExternalIdUseCase;
exports.UpdatePersonByExternalIdUseCase = UpdatePersonByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(persons_tokens_1.PERSON_REPOSITORY)),
    __param(1, (0, common_1.Inject)(person_reference_lookup_port_1.PERSON_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [typeof (_a = typeof person_ports_1.PersonRepository !== "undefined" && person_ports_1.PersonRepository) === "function" ? _a : Object, typeof (_b = typeof person_reference_lookup_port_1.PersonReferenceLookupPort !== "undefined" && person_reference_lookup_port_1.PersonReferenceLookupPort) === "function" ? _b : Object])
], UpdatePersonByExternalIdUseCase);


/***/ },

/***/ "./apps/transversal-ms/src/modules/persons/domain/models/person.models.ts"
/*!********************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/persons/domain/models/person.models.ts ***!
  \********************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Person = void 0;
class Person {
    constructor(internal_id, external_id, user_id, country_code, first_name, last_name, doc_type, doc_number, doc_issue_date, birth_date, gender, phone, residential_address, business_address, city_id, created_at, updated_at) {
        this.internal_id = internal_id;
        this.external_id = external_id;
        this.user_id = user_id;
        this.country_code = country_code;
        this.first_name = first_name;
        this.last_name = last_name;
        this.doc_type = doc_type;
        this.doc_number = doc_number;
        this.doc_issue_date = doc_issue_date;
        this.birth_date = birth_date;
        this.gender = gender;
        this.phone = phone;
        this.residential_address = residential_address;
        this.business_address = business_address;
        this.city_id = city_id;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
exports.Person = Person;


/***/ },

/***/ "./apps/transversal-ms/src/modules/persons/domain/ports/person-reference-lookup.port.ts"
/*!**********************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/persons/domain/ports/person-reference-lookup.port.ts ***!
  \**********************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PERSON_REFERENCE_LOOKUP = void 0;
exports.PERSON_REFERENCE_LOOKUP = Symbol('PERSON_REFERENCE_LOOKUP');


/***/ },

/***/ "./apps/transversal-ms/src/modules/persons/domain/ports/person.ports.ts"
/*!******************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/persons/domain/ports/person.ports.ts ***!
  \******************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ "./apps/transversal-ms/src/modules/persons/persons.module.ts"
/*!*******************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/persons/persons.module.ts ***!
  \*******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PersonsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const create_person_use_case_1 = __webpack_require__(/*! ./application/use-cases/create-person/create-person.use-case */ "./apps/transversal-ms/src/modules/persons/application/use-cases/create-person/create-person.use-case.ts");
const get_person_by_external_id_use_case_1 = __webpack_require__(/*! ./application/use-cases/get-person-by-external-id/get-person-by-external-id.use-case */ "./apps/transversal-ms/src/modules/persons/application/use-cases/get-person-by-external-id/get-person-by-external-id.use-case.ts");
const list_persons_use_case_1 = __webpack_require__(/*! ./application/use-cases/list-persons/list-persons.use-case */ "./apps/transversal-ms/src/modules/persons/application/use-cases/list-persons/list-persons.use-case.ts");
const update_person_by_external_id_use_case_1 = __webpack_require__(/*! ./application/use-cases/update-person-by-external-id/update-person-by-external-id.use-case */ "./apps/transversal-ms/src/modules/persons/application/use-cases/update-person-by-external-id/update-person-by-external-id.use-case.ts");
const delete_person_by_external_id_use_case_1 = __webpack_require__(/*! ./application/use-cases/delete-person-by-external-id/delete-person-by-external-id.use-case */ "./apps/transversal-ms/src/modules/persons/application/use-cases/delete-person-by-external-id/delete-person-by-external-id.use-case.ts");
let PersonsModule = class PersonsModule {
};
exports.PersonsModule = PersonsModule;
exports.PersonsModule = PersonsModule = __decorate([
    (0, common_1.Module)({
        providers: [
            create_person_use_case_1.CreatePersonUseCase,
            get_person_by_external_id_use_case_1.GetPersonByExternalIdUseCase,
            list_persons_use_case_1.ListPersonsUseCase,
            update_person_by_external_id_use_case_1.UpdatePersonByExternalIdUseCase,
            delete_person_by_external_id_use_case_1.DeletePersonByExternalIdUseCase,
        ],
        exports: [
            create_person_use_case_1.CreatePersonUseCase,
            get_person_by_external_id_use_case_1.GetPersonByExternalIdUseCase,
            list_persons_use_case_1.ListPersonsUseCase,
            update_person_by_external_id_use_case_1.UpdatePersonByExternalIdUseCase,
            delete_person_by_external_id_use_case_1.DeletePersonByExternalIdUseCase,
        ],
    })
], PersonsModule);


/***/ },

/***/ "./apps/transversal-ms/src/modules/persons/persons.tokens.ts"
/*!*******************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/persons/persons.tokens.ts ***!
  \*******************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PERSON_REPOSITORY = void 0;
exports.PERSON_REPOSITORY = Symbol('PERSON_REPOSITORY');


/***/ },

/***/ "./apps/transversal-ms/src/modules/transversal/application/dto/upload-files-inbound.dto.ts"
/*!*************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/transversal/application/dto/upload-files-inbound.dto.ts ***!
  \*************************************************************************************************/
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
exports.UploadFilesInboundEventDto = exports.UploadFilesInboundPayloadDto = exports.UploadFilesInboundItemDto = void 0;
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class UploadFilesInboundItemDto {
}
exports.UploadFilesInboundItemDto = UploadFilesInboundItemDto;
__decorate([
    (0, class_transformer_1.Expose)({ name: 'file' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], UploadFilesInboundItemDto.prototype, "file", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'folder' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], UploadFilesInboundItemDto.prototype, "folder", void 0);
class UploadFilesInboundPayloadDto {
}
exports.UploadFilesInboundPayloadDto = UploadFilesInboundPayloadDto;
__decorate([
    (0, class_transformer_1.Expose)({ name: 'bucket' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], UploadFilesInboundPayloadDto.prototype, "bucket", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'files' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => UploadFilesInboundItemDto),
    __metadata("design:type", Array)
], UploadFilesInboundPayloadDto.prototype, "files", void 0);
class UploadFilesInboundEventDto {
}
exports.UploadFilesInboundEventDto = UploadFilesInboundEventDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['upload-files']),
    __metadata("design:type", String)
], UploadFilesInboundEventDto.prototype, "event", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['1.0']),
    __metadata("design:type", String)
], UploadFilesInboundEventDto.prototype, "version", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'correlationId' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], UploadFilesInboundEventDto.prototype, "correlation_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'idempotencyKey' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(512),
    __metadata("design:type", String)
], UploadFilesInboundEventDto.prototype, "idempotency_key", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => UploadFilesInboundPayloadDto),
    __metadata("design:type", UploadFilesInboundPayloadDto)
], UploadFilesInboundEventDto.prototype, "payload", void 0);


/***/ },

/***/ "./apps/transversal-ms/src/modules/transversal/application/exceptions/upload-files.validation.error.ts"
/*!*************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/transversal/application/exceptions/upload-files.validation.error.ts ***!
  \*************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadFilesValidationError = void 0;
class UploadFilesValidationError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
        this.name = 'UploadFilesValidationError';
    }
}
exports.UploadFilesValidationError = UploadFilesValidationError;


/***/ },

/***/ "./apps/transversal-ms/src/modules/transversal/application/services/file-input.decoder.ts"
/*!************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/transversal/application/services/file-input.decoder.ts ***!
  \************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.decode_file_input = decode_file_input;
exports.extension_for_content_type = extension_for_content_type;
const upload_files_validation_error_1 = __webpack_require__(/*! ../exceptions/upload-files.validation.error */ "./apps/transversal-ms/src/modules/transversal/application/exceptions/upload-files.validation.error.ts");
const MAX_DECODED_BYTES = 12 * 1024 * 1024;
const DATA_URL_REGEX = /^data:([\w/+.-]+);base64,(.+)$/i;
async function decode_file_input(raw, remote_fetch) {
    const trimmed = raw.trim();
    if (trimmed.length === 0) {
        throw new upload_files_validation_error_1.UploadFilesValidationError('archivo vacío', 'FILE_EMPTY');
    }
    if (/^https?:\/\//i.test(trimmed)) {
        try {
            const { buffer, content_type } = await remote_fetch.fetch_as_buffer(trimmed);
            assert_max_size(buffer);
            return {
                buffer,
                content_type: content_type ?? 'application/octet-stream',
            };
        }
        catch {
            throw new upload_files_validation_error_1.UploadFilesValidationError('no se pudo obtener archivo remoto', 'FILE_FETCH_FAILED');
        }
    }
    const data_match = DATA_URL_REGEX.exec(trimmed);
    if (data_match) {
        const content_type = data_match[1].toLowerCase();
        const b64 = data_match[2].replace(/\s/g, '');
        const buffer = Buffer.from(b64, 'base64');
        if (buffer.length === 0) {
            throw new upload_files_validation_error_1.UploadFilesValidationError('base64 inválido', 'FILE_INVALID_BASE64');
        }
        assert_max_size(buffer);
        return { buffer, content_type };
    }
    const normalized_b64 = trimmed.replace(/\s/g, '');
    const buffer = Buffer.from(normalized_b64, 'base64');
    if (buffer.length === 0 || !is_likely_base64(normalized_b64)) {
        throw new upload_files_validation_error_1.UploadFilesValidationError('formato de archivo no soportado', 'FILE_UNSUPPORTED_FORMAT');
    }
    assert_max_size(buffer);
    return { buffer, content_type: 'application/octet-stream' };
}
function assert_max_size(buffer) {
    if (buffer.length > MAX_DECODED_BYTES) {
        throw new upload_files_validation_error_1.UploadFilesValidationError('archivo excede tamaño máximo permitido', 'FILE_TOO_LARGE');
    }
}
function is_likely_base64(s) {
    if (s.length < 16) {
        return false;
    }
    return /^[A-Za-z0-9+/]+=*$/.test(s);
}
function extension_for_content_type(content_type) {
    const base = content_type.split(';')[0]?.trim().toLowerCase() ?? '';
    const map = {
        'image/png': '.png',
        'image/jpeg': '.jpg',
        'image/jpg': '.jpg',
        'image/gif': '.gif',
        'image/webp': '.webp',
        'application/pdf': '.pdf',
    };
    return map[base] ?? '.bin';
}


/***/ },

/***/ "./apps/transversal-ms/src/modules/transversal/application/use-cases/ingest-upload-files-sqs-message.use-case.ts"
/*!***********************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/transversal/application/use-cases/ingest-upload-files-sqs-message.use-case.ts ***!
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
var IngestUploadFilesSqsMessageUseCase_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IngestUploadFilesSqsMessageUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const publish_files_uploaded_event_use_case_1 = __webpack_require__(/*! @messaging/application/use-cases/publish-files-uploaded-event.use-case */ "./apps/transversal-ms/src/modules/messaging/application/use-cases/publish-files-uploaded-event.use-case.ts");
const upload_files_inbound_dto_1 = __webpack_require__(/*! ../dto/upload-files-inbound.dto */ "./apps/transversal-ms/src/modules/transversal/application/dto/upload-files-inbound.dto.ts");
const upload_files_use_case_1 = __webpack_require__(/*! ./upload-files/upload-files.use-case */ "./apps/transversal-ms/src/modules/transversal/application/use-cases/upload-files/upload-files.use-case.ts");
const upload_files_validation_error_1 = __webpack_require__(/*! ../exceptions/upload-files.validation.error */ "./apps/transversal-ms/src/modules/transversal/application/exceptions/upload-files.validation.error.ts");
const storage_error_1 = __webpack_require__(/*! @modules/transversal/domain/errors/storage.error */ "./apps/transversal-ms/src/modules/transversal/domain/errors/storage.error.ts");
const transversal_tokens_1 = __webpack_require__(/*! @modules/transversal/transversal.tokens */ "./apps/transversal-ms/src/modules/transversal/transversal.tokens.ts");
let IngestUploadFilesSqsMessageUseCase = IngestUploadFilesSqsMessageUseCase_1 = class IngestUploadFilesSqsMessageUseCase {
    constructor(upload_files, publish_files_uploaded, idempotency) {
        this.upload_files = upload_files;
        this.publish_files_uploaded = publish_files_uploaded;
        this.idempotency = idempotency;
        this.logger = new common_1.Logger(IngestUploadFilesSqsMessageUseCase_1.name);
    }
    async execute(command) {
        let parsed;
        try {
            parsed = JSON.parse(command.body);
        }
        catch {
            this.logger.warn('[UploadFiles][correlationId=unknown][step=parse] cuerpo no es JSON válido; reintento SQS.');
            return command.delete_on_validation_error;
        }
        const correlation_for_log = this.try_correlation_id(parsed) ?? 'unknown';
        this.logger.log(`[UploadFiles][correlationId=${correlation_for_log}][step=sqs_payload_received]`);
        const dto = (0, class_transformer_1.plainToInstance)(upload_files_inbound_dto_1.UploadFilesInboundEventDto, parsed, {
            enableImplicitConversion: true,
        });
        const errors = (0, class_validator_1.validateSync)(dto, { forbidUnknownValues: false });
        if (errors.length > 0) {
            const message = errors
                .map((e) => Object.values(e.constraints ?? {}).join(', '))
                .join('; ');
            this.logger.warn(`[UploadFiles][correlationId=${correlation_for_log}][step=validation] ${message}`);
            return command.delete_on_validation_error;
        }
        const begin = await this.idempotency.begin(dto.idempotency_key, dto.correlation_id);
        if (begin.status === 'duplicate') {
            this.logger.log(`[UploadFiles][correlationId=${dto.correlation_id}][step=idempotent_hit]`);
            return true;
        }
        if (begin.status === 'conflict') {
            this.logger.warn(`[UploadFiles][correlationId=${dto.correlation_id}][step=idempotency_conflict]`);
            return false;
        }
        try {
            const uploaded = await this.upload_files.execute({
                correlation_id: dto.correlation_id,
                idempotency_key: dto.idempotency_key,
                bucket: dto.payload.bucket,
                files: dto.payload.files.map((f) => ({
                    raw_file: f.file,
                    folder: f.folder,
                })),
            });
            await this.idempotency.complete(dto.idempotency_key, { files: uploaded });
            await this.publish_files_uploaded.execute({
                correlation_id: dto.correlation_id,
                files: uploaded,
            });
            this.logger.log(`[UploadFiles][correlationId=${dto.correlation_id}][step=outbound_published]`);
            return true;
        }
        catch (err) {
            await this.idempotency.release(dto.idempotency_key);
            if (err instanceof upload_files_validation_error_1.UploadFilesValidationError) {
                this.logger.warn(`[UploadFiles][correlationId=${dto.correlation_id}][step=rejected] code=${err.code}`);
                return command.delete_on_validation_error;
            }
            if (err instanceof storage_error_1.StorageDomainError) {
                this.logger.error(`[UploadFiles][correlationId=${dto.correlation_id}][step=storage_error] code=${err.code}`);
                return false;
            }
            const text = err instanceof Error ? err.message : String(err);
            this.logger.error(`[UploadFiles][correlationId=${dto.correlation_id}][step=failed] ${text}`);
            return false;
        }
    }
    try_correlation_id(parsed) {
        if (typeof parsed === 'object' &&
            parsed !== null &&
            'correlationId' in parsed &&
            typeof parsed.correlationId === 'string') {
            return parsed.correlationId;
        }
        return undefined;
    }
};
exports.IngestUploadFilesSqsMessageUseCase = IngestUploadFilesSqsMessageUseCase;
exports.IngestUploadFilesSqsMessageUseCase = IngestUploadFilesSqsMessageUseCase = IngestUploadFilesSqsMessageUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)(transversal_tokens_1.UPLOAD_FILES_IDEMPOTENCY_PORT)),
    __metadata("design:paramtypes", [typeof (_a = typeof upload_files_use_case_1.UploadFilesUseCase !== "undefined" && upload_files_use_case_1.UploadFilesUseCase) === "function" ? _a : Object, typeof (_b = typeof publish_files_uploaded_event_use_case_1.PublishFilesUploadedEventUseCase !== "undefined" && publish_files_uploaded_event_use_case_1.PublishFilesUploadedEventUseCase) === "function" ? _b : Object, Object])
], IngestUploadFilesSqsMessageUseCase);


/***/ },

/***/ "./apps/transversal-ms/src/modules/transversal/application/use-cases/upload-files/upload-files.use-case.ts"
/*!*****************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/transversal/application/use-cases/upload-files/upload-files.use-case.ts ***!
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
var UploadFilesUseCase_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadFilesUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const crypto_1 = __webpack_require__(/*! crypto */ "crypto");
const transversal_tokens_1 = __webpack_require__(/*! @modules/transversal/transversal.tokens */ "./apps/transversal-ms/src/modules/transversal/transversal.tokens.ts");
const upload_files_validation_error_1 = __webpack_require__(/*! ../../exceptions/upload-files.validation.error */ "./apps/transversal-ms/src/modules/transversal/application/exceptions/upload-files.validation.error.ts");
const file_input_decoder_1 = __webpack_require__(/*! ../../services/file-input.decoder */ "./apps/transversal-ms/src/modules/transversal/application/services/file-input.decoder.ts");
let UploadFilesUseCase = UploadFilesUseCase_1 = class UploadFilesUseCase {
    constructor(storage, remote_fetch) {
        this.storage = storage;
        this.remote_fetch = remote_fetch;
        this.logger = new common_1.Logger(UploadFilesUseCase_1.name);
    }
    async execute(command) {
        const bucket = command.bucket.trim();
        if (bucket.length === 0) {
            throw new upload_files_validation_error_1.UploadFilesValidationError('bucket inválido', 'BUCKET_INVALID');
        }
        if (command.files.length === 0) {
            throw new upload_files_validation_error_1.UploadFilesValidationError('debe enviarse al menos un archivo', 'FILES_NONE');
        }
        const results = [];
        for (let index = 0; index < command.files.length; index += 1) {
            const item = command.files[index];
            const folder = this.sanitize_folder(item.folder);
            if (folder.length === 0) {
                throw new upload_files_validation_error_1.UploadFilesValidationError(`folder inválido en índice ${index}`, 'FOLDER_INVALID');
            }
            const { buffer, content_type } = await (0, file_input_decoder_1.decode_file_input)(item.raw_file, this.remote_fetch);
            const ext = (0, file_input_decoder_1.extension_for_content_type)(content_type);
            const object_name = `${(0, crypto_1.randomUUID)()}${ext}`;
            const path = `${folder}/${object_name}`;
            this.logger.log(`[UploadFiles][correlationId=${command.correlation_id}][step=upload][index=${index}][path=${path}]`);
            const url = await this.storage.upload({
                bucket,
                file: buffer,
                path,
                content_type,
            });
            results.push({ url, folder: item.folder.trim() });
        }
        return results;
    }
    sanitize_folder(raw) {
        const trimmed = raw.trim().replace(/\\/g, '/');
        const segments = trimmed
            .split('/')
            .map((s) => s.trim())
            .filter((s) => s.length > 0);
        const safe = [];
        for (const seg of segments) {
            if (seg === '..' || seg === '.') {
                return '';
            }
            const part = seg
                .replace(/[^a-zA-Z0-9._-]+/g, '_')
                .replace(/^_+|_+$/g, '')
                .slice(0, 120);
            if (part.length === 0) {
                return '';
            }
            safe.push(part);
        }
        return safe.join('/');
    }
};
exports.UploadFilesUseCase = UploadFilesUseCase;
exports.UploadFilesUseCase = UploadFilesUseCase = UploadFilesUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(transversal_tokens_1.STORAGE_PORT)),
    __param(1, (0, common_1.Inject)(transversal_tokens_1.REMOTE_FILE_FETCH_PORT)),
    __metadata("design:paramtypes", [Object, Object])
], UploadFilesUseCase);


/***/ },

/***/ "./apps/transversal-ms/src/modules/transversal/domain/errors/storage.error.ts"
/*!************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/transversal/domain/errors/storage.error.ts ***!
  \************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StorageDomainError = void 0;
class StorageDomainError extends Error {
    constructor(code, message, cause) {
        super(message);
        this.code = code;
        this.cause = cause;
        this.name = 'StorageDomainError';
    }
}
exports.StorageDomainError = StorageDomainError;


/***/ },

/***/ "./apps/transversal-ms/src/modules/transversal/transversal-upload.module.ts"
/*!**********************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/transversal/transversal-upload.module.ts ***!
  \**********************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransversalUploadModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const messaging_application_module_1 = __webpack_require__(/*! @messaging/messaging-application.module */ "./apps/transversal-ms/src/modules/messaging/messaging-application.module.ts");
const upload_files_use_case_1 = __webpack_require__(/*! ./application/use-cases/upload-files/upload-files.use-case */ "./apps/transversal-ms/src/modules/transversal/application/use-cases/upload-files/upload-files.use-case.ts");
const ingest_upload_files_sqs_message_use_case_1 = __webpack_require__(/*! ./application/use-cases/ingest-upload-files-sqs-message.use-case */ "./apps/transversal-ms/src/modules/transversal/application/use-cases/ingest-upload-files-sqs-message.use-case.ts");
let TransversalUploadModule = class TransversalUploadModule {
};
exports.TransversalUploadModule = TransversalUploadModule;
exports.TransversalUploadModule = TransversalUploadModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule, messaging_application_module_1.MessagingApplicationModule],
        providers: [upload_files_use_case_1.UploadFilesUseCase, ingest_upload_files_sqs_message_use_case_1.IngestUploadFilesSqsMessageUseCase],
        exports: [ingest_upload_files_sqs_message_use_case_1.IngestUploadFilesSqsMessageUseCase, upload_files_use_case_1.UploadFilesUseCase],
    })
], TransversalUploadModule);


/***/ },

/***/ "./apps/transversal-ms/src/modules/transversal/transversal.tokens.ts"
/*!***************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/transversal/transversal.tokens.ts ***!
  \***************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UPLOAD_FILES_IDEMPOTENCY_PORT = exports.REMOTE_FILE_FETCH_PORT = exports.STORAGE_PORT = void 0;
exports.STORAGE_PORT = Symbol('STORAGE_PORT');
exports.REMOTE_FILE_FETCH_PORT = Symbol('REMOTE_FILE_FETCH_PORT');
exports.UPLOAD_FILES_IDEMPOTENCY_PORT = Symbol('UPLOAD_FILES_IDEMPOTENCY_PORT');


/***/ },

/***/ "./apps/transversal-ms/src/modules/users/application/mapping/user-public-fields.builder.ts"
/*!*************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/users/application/mapping/user-public-fields.builder.ts ***!
  \*************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.build_user_public_fields = build_user_public_fields;
async function build_user_public_fields(row, lookup) {
    const role_external_id = await lookup.get_role_external_id_by_internal_id(row.role_id);
    const status_external_id = await lookup.get_status_external_id_by_internal_id(row.status_id);
    if (status_external_id === null) {
        throw new Error('user status reference resolution failed');
    }
    if (row.role_id !== null && role_external_id === null) {
        throw new Error('user role reference resolution failed');
    }
    return {
        external_id: row.external_id,
        cognito_sub: row.cognito_sub,
        email: row.email,
        role_external_id,
        status_external_id,
        last_login_at: row.last_login_at,
        created_at: row.created_at,
        updated_at: row.updated_at,
    };
}


/***/ },

/***/ "./apps/transversal-ms/src/modules/users/application/use-cases/create-user/create-user.response.ts"
/*!*********************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/users/application/use-cases/create-user/create-user.response.ts ***!
  \*********************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUserResponse = void 0;
class CreateUserResponse {
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.CreateUserResponse = CreateUserResponse;


/***/ },

/***/ "./apps/transversal-ms/src/modules/users/application/use-cases/create-user/create-user.use-case.ts"
/*!*********************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/users/application/use-cases/create-user/create-user.use-case.ts ***!
  \*********************************************************************************************************/
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
exports.CreateUserUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const users_tokens_1 = __webpack_require__(/*! @modules/users/users.tokens */ "./apps/transversal-ms/src/modules/users/users.tokens.ts");
const user_reference_lookup_port_1 = __webpack_require__(/*! @modules/users/domain/ports/user-reference-lookup.port */ "./apps/transversal-ms/src/modules/users/domain/ports/user-reference-lookup.port.ts");
const user_ports_1 = __webpack_require__(/*! @modules/users/domain/ports/user.ports */ "./apps/transversal-ms/src/modules/users/domain/ports/user.ports.ts");
const user_public_fields_builder_1 = __webpack_require__(/*! @modules/users/application/mapping/user-public-fields.builder */ "./apps/transversal-ms/src/modules/users/application/mapping/user-public-fields.builder.ts");
const create_user_response_1 = __webpack_require__(/*! ./create-user.response */ "./apps/transversal-ms/src/modules/users/application/use-cases/create-user/create-user.response.ts");
let CreateUserUseCase = class CreateUserUseCase {
    constructor(user_repository, reference_lookup) {
        this.user_repository = user_repository;
        this.reference_lookup = reference_lookup;
    }
    async execute(req) {
        const status_id = await this.reference_lookup.get_status_internal_id_by_external_id(req.status_external_id);
        if (status_id === null) {
            throw new common_1.NotFoundException('status not found');
        }
        let role_id = null;
        if (req.role_external_id !== null) {
            role_id = await this.reference_lookup.get_role_internal_id_by_external_id(req.role_external_id);
            if (role_id === null) {
                throw new common_1.NotFoundException('role not found');
            }
        }
        const created = await this.user_repository.create({
            cognito_sub: req.cognito_sub,
            email: req.email,
            role_id,
            status_id,
            last_login_at: req.last_login_at,
        });
        const fields = await (0, user_public_fields_builder_1.build_user_public_fields)(created, this.reference_lookup);
        return new create_user_response_1.CreateUserResponse(fields);
    }
};
exports.CreateUserUseCase = CreateUserUseCase;
exports.CreateUserUseCase = CreateUserUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(users_tokens_1.USER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(user_reference_lookup_port_1.USER_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [typeof (_a = typeof user_ports_1.UserRepository !== "undefined" && user_ports_1.UserRepository) === "function" ? _a : Object, typeof (_b = typeof user_reference_lookup_port_1.UserReferenceLookupPort !== "undefined" && user_reference_lookup_port_1.UserReferenceLookupPort) === "function" ? _b : Object])
], CreateUserUseCase);


/***/ },

/***/ "./apps/transversal-ms/src/modules/users/application/use-cases/delete-user-by-external-id/delete-user-by-external-id.use-case.ts"
/*!***************************************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/users/application/use-cases/delete-user-by-external-id/delete-user-by-external-id.use-case.ts ***!
  \***************************************************************************************************************************************/
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
exports.DeleteUserByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const users_tokens_1 = __webpack_require__(/*! @modules/users/users.tokens */ "./apps/transversal-ms/src/modules/users/users.tokens.ts");
const user_ports_1 = __webpack_require__(/*! @modules/users/domain/ports/user.ports */ "./apps/transversal-ms/src/modules/users/domain/ports/user.ports.ts");
let DeleteUserByExternalIdUseCase = class DeleteUserByExternalIdUseCase {
    constructor(user_repository) {
        this.user_repository = user_repository;
    }
    async execute(req) {
        const ok = await this.user_repository.delete_by_external_id(req.external_id);
        if (!ok) {
            throw new common_1.NotFoundException('user not found');
        }
    }
};
exports.DeleteUserByExternalIdUseCase = DeleteUserByExternalIdUseCase;
exports.DeleteUserByExternalIdUseCase = DeleteUserByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(users_tokens_1.USER_REPOSITORY)),
    __metadata("design:paramtypes", [typeof (_a = typeof user_ports_1.UserRepository !== "undefined" && user_ports_1.UserRepository) === "function" ? _a : Object])
], DeleteUserByExternalIdUseCase);


/***/ },

/***/ "./apps/transversal-ms/src/modules/users/application/use-cases/get-user-by-external-id/get-user-by-external-id.response.ts"
/*!*********************************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/users/application/use-cases/get-user-by-external-id/get-user-by-external-id.response.ts ***!
  \*********************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetUserByExternalIdResponse = void 0;
class GetUserByExternalIdResponse {
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.GetUserByExternalIdResponse = GetUserByExternalIdResponse;


/***/ },

/***/ "./apps/transversal-ms/src/modules/users/application/use-cases/get-user-by-external-id/get-user-by-external-id.use-case.ts"
/*!*********************************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/users/application/use-cases/get-user-by-external-id/get-user-by-external-id.use-case.ts ***!
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetUserByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const users_tokens_1 = __webpack_require__(/*! @modules/users/users.tokens */ "./apps/transversal-ms/src/modules/users/users.tokens.ts");
const user_reference_lookup_port_1 = __webpack_require__(/*! @modules/users/domain/ports/user-reference-lookup.port */ "./apps/transversal-ms/src/modules/users/domain/ports/user-reference-lookup.port.ts");
const user_ports_1 = __webpack_require__(/*! @modules/users/domain/ports/user.ports */ "./apps/transversal-ms/src/modules/users/domain/ports/user.ports.ts");
const user_public_fields_builder_1 = __webpack_require__(/*! @modules/users/application/mapping/user-public-fields.builder */ "./apps/transversal-ms/src/modules/users/application/mapping/user-public-fields.builder.ts");
const get_user_by_external_id_response_1 = __webpack_require__(/*! ./get-user-by-external-id.response */ "./apps/transversal-ms/src/modules/users/application/use-cases/get-user-by-external-id/get-user-by-external-id.response.ts");
let GetUserByExternalIdUseCase = class GetUserByExternalIdUseCase {
    constructor(user_repository, reference_lookup) {
        this.user_repository = user_repository;
        this.reference_lookup = reference_lookup;
    }
    async execute(req) {
        const row = await this.user_repository.find_by_external_id(req.external_id);
        if (row === null) {
            throw new common_1.NotFoundException('user not found');
        }
        const fields = await (0, user_public_fields_builder_1.build_user_public_fields)(row, this.reference_lookup);
        return new get_user_by_external_id_response_1.GetUserByExternalIdResponse(fields);
    }
};
exports.GetUserByExternalIdUseCase = GetUserByExternalIdUseCase;
exports.GetUserByExternalIdUseCase = GetUserByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(users_tokens_1.USER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(user_reference_lookup_port_1.USER_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [typeof (_a = typeof user_ports_1.UserRepository !== "undefined" && user_ports_1.UserRepository) === "function" ? _a : Object, typeof (_b = typeof user_reference_lookup_port_1.UserReferenceLookupPort !== "undefined" && user_reference_lookup_port_1.UserReferenceLookupPort) === "function" ? _b : Object])
], GetUserByExternalIdUseCase);


/***/ },

/***/ "./apps/transversal-ms/src/modules/users/application/use-cases/list-users/list-users.response.ts"
/*!*******************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/users/application/use-cases/list-users/list-users.response.ts ***!
  \*******************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListUsersItemResponse = void 0;
class ListUsersItemResponse {
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.ListUsersItemResponse = ListUsersItemResponse;


/***/ },

/***/ "./apps/transversal-ms/src/modules/users/application/use-cases/list-users/list-users.use-case.ts"
/*!*******************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/users/application/use-cases/list-users/list-users.use-case.ts ***!
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListUsersUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const users_tokens_1 = __webpack_require__(/*! @modules/users/users.tokens */ "./apps/transversal-ms/src/modules/users/users.tokens.ts");
const user_reference_lookup_port_1 = __webpack_require__(/*! @modules/users/domain/ports/user-reference-lookup.port */ "./apps/transversal-ms/src/modules/users/domain/ports/user-reference-lookup.port.ts");
const user_ports_1 = __webpack_require__(/*! @modules/users/domain/ports/user.ports */ "./apps/transversal-ms/src/modules/users/domain/ports/user.ports.ts");
const user_public_fields_builder_1 = __webpack_require__(/*! @modules/users/application/mapping/user-public-fields.builder */ "./apps/transversal-ms/src/modules/users/application/mapping/user-public-fields.builder.ts");
const list_users_response_1 = __webpack_require__(/*! ./list-users.response */ "./apps/transversal-ms/src/modules/users/application/use-cases/list-users/list-users.response.ts");
let ListUsersUseCase = class ListUsersUseCase {
    constructor(user_repository, reference_lookup) {
        this.user_repository = user_repository;
        this.reference_lookup = reference_lookup;
    }
    async execute() {
        const rows = await this.user_repository.find_all();
        const out = [];
        for (const row of rows) {
            const fields = await (0, user_public_fields_builder_1.build_user_public_fields)(row, this.reference_lookup);
            out.push(new list_users_response_1.ListUsersItemResponse(fields));
        }
        return out;
    }
};
exports.ListUsersUseCase = ListUsersUseCase;
exports.ListUsersUseCase = ListUsersUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(users_tokens_1.USER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(user_reference_lookup_port_1.USER_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [typeof (_a = typeof user_ports_1.UserRepository !== "undefined" && user_ports_1.UserRepository) === "function" ? _a : Object, typeof (_b = typeof user_reference_lookup_port_1.UserReferenceLookupPort !== "undefined" && user_reference_lookup_port_1.UserReferenceLookupPort) === "function" ? _b : Object])
], ListUsersUseCase);


/***/ },

/***/ "./apps/transversal-ms/src/modules/users/application/use-cases/update-user-by-external-id/update-user-by-external-id.response.ts"
/*!***************************************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/users/application/use-cases/update-user-by-external-id/update-user-by-external-id.response.ts ***!
  \***************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserByExternalIdResponse = void 0;
class UpdateUserByExternalIdResponse {
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.UpdateUserByExternalIdResponse = UpdateUserByExternalIdResponse;


/***/ },

/***/ "./apps/transversal-ms/src/modules/users/application/use-cases/update-user-by-external-id/update-user-by-external-id.use-case.ts"
/*!***************************************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/users/application/use-cases/update-user-by-external-id/update-user-by-external-id.use-case.ts ***!
  \***************************************************************************************************************************************/
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
exports.UpdateUserByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const users_tokens_1 = __webpack_require__(/*! @modules/users/users.tokens */ "./apps/transversal-ms/src/modules/users/users.tokens.ts");
const user_reference_lookup_port_1 = __webpack_require__(/*! @modules/users/domain/ports/user-reference-lookup.port */ "./apps/transversal-ms/src/modules/users/domain/ports/user-reference-lookup.port.ts");
const user_ports_1 = __webpack_require__(/*! @modules/users/domain/ports/user.ports */ "./apps/transversal-ms/src/modules/users/domain/ports/user.ports.ts");
const user_public_fields_builder_1 = __webpack_require__(/*! @modules/users/application/mapping/user-public-fields.builder */ "./apps/transversal-ms/src/modules/users/application/mapping/user-public-fields.builder.ts");
const update_user_by_external_id_response_1 = __webpack_require__(/*! ./update-user-by-external-id.response */ "./apps/transversal-ms/src/modules/users/application/use-cases/update-user-by-external-id/update-user-by-external-id.response.ts");
let UpdateUserByExternalIdUseCase = class UpdateUserByExternalIdUseCase {
    constructor(user_repository, reference_lookup) {
        this.user_repository = user_repository;
        this.reference_lookup = reference_lookup;
    }
    async execute(req) {
        const patch = {};
        if (req.cognito_sub !== undefined) {
            patch.cognito_sub = req.cognito_sub;
        }
        if (req.email !== undefined) {
            patch.email = req.email;
        }
        if (req.last_login_at !== undefined) {
            patch.last_login_at = req.last_login_at;
        }
        if (req.status_external_id !== undefined) {
            const status_id = await this.reference_lookup.get_status_internal_id_by_external_id(req.status_external_id);
            if (status_id === null) {
                throw new common_1.NotFoundException('status not found');
            }
            patch.status_id = status_id;
        }
        if (req.role_external_id !== undefined) {
            if (req.role_external_id === null) {
                patch.role_id = null;
            }
            else {
                const role_id = await this.reference_lookup.get_role_internal_id_by_external_id(req.role_external_id);
                if (role_id === null) {
                    throw new common_1.NotFoundException('role not found');
                }
                patch.role_id = role_id;
            }
        }
        const updated = await this.user_repository.update_by_external_id(req.external_id, patch);
        if (updated === null) {
            throw new common_1.NotFoundException('user not found');
        }
        const fields = await (0, user_public_fields_builder_1.build_user_public_fields)(updated, this.reference_lookup);
        return new update_user_by_external_id_response_1.UpdateUserByExternalIdResponse(fields);
    }
};
exports.UpdateUserByExternalIdUseCase = UpdateUserByExternalIdUseCase;
exports.UpdateUserByExternalIdUseCase = UpdateUserByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(users_tokens_1.USER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(user_reference_lookup_port_1.USER_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [typeof (_a = typeof user_ports_1.UserRepository !== "undefined" && user_ports_1.UserRepository) === "function" ? _a : Object, typeof (_b = typeof user_reference_lookup_port_1.UserReferenceLookupPort !== "undefined" && user_reference_lookup_port_1.UserReferenceLookupPort) === "function" ? _b : Object])
], UpdateUserByExternalIdUseCase);


/***/ },

/***/ "./apps/transversal-ms/src/modules/users/domain/models/user.models.ts"
/*!****************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/users/domain/models/user.models.ts ***!
  \****************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
class User {
    constructor(internal_id, external_id, cognito_sub, email, role_id, status_id, last_login_at, created_at, updated_at) {
        this.internal_id = internal_id;
        this.external_id = external_id;
        this.cognito_sub = cognito_sub;
        this.email = email;
        this.role_id = role_id;
        this.status_id = status_id;
        this.last_login_at = last_login_at;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
exports.User = User;


/***/ },

/***/ "./apps/transversal-ms/src/modules/users/domain/ports/user-reference-lookup.port.ts"
/*!******************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/users/domain/ports/user-reference-lookup.port.ts ***!
  \******************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.USER_REFERENCE_LOOKUP = void 0;
exports.USER_REFERENCE_LOOKUP = Symbol('USER_REFERENCE_LOOKUP');


/***/ },

/***/ "./apps/transversal-ms/src/modules/users/domain/ports/user.ports.ts"
/*!**************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/users/domain/ports/user.ports.ts ***!
  \**************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ "./apps/transversal-ms/src/modules/users/users.module.ts"
/*!***************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/users/users.module.ts ***!
  \***************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const create_user_use_case_1 = __webpack_require__(/*! ./application/use-cases/create-user/create-user.use-case */ "./apps/transversal-ms/src/modules/users/application/use-cases/create-user/create-user.use-case.ts");
const get_user_by_external_id_use_case_1 = __webpack_require__(/*! ./application/use-cases/get-user-by-external-id/get-user-by-external-id.use-case */ "./apps/transversal-ms/src/modules/users/application/use-cases/get-user-by-external-id/get-user-by-external-id.use-case.ts");
const list_users_use_case_1 = __webpack_require__(/*! ./application/use-cases/list-users/list-users.use-case */ "./apps/transversal-ms/src/modules/users/application/use-cases/list-users/list-users.use-case.ts");
const update_user_by_external_id_use_case_1 = __webpack_require__(/*! ./application/use-cases/update-user-by-external-id/update-user-by-external-id.use-case */ "./apps/transversal-ms/src/modules/users/application/use-cases/update-user-by-external-id/update-user-by-external-id.use-case.ts");
const delete_user_by_external_id_use_case_1 = __webpack_require__(/*! ./application/use-cases/delete-user-by-external-id/delete-user-by-external-id.use-case */ "./apps/transversal-ms/src/modules/users/application/use-cases/delete-user-by-external-id/delete-user-by-external-id.use-case.ts");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        providers: [
            create_user_use_case_1.CreateUserUseCase,
            get_user_by_external_id_use_case_1.GetUserByExternalIdUseCase,
            list_users_use_case_1.ListUsersUseCase,
            update_user_by_external_id_use_case_1.UpdateUserByExternalIdUseCase,
            delete_user_by_external_id_use_case_1.DeleteUserByExternalIdUseCase,
        ],
        exports: [
            create_user_use_case_1.CreateUserUseCase,
            get_user_by_external_id_use_case_1.GetUserByExternalIdUseCase,
            list_users_use_case_1.ListUsersUseCase,
            update_user_by_external_id_use_case_1.UpdateUserByExternalIdUseCase,
            delete_user_by_external_id_use_case_1.DeleteUserByExternalIdUseCase,
        ],
    })
], UsersModule);


/***/ },

/***/ "./apps/transversal-ms/src/modules/users/users.tokens.ts"
/*!***************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/users/users.tokens.ts ***!
  \***************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.USER_REPOSITORY = void 0;
exports.USER_REPOSITORY = Symbol('USER_REPOSITORY');


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

/***/ "@aws-sdk/client-s3"
/*!*************************************!*\
  !*** external "@aws-sdk/client-s3" ***!
  \*************************************/
(module) {

module.exports = require("@aws-sdk/client-s3");

/***/ },

/***/ "@aws-sdk/client-sqs"
/*!**************************************!*\
  !*** external "@aws-sdk/client-sqs" ***!
  \**************************************/
(module) {

module.exports = require("@aws-sdk/client-sqs");

/***/ },

/***/ "@aws-sdk/credential-providers"
/*!************************************************!*\
  !*** external "@aws-sdk/credential-providers" ***!
  \************************************************/
(module) {

module.exports = require("@aws-sdk/credential-providers");

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
/*!*****************************************!*\
  !*** ./apps/transversal-ms/src/main.ts ***!
  \*****************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
__webpack_require__(/*! ./config/dotenv.config */ "./apps/transversal-ms/src/config/dotenv.config.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./apps/transversal-ms/src/app.module.ts");
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
        .setTitle('Transversal MS')
        .setDescription('HTTP y mensajería SQS del microservicio Transversal')
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
    logger.log(`Transversal MS (HTTP + SQS) escuchando en puerto ${port}`);
    logger.log(`Swagger UI: http://localhost:${port}/docs`);
}
void bootstrap();

})();

/******/ })()
;