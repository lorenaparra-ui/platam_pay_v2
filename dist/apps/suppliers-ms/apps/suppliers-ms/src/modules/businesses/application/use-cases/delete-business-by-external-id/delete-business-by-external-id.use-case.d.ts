import { BusinessRepository } from '@modules/businesses/domain/repositories/business.repository';
import { DeleteBusinessByExternalIdRequest } from './delete-business-by-external-id.request';
export declare class DeleteBusinessByExternalIdUseCase {
    private readonly business_repository;
    constructor(business_repository: BusinessRepository);
    execute(req: DeleteBusinessByExternalIdRequest): Promise<void>;
}
