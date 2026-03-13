import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Query,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileStorageService } from '@transversal/application/services/file-storage.service';
import { StorageDomainError } from '@transversal/domain/errors/storage.error';

/**
 * Controlador de ejemplo para probar el módulo de almacenamiento.
 * Se registra solo si StorageModule.forRoot({ registerExampleController: true }).
 * No exponer en producción sin autenticación y validación de rutas.
 */
@ApiTags('storage-example')
@Controller('storage-example')
export class StorageExampleController {
  constructor(private readonly fileStorage: FileStorageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Subir un archivo (ejemplo)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        key: { type: 'string', example: 'documents/example.txt' },
      },
    },
  })
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body('key') key: string,
  ) {
    if (!file?.buffer || !key?.trim()) {
      throw new BadRequestException('Se requiere "file" y "key"');
    }
    try {
      const result = await this.fileStorage.upload({
        key: key.trim(),
        body: file.buffer,
        content_type: file.mimetype,
      });
      return result;
    } catch (error) {
      this.throwHttpError(error);
    }
  }

  @Get('download/*key')
  @ApiOperation({ summary: 'Descargar archivo por clave (ejemplo)' })
  async download(@Param('key') key: string | string[]) {
    const keyStr = this.normalizeKeyParam(key);
    if (!keyStr.trim()) {
      throw new BadRequestException('Se requiere key');
    }
    try {
      const buffer = await this.fileStorage.download(decodeURIComponent(keyStr));
      return {
        content: buffer.toString('base64'),
        key: keyStr,
      };
    } catch (error) {
      this.throwHttpError(error);
    }
  }

  @Get('signed-url')
  @ApiOperation({ summary: 'Obtener URL firmada (ejemplo)' })
  async getSignedUrl(
    @Query('key') key: string,
    @Query('expires') expires: string,
    @Query('method') method?: 'GET' | 'PUT',
  ) {
    if (!key?.trim()) {
      throw new BadRequestException('Se requiere query "key"');
    }
    const expires_in_seconds = Math.min(
      Math.max(parseInt(expires ?? '3600', 10) || 3600, 60),
      86400,
    );
    try {
      const url = await this.fileStorage.getSignedUrl({
        key: key.trim(),
        expires_in_seconds,
        method: method === 'PUT' ? 'PUT' : 'GET',
      });
      return { url, expires_in_seconds };
    } catch (error) {
      this.throwHttpError(error);
    }
  }

  @Delete('*key')
  @ApiOperation({ summary: 'Eliminar archivo por clave (ejemplo)' })
  async delete(@Param('key') key: string | string[]) {
    const keyStr = this.normalizeKeyParam(key);
    if (!keyStr.trim()) {
      throw new BadRequestException('Se requiere key');
    }
    try {
      await this.fileStorage.delete(decodeURIComponent(keyStr));
      return { deleted: true, key: keyStr };
    } catch (error) {
      this.throwHttpError(error);
    }
  }

  /** path-to-regexp v8 puede devolver el wildcard *key como string o string[]. */
  private normalizeKeyParam(key: string | string[] | undefined): string {
    if (key == null) return '';
    return Array.isArray(key) ? key.join('/') : String(key);
  }

  private throwHttpError(error: unknown): never {
    if (error instanceof StorageDomainError) {
      if (error.code === 'STORAGE_NOT_FOUND') {
        throw new NotFoundException({ code: error.code, message: error.message });
      }
      if (error.code === 'STORAGE_ACCESS_DENIED') {
        throw new ForbiddenException({ code: error.code, message: error.message });
      }
      if (error.code === 'STORAGE_INVALID_INPUT') {
        throw new BadRequestException({ code: error.code, message: error.message });
      }
      throw new BadRequestException({ code: error.code, message: error.message });
    }
    throw new BadRequestException('Error de almacenamiento');
  }
}
