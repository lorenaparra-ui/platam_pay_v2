import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DISBURSEMENT_DATA_ENTITIES } from './entities/disbursement-data.entities';
import { DisbursementDataService } from './disbursement-data.service';

export { DISBURSEMENT_DATA_ENTITIES } from './entities/disbursement-data.entities';

@Module({
  imports: [TypeOrmModule.forFeature([...DISBURSEMENT_DATA_ENTITIES])],
  providers: [DisbursementDataService],
  exports: [TypeOrmModule, DisbursementDataService],
})
export class DisbursementDataModule {}
