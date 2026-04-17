export declare class CreateBankAccountRequest {
    readonly bank_entity: string;
    readonly account_number: string;
    readonly bank_certification: string | null;
    constructor(bank_entity: string, account_number: string, bank_certification: string | null);
}
