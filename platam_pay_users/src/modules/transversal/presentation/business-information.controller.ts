import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { GetBusinessInformationUseCase } from '../application/use-cases/get-business-information.use-case';
import { BusinessInformationResponseDto } from '../application/dto/business-information-response.dto';

@ApiTags('Transversal - Business Information')
@Controller('transversal/business-information')
export class BusinessInformationController {
  constructor(private readonly getBusinessInformationUseCase: GetBusinessInformationUseCase) {}

  @Get(':taxId')
  @ApiOperation({ summary: 'Obtener información empresarial por NIT desde API externa RUES' })
  @ApiParam({ name: 'taxId', description: 'NIT / identificador tributario' })
  @ApiResponse({
    status: 200,
    description: 'Información empresarial encontrada',
    type: BusinessInformationResponseDto,
  })
  @ApiResponse({ status: 404, description: 'No se encontró información para el NIT indicado' })
  async getByTaxId(@Param('taxId') taxId: string): Promise<BusinessInformationResponseDto> {
    const result = await this.getBusinessInformationUseCase.execute(taxId);
    if (!result) {
      throw new NotFoundException(`No se encontró información empresarial para el NIT ${taxId}`);
    }
    return result;
  }
}
