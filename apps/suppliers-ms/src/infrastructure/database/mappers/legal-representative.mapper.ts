import { LegalRepresentativeEntity } from '@app/suppliers-data';
import { LegalRepresentative } from '@modules/legal-representatives/domain/entities/legal-representative.entity';

export const LegalRepresentativeMapper = {
  to_domain(row: LegalRepresentativeEntity): LegalRepresentative {
    return new LegalRepresentative(
      Number(row.id),
      row.externalId,
      row.businessId,
      row.personId,
      row.isPrimary,
      row.createdAt,
      row.updatedAt,
    );
  },

  from_raw_row(row: Record<string, unknown>): LegalRepresentative {
    return new LegalRepresentative(
      Number(row.id),
      String(row.external_id),
      Number(row.business_id),
      Number(row.person_id),
      Boolean(row.is_primary),
      row.created_at as Date,
      row.updated_at as Date,
    );
  },
};
