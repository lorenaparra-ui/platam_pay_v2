import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ListBusinessSenioritiesUseCase } from '@modules/businesses/application/use-cases/list-business-seniorities/list-business-seniorities.use-case';
import { BusinessSeniorityResponseDto } from '../dto/business-seniority-response.dto';

@ApiTags('business-seniority')
@Controller('business-seniority')
export class BusinessSeniorityPublicController {
  constructor(
    private readonly list_business_seniorities: ListBusinessSenioritiesUseCase,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: BusinessSeniorityResponseDto, isArray: true })
  async list(): Promise<BusinessSeniorityResponseDto[]> {
    const items = await this.list_business_seniorities.execute();
    return items.map((item) => new BusinessSeniorityResponseDto(item));
  }
}
