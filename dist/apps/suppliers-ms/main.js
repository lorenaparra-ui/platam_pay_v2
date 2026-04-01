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
const businesses_module_1 = __webpack_require__(121);
const partners_module_1 = __webpack_require__(134);
const suppliers_module_1 = __webpack_require__(154);
const bank_accounts_module_1 = __webpack_require__(137);
const app_config_1 = __importDefault(__webpack_require__(194));
const sqs_config_1 = __webpack_require__(195);
const app_controller_1 = __webpack_require__(196);
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
const postgres_type_orm_config_service_1 = __webpack_require__(13);
const sqs_module_1 = __webpack_require__(66);
const messaging_application_module_1 = __webpack_require__(78);
const typeorm_business_repository_1 = __webpack_require__(94);
const typeorm_partner_repository_1 = __webpack_require__(97);
const typeorm_supplier_repository_1 = __webpack_require__(100);
const typeorm_bank_account_repository_1 = __webpack_require__(103);
const typeorm_suppliers_reference_lookup_adapter_1 = __webpack_require__(106);
const typeorm_partner_onboarding_saga_repository_1 = __webpack_require__(107);
const sql_products_credit_facility_sync_adapter_1 = __webpack_require__(108);
const typeorm_partner_user_sqs_result_poll_adapter_1 = __webpack_require__(109);
const typeorm_legal_representative_repository_1 = __webpack_require__(110);
const sqs_transversal_user_person_writer_adapter_1 = __webpack_require__(113);
const partner_onboarding_saga_repository_port_1 = __webpack_require__(114);
const products_credit_facility_sync_port_1 = __webpack_require__(115);
const transversal_user_person_writer_port_1 = __webpack_require__(116);
const partner_user_sqs_result_reader_port_1 = __webpack_require__(117);
const partner_onboarding_files_port_1 = __webpack_require__(118);
const sqs_partner_onboarding_files_adapter_1 = __webpack_require__(119);
const suppliers_reference_lookup_port_1 = __webpack_require__(120);
const suppliers_data_1 = __webpack_require__(15);
const transversal_data_1 = __webpack_require__(53);
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
                transversal_data_1.PartnerCreateUserSqsIdempotencyEntity,
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
            typeorm_legal_representative_repository_1.TypeormLegalRepresentativeRepository,
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
        ],
        exports: [
            typeorm_business_repository_1.TypeormBusinessRepository,
            typeorm_partner_repository_1.TypeormPartnerRepository,
            typeorm_supplier_repository_1.TypeormSupplierRepository,
            typeorm_bank_account_repository_1.TypeormBankAccountRepository,
            typeorm_partner_onboarding_saga_repository_1.TypeormPartnerOnboardingSagaRepository,
            typeorm_legal_representative_repository_1.TypeormLegalRepresentativeRepository,
            typeorm_partner_user_sqs_result_poll_adapter_1.TypeormPartnerUserSqsResultPollAdapter,
            suppliers_reference_lookup_port_1.SUPPLIERS_REFERENCE_LOOKUP,
            partner_onboarding_saga_repository_port_1.PARTNER_ONBOARDING_SAGA_REPOSITORY,
            products_credit_facility_sync_port_1.PRODUCTS_CREDIT_FACILITY_SYNC_PORT,
            transversal_user_person_writer_port_1.TRANSVERSAL_USER_PERSON_WRITER_PORT,
            partner_user_sqs_result_reader_port_1.PARTNER_USER_SQS_RESULT_READER_PORT,
            partner_onboarding_files_port_1.PARTNER_ONBOARDING_FILES_PORT,
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
const typeorm_config_1 = __importDefault(__webpack_require__(14));
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
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(2);
const suppliers_data_1 = __webpack_require__(15);
const transversal_data_1 = __webpack_require__(53);
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
        transversal_data_1.PartnerCreateUserSqsIdempotencyEntity,
    ],
    synchronize: false,
    migrationsRun: false,
    migrationsTableName: "typeorm_migrations",
};
exports["default"] = TypeormConfig;


/***/ }),
/* 15 */
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
__exportStar(__webpack_require__(16), exports);
__exportStar(__webpack_require__(20), exports);
__exportStar(__webpack_require__(23), exports);
__exportStar(__webpack_require__(24), exports);
__exportStar(__webpack_require__(25), exports);
__exportStar(__webpack_require__(48), exports);
__exportStar(__webpack_require__(49), exports);
__exportStar(__webpack_require__(50), exports);
__exportStar(__webpack_require__(47), exports);
__exportStar(__webpack_require__(51), exports);
__exportStar(__webpack_require__(52), exports);
__exportStar(__webpack_require__(19), exports);


/***/ }),
/* 16 */
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
const typeorm_1 = __webpack_require__(17);
const base_external_id_entity_1 = __webpack_require__(18);
const aes_256_transformer_1 = __webpack_require__(19);
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


/***/ }),
/* 17 */
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),
/* 18 */
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
const typeorm_1 = __webpack_require__(17);
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


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BankAccountEncryptionTransformer = void 0;
exports.BankAccountEncryptionTransformer = {
    to: (value) => value,
    from: (value) => value,
};


/***/ }),
/* 20 */
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
const typeorm_1 = __webpack_require__(17);
const person_entity_1 = __webpack_require__(21);
const base_external_id_entity_1 = __webpack_require__(18);
const business_seniority_entity_1 = __webpack_require__(23);
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
/* 21 */
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
const typeorm_1 = __webpack_require__(17);
const base_external_id_entity_1 = __webpack_require__(22);
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


/***/ }),
/* 22 */
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
const typeorm_1 = __webpack_require__(17);
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


/***/ }),
/* 23 */
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
const typeorm_1 = __webpack_require__(17);
const base_external_id_entity_1 = __webpack_require__(18);
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
    (0, typeorm_1.Entity)({ name: 'business_seniority', schema: 'suppliers_schema' })
], BusinessSeniorityEntity);


/***/ }),
/* 24 */
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
const typeorm_1 = __webpack_require__(17);
const person_entity_1 = __webpack_require__(21);
const base_external_id_entity_1 = __webpack_require__(18);
let LegalRepresentativeEntity = class LegalRepresentativeEntity extends base_external_id_entity_1.BaseExternalIdEntity {
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
/* 25 */
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
const typeorm_1 = __webpack_require__(17);
const shared_1 = __webpack_require__(26);
const base_external_id_entity_1 = __webpack_require__(18);
const supplier_entity_1 = __webpack_require__(47);
let PartnersEntity = class PartnersEntity extends base_external_id_entity_1.BaseExternalIdEntity {
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
        enum: shared_1.CreditFacilitiesStatuses,
        enumName: 'partner_state',
        default: shared_1.CreditFacilitiesStatuses.ACTIVE,
    }),
    __metadata("design:type", typeof (_b = typeof shared_1.CreditFacilitiesStatuses !== "undefined" && shared_1.CreditFacilitiesStatuses) === "function" ? _b : Object)
], PartnersEntity.prototype, "state", void 0);
exports.PartnersEntity = PartnersEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'partners', schema: 'suppliers_schema' })
], PartnersEntity);


/***/ }),
/* 26 */
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
var sqs_tokens_1 = __webpack_require__(27);
Object.defineProperty(exports, "QUEUES_CONFIG", ({ enumerable: true, get: function () { return sqs_tokens_1.QUEUES_CONFIG; } }));
Object.defineProperty(exports, "SQS_CLIENT", ({ enumerable: true, get: function () { return sqs_tokens_1.SQS_CLIENT; } }));
__exportStar(__webpack_require__(28), exports);
__exportStar(__webpack_require__(30), exports);
__exportStar(__webpack_require__(31), exports);
__exportStar(__webpack_require__(32), exports);
__exportStar(__webpack_require__(33), exports);
__exportStar(__webpack_require__(34), exports);
__exportStar(__webpack_require__(35), exports);
__exportStar(__webpack_require__(36), exports);
__exportStar(__webpack_require__(37), exports);
__exportStar(__webpack_require__(38), exports);
__exportStar(__webpack_require__(39), exports);
__exportStar(__webpack_require__(40), exports);
__exportStar(__webpack_require__(42), exports);
__exportStar(__webpack_require__(43), exports);
__exportStar(__webpack_require__(46), exports);


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QUEUES_CONFIG = exports.SQS_CLIENT = void 0;
exports.SQS_CLIENT = Symbol('SQS_CLIENT');
exports.QUEUES_CONFIG = Symbol('QUEUES_CONFIG');


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.create_sqs_client = create_sqs_client;
const client_sqs_1 = __webpack_require__(29);
function create_sqs_client(options) {
    const config = {
        region: options.region,
        ...(options.endpoint ? { endpoint: options.endpoint } : {}),
        ...(options.credentials ? { credentials: options.credentials } : {}),
    };
    return new client_sqs_1.SQSClient(config);
}


/***/ }),
/* 29 */
/***/ ((module) => {

module.exports = require("@aws-sdk/client-sqs");

/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports) => {


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


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseConsumer = exports.BaseSqsConsumer = void 0;
const client_sqs_1 = __webpack_require__(29);
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


/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BasePublisher = exports.BaseSqsPublisher = void 0;
const client_sqs_1 = __webpack_require__(29);
const sqs_publish_failed_error_1 = __webpack_require__(31);
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


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreditFacilitiesStatuses = exports.Statuses = void 0;
var Statuses;
(function (Statuses) {
    Statuses["ACTIVE"] = "active";
    Statuses["INACTIVE"] = "inactive";
})(Statuses || (exports.CreditFacilitiesStatuses = exports.Statuses = Statuses = {}));


/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports) => {


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


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports) => {


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


/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.new_uuid = new_uuid;
const crypto_1 = __webpack_require__(41);
function new_uuid() {
    return (0, crypto_1.randomUUID)();
}


/***/ }),
/* 41 */
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),
/* 42 */
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
exports.PaginationRequestDto = void 0;
const class_transformer_1 = __webpack_require__(44);
const class_validator_1 = __webpack_require__(45);
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


