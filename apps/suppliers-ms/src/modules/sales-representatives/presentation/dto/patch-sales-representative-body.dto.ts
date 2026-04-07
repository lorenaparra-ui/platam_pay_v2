import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class PatchSalesRepresentativeBodyDto {
  @ApiPropertyOptional({
    format: 'uuid',
    nullable: true,
    description: 'UUID del usuario a vincular, o null para desvincular',
  })
  @IsOptional()
  @IsUUID('4')
  user_external_id?: string | null;
}
