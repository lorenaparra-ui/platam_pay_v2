import { Module } from '@nestjs/common';
import { CategoriesApplicationModule } from '@modules/categories/categories-application.module';

@Module({
  imports: [CategoriesApplicationModule],
  exports: [CategoriesApplicationModule],
})
export class CategoriesModule {}