/***/ }),
/* 44 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 45 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 46 */
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
exports.SupplierEntity = void 0;
const typeorm_1 = __webpack_require__(17);
const base_external_id_entity_1 = __webpack_require__(18);
const bank_account_entity_1 = __webpack_require__(16);
const business_entity_1 = __webpack_require__(20);
const legal_representative_entity_1 = __webpack_require__(24);
const partners_entity_1 = __webpack_require__(25);
let SupplierEntity = class SupplierEntity extends base_external_id_entity_1.BaseExternalIdEntity {
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
exports.PartnerOnboardingSagaEntity = void 0;
const typeorm_1 = __webpack_require__(17);
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PurchaseOrderEntity = void 0;
const typeorm_1 = __webpack_require__(17);
const base_external_id_entity_1 = __webpack_require__(18);
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
exports.SalesRepresentativeEntity = void 0;
const typeorm_1 = __webpack_require__(17);
const base_external_id_entity_1 = __webpack_require__(18);
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
exports.SalesRepresentativeEntity = SalesRepresentativeEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'sales_representatives', schema: 'suppliers_schema' })
], SalesRepresentativeEntity);


/***/ }),
/* 51 */
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
const bank_account_entity_1 = __webpack_require__(16);
const business_entity_1 = __webpack_require__(20);
const business_seniority_entity_1 = __webpack_require__(23);
const legal_representative_entity_1 = __webpack_require__(24);
const partners_entity_1 = __webpack_require__(25);
const order_entity_1 = __webpack_require__(49);
const sales_representative_entity_1 = __webpack_require__(50);
const supplier_entity_1 = __webpack_require__(47);
const partner_onboarding_saga_entity_1 = __webpack_require__(48);
const suppliers_data_service_1 = __webpack_require__(52);
exports.SUPPLIERS_DATA_ENTITIES = [
    bank_account_entity_1.BankAccountEntity,
    business_entity_1.BusinessEntity,
    business_seniority_entity_1.BusinessSeniorityEntity,
    legal_representative_entity_1.LegalRepresentativeEntity,
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
exports.SuppliersDataService = void 0;
const common_1 = __webpack_require__(6);
let SuppliersDataService = class SuppliersDataService {
};
exports.SuppliersDataService = SuppliersDataService;
exports.SuppliersDataService = SuppliersDataService = __decorate([
    (0, common_1.Injectable)()
], SuppliersDataService);


/***/ }),
/* 53 */
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
__exportStar(__webpack_require__(54), exports);
__exportStar(__webpack_require__(55), exports);
__exportStar(__webpack_require__(56), exports);
__exportStar(__webpack_require__(57), exports);
__exportStar(__webpack_require__(21), exports);
__exportStar(__webpack_require__(58), exports);
__exportStar(__webpack_require__(59), exports);
__exportStar(__webpack_require__(60), exports);
__exportStar(__webpack_require__(61), exports);
__exportStar(__webpack_require__(62), exports);
__exportStar(__webpack_require__(63), exports);
__exportStar(__webpack_require__(64), exports);
__exportStar(__webpack_require__(65), exports);


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
exports.CityEntity = void 0;
const typeorm_1 = __webpack_require__(17);
const base_external_id_entity_1 = __webpack_require__(22);
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
exports.CurrencyEntity = void 0;
const typeorm_1 = __webpack_require__(17);
const base_external_id_entity_1 = __webpack_require__(22);
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
exports.DocumentTypeEntity = void 0;
const typeorm_1 = __webpack_require__(17);
const base_external_id_entity_1 = __webpack_require__(22);
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PermissionEntity = void 0;
const typeorm_1 = __webpack_require__(17);
const base_external_id_entity_1 = __webpack_require__(22);
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleEntity = void 0;
const typeorm_1 = __webpack_require__(17);
const base_external_id_entity_1 = __webpack_require__(22);
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


/***/ }),
/* 59 */
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
exports.RolePermissionEntity = void 0;
const typeorm_1 = __webpack_require__(17);
const base_external_id_entity_1 = __webpack_require__(22);
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


/***/ }),
/* 60 */
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
exports.StatusEntity = void 0;
const typeorm_1 = __webpack_require__(17);
const base_external_id_entity_1 = __webpack_require__(22);
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PartnerCreateUserSqsIdempotencyEntity = void 0;
const typeorm_1 = __webpack_require__(17);
let PartnerCreateUserSqsIdempotencyEntity = class PartnerCreateUserSqsIdempotencyEntity {
};
exports.PartnerCreateUserSqsIdempotencyEntity = PartnerCreateUserSqsIdempotencyEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", String)
], PartnerCreateUserSqsIdempotencyEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'idempotency_key', type: 'varchar', length: 512, unique: true }),
    __metadata("design:type", String)
], PartnerCreateUserSqsIdempotencyEntity.prototype, "idempotency_key", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'correlation_id', type: 'uuid' }),
    __metadata("design:type", String)
], PartnerCreateUserSqsIdempotencyEntity.prototype, "correlation_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'result', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], PartnerCreateUserSqsIdempotencyEntity.prototype, "result", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], PartnerCreateUserSqsIdempotencyEntity.prototype, "created_at", void 0);
exports.PartnerCreateUserSqsIdempotencyEntity = PartnerCreateUserSqsIdempotencyEntity = __decorate([
    (0, typeorm_1.Entity)({ schema: 'transversal_schema', name: 'partner_create_user_sqs_idempotency' })
], PartnerCreateUserSqsIdempotencyEntity);


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadFilesIdempotencyEntity = void 0;
const typeorm_1 = __webpack_require__(17);
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserEntity = void 0;
const typeorm_1 = __webpack_require__(17);
const base_external_id_entity_1 = __webpack_require__(22);
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
exports.TransversalDataModule = exports.TRANSVERSAL_DATA_ENTITIES = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(12);
const city_entity_1 = __webpack_require__(54);
const currency_entity_1 = __webpack_require__(55);
const document_type_entity_1 = __webpack_require__(56);
const permission_entity_1 = __webpack_require__(57);
const person_entity_1 = __webpack_require__(21);
const role_entity_1 = __webpack_require__(58);
const role_permission_entity_1 = __webpack_require__(59);
const status_entity_1 = __webpack_require__(60);
const partner_create_user_sqs_idempotency_entity_1 = __webpack_require__(61);
const upload_files_idempotency_entity_1 = __webpack_require__(62);
const user_entity_1 = __webpack_require__(63);
const transversal_data_service_1 = __webpack_require__(65);
exports.TRANSVERSAL_DATA_ENTITIES = [
    city_entity_1.CityEntity,
    currency_entity_1.CurrencyEntity,
    document_type_entity_1.DocumentTypeEntity,
    permission_entity_1.PermissionEntity,
    person_entity_1.PersonEntity,
    role_entity_1.RoleEntity,
    role_permission_entity_1.RolePermissionEntity,
    status_entity_1.StatusEntity,
    upload_files_idempotency_entity_1.UploadFilesIdempotencyEntity,
    partner_create_user_sqs_idempotency_entity_1.PartnerCreateUserSqsIdempotencyEntity,
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
exports.TransversalDataService = void 0;
const common_1 = __webpack_require__(6);
let TransversalDataService = class TransversalDataService {
};
exports.TransversalDataService = TransversalDataService;
exports.TransversalDataService = TransversalDataService = __decorate([
    (0, common_1.Injectable)()
], TransversalDataService);


/***/ }),
/* 66 */
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
const shared_1 = __webpack_require__(26);
const sqs_message_publisher_adapter_1 = __webpack_require__(67);
const config_outbound_transversal_queue_url_adapter_1 = __webpack_require__(68);
const config_outbound_products_queue_url_adapter_1 = __webpack_require__(69);
const transversal_inbound_sqs_consumer_1 = __webpack_require__(70);
const messaging_application_module_1 = __webpack_require__(78);
const outbound_message_publisher_port_1 = __webpack_require__(80);
const transversal_outbound_queue_url_port_1 = __webpack_require__(81);
const products_outbound_queue_url_port_1 = __webpack_require__(89);
const transversal_upload_files_queue_url_port_1 = __webpack_require__(84);
const config_transversal_upload_files_queue_url_adapter_1 = __webpack_require__(90);
const transversal_create_partner_user_queue_url_port_1 = __webpack_require__(86);
const config_transversal_create_partner_user_queue_url_adapter_1 = __webpack_require__(91);
const transversal_create_person_queue_url_port_1 = __webpack_require__(88);
const config_transversal_create_person_queue_url_adapter_1 = __webpack_require__(92);
const publish_products_event_use_case_1 = __webpack_require__(93);
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
            publish_products_event_use_case_1.PublishProductsEventUseCase,
        ],
    })
], SqsModule);


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SqsMessagePublisherAdapter = void 0;
const common_1 = __webpack_require__(6);
const shared_1 = __webpack_require__(26);
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigOutboundTransversalQueueUrlAdapter = void 0;
const common_1 = __webpack_require__(6);
const shared_1 = __webpack_require__(26);
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigOutboundProductsQueueUrlAdapter = void 0;
const common_1 = __webpack_require__(6);
const config_1 = __webpack_require__(8);
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var TransversalInboundSqsConsumer_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransversalInboundSqsConsumer = void 0;
const common_1 = __webpack_require__(6);
const config_1 = __webpack_require__(8);
const ingest_transversal_inbound_sqs_message_use_case_1 = __webpack_require__(71);
const shared_1 = __webpack_require__(26);
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
var IngestTransversalInboundSqsMessageUseCase_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IngestTransversalInboundSqsMessageUseCase = void 0;
const common_1 = __webpack_require__(6);
const class_transformer_1 = __webpack_require__(44);
const class_validator_1 = __webpack_require__(45);
const files_uploaded_inbound_dto_1 = __webpack_require__(72);
const transversal_inbound_message_dto_1 = __webpack_require__(73);
const process_transversal_inbound_message_use_case_1 = __webpack_require__(75);
const process_files_uploaded_inbound_use_case_1 = __webpack_require__(76);
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FilesUploadedInboundDto = exports.FilesUploadedPayloadDto = exports.FilesUploadedItemDto = void 0;
const class_transformer_1 = __webpack_require__(44);
const class_validator_1 = __webpack_require__(45);
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


