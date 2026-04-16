import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PERMISSION_CODES_BY_ROLE_READER } from '@modules/auth/auth.tokens';
import type { PermissionCodesByRoleReaderPort } from '@modules/auth/domain/ports/permission-codes-by-role.reader.port';
import type { RequestContext } from '@modules/auth/application/request-context.interface';
import { PERSON_REPOSITORY } from '@modules/persons/persons.tokens';
import type { PersonRepository } from '@modules/persons/domain/ports/person.ports';
import { USER_REPOSITORY } from '@modules/users/users.tokens';
import type { UserRepository } from '@modules/users/domain/ports/user.ports';
import { GetUserMeResult } from './get-user-me.result';

@Injectable()
export class GetUserMeUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly user_repository: UserRepository,
    @Inject(PERSON_REPOSITORY)
    private readonly person_repository: PersonRepository,
    @Inject(PERMISSION_CODES_BY_ROLE_READER)
    private readonly permission_codes_reader: PermissionCodesByRoleReaderPort,
  ) {}

  async execute(ctx: RequestContext): Promise<GetUserMeResult> {
    const user = await this.user_repository.find_by_cognito_sub(ctx.cognitoSub);
    if (user === null) {
      throw new NotFoundException('user not found');
    }

    let full_name = '';
    if (user.person_id !== null) {
      const person = await this.person_repository.find_by_internal_id(user.person_id);
      if (person !== null) {
        full_name = `${person.first_name} ${person.last_name}`.trim();
      }
    }

    const permissions =
      user.role_id !== null
        ? await this.permission_codes_reader.list_codes_for_role_internal_id(user.role_id)
        : [];

    return new GetUserMeResult(
      {
        externalId: user.external_id,
        email: user.email,
        fullName: full_name,
        role: ctx.roleCode,
        hierarchy: {
          parentId: user.parent_id !== null ? String(user.parent_id) : null,
          partnerId: null,
        },
      },
      permissions,
    );
  }
}
