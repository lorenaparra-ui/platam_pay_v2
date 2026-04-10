import {
  LegalRepresentative,
  CreateLegalRepresentativeProps,
} from '@modules/legal-representatives/domain/entities/legal-representative.entity';

export interface LegalRepresentativeRepository {
  create(props: CreateLegalRepresentativeProps): Promise<LegalRepresentative>;
}