/***/ }),
/* 73 */
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
const class_validator_1 = __webpack_require__(45);
const transversal_outbound_event_dto_1 = __webpack_require__(74);
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


/***/ }),
/* 74 */
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
const class_validator_1 = __webpack_require__(45);
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


/***/ }),
/* 75 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProcessTransversalInboundMessageUseCase_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProcessTransversalInboundMessageUseCase = void 0;
const common_1 = __webpack_require__(6);
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
var ProcessFilesUploadedInboundUseCase_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProcessFilesUploadedInboundUseCase = void 0;
const common_1 = __webpack_require__(6);
const files_uploaded_correlation_awaiter_service_1 = __webpack_require__(77);
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


/***/ }),
/* 77 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FilesUploadedCorrelationAwaiter = void 0;
const common_1 = __webpack_require__(6);
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


/***/ }),
/* 78 */
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
const publish_transversal_event_use_case_1 = __webpack_require__(79);
const publish_upload_files_event_use_case_1 = __webpack_require__(83);
const publish_create_partner_user_command_use_case_1 = __webpack_require__(85);
const publish_create_person_command_use_case_1 = __webpack_require__(87);
const process_transversal_inbound_message_use_case_1 = __webpack_require__(75);
const process_files_uploaded_inbound_use_case_1 = __webpack_require__(76);
const ingest_transversal_inbound_sqs_message_use_case_1 = __webpack_require__(71);
const files_uploaded_correlation_awaiter_service_1 = __webpack_require__(77);
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
            process_transversal_inbound_message_use_case_1.ProcessTransversalInboundMessageUseCase,
            process_files_uploaded_inbound_use_case_1.ProcessFilesUploadedInboundUseCase,
            ingest_transversal_inbound_sqs_message_use_case_1.IngestTransversalInboundSqsMessageUseCase,
        ],
    })
], MessagingApplicationModule);


/***/ }),
/* 79 */
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
exports.PublishTransversalEventUseCase = void 0;
const common_1 = __webpack_require__(6);
const class_transformer_1 = __webpack_require__(44);
const class_validator_1 = __webpack_require__(45);
const outbound_message_publisher_port_1 = __webpack_require__(80);
const transversal_outbound_queue_url_port_1 = __webpack_require__(81);
const transversal_outbound_event_dto_1 = __webpack_require__(74);
const validation_failed_error_1 = __webpack_require__(82);
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


/***/ }),
/* 80 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OUTBOUND_MESSAGE_PUBLISHER_PORT = void 0;
exports.OUTBOUND_MESSAGE_PUBLISHER_PORT = Symbol('OUTBOUND_MESSAGE_PUBLISHER_PORT');


/***/ }),
/* 81 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TRANSVERSAL_OUTBOUND_QUEUE_URL_PORT = void 0;
exports.TRANSVERSAL_OUTBOUND_QUEUE_URL_PORT = Symbol('TRANSVERSAL_OUTBOUND_QUEUE_URL_PORT');


/***/ }),
/* 82 */
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PublishUploadFilesEventUseCase = void 0;
const common_1 = __webpack_require__(6);
const config_1 = __webpack_require__(8);
const outbound_message_publisher_port_1 = __webpack_require__(80);
const transversal_upload_files_queue_url_port_1 = __webpack_require__(84);
const validation_failed_error_1 = __webpack_require__(82);
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


