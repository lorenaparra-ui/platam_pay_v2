export declare class UpdateBankAccountByExternalIdRequest {
    readonly external_id: string;
    readonly bank_entity: string | undefined;
    readonly account_number: string | undefined;
    readonly bank_certification: string | null | undefined;
    constructor(external_id: string, bank_entity: string | undefined, account_number: string | undefined, bank_certification: string | null | undefined);
}
