import { LegalEntityShareholderPayload } from '@app/products-data';

export class EnqueueLegalEntityCreditApplicationRequest {
  constructor(
    readonly partnerId: string,
    readonly salesRepId: string,
    // Empresa
    readonly legalName: string,
    readonly taxId: string,
    readonly yearOfEstablishment: string | null,
    readonly cityId: string | null,
    readonly businessAddress: string | null,
    readonly email: string,
    // Representante legal
    readonly firstName: string,
    readonly lastName: string,
    readonly docType: string,
    readonly docNumber: string,
    readonly phone: string,
    readonly legalRepAddress: string | null,
    // Negocio
    readonly businessName: string | null,
    readonly businessType: string,
    readonly businessSeniority: string | null,
    readonly numberOfLocations: number | null,
    readonly numberOfEmployees: number | null,
    readonly businessFlagshipM2: number | null,
    readonly businessRentAmount: number | null,
    // Financiero
    readonly totalAssets: number | null,
    readonly monthlyIncome: number | null,
    readonly monthlyExpenses: number | null,
    readonly monthlyPurchases: number | null,
    readonly currentPurchases: number | null,
    readonly requestedCreditLine: number,
    // Accionistas
    readonly shareholders: LegalEntityShareholderPayload[],
    // Opinión sales rep
    readonly salesRepKnowledgeTime: string | null,
    readonly salesRepConfidence: number | null,
    readonly salesRepSuggestedLimit: number | null,
    // Routing
    readonly privacyPolicyAccepted: boolean | undefined,
    /** null → usar categorías default del partner; array → categorías explícitas (sales rep) */
    readonly partnerCategoryIds: string[] | null,
    readonly idempotencyKey?: string | null,
  ) {}
}
