export class CategoryNotFoundDomainError extends Error {
  constructor(readonly external_id: string) {
    super('category not found');
    this.name = 'CategoryNotFoundDomainError';
  }
}
