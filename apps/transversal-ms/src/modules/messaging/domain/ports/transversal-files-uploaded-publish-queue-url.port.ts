/**
 * Cola destino del evento files-uploaded (debe coincidir con la que consume suppliers-ms).
 */
export const TRANSVERSAL_FILES_UPLOADED_PUBLISH_QUEUE_URL_PORT = Symbol(
  'TRANSVERSAL_FILES_UPLOADED_PUBLISH_QUEUE_URL_PORT',
);

export interface TransversalFilesUploadedPublishQueueUrlPort {
  get_publish_queue_url(): string;
}
