import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";

import appConfig from "./config/app.config";
import { InfrastructureModule } from "@infrastructure/infrastructure.module";
import { CreditApplicationsModule } from "./modules/credit-applications/credit-applications.module";
import { CreditFacilitiesModule } from "./modules/credit-facilities/credit-facilities.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: ".env",
    }),
    InfrastructureModule,
    CreditApplicationsModule,
    CreditFacilitiesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
