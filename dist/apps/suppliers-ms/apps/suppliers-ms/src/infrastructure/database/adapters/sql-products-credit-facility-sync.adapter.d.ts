import { DataSource } from 'typeorm';
import type { Statuses } from '@platam/shared';
import type { ProductsCreditFacilitySyncPort } from '@modules/partners/application/ports/products-credit-facility-sync.port';
export declare class SqlProductsCreditFacilitySyncAdapter implements ProductsCreditFacilitySyncPort {
    private readonly data_source;
    private readonly logger;
    constructor(data_source: DataSource);
    create_credit_facility(input: Readonly<{
        credit_facility_external_id: string;
        contract_id: string | null;
        total_limit: string;
        state: Statuses;
    }>): Promise<{
        internal_id: number;
    }>;
    update_credit_facility_state(credit_facility_external_id: string, state: Statuses): Promise<void>;
}
