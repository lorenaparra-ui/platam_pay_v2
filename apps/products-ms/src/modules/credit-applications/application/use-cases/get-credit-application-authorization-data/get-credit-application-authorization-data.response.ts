/** Estado derivado del status de la solicitud para renderear la landing pública. */
export type AuthorizationLandingStatus = 'pending' | 'already_authorized' | 'not_found';

export class GetCreditApplicationAuthorizationDataResponse {
  constructor(
    readonly authorizationStatus: AuthorizationLandingStatus,
    readonly externalId: string,
  ) {}
}
