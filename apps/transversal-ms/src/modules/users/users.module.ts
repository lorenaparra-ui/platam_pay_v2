import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './application/use-cases/create-user/create-user.use-case';
import { GetUserByExternalIdUseCase } from './application/use-cases/get-user-by-external-id/get-user-by-external-id.use-case';
import { ListUsersUseCase } from './application/use-cases/list-users/list-users.use-case';
import { UpdateUserByExternalIdUseCase } from './application/use-cases/update-user-by-external-id/update-user-by-external-id.use-case';
import { DeleteUserByExternalIdUseCase } from './application/use-cases/delete-user-by-external-id/delete-user-by-external-id.use-case';


@Module({
  providers: [
    CreateUserUseCase,
    GetUserByExternalIdUseCase,
    ListUsersUseCase,
    UpdateUserByExternalIdUseCase,
    DeleteUserByExternalIdUseCase,
  ],
  exports: [
    CreateUserUseCase,
    GetUserByExternalIdUseCase,
    ListUsersUseCase,
    UpdateUserByExternalIdUseCase,
    DeleteUserByExternalIdUseCase,
  ],
})
export class UsersModule {}
