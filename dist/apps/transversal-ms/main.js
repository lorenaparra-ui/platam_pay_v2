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
const throttler_1 = __webpack_require__(/*! @nestjs/throttler */ "@nestjs/throttler");
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
    (0, throttler_1.SkipThrottle)(),
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
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const throttler_1 = __webpack_require__(/*! @nestjs/throttler */ "@nestjs/throttler");
const infrastructure_module_1 = __webpack_require__(/*! @infrastructure/infrastructure.module */ "./apps/transversal-ms/src/infrastructure/infrastructure.module.ts");
const persons_module_1 = __webpack_require__(/*! @modules/persons/persons.module */ "./apps/transversal-ms/src/modules/persons/persons.module.ts");
const users_module_1 = __webpack_require__(/*! @modules/users/users.module */ "./apps/transversal-ms/src/modules/users/users.module.ts");
const app_config_1 = __importDefault(__webpack_require__(/*! ./config/app.config */ "./apps/transversal-ms/src/config/app.config.ts"));
const sqs_config_1 = __webpack_require__(/*! ./config/sqs.config */ "./apps/transversal-ms/src/config/sqs.config.ts");
const security_config_1 = __importDefault(__webpack_require__(/*! ./config/security.config */ "./apps/transversal-ms/src/config/security.config.ts"));
const app_controller_1 = __webpack_require__(/*! ./app.controller */ "./apps/transversal-ms/src/app.controller.ts");
const transversal_module_1 = __webpack_require__(/*! @modules/transversal/transversal.module */ "./apps/transversal-ms/src/modules/transversal/transversal.module.ts");
const auth_module_1 = __webpack_require__(/*! @modules/auth/auth.module */ "./apps/transversal-ms/src/modules/auth/auth.module.ts");
const all_exceptions_filter_1 = __webpack_require__(/*! @common/filters/all-exceptions.filter */ "./apps/transversal-ms/src/common/filters/all-exceptions.filter.ts");
const transversal_throttler_guard_1 = __webpack_require__(/*! @common/guards/transversal-throttler.guard */ "./apps/transversal-ms/src/common/guards/transversal-throttler.guard.ts");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [app_config_1.default, sqs_config_1.sqs_config, security_config_1.default],
                envFilePath: dotenv_config_1.MONOREPO_ENV_PATH,
            }),
            throttler_1.ThrottlerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    throttlers: [
                        {
                            ttl: config.get('security.http_throttle.ttl_ms') ?? 60_000,
                            limit: config.get('security.http_throttle.limit') ?? 120,
                        },
                    ],
                }),
            }),
            infrastructure_module_1.InfrastructureModule,
            auth_module_1.AuthModule,
            transversal_module_1.TransversalModule,
            persons_module_1.PersonsModule,
            users_module_1.UsersModule,
        ],
        controllers: [app_controller_1.appController],
        providers: [
            { provide: core_1.APP_GUARD, useClass: transversal_throttler_guard_1.TransversalThrottlerGuard },
            { provide: core_1.APP_FILTER, useClass: all_exceptions_filter_1.AllExceptionsFilter },
        ],
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
    status;
    service;
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

/***/ "./apps/transversal-ms/src/common/filters/all-exceptions.filter.ts"
/*!*************************************************************************!*\
  !*** ./apps/transversal-ms/src/common/filters/all-exceptions.filter.ts ***!
  \*************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AllExceptionsFilter_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AllExceptionsFilter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let AllExceptionsFilter = AllExceptionsFilter_1 = class AllExceptionsFilter {
    logger = new common_1.Logger(AllExceptionsFilter_1.name);
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        if (exception instanceof common_1.HttpException) {
            const status = exception.getStatus();
            const raw = exception.getResponse();
            const message = this.client_message(status, raw);
            if (status >= common_1.HttpStatus.INTERNAL_SERVER_ERROR) {
                this.logger.error(`HTTP ${String(status)} ${request.method} ${this.safe_path(request)}`);
            }
            response.status(status).json({
                status_code: status,
                message,
            });
            return;
        }
        this.logger.error(`Unhandled ${request.method} ${this.safe_path(request)} (${exception instanceof Error ? exception.name : 'unknown'})`);
        response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
            status_code: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Error interno del servidor',
        });
    }
    safe_path(request) {
        return (request.originalUrl ?? request.url ?? '').split('?')[0];
    }
    client_message(status, raw) {
        if (status >= common_1.HttpStatus.INTERNAL_SERVER_ERROR) {
            return 'Error interno del servidor';
        }
        if (status === common_1.HttpStatus.TOO_MANY_REQUESTS) {
            return 'Demasiadas solicitudes';
        }
        if (typeof raw === 'string') {
            return raw;
        }
        const body = raw;
        if (Array.isArray(body.message)) {
            return body.message[0] ?? 'Error';
        }
        if (typeof body.message === 'string') {
            return body.message;
        }
        return 'Error';
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = AllExceptionsFilter_1 = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);


/***/ },

/***/ "./apps/transversal-ms/src/common/guards/transversal-throttler.guard.ts"
/*!******************************************************************************!*\
  !*** ./apps/transversal-ms/src/common/guards/transversal-throttler.guard.ts ***!
  \******************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransversalThrottlerGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const throttler_1 = __webpack_require__(/*! @nestjs/throttler */ "@nestjs/throttler");
let TransversalThrottlerGuard = class TransversalThrottlerGuard extends throttler_1.ThrottlerGuard {
    async shouldSkip(context) {
        if (await super.shouldSkip(context)) {
            return true;
        }
        const { req } = this.getRequestResponse(context);
        const path = String(req.originalUrl ?? req.url ?? '').split('?')[0];
        return path.startsWith('/docs');
    }
};
exports.TransversalThrottlerGuard = TransversalThrottlerGuard;
exports.TransversalThrottlerGuard = TransversalThrottlerGuard = __decorate([
    (0, common_1.Injectable)()
], TransversalThrottlerGuard);


/***/ },

/***/ "./apps/transversal-ms/src/common/middleware/strip-untrusted-identity-headers.middleware.ts"
/*!**************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/common/middleware/strip-untrusted-identity-headers.middleware.ts ***!
  \**************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.strip_untrusted_identity_headers = strip_untrusted_identity_headers;
const UNTRUSTED_IDENTITY_HEADERS = [
    'x-internal-user-id',
    'x-user-internal-id',
    'x-db-id',
    'x-impersonate-user-id',
    'x-act-as-user-id',
];
function strip_untrusted_identity_headers(req, _res, next) {
    for (const h of UNTRUSTED_IDENTITY_HEADERS) {
        delete req.headers[h];
    }
    next();
}


/***/ },

/***/ "./apps/transversal-ms/src/common/utils/normalize-cognito-sub.ts"
/*!***********************************************************************!*\
  !*** ./apps/transversal-ms/src/common/utils/normalize-cognito-sub.ts ***!
  \***********************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.normalize_cognito_sub = normalize_cognito_sub;
function normalize_cognito_sub(raw) {
    return raw.trim().toLowerCase();
}


/***/ },

/***/ "./apps/transversal-ms/src/common/utils/pg-error.util.ts"
/*!***************************************************************!*\
  !*** ./apps/transversal-ms/src/common/utils/pg-error.util.ts ***!
  \***************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.is_pg_unique_violation = is_pg_unique_violation;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
function is_pg_unique_violation(err) {
    if (!(err instanceof typeorm_1.QueryFailedError)) {
        return false;
    }
    const driver = err.driverError;
    return driver?.code === '23505';
}


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

/***/ "./apps/transversal-ms/src/config/security.config.ts"
/*!***********************************************************!*\
  !*** ./apps/transversal-ms/src/config/security.config.ts ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
exports["default"] = (0, config_1.registerAs)('security', () => {
    const trust_raw = process.env.TRUST_PROXY_HOPS ?? '0';
    const trust_proxy_hops = Number.parseInt(trust_raw, 10);
    return {
        trust_proxy_hops: Number.isFinite(trust_proxy_hops) ? Math.max(0, trust_proxy_hops) : 0,
        http_throttle: {
            ttl_ms: Number.parseInt(process.env.HTTP_THROTTLE_TTL_MS ?? '60000', 10) || 60_000,
            limit: Number.parseInt(process.env.HTTP_THROTTLE_LIMIT ?? '120', 10) || 120,
        },
    };
});


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
    aws_region = 'us-east-2';
    transversal_sqs_outbound_queue_url;
    transversal_sqs_inbound_queue_url;
    transversal_sqs_upload_files_queue_url;
    transversal_sqs_create_user_queue_url;
    transversal_sqs_create_person_queue_url;
    transversal_sqs_suppliers_callback_queue_url;
    transversal_sqs_wait_time_seconds = 20;
    transversal_sqs_max_number_of_messages = 10;
    transversal_sqs_visibility_timeout_seconds = 30;
    transversal_sqs_delete_on_validation_error = false;
    transversal_sqs_inbound_consumer_enabled = false;
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
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Object)
], SqsEnv.prototype, "transversal_sqs_inbound_consumer_enabled", void 0);
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
        transversal_sqs_inbound_consumer_enabled: process.env.TRANSVERSAL_SQS_INBOUND_CONSUMER_ENABLED === 'true',
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
        inbound_consumer_enabled: env.transversal_sqs_inbound_consumer_enabled,
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

/***/ "./apps/transversal-ms/src/infrastructure/cognito/cognito-user-provisioning.adapter.ts"
/*!*********************************************************************************************!*\
  !*** ./apps/transversal-ms/src/infrastructure/cognito/cognito-user-provisioning.adapter.ts ***!
  \*********************************************************************************************/
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
var CognitoUserProvisioningAdapter_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CognitoUserProvisioningAdapter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const client_cognito_identity_provider_1 = __webpack_require__(/*! @aws-sdk/client-cognito-identity-provider */ "@aws-sdk/client-cognito-identity-provider");
const crypto_1 = __webpack_require__(/*! crypto */ "crypto");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
const normalize_cognito_sub_1 = __webpack_require__(/*! @common/utils/normalize-cognito-sub */ "./apps/transversal-ms/src/common/utils/normalize-cognito-sub.ts");
const COGNITO_ROLE_GROUP_NAMES = new Set(Object.values(shared_1.Roles));
let CognitoUserProvisioningAdapter = CognitoUserProvisioningAdapter_1 = class CognitoUserProvisioningAdapter {
    config_service;
    logger = new common_1.Logger(CognitoUserProvisioningAdapter_1.name);
    client;
    constructor(config_service) {
        this.config_service = config_service;
        const region = this.config_service.getOrThrow('config.cognito.region');
        this.client = new client_cognito_identity_provider_1.CognitoIdentityProviderClient({ region });
    }
    async ensure_user(params) {
        const pool_id = this.config_service.get('config.cognito.userPoolId')?.trim() ?? '';
        if (pool_id.length === 0) {
            throw new Error('COGNITO_USER_POOL_ID (config.cognito.userPoolId) es obligatorio para crear usuarios en Cognito.');
        }
        const email = params.email.trim().toLowerCase();
        const user_attributes = [
            { Name: 'email', Value: email },
            { Name: 'email_verified', Value: 'true' },
        ];
        if (params.role_code !== null && params.role_code.trim().length > 0) {
            user_attributes.push({ Name: 'custom:role', Value: params.role_code.trim() });
        }
        try {
            const out = await this.client.send(new client_cognito_identity_provider_1.AdminCreateUserCommand({
                UserPoolId: pool_id,
                Username: email,
                UserAttributes: user_attributes,
                TemporaryPassword: this.generate_temporary_password(),
                MessageAction: 'SUPPRESS',
            }));
            const sub = this.sub_from_user(out.User);
            if (sub === null) {
                throw new Error('Cognito AdminCreateUser no devolvió atributo sub');
            }
            await this.sync_identity_role_with_cognito_groups(pool_id, email, params.role_code);
            return { sub: (0, normalize_cognito_sub_1.normalize_cognito_sub)(sub), username: email, created_new: true };
        }
        catch (err) {
            if (!this.is_username_exists(err)) {
                throw err;
            }
            const got = await this.client.send(new client_cognito_identity_provider_1.AdminGetUserCommand({ UserPoolId: pool_id, Username: email }));
            const sub = this.sub_from_attributes(got.UserAttributes);
            if (sub === null) {
                throw new Error('Cognito AdminGetUser no devolvió atributo sub');
            }
            const username = got.Username?.trim() ?? email;
            await this.sync_identity_role_with_cognito_groups(pool_id, username, params.role_code);
            return { sub: (0, normalize_cognito_sub_1.normalize_cognito_sub)(sub), username, created_new: false };
        }
    }
    async sync_identity_role_with_cognito_groups(pool_id, username, role_code) {
        const target = role_code !== null && role_code.trim().length > 0 ? role_code.trim() : null;
        const listed = await this.client.send(new client_cognito_identity_provider_1.AdminListGroupsForUserCommand({
            UserPoolId: pool_id,
            Username: username,
        }));
        const current_role_groups = listed.Groups?.map((g) => g.GroupName).filter((n) => !!n?.trim()) ?? [];
        for (const group_name of current_role_groups) {
            if (!COGNITO_ROLE_GROUP_NAMES.has(group_name)) {
                continue;
            }
            if (target !== null && group_name === target) {
                continue;
            }
            await this.client.send(new client_cognito_identity_provider_1.AdminRemoveUserFromGroupCommand({
                UserPoolId: pool_id,
                Username: username,
                GroupName: group_name,
            }));
        }
        if (target !== null && COGNITO_ROLE_GROUP_NAMES.has(target)) {
            await this.client.send(new client_cognito_identity_provider_1.AdminAddUserToGroupCommand({
                UserPoolId: pool_id,
                Username: username,
                GroupName: target,
            }));
        }
        else if (target !== null && !COGNITO_ROLE_GROUP_NAMES.has(target)) {
            this.logger.warn(`cognito_group_sync_skipped_unknown_role group=${target} username=${username}`);
        }
    }
    async set_custom_db_id(username, db_user_id) {
        const pool_id = this.config_service.get('config.cognito.userPoolId')?.trim() ?? '';
        if (pool_id.length === 0) {
            return;
        }
        await this.client.send(new client_cognito_identity_provider_1.AdminUpdateUserAttributesCommand({
            UserPoolId: pool_id,
            Username: username,
            UserAttributes: [{ Name: 'custom:db_id', Value: String(db_user_id) }],
        }));
    }
    async try_delete_user(username) {
        const pool_id = this.config_service.get('config.cognito.userPoolId')?.trim() ?? '';
        if (pool_id.length === 0) {
            return;
        }
        try {
            await this.client.send(new client_cognito_identity_provider_1.AdminDeleteUserCommand({ UserPoolId: pool_id, Username: username }));
        }
        catch (err) {
            const text = err instanceof Error ? err.message : String(err);
            this.logger.warn(`cognito_try_delete_user_failed username=${username} ${text}`);
        }
    }
    sub_from_user(user) {
        return this.sub_from_attributes(user?.Attributes);
    }
    sub_from_attributes(attrs) {
        const raw = attrs?.find((a) => a.Name === 'sub')?.Value?.trim();
        return raw !== undefined && raw.length > 0 ? raw : null;
    }
    is_username_exists(err) {
        return (typeof err === 'object' &&
            err !== null &&
            'name' in err &&
            err.name === 'UsernameExistsException');
    }
    generate_temporary_password() {
        const upper = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
        const lower = 'abcdefghijkmnopqrstuvwxyz';
        const digits = '23456789';
        const special = '!@#$%^&*';
        const pick = (set) => set[(0, crypto_1.randomBytes)(1)[0] % set.length];
        const body = (0, crypto_1.randomBytes)(12).toString('base64url').slice(0, 14);
        return `${pick(upper)}${pick(lower)}${pick(digits)}${pick(special)}${body}`;
    }
};
exports.CognitoUserProvisioningAdapter = CognitoUserProvisioningAdapter;
exports.CognitoUserProvisioningAdapter = CognitoUserProvisioningAdapter = CognitoUserProvisioningAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], CognitoUserProvisioningAdapter);


/***/ },

/***/ "./apps/transversal-ms/src/infrastructure/database/adapters/typeorm-partner-create-user-sqs-idempotency.adapter.ts"
/*!*************************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/infrastructure/database/adapters/typeorm-partner-create-user-sqs-idempotency.adapter.ts ***!
  \*************************************************************************************************************************/
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
exports.TypeormPartnerCreateUserSqsIdempotencyAdapter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const transversal_data_1 = __webpack_require__(/*! @app/transversal-data */ "./libs/transversal-data/src/index.ts");
const transversal_data_2 = __webpack_require__(/*! @app/transversal-data */ "./libs/transversal-data/src/index.ts");
let TypeormPartnerCreateUserSqsIdempotencyAdapter = class TypeormPartnerCreateUserSqsIdempotencyAdapter extends transversal_data_1.TypeormSqsIdempotencyBaseAdapter {
    constructor(repo) {
        super(repo);
    }
};
exports.TypeormPartnerCreateUserSqsIdempotencyAdapter = TypeormPartnerCreateUserSqsIdempotencyAdapter;
exports.TypeormPartnerCreateUserSqsIdempotencyAdapter = TypeormPartnerCreateUserSqsIdempotencyAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transversal_data_2.PartnerCreateUserSqsIdempotencyEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], TypeormPartnerCreateUserSqsIdempotencyAdapter);


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
let TypeormUploadFilesIdempotencyAdapter = class TypeormUploadFilesIdempotencyAdapter extends transversal_data_1.TypeormSqsIdempotencyBaseAdapter {
    constructor(repo) {
        super(repo);
    }
};
exports.TypeormUploadFilesIdempotencyAdapter = TypeormUploadFilesIdempotencyAdapter;
exports.TypeormUploadFilesIdempotencyAdapter = TypeormUploadFilesIdempotencyAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transversal_data_1.UploadFilesIdempotencyEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], TypeormUploadFilesIdempotencyAdapter);


/***/ },

/***/ "./apps/transversal-ms/src/infrastructure/database/mappers/city.mapper.ts"
/*!********************************************************************************!*\
  !*** ./apps/transversal-ms/src/infrastructure/database/mappers/city.mapper.ts ***!
  \********************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CityMapper = void 0;
class CityMapper {
    static from_raw_row(row) {
        return {
            id: Number(row['id']),
            external_id: String(row['external_id']),
            country_name: String(row['country_name']),
            country_code: String(row['country_code']),
            state_name: String(row['state_name']),
            state_code: row['state_code'] === null || row['state_code'] === undefined
                ? null
                : String(row['state_code']),
            city_name: String(row['city_name']),
            currency_id: Number(row['currency_id']),
            currency_external_id: String(row['currency_external_id']),
            created_at: new Date(String(row['created_at'])),
            updated_at: new Date(String(row['updated_at'])),
        };
    }
}
exports.CityMapper = CityMapper;


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
        return new person_models_1.Person(row.id, row.externalId, row.firstName, row.lastName, row.docType, row.docNumber, row.docIssueDate ? parse_date_only(row.docIssueDate) : null, row.birthDate ? parse_date_only(row.birthDate) : null, row.gender ?? null, row.phone ?? null, row.residentialAddress ?? null, row.cityId ?? null, row.createdAt, row.updatedAt);
    }
    static from_raw_row(row) {
        return new person_models_1.Person(Number(row['id']), String(row['external_id']), String(row['first_name']), String(row['last_name']), String(row['doc_type']), String(row['doc_number']), parse_date_only(row['doc_issue_date']), parse_date_only(row['birth_date']), row['gender'] === null || row['gender'] === undefined
            ? null
            : String(row['gender']), row['phone'] === null || row['phone'] === undefined
            ? null
            : String(row['phone']), row['residential_address'] === null ||
            row['residential_address'] === undefined
            ? null
            : String(row['residential_address']), row['city_id'] === null || row['city_id'] === undefined
            ? null
            : Number(row['city_id']), new Date(String(row['created_at'])), new Date(String(row['updated_at'])));
    }
}
exports.PersonMapper = PersonMapper;


/***/ },

/***/ "./apps/transversal-ms/src/infrastructure/database/mappers/role.mapper.ts"
/*!********************************************************************************!*\
  !*** ./apps/transversal-ms/src/infrastructure/database/mappers/role.mapper.ts ***!
  \********************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleMapper = void 0;
class RoleMapper {
    static to_domain(row) {
        return {
            id: row.id,
            external_id: row.externalId,
            name: row.name,
            description: row.description ?? null,
            created_at: row.createdAt,
            updated_at: row.updatedAt,
        };
    }
    static from_raw_row(row) {
        return {
            id: Number(row['id']),
            external_id: String(row['external_id']),
            name: String(row['name']),
            description: row['description'] === null || row['description'] === undefined
                ? null
                : String(row['description']),
            created_at: new Date(String(row['created_at'])),
            updated_at: new Date(String(row['updated_at'])),
        };
    }
}
exports.RoleMapper = RoleMapper;


/***/ },

/***/ "./apps/transversal-ms/src/infrastructure/database/mappers/status.mapper.ts"
/*!**********************************************************************************!*\
  !*** ./apps/transversal-ms/src/infrastructure/database/mappers/status.mapper.ts ***!
  \**********************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StatusMapper = void 0;
class StatusMapper {
    static to_domain(row) {
        return {
            id: row.id,
            external_id: row.externalId,
            entity_type: row.entityType,
            code: row.code,
            display_name: row.displayName,
            description: row.description ?? null,
            is_active: row.isActive,
            created_at: row.createdAt,
            updated_at: row.updatedAt,
        };
    }
    static from_raw_row(row) {
        return {
            id: Number(row['id']),
            external_id: String(row['external_id']),
            entity_type: String(row['entity_type']),
            code: String(row['code']),
            display_name: String(row['display_name']),
            description: row['description'] === null || row['description'] === undefined
                ? null
                : String(row['description']),
            is_active: Boolean(row['is_active']),
            created_at: new Date(String(row['created_at'])),
            updated_at: new Date(String(row['updated_at'])),
        };
    }
}
exports.StatusMapper = StatusMapper;


/***/ },

/***/ "./apps/transversal-ms/src/infrastructure/database/mappers/user.mapper.ts"
/*!********************************************************************************!*\
  !*** ./apps/transversal-ms/src/infrastructure/database/mappers/user.mapper.ts ***!
  \********************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserMapper = void 0;
const normalize_cognito_sub_1 = __webpack_require__(/*! @common/utils/normalize-cognito-sub */ "./apps/transversal-ms/src/common/utils/normalize-cognito-sub.ts");
const user_models_1 = __webpack_require__(/*! @modules/users/domain/models/user.models */ "./apps/transversal-ms/src/modules/users/domain/models/user.models.ts");
class UserMapper {
    static to_domain(row) {
        return new user_models_1.User(row.id, row.externalId, (0, normalize_cognito_sub_1.normalize_cognito_sub)(row.cognitoSub), row.email, row.roleId ?? null, row.state, row.parent_id ?? null, row.hierarchyPath, row.personId ?? null, row.lastLoginAt ?? null, row.createdAt, row.updatedAt);
    }
    static from_raw_row(row) {
        const parent_raw = row['parent_id'];
        const person_raw = row['person_id'];
        const hierarchy_path = row['hierarchy_path'];
        return new user_models_1.User(Number(row['id']), String(row['external_id']), (0, normalize_cognito_sub_1.normalize_cognito_sub)(String(row['cognito_sub'])), String(row['email']), row['role_id'] === null || row['role_id'] === undefined
            ? null
            : Number(row['role_id']), row['state'] ?? 'active', parent_raw === null || parent_raw === undefined
            ? null
            : Number(parent_raw), typeof hierarchy_path === 'string' ? hierarchy_path : String(hierarchy_path ?? ''), person_raw === null || person_raw === undefined
            ? null
            : Number(person_raw), row['last_login_at'] === null || row['last_login_at'] === undefined
            ? null
            : new Date(String(row['last_login_at'])), new Date(String(row['created_at'])), new Date(String(row['updated_at'])));
    }
}
exports.UserMapper = UserMapper;


/***/ },

/***/ "./apps/transversal-ms/src/infrastructure/database/readers/typeorm-partner-link.reader.ts"
/*!************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/infrastructure/database/readers/typeorm-partner-link.reader.ts ***!
  \************************************************************************************************/
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
exports.TypeormPartnerLinkReader = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
let TypeormPartnerLinkReader = class TypeormPartnerLinkReader {
    data_source;
    constructor(data_source) {
        this.data_source = data_source;
    }
    async find_by_user_internal_id(user_internal_id) {
        const rows = (await this.data_source.query(`SELECT sr.partner_id, sr.external_id AS sales_rep_external_id, p.external_id AS partner_external_id
       FROM suppliers_schema.sales_representatives sr
       LEFT JOIN suppliers_schema.partners p ON p.id = sr.partner_id
       WHERE sr.user_id = $1
       LIMIT 1`, [user_internal_id]));
        if (rows.length === 0)
            return null;
        const row = rows[0];
        return {
            partnerId: String(row.partner_id),
            partnerExternalId: row.partner_external_id != null ? String(row.partner_external_id) : null,
            salesRepresentativeExternalId: String(row.sales_rep_external_id),
        };
    }
};
exports.TypeormPartnerLinkReader = TypeormPartnerLinkReader;
exports.TypeormPartnerLinkReader = TypeormPartnerLinkReader = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _a : Object])
], TypeormPartnerLinkReader);


/***/ },

/***/ "./apps/transversal-ms/src/infrastructure/database/readers/typeorm-permission-codes-by-role.reader.ts"
/*!************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/infrastructure/database/readers/typeorm-permission-codes-by-role.reader.ts ***!
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TypeormPermissionCodesByRoleReader = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
let TypeormPermissionCodesByRoleReader = class TypeormPermissionCodesByRoleReader {
    data_source;
    constructor(data_source) {
        this.data_source = data_source;
    }
    async list_codes_for_role_internal_id(role_internal_id) {
        const rows = (await this.data_source.query(`SELECT p.code AS code
       FROM transversal_schema.permissions p
       INNER JOIN transversal_schema.role_permissions rp ON rp.permission_id = p.id
       WHERE rp.role_id = $1
       ORDER BY p.code ASC`, [role_internal_id]));
        return rows.map((r) => r.code);
    }
};
exports.TypeormPermissionCodesByRoleReader = TypeormPermissionCodesByRoleReader;
exports.TypeormPermissionCodesByRoleReader = TypeormPermissionCodesByRoleReader = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _a : Object])
], TypeormPermissionCodesByRoleReader);


/***/ },

/***/ "./apps/transversal-ms/src/infrastructure/database/repositories/typeorm-city.repository.ts"
/*!*************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/infrastructure/database/repositories/typeorm-city.repository.ts ***!
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
exports.TypeormCityRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const transversal_data_1 = __webpack_require__(/*! @app/transversal-data */ "./libs/transversal-data/src/index.ts");
const city_mapper_1 = __webpack_require__(/*! @infrastructure/database/mappers/city.mapper */ "./apps/transversal-ms/src/infrastructure/database/mappers/city.mapper.ts");
const CITY_ROW_SQL = `c.id, c.external_id, c.country_name, c.country_code, c.state_name, c.state_code,
  c.city_name, c.currency_id, cur.external_id::text AS currency_external_id, c.created_at, c.updated_at`;
const CITY_FROM = `transversal_schema.cities c
  INNER JOIN transversal_schema.currencies cur ON cur.id = c.currency_id`;
let TypeormCityRepository = class TypeormCityRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    build_where(params, values) {
        const parts = [];
        let i = values.length + 1;
        if (params.country_code !== undefined && params.country_code !== '') {
            parts.push(`c.country_code = $${i}`);
            values.push(params.country_code);
            i += 1;
        }
        if (params.state_name !== undefined && params.state_name !== '') {
            parts.push(`c.state_name = $${i}`);
            values.push(params.state_name);
            i += 1;
        }
        if (params.city_name_contains !== undefined &&
            params.city_name_contains !== '') {
            parts.push(`LOWER(c.city_name) LIKE LOWER($${i})`);
            values.push(`%${params.city_name_contains}%`);
            i += 1;
        }
        return {
            clause: parts.length ? `WHERE ${parts.join(' AND ')}` : '',
            next_idx: i,
        };
    }
    async find_by_external_id(external_id) {
        const rows = (await this.repo.query(`SELECT ${CITY_ROW_SQL} FROM ${CITY_FROM} WHERE c.external_id = $1::uuid LIMIT 1`, [external_id]));
        if (!rows?.length) {
            return null;
        }
        return city_mapper_1.CityMapper.from_raw_row(rows[0]);
    }
    async find_by_internal_id(internal_id) {
        const rows = (await this.repo.query(`SELECT ${CITY_ROW_SQL} FROM ${CITY_FROM} WHERE c.id = $1 LIMIT 1`, [internal_id]));
        if (!rows?.length) {
            return null;
        }
        return city_mapper_1.CityMapper.from_raw_row(rows[0]);
    }
    async list(params) {
        const count_values = [];
        const { clause } = this.build_where(params, count_values);
        const count_rows = (await this.repo.query(`SELECT COUNT(*)::int AS n FROM transversal_schema.cities c ${clause}`, count_values));
        const total = count_rows[0]?.n ?? 0;
        const list_values = [];
        const { clause: list_clause, next_idx } = this.build_where(params, list_values);
        const unpaged = params.page === undefined && params.limit === undefined;
        let rows;
        if (unpaged) {
            rows = (await this.repo.query(`SELECT ${CITY_ROW_SQL} FROM ${CITY_FROM} ${list_clause}
         ORDER BY c.id ASC`, list_values));
        }
        else {
            const page = params.page ?? 1;
            const limit = params.limit ?? 20;
            const offset = (page - 1) * limit;
            list_values.push(limit, offset);
            rows = (await this.repo.query(`SELECT ${CITY_ROW_SQL} FROM ${CITY_FROM} ${list_clause}
         ORDER BY c.id ASC LIMIT $${next_idx} OFFSET $${next_idx + 1}`, list_values));
        }
        return {
            items: rows.map((r) => city_mapper_1.CityMapper.from_raw_row(r)),
            total,
        };
    }
    async list_distinct_countries(params) {
        const values = [];
        let where = '';
        const q = params.country_name_contains?.trim();
        if (q) {
            where = `WHERE LOWER(c.country_name) LIKE LOWER($1)`;
            values.push(`%${q}%`);
        }
        const rows = (await this.repo.query(`SELECT DISTINCT c.country_name, c.country_code
       FROM transversal_schema.cities c
       ${where}
       ORDER BY c.country_name ASC, c.country_code ASC`, values));
        return rows.map((r) => ({
            country_name: r.country_name,
            country_code: r.country_code,
        }));
    }
    async create(props) {
        const rows = (await this.repo.query(`INSERT INTO transversal_schema.cities (
        country_name, country_code, state_name, state_code, city_name, currency_id
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id`, [
            props.country_name,
            props.country_code,
            props.state_name,
            props.state_code,
            props.city_name,
            props.currency_id,
        ]));
        const id = rows[0]?.id;
        if (id === undefined) {
            throw new Error('city insert failed');
        }
        const loaded = await this.find_by_internal_id(id);
        if (!loaded) {
            throw new Error('city load after insert failed');
        }
        return loaded;
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
        if (patch.country_name !== undefined) {
            add('country_name', patch.country_name);
        }
        if (patch.country_code !== undefined) {
            add('country_code', patch.country_code);
        }
        if (patch.state_name !== undefined) {
            add('state_name', patch.state_name);
        }
        if (patch.state_code !== undefined) {
            add('state_code', patch.state_code);
        }
        if (patch.city_name !== undefined) {
            add('city_name', patch.city_name);
        }
        if (patch.currency_id !== undefined) {
            add('currency_id', patch.currency_id);
        }
        if (columns.length === 0) {
            return this.find_by_external_id(external_id);
        }
        columns.push(`"updated_at" = now()`);
        values.push(external_id);
        await this.repo.query(`UPDATE transversal_schema.cities SET ${columns.join(', ')} WHERE external_id = $${i}::uuid`, values);
        return this.find_by_external_id(external_id);
    }
    async delete_by_external_id(external_id) {
        const rows = (await this.repo.query(`DELETE FROM transversal_schema.cities c
       WHERE c.external_id = $1::uuid
       AND NOT EXISTS (SELECT 1 FROM transversal_schema.persons p WHERE p.city_id = c.id)
       AND NOT EXISTS (SELECT 1 FROM transversal_schema.businesses b WHERE b.city_id = c.id)
       RETURNING c.id`, [external_id]));
        return rows.length > 0;
    }
};
exports.TypeormCityRepository = TypeormCityRepository;
exports.TypeormCityRepository = TypeormCityRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transversal_data_1.CityEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], TypeormCityRepository);


