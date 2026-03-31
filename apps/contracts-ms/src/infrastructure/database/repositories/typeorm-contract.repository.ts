import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ContractEntity } from '@app/products-data';
import { ContractRepository } from '@modules/contracts/domain/ports/contract.repository.port';
import {
  Contract,
  CreateContractProps,
  ListContractsFilters,
  UpdateContractProps,
} from '@modules/contracts/domain/models/contract.models';
import { ContractMapper } from '@infrastructure/database/mappers/contract.mapper';

const CONTRACT_SELECT = {
  id: true,
  externalId: true,
  userId: true,
  applicationId: true,
  zapsignToken: true,
  statusId: true,
  originalFileUrl: true,
  signedFileUrl: true,
  formAnswersJson: true,
  createdAt: true,
  updatedAt: true,
} as const;

@Injectable()
export class TypeormContractRepository implements ContractRepository {
  constructor(
    @InjectRepository(ContractEntity)
    private readonly repo: Repository<ContractEntity>,
  ) {}

  async find_by_id(internal_id: number): Promise<Contract | null> {
    const row = await this.repo.findOne({
      where: { id: internal_id },
      select: CONTRACT_SELECT,
    });
    return row ? ContractMapper.to_domain(row) : null;
  }

  async find_by_external_id(external_id: string): Promise<Contract | null> {
    const row = await this.repo.findOne({
      where: { externalId: external_id },
      select: CONTRACT_SELECT,
    });
    return row ? ContractMapper.to_domain(row) : null;
  }

  async find_page(
    filters: ListContractsFilters,
    offset: number,
    limit: number,
  ): Promise<{ items: readonly Contract[]; total: number }> {
    const where: FindOptionsWhere<ContractEntity> = {};
    if (filters.user_id !== undefined) {
      where.userId = filters.user_id;
    }
    if (filters.application_id !== undefined) {
      where.applicationId = filters.application_id;
    }
    if (filters.status_id !== undefined) {
      where.statusId = filters.status_id;
    }

    const [rows, total] = await this.repo.findAndCount({
      where,
      select: CONTRACT_SELECT,
      order: { id: 'ASC' },
      skip: offset,
      take: limit,
    });
    return { items: rows.map((r) => ContractMapper.to_domain(r)), total };
  }

  async create(props: CreateContractProps): Promise<Contract> {
    const rows = await this.repo.query(
      `INSERT INTO products_schema.contracts (
        external_id, user_id, application_id, zapsign_token, status_id,
        original_file_url, signed_file_url, form_answers_json
      ) VALUES (
        COALESCE($1::uuid, gen_random_uuid()), $2, $3, $4, $5, $6, $7, $8::jsonb
      )
      RETURNING id, external_id, created_at, updated_at, user_id, application_id,
        zapsign_token, status_id, original_file_url, signed_file_url, form_answers_json`,
      [
        props.external_id ?? null,
        props.user_id,
        props.application_id,
        props.zapsign_token,
        props.status_id,
        props.original_file_url,
        props.signed_file_url,
        props.form_answers_json === null || props.form_answers_json === undefined
          ? null
          : JSON.stringify(props.form_answers_json),
      ],
    );
    return ContractMapper.from_raw_row(rows[0] as Record<string, unknown>);
  }

  async update_by_external_id(
    external_id: string,
    patch: UpdateContractProps,
  ): Promise<Contract | null> {
    const existing = await this.repo.findOne({
      where: { externalId: external_id },
      select: { id: true },
    });
    if (!existing) {
      return null;
    }

    const columns: string[] = [];
    const values: unknown[] = [];
    let i = 1;

    const add = (col: string, val: unknown) => {
      columns.push(`"${col}" = $${i}`);
      values.push(val);
      i += 1;
    };

    if (patch.application_id !== undefined) {
      add('application_id', patch.application_id);
    }
    if (patch.zapsign_token !== undefined) {
      add('zapsign_token', patch.zapsign_token);
    }
    if (patch.status_id !== undefined) {
      add('status_id', patch.status_id);
    }
    if (patch.original_file_url !== undefined) {
      add('original_file_url', patch.original_file_url);
    }
    if (patch.signed_file_url !== undefined) {
      add('signed_file_url', patch.signed_file_url);
    }
    if (patch.form_answers_json !== undefined) {
      columns.push(`"form_answers_json" = $${i}::jsonb`);
      values.push(
        patch.form_answers_json === null
          ? null
          : JSON.stringify(patch.form_answers_json),
      );
      i += 1;
    }

    if (columns.length === 0) {
      return this.find_by_external_id(external_id);
    }

    columns.push(`"updated_at" = now()`);
    values.push(existing.id);
    await this.repo.query(
      `UPDATE products_schema.contracts SET ${columns.join(', ')} WHERE id = $${i}`,
      values,
    );

    return this.find_by_external_id(external_id);
  }

  async delete_by_external_id(external_id: string): Promise<boolean> {
    const result = await this.repo.delete({ externalId: external_id });
    return (result.affected ?? 0) > 0;
  }
}
