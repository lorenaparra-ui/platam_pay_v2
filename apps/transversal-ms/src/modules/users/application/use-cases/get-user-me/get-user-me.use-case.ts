import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PartnerRoles, Roles } from '@platam/shared';
import { PERMISSION_CODES_BY_ROLE_READER } from '@modules/auth/auth.tokens';
import type { PermissionCodesByRoleReaderPort } from '@modules/auth/domain/ports/permission-codes-by-role.reader.port';
import type { RequestContext } from '@modules/auth/application/request-context.interface';
import { PERSON_REPOSITORY } from '@modules/persons/persons.tokens';
import type { PersonRepository } from '@modules/persons/domain/ports/person.ports';
import { PARTNER_LINK_READER, USER_REPOSITORY } from '@modules/users/users.tokens';
import type { UserRepository } from '@modules/users/domain/ports/user.ports';
import type { PartnerLinkReaderPort } from '@modules/users/domain/ports/partner-link.reader.port';
import { GetUserMeResult } from './get-user-me.result';

const PARTNER_ROLE_SET = new Set<string>(Object.values(PartnerRoles));

@Injectable()
export class GetUserMeUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly user_repository: UserRepository,
    @Inject(PERSON_REPOSITORY)
    private readonly person_repository: PersonRepository,
    @Inject(PERMISSION_CODES_BY_ROLE_READER)
    private readonly permission_codes_reader: PermissionCodesByRoleReaderPort,
    @Inject(PARTNER_LINK_READER)
    private readonly partner_link_reader: PartnerLinkReaderPort,
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

    let partner_external_id: string | null = null;
    let sales_rep_external_id: string | null = null;

    if (PARTNER_ROLE_SET.has(ctx.roleCode)) {
      const link = await this.partner_link_reader.find_by_user_internal_id(user.internal_id);
      if (link !== null) {
        partner_external_id = link.partnerExternalId;
        if (ctx.roleCode === Roles.SALES_REPRESENTATIVE) {
          sales_rep_external_id = link.salesRepresentativeExternalId;
        }
      }
    }

    return new GetUserMeResult(
      {
        externalId: user.external_id,
        email: user.email,
        fullName: full_name,
        role: ctx.roleCode,
        hierarchy: {
          parentId: user.parent_id !== null ? String(user.parent_id) : null,
          partnerId: partner_external_id,
          salesRepExternalId: sales_rep_external_id,
        },
      },
      permissions,
    );
  }
}
