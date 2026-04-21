import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@modules/auth/infrastructure/guards/jwt-auth.guard';
import { CurrentUser } from '@modules/auth/presentation/decorators/current-user.decorator';
import type { RequestContext } from '@modules/auth/application/request-context.interface';
import { GetUserMeUseCase } from '@modules/users/application/use-cases/get-user-me/get-user-me.use-case';
import type { GetUserMeResult } from '@modules/users/application/use-cases/get-user-me/get-user-me.result';
import {
  UserMeHierarchyDto,
  UserMeProfileDto,
  UserMeResponseDto,
} from '@modules/users/application/dto/user-me-response.dto';

function to_user_me_response_dto(result: GetUserMeResult): UserMeResponseDto {
  const hierarchy = new UserMeHierarchyDto();
  hierarchy.parentId = result.user.hierarchy.parentId;
  hierarchy.partnerId = result.user.hierarchy.partnerId;
  hierarchy.salesRepExternalId = result.user.hierarchy.salesRepExternalId;

  const user = new UserMeProfileDto();
  user.externalId = result.user.externalId;
  user.email = result.user.email;
  user.fullName = result.user.fullName;
  user.role = result.user.role;
  user.hierarchy = hierarchy;

  const dto = new UserMeResponseDto();
  dto.user = user;
  dto.permissions = [...result.permissions];
  return dto;
}

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly get_user_me: GetUserMeUseCase) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('cognito-access-token')
  @ApiOperation({
    summary: 'Perfil y permisos del usuario autenticado',
    description:
      'Requiere access token de Cognito. Devuelve datos de negocio (`users`, `persons`) y códigos de permiso del rol.',
  })
  @ApiResponse({ status: 200, type: UserMeResponseDto })
  @ApiResponse({ status: 401, description: 'Token inválido o ausente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado en BD' })
  async get_me(@CurrentUser() ctx: RequestContext): Promise<UserMeResponseDto> {
    const result = await this.get_user_me.execute(ctx);
    return to_user_me_response_dto(result);
  }
}
