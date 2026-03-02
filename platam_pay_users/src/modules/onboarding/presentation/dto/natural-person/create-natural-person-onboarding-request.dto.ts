import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  ValidateNested,
} from 'class-validator';
import {
  BusinessInformationDto,
  FinancialInformationDto,
  OnboardingContextDto,
  PersonInformationDto,
} from '../base';

export class CreateNaturalPersonOnboardingRequestDto {
  @ApiProperty({ type: OnboardingContextDto })
  @ValidateNested()
  @Type(() => OnboardingContextDto)
  context: OnboardingContextDto;

  @ApiProperty({ type: PersonInformationDto })
  @ValidateNested()
  @Type(() => PersonInformationDto)
  applicant: PersonInformationDto;

  @ApiProperty({ type: BusinessInformationDto })
  @ValidateNested()
  @Type(() => BusinessInformationDto)
  business: BusinessInformationDto;

  @ApiProperty({ type: FinancialInformationDto })
  @ValidateNested()
  @Type(() => FinancialInformationDto)
  financial: FinancialInformationDto;

  @ApiProperty({ example: false })
  @IsBoolean()
  isPartnerClient: boolean;
}
