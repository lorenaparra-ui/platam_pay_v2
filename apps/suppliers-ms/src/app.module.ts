import { MONOREPO_ENV_PATH } from './config/dotenv.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { BusinessesModule } from '@modules/businesses/businesses.module';
import { PartnersModule } from '@modules/partners/partners.module';
import { SuppliersModule } from '@modules/suppliers/suppliers.module';
import { BankAccountsModule } from '@modules/bank-accounts/bank-accounts.module';
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
    BusinessesModule,
    PartnersModule,
    SuppliersModule,
    BankAccountsModule,
  ],
  controllers: [appController],
})
export class AppModule {}
