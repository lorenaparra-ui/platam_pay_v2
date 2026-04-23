import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransversalDataService } from './transversal-data.service';
import { TRANSVERSAL_DATA_ENTITIES } from './transversal-data.entities';

export { TRANSVERSAL_DATA_ENTITIES } from './transversal-data.entities';

@Module({
  imports: [TypeOrmModule.forFeature([...TRANSVERSAL_DATA_ENTITIES])],
  providers: [TransversalDataService],
  exports: [TypeOrmModule, TransversalDataService],
})
export class TransversalDataModule {}
