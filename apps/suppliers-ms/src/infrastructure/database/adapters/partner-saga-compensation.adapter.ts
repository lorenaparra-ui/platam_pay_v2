import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {
  BankAccountEntity,
  BusinessEntity,
  PartnerEntity,
  SupplierEntity,
} from '@app/suppliers-data';
import type { PartnerSagaCompensationPort } from '@modules/partners/application/ports/partner-saga-compensation.port';

@Injectable()
export class PartnerSagaCompensationAdapter implements PartnerSagaCompensationPort {
  private readonly logger = new Logger(PartnerSagaCompensationAdapter.name);

  constructor(
    @InjectDataSource() private readonly data_source: DataSource,
    @InjectRepository(PartnerEntity)
    private readonly partner_repo: Repository<PartnerEntity>,
    @InjectRepository(SupplierEntity)
    private readonly supplier_repo: Repository<SupplierEntity>,
    @InjectRepository(BusinessEntity)
    private readonly business_repo: Repository<BusinessEntity>,
    @InjectRepository(BankAccountEntity)
    private readonly bank_account_repo: Repository<BankAccountEntity>,
  ) {}

  async delete_credit_facility(credit_facility_external_id: string): Promise<void> {
    try {
      await this.data_source.query(
        `DELETE FROM products_schema.credit_facilities WHERE external_id = $1::uuid`,
        [credit_facility_external_id],
      );
      this.logger.warn(
        `[Compensación] credit_facility eliminada external_id=${credit_facility_external_id}`,
      );
    } catch (err: unknown) {
      this.logger.error(
        `[Compensación] Error al eliminar credit_facility external_id=${credit_facility_external_id}: ${String(err)}`,
      );
    }
  }

  async delete_partner(partner_external_id: string): Promise<void> {
    try {
      await this.partner_repo.delete({ externalId: partner_external_id });
      this.logger.warn(
        `[Compensación] partner eliminado external_id=${partner_external_id}`,
      );
    } catch (err: unknown) {
      this.logger.error(
        `[Compensación] Error al eliminar partner external_id=${partner_external_id}: ${String(err)}`,
      );
    }
  }

  async delete_supplier(supplier_external_id: string): Promise<void> {
    try {
      await this.supplier_repo.delete({ externalId: supplier_external_id });
      this.logger.warn(
        `[Compensación] supplier eliminado external_id=${supplier_external_id}`,
      );
    } catch (err: unknown) {
      this.logger.error(
        `[Compensación] Error al eliminar supplier external_id=${supplier_external_id}: ${String(err)}`,
      );
    }
  }

  async delete_business(business_external_id: string): Promise<void> {
    try {
      await this.business_repo.delete({ externalId: business_external_id });
      this.logger.warn(
        `[Compensación] business eliminado external_id=${business_external_id}`,
      );
    } catch (err: unknown) {
      this.logger.error(
        `[Compensación] Error al eliminar business external_id=${business_external_id}: ${String(err)}`,
      );
    }
  }

  async delete_bank_account(bank_account_external_id: string): Promise<void> {
    try {
      await this.bank_account_repo.delete({ externalId: bank_account_external_id });
      this.logger.warn(
        `[Compensación] bank_account eliminado external_id=${bank_account_external_id}`,
      );
    } catch (err: unknown) {
      this.logger.error(
        `[Compensación] Error al eliminar bank_account external_id=${bank_account_external_id}: ${String(err)}`,
      );
    }
  }
}
