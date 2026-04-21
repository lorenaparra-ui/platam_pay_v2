import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetCreditApplicationAuthorizationDataUseCase } from '@modules/credit-applications/application/use-cases/get-credit-application-authorization-data/get-credit-application-authorization-data.use-case';
import { GetCreditApplicationAuthorizationDataRequest } from '@modules/credit-applications/application/use-cases/get-credit-application-authorization-data/get-credit-application-authorization-data.request';
import { AuthorizeCreditApplicationUseCase } from '@modules/credit-applications/application/use-cases/authorize-credit-application/authorize-credit-application.use-case';
import { AuthorizeCreditApplicationRequest } from '@modules/credit-applications/application/use-cases/authorize-credit-application/authorize-credit-application.request';
import { AuthorizationDataResponseDto } from '../dto/authorization-data-response.dto';
import { AuthorizeResultResponseDto } from '../dto/authorize-result-response.dto';

@ApiTags('credit-applications')
@Controller('credit-applications/authorize')
export class CreditApplicationsAuthorizeController {
  constructor(
    private readonly get_authorization_data: GetCreditApplicationAuthorizationDataUseCase,
    private readonly authorize: AuthorizeCreditApplicationUseCase,
  ) {}

  @Get(':externalId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Estado de autorización de una solicitud (público)',
    description:
      'Sin JWT. Devuelve el estado de autorización para renderear la landing page del cliente.',
  })
  @ApiOkResponse({ type: AuthorizationDataResponseDto })
  async get_data(
    @Param('externalId', ParseUUIDPipe) externalId: string,
  ): Promise<AuthorizationDataResponseDto> {
    const result = await this.get_authorization_data.execute(
      new GetCreditApplicationAuthorizationDataRequest(externalId),
    );
    return AuthorizationDataResponseDto.from(result.authorizationStatus, result.externalId);
  }

  @Post(':externalId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'El cliente acepta la política de privacidad y autoriza la consulta (público)',
    description:
      'Sin JWT. Idempotente: si la solicitud ya fue autorizada devuelve already_authorized. ' +
      'Si no existe devuelve not_found. Si está en pending_authorization, transiciona a in_progress.',
  })
  @ApiOkResponse({ type: AuthorizeResultResponseDto })
  async accept(
    @Param('externalId', ParseUUIDPipe) externalId: string,
  ): Promise<AuthorizeResultResponseDto> {
    const result = await this.authorize.execute(
      new AuthorizeCreditApplicationRequest(externalId),
    );

    if (result.result === 'not_found') {
      throw new NotFoundException('Solicitud no encontrada');
    }

    return AuthorizeResultResponseDto.from(result.result);
  }
}
