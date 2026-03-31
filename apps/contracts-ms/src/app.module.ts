import { MONOREPO_ENV_PATH } from './config/dotenv.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { ContractsModule } from '@modules/contracts/contracts.module';
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
    ContractsModule,
  ],
  controllers: [appController],
})
export class AppModule {}
