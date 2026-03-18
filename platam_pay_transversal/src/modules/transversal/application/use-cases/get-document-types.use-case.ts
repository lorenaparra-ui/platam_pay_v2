import { Inject, Injectable } from '@nestjs/common';
import type { DocumentTypeRepositoryPort } from '@transversal/domain/ports/repository/document-type.repository.port';
import { DOCUMENT_TYPE_REPOSITORY } from '@transversal/domain/ports/repository/document-type.repository.port';
import { DocumentTypeResponseDto } from '../dto/document-type-response.dto';

@Injectable()
export class GetDocumentTypesUseCase {
  constructor(
    @Inject(DOCUMENT_TYPE_REPOSITORY)
    private readonly repository: DocumentTypeRepositoryPort,
  ) {}

  async execute(): Promise<DocumentTypeResponseDto[]> {
    const models = await this.repository.findAll();
    return models.map(DocumentTypeResponseDto.fromDomain);
  }

  async executeByCode(code: string): Promise<DocumentTypeResponseDto | null> {
    const model = await this.repository.findByCode(code);
    return model ? DocumentTypeResponseDto.fromDomain(model) : null;
  }
}
