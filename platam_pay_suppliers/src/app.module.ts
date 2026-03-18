import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { CommonModule } from "@common/common.module";
import appConfig from "./config/app.config";
import { InfrastructureModule } from "@infrastructure/infrastructure.module";
import { ManagementModule } from "./modules/management/management.module";
import { BusinessesModule } from "./modules/businesses/businesses.module";
import { SuppliersModule } from "./modules/suppliers/suppliers.module";
import { OnboardingModule } from "./modules/onboarding/onboarding.module";
import { SalesRepresentativesModule } from "./modules/sales-representatives/sales-representatives.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: ".env",
    }),
    InfrastructureModule,
    CommonModule,
    ManagementModule,
    BusinessesModule,
    SuppliersModule,
    OnboardingModule,
    SalesRepresentativesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
