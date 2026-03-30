import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CATEGORY_REPOSITORY } from '@modules/categories/categories.tokens';
import { CategoryRepository } from '@modules/categories/domain/ports/category.ports';
import { DeleteCategoryByExternalIdRequest } from './delete-category-by-external-id.request';

@Injectable()
export class DeleteCategoryByExternalIdUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly category_repository: CategoryRepository,
  ) {}

  async execute(req: DeleteCategoryByExternalIdRequest): Promise<void> {
    const ok = await this.category_repository.delete_by_external_id(
      req.external_id,
    );
    if (!ok) {
      throw new NotFoundException('category not found');
    }
  }
}
