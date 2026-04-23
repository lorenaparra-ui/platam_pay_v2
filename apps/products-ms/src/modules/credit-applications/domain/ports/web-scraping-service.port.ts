export interface BdmeQueryParams {
  doc_number: string;
  doc_type: string;
}

export interface BdmeQueryResult {
  query_result: Record<string, unknown>;
}

export interface RamaJudicialQueryParams {
  first_name: string;
  apellido1: string;
  apellido2: string;
  doc_number: string;
}

export interface RamaJudicialQueryResult {
  query_result: Record<string, unknown>;
}

export interface WebScrapingServicePort {
  query_bdme(params: BdmeQueryParams): Promise<BdmeQueryResult>;
  query_rama_judicial(params: RamaJudicialQueryParams): Promise<RamaJudicialQueryResult>;
}
