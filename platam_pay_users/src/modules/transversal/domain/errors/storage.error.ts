/**
 * Errores de dominio del almacenamiento de archivos.
 * Permiten que la capa de aplicación maneje fallos sin depender de errores de infraestructura (ej. AWS).
 */

export type StorageErrorCode =
  | 'STORAGE_NOT_FOUND'
  | 'STORAGE_ACCESS_DENIED'
  | 'STORAGE_INVALID_INPUT'
  | 'STORAGE_UNKNOWN';

export class StorageDomainError extends Error {
  constructor(
    public readonly code: StorageErrorCode,
    message: string,
    public readonly cause?: unknown,
  ) {
    super(message);
    this.name = 'StorageDomainError';
    Object.setPrototypeOf(this, StorageDomainError.prototype);
  }
}
