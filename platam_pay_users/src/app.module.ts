import { Module } from '@nestjs/common';
// Modules
import { ConfigModule } from '@nestjs/config';

// Controllers
import { AppController } from './app.controller';

// Configs
import appConfig from './config/app.config';
import { CommonModule } from '@common/common.module';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { TransversalModule } from './modules/transversal/transversal.module';
import { OnboardingModule } from './modules/onboarding/onboarding.module';
import { UsersModule } from './modules/users/users.module';
import { PersonsModule } from './modules/persons/persons.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: '.env',
    }),
    InfrastructureModule,
    CommonModule,
    TransversalModule,
    OnboardingModule,
    UsersModule,
    PersonsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
