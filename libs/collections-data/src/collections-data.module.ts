import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { COLLECTIONS_DATA_ENTITIES } from './entities/collections-data.entities';
import { CollectionsDataService } from './collections-data.service';

export { COLLECTIONS_DATA_ENTITIES } from './entities/collections-data.entities';

@Module({
  imports: [TypeOrmModule.forFeature([...COLLECTIONS_DATA_ENTITIES])],
  providers: [CollectionsDataService],
  exports: [TypeOrmModule, CollectionsDataService],
})
export class CollectionsDataModule {}
