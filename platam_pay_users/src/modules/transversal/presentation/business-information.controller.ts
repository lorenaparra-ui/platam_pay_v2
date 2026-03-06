import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { GetBusinessInformationUseCase } from '../application/use-cases/get-business-information.use-case';
import { BusinessInformationResponseDto } from '../application/dto/business-information-response.dto';

@ApiTags('Transversal - Business Information')
@Controller('transversal/business-information')
export class BusinessInformationController {
  constructor(private readonly get_business_information_use_case: GetBusinessInformationUseCase) {}

  @Get(':tax_id')
  @ApiOperation({ summary: 'Obtener información empresarial por NIT desde API externa RUES' })
  @ApiParam({ name: 'tax_id', description: 'NIT / identificador tributario' })
  @ApiResponse({
    status: 200,
    description: 'Información empresarial encontrada',
    type: BusinessInformationResponseDto,
  })
  @ApiResponse({ status: 404, description: 'No se encontró información para el NIT indicado' })
  async getByTaxId(@Param('tax_id') tax_id: string): Promise<BusinessInformationResponseDto> {
    const result = await this.get_business_information_use_case.execute(tax_id);
    if (!result) {
      throw new NotFoundException(`No se encontró información empresarial para el NIT ${tax_id}`);
    }
    return result;
  }
}
