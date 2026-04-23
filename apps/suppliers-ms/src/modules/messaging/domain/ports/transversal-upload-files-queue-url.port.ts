export const TRANSVERSAL_UPLOAD_FILES_QUEUE_URL_PORT = Symbol(
  'TRANSVERSAL_UPLOAD_FILES_QUEUE_URL_PORT',
);

export interface TransversalUploadFilesQueueUrlPort {
  get_upload_files_queue_url(): string | undefined;
}
