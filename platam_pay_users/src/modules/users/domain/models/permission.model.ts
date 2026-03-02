export class Permission {
  constructor(
    public readonly id: number,
    public readonly externalId: string,
    public readonly code: string,
    public readonly description: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
