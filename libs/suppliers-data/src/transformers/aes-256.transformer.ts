import type { ValueTransformer } from 'typeorm';

export const BankAccountEncryptionTransformer: ValueTransformer = {
  to: (value: string | null) => value,
  from: (value: string | null) => value,
};
