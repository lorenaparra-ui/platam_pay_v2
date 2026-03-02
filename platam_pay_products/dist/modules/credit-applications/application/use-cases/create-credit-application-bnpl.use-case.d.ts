import type { CreditApplicationBnplRepositoryPort } from '../../domain/ports/credit-application-bnpl.repository.port';
import type { CreditApplicationBnpl } from '../../domain/models/credit-application-bnpl.model';
import type { CreateCreditApplicationBnplRequestDto } from '../dto/create-credit-application-bnpl-request.dto';
export declare class CreateCreditApplicationBnplUseCase {
    private readonly repository;
    constructor(repository: CreditApplicationBnplRepositoryPort);
    run(dto: CreateCreditApplicationBnplRequestDto): Promise<CreditApplicationBnpl>;
}
