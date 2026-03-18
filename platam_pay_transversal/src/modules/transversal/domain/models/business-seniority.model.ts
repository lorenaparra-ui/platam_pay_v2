export class BusinessSeniority {
  constructor(
    public readonly id: number,
    public readonly externalId: string,
    public readonly description: string,
    public readonly rangeStart: number,
    public readonly rangeEnd: number,
  ) {}
}