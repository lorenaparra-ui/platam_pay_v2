import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PARTNER_REPOSITORY } from '@modules/partners/partners.tokens';
import { PartnerRepository } from '@modules/partners/domain/repositories/partner.repository';
import { DeletePartnerByExternalIdRequest } from './delete-partner-by-external-id.request';

@Injectable()
export class DeletePartnerByExternalIdUseCase {
  constructor(
    @Inject(PARTNER_REPOSITORY)
    private readonly partner_repository: PartnerRepository,
  ) {}

  async execute(req: DeletePartnerByExternalIdRequest): Promise<void> {
    const ok = await this.partner_repository.delete_by_external_id(req.external_id);
    if (!ok) {
      throw new NotFoundException('partner not found');
    }
  }
}
