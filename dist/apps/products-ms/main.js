/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/products-ms/src/app.controller.ts"
/*!************************************************!*\
  !*** ./apps/products-ms/src/app.controller.ts ***!
  \************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const health_response_dto_1 = __webpack_require__(/*! @common/dto/health-response.dto */ "./apps/products-ms/src/common/dto/health-response.dto.ts");
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


/***/ },

/***/ "./apps/products-ms/src/app.module.ts"
/*!********************************************!*\
  !*** ./apps/products-ms/src/app.module.ts ***!
  \********************************************/
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
const dotenv_config_1 = __webpack_require__(/*! ./config/dotenv.config */ "./apps/products-ms/src/config/dotenv.config.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const products_data_1 = __webpack_require__(/*! @app/products-data */ "./libs/products-data/src/index.ts");
const infrastructure_module_1 = __webpack_require__(/*! @infrastructure/infrastructure.module */ "./apps/products-ms/src/infrastructure/infrastructure.module.ts");
const auth_module_1 = __webpack_require__(/*! @modules/auth/auth.module */ "./apps/products-ms/src/modules/auth/auth.module.ts");
const categories_module_1 = __webpack_require__(/*! @modules/categories/categories.module */ "./apps/products-ms/src/modules/categories/categories.module.ts");
const credit_facilities_module_1 = __webpack_require__(/*! @modules/credit-facilities/credit-facilities.module */ "./apps/products-ms/src/modules/credit-facilities/credit-facilities.module.ts");
const credit_applications_module_1 = __webpack_require__(/*! @modules/credit-applications/credit-applications.module */ "./apps/products-ms/src/modules/credit-applications/credit-applications.module.ts");
const app_config_1 = __importDefault(__webpack_require__(/*! ./config/app.config */ "./apps/products-ms/src/config/app.config.ts"));
const sqs_config_1 = __webpack_require__(/*! ./config/sqs.config */ "./apps/products-ms/src/config/sqs.config.ts");
const app_controller_1 = __webpack_require__(/*! ./app.controller */ "./apps/products-ms/src/app.controller.ts");
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
            auth_module_1.AuthModule,
            categories_module_1.CategoriesModule,
            credit_facilities_module_1.CreditFacilitiesModule,
            credit_applications_module_1.CreditApplicationsModule,
        ],
        controllers: [app_controller_1.appController],
    })
], AppModule);


/***/ },

/***/ "./apps/products-ms/src/common/dto/health-response.dto.ts"
/*!****************************************************************!*\
  !*** ./apps/products-ms/src/common/dto/health-response.dto.ts ***!
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
    (0, swagger_1.ApiProperty)({ example: 'products-ms' }),
    __metadata("design:type", String)
], HealthResponseDto.prototype, "service", void 0);


/***/ },

/***/ "./apps/products-ms/src/common/ports/products-reference-lookup.port.ts"
/*!*****************************************************************************!*\
  !*** ./apps/products-ms/src/common/ports/products-reference-lookup.port.ts ***!
  \*****************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PRODUCTS_REFERENCE_LOOKUP = void 0;
exports.PRODUCTS_REFERENCE_LOOKUP = Symbol('PRODUCTS_REFERENCE_LOOKUP');


/***/ },

/***/ "./apps/products-ms/src/config/app.config.ts"
/*!***************************************************!*\
  !*** ./apps/products-ms/src/config/app.config.ts ***!
  \***************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
exports["default"] = (0, config_1.registerAs)('config', () => {
    return {
        natural_person_onboarding: {
            default_country_code: (process.env.NATURAL_PERSON_ONBOARDING_DEFAULT_COUNTRY_CODE ?? 'CO').trim(),
            sqs_poll_timeout_ms: Number(process.env.NATURAL_PERSON_ONBOARDING_SQS_POLL_TIMEOUT_MS ?? 60000),
            sqs_poll_interval_ms: Number(process.env.NATURAL_PERSON_ONBOARDING_SQS_POLL_INTERVAL_MS ?? 300),
        },
        environment: process.env.APP_ENV || 'development',
        port: process.env.PRODUCTS_MS_PORT || 8083,
        cognito: {
            region: process.env.COGNITO_REGION ?? process.env.AWS_REGION ?? 'us-east-1',
            userPoolId: process.env.COGNITO_USER_POOL_ID ?? '',
            clientId: process.env.COGNITO_CLIENT_ID ?? '',
            clientSecret: process.env.COGNITO_CLIENT_SECRET ?? '',
        },
    };
});


/***/ },

/***/ "./apps/products-ms/src/config/dotenv.config.ts"
/*!******************************************************!*\
  !*** ./apps/products-ms/src/config/dotenv.config.ts ***!
  \******************************************************/
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

/***/ "./apps/products-ms/src/config/sqs.config.ts"
/*!***************************************************!*\
  !*** ./apps/products-ms/src/config/sqs.config.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sqs_config = void 0;
exports.get_products_sqs_config_from_env = get_products_sqs_config_from_env;
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const PRODUCTS_SQS_OUTBOUND_QUEUE_URL_DEFAULT = 'http://127.0.0.1:4566/000000000000/products-ms-outbound-placeholder';
class ProductsSqsEnv {
    aws_region = 'us-east-1';
    aws_sqs_endpoint;
    products_sqs_outbound_queue_url;
    products_sqs_inbound_queue_url;
    products_sqs_create_person_queue_url;
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
    (0, class_transformer_1.Transform)(({ value }) => (value === '' || value === undefined ? undefined : value)),
    (0, class_validator_1.IsUrl)({ require_tld: false }),
    __metadata("design:type", String)
], ProductsSqsEnv.prototype, "products_sqs_create_person_queue_url", void 0);
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
    const create_person_queue_raw = process.env.TRANSVERSAL_SQS_CREATE_PERSON_QUEUE_URL?.trim();
    const env = validate_products_sqs_env({
        aws_region: process.env.AWS_REGION ?? 'us-east-1',
        aws_sqs_endpoint: process.env.AWS_SQS_ENDPOINT,
        products_sqs_outbound_queue_url: outbound_raw && outbound_raw.length > 0
            ? outbound_raw
            : PRODUCTS_SQS_OUTBOUND_QUEUE_URL_DEFAULT,
        products_sqs_inbound_queue_url: process.env.PRODUCTS_SQS_INBOUND_QUEUE_URL,
        products_sqs_create_person_queue_url: create_person_queue_raw ?? undefined,
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
        create_person_queue_url: env.products_sqs_create_person_queue_url,
        wait_time_seconds: env.products_sqs_wait_time_seconds,
        max_number_of_messages: env.products_sqs_max_number_of_messages,
        visibility_timeout_seconds: env.products_sqs_visibility_timeout_seconds,
        delete_on_validation_error: env.products_sqs_delete_on_validation_error,
    };
}
exports.sqs_config = (0, config_1.registerAs)('sqs', () => get_products_sqs_config_from_env());


/***/ },

/***/ "./apps/products-ms/src/config/typeorm.config.ts"
/*!*******************************************************!*\
  !*** ./apps/products-ms/src/config/typeorm.config.ts ***!
  \*******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ./dotenv.config */ "./apps/products-ms/src/config/dotenv.config.ts");
const products_data_1 = __webpack_require__(/*! @app/products-data */ "./libs/products-data/src/index.ts");
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


/***/ },

/***/ "./apps/products-ms/src/infrastructure/database/adapters/stub-credit-application-document-storage.adapter.ts"
/*!*******************************************************************************************************************!*\
  !*** ./apps/products-ms/src/infrastructure/database/adapters/stub-credit-application-document-storage.adapter.ts ***!
  \*******************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StubCreditApplicationDocumentStorageAdapter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let StubCreditApplicationDocumentStorageAdapter = class StubCreditApplicationDocumentStorageAdapter {
    upload(_params) {
        throw new common_1.NotImplementedException('credit_application_document_storage_not_implemented');
    }
};
exports.StubCreditApplicationDocumentStorageAdapter = StubCreditApplicationDocumentStorageAdapter;
exports.StubCreditApplicationDocumentStorageAdapter = StubCreditApplicationDocumentStorageAdapter = __decorate([
    (0, common_1.Injectable)()
], StubCreditApplicationDocumentStorageAdapter);


/***/ },

/***/ "./apps/products-ms/src/infrastructure/database/adapters/typeorm-client-registration.adapter.ts"
/*!******************************************************************************************************!*\
  !*** ./apps/products-ms/src/infrastructure/database/adapters/typeorm-client-registration.adapter.ts ***!
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TypeormClientRegistrationAdapter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
let TypeormClientRegistrationAdapter = class TypeormClientRegistrationAdapter {
    data_source;
    constructor(data_source) {
        this.data_source = data_source;
    }
    async resolve_city_internal_id(city_external_id) {
        const rows = await this.data_source.query(`SELECT id FROM transversal_schema.cities WHERE external_id = $1 LIMIT 1`, [city_external_id]);
        return rows[0]?.id ?? null;
    }
    async find_person_by_doc_number(doc_number) {
        const rows = await this.data_source.query(`SELECT id FROM transversal_schema.persons WHERE doc_number = $1 LIMIT 1`, [doc_number]);
        return rows[0]?.id ?? null;
    }
    async get_person_internal_id_by_external_id(external_id) {
        const rows = await this.data_source.query(`SELECT id FROM transversal_schema.persons WHERE external_id = $1::uuid LIMIT 1`, [external_id]);
        return rows[0]?.id ?? null;
    }
    async patch_person_email_and_birth_date(person_id, email, birth_date_iso) {
        await this.data_source.query(`UPDATE transversal_schema.persons
       SET email = COALESCE($2, email),
           birth_date = COALESCE($3::date, birth_date)
       WHERE id = $1`, [person_id, email, birth_date_iso]);
    }
    async create_person(data) {
        const rows = await this.data_source.query(`INSERT INTO transversal_schema.persons
         (external_id, first_name, last_name, doc_type, doc_number, phone, email, city_id)
       VALUES
         (gen_random_uuid(), $1, $2, $3::transversal_schema.persons_doc_type_enum, $4, $5, $6, $7)
       RETURNING id`, [
            data.first_name,
            data.last_name,
            data.doc_type,
            data.doc_number,
            data.phone ?? null,
            data.email ?? null,
            data.city_id ?? null,
        ]);
        return rows[0].id;
    }
    async find_business_by_person_id(person_id) {
        const rows = await this.data_source.query(`SELECT id FROM suppliers_schema.businesses WHERE person_id = $1 ORDER BY id DESC LIMIT 1`, [person_id]);
        return rows[0]?.id ?? null;
    }
    async create_business(data) {
        const rows = await this.data_source.query(`INSERT INTO suppliers_schema.businesses
         (external_id, person_id, entity_type, business_name, business_address,
          business_type, relationship_to_business, city_id)
       VALUES
         (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7)
       RETURNING id`, [
            data.person_id,
            data.entity_type,
            data.business_name ?? null,
            data.business_address ?? null,
            data.business_type ?? null,
            data.relationship_to_business ?? null,
            data.city_id ?? null,
        ]);
        return rows[0].id;
    }
};
exports.TypeormClientRegistrationAdapter = TypeormClientRegistrationAdapter;
exports.TypeormClientRegistrationAdapter = TypeormClientRegistrationAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _a : Object])
], TypeormClientRegistrationAdapter);


/***/ },

/***/ "./apps/products-ms/src/infrastructure/database/adapters/typeorm-create-person-sqs-result-poll.adapter.ts"
/*!****************************************************************************************************************!*\
  !*** ./apps/products-ms/src/infrastructure/database/adapters/typeorm-create-person-sqs-result-poll.adapter.ts ***!
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
exports.TypeormCreatePersonSqsResultPollAdapter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const transversal_data_1 = __webpack_require__(/*! @app/transversal-data */ "./libs/transversal-data/src/index.ts");
let TypeormCreatePersonSqsResultPollAdapter = class TypeormCreatePersonSqsResultPollAdapter extends transversal_data_1.TypeormSqsIdempotencyPollBaseAdapter {
    constructor(repo, config_service) {
        const po = config_service.get('config.natural_person_onboarding');
        super(repo, {
            timeout_ms: po?.sqs_poll_timeout_ms ?? 60_000,
            interval_ms: po?.sqs_poll_interval_ms ?? 300,
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
exports.TypeormCreatePersonSqsResultPollAdapter = TypeormCreatePersonSqsResultPollAdapter;
exports.TypeormCreatePersonSqsResultPollAdapter = TypeormCreatePersonSqsResultPollAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transversal_data_1.PartnerCreateUserSqsIdempotencyEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], TypeormCreatePersonSqsResultPollAdapter);


/***/ },

/***/ "./apps/products-ms/src/infrastructure/database/common/typeorm-products-reference-lookup.adapter.ts"
/*!**********************************************************************************************************!*\
  !*** ./apps/products-ms/src/infrastructure/database/common/typeorm-products-reference-lookup.adapter.ts ***!
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TypeormProductsReferenceLookupAdapter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const products_data_1 = __webpack_require__(/*! @app/products-data */ "./libs/products-data/src/index.ts");
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
    async get_partner_internal_id_by_external_id(external_id) {
        const rows = await this.data_source.query(`SELECT id
       FROM suppliers_schema.partners
       WHERE external_id = $1::uuid
       LIMIT 1`, [external_id]);
        return rows[0]?.id ?? null;
    }
    async get_sales_representative_internal_id_by_external_id(external_id, partner_internal_id) {
        if (partner_internal_id !== null) {
            const rows = await this.data_source.query(`SELECT sr.id
         FROM suppliers_schema.sales_representatives sr
         WHERE sr.external_id = $1::uuid AND sr.partner_id = $2
         LIMIT 1`, [external_id, partner_internal_id]);
            return rows[0]?.id ?? null;
        }
        const rows = await this.data_source.query(`SELECT id
       FROM suppliers_schema.sales_representatives
       WHERE external_id = $1::uuid
       LIMIT 1`, [external_id]);
        return rows[0]?.id ?? null;
    }
};
exports.TypeormProductsReferenceLookupAdapter = TypeormProductsReferenceLookupAdapter;
exports.TypeormProductsReferenceLookupAdapter = TypeormProductsReferenceLookupAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(products_data_1.CreditFacilityEntity)),
    __param(1, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _b : Object])
], TypeormProductsReferenceLookupAdapter);


/***/ },

/***/ "./apps/products-ms/src/infrastructure/database/mappers/category.mapper.ts"
/*!*********************************************************************************!*\
  !*** ./apps/products-ms/src/infrastructure/database/mappers/category.mapper.ts ***!
  \*********************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoryMapper = void 0;
const category_models_1 = __webpack_require__(/*! @modules/categories/domain/models/category.models */ "./apps/products-ms/src/modules/categories/domain/models/category.models.ts");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
function credit_facility_id_from_entity(row) {
    const cf = row.creditFacility?.[0];
    if (cf === undefined) {
        throw new Error('CategoryMapper: falta facilidad vía client_category_assignments para la categoría');
    }
    return cf.id;
}
class CategoryMapper {
    static to_domain(row) {
        return new category_models_1.Category(row.id, row.externalId, credit_facility_id_from_entity(row), row.partner?.id ?? row.partnerId ?? null, row.name, row.modality, row.discountPercentage, row.interestRate, row.disbursementFeePercent ?? null, row.minimumDisbursementFee ?? null, row.delayDays, row.termDays, row.installmentFrequency, row.installmentCount, row.initialPaymentPct, row.state, row.createdAt, row.updatedAt);
    }
    static from_raw_row(row) {
        const state_raw = String(row['state'] ?? shared_1.CategoryState.ACTIVE);
        const state = state_raw === shared_1.CategoryState.INACTIVE
            ? shared_1.CategoryState.INACTIVE
            : shared_1.CategoryState.ACTIVE;
        return new category_models_1.Category(Number(row['id']), String(row['external_id']), Number(row['credit_facility_id']), row['partner_id'] === null || row['partner_id'] === undefined
            ? null
            : Number(row['partner_id']), String(row['name']), String(row['modality']), String(row['discount_percentage']), String(row['interest_rate']), row['disbursement_fee_percent'] === null ||
            row['disbursement_fee_percent'] === undefined
            ? null
            : String(row['disbursement_fee_percent']), row['minimum_disbursement_fee'] === null ||
            row['minimum_disbursement_fee'] === undefined
            ? null
            : String(row['minimum_disbursement_fee']), Number(row['delay_days']), Number(row['term_days']), String(row['installment_frequency']), Number(row['installment_count']), String(row['initial_payment_pct']), state, new Date(String(row['created_at'])), new Date(String(row['updated_at'])));
    }
}
exports.CategoryMapper = CategoryMapper;


/***/ },

/***/ "./apps/products-ms/src/infrastructure/database/mappers/credit-application.mapper.ts"
/*!*******************************************************************************************!*\
  !*** ./apps/products-ms/src/infrastructure/database/mappers/credit-application.mapper.ts ***!
  \*******************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreditApplicationMapper = void 0;
const credit_application_models_1 = __webpack_require__(/*! @modules/credit-applications/domain/models/credit-application.models */ "./apps/products-ms/src/modules/credit-applications/domain/models/credit-application.models.ts");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
function to_nullable_number(val) {
    if (val === null || val === undefined)
        return null;
    const n = Number(val);
    return isNaN(n) ? null : n;
}
function to_nullable_string(val) {
    if (val === null || val === undefined)
        return null;
    return String(val);
}
function to_nullable_date(val) {
    if (val === null || val === undefined)
        return null;
    return new Date(String(val));
}
function to_nullable_bool(val) {
    if (val === null || val === undefined)
        return null;
    if (typeof val === 'boolean')
        return val;
    return val === 'true' || val === true;
}
function to_status(val) {
    const s = String(val ?? shared_1.CreditApplicationStatus.IN_PROGRESS);
    return Object.values(shared_1.CreditApplicationStatus).includes(s)
        ? s
        : shared_1.CreditApplicationStatus.IN_PROGRESS;
}
class CreditApplicationMapper {
    static to_domain(row) {
        return new credit_application_models_1.CreditApplication(row.id, row.externalId, row.person?.id ?? null, row.partner?.id ?? null, row.partnerCategory?.id ?? null, row.business?.id ?? null, row.salesRepresentative?.id ?? null, row.numberOfLocations, row.numberOfEmployees, row.businessSeniority, row.sectorExperience, row.businessFlagshipM2, row.businessHasRent, row.businessRentAmount, row.monthlyIncome, row.monthlyExpenses, row.monthlyPurchases, row.currentPurchases, row.totalAssets, row.requestedCreditLine, row.isCurrentClient, row.status, row.submissionDate, row.approvalDate, row.rejectionReason, row.creditStudyDate, row.creditScore, row.creditDecision, row.approvedCreditLine, row.analystReport, row.riskProfile, row.privacyPolicyAccepted, row.privacyPolicyDate, row.createdAt, row.updatedAt);
    }
    static from_raw_row(row) {
        return new credit_application_models_1.CreditApplication(Number(row['id']), String(row['external_id']), to_nullable_number(row['person_id']), to_nullable_number(row['partner_id']), to_nullable_number(row['partner_category_id']), to_nullable_number(row['business_id']), to_nullable_number(row['sales_representative_id']), to_nullable_number(row['number_of_locations']), to_nullable_number(row['number_of_employees']), to_nullable_string(row['business_seniority']), to_nullable_string(row['sector_experience']), to_nullable_number(row['business_flagship_m2']), to_nullable_bool(row['business_has_rent']), to_nullable_number(row['business_rent_amount']), to_nullable_number(row['monthly_income']), to_nullable_number(row['monthly_expenses']), to_nullable_number(row['monthly_purchases']), to_nullable_number(row['current_purchases']), to_nullable_number(row['total_assets']), to_nullable_number(row['requested_credit_line']), row['is_current_client'] === true || row['is_current_client'] === 'true', to_status(row['status']), to_nullable_date(row['submission_date']), to_nullable_date(row['approval_date']), to_nullable_string(row['rejection_reason']), to_nullable_date(row['credit_study_date']), to_nullable_string(row['credit_score']), to_nullable_string(row['credit_decision']), to_nullable_number(row['approved_credit_line']), to_nullable_string(row['analyst_report']), to_nullable_string(row['risk_profile']), row['privacy_policy_accepted'] === true || row['privacy_policy_accepted'] === 'true', to_nullable_date(row['privacy_policy_date']), new Date(String(row['created_at'])), new Date(String(row['updated_at'])));
    }
}
exports.CreditApplicationMapper = CreditApplicationMapper;


/***/ },

/***/ "./apps/products-ms/src/infrastructure/database/mappers/credit-facility.mapper.ts"
/*!****************************************************************************************!*\
  !*** ./apps/products-ms/src/infrastructure/database/mappers/credit-facility.mapper.ts ***!
  \****************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreditFacilityMapper = void 0;
const credit_facility_models_1 = __webpack_require__(/*! @modules/credit-facilities/domain/models/credit-facility.models */ "./apps/products-ms/src/modules/credit-facilities/domain/models/credit-facility.models.ts");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
function contract_join_to_external_id(ref) {
    if (ref === null || ref === undefined) {
        return null;
    }
    return ref.externalId ?? null;
}
class CreditFacilityMapper {
    static to_domain(row) {
        return new credit_facility_models_1.CreditFacility(row.id, row.externalId, contract_join_to_external_id(row.contract), row.state, row.totalLimit, row.createdAt, row.updatedAt);
    }
    static from_raw_row(row) {
        const state_raw = String(row['state'] ?? shared_1.CreditFacilityState.ACTIVE);
        const state = state_raw === shared_1.CreditFacilityState.INACTIVE
            ? shared_1.CreditFacilityState.INACTIVE
            : shared_1.CreditFacilityState.ACTIVE;
        return new credit_facility_models_1.CreditFacility(Number(row['id']), String(row['external_id']), row['contract_id'] === null || row['contract_id'] === undefined
            ? null
            : String(row['contract_id']), state, String(row['total_limit']), new Date(String(row['created_at'])), new Date(String(row['updated_at'])));
    }
}
exports.CreditFacilityMapper = CreditFacilityMapper;


/***/ },

/***/ "./apps/products-ms/src/infrastructure/database/repositories/typeorm-category.repository.ts"
/*!**************************************************************************************************!*\
  !*** ./apps/products-ms/src/infrastructure/database/repositories/typeorm-category.repository.ts ***!
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
exports.TypeormCategoryRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const products_data_1 = __webpack_require__(/*! @app/products-data */ "./libs/products-data/src/index.ts");
const category_mapper_1 = __webpack_require__(/*! @infrastructure/database/mappers/category.mapper */ "./apps/products-ms/src/infrastructure/database/mappers/category.mapper.ts");
const CATEGORY_SELECT = {
    id: true,
    externalId: true,
    name: true,
    modality: true,
    discountPercentage: true,
    interestRate: true,
    disbursementFeePercent: true,
    minimumDisbursementFee: true,
    delayDays: true,
    termDays: true,
    installmentFrequency: true,
    installmentCount: true,
    initialPaymentPct: true,
    state: true,
    createdAt: true,
    updatedAt: true,
    partner: {
        id: true,
    },
    creditFacility: {
        id: true,
    },
};
const CATEGORY_RELATIONS = {
    creditFacility: true,
    partner: true,
};
let TypeormCategoryRepository = class TypeormCategoryRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async hydrate_credit_facilities_from_assignments(rows) {
        const missing = rows.filter((r) => (r.creditFacility?.length ?? 0) === 0);
        if (missing.length === 0) {
            return;
        }
        const ids = missing.map((r) => r.id);
        const links = await this.repo.query(`SELECT category_id, credit_facility_id
       FROM products_schema.client_category_assignments
       WHERE category_id = ANY($1::bigint[])`, [ids]);
        const by_category = new Map(links.map((l) => [
            Number(l.category_id),
            Number(l.credit_facility_id),
        ]));
        for (const r of missing) {
            const cf_id = by_category.get(r.id);
            if (cf_id !== undefined) {
                r.creditFacility = [{ id: cf_id }];
            }
        }
    }
    async find_by_external_id(external_id) {
        const row = await this.repo.findOne({
            where: { externalId: external_id },
            select: CATEGORY_SELECT,
            relations: CATEGORY_RELATIONS,
        });
        if (!row) {
            return null;
        }
        await this.hydrate_credit_facilities_from_assignments([row]);
        return category_mapper_1.CategoryMapper.to_domain(row);
    }
    async find_all(filter) {
        const where = {};
        if (filter?.credit_facility_id !== undefined) {
            where['creditFacility'] = { id: (0, typeorm_2.Equal)(filter.credit_facility_id) };
        }
        if (filter?.partner_id !== undefined) {
            where['partner'] = { id: (0, typeorm_2.Equal)(filter.partner_id) };
        }
        const rows = await this.repo.find({
            where,
            select: CATEGORY_SELECT,
            relations: CATEGORY_RELATIONS,
            order: { id: 'ASC' },
        });
        await this.hydrate_credit_facilities_from_assignments(rows);
        return rows.map((r) => category_mapper_1.CategoryMapper.to_domain(r));
    }
    async create(props) {
        return await this.repo.manager.transaction(async (manager) => {
            const rows = await manager.query(`INSERT INTO products_schema.categories (
        external_id, partner_id, name, modality,
        discount_percentage, interest_rate, disbursement_fee_percent,
        minimum_disbursement_fee, delay_days, term_days,
        installment_frequency, installment_count, initial_payment_pct,
        state
      ) VALUES (
        gen_random_uuid(), $1, $2, $3::products_schema.loan_request_modality,
        $4, $5, $6, $7, $8, $9,
        $10::products_schema.category_installment_frequency, $11, $12,
        $13::products_schema.credit_facility_state
      )
      RETURNING id, external_id, created_at, updated_at, partner_id, name, modality,
        discount_percentage, interest_rate, disbursement_fee_percent, minimum_disbursement_fee,
        delay_days, term_days, installment_frequency, installment_count, initial_payment_pct,
        state`, [
                props.partner_id,
                props.name,
                props.modality,
                props.discount_percentage,
                props.interest_rate,
                props.disbursement_fee_percent,
                props.minimum_disbursement_fee,
                props.delay_days,
                props.term_days,
                props.installment_frequency,
                props.installment_count,
                props.initial_payment_pct,
                props.state,
            ]);
            const raw = rows[0];
            await manager.query(`INSERT INTO products_schema.client_category_assignments (credit_facility_id, category_id)
         VALUES ($1, $2)`, [props.credit_facility_id, Number(raw['id'])]);
            return category_mapper_1.CategoryMapper.from_raw_row({
                ...raw,
                credit_facility_id: props.credit_facility_id,
            });
        });
    }
    async update_by_external_id(external_id, patch) {
        const existing = await this.repo.findOne({
            where: { externalId: external_id },
            select: { id: true },
        });
        if (!existing) {
            return null;
        }
        if (patch.credit_facility_id !== undefined) {
            await this.repo.query(`UPDATE products_schema.client_category_assignments
         SET credit_facility_id = $1
         WHERE category_id = $2`, [patch.credit_facility_id, existing.id]);
        }
        const columns = [];
        const values = [];
        let i = 1;
        const add = (col, val) => {
            columns.push(`"${col}" = $${i}`);
            values.push(val);
            i += 1;
        };
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
        if (columns.length > 0) {
            columns.push(`"updated_at" = now()`);
            values.push(existing.id);
            await this.repo.query(`UPDATE products_schema.categories SET ${columns.join(', ')} WHERE id = $${i}`, values);
        }
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


/***/ },

