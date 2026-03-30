import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '@modules/users/users.tokens';
import {
  USER_REFERENCE_LOOKUP,
  UserReferenceLookupPort,
} from '@modules/users/domain/ports/user-reference-lookup.port';
import { UserRepository } from '@modules/users/domain/ports/user.ports';
import { build_user_public_fields } from '@modules/users/application/mapping/user-public-fields.builder';
import { ListUsersItemResponse } from './list-users.response';

@Injectable()
export class ListUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly user_repository: UserRepository,
    @Inject(USER_REFERENCE_LOOKUP)
    private readonly reference_lookup: UserReferenceLookupPort,
  ) {}

  async execute(): Promise<ListUsersItemResponse[]> {
    const rows = await this.user_repository.find_all();
    const out: ListUsersItemResponse[] = [];
    for (const row of rows) {
      const fields = await build_user_public_fields(row, this.reference_lookup);
      out.push(new ListUsersItemResponse(fields));
    }
    return out;
  }
}