/***/ },

/***/ "./apps/transversal-ms/src/infrastructure/database/repositories/typeorm-currency-read.repository.ts"
/*!**********************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/infrastructure/database/repositories/typeorm-currency-read.repository.ts ***!
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TypeormCurrencyReadRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const transversal_data_1 = __webpack_require__(/*! @app/transversal-data */ "./libs/transversal-data/src/index.ts");
const CURRENCY_ID_SELECT = { id: true };
const CURRENCY_EXT_SELECT = { externalId: true };
let TypeormCurrencyReadRepository = class TypeormCurrencyReadRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async find_internal_id_by_external_id(external_id) {
        const row = await this.repo.findOne({
            where: { externalId: external_id },
            select: CURRENCY_ID_SELECT,
        });
        return row?.id ?? null;
    }
    async find_external_id_by_internal_id(internal_id) {
        const row = await this.repo.findOne({
            where: { id: internal_id },
            select: CURRENCY_EXT_SELECT,
        });
        return row?.externalId ?? null;
    }
};
exports.TypeormCurrencyReadRepository = TypeormCurrencyReadRepository;
exports.TypeormCurrencyReadRepository = TypeormCurrencyReadRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transversal_data_1.CurrencyEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], TypeormCurrencyReadRepository);


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
let TypeormPersonRepository = class TypeormPersonRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async find_by_external_id(external_id) {
        const row = await this.repo.findOne({
            where: { externalId: external_id },
        });
        return row ? person_mapper_1.PersonMapper.to_domain(row) : null;
    }
    async find_by_internal_id(internal_id) {
        const row = await this.repo.findOne({
            where: { id: internal_id },
        });
        return row ? person_mapper_1.PersonMapper.to_domain(row) : null;
    }
    async find_by_doc_number(doc_number) {
        const row = await this.repo.findOne({
            where: { docNumber: doc_number },
        });
        return row ? person_mapper_1.PersonMapper.to_domain(row) : null;
    }
    async find_all() {
        const rows = await this.repo.find({
            order: { id: 'ASC' },
        });
        return rows.map((r) => person_mapper_1.PersonMapper.to_domain(r));
    }
    async create(props) {
        const rows = await this.repo.query(`INSERT INTO transversal_schema.persons (
        external_id, first_name, last_name, doc_type, doc_number,
        doc_issue_date, birth_date, gender, phone, residential_address, city_id
      ) VALUES (
        gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
      )
      RETURNING id, external_id, created_at, updated_at, first_name, last_name,
        doc_type, doc_number, doc_issue_date, birth_date, gender, phone, residential_address,
        city_id`, [
            props.first_name,
            props.last_name,
            props.doc_type,
            props.doc_number,
            props.doc_issue_date,
            props.birth_date,
            props.gender,
            props.phone,
            props.residential_address,
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

/***/ "./apps/transversal-ms/src/infrastructure/database/repositories/typeorm-role.repository.ts"
/*!*************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/infrastructure/database/repositories/typeorm-role.repository.ts ***!
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
exports.TypeormRoleRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const transversal_data_1 = __webpack_require__(/*! @app/transversal-data */ "./libs/transversal-data/src/index.ts");
const role_mapper_1 = __webpack_require__(/*! @infrastructure/database/mappers/role.mapper */ "./apps/transversal-ms/src/infrastructure/database/mappers/role.mapper.ts");
const ROLE_SELECT = {
    id: true,
    externalId: true,
    name: true,
    description: true,
    createdAt: true,
    updatedAt: true,
};
let TypeormRoleRepository = class TypeormRoleRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async find_by_external_id(external_id) {
        const row = await this.repo.findOne({
            where: { externalId: external_id },
            select: ROLE_SELECT,
        });
        return row ? role_mapper_1.RoleMapper.to_domain(row) : null;
    }
    async find_by_name(name) {
        const row = await this.repo.findOne({
            where: { name: name },
            select: ROLE_SELECT,
        });
        return row ? role_mapper_1.RoleMapper.to_domain(row) : null;
    }
    async find_by_internal_id(internal_id) {
        const row = await this.repo.findOne({
            where: { id: internal_id },
            select: ROLE_SELECT,
        });
        return row ? role_mapper_1.RoleMapper.to_domain(row) : null;
    }
    async list(params) {
        const qb = this.repo.createQueryBuilder('r').select([
            'r.id',
            'r.externalId',
            'r.name',
            'r.description',
            'r.createdAt',
            'r.updatedAt',
        ]);
        if (params.name_contains !== undefined && params.name_contains !== '') {
            qb.andWhere('LOWER(r.name) LIKE LOWER(:n)', {
                n: `%${params.name_contains}%`,
            });
        }
        const total = await qb.clone().getCount();
        const skip = (params.page - 1) * params.limit;
        const rows = await qb
            .orderBy('r.id', 'ASC')
            .skip(skip)
            .take(params.limit)
            .getMany();
        return {
            items: rows.map((x) => role_mapper_1.RoleMapper.to_domain(x)),
            total,
        };
    }
    async create(props) {
        const rows = (await this.repo.query(`INSERT INTO transversal_schema.roles (name, description)
       VALUES ($1, $2)
       RETURNING id, external_id, name, description, created_at, updated_at`, [props.name, props.description]));
        return role_mapper_1.RoleMapper.from_raw_row(rows[0]);
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
        if (patch.name !== undefined) {
            add('name', patch.name);
        }
        if (patch.description !== undefined) {
            add('description', patch.description);
        }
        if (columns.length === 0) {
            return this.find_by_external_id(external_id);
        }
        columns.push(`"updated_at" = now()`);
        values.push(external_id);
        const rows = (await this.repo.query(`UPDATE transversal_schema.roles SET ${columns.join(', ')}
       WHERE external_id = $${i}::uuid
       RETURNING id, external_id, name, description, created_at, updated_at`, values));
        if (!rows?.length) {
            return null;
        }
        return role_mapper_1.RoleMapper.from_raw_row(rows[0]);
    }
    async delete_by_external_id(external_id) {
        const rows = (await this.repo.query(`DELETE FROM transversal_schema.roles r
       WHERE r.external_id = $1::uuid
       AND NOT EXISTS (
         SELECT 1 FROM transversal_schema.users u WHERE u.role_id = r.id
       )
       RETURNING r.id`, [external_id]));
        return rows.length > 0;
    }
};
exports.TypeormRoleRepository = TypeormRoleRepository;
exports.TypeormRoleRepository = TypeormRoleRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transversal_data_1.RoleEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], TypeormRoleRepository);


/***/ },

/***/ "./apps/transversal-ms/src/infrastructure/database/repositories/typeorm-status.repository.ts"
/*!***************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/infrastructure/database/repositories/typeorm-status.repository.ts ***!
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
exports.TypeormStatusRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const transversal_data_1 = __webpack_require__(/*! @app/transversal-data */ "./libs/transversal-data/src/index.ts");
const status_mapper_1 = __webpack_require__(/*! @infrastructure/database/mappers/status.mapper */ "./apps/transversal-ms/src/infrastructure/database/mappers/status.mapper.ts");
const STATUS_SELECT = {
    id: true,
    externalId: true,
    entityType: true,
    code: true,
    displayName: true,
    description: true,
    isActive: true,
    createdAt: true,
    updatedAt: true,
};
const STATUS_RETURNING = `id, external_id, entity_type, code, display_name, description, is_active, created_at, updated_at`;
let TypeormStatusRepository = class TypeormStatusRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async find_by_external_id(external_id) {
        const row = await this.repo.findOne({
            where: { externalId: external_id },
            select: STATUS_SELECT,
        });
        return row ? status_mapper_1.StatusMapper.to_domain(row) : null;
    }
    async find_by_entity_type_and_code(entity_type, code) {
        const row = await this.repo.findOne({
            where: { entityType: entity_type, code },
            select: STATUS_SELECT,
        });
        return row ? status_mapper_1.StatusMapper.to_domain(row) : null;
    }
    async find_by_internal_id(internal_id) {
        const row = await this.repo.findOne({
            where: { id: internal_id },
            select: STATUS_SELECT,
        });
        return row ? status_mapper_1.StatusMapper.to_domain(row) : null;
    }
    async list(params) {
        const qb = this.repo.createQueryBuilder('s').select([
            's.id',
            's.externalId',
            's.entityType',
            's.code',
            's.displayName',
            's.description',
            's.isActive',
            's.createdAt',
            's.updatedAt',
        ]);
        if (params.entity_type !== undefined && params.entity_type !== '') {
            qb.andWhere('s.entityType = :et', { et: params.entity_type });
        }
        if (params.code_contains !== undefined && params.code_contains !== '') {
            qb.andWhere('LOWER(s.code) LIKE LOWER(:cc)', {
                cc: `%${params.code_contains}%`,
            });
        }
        if (params.display_name_contains !== undefined &&
            params.display_name_contains !== '') {
            qb.andWhere('LOWER(s.displayName) LIKE LOWER(:dn)', {
                dn: `%${params.display_name_contains}%`,
            });
        }
        if (params.is_active !== undefined) {
            qb.andWhere('s.isActive = :ia', { ia: params.is_active });
        }
        const total = await qb.clone().getCount();
        const unpaged = params.page === undefined && params.limit === undefined;
        const qb_page = qb.orderBy('s.id', 'ASC');
        if (!unpaged) {
            const page = params.page ?? 1;
            const limit = params.limit ?? 20;
            qb_page.skip((page - 1) * limit).take(limit);
        }
        const rows = await qb_page.getMany();
        return {
            items: rows.map((x) => status_mapper_1.StatusMapper.to_domain(x)),
            total,
        };
    }
    async create(props) {
        const rows = (await this.repo.query(`INSERT INTO transversal_schema.catalog_status_types (
        entity_type, code, display_name, description, is_active, external_id
      ) VALUES ($1, $2, $3, $4, $5, gen_random_uuid())
      RETURNING ${STATUS_RETURNING}`, [
            props.entity_type,
            props.code,
            props.display_name,
            props.description,
            props.is_active,
        ]));
        return status_mapper_1.StatusMapper.from_raw_row(rows[0]);
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
        if (patch.entity_type !== undefined) {
            add('entity_type', patch.entity_type);
        }
        if (patch.code !== undefined) {
            add('code', patch.code);
        }
        if (patch.display_name !== undefined) {
            add('display_name', patch.display_name);
        }
        if (patch.description !== undefined) {
            add('description', patch.description);
        }
        if (patch.is_active !== undefined) {
            add('is_active', patch.is_active);
        }
        if (columns.length === 0) {
            return this.find_by_external_id(external_id);
        }
        columns.push(`"updated_at" = now()`);
        values.push(external_id);
        const rows = (await this.repo.query(`UPDATE transversal_schema.catalog_status_types SET ${columns.join(', ')}
       WHERE external_id = $${i}::uuid
       RETURNING ${STATUS_RETURNING}`, values));
        if (!rows?.length) {
            return null;
        }
        return status_mapper_1.StatusMapper.from_raw_row(rows[0]);
    }
    async delete_by_external_id(external_id) {
        const rows = (await this.repo.query(`DELETE FROM transversal_schema.catalog_status_types s
       WHERE s.external_id = $1::uuid
       AND NOT EXISTS (SELECT 1 FROM transversal_schema.users u WHERE u.status_id = s.id)
       AND NOT EXISTS (SELECT 1 FROM transversal_schema.contract_signers cs WHERE cs.status_id = s.id)
       AND NOT EXISTS (SELECT 1 FROM suppliers_schema.partners p WHERE p.status_id = s.id)
       AND NOT EXISTS (
         SELECT 1 FROM suppliers_schema.credit_applications_bnpl ca
         WHERE ca.status_id = s.id OR ca.business_relation_id = s.id
       )
       AND NOT EXISTS (SELECT 1 FROM products_schema.credit_facilities cf WHERE cf.status_id = s.id)
       AND NOT EXISTS (
         SELECT 1 FROM products_schema.credit_applications ca
         WHERE s.entity_type = 'credit_applications'
           AND ca.status::text = s.code
       )
       AND NOT EXISTS (SELECT 1 FROM products_schema.categories c WHERE c.status_id = s.id)
       RETURNING s.id`, [external_id]));
        return rows.length > 0;
    }
};
exports.TypeormStatusRepository = TypeormStatusRepository;
exports.TypeormStatusRepository = TypeormStatusRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transversal_data_1.StatusEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], TypeormStatusRepository);


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
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
const user_mapper_1 = __webpack_require__(/*! @infrastructure/database/mappers/user.mapper */ "./apps/transversal-ms/src/infrastructure/database/mappers/user.mapper.ts");
const normalize_cognito_sub_1 = __webpack_require__(/*! @common/utils/normalize-cognito-sub */ "./apps/transversal-ms/src/common/utils/normalize-cognito-sub.ts");
const BACK_OFFICE_UNRESTRICTED = new Set([
    shared_1.Roles.BACK_OFFICE_ADMIN,
    shared_1.Roles.BACK_OFFICE_ANALYST,
]);
let TypeormUserRepository = class TypeormUserRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async find_by_external_id(external_id) {
        const row = await this.repo.findOne({
            where: { externalId: external_id },
        });
        return row ? user_mapper_1.UserMapper.to_domain(row) : null;
    }
    async find_by_email(email) {
        const row = await this.repo.findOne({
            where: { email: email.trim().toLowerCase() },
        });
        return row ? user_mapper_1.UserMapper.to_domain(row) : null;
    }
    async find_by_cognito_sub(cognito_sub) {
        const normalized = (0, normalize_cognito_sub_1.normalize_cognito_sub)(cognito_sub);
        const row = await this.repo.findOne({
            where: { cognitoSub: normalized },
        });
        return row ? user_mapper_1.UserMapper.to_domain(row) : null;
    }
    async find_external_id_by_internal_id(internal_id) {
        const row = await this.repo.findOne({
            where: { id: internal_id },
            select: { externalId: true },
        });
        return row?.externalId ?? null;
    }
    async find_internal_id_by_external_id(external_id) {
        const row = await this.repo.findOne({
            where: { externalId: external_id },
            select: { id: true },
        });
        return row?.id ?? null;
    }
    async find_all() {
        const rows = await this.repo.find({
            order: { id: 'ASC' },
        });
        return rows.map((r) => user_mapper_1.UserMapper.to_domain(r));
    }
    async find_all_where_internal_id_in(internal_ids) {
        if (internal_ids.length === 0) {
            return [];
        }
        const rows = await this.repo.find({
            where: { id: (0, typeorm_2.In)([...internal_ids]) },
            order: { id: 'ASC' },
        });
        return rows.map((r) => user_mapper_1.UserMapper.to_domain(r));
    }
    async find_descendant_internal_ids_under(internal_id) {
        const rows = (await this.repo.query(`SELECT u.id
       FROM transversal_schema.users u
       INNER JOIN transversal_schema.users a ON a.id = $1
       WHERE u.id <> a.id
         AND u.hierarchy_path LIKE a.hierarchy_path || '%'
       ORDER BY u.id ASC`, [internal_id]));
        return rows.map((r) => Number(r.id));
    }
    async find_subtree_internal_ids_under(internal_id) {
        const rows = (await this.repo.query(`SELECT u.id
       FROM transversal_schema.users u
       INNER JOIN transversal_schema.users a ON a.id = $1
       WHERE u.hierarchy_path LIKE a.hierarchy_path || '%'
       ORDER BY u.id ASC`, [internal_id]));
        return rows.map((r) => Number(r.id));
    }
    async resolve_visible_internal_user_ids_for_role(actor_internal_id, role_code) {
        if (BACK_OFFICE_UNRESTRICTED.has(role_code)) {
            return { kind: 'unrestricted' };
        }
        const ids = await this.find_subtree_internal_ids_under(actor_internal_id);
        return { kind: 'subset', internal_user_ids: ids };
    }
    async create(props) {
        const parent_id = props.parent_id === undefined ? null : props.parent_id;
        const person_id = props.person_id === undefined ? null : props.person_id;
        const rows = await this.repo.query(`INSERT INTO transversal_schema.users (
        external_id, cognito_sub, email, role_id, state, last_login_at, parent_id, person_id
      ) VALUES (
        gen_random_uuid(), $1, $2, $3, $4::"transversal_schema"."user_state", $5, $6, $7
      )
      RETURNING id, external_id, created_at, updated_at, cognito_sub, email, role_id, state, last_login_at, parent_id, person_id, hierarchy_path`, [
            (0, normalize_cognito_sub_1.normalize_cognito_sub)(props.cognito_sub),
            props.email,
            props.role_id,
            props.state,
            props.last_login_at,
            parent_id,
            person_id,
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
            add('cognito_sub', (0, normalize_cognito_sub_1.normalize_cognito_sub)(patch.cognito_sub));
        }
        if (patch.email !== undefined) {
            add('email', patch.email);
        }
        if (patch.role_id !== undefined) {
            add('role_id', patch.role_id);
        }
        if (patch.state !== undefined) {
            add('state', patch.state);
        }
        if (patch.last_login_at !== undefined) {
            add('last_login_at', patch.last_login_at);
        }
        if (patch.parent_id !== undefined) {
            add('parent_id', patch.parent_id);
        }
        if (patch.person_id !== undefined) {
            add('person_id', patch.person_id);
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
const typeorm_partner_create_user_sqs_idempotency_adapter_1 = __webpack_require__(/*! @infrastructure/database/adapters/typeorm-partner-create-user-sqs-idempotency.adapter */ "./apps/transversal-ms/src/infrastructure/database/adapters/typeorm-partner-create-user-sqs-idempotency.adapter.ts");
const typeorm_upload_files_idempotency_adapter_1 = __webpack_require__(/*! @infrastructure/database/adapters/typeorm-upload-files-idempotency.adapter */ "./apps/transversal-ms/src/infrastructure/database/adapters/typeorm-upload-files-idempotency.adapter.ts");
const transversal_tokens_1 = __webpack_require__(/*! @modules/transversal/transversal.tokens */ "./apps/transversal-ms/src/modules/transversal/transversal.tokens.ts");
const typeorm_person_repository_1 = __webpack_require__(/*! @infrastructure/database/repositories/typeorm-person.repository */ "./apps/transversal-ms/src/infrastructure/database/repositories/typeorm-person.repository.ts");
const typeorm_user_repository_1 = __webpack_require__(/*! @infrastructure/database/repositories/typeorm-user.repository */ "./apps/transversal-ms/src/infrastructure/database/repositories/typeorm-user.repository.ts");
const typeorm_role_repository_1 = __webpack_require__(/*! @infrastructure/database/repositories/typeorm-role.repository */ "./apps/transversal-ms/src/infrastructure/database/repositories/typeorm-role.repository.ts");
const typeorm_city_repository_1 = __webpack_require__(/*! @infrastructure/database/repositories/typeorm-city.repository */ "./apps/transversal-ms/src/infrastructure/database/repositories/typeorm-city.repository.ts");
const typeorm_status_repository_1 = __webpack_require__(/*! @infrastructure/database/repositories/typeorm-status.repository */ "./apps/transversal-ms/src/infrastructure/database/repositories/typeorm-status.repository.ts");
const typeorm_currency_read_repository_1 = __webpack_require__(/*! @infrastructure/database/repositories/typeorm-currency-read.repository */ "./apps/transversal-ms/src/infrastructure/database/repositories/typeorm-currency-read.repository.ts");
const typeorm_partner_link_reader_1 = __webpack_require__(/*! @infrastructure/database/readers/typeorm-partner-link.reader */ "./apps/transversal-ms/src/infrastructure/database/readers/typeorm-partner-link.reader.ts");
const persons_tokens_1 = __webpack_require__(/*! @modules/persons/persons.tokens */ "./apps/transversal-ms/src/modules/persons/persons.tokens.ts");
const users_tokens_1 = __webpack_require__(/*! @modules/users/users.tokens */ "./apps/transversal-ms/src/modules/users/users.tokens.ts");
const transversal_tokens_2 = __webpack_require__(/*! @modules/transversal/transversal.tokens */ "./apps/transversal-ms/src/modules/transversal/transversal.tokens.ts");
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
            typeorm_partner_create_user_sqs_idempotency_adapter_1.TypeormPartnerCreateUserSqsIdempotencyAdapter,
            {
                provide: transversal_tokens_1.UPLOAD_FILES_IDEMPOTENCY_PORT,
                useExisting: typeorm_upload_files_idempotency_adapter_1.TypeormUploadFilesIdempotencyAdapter,
            },
            {
                provide: transversal_tokens_1.PARTNER_CREATE_USER_SQS_IDEMPOTENCY_PORT,
                useExisting: typeorm_partner_create_user_sqs_idempotency_adapter_1.TypeormPartnerCreateUserSqsIdempotencyAdapter,
            },
            {
                provide: persons_tokens_1.PERSON_REPOSITORY,
                useClass: typeorm_person_repository_1.TypeormPersonRepository,
            },
            {
                provide: users_tokens_1.USER_REPOSITORY,
                useClass: typeorm_user_repository_1.TypeormUserRepository,
            },
            {
                provide: transversal_tokens_2.ROLE_REPOSITORY,
                useClass: typeorm_role_repository_1.TypeormRoleRepository,
            },
            {
                provide: transversal_tokens_2.CITY_REPOSITORY,
                useClass: typeorm_city_repository_1.TypeormCityRepository,
            },
            {
                provide: transversal_tokens_2.STATUS_REPOSITORY,
                useClass: typeorm_status_repository_1.TypeormStatusRepository,
            },
            {
                provide: transversal_tokens_2.CURRENCY_READ_PORT,
                useClass: typeorm_currency_read_repository_1.TypeormCurrencyReadRepository,
            },
            typeorm_partner_link_reader_1.TypeormPartnerLinkReader,
            {
                provide: users_tokens_1.PARTNER_LINK_READER,
                useExisting: typeorm_partner_link_reader_1.TypeormPartnerLinkReader,
            },
        ],
        exports: [
            transversal_data_1.TransversalDataModule,
            transversal_tokens_1.UPLOAD_FILES_IDEMPOTENCY_PORT,
            transversal_tokens_1.PARTNER_CREATE_USER_SQS_IDEMPOTENCY_PORT,
            persons_tokens_1.PERSON_REPOSITORY,
            users_tokens_1.USER_REPOSITORY,
            transversal_tokens_2.ROLE_REPOSITORY,
            transversal_tokens_2.CITY_REPOSITORY,
            transversal_tokens_2.STATUS_REPOSITORY,
            transversal_tokens_2.CURRENCY_READ_PORT,
            users_tokens_1.PARTNER_LINK_READER,
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

/***/ "./apps/transversal-ms/src/infrastructure/messaging/sqs/adapters/config-transversal-files-uploaded-publish-queue-url.adapter.ts"
/*!**************************************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/infrastructure/messaging/sqs/adapters/config-transversal-files-uploaded-publish-queue-url.adapter.ts ***!
  \**************************************************************************************************************************************/
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
exports.ConfigTransversalFilesUploadedPublishQueueUrlAdapter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
let ConfigTransversalFilesUploadedPublishQueueUrlAdapter = class ConfigTransversalFilesUploadedPublishQueueUrlAdapter {
    queues_config;
    constructor(queues_config) {
        this.queues_config = queues_config;
    }
    get_publish_queue_url() {
        const trim = (v) => {
            if (v === undefined) {
                return undefined;
            }
            const t = v.trim();
            return t.length > 0 ? t : undefined;
        };
        const url = trim(this.queues_config.suppliers_callback_queue_url) ??
            trim(this.queues_config.inbound_queue_url) ??
            this.queues_config.outbound_queue_url.trim();
        return url;
    }
};
exports.ConfigTransversalFilesUploadedPublishQueueUrlAdapter = ConfigTransversalFilesUploadedPublishQueueUrlAdapter;
exports.ConfigTransversalFilesUploadedPublishQueueUrlAdapter = ConfigTransversalFilesUploadedPublishQueueUrlAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(shared_1.QUEUES_CONFIG)),
    __metadata("design:paramtypes", [Object])
], ConfigTransversalFilesUploadedPublishQueueUrlAdapter);


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

/***/ "./apps/transversal-ms/src/infrastructure/messaging/sqs/consumers/create-partner-user.consumer.ts"
/*!********************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/infrastructure/messaging/sqs/consumers/create-partner-user.consumer.ts ***!
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
var CreatePartnerUserSqsConsumer_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePartnerUserSqsConsumer = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const ingest_partner_create_user_sqs_message_use_case_1 = __webpack_require__(/*! @modules/users/application/use-cases/partner-create-user/ingest-partner-create-user-sqs-message.use-case */ "./apps/transversal-ms/src/modules/users/application/use-cases/partner-create-user/ingest-partner-create-user-sqs-message.use-case.ts");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
let CreatePartnerUserSqsConsumer = CreatePartnerUserSqsConsumer_1 = class CreatePartnerUserSqsConsumer extends shared_1.BaseConsumer {
    queues_config;
    config_service;
    ingest;
    nest_logger = new common_1.Logger(CreatePartnerUserSqsConsumer_1.name);
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
        return this.queues_config.create_partner_user_queue_url;
    }
    get_poll_settings() {
        return {
            wait_time_seconds: this.config_service.getOrThrow('sqs.wait_time_seconds'),
            max_number_of_messages: this.config_service.getOrThrow('sqs.max_number_of_messages'),
            visibility_timeout_seconds: this.config_service.getOrThrow('sqs.visibility_timeout_seconds'),
        };
    }
    inactive_reason_message() {
        return 'Cola create-partner-user SQS no configurada (TRANSVERSAL_SQS_CREATE_USER_QUEUE_URL); worker inactivo. Configure DLQ y maxReceiveCount en la cola.';
    }
    async handle(message) {
        const delete_on_validation_error = this.config_service.get('sqs.delete_on_validation_error') ?? false;
        this.nest_logger.log(`[CreatePartnerUser][step=consumer_handle][messageId=${message.message_id ?? 'n/a'}]`);
        return this.ingest.execute({
            body: message.body,
            delete_on_validation_error,
        });
    }
};
exports.CreatePartnerUserSqsConsumer = CreatePartnerUserSqsConsumer;
exports.CreatePartnerUserSqsConsumer = CreatePartnerUserSqsConsumer = CreatePartnerUserSqsConsumer_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(shared_1.SQS_CLIENT)),
    __param(1, (0, common_1.Inject)(shared_1.QUEUES_CONFIG)),
    __metadata("design:paramtypes", [Object, Object, typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof ingest_partner_create_user_sqs_message_use_case_1.IngestPartnerCreateUserSqsMessageUseCase !== "undefined" && ingest_partner_create_user_sqs_message_use_case_1.IngestPartnerCreateUserSqsMessageUseCase) === "function" ? _b : Object])
], CreatePartnerUserSqsConsumer);


/***/ },

