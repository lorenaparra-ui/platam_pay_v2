export class StorageDomainError extends Error {
  constructor(
    public readonly code: StorageErrorCode,
    message: string,
    public readonly cause?: unknown,
  ) {
    super(message);
    this.name = 'StorageDomainError';
  }
}

export type StorageErrorCode =
  | 'STORAGE_NOT_CONFIGURED'
  | 'STORAGE_NOT_FOUND'
  | 'STORAGE_ACCESS_DENIED'
  | 'STORAGE_INVALID_INPUT'
  | 'STORAGE_UNKNOWN';
