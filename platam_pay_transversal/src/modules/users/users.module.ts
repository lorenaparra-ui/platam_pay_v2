import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@libs/database';
import { PermissionEntity } from '@libs/database';
import { RolePermissionEntity } from '@libs/database';
import { TypeOrmUserRepository } from '@infrastructure/database/repositories/users/typeorm-user.repository';
import { TypeOrmPermissionRepository } from '@infrastructure/database/repositories/users/typeorm-permission.repository';
import { TypeOrmRolePermissionRepository } from '@infrastructure/database/repositories/users/typeorm-role-permission.repository';
import { USERS_REPOSITORY } from './domain/ports/user.repository.port';
import { PERMISSION_REPOSITORY } from './domain/ports/permission.repository.port';
import { ROLE_PERMISSION_REPOSITORY } from './domain/ports/role-permission.repository.port';
import { UsersController } from './presentation/users.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, PermissionEntity, RolePermissionEntity]),
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: USERS_REPOSITORY,
      useClass: TypeOrmUserRepository,
    },
    {
      provide: PERMISSION_REPOSITORY,
      useClass: TypeOrmPermissionRepository,
    },
    {
      provide: ROLE_PERMISSION_REPOSITORY,
      useClass: TypeOrmRolePermissionRepository,
    },
  ],
  exports: [USERS_REPOSITORY, PERMISSION_REPOSITORY, ROLE_PERMISSION_REPOSITORY],
})
export class UsersModule {}
