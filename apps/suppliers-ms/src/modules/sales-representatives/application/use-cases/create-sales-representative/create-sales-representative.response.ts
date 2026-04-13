import { UserState } from '@platam/shared';
import { SalesRepresentativePublicFields } from '@modules/sales-representatives/application/mapping/sales-representative-public-fields.builder';

export class CreateSalesRepresentativeResponse implements SalesRepresentativePublicFields {
  internal_id: number;
  external_id: string;
  partner_external_id: string;
  user_external_id: string | null;
  user_display_name: string | null;
  user_role_name: string | null;
  user_state: UserState | null;
  created_at: Date;
  updated_at: Date;

  constructor(fields: SalesRepresentativePublicFields) {
    Object.assign(this, fields);
  }
}
