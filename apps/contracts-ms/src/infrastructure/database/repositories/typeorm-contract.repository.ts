import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContractEntity } from '@app/products-data';
import { ContractRepository } from '@modules/contracts/domain/ports/contract.repository.port';
import {
  Contract,
  CreateContractRepositoryInput,
  ListContractsFilters,
  UpdateContractProps,
} from '@modules/contracts/domain/models/contract.models';
import { ContractMapper } from '@infrastructure/database/mappers/contract.mapper';

const CONTRACT_SELECT = {
  id: true,
  externalId: true,
  userId: true,
  contractTemplateId: true,
  zapsignToken: true,
  state: true,
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

  private async sync_credit_application_contract_link(
    contract_internal_id: number,
    credit_application_internal_id: number | null,
  ): Promise<void> {
    await this.repo.query(
      `UPDATE products_schema.credit_applications
       SET contract_id = NULL
       WHERE contract_id = $1`,
      [contract_internal_id],
    );
    if (credit_application_internal_id !== null) {
      await this.repo.query(
        `UPDATE products_schema.credit_applications
         SET contract_id = $1
         WHERE id = $2`,
        [contract_internal_id, credit_application_internal_id],
      );
    }
  }

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

  async find_by_zapsign_token(zapsign_token: string): Promise<Contract | null> {
    const row = await this.repo.findOne({
      where: { zapsignToken: zapsign_token },
      select: CONTRACT_SELECT,
    });
    return row ? ContractMapper.to_domain(row) : null;
  }

  async find_page(
    filters: ListContractsFilters,
    offset: number,
    limit: number,
  ): Promise<{ items: readonly Contract[]; total: number }> {
    const qb = this.repo.createQueryBuilder('contract');

    if (filters.user_id !== undefined) {
      qb.andWhere('contract.userId = :uid', { uid: filters.user_id });
    }
    if (filters.credit_application_internal_id !== undefined) {
      qb.andWhere(
        `contract.id IN (
          SELECT ca.contract_id FROM products_schema.credit_applications ca
          WHERE ca.id = :app_id AND ca.contract_id IS NOT NULL
        )`,
        { app_id: filters.credit_application_internal_id },
      );
    }
    if (filters.status !== undefined) {
      qb.andWhere('contract.state = :st', { st: filters.status });
    }

    qb.orderBy('contract.id', 'ASC').skip(offset).take(limit);

    const [rows, total] = await qb.getManyAndCount();
    return { items: rows.map((r) => ContractMapper.to_domain(r)), total };
  }

  async create(props: CreateContractRepositoryInput): Promise<Contract> {
    const rows = await this.repo.query(
      `INSERT INTO products_schema.contracts (
        external_id, user_id, contract_template_id, zapsign_token, state,
        original_file_url, signed_file_url, form_answers_json
      ) VALUES (
        COALESCE($1::uuid, gen_random_uuid()), $2, $3, $4, $5::products_schema.contract_catalog_status, $6, $7, $8::jsonb
      )
      RETURNING id, external_id, created_at, updated_at, user_id,
        contract_template_id, zapsign_token, state, original_file_url, signed_file_url, form_answers_json`,
      [
        props.external_id ?? null,
        props.user_id,
        props.contract_template_id,
        props.zapsign_token,
        props.status,
        props.original_file_url,
        props.signed_file_url,
        props.form_answers_json === null || props.form_answers_json === undefined
          ? null
          : JSON.stringify(props.form_answers_json),
      ],
    );
    const created = ContractMapper.from_raw_row(rows[0] as Record<string, unknown>);
    await this.sync_credit_application_contract_link(
      created.internal_id,
      props.credit_application_internal_id,
    );
    return created;
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

    if (patch.contract_template_id !== undefined) {
      add('contract_template_id', patch.contract_template_id);
    }
    if (patch.zapsign_token !== undefined) {
      add('zapsign_token', patch.zapsign_token);
    }
    if (patch.status !== undefined) {
      columns.push(`"state" = $${i}::products_schema.contract_catalog_status`);
      values.push(patch.status);
      i += 1;
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

    if (columns.length > 0) {
      columns.push(`"updated_at" = now()`);
      values.push(existing.id);
      await this.repo.query(
        `UPDATE products_schema.contracts SET ${columns.join(', ')} WHERE id = $${i}`,
        values,
      );
    }

    if (patch.credit_application_internal_id !== undefined) {
      await this.sync_credit_application_contract_link(
        existing.id,
        patch.credit_application_internal_id,
      );
    }

    return this.find_by_external_id(external_id);
  }

  async delete_by_external_id(external_id: string): Promise<boolean> {
    const result = await this.repo.delete({ externalId: external_id });
    return (result.affected ?? 0) > 0;
  }
}
