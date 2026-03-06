import { LegalRepresentative } from './legal-representative.model';

export class BusinessInformation {
  constructor(
    public readonly legal_name: string,
    public readonly tax_id: string,
    public readonly legal_representatives: LegalRepresentative[],
  ) {}
}
