import {
  Module,
  DynamicModule,
  Provider,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FILE_STORAGE_PORT } from '@transversal/domain/ports/storage/file-storage.port';
import { FileStorageService } from '@transversal/application/services/file-storage.service';
import { S3StorageAdapter } from '@infrastructure/storage/s3/s3-storage.adapter';
import { S3ConfigService } from '@infrastructure/storage/s3/s3.config';
import { StorageExampleController } from './storage-example.controller';

export interface StorageModuleOptions {
  /** Si true, registra el controlador de ejemplo (solo para desarrollo/demo). */
  registerExampleController?: boolean;
}

/**
 * Módulo de almacenamiento de archivos (hexagonal).
 * - Inyectar FILE_STORAGE_PORT o FileStorageService en otros módulos.
 * - Para reutilizar en otro microservicio: importar StorageModule y usar FileStorageService
 *   o inyectar FILE_STORAGE_PORT con la implementación que corresponda (ej. S3).
 */
@Module({})
export class StorageModule {
  static forRoot(options: StorageModuleOptions = {}): DynamicModule {
    const providers: Provider[] = [
      S3ConfigService,
      {
        provide: FILE_STORAGE_PORT,
        useClass: S3StorageAdapter,
      },
      FileStorageService,
    ];
    const controllers = options.registerExampleController
      ? [StorageExampleController]
      : [];

    return {
      global: true,
      module: StorageModule,
      imports: [ConfigModule],
      providers,
      controllers,
      exports: [FILE_STORAGE_PORT, FileStorageService],
    };
  }
}
