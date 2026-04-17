import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SALES_REPRESENTATIVE_REPOSITORY } from '@modules/sales-representatives/sales-representatives.tokens';
import { SalesRepresentativeRepository } from '@modules/sales-representatives/domain/repositories/sales-representative.repository';
import { DeleteSalesRepresentativeByExternalIdRequest } from './delete-sales-representative-by-external-id.request';

@Injectable()
export class DeleteSalesRepresentativeByExternalIdUseCase {
  constructor(
    @Inject(SALES_REPRESENTATIVE_REPOSITORY)
    private readonly sales_representative_repository: SalesRepresentativeRepository,
  ) {}

  async execute(req: DeleteSalesRepresentativeByExternalIdRequest): Promise<void> {
    const ok = await this.sales_representative_repository.delete_by_external_id(
      req.externalId,
    );
    if (!ok) {
      throw new NotFoundException('sales representative not found');
    }
  }
}
