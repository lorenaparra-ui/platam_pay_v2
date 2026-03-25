import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import appConfig from "./config/app.config";
import { CommonModule } from "@common/common.module";
import { InfrastructureModule } from "@infrastructure/infrastructure.module";
import { ContractsModule } from "@contracts/contracts.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: ".env",
    }),
    InfrastructureModule,
    CommonModule,
    ContractsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
