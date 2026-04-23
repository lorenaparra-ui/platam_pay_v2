import { SetMetadata } from '@nestjs/common';
import type { Roles } from '@platam/shared';
import { REQUIRE_ROLES_KEY } from '../constants/auth-metadata.constants';

export const RequireRoles = (...roles: Roles[]) =>
  SetMetadata(REQUIRE_ROLES_KEY, roles);
