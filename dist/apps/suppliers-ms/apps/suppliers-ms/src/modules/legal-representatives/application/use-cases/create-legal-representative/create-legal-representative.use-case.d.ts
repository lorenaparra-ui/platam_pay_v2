import type { LegalRepresentativeRepository } from '@modules/legal-representatives/domain/repositories/legal-representative.repository';
import { CreateLegalRepresentativeRequest } from './create-legal-representative.request';
import { CreateLegalRepresentativeResponse } from './create-legal-representative.response';
export declare class CreateLegalRepresentativeUseCase {
    private readonly legal_representatives;
    constructor(legal_representatives: LegalRepresentativeRepository);
    execute(req: CreateLegalRepresentativeRequest): Promise<CreateLegalRepresentativeResponse>;
}
