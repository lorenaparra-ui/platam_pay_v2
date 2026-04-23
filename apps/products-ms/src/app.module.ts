import { MONOREPO_ENV_PATH } from './config/dotenv.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsDataModule } from '@app/products-data';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { AuthModule } from '@modules/auth/auth.module';
import { CategoriesModule } from '@modules/categories/categories.module';
import { CreditFacilitiesModule } from '@modules/credit-facilities/credit-facilities.module';
import { CreditApplicationsModule } from '@modules/credit-applications/credit-applications.module';
import appConfig from './config/app.config';
import { sqs_config } from './config/sqs.config';
import { appController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, sqs_config],
      envFilePath: MONOREPO_ENV_PATH,
    }),
    InfrastructureModule,
    ProductsDataModule,
    AuthModule,
    CategoriesModule,
    CreditFacilitiesModule,
    CreditApplicationsModule,
  ],
  controllers: [appController],
})
export class AppModule {}
