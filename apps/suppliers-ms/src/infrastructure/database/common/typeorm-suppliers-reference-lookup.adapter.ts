import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuppliersReferenceLookupPort } from '@common/ports/suppliers-reference-lookup.port';
import { CityEntity, PersonEntity, UserEntity } from '@app/transversal-data';
import {
  BankAccountEntity,
  BusinessEntity,
  PartnerEntity,
  SupplierEntity,
} from '@app/suppliers-data';

@Injectable()
export class TypeormSuppliersReferenceLookupAdapter
  implements SuppliersReferenceLookupPort
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>,
    @InjectRepository(PersonEntity)
    private readonly persons: Repository<PersonEntity>,
    @InjectRepository(CityEntity)
    private readonly cities: Repository<CityEntity>,
    @InjectRepository(BusinessEntity)
    private readonly businesses: Repository<BusinessEntity>,
    @InjectRepository(BankAccountEntity)
    private readonly bank_accounts: Repository<BankAccountEntity>,
    @InjectRepository(PartnerEntity)
    private readonly partners: Repository<PartnerEntity>,
    @InjectRepository(SupplierEntity)
    private readonly suppliers: Repository<SupplierEntity>,
  ) {}

  async get_user_internal_id_by_external_id(
    external_id: string,
  ): Promise<number | null> {
    const row = await this.users.findOne({
      where: { externalId: external_id },
      select: { id: true },
    });
    return row?.id ?? null;
  }

  async get_person_internal_id_by_external_id(
    external_id: string,
  ): Promise<number | null> {
    const row = await this.persons.findOne({
      where: { externalId: external_id },
      select: { id: true },
    });
    return row?.id ?? null;
  }

  async get_city_internal_id_by_external_id(
    external_id: string,
  ): Promise<number | null> {
    const row = await this.cities.findOne({
      where: { externalId: external_id },
      select: { id: true },
    });
    return row?.id ?? null;
  }

  async get_business_internal_id_by_external_id(
    external_id: string,
  ): Promise<number | null> {
    const row = await this.businesses.findOne({
      where: { externalId: external_id },
      select: { id: true },
    });
    return row?.id ?? null;
  }

  async get_partner_internal_id_by_external_id(
    external_id: string,
  ): Promise<number | null> {
    const row = await this.partners.findOne({
      where: { externalId: external_id },
      select: { id: true },
    });
    return row?.id ?? null;
  }

  async get_partner_external_id_by_internal_id(
    internal_id: number,
  ): Promise<string | null> {
    const row = await this.partners.findOne({
      where: { id: internal_id },
      select: { externalId: true },
    });
    return row?.externalId ?? null;
  }

  async get_user_external_id_by_internal_id(
    internal_id: number,
  ): Promise<string | null> {
    const row = await this.users.findOne({
      where: { id: internal_id },
      select: { externalId: true },
    });
    return row?.externalId ?? null;
  }

  async get_person_external_id_by_internal_id(
    internal_id: number,
  ): Promise<string | null> {
    const row = await this.persons.findOne({
      where: { id: internal_id },
      select: { externalId: true },
    });
    return row?.externalId ?? null;
  }

  async get_city_external_id_by_internal_id(
    internal_id: number,
  ): Promise<string | null> {
    const row = await this.cities.findOne({
      where: { id: internal_id },
      select: { externalId: true },
    });
    return row?.externalId ?? null;
  }

  async get_business_external_id_by_internal_id(
    internal_id: number,
  ): Promise<string | null> {
    const row = await this.businesses.findOne({
      where: { id: internal_id },
      select: { externalId: true },
    });
    return row?.externalId ?? null;
  }

  async get_bank_account_external_id_by_internal_id(
    internal_id: number,
  ): Promise<string | null> {
    const row = await this.bank_accounts.findOne({
      where: { id: internal_id },
      select: { externalId: true },
    });
    return row?.externalId ?? null;
  }

  async get_bank_account_internal_id_by_external_id(
    external_id: string,
  ): Promise<number | null> {
    const row = await this.bank_accounts.findOne({
      where: { externalId: external_id },
      select: { id: true },
    });
    return row?.id ?? null;
  }

  async get_supplier_external_id_by_internal_id(
    internal_id: number,
  ): Promise<string | null> {
    const row = await this.suppliers.findOne({
      where: { id: internal_id },
      select: { externalId: true },
    });
    return row?.externalId ?? null;
  }
}
