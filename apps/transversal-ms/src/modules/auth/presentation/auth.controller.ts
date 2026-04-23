import {
  Body,
  ConflictException,
  Controller,
  ForbiddenException,
  HttpCode,
  InternalServerErrorException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { LoginRequestDto } from '@modules/auth/application/dto/login-request.dto';
import {
  AuthLoginResponseDto,
} from '@modules/auth/application/dto/auth-login-response.dto';
import { VerifyTotpRequestDto } from '@modules/auth/application/dto/verify-totp-request.dto';
import { TokensResponseDto } from '@modules/auth/application/dto/tokens-response.dto';
import { SetupMfaRequestDto } from '@modules/auth/application/dto/setup-mfa-request.dto';
import { SetupMfaResponseDto } from '@modules/auth/application/dto/setup-mfa-response.dto';
import { VerifyMfaSetupRequestDto } from '@modules/auth/application/dto/verify-mfa-setup-request.dto';
import { AuthTokensResponseDto } from '@modules/auth/application/dto/auth-tokens-response.dto';
import { LoginWithPasswordUseCase } from '@modules/auth/application/use-cases/login-with-password.use-case';
import { VerifyTotpUseCase } from '@modules/auth/application/use-cases/verify-totp.use-case';
import { SetupMfaUseCase } from '@modules/auth/application/use-cases/setup-mfa.use-case';
import { VerifyMfaSetupUseCase } from '@modules/auth/application/use-cases/verify-mfa-setup.use-case';
import { AuthDomainError } from '@modules/auth/domain/models/auth-error.model';
import type {
  AuthLoginResult,
  AuthTokens,
} from '@modules/auth/domain/models/auth-session.model';

function to_auth_tokens_response_dto(tokens: AuthTokens): AuthTokensResponseDto {
  const dto = new AuthTokensResponseDto();
  dto.accessToken = tokens.accessToken;
  dto.idToken = tokens.idToken;
  dto.refreshToken = tokens.refreshToken;
  dto.expiresIn = tokens.expiresIn;
  dto.tokenType = tokens.tokenType;
  return dto;
}

function to_auth_login_response_dto(result: AuthLoginResult): AuthLoginResponseDto {
  const dto = new AuthLoginResponseDto();
  dto.status = result.status;
  dto.challengeName = result.challengeName;
  dto.session = result.session;
  dto.tokens = result.tokens !== null ? to_auth_tokens_response_dto(result.tokens) : null;
  return dto;
}

function to_tokens_response_dto(tokens: AuthTokens): TokensResponseDto {
  const dto = new TokensResponseDto();
  dto.accessToken = tokens.accessToken;
  dto.idToken = tokens.idToken;
  dto.refreshToken = tokens.refreshToken;
  dto.expiresIn = tokens.expiresIn;
  dto.tokenType = tokens.tokenType;
  return dto;
}

function to_setup_mfa_response_dto(
  secret_code_url: string,
  session: string,
): SetupMfaResponseDto {
  const dto = new SetupMfaResponseDto();
  dto.secretCodeUrl = secret_code_url;
  dto.session = session;
  return dto;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly login_with_password: LoginWithPasswordUseCase,
    private readonly verify_totp: VerifyTotpUseCase,
    private readonly setup_mfa: SetupMfaUseCase,
    private readonly verify_mfa_setup: VerifyMfaSetupUseCase,
  ) {}

  @Post('login')
  @SkipThrottle()
  @ApiOperation({
    summary: 'Autentica email y contraseña en Cognito',
    description:
      'Inicia sesión con email y contraseña. Si Cognito exige un challenge, retorna estado y session para continuar el flujo.',
  })
  @ApiBody({ type: LoginRequestDto })
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Autenticación iniciada o completada',
    type: AuthLoginResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Payload inválido (formato de email, longitud de contraseña)',
  })
  @ApiResponse({ status: 401, description: 'Credenciales incorrectas' })
  @ApiResponse({ status: 403, description: 'Cuenta bloqueada' })
  async login(@Body() body: LoginRequestDto): Promise<AuthLoginResponseDto> {
    try {
      const result = await this.login_with_password.execute(body.email, body.password);
      return to_auth_login_response_dto(result);
    } catch (error: unknown) {
      return this.throw_http_error(error);
    }
  }

  @Post('login/totp')
  @SkipThrottle()
  @ApiOperation({
    summary: 'Valida código TOTP de Google Authenticator',
    description:
      'Responde el challenge SOFTWARE_TOKEN_MFA de Cognito y retorna tokens JWT.',
  })
  @ApiBody({ type: VerifyTotpRequestDto })
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Autenticación completada',
    type: TokensResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Payload inválido (código TOTP o sesión con formato incorrecto)',
  })
  @ApiResponse({ status: 401, description: 'Código TOTP incorrecto o sesión expirada' })
  @ApiResponse({ status: 403, description: 'Cuenta bloqueada' })
  async verify_totp_handler(
    @Body() body: VerifyTotpRequestDto,
  ): Promise<TokensResponseDto> {
    try {
      const tokens = await this.verify_totp.execute(
        body.email,
        body.session,
        body.totpCode,
      );
      return to_tokens_response_dto(tokens);
    } catch (error: unknown) {
      return this.throw_http_error(error);
    }
  }

  @Post('mfa/setup')
  @SkipThrottle()
  @ApiOperation({
    summary: 'Inicia configuración MFA TOTP para challenge MFA_SETUP',
    description:
      'Recibe la session de /auth/login (MFA_SETUP_REQUIRED), solicita SecretCode a Cognito y retorna session actualizada.',
  })
  @ApiBody({ type: SetupMfaRequestDto })
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'SecretCode de MFA generado',
    type: SetupMfaResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Payload inválido (session con formato incorrecto)',
  })
  @ApiResponse({ status: 401, description: 'Sesión expirada' })
  async setup_mfa_handler(@Body() body: SetupMfaRequestDto): Promise<SetupMfaResponseDto> {
    try {
      const setup = await this.setup_mfa.execute(body.session);
      return to_setup_mfa_response_dto(setup.secretCodeUrl, setup.session);
    } catch (error: unknown) {
      return this.throw_http_error(error);
    }
  }

  @Post('mfa/verify')
  @SkipThrottle()
  @ApiOperation({
    summary: 'Finaliza configuración MFA y completa autenticación',
    description:
      'Valida código TOTP para completar MFA_SETUP en Cognito y retornar tokens JWT.',
  })
  @ApiBody({ type: VerifyMfaSetupRequestDto })
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'MFA configurado y autenticación completada',
    type: TokensResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Payload inválido (código TOTP o session con formato incorrecto)',
  })
  @ApiResponse({ status: 401, description: 'Código TOTP incorrecto o sesión expirada' })
  async verify_mfa_setup_handler(
    @Body() body: VerifyMfaSetupRequestDto,
  ): Promise<TokensResponseDto> {
    try {
      const tokens = await this.verify_mfa_setup.execute(
        body.email,
        body.session,
        body.totpCode,
      );
      return to_tokens_response_dto(tokens);
    } catch (error: unknown) {
      return this.throw_http_error(error);
    }
  }

  private throw_http_error(error: unknown): never {
    if (error instanceof AuthDomainError) {
      if (error.code === 'INVALID_CREDENTIALS') {
        throw new UnauthorizedException('Credenciales incorrectas');
      }
      if (error.code === 'ACCOUNT_LOCKED') {
        throw new ForbiddenException(
          'Tu cuenta ha sido bloqueada. Contacta al equipo de desarrollo',
        );
      }
      if (error.code === 'INVALID_TOTP') {
        throw new UnauthorizedException(
          'Código incorrecto. Verifica Google Authenticator e intenta de nuevo',
        );
      }
      if (error.code === 'SESSION_EXPIRED') {
        throw new UnauthorizedException('Tu sesión ha expirado');
      }
      if (error.code === 'UNEXPECTED_AUTH_ERROR') {
        throw new ConflictException(
          'Se requiere completar setup MFA o cambio de contraseña en Cognito',
        );
      }
    }
    throw new InternalServerErrorException('No fue posible completar la autenticación');
  }
}
