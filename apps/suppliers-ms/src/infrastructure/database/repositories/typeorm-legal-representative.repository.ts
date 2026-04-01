import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LegalRepresentativeEntity } from '@app/suppliers-data';
import { LegalRepresentativeRepository } from '@modules/legal-representatives/domain/repositories/legal-representative.repository';
import {
  LegalRepresentative,
  CreateLegalRepresentativeProps,
} from '@modules/legal-representatives/domain/entities/legal-representative.entity';
import { LegalRepresentativeMapper } from '@infrastructure/database/mappers/legal-representative.mapper';

@Injectable()
export class TypeormLegalRepresentativeRepository implements LegalRepresentativeRepository {
  constructor(
    @InjectRepository(LegalRepresentativeEntity)
    private readonly repo: Repository<LegalRepresentativeEntity>,
  ) {}

  async create(props: CreateLegalRepresentativeProps): Promise<LegalRepresentative> {
    const rows = await this.repo.query(
      `INSERT INTO suppliers_schema.legal_representatives (
        external_id, person_id, is_primary
      ) VALUES (gen_random_uuid(), $1, $2)
      RETURNING id, external_id, created_at, updated_at, person_id, is_primary`,
      [props.person_id, props.is_primary],
    );
    return LegalRepresentativeMapper.from_raw_row(rows[0] as Record<string, unknown>);
  }

  async link_to_supplier(lr_internal_id: number, supplier_internal_id: number): Promise<void> {
    await this.repo.query(
      `UPDATE suppliers_schema.suppliers
         SET legal_representative_id = $1, updated_at = now()
       WHERE id = $2`,
      [lr_internal_id, supplier_internal_id],
    );
  }
}
