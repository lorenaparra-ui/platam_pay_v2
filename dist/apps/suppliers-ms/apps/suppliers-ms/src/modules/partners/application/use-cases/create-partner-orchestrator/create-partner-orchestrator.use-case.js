"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePartnerOrchestratorUseCase = void 0;
const common_1 = require("@nestjs/common");
const shared_1 = require("../../../../../../../../libs/shared/src");
const create_business_use_case_1 = require("../../../../businesses/application/use-cases/create-business/create-business.use-case");
const create_business_request_1 = require("../../../../businesses/application/use-cases/create-business/create-business.request");
const create_bank_account_use_case_1 = require("../../../../bank-accounts/application/use-cases/create-bank-account/create-bank-account.use-case");
const create_bank_account_request_1 = require("../../../../bank-accounts/application/use-cases/create-bank-account/create-bank-account.request");
const publish_create_person_command_use_case_1 = require("../../../../messaging/application/use-cases/publish-create-person-command.use-case");
const publish_create_credit_facility_command_use_case_1 = require("../../../../messaging/application/use-cases/publish-create-credit-facility-command.use-case");
const publish_create_categories_command_use_case_1 = require("../../../../messaging/application/use-cases/publish-create-categories-command.use-case");
const partner_onboarding_saga_repository_port_1 = require("../../ports/partner-onboarding-saga.repository.port");
const partner_user_sqs_result_reader_port_1 = require("../../ports/partner-user-sqs-result-reader.port");
const partner_onboarding_files_port_1 = require("../../ports/partner-onboarding-files.port");
const products_credit_facility_sync_port_1 = require("../../ports/products-credit-facility-sync.port");
const partner_saga_compensation_port_1 = require("../../ports/partner-saga-compensation.port");
const create_partner_orchestrator_response_1 = require("./create-partner-orchestrator.response");
const suppliers_reference_lookup_port_1 = require("../../../../../common/ports/suppliers-reference-lookup.port");
const create_legal_representative_use_case_1 = require("../../../../legal-representatives/application/use-cases/create-legal-representative/create-legal-representative.use-case");
const create_legal_representative_request_1 = require("../../../../legal-representatives/application/use-cases/create-legal-representative/create-legal-representative.request");
const create_supplier_use_case_1 = require("../../../../suppliers/application/use-cases/create-supplier/create-supplier.use-case");
const create_supplier_request_1 = require("../../../../suppliers/application/use-cases/create-supplier/create-supplier.request");
const create_partner_use_case_1 = require("../create-partner/create-partner.use-case");
const create_partner_request_1 = require("../create-partner/create-partner.request");
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
            status: 'RUNNING',
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
            this.log_step(1, correlation_id, 'crear credit_facility INACTIVE → products_schema');
            const cf = await this.credit_facility_sync.create_credit_facility({
                credit_facility_external_id,
                contract_id: command.contract_id,
                total_limit: command.total_limit,
                state: shared_1.Statuses.INACTIVE,
            });
            created.credit_facility_external_id = credit_facility_external_id;
            await this.publish_create_credit_facility.execute({
                correlation_id,
                external_id: credit_facility_external_id,
                contract_id: command.contract_id,
                total_limit: command.total_limit,
                state: shared_1.Statuses.INACTIVE,
            });
            await this.saga_repository.update_by_external_id(saga_external_id, { current_step: 1 });
            this.log_step(2, correlation_id, 'crear bank_account');
            const bank_cert_url = file_urls.bank_certification_url.trim().length > 0
                ? file_urls.bank_certification_url.trim()
                : null;
            const bank_account = await this.create_bank_account.execute(new create_bank_account_request_1.CreateBankAccountRequest(command.bank_entity, command.account_number, bank_cert_url));
            created.bank_account_external_id = bank_account.external_id;
            await this.saga_repository.update_by_external_id(saga_external_id, {
                current_step: 2,
                bank_account_external_id: bank_account.external_id,
            });
            this.log_step(3, correlation_id, 'publicar create-person (RL) → SQS');
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
                    current_step: 3,
                    person_external_id: lr_person_external_id,
                });
            }
            else {
                await this.saga_repository.update_by_external_id(saga_external_id, { current_step: 3 });
            }
            this.log_step(4, correlation_id, 'crear business');
            if (person_internal_id === null) {
                throw new Error('person_internal_id requerido para crear business (legal_representative es null)');
            }
            const business = await this.create_business.execute(new create_business_request_1.CreateBusinessRequest(person_internal_id, command.city_id, command.entity_type, command.business_name, command.business_address, command.business_type, command.relationship_to_business, command.legal_name, command.trade_name, command.tax_id, command.year_of_establishment));
            created.business_external_id = business.external_id;
            await this.saga_repository.update_by_external_id(saga_external_id, {
                current_step: 4,
                business_external_id: business.external_id,
            });
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
                credit_facility_id: cf.internal_id,
                partner_id: partner.internal_id,
                categories: command.categories,
            });
            await this.saga_repository.update_by_external_id(saga_external_id, { current_step: 8 });
            this.log_step(9, correlation_id, 'activar credit_facility → ACTIVE');
            await this.credit_facility_sync.update_credit_facility_state(credit_facility_external_id, shared_1.Statuses.ACTIVE);
            await this.saga_repository.update_by_external_id(saga_external_id, {
                current_step: 9,
                status: 'COMPLETED',
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
                status: 'COMPENSATING',
                error_message: message,
            });
            await this.compensate(correlation_id, created);
            await this.saga_repository.update_by_external_id(saga_external_id, {
                status: 'FAILED',
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
        if (created.business_external_id) {
            await this.compensation.delete_business(created.business_external_id);
        }
        if (created.bank_account_external_id) {
            await this.compensation.delete_bank_account(created.bank_account_external_id);
        }
        if (created.credit_facility_external_id) {
            await this.compensation.delete_credit_facility(created.credit_facility_external_id);
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
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, create_bank_account_use_case_1.CreateBankAccountUseCase,
        create_business_use_case_1.CreateBusinessUseCase,
        create_supplier_use_case_1.CreateSupplierUseCase,
        create_partner_use_case_1.CreatePartnerUseCase,
        create_legal_representative_use_case_1.CreateLegalRepresentativeUseCase,
        publish_create_person_command_use_case_1.PublishCreatePersonCommandUseCase,
        publish_create_credit_facility_command_use_case_1.PublishCreateCreditFacilityCommandUseCase,
        publish_create_categories_command_use_case_1.PublishCreateCategoriesCommandUseCase])
], CreatePartnerOrchestratorUseCase);
//# sourceMappingURL=create-partner-orchestrator.use-case.js.map