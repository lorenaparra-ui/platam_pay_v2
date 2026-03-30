import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurrencyEntity } from '@app/transversal-data';
import type { CurrencyReadPort } from '@modules/transversal/catalog/domain/ports/currency.read.port';

const CURRENCY_ID_SELECT = { id: true } as const;
const CURRENCY_EXT_SELECT = { externalId: true } as const;

@Injectable()
export class TypeormCurrencyReadRepository implements CurrencyReadPort {
  constructor(
    @InjectRepository(CurrencyEntity)
    private readonly repo: Repository<CurrencyEntity>,
  ) {}

  async find_internal_id_by_external_id(
    external_id: string,
  ): Promise<number | null> {
    const row = await this.repo.findOne({
      where: { externalId: external_id },
      select: CURRENCY_ID_SELECT,
    });
    return row?.id ?? null;
  }

  async find_external_id_by_internal_id(
    internal_id: number,
  ): Promise<string | null> {
    const row = await this.repo.findOne({
      where: { id: internal_id },
      select: CURRENCY_EXT_SELECT,
    });
    return row?.externalId ?? null;
  }
}
