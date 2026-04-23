import { MONOREPO_ENV_PATH } from './config/dotenv.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import appConfig from './config/app.config';
import notifications_providers_config from './config/notifications-providers.config';
import { sqs_config } from './config/sqs.config';
import { appController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, sqs_config, notifications_providers_config],
      envFilePath: MONOREPO_ENV_PATH,
    }),
    InfrastructureModule,
  ],
  controllers: [appController],
})
export class AppModule {}
