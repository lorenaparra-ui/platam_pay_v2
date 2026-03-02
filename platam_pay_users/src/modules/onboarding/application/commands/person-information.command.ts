/**
 * Información de persona natural o representante legal.
 * Capa application.
 */
export interface PersonInformationCommand {
  firstName: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  email: string;
  phone: string;
}
