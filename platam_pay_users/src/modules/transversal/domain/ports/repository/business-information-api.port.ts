import { BusinessInformation } from '../models/business-information.model';

export const BUSINESS_INFORMATION_API = 'BUSINESS_INFORMATION_API';

export interface BusinessInformationApiPort {
  getByTaxId(taxId: string): Promise<BusinessInformation | null>;
}
