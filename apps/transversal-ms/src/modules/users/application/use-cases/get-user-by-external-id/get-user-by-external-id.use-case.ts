import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY } from '@modules/users/users.tokens';
import {
  USER_REFERENCE_LOOKUP,
  UserReferenceLookupPort,
} from '@modules/users/domain/ports/user-reference-lookup.port';
import { UserRepository } from '@modules/users/domain/ports/user.ports';
import { build_user_public_fields } from '@modules/users/application/mapping/user-public-fields.builder';
import { GetUserByExternalIdRequest } from './get-user-by-external-id.request';
import { GetUserByExternalIdResponse } from './get-user-by-external-id.response';

@Injectable()
export class GetUserByExternalIdUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly user_repository: UserRepository,
    @Inject(USER_REFERENCE_LOOKUP)
    private readonly reference_lookup: UserReferenceLookupPort,
  ) {}

  async execute(
    req: GetUserByExternalIdRequest,
  ): Promise<GetUserByExternalIdResponse> {
    const row = await this.user_repository.find_by_external_id(req.external_id);
    if (row === null) {
      throw new NotFoundException('user not found');
    }
    const fields = await build_user_public_fields(row, this.reference_lookup);
    return new GetUserByExternalIdResponse(fields);
  }
}
