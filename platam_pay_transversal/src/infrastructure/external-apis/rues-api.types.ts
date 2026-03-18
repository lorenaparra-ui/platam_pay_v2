export interface RuesApiResultItem {
  name: string;
  nit: string;
  category?: string;
  status?: string;
  legalRep?: string;
  tipoSociedad?: string;
  tipoOrganizacion?: string;
  fechaRenovacion?: string;
}

export interface RuesApiResponse {
  success: boolean;
  results?: RuesApiResultItem[];
}
