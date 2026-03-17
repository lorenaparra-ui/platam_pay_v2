export class City {
  constructor(
    public readonly id: number,
    public readonly externalId: string,
    public readonly countryName: string,
    public readonly countryCode: string,
    public readonly stateName: string,
    public readonly stateCode: string | null,
    public readonly cityName: string,
    public readonly currencyId: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
