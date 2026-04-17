import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CREDIT_APPLICATION_REPOSITORY } from '@modules/credit-applications/credit-applications.tokens';
import { CreditApplicationRepository } from '@modules/credit-applications/domain/ports/credit-application.ports';
import {
  CREDIT_APPLICATION_DOCUMENT_STORAGE,
  CreditApplicationDocumentStoragePort,
} from '@modules/credit-applications/application/ports/credit-application-document-storage.port';
import { UploadCreditApplicationDocumentRequest } from './upload-credit-application-document.request';
import { UploadCreditApplicationDocumentResponse } from './upload-credit-application-document.response';

@Injectable()
export class UploadCreditApplicationDocumentUseCase {
  constructor(
    @Inject(CREDIT_APPLICATION_REPOSITORY)
    private readonly credit_application_repository: CreditApplicationRepository,
    @Inject(CREDIT_APPLICATION_DOCUMENT_STORAGE)
    private readonly document_storage: CreditApplicationDocumentStoragePort,
  ) {}

  async execute(
    req: UploadCreditApplicationDocumentRequest,
  ): Promise<UploadCreditApplicationDocumentResponse> {
    const exists = await this.credit_application_repository.find_by_external_id(req.externalId);
    if (exists === null) {
      throw new NotFoundException('credit application not found');
    }

    const result = await this.document_storage.upload({
      credit_application_external_id: req.externalId,
      document_type: req.documentType,
      file_name: req.fileName,
      mime_type: req.mimeType,
      content_base64: req.contentBase64,
    });

    return new UploadCreditApplicationDocumentResponse(result.document_id, result.url);
  }
}
