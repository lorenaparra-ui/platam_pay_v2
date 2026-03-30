import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY } from '@modules/users/users.tokens';
import { UserRepository } from '@modules/users/domain/ports/user.ports';
import { DeleteUserByExternalIdRequest } from './delete-user-by-external-id.request';

@Injectable()
export class DeleteUserByExternalIdUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly user_repository: UserRepository,
  ) {}

  async execute(req: DeleteUserByExternalIdRequest): Promise<void> {
    const ok = await this.user_repository.delete_by_external_id(req.external_id);
    if (!ok) {
      throw new NotFoundException('user not found');
    }
  }
}
