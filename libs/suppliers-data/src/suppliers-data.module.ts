import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuppliersDataService } from './suppliers-data.service';
import { SUPPLIERS_DATA_ENTITIES } from './suppliers-data.entities';

export { SUPPLIERS_DATA_ENTITIES } from './suppliers-data.entities';

@Module({
  imports: [TypeOrmModule.forFeature([...SUPPLIERS_DATA_ENTITIES])],
  providers: [SuppliersDataService],
  exports: [TypeOrmModule, SuppliersDataService],
})
export class SuppliersDataModule {}
