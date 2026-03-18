import { User } from '../models/user.model';

/** Token DI (Symbol) — patrón hexagonal explícito */
export const USERS_REPOSITORY = Symbol('UserRepositoryPort');

export interface CreateUserPayload {
  cognitoSub: string;
  email: string;
  phone?: string | null;
  roleId?: number | null;
  statusId?: number;
  lastLoginAt?: Date | null;
}

export type UpdateUserPayload = Partial<CreateUserPayload>;

export interface UserRepositoryPort {
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  findByExternalId(externalId: string): Promise<User | null>;
  create(payload: CreateUserPayload): Promise<User>;
  updateByExternalId(
    externalId: string,
    payload: UpdateUserPayload,
  ): Promise<User | null>;
  deleteByExternalId(externalId: string): Promise<boolean>;
}
