import { Injectable } from '@nestjs/common';
import type { CreateNaturalPersonOnboardingCommand } from '@onboarding/application/commands/create-natural-person-onboarding.command';

/**
 * Caso de uso: crear onboarding de persona natural.
 * Solo recibe Command tipado. No conecta dominio ni infraestructura.
 */
@Injectable()
export class CreateNaturalPersonOnboardingUseCase {
  async execute(
    {context, applicant, business, financial, isPartnerClient}: CreateNaturalPersonOnboardingCommand,
  ): Promise<{ acknowledged: boolean }> {
     // Sin persistencia: solo acuse de recibo del comando.
    return { acknowledged: true };
  }
}