/***/ "./apps/transversal-ms/src/infrastructure/messaging/sqs/consumers/create-person-sqs.consumer.ts"
/*!******************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/infrastructure/messaging/sqs/consumers/create-person-sqs.consumer.ts ***!
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
var CreatePersonSqsConsumer_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePersonSqsConsumer = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const ingest_create_person_sqs_message_use_case_1 = __webpack_require__(/*! @modules/persons/application/use-cases/ingest-create-person-sqs/ingest-create-person-sqs-message.use-case */ "./apps/transversal-ms/src/modules/persons/application/use-cases/ingest-create-person-sqs/ingest-create-person-sqs-message.use-case.ts");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
let CreatePersonSqsConsumer = CreatePersonSqsConsumer_1 = class CreatePersonSqsConsumer extends shared_1.BaseConsumer {
    queues_config;
    config_service;
    ingest;
    nest_logger = new common_1.Logger(CreatePersonSqsConsumer_1.name);
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
        return this.queues_config.create_person_queue_url;
    }
    get_poll_settings() {
        return {
            wait_time_seconds: this.config_service.getOrThrow('sqs.wait_time_seconds'),
            max_number_of_messages: this.config_service.getOrThrow('sqs.max_number_of_messages'),
            visibility_timeout_seconds: this.config_service.getOrThrow('sqs.visibility_timeout_seconds'),
        };
    }
    inactive_reason_message() {
        return 'Cola create-person SQS no configurada (TRANSVERSAL_SQS_CREATE_PERSON_QUEUE_URL); worker inactivo.';
    }
    async handle(message) {
        const delete_on_validation_error = this.config_service.get('sqs.delete_on_validation_error') ?? false;
        this.nest_logger.log(`[CreatePerson][step=consumer_handle][messageId=${message.message_id ?? 'n/a'}]`);
        return this.ingest.execute({
            body: message.body,
            delete_on_validation_error,
        });
    }
};
exports.CreatePersonSqsConsumer = CreatePersonSqsConsumer;
exports.CreatePersonSqsConsumer = CreatePersonSqsConsumer = CreatePersonSqsConsumer_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(shared_1.SQS_CLIENT)),
    __param(1, (0, common_1.Inject)(shared_1.QUEUES_CONFIG)),
    __metadata("design:paramtypes", [Object, Object, typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof ingest_create_person_sqs_message_use_case_1.IngestCreatePersonSqsMessageUseCase !== "undefined" && ingest_create_person_sqs_message_use_case_1.IngestCreatePersonSqsMessageUseCase) === "function" ? _b : Object])
], CreatePersonSqsConsumer);


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
        const enabled = this.config_service.get('sqs.inbound_consumer_enabled') ?? false;
        if (!enabled) {
            return undefined;
        }
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
        return 'Consumer inbound inactivo: sin TRANSVERSAL_SQS_INBOUND_QUEUE_URL o TRANSVERSAL_SQS_INBOUND_CONSUMER_ENABLED=false (evita competir con suppliers-ms por files-uploaded).';
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
const ingest_upload_files_sqs_message_use_case_1 = __webpack_require__(/*! @modules/transversal/application/use-cases/upload-files/ingest-upload-files-sqs-message.use-case */ "./apps/transversal-ms/src/modules/transversal/application/use-cases/upload-files/ingest-upload-files-sqs-message.use-case.ts");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
let UploadFilesSqsConsumer = UploadFilesSqsConsumer_1 = class UploadFilesSqsConsumer extends shared_1.BaseConsumer {
    queues_config;
    config_service;
    ingest_upload_files;
    nest_logger = new common_1.Logger(UploadFilesSqsConsumer_1.name);
    constructor(sqs_client, queues_config, config_service, ingest_upload_files) {
        super(sqs_client, {
            log: (m) => this.nest_logger.log(m),
            warn: (m) => this.nest_logger.warn(m),
            error: (m) => this.nest_logger.error(m),
        });
        this.queues_config = queues_config;
        this.config_service = config_service;
        this.ingest_upload_files = ingest_upload_files;
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
const config_transversal_files_uploaded_publish_queue_url_adapter_1 = __webpack_require__(/*! ./adapters/config-transversal-files-uploaded-publish-queue-url.adapter */ "./apps/transversal-ms/src/infrastructure/messaging/sqs/adapters/config-transversal-files-uploaded-publish-queue-url.adapter.ts");
const transversal_inbound_sqs_consumer_1 = __webpack_require__(/*! ./consumers/transversal-inbound-sqs.consumer */ "./apps/transversal-ms/src/infrastructure/messaging/sqs/consumers/transversal-inbound-sqs.consumer.ts");
const upload_files_consumer_1 = __webpack_require__(/*! ./consumers/upload-files.consumer */ "./apps/transversal-ms/src/infrastructure/messaging/sqs/consumers/upload-files.consumer.ts");
const create_partner_user_consumer_1 = __webpack_require__(/*! ./consumers/create-partner-user.consumer */ "./apps/transversal-ms/src/infrastructure/messaging/sqs/consumers/create-partner-user.consumer.ts");
const create_person_sqs_consumer_1 = __webpack_require__(/*! ./consumers/create-person-sqs.consumer */ "./apps/transversal-ms/src/infrastructure/messaging/sqs/consumers/create-person-sqs.consumer.ts");
const messaging_application_module_1 = __webpack_require__(/*! @messaging/messaging-application.module */ "./apps/transversal-ms/src/modules/messaging/messaging-application.module.ts");
const transversal_module_1 = __webpack_require__(/*! @modules/transversal/transversal.module */ "./apps/transversal-ms/src/modules/transversal/transversal.module.ts");
const outbound_message_publisher_port_1 = __webpack_require__(/*! @messaging/domain/ports/outbound-message-publisher.port */ "./apps/transversal-ms/src/modules/messaging/domain/ports/outbound-message-publisher.port.ts");
const transversal_outbound_queue_url_port_1 = __webpack_require__(/*! @messaging/domain/ports/transversal-outbound-queue-url.port */ "./apps/transversal-ms/src/modules/messaging/domain/ports/transversal-outbound-queue-url.port.ts");
const transversal_files_uploaded_publish_queue_url_port_1 = __webpack_require__(/*! @messaging/domain/ports/transversal-files-uploaded-publish-queue-url.port */ "./apps/transversal-ms/src/modules/messaging/domain/ports/transversal-files-uploaded-publish-queue-url.port.ts");
let SqsModule = class SqsModule {
};
exports.SqsModule = SqsModule;
exports.SqsModule = SqsModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [config_1.ConfigModule, messaging_application_module_1.MessagingApplicationModule, transversal_module_1.TransversalModule],
        providers: [
            {
                provide: shared_1.QUEUES_CONFIG,
                useFactory: (config_service) => ({
                    outbound_queue_url: config_service.getOrThrow('sqs.outbound_queue_url'),
                    inbound_queue_url: config_service.get('sqs.inbound_queue_url'),
                    upload_files_queue_url: config_service.get('sqs.upload_files_queue_url'),
                    create_partner_user_queue_url: config_service.get('sqs.create_partner_user_queue_url'),
                    create_person_queue_url: config_service.get('sqs.create_person_queue_url'),
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
            create_partner_user_consumer_1.CreatePartnerUserSqsConsumer,
            create_person_sqs_consumer_1.CreatePersonSqsConsumer,
            {
                provide: outbound_message_publisher_port_1.OUTBOUND_MESSAGE_PUBLISHER_PORT,
                useExisting: sqs_message_publisher_adapter_1.SqsMessagePublisherAdapter,
            },
            config_outbound_transversal_queue_url_adapter_1.ConfigOutboundTransversalQueueUrlAdapter,
            config_transversal_files_uploaded_publish_queue_url_adapter_1.ConfigTransversalFilesUploadedPublishQueueUrlAdapter,
            {
                provide: transversal_outbound_queue_url_port_1.TRANSVERSAL_OUTBOUND_QUEUE_URL_PORT,
                useExisting: config_outbound_transversal_queue_url_adapter_1.ConfigOutboundTransversalQueueUrlAdapter,
            },
            {
                provide: transversal_files_uploaded_publish_queue_url_port_1.TRANSVERSAL_FILES_UPLOADED_PUBLISH_QUEUE_URL_PORT,
                useExisting: config_transversal_files_uploaded_publish_queue_url_adapter_1.ConfigTransversalFilesUploadedPublishQueueUrlAdapter,
            },
        ],
        exports: [
            shared_1.SQS_CLIENT,
            shared_1.QUEUES_CONFIG,
            outbound_message_publisher_port_1.OUTBOUND_MESSAGE_PUBLISHER_PORT,
            transversal_outbound_queue_url_port_1.TRANSVERSAL_OUTBOUND_QUEUE_URL_PORT,
            transversal_files_uploaded_publish_queue_url_port_1.TRANSVERSAL_FILES_UPLOADED_PUBLISH_QUEUE_URL_PORT,
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
    logger = new common_1.Logger(HttpRemoteFileFetchAdapter_1.name);
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
    config_service;
    logger = new common_1.Logger(S3Adapter_1.name);
    client;
    constructor(config_service) {
        this.config_service = config_service;
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

/***/ "./apps/transversal-ms/src/main.ts"
/*!*****************************************!*\
  !*** ./apps/transversal-ms/src/main.ts ***!
  \*****************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
__webpack_require__(/*! ./types/express-augmentation */ "./apps/transversal-ms/src/types/express-augmentation.ts");
__webpack_require__(/*! ./config/dotenv.config */ "./apps/transversal-ms/src/config/dotenv.config.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const helmet_1 = __importDefault(__webpack_require__(/*! helmet */ "helmet"));
const app_module_1 = __webpack_require__(/*! ./app.module */ "./apps/transversal-ms/src/app.module.ts");
const strip_untrusted_identity_headers_middleware_1 = __webpack_require__(/*! @common/middleware/strip-untrusted-identity-headers.middleware */ "./apps/transversal-ms/src/common/middleware/strip-untrusted-identity-headers.middleware.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(strip_untrusted_identity_headers_middleware_1.strip_untrusted_identity_headers);
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: false,
        crossOriginResourcePolicy: { policy: 'cross-origin' },
    }));
    app.enableCors({ origin: '*' });
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
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Access token de Amazon Cognito (token_use=access). Emisor: https://cognito-idp.{region}.amazonaws.com/{userPoolId}',
    }, 'cognito-access-token')
        .build();
    const swagger_document = swagger_1.SwaggerModule.createDocument(app, swagger_config);
    swagger_1.SwaggerModule.setup('docs', app, swagger_document, {
        jsonDocumentUrl: 'docs/json',
    });
    const config_service = app.get(config_1.ConfigService);
    const port = Number(config_service.get('config.port') ?? 8080);
    const trust_hops = config_service.get('security.trust_proxy_hops') ?? 0;
    if (Number.isFinite(trust_hops) && trust_hops > 0) {
        app.set('trust proxy', trust_hops);
    }
    await app.listen(port);
    const logger = new common_1.Logger('Bootstrap');
    logger.log(`Transversal MS (HTTP + SQS) escuchando en puerto ${port}`);
    logger.log(`Swagger UI: http://localhost:${port}/docs`);
}
void bootstrap();


/***/ },

/***/ "./apps/transversal-ms/src/modules/auth/application/dto/auth-login-response.dto.ts"
/*!*****************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/auth/application/dto/auth-login-response.dto.ts ***!
  \*****************************************************************************************/
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
exports.AuthLoginResponseDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const auth_tokens_response_dto_1 = __webpack_require__(/*! @modules/auth/application/dto/auth-tokens-response.dto */ "./apps/transversal-ms/src/modules/auth/application/dto/auth-tokens-response.dto.ts");
class AuthLoginResponseDto {
    status;
    challengeName;
    session;
    tokens;
}
exports.AuthLoginResponseDto = AuthLoginResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: [
            'MFA_REQUIRED',
            'MFA_SETUP_REQUIRED',
            'PASSWORD_CHANGE_REQUIRED',
            'AUTHENTICATED',
        ],
    }),
    __metadata("design:type", String)
], AuthLoginResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        nullable: true,
        enum: ['SOFTWARE_TOKEN_MFA', 'MFA_SETUP', 'NEW_PASSWORD_REQUIRED'],
    }),
    __metadata("design:type", Object)
], AuthLoginResponseDto.prototype, "challengeName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], AuthLoginResponseDto.prototype, "session", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => auth_tokens_response_dto_1.AuthTokensResponseDto, nullable: true }),
    __metadata("design:type", Object)
], AuthLoginResponseDto.prototype, "tokens", void 0);


/***/ },

/***/ "./apps/transversal-ms/src/modules/auth/application/dto/auth-payload.transforms.ts"
/*!*****************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/auth/application/dto/auth-payload.transforms.ts ***!
  \*****************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.trim_string_value = trim_string_value;
exports.normalize_auth_email = normalize_auth_email;
exports.digits_only_totp = digits_only_totp;
function trim_string_value({ value }) {
    return typeof value === 'string' ? value.trim() : value;
}
function normalize_auth_email({ value }) {
    return typeof value === 'string' ? value.trim().toLowerCase() : value;
}
function digits_only_totp({ value }) {
    if (value === null || value === undefined) {
        return value;
    }
    return String(value).trim().replace(/\D/g, '');
}


/***/ },

/***/ "./apps/transversal-ms/src/modules/auth/application/dto/auth-tokens-response.dto.ts"
/*!******************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/auth/application/dto/auth-tokens-response.dto.ts ***!
  \******************************************************************************************/
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
exports.AuthTokensResponseDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class AuthTokensResponseDto {
    accessToken;
    idToken;
    refreshToken;
    expiresIn;
    tokenType;
}
exports.AuthTokensResponseDto = AuthTokensResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AuthTokensResponseDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AuthTokensResponseDto.prototype, "idToken", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], AuthTokensResponseDto.prototype, "refreshToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AuthTokensResponseDto.prototype, "expiresIn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bearer' }),
    __metadata("design:type", String)
], AuthTokensResponseDto.prototype, "tokenType", void 0);


/***/ },

/***/ "./apps/transversal-ms/src/modules/auth/application/dto/login-request.dto.ts"
/*!***********************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/auth/application/dto/login-request.dto.ts ***!
  \***********************************************************************************/
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
exports.LoginRequestDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const auth_payload_transforms_1 = __webpack_require__(/*! @modules/auth/application/dto/auth-payload.transforms */ "./apps/transversal-ms/src/modules/auth/application/dto/auth-payload.transforms.ts");
class LoginRequestDto {
    email;
    password;
}
exports.LoginRequestDto = LoginRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'usuario@ejemplo.com' }),
    (0, class_transformer_1.Transform)(auth_payload_transforms_1.normalize_auth_email),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], LoginRequestDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'password', minLength: 1 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], LoginRequestDto.prototype, "password", void 0);


/***/ },

/***/ "./apps/transversal-ms/src/modules/auth/application/dto/setup-mfa-request.dto.ts"
/*!***************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/auth/application/dto/setup-mfa-request.dto.ts ***!
  \***************************************************************************************/
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
exports.SetupMfaRequestDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const auth_payload_transforms_1 = __webpack_require__(/*! @modules/auth/application/dto/auth-payload.transforms */ "./apps/transversal-ms/src/modules/auth/application/dto/auth-payload.transforms.ts");
class SetupMfaRequestDto {
    session;
}
exports.SetupMfaRequestDto = SetupMfaRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Sesión devuelta por /auth/login con MFA_SETUP_REQUIRED' }),
    (0, class_transformer_1.Transform)(auth_payload_transforms_1.trim_string_value),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], SetupMfaRequestDto.prototype, "session", void 0);


/***/ },

/***/ "./apps/transversal-ms/src/modules/auth/application/dto/setup-mfa-response.dto.ts"
/*!****************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/auth/application/dto/setup-mfa-response.dto.ts ***!
  \****************************************************************************************/
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
exports.SetupMfaResponseDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class SetupMfaResponseDto {
    secretCodeUrl;
    session;
}
exports.SetupMfaResponseDto = SetupMfaResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'URL otpauth:// para configurar Google Authenticator' }),
    __metadata("design:type", String)
], SetupMfaResponseDto.prototype, "secretCodeUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Sesión actualizada para /auth/mfa/verify' }),
    __metadata("design:type", String)
], SetupMfaResponseDto.prototype, "session", void 0);


/***/ },

/***/ "./apps/transversal-ms/src/modules/auth/application/dto/tokens-response.dto.ts"
/*!*************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/auth/application/dto/tokens-response.dto.ts ***!
  \*************************************************************************************/
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
exports.TokensResponseDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class TokensResponseDto {
    accessToken;
    idToken;
    refreshToken;
    expiresIn;
    tokenType;
}
exports.TokensResponseDto = TokensResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TokensResponseDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TokensResponseDto.prototype, "idToken", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], TokensResponseDto.prototype, "refreshToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TokensResponseDto.prototype, "expiresIn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bearer' }),
    __metadata("design:type", String)
], TokensResponseDto.prototype, "tokenType", void 0);


/***/ },

/***/ "./apps/transversal-ms/src/modules/auth/application/dto/verify-mfa-setup-request.dto.ts"
/*!**********************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/auth/application/dto/verify-mfa-setup-request.dto.ts ***!
  \**********************************************************************************************/
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
exports.VerifyMfaSetupRequestDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const auth_payload_transforms_1 = __webpack_require__(/*! @modules/auth/application/dto/auth-payload.transforms */ "./apps/transversal-ms/src/modules/auth/application/dto/auth-payload.transforms.ts");
class VerifyMfaSetupRequestDto {
    email;
    session;
    totpCode;
}
exports.VerifyMfaSetupRequestDto = VerifyMfaSetupRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'usuario@ejemplo.com' }),
    (0, class_transformer_1.Transform)(auth_payload_transforms_1.normalize_auth_email),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], VerifyMfaSetupRequestDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Transform)(auth_payload_transforms_1.trim_string_value),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], VerifyMfaSetupRequestDto.prototype, "session", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123456', minLength: 6, maxLength: 6 }),
    (0, class_transformer_1.Transform)(auth_payload_transforms_1.digits_only_totp),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(6, 6),
    __metadata("design:type", String)
], VerifyMfaSetupRequestDto.prototype, "totpCode", void 0);


/***/ },

/***/ "./apps/transversal-ms/src/modules/auth/application/dto/verify-totp-request.dto.ts"
/*!*****************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/auth/application/dto/verify-totp-request.dto.ts ***!
  \*****************************************************************************************/
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
exports.VerifyTotpRequestDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const auth_payload_transforms_1 = __webpack_require__(/*! @modules/auth/application/dto/auth-payload.transforms */ "./apps/transversal-ms/src/modules/auth/application/dto/auth-payload.transforms.ts");
class VerifyTotpRequestDto {
    email;
    session;
    totpCode;
}
exports.VerifyTotpRequestDto = VerifyTotpRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'usuario@ejemplo.com' }),
    (0, class_transformer_1.Transform)(auth_payload_transforms_1.normalize_auth_email),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], VerifyTotpRequestDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Sesión devuelta por Cognito en el login con MFA' }),
    (0, class_transformer_1.Transform)(auth_payload_transforms_1.trim_string_value),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], VerifyTotpRequestDto.prototype, "session", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123456', minLength: 6, maxLength: 6 }),
    (0, class_transformer_1.Transform)(auth_payload_transforms_1.digits_only_totp),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(6, 6),
    __metadata("design:type", String)
], VerifyTotpRequestDto.prototype, "totpCode", void 0);


/***/ },

/***/ "./apps/transversal-ms/src/modules/auth/application/use-cases/login-with-password.use-case.ts"
/*!****************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/auth/application/use-cases/login-with-password.use-case.ts ***!
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginWithPasswordUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_provider_port_1 = __webpack_require__(/*! @modules/auth/domain/ports/auth-provider.port */ "./apps/transversal-ms/src/modules/auth/domain/ports/auth-provider.port.ts");
let LoginWithPasswordUseCase = class LoginWithPasswordUseCase {
    auth_provider;
    constructor(auth_provider) {
        this.auth_provider = auth_provider;
    }
    execute(email, password) {
        return this.auth_provider.loginWithPassword({ email, password });
    }
};
exports.LoginWithPasswordUseCase = LoginWithPasswordUseCase;
exports.LoginWithPasswordUseCase = LoginWithPasswordUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(auth_provider_port_1.AUTH_PROVIDER)),
    __metadata("design:paramtypes", [Object])
], LoginWithPasswordUseCase);


/***/ },

/***/ "./apps/transversal-ms/src/modules/auth/application/use-cases/setup-mfa.use-case.ts"
/*!******************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/auth/application/use-cases/setup-mfa.use-case.ts ***!
  \******************************************************************************************/
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
exports.SetupMfaUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_provider_port_1 = __webpack_require__(/*! @modules/auth/domain/ports/auth-provider.port */ "./apps/transversal-ms/src/modules/auth/domain/ports/auth-provider.port.ts");
let SetupMfaUseCase = class SetupMfaUseCase {
    auth_provider;
    constructor(auth_provider) {
        this.auth_provider = auth_provider;
    }
    execute(session) {
        return this.auth_provider.setupMfa({ session });
    }
};
exports.SetupMfaUseCase = SetupMfaUseCase;
exports.SetupMfaUseCase = SetupMfaUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(auth_provider_port_1.AUTH_PROVIDER)),
    __metadata("design:paramtypes", [Object])
], SetupMfaUseCase);


/***/ },

/***/ "./apps/transversal-ms/src/modules/auth/application/use-cases/verify-mfa-setup.use-case.ts"
/*!*************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/auth/application/use-cases/verify-mfa-setup.use-case.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VerifyMfaSetupUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_provider_port_1 = __webpack_require__(/*! @modules/auth/domain/ports/auth-provider.port */ "./apps/transversal-ms/src/modules/auth/domain/ports/auth-provider.port.ts");
let VerifyMfaSetupUseCase = class VerifyMfaSetupUseCase {
    auth_provider;
    constructor(auth_provider) {
        this.auth_provider = auth_provider;
    }
    execute(email, session, totpCode) {
        return this.auth_provider.verifyMfaSetup({ email, session, totpCode });
    }
};
exports.VerifyMfaSetupUseCase = VerifyMfaSetupUseCase;
exports.VerifyMfaSetupUseCase = VerifyMfaSetupUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(auth_provider_port_1.AUTH_PROVIDER)),
    __metadata("design:paramtypes", [Object])
], VerifyMfaSetupUseCase);


/***/ },

/***/ "./apps/transversal-ms/src/modules/auth/application/use-cases/verify-totp.use-case.ts"
/*!********************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/auth/application/use-cases/verify-totp.use-case.ts ***!
  \********************************************************************************************/
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
exports.VerifyTotpUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_provider_port_1 = __webpack_require__(/*! @modules/auth/domain/ports/auth-provider.port */ "./apps/transversal-ms/src/modules/auth/domain/ports/auth-provider.port.ts");
let VerifyTotpUseCase = class VerifyTotpUseCase {
    auth_provider;
    constructor(auth_provider) {
        this.auth_provider = auth_provider;
    }
    execute(email, session, totpCode) {
        return this.auth_provider.verifyTotp({ email, session, totpCode });
    }
};
exports.VerifyTotpUseCase = VerifyTotpUseCase;
exports.VerifyTotpUseCase = VerifyTotpUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(auth_provider_port_1.AUTH_PROVIDER)),
    __metadata("design:paramtypes", [Object])
], VerifyTotpUseCase);


/***/ },

/***/ "./apps/transversal-ms/src/modules/auth/auth.module.ts"
/*!*************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/auth/auth.module.ts ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const cognito_jwt_strategy_1 = __webpack_require__(/*! ./infrastructure/strategies/cognito-jwt.strategy */ "./apps/transversal-ms/src/modules/auth/infrastructure/strategies/cognito-jwt.strategy.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! ./infrastructure/guards/jwt-auth.guard */ "./apps/transversal-ms/src/modules/auth/infrastructure/guards/jwt-auth.guard.ts");
const roles_guard_1 = __webpack_require__(/*! ./infrastructure/guards/roles.guard */ "./apps/transversal-ms/src/modules/auth/infrastructure/guards/roles.guard.ts");
const scope_guard_1 = __webpack_require__(/*! ./infrastructure/guards/scope.guard */ "./apps/transversal-ms/src/modules/auth/infrastructure/guards/scope.guard.ts");
const auth_controller_1 = __webpack_require__(/*! ./presentation/auth.controller */ "./apps/transversal-ms/src/modules/auth/presentation/auth.controller.ts");
const auth_provider_port_1 = __webpack_require__(/*! @modules/auth/domain/ports/auth-provider.port */ "./apps/transversal-ms/src/modules/auth/domain/ports/auth-provider.port.ts");
const cognito_auth_provider_1 = __webpack_require__(/*! @modules/auth/infrastructure/cognito/cognito-auth.provider */ "./apps/transversal-ms/src/modules/auth/infrastructure/cognito/cognito-auth.provider.ts");
const login_with_password_use_case_1 = __webpack_require__(/*! @modules/auth/application/use-cases/login-with-password.use-case */ "./apps/transversal-ms/src/modules/auth/application/use-cases/login-with-password.use-case.ts");
const verify_totp_use_case_1 = __webpack_require__(/*! @modules/auth/application/use-cases/verify-totp.use-case */ "./apps/transversal-ms/src/modules/auth/application/use-cases/verify-totp.use-case.ts");
const setup_mfa_use_case_1 = __webpack_require__(/*! @modules/auth/application/use-cases/setup-mfa.use-case */ "./apps/transversal-ms/src/modules/auth/application/use-cases/setup-mfa.use-case.ts");
const verify_mfa_setup_use_case_1 = __webpack_require__(/*! @modules/auth/application/use-cases/verify-mfa-setup.use-case */ "./apps/transversal-ms/src/modules/auth/application/use-cases/verify-mfa-setup.use-case.ts");
const typeorm_permission_codes_by_role_reader_1 = __webpack_require__(/*! @infrastructure/database/readers/typeorm-permission-codes-by-role.reader */ "./apps/transversal-ms/src/infrastructure/database/readers/typeorm-permission-codes-by-role.reader.ts");
const auth_tokens_1 = __webpack_require__(/*! @modules/auth/auth.tokens */ "./apps/transversal-ms/src/modules/auth/auth.tokens.ts");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [passport_1.PassportModule.register({ defaultStrategy: 'jwt' })],
        controllers: [auth_controller_1.AuthController],
        providers: [
            cognito_jwt_strategy_1.CognitoJwtStrategy,
            jwt_auth_guard_1.JwtAuthGuard,
            roles_guard_1.RolesGuard,
            scope_guard_1.ScopeGuard,
            typeorm_permission_codes_by_role_reader_1.TypeormPermissionCodesByRoleReader,
            {
                provide: auth_tokens_1.PERMISSION_CODES_BY_ROLE_READER,
                useExisting: typeorm_permission_codes_by_role_reader_1.TypeormPermissionCodesByRoleReader,
            },
            {
                provide: auth_provider_port_1.AUTH_PROVIDER,
                useClass: cognito_auth_provider_1.CognitoAuthProvider,
            },
            login_with_password_use_case_1.LoginWithPasswordUseCase,
            verify_totp_use_case_1.VerifyTotpUseCase,
            setup_mfa_use_case_1.SetupMfaUseCase,
            verify_mfa_setup_use_case_1.VerifyMfaSetupUseCase,
        ],
        exports: [
            passport_1.PassportModule,
            jwt_auth_guard_1.JwtAuthGuard,
            roles_guard_1.RolesGuard,
            scope_guard_1.ScopeGuard,
            auth_tokens_1.PERMISSION_CODES_BY_ROLE_READER,
        ],
    })
], AuthModule);


/***/ },

/***/ "./apps/transversal-ms/src/modules/auth/auth.tokens.ts"
/*!*************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/auth/auth.tokens.ts ***!
  \*************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PERMISSION_CODES_BY_ROLE_READER = void 0;
exports.PERMISSION_CODES_BY_ROLE_READER = Symbol('PERMISSION_CODES_BY_ROLE_READER');


/***/ },

/***/ "./apps/transversal-ms/src/modules/auth/domain/models/auth-error.model.ts"
/*!********************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/auth/domain/models/auth-error.model.ts ***!
  \********************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthDomainError = void 0;
class AuthDomainError extends Error {
    code;
    constructor(code, message) {
        super(message);
        this.name = 'AuthDomainError';
        this.code = code;
    }
}
exports.AuthDomainError = AuthDomainError;


/***/ },

/***/ "./apps/transversal-ms/src/modules/auth/domain/ports/auth-provider.port.ts"
/*!*********************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/auth/domain/ports/auth-provider.port.ts ***!
  \*********************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AUTH_PROVIDER = void 0;
exports.AUTH_PROVIDER = 'AUTH_PROVIDER';


/***/ },

/***/ "./apps/transversal-ms/src/modules/auth/infrastructure/cognito/cognito-auth.provider.ts"
/*!**********************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/auth/infrastructure/cognito/cognito-auth.provider.ts ***!
  \**********************************************************************************************/
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
var CognitoAuthProvider_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CognitoAuthProvider = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const client_cognito_identity_provider_1 = __webpack_require__(/*! @aws-sdk/client-cognito-identity-provider */ "@aws-sdk/client-cognito-identity-provider");
const crypto_1 = __webpack_require__(/*! crypto */ "crypto");
const auth_error_model_1 = __webpack_require__(/*! @modules/auth/domain/models/auth-error.model */ "./apps/transversal-ms/src/modules/auth/domain/models/auth-error.model.ts");
let CognitoAuthProvider = CognitoAuthProvider_1 = class CognitoAuthProvider {
    config_service;
    logger = new common_1.Logger(CognitoAuthProvider_1.name);
    cognito_client;
    client_id;
    client_secret;
    constructor(config_service) {
        this.config_service = config_service;
        const region = this.config_service.getOrThrow('config.cognito.region');
        const client_id = this.config_service.get('config.cognito.clientId')?.trim() ?? '';
        const client_secret = this.config_service.get('config.cognito.clientSecret')?.trim();
        if (client_id.length === 0) {
            throw new Error('Missing Cognito app client id configuration');
        }
        this.client_id = client_id;
        this.client_secret =
            client_secret !== undefined && client_secret.length > 0 ? client_secret : null;
        this.cognito_client = new client_cognito_identity_provider_1.CognitoIdentityProviderClient({ region });
    }
    async loginWithPassword(payload) {
        try {
            const username = payload.email.trim().toLowerCase();
            const auth_parameters = {
                USERNAME: username,
                PASSWORD: payload.password,
            };
            const secret_hash = this.build_secret_hash(username);
            if (secret_hash !== null) {
                auth_parameters.SECRET_HASH = secret_hash;
            }
            const response = await this.cognito_client.send(new client_cognito_identity_provider_1.InitiateAuthCommand({
                AuthFlow: 'USER_PASSWORD_AUTH',
                ClientId: this.client_id,
                AuthParameters: auth_parameters,
            }));
            if (response.ChallengeName !== undefined && response.Session !== undefined) {
                if (response.ChallengeName === 'SOFTWARE_TOKEN_MFA') {
                    return {
                        status: 'MFA_REQUIRED',
                        challengeName: 'SOFTWARE_TOKEN_MFA',
                        session: response.Session,
                        tokens: null,
                    };
                }
                if (response.ChallengeName === 'MFA_SETUP') {
                    return {
                        status: 'MFA_SETUP_REQUIRED',
                        challengeName: 'MFA_SETUP',
                        session: response.Session,
                        tokens: null,
                    };
                }
                if (response.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
                    return {
                        status: 'PASSWORD_CHANGE_REQUIRED',
                        challengeName: 'NEW_PASSWORD_REQUIRED',
                        session: response.Session,
                        tokens: null,
                    };
                }
            }
            if (response.AuthenticationResult !== undefined) {
                return {
                    status: 'AUTHENTICATED',
                    challengeName: null,
                    session: null,
                    tokens: this.map_authentication_result(response.AuthenticationResult),
                };
            }
            throw new auth_error_model_1.AuthDomainError('UNEXPECTED_AUTH_ERROR', 'Unexpected Cognito login response');
        }
        catch (error) {
            this.map_and_throw_auth_error(error, 'login');
        }
    }
    async verifyTotp(payload) {
        try {
            const username = payload.email.trim().toLowerCase();
            const session = payload.session.trim();
            const totp_code = String(payload.totpCode).trim().replace(/\D/g, '');
            if (totp_code.length !== 6) {
                throw new auth_error_model_1.AuthDomainError('INVALID_TOTP', 'Invalid TOTP code');
            }
            const challenge_responses = {
                USERNAME: username,
                SOFTWARE_TOKEN_MFA_CODE: totp_code,
            };
            const secret_hash = this.build_secret_hash(username);
            if (secret_hash !== null) {
                challenge_responses.SECRET_HASH = secret_hash;
            }
            const response = await this.cognito_client.send(new client_cognito_identity_provider_1.RespondToAuthChallengeCommand({
                ClientId: this.client_id,
                ChallengeName: 'SOFTWARE_TOKEN_MFA',
                Session: session,
                ChallengeResponses: challenge_responses,
            }));
            if (response.AuthenticationResult === undefined) {
                throw new auth_error_model_1.AuthDomainError('UNEXPECTED_AUTH_ERROR', 'Unexpected Cognito challenge response');
            }
            return this.map_authentication_result(response.AuthenticationResult);
        }
        catch (error) {
            this.map_and_throw_auth_error(error, 'totp');
        }
    }
    async setupMfa(payload) {
        try {
            const session = payload.session.trim();
            const response = await this.cognito_client.send(new client_cognito_identity_provider_1.AssociateSoftwareTokenCommand({
                Session: session,
            }));
            if (response.SecretCode === undefined ||
                response.SecretCode.length === 0 ||
                response.Session === undefined ||
                response.Session.length === 0) {
                throw new auth_error_model_1.AuthDomainError('UNEXPECTED_AUTH_ERROR', 'Missing Cognito MFA setup information');
            }
            const issuer = this.config_service.get('config.mfa.issuer')?.trim() || 'Platam Pay';
            const secret_code_url = this.build_totp_provisioning_url(response.SecretCode, issuer);
            return {
                secretCodeUrl: secret_code_url,
                session: response.Session,
            };
        }
        catch (error) {
            this.map_and_throw_auth_error(error, 'setup');
        }
    }
    async verifyMfaSetup(payload) {
        try {
            const username = payload.email.trim().toLowerCase();
            const session = payload.session.trim();
            const totp_code = String(payload.totpCode).trim().replace(/\D/g, '');
            if (totp_code.length !== 6) {
                throw new auth_error_model_1.AuthDomainError('INVALID_TOTP', 'Invalid TOTP code');
            }
            const verify_response = await this.cognito_client.send(new client_cognito_identity_provider_1.VerifySoftwareTokenCommand({
                Session: session,
                UserCode: totp_code,
            }));
            if (verify_response.Status !== 'SUCCESS') {
                throw new auth_error_model_1.AuthDomainError('INVALID_TOTP', 'Invalid TOTP setup code');
            }
            const challenge_responses = {
                USERNAME: username,
            };
            const secret_hash = this.build_secret_hash(username);
            if (secret_hash !== null) {
                challenge_responses.SECRET_HASH = secret_hash;
            }
            const challenge_session = verify_response.Session ?? session;
            const response = await this.cognito_client.send(new client_cognito_identity_provider_1.RespondToAuthChallengeCommand({
                ClientId: this.client_id,
                ChallengeName: 'MFA_SETUP',
                Session: challenge_session,
                ChallengeResponses: challenge_responses,
            }));
            if (response.AuthenticationResult === undefined) {
                throw new auth_error_model_1.AuthDomainError('UNEXPECTED_AUTH_ERROR', 'Unexpected Cognito MFA setup verification response');
            }
            return this.map_authentication_result(response.AuthenticationResult);
        }
        catch (error) {
            this.map_and_throw_auth_error(error, 'mfa_setup');
        }
    }
    map_authentication_result(result) {
        if (result.AccessToken === undefined ||
            result.AccessToken.length === 0 ||
            result.IdToken === undefined ||
            result.IdToken.length === 0) {
            throw new auth_error_model_1.AuthDomainError('UNEXPECTED_AUTH_ERROR', 'Missing required Cognito tokens');
        }
        return {
            accessToken: result.AccessToken,
            idToken: result.IdToken,
            refreshToken: result.RefreshToken ?? null,
            expiresIn: result.ExpiresIn ?? 0,
            tokenType: result.TokenType ?? 'Bearer',
        };
    }
    build_secret_hash(username) {
        if (this.client_secret === null) {
            return null;
        }
        return (0, crypto_1.createHmac)('sha256', this.client_secret)
            .update(`${username}${this.client_id}`)
            .digest('base64');
    }
    build_totp_provisioning_url(secret_code, issuer) {
        const encoded_issuer = encodeURIComponent(issuer);
        const label = encoded_issuer;
        return `otpauth://totp/${label}?secret=${secret_code}&issuer=${encoded_issuer}`;
    }
    map_and_throw_auth_error(error, context) {
        if (error instanceof auth_error_model_1.AuthDomainError) {
            throw error;
        }
        const error_name = typeof error === 'object' &&
            error !== null &&
            'name' in error &&
            typeof error.name === 'string'
            ? error.name
            : 'UnknownError';
        const error_message = typeof error === 'object' &&
            error !== null &&
            'message' in error &&
            typeof error.message === 'string'
            ? error.message.toLowerCase()
            : '';
        if (['UserLockedOutException', 'TooManyFailedAttemptsException', 'LimitExceededException'].includes(error_name)) {
            throw new auth_error_model_1.AuthDomainError('ACCOUNT_LOCKED', 'Account locked');
        }
        if (context === 'login') {
            if ([
                'NotAuthorizedException',
                'UserNotFoundException',
                'UserNotConfirmedException',
                'PasswordResetRequiredException',
            ].includes(error_name)) {
                throw new auth_error_model_1.AuthDomainError('INVALID_CREDENTIALS', 'Invalid credentials');
            }
        }
        if (context === 'totp') {
            if (['CodeMismatchException'].includes(error_name)) {
                throw new auth_error_model_1.AuthDomainError('INVALID_TOTP', 'Invalid TOTP code');
            }
            if (['ExpiredCodeException'].includes(error_name) ||
                (error_name === 'NotAuthorizedException' && error_message.includes('session'))) {
                throw new auth_error_model_1.AuthDomainError('SESSION_EXPIRED', 'Expired session');
            }
            if (error_name === 'NotAuthorizedException') {
                throw new auth_error_model_1.AuthDomainError('INVALID_TOTP', 'Invalid TOTP code');
            }
        }
        if (context === 'setup') {
            if (['ExpiredCodeException'].includes(error_name) ||
                (error_name === 'NotAuthorizedException' && error_message.includes('session'))) {
                throw new auth_error_model_1.AuthDomainError('SESSION_EXPIRED', 'Expired session');
            }
        }
        if (context === 'mfa_setup') {
            if (['CodeMismatchException', 'EnableSoftwareTokenMFAException'].includes(error_name)) {
                throw new auth_error_model_1.AuthDomainError('INVALID_TOTP', 'Invalid TOTP code');
            }
            if (['ExpiredCodeException'].includes(error_name) ||
                (error_name === 'NotAuthorizedException' && error_message.includes('session'))) {
                throw new auth_error_model_1.AuthDomainError('SESSION_EXPIRED', 'Expired session');
            }
        }
        this.logger.warn(`cognito_unmapped_error context=${context} name=${error_name} -> UNEXPECTED_AUTH_ERROR`);
        throw new auth_error_model_1.AuthDomainError('UNEXPECTED_AUTH_ERROR', 'Unexpected authentication error');
    }
};
exports.CognitoAuthProvider = CognitoAuthProvider;
exports.CognitoAuthProvider = CognitoAuthProvider = CognitoAuthProvider_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], CognitoAuthProvider);


