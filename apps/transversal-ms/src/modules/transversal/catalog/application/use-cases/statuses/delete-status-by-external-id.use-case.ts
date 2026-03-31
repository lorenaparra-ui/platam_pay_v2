import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { STATUS_REPOSITORY } from '@modules/transversal/catalog.tokens';
import type { StatusRepository } from '@modules/transversal/catalog/domain/ports/status.repository.port';

@Injectable()
export class DeleteStatusByExternalIdUseCase {
  constructor(
    @Inject(STATUS_REPOSITORY)
    private readonly status_repository: StatusRepository,
  ) {}

  async execute(external_id: string): Promise<void> {
    const deleted = await this.status_repository.delete_by_external_id(
      external_id,
    );
    if (deleted) {
      return;
    }
    const exists = await this.status_repository.find_by_external_id(
      external_id,
    );
    if (exists === null) {
      throw new NotFoundException('status not found');
    }
    throw new ConflictException(
      'status is referenced by users, applications or other operational data',
    );
  }
}
