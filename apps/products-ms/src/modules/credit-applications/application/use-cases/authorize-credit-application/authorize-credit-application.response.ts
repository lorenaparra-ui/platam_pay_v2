export type AuthorizeResult = 'authorized' | 'already_authorized' | 'not_found';

export class AuthorizeCreditApplicationResponse {
  constructor(readonly result: AuthorizeResult) {}
}
