export const PRODUCTS_OUTBOUND_QUEUE_URL_PORT = Symbol(
  'PRODUCTS_OUTBOUND_QUEUE_URL_PORT',
);

export interface ProductsOutboundQueueUrlPort {
  get_outbound_queue_url(): string;
}
