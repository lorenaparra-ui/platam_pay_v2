import { DomainException } from './domain.exception';

export class UserNotFoundException extends DomainException {
  constructor(identifier: string) {
    super(`Usuario no encontrado: ${identifier}`, 'USER_NOT_FOUND');
  }
}
