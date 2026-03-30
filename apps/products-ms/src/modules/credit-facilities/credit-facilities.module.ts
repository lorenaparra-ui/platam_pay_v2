import { Module } from '@nestjs/common';
import { CreditFacilitiesApplicationModule } from '@modules/credit-facilities/credit-facilities-application.module';

@Module({
  imports: [CreditFacilitiesApplicationModule],
  exports: [CreditFacilitiesApplicationModule],
})
export class CreditFacilitiesModule {}
