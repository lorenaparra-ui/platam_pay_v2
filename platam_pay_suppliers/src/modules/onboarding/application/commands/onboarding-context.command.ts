/**
 * Contexto comercial común a todos los procesos de onboarding.
 * Capa application: Command/contract, no expuesto en presentación.
 */
export interface OnboardingContextCommand {
  partnerId: string;
  salesRepId?: string;
  categoryId?: string;
}
