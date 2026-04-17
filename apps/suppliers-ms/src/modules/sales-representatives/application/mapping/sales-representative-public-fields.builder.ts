import type { SuppliersReferenceLookupPort } from '@common/ports/suppliers-reference-lookup.port';
import { UserState } from '@platam/shared';
import { SalesRepresentative } from '@modules/sales-representatives/domain/entities/sales-representative.entity';

export interface SalesRepresentativePublicFields {
  internal_id: number;
  external_id: string;
  partner_external_id: string;
  user_external_id: string | null;
  /** Nombre y apellido de `person` del usuario (sin email). */
  user_full_name: string | null;
  user_display_name: string | null;
  user_role_name: string | null;
  user_state: UserState | null;
  created_at: Date;
  updated_at: Date;
}

export async function build_sales_representative_public_fields(
  rep: SalesRepresentative,
  lookup: SuppliersReferenceLookupPort,
): Promise<SalesRepresentativePublicFields | null> {
  const partner_external_id = await lookup.get_partner_external_id_by_internal_id(
    rep.partner_id,
  );
  if (partner_external_id === null) {
    return null;
  }
  const lu = rep.loaded_user;
  const user_external_id =
    lu !== undefined
      ? lu.external_id
      : rep.user_id === null
        ? null
        : await lookup.get_user_external_id_by_internal_id(rep.user_id);

  return {
    internal_id: rep.internal_id,
    external_id: rep.external_id,
    partner_external_id,
    user_external_id,
    user_full_name: rep.user_full_name,
    user_display_name: lu?.display_name ?? null,
    user_role_name: lu?.role_name ?? null,
    user_state: lu?.state ?? null,
    created_at: rep.created_at,
    updated_at: rep.updated_at,
  };
}
