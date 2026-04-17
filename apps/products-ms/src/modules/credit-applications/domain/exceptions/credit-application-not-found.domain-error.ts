export class CreditApplicationNotFoundDomainError extends Error {
  constructor(readonly external_id: string) {
    super('credit application not found');
    this.name = 'CreditApplicationNotFoundDomainError';
  }
}
