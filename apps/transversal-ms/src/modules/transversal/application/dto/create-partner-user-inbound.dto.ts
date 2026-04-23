import { Expose, Transform, Type } from 'class-transformer';
import {
  IsEmail,
  IsIn,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

const empty_string_to_null = ({ value }: { value: unknown }): unknown =>
  value === '' ? null : value;

export class CreatePartnerUserInboundPayloadDto {
  @Expose({ name: 'email' })
  @IsEmail()
  @MaxLength(320)
  email!: string;

  @Expose({ name: 'country_code' })
  @IsOptional()
  @Transform(empty_string_to_null)
  @ValidateIf((o: CreatePartnerUserInboundPayloadDto) => o.country_code !== null)
  @IsString()
  @MinLength(2)
  @MaxLength(2)
  country_code!: string | null;

  @Expose({ name: 'first_name' })
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  first_name!: string;

  @Expose({ name: 'last_name' })
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  last_name!: string;

  @Expose({ name: 'doc_type' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  doc_type!: string;

  @Expose({ name: 'doc_number' })
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  doc_number!: string;

  @Expose({ name: 'phone' })
  @IsOptional()
  @Transform(empty_string_to_null)
  @ValidateIf((o: CreatePartnerUserInboundPayloadDto) => o.phone !== null)
  @IsString()
  @MaxLength(64)
  phone!: string | null;

  @Expose({ name: 'city_external_id' })
  @IsOptional()
  @Transform(empty_string_to_null)
  @ValidateIf((o: CreatePartnerUserInboundPayloadDto) => o.city_external_id !== null)
  @IsUUID('4')
  city_external_id!: string | null;
}

/**
 * Contrato entrante SQS (event create-partner-user, versión 1.0).
 */
export class CreatePartnerUserInboundEventDto {
  @Expose()
  @IsString()
  @IsIn(['create-partner-user'])
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
  @Type(() => CreatePartnerUserInboundPayloadDto)
  payload!: CreatePartnerUserInboundPayloadDto;
}
