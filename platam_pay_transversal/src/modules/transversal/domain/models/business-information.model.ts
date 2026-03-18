import { LegalRepresentative } from './legal-representative.model';

export class BusinessInformation {
  constructor(
    public readonly legalName: string,
    public readonly taxId: string,
    public readonly legalRepresentatives: LegalRepresentative[],
  ) {}
}
