import { Module } from "@nestjs/common";
import { PartnersModule } from "../partners/partners.module";
import { PartnersController } from "./presentation/partners.controller";

/**
 * Módulo de management: solo expone el controlador delgado de partners.
 * Toda la lógica de negocio vive en PartnersModule.
 */
@Module({
  imports: [PartnersModule],
  controllers: [PartnersController],
})
export class ManagementModule {}
