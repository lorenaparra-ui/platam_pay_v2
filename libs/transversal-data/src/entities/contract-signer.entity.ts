import { Column, Entity } from 'typeorm';
import { BaseExternalIdEntity } from '../../../products-data/src/entities/base-external-id.entity';

@Entity({ name: 'contract_signers', schema: 'transversal_schema' })
export class ContractSignerEntity extends BaseExternalIdEntity {
  @Column({ name: 'contract_id', type: 'bigint', nullable: true })
  contractId: number | null;

  @Column({ name: 'person_id', type: 'bigint', nullable: true })
  personId: number | null;

  @Column({ name: 'zapsign_signer_token', type: 'varchar', nullable: true })
  zapsignSignerToken: string | null;

  @Column({ name: 'status_id', type: 'bigint' })
  statusId: number;

  @Column({ name: 'sign_url', type: 'text', nullable: true })
  signUrl: string | null;

  @Column({ name: 'ip_address', type: 'varchar', length: 45, nullable: true })
  ipAddress: string | null;

  @Column({ name: 'geo_latitude', type: 'varchar', length: 20, nullable: true })
  geoLatitude: string | null;

  @Column({ name: 'geo_longitude', type: 'varchar', length: 20, nullable: true })
  geoLongitude: string | null;

  @Column({ name: 'signed_at', type: 'timestamptz', nullable: true })
  signedAt: Date | null;

  @Column({ name: 'document_photo_url', type: 'text', nullable: true })
  documentPhotoUrl: string | null;

  @Column({ name: 'document_verse_photo_url', type: 'text', nullable: true })
  documentVersePhotoUrl: string | null;

  @Column({ name: 'selfie_photo_url', type: 'text', nullable: true })
  selfiePhotoUrl: string | null;

  @Column({ name: 'signature_image_url', type: 'text', nullable: true })
  signatureImageUrl: string | null;
}
