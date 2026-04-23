import type { Roles } from '@platam/shared';

/**
 * Contexto HTTP tras validar JWT de Cognito y cargar el usuario en BD.
 * No incluir en logs (PII / identidad operativa).
 */
export interface RequestContext {
  internalUserId: number;
  /** Alineado con el claim `sub` del access token de Cognito (forma canónica). */
  cognitoSub: string;
  email: string;
  roleCode: Roles;
  parentId: number | null;
  /** Path materializado del usuario en BD; no sustituye validación JWT ni estado activo. */
  hierarchyPath: string;
}