/***/ },

/***/ "./apps/transversal-ms/src/modules/auth/infrastructure/guards/jwt-auth.guard.ts"
/*!**************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/auth/infrastructure/guards/jwt-auth.guard.ts ***!
  \**************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    handleRequest(err, user, _info, _context, _status) {
        if (err) {
            throw err;
        }
        if (user === false || user === null || user === undefined) {
            throw new common_1.UnauthorizedException();
        }
        return user;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);


/***/ },

/***/ "./apps/transversal-ms/src/modules/auth/infrastructure/guards/roles.guard.ts"
/*!***********************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/auth/infrastructure/guards/roles.guard.ts ***!
  \***********************************************************************************/
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
exports.RolesGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const auth_metadata_constants_1 = __webpack_require__(/*! @modules/auth/presentation/constants/auth-metadata.constants */ "./apps/transversal-ms/src/modules/auth/presentation/constants/auth-metadata.constants.ts");
let RolesGuard = class RolesGuard {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const required = this.reflector.getAllAndOverride(auth_metadata_constants_1.REQUIRE_ROLES_KEY, [context.getHandler(), context.getClass()]);
        if (required === undefined || required.length === 0) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (user === undefined) {
            throw new common_1.UnauthorizedException();
        }
        if (!required.includes(user.roleCode)) {
            throw new common_1.ForbiddenException();
        }
        return true;
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RolesGuard);


/***/ },

/***/ "./apps/transversal-ms/src/modules/auth/infrastructure/guards/scope.guard.ts"
/*!***********************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/auth/infrastructure/guards/scope.guard.ts ***!
  \***********************************************************************************/
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
exports.ScopeGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const users_tokens_1 = __webpack_require__(/*! @modules/users/users.tokens */ "./apps/transversal-ms/src/modules/users/users.tokens.ts");
let ScopeGuard = class ScopeGuard {
    user_repository;
    constructor(user_repository) {
        this.user_repository = user_repository;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (user === undefined) {
            throw new common_1.UnauthorizedException();
        }
        const scope = await this.user_repository.resolve_visible_internal_user_ids_for_role(user.internalUserId, user.roleCode);
        request.user_visibility_scope = scope;
        return true;
    }
};
exports.ScopeGuard = ScopeGuard;
exports.ScopeGuard = ScopeGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(users_tokens_1.USER_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], ScopeGuard);


/***/ },

/***/ "./apps/transversal-ms/src/modules/auth/infrastructure/strategies/cognito-jwt.strategy.ts"
/*!************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/auth/infrastructure/strategies/cognito-jwt.strategy.ts ***!
  \************************************************************************************************/
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
var CognitoJwtStrategy_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CognitoJwtStrategy = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const jwks_rsa_1 = __webpack_require__(/*! jwks-rsa */ "jwks-rsa");
const passport_jwt_1 = __webpack_require__(/*! passport-jwt */ "passport-jwt");
const users_tokens_1 = __webpack_require__(/*! @modules/users/users.tokens */ "./apps/transversal-ms/src/modules/users/users.tokens.ts");
const transversal_tokens_1 = __webpack_require__(/*! @modules/transversal/transversal.tokens */ "./apps/transversal-ms/src/modules/transversal/transversal.tokens.ts");
const normalize_cognito_sub_1 = __webpack_require__(/*! @common/utils/normalize-cognito-sub */ "./apps/transversal-ms/src/common/utils/normalize-cognito-sub.ts");
let CognitoJwtStrategy = CognitoJwtStrategy_1 = class CognitoJwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    config_service;
    user_repository;
    role_repository;
    logger = new common_1.Logger(CognitoJwtStrategy_1.name);
    constructor(config_service, user_repository, role_repository) {
        const region = config_service.getOrThrow('config.cognito.region');
        const user_pool_id = config_service.get('config.cognito.userPoolId')?.trim();
        if (!user_pool_id) {
            throw new Error('COGNITO_USER_POOL_ID es obligatorio para autenticación JWT (config.cognito.userPoolId).');
        }
        const issuer = `https://cognito-idp.${region}.amazonaws.com/${user_pool_id}`;
        const jwks_uri = `${issuer}/.well-known/jwks.json`;
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            algorithms: ['RS256'],
            issuer,
            secretOrKeyProvider: (0, jwks_rsa_1.passportJwtSecret)({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 10,
                jwksUri: jwks_uri,
            }),
        });
        this.config_service = config_service;
        this.user_repository = user_repository;
        this.role_repository = role_repository;
    }
    async validate(payload) {
        if (payload.token_use !== 'access') {
            this.reject('invalid_token_use');
        }
        const expected_client_id = this.config_service
            .get('config.cognito.clientId')
            ?.trim();
        if (expected_client_id &&
            payload.client_id !== undefined &&
            payload.client_id !== expected_client_id) {
            this.reject('client_id_mismatch');
        }
        const token_sub = (0, normalize_cognito_sub_1.normalize_cognito_sub)(payload.sub ?? '');
        if (token_sub.length === 0) {
            this.reject('missing_sub');
        }
        const user = await this.user_repository.find_by_email(payload.username ?? '');
        if (user === null || user.state !== 'active') {
            this.reject('user_not_found_or_inactive');
        }
        if ((0, normalize_cognito_sub_1.normalize_cognito_sub)(user.cognito_sub) !== token_sub) {
            this.reject('cognito_sub_mismatch');
        }
        if (typeof payload.username === 'string' && payload.username.trim() !== '') {
            const claim_email = payload.username.trim().toLowerCase();
            if (claim_email !== user.email.trim().toLowerCase()) {
                this.reject('email_claim_mismatch');
            }
        }
        if (user.role_id === null) {
            this.reject('user_missing_role');
        }
        const role = await this.role_repository.find_by_internal_id(user.role_id);
        if (role === null) {
            this.reject('role_not_found');
        }
        return {
            internalUserId: user.internal_id,
            cognitoSub: token_sub,
            email: user.email,
            roleCode: role.name,
            parentId: user.parent_id,
            hierarchyPath: user.hierarchy_path,
        };
    }
    reject(reason) {
        this.logger.warn(`cognito_jwt_validate_rejected code=${reason}`);
        throw new common_1.UnauthorizedException();
    }
};
exports.CognitoJwtStrategy = CognitoJwtStrategy;
exports.CognitoJwtStrategy = CognitoJwtStrategy = CognitoJwtStrategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(users_tokens_1.USER_REPOSITORY)),
    __param(2, (0, common_1.Inject)(transversal_tokens_1.ROLE_REPOSITORY)),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, Object, Object])
], CognitoJwtStrategy);


/***/ },

/***/ "./apps/transversal-ms/src/modules/auth/presentation/auth.controller.ts"
/*!******************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/auth/presentation/auth.controller.ts ***!
  \******************************************************************************/
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const throttler_1 = __webpack_require__(/*! @nestjs/throttler */ "@nestjs/throttler");
const login_request_dto_1 = __webpack_require__(/*! @modules/auth/application/dto/login-request.dto */ "./apps/transversal-ms/src/modules/auth/application/dto/login-request.dto.ts");
const auth_login_response_dto_1 = __webpack_require__(/*! @modules/auth/application/dto/auth-login-response.dto */ "./apps/transversal-ms/src/modules/auth/application/dto/auth-login-response.dto.ts");
const verify_totp_request_dto_1 = __webpack_require__(/*! @modules/auth/application/dto/verify-totp-request.dto */ "./apps/transversal-ms/src/modules/auth/application/dto/verify-totp-request.dto.ts");
const tokens_response_dto_1 = __webpack_require__(/*! @modules/auth/application/dto/tokens-response.dto */ "./apps/transversal-ms/src/modules/auth/application/dto/tokens-response.dto.ts");
const setup_mfa_request_dto_1 = __webpack_require__(/*! @modules/auth/application/dto/setup-mfa-request.dto */ "./apps/transversal-ms/src/modules/auth/application/dto/setup-mfa-request.dto.ts");
const setup_mfa_response_dto_1 = __webpack_require__(/*! @modules/auth/application/dto/setup-mfa-response.dto */ "./apps/transversal-ms/src/modules/auth/application/dto/setup-mfa-response.dto.ts");
const verify_mfa_setup_request_dto_1 = __webpack_require__(/*! @modules/auth/application/dto/verify-mfa-setup-request.dto */ "./apps/transversal-ms/src/modules/auth/application/dto/verify-mfa-setup-request.dto.ts");
const auth_tokens_response_dto_1 = __webpack_require__(/*! @modules/auth/application/dto/auth-tokens-response.dto */ "./apps/transversal-ms/src/modules/auth/application/dto/auth-tokens-response.dto.ts");
const login_with_password_use_case_1 = __webpack_require__(/*! @modules/auth/application/use-cases/login-with-password.use-case */ "./apps/transversal-ms/src/modules/auth/application/use-cases/login-with-password.use-case.ts");
const verify_totp_use_case_1 = __webpack_require__(/*! @modules/auth/application/use-cases/verify-totp.use-case */ "./apps/transversal-ms/src/modules/auth/application/use-cases/verify-totp.use-case.ts");
const setup_mfa_use_case_1 = __webpack_require__(/*! @modules/auth/application/use-cases/setup-mfa.use-case */ "./apps/transversal-ms/src/modules/auth/application/use-cases/setup-mfa.use-case.ts");
const verify_mfa_setup_use_case_1 = __webpack_require__(/*! @modules/auth/application/use-cases/verify-mfa-setup.use-case */ "./apps/transversal-ms/src/modules/auth/application/use-cases/verify-mfa-setup.use-case.ts");
const auth_error_model_1 = __webpack_require__(/*! @modules/auth/domain/models/auth-error.model */ "./apps/transversal-ms/src/modules/auth/domain/models/auth-error.model.ts");
function to_auth_tokens_response_dto(tokens) {
    const dto = new auth_tokens_response_dto_1.AuthTokensResponseDto();
    dto.accessToken = tokens.accessToken;
    dto.idToken = tokens.idToken;
    dto.refreshToken = tokens.refreshToken;
    dto.expiresIn = tokens.expiresIn;
    dto.tokenType = tokens.tokenType;
    return dto;
}
function to_auth_login_response_dto(result) {
    const dto = new auth_login_response_dto_1.AuthLoginResponseDto();
    dto.status = result.status;
    dto.challengeName = result.challengeName;
    dto.session = result.session;
    dto.tokens = result.tokens !== null ? to_auth_tokens_response_dto(result.tokens) : null;
    return dto;
}
function to_tokens_response_dto(tokens) {
    const dto = new tokens_response_dto_1.TokensResponseDto();
    dto.accessToken = tokens.accessToken;
    dto.idToken = tokens.idToken;
    dto.refreshToken = tokens.refreshToken;
    dto.expiresIn = tokens.expiresIn;
    dto.tokenType = tokens.tokenType;
    return dto;
}
function to_setup_mfa_response_dto(secret_code_url, session) {
    const dto = new setup_mfa_response_dto_1.SetupMfaResponseDto();
    dto.secretCodeUrl = secret_code_url;
    dto.session = session;
    return dto;
}
let AuthController = class AuthController {
    login_with_password;
    verify_totp;
    setup_mfa;
    verify_mfa_setup;
    constructor(login_with_password, verify_totp, setup_mfa, verify_mfa_setup) {
        this.login_with_password = login_with_password;
        this.verify_totp = verify_totp;
        this.setup_mfa = setup_mfa;
        this.verify_mfa_setup = verify_mfa_setup;
    }
    async login(body) {
        try {
            const result = await this.login_with_password.execute(body.email, body.password);
            return to_auth_login_response_dto(result);
        }
        catch (error) {
            return this.throw_http_error(error);
        }
    }
    async verify_totp_handler(body) {
        try {
            const tokens = await this.verify_totp.execute(body.email, body.session, body.totpCode);
            return to_tokens_response_dto(tokens);
        }
        catch (error) {
            return this.throw_http_error(error);
        }
    }
    async setup_mfa_handler(body) {
        try {
            const setup = await this.setup_mfa.execute(body.session);
            return to_setup_mfa_response_dto(setup.secretCodeUrl, setup.session);
        }
        catch (error) {
            return this.throw_http_error(error);
        }
    }
    async verify_mfa_setup_handler(body) {
        try {
            const tokens = await this.verify_mfa_setup.execute(body.email, body.session, body.totpCode);
            return to_tokens_response_dto(tokens);
        }
        catch (error) {
            return this.throw_http_error(error);
        }
    }
    throw_http_error(error) {
        if (error instanceof auth_error_model_1.AuthDomainError) {
            if (error.code === 'INVALID_CREDENTIALS') {
                throw new common_1.UnauthorizedException('Credenciales incorrectas');
            }
            if (error.code === 'ACCOUNT_LOCKED') {
                throw new common_1.ForbiddenException('Tu cuenta ha sido bloqueada. Contacta al equipo de desarrollo');
            }
            if (error.code === 'INVALID_TOTP') {
                throw new common_1.UnauthorizedException('Código incorrecto. Verifica Google Authenticator e intenta de nuevo');
            }
            if (error.code === 'SESSION_EXPIRED') {
                throw new common_1.UnauthorizedException('Tu sesión ha expirado');
            }
            if (error.code === 'UNEXPECTED_AUTH_ERROR') {
                throw new common_1.ConflictException('Se requiere completar setup MFA o cambio de contraseña en Cognito');
            }
        }
        throw new common_1.InternalServerErrorException('No fue posible completar la autenticación');
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, throttler_1.SkipThrottle)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Autentica email y contraseña en Cognito',
        description: 'Inicia sesión con email y contraseña. Si Cognito exige un challenge, retorna estado y session para continuar el flujo.',
    }),
    (0, swagger_1.ApiBody)({ type: login_request_dto_1.LoginRequestDto }),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Autenticación iniciada o completada',
        type: auth_login_response_dto_1.AuthLoginResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Payload inválido (formato de email, longitud de contraseña)',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Credenciales incorrectas' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Cuenta bloqueada' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof login_request_dto_1.LoginRequestDto !== "undefined" && login_request_dto_1.LoginRequestDto) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('login/totp'),
    (0, throttler_1.SkipThrottle)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Valida código TOTP de Google Authenticator',
        description: 'Responde el challenge SOFTWARE_TOKEN_MFA de Cognito y retorna tokens JWT.',
    }),
    (0, swagger_1.ApiBody)({ type: verify_totp_request_dto_1.VerifyTotpRequestDto }),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Autenticación completada',
        type: tokens_response_dto_1.TokensResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Payload inválido (código TOTP o sesión con formato incorrecto)',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Código TOTP incorrecto o sesión expirada' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Cuenta bloqueada' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof verify_totp_request_dto_1.VerifyTotpRequestDto !== "undefined" && verify_totp_request_dto_1.VerifyTotpRequestDto) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], AuthController.prototype, "verify_totp_handler", null);
__decorate([
    (0, common_1.Post)('mfa/setup'),
    (0, throttler_1.SkipThrottle)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Inicia configuración MFA TOTP para challenge MFA_SETUP',
        description: 'Recibe la session de /auth/login (MFA_SETUP_REQUIRED), solicita SecretCode a Cognito y retorna session actualizada.',
    }),
    (0, swagger_1.ApiBody)({ type: setup_mfa_request_dto_1.SetupMfaRequestDto }),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'SecretCode de MFA generado',
        type: setup_mfa_response_dto_1.SetupMfaResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Payload inválido (session con formato incorrecto)',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Sesión expirada' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof setup_mfa_request_dto_1.SetupMfaRequestDto !== "undefined" && setup_mfa_request_dto_1.SetupMfaRequestDto) === "function" ? _j : Object]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], AuthController.prototype, "setup_mfa_handler", null);
__decorate([
    (0, common_1.Post)('mfa/verify'),
    (0, throttler_1.SkipThrottle)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Finaliza configuración MFA y completa autenticación',
        description: 'Valida código TOTP para completar MFA_SETUP en Cognito y retornar tokens JWT.',
    }),
    (0, swagger_1.ApiBody)({ type: verify_mfa_setup_request_dto_1.VerifyMfaSetupRequestDto }),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'MFA configurado y autenticación completada',
        type: tokens_response_dto_1.TokensResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Payload inválido (código TOTP o session con formato incorrecto)',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Código TOTP incorrecto o sesión expirada' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof verify_mfa_setup_request_dto_1.VerifyMfaSetupRequestDto !== "undefined" && verify_mfa_setup_request_dto_1.VerifyMfaSetupRequestDto) === "function" ? _l : Object]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], AuthController.prototype, "verify_mfa_setup_handler", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof login_with_password_use_case_1.LoginWithPasswordUseCase !== "undefined" && login_with_password_use_case_1.LoginWithPasswordUseCase) === "function" ? _a : Object, typeof (_b = typeof verify_totp_use_case_1.VerifyTotpUseCase !== "undefined" && verify_totp_use_case_1.VerifyTotpUseCase) === "function" ? _b : Object, typeof (_c = typeof setup_mfa_use_case_1.SetupMfaUseCase !== "undefined" && setup_mfa_use_case_1.SetupMfaUseCase) === "function" ? _c : Object, typeof (_d = typeof verify_mfa_setup_use_case_1.VerifyMfaSetupUseCase !== "undefined" && verify_mfa_setup_use_case_1.VerifyMfaSetupUseCase) === "function" ? _d : Object])
], AuthController);


/***/ },

/***/ "./apps/transversal-ms/src/modules/auth/presentation/constants/auth-metadata.constants.ts"
/*!************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/auth/presentation/constants/auth-metadata.constants.ts ***!
  \************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.REQUIRE_ROLES_KEY = void 0;
exports.REQUIRE_ROLES_KEY = 'require_roles';


/***/ },

/***/ "./apps/transversal-ms/src/modules/auth/presentation/decorators/current-user.decorator.ts"
/*!************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/auth/presentation/decorators/current-user.decorator.ts ***!
  \************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CurrentUser = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.CurrentUser = (0, common_1.createParamDecorator)((_data, ctx) => {
    const user = ctx.switchToHttp().getRequest().user;
    if (user === undefined) {
        throw new common_1.UnauthorizedException();
    }
    return user;
});


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
    process_transversal_inbound_message;
    logger = new common_1.Logger(IngestTransversalInboundSqsMessageUseCase_1.name);
    constructor(process_transversal_inbound_message) {
        this.process_transversal_inbound_message = process_transversal_inbound_message;
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
const transversal_files_uploaded_publish_queue_url_port_1 = __webpack_require__(/*! @messaging/domain/ports/transversal-files-uploaded-publish-queue-url.port */ "./apps/transversal-ms/src/modules/messaging/domain/ports/transversal-files-uploaded-publish-queue-url.port.ts");
let PublishFilesUploadedEventUseCase = class PublishFilesUploadedEventUseCase {
    message_publisher;
    files_upload_publish_queue;
    constructor(message_publisher, files_upload_publish_queue) {
        this.message_publisher = message_publisher;
        this.files_upload_publish_queue = files_upload_publish_queue;
    }
    async execute(command) {
        const queue_url = this.files_upload_publish_queue.get_publish_queue_url();
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
    __param(1, (0, common_1.Inject)(transversal_files_uploaded_publish_queue_url_port_1.TRANSVERSAL_FILES_UPLOADED_PUBLISH_QUEUE_URL_PORT)),
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

/***/ "./apps/transversal-ms/src/modules/messaging/domain/ports/outbound-message-publisher.port.ts"
/*!***************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/messaging/domain/ports/outbound-message-publisher.port.ts ***!
  \***************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OUTBOUND_MESSAGE_PUBLISHER_PORT = void 0;
exports.OUTBOUND_MESSAGE_PUBLISHER_PORT = Symbol('OUTBOUND_MESSAGE_PUBLISHER_PORT');


/***/ },

/***/ "./apps/transversal-ms/src/modules/messaging/domain/ports/transversal-files-uploaded-publish-queue-url.port.ts"
/*!*********************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/messaging/domain/ports/transversal-files-uploaded-publish-queue-url.port.ts ***!
  \*********************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TRANSVERSAL_FILES_UPLOADED_PUBLISH_QUEUE_URL_PORT = void 0;
exports.TRANSVERSAL_FILES_UPLOADED_PUBLISH_QUEUE_URL_PORT = Symbol('TRANSVERSAL_FILES_UPLOADED_PUBLISH_QUEUE_URL_PORT');


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
async function build_person_public_fields(row, city_repo) {
    let city_external_id = null;
    if (row.city_id !== null) {
        const city = await city_repo.find_by_internal_id(row.city_id);
        city_external_id = city?.external_id ?? null;
        if (city_external_id === null) {
            throw new Error('person city reference resolution failed');
        }
    }
    return {
        external_id: row.external_id,
        first_name: row.first_name,
        last_name: row.last_name,
        doc_type: row.doc_type,
        doc_number: row.doc_number,
        doc_issue_date: row.doc_issue_date,
        birth_date: row.birth_date,
        gender: row.gender,
        phone: row.phone,
        residential_address: row.residential_address,
        city_external_id,
        created_at: row.created_at,
        updated_at: row.updated_at,
    };
}


/***/ },

/***/ "./apps/transversal-ms/src/modules/persons/application/use-cases/create-person/create-person.request.ts"
/*!**************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/persons/application/use-cases/create-person/create-person.request.ts ***!
  \**************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePersonRequest = void 0;
class CreatePersonRequest {
    first_name;
    last_name;
    doc_type;
    doc_number;
    doc_issue_date;
    birth_date;
    gender;
    phone;
    residential_address;
    city_external_id;
    constructor(first_name, last_name, doc_type, doc_number, doc_issue_date, birth_date, gender, phone, residential_address, city_external_id) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.doc_type = doc_type;
        this.doc_number = doc_number;
        this.doc_issue_date = doc_issue_date;
        this.birth_date = birth_date;
        this.gender = gender;
        this.phone = phone;
        this.residential_address = residential_address;
        this.city_external_id = city_external_id;
    }
}
exports.CreatePersonRequest = CreatePersonRequest;


/***/ },

/***/ "./apps/transversal-ms/src/modules/persons/application/use-cases/create-person/create-person.response.ts"
/*!***************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/persons/application/use-cases/create-person/create-person.response.ts ***!
  \***************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePersonResponse = void 0;
class CreatePersonResponse {
    external_id;
    first_name;
    last_name;
    doc_type;
    doc_number;
    doc_issue_date;
    birth_date;
    gender;
    phone;
    residential_address;
    city_external_id;
    created_at;
    updated_at;
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePersonUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const persons_tokens_1 = __webpack_require__(/*! @modules/persons/persons.tokens */ "./apps/transversal-ms/src/modules/persons/persons.tokens.ts");
const transversal_tokens_1 = __webpack_require__(/*! @modules/transversal/transversal.tokens */ "./apps/transversal-ms/src/modules/transversal/transversal.tokens.ts");
const person_ports_1 = __webpack_require__(/*! @modules/persons/domain/ports/person.ports */ "./apps/transversal-ms/src/modules/persons/domain/ports/person.ports.ts");
const person_public_fields_builder_1 = __webpack_require__(/*! @modules/persons/application/mapping/person-public-fields.builder */ "./apps/transversal-ms/src/modules/persons/application/mapping/person-public-fields.builder.ts");
const create_person_response_1 = __webpack_require__(/*! ./create-person.response */ "./apps/transversal-ms/src/modules/persons/application/use-cases/create-person/create-person.response.ts");
let CreatePersonUseCase = class CreatePersonUseCase {
    person_repository;
    city_repository;
    constructor(person_repository, city_repository) {
        this.person_repository = person_repository;
        this.city_repository = city_repository;
    }
    async execute(req) {
        let city_id = null;
        if (req.city_external_id !== null) {
            const city = await this.city_repository.find_by_external_id(req.city_external_id);
            if (city === null) {
                throw new common_1.NotFoundException('city not found');
            }
            city_id = city.id;
        }
        const created = await this.person_repository.create({
            first_name: req.first_name,
            last_name: req.last_name,
            doc_type: req.doc_type,
            doc_number: req.doc_number,
            doc_issue_date: req.doc_issue_date,
            birth_date: req.birth_date,
            gender: req.gender,
            phone: req.phone,
            residential_address: req.residential_address,
            city_id,
        });
        const fields = await (0, person_public_fields_builder_1.build_person_public_fields)(created, this.city_repository);
        return new create_person_response_1.CreatePersonResponse(fields);
    }
};
exports.CreatePersonUseCase = CreatePersonUseCase;
exports.CreatePersonUseCase = CreatePersonUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(persons_tokens_1.PERSON_REPOSITORY)),
    __param(1, (0, common_1.Inject)(transversal_tokens_1.CITY_REPOSITORY)),
    __metadata("design:paramtypes", [typeof (_a = typeof person_ports_1.PersonRepository !== "undefined" && person_ports_1.PersonRepository) === "function" ? _a : Object, Object])
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
    person_repository;
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
    external_id;
    first_name;
    last_name;
    doc_type;
    doc_number;
    doc_issue_date;
    birth_date;
    gender;
    phone;
    residential_address;
    city_external_id;
    created_at;
    updated_at;
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetPersonByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const persons_tokens_1 = __webpack_require__(/*! @modules/persons/persons.tokens */ "./apps/transversal-ms/src/modules/persons/persons.tokens.ts");
const transversal_tokens_1 = __webpack_require__(/*! @modules/transversal/transversal.tokens */ "./apps/transversal-ms/src/modules/transversal/transversal.tokens.ts");
const person_ports_1 = __webpack_require__(/*! @modules/persons/domain/ports/person.ports */ "./apps/transversal-ms/src/modules/persons/domain/ports/person.ports.ts");
const person_public_fields_builder_1 = __webpack_require__(/*! @modules/persons/application/mapping/person-public-fields.builder */ "./apps/transversal-ms/src/modules/persons/application/mapping/person-public-fields.builder.ts");
const get_person_by_external_id_response_1 = __webpack_require__(/*! ./get-person-by-external-id.response */ "./apps/transversal-ms/src/modules/persons/application/use-cases/get-person-by-external-id/get-person-by-external-id.response.ts");
let GetPersonByExternalIdUseCase = class GetPersonByExternalIdUseCase {
    person_repository;
    city_repository;
    constructor(person_repository, city_repository) {
        this.person_repository = person_repository;
        this.city_repository = city_repository;
    }
    async execute(req) {
        const row = await this.person_repository.find_by_external_id(req.external_id);
        if (row === null) {
            throw new common_1.NotFoundException('person not found');
        }
        const fields = await (0, person_public_fields_builder_1.build_person_public_fields)(row, this.city_repository);
        return new get_person_by_external_id_response_1.GetPersonByExternalIdResponse(fields);
    }
};
exports.GetPersonByExternalIdUseCase = GetPersonByExternalIdUseCase;
exports.GetPersonByExternalIdUseCase = GetPersonByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(persons_tokens_1.PERSON_REPOSITORY)),
    __param(1, (0, common_1.Inject)(transversal_tokens_1.CITY_REPOSITORY)),
    __metadata("design:paramtypes", [typeof (_a = typeof person_ports_1.PersonRepository !== "undefined" && person_ports_1.PersonRepository) === "function" ? _a : Object, Object])
], GetPersonByExternalIdUseCase);


