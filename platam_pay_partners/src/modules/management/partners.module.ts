import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PartnersEntity } from "@infrastructure/database/entities/partners.entity";
import { TypeOrmPartnersRepository } from "@infrastructure/database/repositories/typeorm-partners.repository";
import { PARTNERS_REPOSITORY } from "./domain/ports/partner.repository.port";
import { PartnersController } from "./presentation/partners.controller";

@Module({
  imports: [TypeOrmModule.forFeature([PartnersEntity])],
  controllers: [PartnersController],
  providers: [
    {
      provide: PARTNERS_REPOSITORY,
      useClass: TypeOrmPartnersRepository,
    },
  ],
  exports: [PARTNERS_REPOSITORY],
})
export class PartnersModule {}
