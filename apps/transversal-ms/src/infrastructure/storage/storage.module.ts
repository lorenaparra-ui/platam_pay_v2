import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { S3Adapter } from '@infrastructure/storage/s3.adapter';
import { HttpRemoteFileFetchAdapter } from '@infrastructure/storage/http/http-remote-file-fetch.adapter';
import {
  REMOTE_FILE_FETCH_PORT,
  STORAGE_PORT,
} from '@modules/transversal/transversal.tokens';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    S3Adapter,
    HttpRemoteFileFetchAdapter,
    {
      provide: STORAGE_PORT,
      useExisting: S3Adapter,
    },
    {
      provide: REMOTE_FILE_FETCH_PORT,
      useExisting: HttpRemoteFileFetchAdapter,
    },
  ],
  exports: [STORAGE_PORT, REMOTE_FILE_FETCH_PORT],
})
export class StorageModule {}
