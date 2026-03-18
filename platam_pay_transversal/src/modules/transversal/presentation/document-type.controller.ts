import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { GetDocumentTypesUseCase } from '../application/use-cases/get-document-types.use-case';
import { DocumentTypeResponseDto } from '../application/dto/document-type-response.dto';

@ApiTags('Transversal - Document Types')
@Controller('transversal/document-types')
export class DocumentTypeController {
  constructor(private readonly getDocumentTypesUseCase: GetDocumentTypesUseCase) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los tipos de documento' })
  @ApiResponse({
    status: 200,
    description: 'Lista de tipos de documento',
    type: [DocumentTypeResponseDto],
  })
  async findAll(): Promise<DocumentTypeResponseDto[]> {
    return this.getDocumentTypesUseCase.execute();
  }

  @Get('code/:code')
  @ApiOperation({ summary: 'Obtener un tipo de documento por su código' })
  @ApiParam({ name: 'code', description: 'Código del tipo de documento (ej: CC, NIT, CE)' })
  @ApiResponse({
    status: 200,
    description: 'Tipo de documento encontrado',
    type: DocumentTypeResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Tipo de documento no encontrado' })
  async findByCode(@Param('code') code: string): Promise<DocumentTypeResponseDto> {
    const documentType = await this.getDocumentTypesUseCase.executeByCode(code);
    if (!documentType) {
      throw new NotFoundException(`Tipo de documento con código ${code} no encontrado`);
    }
    return documentType;
  }
}
