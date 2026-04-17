export class UploadCreditApplicationDocumentRequest {
  constructor(
    readonly externalId: string,
    readonly documentType: string,
    readonly fileName: string,
    readonly mimeType: string,
    readonly contentBase64: string,
  ) {}
}
