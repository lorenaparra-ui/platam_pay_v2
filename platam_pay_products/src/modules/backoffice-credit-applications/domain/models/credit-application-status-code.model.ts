export const CREDIT_APPLICATION_STATUS_CODES = [
  "pending_authorization",
  "in_progress",
  "in_study",
  "approved_in_signature",
  "approved_signed",
  "rejected",
  "duplicate",
] as const;

export type CreditApplicationStatusCode =
  (typeof CREDIT_APPLICATION_STATUS_CODES)[number];
