export class PersonNotFoundDomainError extends Error {
  constructor(readonly external_id: string) {
    super('person not found');
    this.name = 'PersonNotFoundDomainError';
  }
}