/***/ },

/***/ "./apps/transversal-ms/src/modules/persons/application/use-cases/ingest-create-person-sqs/ingest-create-person-sqs-message.use-case.ts"
/*!*********************************************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/persons/application/use-cases/ingest-create-person-sqs/ingest-create-person-sqs-message.use-case.ts ***!
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
var IngestCreatePersonSqsMessageUseCase_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IngestCreatePersonSqsMessageUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const persons_tokens_1 = __webpack_require__(/*! @modules/persons/persons.tokens */ "./apps/transversal-ms/src/modules/persons/persons.tokens.ts");
const transversal_tokens_1 = __webpack_require__(/*! @modules/transversal/transversal.tokens */ "./apps/transversal-ms/src/modules/transversal/transversal.tokens.ts");
const create_person_use_case_1 = __webpack_require__(/*! @modules/persons/application/use-cases/create-person/create-person.use-case */ "./apps/transversal-ms/src/modules/persons/application/use-cases/create-person/create-person.use-case.ts");
const create_person_request_1 = __webpack_require__(/*! @modules/persons/application/use-cases/create-person/create-person.request */ "./apps/transversal-ms/src/modules/persons/application/use-cases/create-person/create-person.request.ts");
const create_person_inbound_dto_1 = __webpack_require__(/*! @modules/transversal/application/dto/create-person-inbound.dto */ "./apps/transversal-ms/src/modules/transversal/application/dto/create-person-inbound.dto.ts");
const PG_UNIQUE_VIOLATION = '23505';
let IngestCreatePersonSqsMessageUseCase = IngestCreatePersonSqsMessageUseCase_1 = class IngestCreatePersonSqsMessageUseCase {
    idempotency;
    person_repository;
    city_repository;
    create_person;
    logger = new common_1.Logger(IngestCreatePersonSqsMessageUseCase_1.name);
    constructor(idempotency, person_repository, city_repository, create_person) {
        this.idempotency = idempotency;
        this.person_repository = person_repository;
        this.city_repository = city_repository;
        this.create_person = create_person;
    }
    async execute(command) {
        let parsed;
        try {
            parsed = JSON.parse(command.body);
        }
        catch {
            this.logger.warn('[CreatePerson][step=parse] cuerpo no es JSON válido.');
            return command.delete_on_validation_error;
        }
        const correlation_for_log = this.try_correlation_id(parsed) ?? 'unknown';
        const dto = (0, class_transformer_1.plainToInstance)(create_person_inbound_dto_1.CreatePersonInboundEventDto, parsed, {
            enableImplicitConversion: true,
        });
        const errors = (0, class_validator_1.validateSync)(dto, { forbidUnknownValues: false });
        if (errors.length > 0) {
            const message = errors
                .map((e) => Object.values(e.constraints ?? {}).join(', '))
                .join('; ');
            this.logger.warn(`[CreatePerson][correlationId=${correlation_for_log}][step=validation] ${message}`);
            return command.delete_on_validation_error;
        }
        const begin = await this.idempotency.begin(dto.idempotency_key, dto.correlation_id);
        if (begin.status === 'duplicate') {
            this.logger.log(`[CreatePerson][correlationId=${dto.correlation_id}][step=idempotent_hit]`);
            return true;
        }
        if (begin.status === 'conflict') {
            this.logger.warn(`[CreatePerson][correlationId=${dto.correlation_id}][step=idempotency_conflict]`);
            return false;
        }
        const payload = dto.payload;
        try {
            const city_external_id = await this.resolve_city_external_id_lenient(dto.correlation_id, payload.city_external_id);
            const created = await this.create_person.execute(new create_person_request_1.CreatePersonRequest(payload.first_name.trim(), payload.last_name.trim(), payload.doc_type.trim(), payload.doc_number.trim(), null, null, null, payload.phone ?? null, null, city_external_id));
            await this.idempotency.complete(dto.idempotency_key, {
                user_external_id: 'n/a',
                person_external_id: created.external_id,
            });
            this.logger.log(`[CreatePerson][correlationId=${dto.correlation_id}][step=completed] person_external_id=${created.external_id}`);
            return true;
        }
        catch (err) {
            if (this.is_unique_violation(err)) {
                const existing = await this.person_repository.find_by_doc_number(payload.doc_number.trim());
                if (existing !== null) {
                    await this.idempotency.complete(dto.idempotency_key, {
                        user_external_id: 'n/a',
                        person_external_id: existing.external_id,
                    });
                    this.logger.log(`[CreatePerson][correlationId=${dto.correlation_id}][step=dedup_completed] person_external_id=${existing.external_id}`);
                    return true;
                }
                await this.idempotency.release(dto.idempotency_key);
                this.logger.warn(`[CreatePerson][correlationId=${dto.correlation_id}][step=unique_violation_no_record]`);
                return false;
            }
            await this.idempotency.release(dto.idempotency_key);
            const text = err instanceof Error ? err.message : String(err);
            this.logger.error(`[CreatePerson][correlationId=${dto.correlation_id}][step=failed] ${text}`);
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
    is_unique_violation(err) {
        return err instanceof typeorm_1.QueryFailedError && err.driverError !== undefined
            ? String(err.driverError.code) === PG_UNIQUE_VIOLATION
            : false;
    }
    async resolve_city_external_id_lenient(correlation_id, city_external_id) {
        if (city_external_id === null || city_external_id === undefined) {
            return null;
        }
        const city = await this.city_repository.find_by_external_id(city_external_id);
        if (city === null) {
            this.logger.warn(`[CreatePerson][correlationId=${correlation_id}][step=city_not_found] city_external_id=${city_external_id}`);
            return null;
        }
        return city_external_id;
    }
};
exports.IngestCreatePersonSqsMessageUseCase = IngestCreatePersonSqsMessageUseCase;
exports.IngestCreatePersonSqsMessageUseCase = IngestCreatePersonSqsMessageUseCase = IngestCreatePersonSqsMessageUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(transversal_tokens_1.PARTNER_CREATE_USER_SQS_IDEMPOTENCY_PORT)),
    __param(1, (0, common_1.Inject)(persons_tokens_1.PERSON_REPOSITORY)),
    __param(2, (0, common_1.Inject)(transversal_tokens_1.CITY_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object, Object, typeof (_a = typeof create_person_use_case_1.CreatePersonUseCase !== "undefined" && create_person_use_case_1.CreatePersonUseCase) === "function" ? _a : Object])
], IngestCreatePersonSqsMessageUseCase);


/***/ },

/***/ "./apps/transversal-ms/src/modules/persons/application/use-cases/list-persons/list-persons.response.ts"
/*!*************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/persons/application/use-cases/list-persons/list-persons.response.ts ***!
  \*************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListPersonsItemResponse = void 0;
class ListPersonsItemResponse {
    external_id;
    first_name;
    last_name;
    doc_type;
    doc_number;
    doc_issue_date;
    birth_date;
    gender;
    phone;
    residential_address;
    city_external_id;
    created_at;
    updated_at;
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListPersonsUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const persons_tokens_1 = __webpack_require__(/*! @modules/persons/persons.tokens */ "./apps/transversal-ms/src/modules/persons/persons.tokens.ts");
const transversal_tokens_1 = __webpack_require__(/*! @modules/transversal/transversal.tokens */ "./apps/transversal-ms/src/modules/transversal/transversal.tokens.ts");
const person_ports_1 = __webpack_require__(/*! @modules/persons/domain/ports/person.ports */ "./apps/transversal-ms/src/modules/persons/domain/ports/person.ports.ts");
const person_public_fields_builder_1 = __webpack_require__(/*! @modules/persons/application/mapping/person-public-fields.builder */ "./apps/transversal-ms/src/modules/persons/application/mapping/person-public-fields.builder.ts");
const list_persons_response_1 = __webpack_require__(/*! ./list-persons.response */ "./apps/transversal-ms/src/modules/persons/application/use-cases/list-persons/list-persons.response.ts");
let ListPersonsUseCase = class ListPersonsUseCase {
    person_repository;
    city_repository;
    constructor(person_repository, city_repository) {
        this.person_repository = person_repository;
        this.city_repository = city_repository;
    }
    async execute() {
        const rows = await this.person_repository.find_all();
        const out = [];
        for (const row of rows) {
            const fields = await (0, person_public_fields_builder_1.build_person_public_fields)(row, this.city_repository);
            out.push(new list_persons_response_1.ListPersonsItemResponse(fields));
        }
        return out;
    }
};
exports.ListPersonsUseCase = ListPersonsUseCase;
exports.ListPersonsUseCase = ListPersonsUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(persons_tokens_1.PERSON_REPOSITORY)),
    __param(1, (0, common_1.Inject)(transversal_tokens_1.CITY_REPOSITORY)),
    __metadata("design:paramtypes", [typeof (_a = typeof person_ports_1.PersonRepository !== "undefined" && person_ports_1.PersonRepository) === "function" ? _a : Object, Object])
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
    external_id;
    first_name;
    last_name;
    doc_type;
    doc_number;
    doc_issue_date;
    birth_date;
    gender;
    phone;
    residential_address;
    city_external_id;
    created_at;
    updated_at;
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdatePersonByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const persons_tokens_1 = __webpack_require__(/*! @modules/persons/persons.tokens */ "./apps/transversal-ms/src/modules/persons/persons.tokens.ts");
const transversal_tokens_1 = __webpack_require__(/*! @modules/transversal/transversal.tokens */ "./apps/transversal-ms/src/modules/transversal/transversal.tokens.ts");
const person_ports_1 = __webpack_require__(/*! @modules/persons/domain/ports/person.ports */ "./apps/transversal-ms/src/modules/persons/domain/ports/person.ports.ts");
const person_public_fields_builder_1 = __webpack_require__(/*! @modules/persons/application/mapping/person-public-fields.builder */ "./apps/transversal-ms/src/modules/persons/application/mapping/person-public-fields.builder.ts");
const update_person_by_external_id_response_1 = __webpack_require__(/*! ./update-person-by-external-id.response */ "./apps/transversal-ms/src/modules/persons/application/use-cases/update-person-by-external-id/update-person-by-external-id.response.ts");
let UpdatePersonByExternalIdUseCase = class UpdatePersonByExternalIdUseCase {
    person_repository;
    city_repository;
    constructor(person_repository, city_repository) {
        this.person_repository = person_repository;
        this.city_repository = city_repository;
    }
    async execute(req) {
        const patch = {};
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
        if (req.city_external_id !== undefined) {
            if (req.city_external_id === null) {
                patch.city_id = null;
            }
            else {
                const city = await this.city_repository.find_by_external_id(req.city_external_id);
                if (city === null) {
                    throw new common_1.NotFoundException('city not found');
                }
                patch.city_id = city.id;
            }
        }
        const updated = await this.person_repository.update_by_external_id(req.external_id, patch);
        if (updated === null) {
            throw new common_1.NotFoundException('person not found');
        }
        const fields = await (0, person_public_fields_builder_1.build_person_public_fields)(updated, this.city_repository);
        return new update_person_by_external_id_response_1.UpdatePersonByExternalIdResponse(fields);
    }
};
exports.UpdatePersonByExternalIdUseCase = UpdatePersonByExternalIdUseCase;
exports.UpdatePersonByExternalIdUseCase = UpdatePersonByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(persons_tokens_1.PERSON_REPOSITORY)),
    __param(1, (0, common_1.Inject)(transversal_tokens_1.CITY_REPOSITORY)),
    __metadata("design:paramtypes", [typeof (_a = typeof person_ports_1.PersonRepository !== "undefined" && person_ports_1.PersonRepository) === "function" ? _a : Object, Object])
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
    internal_id;
    external_id;
    first_name;
    last_name;
    doc_type;
    doc_number;
    doc_issue_date;
    birth_date;
    gender;
    phone;
    residential_address;
    city_id;
    created_at;
    updated_at;
    constructor(internal_id, external_id, first_name, last_name, doc_type, doc_number, doc_issue_date, birth_date, gender, phone, residential_address, city_id, created_at, updated_at) {
        this.internal_id = internal_id;
        this.external_id = external_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.doc_type = doc_type;
        this.doc_number = doc_number;
        this.doc_issue_date = doc_issue_date;
        this.birth_date = birth_date;
        this.gender = gender;
        this.phone = phone;
        this.residential_address = residential_address;
        this.city_id = city_id;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
exports.Person = Person;


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
const ingest_create_person_sqs_message_use_case_1 = __webpack_require__(/*! ./application/use-cases/ingest-create-person-sqs/ingest-create-person-sqs-message.use-case */ "./apps/transversal-ms/src/modules/persons/application/use-cases/ingest-create-person-sqs/ingest-create-person-sqs-message.use-case.ts");
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
            ingest_create_person_sqs_message_use_case_1.IngestCreatePersonSqsMessageUseCase,
        ],
        exports: [
            create_person_use_case_1.CreatePersonUseCase,
            get_person_by_external_id_use_case_1.GetPersonByExternalIdUseCase,
            list_persons_use_case_1.ListPersonsUseCase,
            update_person_by_external_id_use_case_1.UpdatePersonByExternalIdUseCase,
            delete_person_by_external_id_use_case_1.DeletePersonByExternalIdUseCase,
            ingest_create_person_sqs_message_use_case_1.IngestCreatePersonSqsMessageUseCase,
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

/***/ "./apps/transversal-ms/src/modules/transversal/application/dto/create-partner-user-inbound.dto.ts"
/*!********************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/transversal/application/dto/create-partner-user-inbound.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePartnerUserInboundEventDto = exports.CreatePartnerUserInboundPayloadDto = void 0;
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const empty_string_to_null = ({ value }) => value === '' ? null : value;
class CreatePartnerUserInboundPayloadDto {
    email;
    country_code;
    first_name;
    last_name;
    doc_type;
    doc_number;
    phone;
    city_external_id;
}
exports.CreatePartnerUserInboundPayloadDto = CreatePartnerUserInboundPayloadDto;
__decorate([
    (0, class_transformer_1.Expose)({ name: 'email' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MaxLength)(320),
    __metadata("design:type", String)
], CreatePartnerUserInboundPayloadDto.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'country_code' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(empty_string_to_null),
    (0, class_validator_1.ValidateIf)((o) => o.country_code !== null),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(2),
    __metadata("design:type", Object)
], CreatePartnerUserInboundPayloadDto.prototype, "country_code", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'first_name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreatePartnerUserInboundPayloadDto.prototype, "first_name", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'last_name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreatePartnerUserInboundPayloadDto.prototype, "last_name", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'doc_type' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreatePartnerUserInboundPayloadDto.prototype, "doc_type", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'doc_number' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], CreatePartnerUserInboundPayloadDto.prototype, "doc_number", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'phone' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(empty_string_to_null),
    (0, class_validator_1.ValidateIf)((o) => o.phone !== null),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(64),
    __metadata("design:type", Object)
], CreatePartnerUserInboundPayloadDto.prototype, "phone", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'city_external_id' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(empty_string_to_null),
    (0, class_validator_1.ValidateIf)((o) => o.city_external_id !== null),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", Object)
], CreatePartnerUserInboundPayloadDto.prototype, "city_external_id", void 0);
class CreatePartnerUserInboundEventDto {
    event;
    version;
    correlation_id;
    idempotency_key;
    payload;
}
exports.CreatePartnerUserInboundEventDto = CreatePartnerUserInboundEventDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['create-partner-user']),
    __metadata("design:type", String)
], CreatePartnerUserInboundEventDto.prototype, "event", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['1.0']),
    __metadata("design:type", String)
], CreatePartnerUserInboundEventDto.prototype, "version", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'correlationId' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreatePartnerUserInboundEventDto.prototype, "correlation_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'idempotencyKey' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(512),
    __metadata("design:type", String)
], CreatePartnerUserInboundEventDto.prototype, "idempotency_key", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CreatePartnerUserInboundPayloadDto),
    __metadata("design:type", CreatePartnerUserInboundPayloadDto)
], CreatePartnerUserInboundEventDto.prototype, "payload", void 0);


/***/ },

/***/ "./apps/transversal-ms/src/modules/transversal/application/dto/create-person-inbound.dto.ts"
/*!**************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/transversal/application/dto/create-person-inbound.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePersonInboundEventDto = exports.CreatePersonInboundPayloadDto = void 0;
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const empty_string_to_null = ({ value }) => value === '' ? null : value;
class CreatePersonInboundPayloadDto {
    first_name;
    last_name;
    doc_type;
    doc_number;
    phone;
    city_external_id;
}
exports.CreatePersonInboundPayloadDto = CreatePersonInboundPayloadDto;
__decorate([
    (0, class_transformer_1.Expose)({ name: 'first_name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreatePersonInboundPayloadDto.prototype, "first_name", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'last_name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreatePersonInboundPayloadDto.prototype, "last_name", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'doc_type' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreatePersonInboundPayloadDto.prototype, "doc_type", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'doc_number' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], CreatePersonInboundPayloadDto.prototype, "doc_number", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'phone' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(empty_string_to_null),
    (0, class_validator_1.ValidateIf)((o) => o.phone !== null),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(64),
    __metadata("design:type", Object)
], CreatePersonInboundPayloadDto.prototype, "phone", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'city_external_id' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(empty_string_to_null),
    (0, class_validator_1.ValidateIf)((o) => o.city_external_id !== null),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", Object)
], CreatePersonInboundPayloadDto.prototype, "city_external_id", void 0);
class CreatePersonInboundEventDto {
    event;
    version;
    correlation_id;
    idempotency_key;
    payload;
}
exports.CreatePersonInboundEventDto = CreatePersonInboundEventDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['create-person']),
    __metadata("design:type", String)
], CreatePersonInboundEventDto.prototype, "event", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['1.0']),
    __metadata("design:type", String)
], CreatePersonInboundEventDto.prototype, "version", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'correlationId' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreatePersonInboundEventDto.prototype, "correlation_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'idempotencyKey' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(512),
    __metadata("design:type", String)
], CreatePersonInboundEventDto.prototype, "idempotency_key", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CreatePersonInboundPayloadDto),
    __metadata("design:type", CreatePersonInboundPayloadDto)
], CreatePersonInboundEventDto.prototype, "payload", void 0);


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
    file;
    folder;
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
    bucket;
    files;
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
    event;
    version;
    correlation_id;
    idempotency_key;
    payload;
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

/***/ "./apps/transversal-ms/src/modules/transversal/application/exceptions/create-partner-user-sqs.validation.error.ts"
/*!************************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/transversal/application/exceptions/create-partner-user-sqs.validation.error.ts ***!
  \************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePartnerUserSqsValidationError = void 0;
class CreatePartnerUserSqsValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CreatePartnerUserSqsValidationError';
    }
}
exports.CreatePartnerUserSqsValidationError = CreatePartnerUserSqsValidationError;


/***/ },

/***/ "./apps/transversal-ms/src/modules/transversal/application/exceptions/upload-files.validation.error.ts"
/*!*************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/transversal/application/exceptions/upload-files.validation.error.ts ***!
  \*************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadFilesValidationError = void 0;
class UploadFilesValidationError extends Error {
    code;
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

/***/ "./apps/transversal-ms/src/modules/transversal/application/use-cases/cities/create-city.use-case.ts"
/*!**********************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/transversal/application/use-cases/cities/create-city.use-case.ts ***!
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
var CreateCityUseCase_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateCityUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const transversal_tokens_1 = __webpack_require__(/*! @modules/transversal/transversal.tokens */ "./apps/transversal-ms/src/modules/transversal/transversal.tokens.ts");
const pg_error_util_1 = __webpack_require__(/*! @common/utils/pg-error.util */ "./apps/transversal-ms/src/common/utils/pg-error.util.ts");
let CreateCityUseCase = CreateCityUseCase_1 = class CreateCityUseCase {
    city_repository;
    currency_read;
    logger = new common_1.Logger(CreateCityUseCase_1.name);
    constructor(city_repository, currency_read) {
        this.city_repository = city_repository;
        this.currency_read = currency_read;
    }
    async execute(body) {
        const currency_id = await this.currency_read.find_internal_id_by_external_id(body.currency_external_id);
        if (currency_id === null) {
            throw new common_1.NotFoundException('currency not found');
        }
        try {
            return await this.city_repository.create({
                country_name: body.country_name,
                country_code: body.country_code,
                state_name: body.state_name,
                state_code: body.state_code,
                city_name: body.city_name,
                currency_id,
            });
        }
        catch (err) {
            if ((0, pg_error_util_1.is_pg_unique_violation)(err)) {
                throw new common_1.ConflictException('city already exists for this location');
            }
            this.logger.error('create city failed');
            throw err;
        }
    }
};
exports.CreateCityUseCase = CreateCityUseCase;
exports.CreateCityUseCase = CreateCityUseCase = CreateCityUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(transversal_tokens_1.CITY_REPOSITORY)),
    __param(1, (0, common_1.Inject)(transversal_tokens_1.CURRENCY_READ_PORT)),
    __metadata("design:paramtypes", [Object, Object])
], CreateCityUseCase);


/***/ },

/***/ "./apps/transversal-ms/src/modules/transversal/application/use-cases/cities/delete-city-by-external-id.use-case.ts"
/*!*************************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/transversal/application/use-cases/cities/delete-city-by-external-id.use-case.ts ***!
  \*************************************************************************************************************************/
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
exports.DeleteCityByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const transversal_tokens_1 = __webpack_require__(/*! @modules/transversal/transversal.tokens */ "./apps/transversal-ms/src/modules/transversal/transversal.tokens.ts");
let DeleteCityByExternalIdUseCase = class DeleteCityByExternalIdUseCase {
    city_repository;
    constructor(city_repository) {
        this.city_repository = city_repository;
    }
    async execute(external_id) {
        const deleted = await this.city_repository.delete_by_external_id(external_id);
        if (deleted) {
            return;
        }
        const exists = await this.city_repository.find_by_external_id(external_id);
        if (exists === null) {
            throw new common_1.NotFoundException('city not found');
        }
        throw new common_1.ConflictException('city is referenced by persons or businesses');
    }
};
exports.DeleteCityByExternalIdUseCase = DeleteCityByExternalIdUseCase;
exports.DeleteCityByExternalIdUseCase = DeleteCityByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(transversal_tokens_1.CITY_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], DeleteCityByExternalIdUseCase);


/***/ },

/***/ "./apps/transversal-ms/src/modules/transversal/application/use-cases/cities/get-city-by-external-id.use-case.ts"
/*!**********************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/transversal/application/use-cases/cities/get-city-by-external-id.use-case.ts ***!
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
exports.GetCityByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const transversal_tokens_1 = __webpack_require__(/*! @modules/transversal/transversal.tokens */ "./apps/transversal-ms/src/modules/transversal/transversal.tokens.ts");
let GetCityByExternalIdUseCase = class GetCityByExternalIdUseCase {
    city_repository;
    constructor(city_repository) {
        this.city_repository = city_repository;
    }
    async execute(external_id) {
        const city = await this.city_repository.find_by_external_id(external_id);
        if (city === null) {
            throw new common_1.NotFoundException('city not found');
        }
        return city;
    }
};
exports.GetCityByExternalIdUseCase = GetCityByExternalIdUseCase;
exports.GetCityByExternalIdUseCase = GetCityByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(transversal_tokens_1.CITY_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], GetCityByExternalIdUseCase);


/***/ },

/***/ "./apps/transversal-ms/src/modules/transversal/application/use-cases/cities/list-cities.use-case.ts"
/*!**********************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/transversal/application/use-cases/cities/list-cities.use-case.ts ***!
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
exports.ListCitiesUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const transversal_tokens_1 = __webpack_require__(/*! @modules/transversal/transversal.tokens */ "./apps/transversal-ms/src/modules/transversal/transversal.tokens.ts");
let ListCitiesUseCase = class ListCitiesUseCase {
    city_repository;
    constructor(city_repository) {
        this.city_repository = city_repository;
    }
    async execute(query) {
        const { items, total } = await this.city_repository.list(query);
        const unpaged = query.page === undefined && query.limit === undefined;
        const page = unpaged ? 1 : (query.page ?? 1);
        const limit = unpaged ? total : (query.limit ?? 20);
        return {
            items,
            total,
            page,
            limit,
        };
    }
};
exports.ListCitiesUseCase = ListCitiesUseCase;
exports.ListCitiesUseCase = ListCitiesUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(transversal_tokens_1.CITY_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], ListCitiesUseCase);


/***/ },

/***/ "./apps/transversal-ms/src/modules/transversal/application/use-cases/cities/list-distinct-countries.use-case.ts"
/*!**********************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/transversal/application/use-cases/cities/list-distinct-countries.use-case.ts ***!
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
exports.ListDistinctCountriesUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const transversal_tokens_1 = __webpack_require__(/*! @modules/transversal/transversal.tokens */ "./apps/transversal-ms/src/modules/transversal/transversal.tokens.ts");
let ListDistinctCountriesUseCase = class ListDistinctCountriesUseCase {
    city_repository;
    constructor(city_repository) {
        this.city_repository = city_repository;
    }
    async execute(params) {
        return this.city_repository.list_distinct_countries(params);
    }
};
exports.ListDistinctCountriesUseCase = ListDistinctCountriesUseCase;
exports.ListDistinctCountriesUseCase = ListDistinctCountriesUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(transversal_tokens_1.CITY_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], ListDistinctCountriesUseCase);


/***/ },

/***/ "./apps/transversal-ms/src/modules/transversal/application/use-cases/cities/update-city-by-external-id.use-case.ts"
/*!*************************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/transversal/application/use-cases/cities/update-city-by-external-id.use-case.ts ***!
  \*************************************************************************************************************************/
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
var UpdateCityByExternalIdUseCase_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateCityByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const transversal_tokens_1 = __webpack_require__(/*! @modules/transversal/transversal.tokens */ "./apps/transversal-ms/src/modules/transversal/transversal.tokens.ts");
const pg_error_util_1 = __webpack_require__(/*! @common/utils/pg-error.util */ "./apps/transversal-ms/src/common/utils/pg-error.util.ts");
let UpdateCityByExternalIdUseCase = UpdateCityByExternalIdUseCase_1 = class UpdateCityByExternalIdUseCase {
    city_repository;
    currency_read;
    logger = new common_1.Logger(UpdateCityByExternalIdUseCase_1.name);
    constructor(city_repository, currency_read) {
        this.city_repository = city_repository;
        this.currency_read = currency_read;
    }
    async execute(external_id, body) {
        const patch = {};
        if (body.country_name !== undefined) {
            patch.country_name = body.country_name;
        }
        if (body.country_code !== undefined) {
            patch.country_code = body.country_code;
        }
        if (body.state_name !== undefined) {
            patch.state_name = body.state_name;
        }
        if (body.state_code !== undefined) {
            patch.state_code = body.state_code;
        }
        if (body.city_name !== undefined) {
            patch.city_name = body.city_name;
        }
        if (body.currency_external_id !== undefined) {
            const currency_id = await this.currency_read.find_internal_id_by_external_id(body.currency_external_id);
            if (currency_id === null) {
                throw new common_1.NotFoundException('currency not found');
            }
            patch.currency_id = currency_id;
        }
        try {
            const updated = await this.city_repository.update_by_external_id(external_id, patch);
            if (updated === null) {
                throw new common_1.NotFoundException('city not found');
            }
            return updated;
        }
        catch (err) {
            if (err instanceof common_1.NotFoundException) {
                throw err;
            }
            if ((0, pg_error_util_1.is_pg_unique_violation)(err)) {
                throw new common_1.ConflictException('city already exists for this location');
            }
            this.logger.error('update city failed');
            throw err;
        }
    }
};
exports.UpdateCityByExternalIdUseCase = UpdateCityByExternalIdUseCase;
exports.UpdateCityByExternalIdUseCase = UpdateCityByExternalIdUseCase = UpdateCityByExternalIdUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(transversal_tokens_1.CITY_REPOSITORY)),
    __param(1, (0, common_1.Inject)(transversal_tokens_1.CURRENCY_READ_PORT)),
    __metadata("design:paramtypes", [Object, Object])
], UpdateCityByExternalIdUseCase);


/***/ },

/***/ "./apps/transversal-ms/src/modules/transversal/application/use-cases/roles/create-role.use-case.ts"
/*!*********************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/transversal/application/use-cases/roles/create-role.use-case.ts ***!
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
var CreateRoleUseCase_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateRoleUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const transversal_tokens_1 = __webpack_require__(/*! @modules/transversal/transversal.tokens */ "./apps/transversal-ms/src/modules/transversal/transversal.tokens.ts");
const pg_error_util_1 = __webpack_require__(/*! @common/utils/pg-error.util */ "./apps/transversal-ms/src/common/utils/pg-error.util.ts");
let CreateRoleUseCase = CreateRoleUseCase_1 = class CreateRoleUseCase {
    role_repository;
    logger = new common_1.Logger(CreateRoleUseCase_1.name);
    constructor(role_repository) {
        this.role_repository = role_repository;
    }
    async execute(body) {
        try {
            const role = await this.role_repository.create({
                name: body.name,
                description: body.description,
            });
            return role;
        }
        catch (err) {
            if ((0, pg_error_util_1.is_pg_unique_violation)(err)) {
                throw new common_1.ConflictException('role already exists');
            }
            this.logger.error('create role failed');
            throw err;
        }
    }
};
exports.CreateRoleUseCase = CreateRoleUseCase;
exports.CreateRoleUseCase = CreateRoleUseCase = CreateRoleUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(transversal_tokens_1.ROLE_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], CreateRoleUseCase);


/***/ },

/***/ "./apps/transversal-ms/src/modules/transversal/application/use-cases/roles/delete-role-by-external-id.use-case.ts"
/*!************************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/transversal/application/use-cases/roles/delete-role-by-external-id.use-case.ts ***!
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
exports.DeleteRoleByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const transversal_tokens_1 = __webpack_require__(/*! @modules/transversal/transversal.tokens */ "./apps/transversal-ms/src/modules/transversal/transversal.tokens.ts");
let DeleteRoleByExternalIdUseCase = class DeleteRoleByExternalIdUseCase {
    role_repository;
    constructor(role_repository) {
        this.role_repository = role_repository;
    }
    async execute(external_id) {
        const deleted = await this.role_repository.delete_by_external_id(external_id);
        if (deleted) {
            return;
        }
        const exists = await this.role_repository.find_by_external_id(external_id);
        if (exists === null) {
            throw new common_1.NotFoundException('role not found');
        }
        throw new common_1.ConflictException('role is assigned to users');
    }
};
exports.DeleteRoleByExternalIdUseCase = DeleteRoleByExternalIdUseCase;
exports.DeleteRoleByExternalIdUseCase = DeleteRoleByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(transversal_tokens_1.ROLE_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], DeleteRoleByExternalIdUseCase);


