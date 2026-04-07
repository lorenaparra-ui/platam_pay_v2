import { SalesRepresentativePublicFields } from '@modules/sales-representatives/application/mapping/sales-representative-public-fields.builder';

export class GetSalesRepresentativeByExternalIdResponse
  implements SalesRepresentativePublicFields
{
  internal_id: number;
  external_id: string;
  partner_external_id: string;
  user_external_id: string | null;
  created_at: Date;
  updated_at: Date;

  constructor(fields: SalesRepresentativePublicFields) {
    Object.assign(this, fields);
  }
}