/***/ "./apps/products-ms/src/infrastructure/database/repositories/typeorm-credit-application.repository.ts"
/*!************************************************************************************************************!*\
  !*** ./apps/products-ms/src/infrastructure/database/repositories/typeorm-credit-application.repository.ts ***!
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
exports.TypeormCreditApplicationRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const products_data_1 = __webpack_require__(/*! @app/products-data */ "./libs/products-data/src/index.ts");
const credit_application_mapper_1 = __webpack_require__(/*! @infrastructure/database/mappers/credit-application.mapper */ "./apps/products-ms/src/infrastructure/database/mappers/credit-application.mapper.ts");
const CREDIT_APPLICATION_SELECT = {
    id: true,
    externalId: true,
    person: { id: true },
    partner: { id: true },
    partnerCategory: { id: true },
    business: { id: true },
    salesRepresentative: { id: true },
    numberOfLocations: true,
    numberOfEmployees: true,
    businessSeniority: true,
    sectorExperience: true,
    businessFlagshipM2: true,
    businessHasRent: true,
    businessRentAmount: true,
    monthlyIncome: true,
    monthlyExpenses: true,
    monthlyPurchases: true,
    currentPurchases: true,
    totalAssets: true,
    requestedCreditLine: true,
    isCurrentClient: true,
    status: true,
    submissionDate: true,
    approvalDate: true,
    rejectionReason: true,
    creditStudyDate: true,
    creditScore: true,
    creditDecision: true,
    approvedCreditLine: true,
    analystReport: true,
    riskProfile: true,
    privacyPolicyAccepted: true,
    privacyPolicyDate: true,
    createdAt: true,
    updatedAt: true,
};
let TypeormCreditApplicationRepository = class TypeormCreditApplicationRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async find_by_external_id(external_id) {
        const row = await this.repo.findOne({
            where: { externalId: external_id },
            select: CREDIT_APPLICATION_SELECT,
        });
        return row ? credit_application_mapper_1.CreditApplicationMapper.to_domain(row) : null;
    }
    async find_all() {
        const rows = await this.repo.find({
            select: CREDIT_APPLICATION_SELECT,
            order: { id: 'DESC' },
        });
        return rows.map((r) => credit_application_mapper_1.CreditApplicationMapper.to_domain(r));
    }
    async find_by_partner_id(partner_id) {
        const rows = await this.repo.find({
            where: { partner: { id: partner_id } },
            select: CREDIT_APPLICATION_SELECT,
            order: { id: 'DESC' },
        });
        return rows.map((r) => credit_application_mapper_1.CreditApplicationMapper.to_domain(r));
    }
    async find_by_sales_representative_id(sales_representative_id) {
        const rows = await this.repo.find({
            where: { salesRepresentative: { id: sales_representative_id } },
            select: CREDIT_APPLICATION_SELECT,
            order: { id: 'DESC' },
        });
        return rows.map((r) => credit_application_mapper_1.CreditApplicationMapper.to_domain(r));
    }
    async create(props) {
        const rows = await this.repo.query(`INSERT INTO products_schema.credit_applications (
        external_id,
        person_id, partner_id, partner_category_id, business_id, sales_representative_id,
        status, is_current_client, privacy_policy_accepted,
        number_of_locations, number_of_employees, business_seniority, sector_experience,
        business_flagship_m2, business_has_rent, business_rent_amount,
        monthly_income, monthly_expenses, monthly_purchases, current_purchases,
        total_assets, requested_credit_line, submission_date, privacy_policy_date
      ) VALUES (
        COALESCE($1::uuid, gen_random_uuid()),
        $2, $3, $4, $5, $6,
        $7::products_schema.credit_application_status, $8, $9,
        $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24
      )
      RETURNING *`, [
            props.external_id ?? null,
            props.person_id ?? null,
            props.partner_id ?? null,
            props.partner_category_id ?? null,
            props.business_id ?? null,
            props.sales_representative_id,
            props.status,
            props.is_current_client ?? false,
            props.privacy_policy_accepted ?? false,
            props.number_of_locations ?? null,
            props.number_of_employees ?? null,
            props.business_seniority ?? null,
            props.sector_experience ?? null,
            props.business_flagship_m2 ?? null,
            props.business_has_rent ?? null,
            props.business_rent_amount ?? null,
            props.monthly_income ?? null,
            props.monthly_expenses ?? null,
            props.monthly_purchases ?? null,
            props.current_purchases ?? null,
            props.total_assets ?? null,
            props.requested_credit_line ?? null,
            props.submission_date ?? null,
            props.privacy_policy_date ?? null,
        ]);
        return credit_application_mapper_1.CreditApplicationMapper.from_raw_row(rows[0]);
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
        if (patch.status !== undefined)
            add('status', patch.status);
        if (patch.person_id !== undefined)
            add('person_id', patch.person_id);
        if (patch.partner_id !== undefined)
            add('partner_id', patch.partner_id);
        if (patch.partner_category_id !== undefined)
            add('partner_category_id', patch.partner_category_id);
        if (patch.business_id !== undefined)
            add('business_id', patch.business_id);
        if (patch.sales_representative_id !== undefined)
            add('sales_representative_id', patch.sales_representative_id);
        if (patch.is_current_client !== undefined)
            add('is_current_client', patch.is_current_client);
        if (patch.privacy_policy_accepted !== undefined)
            add('privacy_policy_accepted', patch.privacy_policy_accepted);
        if (patch.number_of_locations !== undefined)
            add('number_of_locations', patch.number_of_locations);
        if (patch.number_of_employees !== undefined)
            add('number_of_employees', patch.number_of_employees);
        if (patch.business_seniority !== undefined)
            add('business_seniority', patch.business_seniority);
        if (patch.sector_experience !== undefined)
            add('sector_experience', patch.sector_experience);
        if (patch.business_flagship_m2 !== undefined)
            add('business_flagship_m2', patch.business_flagship_m2);
        if (patch.business_has_rent !== undefined)
            add('business_has_rent', patch.business_has_rent);
        if (patch.business_rent_amount !== undefined)
            add('business_rent_amount', patch.business_rent_amount);
        if (patch.monthly_income !== undefined)
            add('monthly_income', patch.monthly_income);
        if (patch.monthly_expenses !== undefined)
            add('monthly_expenses', patch.monthly_expenses);
        if (patch.monthly_purchases !== undefined)
            add('monthly_purchases', patch.monthly_purchases);
        if (patch.current_purchases !== undefined)
            add('current_purchases', patch.current_purchases);
        if (patch.total_assets !== undefined)
            add('total_assets', patch.total_assets);
        if (patch.requested_credit_line !== undefined)
            add('requested_credit_line', patch.requested_credit_line);
        if (patch.submission_date !== undefined)
            add('submission_date', patch.submission_date);
        if (patch.approval_date !== undefined)
            add('approval_date', patch.approval_date);
        if (patch.rejection_reason !== undefined)
            add('rejection_reason', patch.rejection_reason);
        if (patch.credit_study_date !== undefined)
            add('credit_study_date', patch.credit_study_date);
        if (patch.credit_score !== undefined)
            add('credit_score', patch.credit_score);
        if (patch.credit_decision !== undefined)
            add('credit_decision', patch.credit_decision);
        if (patch.approved_credit_line !== undefined)
            add('approved_credit_line', patch.approved_credit_line);
        if (patch.analyst_report !== undefined)
            add('analyst_report', patch.analyst_report);
        if (patch.risk_profile !== undefined)
            add('risk_profile', patch.risk_profile);
        if (patch.privacy_policy_date !== undefined)
            add('privacy_policy_date', patch.privacy_policy_date);
        if (columns.length === 0) {
            return this.find_by_external_id(external_id);
        }
        columns.push(`"updated_at" = now()`);
        values.push(existing.id);
        await this.repo.query(`UPDATE products_schema.credit_applications SET ${columns.join(', ')} WHERE id = $${i}`, values);
        return this.find_by_external_id(external_id);
    }
    async delete_by_external_id(external_id) {
        const result = await this.repo.delete({ externalId: external_id });
        return (result.affected ?? 0) > 0;
    }
};
exports.TypeormCreditApplicationRepository = TypeormCreditApplicationRepository;
exports.TypeormCreditApplicationRepository = TypeormCreditApplicationRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(products_data_1.CreditApplicationEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], TypeormCreditApplicationRepository);


/***/ },

/***/ "./apps/products-ms/src/infrastructure/database/repositories/typeorm-credit-facility.repository.ts"
/*!*********************************************************************************************************!*\
  !*** ./apps/products-ms/src/infrastructure/database/repositories/typeorm-credit-facility.repository.ts ***!
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
exports.TypeormCreditFacilityRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const products_data_1 = __webpack_require__(/*! @app/products-data */ "./libs/products-data/src/index.ts");
const credit_facility_mapper_1 = __webpack_require__(/*! @infrastructure/database/mappers/credit-facility.mapper */ "./apps/products-ms/src/infrastructure/database/mappers/credit-facility.mapper.ts");
const CREDIT_FACILITY_SELECT = {
    id: true,
    externalId: true,
    contract: { externalId: true },
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
    async resolve_contract_internal_id(contract_ref) {
        if (contract_ref === null || contract_ref === undefined) {
            return null;
        }
        const trimmed = String(contract_ref).trim();
        if (trimmed.length === 0) {
            return null;
        }
        if (/^\d+$/.test(trimmed)) {
            const id = Number(trimmed);
            const ok = await this.repo.query(`SELECT id FROM products_schema.contracts WHERE id = $1::bigint LIMIT 1`, [id]);
            if (ok.length === 0) {
                throw new Error(`Contrato no encontrado: id=${trimmed}`);
            }
            return id;
        }
        const rows = await this.repo.query(`SELECT id FROM products_schema.contracts WHERE external_id = $1::uuid LIMIT 1`, [trimmed]);
        if (rows.length === 0) {
            throw new Error(`Contrato no encontrado: external_id=${trimmed}`);
        }
        return Number(rows[0].id);
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
        const contract_internal_id = await this.resolve_contract_internal_id(props.contract_id);
        const rows = await this.repo.query(`INSERT INTO products_schema.credit_facilities (
        external_id, contract_id, state, total_limit, business_id
      ) VALUES (
        COALESCE($1::uuid, gen_random_uuid()), $2, $3::products_schema.credit_facility_state, $4, $5
      )
      RETURNING id, external_id, created_at, updated_at, contract_id, state, total_limit, business_id`, [
            props.external_id ?? null,
            contract_internal_id,
            props.state,
            props.total_limit,
            props.business_id,
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
            const cid = await this.resolve_contract_internal_id(patch.contract_id);
            add('contract_id', cid);
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


/***/ },

/***/ "./apps/products-ms/src/infrastructure/database/services/postgres-type-orm-config.service.ts"
/*!***************************************************************************************************!*\
  !*** ./apps/products-ms/src/infrastructure/database/services/postgres-type-orm-config.service.ts ***!
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PostgresTypeOrmConfigService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_config_1 = __importDefault(__webpack_require__(/*! @config/typeorm.config */ "./apps/products-ms/src/config/typeorm.config.ts"));
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

/***/ "./apps/products-ms/src/infrastructure/infrastructure.module.ts"
/*!**********************************************************************!*\
  !*** ./apps/products-ms/src/infrastructure/infrastructure.module.ts ***!
  \**********************************************************************/
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
const postgres_type_orm_config_service_1 = __webpack_require__(/*! ./database/services/postgres-type-orm-config.service */ "./apps/products-ms/src/infrastructure/database/services/postgres-type-orm-config.service.ts");
const sqs_module_1 = __webpack_require__(/*! ./messaging/sqs/sqs.module */ "./apps/products-ms/src/infrastructure/messaging/sqs/sqs.module.ts");
const products_data_1 = __webpack_require__(/*! @app/products-data */ "./libs/products-data/src/index.ts");
const typeorm_category_repository_1 = __webpack_require__(/*! @infrastructure/database/repositories/typeorm-category.repository */ "./apps/products-ms/src/infrastructure/database/repositories/typeorm-category.repository.ts");
const typeorm_credit_facility_repository_1 = __webpack_require__(/*! @infrastructure/database/repositories/typeorm-credit-facility.repository */ "./apps/products-ms/src/infrastructure/database/repositories/typeorm-credit-facility.repository.ts");
const typeorm_credit_application_repository_1 = __webpack_require__(/*! @infrastructure/database/repositories/typeorm-credit-application.repository */ "./apps/products-ms/src/infrastructure/database/repositories/typeorm-credit-application.repository.ts");
const categories_tokens_1 = __webpack_require__(/*! @modules/categories/categories.tokens */ "./apps/products-ms/src/modules/categories/categories.tokens.ts");
const credit_facilities_tokens_1 = __webpack_require__(/*! @modules/credit-facilities/credit-facilities.tokens */ "./apps/products-ms/src/modules/credit-facilities/credit-facilities.tokens.ts");
const credit_applications_tokens_1 = __webpack_require__(/*! @modules/credit-applications/credit-applications.tokens */ "./apps/products-ms/src/modules/credit-applications/credit-applications.tokens.ts");
const client_registration_port_1 = __webpack_require__(/*! @modules/credit-applications/application/ports/client-registration.port */ "./apps/products-ms/src/modules/credit-applications/application/ports/client-registration.port.ts");
const credit_application_document_storage_port_1 = __webpack_require__(/*! @modules/credit-applications/application/ports/credit-application-document-storage.port */ "./apps/products-ms/src/modules/credit-applications/application/ports/credit-application-document-storage.port.ts");
const products_reference_lookup_port_1 = __webpack_require__(/*! @common/ports/products-reference-lookup.port */ "./apps/products-ms/src/common/ports/products-reference-lookup.port.ts");
const typeorm_products_reference_lookup_adapter_1 = __webpack_require__(/*! @infrastructure/database/common/typeorm-products-reference-lookup.adapter */ "./apps/products-ms/src/infrastructure/database/common/typeorm-products-reference-lookup.adapter.ts");
const typeorm_client_registration_adapter_1 = __webpack_require__(/*! @infrastructure/database/adapters/typeorm-client-registration.adapter */ "./apps/products-ms/src/infrastructure/database/adapters/typeorm-client-registration.adapter.ts");
const stub_credit_application_document_storage_adapter_1 = __webpack_require__(/*! @infrastructure/database/adapters/stub-credit-application-document-storage.adapter */ "./apps/products-ms/src/infrastructure/database/adapters/stub-credit-application-document-storage.adapter.ts");
const transversal_data_1 = __webpack_require__(/*! @app/transversal-data */ "./libs/transversal-data/src/index.ts");
const config_transversal_create_person_queue_url_adapter_1 = __webpack_require__(/*! @infrastructure/messaging/sqs/adapters/config-transversal-create-person-queue-url.adapter */ "./apps/products-ms/src/infrastructure/messaging/sqs/adapters/config-transversal-create-person-queue-url.adapter.ts");
const transversal_create_person_queue_url_port_1 = __webpack_require__(/*! @messaging/domain/ports/transversal-create-person-queue-url.port */ "./apps/products-ms/src/modules/messaging/domain/ports/transversal-create-person-queue-url.port.ts");
const publish_create_person_command_use_case_1 = __webpack_require__(/*! @messaging/application/use-cases/publish-create-person-command.use-case */ "./apps/products-ms/src/modules/messaging/application/use-cases/publish-create-person-command.use-case.ts");
const typeorm_create_person_sqs_result_poll_adapter_1 = __webpack_require__(/*! @infrastructure/database/adapters/typeorm-create-person-sqs-result-poll.adapter */ "./apps/products-ms/src/infrastructure/database/adapters/typeorm-create-person-sqs-result-poll.adapter.ts");
const create_person_sqs_result_reader_port_1 = __webpack_require__(/*! @modules/credit-applications/application/ports/create-person-sqs-result-reader.port */ "./apps/products-ms/src/modules/credit-applications/application/ports/create-person-sqs-result-reader.port.ts");
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
            typeorm_1.TypeOrmModule.forFeature([transversal_data_1.PartnerCreateUserSqsIdempotencyEntity]),
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
            {
                provide: credit_applications_tokens_1.CREDIT_APPLICATION_REPOSITORY,
                useClass: typeorm_credit_application_repository_1.TypeormCreditApplicationRepository,
            },
            typeorm_client_registration_adapter_1.TypeormClientRegistrationAdapter,
            {
                provide: client_registration_port_1.CLIENT_REGISTRATION_PORT,
                useExisting: typeorm_client_registration_adapter_1.TypeormClientRegistrationAdapter,
            },
            stub_credit_application_document_storage_adapter_1.StubCreditApplicationDocumentStorageAdapter,
            {
                provide: credit_application_document_storage_port_1.CREDIT_APPLICATION_DOCUMENT_STORAGE,
                useExisting: stub_credit_application_document_storage_adapter_1.StubCreditApplicationDocumentStorageAdapter,
            },
            config_transversal_create_person_queue_url_adapter_1.ConfigTransversalCreatePersonQueueUrlAdapter,
            {
                provide: transversal_create_person_queue_url_port_1.TRANSVERSAL_CREATE_PERSON_QUEUE_URL_PORT,
                useExisting: config_transversal_create_person_queue_url_adapter_1.ConfigTransversalCreatePersonQueueUrlAdapter,
            },
            publish_create_person_command_use_case_1.PublishCreatePersonCommandUseCase,
            typeorm_create_person_sqs_result_poll_adapter_1.TypeormCreatePersonSqsResultPollAdapter,
            {
                provide: create_person_sqs_result_reader_port_1.CREATE_PERSON_SQS_RESULT_READER_PORT,
                useExisting: typeorm_create_person_sqs_result_poll_adapter_1.TypeormCreatePersonSqsResultPollAdapter,
            },
        ],
        exports: [
            categories_tokens_1.CATEGORY_REPOSITORY,
            credit_facilities_tokens_1.CREDIT_FACILITY_REPOSITORY,
            credit_applications_tokens_1.CREDIT_APPLICATION_REPOSITORY,
            client_registration_port_1.CLIENT_REGISTRATION_PORT,
            credit_application_document_storage_port_1.CREDIT_APPLICATION_DOCUMENT_STORAGE,
            products_reference_lookup_port_1.PRODUCTS_REFERENCE_LOOKUP,
            publish_create_person_command_use_case_1.PublishCreatePersonCommandUseCase,
            create_person_sqs_result_reader_port_1.CREATE_PERSON_SQS_RESULT_READER_PORT,
        ],
    })
], InfrastructureModule);


/***/ },

/***/ "./apps/products-ms/src/infrastructure/messaging/sqs/adapters/config-outbound-products-queue-url.adapter.ts"
/*!******************************************************************************************************************!*\
  !*** ./apps/products-ms/src/infrastructure/messaging/sqs/adapters/config-outbound-products-queue-url.adapter.ts ***!
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
exports.ConfigOutboundProductsQueueUrlAdapter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
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


/***/ },

/***/ "./apps/products-ms/src/infrastructure/messaging/sqs/adapters/config-transversal-create-person-queue-url.adapter.ts"
/*!**************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/infrastructure/messaging/sqs/adapters/config-transversal-create-person-queue-url.adapter.ts ***!
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

/***/ "./apps/products-ms/src/infrastructure/messaging/sqs/adapters/sqs-message-publisher.adapter.ts"
/*!*****************************************************************************************************!*\
  !*** ./apps/products-ms/src/infrastructure/messaging/sqs/adapters/sqs-message-publisher.adapter.ts ***!
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

/***/ "./apps/products-ms/src/infrastructure/messaging/sqs/consumers/products-inbound-sqs.consumer.ts"
/*!******************************************************************************************************!*\
  !*** ./apps/products-ms/src/infrastructure/messaging/sqs/consumers/products-inbound-sqs.consumer.ts ***!
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
var ProductsInboundSqsConsumer_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductsInboundSqsConsumer = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const ingest_products_inbound_sqs_message_use_case_1 = __webpack_require__(/*! @messaging/application/use-cases/ingest-products-inbound-sqs-message.use-case */ "./apps/products-ms/src/modules/messaging/application/use-cases/ingest-products-inbound-sqs-message.use-case.ts");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
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


/***/ },

/***/ "./apps/products-ms/src/infrastructure/messaging/sqs/sqs.module.ts"
/*!*************************************************************************!*\
  !*** ./apps/products-ms/src/infrastructure/messaging/sqs/sqs.module.ts ***!
  \*************************************************************************/
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
const sqs_message_publisher_adapter_1 = __webpack_require__(/*! ./adapters/sqs-message-publisher.adapter */ "./apps/products-ms/src/infrastructure/messaging/sqs/adapters/sqs-message-publisher.adapter.ts");
const config_outbound_products_queue_url_adapter_1 = __webpack_require__(/*! ./adapters/config-outbound-products-queue-url.adapter */ "./apps/products-ms/src/infrastructure/messaging/sqs/adapters/config-outbound-products-queue-url.adapter.ts");
const products_inbound_sqs_consumer_1 = __webpack_require__(/*! ./consumers/products-inbound-sqs.consumer */ "./apps/products-ms/src/infrastructure/messaging/sqs/consumers/products-inbound-sqs.consumer.ts");
const messaging_application_module_1 = __webpack_require__(/*! @messaging/messaging-application.module */ "./apps/products-ms/src/modules/messaging/messaging-application.module.ts");
const outbound_message_publisher_port_1 = __webpack_require__(/*! @messaging/domain/ports/outbound-message-publisher.port */ "./apps/products-ms/src/modules/messaging/domain/ports/outbound-message-publisher.port.ts");
const products_outbound_queue_url_port_1 = __webpack_require__(/*! @messaging/domain/ports/products-outbound-queue-url.port */ "./apps/products-ms/src/modules/messaging/domain/ports/products-outbound-queue-url.port.ts");
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
                    create_person_queue_url: config_service.get('sqs.create_person_queue_url'),
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


/***/ },

/***/ "./apps/products-ms/src/modules/auth/auth.module.ts"
/*!**********************************************************!*\
  !*** ./apps/products-ms/src/modules/auth/auth.module.ts ***!
  \**********************************************************/
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
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const transversal_data_1 = __webpack_require__(/*! @app/transversal-data */ "./libs/transversal-data/src/index.ts");
const cognito_jwt_strategy_1 = __webpack_require__(/*! ./infrastructure/strategies/cognito-jwt.strategy */ "./apps/products-ms/src/modules/auth/infrastructure/strategies/cognito-jwt.strategy.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! ./infrastructure/guards/jwt-auth.guard */ "./apps/products-ms/src/modules/auth/infrastructure/guards/jwt-auth.guard.ts");
const roles_guard_1 = __webpack_require__(/*! ./infrastructure/guards/roles.guard */ "./apps/products-ms/src/modules/auth/infrastructure/guards/roles.guard.ts");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            typeorm_1.TypeOrmModule.forFeature([transversal_data_1.UserEntity, transversal_data_1.RoleEntity]),
        ],
        providers: [cognito_jwt_strategy_1.CognitoJwtStrategy, jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard],
        exports: [passport_1.PassportModule, jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard],
    })
], AuthModule);


/***/ },

/***/ "./apps/products-ms/src/modules/auth/infrastructure/guards/jwt-auth.guard.ts"
/*!***********************************************************************************!*\
  !*** ./apps/products-ms/src/modules/auth/infrastructure/guards/jwt-auth.guard.ts ***!
  \***********************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var JwtAuthGuard_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
let JwtAuthGuard = JwtAuthGuard_1 = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    logger = new common_1.Logger(JwtAuthGuard_1.name);
    canActivate(context) {
        this.logger.log('jwt_canActivate_start');
        return super.canActivate(context);
    }
    handleRequest(err, user, _info, _context, _status) {
        if (err) {
            this.logger.warn(`jwt_auth_failed reason=${err instanceof Error ? err.name : 'unknown'}`);
            throw err;
        }
        if (user === false || user === null || user === undefined) {
            this.logger.warn('jwt_auth_failed reason=unauthorized');
            throw new common_1.UnauthorizedException();
        }
        return user;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = JwtAuthGuard_1 = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);


/***/ },

/***/ "./apps/products-ms/src/modules/auth/infrastructure/guards/roles.guard.ts"
/*!********************************************************************************!*\
  !*** ./apps/products-ms/src/modules/auth/infrastructure/guards/roles.guard.ts ***!
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
var RolesGuard_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const auth_metadata_constants_1 = __webpack_require__(/*! @modules/auth/presentation/constants/auth-metadata.constants */ "./apps/products-ms/src/modules/auth/presentation/constants/auth-metadata.constants.ts");
let RolesGuard = RolesGuard_1 = class RolesGuard {
    reflector;
    logger = new common_1.Logger(RolesGuard_1.name);
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
            this.logger.warn(`roles_forbidden roleCode=${user.roleCode} required=${required.join(',')}`);
            throw new common_1.ForbiddenException();
        }
        return true;
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = RolesGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RolesGuard);


/***/ },

/***/ "./apps/products-ms/src/modules/auth/infrastructure/strategies/cognito-jwt.strategy.ts"
/*!*********************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/auth/infrastructure/strategies/cognito-jwt.strategy.ts ***!
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var CognitoJwtStrategy_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CognitoJwtStrategy = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const jwks_rsa_1 = __webpack_require__(/*! jwks-rsa */ "jwks-rsa");
const passport_jwt_1 = __webpack_require__(/*! passport-jwt */ "passport-jwt");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const transversal_data_1 = __webpack_require__(/*! @app/transversal-data */ "./libs/transversal-data/src/index.ts");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
let CognitoJwtStrategy = CognitoJwtStrategy_1 = class CognitoJwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    config_service;
    user_repository;
    role_repository;
    logger = new common_1.Logger(CognitoJwtStrategy_1.name);
    constructor(config_service, user_repository, role_repository) {
        const region = config_service.getOrThrow('config.cognito.region');
        const user_pool_id = config_service.get('config.cognito.userPoolId')?.trim();
        if (!user_pool_id) {
            throw new Error('COGNITO_USER_POOL_ID es obligatorio para autenticación JWT.');
        }
        const issuer = `https://cognito-idp.${region}.amazonaws.com/${user_pool_id}`;
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            algorithms: ['RS256'],
            issuer,
            secretOrKeyProvider: (0, jwks_rsa_1.passportJwtSecret)({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 10,
                jwksUri: `${issuer}/.well-known/jwks.json`,
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
        const expected_client_id = this.config_service.get('config.cognito.clientId')?.trim();
        if (expected_client_id &&
            payload.client_id !== undefined &&
            payload.client_id !== expected_client_id) {
            this.reject('client_id_mismatch');
        }
        const sub = payload.sub?.trim();
        if (!sub) {
            this.reject('missing_sub');
        }
        const normalized_sub = sub.toLowerCase();
        const user = await this.user_repository.findOne({
            where: { cognitoSub: normalized_sub },
            select: { id: true, cognitoSub: true, email: true, roleId: true, state: true, parent_id: true, hierarchyPath: true },
        });
        if (user === null || user.state !== shared_1.UserState.ACTIVE) {
            this.reject('user_not_found_or_inactive');
        }
        if (typeof payload.email === 'string' && payload.email.trim() !== '') {
            if (payload.email.trim().toLowerCase() !== user.email.trim().toLowerCase()) {
                this.reject('email_claim_mismatch');
            }
        }
        const role = await this.role_repository.findOne({
            where: { id: user.roleId },
            select: { id: true, name: true },
        });
        if (role === null) {
            this.reject('role_not_found');
        }
        return {
            internalUserId: user.id,
            cognitoSub: user.cognitoSub,
            email: user.email,
            roleCode: role.name,
            parentId: user.parent_id,
            hierarchyPath: user.hierarchyPath,
        };
    }
    reject(reason) {
        this.logger.warn(`cognito_jwt_rejected code=${reason}`);
        throw new common_1.UnauthorizedException();
    }
};
exports.CognitoJwtStrategy = CognitoJwtStrategy;
exports.CognitoJwtStrategy = CognitoJwtStrategy = CognitoJwtStrategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(transversal_data_1.UserEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(transversal_data_1.RoleEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object])
], CognitoJwtStrategy);


/***/ },

/***/ "./apps/products-ms/src/modules/auth/presentation/constants/auth-metadata.constants.ts"
/*!*********************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/auth/presentation/constants/auth-metadata.constants.ts ***!
  \*********************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.REQUIRE_ROLES_KEY = void 0;
exports.REQUIRE_ROLES_KEY = 'require_roles';


/***/ },

/***/ "./apps/products-ms/src/modules/auth/presentation/decorators/require-roles.decorator.ts"
/*!**********************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/auth/presentation/decorators/require-roles.decorator.ts ***!
  \**********************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RequireRoles = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_metadata_constants_1 = __webpack_require__(/*! ../constants/auth-metadata.constants */ "./apps/products-ms/src/modules/auth/presentation/constants/auth-metadata.constants.ts");
const RequireRoles = (...roles) => (0, common_1.SetMetadata)(auth_metadata_constants_1.REQUIRE_ROLES_KEY, roles);
exports.RequireRoles = RequireRoles;


/***/ },

/***/ "./apps/products-ms/src/modules/categories/application/mapping/category-public-fields.builder.ts"
/*!*******************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/categories/application/mapping/category-public-fields.builder.ts ***!
  \*******************************************************************************************************/
(__unused_webpack_module, exports) {


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
        modality: row.modality,
        discount_percentage: row.discount_percentage,
        interest_rate: row.interest_rate,
        disbursement_fee_percent: row.disbursement_fee_percent,
        minimum_disbursement_fee: row.minimum_disbursement_fee,
        delay_days: row.delay_days,
        term_days: row.term_days,
        installment_frequency: row.installment_frequency,
        installment_count: row.installment_count,
        initial_payment_pct: row.initial_payment_pct,
        state: String(row.state),
        created_at: row.created_at,
        updated_at: row.updated_at,
    };
}


/***/ },

/***/ "./apps/products-ms/src/modules/categories/application/use-cases/create-category/create-category.request.ts"
/*!******************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/categories/application/use-cases/create-category/create-category.request.ts ***!
  \******************************************************************************************************************/
(__unused_webpack_module, exports) {


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
    modality;
    installment_frequency;
    installment_count;
    initial_payment_pct;
    constructor(credit_facility_external_id, partner_id, name, discount_percentage, interest_rate, disbursement_fee_percent, minimum_disbursement_fee, delay_days, term_days, state, modality, installment_frequency, installment_count, initial_payment_pct) {
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
        this.modality = modality;
        this.installment_frequency = installment_frequency;
        this.installment_count = installment_count;
        this.initial_payment_pct = initial_payment_pct;
    }
}
exports.CreateCategoryRequest = CreateCategoryRequest;


/***/ },

/***/ "./apps/products-ms/src/modules/categories/application/use-cases/create-category/create-category.response.ts"
/*!*******************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/categories/application/use-cases/create-category/create-category.response.ts ***!
  \*******************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateCategoryResponse = void 0;
class CreateCategoryResponse {
    external_id;
    credit_facility_external_id;
    partner_external_id;
    name;
    modality;
    discount_percentage;
    interest_rate;
    disbursement_fee_percent;
    minimum_disbursement_fee;
    delay_days;
    term_days;
    installment_frequency;
    installment_count;
    initial_payment_pct;
    state;
    created_at;
    updated_at;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.CreateCategoryResponse = CreateCategoryResponse;


/***/ },

/***/ "./apps/products-ms/src/modules/categories/application/use-cases/create-category/create-category.use-case.ts"
/*!*******************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/categories/application/use-cases/create-category/create-category.use-case.ts ***!
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateCategoryUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
const categories_tokens_1 = __webpack_require__(/*! @modules/categories/categories.tokens */ "./apps/products-ms/src/modules/categories/categories.tokens.ts");
const products_reference_lookup_port_1 = __webpack_require__(/*! @common/ports/products-reference-lookup.port */ "./apps/products-ms/src/common/ports/products-reference-lookup.port.ts");
const category_ports_1 = __webpack_require__(/*! @modules/categories/domain/ports/category.ports */ "./apps/products-ms/src/modules/categories/domain/ports/category.ports.ts");
const category_public_fields_builder_1 = __webpack_require__(/*! @modules/categories/application/mapping/category-public-fields.builder */ "./apps/products-ms/src/modules/categories/application/mapping/category-public-fields.builder.ts");
const create_category_response_1 = __webpack_require__(/*! ./create-category.response */ "./apps/products-ms/src/modules/categories/application/use-cases/create-category/create-category.response.ts");
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
            modality: req.modality ?? shared_1.ModalityTypes.BULLET,
            discount_percentage: req.discount_percentage,
            interest_rate: req.interest_rate,
            disbursement_fee_percent: req.disbursement_fee_percent,
            minimum_disbursement_fee: req.minimum_disbursement_fee,
            delay_days: req.delay_days,
            term_days: req.term_days,
            installment_frequency: req.installment_frequency ?? shared_1.InstallmentFrequencyTypes.MONTHLY,
            installment_count: req.installment_count ?? 1,
            initial_payment_pct: req.initial_payment_pct ?? '0',
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


/***/ },

/***/ "./apps/products-ms/src/modules/categories/application/use-cases/delete-category-by-external-id/delete-category-by-external-id.use-case.ts"
/*!*************************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/categories/application/use-cases/delete-category-by-external-id/delete-category-by-external-id.use-case.ts ***!
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
exports.DeleteCategoryByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const categories_tokens_1 = __webpack_require__(/*! @modules/categories/categories.tokens */ "./apps/products-ms/src/modules/categories/categories.tokens.ts");
const category_ports_1 = __webpack_require__(/*! @modules/categories/domain/ports/category.ports */ "./apps/products-ms/src/modules/categories/domain/ports/category.ports.ts");
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


/***/ },

/***/ "./apps/products-ms/src/modules/categories/application/use-cases/get-category-by-external-id/get-category-by-external-id.response.ts"
/*!*******************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/categories/application/use-cases/get-category-by-external-id/get-category-by-external-id.response.ts ***!
  \*******************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetCategoryByExternalIdResponse = void 0;
class GetCategoryByExternalIdResponse {
    external_id;
    credit_facility_external_id;
    partner_external_id;
    name;
    modality;
    discount_percentage;
    interest_rate;
    disbursement_fee_percent;
    minimum_disbursement_fee;
    delay_days;
    term_days;
    installment_frequency;
    installment_count;
    initial_payment_pct;
    state;
    created_at;
    updated_at;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.GetCategoryByExternalIdResponse = GetCategoryByExternalIdResponse;


/***/ },

/***/ "./apps/products-ms/src/modules/categories/application/use-cases/get-category-by-external-id/get-category-by-external-id.use-case.ts"
/*!*******************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/categories/application/use-cases/get-category-by-external-id/get-category-by-external-id.use-case.ts ***!
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetCategoryByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const categories_tokens_1 = __webpack_require__(/*! @modules/categories/categories.tokens */ "./apps/products-ms/src/modules/categories/categories.tokens.ts");
const products_reference_lookup_port_1 = __webpack_require__(/*! @common/ports/products-reference-lookup.port */ "./apps/products-ms/src/common/ports/products-reference-lookup.port.ts");
const category_ports_1 = __webpack_require__(/*! @modules/categories/domain/ports/category.ports */ "./apps/products-ms/src/modules/categories/domain/ports/category.ports.ts");
const category_public_fields_builder_1 = __webpack_require__(/*! @modules/categories/application/mapping/category-public-fields.builder */ "./apps/products-ms/src/modules/categories/application/mapping/category-public-fields.builder.ts");
const get_category_by_external_id_response_1 = __webpack_require__(/*! ./get-category-by-external-id.response */ "./apps/products-ms/src/modules/categories/application/use-cases/get-category-by-external-id/get-category-by-external-id.response.ts");
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


