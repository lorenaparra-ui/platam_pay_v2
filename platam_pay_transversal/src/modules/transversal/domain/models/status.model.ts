export class Status {
  constructor(
    public readonly id: number,
    public readonly externalId: string,
    public readonly entityType: string,
    public readonly code: string,
    public readonly displayName: string,
    public readonly description: string | null,
    public readonly isActive: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
