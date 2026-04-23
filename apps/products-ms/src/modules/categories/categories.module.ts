import { Module } from '@nestjs/common';
import { CategoriesApplicationModule } from '@modules/categories/categories-application.module';
import { CategoriesPublicController } from '@modules/categories/presentation/controllers/categories-public.controller';

@Module({
  imports: [CategoriesApplicationModule],
  controllers: [CategoriesPublicController],
  exports: [CategoriesApplicationModule],
})
export class CategoriesModule {}
