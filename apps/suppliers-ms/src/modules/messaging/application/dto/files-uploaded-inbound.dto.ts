import { Expose, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

export class FilesUploadedItemDto {
  @Expose()
  @IsString()
  url!: string;

  @Expose()
  @IsString()
  folder!: string;
}

export class FilesUploadedPayloadDto {
  @Expose({ name: 'files' })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => FilesUploadedItemDto)
  files!: FilesUploadedItemDto[];
}

export class FilesUploadedInboundDto {
  @Expose()
  @IsString()
  @IsIn(['files-uploaded'])
  event!: string;

  @Expose({ name: 'correlationId' })
  @IsString()
  correlation_id!: string;

  @Expose()
  @IsObject()
  @ValidateNested()
  @Type(() => FilesUploadedPayloadDto)
  payload!: FilesUploadedPayloadDto;
}
