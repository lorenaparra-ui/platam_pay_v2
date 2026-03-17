import type { CreditApplicationStatusCode } from "./credit-application-status-code.model";
export type QueueLevel = "neutral" | "warning" | "critical";
export type CustomerType = "PN" | "PJ";
export interface BackofficeCreditApplicationListItem {
    applicationId: number;
    applicationExternalId: string;
    partnerExternalId: string | null;
    partnerLogoUrl: string | null;
    customerFullName: string | null;
    customerType: CustomerType | null;
    docType: string | null;
    docNumber: string | null;
    phone: string | null;
    email: string | null;
    salesRepName: string | null;
    requestedCreditLine: number | null;
    submissionDate: Date | null;
    queueDays: number | null;
    queueLevel: QueueLevel | null;
    statusCode: CreditApplicationStatusCode | null;
    statusDisplayName: string | null;
}
