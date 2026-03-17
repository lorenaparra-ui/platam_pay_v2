import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export abstract class BaseExternalIdEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({
    name: "external_id",
    type: "uuid",
    unique: true,
    insert: false,
    update: false,
  })
  externalId: string;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamptz",
    insert: false,
    update: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamptz",
    insert: false,
    update: false,
  })
  updatedAt: Date;
}
