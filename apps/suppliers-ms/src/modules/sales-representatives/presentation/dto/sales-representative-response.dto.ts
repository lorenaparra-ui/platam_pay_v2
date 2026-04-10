import { ApiProperty } from '@nestjs/swagger';
import { UserStates } from '@platam/shared';

export class SalesRepresentativeResponseDto {
  @ApiProperty()
  internal_id: number;

  @ApiProperty({ format: 'uuid' })
  external_id: string;

  @ApiProperty({ format: 'uuid' })
  partner_external_id: string;

  @ApiProperty({ format: 'uuid', nullable: true })
  user_external_id: string | null;

  @ApiProperty({ nullable: true, description: 'Nombre para mostrar (persona o email)' })
  user_display_name: string | null;

  @ApiProperty({ nullable: true })
  user_role_name: string | null;

  @ApiProperty({ enum: UserStates, nullable: true })
  user_state: UserStates | null;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
