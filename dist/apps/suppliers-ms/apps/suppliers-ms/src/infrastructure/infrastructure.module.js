"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfrastructureModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const postgres_type_orm_config_service_1 = require("./database/services/postgres-type-orm-config.service");
const sqs_module_1 = require("./messaging/sqs/sqs.module");
const messaging_application_module_1 = require("../modules/messaging/messaging-application.module");
const typeorm_business_repository_1 = require("./database/repositories/typeorm-business.repository");
const typeorm_partner_repository_1 = require("./database/repositories/typeorm-partner.repository");
const typeorm_supplier_repository_1 = require("./database/repositories/typeorm-supplier.repository");
const typeorm_bank_account_repository_1 = require("./database/repositories/typeorm-bank-account.repository");
const typeorm_suppliers_reference_lookup_adapter_1 = require("./database/common/typeorm-suppliers-reference-lookup.adapter");
const typeorm_partner_onboarding_saga_repository_1 = require("./database/repositories/typeorm-partner-onboarding-saga.repository");
const sql_products_credit_facility_sync_adapter_1 = require("./database/adapters/sql-products-credit-facility-sync.adapter");
const typeorm_partner_user_sqs_result_poll_adapter_1 = require("./database/adapters/typeorm-partner-user-sqs-result-poll.adapter");
const partner_saga_compensation_adapter_1 = require("./database/adapters/partner-saga-compensation.adapter");
const typeorm_legal_representative_repository_1 = require("./database/repositories/typeorm-legal-representative.repository");
const typeorm_sales_representative_repository_1 = require("./database/repositories/typeorm-sales-representative.repository");
const sqs_transversal_user_person_writer_adapter_1 = require("./messaging/sqs/adapters/sqs-transversal-user-person-writer.adapter");
const partner_onboarding_saga_repository_port_1 = require("../modules/partners/application/ports/partner-onboarding-saga.repository.port");
const products_credit_facility_sync_port_1 = require("../modules/partners/application/ports/products-credit-facility-sync.port");
const transversal_user_person_writer_port_1 = require("../modules/partners/application/ports/transversal-user-person-writer.port");
const partner_user_sqs_result_reader_port_1 = require("../modules/partners/application/ports/partner-user-sqs-result-reader.port");
const partner_onboarding_files_port_1 = require("../modules/partners/application/ports/partner-onboarding-files.port");
const partner_saga_compensation_port_1 = require("../modules/partners/application/ports/partner-saga-compensation.port");
const sqs_partner_onboarding_files_adapter_1 = require("./messaging/sqs/adapters/sqs-partner-onboarding-files.adapter");
const suppliers_reference_lookup_port_1 = require("../common/ports/suppliers-reference-lookup.port");
const suppliers_data_1 = require("../../../../libs/suppliers-data/src");
const transversal_data_1 = require("../../../../libs/transversal-data/src");
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
//# sourceMappingURL=infrastructure.module.js.map