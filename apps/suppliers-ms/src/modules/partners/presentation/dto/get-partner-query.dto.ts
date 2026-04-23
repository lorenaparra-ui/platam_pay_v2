import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetPartnerQueryDto {
  @ApiProperty({
    description: 'UUID v4 del partner (external_id)',
    format: 'uuid',
  })
  @IsUUID('4')
  @IsNotEmpty()
  externalId!: string;
}
