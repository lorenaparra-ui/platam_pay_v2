export class SalesRepresentative {
  constructor(
    public readonly id: number,
    public readonly externalId: string,
    public readonly partnerId: number,
    public readonly userId: number | null,
    public readonly name: string,
    public readonly role: string,
    public readonly statusId: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
