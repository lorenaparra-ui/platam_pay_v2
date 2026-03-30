import { BusinessEntity } from '@app/suppliers-data';
import { Business } from '@modules/businesses/domain/entities/business.entity';

export class BusinessMapper {
  static to_domain(row: BusinessEntity): Business {
    return new Business(
      row.id,
      row.externalId,
      row.personId,
      row.cityId ?? null,
      row.entityType,
      row.businessName ?? null,
      row.businessAddress ?? null,
      row.businessType ?? null,
      row.relationshipToBusiness ?? null,
      row.legalName ?? null,
      row.tradeName ?? null,
      row.taxId ?? null,
      row.yearOfEstablishment ?? null,
      row.createdAt,
      row.updatedAt,
    );
  }

  static from_raw_row(row: Record<string, unknown>): Business {
    return new Business(
      Number(row['id']),
      String(row['external_id']),
      Number(row['person_id']),
      row['city_id'] === null || row['city_id'] === undefined
        ? null
        : Number(row['city_id']),
      String(row['entity_type']),
      (row['business_name'] as string | null) ?? null,
      (row['business_address'] as string | null) ?? null,
      (row['business_type'] as string | null) ?? null,
      (row['relationship_to_business'] as string | null) ?? null,
      (row['legal_name'] as string | null) ?? null,
      (row['trade_name'] as string | null) ?? null,
      (row['tax_id'] as string | null) ?? null,
      row['year_of_establishment'] === null ||
      row['year_of_establishment'] === undefined
        ? null
        : Number(row['year_of_establishment']),
      new Date(String(row['created_at'])),
      new Date(String(row['updated_at'])),
    );
  }
}
