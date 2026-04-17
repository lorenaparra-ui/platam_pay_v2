import { Injectable, NotImplementedException } from '@nestjs/common';
import type {
  CreditApplicationDocumentStoragePort,
  UploadDocumentParams,
  UploadDocumentResult,
} from '@modules/credit-applications/application/ports/credit-application-document-storage.port';

/**
 * Stub until an S3 / storage provider is wired for credit application documents.
 */
@Injectable()
export class StubCreditApplicationDocumentStorageAdapter
  implements CreditApplicationDocumentStoragePort
{
  upload(_params: UploadDocumentParams): Promise<UploadDocumentResult> {
    throw new NotImplementedException(
      'credit_application_document_storage_not_implemented',
    );
  }
}