/***/ }),
/* 84 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TRANSVERSAL_UPLOAD_FILES_QUEUE_URL_PORT = void 0;
exports.TRANSVERSAL_UPLOAD_FILES_QUEUE_URL_PORT = Symbol('TRANSVERSAL_UPLOAD_FILES_QUEUE_URL_PORT');


/***/ }),
/* 85 */
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
exports.PublishCreatePartnerUserCommandUseCase = void 0;
const common_1 = __webpack_require__(6);
const outbound_message_publisher_port_1 = __webpack_require__(80);
const transversal_create_partner_user_queue_url_port_1 = __webpack_require__(86);
const validation_failed_error_1 = __webpack_require__(82);
let PublishCreatePartnerUserCommandUseCase = class PublishCreatePartnerUserCommandUseCase {
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


/***/ }),
/* 86 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TRANSVERSAL_CREATE_PARTNER_USER_QUEUE_URL_PORT = void 0;
exports.TRANSVERSAL_CREATE_PARTNER_USER_QUEUE_URL_PORT = Symbol('TRANSVERSAL_CREATE_PARTNER_USER_QUEUE_URL_PORT');


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
exports.PublishCreatePersonCommandUseCase = void 0;
const common_1 = __webpack_require__(6);
const outbound_message_publisher_port_1 = __webpack_require__(80);
const transversal_create_person_queue_url_port_1 = __webpack_require__(88);
const validation_failed_error_1 = __webpack_require__(82);
let PublishCreatePersonCommandUseCase = class PublishCreatePersonCommandUseCase {
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
exports.PublishCreatePersonCommandUseCase = PublishCreatePersonCommandUseCase;
exports.PublishCreatePersonCommandUseCase = PublishCreatePersonCommandUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(outbound_message_publisher_port_1.OUTBOUND_MESSAGE_PUBLISHER_PORT)),
    __param(1, (0, common_1.Inject)(transversal_create_person_queue_url_port_1.TRANSVERSAL_CREATE_PERSON_QUEUE_URL_PORT)),
    __metadata("design:paramtypes", [Object, Object])
], PublishCreatePersonCommandUseCase);


/***/ }),
/* 88 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TRANSVERSAL_CREATE_PERSON_QUEUE_URL_PORT = void 0;
exports.TRANSVERSAL_CREATE_PERSON_QUEUE_URL_PORT = Symbol('TRANSVERSAL_CREATE_PERSON_QUEUE_URL_PORT');


/***/ }),
/* 89 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PRODUCTS_OUTBOUND_QUEUE_URL_PORT = void 0;
exports.PRODUCTS_OUTBOUND_QUEUE_URL_PORT = Symbol('PRODUCTS_OUTBOUND_QUEUE_URL_PORT');


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
exports.ConfigTransversalUploadFilesQueueUrlAdapter = void 0;
const common_1 = __webpack_require__(6);
const shared_1 = __webpack_require__(26);
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigTransversalCreatePartnerUserQueueUrlAdapter = void 0;
const common_1 = __webpack_require__(6);
const shared_1 = __webpack_require__(26);
let ConfigTransversalCreatePartnerUserQueueUrlAdapter = class ConfigTransversalCreatePartnerUserQueueUrlAdapter {
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


/***/ }),
/* 92 */
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
exports.ConfigTransversalCreatePersonQueueUrlAdapter = void 0;
const common_1 = __webpack_require__(6);
const shared_1 = __webpack_require__(26);
let ConfigTransversalCreatePersonQueueUrlAdapter = class ConfigTransversalCreatePersonQueueUrlAdapter {
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PublishProductsEventUseCase = void 0;
const common_1 = __webpack_require__(6);
const class_transformer_1 = __webpack_require__(44);
const class_validator_1 = __webpack_require__(45);
const outbound_message_publisher_port_1 = __webpack_require__(80);
const products_outbound_queue_url_port_1 = __webpack_require__(89);
const transversal_outbound_event_dto_1 = __webpack_require__(74);
const validation_failed_error_1 = __webpack_require__(82);
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
exports.TypeormBusinessRepository = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(12);
const typeorm_2 = __webpack_require__(17);
const suppliers_data_1 = __webpack_require__(15);
const business_mapper_1 = __webpack_require__(95);
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


/***/ }),
/* 95 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BusinessMapper = void 0;
const business_entity_1 = __webpack_require__(96);
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


/***/ }),
/* 96 */
/***/ ((__unused_webpack_module, exports) => {


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
exports.TypeormPartnerRepository = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(12);
const typeorm_2 = __webpack_require__(17);
const suppliers_data_1 = __webpack_require__(15);
const partner_mapper_1 = __webpack_require__(98);
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
        if (patch.state !== undefined) {
            add('state', patch.state);
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


/***/ }),
/* 98 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PartnerMapper = void 0;
const partner_entity_1 = __webpack_require__(99);
const shared_1 = __webpack_require__(26);
class PartnerMapper {
    static to_domain(row) {
        return new partner_entity_1.Partner(row.id, row.supplier.id, row.externalId, row.acronym ?? null, row.logoUrl ?? null, row.coBrandingLogoUrl ?? null, row.primaryColor ?? null, row.secondaryColor ?? null, row.lightColor ?? null, row.notificationEmail ?? null, row.webhookUrl ?? null, row.sendSalesRepVoucher, row.disbursementNotificationEmail ?? null, row.state, row.createdAt, row.updatedAt);
    }
    static from_raw_row(row) {
        const state_raw = String(row['state'] ?? shared_1.CreditFacilitiesStatuses.ACTIVE);
        const state = state_raw === shared_1.CreditFacilitiesStatuses.INACTIVE
            ? shared_1.CreditFacilitiesStatuses.INACTIVE
            : shared_1.CreditFacilitiesStatuses.ACTIVE;
        return new partner_entity_1.Partner(Number(row['id']), Number(row['supplier_id']), String(row['external_id']), row['acronym'] ?? null, row['logo_url'] ?? null, row['co_branding_logo_url'] ?? null, row['primary_color'] ?? null, row['secondary_color'] ?? null, row['light_color'] ?? null, row['notification_email'] ?? null, row['webhook_url'] ?? null, Boolean(row['send_sales_rep_voucher']), row['disbursement_notification_email'] ?? null, state, new Date(String(row['created_at'])), new Date(String(row['updated_at'])));
    }
}
exports.PartnerMapper = PartnerMapper;


/***/ }),
/* 99 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Partner = void 0;
class Partner {
    constructor(internal_id, supplier_id, external_id, acronym, logo_url, co_branding_logo_url, primary_color, secondary_color, light_color, notification_email, webhook_url, send_sales_rep_voucher, disbursement_notification_email, state, created_at, updated_at) {
        this.internal_id = internal_id;
        this.supplier_id = supplier_id;
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
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
exports.Partner = Partner;


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TypeormSupplierRepository = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(12);
const typeorm_2 = __webpack_require__(17);
const suppliers_data_1 = __webpack_require__(15);
const supplier_mapper_1 = __webpack_require__(101);
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


/***/ }),
/* 101 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SupplierMapper = void 0;
const supplier_entity_1 = __webpack_require__(102);
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


/***/ }),
/* 102 */
/***/ ((__unused_webpack_module, exports) => {


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
exports.TypeormBankAccountRepository = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(12);
const typeorm_2 = __webpack_require__(17);
const suppliers_data_1 = __webpack_require__(15);
const bank_account_mapper_1 = __webpack_require__(104);
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


/***/ }),
/* 104 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BankAccountMapper = void 0;
const bank_account_entity_1 = __webpack_require__(105);
class BankAccountMapper {
    static to_domain(row) {
        return new bank_account_entity_1.BankAccount(row.id, row.externalId, row.bankEntity, row.accountNumber, row.bankCertification ?? null, row.createdAt, row.updatedAt);
    }
    static from_raw_row(row) {
        return new bank_account_entity_1.BankAccount(Number(row['id']), String(row['external_id']), String(row['bank_entity']), String(row['account_number']), row['bank_certification'] ?? null, new Date(String(row['created_at'])), new Date(String(row['updated_at'])));
    }
}
exports.BankAccountMapper = BankAccountMapper;


/***/ }),
/* 105 */
/***/ ((__unused_webpack_module, exports) => {


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
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TypeormSuppliersReferenceLookupAdapter = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(12);
const typeorm_2 = __webpack_require__(17);
const transversal_data_1 = __webpack_require__(53);
const suppliers_data_1 = __webpack_require__(15);
let TypeormSuppliersReferenceLookupAdapter = class TypeormSuppliersReferenceLookupAdapter {
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


/***/ }),
/* 107 */
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
exports.TypeormPartnerOnboardingSagaRepository = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(12);
const typeorm_2 = __webpack_require__(17);
const suppliers_data_1 = __webpack_require__(15);
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


/***/ }),
/* 108 */
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
var SqlProductsCreditFacilitySyncAdapter_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SqlProductsCreditFacilitySyncAdapter = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(12);
const typeorm_2 = __webpack_require__(17);
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
        external_id, contract_id, state, total_limit
      ) VALUES (
        $1::uuid,
        $2,
        $3::products_schema.credit_facility_state,
        $4::numeric
      )`, [
            input.credit_facility_external_id,
            input.contract_id,
            input.state,
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TypeormPartnerUserSqsResultPollAdapter = void 0;
const common_1 = __webpack_require__(6);
const config_1 = __webpack_require__(8);
const typeorm_1 = __webpack_require__(12);
const typeorm_2 = __webpack_require__(17);
const transversal_data_1 = __webpack_require__(53);
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
let TypeormPartnerUserSqsResultPollAdapter = class TypeormPartnerUserSqsResultPollAdapter {
    constructor(repo, config_service) {
        this.repo = repo;
        this.config_service = config_service;
    }
    async wait_for_completed_result(idempotency_key) {
        const po = this.config_service.get('config.partner_onboarding');
        const timeout_ms = po?.sqs_user_poll_timeout_ms ?? 60000;
        const interval_ms = po?.sqs_user_poll_interval_ms ?? 300;
        const deadline = Date.now() + timeout_ms;
        while (Date.now() < deadline) {
            const row = await this.repo.findOne({
                where: { idempotency_key },
                select: { result: true },
            });
            const r = row?.result;
            if (r !== null &&
                r !== undefined &&
                typeof r.user_external_id === 'string' &&
                r.user_external_id.length > 0 &&
                typeof r.person_external_id === 'string' &&
                r.person_external_id.length > 0) {
                return {
                    user_external_id: r.user_external_id,
                    person_external_id: r.person_external_id,
                };
            }
            await sleep(interval_ms);
        }
        throw new Error('Tiempo de espera agotado: transversal-ms no completó el mensaje SQS (usuario/persona)');
    }
};
exports.TypeormPartnerUserSqsResultPollAdapter = TypeormPartnerUserSqsResultPollAdapter;
exports.TypeormPartnerUserSqsResultPollAdapter = TypeormPartnerUserSqsResultPollAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transversal_data_1.PartnerCreateUserSqsIdempotencyEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], TypeormPartnerUserSqsResultPollAdapter);


/***/ }),
/* 110 */
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
exports.TypeormLegalRepresentativeRepository = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(12);
const typeorm_2 = __webpack_require__(17);
const suppliers_data_1 = __webpack_require__(15);
const legal_representative_mapper_1 = __webpack_require__(111);
let TypeormLegalRepresentativeRepository = class TypeormLegalRepresentativeRepository {
    constructor(repo) {
        this.repo = repo;
    }
    async create(props) {
        const rows = await this.repo.query(`INSERT INTO suppliers_schema.legal_representatives (
        external_id, person_id, is_primary
      ) VALUES (gen_random_uuid(), $1, $2)
      RETURNING id, external_id, created_at, updated_at, person_id, is_primary`, [props.person_id, props.is_primary]);
        return legal_representative_mapper_1.LegalRepresentativeMapper.from_raw_row(rows[0]);
    }
};
exports.TypeormLegalRepresentativeRepository = TypeormLegalRepresentativeRepository;
exports.TypeormLegalRepresentativeRepository = TypeormLegalRepresentativeRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(suppliers_data_1.LegalRepresentativeEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], TypeormLegalRepresentativeRepository);


/***/ }),
/* 111 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LegalRepresentativeMapper = void 0;
const legal_representative_entity_1 = __webpack_require__(112);
exports.LegalRepresentativeMapper = {
    to_domain(row) {
        return new legal_representative_entity_1.LegalRepresentative(Number(row.id), row.externalId, row.personId, row.isPrimary, row.createdAt, row.updatedAt);
    },
    from_raw_row(row) {
        return new legal_representative_entity_1.LegalRepresentative(Number(row.id), String(row.external_id), Number(row.person_id), Boolean(row.is_primary), row.created_at, row.updated_at);
    },
};


/***/ }),
/* 112 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LegalRepresentative = void 0;
class LegalRepresentative {
    constructor(internal_id, external_id, person_id, is_primary, created_at, updated_at) {
        this.internal_id = internal_id;
        this.external_id = external_id;
        this.person_id = person_id;
        this.is_primary = is_primary;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
exports.LegalRepresentative = LegalRepresentative;


/***/ }),
/* 113 */
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
exports.SqsTransversalUserPersonWriterAdapter = void 0;
const common_1 = __webpack_require__(6);
const publish_create_partner_user_command_use_case_1 = __webpack_require__(85);
let SqsTransversalUserPersonWriterAdapter = class SqsTransversalUserPersonWriterAdapter {
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


/***/ }),
/* 114 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PARTNER_ONBOARDING_SAGA_REPOSITORY = void 0;
exports.PARTNER_ONBOARDING_SAGA_REPOSITORY = Symbol('PARTNER_ONBOARDING_SAGA_REPOSITORY');


/***/ }),
/* 115 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PRODUCTS_CREDIT_FACILITY_SYNC_PORT = void 0;
exports.PRODUCTS_CREDIT_FACILITY_SYNC_PORT = Symbol('PRODUCTS_CREDIT_FACILITY_SYNC_PORT');


/***/ }),
/* 116 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TRANSVERSAL_USER_PERSON_WRITER_PORT = void 0;
exports.TRANSVERSAL_USER_PERSON_WRITER_PORT = Symbol('TRANSVERSAL_USER_PERSON_WRITER_PORT');


/***/ }),
/* 117 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PARTNER_USER_SQS_RESULT_READER_PORT = void 0;
exports.PARTNER_USER_SQS_RESULT_READER_PORT = Symbol('PARTNER_USER_SQS_RESULT_READER_PORT');


/***/ }),
/* 118 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PARTNER_ONBOARDING_FILES_PORT = void 0;
exports.PARTNER_ONBOARDING_FILES_PORT = Symbol('PARTNER_ONBOARDING_FILES_PORT');


/***/ }),
/* 119 */
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
exports.SqsPartnerOnboardingFilesAdapter = void 0;
const common_1 = __webpack_require__(6);
const publish_upload_files_event_use_case_1 = __webpack_require__(83);
const files_uploaded_correlation_awaiter_service_1 = __webpack_require__(77);
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


/***/ }),
/* 120 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SUPPLIERS_REFERENCE_LOOKUP = void 0;
exports.SUPPLIERS_REFERENCE_LOOKUP = Symbol('SUPPLIERS_REFERENCE_LOOKUP');


/***/ }),
/* 121 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BusinessesModule = void 0;
const common_1 = __webpack_require__(6);
const infrastructure_module_1 = __webpack_require__(11);
const typeorm_business_repository_1 = __webpack_require__(94);
const businesses_tokens_1 = __webpack_require__(122);
const create_business_use_case_1 = __webpack_require__(123);
const get_business_by_external_id_use_case_1 = __webpack_require__(127);
const list_businesses_use_case_1 = __webpack_require__(129);
const update_business_by_external_id_use_case_1 = __webpack_require__(131);
const delete_business_by_external_id_use_case_1 = __webpack_require__(133);
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


/***/ }),
/* 122 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BUSINESS_REPOSITORY = void 0;
exports.BUSINESS_REPOSITORY = Symbol('BUSINESS_REPOSITORY');


/***/ }),
/* 123 */
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
exports.CreateBusinessUseCase = void 0;
const common_1 = __webpack_require__(6);
const suppliers_reference_lookup_port_1 = __webpack_require__(120);
const businesses_tokens_1 = __webpack_require__(122);
const business_repository_1 = __webpack_require__(124);
const business_public_fields_builder_1 = __webpack_require__(125);
const create_business_response_1 = __webpack_require__(126);
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


/***/ }),
/* 124 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 125 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.build_business_public_fields = build_business_public_fields;
const common_1 = __webpack_require__(6);
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


/***/ }),
/* 126 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateBusinessResponse = void 0;
class CreateBusinessResponse {
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.CreateBusinessResponse = CreateBusinessResponse;


/***/ }),
/* 127 */
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
exports.GetBusinessByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(6);
const suppliers_reference_lookup_port_1 = __webpack_require__(120);
const businesses_tokens_1 = __webpack_require__(122);
const business_repository_1 = __webpack_require__(124);
const business_public_fields_builder_1 = __webpack_require__(125);
const get_business_by_external_id_response_1 = __webpack_require__(128);
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


/***/ }),
/* 128 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetBusinessByExternalIdResponse = void 0;
class GetBusinessByExternalIdResponse {
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.GetBusinessByExternalIdResponse = GetBusinessByExternalIdResponse;


/***/ }),
/* 129 */
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
exports.ListBusinessesUseCase = void 0;
const common_1 = __webpack_require__(6);
const suppliers_reference_lookup_port_1 = __webpack_require__(120);
const businesses_tokens_1 = __webpack_require__(122);
const business_repository_1 = __webpack_require__(124);
const business_public_fields_builder_1 = __webpack_require__(125);
const list_businesses_response_1 = __webpack_require__(130);
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


/***/ }),
/* 130 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListBusinessesItemResponse = void 0;
class ListBusinessesItemResponse {
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.ListBusinessesItemResponse = ListBusinessesItemResponse;


/***/ }),
/* 131 */
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
exports.UpdateBusinessByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(6);
const suppliers_reference_lookup_port_1 = __webpack_require__(120);
const businesses_tokens_1 = __webpack_require__(122);
const business_repository_1 = __webpack_require__(124);
const business_public_fields_builder_1 = __webpack_require__(125);
const update_business_by_external_id_response_1 = __webpack_require__(132);
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


/***/ }),
/* 132 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateBusinessByExternalIdResponse = void 0;
class UpdateBusinessByExternalIdResponse {
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.UpdateBusinessByExternalIdResponse = UpdateBusinessByExternalIdResponse;


/***/ }),
/* 133 */
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
exports.DeleteBusinessByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(6);
const businesses_tokens_1 = __webpack_require__(122);
const business_repository_1 = __webpack_require__(124);
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


/***/ }),
/* 134 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PartnersModule = void 0;
const common_1 = __webpack_require__(6);
const platform_express_1 = __webpack_require__(135);
const multer_1 = __webpack_require__(136);
const infrastructure_module_1 = __webpack_require__(11);
const messaging_application_module_1 = __webpack_require__(78);
const bank_accounts_module_1 = __webpack_require__(137);
const businesses_module_1 = __webpack_require__(121);
const legal_representatives_module_1 = __webpack_require__(150);
const suppliers_module_1 = __webpack_require__(154);
const typeorm_partner_repository_1 = __webpack_require__(97);
const partners_tokens_1 = __webpack_require__(167);
const create_partner_use_case_1 = __webpack_require__(168);
const get_partner_by_external_id_use_case_1 = __webpack_require__(172);
const list_partners_use_case_1 = __webpack_require__(174);
const update_partner_by_external_id_use_case_1 = __webpack_require__(176);
const delete_partner_by_external_id_use_case_1 = __webpack_require__(178);
const create_partner_orchestrator_use_case_1 = __webpack_require__(179);
const partners_controller_1 = __webpack_require__(185);
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


/***/ }),
/* 135 */
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),
/* 136 */
/***/ ((module) => {

module.exports = require("multer");

/***/ }),
/* 137 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BankAccountsModule = void 0;
const common_1 = __webpack_require__(6);
const infrastructure_module_1 = __webpack_require__(11);
const typeorm_bank_account_repository_1 = __webpack_require__(103);
const bank_accounts_tokens_1 = __webpack_require__(138);
const create_bank_account_use_case_1 = __webpack_require__(139);
const get_bank_account_by_external_id_use_case_1 = __webpack_require__(143);
const list_bank_accounts_use_case_1 = __webpack_require__(145);
const update_bank_account_by_external_id_use_case_1 = __webpack_require__(147);
const delete_bank_account_by_external_id_use_case_1 = __webpack_require__(149);
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


/***/ }),
/* 138 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BANK_ACCOUNT_REPOSITORY = void 0;
exports.BANK_ACCOUNT_REPOSITORY = Symbol('BANK_ACCOUNT_REPOSITORY');


/***/ }),
/* 139 */
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
exports.CreateBankAccountUseCase = void 0;
const common_1 = __webpack_require__(6);
const bank_accounts_tokens_1 = __webpack_require__(138);
const bank_account_repository_1 = __webpack_require__(140);
const bank_account_public_fields_builder_1 = __webpack_require__(141);
const create_bank_account_response_1 = __webpack_require__(142);
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


/***/ }),
/* 140 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 141 */
/***/ ((__unused_webpack_module, exports) => {


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


/***/ }),
/* 142 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateBankAccountResponse = void 0;
class CreateBankAccountResponse {
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.CreateBankAccountResponse = CreateBankAccountResponse;


/***/ }),
/* 143 */
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
exports.GetBankAccountByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(6);
const bank_accounts_tokens_1 = __webpack_require__(138);
const bank_account_repository_1 = __webpack_require__(140);
const bank_account_public_fields_builder_1 = __webpack_require__(141);
const get_bank_account_by_external_id_response_1 = __webpack_require__(144);
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


/***/ }),
/* 144 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetBankAccountByExternalIdResponse = void 0;
class GetBankAccountByExternalIdResponse {
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.GetBankAccountByExternalIdResponse = GetBankAccountByExternalIdResponse;


/***/ }),
/* 145 */
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
exports.ListBankAccountsUseCase = void 0;
const common_1 = __webpack_require__(6);
const bank_accounts_tokens_1 = __webpack_require__(138);
const bank_account_repository_1 = __webpack_require__(140);
const bank_account_public_fields_builder_1 = __webpack_require__(141);
const list_bank_accounts_response_1 = __webpack_require__(146);
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


/***/ }),
/* 146 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListBankAccountsItemResponse = void 0;
class ListBankAccountsItemResponse {
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.ListBankAccountsItemResponse = ListBankAccountsItemResponse;


/***/ }),
/* 147 */
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
exports.UpdateBankAccountByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(6);
const bank_accounts_tokens_1 = __webpack_require__(138);
const bank_account_repository_1 = __webpack_require__(140);
const bank_account_public_fields_builder_1 = __webpack_require__(141);
const update_bank_account_by_external_id_response_1 = __webpack_require__(148);
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


/***/ }),
/* 148 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateBankAccountByExternalIdResponse = void 0;
class UpdateBankAccountByExternalIdResponse {
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.UpdateBankAccountByExternalIdResponse = UpdateBankAccountByExternalIdResponse;


/***/ }),
/* 149 */
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
exports.DeleteBankAccountByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(6);
const bank_accounts_tokens_1 = __webpack_require__(138);
const bank_account_repository_1 = __webpack_require__(140);
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


/***/ }),
/* 150 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LegalRepresentativesModule = void 0;
const common_1 = __webpack_require__(6);
const infrastructure_module_1 = __webpack_require__(11);
const typeorm_legal_representative_repository_1 = __webpack_require__(110);
const legal_representatives_tokens_1 = __webpack_require__(151);
const create_legal_representative_use_case_1 = __webpack_require__(152);
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


/***/ }),
/* 151 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LEGAL_REPRESENTATIVE_REPOSITORY = void 0;
exports.LEGAL_REPRESENTATIVE_REPOSITORY = Symbol('LEGAL_REPRESENTATIVE_REPOSITORY');


/***/ }),
/* 152 */
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
exports.CreateLegalRepresentativeUseCase = void 0;
const common_1 = __webpack_require__(6);
const suppliers_reference_lookup_port_1 = __webpack_require__(120);
const legal_representatives_tokens_1 = __webpack_require__(151);
const create_legal_representative_response_1 = __webpack_require__(153);
let CreateLegalRepresentativeUseCase = class CreateLegalRepresentativeUseCase {
    constructor(legal_representatives, lookup) {
        this.legal_representatives = legal_representatives;
        this.lookup = lookup;
    }
    async execute(req) {
        const person_id = await this.lookup.get_person_internal_id_by_external_id(req.person_external_id);
        if (person_id === null) {
            throw new common_1.NotFoundException('person not found');
        }
        const created = await this.legal_representatives.create({
            person_id,
            is_primary: req.is_primary,
        });
        return new create_legal_representative_response_1.CreateLegalRepresentativeResponse(created.external_id);
    }
};
exports.CreateLegalRepresentativeUseCase = CreateLegalRepresentativeUseCase;
exports.CreateLegalRepresentativeUseCase = CreateLegalRepresentativeUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(legal_representatives_tokens_1.LEGAL_REPRESENTATIVE_REPOSITORY)),
    __param(1, (0, common_1.Inject)(suppliers_reference_lookup_port_1.SUPPLIERS_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [Object, Object])
], CreateLegalRepresentativeUseCase);


/***/ }),
/* 153 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateLegalRepresentativeResponse = void 0;
class CreateLegalRepresentativeResponse {
    constructor(external_id) {
        this.external_id = external_id;
    }
}
exports.CreateLegalRepresentativeResponse = CreateLegalRepresentativeResponse;


/***/ }),
/* 154 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SuppliersModule = void 0;
const common_1 = __webpack_require__(6);
const infrastructure_module_1 = __webpack_require__(11);
const typeorm_supplier_repository_1 = __webpack_require__(100);
const suppliers_tokens_1 = __webpack_require__(155);
const create_supplier_use_case_1 = __webpack_require__(156);
const get_supplier_by_external_id_use_case_1 = __webpack_require__(160);
const list_suppliers_use_case_1 = __webpack_require__(162);
const update_supplier_by_external_id_use_case_1 = __webpack_require__(164);
const delete_supplier_by_external_id_use_case_1 = __webpack_require__(166);
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


/***/ }),
/* 155 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SUPPLIER_REPOSITORY = void 0;
exports.SUPPLIER_REPOSITORY = Symbol('SUPPLIER_REPOSITORY');


/***/ }),
/* 156 */
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
exports.CreateSupplierUseCase = void 0;
const common_1 = __webpack_require__(6);
const suppliers_reference_lookup_port_1 = __webpack_require__(120);
const suppliers_tokens_1 = __webpack_require__(155);
const supplier_repository_1 = __webpack_require__(157);
const supplier_public_fields_builder_1 = __webpack_require__(158);
const create_supplier_response_1 = __webpack_require__(159);
let CreateSupplierUseCase = class CreateSupplierUseCase {
    constructor(supplier_repository, lookup) {
        this.supplier_repository = supplier_repository;
        this.lookup = lookup;
    }
    async execute(req) {
        const business_id = await this.lookup.get_business_internal_id_by_external_id(req.business_external_id);
        if (business_id === null) {
            throw new common_1.NotFoundException('business not found');
        }
        const created = await this.supplier_repository.create({
            business_id,
            new_bank_account: req.new_bank_account,
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


/***/ }),
/* 157 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 158 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.build_supplier_public_fields = build_supplier_public_fields;
const common_1 = __webpack_require__(6);
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
        external_id: supplier.external_id,
        business_external_id,
        bank_account_external_id,
        created_at: supplier.created_at,
        updated_at: supplier.updated_at,
    };
}


/***/ }),
/* 159 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateSupplierResponse = void 0;
class CreateSupplierResponse {
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.CreateSupplierResponse = CreateSupplierResponse;


/***/ }),
/* 160 */
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
exports.GetSupplierByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(6);
const suppliers_reference_lookup_port_1 = __webpack_require__(120);
const suppliers_tokens_1 = __webpack_require__(155);
const supplier_repository_1 = __webpack_require__(157);
const supplier_public_fields_builder_1 = __webpack_require__(158);
const get_supplier_by_external_id_response_1 = __webpack_require__(161);
let GetSupplierByExternalIdUseCase = class GetSupplierByExternalIdUseCase {
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


/***/ }),
/* 161 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetSupplierByExternalIdResponse = void 0;
class GetSupplierByExternalIdResponse {
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.GetSupplierByExternalIdResponse = GetSupplierByExternalIdResponse;


/***/ }),
/* 162 */
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
exports.ListSuppliersUseCase = void 0;
const common_1 = __webpack_require__(6);
const suppliers_reference_lookup_port_1 = __webpack_require__(120);
const suppliers_tokens_1 = __webpack_require__(155);
const supplier_repository_1 = __webpack_require__(157);
const supplier_public_fields_builder_1 = __webpack_require__(158);
const list_suppliers_response_1 = __webpack_require__(163);
let ListSuppliersUseCase = class ListSuppliersUseCase {
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


/***/ }),
/* 163 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListSuppliersItemResponse = void 0;
class ListSuppliersItemResponse {
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.ListSuppliersItemResponse = ListSuppliersItemResponse;


/***/ }),
/* 164 */
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
exports.UpdateSupplierByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(6);
const suppliers_reference_lookup_port_1 = __webpack_require__(120);
const suppliers_tokens_1 = __webpack_require__(155);
const supplier_repository_1 = __webpack_require__(157);
const supplier_public_fields_builder_1 = __webpack_require__(158);
const update_supplier_by_external_id_response_1 = __webpack_require__(165);
let UpdateSupplierByExternalIdUseCase = class UpdateSupplierByExternalIdUseCase {
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


/***/ }),
/* 165 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateSupplierByExternalIdResponse = void 0;
class UpdateSupplierByExternalIdResponse {
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.UpdateSupplierByExternalIdResponse = UpdateSupplierByExternalIdResponse;


/***/ }),
/* 166 */
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
exports.DeleteSupplierByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(6);
const suppliers_tokens_1 = __webpack_require__(155);
const supplier_repository_1 = __webpack_require__(157);
let DeleteSupplierByExternalIdUseCase = class DeleteSupplierByExternalIdUseCase {
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


/***/ }),
/* 167 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PARTNER_REPOSITORY = void 0;
exports.PARTNER_REPOSITORY = Symbol('PARTNER_REPOSITORY');


/***/ }),
/* 168 */
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
exports.CreatePartnerUseCase = void 0;
const common_1 = __webpack_require__(6);
const suppliers_reference_lookup_port_1 = __webpack_require__(120);
const suppliers_tokens_1 = __webpack_require__(155);
const supplier_repository_1 = __webpack_require__(157);
const partners_tokens_1 = __webpack_require__(167);
const partner_repository_1 = __webpack_require__(169);
const partner_public_fields_builder_1 = __webpack_require__(170);
const create_partner_response_1 = __webpack_require__(171);
let CreatePartnerUseCase = class CreatePartnerUseCase {
    constructor(partner_repository, supplier_repository, lookup) {
        this.partner_repository = partner_repository;
        this.supplier_repository = supplier_repository;
        this.lookup = lookup;
    }
    async execute(req) {
        const supplier = await this.supplier_repository.find_by_external_id(req.supplier_external_id);
        if (supplier === null) {
            throw new common_1.NotFoundException('supplier not found');
        }
        const created = await this.partner_repository.create({
            supplier_id: supplier.internal_id,
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
        const fields = await (0, partner_public_fields_builder_1.build_partner_public_fields)(created, this.lookup);
        return new create_partner_response_1.CreatePartnerResponse(fields);
    }
};
exports.CreatePartnerUseCase = CreatePartnerUseCase;
exports.CreatePartnerUseCase = CreatePartnerUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(partners_tokens_1.PARTNER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(suppliers_tokens_1.SUPPLIER_REPOSITORY)),
    __param(2, (0, common_1.Inject)(suppliers_reference_lookup_port_1.SUPPLIERS_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [typeof (_a = typeof partner_repository_1.PartnerRepository !== "undefined" && partner_repository_1.PartnerRepository) === "function" ? _a : Object, typeof (_b = typeof supplier_repository_1.SupplierRepository !== "undefined" && supplier_repository_1.SupplierRepository) === "function" ? _b : Object, Object])
], CreatePartnerUseCase);


/***/ }),
/* 169 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 170 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.build_partner_public_fields = build_partner_public_fields;
const common_1 = __webpack_require__(6);
async function build_partner_public_fields(partner, lookup) {
    const supplier_external_id = await lookup.get_supplier_external_id_by_internal_id(partner.supplier_id);
    if (supplier_external_id === null) {
        throw new common_1.InternalServerErrorException();
    }
    return {
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


/***/ }),
/* 171 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePartnerResponse = void 0;
class CreatePartnerResponse {
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.CreatePartnerResponse = CreatePartnerResponse;


/***/ }),
/* 172 */
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
exports.GetPartnerByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(6);
const suppliers_reference_lookup_port_1 = __webpack_require__(120);
const partners_tokens_1 = __webpack_require__(167);
const partner_repository_1 = __webpack_require__(169);
const partner_public_fields_builder_1 = __webpack_require__(170);
const get_partner_by_external_id_response_1 = __webpack_require__(173);
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
    __metadata("design:paramtypes", [typeof (_a = typeof partner_repository_1.PartnerRepository !== "undefined" && partner_repository_1.PartnerRepository) === "function" ? _a : Object, Object])
], GetPartnerByExternalIdUseCase);


/***/ }),
/* 173 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetPartnerByExternalIdResponse = void 0;
class GetPartnerByExternalIdResponse {
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.GetPartnerByExternalIdResponse = GetPartnerByExternalIdResponse;


/***/ }),
/* 174 */
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
exports.ListPartnersUseCase = void 0;
const common_1 = __webpack_require__(6);
const suppliers_reference_lookup_port_1 = __webpack_require__(120);
const partners_tokens_1 = __webpack_require__(167);
const partner_repository_1 = __webpack_require__(169);
const partner_public_fields_builder_1 = __webpack_require__(170);
const list_partners_response_1 = __webpack_require__(175);
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
    __metadata("design:paramtypes", [typeof (_a = typeof partner_repository_1.PartnerRepository !== "undefined" && partner_repository_1.PartnerRepository) === "function" ? _a : Object, Object])
], ListPartnersUseCase);


/***/ }),
/* 175 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListPartnersItemResponse = void 0;
class ListPartnersItemResponse {
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.ListPartnersItemResponse = ListPartnersItemResponse;


/***/ }),
/* 176 */
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
exports.UpdatePartnerByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(6);
const suppliers_reference_lookup_port_1 = __webpack_require__(120);
const partners_tokens_1 = __webpack_require__(167);
const partner_repository_1 = __webpack_require__(169);
const partner_public_fields_builder_1 = __webpack_require__(170);
const update_partner_by_external_id_response_1 = __webpack_require__(177);
let UpdatePartnerByExternalIdUseCase = class UpdatePartnerByExternalIdUseCase {
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


/***/ }),
/* 177 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdatePartnerByExternalIdResponse = void 0;
class UpdatePartnerByExternalIdResponse {
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.UpdatePartnerByExternalIdResponse = UpdatePartnerByExternalIdResponse;


/***/ }),
/* 178 */
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
exports.DeletePartnerByExternalIdUseCase = void 0;
const common_1 = __webpack_require__(6);
const partners_tokens_1 = __webpack_require__(167);
const partner_repository_1 = __webpack_require__(169);
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


/***/ }),
/* 179 */
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
var CreatePartnerOrchestratorUseCase_1;
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePartnerOrchestratorUseCase = void 0;
const common_1 = __webpack_require__(6);
const crypto_1 = __webpack_require__(41);
const create_business_use_case_1 = __webpack_require__(123);
const create_business_request_1 = __webpack_require__(180);
const publish_transversal_event_use_case_1 = __webpack_require__(79);
const publish_create_partner_user_command_use_case_1 = __webpack_require__(85);
const publish_create_person_command_use_case_1 = __webpack_require__(87);
const transversal_outbound_event_dto_1 = __webpack_require__(74);
const partner_onboarding_saga_repository_port_1 = __webpack_require__(114);
const partner_user_sqs_result_reader_port_1 = __webpack_require__(117);
const partner_onboarding_files_port_1 = __webpack_require__(118);
const create_partner_orchestrator_response_1 = __webpack_require__(181);
const suppliers_reference_lookup_port_1 = __webpack_require__(120);
const create_legal_representative_use_case_1 = __webpack_require__(152);
const create_legal_representative_request_1 = __webpack_require__(182);
const create_supplier_use_case_1 = __webpack_require__(156);
const create_supplier_request_1 = __webpack_require__(183);
const create_partner_use_case_1 = __webpack_require__(168);
const create_partner_request_1 = __webpack_require__(184);
const TOTAL_STEPS = 8;
const PARTNER_ONBOARDING_FILE_FOLDERS = {
    bank_certification: 'bank-certifications',
    logo: 'logos/logo',
    co_branding: 'logos/co-branding',
};
let CreatePartnerOrchestratorUseCase = CreatePartnerOrchestratorUseCase_1 = class CreatePartnerOrchestratorUseCase {
    constructor(saga_repository, partner_user_sqs_result, files_port, suppliers_lookup, create_business, create_supplier, create_partner, create_legal_representative, publish_create_partner_user, publish_create_person, publish_transversal) {
        this.saga_repository = saga_repository;
        this.partner_user_sqs_result = partner_user_sqs_result;
        this.files_port = files_port;
        this.suppliers_lookup = suppliers_lookup;
        this.create_business = create_business;
        this.create_supplier = create_supplier;
        this.create_partner = create_partner;
        this.create_legal_representative = create_legal_representative;
        this.publish_create_partner_user = publish_create_partner_user;
        this.publish_create_person = publish_create_person;
        this.publish_transversal = publish_transversal;
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
            this.log_step(2, correlation_id, 'usuario operativo (SQS create-user) → persona; negocio; representante legal (SQS create-person)');
            await this.publish_create_partner_user.execute({
                correlation_id,
                idempotency_key: saga_external_id,
                email: command.email,
                country_code: command.country_code,
                first_name: command.first_name,
                last_name: command.last_name,
                doc_type: command.doc_type,
                doc_number: command.doc_number,
                phone: command.phone,
                city_external_id: command.city_id,
            });
            const operating_user_result = await this.partner_user_sqs_result.wait_for_completed_result(saga_external_id);
            await this.saga_repository.update_by_external_id(saga_external_id, {
                current_step: 2,
                person_external_id: operating_user_result.person_external_id,
            });
            const business = await this.create_business.execute(new create_business_request_1.CreateBusinessRequest(operating_user_result.person_external_id, command.city_id, command.entity_type, command.business_name, command.business_address, command.business_type, command.relationship_to_business, command.legal_name, command.trade_name, command.tax_id, command.year_of_establishment));
            let legal_representative_external_id = null;
            const lr = command.legal_representative;
            if (lr !== null) {
                const lr_idempotency_key = `${saga_external_id}__legal_representative`;
                await this.publish_create_person.execute({
                    correlation_id,
                    idempotency_key: lr_idempotency_key,
                    email: lr.email,
                    country_code: command.country_code,
                    first_name: lr.first_name,
                    last_name: lr.last_name,
                    doc_type: lr.doc_type,
                    doc_number: lr.doc_number,
                    phone: lr.phone,
                    city_external_id: command.city_id,
                });
                const lr_person = await this.partner_user_sqs_result.wait_for_completed_result(lr_idempotency_key);
                const lr_row = await this.create_legal_representative.execute(new create_legal_representative_request_1.CreateLegalRepresentativeRequest(lr_person.person_external_id, true));
                legal_representative_external_id = lr_row.external_id;
            }
            const bank_certification_stored = file_urls.bank_certification_url.trim().length > 0
                ? file_urls.bank_certification_url.trim()
                : null;
            const supplier_res = await this.create_supplier.execute(new create_supplier_request_1.CreateSupplierRequest(business.external_id, {
                bank_entity: command.bank_entity,
                account_number: command.account_number,
                bank_certification: bank_certification_stored,
            }));
            const logo_stored = file_urls.logo_url.trim().length > 0
                ? file_urls.logo_url.trim()
                : null;
            const co_branding_stored = file_urls.co_branding_url.trim().length > 0
                ? file_urls.co_branding_url.trim()
                : null;
            const partner_res = await this.create_partner.execute(new create_partner_request_1.CreatePartnerRequest(supplier_res.external_id, command.acronym, logo_stored, co_branding_stored, command.primary_color, command.secondary_color, command.light_color, command.notification_email, command.webhook_url, command.send_sales_rep_voucher, command.disbursement_notification_email));
            return new create_partner_orchestrator_response_1.CreatePartnerOrchestratorResponse(saga_external_id, correlation_id, credit_facility_external_id, operating_user_result.user_external_id, operating_user_result.person_external_id, legal_representative_external_id, business.external_id, file_urls.bank_certification_url, file_urls.logo_url, file_urls.co_branding_url, supplier_res.bank_account_external_id, supplier_res.external_id, partner_res.external_id);
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
    __param(1, (0, common_1.Inject)(partner_user_sqs_result_reader_port_1.PARTNER_USER_SQS_RESULT_READER_PORT)),
    __param(2, (0, common_1.Inject)(partner_onboarding_files_port_1.PARTNER_ONBOARDING_FILES_PORT)),
    __param(3, (0, common_1.Inject)(suppliers_reference_lookup_port_1.SUPPLIERS_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, typeof (_a = typeof create_business_use_case_1.CreateBusinessUseCase !== "undefined" && create_business_use_case_1.CreateBusinessUseCase) === "function" ? _a : Object, typeof (_b = typeof create_supplier_use_case_1.CreateSupplierUseCase !== "undefined" && create_supplier_use_case_1.CreateSupplierUseCase) === "function" ? _b : Object, typeof (_c = typeof create_partner_use_case_1.CreatePartnerUseCase !== "undefined" && create_partner_use_case_1.CreatePartnerUseCase) === "function" ? _c : Object, typeof (_d = typeof create_legal_representative_use_case_1.CreateLegalRepresentativeUseCase !== "undefined" && create_legal_representative_use_case_1.CreateLegalRepresentativeUseCase) === "function" ? _d : Object, typeof (_e = typeof publish_create_partner_user_command_use_case_1.PublishCreatePartnerUserCommandUseCase !== "undefined" && publish_create_partner_user_command_use_case_1.PublishCreatePartnerUserCommandUseCase) === "function" ? _e : Object, typeof (_f = typeof publish_create_person_command_use_case_1.PublishCreatePersonCommandUseCase !== "undefined" && publish_create_person_command_use_case_1.PublishCreatePersonCommandUseCase) === "function" ? _f : Object, typeof (_g = typeof publish_transversal_event_use_case_1.PublishTransversalEventUseCase !== "undefined" && publish_transversal_event_use_case_1.PublishTransversalEventUseCase) === "function" ? _g : Object])
], CreatePartnerOrchestratorUseCase);


/***/ }),
/* 180 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateBusinessRequest = void 0;
class CreateBusinessRequest {
    constructor(person_external_id, city_external_id, entity_type, business_name, business_address, business_type, relationship_to_business, legal_name, trade_name, tax_id, year_of_establishment) {
        this.person_external_id = person_external_id;
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


/***/ }),
/* 181 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePartnerOrchestratorResponse = void 0;
class CreatePartnerOrchestratorResponse {
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


/***/ }),
/* 182 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateLegalRepresentativeRequest = void 0;
class CreateLegalRepresentativeRequest {
    constructor(person_external_id, is_primary) {
        this.person_external_id = person_external_id;
        this.is_primary = is_primary;
    }
}
exports.CreateLegalRepresentativeRequest = CreateLegalRepresentativeRequest;


/***/ }),
/* 183 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateSupplierRequest = void 0;
class CreateSupplierRequest {
    constructor(business_external_id, new_bank_account) {
        this.business_external_id = business_external_id;
        this.new_bank_account = new_bank_account;
    }
}
exports.CreateSupplierRequest = CreateSupplierRequest;


/***/ }),
/* 184 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePartnerRequest = void 0;
class CreatePartnerRequest {
    constructor(supplier_external_id, acronym, logo_url, co_branding_logo_url, primary_color, secondary_color, light_color, notification_email, webhook_url, send_sales_rep_voucher, disbursement_notification_email) {
        this.supplier_external_id = supplier_external_id;
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


/***/ }),
/* 185 */
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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PartnersController = void 0;
const common_1 = __webpack_require__(6);
const config_1 = __webpack_require__(8);
const crypto_1 = __webpack_require__(41);
const platform_express_1 = __webpack_require__(135);
const swagger_1 = __webpack_require__(9);
const class_transformer_1 = __webpack_require__(44);
const class_validator_1 = __webpack_require__(45);
const create_partner_orchestrator_use_case_1 = __webpack_require__(179);
const update_partner_by_external_id_use_case_1 = __webpack_require__(176);
const partner_onboarding_files_port_1 = __webpack_require__(118);
const create_partner_payload_dto_1 = __webpack_require__(186);
const update_partner_payload_dto_1 = __webpack_require__(187);
const create_partner_payload_mapper_1 = __webpack_require__(188);
const create_partner_orchestrator_response_mapper_1 = __webpack_require__(189);
const update_partner_payload_mapper_1 = __webpack_require__(191);
const update_partner_payload_supported_guard_1 = __webpack_require__(193);
let PartnersController = class PartnersController {
    constructor(create_partner_orchestrator, update_partner, config_service, partner_files) {
        this.create_partner_orchestrator = create_partner_orchestrator;
        this.update_partner = update_partner;
        this.config_service = config_service;
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
        const app_config = this.config_service.get('config');
        const command = (0, create_partner_payload_mapper_1.map_create_partner_payload_to_command)(dto, {
            country_code: (app_config?.partner_onboarding?.default_country_code ?? 'CO').trim() ||
                null,
        });
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
                co_branding_merge =
                    urls.co_branding_url.length > 0 ? urls.co_branding_url : null;
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
    (0, swagger_1.ApiOperation)({
        summary: 'Alta orquestada de partner (saga + SQS)',
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                payload: {
                    type: 'string'
                },
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
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Actualizar partner (parcial)',
        description: 'Multipart opcional; `payload` es JSON **camelCase** **parcial**: todas las claves raíz (`operatingUser`, `business`, `partner`, `bankAccount`, `creditFacility`, `category`) son opcionales. ' +
            '**Reglas actuales:** solo se persisten campos de `partner` y URLs finales de `logo` / `coBranding` (archivos multipart o `logoUrl` / `coBrandingLogoUrl`). ' +
            'Cualquier otra sección con valores definidos → **501 Not Implemented**. ' +
            'Debe haber al menos un cambio en `partner` o subida de logo/coBranding. ' +
            '`bankCertification` en PATCH → 501. Ver `UpdatePartnerPayloadDto` en Swagger para forma de cada sección cuando se habiliten.',
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                payload: {
                    type: 'string',
                    description: 'JSON parcial opcional, camelCase; mismas secciones que POST pero todas opcionales (UpdatePartnerPayloadDto). Soporte persistido hoy: solo `partner` (+ logos).',
                },
                bankCertification: { type: 'string', format: 'binary' },
                logo: { type: 'string', format: 'binary' },
                coBranding: { type: 'string', format: 'binary' },
            },
        },
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Entidad partner actualizada (campos públicos).',
    }),
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
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], PartnersController.prototype, "update", null);
exports.PartnersController = PartnersController = __decorate([
    (0, swagger_1.ApiTags)('partners'),
    (0, swagger_1.ApiExtraModels)(create_partner_payload_dto_1.CreatePartnerPayloadDto, update_partner_payload_dto_1.UpdatePartnerPayloadDto),
    (0, common_1.Controller)('partners'),
    __param(3, (0, common_1.Inject)(partner_onboarding_files_port_1.PARTNER_ONBOARDING_FILES_PORT)),
    __metadata("design:paramtypes", [typeof (_a = typeof create_partner_orchestrator_use_case_1.CreatePartnerOrchestratorUseCase !== "undefined" && create_partner_orchestrator_use_case_1.CreatePartnerOrchestratorUseCase) === "function" ? _a : Object, typeof (_b = typeof update_partner_by_external_id_use_case_1.UpdatePartnerByExternalIdUseCase !== "undefined" && update_partner_by_external_id_use_case_1.UpdatePartnerByExternalIdUseCase) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object, Object])
], PartnersController);


/***/ }),
/* 186 */
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
exports.CreatePartnerPayloadDto = exports.PartnerCategoryPayloadDto = exports.CreatePartnerCreditFacilityPayloadDto = exports.CreatePartnerBankAccountPayloadDto = exports.CreatePartnerPartnerSectionPayloadDto = exports.CreatePartnerBusinessPayloadDto = exports.LegalRepresentativePayloadDto = exports.OperatingUserPayloadDto = void 0;
const swagger_1 = __webpack_require__(9);
const class_transformer_1 = __webpack_require__(44);
const class_validator_1 = __webpack_require__(45);
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


/***/ }),
/* 187 */
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
exports.UpdatePartnerPayloadDto = exports.UpdateCreditFacilityPayloadDto = exports.UpdateBankAccountPayloadDto = exports.UpdatePartnerSectionPayloadDto = exports.UpdateBusinessPayloadDto = exports.UpdateLegalRepresentativePayloadDto = exports.UpdateOperatingUserPayloadDto = void 0;
const swagger_1 = __webpack_require__(9);
const class_transformer_1 = __webpack_require__(44);
const class_validator_1 = __webpack_require__(45);
const shared_1 = __webpack_require__(26);
const create_partner_payload_dto_1 = __webpack_require__(186);
class UpdateOperatingUserPayloadDto {
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
        enum: shared_1.CreditFacilitiesStatuses,
        description: 'Estado operativo del partner (`active` | `inactive`).',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)([shared_1.CreditFacilitiesStatuses.ACTIVE, shared_1.CreditFacilitiesStatuses.INACTIVE]),
    __metadata("design:type", typeof (_a = typeof shared_1.CreditFacilitiesStatuses !== "undefined" && shared_1.CreditFacilitiesStatuses) === "function" ? _a : Object)
], UpdatePartnerSectionPayloadDto.prototype, "state", void 0);
class UpdateBankAccountPayloadDto {
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


/***/ }),
/* 188 */
/***/ ((__unused_webpack_module, exports) => {


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


/***/ }),
/* 189 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.map_orchestrator_result_to_http = map_orchestrator_result_to_http;
const create_partner_orchestrator_response_dto_1 = __webpack_require__(190);
function map_orchestrator_result_to_http(res) {
    const dto = new create_partner_orchestrator_response_dto_1.CreatePartnerOrchestratorResponseDto();
    dto.sagaExternalId = res.saga_external_id;
    dto.correlationId = res.correlation_id;
    dto.creditFacilityExternalId = res.credit_facility_external_id;
    dto.userExternalId = res.user_external_id;
    dto.personExternalId = res.person_external_id;
    dto.legalRepresentativeExternalId = res.legal_representative_external_id;
    dto.businessExternalId = res.business_external_id;
    dto.bankCertificationUrl = res.bank_certification_url;
    dto.logoUrl = res.logo_url;
    dto.coBrandingUrl = res.co_branding_url;
    dto.bankAccountExternalId = res.bank_account_external_id;
    dto.supplierExternalId = res.supplier_external_id;
    dto.partnerExternalId = res.partner_external_id;
    return dto;
}


/***/ }),
/* 190 */
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
exports.CreatePartnerOrchestratorResponseDto = void 0;
const swagger_1 = __webpack_require__(9);
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
    (0, swagger_1.ApiProperty)({
        nullable: true,
        description: 'Pendiente hasta que transversal-ms complete create-partner-user (mensaje SQS). Correlación: correlationId.',
    }),
    __metadata("design:type", Object)
], CreatePartnerOrchestratorResponseDto.prototype, "userExternalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        nullable: true,
        description: 'Pendiente hasta creación asíncrona de persona en transversal-ms.',
    }),
    __metadata("design:type", Object)
], CreatePartnerOrchestratorResponseDto.prototype, "personExternalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        nullable: true,
        description: 'Representante legal registrado en suppliers_schema (si vino en el payload).',
    }),
    __metadata("design:type", Object)
], CreatePartnerOrchestratorResponseDto.prototype, "legalRepresentativeExternalId", void 0);
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
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], CreatePartnerOrchestratorResponseDto.prototype, "bankAccountExternalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreatePartnerOrchestratorResponseDto.prototype, "supplierExternalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreatePartnerOrchestratorResponseDto.prototype, "partnerExternalId", void 0);


/***/ }),
/* 191 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.map_update_partner_payload_to_request = map_update_partner_payload_to_request;
const update_partner_by_external_id_request_1 = __webpack_require__(192);
function map_update_partner_payload_to_request(external_id, dto, urls) {
    const p = dto.partner;
    return new update_partner_by_external_id_request_1.UpdatePartnerByExternalIdRequest(external_id, p?.acronym, urls.logo_url, urls.co_branding_logo_url, p?.primaryColor, p?.secondaryColor, p?.lightColor, p?.notificationEmail, p?.webhookUrl, p?.sendSalesRepVoucher, p?.disbursementNotificationEmail, p?.state);
}


/***/ }),
/* 192 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdatePartnerByExternalIdRequest = void 0;
class UpdatePartnerByExternalIdRequest {
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


/***/ }),
/* 193 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.assert_update_partner_payload_supported = assert_update_partner_payload_supported;
exports.update_payload_has_partner_changes = update_payload_has_partner_changes;
const common_1 = __webpack_require__(6);
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


/***/ }),
/* 194 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(8);
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


/***/ }),
/* 195 */
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
exports.get_sqs_config_from_env = get_sqs_config_from_env;
const config_1 = __webpack_require__(8);
const class_transformer_1 = __webpack_require__(44);
const class_validator_1 = __webpack_require__(45);
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
        wait_time_seconds: env.transversal_sqs_wait_time_seconds,
        max_number_of_messages: env.transversal_sqs_max_number_of_messages,
        visibility_timeout_seconds: env.transversal_sqs_visibility_timeout_seconds,
        delete_on_validation_error: env.transversal_sqs_delete_on_validation_error,
    };
}
exports.sqs_config = (0, config_1.registerAs)('sqs', () => get_sqs_config_from_env());


/***/ }),
/* 196 */
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
const health_response_dto_1 = __webpack_require__(197);
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


/***/ }),
/* 197 */
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