export type UserMeHierarchy = Readonly<{
  parentId: string | null;
  /** external_id UUID del partner en BD (suppliers_schema.partners.external_id). Poblado para PartnerRoles; null para back-office o si no existe vínculo. */
  partnerId: string | null;
  /** external_id UUID del registro en suppliers_schema.sales_representatives. Sólo para SALES_REPRESENTATIVE; null en caso contrario. */
  salesRepExternalId: string | null;
}>;

export type UserMeProfile = Readonly<{
  externalId: string;
  email: string;
  fullName: string;
  role: string;
  hierarchy: UserMeHierarchy;
}>;

export class GetUserMeResult {
  constructor(
    readonly user: UserMeProfile,
    readonly permissions: readonly string[],
  ) {}
}
