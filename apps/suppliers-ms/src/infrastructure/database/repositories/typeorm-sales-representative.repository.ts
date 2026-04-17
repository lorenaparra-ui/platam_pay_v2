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

@Injectable()
export class TypeormSalesRepresentativeRepository
  implements SalesRepresentativeRepository
{
  constructor(
    @InjectRepository(SalesRepresentativeEntity)
    private readonly repo: Repository<SalesRepresentativeEntity>,
  ) {}

  private with_user_graph_qb() {
    return this.repo
      .createQueryBuilder('sr')
      .leftJoinAndSelect('sr.user', 'u')
      .leftJoinAndSelect('u.person', 'p')
      .leftJoinAndSelect('u.role', 'r');
  }

  async find_by_external_id(external_id: string): Promise<SalesRepresentative | null> {
    const row = await this.with_user_graph_qb()
      .where('sr.external_id = :external_id', { external_id })
      .getOne();
    return row ? SalesRepresentativeMapper.to_domain(row) : null;
  }

  async find_all(partner_id_filter?: number): Promise<SalesRepresentative[]> {
    const qb = this.with_user_graph_qb().orderBy('sr.id', 'ASC');
    if (partner_id_filter !== undefined) {
      qb.andWhere('sr.partner_id = :partner_id', {
        partner_id: partner_id_filter,
      });
    }
    const rows = await qb.getMany();
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
    const qb = this.repo
      .createQueryBuilder()
      .update(SalesRepresentativeEntity)
      .where('"external_id" = :external_id', { external_id });

    if (user_id === null) {
      await qb
        .set({
          userId: () => 'NULL',
          updatedAt: () => 'now()',
        })
        .execute();
    } else {
      await qb
        .set({
          userId: user_id,
          updatedAt: () => 'now()',
        })
        .execute();
    }

    return this.find_by_external_id(external_id);
  }

  async delete_by_external_id(external_id: string): Promise<boolean> {
    const result = await this.repo.delete({ externalId: external_id });
    return (result.affected ?? 0) > 0;
  }
}