/***/ },

/***/ "./apps/products-ms/src/modules/categories/application/use-cases/list-categories-by-partner/list-categories-by-partner.response.ts"
/*!*****************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/categories/application/use-cases/list-categories-by-partner/list-categories-by-partner.response.ts ***!
  \*****************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListCategoriesByPartnerItemResponse = void 0;
class ListCategoriesByPartnerItemResponse {
    external_id;
    credit_facility_external_id;
    partner_external_id;
    name;
    modality;
    discount_percentage;
    interest_rate;
    disbursement_fee_percent;
    minimum_disbursement_fee;
    delay_days;
    term_days;
    installment_frequency;
    installment_count;
    initial_payment_pct;
    state;
    created_at;
    updated_at;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.ListCategoriesByPartnerItemResponse = ListCategoriesByPartnerItemResponse;


/***/ },

/***/ "./apps/products-ms/src/modules/categories/application/use-cases/list-categories-by-partner/list-categories-by-partner.use-case.ts"
/*!*****************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/categories/application/use-cases/list-categories-by-partner/list-categories-by-partner.use-case.ts ***!
  \*****************************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.ListCategoriesByPartnerUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const categories_tokens_1 = __webpack_require__(/*! @modules/categories/categories.tokens */ "./apps/products-ms/src/modules/categories/categories.tokens.ts");
const products_reference_lookup_port_1 = __webpack_require__(/*! @common/ports/products-reference-lookup.port */ "./apps/products-ms/src/common/ports/products-reference-lookup.port.ts");
const category_ports_1 = __webpack_require__(/*! @modules/categories/domain/ports/category.ports */ "./apps/products-ms/src/modules/categories/domain/ports/category.ports.ts");
const category_public_fields_builder_1 = __webpack_require__(/*! @modules/categories/application/mapping/category-public-fields.builder */ "./apps/products-ms/src/modules/categories/application/mapping/category-public-fields.builder.ts");
const list_categories_by_partner_response_1 = __webpack_require__(/*! ./list-categories-by-partner.response */ "./apps/products-ms/src/modules/categories/application/use-cases/list-categories-by-partner/list-categories-by-partner.response.ts");
let ListCategoriesByPartnerUseCase = class ListCategoriesByPartnerUseCase {
    category_repository;
    reference_lookup;
    constructor(category_repository, reference_lookup) {
        this.category_repository = category_repository;
        this.reference_lookup = reference_lookup;
    }
    async execute(req) {
        const rows = await this.category_repository.find_all({
            partner_id: req.partner_id,
        });
        const out = [];
        for (const row of rows) {
            const fields = await (0, category_public_fields_builder_1.build_category_public_fields)(row, this.reference_lookup);
            out.push(new list_categories_by_partner_response_1.ListCategoriesByPartnerItemResponse(fields));
        }
        return out;
    }
};
exports.ListCategoriesByPartnerUseCase = ListCategoriesByPartnerUseCase;
exports.ListCategoriesByPartnerUseCase = ListCategoriesByPartnerUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(categories_tokens_1.CATEGORY_REPOSITORY)),
    __param(1, (0, common_1.Inject)(products_reference_lookup_port_1.PRODUCTS_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [typeof (_a = typeof category_ports_1.CategoryRepository !== "undefined" && category_ports_1.CategoryRepository) === "function" ? _a : Object, Object])
], ListCategoriesByPartnerUseCase);


/***/ },

/***/ "./apps/products-ms/src/modules/categories/application/use-cases/list-categories/list-categories.response.ts"
/*!*******************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/categories/application/use-cases/list-categories/list-categories.response.ts ***!
  \*******************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListCategoriesItemResponse = void 0;
class ListCategoriesItemResponse {
    external_id;
    credit_facility_external_id;
    partner_external_id;
    name;
    modality;
    discount_percentage;
    interest_rate;
    disbursement_fee_percent;
    minimum_disbursement_fee;
    delay_days;
    term_days;
    installment_frequency;
    installment_count;
    initial_payment_pct;
    state;
    created_at;
    updated_at;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.ListCategoriesItemResponse = ListCategoriesItemResponse;


/***/ },

/***/ "./apps/products-ms/src/modules/categories/application/use-cases/list-categories/list-categories.use-case.ts"
/*!*******************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/categories/application/use-cases/list-categories/list-categories.use-case.ts ***!
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListCategoriesUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const categories_tokens_1 = __webpack_require__(/*! @modules/categories/categories.tokens */ "./apps/products-ms/src/modules/categories/categories.tokens.ts");
const products_reference_lookup_port_1 = __webpack_require__(/*! @common/ports/products-reference-lookup.port */ "./apps/products-ms/src/common/ports/products-reference-lookup.port.ts");
const category_ports_1 = __webpack_require__(/*! @modules/categories/domain/ports/category.ports */ "./apps/products-ms/src/modules/categories/domain/ports/category.ports.ts");
const category_public_fields_builder_1 = __webpack_require__(/*! @modules/categories/application/mapping/category-public-fields.builder */ "./apps/products-ms/src/modules/categories/application/mapping/category-public-fields.builder.ts");
const list_categories_response_1 = __webpack_require__(/*! ./list-categories.response */ "./apps/products-ms/src/modules/categories/application/use-cases/list-categories/list-categories.response.ts");
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


/***/ },

/***/ "./apps/products-ms/src/modules/categories/application/use-cases/update-category-by-external-id/update-category-by-external-id.response.ts"
/*!*************************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/categories/application/use-cases/update-category-by-external-id/update-category-by-external-id.response.ts ***!
  \*************************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateCategoryByExternalIdResponse = void 0;
class UpdateCategoryByExternalIdResponse {
    external_id;
    credit_facility_external_id;
    partner_external_id;
    name;
    modality;
    discount_percentage;
    interest_rate;
    disbursement_fee_percent;
    minimum_disbursement_fee;
    delay_days;
    term_days;
    installment_frequency;
    installment_count;
    initial_payment_pct;
    state;
    created_at;
    updated_at;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.UpdateCategoryByExternalIdResponse = UpdateCategoryByExternalIdResponse;


/***/ },

/***/ "./apps/products-ms/src/modules/categories/application/use-cases/update-category-by-external-id/update-category-by-external-id.use-case.ts"
/*!*************************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/categories/application/use-cases/update-category-by-external-id/update-category-by-external-id.use-case.ts ***!
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
exports.UpdateCategoryByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const categories_tokens_1 = __webpack_require__(/*! @modules/categories/categories.tokens */ "./apps/products-ms/src/modules/categories/categories.tokens.ts");
const products_reference_lookup_port_1 = __webpack_require__(/*! @common/ports/products-reference-lookup.port */ "./apps/products-ms/src/common/ports/products-reference-lookup.port.ts");
const category_ports_1 = __webpack_require__(/*! @modules/categories/domain/ports/category.ports */ "./apps/products-ms/src/modules/categories/domain/ports/category.ports.ts");
const category_public_fields_builder_1 = __webpack_require__(/*! @modules/categories/application/mapping/category-public-fields.builder */ "./apps/products-ms/src/modules/categories/application/mapping/category-public-fields.builder.ts");
const update_category_by_external_id_response_1 = __webpack_require__(/*! ./update-category-by-external-id.response */ "./apps/products-ms/src/modules/categories/application/use-cases/update-category-by-external-id/update-category-by-external-id.response.ts");
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


/***/ },

/***/ "./apps/products-ms/src/modules/categories/categories-application.module.ts"
/*!**********************************************************************************!*\
  !*** ./apps/products-ms/src/modules/categories/categories-application.module.ts ***!
  \**********************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesApplicationModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const create_category_use_case_1 = __webpack_require__(/*! @modules/categories/application/use-cases/create-category/create-category.use-case */ "./apps/products-ms/src/modules/categories/application/use-cases/create-category/create-category.use-case.ts");
const get_category_by_external_id_use_case_1 = __webpack_require__(/*! @modules/categories/application/use-cases/get-category-by-external-id/get-category-by-external-id.use-case */ "./apps/products-ms/src/modules/categories/application/use-cases/get-category-by-external-id/get-category-by-external-id.use-case.ts");
const list_categories_use_case_1 = __webpack_require__(/*! @modules/categories/application/use-cases/list-categories/list-categories.use-case */ "./apps/products-ms/src/modules/categories/application/use-cases/list-categories/list-categories.use-case.ts");
const update_category_by_external_id_use_case_1 = __webpack_require__(/*! @modules/categories/application/use-cases/update-category-by-external-id/update-category-by-external-id.use-case */ "./apps/products-ms/src/modules/categories/application/use-cases/update-category-by-external-id/update-category-by-external-id.use-case.ts");
const delete_category_by_external_id_use_case_1 = __webpack_require__(/*! @modules/categories/application/use-cases/delete-category-by-external-id/delete-category-by-external-id.use-case */ "./apps/products-ms/src/modules/categories/application/use-cases/delete-category-by-external-id/delete-category-by-external-id.use-case.ts");
const list_categories_by_partner_use_case_1 = __webpack_require__(/*! @modules/categories/application/use-cases/list-categories-by-partner/list-categories-by-partner.use-case */ "./apps/products-ms/src/modules/categories/application/use-cases/list-categories-by-partner/list-categories-by-partner.use-case.ts");
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
            list_categories_by_partner_use_case_1.ListCategoriesByPartnerUseCase,
        ],
        exports: [
            create_category_use_case_1.CreateCategoryUseCase,
            get_category_by_external_id_use_case_1.GetCategoryByExternalIdUseCase,
            list_categories_use_case_1.ListCategoriesUseCase,
            update_category_by_external_id_use_case_1.UpdateCategoryByExternalIdUseCase,
            delete_category_by_external_id_use_case_1.DeleteCategoryByExternalIdUseCase,
            list_categories_by_partner_use_case_1.ListCategoriesByPartnerUseCase,
        ],
    })
], CategoriesApplicationModule);


/***/ },

/***/ "./apps/products-ms/src/modules/categories/categories.module.ts"
/*!**********************************************************************!*\
  !*** ./apps/products-ms/src/modules/categories/categories.module.ts ***!
  \**********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const categories_application_module_1 = __webpack_require__(/*! @modules/categories/categories-application.module */ "./apps/products-ms/src/modules/categories/categories-application.module.ts");
const categories_public_controller_1 = __webpack_require__(/*! @modules/categories/presentation/controllers/categories-public.controller */ "./apps/products-ms/src/modules/categories/presentation/controllers/categories-public.controller.ts");
let CategoriesModule = class CategoriesModule {
};
exports.CategoriesModule = CategoriesModule;
exports.CategoriesModule = CategoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [categories_application_module_1.CategoriesApplicationModule],
        controllers: [categories_public_controller_1.CategoriesPublicController],
        exports: [categories_application_module_1.CategoriesApplicationModule],
    })
], CategoriesModule);


/***/ },

/***/ "./apps/products-ms/src/modules/categories/categories.tokens.ts"
/*!**********************************************************************!*\
  !*** ./apps/products-ms/src/modules/categories/categories.tokens.ts ***!
  \**********************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CATEGORY_REPOSITORY = void 0;
exports.CATEGORY_REPOSITORY = Symbol('CATEGORY_REPOSITORY');


/***/ },

/***/ "./apps/products-ms/src/modules/categories/domain/models/category.models.ts"
/*!**********************************************************************************!*\
  !*** ./apps/products-ms/src/modules/categories/domain/models/category.models.ts ***!
  \**********************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Category = void 0;
class Category {
    internal_id;
    external_id;
    credit_facility_id;
    partner_id;
    name;
    modality;
    discount_percentage;
    interest_rate;
    disbursement_fee_percent;
    minimum_disbursement_fee;
    delay_days;
    term_days;
    installment_frequency;
    installment_count;
    initial_payment_pct;
    state;
    created_at;
    updated_at;
    constructor(internal_id, external_id, credit_facility_id, partner_id, name, modality, discount_percentage, interest_rate, disbursement_fee_percent, minimum_disbursement_fee, delay_days, term_days, installment_frequency, installment_count, initial_payment_pct, state, created_at, updated_at) {
        this.internal_id = internal_id;
        this.external_id = external_id;
        this.credit_facility_id = credit_facility_id;
        this.partner_id = partner_id;
        this.name = name;
        this.modality = modality;
        this.discount_percentage = discount_percentage;
        this.interest_rate = interest_rate;
        this.disbursement_fee_percent = disbursement_fee_percent;
        this.minimum_disbursement_fee = minimum_disbursement_fee;
        this.delay_days = delay_days;
        this.term_days = term_days;
        this.installment_frequency = installment_frequency;
        this.installment_count = installment_count;
        this.initial_payment_pct = initial_payment_pct;
        this.state = state;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
exports.Category = Category;


/***/ },

/***/ "./apps/products-ms/src/modules/categories/domain/ports/category.ports.ts"
/*!********************************************************************************!*\
  !*** ./apps/products-ms/src/modules/categories/domain/ports/category.ports.ts ***!
  \********************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ "./apps/products-ms/src/modules/categories/presentation/controllers/categories-public.controller.ts"
/*!**********************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/categories/presentation/controllers/categories-public.controller.ts ***!
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesPublicController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const products_reference_lookup_port_1 = __webpack_require__(/*! @common/ports/products-reference-lookup.port */ "./apps/products-ms/src/common/ports/products-reference-lookup.port.ts");
const list_categories_by_partner_use_case_1 = __webpack_require__(/*! @modules/categories/application/use-cases/list-categories-by-partner/list-categories-by-partner.use-case */ "./apps/products-ms/src/modules/categories/application/use-cases/list-categories-by-partner/list-categories-by-partner.use-case.ts");
const category_response_dto_1 = __webpack_require__(/*! ../dto/category-response.dto */ "./apps/products-ms/src/modules/categories/presentation/dto/category-response.dto.ts");
let CategoriesPublicController = class CategoriesPublicController {
    list_categories_by_partner;
    reference_lookup;
    constructor(list_categories_by_partner, reference_lookup) {
        this.list_categories_by_partner = list_categories_by_partner;
        this.reference_lookup = reference_lookup;
    }
    async list_by_partner_external(partner_external_id) {
        const partner_id = await this.reference_lookup.get_partner_internal_id_by_external_id(partner_external_id);
        if (partner_id === null) {
            throw new common_1.NotFoundException('partner not found');
        }
        const items = await this.list_categories_by_partner.execute({ partner_id });
        return items.map((item) => category_response_dto_1.CategoryResponseDto.from(item));
    }
    async list_by_partner(partner_id) {
        const items = await this.list_categories_by_partner.execute({ partner_id });
        return items.map((item) => category_response_dto_1.CategoryResponseDto.from(item));
    }
};
exports.CategoriesPublicController = CategoriesPublicController;
__decorate([
    (0, common_1.Get)('partner-external/:partnerExternalId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ type: category_response_dto_1.CategoryResponseDto, isArray: true }),
    __param(0, (0, common_1.Param)('partnerExternalId', new common_1.ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], CategoriesPublicController.prototype, "list_by_partner_external", null);
__decorate([
    (0, common_1.Get)('partner/:partnerId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ type: category_response_dto_1.CategoryResponseDto, isArray: true }),
    __param(0, (0, common_1.Param)('partnerId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], CategoriesPublicController.prototype, "list_by_partner", null);
exports.CategoriesPublicController = CategoriesPublicController = __decorate([
    (0, swagger_1.ApiTags)('categories'),
    (0, common_1.Controller)('categories'),
    __param(1, (0, common_1.Inject)(products_reference_lookup_port_1.PRODUCTS_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [typeof (_a = typeof list_categories_by_partner_use_case_1.ListCategoriesByPartnerUseCase !== "undefined" && list_categories_by_partner_use_case_1.ListCategoriesByPartnerUseCase) === "function" ? _a : Object, Object])
], CategoriesPublicController);


/***/ },

/***/ "./apps/products-ms/src/modules/categories/presentation/dto/category-response.dto.ts"
/*!*******************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/categories/presentation/dto/category-response.dto.ts ***!
  \*******************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.CategoryResponseDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class CategoryResponseDto {
    externalId;
    creditFacilityExternalId;
    partnerExternalId;
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
    createdAt;
    updatedAt;
    static from(fields) {
        const dto = new CategoryResponseDto();
        dto.externalId = fields.external_id;
        dto.creditFacilityExternalId = fields.credit_facility_external_id;
        dto.partnerExternalId = fields.partner_external_id;
        dto.name = fields.name;
        dto.modality = fields.modality;
        dto.discountPercentage = fields.discount_percentage;
        dto.interestRate = fields.interest_rate;
        dto.disbursementFeePercent = fields.disbursement_fee_percent;
        dto.minimumDisbursementFee = fields.minimum_disbursement_fee;
        dto.delayDays = fields.delay_days;
        dto.termDays = fields.term_days;
        dto.installmentFrequency = fields.installment_frequency;
        dto.installmentCount = fields.installment_count;
        dto.initialPaymentPct = fields.initial_payment_pct;
        dto.state = fields.state;
        dto.createdAt = fields.created_at;
        dto.updatedAt = fields.updated_at;
        return dto;
    }
}
exports.CategoryResponseDto = CategoryResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CategoryResponseDto.prototype, "externalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CategoryResponseDto.prototype, "creditFacilityExternalId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], CategoryResponseDto.prototype, "partnerExternalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CategoryResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CategoryResponseDto.prototype, "modality", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CategoryResponseDto.prototype, "discountPercentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CategoryResponseDto.prototype, "interestRate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], CategoryResponseDto.prototype, "disbursementFeePercent", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], CategoryResponseDto.prototype, "minimumDisbursementFee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CategoryResponseDto.prototype, "delayDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CategoryResponseDto.prototype, "termDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CategoryResponseDto.prototype, "installmentFrequency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CategoryResponseDto.prototype, "installmentCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CategoryResponseDto.prototype, "initialPaymentPct", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CategoryResponseDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], CategoryResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], CategoryResponseDto.prototype, "updatedAt", void 0);


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/application/mapping/credit-application-public-fields.builder.ts"
/*!**************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/application/mapping/credit-application-public-fields.builder.ts ***!
  \**************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.build_credit_application_public_fields = build_credit_application_public_fields;
function build_credit_application_public_fields(row) {
    return {
        externalId: row.external_id,
        personId: row.person_id,
        partnerId: row.partner_id,
        partnerCategoryId: row.partner_category_id,
        businessId: row.business_id,
        salesRepresentativeId: row.sales_representative_id,
        numberOfLocations: row.number_of_locations,
        numberOfEmployees: row.number_of_employees,
        businessSeniority: row.business_seniority,
        sectorExperience: row.sector_experience,
        businessFlagshipM2: row.business_flagship_m2,
        businessHasRent: row.business_has_rent,
        businessRentAmount: row.business_rent_amount,
        monthlyIncome: row.monthly_income,
        monthlyExpenses: row.monthly_expenses,
        monthlyPurchases: row.monthly_purchases,
        currentPurchases: row.current_purchases,
        totalAssets: row.total_assets,
        requestedCreditLine: row.requested_credit_line,
        isCurrentClient: row.is_current_client,
        status: row.status,
        submissionDate: row.submission_date,
        approvalDate: row.approval_date,
        rejectionReason: row.rejection_reason,
        creditStudyDate: row.credit_study_date,
        creditScore: row.credit_score,
        creditDecision: row.credit_decision,
        approvedCreditLine: row.approved_credit_line,
        analystReport: row.analyst_report,
        riskProfile: row.risk_profile,
        privacyPolicyAccepted: row.privacy_policy_accepted,
        privacyPolicyDate: row.privacy_policy_date,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/application/ports/client-registration.port.ts"
/*!********************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/application/ports/client-registration.port.ts ***!
  \********************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CLIENT_REGISTRATION_PORT = void 0;
exports.CLIENT_REGISTRATION_PORT = Symbol('CLIENT_REGISTRATION_PORT');


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/application/ports/create-person-sqs-result-reader.port.ts"
/*!********************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/application/ports/create-person-sqs-result-reader.port.ts ***!
  \********************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CREATE_PERSON_SQS_RESULT_READER_PORT = void 0;
exports.CREATE_PERSON_SQS_RESULT_READER_PORT = Symbol('CREATE_PERSON_SQS_RESULT_READER_PORT');


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/application/ports/credit-application-document-storage.port.ts"
/*!************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/application/ports/credit-application-document-storage.port.ts ***!
  \************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CREDIT_APPLICATION_DOCUMENT_STORAGE = void 0;
exports.CREDIT_APPLICATION_DOCUMENT_STORAGE = Symbol('CREDIT_APPLICATION_DOCUMENT_STORAGE');


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/application/use-cases/approve-credit-application/approve-credit-application.request.ts"
/*!*************************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/application/use-cases/approve-credit-application/approve-credit-application.request.ts ***!
  \*************************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApproveCreditApplicationRequest = void 0;
class ApproveCreditApplicationRequest {
    externalId;
    approvedCreditLine;
    analystReport;
    constructor(externalId, approvedCreditLine, analystReport) {
        this.externalId = externalId;
        this.approvedCreditLine = approvedCreditLine;
        this.analystReport = analystReport;
    }
}
exports.ApproveCreditApplicationRequest = ApproveCreditApplicationRequest;


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/application/use-cases/approve-credit-application/approve-credit-application.response.ts"
/*!**************************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/application/use-cases/approve-credit-application/approve-credit-application.response.ts ***!
  \**************************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApproveCreditApplicationResponse = void 0;
class ApproveCreditApplicationResponse {
    externalId;
    personId;
    partnerId;
    partnerCategoryId;
    businessId;
    salesRepresentativeId;
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
    createdAt;
    updatedAt;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.ApproveCreditApplicationResponse = ApproveCreditApplicationResponse;


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/application/use-cases/approve-credit-application/approve-credit-application.use-case.ts"
/*!**************************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/application/use-cases/approve-credit-application/approve-credit-application.use-case.ts ***!
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
exports.ApproveCreditApplicationUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
const credit_applications_tokens_1 = __webpack_require__(/*! @modules/credit-applications/credit-applications.tokens */ "./apps/products-ms/src/modules/credit-applications/credit-applications.tokens.ts");
const credit_application_ports_1 = __webpack_require__(/*! @modules/credit-applications/domain/ports/credit-application.ports */ "./apps/products-ms/src/modules/credit-applications/domain/ports/credit-application.ports.ts");
const credit_application_public_fields_builder_1 = __webpack_require__(/*! @modules/credit-applications/application/mapping/credit-application-public-fields.builder */ "./apps/products-ms/src/modules/credit-applications/application/mapping/credit-application-public-fields.builder.ts");
const approve_credit_application_response_1 = __webpack_require__(/*! ./approve-credit-application.response */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/approve-credit-application/approve-credit-application.response.ts");
let ApproveCreditApplicationUseCase = class ApproveCreditApplicationUseCase {
    credit_application_repository;
    constructor(credit_application_repository) {
        this.credit_application_repository = credit_application_repository;
    }
    async execute(req) {
        const updated = await this.credit_application_repository.update_by_external_id(req.externalId, {
            status: shared_1.CreditApplicationStatus.AUTHORIZED,
            approved_credit_line: req.approvedCreditLine,
            approval_date: new Date(),
            analyst_report: req.analystReport,
        });
        if (updated === null) {
            throw new common_1.NotFoundException('credit application not found');
        }
        return new approve_credit_application_response_1.ApproveCreditApplicationResponse((0, credit_application_public_fields_builder_1.build_credit_application_public_fields)(updated));
    }
};
exports.ApproveCreditApplicationUseCase = ApproveCreditApplicationUseCase;
exports.ApproveCreditApplicationUseCase = ApproveCreditApplicationUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(credit_applications_tokens_1.CREDIT_APPLICATION_REPOSITORY)),
    __metadata("design:paramtypes", [typeof (_a = typeof credit_application_ports_1.CreditApplicationRepository !== "undefined" && credit_application_ports_1.CreditApplicationRepository) === "function" ? _a : Object])
], ApproveCreditApplicationUseCase);


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/application/use-cases/create-credit-application/create-credit-application.response.ts"
/*!************************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/application/use-cases/create-credit-application/create-credit-application.response.ts ***!
  \************************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateCreditApplicationResponse = void 0;
class CreateCreditApplicationResponse {
    externalId;
    personId;
    partnerId;
    partnerCategoryId;
    businessId;
    salesRepresentativeId;
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
    createdAt;
    updatedAt;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.CreateCreditApplicationResponse = CreateCreditApplicationResponse;


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/application/use-cases/create-credit-application/create-credit-application.use-case.ts"
/*!************************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/application/use-cases/create-credit-application/create-credit-application.use-case.ts ***!
  \************************************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.CreateCreditApplicationUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const credit_applications_tokens_1 = __webpack_require__(/*! @modules/credit-applications/credit-applications.tokens */ "./apps/products-ms/src/modules/credit-applications/credit-applications.tokens.ts");
const credit_application_ports_1 = __webpack_require__(/*! @modules/credit-applications/domain/ports/credit-application.ports */ "./apps/products-ms/src/modules/credit-applications/domain/ports/credit-application.ports.ts");
const credit_application_public_fields_builder_1 = __webpack_require__(/*! @modules/credit-applications/application/mapping/credit-application-public-fields.builder */ "./apps/products-ms/src/modules/credit-applications/application/mapping/credit-application-public-fields.builder.ts");
const create_credit_application_response_1 = __webpack_require__(/*! ./create-credit-application.response */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/create-credit-application/create-credit-application.response.ts");
let CreateCreditApplicationUseCase = class CreateCreditApplicationUseCase {
    credit_application_repository;
    constructor(credit_application_repository) {
        this.credit_application_repository = credit_application_repository;
    }
    async execute(req) {
        const created = await this.credit_application_repository.create({
            external_id: req.externalId,
            person_id: req.personId,
            partner_id: req.partnerId,
            partner_category_id: req.partnerCategoryId,
            business_id: req.businessId,
            sales_representative_id: req.salesRepresentativeId,
            status: req.status,
            is_current_client: req.isCurrentClient,
            privacy_policy_accepted: req.privacyPolicyAccepted,
            number_of_locations: req.numberOfLocations,
            number_of_employees: req.numberOfEmployees,
            business_seniority: req.businessSeniority,
            sector_experience: req.sectorExperience,
            business_flagship_m2: req.businessFlagshipM2,
            business_has_rent: req.businessHasRent,
            business_rent_amount: req.businessRentAmount,
            monthly_income: req.monthlyIncome,
            monthly_expenses: req.monthlyExpenses,
            monthly_purchases: req.monthlyPurchases,
            current_purchases: req.currentPurchases,
            total_assets: req.totalAssets,
            requested_credit_line: req.requestedCreditLine,
            submission_date: req.submissionDate,
            privacy_policy_date: req.privacyPolicyDate,
        });
        const fields = (0, credit_application_public_fields_builder_1.build_credit_application_public_fields)(created);
        return new create_credit_application_response_1.CreateCreditApplicationResponse(fields);
    }
};
exports.CreateCreditApplicationUseCase = CreateCreditApplicationUseCase;
exports.CreateCreditApplicationUseCase = CreateCreditApplicationUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(credit_applications_tokens_1.CREDIT_APPLICATION_REPOSITORY)),
    __metadata("design:paramtypes", [typeof (_a = typeof credit_application_ports_1.CreditApplicationRepository !== "undefined" && credit_application_ports_1.CreditApplicationRepository) === "function" ? _a : Object])
], CreateCreditApplicationUseCase);


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/application/use-cases/delete-credit-application-by-external-id/delete-credit-application-by-external-id.use-case.ts"
/*!******************************************************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/application/use-cases/delete-credit-application-by-external-id/delete-credit-application-by-external-id.use-case.ts ***!
  \******************************************************************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.DeleteCreditApplicationByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const credit_applications_tokens_1 = __webpack_require__(/*! @modules/credit-applications/credit-applications.tokens */ "./apps/products-ms/src/modules/credit-applications/credit-applications.tokens.ts");
const credit_application_ports_1 = __webpack_require__(/*! @modules/credit-applications/domain/ports/credit-application.ports */ "./apps/products-ms/src/modules/credit-applications/domain/ports/credit-application.ports.ts");
let DeleteCreditApplicationByExternalIdUseCase = class DeleteCreditApplicationByExternalIdUseCase {
    credit_application_repository;
    constructor(credit_application_repository) {
        this.credit_application_repository = credit_application_repository;
    }
    async execute(req) {
        const ok = await this.credit_application_repository.delete_by_external_id(req.externalId);
        if (!ok) {
            throw new common_1.NotFoundException('credit application not found');
        }
    }
};
exports.DeleteCreditApplicationByExternalIdUseCase = DeleteCreditApplicationByExternalIdUseCase;
exports.DeleteCreditApplicationByExternalIdUseCase = DeleteCreditApplicationByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(credit_applications_tokens_1.CREDIT_APPLICATION_REPOSITORY)),
    __metadata("design:paramtypes", [typeof (_a = typeof credit_application_ports_1.CreditApplicationRepository !== "undefined" && credit_application_ports_1.CreditApplicationRepository) === "function" ? _a : Object])
], DeleteCreditApplicationByExternalIdUseCase);


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/application/use-cases/get-credit-application-by-external-id/get-credit-application-by-external-id.request.ts"
/*!***********************************************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/application/use-cases/get-credit-application-by-external-id/get-credit-application-by-external-id.request.ts ***!
  \***********************************************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetCreditApplicationByExternalIdRequest = void 0;
class GetCreditApplicationByExternalIdRequest {
    externalId;
    constructor(externalId) {
        this.externalId = externalId;
    }
}
exports.GetCreditApplicationByExternalIdRequest = GetCreditApplicationByExternalIdRequest;


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/application/use-cases/get-credit-application-by-external-id/get-credit-application-by-external-id.response.ts"
/*!************************************************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/application/use-cases/get-credit-application-by-external-id/get-credit-application-by-external-id.response.ts ***!
  \************************************************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetCreditApplicationByExternalIdResponse = void 0;
class GetCreditApplicationByExternalIdResponse {
    externalId;
    personId;
    partnerId;
    partnerCategoryId;
    businessId;
    salesRepresentativeId;
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
    createdAt;
    updatedAt;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.GetCreditApplicationByExternalIdResponse = GetCreditApplicationByExternalIdResponse;


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/application/use-cases/get-credit-application-by-external-id/get-credit-application-by-external-id.use-case.ts"
/*!************************************************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/application/use-cases/get-credit-application-by-external-id/get-credit-application-by-external-id.use-case.ts ***!
  \************************************************************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.GetCreditApplicationByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const credit_applications_tokens_1 = __webpack_require__(/*! @modules/credit-applications/credit-applications.tokens */ "./apps/products-ms/src/modules/credit-applications/credit-applications.tokens.ts");
