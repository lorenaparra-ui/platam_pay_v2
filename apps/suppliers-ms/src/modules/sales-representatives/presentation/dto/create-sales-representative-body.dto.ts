import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class CreateSalesRepresentativeBodyDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID('4')
  partner_external_id: string;

  @ApiPropertyOptional({ format: 'uuid' })
  @IsOptional()
  @IsUUID('4')
  user_external_id?: string;
}
