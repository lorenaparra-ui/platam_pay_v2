export class UserNotFoundDomainError extends Error {
  constructor(readonly external_id: string) {
    super('user not found');
    this.name = 'UserNotFoundDomainError';
  }
}
