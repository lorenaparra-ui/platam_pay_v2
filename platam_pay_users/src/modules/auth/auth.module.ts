import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './presentation/auth.controller';
import { AUTH_PROVIDER } from './domain/ports/auth-provider.port';
import { CognitoAuthProvider } from '@infrastructure/cognito/cognito-auth.provider';
import { LoginWithPasswordUseCase } from './application/use-cases/login-with-password.use-case';
import { VerifyTotpUseCase } from './application/use-cases/verify-totp.use-case';
import { SetupMfaUseCase } from './application/use-cases/setup-mfa.use-case';
import { VerifyMfaSetupUseCase } from './application/use-cases/verify-mfa-setup.use-case';

@Module({
  imports: [ConfigModule],
  controllers: [AuthController],
  providers: [
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
    AUTH_PROVIDER,
    LoginWithPasswordUseCase,
    VerifyTotpUseCase,
    SetupMfaUseCase,
    VerifyMfaSetupUseCase,
  ],
})
export class AuthModule {}