const credit_application_ports_1 = __webpack_require__(/*! @modules/credit-applications/domain/ports/credit-application.ports */ "./apps/products-ms/src/modules/credit-applications/domain/ports/credit-application.ports.ts");
const credit_application_public_fields_builder_1 = __webpack_require__(/*! @modules/credit-applications/application/mapping/credit-application-public-fields.builder */ "./apps/products-ms/src/modules/credit-applications/application/mapping/credit-application-public-fields.builder.ts");
const get_credit_application_by_external_id_response_1 = __webpack_require__(/*! ./get-credit-application-by-external-id.response */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/get-credit-application-by-external-id/get-credit-application-by-external-id.response.ts");
let GetCreditApplicationByExternalIdUseCase = class GetCreditApplicationByExternalIdUseCase {
    credit_application_repository;
    constructor(credit_application_repository) {
        this.credit_application_repository = credit_application_repository;
    }
    async execute(req) {
        const row = await this.credit_application_repository.find_by_external_id(req.externalId);
        if (!row) {
            throw new common_1.NotFoundException('credit application not found');
        }
        const fields = (0, credit_application_public_fields_builder_1.build_credit_application_public_fields)(row);
        return new get_credit_application_by_external_id_response_1.GetCreditApplicationByExternalIdResponse(fields);
    }
};
exports.GetCreditApplicationByExternalIdUseCase = GetCreditApplicationByExternalIdUseCase;
exports.GetCreditApplicationByExternalIdUseCase = GetCreditApplicationByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(credit_applications_tokens_1.CREDIT_APPLICATION_REPOSITORY)),
    __metadata("design:paramtypes", [typeof (_a = typeof credit_application_ports_1.CreditApplicationRepository !== "undefined" && credit_application_ports_1.CreditApplicationRepository) === "function" ? _a : Object])
], GetCreditApplicationByExternalIdUseCase);


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/application/use-cases/list-credit-applications-by-partner/list-credit-applications-by-partner.request.ts"
/*!*******************************************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/application/use-cases/list-credit-applications-by-partner/list-credit-applications-by-partner.request.ts ***!
  \*******************************************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListCreditApplicationsByPartnerRequest = void 0;
class ListCreditApplicationsByPartnerRequest {
    partnerId;
    constructor(partnerId) {
        this.partnerId = partnerId;
    }
}
exports.ListCreditApplicationsByPartnerRequest = ListCreditApplicationsByPartnerRequest;


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/application/use-cases/list-credit-applications-by-partner/list-credit-applications-by-partner.response.ts"
/*!********************************************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/application/use-cases/list-credit-applications-by-partner/list-credit-applications-by-partner.response.ts ***!
  \********************************************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListCreditApplicationsByPartnerItemResponse = void 0;
class ListCreditApplicationsByPartnerItemResponse {
    externalId;
    personId;
    partnerId;
    partnerCategoryId;
    businessId;
    salesRepresentativeId;
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
    createdAt;
    updatedAt;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.ListCreditApplicationsByPartnerItemResponse = ListCreditApplicationsByPartnerItemResponse;


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/application/use-cases/list-credit-applications-by-partner/list-credit-applications-by-partner.use-case.ts"
/*!********************************************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/application/use-cases/list-credit-applications-by-partner/list-credit-applications-by-partner.use-case.ts ***!
  \********************************************************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.ListCreditApplicationsByPartnerUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const credit_applications_tokens_1 = __webpack_require__(/*! @modules/credit-applications/credit-applications.tokens */ "./apps/products-ms/src/modules/credit-applications/credit-applications.tokens.ts");
const credit_application_ports_1 = __webpack_require__(/*! @modules/credit-applications/domain/ports/credit-application.ports */ "./apps/products-ms/src/modules/credit-applications/domain/ports/credit-application.ports.ts");
const credit_application_public_fields_builder_1 = __webpack_require__(/*! @modules/credit-applications/application/mapping/credit-application-public-fields.builder */ "./apps/products-ms/src/modules/credit-applications/application/mapping/credit-application-public-fields.builder.ts");
const list_credit_applications_by_partner_response_1 = __webpack_require__(/*! ./list-credit-applications-by-partner.response */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/list-credit-applications-by-partner/list-credit-applications-by-partner.response.ts");
let ListCreditApplicationsByPartnerUseCase = class ListCreditApplicationsByPartnerUseCase {
    credit_application_repository;
    constructor(credit_application_repository) {
        this.credit_application_repository = credit_application_repository;
    }
    async execute(req) {
        const rows = await this.credit_application_repository.find_by_partner_id(req.partnerId);
        return rows.map((r) => new list_credit_applications_by_partner_response_1.ListCreditApplicationsByPartnerItemResponse((0, credit_application_public_fields_builder_1.build_credit_application_public_fields)(r)));
    }
};
exports.ListCreditApplicationsByPartnerUseCase = ListCreditApplicationsByPartnerUseCase;
exports.ListCreditApplicationsByPartnerUseCase = ListCreditApplicationsByPartnerUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(credit_applications_tokens_1.CREDIT_APPLICATION_REPOSITORY)),
    __metadata("design:paramtypes", [typeof (_a = typeof credit_application_ports_1.CreditApplicationRepository !== "undefined" && credit_application_ports_1.CreditApplicationRepository) === "function" ? _a : Object])
], ListCreditApplicationsByPartnerUseCase);


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/application/use-cases/list-credit-applications-by-sales-rep/list-credit-applications-by-sales-rep.request.ts"
/*!***********************************************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/application/use-cases/list-credit-applications-by-sales-rep/list-credit-applications-by-sales-rep.request.ts ***!
  \***********************************************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListCreditApplicationsBySalesRepRequest = void 0;
class ListCreditApplicationsBySalesRepRequest {
    salesRepresentativeId;
    constructor(salesRepresentativeId) {
        this.salesRepresentativeId = salesRepresentativeId;
    }
}
exports.ListCreditApplicationsBySalesRepRequest = ListCreditApplicationsBySalesRepRequest;


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/application/use-cases/list-credit-applications-by-sales-rep/list-credit-applications-by-sales-rep.response.ts"
/*!************************************************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/application/use-cases/list-credit-applications-by-sales-rep/list-credit-applications-by-sales-rep.response.ts ***!
  \************************************************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListCreditApplicationsBySalesRepItemResponse = void 0;
class ListCreditApplicationsBySalesRepItemResponse {
    externalId;
    personId;
    partnerId;
    partnerCategoryId;
    businessId;
    salesRepresentativeId;
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
    createdAt;
    updatedAt;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.ListCreditApplicationsBySalesRepItemResponse = ListCreditApplicationsBySalesRepItemResponse;


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/application/use-cases/list-credit-applications-by-sales-rep/list-credit-applications-by-sales-rep.use-case.ts"
/*!************************************************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/application/use-cases/list-credit-applications-by-sales-rep/list-credit-applications-by-sales-rep.use-case.ts ***!
  \************************************************************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.ListCreditApplicationsBySalesRepUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const credit_applications_tokens_1 = __webpack_require__(/*! @modules/credit-applications/credit-applications.tokens */ "./apps/products-ms/src/modules/credit-applications/credit-applications.tokens.ts");
const credit_application_ports_1 = __webpack_require__(/*! @modules/credit-applications/domain/ports/credit-application.ports */ "./apps/products-ms/src/modules/credit-applications/domain/ports/credit-application.ports.ts");
const credit_application_public_fields_builder_1 = __webpack_require__(/*! @modules/credit-applications/application/mapping/credit-application-public-fields.builder */ "./apps/products-ms/src/modules/credit-applications/application/mapping/credit-application-public-fields.builder.ts");
const list_credit_applications_by_sales_rep_response_1 = __webpack_require__(/*! ./list-credit-applications-by-sales-rep.response */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/list-credit-applications-by-sales-rep/list-credit-applications-by-sales-rep.response.ts");
let ListCreditApplicationsBySalesRepUseCase = class ListCreditApplicationsBySalesRepUseCase {
    credit_application_repository;
    constructor(credit_application_repository) {
        this.credit_application_repository = credit_application_repository;
    }
    async execute(req) {
        const rows = await this.credit_application_repository.find_by_sales_representative_id(req.salesRepresentativeId);
        return rows.map((r) => new list_credit_applications_by_sales_rep_response_1.ListCreditApplicationsBySalesRepItemResponse((0, credit_application_public_fields_builder_1.build_credit_application_public_fields)(r)));
    }
};
exports.ListCreditApplicationsBySalesRepUseCase = ListCreditApplicationsBySalesRepUseCase;
exports.ListCreditApplicationsBySalesRepUseCase = ListCreditApplicationsBySalesRepUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(credit_applications_tokens_1.CREDIT_APPLICATION_REPOSITORY)),
    __metadata("design:paramtypes", [typeof (_a = typeof credit_application_ports_1.CreditApplicationRepository !== "undefined" && credit_application_ports_1.CreditApplicationRepository) === "function" ? _a : Object])
], ListCreditApplicationsBySalesRepUseCase);


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/application/use-cases/list-credit-applications/list-credit-applications.response.ts"
/*!**********************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/application/use-cases/list-credit-applications/list-credit-applications.response.ts ***!
  \**********************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListCreditApplicationsItemResponse = void 0;
class ListCreditApplicationsItemResponse {
    externalId;
    personId;
    partnerId;
    partnerCategoryId;
    businessId;
    salesRepresentativeId;
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
    createdAt;
    updatedAt;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.ListCreditApplicationsItemResponse = ListCreditApplicationsItemResponse;


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/application/use-cases/list-credit-applications/list-credit-applications.use-case.ts"
/*!**********************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/application/use-cases/list-credit-applications/list-credit-applications.use-case.ts ***!
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
exports.ListCreditApplicationsUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const credit_applications_tokens_1 = __webpack_require__(/*! @modules/credit-applications/credit-applications.tokens */ "./apps/products-ms/src/modules/credit-applications/credit-applications.tokens.ts");
const credit_application_ports_1 = __webpack_require__(/*! @modules/credit-applications/domain/ports/credit-application.ports */ "./apps/products-ms/src/modules/credit-applications/domain/ports/credit-application.ports.ts");
const credit_application_public_fields_builder_1 = __webpack_require__(/*! @modules/credit-applications/application/mapping/credit-application-public-fields.builder */ "./apps/products-ms/src/modules/credit-applications/application/mapping/credit-application-public-fields.builder.ts");
const list_credit_applications_response_1 = __webpack_require__(/*! ./list-credit-applications.response */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/list-credit-applications/list-credit-applications.response.ts");
let ListCreditApplicationsUseCase = class ListCreditApplicationsUseCase {
    credit_application_repository;
    constructor(credit_application_repository) {
        this.credit_application_repository = credit_application_repository;
    }
    async execute() {
        const rows = await this.credit_application_repository.find_all();
        return rows.map((r) => new list_credit_applications_response_1.ListCreditApplicationsItemResponse((0, credit_application_public_fields_builder_1.build_credit_application_public_fields)(r)));
    }
};
exports.ListCreditApplicationsUseCase = ListCreditApplicationsUseCase;
exports.ListCreditApplicationsUseCase = ListCreditApplicationsUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(credit_applications_tokens_1.CREDIT_APPLICATION_REPOSITORY)),
    __metadata("design:paramtypes", [typeof (_a = typeof credit_application_ports_1.CreditApplicationRepository !== "undefined" && credit_application_ports_1.CreditApplicationRepository) === "function" ? _a : Object])
], ListCreditApplicationsUseCase);


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/application/use-cases/register-client-credit-application/register-client-credit-application.request.ts"
/*!*****************************************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/application/use-cases/register-client-credit-application/register-client-credit-application.request.ts ***!
  \*****************************************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterClientCreditApplicationRequest = void 0;
class RegisterClientCreditApplicationRequest {
    phone;
    email;
    docType;
    docNumber;
    firstName;
    lastName;
    businessName;
    businessType;
    isCurrentClient;
    requestedCreditLine;
    relationshipToBusiness;
    cityExternalId;
    businessAddress;
    businessSeniority;
    numberOfEmployees;
    numberOfLocations;
    businessFlagshipM2;
    businessHasRent;
    businessRentAmount;
    monthlyPurchases;
    currentPurchases;
    totalAssets;
    monthlyIncome;
    monthlyExpenses;
    constructor(phone, email, docType, docNumber, firstName, lastName, businessName, businessType, isCurrentClient, requestedCreditLine, relationshipToBusiness, cityExternalId, businessAddress, businessSeniority, numberOfEmployees, numberOfLocations, businessFlagshipM2, businessHasRent, businessRentAmount, monthlyPurchases, currentPurchases, totalAssets, monthlyIncome, monthlyExpenses) {
        this.phone = phone;
        this.email = email;
        this.docType = docType;
        this.docNumber = docNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.businessName = businessName;
        this.businessType = businessType;
        this.isCurrentClient = isCurrentClient;
        this.requestedCreditLine = requestedCreditLine;
        this.relationshipToBusiness = relationshipToBusiness;
        this.cityExternalId = cityExternalId;
        this.businessAddress = businessAddress;
        this.businessSeniority = businessSeniority;
        this.numberOfEmployees = numberOfEmployees;
        this.numberOfLocations = numberOfLocations;
        this.businessFlagshipM2 = businessFlagshipM2;
        this.businessHasRent = businessHasRent;
        this.businessRentAmount = businessRentAmount;
        this.monthlyPurchases = monthlyPurchases;
        this.currentPurchases = currentPurchases;
        this.totalAssets = totalAssets;
        this.monthlyIncome = monthlyIncome;
        this.monthlyExpenses = monthlyExpenses;
    }
}
exports.RegisterClientCreditApplicationRequest = RegisterClientCreditApplicationRequest;


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/application/use-cases/register-client-credit-application/register-client-credit-application.response.ts"
/*!******************************************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/application/use-cases/register-client-credit-application/register-client-credit-application.response.ts ***!
  \******************************************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterClientCreditApplicationResponse = void 0;
class RegisterClientCreditApplicationResponse {
    externalId;
    personId;
    partnerId;
    partnerCategoryId;
    businessId;
    salesRepresentativeId;
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
    createdAt;
    updatedAt;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.RegisterClientCreditApplicationResponse = RegisterClientCreditApplicationResponse;


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/application/use-cases/register-client-credit-application/register-client-credit-application.use-case.ts"
/*!******************************************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/application/use-cases/register-client-credit-application/register-client-credit-application.use-case.ts ***!
  \******************************************************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.RegisterClientCreditApplicationUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
const credit_applications_tokens_1 = __webpack_require__(/*! @modules/credit-applications/credit-applications.tokens */ "./apps/products-ms/src/modules/credit-applications/credit-applications.tokens.ts");
const credit_application_ports_1 = __webpack_require__(/*! @modules/credit-applications/domain/ports/credit-application.ports */ "./apps/products-ms/src/modules/credit-applications/domain/ports/credit-application.ports.ts");
const client_registration_port_1 = __webpack_require__(/*! @modules/credit-applications/application/ports/client-registration.port */ "./apps/products-ms/src/modules/credit-applications/application/ports/client-registration.port.ts");
const credit_application_public_fields_builder_1 = __webpack_require__(/*! @modules/credit-applications/application/mapping/credit-application-public-fields.builder */ "./apps/products-ms/src/modules/credit-applications/application/mapping/credit-application-public-fields.builder.ts");
const register_client_credit_application_response_1 = __webpack_require__(/*! ./register-client-credit-application.response */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/register-client-credit-application/register-client-credit-application.response.ts");
let RegisterClientCreditApplicationUseCase = class RegisterClientCreditApplicationUseCase {
    credit_application_repository;
    client_registration;
    constructor(credit_application_repository, client_registration) {
        this.credit_application_repository = credit_application_repository;
        this.client_registration = client_registration;
    }
    async execute(req) {
        let city_id = null;
        if (req.cityExternalId) {
            city_id = await this.client_registration.resolve_city_internal_id(req.cityExternalId);
        }
        let person_id = await this.client_registration.find_person_by_doc_number(req.docNumber);
        if (person_id === null) {
            person_id = await this.client_registration.create_person({
                first_name: req.firstName,
                last_name: req.lastName,
                doc_type: req.docType,
                doc_number: req.docNumber,
                phone: req.phone,
                email: req.email,
                city_id,
            });
        }
        let business_id = await this.client_registration.find_business_by_person_id(person_id);
        if (business_id === null) {
            business_id = await this.client_registration.create_business({
                person_id,
                entity_type: req.businessType,
                business_name: req.businessName,
                business_address: req.businessAddress,
                business_type: req.businessType,
                relationship_to_business: req.relationshipToBusiness,
                city_id,
            });
        }
        const created = await this.credit_application_repository.create({
            person_id,
            business_id,
            partner_id: null,
            partner_category_id: null,
            sales_representative_id: null,
            status: shared_1.CreditApplicationStatus.IN_PROGRESS,
            is_current_client: req.isCurrentClient,
            privacy_policy_accepted: true,
            privacy_policy_date: new Date(),
            submission_date: new Date(),
            business_seniority: req.businessSeniority,
            number_of_employees: req.numberOfEmployees,
            number_of_locations: req.numberOfLocations,
            business_flagship_m2: req.businessFlagshipM2,
            business_has_rent: req.businessHasRent,
            business_rent_amount: req.businessRentAmount,
            requested_credit_line: req.requestedCreditLine,
            monthly_purchases: req.monthlyPurchases,
            current_purchases: req.currentPurchases,
            total_assets: req.totalAssets,
            monthly_income: req.monthlyIncome,
            monthly_expenses: req.monthlyExpenses,
        });
        return new register_client_credit_application_response_1.RegisterClientCreditApplicationResponse((0, credit_application_public_fields_builder_1.build_credit_application_public_fields)(created));
    }
};
exports.RegisterClientCreditApplicationUseCase = RegisterClientCreditApplicationUseCase;
exports.RegisterClientCreditApplicationUseCase = RegisterClientCreditApplicationUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(credit_applications_tokens_1.CREDIT_APPLICATION_REPOSITORY)),
    __param(1, (0, common_1.Inject)(client_registration_port_1.CLIENT_REGISTRATION_PORT)),
    __metadata("design:paramtypes", [typeof (_a = typeof credit_application_ports_1.CreditApplicationRepository !== "undefined" && credit_application_ports_1.CreditApplicationRepository) === "function" ? _a : Object, typeof (_b = typeof client_registration_port_1.ClientRegistrationPort !== "undefined" && client_registration_port_1.ClientRegistrationPort) === "function" ? _b : Object])
], RegisterClientCreditApplicationUseCase);


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/application/use-cases/register-natural-person-credit-application/register-natural-person-credit-application.request.ts"
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/application/use-cases/register-natural-person-credit-application/register-natural-person-credit-application.request.ts ***!
  \*********************************************************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterNaturalPersonCreditApplicationRequest = void 0;
class RegisterNaturalPersonCreditApplicationRequest {
    birthDate;
    businessAddress;
    businessFlagshipM2;
    businessName;
    businessRentAmount;
    businessSeniority;
    businessType;
    cityId;
    currentPurchases;
    docNumber;
    docType;
    email;
    firstName;
    lastName;
    monthlyExpenses;
    monthlyIncome;
    monthlyPurchases;
    numberOfEmployees;
    numberOfLocations;
    partnerId;
    salesRepId;
    privacyPolicyAccepted;
    phone;
    relationshipToBusiness;
    requestedCreditLine;
    totalAssets;
    constructor(birthDate, businessAddress, businessFlagshipM2, businessName, businessRentAmount, businessSeniority, businessType, cityId, currentPurchases, docNumber, docType, email, firstName, lastName, monthlyExpenses, monthlyIncome, monthlyPurchases, numberOfEmployees, numberOfLocations, partnerId, salesRepId, privacyPolicyAccepted, phone, relationshipToBusiness, requestedCreditLine, totalAssets) {
        this.birthDate = birthDate;
        this.businessAddress = businessAddress;
        this.businessFlagshipM2 = businessFlagshipM2;
        this.businessName = businessName;
        this.businessRentAmount = businessRentAmount;
        this.businessSeniority = businessSeniority;
        this.businessType = businessType;
        this.cityId = cityId;
        this.currentPurchases = currentPurchases;
        this.docNumber = docNumber;
        this.docType = docType;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.monthlyExpenses = monthlyExpenses;
        this.monthlyIncome = monthlyIncome;
        this.monthlyPurchases = monthlyPurchases;
        this.numberOfEmployees = numberOfEmployees;
        this.numberOfLocations = numberOfLocations;
        this.partnerId = partnerId;
        this.salesRepId = salesRepId;
        this.privacyPolicyAccepted = privacyPolicyAccepted;
        this.phone = phone;
        this.relationshipToBusiness = relationshipToBusiness;
        this.requestedCreditLine = requestedCreditLine;
        this.totalAssets = totalAssets;
    }
}
exports.RegisterNaturalPersonCreditApplicationRequest = RegisterNaturalPersonCreditApplicationRequest;


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/application/use-cases/register-natural-person-credit-application/register-natural-person-credit-application.use-case.ts"
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/application/use-cases/register-natural-person-credit-application/register-natural-person-credit-application.use-case.ts ***!
  \**********************************************************************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.RegisterNaturalPersonCreditApplicationUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
const credit_applications_tokens_1 = __webpack_require__(/*! @modules/credit-applications/credit-applications.tokens */ "./apps/products-ms/src/modules/credit-applications/credit-applications.tokens.ts");
const credit_application_ports_1 = __webpack_require__(/*! @modules/credit-applications/domain/ports/credit-application.ports */ "./apps/products-ms/src/modules/credit-applications/domain/ports/credit-application.ports.ts");
const client_registration_port_1 = __webpack_require__(/*! @modules/credit-applications/application/ports/client-registration.port */ "./apps/products-ms/src/modules/credit-applications/application/ports/client-registration.port.ts");
const create_person_sqs_result_reader_port_1 = __webpack_require__(/*! @modules/credit-applications/application/ports/create-person-sqs-result-reader.port */ "./apps/products-ms/src/modules/credit-applications/application/ports/create-person-sqs-result-reader.port.ts");
const products_reference_lookup_port_1 = __webpack_require__(/*! @common/ports/products-reference-lookup.port */ "./apps/products-ms/src/common/ports/products-reference-lookup.port.ts");
const publish_create_person_command_use_case_1 = __webpack_require__(/*! @messaging/application/use-cases/publish-create-person-command.use-case */ "./apps/products-ms/src/modules/messaging/application/use-cases/publish-create-person-command.use-case.ts");
const validation_failed_error_1 = __webpack_require__(/*! @messaging/application/exceptions/validation-failed.error */ "./apps/products-ms/src/modules/messaging/application/exceptions/validation-failed.error.ts");
const credit_application_public_fields_builder_1 = __webpack_require__(/*! @modules/credit-applications/application/mapping/credit-application-public-fields.builder */ "./apps/products-ms/src/modules/credit-applications/application/mapping/credit-application-public-fields.builder.ts");
const register_client_credit_application_response_1 = __webpack_require__(/*! @modules/credit-applications/application/use-cases/register-client-credit-application/register-client-credit-application.response */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/register-client-credit-application/register-client-credit-application.response.ts");
let RegisterNaturalPersonCreditApplicationUseCase = class RegisterNaturalPersonCreditApplicationUseCase {
    credit_application_repository;
    client_registration;
    products_lookup;
    create_person_sqs_result;
    publish_create_person;
    config_service;
    constructor(credit_application_repository, client_registration, products_lookup, create_person_sqs_result, publish_create_person, config_service) {
        this.credit_application_repository = credit_application_repository;
        this.client_registration = client_registration;
        this.products_lookup = products_lookup;
        this.create_person_sqs_result = create_person_sqs_result;
        this.publish_create_person = publish_create_person;
        this.config_service = config_service;
    }
    async execute(req) {
        const partner_internal_id = await this.products_lookup.get_partner_internal_id_by_external_id(req.partnerId);
        if (partner_internal_id === null) {
            throw new common_1.NotFoundException('partner no encontrado');
        }
        const sales_representative_internal_id = await this.products_lookup.get_sales_representative_internal_id_by_external_id(req.salesRepId, partner_internal_id);
        if (sales_representative_internal_id === null) {
            throw new common_1.NotFoundException('representante de ventas no encontrado o no pertenece al partner indicado');
        }
        let city_id = null;
        if (req.cityId) {
            city_id = await this.client_registration.resolve_city_internal_id(req.cityId);
        }
        let person_id = await this.client_registration.find_person_by_doc_number(req.docNumber);
        if (person_id === null) {
            const correlation_id = (0, shared_1.new_uuid)();
            const idempotency_key = `${correlation_id}__natural_person_credit_application`;
            const default_country = (this.config_service.get('config.natural_person_onboarding.default_country_code') ??
                'CO') ||
                'CO';
            try {
                await this.publish_create_person.execute({
                    correlation_id,
                    idempotency_key,
                    country_code: default_country,
                    first_name: req.firstName,
                    last_name: req.lastName,
                    doc_type: req.docType,
                    doc_number: req.docNumber,
                    phone: req.phone,
                    city_external_id: req.cityId ?? null,
                });
            }
            catch (e) {
                if (e instanceof validation_failed_error_1.ValidationFailedError) {
                    throw new common_1.ServiceUnavailableException(e.message);
                }
                throw e;
            }
            const sqs_result = await this.create_person_sqs_result.wait_for_completed_result(idempotency_key);
            person_id = await this.client_registration.get_person_internal_id_by_external_id(sqs_result.person_external_id);
            if (person_id === null) {
                throw new common_1.ServiceUnavailableException('No se pudo resolver la persona creada vía SQS (person_external_id)');
            }
        }
        const birth_iso = req.birthDate?.trim().length ? req.birthDate.trim() : null;
        await this.client_registration.patch_person_email_and_birth_date(person_id, req.email, birth_iso);
        let business_id = await this.client_registration.find_business_by_person_id(person_id);
        if (business_id === null) {
            business_id = await this.client_registration.create_business({
                person_id,
                entity_type: req.businessType,
                business_name: req.businessName,
                business_address: req.businessAddress ?? null,
                business_type: req.businessType,
                relationship_to_business: req.relationshipToBusiness ?? null,
                city_id,
            });
        }
        const business_has_rent = req.businessRentAmount !== undefined && req.businessRentAmount > 0 ? true : null;
        const created = await this.credit_application_repository.create({
            person_id,
            business_id,
            partner_id: partner_internal_id,
            partner_category_id: null,
            sales_representative_id: sales_representative_internal_id,
            status: shared_1.CreditApplicationStatus.IN_PROGRESS,
            is_current_client: false,
            privacy_policy_accepted: req.privacyPolicyAccepted,
            privacy_policy_date: req.privacyPolicyAccepted ? new Date() : null,
            submission_date: new Date(),
            business_seniority: req.businessSeniority ?? null,
            number_of_employees: req.numberOfEmployees ?? null,
            number_of_locations: req.numberOfLocations ?? null,
            business_flagship_m2: req.businessFlagshipM2 ?? null,
            business_has_rent,
            business_rent_amount: req.businessRentAmount ?? null,
            requested_credit_line: req.requestedCreditLine,
            monthly_purchases: req.monthlyPurchases ?? null,
            current_purchases: req.currentPurchases ?? null,
            total_assets: req.totalAssets ?? null,
            monthly_income: req.monthlyIncome ?? null,
            monthly_expenses: req.monthlyExpenses ?? null,
        });
        return new register_client_credit_application_response_1.RegisterClientCreditApplicationResponse((0, credit_application_public_fields_builder_1.build_credit_application_public_fields)(created));
    }
};
exports.RegisterNaturalPersonCreditApplicationUseCase = RegisterNaturalPersonCreditApplicationUseCase;
exports.RegisterNaturalPersonCreditApplicationUseCase = RegisterNaturalPersonCreditApplicationUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(credit_applications_tokens_1.CREDIT_APPLICATION_REPOSITORY)),
    __param(1, (0, common_1.Inject)(client_registration_port_1.CLIENT_REGISTRATION_PORT)),
    __param(2, (0, common_1.Inject)(products_reference_lookup_port_1.PRODUCTS_REFERENCE_LOOKUP)),
    __param(3, (0, common_1.Inject)(create_person_sqs_result_reader_port_1.CREATE_PERSON_SQS_RESULT_READER_PORT)),
    __metadata("design:paramtypes", [typeof (_a = typeof credit_application_ports_1.CreditApplicationRepository !== "undefined" && credit_application_ports_1.CreditApplicationRepository) === "function" ? _a : Object, typeof (_b = typeof client_registration_port_1.ClientRegistrationPort !== "undefined" && client_registration_port_1.ClientRegistrationPort) === "function" ? _b : Object, Object, Object, typeof (_c = typeof publish_create_person_command_use_case_1.PublishCreatePersonCommandUseCase !== "undefined" && publish_create_person_command_use_case_1.PublishCreatePersonCommandUseCase) === "function" ? _c : Object, typeof (_d = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _d : Object])
], RegisterNaturalPersonCreditApplicationUseCase);


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/application/use-cases/reject-credit-application/reject-credit-application.request.ts"
/*!***********************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/application/use-cases/reject-credit-application/reject-credit-application.request.ts ***!
  \***********************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RejectCreditApplicationRequest = void 0;
class RejectCreditApplicationRequest {
    externalId;
    rejectionReason;
    constructor(externalId, rejectionReason) {
        this.externalId = externalId;
        this.rejectionReason = rejectionReason;
    }
}
exports.RejectCreditApplicationRequest = RejectCreditApplicationRequest;


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/application/use-cases/reject-credit-application/reject-credit-application.response.ts"
/*!************************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/application/use-cases/reject-credit-application/reject-credit-application.response.ts ***!
  \************************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RejectCreditApplicationResponse = void 0;
class RejectCreditApplicationResponse {
    externalId;
    personId;
    partnerId;
    partnerCategoryId;
    businessId;
    salesRepresentativeId;
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
    createdAt;
    updatedAt;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.RejectCreditApplicationResponse = RejectCreditApplicationResponse;


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/application/use-cases/reject-credit-application/reject-credit-application.use-case.ts"
/*!************************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/application/use-cases/reject-credit-application/reject-credit-application.use-case.ts ***!
  \************************************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.RejectCreditApplicationUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
const credit_applications_tokens_1 = __webpack_require__(/*! @modules/credit-applications/credit-applications.tokens */ "./apps/products-ms/src/modules/credit-applications/credit-applications.tokens.ts");
const credit_application_ports_1 = __webpack_require__(/*! @modules/credit-applications/domain/ports/credit-application.ports */ "./apps/products-ms/src/modules/credit-applications/domain/ports/credit-application.ports.ts");
const credit_application_public_fields_builder_1 = __webpack_require__(/*! @modules/credit-applications/application/mapping/credit-application-public-fields.builder */ "./apps/products-ms/src/modules/credit-applications/application/mapping/credit-application-public-fields.builder.ts");
const reject_credit_application_response_1 = __webpack_require__(/*! ./reject-credit-application.response */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/reject-credit-application/reject-credit-application.response.ts");
let RejectCreditApplicationUseCase = class RejectCreditApplicationUseCase {
    credit_application_repository;
    constructor(credit_application_repository) {
        this.credit_application_repository = credit_application_repository;
    }
    async execute(req) {
        const updated = await this.credit_application_repository.update_by_external_id(req.externalId, {
            status: shared_1.CreditApplicationStatus.REJECTED,
            rejection_reason: req.rejectionReason,
        });
        if (updated === null) {
            throw new common_1.NotFoundException('credit application not found');
        }
        return new reject_credit_application_response_1.RejectCreditApplicationResponse((0, credit_application_public_fields_builder_1.build_credit_application_public_fields)(updated));
    }
};
exports.RejectCreditApplicationUseCase = RejectCreditApplicationUseCase;
exports.RejectCreditApplicationUseCase = RejectCreditApplicationUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(credit_applications_tokens_1.CREDIT_APPLICATION_REPOSITORY)),
    __metadata("design:paramtypes", [typeof (_a = typeof credit_application_ports_1.CreditApplicationRepository !== "undefined" && credit_application_ports_1.CreditApplicationRepository) === "function" ? _a : Object])
], RejectCreditApplicationUseCase);


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/application/use-cases/save-credit-application-pre-study/save-credit-application-pre-study.request.ts"
/*!***************************************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/application/use-cases/save-credit-application-pre-study/save-credit-application-pre-study.request.ts ***!
  \***************************************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SaveCreditApplicationPreStudyRequest = void 0;
class SaveCreditApplicationPreStudyRequest {
    externalId;
    creditScore;
    creditDecision;
    riskProfile;
    analystReport;
    creditStudyDate;
    constructor(externalId, creditScore, creditDecision, riskProfile, analystReport, creditStudyDate) {
        this.externalId = externalId;
        this.creditScore = creditScore;
        this.creditDecision = creditDecision;
        this.riskProfile = riskProfile;
        this.analystReport = analystReport;
        this.creditStudyDate = creditStudyDate;
    }
}
exports.SaveCreditApplicationPreStudyRequest = SaveCreditApplicationPreStudyRequest;


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/application/use-cases/save-credit-application-pre-study/save-credit-application-pre-study.response.ts"
/*!****************************************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/application/use-cases/save-credit-application-pre-study/save-credit-application-pre-study.response.ts ***!
  \****************************************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SaveCreditApplicationPreStudyResponse = void 0;
class SaveCreditApplicationPreStudyResponse {
    externalId;
    personId;
    partnerId;
    partnerCategoryId;
    businessId;
    salesRepresentativeId;
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
    createdAt;
    updatedAt;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.SaveCreditApplicationPreStudyResponse = SaveCreditApplicationPreStudyResponse;


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/application/use-cases/save-credit-application-pre-study/save-credit-application-pre-study.use-case.ts"
/*!****************************************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/application/use-cases/save-credit-application-pre-study/save-credit-application-pre-study.use-case.ts ***!
  \****************************************************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.SaveCreditApplicationPreStudyUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
const credit_applications_tokens_1 = __webpack_require__(/*! @modules/credit-applications/credit-applications.tokens */ "./apps/products-ms/src/modules/credit-applications/credit-applications.tokens.ts");
const credit_application_ports_1 = __webpack_require__(/*! @modules/credit-applications/domain/ports/credit-application.ports */ "./apps/products-ms/src/modules/credit-applications/domain/ports/credit-application.ports.ts");
const credit_application_public_fields_builder_1 = __webpack_require__(/*! @modules/credit-applications/application/mapping/credit-application-public-fields.builder */ "./apps/products-ms/src/modules/credit-applications/application/mapping/credit-application-public-fields.builder.ts");
const save_credit_application_pre_study_response_1 = __webpack_require__(/*! ./save-credit-application-pre-study.response */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/save-credit-application-pre-study/save-credit-application-pre-study.response.ts");
let SaveCreditApplicationPreStudyUseCase = class SaveCreditApplicationPreStudyUseCase {
    credit_application_repository;
    constructor(credit_application_repository) {
        this.credit_application_repository = credit_application_repository;
    }
    async execute(req) {
        const updated = await this.credit_application_repository.update_by_external_id(req.externalId, {
            status: shared_1.CreditApplicationStatus.UNDER_REVIEW,
            credit_score: req.creditScore,
            credit_decision: req.creditDecision,
            risk_profile: req.riskProfile,
            analyst_report: req.analystReport,
            credit_study_date: req.creditStudyDate ?? new Date(),
        });
        if (updated === null) {
            throw new common_1.NotFoundException('credit application not found');
        }
        return new save_credit_application_pre_study_response_1.SaveCreditApplicationPreStudyResponse((0, credit_application_public_fields_builder_1.build_credit_application_public_fields)(updated));
    }
};
exports.SaveCreditApplicationPreStudyUseCase = SaveCreditApplicationPreStudyUseCase;
exports.SaveCreditApplicationPreStudyUseCase = SaveCreditApplicationPreStudyUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(credit_applications_tokens_1.CREDIT_APPLICATION_REPOSITORY)),
    __metadata("design:paramtypes", [typeof (_a = typeof credit_application_ports_1.CreditApplicationRepository !== "undefined" && credit_application_ports_1.CreditApplicationRepository) === "function" ? _a : Object])
], SaveCreditApplicationPreStudyUseCase);


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/application/use-cases/update-credit-application-by-external-id/update-credit-application-by-external-id.request.ts"
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/application/use-cases/update-credit-application-by-external-id/update-credit-application-by-external-id.request.ts ***!
  \*****************************************************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateCreditApplicationByExternalIdRequest = void 0;
