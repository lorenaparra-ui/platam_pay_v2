import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalesRepresentativeEntity } from '@app/suppliers-data';
import { SalesRepresentativeRepository } from '@modules/sales-representatives/domain/repositories/sales-representative.repository';
import {
  CreateSalesRepresentativeProps,
  SalesRepresentative,
} from '@modules/sales-representatives/domain/entities/sales-representative.entity';
import { SalesRepresentativeMapper } from '@infrastructure/database/mappers/sales-representative.mapper';

const SALES_REPRESENTATIVE_SELECT = {
  id: true,
  externalId: true,
  partnerId: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
} as const;

@Injectable()
export class TypeormSalesRepresentativeRepository
  implements SalesRepresentativeRepository
{
  constructor(
    @InjectRepository(SalesRepresentativeEntity)
    private readonly repo: Repository<SalesRepresentativeEntity>,
  ) {}

  async find_by_external_id(external_id: string): Promise<SalesRepresentative | null> {
    const row = await this.repo.findOne({
      where: { externalId: external_id },
      select: SALES_REPRESENTATIVE_SELECT,
    });
    return row ? SalesRepresentativeMapper.to_domain(row) : null;
  }

  async find_all(partner_id_filter?: number): Promise<SalesRepresentative[]> {
    const rows = await this.repo.find({
      where:
        partner_id_filter === undefined
          ? {}
          : { partnerId: partner_id_filter },
      select: SALES_REPRESENTATIVE_SELECT,
      order: { id: 'ASC' },
    });
    return rows.map((r) => SalesRepresentativeMapper.to_domain(r));
  }

  async create(props: CreateSalesRepresentativeProps): Promise<SalesRepresentative> {
    const rows = await this.repo.query(
      `INSERT INTO suppliers_schema.sales_representatives (
        external_id, partner_id, user_id
      ) VALUES (gen_random_uuid(), $1, $2)
      RETURNING id, external_id, partner_id, user_id, created_at, updated_at`,
      [props.partner_id, props.user_id],
    );
    return SalesRepresentativeMapper.from_raw_row(rows[0] as Record<string, unknown>);
  }

  async update_user_by_external_id(
    external_id: string,
    user_id: number | null,
  ): Promise<SalesRepresentative | null> {
    await this.repo
      .createQueryBuilder()
      .update(SalesRepresentativeEntity)
      .set({
        userId: user_id,
        updatedAt: () => 'now()',
      })
      .where('"external_id" = :external_id', { external_id })
      .execute();

    return this.find_by_external_id(external_id);
  }

  async delete_by_external_id(external_id: string): Promise<boolean> {
    const result = await this.repo.delete({ externalId: external_id });
    return (result.affected ?? 0) > 0;
  }
}
