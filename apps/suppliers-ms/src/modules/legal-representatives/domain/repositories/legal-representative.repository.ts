import {
  LegalRepresentative,
  CreateLegalRepresentativeProps,
} from '@modules/legal-representatives/domain/entities/legal-representative.entity';

export interface LegalRepresentativeRepository {
  create(props: CreateLegalRepresentativeProps): Promise<LegalRepresentative>;

  /**
   * Vincula el representante legal al supplier dado actualizando
   * suppliers_schema.suppliers.legal_representative_id.
   */
  link_to_supplier(lr_internal_id: number, supplier_internal_id: number): Promise<void>;
}