class UpdateCreditApplicationByExternalIdRequest {
    externalId;
    status;
    personId;
    partnerId;
    partnerCategoryId;
    businessId;
    salesRepresentativeId;
    isCurrentClient;
    privacyPolicyAccepted;
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
    submissionDate;
    approvalDate;
    rejectionReason;
    creditStudyDate;
    creditScore;
    creditDecision;
    approvedCreditLine;
    analystReport;
    riskProfile;
    privacyPolicyDate;
    constructor(externalId, status, personId, partnerId, partnerCategoryId, businessId, salesRepresentativeId, isCurrentClient, privacyPolicyAccepted, numberOfLocations, numberOfEmployees, businessSeniority, sectorExperience, businessFlagshipM2, businessHasRent, businessRentAmount, monthlyIncome, monthlyExpenses, monthlyPurchases, currentPurchases, totalAssets, requestedCreditLine, submissionDate, approvalDate, rejectionReason, creditStudyDate, creditScore, creditDecision, approvedCreditLine, analystReport, riskProfile, privacyPolicyDate) {
        this.externalId = externalId;
        this.status = status;
        this.personId = personId;
        this.partnerId = partnerId;
        this.partnerCategoryId = partnerCategoryId;
        this.businessId = businessId;
        this.salesRepresentativeId = salesRepresentativeId;
        this.isCurrentClient = isCurrentClient;
        this.privacyPolicyAccepted = privacyPolicyAccepted;
        this.numberOfLocations = numberOfLocations;
        this.numberOfEmployees = numberOfEmployees;
        this.businessSeniority = businessSeniority;
        this.sectorExperience = sectorExperience;
        this.businessFlagshipM2 = businessFlagshipM2;
        this.businessHasRent = businessHasRent;
        this.businessRentAmount = businessRentAmount;
        this.monthlyIncome = monthlyIncome;
        this.monthlyExpenses = monthlyExpenses;
        this.monthlyPurchases = monthlyPurchases;
        this.currentPurchases = currentPurchases;
        this.totalAssets = totalAssets;
        this.requestedCreditLine = requestedCreditLine;
        this.submissionDate = submissionDate;
        this.approvalDate = approvalDate;
        this.rejectionReason = rejectionReason;
        this.creditStudyDate = creditStudyDate;
        this.creditScore = creditScore;
        this.creditDecision = creditDecision;
        this.approvedCreditLine = approvedCreditLine;
        this.analystReport = analystReport;
        this.riskProfile = riskProfile;
        this.privacyPolicyDate = privacyPolicyDate;
    }
}
exports.UpdateCreditApplicationByExternalIdRequest = UpdateCreditApplicationByExternalIdRequest;


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/application/use-cases/update-credit-application-by-external-id/update-credit-application-by-external-id.response.ts"
/*!******************************************************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/application/use-cases/update-credit-application-by-external-id/update-credit-application-by-external-id.response.ts ***!
  \******************************************************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateCreditApplicationByExternalIdResponse = void 0;
class UpdateCreditApplicationByExternalIdResponse {
    externalId;
    personId;
    partnerId;
    partnerCategoryId;
    businessId;
    salesRepresentativeId;
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
    createdAt;
    updatedAt;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.UpdateCreditApplicationByExternalIdResponse = UpdateCreditApplicationByExternalIdResponse;


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/application/use-cases/update-credit-application-by-external-id/update-credit-application-by-external-id.use-case.ts"
/*!******************************************************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/application/use-cases/update-credit-application-by-external-id/update-credit-application-by-external-id.use-case.ts ***!
  \******************************************************************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.UpdateCreditApplicationByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const credit_applications_tokens_1 = __webpack_require__(/*! @modules/credit-applications/credit-applications.tokens */ "./apps/products-ms/src/modules/credit-applications/credit-applications.tokens.ts");
const credit_application_ports_1 = __webpack_require__(/*! @modules/credit-applications/domain/ports/credit-application.ports */ "./apps/products-ms/src/modules/credit-applications/domain/ports/credit-application.ports.ts");
const credit_application_public_fields_builder_1 = __webpack_require__(/*! @modules/credit-applications/application/mapping/credit-application-public-fields.builder */ "./apps/products-ms/src/modules/credit-applications/application/mapping/credit-application-public-fields.builder.ts");
const update_credit_application_by_external_id_response_1 = __webpack_require__(/*! ./update-credit-application-by-external-id.response */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/update-credit-application-by-external-id/update-credit-application-by-external-id.response.ts");
let UpdateCreditApplicationByExternalIdUseCase = class UpdateCreditApplicationByExternalIdUseCase {
    credit_application_repository;
    constructor(credit_application_repository) {
        this.credit_application_repository = credit_application_repository;
    }
    async execute(req) {
        const patch = {};
        if (req.status !== undefined)
            patch.status = req.status;
        if (req.personId !== undefined)
            patch.person_id = req.personId;
        if (req.partnerId !== undefined)
            patch.partner_id = req.partnerId;
        if (req.partnerCategoryId !== undefined)
            patch.partner_category_id = req.partnerCategoryId;
        if (req.businessId !== undefined)
            patch.business_id = req.businessId;
        if (req.salesRepresentativeId !== undefined)
            patch.sales_representative_id = req.salesRepresentativeId;
        if (req.isCurrentClient !== undefined)
            patch.is_current_client = req.isCurrentClient;
        if (req.privacyPolicyAccepted !== undefined)
            patch.privacy_policy_accepted = req.privacyPolicyAccepted;
        if (req.numberOfLocations !== undefined)
            patch.number_of_locations = req.numberOfLocations;
        if (req.numberOfEmployees !== undefined)
            patch.number_of_employees = req.numberOfEmployees;
        if (req.businessSeniority !== undefined)
            patch.business_seniority = req.businessSeniority;
        if (req.sectorExperience !== undefined)
            patch.sector_experience = req.sectorExperience;
        if (req.businessFlagshipM2 !== undefined)
            patch.business_flagship_m2 = req.businessFlagshipM2;
        if (req.businessHasRent !== undefined)
            patch.business_has_rent = req.businessHasRent;
        if (req.businessRentAmount !== undefined)
            patch.business_rent_amount = req.businessRentAmount;
        if (req.monthlyIncome !== undefined)
            patch.monthly_income = req.monthlyIncome;
        if (req.monthlyExpenses !== undefined)
            patch.monthly_expenses = req.monthlyExpenses;
        if (req.monthlyPurchases !== undefined)
            patch.monthly_purchases = req.monthlyPurchases;
        if (req.currentPurchases !== undefined)
            patch.current_purchases = req.currentPurchases;
        if (req.totalAssets !== undefined)
            patch.total_assets = req.totalAssets;
        if (req.requestedCreditLine !== undefined)
            patch.requested_credit_line = req.requestedCreditLine;
        if (req.submissionDate !== undefined)
            patch.submission_date = req.submissionDate;
        if (req.approvalDate !== undefined)
            patch.approval_date = req.approvalDate;
        if (req.rejectionReason !== undefined)
            patch.rejection_reason = req.rejectionReason;
        if (req.creditStudyDate !== undefined)
            patch.credit_study_date = req.creditStudyDate;
        if (req.creditScore !== undefined)
            patch.credit_score = req.creditScore;
        if (req.creditDecision !== undefined)
            patch.credit_decision = req.creditDecision;
        if (req.approvedCreditLine !== undefined)
            patch.approved_credit_line = req.approvedCreditLine;
        if (req.analystReport !== undefined)
            patch.analyst_report = req.analystReport;
        if (req.riskProfile !== undefined)
            patch.risk_profile = req.riskProfile;
        if (req.privacyPolicyDate !== undefined)
            patch.privacy_policy_date = req.privacyPolicyDate;
        const updated = await this.credit_application_repository.update_by_external_id(req.externalId, patch);
        if (updated === null) {
            throw new common_1.NotFoundException('credit application not found');
        }
        const fields = (0, credit_application_public_fields_builder_1.build_credit_application_public_fields)(updated);
        return new update_credit_application_by_external_id_response_1.UpdateCreditApplicationByExternalIdResponse(fields);
    }
};
exports.UpdateCreditApplicationByExternalIdUseCase = UpdateCreditApplicationByExternalIdUseCase;
exports.UpdateCreditApplicationByExternalIdUseCase = UpdateCreditApplicationByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(credit_applications_tokens_1.CREDIT_APPLICATION_REPOSITORY)),
    __metadata("design:paramtypes", [typeof (_a = typeof credit_application_ports_1.CreditApplicationRepository !== "undefined" && credit_application_ports_1.CreditApplicationRepository) === "function" ? _a : Object])
], UpdateCreditApplicationByExternalIdUseCase);


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/application/use-cases/upload-credit-application-document/upload-credit-application-document.request.ts"
/*!*****************************************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/application/use-cases/upload-credit-application-document/upload-credit-application-document.request.ts ***!
  \*****************************************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadCreditApplicationDocumentRequest = void 0;
class UploadCreditApplicationDocumentRequest {
    externalId;
    documentType;
    fileName;
    mimeType;
    contentBase64;
    constructor(externalId, documentType, fileName, mimeType, contentBase64) {
        this.externalId = externalId;
        this.documentType = documentType;
        this.fileName = fileName;
        this.mimeType = mimeType;
        this.contentBase64 = contentBase64;
    }
}
exports.UploadCreditApplicationDocumentRequest = UploadCreditApplicationDocumentRequest;


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/application/use-cases/upload-credit-application-document/upload-credit-application-document.response.ts"
/*!******************************************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/application/use-cases/upload-credit-application-document/upload-credit-application-document.response.ts ***!
  \******************************************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadCreditApplicationDocumentResponse = void 0;
class UploadCreditApplicationDocumentResponse {
    documentId;
    url;
    constructor(documentId, url) {
        this.documentId = documentId;
        this.url = url;
    }
}
exports.UploadCreditApplicationDocumentResponse = UploadCreditApplicationDocumentResponse;


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/application/use-cases/upload-credit-application-document/upload-credit-application-document.use-case.ts"
/*!******************************************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/application/use-cases/upload-credit-application-document/upload-credit-application-document.use-case.ts ***!
  \******************************************************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.UploadCreditApplicationDocumentUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const credit_applications_tokens_1 = __webpack_require__(/*! @modules/credit-applications/credit-applications.tokens */ "./apps/products-ms/src/modules/credit-applications/credit-applications.tokens.ts");
const credit_application_ports_1 = __webpack_require__(/*! @modules/credit-applications/domain/ports/credit-application.ports */ "./apps/products-ms/src/modules/credit-applications/domain/ports/credit-application.ports.ts");
const credit_application_document_storage_port_1 = __webpack_require__(/*! @modules/credit-applications/application/ports/credit-application-document-storage.port */ "./apps/products-ms/src/modules/credit-applications/application/ports/credit-application-document-storage.port.ts");
const upload_credit_application_document_response_1 = __webpack_require__(/*! ./upload-credit-application-document.response */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/upload-credit-application-document/upload-credit-application-document.response.ts");
let UploadCreditApplicationDocumentUseCase = class UploadCreditApplicationDocumentUseCase {
    credit_application_repository;
    document_storage;
    constructor(credit_application_repository, document_storage) {
        this.credit_application_repository = credit_application_repository;
        this.document_storage = document_storage;
    }
    async execute(req) {
        const exists = await this.credit_application_repository.find_by_external_id(req.externalId);
        if (exists === null) {
            throw new common_1.NotFoundException('credit application not found');
        }
        const result = await this.document_storage.upload({
            credit_application_external_id: req.externalId,
            document_type: req.documentType,
            file_name: req.fileName,
            mime_type: req.mimeType,
            content_base64: req.contentBase64,
        });
        return new upload_credit_application_document_response_1.UploadCreditApplicationDocumentResponse(result.document_id, result.url);
    }
};
exports.UploadCreditApplicationDocumentUseCase = UploadCreditApplicationDocumentUseCase;
exports.UploadCreditApplicationDocumentUseCase = UploadCreditApplicationDocumentUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(credit_applications_tokens_1.CREDIT_APPLICATION_REPOSITORY)),
    __param(1, (0, common_1.Inject)(credit_application_document_storage_port_1.CREDIT_APPLICATION_DOCUMENT_STORAGE)),
    __metadata("design:paramtypes", [typeof (_a = typeof credit_application_ports_1.CreditApplicationRepository !== "undefined" && credit_application_ports_1.CreditApplicationRepository) === "function" ? _a : Object, typeof (_b = typeof credit_application_document_storage_port_1.CreditApplicationDocumentStoragePort !== "undefined" && credit_application_document_storage_port_1.CreditApplicationDocumentStoragePort) === "function" ? _b : Object])
], UploadCreditApplicationDocumentUseCase);


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/credit-applications-application.module.ts"
/*!****************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/credit-applications-application.module.ts ***!
  \****************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreditApplicationsApplicationModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const create_credit_application_use_case_1 = __webpack_require__(/*! @modules/credit-applications/application/use-cases/create-credit-application/create-credit-application.use-case */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/create-credit-application/create-credit-application.use-case.ts");
