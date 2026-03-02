import type { CreditApplicationBnplRepositoryPort } from '../../domain/ports/credit-application-bnpl.repository.port';
import type { CreditApplicationBnpl } from '../../domain/models/credit-application-bnpl.model';
import type { UpdateCreditApplicationBnplRequestDto } from '../dto/update-credit-application-bnpl-request.dto';
export declare class UpdateCreditApplicationBnplUseCase {
    private readonly repository;
    constructor(repository: CreditApplicationBnplRepositoryPort);
    run(externalId: string, dto: UpdateCreditApplicationBnplRequestDto): Promise<CreditApplicationBnpl | null>;
}
