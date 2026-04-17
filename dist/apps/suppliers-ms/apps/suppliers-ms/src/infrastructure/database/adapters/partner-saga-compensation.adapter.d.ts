import { DataSource, Repository } from 'typeorm';
import { BankAccountEntity, BusinessEntity, PartnerEntity, SupplierEntity } from '@app/suppliers-data';
import type { PartnerSagaCompensationPort } from '@modules/partners/application/ports/partner-saga-compensation.port';
export declare class PartnerSagaCompensationAdapter implements PartnerSagaCompensationPort {
    private readonly data_source;
    private readonly partner_repo;
    private readonly supplier_repo;
    private readonly business_repo;
    private readonly bank_account_repo;
    private readonly logger;
    constructor(data_source: DataSource, partner_repo: Repository<PartnerEntity>, supplier_repo: Repository<SupplierEntity>, business_repo: Repository<BusinessEntity>, bank_account_repo: Repository<BankAccountEntity>);
    delete_credit_facility(credit_facility_external_id: string): Promise<void>;
    delete_partner(partner_external_id: string): Promise<void>;
    delete_supplier(supplier_external_id: string): Promise<void>;
    delete_business(business_external_id: string): Promise<void>;
    delete_bank_account(bank_account_external_id: string): Promise<void>;
}
