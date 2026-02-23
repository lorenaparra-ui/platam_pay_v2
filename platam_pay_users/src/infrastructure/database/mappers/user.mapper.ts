import { User } from 'src/modules/users/domain/models/user.model';
import {
  CreateUserPayload,
  UpdateUserPayload,
} from 'src/modules/users/domain/ports/user.repository.port';
import { UserEntity } from '../entities/user.entity';

export class UserMapper {
  static toDomain(entity: UserEntity): User {
    return new User({
      id: entity.id,
      externalId: entity.externalId,
      cognitoSub: entity.cognitoSub,
      email: entity.email,
      phone: entity.phone,
      roleId: entity.roleId,
      statusId: entity.statusId,
      lastLoginAt: entity.lastLoginAt,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  static toEntity(domain: User): UserEntity {
    const entity = new UserEntity();
    entity.id = domain.id;
    entity.cognitoSub = domain.cognitoSub;
    entity.email = domain.email;
    entity.phone = domain.phone;
    entity.roleId = domain.roleId;
    entity.statusId = domain.statusId;
    entity.lastLoginAt = domain.lastLoginAt;
    return entity;
  }

  static toCreateEntity(payload: CreateUserPayload): UserEntity {
    const entity = new UserEntity();
    return this.applyMutableFields(entity, payload);
  }

  static applyUpdate(
    entity: UserEntity,
    payload: UpdateUserPayload,
  ): UserEntity {
    return this.applyMutableFields(entity, payload);
  }

  private static applyMutableFields(
    entity: UserEntity,
    payload: UpdateUserPayload,
  ): UserEntity {
    if (payload.cognitoSub !== undefined) entity.cognitoSub = payload.cognitoSub;
    if (payload.email !== undefined) entity.email = payload.email;
    if (payload.phone !== undefined) entity.phone = payload.phone;
    if (payload.roleId !== undefined) entity.roleId = payload.roleId;
    if (payload.statusId !== undefined) entity.statusId = payload.statusId;
    if (payload.lastLoginAt !== undefined) entity.lastLoginAt = payload.lastLoginAt;
    return entity;
  }
}