const get_credit_application_by_external_id_use_case_1 = __webpack_require__(/*! @modules/credit-applications/application/use-cases/get-credit-application-by-external-id/get-credit-application-by-external-id.use-case */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/get-credit-application-by-external-id/get-credit-application-by-external-id.use-case.ts");
const list_credit_applications_use_case_1 = __webpack_require__(/*! @modules/credit-applications/application/use-cases/list-credit-applications/list-credit-applications.use-case */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/list-credit-applications/list-credit-applications.use-case.ts");
const update_credit_application_by_external_id_use_case_1 = __webpack_require__(/*! @modules/credit-applications/application/use-cases/update-credit-application-by-external-id/update-credit-application-by-external-id.use-case */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/update-credit-application-by-external-id/update-credit-application-by-external-id.use-case.ts");
const delete_credit_application_by_external_id_use_case_1 = __webpack_require__(/*! @modules/credit-applications/application/use-cases/delete-credit-application-by-external-id/delete-credit-application-by-external-id.use-case */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/delete-credit-application-by-external-id/delete-credit-application-by-external-id.use-case.ts");
const register_client_credit_application_use_case_1 = __webpack_require__(/*! @modules/credit-applications/application/use-cases/register-client-credit-application/register-client-credit-application.use-case */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/register-client-credit-application/register-client-credit-application.use-case.ts");
const list_credit_applications_by_partner_use_case_1 = __webpack_require__(/*! @modules/credit-applications/application/use-cases/list-credit-applications-by-partner/list-credit-applications-by-partner.use-case */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/list-credit-applications-by-partner/list-credit-applications-by-partner.use-case.ts");
const list_credit_applications_by_sales_rep_use_case_1 = __webpack_require__(/*! @modules/credit-applications/application/use-cases/list-credit-applications-by-sales-rep/list-credit-applications-by-sales-rep.use-case */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/list-credit-applications-by-sales-rep/list-credit-applications-by-sales-rep.use-case.ts");
const approve_credit_application_use_case_1 = __webpack_require__(/*! @modules/credit-applications/application/use-cases/approve-credit-application/approve-credit-application.use-case */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/approve-credit-application/approve-credit-application.use-case.ts");
const reject_credit_application_use_case_1 = __webpack_require__(/*! @modules/credit-applications/application/use-cases/reject-credit-application/reject-credit-application.use-case */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/reject-credit-application/reject-credit-application.use-case.ts");
const save_credit_application_pre_study_use_case_1 = __webpack_require__(/*! @modules/credit-applications/application/use-cases/save-credit-application-pre-study/save-credit-application-pre-study.use-case */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/save-credit-application-pre-study/save-credit-application-pre-study.use-case.ts");
const upload_credit_application_document_use_case_1 = __webpack_require__(/*! @modules/credit-applications/application/use-cases/upload-credit-application-document/upload-credit-application-document.use-case */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/upload-credit-application-document/upload-credit-application-document.use-case.ts");
const register_natural_person_credit_application_use_case_1 = __webpack_require__(/*! @modules/credit-applications/application/use-cases/register-natural-person-credit-application/register-natural-person-credit-application.use-case */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/register-natural-person-credit-application/register-natural-person-credit-application.use-case.ts");
const USE_CASES = [
    create_credit_application_use_case_1.CreateCreditApplicationUseCase,
    get_credit_application_by_external_id_use_case_1.GetCreditApplicationByExternalIdUseCase,
    list_credit_applications_use_case_1.ListCreditApplicationsUseCase,
    update_credit_application_by_external_id_use_case_1.UpdateCreditApplicationByExternalIdUseCase,
    delete_credit_application_by_external_id_use_case_1.DeleteCreditApplicationByExternalIdUseCase,
    register_client_credit_application_use_case_1.RegisterClientCreditApplicationUseCase,
    list_credit_applications_by_partner_use_case_1.ListCreditApplicationsByPartnerUseCase,
    list_credit_applications_by_sales_rep_use_case_1.ListCreditApplicationsBySalesRepUseCase,
    approve_credit_application_use_case_1.ApproveCreditApplicationUseCase,
    reject_credit_application_use_case_1.RejectCreditApplicationUseCase,
    save_credit_application_pre_study_use_case_1.SaveCreditApplicationPreStudyUseCase,
    upload_credit_application_document_use_case_1.UploadCreditApplicationDocumentUseCase,
    register_natural_person_credit_application_use_case_1.RegisterNaturalPersonCreditApplicationUseCase,
];
let CreditApplicationsApplicationModule = class CreditApplicationsApplicationModule {
};
exports.CreditApplicationsApplicationModule = CreditApplicationsApplicationModule;
exports.CreditApplicationsApplicationModule = CreditApplicationsApplicationModule = __decorate([
    (0, common_1.Module)({
        providers: USE_CASES,
        exports: USE_CASES,
    })
], CreditApplicationsApplicationModule);


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/credit-applications.module.ts"
/*!****************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/credit-applications.module.ts ***!
  \****************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreditApplicationsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const platform_express_1 = __webpack_require__(/*! @nestjs/platform-express */ "@nestjs/platform-express");
const multer_1 = __webpack_require__(/*! multer */ "multer");
const credit_applications_application_module_1 = __webpack_require__(/*! @modules/credit-applications/credit-applications-application.module */ "./apps/products-ms/src/modules/credit-applications/credit-applications-application.module.ts");
const credit_applications_public_controller_1 = __webpack_require__(/*! ./presentation/controllers/credit-applications-public.controller */ "./apps/products-ms/src/modules/credit-applications/presentation/controllers/credit-applications-public.controller.ts");
const credit_applications_private_controller_1 = __webpack_require__(/*! ./presentation/controllers/credit-applications-private.controller */ "./apps/products-ms/src/modules/credit-applications/presentation/controllers/credit-applications-private.controller.ts");
let CreditApplicationsModule = class CreditApplicationsModule {
};
exports.CreditApplicationsModule = CreditApplicationsModule;
exports.CreditApplicationsModule = CreditApplicationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            credit_applications_application_module_1.CreditApplicationsApplicationModule,
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.memoryStorage)(),
                limits: { fileSize: 10 * 1024 * 1024 },
            }),
        ],
        controllers: [credit_applications_public_controller_1.CreditApplicationsPublicController, credit_applications_private_controller_1.CreditApplicationsPrivateController],
        exports: [credit_applications_application_module_1.CreditApplicationsApplicationModule],
    })
], CreditApplicationsModule);


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/credit-applications.tokens.ts"
/*!****************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/credit-applications.tokens.ts ***!
  \****************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CREDIT_APPLICATION_REPOSITORY = void 0;
exports.CREDIT_APPLICATION_REPOSITORY = Symbol('CREDIT_APPLICATION_REPOSITORY');


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/domain/models/credit-application.models.ts"
/*!*****************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/domain/models/credit-application.models.ts ***!
  \*****************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreditApplication = void 0;
class CreditApplication {
    internal_id;
    external_id;
    person_id;
    partner_id;
    partner_category_id;
    business_id;
    sales_representative_id;
    number_of_locations;
    number_of_employees;
    business_seniority;
    sector_experience;
    business_flagship_m2;
    business_has_rent;
    business_rent_amount;
    monthly_income;
    monthly_expenses;
    monthly_purchases;
    current_purchases;
    total_assets;
    requested_credit_line;
    is_current_client;
    status;
    submission_date;
    approval_date;
    rejection_reason;
    credit_study_date;
    credit_score;
    credit_decision;
    approved_credit_line;
    analyst_report;
    risk_profile;
    privacy_policy_accepted;
    privacy_policy_date;
    created_at;
    updated_at;
    constructor(internal_id, external_id, person_id, partner_id, partner_category_id, business_id, sales_representative_id, number_of_locations, number_of_employees, business_seniority, sector_experience, business_flagship_m2, business_has_rent, business_rent_amount, monthly_income, monthly_expenses, monthly_purchases, current_purchases, total_assets, requested_credit_line, is_current_client, status, submission_date, approval_date, rejection_reason, credit_study_date, credit_score, credit_decision, approved_credit_line, analyst_report, risk_profile, privacy_policy_accepted, privacy_policy_date, created_at, updated_at) {
        this.internal_id = internal_id;
        this.external_id = external_id;
        this.person_id = person_id;
        this.partner_id = partner_id;
        this.partner_category_id = partner_category_id;
        this.business_id = business_id;
        this.sales_representative_id = sales_representative_id;
        this.number_of_locations = number_of_locations;
        this.number_of_employees = number_of_employees;
        this.business_seniority = business_seniority;
        this.sector_experience = sector_experience;
        this.business_flagship_m2 = business_flagship_m2;
        this.business_has_rent = business_has_rent;
        this.business_rent_amount = business_rent_amount;
        this.monthly_income = monthly_income;
        this.monthly_expenses = monthly_expenses;
        this.monthly_purchases = monthly_purchases;
        this.current_purchases = current_purchases;
        this.total_assets = total_assets;
        this.requested_credit_line = requested_credit_line;
        this.is_current_client = is_current_client;
        this.status = status;
        this.submission_date = submission_date;
        this.approval_date = approval_date;
        this.rejection_reason = rejection_reason;
        this.credit_study_date = credit_study_date;
        this.credit_score = credit_score;
        this.credit_decision = credit_decision;
        this.approved_credit_line = approved_credit_line;
        this.analyst_report = analyst_report;
        this.risk_profile = risk_profile;
        this.privacy_policy_accepted = privacy_policy_accepted;
        this.privacy_policy_date = privacy_policy_date;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
exports.CreditApplication = CreditApplication;


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/domain/ports/credit-application.ports.ts"
/*!***************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/domain/ports/credit-application.ports.ts ***!
  \***************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/presentation/controllers/credit-applications-private.controller.ts"
/*!*****************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/presentation/controllers/credit-applications-private.controller.ts ***!
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreditApplicationsPrivateController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const platform_express_1 = __webpack_require__(/*! @nestjs/platform-express */ "@nestjs/platform-express");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! @modules/auth/infrastructure/guards/jwt-auth.guard */ "./apps/products-ms/src/modules/auth/infrastructure/guards/jwt-auth.guard.ts");
const roles_guard_1 = __webpack_require__(/*! @modules/auth/infrastructure/guards/roles.guard */ "./apps/products-ms/src/modules/auth/infrastructure/guards/roles.guard.ts");
const require_roles_decorator_1 = __webpack_require__(/*! @modules/auth/presentation/decorators/require-roles.decorator */ "./apps/products-ms/src/modules/auth/presentation/decorators/require-roles.decorator.ts");
const list_credit_applications_use_case_1 = __webpack_require__(/*! @modules/credit-applications/application/use-cases/list-credit-applications/list-credit-applications.use-case */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/list-credit-applications/list-credit-applications.use-case.ts");
const list_credit_applications_by_partner_use_case_1 = __webpack_require__(/*! @modules/credit-applications/application/use-cases/list-credit-applications-by-partner/list-credit-applications-by-partner.use-case */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/list-credit-applications-by-partner/list-credit-applications-by-partner.use-case.ts");
const list_credit_applications_by_partner_request_1 = __webpack_require__(/*! @modules/credit-applications/application/use-cases/list-credit-applications-by-partner/list-credit-applications-by-partner.request */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/list-credit-applications-by-partner/list-credit-applications-by-partner.request.ts");
const list_credit_applications_by_sales_rep_use_case_1 = __webpack_require__(/*! @modules/credit-applications/application/use-cases/list-credit-applications-by-sales-rep/list-credit-applications-by-sales-rep.use-case */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/list-credit-applications-by-sales-rep/list-credit-applications-by-sales-rep.use-case.ts");
const list_credit_applications_by_sales_rep_request_1 = __webpack_require__(/*! @modules/credit-applications/application/use-cases/list-credit-applications-by-sales-rep/list-credit-applications-by-sales-rep.request */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/list-credit-applications-by-sales-rep/list-credit-applications-by-sales-rep.request.ts");
const get_credit_application_by_external_id_use_case_1 = __webpack_require__(/*! @modules/credit-applications/application/use-cases/get-credit-application-by-external-id/get-credit-application-by-external-id.use-case */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/get-credit-application-by-external-id/get-credit-application-by-external-id.use-case.ts");
const get_credit_application_by_external_id_request_1 = __webpack_require__(/*! @modules/credit-applications/application/use-cases/get-credit-application-by-external-id/get-credit-application-by-external-id.request */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/get-credit-application-by-external-id/get-credit-application-by-external-id.request.ts");
const update_credit_application_by_external_id_use_case_1 = __webpack_require__(/*! @modules/credit-applications/application/use-cases/update-credit-application-by-external-id/update-credit-application-by-external-id.use-case */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/update-credit-application-by-external-id/update-credit-application-by-external-id.use-case.ts");
const update_credit_application_by_external_id_request_1 = __webpack_require__(/*! @modules/credit-applications/application/use-cases/update-credit-application-by-external-id/update-credit-application-by-external-id.request */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/update-credit-application-by-external-id/update-credit-application-by-external-id.request.ts");
const save_credit_application_pre_study_use_case_1 = __webpack_require__(/*! @modules/credit-applications/application/use-cases/save-credit-application-pre-study/save-credit-application-pre-study.use-case */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/save-credit-application-pre-study/save-credit-application-pre-study.use-case.ts");
const save_credit_application_pre_study_request_1 = __webpack_require__(/*! @modules/credit-applications/application/use-cases/save-credit-application-pre-study/save-credit-application-pre-study.request */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/save-credit-application-pre-study/save-credit-application-pre-study.request.ts");
const upload_credit_application_document_use_case_1 = __webpack_require__(/*! @modules/credit-applications/application/use-cases/upload-credit-application-document/upload-credit-application-document.use-case */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/upload-credit-application-document/upload-credit-application-document.use-case.ts");
const upload_credit_application_document_request_1 = __webpack_require__(/*! @modules/credit-applications/application/use-cases/upload-credit-application-document/upload-credit-application-document.request */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/upload-credit-application-document/upload-credit-application-document.request.ts");
const approve_credit_application_use_case_1 = __webpack_require__(/*! @modules/credit-applications/application/use-cases/approve-credit-application/approve-credit-application.use-case */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/approve-credit-application/approve-credit-application.use-case.ts");
const approve_credit_application_request_1 = __webpack_require__(/*! @modules/credit-applications/application/use-cases/approve-credit-application/approve-credit-application.request */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/approve-credit-application/approve-credit-application.request.ts");
const reject_credit_application_use_case_1 = __webpack_require__(/*! @modules/credit-applications/application/use-cases/reject-credit-application/reject-credit-application.use-case */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/reject-credit-application/reject-credit-application.use-case.ts");
const reject_credit_application_request_1 = __webpack_require__(/*! @modules/credit-applications/application/use-cases/reject-credit-application/reject-credit-application.request */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/reject-credit-application/reject-credit-application.request.ts");
const update_credit_application_dto_1 = __webpack_require__(/*! ../dto/update-credit-application.dto */ "./apps/products-ms/src/modules/credit-applications/presentation/dto/update-credit-application.dto.ts");
const approve_credit_application_dto_1 = __webpack_require__(/*! ../dto/approve-credit-application.dto */ "./apps/products-ms/src/modules/credit-applications/presentation/dto/approve-credit-application.dto.ts");
const reject_credit_application_dto_1 = __webpack_require__(/*! ../dto/reject-credit-application.dto */ "./apps/products-ms/src/modules/credit-applications/presentation/dto/reject-credit-application.dto.ts");
const save_pre_study_dto_1 = __webpack_require__(/*! ../dto/save-pre-study.dto */ "./apps/products-ms/src/modules/credit-applications/presentation/dto/save-pre-study.dto.ts");
const credit_application_response_dto_1 = __webpack_require__(/*! ../dto/credit-application-response.dto */ "./apps/products-ms/src/modules/credit-applications/presentation/dto/credit-application-response.dto.ts");
let CreditApplicationsPrivateController = class CreditApplicationsPrivateController {
    list_all;
    list_by_partner;
    list_by_sales_rep;
    get_by_external_id;
    update;
    save_pre_study;
    upload_document;
    approve;
    reject;
    constructor(list_all, list_by_partner, list_by_sales_rep, get_by_external_id, update, save_pre_study, upload_document, approve, reject) {
        this.list_all = list_all;
        this.list_by_partner = list_by_partner;
        this.list_by_sales_rep = list_by_sales_rep;
        this.get_by_external_id = get_by_external_id;
        this.update = update;
        this.save_pre_study = save_pre_study;
        this.upload_document = upload_document;
        this.approve = approve;
        this.reject = reject;
    }
    async list() {
        const rows = await this.list_all.execute();
        return rows.map(credit_application_response_dto_1.CreditApplicationResponseDto.from);
    }
    async list_by_partner_id(partner_id) {
        const rows = await this.list_by_partner.execute(new list_credit_applications_by_partner_request_1.ListCreditApplicationsByPartnerRequest(partner_id));
        return rows.map(credit_application_response_dto_1.CreditApplicationResponseDto.from);
    }
    async list_by_sales_rep_id(sales_rep_id) {
        const rows = await this.list_by_sales_rep.execute(new list_credit_applications_by_sales_rep_request_1.ListCreditApplicationsBySalesRepRequest(sales_rep_id));
        return rows.map(credit_application_response_dto_1.CreditApplicationResponseDto.from);
    }
    async get_detail(external_id) {
        const result = await this.get_by_external_id.execute(new get_credit_application_by_external_id_request_1.GetCreditApplicationByExternalIdRequest(external_id));
        return credit_application_response_dto_1.CreditApplicationResponseDto.from(result);
    }
    async update_application(external_id, dto) {
        const result = await this.update.execute(new update_credit_application_by_external_id_request_1.UpdateCreditApplicationByExternalIdRequest(external_id, dto.status, undefined, dto.partnerId, dto.partnerCategoryId, dto.businessId, dto.salesRepresentativeId, dto.isCurrentClient, undefined, dto.numberOfLocations, dto.numberOfEmployees, dto.businessSeniority, undefined, dto.businessFlagshipM2, dto.businessHasRent, dto.businessRentAmount, dto.monthlyIncome, dto.monthlyExpenses, dto.monthlyPurchases, dto.currentPurchases, dto.totalAssets, dto.requestedCreditLine, dto.submissionDate ? new Date(dto.submissionDate) : undefined, undefined, dto.rejectionReason));
        return credit_application_response_dto_1.CreditApplicationResponseDto.from(result);
    }
    async save_study(external_id, dto) {
        const result = await this.save_pre_study.execute(new save_credit_application_pre_study_request_1.SaveCreditApplicationPreStudyRequest(external_id, dto.creditScore ?? null, dto.creditDecision ?? null, dto.riskProfile ?? null, dto.analystReport ?? null, dto.creditStudyDate ? new Date(dto.creditStudyDate) : null));
        return credit_application_response_dto_1.CreditApplicationResponseDto.from(result);
    }
    async upload_doc(external_id, document_type, file) {
        const result = await this.upload_document.execute(new upload_credit_application_document_request_1.UploadCreditApplicationDocumentRequest(external_id, document_type, file.originalname, file.mimetype, file.buffer.toString('base64')));
        return { documentId: result.documentId, url: result.url };
    }
    async approve_application(external_id, dto) {
        const result = await this.approve.execute(new approve_credit_application_request_1.ApproveCreditApplicationRequest(external_id, dto.approvedCreditLine, dto.analystReport));
        return credit_application_response_dto_1.CreditApplicationResponseDto.from(result);
    }
    async reject_application(external_id, dto) {
        const result = await this.reject.execute(new reject_credit_application_request_1.RejectCreditApplicationRequest(external_id, dto.rejectionReason));
        return credit_application_response_dto_1.CreditApplicationResponseDto.from(result);
    }
};
exports.CreditApplicationsPrivateController = CreditApplicationsPrivateController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todas las solicitudes de cupo' }),
    (0, swagger_1.ApiOkResponse)({ type: [credit_application_response_dto_1.CreditApplicationResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], CreditApplicationsPrivateController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('partner/:partnerId'),
    (0, swagger_1.ApiOperation)({ summary: 'Listar solicitudes por partner (internal ID)' }),
    (0, swagger_1.ApiOkResponse)({ type: [credit_application_response_dto_1.CreditApplicationResponseDto] }),
    __param(0, (0, common_1.Param)('partnerId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], CreditApplicationsPrivateController.prototype, "list_by_partner_id", null);
__decorate([
    (0, common_1.Get)('sales-rep/:salesRepId'),
    (0, swagger_1.ApiOperation)({ summary: 'Listar solicitudes por Sales Representative (internal ID)' }),
    (0, swagger_1.ApiOkResponse)({ type: [credit_application_response_dto_1.CreditApplicationResponseDto] }),
    __param(0, (0, common_1.Param)('salesRepId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], CreditApplicationsPrivateController.prototype, "list_by_sales_rep_id", null);
__decorate([
    (0, common_1.Get)(':externalId'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener detalle de una solicitud' }),
    (0, swagger_1.ApiOkResponse)({ type: credit_application_response_dto_1.CreditApplicationResponseDto }),
    __param(0, (0, common_1.Param)('externalId', new common_1.ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
], CreditApplicationsPrivateController.prototype, "get_detail", null);
__decorate([
    (0, common_1.Patch)(':externalId'),
    (0, swagger_1.ApiOperation)({ summary: 'Editar solicitud (parcial)' }),
    (0, swagger_1.ApiOkResponse)({ type: credit_application_response_dto_1.CreditApplicationResponseDto }),
    __param(0, (0, common_1.Param)('externalId', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_p = typeof update_credit_application_dto_1.UpdateCreditApplicationDto !== "undefined" && update_credit_application_dto_1.UpdateCreditApplicationDto) === "function" ? _p : Object]),
    __metadata("design:returntype", typeof (_q = typeof Promise !== "undefined" && Promise) === "function" ? _q : Object)
], CreditApplicationsPrivateController.prototype, "update_application", null);
__decorate([
    (0, common_1.Post)(':externalId/pre-study'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Guardar estudio previo de la solicitud' }),
    (0, swagger_1.ApiOkResponse)({ type: credit_application_response_dto_1.CreditApplicationResponseDto }),
    __param(0, (0, common_1.Param)('externalId', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_r = typeof save_pre_study_dto_1.SavePreStudyDto !== "undefined" && save_pre_study_dto_1.SavePreStudyDto) === "function" ? _r : Object]),
    __metadata("design:returntype", typeof (_s = typeof Promise !== "undefined" && Promise) === "function" ? _s : Object)
], CreditApplicationsPrivateController.prototype, "save_study", null);
__decorate([
    (0, common_1.Post)(':externalId/documents'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Subir documento a la solicitud' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            required: ['documentType', 'file'],
            properties: {
                documentType: { type: 'string', description: 'Tipo de documento (catálogo)' },
                file: { type: 'string', format: 'binary' },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('externalId', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(1, (0, common_1.Body)('documentType')),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, typeof (_t = typeof MulterFile !== "undefined" && MulterFile) === "function" ? _t : Object]),
    __metadata("design:returntype", typeof (_u = typeof Promise !== "undefined" && Promise) === "function" ? _u : Object)
], CreditApplicationsPrivateController.prototype, "upload_doc", null);
__decorate([
    (0, common_1.Post)(':externalId/approve'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, require_roles_decorator_1.RequireRoles)(shared_1.Roles.BACK_OFFICE_ADMIN, shared_1.Roles.BACK_OFFICE_ANALYST),
    (0, swagger_1.ApiOperation)({ summary: 'Aprobar solicitud de cupo' }),
    (0, swagger_1.ApiOkResponse)({ type: credit_application_response_dto_1.CreditApplicationResponseDto }),
    __param(0, (0, common_1.Param)('externalId', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_v = typeof approve_credit_application_dto_1.ApproveCreditApplicationDto !== "undefined" && approve_credit_application_dto_1.ApproveCreditApplicationDto) === "function" ? _v : Object]),
    __metadata("design:returntype", typeof (_w = typeof Promise !== "undefined" && Promise) === "function" ? _w : Object)
], CreditApplicationsPrivateController.prototype, "approve_application", null);
__decorate([
    (0, common_1.Post)(':externalId/reject'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, require_roles_decorator_1.RequireRoles)(shared_1.Roles.BACK_OFFICE_ADMIN, shared_1.Roles.BACK_OFFICE_ANALYST),
    (0, swagger_1.ApiOperation)({ summary: 'Rechazar solicitud de cupo' }),
    (0, swagger_1.ApiOkResponse)({ type: credit_application_response_dto_1.CreditApplicationResponseDto }),
    __param(0, (0, common_1.Param)('externalId', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_x = typeof reject_credit_application_dto_1.RejectCreditApplicationDto !== "undefined" && reject_credit_application_dto_1.RejectCreditApplicationDto) === "function" ? _x : Object]),
    __metadata("design:returntype", typeof (_y = typeof Promise !== "undefined" && Promise) === "function" ? _y : Object)
], CreditApplicationsPrivateController.prototype, "reject_application", null);
exports.CreditApplicationsPrivateController = CreditApplicationsPrivateController = __decorate([
    (0, swagger_1.ApiTags)('credit-applications'),
    (0, swagger_1.ApiBearerAuth)('cognito-access-token'),
    (0, common_1.Controller)('credit-applications'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, require_roles_decorator_1.RequireRoles)(shared_1.Roles.BACK_OFFICE_ADMIN, shared_1.Roles.BACK_OFFICE_ANALYST, shared_1.Roles.SALES_MANAGER, shared_1.Roles.SALES_REPRESENTATIVE, shared_1.Roles.PARTNER_ADMIN),
    __metadata("design:paramtypes", [typeof (_a = typeof list_credit_applications_use_case_1.ListCreditApplicationsUseCase !== "undefined" && list_credit_applications_use_case_1.ListCreditApplicationsUseCase) === "function" ? _a : Object, typeof (_b = typeof list_credit_applications_by_partner_use_case_1.ListCreditApplicationsByPartnerUseCase !== "undefined" && list_credit_applications_by_partner_use_case_1.ListCreditApplicationsByPartnerUseCase) === "function" ? _b : Object, typeof (_c = typeof list_credit_applications_by_sales_rep_use_case_1.ListCreditApplicationsBySalesRepUseCase !== "undefined" && list_credit_applications_by_sales_rep_use_case_1.ListCreditApplicationsBySalesRepUseCase) === "function" ? _c : Object, typeof (_d = typeof get_credit_application_by_external_id_use_case_1.GetCreditApplicationByExternalIdUseCase !== "undefined" && get_credit_application_by_external_id_use_case_1.GetCreditApplicationByExternalIdUseCase) === "function" ? _d : Object, typeof (_e = typeof update_credit_application_by_external_id_use_case_1.UpdateCreditApplicationByExternalIdUseCase !== "undefined" && update_credit_application_by_external_id_use_case_1.UpdateCreditApplicationByExternalIdUseCase) === "function" ? _e : Object, typeof (_f = typeof save_credit_application_pre_study_use_case_1.SaveCreditApplicationPreStudyUseCase !== "undefined" && save_credit_application_pre_study_use_case_1.SaveCreditApplicationPreStudyUseCase) === "function" ? _f : Object, typeof (_g = typeof upload_credit_application_document_use_case_1.UploadCreditApplicationDocumentUseCase !== "undefined" && upload_credit_application_document_use_case_1.UploadCreditApplicationDocumentUseCase) === "function" ? _g : Object, typeof (_h = typeof approve_credit_application_use_case_1.ApproveCreditApplicationUseCase !== "undefined" && approve_credit_application_use_case_1.ApproveCreditApplicationUseCase) === "function" ? _h : Object, typeof (_j = typeof reject_credit_application_use_case_1.RejectCreditApplicationUseCase !== "undefined" && reject_credit_application_use_case_1.RejectCreditApplicationUseCase) === "function" ? _j : Object])
], CreditApplicationsPrivateController);


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/presentation/controllers/credit-applications-public.controller.ts"
/*!****************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/presentation/controllers/credit-applications-public.controller.ts ***!
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreditApplicationsPublicController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const register_client_credit_application_use_case_1 = __webpack_require__(/*! @modules/credit-applications/application/use-cases/register-client-credit-application/register-client-credit-application.use-case */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/register-client-credit-application/register-client-credit-application.use-case.ts");
const register_client_credit_application_request_1 = __webpack_require__(/*! @modules/credit-applications/application/use-cases/register-client-credit-application/register-client-credit-application.request */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/register-client-credit-application/register-client-credit-application.request.ts");
const register_natural_person_credit_application_use_case_1 = __webpack_require__(/*! @modules/credit-applications/application/use-cases/register-natural-person-credit-application/register-natural-person-credit-application.use-case */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/register-natural-person-credit-application/register-natural-person-credit-application.use-case.ts");
const register_natural_person_credit_application_request_1 = __webpack_require__(/*! @modules/credit-applications/application/use-cases/register-natural-person-credit-application/register-natural-person-credit-application.request */ "./apps/products-ms/src/modules/credit-applications/application/use-cases/register-natural-person-credit-application/register-natural-person-credit-application.request.ts");
const create_credit_application_dto_1 = __webpack_require__(/*! ../dto/create-credit-application.dto */ "./apps/products-ms/src/modules/credit-applications/presentation/dto/create-credit-application.dto.ts");
const create_natural_person_credit_application_dto_1 = __webpack_require__(/*! ../dto/create-natural-person-credit-application.dto */ "./apps/products-ms/src/modules/credit-applications/presentation/dto/create-natural-person-credit-application.dto.ts");
const credit_application_response_dto_1 = __webpack_require__(/*! ../dto/credit-application-response.dto */ "./apps/products-ms/src/modules/credit-applications/presentation/dto/credit-application-response.dto.ts");
let CreditApplicationsPublicController = class CreditApplicationsPublicController {
    register_client;
    register_natural_person;
    constructor(register_client, register_natural_person) {
        this.register_client = register_client;
        this.register_natural_person = register_natural_person;
    }
    async create(dto) {
        const result = await this.register_client.execute(new register_client_credit_application_request_1.RegisterClientCreditApplicationRequest(dto.phone, dto.email, dto.docType, dto.docNumber, dto.firstName, dto.lastName, dto.businessName, dto.businessType, dto.isCurrentClient, dto.requestedCreditLine, dto.relationshipToBusiness, dto.cityId, dto.businessAddress, dto.businessSeniority, dto.numberOfEmployees, dto.numberOfLocations, dto.businessFlagshipM2, dto.businessHasRent, dto.businessRentAmount, dto.monthlyPurchases, dto.currentPurchases, dto.totalAssets, dto.monthlyIncome, dto.monthlyExpenses));
        return credit_application_response_dto_1.CreditApplicationResponseDto.from(result);
    }
    async create_natural_person(dto) {
        const result = await this.register_natural_person.execute(new register_natural_person_credit_application_request_1.RegisterNaturalPersonCreditApplicationRequest(dto.birthDate, dto.businessAddress, dto.businessFlagshipM2, dto.businessName, dto.businessRentAmount, dto.businessSeniority, dto.businessType, dto.cityId, dto.currentPurchases, dto.docNumber, dto.docType, dto.email, dto.firstName, dto.lastName, dto.monthlyExpenses, dto.monthlyIncome, dto.monthlyPurchases, dto.numberOfEmployees, dto.numberOfLocations, dto.partnerId, dto.salesRepId, dto.privacyPolicyAccepted, dto.phone, dto.relationshipToBusiness, dto.requestedCreditLine, dto.totalAssets));
        return credit_application_response_dto_1.CreditApplicationResponseDto.from(result);
    }
};
exports.CreditApplicationsPublicController = CreditApplicationsPublicController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Crear solicitud de cupo / Registrar cliente',
        description: 'Endpoint público. Registra un cliente nuevo (o existente por docNumber) y crea una solicitud de cupo en estado IN_PROGRESS.',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Solicitud creada',
        type: credit_application_response_dto_1.CreditApplicationResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof create_credit_application_dto_1.CreateCreditApplicationDto !== "undefined" && create_credit_application_dto_1.CreateCreditApplicationDto) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], CreditApplicationsPublicController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('natural-person'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Crear solicitud de cupo (persona natural)',
        description: 'Persona nueva: alta vía SQS en transversal-ms (`persons`). Luego negocio en `suppliers_schema.businesses` y solicitud en `credit_applications` con partner asociado.',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Solicitud creada',
        type: credit_application_response_dto_1.CreditApplicationResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof create_natural_person_credit_application_dto_1.CreateNaturalPersonCreditApplicationDto !== "undefined" && create_natural_person_credit_application_dto_1.CreateNaturalPersonCreditApplicationDto) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], CreditApplicationsPublicController.prototype, "create_natural_person", null);
exports.CreditApplicationsPublicController = CreditApplicationsPublicController = __decorate([
    (0, swagger_1.ApiTags)('credit-applications'),
    (0, common_1.Controller)('credit-applications'),
    __metadata("design:paramtypes", [typeof (_a = typeof register_client_credit_application_use_case_1.RegisterClientCreditApplicationUseCase !== "undefined" && register_client_credit_application_use_case_1.RegisterClientCreditApplicationUseCase) === "function" ? _a : Object, typeof (_b = typeof register_natural_person_credit_application_use_case_1.RegisterNaturalPersonCreditApplicationUseCase !== "undefined" && register_natural_person_credit_application_use_case_1.RegisterNaturalPersonCreditApplicationUseCase) === "function" ? _b : Object])
], CreditApplicationsPublicController);


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/presentation/dto/approve-credit-application.dto.ts"
/*!*************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/presentation/dto/approve-credit-application.dto.ts ***!
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
exports.ApproveCreditApplicationDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class ApproveCreditApplicationDto {
    approvedCreditLine;
    analystReport;
}
exports.ApproveCreditApplicationDto = ApproveCreditApplicationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cupo aprobado en centavos (COP)' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ApproveCreditApplicationDto.prototype, "approvedCreditLine", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true, description: 'Informe del analista' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], ApproveCreditApplicationDto.prototype, "analystReport", void 0);


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/presentation/dto/create-credit-application.dto.ts"
/*!************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/presentation/dto/create-credit-application.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateCreditApplicationDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateCreditApplicationDto {
    phone;
    email;
    docType;
    docNumber;
    firstName;
    lastName;
    businessName;
    businessType;
    relationshipToBusiness;
    cityId;
    businessAddress;
    businessSeniority;
    numberOfEmployees;
    numberOfLocations;
    businessFlagshipM2;
    businessHasRent;
    businessRentAmount;
    requestedCreditLine;
    isCurrentClient;
    monthlyPurchases;
    currentPurchases;
    totalAssets;
    monthlyIncome;
    monthlyExpenses;
}
exports.CreateCreditApplicationDto = CreateCreditApplicationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Teléfono del solicitante' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCreditApplicationDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Correo electrónico del solicitante' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateCreditApplicationDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tipo de documento (catálogo)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCreditApplicationDto.prototype, "docType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Número de documento' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCreditApplicationDto.prototype, "docNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCreditApplicationDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCreditApplicationDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre del negocio' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCreditApplicationDto.prototype, "businessName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tipo de negocio' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCreditApplicationDto.prototype, "businessType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateCreditApplicationDto.prototype, "relationshipToBusiness", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true, description: 'UUID v4 de la ciudad (catálogo transversal)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", Object)
], CreateCreditApplicationDto.prototype, "cityId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateCreditApplicationDto.prototype, "businessAddress", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateCreditApplicationDto.prototype, "businessSeniority", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateCreditApplicationDto.prototype, "numberOfEmployees", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateCreditApplicationDto.prototype, "numberOfLocations", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateCreditApplicationDto.prototype, "businessFlagshipM2", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Object)
], CreateCreditApplicationDto.prototype, "businessHasRent", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateCreditApplicationDto.prototype, "businessRentAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cupo solicitado en centavos (COP)' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateCreditApplicationDto.prototype, "requestedCreditLine", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateCreditApplicationDto.prototype, "isCurrentClient", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateCreditApplicationDto.prototype, "monthlyPurchases", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateCreditApplicationDto.prototype, "currentPurchases", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateCreditApplicationDto.prototype, "totalAssets", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateCreditApplicationDto.prototype, "monthlyIncome", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateCreditApplicationDto.prototype, "monthlyExpenses", void 0);


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/presentation/dto/create-natural-person-credit-application.dto.ts"
/*!***************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/presentation/dto/create-natural-person-credit-application.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateNaturalPersonCreditApplicationDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateNaturalPersonCreditApplicationDto {
    birthDate;
    businessAddress;
    businessFlagshipM2;
    businessName;
    businessRentAmount;
    businessSeniority;
    businessType;
    cityId;
    currentPurchases;
    docNumber;
    docType;
    email;
    firstName;
    lastName;
    monthlyExpenses;
    monthlyIncome;
    monthlyPurchases;
    numberOfEmployees;
    numberOfLocations;
    partnerId;
    salesRepId;
    privacyPolicyAccepted;
    phone;
    relationshipToBusiness;
    requestedCreditLine;
    totalAssets;
}
exports.CreateNaturalPersonCreditApplicationDto = CreateNaturalPersonCreditApplicationDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateNaturalPersonCreditApplicationDto.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateNaturalPersonCreditApplicationDto.prototype, "businessAddress", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateNaturalPersonCreditApplicationDto.prototype, "businessFlagshipM2", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre del negocio' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateNaturalPersonCreditApplicationDto.prototype, "businessName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Arriendo mensual (si aplica)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateNaturalPersonCreditApplicationDto.prototype, "businessRentAmount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateNaturalPersonCreditApplicationDto.prototype, "businessSeniority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tipo de negocio' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateNaturalPersonCreditApplicationDto.prototype, "businessType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true, description: 'UUID v4 de la ciudad' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", Object)
], CreateNaturalPersonCreditApplicationDto.prototype, "cityId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateNaturalPersonCreditApplicationDto.prototype, "currentPurchases", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateNaturalPersonCreditApplicationDto.prototype, "docNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateNaturalPersonCreditApplicationDto.prototype, "docType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateNaturalPersonCreditApplicationDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateNaturalPersonCreditApplicationDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateNaturalPersonCreditApplicationDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateNaturalPersonCreditApplicationDto.prototype, "monthlyExpenses", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateNaturalPersonCreditApplicationDto.prototype, "monthlyIncome", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateNaturalPersonCreditApplicationDto.prototype, "monthlyPurchases", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateNaturalPersonCreditApplicationDto.prototype, "numberOfEmployees", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateNaturalPersonCreditApplicationDto.prototype, "numberOfLocations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Identificador externo del partner (UUID)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateNaturalPersonCreditApplicationDto.prototype, "partnerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Identificador externo (UUID, `sales_representatives.external_id`) del representante de ventas',
    }),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", String)
], CreateNaturalPersonCreditApplicationDto.prototype, "salesRepId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Aceptación explícita de la política de privacidad' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateNaturalPersonCreditApplicationDto.prototype, "privacyPolicyAccepted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateNaturalPersonCreditApplicationDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateNaturalPersonCreditApplicationDto.prototype, "relationshipToBusiness", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cupo solicitado (p. ej. centavos COP)' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateNaturalPersonCreditApplicationDto.prototype, "requestedCreditLine", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateNaturalPersonCreditApplicationDto.prototype, "totalAssets", void 0);


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/presentation/dto/credit-application-response.dto.ts"
/*!**************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/presentation/dto/credit-application-response.dto.ts ***!
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
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreditApplicationResponseDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
class CreditApplicationResponseDto {
    externalId;
    personId;
    partnerId;
    partnerCategoryId;
    businessId;
    salesRepresentativeId;
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
    createdAt;
    updatedAt;
    static from(fields) {
        return Object.assign(new CreditApplicationResponseDto(), fields);
    }
}
exports.CreditApplicationResponseDto = CreditApplicationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreditApplicationResponseDto.prototype, "externalId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "personId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "partnerId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "partnerCategoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "businessId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "salesRepresentativeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "numberOfLocations", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "numberOfEmployees", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "businessSeniority", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "sectorExperience", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "businessFlagshipM2", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "businessHasRent", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "businessRentAmount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "monthlyIncome", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "monthlyExpenses", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "monthlyPurchases", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "currentPurchases", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "totalAssets", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "requestedCreditLine", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], CreditApplicationResponseDto.prototype, "isCurrentClient", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: shared_1.CreditApplicationStatus }),
    __metadata("design:type", typeof (_a = typeof shared_1.CreditApplicationStatus !== "undefined" && shared_1.CreditApplicationStatus) === "function" ? _a : Object)
], CreditApplicationResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "submissionDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "approvalDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "rejectionReason", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "creditStudyDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "creditScore", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "creditDecision", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "approvedCreditLine", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "analystReport", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "riskProfile", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], CreditApplicationResponseDto.prototype, "privacyPolicyAccepted", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "privacyPolicyDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", typeof (_f = typeof Date !== "undefined" && Date) === "function" ? _f : Object)
], CreditApplicationResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", typeof (_g = typeof Date !== "undefined" && Date) === "function" ? _g : Object)
], CreditApplicationResponseDto.prototype, "updatedAt", void 0);


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/presentation/dto/reject-credit-application.dto.ts"
/*!************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/presentation/dto/reject-credit-application.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RejectCreditApplicationDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class RejectCreditApplicationDto {
    rejectionReason;
}
exports.RejectCreditApplicationDto = RejectCreditApplicationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Motivo de rechazo', maxLength: 500 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], RejectCreditApplicationDto.prototype, "rejectionReason", void 0);


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/presentation/dto/save-pre-study.dto.ts"
/*!*************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/presentation/dto/save-pre-study.dto.ts ***!
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
exports.SavePreStudyDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class SavePreStudyDto {
    creditScore;
    creditDecision;
    riskProfile;
    analystReport;
    creditStudyDate;
}
exports.SavePreStudyDto = SavePreStudyDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true, description: 'Score crediticio (decimal como string)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], SavePreStudyDto.prototype, "creditScore", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true, description: 'Decisión del estudio (ej: approved, rejected, review)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], SavePreStudyDto.prototype, "creditDecision", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true, description: 'Perfil de riesgo (ej: low, medium, high)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], SavePreStudyDto.prototype, "riskProfile", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true, description: 'Informe del analista en texto libre' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], SavePreStudyDto.prototype, "analystReport", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true, description: 'Fecha del estudio (ISO 8601)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Object)
], SavePreStudyDto.prototype, "creditStudyDate", void 0);


/***/ },

/***/ "./apps/products-ms/src/modules/credit-applications/presentation/dto/update-credit-application.dto.ts"
/*!************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-applications/presentation/dto/update-credit-application.dto.ts ***!
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateCreditApplicationDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class UpdateCreditApplicationDto {
    status;
    partnerId;
    partnerCategoryId;
    businessId;
    salesRepresentativeId;
    isCurrentClient;
    numberOfLocations;
    numberOfEmployees;
    businessSeniority;
    businessFlagshipM2;
    businessHasRent;
    businessRentAmount;
    monthlyIncome;
    monthlyExpenses;
    monthlyPurchases;
    currentPurchases;
    totalAssets;
    requestedCreditLine;
    submissionDate;
    rejectionReason;
}
exports.UpdateCreditApplicationDto = UpdateCreditApplicationDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: shared_1.CreditApplicationStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(shared_1.CreditApplicationStatus),
    __metadata("design:type", typeof (_a = typeof shared_1.CreditApplicationStatus !== "undefined" && shared_1.CreditApplicationStatus) === "function" ? _a : Object)
], UpdateCreditApplicationDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Object)
], UpdateCreditApplicationDto.prototype, "partnerId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Object)
], UpdateCreditApplicationDto.prototype, "partnerCategoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Object)
], UpdateCreditApplicationDto.prototype, "businessId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateCreditApplicationDto.prototype, "salesRepresentativeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateCreditApplicationDto.prototype, "isCurrentClient", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], UpdateCreditApplicationDto.prototype, "numberOfLocations", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], UpdateCreditApplicationDto.prototype, "numberOfEmployees", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], UpdateCreditApplicationDto.prototype, "businessSeniority", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], UpdateCreditApplicationDto.prototype, "businessFlagshipM2", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Object)
], UpdateCreditApplicationDto.prototype, "businessHasRent", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], UpdateCreditApplicationDto.prototype, "businessRentAmount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], UpdateCreditApplicationDto.prototype, "monthlyIncome", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], UpdateCreditApplicationDto.prototype, "monthlyExpenses", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], UpdateCreditApplicationDto.prototype, "monthlyPurchases", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], UpdateCreditApplicationDto.prototype, "currentPurchases", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], UpdateCreditApplicationDto.prototype, "totalAssets", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], UpdateCreditApplicationDto.prototype, "requestedCreditLine", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Object)
], UpdateCreditApplicationDto.prototype, "submissionDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], UpdateCreditApplicationDto.prototype, "rejectionReason", void 0);


/***/ },

/***/ "./apps/products-ms/src/modules/credit-facilities/application/mapping/credit-facility-public-fields.builder.ts"
/*!*********************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-facilities/application/mapping/credit-facility-public-fields.builder.ts ***!
  \*********************************************************************************************************************/
(__unused_webpack_module, exports) {


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


/***/ },

/***/ "./apps/products-ms/src/modules/credit-facilities/application/use-cases/create-credit-facility/create-credit-facility.request.ts"
/*!***************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-facilities/application/use-cases/create-credit-facility/create-credit-facility.request.ts ***!
  \***************************************************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateCreditFacilityRequest = void 0;
class CreateCreditFacilityRequest {
    contract_id;
    total_limit;
    state;
    business_id;
    external_id;
    constructor(contract_id, total_limit, state, business_id, external_id) {
        this.contract_id = contract_id;
        this.total_limit = total_limit;
        this.state = state;
        this.business_id = business_id;
        this.external_id = external_id;
    }
}
exports.CreateCreditFacilityRequest = CreateCreditFacilityRequest;


/***/ },

/***/ "./apps/products-ms/src/modules/credit-facilities/application/use-cases/create-credit-facility/create-credit-facility.response.ts"
/*!****************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-facilities/application/use-cases/create-credit-facility/create-credit-facility.response.ts ***!
  \****************************************************************************************************************************************/
(__unused_webpack_module, exports) {


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


/***/ },

/***/ "./apps/products-ms/src/modules/credit-facilities/application/use-cases/create-credit-facility/create-credit-facility.use-case.ts"
/*!****************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-facilities/application/use-cases/create-credit-facility/create-credit-facility.use-case.ts ***!
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
exports.CreateCreditFacilityUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const credit_facilities_tokens_1 = __webpack_require__(/*! @modules/credit-facilities/credit-facilities.tokens */ "./apps/products-ms/src/modules/credit-facilities/credit-facilities.tokens.ts");
const credit_facility_ports_1 = __webpack_require__(/*! @modules/credit-facilities/domain/ports/credit-facility.ports */ "./apps/products-ms/src/modules/credit-facilities/domain/ports/credit-facility.ports.ts");
const credit_facility_public_fields_builder_1 = __webpack_require__(/*! @modules/credit-facilities/application/mapping/credit-facility-public-fields.builder */ "./apps/products-ms/src/modules/credit-facilities/application/mapping/credit-facility-public-fields.builder.ts");
const create_credit_facility_response_1 = __webpack_require__(/*! ./create-credit-facility.response */ "./apps/products-ms/src/modules/credit-facilities/application/use-cases/create-credit-facility/create-credit-facility.response.ts");
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
            business_id: req.business_id,
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


/***/ },

/***/ "./apps/products-ms/src/modules/credit-facilities/application/use-cases/delete-credit-facility-by-external-id/delete-credit-facility-by-external-id.use-case.ts"
/*!**********************************************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-facilities/application/use-cases/delete-credit-facility-by-external-id/delete-credit-facility-by-external-id.use-case.ts ***!
  \**********************************************************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const credit_facilities_tokens_1 = __webpack_require__(/*! @modules/credit-facilities/credit-facilities.tokens */ "./apps/products-ms/src/modules/credit-facilities/credit-facilities.tokens.ts");
const credit_facility_ports_1 = __webpack_require__(/*! @modules/credit-facilities/domain/ports/credit-facility.ports */ "./apps/products-ms/src/modules/credit-facilities/domain/ports/credit-facility.ports.ts");
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


/***/ },

/***/ "./apps/products-ms/src/modules/credit-facilities/application/use-cases/get-credit-facility-by-external-id/get-credit-facility-by-external-id.response.ts"
/*!****************************************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-facilities/application/use-cases/get-credit-facility-by-external-id/get-credit-facility-by-external-id.response.ts ***!
  \****************************************************************************************************************************************************************/
(__unused_webpack_module, exports) {


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


/***/ },

/***/ "./apps/products-ms/src/modules/credit-facilities/application/use-cases/get-credit-facility-by-external-id/get-credit-facility-by-external-id.use-case.ts"
/*!****************************************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-facilities/application/use-cases/get-credit-facility-by-external-id/get-credit-facility-by-external-id.use-case.ts ***!
  \****************************************************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const credit_facilities_tokens_1 = __webpack_require__(/*! @modules/credit-facilities/credit-facilities.tokens */ "./apps/products-ms/src/modules/credit-facilities/credit-facilities.tokens.ts");
const credit_facility_ports_1 = __webpack_require__(/*! @modules/credit-facilities/domain/ports/credit-facility.ports */ "./apps/products-ms/src/modules/credit-facilities/domain/ports/credit-facility.ports.ts");
const credit_facility_public_fields_builder_1 = __webpack_require__(/*! @modules/credit-facilities/application/mapping/credit-facility-public-fields.builder */ "./apps/products-ms/src/modules/credit-facilities/application/mapping/credit-facility-public-fields.builder.ts");
const get_credit_facility_by_external_id_response_1 = __webpack_require__(/*! ./get-credit-facility-by-external-id.response */ "./apps/products-ms/src/modules/credit-facilities/application/use-cases/get-credit-facility-by-external-id/get-credit-facility-by-external-id.response.ts");
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


/***/ },

/***/ "./apps/products-ms/src/modules/credit-facilities/application/use-cases/list-credit-facilities/list-credit-facilities.response.ts"
/*!****************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-facilities/application/use-cases/list-credit-facilities/list-credit-facilities.response.ts ***!
  \****************************************************************************************************************************************/
(__unused_webpack_module, exports) {


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


/***/ },

/***/ "./apps/products-ms/src/modules/credit-facilities/application/use-cases/list-credit-facilities/list-credit-facilities.use-case.ts"
/*!****************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-facilities/application/use-cases/list-credit-facilities/list-credit-facilities.use-case.ts ***!
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
exports.ListCreditFacilitiesUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const credit_facilities_tokens_1 = __webpack_require__(/*! @modules/credit-facilities/credit-facilities.tokens */ "./apps/products-ms/src/modules/credit-facilities/credit-facilities.tokens.ts");
const credit_facility_ports_1 = __webpack_require__(/*! @modules/credit-facilities/domain/ports/credit-facility.ports */ "./apps/products-ms/src/modules/credit-facilities/domain/ports/credit-facility.ports.ts");
const credit_facility_public_fields_builder_1 = __webpack_require__(/*! @modules/credit-facilities/application/mapping/credit-facility-public-fields.builder */ "./apps/products-ms/src/modules/credit-facilities/application/mapping/credit-facility-public-fields.builder.ts");
const list_credit_facilities_response_1 = __webpack_require__(/*! ./list-credit-facilities.response */ "./apps/products-ms/src/modules/credit-facilities/application/use-cases/list-credit-facilities/list-credit-facilities.response.ts");
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


/***/ },

/***/ "./apps/products-ms/src/modules/credit-facilities/application/use-cases/update-credit-facility-by-external-id/update-credit-facility-by-external-id.response.ts"
/*!**********************************************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-facilities/application/use-cases/update-credit-facility-by-external-id/update-credit-facility-by-external-id.response.ts ***!
  \**********************************************************************************************************************************************************************/
(__unused_webpack_module, exports) {


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


/***/ },

/***/ "./apps/products-ms/src/modules/credit-facilities/application/use-cases/update-credit-facility-by-external-id/update-credit-facility-by-external-id.use-case.ts"
/*!**********************************************************************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-facilities/application/use-cases/update-credit-facility-by-external-id/update-credit-facility-by-external-id.use-case.ts ***!
  \**********************************************************************************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const credit_facilities_tokens_1 = __webpack_require__(/*! @modules/credit-facilities/credit-facilities.tokens */ "./apps/products-ms/src/modules/credit-facilities/credit-facilities.tokens.ts");
const credit_facility_ports_1 = __webpack_require__(/*! @modules/credit-facilities/domain/ports/credit-facility.ports */ "./apps/products-ms/src/modules/credit-facilities/domain/ports/credit-facility.ports.ts");
const credit_facility_public_fields_builder_1 = __webpack_require__(/*! @modules/credit-facilities/application/mapping/credit-facility-public-fields.builder */ "./apps/products-ms/src/modules/credit-facilities/application/mapping/credit-facility-public-fields.builder.ts");
const update_credit_facility_by_external_id_response_1 = __webpack_require__(/*! ./update-credit-facility-by-external-id.response */ "./apps/products-ms/src/modules/credit-facilities/application/use-cases/update-credit-facility-by-external-id/update-credit-facility-by-external-id.response.ts");
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


/***/ },

/***/ "./apps/products-ms/src/modules/credit-facilities/credit-facilities-application.module.ts"
/*!************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-facilities/credit-facilities-application.module.ts ***!
  \************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreditFacilitiesApplicationModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const create_credit_facility_use_case_1 = __webpack_require__(/*! @modules/credit-facilities/application/use-cases/create-credit-facility/create-credit-facility.use-case */ "./apps/products-ms/src/modules/credit-facilities/application/use-cases/create-credit-facility/create-credit-facility.use-case.ts");
const get_credit_facility_by_external_id_use_case_1 = __webpack_require__(/*! @modules/credit-facilities/application/use-cases/get-credit-facility-by-external-id/get-credit-facility-by-external-id.use-case */ "./apps/products-ms/src/modules/credit-facilities/application/use-cases/get-credit-facility-by-external-id/get-credit-facility-by-external-id.use-case.ts");
const list_credit_facilities_use_case_1 = __webpack_require__(/*! @modules/credit-facilities/application/use-cases/list-credit-facilities/list-credit-facilities.use-case */ "./apps/products-ms/src/modules/credit-facilities/application/use-cases/list-credit-facilities/list-credit-facilities.use-case.ts");
const update_credit_facility_by_external_id_use_case_1 = __webpack_require__(/*! @modules/credit-facilities/application/use-cases/update-credit-facility-by-external-id/update-credit-facility-by-external-id.use-case */ "./apps/products-ms/src/modules/credit-facilities/application/use-cases/update-credit-facility-by-external-id/update-credit-facility-by-external-id.use-case.ts");
const delete_credit_facility_by_external_id_use_case_1 = __webpack_require__(/*! @modules/credit-facilities/application/use-cases/delete-credit-facility-by-external-id/delete-credit-facility-by-external-id.use-case */ "./apps/products-ms/src/modules/credit-facilities/application/use-cases/delete-credit-facility-by-external-id/delete-credit-facility-by-external-id.use-case.ts");
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


/***/ },

/***/ "./apps/products-ms/src/modules/credit-facilities/credit-facilities.module.ts"
/*!************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-facilities/credit-facilities.module.ts ***!
  \************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreditFacilitiesModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const credit_facilities_application_module_1 = __webpack_require__(/*! @modules/credit-facilities/credit-facilities-application.module */ "./apps/products-ms/src/modules/credit-facilities/credit-facilities-application.module.ts");
let CreditFacilitiesModule = class CreditFacilitiesModule {
};
exports.CreditFacilitiesModule = CreditFacilitiesModule;
exports.CreditFacilitiesModule = CreditFacilitiesModule = __decorate([
    (0, common_1.Module)({
        imports: [credit_facilities_application_module_1.CreditFacilitiesApplicationModule],
        exports: [credit_facilities_application_module_1.CreditFacilitiesApplicationModule],
    })
], CreditFacilitiesModule);


/***/ },

/***/ "./apps/products-ms/src/modules/credit-facilities/credit-facilities.tokens.ts"
/*!************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-facilities/credit-facilities.tokens.ts ***!
  \************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CREDIT_FACILITY_REPOSITORY = void 0;
exports.CREDIT_FACILITY_REPOSITORY = Symbol('CREDIT_FACILITY_REPOSITORY');


/***/ },

/***/ "./apps/products-ms/src/modules/credit-facilities/domain/models/credit-facility.models.ts"
/*!************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-facilities/domain/models/credit-facility.models.ts ***!
  \************************************************************************************************/
(__unused_webpack_module, exports) {


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


/***/ },

/***/ "./apps/products-ms/src/modules/credit-facilities/domain/ports/credit-facility.ports.ts"
/*!**********************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/credit-facilities/domain/ports/credit-facility.ports.ts ***!
  \**********************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ "./apps/products-ms/src/modules/messaging/application/dto/transversal-inbound-message.dto.ts"
/*!***************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/messaging/application/dto/transversal-inbound-message.dto.ts ***!
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransversalInboundMessageDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const transversal_outbound_event_dto_1 = __webpack_require__(/*! ./transversal-outbound-event.dto */ "./apps/products-ms/src/modules/messaging/application/dto/transversal-outbound-event.dto.ts");
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

/***/ "./apps/products-ms/src/modules/messaging/application/dto/transversal-outbound-event.dto.ts"
/*!**************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/messaging/application/dto/transversal-outbound-event.dto.ts ***!
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransversalOutboundEventDto = exports.TransversalEventType = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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


/***/ },

/***/ "./apps/products-ms/src/modules/messaging/application/exceptions/validation-failed.error.ts"
/*!**************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/messaging/application/exceptions/validation-failed.error.ts ***!
  \**************************************************************************************************/
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

/***/ "./apps/products-ms/src/modules/messaging/application/use-cases/ingest-products-inbound-sqs-message.use-case.ts"
/*!**********************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/messaging/application/use-cases/ingest-products-inbound-sqs-message.use-case.ts ***!
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
var IngestProductsInboundSqsMessageUseCase_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IngestProductsInboundSqsMessageUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const transversal_inbound_message_dto_1 = __webpack_require__(/*! ../dto/transversal-inbound-message.dto */ "./apps/products-ms/src/modules/messaging/application/dto/transversal-inbound-message.dto.ts");
const process_products_inbound_message_use_case_1 = __webpack_require__(/*! ./process-products-inbound-message.use-case */ "./apps/products-ms/src/modules/messaging/application/use-cases/process-products-inbound-message.use-case.ts");
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


/***/ },

/***/ "./apps/products-ms/src/modules/messaging/application/use-cases/process-products-inbound-message.use-case.ts"
/*!*******************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/messaging/application/use-cases/process-products-inbound-message.use-case.ts ***!
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
var ProcessProductsInboundMessageUseCase_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProcessProductsInboundMessageUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
const transversal_outbound_event_dto_1 = __webpack_require__(/*! ../dto/transversal-outbound-event.dto */ "./apps/products-ms/src/modules/messaging/application/dto/transversal-outbound-event.dto.ts");
const create_credit_facility_use_case_1 = __webpack_require__(/*! @modules/credit-facilities/application/use-cases/create-credit-facility/create-credit-facility.use-case */ "./apps/products-ms/src/modules/credit-facilities/application/use-cases/create-credit-facility/create-credit-facility.use-case.ts");
const create_credit_facility_request_1 = __webpack_require__(/*! @modules/credit-facilities/application/use-cases/create-credit-facility/create-credit-facility.request */ "./apps/products-ms/src/modules/credit-facilities/application/use-cases/create-credit-facility/create-credit-facility.request.ts");
const create_category_use_case_1 = __webpack_require__(/*! @modules/categories/application/use-cases/create-category/create-category.use-case */ "./apps/products-ms/src/modules/categories/application/use-cases/create-category/create-category.use-case.ts");
const create_category_request_1 = __webpack_require__(/*! @modules/categories/application/use-cases/create-category/create-category.request */ "./apps/products-ms/src/modules/categories/application/use-cases/create-category/create-category.request.ts");
const credit_facilities_tokens_1 = __webpack_require__(/*! @modules/credit-facilities/credit-facilities.tokens */ "./apps/products-ms/src/modules/credit-facilities/credit-facilities.tokens.ts");
function parse_credit_facility_state(raw) {
    if (raw === undefined) {
        return null;
    }
    const v = raw.trim().toLowerCase();
    if (v === shared_1.CreditFacilityState.ACTIVE) {
        return shared_1.CreditFacilityState.ACTIVE;
    }
    if (v === shared_1.CreditFacilityState.INACTIVE) {
        return shared_1.CreditFacilityState.INACTIVE;
    }
    return null;
}
function parse_category_state(raw) {
    const cf = parse_credit_facility_state(raw);
    if (cf === null) {
        return null;
    }
    return cf === shared_1.CreditFacilityState.ACTIVE
        ? shared_1.CategoryState.ACTIVE
        : shared_1.CategoryState.INACTIVE;
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
        const external_id = payload.credit_facility_external_id ?? payload.external_id;
        const total_limit = payload.total_limit;
        const state = parse_credit_facility_state(payload.state);
        const business_id = payload.business_id;
        if (external_id === undefined ||
            external_id.length === 0 ||
            total_limit === undefined ||
            state === null ||
            business_id === undefined ||
            typeof business_id !== 'number' ||
            !Number.isFinite(business_id)) {
            this.logger.warn(`Payload inválido para credit_facility correlation_id=${dto.correlation_id}`);
            return;
        }
        const existing = await this.credit_facility_repository.find_by_external_id(external_id);
        if (existing !== null) {
            this.logger.debug(`[Saga][products] credit facility ya existe external_id=${external_id} correlation_id=${dto.correlation_id}`);
            return;
        }
        await this.create_credit_facility.execute(new create_credit_facility_request_1.CreateCreditFacilityRequest(payload.contract_id ?? null, total_limit, state, business_id, external_id));
        this.logger.debug(`[Saga][products] credit facility creada external_id=${external_id} correlation_id=${dto.correlation_id}`);
    }
    async handle_category_batch(dto) {
        const payload = dto.payload;
        const cf = payload.credit_facility_external_id;
        const state = parse_category_state(payload.state);
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


/***/ },

/***/ "./apps/products-ms/src/modules/messaging/application/use-cases/publish-create-person-command.use-case.ts"
/*!****************************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/messaging/application/use-cases/publish-create-person-command.use-case.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PublishCreatePersonCommandUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const outbound_message_publisher_port_1 = __webpack_require__(/*! @messaging/domain/ports/outbound-message-publisher.port */ "./apps/products-ms/src/modules/messaging/domain/ports/outbound-message-publisher.port.ts");
const transversal_create_person_queue_url_port_1 = __webpack_require__(/*! @messaging/domain/ports/transversal-create-person-queue-url.port */ "./apps/products-ms/src/modules/messaging/domain/ports/transversal-create-person-queue-url.port.ts");
const validation_failed_error_1 = __webpack_require__(/*! ../exceptions/validation-failed.error */ "./apps/products-ms/src/modules/messaging/application/exceptions/validation-failed.error.ts");
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
            throw new validation_failed_error_1.ValidationFailedError('Cola create-person no configurada: defina PRODUCTS_SQS_CREATE_PERSON_QUEUE_URL o TRANSVERSAL_SQS_CREATE_PERSON_QUEUE_URL');
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

/***/ "./apps/products-ms/src/modules/messaging/application/use-cases/publish-products-event.use-case.ts"
/*!*********************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/messaging/application/use-cases/publish-products-event.use-case.ts ***!
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
exports.PublishProductsEventUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const outbound_message_publisher_port_1 = __webpack_require__(/*! @messaging/domain/ports/outbound-message-publisher.port */ "./apps/products-ms/src/modules/messaging/domain/ports/outbound-message-publisher.port.ts");
const products_outbound_queue_url_port_1 = __webpack_require__(/*! @messaging/domain/ports/products-outbound-queue-url.port */ "./apps/products-ms/src/modules/messaging/domain/ports/products-outbound-queue-url.port.ts");
const transversal_outbound_event_dto_1 = __webpack_require__(/*! ../dto/transversal-outbound-event.dto */ "./apps/products-ms/src/modules/messaging/application/dto/transversal-outbound-event.dto.ts");
const validation_failed_error_1 = __webpack_require__(/*! ../exceptions/validation-failed.error */ "./apps/products-ms/src/modules/messaging/application/exceptions/validation-failed.error.ts");
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


