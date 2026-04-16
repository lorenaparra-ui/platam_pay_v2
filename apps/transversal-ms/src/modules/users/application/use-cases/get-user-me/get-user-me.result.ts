export type UserMeHierarchy = Readonly<{
  parentId: string | null;
  /** Reservado: vínculo partner en BD cuando exista columna/FK explícita. */
  partnerId: string | null;
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
