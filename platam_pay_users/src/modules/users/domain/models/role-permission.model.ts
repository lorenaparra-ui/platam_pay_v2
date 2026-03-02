export class RolePermission {
  constructor(
    public readonly id: number,
    public readonly externalId: string,
    public readonly roleId: number,
    public readonly permissionId: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