/***/ },

/***/ "./apps/transversal-ms/src/modules/transversal/application/use-cases/roles/get-role-by-external-id.use-case.ts"
/*!*********************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/transversal/application/use-cases/roles/get-role-by-external-id.use-case.ts ***!
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
exports.GetRoleByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const transversal_tokens_1 = __webpack_require__(/*! @modules/transversal/transversal.tokens */ "./apps/transversal-ms/src/modules/transversal/transversal.tokens.ts");
let GetRoleByExternalIdUseCase = class GetRoleByExternalIdUseCase {
    role_repository;
    constructor(role_repository) {
        this.role_repository = role_repository;
    }
    async execute(external_id) {
        const role = await this.role_repository.find_by_external_id(external_id);
        if (role === null) {
            throw new common_1.NotFoundException('role not found');
        }
        return role;
    }
};
exports.GetRoleByExternalIdUseCase = GetRoleByExternalIdUseCase;
exports.GetRoleByExternalIdUseCase = GetRoleByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(transversal_tokens_1.ROLE_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], GetRoleByExternalIdUseCase);


/***/ },

/***/ "./apps/transversal-ms/src/modules/transversal/application/use-cases/roles/list-roles.use-case.ts"
/*!********************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/transversal/application/use-cases/roles/list-roles.use-case.ts ***!
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
exports.ListRolesUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const transversal_tokens_1 = __webpack_require__(/*! @modules/transversal/transversal.tokens */ "./apps/transversal-ms/src/modules/transversal/transversal.tokens.ts");
let ListRolesUseCase = class ListRolesUseCase {
    role_repository;
    constructor(role_repository) {
        this.role_repository = role_repository;
    }
    async execute(query) {
        const { items, total } = await this.role_repository.list(query);
        return {
            items,
            total,
            page: query.page,
            limit: query.limit,
        };
    }
};
exports.ListRolesUseCase = ListRolesUseCase;
exports.ListRolesUseCase = ListRolesUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(transversal_tokens_1.ROLE_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], ListRolesUseCase);


/***/ },

/***/ "./apps/transversal-ms/src/modules/transversal/application/use-cases/roles/update-role-by-external-id.use-case.ts"
/*!************************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/transversal/application/use-cases/roles/update-role-by-external-id.use-case.ts ***!
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
var UpdateRoleByExternalIdUseCase_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateRoleByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const transversal_tokens_1 = __webpack_require__(/*! @modules/transversal/transversal.tokens */ "./apps/transversal-ms/src/modules/transversal/transversal.tokens.ts");
const pg_error_util_1 = __webpack_require__(/*! @common/utils/pg-error.util */ "./apps/transversal-ms/src/common/utils/pg-error.util.ts");
let UpdateRoleByExternalIdUseCase = UpdateRoleByExternalIdUseCase_1 = class UpdateRoleByExternalIdUseCase {
    role_repository;
    logger = new common_1.Logger(UpdateRoleByExternalIdUseCase_1.name);
    constructor(role_repository) {
        this.role_repository = role_repository;
    }
    async execute(external_id, patch) {
        try {
            const updated = await this.role_repository.update_by_external_id(external_id, patch);
            if (updated === null) {
                throw new common_1.NotFoundException('role not found');
            }
            return updated;
        }
        catch (err) {
            if (err instanceof common_1.NotFoundException) {
                throw err;
            }
            if ((0, pg_error_util_1.is_pg_unique_violation)(err)) {
                throw new common_1.ConflictException('role name already exists');
            }
            this.logger.error('update role failed');
            throw err;
        }
    }
};
exports.UpdateRoleByExternalIdUseCase = UpdateRoleByExternalIdUseCase;
exports.UpdateRoleByExternalIdUseCase = UpdateRoleByExternalIdUseCase = UpdateRoleByExternalIdUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(transversal_tokens_1.ROLE_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], UpdateRoleByExternalIdUseCase);


/***/ },

/***/ "./apps/transversal-ms/src/modules/transversal/application/use-cases/statuses/create-status.use-case.ts"
/*!**************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/transversal/application/use-cases/statuses/create-status.use-case.ts ***!
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
var CreateStatusUseCase_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateStatusUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const transversal_tokens_1 = __webpack_require__(/*! @modules/transversal/transversal.tokens */ "./apps/transversal-ms/src/modules/transversal/transversal.tokens.ts");
const pg_error_util_1 = __webpack_require__(/*! @common/utils/pg-error.util */ "./apps/transversal-ms/src/common/utils/pg-error.util.ts");
let CreateStatusUseCase = CreateStatusUseCase_1 = class CreateStatusUseCase {
    status_repository;
    logger = new common_1.Logger(CreateStatusUseCase_1.name);
    constructor(status_repository) {
        this.status_repository = status_repository;
    }
    async execute(body) {
        try {
            return await this.status_repository.create({
                entity_type: body.entity_type,
                code: body.code,
                display_name: body.display_name,
                description: body.description,
                is_active: body.is_active,
            });
        }
        catch (err) {
            if ((0, pg_error_util_1.is_pg_unique_violation)(err)) {
                throw new common_1.ConflictException('status already exists for this entity_type and code');
            }
            this.logger.error('create status failed');
            throw err;
        }
    }
};
exports.CreateStatusUseCase = CreateStatusUseCase;
exports.CreateStatusUseCase = CreateStatusUseCase = CreateStatusUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(transversal_tokens_1.STATUS_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], CreateStatusUseCase);


/***/ },

/***/ "./apps/transversal-ms/src/modules/transversal/application/use-cases/statuses/delete-status-by-external-id.use-case.ts"
/*!*****************************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/transversal/application/use-cases/statuses/delete-status-by-external-id.use-case.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeleteStatusByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const transversal_tokens_1 = __webpack_require__(/*! @modules/transversal/transversal.tokens */ "./apps/transversal-ms/src/modules/transversal/transversal.tokens.ts");
let DeleteStatusByExternalIdUseCase = class DeleteStatusByExternalIdUseCase {
    status_repository;
    constructor(status_repository) {
        this.status_repository = status_repository;
    }
    async execute(external_id) {
        const deleted = await this.status_repository.delete_by_external_id(external_id);
        if (deleted) {
            return;
        }
        const exists = await this.status_repository.find_by_external_id(external_id);
        if (exists === null) {
            throw new common_1.NotFoundException('status not found');
        }
        throw new common_1.ConflictException('status is referenced by users, applications or other operational data');
    }
};
exports.DeleteStatusByExternalIdUseCase = DeleteStatusByExternalIdUseCase;
exports.DeleteStatusByExternalIdUseCase = DeleteStatusByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(transversal_tokens_1.STATUS_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], DeleteStatusByExternalIdUseCase);


/***/ },

/***/ "./apps/transversal-ms/src/modules/transversal/application/use-cases/statuses/get-status-by-external-id.use-case.ts"
/*!**************************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/transversal/application/use-cases/statuses/get-status-by-external-id.use-case.ts ***!
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
exports.GetStatusByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const transversal_tokens_1 = __webpack_require__(/*! @modules/transversal/transversal.tokens */ "./apps/transversal-ms/src/modules/transversal/transversal.tokens.ts");
let GetStatusByExternalIdUseCase = class GetStatusByExternalIdUseCase {
    status_repository;
    constructor(status_repository) {
        this.status_repository = status_repository;
    }
    async execute(external_id) {
        const row = await this.status_repository.find_by_external_id(external_id);
        if (row === null) {
            throw new common_1.NotFoundException('status not found');
        }
        return row;
    }
};
exports.GetStatusByExternalIdUseCase = GetStatusByExternalIdUseCase;
exports.GetStatusByExternalIdUseCase = GetStatusByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(transversal_tokens_1.STATUS_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], GetStatusByExternalIdUseCase);


/***/ },

/***/ "./apps/transversal-ms/src/modules/transversal/application/use-cases/statuses/list-statuses.use-case.ts"
/*!**************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/transversal/application/use-cases/statuses/list-statuses.use-case.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListStatusesUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const transversal_tokens_1 = __webpack_require__(/*! @modules/transversal/transversal.tokens */ "./apps/transversal-ms/src/modules/transversal/transversal.tokens.ts");
let ListStatusesUseCase = class ListStatusesUseCase {
    status_repository;
    constructor(status_repository) {
        this.status_repository = status_repository;
    }
    async execute(query) {
        const { items, total } = await this.status_repository.list(query);
        const unpaged = query.page === undefined && query.limit === undefined;
        const page = unpaged ? 1 : (query.page ?? 1);
        const limit = unpaged ? total : (query.limit ?? 20);
        return {
            items,
            total,
            page,
            limit,
        };
    }
};
exports.ListStatusesUseCase = ListStatusesUseCase;
exports.ListStatusesUseCase = ListStatusesUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(transversal_tokens_1.STATUS_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], ListStatusesUseCase);


/***/ },

/***/ "./apps/transversal-ms/src/modules/transversal/application/use-cases/statuses/update-status-by-external-id.use-case.ts"
/*!*****************************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/transversal/application/use-cases/statuses/update-status-by-external-id.use-case.ts ***!
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
var UpdateStatusByExternalIdUseCase_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateStatusByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const transversal_tokens_1 = __webpack_require__(/*! @modules/transversal/transversal.tokens */ "./apps/transversal-ms/src/modules/transversal/transversal.tokens.ts");
const pg_error_util_1 = __webpack_require__(/*! @common/utils/pg-error.util */ "./apps/transversal-ms/src/common/utils/pg-error.util.ts");
let UpdateStatusByExternalIdUseCase = UpdateStatusByExternalIdUseCase_1 = class UpdateStatusByExternalIdUseCase {
    status_repository;
    logger = new common_1.Logger(UpdateStatusByExternalIdUseCase_1.name);
    constructor(status_repository) {
        this.status_repository = status_repository;
    }
    async execute(external_id, body) {
        const patch = {};
        if (body.entity_type !== undefined) {
            patch.entity_type = body.entity_type;
        }
        if (body.code !== undefined) {
            patch.code = body.code;
        }
        if (body.display_name !== undefined) {
            patch.display_name = body.display_name;
        }
        if (body.description !== undefined) {
            patch.description = body.description;
        }
        if (body.is_active !== undefined) {
            patch.is_active = body.is_active;
        }
        try {
            const updated = await this.status_repository.update_by_external_id(external_id, patch);
            if (updated === null) {
                throw new common_1.NotFoundException('status not found');
            }
            return updated;
        }
        catch (err) {
            if (err instanceof common_1.NotFoundException) {
                throw err;
            }
            if ((0, pg_error_util_1.is_pg_unique_violation)(err)) {
                throw new common_1.ConflictException('status already exists for this entity_type and code');
            }
            this.logger.error('update status failed');
            throw err;
        }
    }
};
exports.UpdateStatusByExternalIdUseCase = UpdateStatusByExternalIdUseCase;
exports.UpdateStatusByExternalIdUseCase = UpdateStatusByExternalIdUseCase = UpdateStatusByExternalIdUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(transversal_tokens_1.STATUS_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], UpdateStatusByExternalIdUseCase);


/***/ },

/***/ "./apps/transversal-ms/src/modules/transversal/application/use-cases/upload-files/ingest-upload-files-sqs-message.use-case.ts"
/*!************************************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/transversal/application/use-cases/upload-files/ingest-upload-files-sqs-message.use-case.ts ***!
  \************************************************************************************************************************************/
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
const upload_files_inbound_dto_1 = __webpack_require__(/*! ../../dto/upload-files-inbound.dto */ "./apps/transversal-ms/src/modules/transversal/application/dto/upload-files-inbound.dto.ts");
const upload_files_use_case_1 = __webpack_require__(/*! ./upload-files.use-case */ "./apps/transversal-ms/src/modules/transversal/application/use-cases/upload-files/upload-files.use-case.ts");
const upload_files_validation_error_1 = __webpack_require__(/*! ../../exceptions/upload-files.validation.error */ "./apps/transversal-ms/src/modules/transversal/application/exceptions/upload-files.validation.error.ts");
const storage_error_1 = __webpack_require__(/*! @modules/transversal/domain/errors/storage.error */ "./apps/transversal-ms/src/modules/transversal/domain/errors/storage.error.ts");
const transversal_tokens_1 = __webpack_require__(/*! @modules/transversal/transversal.tokens */ "./apps/transversal-ms/src/modules/transversal/transversal.tokens.ts");
let IngestUploadFilesSqsMessageUseCase = IngestUploadFilesSqsMessageUseCase_1 = class IngestUploadFilesSqsMessageUseCase {
    upload_files;
    publish_files_uploaded;
    idempotency;
    logger = new common_1.Logger(IngestUploadFilesSqsMessageUseCase_1.name);
    constructor(upload_files, publish_files_uploaded, idempotency) {
        this.upload_files = upload_files;
        this.publish_files_uploaded = publish_files_uploaded;
        this.idempotency = idempotency;
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
    storage;
    remote_fetch;
    logger = new common_1.Logger(UploadFilesUseCase_1.name);
    constructor(storage, remote_fetch) {
        this.storage = storage;
        this.remote_fetch = remote_fetch;
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
    code;
    cause;
    constructor(code, message, cause) {
        super(message);
        this.code = code;
        this.cause = cause;
        this.name = 'StorageDomainError';
    }
}
exports.StorageDomainError = StorageDomainError;


/***/ },

/***/ "./apps/transversal-ms/src/modules/transversal/presentation/cities.controller.ts"
/*!***************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/transversal/presentation/cities.controller.ts ***!
  \***************************************************************************************/
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CitiesController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const create_city_use_case_1 = __webpack_require__(/*! @modules/transversal/application/use-cases/cities/create-city.use-case */ "./apps/transversal-ms/src/modules/transversal/application/use-cases/cities/create-city.use-case.ts");
const get_city_by_external_id_use_case_1 = __webpack_require__(/*! @modules/transversal/application/use-cases/cities/get-city-by-external-id.use-case */ "./apps/transversal-ms/src/modules/transversal/application/use-cases/cities/get-city-by-external-id.use-case.ts");
const list_cities_use_case_1 = __webpack_require__(/*! @modules/transversal/application/use-cases/cities/list-cities.use-case */ "./apps/transversal-ms/src/modules/transversal/application/use-cases/cities/list-cities.use-case.ts");
const list_distinct_countries_use_case_1 = __webpack_require__(/*! @modules/transversal/application/use-cases/cities/list-distinct-countries.use-case */ "./apps/transversal-ms/src/modules/transversal/application/use-cases/cities/list-distinct-countries.use-case.ts");
const update_city_by_external_id_use_case_1 = __webpack_require__(/*! @modules/transversal/application/use-cases/cities/update-city-by-external-id.use-case */ "./apps/transversal-ms/src/modules/transversal/application/use-cases/cities/update-city-by-external-id.use-case.ts");
const delete_city_by_external_id_use_case_1 = __webpack_require__(/*! @modules/transversal/application/use-cases/cities/delete-city-by-external-id.use-case */ "./apps/transversal-ms/src/modules/transversal/application/use-cases/cities/delete-city-by-external-id.use-case.ts");
const cities_api_dto_1 = __webpack_require__(/*! ./dto/cities.api.dto */ "./apps/transversal-ms/src/modules/transversal/presentation/dto/cities.api.dto.ts");
const catalog_response_mappers_1 = __webpack_require__(/*! ./mappers/catalog-response.mappers */ "./apps/transversal-ms/src/modules/transversal/presentation/mappers/catalog-response.mappers.ts");
let CitiesController = class CitiesController {
    create_city;
    get_city;
    list_cities;
    list_countries;
    update_city;
    delete_city;
    constructor(create_city, get_city, list_cities, list_countries, update_city, delete_city) {
        this.create_city = create_city;
        this.get_city = get_city;
        this.list_cities = list_cities;
        this.list_countries = list_countries;
        this.update_city = update_city;
        this.delete_city = delete_city;
    }
    async create(body) {
        const city = await this.create_city.execute({
            country_name: body.countryName,
            country_code: body.countryCode,
            state_name: body.stateName,
            state_code: body.stateCode ?? null,
            city_name: body.cityName,
            currency_external_id: body.currencyExternalId,
        });
        return (0, catalog_response_mappers_1.to_city_response_dto)(city);
    }
    async list(query) {
        const result = await this.list_cities.execute({
            page: query.page,
            limit: query.limit,
            country_code: query.countryCode,
            state_name: query.stateName,
            city_name_contains: query.cityNameContains,
        });
        return {
            items: result.items.map((c) => (0, catalog_response_mappers_1.to_city_response_dto)(c)),
            total: result.total,
            page: result.page,
            limit: result.limit,
        };
    }
    async list_countries_endpoint(query) {
        const rows = await this.list_countries.execute({
            country_name_contains: query.countryNameContains,
        });
        return rows.map((r) => ({
            countryName: r.country_name,
            countryCode: r.country_code,
        }));
    }
    async get(external_id) {
        const city = await this.get_city.execute(external_id);
        return (0, catalog_response_mappers_1.to_city_response_dto)(city);
    }
    async update(external_id, body) {
        const payload = {};
        if (body.countryName !== undefined) {
            payload.country_name = body.countryName;
        }
        if (body.countryCode !== undefined) {
            payload.country_code = body.countryCode;
        }
        if (body.stateName !== undefined) {
            payload.state_name = body.stateName;
        }
        if (body.stateCode !== undefined) {
            payload.state_code = body.stateCode;
        }
        if (body.cityName !== undefined) {
            payload.city_name = body.cityName;
        }
        if (body.currencyExternalId !== undefined) {
            payload.currency_external_id = body.currencyExternalId;
        }
        const city = await this.update_city.execute(external_id, payload);
        return (0, catalog_response_mappers_1.to_city_response_dto)(city);
    }
    async remove(external_id) {
        await this.delete_city.execute(external_id);
    }
};
exports.CitiesController = CitiesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear ciudad' }),
    (0, swagger_1.ApiCreatedResponse)({ type: cities_api_dto_1.CityResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof cities_api_dto_1.CreateCityBodyDto !== "undefined" && cities_api_dto_1.CreateCityBodyDto) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], CitiesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar ciudades (paginado, filtros opcionales)' }),
    (0, swagger_1.ApiOkResponse)({ type: cities_api_dto_1.PaginatedCitiesResponseDto }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof cities_api_dto_1.ListCitiesQueryDto !== "undefined" && cities_api_dto_1.ListCitiesQueryDto) === "function" ? _j : Object]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], CitiesController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('countries'),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar países del catálogo (sin repetir nombre)',
        description: 'Deriva países únicos (`country_name` + `country_code`) desde `transversal_schema.cities`. Opcionalmente filtra por subcadena del nombre del país.',
    }),
    (0, swagger_1.ApiOkResponse)({ type: [cities_api_dto_1.CountryCatalogItemDto] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof cities_api_dto_1.ListCountriesQueryDto !== "undefined" && cities_api_dto_1.ListCountriesQueryDto) === "function" ? _l : Object]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], CitiesController.prototype, "list_countries_endpoint", null);
__decorate([
    (0, common_1.Get)(':external_id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener ciudad por external_id (UUID)' }),
    (0, swagger_1.ApiOkResponse)({ type: cities_api_dto_1.CityResponseDto }),
    __param(0, (0, common_1.Param)('external_id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
], CitiesController.prototype, "get", null);
__decorate([
    (0, common_1.Patch)(':external_id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar ciudad por external_id' }),
    (0, swagger_1.ApiOkResponse)({ type: cities_api_dto_1.CityResponseDto }),
    __param(0, (0, common_1.Param)('external_id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_p = typeof cities_api_dto_1.UpdateCityBodyDto !== "undefined" && cities_api_dto_1.UpdateCityBodyDto) === "function" ? _p : Object]),
    __metadata("design:returntype", typeof (_q = typeof Promise !== "undefined" && Promise) === "function" ? _q : Object)
], CitiesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':external_id'),
    (0, common_1.HttpCode)(204),
    (0, swagger_1.ApiOperation)({
        summary: 'Eliminar ciudad si no está referenciada por personas ni negocios',
    }),
    (0, swagger_1.ApiNoContentResponse)(),
    __param(0, (0, common_1.Param)('external_id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_r = typeof Promise !== "undefined" && Promise) === "function" ? _r : Object)
], CitiesController.prototype, "remove", null);
exports.CitiesController = CitiesController = __decorate([
    (0, swagger_1.ApiTags)('cities'),
    (0, common_1.Controller)('v1/cities'),
    __metadata("design:paramtypes", [typeof (_a = typeof create_city_use_case_1.CreateCityUseCase !== "undefined" && create_city_use_case_1.CreateCityUseCase) === "function" ? _a : Object, typeof (_b = typeof get_city_by_external_id_use_case_1.GetCityByExternalIdUseCase !== "undefined" && get_city_by_external_id_use_case_1.GetCityByExternalIdUseCase) === "function" ? _b : Object, typeof (_c = typeof list_cities_use_case_1.ListCitiesUseCase !== "undefined" && list_cities_use_case_1.ListCitiesUseCase) === "function" ? _c : Object, typeof (_d = typeof list_distinct_countries_use_case_1.ListDistinctCountriesUseCase !== "undefined" && list_distinct_countries_use_case_1.ListDistinctCountriesUseCase) === "function" ? _d : Object, typeof (_e = typeof update_city_by_external_id_use_case_1.UpdateCityByExternalIdUseCase !== "undefined" && update_city_by_external_id_use_case_1.UpdateCityByExternalIdUseCase) === "function" ? _e : Object, typeof (_f = typeof delete_city_by_external_id_use_case_1.DeleteCityByExternalIdUseCase !== "undefined" && delete_city_by_external_id_use_case_1.DeleteCityByExternalIdUseCase) === "function" ? _f : Object])
], CitiesController);


/***/ },

/***/ "./apps/transversal-ms/src/modules/transversal/presentation/dto/cities.api.dto.ts"
/*!****************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/transversal/presentation/dto/cities.api.dto.ts ***!
  \****************************************************************************************/
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
exports.ListCitiesQueryDto = exports.CountryCatalogItemDto = exports.ListCountriesQueryDto = exports.UpdateCityBodyDto = exports.CreateCityBodyDto = exports.PaginatedCitiesResponseDto = exports.CityResponseDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CityResponseDto {
    externalId;
    countryName;
    countryCode;
    stateName;
    stateCode;
    cityName;
    currencyExternalId;
}
exports.CityResponseDto = CityResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Identificador público de la ciudad (UUID). El id bigint interno no se expone.',
        format: 'uuid',
    }),
    __metadata("design:type", String)
], CityResponseDto.prototype, "externalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CityResponseDto.prototype, "countryName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ISO 3166-1 alpha-2' }),
    __metadata("design:type", String)
], CityResponseDto.prototype, "countryCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CityResponseDto.prototype, "stateName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], CityResponseDto.prototype, "stateCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CityResponseDto.prototype, "cityName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'UUID de la moneda en transversal_schema.currencies.',
        format: 'uuid',
    }),
    __metadata("design:type", String)
], CityResponseDto.prototype, "currencyExternalId", void 0);
class PaginatedCitiesResponseDto {
    items;
    total;
    page;
    limit;
}
exports.PaginatedCitiesResponseDto = PaginatedCitiesResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [CityResponseDto] }),
    __metadata("design:type", Array)
], PaginatedCitiesResponseDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginatedCitiesResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginatedCitiesResponseDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginatedCitiesResponseDto.prototype, "limit", void 0);
class CreateCityBodyDto {
    countryName;
    countryCode;
    stateName;
    stateCode;
    cityName;
    currencyExternalId;
}
exports.CreateCityBodyDto = CreateCityBodyDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], CreateCityBodyDto.prototype, "countryName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 2),
    (0, class_validator_1.Matches)(/^[A-Z]{2}$/),
    __metadata("design:type", String)
], CreateCityBodyDto.prototype, "countryCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], CreateCityBodyDto.prototype, "stateName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 3),
    (0, class_validator_1.Matches)(/^[A-Z0-9]{2,3}$/),
    __metadata("design:type", Object)
], CreateCityBodyDto.prototype, "stateCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], CreateCityBodyDto.prototype, "cityName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", String)
], CreateCityBodyDto.prototype, "currencyExternalId", void 0);
class UpdateCityBodyDto extends (0, swagger_1.PartialType)(CreateCityBodyDto) {
}
exports.UpdateCityBodyDto = UpdateCityBodyDto;
class ListCountriesQueryDto {
    countryNameContains;
}
exports.ListCountriesQueryDto = ListCountriesQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filtra países cuyo nombre contiene esta subcadena (insensible a mayúsculas).',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], ListCountriesQueryDto.prototype, "countryNameContains", void 0);
class CountryCatalogItemDto {
    countryName;
    countryCode;
}
exports.CountryCatalogItemDto = CountryCatalogItemDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CountryCatalogItemDto.prototype, "countryName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ISO 3166-1 alpha-2' }),
    __metadata("design:type", String)
], CountryCatalogItemDto.prototype, "countryCode", void 0);
class ListCitiesQueryDto {
    page;
    limit;
    countryCode;
    stateName;
    cityNameContains;
}
exports.ListCitiesQueryDto = ListCitiesQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Si no se envían `page` ni `limit`, se devuelven todas las ciudades que cumplan los filtros.',
        minimum: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ListCitiesQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 1, maximum: 100 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], ListCitiesQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 2),
    (0, class_validator_1.Matches)(/^[A-Z]{2}$/),
    __metadata("design:type", String)
], ListCitiesQueryDto.prototype, "countryCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], ListCitiesQueryDto.prototype, "stateName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], ListCitiesQueryDto.prototype, "cityNameContains", void 0);


/***/ },

/***/ "./apps/transversal-ms/src/modules/transversal/presentation/dto/roles.api.dto.ts"
/*!***************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/transversal/presentation/dto/roles.api.dto.ts ***!
  \***************************************************************************************/
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
exports.ListRolesQueryDto = exports.UpdateRoleBodyDto = exports.CreateRoleBodyDto = exports.PaginatedRolesResponseDto = exports.RoleResponseDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
class RoleResponseDto {
    externalId;
    name;
    description;
}
exports.RoleResponseDto = RoleResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Identificador público (UUID). Se usa en API; el id numérico interno no se expone.',
        format: 'uuid',
    }),
    __metadata("design:type", String)
], RoleResponseDto.prototype, "externalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: shared_1.Roles }),
    __metadata("design:type", typeof (_a = typeof shared_1.Roles !== "undefined" && shared_1.Roles) === "function" ? _a : Object)
], RoleResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], RoleResponseDto.prototype, "description", void 0);
class PaginatedRolesResponseDto {
    items;
    total;
    page;
    limit;
}
exports.PaginatedRolesResponseDto = PaginatedRolesResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [RoleResponseDto] }),
    __metadata("design:type", Array)
], PaginatedRolesResponseDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginatedRolesResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginatedRolesResponseDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginatedRolesResponseDto.prototype, "limit", void 0);
class CreateRoleBodyDto {
    name;
    description;
}
exports.CreateRoleBodyDto = CreateRoleBodyDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: shared_1.Roles }),
    (0, class_validator_1.IsEnum)(shared_1.Roles),
    __metadata("design:type", typeof (_b = typeof shared_1.Roles !== "undefined" && shared_1.Roles) === "function" ? _b : Object)
], CreateRoleBodyDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateRoleBodyDto.prototype, "description", void 0);
class UpdateRoleBodyDto extends (0, swagger_1.PartialType)(CreateRoleBodyDto) {
}
exports.UpdateRoleBodyDto = UpdateRoleBodyDto;
class ListRolesQueryDto {
    page = 1;
    limit = 20;
    nameContains;
}
exports.ListRolesQueryDto = ListRolesQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 1, minimum: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ListRolesQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 20, minimum: 1, maximum: 100 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], ListRolesQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(80),
    __metadata("design:type", String)
], ListRolesQueryDto.prototype, "nameContains", void 0);


/***/ },

/***/ "./apps/transversal-ms/src/modules/transversal/presentation/dto/statuses.api.dto.ts"
/*!******************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/transversal/presentation/dto/statuses.api.dto.ts ***!
  \******************************************************************************************/
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
exports.ListStatusesQueryDto = exports.UpdateStatusBodyDto = exports.CreateStatusBodyDto = exports.PaginatedStatusesResponseDto = exports.StatusResponseDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class StatusResponseDto {
    externalId;
    entityType;
    code;
    displayName;
    description;
    isActive;
}
exports.StatusResponseDto = StatusResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], StatusResponseDto.prototype, "externalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StatusResponseDto.prototype, "entityType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StatusResponseDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StatusResponseDto.prototype, "displayName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], StatusResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], StatusResponseDto.prototype, "isActive", void 0);
class PaginatedStatusesResponseDto {
    items;
    total;
    page;
    limit;
}
exports.PaginatedStatusesResponseDto = PaginatedStatusesResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [StatusResponseDto] }),
    __metadata("design:type", Array)
], PaginatedStatusesResponseDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginatedStatusesResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginatedStatusesResponseDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginatedStatusesResponseDto.prototype, "limit", void 0);
class CreateStatusBodyDto {
    entityType;
    code;
    displayName;
    description;
    isActive;
}
exports.CreateStatusBodyDto = CreateStatusBodyDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateStatusBodyDto.prototype, "entityType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateStatusBodyDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateStatusBodyDto.prototype, "displayName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateStatusBodyDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateStatusBodyDto.prototype, "isActive", void 0);
class UpdateStatusBodyDto extends (0, swagger_1.PartialType)(CreateStatusBodyDto) {
}
exports.UpdateStatusBodyDto = UpdateStatusBodyDto;
class ListStatusesQueryDto {
    page;
    limit;
    entityType;
    codeContains;
    displayNameContains;
    isActive;
}
exports.ListStatusesQueryDto = ListStatusesQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Si no se envían `page` ni `limit`, se devuelven todos los estados que cumplan los filtros.',
        minimum: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ListStatusesQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 1, maximum: 100 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], ListStatusesQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], ListStatusesQueryDto.prototype, "entityType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], ListStatusesQueryDto.prototype, "codeContains", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], ListStatusesQueryDto.prototype, "displayNameContains", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === undefined || value === '') {
            return undefined;
        }
        if (value === true || value === 'true') {
            return true;
        }
        if (value === false || value === 'false') {
            return false;
        }
        return undefined;
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ListStatusesQueryDto.prototype, "isActive", void 0);


/***/ },

