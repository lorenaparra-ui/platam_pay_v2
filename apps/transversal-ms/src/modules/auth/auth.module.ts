import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CognitoJwtStrategy } from './infrastructure/strategies/cognito-jwt.strategy';
import { JwtAuthGuard } from './infrastructure/guards/jwt-auth.guard';
import { RolesGuard } from './infrastructure/guards/roles.guard';
import { ScopeGuard } from './infrastructure/guards/scope.guard';
import { AuthController } from './presentation/auth.controller';
import { AUTH_PROVIDER } from '@modules/auth/domain/ports/auth-provider.port';
import { CognitoAuthProvider } from '@modules/auth/infrastructure/cognito/cognito-auth.provider';
import { LoginWithPasswordUseCase } from '@modules/auth/application/use-cases/login-with-password.use-case';
import { VerifyTotpUseCase } from '@modules/auth/application/use-cases/verify-totp.use-case';
import { SetupMfaUseCase } from '@modules/auth/application/use-cases/setup-mfa.use-case';
import { VerifyMfaSetupUseCase } from '@modules/auth/application/use-cases/verify-mfa-setup.use-case';
import { TypeormPermissionCodesByRoleReader } from '@infrastructure/database/readers/typeorm-permission-codes-by-role.reader';
import { PERMISSION_CODES_BY_ROLE_READER } from '@modules/auth/auth.tokens';

@Global()
@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [AuthController],
  providers: [
    CognitoJwtStrategy,
    JwtAuthGuard,
    RolesGuard,
    ScopeGuard,
    TypeormPermissionCodesByRoleReader,
    {
      provide: PERMISSION_CODES_BY_ROLE_READER,
      useExisting: TypeormPermissionCodesByRoleReader,
    },
    {
      provide: AUTH_PROVIDER,
      useClass: CognitoAuthProvider,
    },
    LoginWithPasswordUseCase,
    VerifyTotpUseCase,
    SetupMfaUseCase,
    VerifyMfaSetupUseCase,
  ],
  exports: [
    PassportModule,
    JwtAuthGuard,
    RolesGuard,
    ScopeGuard,
    PERMISSION_CODES_BY_ROLE_READER,
  ],
})
export class AuthModule {}
