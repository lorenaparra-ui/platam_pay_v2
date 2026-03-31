import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/** Respuesta HTTP sin `zapsign_token` ni otros secretos de firma. */
export class ContractPublicResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ format: 'uuid' })
  external_id: string;

  @ApiProperty()
  user_id: number;

  @ApiPropertyOptional({ nullable: true })
  application_id: number | null;

  @ApiPropertyOptional({ format: 'uuid', nullable: true })
  status_external_id: string | null;

  @ApiPropertyOptional({ nullable: true })
  original_file_url: string | null;

  @ApiPropertyOptional({ nullable: true })
  signed_file_url: string | null;

  @ApiPropertyOptional({
    nullable: true,
    description: 'JSON almacenado; puede contener datos sensibles según el formulario.',
  })
  form_answers_json: Record<string, unknown> | null;

  @ApiProperty()
  created_at: string;

  @ApiProperty()
  updated_at: string;

  constructor(init: ContractPublicResponseDto) {
    Object.assign(this, init);
  }
}
