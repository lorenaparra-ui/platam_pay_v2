export interface ExperianHcpnParams {
  doc_number: string;
  last_name: string;
}

export interface ExperianHcpnResult {
  credit_report: Record<string, unknown>;
  credit_score: number;
}

export interface ExperianServicePort {
  query_hcpn(params: ExperianHcpnParams): Promise<ExperianHcpnResult>;
}
