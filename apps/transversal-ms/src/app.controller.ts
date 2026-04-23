import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { HealthResponseDto } from '@common/dto/health-response.dto';

@ApiTags('health')
@SkipThrottle()
@Controller('health')
export class appController {
  @Get()
  @ApiOperation({ summary: 'Estado del servicio' })
  @ApiOkResponse({ description: 'Servicio operativo', type: HealthResponseDto })
  health(): HealthResponseDto {
    return { status: 'ok', service: 'transversal-ms' };
  }
}
