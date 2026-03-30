import { Expose, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsObject,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class UploadFilesInboundItemDto {
  @Expose({ name: 'file' })
  @IsString()
  @MinLength(1)
  file!: string;

  @Expose({ name: 'folder' })
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  folder!: string;
}

export class UploadFilesInboundPayloadDto {
  @Expose({ name: 'bucket' })
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  bucket!: string;

  @Expose({ name: 'files' })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => UploadFilesInboundItemDto)
  files!: UploadFilesInboundItemDto[];
}

/**
 * Contrato entrante SQS (event upload-files, versión 1.0).
 */
export class UploadFilesInboundEventDto {
  @Expose()
  @IsString()
  @IsIn(['upload-files'])
  event!: string;

  @Expose()
  @IsString()
  @IsIn(['1.0'])
  version!: string;

  @Expose({ name: 'correlationId' })
  @IsString()
  @MinLength(8)
  @MaxLength(200)
  correlation_id!: string;

  @Expose({ name: 'idempotencyKey' })
  @IsString()
  @MinLength(8)
  @MaxLength(512)
  idempotency_key!: string;

  @Expose()
  @IsObject()
  @ValidateNested()
  @Type(() => UploadFilesInboundPayloadDto)
  payload!: UploadFilesInboundPayloadDto;
}
