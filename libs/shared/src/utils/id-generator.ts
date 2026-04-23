import { randomUUID } from 'crypto';

export function new_uuid(): string {
  return randomUUID();
}
