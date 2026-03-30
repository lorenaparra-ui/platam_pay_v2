import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { STATE_REPOSITORY } from '@modules/transversal/catalog.tokens';
import type { StateRepository } from '@modules/transversal/catalog/domain/ports/state.repository.port';
import type { State, UpdateStateProps } from '@modules/transversal/catalog/domain/models/state.models';
import { is_pg_unique_violation } from '@common/utils/pg-error.util';

@Injectable()
export class UpdateStateByExternalIdUseCase {
  private readonly logger = new Logger(UpdateStateByExternalIdUseCase.name);

  constructor(
    @Inject(STATE_REPOSITORY)
    private readonly state_repository: StateRepository,
  ) {}

  async execute(
    external_id: string,
    patch: UpdateStateProps,
  ): Promise<State> {
    try {
      const updated = await this.state_repository.update_by_external_id(
        external_id,
        patch,
      );
      if (updated === null) {
        throw new NotFoundException('state not found');
      }
      return updated;
    } catch (err: unknown) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      if (is_pg_unique_violation(err)) {
        throw new ConflictException('state already exists for this country');
      }
      this.logger.error('update state failed');
      throw err;
    }
  }
}
