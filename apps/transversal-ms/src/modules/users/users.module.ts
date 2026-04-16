import { Module } from '@nestjs/common';
import { CognitoUserProvisioningAdapter } from '@infrastructure/cognito/cognito-user-provisioning.adapter';
import { CreateUserUseCase } from './application/use-cases/create-user/create-user.use-case';
import { GetUserByExternalIdUseCase } from './application/use-cases/get-user-by-external-id/get-user-by-external-id.use-case';
import { ListUsersUseCase } from './application/use-cases/list-users/list-users.use-case';
import { UpdateUserByExternalIdUseCase } from './application/use-cases/update-user-by-external-id/update-user-by-external-id.use-case';
import { DeleteUserByExternalIdUseCase } from './application/use-cases/delete-user-by-external-id/delete-user-by-external-id.use-case';
import { GetUserMeUseCase } from './application/use-cases/get-user-me/get-user-me.use-case';
import { UsersController } from './presentation/users.controller';
import { COGNITO_USER_PROVISIONING_PORT } from './users.tokens';

@Module({
  controllers: [UsersController],
  providers: [
    CognitoUserProvisioningAdapter,
    {
      provide: COGNITO_USER_PROVISIONING_PORT,
      useExisting: CognitoUserProvisioningAdapter,
    },
    CreateUserUseCase,
    GetUserByExternalIdUseCase,
    ListUsersUseCase,
    UpdateUserByExternalIdUseCase,
    DeleteUserByExternalIdUseCase,
    GetUserMeUseCase,
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
