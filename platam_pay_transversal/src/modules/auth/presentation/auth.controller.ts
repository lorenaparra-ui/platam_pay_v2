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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginWithPasswordUseCase } from '../application/use-cases/login-with-password.use-case';
import { VerifyTotpUseCase } from '../application/use-cases/verify-totp.use-case';
import { SetupMfaUseCase } from '../application/use-cases/setup-mfa.use-case';
import { VerifyMfaSetupUseCase } from '../application/use-cases/verify-mfa-setup.use-case';
import { LoginRequestDto } from '../application/dto/login-request.dto';
import {
  AuthLoginResponseDto,
  AuthTokensResponseDto,
} from '../application/dto/auth-login-response.dto';
import { VerifyTotpRequestDto } from '../application/dto/verify-totp-request.dto';
import { TokensResponseDto } from '../application/dto/tokens-response.dto';
import { SetupMfaRequestDto } from '../application/dto/setup-mfa-request.dto';
import { SetupMfaResponseDto } from '../application/dto/setup-mfa-response.dto';
import { VerifyMfaSetupRequestDto } from '../application/dto/verify-mfa-setup-request.dto';
import { AuthDomainError } from '../domain/models/auth-error.model';
import {
  AuthLoginResult,
  AuthTokens,
} from '../domain/models/auth-session.model';

function toAuthTokensResponseDto(tokens: AuthTokens): AuthTokensResponseDto {
  const dto = new AuthTokensResponseDto();
  dto.accessToken = tokens.accessToken;
  dto.idToken = tokens.idToken;
  dto.refreshToken = tokens.refreshToken;
  dto.expiresIn = tokens.expiresIn;
  dto.tokenType = tokens.tokenType;
  return dto;
}

function toAuthLoginResponseDto(result: AuthLoginResult): AuthLoginResponseDto {
  const dto = new AuthLoginResponseDto();
  dto.status = result.status;
  dto.challengeName = result.challengeName;
  dto.session = result.session;
  dto.tokens = result.tokens ? toAuthTokensResponseDto(result.tokens) : null;
  return dto;
}

function toTokensResponseDto(tokens: AuthTokens): TokensResponseDto {
  const dto = new TokensResponseDto();
  dto.accessToken = tokens.accessToken;
  dto.idToken = tokens.idToken;
  dto.refreshToken = tokens.refreshToken;
  dto.expiresIn = tokens.expiresIn;
  dto.tokenType = tokens.tokenType;
  return dto;
}

function toSetupMfaResponseDto(
  secret_code_url: string,
  session: string,
): SetupMfaResponseDto {
  const dto = new SetupMfaResponseDto();
  dto.secret_code_url = secret_code_url;
  dto.session = session;
  return dto;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginWithPasswordUseCase: LoginWithPasswordUseCase,
    private readonly verifyTotpUseCase: VerifyTotpUseCase,
    private readonly setupMfaUseCase: SetupMfaUseCase,
    private readonly verifyMfaSetupUseCase: VerifyMfaSetupUseCase,
  ) {}

  @Post('login')
  @ApiOperation({
    summary: 'Autentica email y contrasena en Cognito',
    description:
      'Inicia sesion con email y contrasena. Si Cognito exige un challenge, retorna estado y session para continuar el flujo.',
  })
  @ApiBody({ type: LoginRequestDto })
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Autenticacion iniciada o completada',
    type: AuthLoginResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Payload invalido (formato de email, longitud de contrasena)',
  })
  @ApiResponse({ status: 401, description: 'Credenciales incorrectas' })
  @ApiResponse({ status: 403, description: 'Cuenta bloqueada' })
  async login(@Body() body: LoginRequestDto): Promise<AuthLoginResponseDto> {
    try {
      const result = await this.loginWithPasswordUseCase.execute(
        body.email,
        body.password,
      );
      return toAuthLoginResponseDto(result);
    } catch (error) {
      this.throwHttpError(error);
    }
  }

  @Post('login/totp')
  @ApiOperation({
    summary: 'Valida codigo TOTP de Google Authenticator',
    description:
      'Responde el challenge SOFTWARE_TOKEN_MFA de Cognito y retorna tokens JWT.',
  })
  @ApiBody({ type: VerifyTotpRequestDto })
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Autenticacion completada',
    type: TokensResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Payload invalido (codigo TOTP o sesion con formato incorrecto)',
  })
  @ApiResponse({ status: 401, description: 'Codigo TOTP incorrecto o sesion expirada' })
  @ApiResponse({ status: 403, description: 'Cuenta bloqueada' })
  async verifyTotp(
    @Body() body: VerifyTotpRequestDto,
  ): Promise<TokensResponseDto> {
    try {
      const tokens = await this.verifyTotpUseCase.execute(
        body.email,
        body.session,
        body.totpCode,
      );
      return toTokensResponseDto(tokens);
    } catch (error) {
      this.throwHttpError(error);
    }
  }

  @Post('mfa/setup')
  @ApiOperation({
    summary: 'Inicia configuracion MFA TOTP para challenge MFA_SETUP',
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
    description: 'Payload invalido (session con formato incorrecto)',
  })
  @ApiResponse({ status: 401, description: 'Sesion expirada' })
  async setupMfa(
    @Body() body: SetupMfaRequestDto,
  ): Promise<SetupMfaResponseDto> {
    try {
      const setup = await this.setupMfaUseCase.execute(body.session);
      return toSetupMfaResponseDto(setup.secret_code_url, setup.session);
    } catch (error) {
      this.throwHttpError(error);
    }
  }

  @Post('mfa/verify')
  @ApiOperation({
    summary: 'Finaliza configuracion MFA y completa autenticacion',
    description:
      'Valida codigo TOTP para completar MFA_SETUP en Cognito y retornar tokens JWT.',
  })
  @ApiBody({ type: VerifyMfaSetupRequestDto })
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'MFA configurado y autenticacion completada',
    type: TokensResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Payload invalido (codigo TOTP o session con formato incorrecto)',
  })
  @ApiResponse({ status: 401, description: 'Codigo TOTP incorrecto o sesion expirada' })
  async verifyMfaSetup(
    @Body() body: VerifyMfaSetupRequestDto,
  ): Promise<TokensResponseDto> {
    try {
      const tokens = await this.verifyMfaSetupUseCase.execute(
        body.email,
        body.session,
        body.totpCode,
      );
      return toTokensResponseDto(tokens);
    } catch (error) {
      this.throwHttpError(error);
    }
  }

  private throwHttpError(error: unknown): never {
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
          'Codigo incorrecto. Verifica Google Authenticator e intenta de nuevo',
        );
      }
      if (error.code === 'SESSION_EXPIRED') {
        throw new UnauthorizedException('Tu sesion ha expirado');
      }
      if (error.code === 'UNEXPECTED_AUTH_ERROR') {
        throw new ConflictException(
          'Se requiere completar setup MFA o cambio de contrasena en Cognito',
        );
      }
    }
    throw new InternalServerErrorException(
      'No fue posible completar la autenticacion',
    );
  }
}