/***/ },

/***/ "./apps/products-ms/src/modules/messaging/domain/ports/outbound-message-publisher.port.ts"
/*!************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/messaging/domain/ports/outbound-message-publisher.port.ts ***!
  \************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OUTBOUND_MESSAGE_PUBLISHER_PORT = void 0;
exports.OUTBOUND_MESSAGE_PUBLISHER_PORT = Symbol('OUTBOUND_MESSAGE_PUBLISHER_PORT');


/***/ },

/***/ "./apps/products-ms/src/modules/messaging/domain/ports/products-outbound-queue-url.port.ts"
/*!*************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/messaging/domain/ports/products-outbound-queue-url.port.ts ***!
  \*************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PRODUCTS_OUTBOUND_QUEUE_URL_PORT = void 0;
exports.PRODUCTS_OUTBOUND_QUEUE_URL_PORT = Symbol('PRODUCTS_OUTBOUND_QUEUE_URL_PORT');


/***/ },

/***/ "./apps/products-ms/src/modules/messaging/domain/ports/transversal-create-person-queue-url.port.ts"
/*!*********************************************************************************************************!*\
  !*** ./apps/products-ms/src/modules/messaging/domain/ports/transversal-create-person-queue-url.port.ts ***!
  \*********************************************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TRANSVERSAL_CREATE_PERSON_QUEUE_URL_PORT = void 0;
exports.TRANSVERSAL_CREATE_PERSON_QUEUE_URL_PORT = Symbol('TRANSVERSAL_CREATE_PERSON_QUEUE_URL_PORT');


/***/ },

/***/ "./apps/products-ms/src/modules/messaging/messaging-application.module.ts"
/*!********************************************************************************!*\
  !*** ./apps/products-ms/src/modules/messaging/messaging-application.module.ts ***!
  \********************************************************************************/
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
const publish_products_event_use_case_1 = __webpack_require__(/*! ./application/use-cases/publish-products-event.use-case */ "./apps/products-ms/src/modules/messaging/application/use-cases/publish-products-event.use-case.ts");
const process_products_inbound_message_use_case_1 = __webpack_require__(/*! ./application/use-cases/process-products-inbound-message.use-case */ "./apps/products-ms/src/modules/messaging/application/use-cases/process-products-inbound-message.use-case.ts");
const ingest_products_inbound_sqs_message_use_case_1 = __webpack_require__(/*! ./application/use-cases/ingest-products-inbound-sqs-message.use-case */ "./apps/products-ms/src/modules/messaging/application/use-cases/ingest-products-inbound-sqs-message.use-case.ts");
const credit_facilities_application_module_1 = __webpack_require__(/*! @modules/credit-facilities/credit-facilities-application.module */ "./apps/products-ms/src/modules/credit-facilities/credit-facilities-application.module.ts");
const categories_application_module_1 = __webpack_require__(/*! @modules/categories/categories-application.module */ "./apps/products-ms/src/modules/categories/categories-application.module.ts");
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


/***/ },

/***/ "./libs/products-data/src/entities/ai-agent-analysis.entity.ts"
/*!*********************************************************************!*\
  !*** ./libs/products-data/src/entities/ai-agent-analysis.entity.ts ***!
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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AiAgentAnalysisEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
const base_external_id_entity_1 = __webpack_require__(/*! ./base-external-id.entity */ "./libs/products-data/src/entities/base-external-id.entity.ts");
const credit_application_entity_1 = __webpack_require__(/*! ./credit-application.entity */ "./libs/products-data/src/entities/credit-application.entity.ts");
let AiAgentAnalysisEntity = class AiAgentAnalysisEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    creditApplication;
    creditApplicationId;
    analysisResult;
    recommendation;
    confidenceScore;
    analyzedAt;
    htmlUrlAgentAnalysis;
    agentRecommendedLoc;
};
exports.AiAgentAnalysisEntity = AiAgentAnalysisEntity;
__decorate([
    (0, typeorm_1.OneToOne)(() => credit_application_entity_1.CreditApplicationEntity, {
        nullable: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'credit_application_id', referencedColumnName: 'id' }),
    __metadata("design:type", typeof (_a = typeof credit_application_entity_1.CreditApplicationEntity !== "undefined" && credit_application_entity_1.CreditApplicationEntity) === "function" ? _a : Object)
], AiAgentAnalysisEntity.prototype, "creditApplication", void 0);
__decorate([
    (0, typeorm_1.RelationId)((a) => a.creditApplication),
    __metadata("design:type", Number)
], AiAgentAnalysisEntity.prototype, "creditApplicationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'analysis_result', type: 'jsonb' }),
    __metadata("design:type", typeof (_b = typeof Record !== "undefined" && Record) === "function" ? _b : Object)
], AiAgentAnalysisEntity.prototype, "analysisResult", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'recommendation',
        type: 'enum',
        enum: shared_1.AiAgentAnalysisRecommendation,
        enumName: 'ai_agent_analysis_recommendation',
    }),
    __metadata("design:type", typeof (_c = typeof shared_1.AiAgentAnalysisRecommendation !== "undefined" && shared_1.AiAgentAnalysisRecommendation) === "function" ? _c : Object)
], AiAgentAnalysisEntity.prototype, "recommendation", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'confidence_score',
        type: 'decimal',
        precision: 5,
        scale: 4,
        nullable: true,
    }),
    __metadata("design:type", Object)
], AiAgentAnalysisEntity.prototype, "confidenceScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'analyzed_at', type: 'timestamptz' }),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], AiAgentAnalysisEntity.prototype, "analyzedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'html_url_agent_analysis', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], AiAgentAnalysisEntity.prototype, "htmlUrlAgentAnalysis", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'agent_recommended_loc',
        type: 'decimal',
        precision: 18,
        scale: 4,
        nullable: true,
    }),
    __metadata("design:type", Object)
], AiAgentAnalysisEntity.prototype, "agentRecommendedLoc", void 0);
exports.AiAgentAnalysisEntity = AiAgentAnalysisEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'ai_agent_analysis', schema: 'products_schema' })
], AiAgentAnalysisEntity);


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
    isDefault;
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
    (0, typeorm_1.Column)({
        name: 'is_default',
        type: 'boolean',
        default: false,
    }),
    __metadata("design:type", Boolean)
], CategoryEntity.prototype, "isDefault", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => suppliers_data_1.PartnerEntity, (p) => p.categories, {
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

/***/ "./libs/products-data/src/entities/credit-application.entity.ts"
/*!**********************************************************************!*\
  !*** ./libs/products-data/src/entities/credit-application.entity.ts ***!
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreditApplicationEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const sales_representative_entity_1 = __webpack_require__(/*! ../../../suppliers-data/src/entities/sales-representative.entity */ "./libs/suppliers-data/src/entities/sales-representative.entity.ts");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
const base_external_id_entity_1 = __webpack_require__(/*! ./base-external-id.entity */ "./libs/products-data/src/entities/base-external-id.entity.ts");
const transversal_data_1 = __webpack_require__(/*! @app/transversal-data */ "./libs/transversal-data/src/index.ts");
const suppliers_data_1 = __webpack_require__(/*! @app/suppliers-data */ "./libs/suppliers-data/src/index.ts");
const category_entity_1 = __webpack_require__(/*! ./category.entity */ "./libs/products-data/src/entities/category.entity.ts");
let CreditApplicationEntity = class CreditApplicationEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    person;
    partner;
    partnerCategory;
    business;
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
    salesRepresentative;
};
exports.CreditApplicationEntity = CreditApplicationEntity;
__decorate([
    (0, typeorm_1.ManyToOne)(() => transversal_data_1.PersonEntity, { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'person_id', referencedColumnName: 'id' }),
    __metadata("design:type", Object)
], CreditApplicationEntity.prototype, "person", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => suppliers_data_1.PartnerEntity, { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'partner_id', referencedColumnName: 'id' }),
    __metadata("design:type", Object)
], CreditApplicationEntity.prototype, "partner", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.CategoryEntity, { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'partner_category_id', referencedColumnName: 'id' }),
    __metadata("design:type", Object)
], CreditApplicationEntity.prototype, "partnerCategory", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => suppliers_data_1.BusinessEntity, { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'business_id', referencedColumnName: 'id' }),
    __metadata("design:type", Object)
], CreditApplicationEntity.prototype, "business", void 0);
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
    __metadata("design:type", typeof (_e = typeof shared_1.CreditApplicationStatus !== "undefined" && shared_1.CreditApplicationStatus) === "function" ? _e : Object)
], CreditApplicationEntity.prototype, "status", void 0);
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
__decorate([
    (0, typeorm_1.ManyToOne)(() => sales_representative_entity_1.SalesRepresentativeEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({
        name: 'sales_representative_id',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", typeof (_k = typeof sales_representative_entity_1.SalesRepresentativeEntity !== "undefined" && sales_representative_entity_1.SalesRepresentativeEntity) === "function" ? _k : Object)
], CreditApplicationEntity.prototype, "salesRepresentative", void 0);
exports.CreditApplicationEntity = CreditApplicationEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'credit_applications', schema: 'products_schema' }),
    (0, typeorm_1.Index)('IDX_credit_applications_partner_created_at', ['partner', 'createdAt']),
    (0, typeorm_1.Index)('IDX_credit_applications_person_created_at', ['person', 'createdAt'])
], CreditApplicationEntity);


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

/***/ "./libs/products-data/src/entities/document.entity.ts"
/*!************************************************************!*\
  !*** ./libs/products-data/src/entities/document.entity.ts ***!
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DocumentEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
const base_external_id_entity_1 = __webpack_require__(/*! ./base-external-id.entity */ "./libs/products-data/src/entities/base-external-id.entity.ts");
const credit_application_entity_1 = __webpack_require__(/*! ./credit-application.entity */ "./libs/products-data/src/entities/credit-application.entity.ts");
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


/***/ },

/***/ "./libs/products-data/src/entities/experian-query.entity.ts"
/*!******************************************************************!*\
  !*** ./libs/products-data/src/entities/experian-query.entity.ts ***!
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
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExperianQueryEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
const transversal_data_1 = __webpack_require__(/*! @app/transversal-data */ "./libs/transversal-data/src/index.ts");
const suppliers_data_1 = __webpack_require__(/*! @app/suppliers-data */ "./libs/suppliers-data/src/index.ts");
const base_external_id_entity_1 = __webpack_require__(/*! ./base-external-id.entity */ "./libs/products-data/src/entities/base-external-id.entity.ts");
const credit_application_entity_1 = __webpack_require__(/*! ./credit-application.entity */ "./libs/products-data/src/entities/credit-application.entity.ts");
let ExperianQueryEntity = class ExperianQueryEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    creditApplication;
    creditApplicationId;
    person;
    personId;
    business;
    businessId;
    queryType;
    creditReport;
    creditScore;
    consultedAt;
    status;
    errorMessage;
};
exports.ExperianQueryEntity = ExperianQueryEntity;
__decorate([
    (0, typeorm_1.ManyToOne)(() => credit_application_entity_1.CreditApplicationEntity, {
        nullable: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'credit_application_id', referencedColumnName: 'id' }),
    __metadata("design:type", typeof (_a = typeof credit_application_entity_1.CreditApplicationEntity !== "undefined" && credit_application_entity_1.CreditApplicationEntity) === "function" ? _a : Object)
], ExperianQueryEntity.prototype, "creditApplication", void 0);
__decorate([
    (0, typeorm_1.RelationId)((q) => q.creditApplication),
    __metadata("design:type", Number)
], ExperianQueryEntity.prototype, "creditApplicationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => transversal_data_1.PersonEntity, {
        nullable: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'person_id', referencedColumnName: 'id' }),
    __metadata("design:type", Object)
], ExperianQueryEntity.prototype, "person", void 0);
__decorate([
    (0, typeorm_1.RelationId)((q) => q.person),
    __metadata("design:type", Object)
], ExperianQueryEntity.prototype, "personId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => suppliers_data_1.BusinessEntity, {
        nullable: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'business_id', referencedColumnName: 'id' }),
    __metadata("design:type", Object)
], ExperianQueryEntity.prototype, "business", void 0);
__decorate([
    (0, typeorm_1.RelationId)((q) => q.business),
    __metadata("design:type", Object)
], ExperianQueryEntity.prototype, "businessId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'query_type',
        type: 'enum',
        enum: shared_1.ExperianQueryTypes,
        enumName: 'experian_query_type',
    }),
    __metadata("design:type", typeof (_d = typeof shared_1.ExperianQueryTypes !== "undefined" && shared_1.ExperianQueryTypes) === "function" ? _d : Object)
], ExperianQueryEntity.prototype, "queryType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'credit_report', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], ExperianQueryEntity.prototype, "creditReport", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'credit_score',
        type: 'decimal',
        precision: 8,
        scale: 2,
        nullable: true,
    }),
    __metadata("design:type", Object)
], ExperianQueryEntity.prototype, "creditScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'consulted_at', type: 'timestamptz' }),
    __metadata("design:type", typeof (_f = typeof Date !== "undefined" && Date) === "function" ? _f : Object)
], ExperianQueryEntity.prototype, "consultedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        type: 'enum',
        enum: shared_1.ExperianQueryStatus,
        enumName: 'experian_query_status',
        default: shared_1.ExperianQueryStatus.PENDING,
    }),
    __metadata("design:type", typeof (_g = typeof shared_1.ExperianQueryStatus !== "undefined" && shared_1.ExperianQueryStatus) === "function" ? _g : Object)
], ExperianQueryEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'error_message', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ExperianQueryEntity.prototype, "errorMessage", void 0);
exports.ExperianQueryEntity = ExperianQueryEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'experian_queries', schema: 'products_schema' })
], ExperianQueryEntity);


