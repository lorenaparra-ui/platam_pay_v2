export const TRANSVERSAL_CREATE_PERSON_QUEUE_URL_PORT = Symbol(
  'TRANSVERSAL_CREATE_PERSON_QUEUE_URL_PORT',
);

export interface TransversalCreatePersonQueueUrlPort {
  get_create_person_queue_url(): string | undefined;
}
