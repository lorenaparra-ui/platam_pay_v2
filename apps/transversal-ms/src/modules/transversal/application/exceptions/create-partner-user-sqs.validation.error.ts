export class CreatePartnerUserSqsValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CreatePartnerUserSqsValidationError';
  }
}
