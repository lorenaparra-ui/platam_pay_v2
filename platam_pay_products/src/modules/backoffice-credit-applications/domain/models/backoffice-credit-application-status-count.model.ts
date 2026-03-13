import type { CreditApplicationStatusCode } from "./credit-application-status-code.model";

export interface BackofficeCreditApplicationStatusCount {
  statusCode: CreditApplicationStatusCode;
  total: number;
}
