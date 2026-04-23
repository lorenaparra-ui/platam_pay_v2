import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CONTRACT_REPOSITORY } from '@modules/contracts/contracts.tokens';
import type { ContractRepository } from '@modules/contracts/domain/ports/contract.repository.port';

/**
 * Eliminación dura (DELETE); coherente con credit_facilities en products-ms.
 * Restricciones de negocio (p. ej. contratos firmados) pueden añadirse aquí si se definen reglas.
 */
@Injectable()
export class DeleteContractByExternalIdUseCase {
  constructor(
    @Inject(CONTRACT_REPOSITORY)
    private readonly contract_repository: ContractRepository,
  ) {}

  async execute(external_id: string): Promise<void> {
    const ok = await this.contract_repository.delete_by_external_id(external_id);
    if (!ok) {
      throw new NotFoundException('contract not found');
    }
  }
}
