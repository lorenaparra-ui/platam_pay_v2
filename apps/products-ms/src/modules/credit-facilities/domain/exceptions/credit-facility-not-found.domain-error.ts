export class CreditFacilityNotFoundDomainError extends Error {
  constructor(readonly external_id: string) {
    super('credit facility not found');
    this.name = 'CreditFacilityNotFoundDomainError';
  }
}
