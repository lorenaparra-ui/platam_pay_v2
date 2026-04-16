/** Normalizaciones compartidas para payloads de Cognito (email/sesión/TOTP). */

export function trim_string_value({ value }: { value: unknown }): unknown {
  return typeof value === 'string' ? value.trim() : value;
}

export function normalize_auth_email({ value }: { value: unknown }): unknown {
  return typeof value === 'string' ? value.trim().toLowerCase() : value;
}

export function digits_only_totp({ value }: { value: unknown }): unknown {
  if (value === null || value === undefined) {
    return value;
  }
  return String(value).trim().replace(/\D/g, '');
}
