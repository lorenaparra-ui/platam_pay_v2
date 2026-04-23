import { InternalServerErrorException } from '@nestjs/common';
import { SuppliersReferenceLookupPort } from '@common/ports/suppliers-reference-lookup.port';
import { Business } from '@modules/businesses/domain/entities/business.entity';

export interface BusinessPublicFields {
  internal_id: number;
  external_id: string;
  person_external_id: string;
  city_external_id: string | null;
  entity_type: string;
  business_name: string | null;
  business_address: string | null;
  business_type: string | null;
  relationship_to_business: string | null;
  legal_name: string | null;
  trade_name: string | null;
  tax_id: string | null;
  year_of_establishment: number | null;
  created_at: Date;
  updated_at: Date;
}

export async function build_business_public_fields(
  business: Business,
  lookup: SuppliersReferenceLookupPort,
): Promise<BusinessPublicFields> {
  const [person_external_id, city_external_id] = await Promise.all([
    lookup.get_person_external_id_by_internal_id(business.person_id),
    business.city_id === null
      ? Promise.resolve(null)
      : lookup.get_city_external_id_by_internal_id(business.city_id),
  ]);

  if (!person_external_id) {
    throw new InternalServerErrorException();
  }

  return {
    internal_id: business.internal_id,
    external_id: business.external_id,
    person_external_id,
    city_external_id,
    entity_type: business.entity_type,
    business_name: business.business_name,
    business_address: business.business_address,
    business_type: business.business_type,
    relationship_to_business: business.relationship_to_business,
    legal_name: business.legal_name,
    trade_name: business.trade_name,
    tax_id: business.tax_id,
    year_of_establishment: business.year_of_establishment,
    created_at: business.created_at,
    updated_at: business.updated_at,
  };
}
