import { MONOREPO_ENV_PATH } from './config/dotenv.config';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { PersonsModule } from '@modules/persons/persons.module';
import { UsersModule } from '@modules/users/users.module';
import appConfig from './config/app.config';
import { sqs_config } from './config/sqs.config';
import securityConfig from './config/security.config';
import { appController } from './app.controller';
import { TransversalModule } from '@modules/transversal/transversal.module';
import { AuthModule } from '@modules/auth/auth.module';
import { AllExceptionsFilter } from '@common/filters/all-exceptions.filter';
import { TransversalThrottlerGuard } from '@common/guards/transversal-throttler.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, sqs_config, securityConfig],
      envFilePath: MONOREPO_ENV_PATH,
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        throttlers: [
          {
            ttl: config.get<number>('security.http_throttle.ttl_ms') ?? 60_000,
            limit: config.get<number>('security.http_throttle.limit') ?? 120,
          },
        ],
      }),
    }),
    InfrastructureModule,
    AuthModule,
    TransversalModule,
    PersonsModule,
    UsersModule,
  ],
  controllers: [appController],
  providers: [
    { provide: APP_GUARD, useClass: TransversalThrottlerGuard },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})
export class AppModule {}