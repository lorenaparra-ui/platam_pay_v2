import type { Roles } from '@platam/shared';

export interface RequestContext {
  internalUserId: number;
  cognitoSub: string;
  email: string;
  roleCode: Roles;
  parentId: number | null;
  hierarchyPath: string | null;
}
