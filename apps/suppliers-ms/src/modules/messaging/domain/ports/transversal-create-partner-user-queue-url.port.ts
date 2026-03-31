export const TRANSVERSAL_CREATE_PARTNER_USER_QUEUE_URL_PORT = Symbol(
  'TRANSVERSAL_CREATE_PARTNER_USER_QUEUE_URL_PORT',
);

export interface TransversalCreatePartnerUserQueueUrlPort {
  get_create_partner_user_queue_url(): string | undefined;
}
