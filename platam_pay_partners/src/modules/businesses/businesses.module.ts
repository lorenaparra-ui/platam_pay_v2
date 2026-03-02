import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BusinessEntity } from "@infrastructure/database/entities/business.entity";
import { TypeOrmBusinessRepository } from "@infrastructure/database/repositories/typeorm-business.repository";
import { BUSINESS_REPOSITORY } from "./domain/ports/business.repository.port";

@Module({
  imports: [TypeOrmModule.forFeature([BusinessEntity])],
  providers: [
    {
      provide: BUSINESS_REPOSITORY,
      useClass: TypeOrmBusinessRepository,
    },
  ],
  exports: [BUSINESS_REPOSITORY],
})
export class BusinessesModule {}
