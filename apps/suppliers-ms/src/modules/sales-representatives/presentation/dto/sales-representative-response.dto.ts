import { ApiProperty } from '@nestjs/swagger';

export class SalesRepresentativeResponseDto {
  @ApiProperty()
  internal_id: number;

  @ApiProperty({ format: 'uuid' })
  external_id: string;

  @ApiProperty({ format: 'uuid' })
  partner_external_id: string;

  @ApiProperty({ format: 'uuid', nullable: true })
  user_external_id: string | null;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
