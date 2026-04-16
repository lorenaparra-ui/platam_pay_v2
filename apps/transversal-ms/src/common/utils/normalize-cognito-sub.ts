/**
 * Forma canónica del claim `sub` de Cognito y de la columna `cognito_sub` en BD.
 * Cognito puede emitir el UUID con distinto casing; el access token y la BD deben usar el mismo string.
 */
export function normalize_cognito_sub(raw: string): string {
  return raw.trim().toLowerCase();
}
