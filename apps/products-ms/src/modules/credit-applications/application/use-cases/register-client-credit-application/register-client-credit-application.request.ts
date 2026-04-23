import type { CreditApplicationStatus } from '@platam/shared';
import type { CreditApplicationClientType } from '../publish-authorization-notification/publish-authorization-notification.command';

export class RegisterClientCreditApplicationRequest {
  constructor(
    readonly phone: string,
    readonly email: string,
    readonly docType: string,
    readonly docNumber: string,
    readonly firstName: string,
    readonly lastName: string,
    readonly businessName: string,
    readonly businessType: string,
    readonly isCurrentClient: boolean,
    readonly requestedCreditLine: number,
    readonly privacyPolicyAccepted: boolean,
    // ── Opcionales existentes (no mover; el controller posicional los usa así) ──
    readonly relationshipToBusiness?: string | null,
    readonly cityExternalId?: string | null,
    readonly businessAddress?: string | null,
    readonly businessSeniority?: string | null,
    readonly numberOfEmployees?: number | null,
    readonly numberOfLocations?: number | null,
    readonly businessFlagshipM2?: number | null,
    readonly businessHasRent?: boolean | null,
    readonly businessRentAmount?: number | null,
    readonly monthlyPurchases?: number | null,
    readonly currentPurchases?: number | null,
    readonly totalAssets?: number | null,
    readonly monthlyIncome?: number | null,
    readonly monthlyExpenses?: number | null,
    // ── Nuevos opcionales HU-05 (siempre al final para no romper callers existentes) ──
    /** Undefined → IN_PROGRESS (self-service). SR flows pasan PENDING_AUTHORIZATION. */
    readonly status?: CreditApplicationStatus,
    /** Nombre comercial del partner. Requerido para notificaciones cuando PENDING_AUTHORIZATION. */
    readonly partnerName?: string | null,
    /** Selecciona la plantilla Twilio. Default 'pn'. */
    readonly clientType?: CreditApplicationClientType,
    /** Razón social de la empresa cliente (solo PJ). */
    readonly businessLegalName?: string | null,
  ) {}
}
