import { LegalRepresentativeEntity } from '@app/suppliers-data';
import { LegalRepresentative } from '@modules/legal-representatives/domain/entities/legal-representative.entity';
export declare const LegalRepresentativeMapper: {
    to_domain(row: LegalRepresentativeEntity): LegalRepresentative;
    from_raw_row(row: Record<string, unknown>): LegalRepresentative;
};
