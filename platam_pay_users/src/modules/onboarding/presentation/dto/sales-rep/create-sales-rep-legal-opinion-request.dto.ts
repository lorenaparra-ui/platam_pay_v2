import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { OnboardingContextDto, SalesRepOpinionDto } from '../base';

export class CreateSalesRepLegalOpinionRequestDto {
  @ApiProperty({ type: OnboardingContextDto })
  @ValidateNested()
  @Type(() => OnboardingContextDto)
  context: OnboardingContextDto;

  @ApiProperty({ type: SalesRepOpinionDto })
  @ValidateNested()
  @Type(() => SalesRepOpinionDto)
  opinion: SalesRepOpinionDto;
}