/***/ },

/***/ "./libs/products-data/src/entities/loan-request.entity.ts"
/*!****************************************************************!*\
  !*** ./libs/products-data/src/entities/loan-request.entity.ts ***!
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoanRequestEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
const base_external_id_entity_1 = __webpack_require__(/*! ./base-external-id.entity */ "./libs/products-data/src/entities/base-external-id.entity.ts");
const category_entity_1 = __webpack_require__(/*! ./category.entity */ "./libs/products-data/src/entities/category.entity.ts");
const credit_facility_entity_1 = __webpack_require__(/*! ./credit-facility.entity */ "./libs/products-data/src/entities/credit-facility.entity.ts");
const suppliers_data_1 = __webpack_require__(/*! @app/suppliers-data */ "./libs/suppliers-data/src/index.ts");
let LoanRequestEntity = class LoanRequestEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    creditFacility;
    creditFacilityId;
    category;
    categoryId;
    partner;
    partnerId;
    supplier;
    supplierId;
    salesRepresentative;
    salesRepresentativeId;
    productType;
    loanModality;
    channel;
    orderReference;
    requestedAmount;
    confirmedAmount;
    installmentCount;
    initialPaymentAmount;
    initialPaymentPaid;
    requiresClientApproval;
    clientApprovedAt;
    clientRejectionReason;
    partnerConfirmedAt;
    partnerRejectionReason;
    invoiceUrl;
    notes;
    status;
};
exports.LoanRequestEntity = LoanRequestEntity;
__decorate([
    (0, typeorm_1.ManyToOne)(() => credit_facility_entity_1.CreditFacilityEntity, {
        nullable: false,
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'credit_facility_id', referencedColumnName: 'id' }),
    __metadata("design:type", typeof (_a = typeof credit_facility_entity_1.CreditFacilityEntity !== "undefined" && credit_facility_entity_1.CreditFacilityEntity) === "function" ? _a : Object)
], LoanRequestEntity.prototype, "creditFacility", void 0);
__decorate([
    (0, typeorm_1.RelationId)((r) => r.creditFacility),
    __metadata("design:type", Number)
], LoanRequestEntity.prototype, "creditFacilityId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.CategoryEntity, {
        nullable: false,
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'category_id', referencedColumnName: 'id' }),
    __metadata("design:type", typeof (_b = typeof category_entity_1.CategoryEntity !== "undefined" && category_entity_1.CategoryEntity) === "function" ? _b : Object)
], LoanRequestEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.RelationId)((r) => r.category),
    __metadata("design:type", Number)
], LoanRequestEntity.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => suppliers_data_1.PartnerEntity, {
        nullable: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'partner_id', referencedColumnName: 'id' }),
    __metadata("design:type", Object)
], LoanRequestEntity.prototype, "partner", void 0);
__decorate([
    (0, typeorm_1.RelationId)((r) => r.partner),
    __metadata("design:type", Object)
], LoanRequestEntity.prototype, "partnerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => suppliers_data_1.SupplierEntity, {
        nullable: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'supplier_id', referencedColumnName: 'id' }),
    __metadata("design:type", Object)
], LoanRequestEntity.prototype, "supplier", void 0);
__decorate([
    (0, typeorm_1.RelationId)((r) => r.supplier),
    __metadata("design:type", Object)
], LoanRequestEntity.prototype, "supplierId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => suppliers_data_1.SalesRepresentativeEntity, {
        nullable: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'sales_representative_id', referencedColumnName: 'id' }),
    __metadata("design:type", Object)
], LoanRequestEntity.prototype, "salesRepresentative", void 0);
__decorate([
    (0, typeorm_1.RelationId)((r) => r.salesRepresentative),
    __metadata("design:type", Object)
], LoanRequestEntity.prototype, "salesRepresentativeId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'product_type',
        type: 'enum',
        enum: shared_1.LoanRequestProductType,
        enumName: 'loan_request_product_type',
    }),
    __metadata("design:type", typeof (_f = typeof shared_1.LoanRequestProductType !== "undefined" && shared_1.LoanRequestProductType) === "function" ? _f : Object)
], LoanRequestEntity.prototype, "productType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'loan_modality',
        type: 'enum',
        enum: shared_1.ModalityTypes,
        enumName: 'loan_request_modality',
    }),
    __metadata("design:type", typeof (_g = typeof shared_1.ModalityTypes !== "undefined" && shared_1.ModalityTypes) === "function" ? _g : Object)
], LoanRequestEntity.prototype, "loanModality", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'channel',
        type: 'enum',
        enum: shared_1.LoanRequestChannel,
        enumName: 'loan_request_channel',
    }),
    __metadata("design:type", typeof (_h = typeof shared_1.LoanRequestChannel !== "undefined" && shared_1.LoanRequestChannel) === "function" ? _h : Object)
], LoanRequestEntity.prototype, "channel", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'order_reference', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], LoanRequestEntity.prototype, "orderReference", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'requested_amount',
        type: 'decimal',
        precision: 18,
        scale: 4,
    }),
    __metadata("design:type", String)
], LoanRequestEntity.prototype, "requestedAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'confirmed_amount',
        type: 'decimal',
        precision: 18,
        scale: 4,
        nullable: true,
    }),
    __metadata("design:type", Object)
], LoanRequestEntity.prototype, "confirmedAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'installment_count', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], LoanRequestEntity.prototype, "installmentCount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'initial_payment_amount',
        type: 'decimal',
        precision: 18,
        scale: 4,
        nullable: true,
    }),
    __metadata("design:type", Object)
], LoanRequestEntity.prototype, "initialPaymentAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'initial_payment_paid',
        type: 'boolean',
        default: false,
        nullable: false,
    }),
    __metadata("design:type", Boolean)
], LoanRequestEntity.prototype, "initialPaymentPaid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'requires_client_approval',
        type: 'boolean',
        default: false,
        nullable: false,
    }),
    __metadata("design:type", Boolean)
], LoanRequestEntity.prototype, "requiresClientApproval", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'client_approved_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], LoanRequestEntity.prototype, "clientApprovedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'client_rejection_reason', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], LoanRequestEntity.prototype, "clientRejectionReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'partner_confirmed_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], LoanRequestEntity.prototype, "partnerConfirmedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'partner_rejection_reason', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], LoanRequestEntity.prototype, "partnerRejectionReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'invoice_url', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], LoanRequestEntity.prototype, "invoiceUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'notes',
        type: 'text',
        array: true,
        nullable: true,
    }),
    __metadata("design:type", Object)
], LoanRequestEntity.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        type: 'enum',
        enum: shared_1.LoanRequestStatus,
        enumName: 'loan_request_status',
        default: shared_1.LoanRequestStatus.DRAFT,
    }),
    __metadata("design:type", typeof (_l = typeof shared_1.LoanRequestStatus !== "undefined" && shared_1.LoanRequestStatus) === "function" ? _l : Object)
], LoanRequestEntity.prototype, "status", void 0);
exports.LoanRequestEntity = LoanRequestEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'loan_requests', schema: 'products_schema' }),
    (0, typeorm_1.Index)('IDX_loan_requests_credit_facility_id', ['creditFacility']),
    (0, typeorm_1.Index)('IDX_loan_requests_status', ['status']),
    (0, typeorm_1.Index)('IDX_loan_requests_partner_id', ['partner'])
], LoanRequestEntity);


/***/ },

/***/ "./libs/products-data/src/entities/sarlaft-check.entity.ts"
/*!*****************************************************************!*\
  !*** ./libs/products-data/src/entities/sarlaft-check.entity.ts ***!
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
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SarlaftCheckEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
const transversal_data_1 = __webpack_require__(/*! @app/transversal-data */ "./libs/transversal-data/src/index.ts");
const suppliers_data_1 = __webpack_require__(/*! @app/suppliers-data */ "./libs/suppliers-data/src/index.ts");
const base_external_id_entity_1 = __webpack_require__(/*! ./base-external-id.entity */ "./libs/products-data/src/entities/base-external-id.entity.ts");
const credit_application_entity_1 = __webpack_require__(/*! ./credit-application.entity */ "./libs/products-data/src/entities/credit-application.entity.ts");
let SarlaftCheckEntity = class SarlaftCheckEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    creditApplication;
    creditApplicationId;
    person;
    personId;
    business;
    businessId;
    hasMatch;
    status;
    consultedAt;
    sources;
    detail;
};
exports.SarlaftCheckEntity = SarlaftCheckEntity;
__decorate([
    (0, typeorm_1.ManyToOne)(() => credit_application_entity_1.CreditApplicationEntity, {
        nullable: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'credit_application_id', referencedColumnName: 'id' }),
    __metadata("design:type", typeof (_a = typeof credit_application_entity_1.CreditApplicationEntity !== "undefined" && credit_application_entity_1.CreditApplicationEntity) === "function" ? _a : Object)
], SarlaftCheckEntity.prototype, "creditApplication", void 0);
__decorate([
    (0, typeorm_1.RelationId)((r) => r.creditApplication),
    __metadata("design:type", Number)
], SarlaftCheckEntity.prototype, "creditApplicationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => transversal_data_1.PersonEntity, {
        nullable: false,
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'person_id', referencedColumnName: 'id' }),
    __metadata("design:type", typeof (_b = typeof transversal_data_1.PersonEntity !== "undefined" && transversal_data_1.PersonEntity) === "function" ? _b : Object)
], SarlaftCheckEntity.prototype, "person", void 0);
__decorate([
    (0, typeorm_1.RelationId)((r) => r.person),
    __metadata("design:type", Number)
], SarlaftCheckEntity.prototype, "personId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => suppliers_data_1.BusinessEntity, {
        nullable: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'business_id', referencedColumnName: 'id' }),
    __metadata("design:type", Object)
], SarlaftCheckEntity.prototype, "business", void 0);
__decorate([
    (0, typeorm_1.RelationId)((r) => r.business),
    __metadata("design:type", Object)
], SarlaftCheckEntity.prototype, "businessId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'has_match', type: 'boolean' }),
    __metadata("design:type", Boolean)
], SarlaftCheckEntity.prototype, "hasMatch", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        type: 'enum',
        enum: shared_1.SarlaftCheckStatuses,
        enumName: 'sarlaft_check_status',
        default: shared_1.SarlaftCheckStatuses.CLEAN,
    }),
    __metadata("design:type", typeof (_d = typeof shared_1.SarlaftCheckStatuses !== "undefined" && shared_1.SarlaftCheckStatuses) === "function" ? _d : Object)
], SarlaftCheckEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'consulted_at', type: 'timestamptz' }),
    __metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], SarlaftCheckEntity.prototype, "consultedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sources', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], SarlaftCheckEntity.prototype, "sources", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'detail', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], SarlaftCheckEntity.prototype, "detail", void 0);
exports.SarlaftCheckEntity = SarlaftCheckEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'sarlaft_checks', schema: 'products_schema' })
], SarlaftCheckEntity);


/***/ },

/***/ "./libs/products-data/src/entities/usura-rate.entity.ts"
/*!**************************************************************!*\
  !*** ./libs/products-data/src/entities/usura-rate.entity.ts ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.UsuraRateEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
const transversal_data_1 = __webpack_require__(/*! @app/transversal-data */ "./libs/transversal-data/src/index.ts");
let UsuraRateEntity = class UsuraRateEntity {
    id;
    externalId;
    category;
    rateEa;
    validFrom;
    resolution;
    createdBy;
    createdById;
    createdAt;
};
exports.UsuraRateEntity = UsuraRateEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], UsuraRateEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'external_id',
        type: 'uuid',
        unique: true,
        insert: false,
        update: false,
    }),
    __metadata("design:type", String)
], UsuraRateEntity.prototype, "externalId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'category',
        type: 'enum',
        enum: shared_1.UsuraRateType,
        enumName: 'usura_rate_type',
    }),
    __metadata("design:type", typeof (_a = typeof shared_1.UsuraRateType !== "undefined" && shared_1.UsuraRateType) === "function" ? _a : Object)
], UsuraRateEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'rate_ea',
        type: 'decimal',
        precision: 8,
        scale: 6,
    }),
    __metadata("design:type", String)
], UsuraRateEntity.prototype, "rateEa", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'valid_from', type: 'date' }),
    __metadata("design:type", String)
], UsuraRateEntity.prototype, "validFrom", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'resolution', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], UsuraRateEntity.prototype, "resolution", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => transversal_data_1.UserEntity, {
        nullable: false,
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by', referencedColumnName: 'id' }),
    __metadata("design:type", typeof (_b = typeof transversal_data_1.UserEntity !== "undefined" && transversal_data_1.UserEntity) === "function" ? _b : Object)
], UsuraRateEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.RelationId)((r) => r.createdBy),
    __metadata("design:type", Number)
], UsuraRateEntity.prototype, "createdById", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
        type: 'timestamptz',
        insert: false,
        update: false,
    }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], UsuraRateEntity.prototype, "createdAt", void 0);
exports.UsuraRateEntity = UsuraRateEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'usura_rates', schema: 'products_schema' }),
    (0, typeorm_1.Index)('UQ_usura_rates_category_valid_from', ['category', 'validFrom'], {
        unique: true,
    })
], UsuraRateEntity);


/***/ },

/***/ "./libs/products-data/src/entities/web-query.entity.ts"
/*!*************************************************************!*\
  !*** ./libs/products-data/src/entities/web-query.entity.ts ***!
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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebQueryEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
const transversal_data_1 = __webpack_require__(/*! @app/transversal-data */ "./libs/transversal-data/src/index.ts");
const base_external_id_entity_1 = __webpack_require__(/*! ./base-external-id.entity */ "./libs/products-data/src/entities/base-external-id.entity.ts");
const credit_application_entity_1 = __webpack_require__(/*! ./credit-application.entity */ "./libs/products-data/src/entities/credit-application.entity.ts");
let WebQueryEntity = class WebQueryEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    creditApplication;
    creditApplicationId;
    queryType;
    person;
    personId;
    consultedAt;
    queryResult;
};
exports.WebQueryEntity = WebQueryEntity;
__decorate([
    (0, typeorm_1.ManyToOne)(() => credit_application_entity_1.CreditApplicationEntity, {
        nullable: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'credit_application_id', referencedColumnName: 'id' }),
    __metadata("design:type", typeof (_a = typeof credit_application_entity_1.CreditApplicationEntity !== "undefined" && credit_application_entity_1.CreditApplicationEntity) === "function" ? _a : Object)
], WebQueryEntity.prototype, "creditApplication", void 0);
__decorate([
    (0, typeorm_1.RelationId)((q) => q.creditApplication),
    __metadata("design:type", Number)
], WebQueryEntity.prototype, "creditApplicationId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'query_type',
        type: 'enum',
        enum: shared_1.WebQueryType,
        enumName: 'web_query_type',
    }),
    __metadata("design:type", typeof (_b = typeof shared_1.WebQueryType !== "undefined" && shared_1.WebQueryType) === "function" ? _b : Object)
], WebQueryEntity.prototype, "queryType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => transversal_data_1.PersonEntity, {
        nullable: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'person_id', referencedColumnName: 'id' }),
    __metadata("design:type", Object)
], WebQueryEntity.prototype, "person", void 0);
__decorate([
    (0, typeorm_1.RelationId)((q) => q.person),
    __metadata("design:type", Object)
], WebQueryEntity.prototype, "personId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'consulted_at', type: 'timestamptz' }),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], WebQueryEntity.prototype, "consultedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'query_result', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], WebQueryEntity.prototype, "queryResult", void 0);
exports.WebQueryEntity = WebQueryEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'web_queries', schema: 'products_schema' })
], WebQueryEntity);


/***/ },

/***/ "./libs/products-data/src/index.ts"
/*!*****************************************!*\
  !*** ./libs/products-data/src/index.ts ***!
  \*****************************************/
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
__exportStar(__webpack_require__(/*! ./products-data.entities */ "./libs/products-data/src/products-data.entities.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/category.entity */ "./libs/products-data/src/entities/category.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/contract.entity */ "./libs/products-data/src/entities/contract.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/contract-template.entity */ "./libs/products-data/src/entities/contract-template.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/credit-application.entity */ "./libs/products-data/src/entities/credit-application.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/credit-facility.entity */ "./libs/products-data/src/entities/credit-facility.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/document.entity */ "./libs/products-data/src/entities/document.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/experian-query.entity */ "./libs/products-data/src/entities/experian-query.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/sarlaft-check.entity */ "./libs/products-data/src/entities/sarlaft-check.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/web-query.entity */ "./libs/products-data/src/entities/web-query.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/ai-agent-analysis.entity */ "./libs/products-data/src/entities/ai-agent-analysis.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/loan-request.entity */ "./libs/products-data/src/entities/loan-request.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/usura-rate.entity */ "./libs/products-data/src/entities/usura-rate.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./products-data.module */ "./libs/products-data/src/products-data.module.ts"), exports);
__exportStar(__webpack_require__(/*! ./products-data.service */ "./libs/products-data/src/products-data.service.ts"), exports);


/***/ },

/***/ "./libs/products-data/src/products-data.entities.ts"
/*!**********************************************************!*\
  !*** ./libs/products-data/src/products-data.entities.ts ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PRODUCTS_DATA_ENTITIES = void 0;
const category_entity_1 = __webpack_require__(/*! ./entities/category.entity */ "./libs/products-data/src/entities/category.entity.ts");
const contract_entity_1 = __webpack_require__(/*! ./entities/contract.entity */ "./libs/products-data/src/entities/contract.entity.ts");
const contract_template_entity_1 = __webpack_require__(/*! ./entities/contract-template.entity */ "./libs/products-data/src/entities/contract-template.entity.ts");
const credit_application_entity_1 = __webpack_require__(/*! ./entities/credit-application.entity */ "./libs/products-data/src/entities/credit-application.entity.ts");
const credit_facility_entity_1 = __webpack_require__(/*! ./entities/credit-facility.entity */ "./libs/products-data/src/entities/credit-facility.entity.ts");
const document_entity_1 = __webpack_require__(/*! ./entities/document.entity */ "./libs/products-data/src/entities/document.entity.ts");
const experian_query_entity_1 = __webpack_require__(/*! ./entities/experian-query.entity */ "./libs/products-data/src/entities/experian-query.entity.ts");
const sarlaft_check_entity_1 = __webpack_require__(/*! ./entities/sarlaft-check.entity */ "./libs/products-data/src/entities/sarlaft-check.entity.ts");
const web_query_entity_1 = __webpack_require__(/*! ./entities/web-query.entity */ "./libs/products-data/src/entities/web-query.entity.ts");
const ai_agent_analysis_entity_1 = __webpack_require__(/*! ./entities/ai-agent-analysis.entity */ "./libs/products-data/src/entities/ai-agent-analysis.entity.ts");
const loan_request_entity_1 = __webpack_require__(/*! ./entities/loan-request.entity */ "./libs/products-data/src/entities/loan-request.entity.ts");
const usura_rate_entity_1 = __webpack_require__(/*! ./entities/usura-rate.entity */ "./libs/products-data/src/entities/usura-rate.entity.ts");
exports.PRODUCTS_DATA_ENTITIES = [
    credit_facility_entity_1.CreditFacilityEntity,
    category_entity_1.CategoryEntity,
    credit_application_entity_1.CreditApplicationEntity,
    contract_entity_1.ContractEntity,
    contract_template_entity_1.ContractTemplateEntity,
    document_entity_1.DocumentEntity,
    experian_query_entity_1.ExperianQueryEntity,
    sarlaft_check_entity_1.SarlaftCheckEntity,
    web_query_entity_1.WebQueryEntity,
    ai_agent_analysis_entity_1.AiAgentAnalysisEntity,
    loan_request_entity_1.LoanRequestEntity,
    usura_rate_entity_1.UsuraRateEntity,
];


/***/ },

/***/ "./libs/products-data/src/products-data.module.ts"
/*!********************************************************!*\
  !*** ./libs/products-data/src/products-data.module.ts ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductsDataModule = exports.PRODUCTS_MS_TYPEORM_ENTITIES = exports.PRODUCTS_DATA_ENTITIES = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const suppliers_data_module_1 = __webpack_require__(/*! ../../suppliers-data/src/suppliers-data.module */ "./libs/suppliers-data/src/suppliers-data.module.ts");
const suppliers_data_entities_1 = __webpack_require__(/*! ../../suppliers-data/src/suppliers-data.entities */ "./libs/suppliers-data/src/suppliers-data.entities.ts");
const transversal_data_entities_1 = __webpack_require__(/*! ../../transversal-data/src/transversal-data.entities */ "./libs/transversal-data/src/transversal-data.entities.ts");
const products_data_service_1 = __webpack_require__(/*! ./products-data.service */ "./libs/products-data/src/products-data.service.ts");
const products_data_entities_1 = __webpack_require__(/*! ./products-data.entities */ "./libs/products-data/src/products-data.entities.ts");
var products_data_entities_2 = __webpack_require__(/*! ./products-data.entities */ "./libs/products-data/src/products-data.entities.ts");
Object.defineProperty(exports, "PRODUCTS_DATA_ENTITIES", ({ enumerable: true, get: function () { return products_data_entities_2.PRODUCTS_DATA_ENTITIES; } }));
exports.PRODUCTS_MS_TYPEORM_ENTITIES = [
    ...transversal_data_entities_1.TRANSVERSAL_DATA_ENTITIES,
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


/***/ },

/***/ "./libs/products-data/src/products-data.service.ts"
/*!*********************************************************!*\
  !*** ./libs/products-data/src/products-data.service.ts ***!
  \*********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductsDataService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let ProductsDataService = class ProductsDataService {
};
exports.ProductsDataService = ProductsDataService;
exports.ProductsDataService = ProductsDataService = __decorate([
    (0, common_1.Injectable)()
], ProductsDataService);


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
exports.BatchLogsStatus = exports.PaymentsMethod = exports.PaymentsStatus = exports.AdjustmentsStatus = exports.DisbursementBatchesStatus = exports.DisbursementStatus = exports.LoanStatus = exports.LoanRequestStatus = exports.ExperianQueryStatus = exports.BusinessSeniorityCatalogState = exports.RolePermissionLinkState = exports.PermissionDefinitionState = exports.RoleDefinitionState = exports.PurchaseOrderRecordState = exports.BankAccountRecordState = exports.ShareholderRecordState = exports.LegalRepresentativeLifecycleState = exports.PersonRecordState = exports.BusinessLifecycleState = exports.CatalogActivationState = exports.UserState = exports.SalesRepresentativeRecordState = exports.PartnerOnboardingSagaStatus = exports.SupplierState = exports.PartnerState = exports.DocumentVerificationStatus = exports.ContractTemplateCatalogStatus = exports.ContractCatalogStatus = exports.CreditApplicationStatus = exports.CategoryState = exports.CreditFacilityState = void 0;
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

/***/ "./libs/suppliers-data/src/entities/partner.entity.ts"
/*!************************************************************!*\
  !*** ./libs/suppliers-data/src/entities/partner.entity.ts ***!
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
exports.PartnerEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const category_entity_1 = __webpack_require__(/*! ../../../products-data/src/entities/category.entity */ "./libs/products-data/src/entities/category.entity.ts");
const shared_1 = __webpack_require__(/*! @platam/shared */ "./libs/shared/src/index.ts");
const base_external_id_entity_1 = __webpack_require__(/*! ./base-external-id.entity */ "./libs/suppliers-data/src/entities/base-external-id.entity.ts");
const business_entity_1 = __webpack_require__(/*! ./business.entity */ "./libs/suppliers-data/src/entities/business.entity.ts");
const sales_representative_entity_1 = __webpack_require__(/*! ./sales-representative.entity */ "./libs/suppliers-data/src/entities/sales-representative.entity.ts");
const supplier_entity_1 = __webpack_require__(/*! ./supplier.entity */ "./libs/suppliers-data/src/entities/supplier.entity.ts");
let PartnerEntity = class PartnerEntity extends base_external_id_entity_1.BaseExternalIdEntity {
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
    state;
};
exports.PartnerEntity = PartnerEntity;
__decorate([
    (0, typeorm_1.ManyToOne)(() => business_entity_1.BusinessEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'business_id', referencedColumnName: 'id' }),
    __metadata("design:type", typeof (_a = typeof business_entity_1.BusinessEntity !== "undefined" && business_entity_1.BusinessEntity) === "function" ? _a : Object)
], PartnerEntity.prototype, "business", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => supplier_entity_1.SupplierEntity, (s) => s.partner, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'supplier_id', referencedColumnName: 'id' }),
    __metadata("design:type", typeof (_b = typeof supplier_entity_1.SupplierEntity !== "undefined" && supplier_entity_1.SupplierEntity) === "function" ? _b : Object)
], PartnerEntity.prototype, "supplier", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'alias',
        type: 'varchar',
        length: 100,
        unique: true,
        nullable: true,
    }),
    __metadata("design:type", Object)
], PartnerEntity.prototype, "alias", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'acronym', type: 'varchar', length: 10, nullable: true }),
    __metadata("design:type", Object)
], PartnerEntity.prototype, "acronym", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'logo_url', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], PartnerEntity.prototype, "logoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'co_branding_logo_url', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], PartnerEntity.prototype, "coBrandingLogoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'primary_color',
        type: 'varchar',
        length: 7,
        nullable: true,
    }),
    __metadata("design:type", Object)
], PartnerEntity.prototype, "primaryColor", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'secondary_color',
        type: 'varchar',
        length: 7,
        nullable: true,
    }),
    __metadata("design:type", Object)
], PartnerEntity.prototype, "secondaryColor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'light_color', type: 'varchar', length: 7, nullable: true }),
    __metadata("design:type", Object)
], PartnerEntity.prototype, "lightColor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'notification_email', type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], PartnerEntity.prototype, "notificationEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'webhook_url', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], PartnerEntity.prototype, "webhookUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'disbursement_notification_email',
        type: 'varchar',
        nullable: true,
    }),
    __metadata("design:type", Object)
], PartnerEntity.prototype, "disbursementNotificationEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'api_key_hash', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], PartnerEntity.prototype, "apiKeyHash", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'send_sales_rep_voucher',
        type: 'boolean',
        default: false,
    }),
    __metadata("design:type", Boolean)
], PartnerEntity.prototype, "sendSalesRepVoucher", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sales_representative_entity_1.SalesRepresentativeEntity, (sr) => sr.partner),
    __metadata("design:type", Array)
], PartnerEntity.prototype, "salesRepresentatives", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => category_entity_1.CategoryEntity, (c) => c.partner, {
        cascade: false,
        eager: false,
    }),
    __metadata("design:type", Array)
], PartnerEntity.prototype, "categories", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'state',
        type: 'enum',
        enum: shared_1.PartnerState,
        enumName: 'partner_state',
        default: shared_1.PartnerState.ACTIVE,
    }),
    __metadata("design:type", typeof (_c = typeof shared_1.PartnerState !== "undefined" && shared_1.PartnerState) === "function" ? _c : Object)
], PartnerEntity.prototype, "state", void 0);
exports.PartnerEntity = PartnerEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'partners', schema: 'suppliers_schema' }),
    (0, typeorm_1.Index)('IDX_partners_state', ['state']),
    (0, typeorm_1.Index)('IDX_partners_business_id', ['business'])
], PartnerEntity);


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
const partner_entity_1 = __webpack_require__(/*! ./partner.entity */ "./libs/suppliers-data/src/entities/partner.entity.ts");
const transversal_data_1 = __webpack_require__(/*! @app/transversal-data */ "./libs/transversal-data/src/index.ts");
let SalesRepresentativeEntity = class SalesRepresentativeEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    partner;
    partnerId;
    state;
    user;
    userId;
    is_default;
};
exports.SalesRepresentativeEntity = SalesRepresentativeEntity;
__decorate([
    (0, typeorm_1.ManyToOne)(() => partner_entity_1.PartnerEntity, (p) => p.salesRepresentatives, {
        nullable: false,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'partner_id', referencedColumnName: 'id' }),
    __metadata("design:type", typeof (_a = typeof partner_entity_1.PartnerEntity !== "undefined" && partner_entity_1.PartnerEntity) === "function" ? _a : Object)
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
__decorate([
    (0, typeorm_1.Column)({
        name: 'is_default',
        type: 'boolean',
        default: false,
    }),
    __metadata("design:type", Boolean)
], SalesRepresentativeEntity.prototype, "is_default", void 0);
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
const partner_entity_1 = __webpack_require__(/*! ./partner.entity */ "./libs/suppliers-data/src/entities/partner.entity.ts");
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
    (0, typeorm_1.OneToOne)(() => partner_entity_1.PartnerEntity, (p) => p.supplier),
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
__exportStar(__webpack_require__(/*! ./entities/partner.entity */ "./libs/suppliers-data/src/entities/partner.entity.ts"), exports);
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
const partner_entity_1 = __webpack_require__(/*! ./entities/partner.entity */ "./libs/suppliers-data/src/entities/partner.entity.ts");
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
    partner_entity_1.PartnerEntity,
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

/***/ "@nestjs/passport"
/*!***********************************!*\
  !*** external "@nestjs/passport" ***!
  \***********************************/
(module) {

module.exports = require("@nestjs/passport");

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

/***/ "jwks-rsa"
/*!***************************!*\
  !*** external "jwks-rsa" ***!
  \***************************/
(module) {

module.exports = require("jwks-rsa");

/***/ },

/***/ "multer"
/*!*************************!*\
  !*** external "multer" ***!
  \*************************/
(module) {

module.exports = require("multer");

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
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**************************************!*\
  !*** ./apps/products-ms/src/main.ts ***!
  \**************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
__webpack_require__(/*! ./config/dotenv.config */ "./apps/products-ms/src/config/dotenv.config.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./apps/products-ms/src/app.module.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({ origin: '*' });
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