import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { STATE_REPOSITORY } from '@modules/transversal/catalog.tokens';
import type { StateRepository } from '@modules/transversal/catalog/domain/ports/state.repository.port';

@Injectable()
export class DeleteStateByExternalIdUseCase {
  constructor(
    @Inject(STATE_REPOSITORY)
    private readonly state_repository: StateRepository,
  ) {}

  async execute(external_id: string): Promise<void> {
    const deleted = await this.state_repository.delete_by_external_id(
      external_id,
    );
    if (!deleted) {
      throw new NotFoundException('state not found');
    }
  }
}
