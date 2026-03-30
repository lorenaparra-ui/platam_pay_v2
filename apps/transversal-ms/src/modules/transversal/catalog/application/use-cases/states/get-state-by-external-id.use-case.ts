import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { STATE_REPOSITORY } from '@modules/transversal/catalog.tokens';
import type { StateRepository } from '@modules/transversal/catalog/domain/ports/state.repository.port';
import type { State } from '@modules/transversal/catalog/domain/models/state.models';

@Injectable()
export class GetStateByExternalIdUseCase {
  constructor(
    @Inject(STATE_REPOSITORY)
    private readonly state_repository: StateRepository,
  ) {}

  async execute(external_id: string): Promise<State> {
    const state = await this.state_repository.find_by_external_id(external_id);
    if (state === null) {
      throw new NotFoundException('state not found');
    }
    return state;
  }
}