/***/ "./apps/transversal-ms/src/modules/transversal/presentation/mappers/catalog-response.mappers.ts"
/*!******************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/transversal/presentation/mappers/catalog-response.mappers.ts ***!
  \******************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.to_role_response_dto = to_role_response_dto;
exports.to_city_response_dto = to_city_response_dto;
exports.to_status_response_dto = to_status_response_dto;
function to_role_response_dto(role) {
    return {
        externalId: role.external_id,
        name: role.name,
        description: role.description,
    };
}
function to_city_response_dto(city) {
    return {
        externalId: city.external_id,
        countryName: city.country_name,
        countryCode: city.country_code,
        stateName: city.state_name,
        stateCode: city.state_code,
        cityName: city.city_name,
        currencyExternalId: city.currency_external_id,
    };
}
function to_status_response_dto(row) {
    return {
        externalId: row.external_id,
        entityType: row.entity_type,
        code: row.code,
        displayName: row.display_name,
        description: row.description,
        isActive: row.is_active,
    };
}


/***/ },

/***/ "./apps/transversal-ms/src/modules/transversal/presentation/roles.controller.ts"
/*!**************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/transversal/presentation/roles.controller.ts ***!
  \**************************************************************************************/
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
exports.RolesController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const create_role_use_case_1 = __webpack_require__(/*! @modules/transversal/application/use-cases/roles/create-role.use-case */ "./apps/transversal-ms/src/modules/transversal/application/use-cases/roles/create-role.use-case.ts");
const get_role_by_external_id_use_case_1 = __webpack_require__(/*! @modules/transversal/application/use-cases/roles/get-role-by-external-id.use-case */ "./apps/transversal-ms/src/modules/transversal/application/use-cases/roles/get-role-by-external-id.use-case.ts");
const list_roles_use_case_1 = __webpack_require__(/*! @modules/transversal/application/use-cases/roles/list-roles.use-case */ "./apps/transversal-ms/src/modules/transversal/application/use-cases/roles/list-roles.use-case.ts");
const update_role_by_external_id_use_case_1 = __webpack_require__(/*! @modules/transversal/application/use-cases/roles/update-role-by-external-id.use-case */ "./apps/transversal-ms/src/modules/transversal/application/use-cases/roles/update-role-by-external-id.use-case.ts");
const delete_role_by_external_id_use_case_1 = __webpack_require__(/*! @modules/transversal/application/use-cases/roles/delete-role-by-external-id.use-case */ "./apps/transversal-ms/src/modules/transversal/application/use-cases/roles/delete-role-by-external-id.use-case.ts");
const roles_api_dto_1 = __webpack_require__(/*! ./dto/roles.api.dto */ "./apps/transversal-ms/src/modules/transversal/presentation/dto/roles.api.dto.ts");
const catalog_response_mappers_1 = __webpack_require__(/*! ./mappers/catalog-response.mappers */ "./apps/transversal-ms/src/modules/transversal/presentation/mappers/catalog-response.mappers.ts");
let RolesController = class RolesController {
    create_role;
    get_role;
    list_roles;
    update_role;
    delete_role;
    constructor(create_role, get_role, list_roles, update_role, delete_role) {
        this.create_role = create_role;
        this.get_role = get_role;
        this.list_roles = list_roles;
        this.update_role = update_role;
        this.delete_role = delete_role;
    }
    async create(body) {
        const role = await this.create_role.execute({
            name: body.name,
            description: body.description ?? null,
        });
        return (0, catalog_response_mappers_1.to_role_response_dto)(role);
    }
    async list(query) {
        const result = await this.list_roles.execute({
            page: query.page,
            limit: query.limit,
            name_contains: query.nameContains,
        });
        return {
            items: result.items.map((r) => (0, catalog_response_mappers_1.to_role_response_dto)(r)),
            total: result.total,
            page: result.page,
            limit: result.limit,
        };
    }
    async get(external_id) {
        const role = await this.get_role.execute(external_id);
        return (0, catalog_response_mappers_1.to_role_response_dto)(role);
    }
    async update(external_id, body) {
        const patch = {};
        if (body.name !== undefined) {
            patch.name = body.name;
        }
        if (body.description !== undefined) {
            patch.description = body.description;
        }
        const role = await this.update_role.execute(external_id, patch);
        return (0, catalog_response_mappers_1.to_role_response_dto)(role);
    }
    async remove(external_id) {
        await this.delete_role.execute(external_id);
    }
};
exports.RolesController = RolesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear rol' }),
    (0, swagger_1.ApiCreatedResponse)({ type: roles_api_dto_1.RoleResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof roles_api_dto_1.CreateRoleBodyDto !== "undefined" && roles_api_dto_1.CreateRoleBodyDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], RolesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar roles (paginado)' }),
    (0, swagger_1.ApiOkResponse)({ type: roles_api_dto_1.PaginatedRolesResponseDto }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof roles_api_dto_1.ListRolesQueryDto !== "undefined" && roles_api_dto_1.ListRolesQueryDto) === "function" ? _h : Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], RolesController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':external_id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener rol por external_id (UUID)' }),
    (0, swagger_1.ApiOkResponse)({ type: roles_api_dto_1.RoleResponseDto }),
    __param(0, (0, common_1.Param)('external_id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], RolesController.prototype, "get", null);
__decorate([
    (0, common_1.Patch)(':external_id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar rol por external_id' }),
    (0, swagger_1.ApiOkResponse)({ type: roles_api_dto_1.RoleResponseDto }),
    __param(0, (0, common_1.Param)('external_id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_l = typeof roles_api_dto_1.UpdateRoleBodyDto !== "undefined" && roles_api_dto_1.UpdateRoleBodyDto) === "function" ? _l : Object]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], RolesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':external_id'),
    (0, common_1.HttpCode)(204),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar rol (si no está asignado a usuarios)' }),
    (0, swagger_1.ApiNoContentResponse)(),
    __param(0, (0, common_1.Param)('external_id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
], RolesController.prototype, "remove", null);
exports.RolesController = RolesController = __decorate([
    (0, swagger_1.ApiTags)('roles'),
    (0, common_1.Controller)('v1/roles'),
    __metadata("design:paramtypes", [typeof (_a = typeof create_role_use_case_1.CreateRoleUseCase !== "undefined" && create_role_use_case_1.CreateRoleUseCase) === "function" ? _a : Object, typeof (_b = typeof get_role_by_external_id_use_case_1.GetRoleByExternalIdUseCase !== "undefined" && get_role_by_external_id_use_case_1.GetRoleByExternalIdUseCase) === "function" ? _b : Object, typeof (_c = typeof list_roles_use_case_1.ListRolesUseCase !== "undefined" && list_roles_use_case_1.ListRolesUseCase) === "function" ? _c : Object, typeof (_d = typeof update_role_by_external_id_use_case_1.UpdateRoleByExternalIdUseCase !== "undefined" && update_role_by_external_id_use_case_1.UpdateRoleByExternalIdUseCase) === "function" ? _d : Object, typeof (_e = typeof delete_role_by_external_id_use_case_1.DeleteRoleByExternalIdUseCase !== "undefined" && delete_role_by_external_id_use_case_1.DeleteRoleByExternalIdUseCase) === "function" ? _e : Object])
], RolesController);


/***/ },

/***/ "./apps/transversal-ms/src/modules/transversal/presentation/statuses.controller.ts"
/*!*****************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/transversal/presentation/statuses.controller.ts ***!
  \*****************************************************************************************/
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StatusesController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const create_status_use_case_1 = __webpack_require__(/*! @modules/transversal/application/use-cases/statuses/create-status.use-case */ "./apps/transversal-ms/src/modules/transversal/application/use-cases/statuses/create-status.use-case.ts");
const get_status_by_external_id_use_case_1 = __webpack_require__(/*! @modules/transversal/application/use-cases/statuses/get-status-by-external-id.use-case */ "./apps/transversal-ms/src/modules/transversal/application/use-cases/statuses/get-status-by-external-id.use-case.ts");
const list_statuses_use_case_1 = __webpack_require__(/*! @modules/transversal/application/use-cases/statuses/list-statuses.use-case */ "./apps/transversal-ms/src/modules/transversal/application/use-cases/statuses/list-statuses.use-case.ts");
const update_status_by_external_id_use_case_1 = __webpack_require__(/*! @modules/transversal/application/use-cases/statuses/update-status-by-external-id.use-case */ "./apps/transversal-ms/src/modules/transversal/application/use-cases/statuses/update-status-by-external-id.use-case.ts");
const delete_status_by_external_id_use_case_1 = __webpack_require__(/*! @modules/transversal/application/use-cases/statuses/delete-status-by-external-id.use-case */ "./apps/transversal-ms/src/modules/transversal/application/use-cases/statuses/delete-status-by-external-id.use-case.ts");
const statuses_api_dto_1 = __webpack_require__(/*! ./dto/statuses.api.dto */ "./apps/transversal-ms/src/modules/transversal/presentation/dto/statuses.api.dto.ts");
const catalog_response_mappers_1 = __webpack_require__(/*! ./mappers/catalog-response.mappers */ "./apps/transversal-ms/src/modules/transversal/presentation/mappers/catalog-response.mappers.ts");
let StatusesController = class StatusesController {
    create_status;
    get_status;
    list_statuses;
    update_status;
    delete_status;
    constructor(create_status, get_status, list_statuses, update_status, delete_status) {
        this.create_status = create_status;
        this.get_status = get_status;
        this.list_statuses = list_statuses;
        this.update_status = update_status;
        this.delete_status = delete_status;
    }
    async create(body) {
        const row = await this.create_status.execute({
            entity_type: body.entityType,
            code: body.code,
            display_name: body.displayName,
            description: body.description ?? null,
            is_active: body.isActive ?? true,
        });
        return (0, catalog_response_mappers_1.to_status_response_dto)(row);
    }
    async list(query) {
        const result = await this.list_statuses.execute({
            page: query.page,
            limit: query.limit,
            entity_type: query.entityType,
            code_contains: query.codeContains,
            display_name_contains: query.displayNameContains,
            is_active: query.isActive,
        });
        return {
            items: result.items.map((s) => (0, catalog_response_mappers_1.to_status_response_dto)(s)),
            total: result.total,
            page: result.page,
            limit: result.limit,
        };
    }
    async list_active(query) {
        const result = await this.list_statuses.execute({
            page: query.page,
            limit: query.limit,
            entity_type: query.entityType,
            code_contains: query.codeContains,
            display_name_contains: query.displayNameContains,
            is_active: true,
        });
        return {
            items: result.items.map((s) => (0, catalog_response_mappers_1.to_status_response_dto)(s)),
            total: result.total,
            page: result.page,
            limit: result.limit,
        };
    }
    async get(external_id) {
        const row = await this.get_status.execute(external_id);
        return (0, catalog_response_mappers_1.to_status_response_dto)(row);
    }
    async update(external_id, body) {
        const payload = {};
        if (body.entityType !== undefined) {
            payload.entity_type = body.entityType;
        }
        if (body.code !== undefined) {
            payload.code = body.code;
        }
        if (body.displayName !== undefined) {
            payload.display_name = body.displayName;
        }
        if (body.description !== undefined) {
            payload.description = body.description;
        }
        if (body.isActive !== undefined) {
            payload.is_active = body.isActive;
        }
        const row = await this.update_status.execute(external_id, payload);
        return (0, catalog_response_mappers_1.to_status_response_dto)(row);
    }
    async remove(external_id) {
        await this.delete_status.execute(external_id);
    }
};
exports.StatusesController = StatusesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear estado de catálogo' }),
    (0, swagger_1.ApiCreatedResponse)({ type: statuses_api_dto_1.StatusResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof statuses_api_dto_1.CreateStatusBodyDto !== "undefined" && statuses_api_dto_1.CreateStatusBodyDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], StatusesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar estados (paginado, filtros opcionales)' }),
    (0, swagger_1.ApiOkResponse)({ type: statuses_api_dto_1.PaginatedStatusesResponseDto }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof statuses_api_dto_1.ListStatusesQueryDto !== "undefined" && statuses_api_dto_1.ListStatusesQueryDto) === "function" ? _h : Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], StatusesController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('active'),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar solo estados activos',
        description: 'Equivalente al listado paginado con is_active fijado en true. Los filtros opcionales (entity_type, búsqueda por código/nombre) se aplican igual.',
    }),
    (0, swagger_1.ApiOkResponse)({ type: statuses_api_dto_1.PaginatedStatusesResponseDto }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof statuses_api_dto_1.ListStatusesQueryDto !== "undefined" && statuses_api_dto_1.ListStatusesQueryDto) === "function" ? _k : Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], StatusesController.prototype, "list_active", null);
__decorate([
    (0, common_1.Get)(':external_id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener estado por external_id (UUID)' }),
    (0, swagger_1.ApiOkResponse)({ type: statuses_api_dto_1.StatusResponseDto }),
    __param(0, (0, common_1.Param)('external_id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], StatusesController.prototype, "get", null);
__decorate([
    (0, common_1.Patch)(':external_id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar estado por external_id' }),
    (0, swagger_1.ApiOkResponse)({ type: statuses_api_dto_1.StatusResponseDto }),
    __param(0, (0, common_1.Param)('external_id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_o = typeof statuses_api_dto_1.UpdateStatusBodyDto !== "undefined" && statuses_api_dto_1.UpdateStatusBodyDto) === "function" ? _o : Object]),
    __metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], StatusesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':external_id'),
    (0, common_1.HttpCode)(204),
    (0, swagger_1.ApiOperation)({
        summary: 'Eliminar estado si no está referenciado por datos operativos (usuarios, solicitudes, etc.)',
    }),
    (0, swagger_1.ApiNoContentResponse)(),
    __param(0, (0, common_1.Param)('external_id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_q = typeof Promise !== "undefined" && Promise) === "function" ? _q : Object)
], StatusesController.prototype, "remove", null);
exports.StatusesController = StatusesController = __decorate([
    (0, swagger_1.ApiTags)('statuses'),
    (0, common_1.Controller)('v1/statuses'),
    __metadata("design:paramtypes", [typeof (_a = typeof create_status_use_case_1.CreateStatusUseCase !== "undefined" && create_status_use_case_1.CreateStatusUseCase) === "function" ? _a : Object, typeof (_b = typeof get_status_by_external_id_use_case_1.GetStatusByExternalIdUseCase !== "undefined" && get_status_by_external_id_use_case_1.GetStatusByExternalIdUseCase) === "function" ? _b : Object, typeof (_c = typeof list_statuses_use_case_1.ListStatusesUseCase !== "undefined" && list_statuses_use_case_1.ListStatusesUseCase) === "function" ? _c : Object, typeof (_d = typeof update_status_by_external_id_use_case_1.UpdateStatusByExternalIdUseCase !== "undefined" && update_status_by_external_id_use_case_1.UpdateStatusByExternalIdUseCase) === "function" ? _d : Object, typeof (_e = typeof delete_status_by_external_id_use_case_1.DeleteStatusByExternalIdUseCase !== "undefined" && delete_status_by_external_id_use_case_1.DeleteStatusByExternalIdUseCase) === "function" ? _e : Object])
], StatusesController);


/***/ },

/***/ "./apps/transversal-ms/src/modules/transversal/transversal.module.ts"
/*!***************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/transversal/transversal.module.ts ***!
  \***************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransversalModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const messaging_application_module_1 = __webpack_require__(/*! @messaging/messaging-application.module */ "./apps/transversal-ms/src/modules/messaging/messaging-application.module.ts");
const users_module_1 = __webpack_require__(/*! @modules/users/users.module */ "./apps/transversal-ms/src/modules/users/users.module.ts");
const persons_module_1 = __webpack_require__(/*! @modules/persons/persons.module */ "./apps/transversal-ms/src/modules/persons/persons.module.ts");
const upload_files_use_case_1 = __webpack_require__(/*! ./application/use-cases/upload-files/upload-files.use-case */ "./apps/transversal-ms/src/modules/transversal/application/use-cases/upload-files/upload-files.use-case.ts");
const ingest_upload_files_sqs_message_use_case_1 = __webpack_require__(/*! ./application/use-cases/upload-files/ingest-upload-files-sqs-message.use-case */ "./apps/transversal-ms/src/modules/transversal/application/use-cases/upload-files/ingest-upload-files-sqs-message.use-case.ts");
const ingest_partner_create_user_sqs_message_use_case_1 = __webpack_require__(/*! ../users/application/use-cases/partner-create-user/ingest-partner-create-user-sqs-message.use-case */ "./apps/transversal-ms/src/modules/users/application/use-cases/partner-create-user/ingest-partner-create-user-sqs-message.use-case.ts");
const roles_controller_1 = __webpack_require__(/*! ./presentation/roles.controller */ "./apps/transversal-ms/src/modules/transversal/presentation/roles.controller.ts");
const cities_controller_1 = __webpack_require__(/*! ./presentation/cities.controller */ "./apps/transversal-ms/src/modules/transversal/presentation/cities.controller.ts");
const statuses_controller_1 = __webpack_require__(/*! ./presentation/statuses.controller */ "./apps/transversal-ms/src/modules/transversal/presentation/statuses.controller.ts");
const create_role_use_case_1 = __webpack_require__(/*! ./application/use-cases/roles/create-role.use-case */ "./apps/transversal-ms/src/modules/transversal/application/use-cases/roles/create-role.use-case.ts");
const get_role_by_external_id_use_case_1 = __webpack_require__(/*! ./application/use-cases/roles/get-role-by-external-id.use-case */ "./apps/transversal-ms/src/modules/transversal/application/use-cases/roles/get-role-by-external-id.use-case.ts");
const list_roles_use_case_1 = __webpack_require__(/*! ./application/use-cases/roles/list-roles.use-case */ "./apps/transversal-ms/src/modules/transversal/application/use-cases/roles/list-roles.use-case.ts");
const update_role_by_external_id_use_case_1 = __webpack_require__(/*! ./application/use-cases/roles/update-role-by-external-id.use-case */ "./apps/transversal-ms/src/modules/transversal/application/use-cases/roles/update-role-by-external-id.use-case.ts");
const delete_role_by_external_id_use_case_1 = __webpack_require__(/*! ./application/use-cases/roles/delete-role-by-external-id.use-case */ "./apps/transversal-ms/src/modules/transversal/application/use-cases/roles/delete-role-by-external-id.use-case.ts");
const create_city_use_case_1 = __webpack_require__(/*! ./application/use-cases/cities/create-city.use-case */ "./apps/transversal-ms/src/modules/transversal/application/use-cases/cities/create-city.use-case.ts");
const get_city_by_external_id_use_case_1 = __webpack_require__(/*! ./application/use-cases/cities/get-city-by-external-id.use-case */ "./apps/transversal-ms/src/modules/transversal/application/use-cases/cities/get-city-by-external-id.use-case.ts");
const list_cities_use_case_1 = __webpack_require__(/*! ./application/use-cases/cities/list-cities.use-case */ "./apps/transversal-ms/src/modules/transversal/application/use-cases/cities/list-cities.use-case.ts");
const list_distinct_countries_use_case_1 = __webpack_require__(/*! ./application/use-cases/cities/list-distinct-countries.use-case */ "./apps/transversal-ms/src/modules/transversal/application/use-cases/cities/list-distinct-countries.use-case.ts");
const update_city_by_external_id_use_case_1 = __webpack_require__(/*! ./application/use-cases/cities/update-city-by-external-id.use-case */ "./apps/transversal-ms/src/modules/transversal/application/use-cases/cities/update-city-by-external-id.use-case.ts");
const delete_city_by_external_id_use_case_1 = __webpack_require__(/*! ./application/use-cases/cities/delete-city-by-external-id.use-case */ "./apps/transversal-ms/src/modules/transversal/application/use-cases/cities/delete-city-by-external-id.use-case.ts");
const create_status_use_case_1 = __webpack_require__(/*! ./application/use-cases/statuses/create-status.use-case */ "./apps/transversal-ms/src/modules/transversal/application/use-cases/statuses/create-status.use-case.ts");
const get_status_by_external_id_use_case_1 = __webpack_require__(/*! ./application/use-cases/statuses/get-status-by-external-id.use-case */ "./apps/transversal-ms/src/modules/transversal/application/use-cases/statuses/get-status-by-external-id.use-case.ts");
const list_statuses_use_case_1 = __webpack_require__(/*! ./application/use-cases/statuses/list-statuses.use-case */ "./apps/transversal-ms/src/modules/transversal/application/use-cases/statuses/list-statuses.use-case.ts");
const update_status_by_external_id_use_case_1 = __webpack_require__(/*! ./application/use-cases/statuses/update-status-by-external-id.use-case */ "./apps/transversal-ms/src/modules/transversal/application/use-cases/statuses/update-status-by-external-id.use-case.ts");
const delete_status_by_external_id_use_case_1 = __webpack_require__(/*! ./application/use-cases/statuses/delete-status-by-external-id.use-case */ "./apps/transversal-ms/src/modules/transversal/application/use-cases/statuses/delete-status-by-external-id.use-case.ts");
let TransversalModule = class TransversalModule {
};
exports.TransversalModule = TransversalModule;
exports.TransversalModule = TransversalModule = __decorate([
    (0, common_1.Module)({
        controllers: [roles_controller_1.RolesController, cities_controller_1.CitiesController, statuses_controller_1.StatusesController],
        imports: [config_1.ConfigModule, messaging_application_module_1.MessagingApplicationModule, users_module_1.UsersModule, persons_module_1.PersonsModule],
        providers: [
            upload_files_use_case_1.UploadFilesUseCase,
            ingest_upload_files_sqs_message_use_case_1.IngestUploadFilesSqsMessageUseCase,
            ingest_partner_create_user_sqs_message_use_case_1.IngestPartnerCreateUserSqsMessageUseCase,
            create_role_use_case_1.CreateRoleUseCase,
            get_role_by_external_id_use_case_1.GetRoleByExternalIdUseCase,
            list_roles_use_case_1.ListRolesUseCase,
            update_role_by_external_id_use_case_1.UpdateRoleByExternalIdUseCase,
            delete_role_by_external_id_use_case_1.DeleteRoleByExternalIdUseCase,
            create_city_use_case_1.CreateCityUseCase,
            get_city_by_external_id_use_case_1.GetCityByExternalIdUseCase,
            list_cities_use_case_1.ListCitiesUseCase,
            list_distinct_countries_use_case_1.ListDistinctCountriesUseCase,
            update_city_by_external_id_use_case_1.UpdateCityByExternalIdUseCase,
            delete_city_by_external_id_use_case_1.DeleteCityByExternalIdUseCase,
            create_status_use_case_1.CreateStatusUseCase,
            get_status_by_external_id_use_case_1.GetStatusByExternalIdUseCase,
            list_statuses_use_case_1.ListStatusesUseCase,
            update_status_by_external_id_use_case_1.UpdateStatusByExternalIdUseCase,
            delete_status_by_external_id_use_case_1.DeleteStatusByExternalIdUseCase,
        ],
        exports: [
            ingest_upload_files_sqs_message_use_case_1.IngestUploadFilesSqsMessageUseCase,
            ingest_partner_create_user_sqs_message_use_case_1.IngestPartnerCreateUserSqsMessageUseCase,
            persons_module_1.PersonsModule,
            upload_files_use_case_1.UploadFilesUseCase,
        ],
    })
], TransversalModule);


/***/ },

/***/ "./apps/transversal-ms/src/modules/transversal/transversal.tokens.ts"
/*!***************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/transversal/transversal.tokens.ts ***!
  \***************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CURRENCY_READ_PORT = exports.STATUS_REPOSITORY = exports.CITY_REPOSITORY = exports.ROLE_REPOSITORY = exports.PARTNER_CREATE_USER_SQS_IDEMPOTENCY_PORT = exports.UPLOAD_FILES_IDEMPOTENCY_PORT = exports.REMOTE_FILE_FETCH_PORT = exports.STORAGE_PORT = void 0;
exports.STORAGE_PORT = Symbol('STORAGE_PORT');
exports.REMOTE_FILE_FETCH_PORT = Symbol('REMOTE_FILE_FETCH_PORT');
exports.UPLOAD_FILES_IDEMPOTENCY_PORT = Symbol('UPLOAD_FILES_IDEMPOTENCY_PORT');
exports.PARTNER_CREATE_USER_SQS_IDEMPOTENCY_PORT = Symbol('PARTNER_CREATE_USER_SQS_IDEMPOTENCY_PORT');
exports.ROLE_REPOSITORY = Symbol('ROLE_REPOSITORY');
exports.CITY_REPOSITORY = Symbol('CITY_REPOSITORY');
exports.STATUS_REPOSITORY = Symbol('STATUS_REPOSITORY');
exports.CURRENCY_READ_PORT = Symbol('CURRENCY_READ_PORT');


/***/ },

/***/ "./apps/transversal-ms/src/modules/users/application/dto/user-me-response.dto.ts"
/*!***************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/users/application/dto/user-me-response.dto.ts ***!
  \***************************************************************************************/
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
exports.UserMeResponseDto = exports.UserMeProfileDto = exports.UserMeHierarchyDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class UserMeHierarchyDto {
    parentId;
    partnerId;
    salesRepExternalId;
}
exports.UserMeHierarchyDto = UserMeHierarchyDto;
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, example: '20', description: 'Id interno del usuario padre en la jerarquía.' }),
    __metadata("design:type", Object)
], UserMeHierarchyDto.prototype, "parentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        nullable: true,
        format: 'uuid',
        example: null,
        description: 'external_id UUID del partner en BD (suppliers_schema.partners.external_id). ' +
            'Presente para roles PartnerRoles (PARTNER_ADMIN, PARTNER_OPERATIONS, CUSTOMER, SALES_MANAGER, SALES_REPRESENTATIVE). ' +
            'null para roles back-office o si el usuario no tiene vínculo de partner registrado.',
    }),
    __metadata("design:type", Object)
], UserMeHierarchyDto.prototype, "partnerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        nullable: true,
        format: 'uuid',
        example: null,
        description: 'external_id UUID del registro en suppliers_schema.sales_representatives. ' +
            'Presente únicamente cuando role = SALES_REPRESENTATIVE y existe fila en esa tabla. ' +
            'null en cualquier otro caso.',
    }),
    __metadata("design:type", Object)
], UserMeHierarchyDto.prototype, "salesRepExternalId", void 0);
class UserMeProfileDto {
    externalId;
    email;
    fullName;
    role;
    hierarchy;
}
exports.UserMeProfileDto = UserMeProfileDto;
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], UserMeProfileDto.prototype, "externalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'email' }),
    __metadata("design:type", String)
], UserMeProfileDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Juan Pérez' }),
    __metadata("design:type", String)
], UserMeProfileDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Código de rol de catálogo (alineado con Cognito / `Roles`).',
        example: 'PARTNER_OPERATIONS',
    }),
    __metadata("design:type", String)
], UserMeProfileDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => UserMeHierarchyDto }),
    __metadata("design:type", UserMeHierarchyDto)
], UserMeProfileDto.prototype, "hierarchy", void 0);
class UserMeResponseDto {
    user;
    permissions;
}
exports.UserMeResponseDto = UserMeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => UserMeProfileDto }),
    __metadata("design:type", UserMeProfileDto)
], UserMeResponseDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String], example: ['CLIENT_VIEW', 'ORDER_CREATE'] }),
    __metadata("design:type", Array)
], UserMeResponseDto.prototype, "permissions", void 0);


/***/ },

/***/ "./apps/transversal-ms/src/modules/users/application/mapping/user-public-fields.builder.ts"
/*!*************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/users/application/mapping/user-public-fields.builder.ts ***!
  \*************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.build_user_public_fields = build_user_public_fields;
async function build_user_public_fields(row, role_repo) {
    const role_external_id = row.role_id === null
        ? null
        : (await role_repo.find_by_internal_id(row.role_id))?.external_id ?? null;
    if (row.role_id !== null && role_external_id === null) {
        throw new Error('user role reference resolution failed');
    }
    return {
        external_id: row.external_id,
        cognito_sub: row.cognito_sub,
        email: row.email,
        role_external_id,
        state: row.state,
        last_login_at: row.last_login_at,
        created_at: row.created_at,
        updated_at: row.updated_at,
    };
}


/***/ },

/***/ "./apps/transversal-ms/src/modules/users/application/use-cases/create-user/create-user.request.ts"
/*!********************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/users/application/use-cases/create-user/create-user.request.ts ***!
  \********************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUserRequest = void 0;
class CreateUserRequest {
    email;
    state;
    role_external_id;
    last_login_at;
    cognito_sub;
    constructor(email, state, role_external_id, last_login_at, cognito_sub = null) {
        this.email = email;
        this.state = state;
        this.role_external_id = role_external_id;
        this.last_login_at = last_login_at;
        this.cognito_sub = cognito_sub;
    }
}
exports.CreateUserRequest = CreateUserRequest;


/***/ },

