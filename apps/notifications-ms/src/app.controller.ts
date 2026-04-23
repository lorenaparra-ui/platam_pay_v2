import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthResponseDto } from '@common/dto/health-response.dto';

@ApiTags('health')
@Controller('health')
export class appController {
  @Get()
  @ApiOperation({ summary: 'Estado del servicio' })
  @ApiOkResponse({ description: 'Servicio operativo', type: HealthResponseDto })
  health(): HealthResponseDto {
    return { status: 'ok', service: 'notifications-ms' };
  }
}
