export const PRODUCTS_CREATE_CATEGORIES_QUEUE_URL_PORT = Symbol(
  'PRODUCTS_CREATE_CATEGORIES_QUEUE_URL_PORT',
);

export interface ProductsCreateCategoriesQueueUrlPort {
  get_create_categories_queue_url(): string | undefined;
}
