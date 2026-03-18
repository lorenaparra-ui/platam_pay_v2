/**
 * Base de errores de dominio (no exponer detalles internos al cliente HTTP).
 */
export abstract class DomainException extends Error {
  readonly code: string;

  protected constructor(message: string, code: string) {
    super(message);
    this.name = new.target.name;
    this.code = code;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
