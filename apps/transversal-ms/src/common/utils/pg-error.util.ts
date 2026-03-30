import { QueryFailedError } from 'typeorm';

export function is_pg_unique_violation(err: unknown): boolean {
  if (!(err instanceof QueryFailedError)) {
    return false;
  }
  const driver = err.driverError as { code?: string } | undefined;
  return driver?.code === '23505';
}
