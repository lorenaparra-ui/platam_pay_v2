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
import { UsersModule } from './modules/users/users.module';
import { PersonsModule } from './modules/persons/persons.module';
import { AuthModule } from './modules/auth/auth.module';


import { StorageModule } from '@shared/modules/storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: '.env',
    }),
    InfrastructureModule,
    CommonModule,
    StorageModule.forRoot({ registerExampleController: true }),
    TransversalModule,
    UsersModule,
    PersonsModule,
    AuthModule,
    
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
