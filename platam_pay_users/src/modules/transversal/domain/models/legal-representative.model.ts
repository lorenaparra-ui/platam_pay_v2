export class LegalRepresentative {
  constructor(
    public readonly name: string,
    public readonly document_type: string,
    public readonly document_number: string,
    public readonly role: string,
  ) {}
}
