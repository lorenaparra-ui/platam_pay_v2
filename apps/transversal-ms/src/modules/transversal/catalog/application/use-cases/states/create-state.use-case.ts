import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { STATE_REPOSITORY } from '@modules/transversal/catalog.tokens';
import type { StateRepository } from '@modules/transversal/catalog/domain/ports/state.repository.port';
import type { State } from '@modules/transversal/catalog/domain/models/state.models';
import { is_pg_unique_violation } from '@common/utils/pg-error.util';

export interface CreateStatePayload {
  country_code: string;
  state_name: string;
  state_code: string | null;
}

@Injectable()
export class CreateStateUseCase {
  private readonly logger = new Logger(CreateStateUseCase.name);

  constructor(
    @Inject(STATE_REPOSITORY)
    private readonly state_repository: StateRepository,
  ) {}

  async execute(body: CreateStatePayload): Promise<State> {
    try {
      return await this.state_repository.create({
        country_code: body.country_code,
        state_name: body.state_name,
        state_code: body.state_code,
      });
    } catch (err: unknown) {
      if (is_pg_unique_violation(err)) {
        throw new ConflictException('state already exists for this country');
      }
      this.logger.error('create state failed');
      throw err;
    }
  }
}