/***/ "./apps/transversal-ms/src/modules/users/application/use-cases/create-user/create-user.response.ts"
/*!*********************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/users/application/use-cases/create-user/create-user.response.ts ***!
  \*********************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUserResponse = void 0;
class CreateUserResponse {
    external_id;
    cognito_sub;
    email;
    role_external_id;
    state;
    last_login_at;
    created_at;
    updated_at;
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUserUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const users_tokens_1 = __webpack_require__(/*! @modules/users/users.tokens */ "./apps/transversal-ms/src/modules/users/users.tokens.ts");
const transversal_tokens_1 = __webpack_require__(/*! @modules/transversal/transversal.tokens */ "./apps/transversal-ms/src/modules/transversal/transversal.tokens.ts");
const user_ports_1 = __webpack_require__(/*! @modules/users/domain/ports/user.ports */ "./apps/transversal-ms/src/modules/users/domain/ports/user.ports.ts");
const user_public_fields_builder_1 = __webpack_require__(/*! @modules/users/application/mapping/user-public-fields.builder */ "./apps/transversal-ms/src/modules/users/application/mapping/user-public-fields.builder.ts");
const create_user_response_1 = __webpack_require__(/*! ./create-user.response */ "./apps/transversal-ms/src/modules/users/application/use-cases/create-user/create-user.response.ts");
const normalize_cognito_sub_1 = __webpack_require__(/*! @common/utils/normalize-cognito-sub */ "./apps/transversal-ms/src/common/utils/normalize-cognito-sub.ts");
let CreateUserUseCase = class CreateUserUseCase {
    user_repository;
    role_repository;
    cognito_user_provisioning;
    constructor(user_repository, role_repository, cognito_user_provisioning) {
        this.user_repository = user_repository;
        this.role_repository = role_repository;
        this.cognito_user_provisioning = cognito_user_provisioning;
    }
    async execute(req) {
        let role_id = null;
        let role_code = null;
        if (req.role_external_id !== null) {
            const role = await this.role_repository.find_by_external_id(req.role_external_id);
            if (role === null) {
                throw new common_1.NotFoundException('role not found');
            }
            role_id = role.id;
            role_code = role.name;
        }
        const manual_sub = req.cognito_sub?.trim() ?? '';
        let cognito_sub = manual_sub.length > 0 ? (0, normalize_cognito_sub_1.normalize_cognito_sub)(manual_sub) : null;
        let cognito_username = null;
        let rollback_delete_cognito = false;
        try {
            if (cognito_sub === null) {
                const ensured = await this.cognito_user_provisioning.ensure_user({
                    email: req.email,
                    role_code,
                });
                cognito_sub = ensured.sub;
                cognito_username = ensured.username;
                rollback_delete_cognito = ensured.created_new;
            }
            const created = await this.user_repository.create({
                cognito_sub,
                email: req.email.trim().toLowerCase(),
                role_id,
                state: req.state,
                last_login_at: req.last_login_at,
            });
            if (cognito_username !== null) {
                await this.cognito_user_provisioning.set_custom_db_id(cognito_username, created.internal_id);
            }
            const fields = await (0, user_public_fields_builder_1.build_user_public_fields)(created, this.role_repository);
            return new create_user_response_1.CreateUserResponse(fields);
        }
        catch (err) {
            if (rollback_delete_cognito && cognito_username !== null) {
                await this.cognito_user_provisioning.try_delete_user(cognito_username);
            }
            throw err;
        }
    }
};
exports.CreateUserUseCase = CreateUserUseCase;
exports.CreateUserUseCase = CreateUserUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(users_tokens_1.USER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(transversal_tokens_1.ROLE_REPOSITORY)),
    __param(2, (0, common_1.Inject)(users_tokens_1.COGNITO_USER_PROVISIONING_PORT)),
    __metadata("design:paramtypes", [typeof (_a = typeof user_ports_1.UserRepository !== "undefined" && user_ports_1.UserRepository) === "function" ? _a : Object, Object, Object])
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
    user_repository;
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
    external_id;
    cognito_sub;
    email;
    role_external_id;
    state;
    last_login_at;
    created_at;
    updated_at;
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetUserByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const users_tokens_1 = __webpack_require__(/*! @modules/users/users.tokens */ "./apps/transversal-ms/src/modules/users/users.tokens.ts");
const transversal_tokens_1 = __webpack_require__(/*! @modules/transversal/transversal.tokens */ "./apps/transversal-ms/src/modules/transversal/transversal.tokens.ts");
const user_ports_1 = __webpack_require__(/*! @modules/users/domain/ports/user.ports */ "./apps/transversal-ms/src/modules/users/domain/ports/user.ports.ts");
const user_public_fields_builder_1 = __webpack_require__(/*! @modules/users/application/mapping/user-public-fields.builder */ "./apps/transversal-ms/src/modules/users/application/mapping/user-public-fields.builder.ts");
const get_user_by_external_id_response_1 = __webpack_require__(/*! ./get-user-by-external-id.response */ "./apps/transversal-ms/src/modules/users/application/use-cases/get-user-by-external-id/get-user-by-external-id.response.ts");
let GetUserByExternalIdUseCase = class GetUserByExternalIdUseCase {
    user_repository;
    role_repository;
    constructor(user_repository, role_repository) {
        this.user_repository = user_repository;
        this.role_repository = role_repository;
    }
    async execute(req) {
        const row = await this.user_repository.find_by_external_id(req.external_id);
        if (row === null) {
            throw new common_1.NotFoundException('user not found');
        }
        const fields = await (0, user_public_fields_builder_1.build_user_public_fields)(row, this.role_repository);
        return new get_user_by_external_id_response_1.GetUserByExternalIdResponse(fields);
    }
};
exports.GetUserByExternalIdUseCase = GetUserByExternalIdUseCase;
exports.GetUserByExternalIdUseCase = GetUserByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(users_tokens_1.USER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(transversal_tokens_1.ROLE_REPOSITORY)),
    __metadata("design:paramtypes", [typeof (_a = typeof user_ports_1.UserRepository !== "undefined" && user_ports_1.UserRepository) === "function" ? _a : Object, Object])
], GetUserByExternalIdUseCase);


/***/ },

/***/ "./apps/transversal-ms/src/modules/users/application/use-cases/get-user-me/get-user-me.result.ts"
/*!*******************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/users/application/use-cases/get-user-me/get-user-me.result.ts ***!
  \*******************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetUserMeResult = void 0;
class GetUserMeResult {
    user;
    permissions;
    constructor(user, permissions) {
        this.user = user;
        this.permissions = permissions;
    }
}
exports.GetUserMeResult = GetUserMeResult;


/***/ },

/***/ "./apps/transversal-ms/src/modules/users/application/use-cases/get-user-me/get-user-me.use-case.ts"
/*!*********************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/users/application/use-cases/get-user-me/get-user-me.use-case.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetUserMeUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
const auth_tokens_1 = __webpack_require__(/*! @modules/auth/auth.tokens */ "./apps/transversal-ms/src/modules/auth/auth.tokens.ts");
const persons_tokens_1 = __webpack_require__(/*! @modules/persons/persons.tokens */ "./apps/transversal-ms/src/modules/persons/persons.tokens.ts");
const users_tokens_1 = __webpack_require__(/*! @modules/users/users.tokens */ "./apps/transversal-ms/src/modules/users/users.tokens.ts");
const get_user_me_result_1 = __webpack_require__(/*! ./get-user-me.result */ "./apps/transversal-ms/src/modules/users/application/use-cases/get-user-me/get-user-me.result.ts");
const PARTNER_ROLE_SET = new Set(Object.values(shared_1.PartnerRoles));
let GetUserMeUseCase = class GetUserMeUseCase {
    user_repository;
    person_repository;
    permission_codes_reader;
    partner_link_reader;
    constructor(user_repository, person_repository, permission_codes_reader, partner_link_reader) {
        this.user_repository = user_repository;
        this.person_repository = person_repository;
        this.permission_codes_reader = permission_codes_reader;
        this.partner_link_reader = partner_link_reader;
    }
    async execute(ctx) {
        const user = await this.user_repository.find_by_cognito_sub(ctx.cognitoSub);
        if (user === null) {
            throw new common_1.NotFoundException('user not found');
        }
        let full_name = '';
        if (user.person_id !== null) {
            const person = await this.person_repository.find_by_internal_id(user.person_id);
            if (person !== null) {
                full_name = `${person.first_name} ${person.last_name}`.trim();
            }
        }
        const permissions = user.role_id !== null
            ? await this.permission_codes_reader.list_codes_for_role_internal_id(user.role_id)
            : [];
        let partner_external_id = null;
        let sales_rep_external_id = null;
        if (PARTNER_ROLE_SET.has(ctx.roleCode)) {
            const link = await this.partner_link_reader.find_by_user_internal_id(user.internal_id);
            if (link !== null) {
                partner_external_id = link.partnerExternalId;
                if (ctx.roleCode === shared_1.Roles.SALES_REPRESENTATIVE) {
                    sales_rep_external_id = link.salesRepresentativeExternalId;
                }
            }
        }
        return new get_user_me_result_1.GetUserMeResult({
            externalId: user.external_id,
            email: user.email,
            fullName: full_name,
            role: ctx.roleCode,
            hierarchy: {
                parentId: user.parent_id !== null ? String(user.parent_id) : null,
                partnerId: partner_external_id,
                salesRepExternalId: sales_rep_external_id,
            },
        }, permissions);
    }
};
exports.GetUserMeUseCase = GetUserMeUseCase;
exports.GetUserMeUseCase = GetUserMeUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(users_tokens_1.USER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(persons_tokens_1.PERSON_REPOSITORY)),
    __param(2, (0, common_1.Inject)(auth_tokens_1.PERMISSION_CODES_BY_ROLE_READER)),
    __param(3, (0, common_1.Inject)(users_tokens_1.PARTNER_LINK_READER)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], GetUserMeUseCase);


/***/ },

/***/ "./apps/transversal-ms/src/modules/users/application/use-cases/list-users/list-users.response.ts"
/*!*******************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/users/application/use-cases/list-users/list-users.response.ts ***!
  \*******************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListUsersItemResponse = void 0;
class ListUsersItemResponse {
    external_id;
    cognito_sub;
    email;
    role_external_id;
    state;
    last_login_at;
    created_at;
    updated_at;
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListUsersUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const users_tokens_1 = __webpack_require__(/*! @modules/users/users.tokens */ "./apps/transversal-ms/src/modules/users/users.tokens.ts");
const transversal_tokens_1 = __webpack_require__(/*! @modules/transversal/transversal.tokens */ "./apps/transversal-ms/src/modules/transversal/transversal.tokens.ts");
const user_ports_1 = __webpack_require__(/*! @modules/users/domain/ports/user.ports */ "./apps/transversal-ms/src/modules/users/domain/ports/user.ports.ts");
const user_public_fields_builder_1 = __webpack_require__(/*! @modules/users/application/mapping/user-public-fields.builder */ "./apps/transversal-ms/src/modules/users/application/mapping/user-public-fields.builder.ts");
const list_users_response_1 = __webpack_require__(/*! ./list-users.response */ "./apps/transversal-ms/src/modules/users/application/use-cases/list-users/list-users.response.ts");
let ListUsersUseCase = class ListUsersUseCase {
    user_repository;
    role_repository;
    constructor(user_repository, role_repository) {
        this.user_repository = user_repository;
        this.role_repository = role_repository;
    }
    async execute() {
        const rows = await this.user_repository.find_all();
        const out = [];
        for (const row of rows) {
            const fields = await (0, user_public_fields_builder_1.build_user_public_fields)(row, this.role_repository);
            out.push(new list_users_response_1.ListUsersItemResponse(fields));
        }
        return out;
    }
};
exports.ListUsersUseCase = ListUsersUseCase;
exports.ListUsersUseCase = ListUsersUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(users_tokens_1.USER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(transversal_tokens_1.ROLE_REPOSITORY)),
    __metadata("design:paramtypes", [typeof (_a = typeof user_ports_1.UserRepository !== "undefined" && user_ports_1.UserRepository) === "function" ? _a : Object, Object])
], ListUsersUseCase);


/***/ },

/***/ "./apps/transversal-ms/src/modules/users/application/use-cases/partner-create-user/ingest-partner-create-user-sqs-message.use-case.ts"
/*!********************************************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/users/application/use-cases/partner-create-user/ingest-partner-create-user-sqs-message.use-case.ts ***!
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
var IngestPartnerCreateUserSqsMessageUseCase_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IngestPartnerCreateUserSqsMessageUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const create_user_use_case_1 = __webpack_require__(/*! @modules/users/application/use-cases/create-user/create-user.use-case */ "./apps/transversal-ms/src/modules/users/application/use-cases/create-user/create-user.use-case.ts");
const create_user_request_1 = __webpack_require__(/*! @modules/users/application/use-cases/create-user/create-user.request */ "./apps/transversal-ms/src/modules/users/application/use-cases/create-user/create-user.request.ts");
const users_tokens_1 = __webpack_require__(/*! @modules/users/users.tokens */ "./apps/transversal-ms/src/modules/users/users.tokens.ts");
const transversal_tokens_1 = __webpack_require__(/*! @modules/transversal/transversal.tokens */ "./apps/transversal-ms/src/modules/transversal/transversal.tokens.ts");
const create_partner_user_inbound_dto_1 = __webpack_require__(/*! ../../../../transversal/application/dto/create-partner-user-inbound.dto */ "./apps/transversal-ms/src/modules/transversal/application/dto/create-partner-user-inbound.dto.ts");
const create_partner_user_sqs_validation_error_1 = __webpack_require__(/*! ../../../../transversal/application/exceptions/create-partner-user-sqs.validation.error */ "./apps/transversal-ms/src/modules/transversal/application/exceptions/create-partner-user-sqs.validation.error.ts");
const partner_create_user_sqs_idempotency_port_1 = __webpack_require__(/*! @modules/users/domain/ports/partner-create-user-sqs-idempotency.port */ "./apps/transversal-ms/src/modules/users/domain/ports/partner-create-user-sqs-idempotency.port.ts");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
const PG_UNIQUE_VIOLATION = '23505';
let IngestPartnerCreateUserSqsMessageUseCase = IngestPartnerCreateUserSqsMessageUseCase_1 = class IngestPartnerCreateUserSqsMessageUseCase {
    idempotency;
    role_repository;
    user_repository;
    create_user;
    logger = new common_1.Logger(IngestPartnerCreateUserSqsMessageUseCase_1.name);
    constructor(idempotency, role_repository, user_repository, create_user) {
        this.idempotency = idempotency;
        this.role_repository = role_repository;
        this.user_repository = user_repository;
        this.create_user = create_user;
    }
    async execute(command) {
        let parsed;
        try {
            parsed = JSON.parse(command.body);
        }
        catch {
            this.logger.warn('[CreatePartnerUser][correlationId=unknown][step=parse] cuerpo no es JSON válido.');
            return command.delete_on_validation_error;
        }
        const correlation_for_log = this.try_correlation_id(parsed) ?? 'unknown';
        const dto = (0, class_transformer_1.plainToInstance)(create_partner_user_inbound_dto_1.CreatePartnerUserInboundEventDto, parsed, {
            enableImplicitConversion: true,
        });
        const errors = (0, class_validator_1.validateSync)(dto, { forbidUnknownValues: false });
        if (errors.length > 0) {
            const message = errors
                .map((e) => Object.values(e.constraints ?? {}).join(', '))
                .join('; ');
            this.logger.warn(`[CreatePartnerUser][correlationId=${correlation_for_log}][step=validation] ${message}`);
            return command.delete_on_validation_error;
        }
        const begin = await this.idempotency.begin(dto.idempotency_key, dto.correlation_id);
        if (begin.status === 'duplicate') {
            this.logger.log(`[CreatePartnerUser][correlationId=${dto.correlation_id}][step=idempotent_hit]`);
            return true;
        }
        if (begin.status === 'conflict') {
            this.logger.warn(`[CreatePartnerUser][correlationId=${dto.correlation_id}][step=idempotency_conflict]`);
            return false;
        }
        const payload = dto.payload;
        const email_trimmed = payload.email.trim();
        try {
            const role_ref = await this.role_repository.find_by_name(shared_1.Roles.PARTNER_OPERATIONS);
            if (role_ref === null) {
                throw new create_partner_user_sqs_validation_error_1.CreatePartnerUserSqsValidationError(`role ${shared_1.Roles.PARTNER_OPERATIONS} not found in catalog`);
            }
            let user_external_id;
            try {
                const created_user = await this.create_user.execute(new create_user_request_1.CreateUserRequest(email_trimmed, 'active', role_ref.external_id, null));
                user_external_id = created_user.external_id;
            }
            catch (err) {
                if (this.is_unique_violation(err)) {
                    const existing = await this.user_repository.find_by_email(email_trimmed);
                    if (existing === null) {
                        throw err;
                    }
                    user_external_id = existing.external_id;
                    this.logger.log(`[CreatePartnerUser][correlationId=${dto.correlation_id}][step=user_dedup_email]`);
                }
                else {
                    throw err;
                }
            }
            await this.idempotency.complete(dto.idempotency_key, {
                user_external_id,
                person_external_id: 'n/a',
            });
            this.logger.log(`[CreatePartnerUser][correlationId=${dto.correlation_id}][step=completed]`);
            return true;
        }
        catch (err) {
            await this.idempotency.release(dto.idempotency_key);
            if (err instanceof create_partner_user_sqs_validation_error_1.CreatePartnerUserSqsValidationError) {
                this.logger.warn(`[CreatePartnerUser][correlationId=${dto.correlation_id}][step=rejected] ${err.message}`);
                return command.delete_on_validation_error;
            }
            if (err instanceof common_1.NotFoundException) {
                this.logger.warn(`[CreatePartnerUser][correlationId=${dto.correlation_id}][step=not_found] ${err.message}`);
                return command.delete_on_validation_error;
            }
            if (this.is_unique_violation(err)) {
                this.logger.warn(`[CreatePartnerUser][correlationId=${dto.correlation_id}][step=unique_violation]`);
                return command.delete_on_validation_error;
            }
            const text = err instanceof Error ? err.message : String(err);
            this.logger.error(`[CreatePartnerUser][correlationId=${dto.correlation_id}][step=failed] ${text}`);
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
    is_unique_violation(err) {
        return err instanceof typeorm_1.QueryFailedError && err.driverError !== undefined
            ? String(err.driverError.code) === PG_UNIQUE_VIOLATION
            : false;
    }
};
exports.IngestPartnerCreateUserSqsMessageUseCase = IngestPartnerCreateUserSqsMessageUseCase;
exports.IngestPartnerCreateUserSqsMessageUseCase = IngestPartnerCreateUserSqsMessageUseCase = IngestPartnerCreateUserSqsMessageUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(transversal_tokens_1.PARTNER_CREATE_USER_SQS_IDEMPOTENCY_PORT)),
    __param(1, (0, common_1.Inject)(transversal_tokens_1.ROLE_REPOSITORY)),
    __param(2, (0, common_1.Inject)(users_tokens_1.USER_REPOSITORY)),
    __metadata("design:paramtypes", [typeof (_a = typeof partner_create_user_sqs_idempotency_port_1.PartnerCreateUserSqsIdempotencyPort !== "undefined" && partner_create_user_sqs_idempotency_port_1.PartnerCreateUserSqsIdempotencyPort) === "function" ? _a : Object, Object, Object, typeof (_b = typeof create_user_use_case_1.CreateUserUseCase !== "undefined" && create_user_use_case_1.CreateUserUseCase) === "function" ? _b : Object])
], IngestPartnerCreateUserSqsMessageUseCase);


/***/ },

/***/ "./apps/transversal-ms/src/modules/users/application/use-cases/update-user-by-external-id/update-user-by-external-id.response.ts"
/*!***************************************************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/users/application/use-cases/update-user-by-external-id/update-user-by-external-id.response.ts ***!
  \***************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserByExternalIdResponse = void 0;
class UpdateUserByExternalIdResponse {
    external_id;
    cognito_sub;
    email;
    role_external_id;
    state;
    last_login_at;
    created_at;
    updated_at;
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const users_tokens_1 = __webpack_require__(/*! @modules/users/users.tokens */ "./apps/transversal-ms/src/modules/users/users.tokens.ts");
const transversal_tokens_1 = __webpack_require__(/*! @modules/transversal/transversal.tokens */ "./apps/transversal-ms/src/modules/transversal/transversal.tokens.ts");
const user_ports_1 = __webpack_require__(/*! @modules/users/domain/ports/user.ports */ "./apps/transversal-ms/src/modules/users/domain/ports/user.ports.ts");
const user_public_fields_builder_1 = __webpack_require__(/*! @modules/users/application/mapping/user-public-fields.builder */ "./apps/transversal-ms/src/modules/users/application/mapping/user-public-fields.builder.ts");
const update_user_by_external_id_response_1 = __webpack_require__(/*! ./update-user-by-external-id.response */ "./apps/transversal-ms/src/modules/users/application/use-cases/update-user-by-external-id/update-user-by-external-id.response.ts");
const normalize_cognito_sub_1 = __webpack_require__(/*! @common/utils/normalize-cognito-sub */ "./apps/transversal-ms/src/common/utils/normalize-cognito-sub.ts");
let UpdateUserByExternalIdUseCase = class UpdateUserByExternalIdUseCase {
    user_repository;
    role_repository;
    constructor(user_repository, role_repository) {
        this.user_repository = user_repository;
        this.role_repository = role_repository;
    }
    async execute(req) {
        const patch = {};
        if (req.cognito_sub !== undefined) {
            patch.cognito_sub = (0, normalize_cognito_sub_1.normalize_cognito_sub)(req.cognito_sub);
        }
        if (req.email !== undefined) {
            patch.email = req.email;
        }
        if (req.last_login_at !== undefined) {
            patch.last_login_at = req.last_login_at;
        }
        if (req.state !== undefined) {
            patch.state = req.state;
        }
        if (req.role_external_id !== undefined) {
            if (req.role_external_id === null) {
                patch.role_id = null;
            }
            else {
                const role = await this.role_repository.find_by_external_id(req.role_external_id);
                if (role === null) {
                    throw new common_1.NotFoundException('role not found');
                }
                patch.role_id = role.id;
            }
        }
        const updated = await this.user_repository.update_by_external_id(req.external_id, patch);
        if (updated === null) {
            throw new common_1.NotFoundException('user not found');
        }
        const fields = await (0, user_public_fields_builder_1.build_user_public_fields)(updated, this.role_repository);
        return new update_user_by_external_id_response_1.UpdateUserByExternalIdResponse(fields);
    }
};
exports.UpdateUserByExternalIdUseCase = UpdateUserByExternalIdUseCase;
exports.UpdateUserByExternalIdUseCase = UpdateUserByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(users_tokens_1.USER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(transversal_tokens_1.ROLE_REPOSITORY)),
    __metadata("design:paramtypes", [typeof (_a = typeof user_ports_1.UserRepository !== "undefined" && user_ports_1.UserRepository) === "function" ? _a : Object, Object])
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
    internal_id;
    external_id;
    cognito_sub;
    email;
    role_id;
    state;
    parent_id;
    hierarchy_path;
    person_id;
    last_login_at;
    created_at;
    updated_at;
    constructor(internal_id, external_id, cognito_sub, email, role_id, state, parent_id, hierarchy_path, person_id, last_login_at, created_at, updated_at) {
        this.internal_id = internal_id;
        this.external_id = external_id;
        this.cognito_sub = cognito_sub;
        this.email = email;
        this.role_id = role_id;
        this.state = state;
        this.parent_id = parent_id;
        this.hierarchy_path = hierarchy_path;
        this.person_id = person_id;
        this.last_login_at = last_login_at;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
exports.User = User;


/***/ },

/***/ "./apps/transversal-ms/src/modules/users/domain/ports/partner-create-user-sqs-idempotency.port.ts"
/*!********************************************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/users/domain/ports/partner-create-user-sqs-idempotency.port.ts ***!
  \********************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ "./apps/transversal-ms/src/modules/users/domain/ports/user.ports.ts"
/*!**************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/users/domain/ports/user.ports.ts ***!
  \**************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ "./apps/transversal-ms/src/modules/users/presentation/users.controller.ts"
/*!********************************************************************************!*\
  !*** ./apps/transversal-ms/src/modules/users/presentation/users.controller.ts ***!
  \********************************************************************************/
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
exports.UsersController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const jwt_auth_guard_1 = __webpack_require__(/*! @modules/auth/infrastructure/guards/jwt-auth.guard */ "./apps/transversal-ms/src/modules/auth/infrastructure/guards/jwt-auth.guard.ts");
const current_user_decorator_1 = __webpack_require__(/*! @modules/auth/presentation/decorators/current-user.decorator */ "./apps/transversal-ms/src/modules/auth/presentation/decorators/current-user.decorator.ts");
const get_user_me_use_case_1 = __webpack_require__(/*! @modules/users/application/use-cases/get-user-me/get-user-me.use-case */ "./apps/transversal-ms/src/modules/users/application/use-cases/get-user-me/get-user-me.use-case.ts");
const user_me_response_dto_1 = __webpack_require__(/*! @modules/users/application/dto/user-me-response.dto */ "./apps/transversal-ms/src/modules/users/application/dto/user-me-response.dto.ts");
function to_user_me_response_dto(result) {
    const hierarchy = new user_me_response_dto_1.UserMeHierarchyDto();
    hierarchy.parentId = result.user.hierarchy.parentId;
    hierarchy.partnerId = result.user.hierarchy.partnerId;
    hierarchy.salesRepExternalId = result.user.hierarchy.salesRepExternalId;
    const user = new user_me_response_dto_1.UserMeProfileDto();
    user.externalId = result.user.externalId;
    user.email = result.user.email;
    user.fullName = result.user.fullName;
    user.role = result.user.role;
    user.hierarchy = hierarchy;
    const dto = new user_me_response_dto_1.UserMeResponseDto();
    dto.user = user;
    dto.permissions = [...result.permissions];
    return dto;
}
let UsersController = class UsersController {
    get_user_me;
    constructor(get_user_me) {
        this.get_user_me = get_user_me;
    }
    async get_me(ctx) {
        const result = await this.get_user_me.execute(ctx);
        return to_user_me_response_dto(result);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('cognito-access-token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Perfil y permisos del usuario autenticado',
        description: 'Requiere access token de Cognito. Devuelve datos de negocio (`users`, `persons`) y códigos de permiso del rol.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, type: user_me_response_dto_1.UserMeResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Token inválido o ausente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Usuario no encontrado en BD' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], UsersController.prototype, "get_me", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [typeof (_a = typeof get_user_me_use_case_1.GetUserMeUseCase !== "undefined" && get_user_me_use_case_1.GetUserMeUseCase) === "function" ? _a : Object])
], UsersController);


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
const cognito_user_provisioning_adapter_1 = __webpack_require__(/*! @infrastructure/cognito/cognito-user-provisioning.adapter */ "./apps/transversal-ms/src/infrastructure/cognito/cognito-user-provisioning.adapter.ts");
const create_user_use_case_1 = __webpack_require__(/*! ./application/use-cases/create-user/create-user.use-case */ "./apps/transversal-ms/src/modules/users/application/use-cases/create-user/create-user.use-case.ts");
const get_user_by_external_id_use_case_1 = __webpack_require__(/*! ./application/use-cases/get-user-by-external-id/get-user-by-external-id.use-case */ "./apps/transversal-ms/src/modules/users/application/use-cases/get-user-by-external-id/get-user-by-external-id.use-case.ts");
const list_users_use_case_1 = __webpack_require__(/*! ./application/use-cases/list-users/list-users.use-case */ "./apps/transversal-ms/src/modules/users/application/use-cases/list-users/list-users.use-case.ts");
const update_user_by_external_id_use_case_1 = __webpack_require__(/*! ./application/use-cases/update-user-by-external-id/update-user-by-external-id.use-case */ "./apps/transversal-ms/src/modules/users/application/use-cases/update-user-by-external-id/update-user-by-external-id.use-case.ts");
const delete_user_by_external_id_use_case_1 = __webpack_require__(/*! ./application/use-cases/delete-user-by-external-id/delete-user-by-external-id.use-case */ "./apps/transversal-ms/src/modules/users/application/use-cases/delete-user-by-external-id/delete-user-by-external-id.use-case.ts");
const get_user_me_use_case_1 = __webpack_require__(/*! ./application/use-cases/get-user-me/get-user-me.use-case */ "./apps/transversal-ms/src/modules/users/application/use-cases/get-user-me/get-user-me.use-case.ts");
const users_controller_1 = __webpack_require__(/*! ./presentation/users.controller */ "./apps/transversal-ms/src/modules/users/presentation/users.controller.ts");
const users_tokens_1 = __webpack_require__(/*! ./users.tokens */ "./apps/transversal-ms/src/modules/users/users.tokens.ts");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        controllers: [users_controller_1.UsersController],
        providers: [
            cognito_user_provisioning_adapter_1.CognitoUserProvisioningAdapter,
            {
                provide: users_tokens_1.COGNITO_USER_PROVISIONING_PORT,
                useExisting: cognito_user_provisioning_adapter_1.CognitoUserProvisioningAdapter,
            },
            create_user_use_case_1.CreateUserUseCase,
            get_user_by_external_id_use_case_1.GetUserByExternalIdUseCase,
            list_users_use_case_1.ListUsersUseCase,
            update_user_by_external_id_use_case_1.UpdateUserByExternalIdUseCase,
            delete_user_by_external_id_use_case_1.DeleteUserByExternalIdUseCase,
            get_user_me_use_case_1.GetUserMeUseCase,
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
exports.PARTNER_LINK_READER = exports.COGNITO_USER_PROVISIONING_PORT = exports.USER_REPOSITORY = void 0;
exports.USER_REPOSITORY = Symbol('USER_REPOSITORY');
exports.COGNITO_USER_PROVISIONING_PORT = Symbol('COGNITO_USER_PROVISIONING_PORT');
exports.PARTNER_LINK_READER = Symbol('PARTNER_LINK_READER');


/***/ },

/***/ "./apps/transversal-ms/src/types/express-augmentation.ts"
/*!***************************************************************!*\
  !*** ./apps/transversal-ms/src/types/express-augmentation.ts ***!
  \***************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));


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
exports.BatchLogsStatus = exports.PaymentsMethod = exports.PaymentsStatus = exports.AdjustmentsStatus = exports.DisbursementBatchesStatus = exports.DisbursementStatus = exports.LoanStatus = exports.LoanRequestStatus = exports.ExperianQueryStatus = exports.BusinessSeniorityCatalogState = exports.RolePermissionLinkState = exports.PermissionDefinitionState = exports.RoleDefinitionState = exports.PurchaseOrderRecordState = exports.BankAccountRecordState = exports.ShareholderRecordState = exports.LegalRepresentativeLifecycleState = exports.PersonRecordState = exports.BusinessLifecycleState = exports.CatalogActivationState = exports.UserState = exports.SalesRepresentativeRecordState = exports.PartnerOnboardingSagaStatus = exports.SupplierState = exports.PartnerState = exports.DocumentVerificationStatus = exports.ContractTemplateCatalogStatus = exports.ContractCatalogStatus = exports.CreditApplicationStatus = exports.CategoryState = exports.CreditFacilityState = exports.AsyncJobStep = exports.AsyncJobStatus = void 0;
var AsyncJobStatus;
(function (AsyncJobStatus) {
    AsyncJobStatus["PENDING"] = "PENDING";
    AsyncJobStatus["RUNNING"] = "RUNNING";
    AsyncJobStatus["COMPLETED"] = "COMPLETED";
    AsyncJobStatus["FAILED"] = "FAILED";
})(AsyncJobStatus || (exports.AsyncJobStatus = AsyncJobStatus = {}));
var AsyncJobStep;
(function (AsyncJobStep) {
    AsyncJobStep["ENQUEUED"] = "ENQUEUED";
    AsyncJobStep["AWAITING_PERSON_CREATION"] = "AWAITING_PERSON_CREATION";
    AsyncJobStep["AWAITING_BUSINESS_CREATION"] = "AWAITING_BUSINESS_CREATION";
    AsyncJobStep["COMPLETED"] = "COMPLETED";
    AsyncJobStep["FAILED"] = "FAILED";
})(AsyncJobStep || (exports.AsyncJobStep = AsyncJobStep = {}));
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
    CreditApplicationStatus["APPROVED_PENDING_SIGNATURE"] = "approved_pending_signature";
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
    AiAgentAnalysisRecommendation["INTERVIEW"] = "interview";
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
    hierarchyPath;
    children;
    state;
    person;
    personId;
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
    (0, typeorm_1.Column)({ name: 'hierarchy_path', type: 'text' }),
    __metadata("design:type", String)
], UserEntity.prototype, "hierarchyPath", void 0);
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
    (0, typeorm_1.RelationId)((u) => u.person),
    __metadata("design:type", Object)
], UserEntity.prototype, "personId", void 0);
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

/***/ "@aws-sdk/client-cognito-identity-provider"
/*!************************************************************!*\
  !*** external "@aws-sdk/client-cognito-identity-provider" ***!
  \************************************************************/
(module) {

module.exports = require("@aws-sdk/client-cognito-identity-provider");

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

/***/ "@nestjs/passport"
/*!***********************************!*\
  !*** external "@nestjs/passport" ***!
  \***********************************/
(module) {

module.exports = require("@nestjs/passport");

/***/ },

/***/ "@nestjs/swagger"
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
(module) {

module.exports = require("@nestjs/swagger");

/***/ },

/***/ "@nestjs/throttler"
/*!************************************!*\
  !*** external "@nestjs/throttler" ***!
  \************************************/
(module) {

module.exports = require("@nestjs/throttler");

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

/***/ "helmet"
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
(module) {

module.exports = require("helmet");

/***/ },

/***/ "jwks-rsa"
/*!***************************!*\
  !*** external "jwks-rsa" ***!
  \***************************/
(module) {

module.exports = require("jwks-rsa");

/***/ },

/***/ "passport-jwt"
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
(module) {

module.exports = require("passport-jwt");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./apps/transversal-ms/src/main.ts");
/******/ 	
/******/ })()
;