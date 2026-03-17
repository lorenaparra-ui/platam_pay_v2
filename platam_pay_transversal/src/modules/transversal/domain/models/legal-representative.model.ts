export class LegalRepresentative {
  constructor(
    public readonly name: string,
    public readonly documentType: string,
    public readonly documentNumber: string,
    public readonly role: string,
  ) {}
}
