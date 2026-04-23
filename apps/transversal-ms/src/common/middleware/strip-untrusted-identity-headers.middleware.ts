import type { NextFunction, Request, Response } from 'express';

/**
 * Cabeceras que nunca deben sustituir a JWT / sesión.
 * Se eliminan antes de enrutar (defensa en profundidad).
 */
const UNTRUSTED_IDENTITY_HEADERS = [
  'x-internal-user-id',
  'x-user-internal-id',
  'x-db-id',
  'x-impersonate-user-id',
  'x-act-as-user-id',
] as const;

export function strip_untrusted_identity_headers(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  for (const h of UNTRUSTED_IDENTITY_HEADERS) {
    delete req.headers[h];
  }
  next();
}
