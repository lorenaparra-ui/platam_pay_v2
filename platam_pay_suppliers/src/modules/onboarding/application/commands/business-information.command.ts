/**
 * Datos del negocio. Capa application.
 */
export interface BusinessInformationCommand {
  businessName: string;
  businessType: string;
  businessCity: string;
  businessAddress: string;
  numberOfEmployees: number;
  numberOfLocations: number;
  seniority: string;
  flagshipM2?: number;
  hasRent: boolean;
  rentAmount?: number;
}
