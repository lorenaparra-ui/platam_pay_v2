import { Repository } from 'typeorm';
import { SuppliersReferenceLookupPort } from '@common/ports/suppliers-reference-lookup.port';
import { CityEntity, PersonEntity, UserEntity } from '@app/transversal-data';
import { BankAccountEntity, BusinessEntity, PartnerEntity, SupplierEntity } from '@app/suppliers-data';
export declare class TypeormSuppliersReferenceLookupAdapter implements SuppliersReferenceLookupPort {
    private readonly users;
    private readonly persons;
    private readonly cities;
    private readonly businesses;
    private readonly bank_accounts;
    private readonly partners;
    private readonly suppliers;
    constructor(users: Repository<UserEntity>, persons: Repository<PersonEntity>, cities: Repository<CityEntity>, businesses: Repository<BusinessEntity>, bank_accounts: Repository<BankAccountEntity>, partners: Repository<PartnerEntity>, suppliers: Repository<SupplierEntity>);
    get_user_internal_id_by_external_id(external_id: string): Promise<number | null>;
    get_person_internal_id_by_external_id(external_id: string): Promise<number | null>;
    get_city_internal_id_by_external_id(external_id: string): Promise<number | null>;
    get_business_internal_id_by_external_id(external_id: string): Promise<number | null>;
    get_partner_internal_id_by_external_id(external_id: string): Promise<number | null>;
    get_partner_external_id_by_internal_id(internal_id: number): Promise<string | null>;
    get_user_external_id_by_internal_id(internal_id: number): Promise<string | null>;
    get_person_external_id_by_internal_id(internal_id: number): Promise<string | null>;
    get_city_external_id_by_internal_id(internal_id: number): Promise<string | null>;
    get_business_external_id_by_internal_id(internal_id: number): Promise<string | null>;
    get_bank_account_external_id_by_internal_id(internal_id: number): Promise<string | null>;
    get_bank_account_internal_id_by_external_id(external_id: string): Promise<number | null>;
    get_supplier_external_id_by_internal_id(internal_id: number): Promise<string | null>;
}
