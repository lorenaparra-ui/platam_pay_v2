export declare const PARTNER_SAGA_COMPENSATION_PORT: unique symbol;
export interface PartnerSagaCompensationPort {
    delete_credit_facility(credit_facility_external_id: string): Promise<void>;
    delete_partner(partner_external_id: string): Promise<void>;
    delete_supplier(supplier_external_id: string): Promise<void>;
    delete_business(business_external_id: string): Promise<void>;
    delete_bank_account(bank_account_external_id: string): Promise<void>;
}
