import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentTypeEntity } from '@libs/database';
import { DocumentTypeRepositoryPort } from '@transversal/domain/ports/repository/document-type.repository.port';
import { DocumentType } from '../../../modules/transversal/domain/models/document-type.model';
import { DocumentTypeMapper } from '../mappers/document-type.mapper';

@Injectable()
export class TypeOrmDocumentTypeRepository implements DocumentTypeRepositoryPort {
  constructor(
    @InjectRepository(DocumentTypeEntity)
    private readonly repository: Repository<DocumentTypeEntity>,
  ) {}

  async findAll(): Promise<DocumentType[]> {
    const rows = await this.repository
      .createQueryBuilder('documents')
      .distinctOn(['documents.document_type'])
      .select('documents.id', 'id')
      .addSelect('documents.external_id', 'externalId')
      .addSelect('documents.document_type', 'documentType')
      .where('documents.document_type IS NOT NULL')
      .andWhere("TRIM(documents.document_type) <> ''")
      .orderBy('documents.document_type', 'ASC')
      .addOrderBy('documents.id', 'ASC')
      .getRawMany<{ id: string; externalId: string; documentType: string }>();

    return rows.map((row) =>
      DocumentTypeMapper.toDomain({
        id: Number(row.id),
        externalId: row.externalId,
        documentType: row.documentType,
      } as DocumentTypeEntity),
    );
  }

  async findById(id: number): Promise<DocumentType | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? DocumentTypeMapper.toDomain(entity) : null;
  }

  async findByCode(code: string): Promise<DocumentType | null> {
    const entity = await this.repository
      .createQueryBuilder('documents')
      .where('LOWER(documents.document_type) = LOWER(:code)', { code })
      .orderBy('documents.id', 'ASC')
      .getOne();
    return entity ? DocumentTypeMapper.toDomain(entity) : null;
  }
}