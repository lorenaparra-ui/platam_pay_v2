import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/** Respuesta HTTP sin `zapsign_token` ni otros secretos de firma. */
export class ContractPublicResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ format: 'uuid' })
  external_id: string;

  @ApiPropertyOptional({ nullable: true })
  user_id: number | null;

  @ApiPropertyOptional({
    format: 'uuid',
    nullable: true,
    description: 'Plantilla usada para instanciar el contrato (si aplica).',
  })
  contract_template_external_id: string | null;

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

  constructor(init: ContractPublicResponseDto) {
    Object.assign(this, init);
  }
}
