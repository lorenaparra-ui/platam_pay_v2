import { Column, Entity } from 'typeorm';
import { BaseExternalIdEntity } from './base-external-id.entity';

@Entity('contracts')
export class ContractEntity extends BaseExternalIdEntity {
  @Column({ name: 'user_id', type: 'bigint' })
  userId: number;

  @Column({ name: 'application_id', type: 'bigint', nullable: true })
  applicationId: number | null;

  @Column({ name: 'zapsign_token', type: 'varchar', length: 255, nullable: true })
  zapsignToken: string | null;

  @Column({ name: 'status_id', type: 'bigint' })
  statusId: number;

  @Column({ name: 'original_file_url', type: 'text', nullable: true })
  originalFileUrl: string | null;

  @Column({ name: 'signed_file_url', type: 'text', nullable: true })
  signedFileUrl: string | null;

  @Column({ name: 'form_answers_json', type: 'jsonb', nullable: true })
  formAnswersJson: Record<string, unknown> | null;
}
