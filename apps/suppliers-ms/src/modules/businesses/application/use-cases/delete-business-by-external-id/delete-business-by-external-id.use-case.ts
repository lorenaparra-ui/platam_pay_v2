import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BUSINESS_REPOSITORY } from '@modules/businesses/businesses.tokens';
import { BusinessRepository } from '@modules/businesses/domain/repositories/business.repository';
import { DeleteBusinessByExternalIdRequest } from './delete-business-by-external-id.request';

@Injectable()
export class DeleteBusinessByExternalIdUseCase {
  constructor(
    @Inject(BUSINESS_REPOSITORY)
    private readonly business_repository: BusinessRepository,
  ) {}

  async execute(req: DeleteBusinessByExternalIdRequest): Promise<void> {
    const ok = await this.business_repository.delete_by_external_id(req.external_id);
    if (!ok) {
      throw new NotFoundException('business not found');
    }
  }
}
