import { Injectable } from '@nestjs/common';
import type { CreateSalesRepNaturalOpinionCommand } from '@onboarding/application/commands';

/**
 * Caso de uso: crear opinión del representante para onboarding persona natural.
 * Solo recibe Command tipado. No conecta dominio ni infraestructura.
 */
@Injectable()
export class CreateSalesRepNaturalOpinionUseCase {
  async execute(
    command: CreateSalesRepNaturalOpinionCommand,
  ): Promise<{ acknowledged: boolean }> {
    return { acknowledged: true };
  }
}
