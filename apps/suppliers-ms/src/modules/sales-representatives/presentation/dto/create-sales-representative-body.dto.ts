import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class CreateSalesRepresentativeBodyDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID('4')
  partnerExternalId!: string;

  @ApiPropertyOptional({ format: 'uuid' })
  @IsOptional()
  @IsUUID('4')
  userExternalId?: string;
}
