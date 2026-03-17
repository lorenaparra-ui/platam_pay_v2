import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetBusinessSenioritiesUseCase } from '../application/use-cases/get-business-seniorities.use-case';
import { BusinessSeniorityResponseDto } from '../application/dto/business-seniority-response.dto';

@ApiTags('Transversal - Business Seniority')
@Controller('transversal/business-seniorities')
export class BusinessSeniorityController {
  constructor(
    private readonly getBusinessSenioritiesUseCase: GetBusinessSenioritiesUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los rangos de antigüedad de negocio' })
  @ApiResponse({
    status: 200,
    description: 'Lista de rangos de antigüedad',
    type: [BusinessSeniorityResponseDto],
  })
  async findAll(): Promise<BusinessSeniorityResponseDto[]> {
    return this.getBusinessSenioritiesUseCase.execute();
  }
}
