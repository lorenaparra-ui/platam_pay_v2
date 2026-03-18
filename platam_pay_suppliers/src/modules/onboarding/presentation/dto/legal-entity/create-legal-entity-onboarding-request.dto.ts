import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import {
  BusinessInformationDto,
  FinancialInformationDto,
  OnboardingContextDto,
  PersonInformationDto,
} from '../base';

export class ShareholderItemDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  documentType: string;

  @ApiProperty()
  @IsString()
  documentNumber: string;

  @ApiProperty({ example: 25.5, minimum: 0 })
  @IsNumber()
  @Min(0)
  percent: number;
}

export class CreateLegalEntityOnboardingRequestDto {
  @ApiProperty({ type: OnboardingContextDto })
  @ValidateNested()
  @Type(() => OnboardingContextDto)
  context: OnboardingContextDto;

  @ApiProperty({ example: 'Mi Empresa SAS' })
  @IsString()
  companyName: string;

  @ApiProperty({ example: 2020 })
  @IsNumber()
  @Min(1900)
  yearOfEstablishment: number;

  @ApiProperty({ type: PersonInformationDto })
  @ValidateNested()
  @Type(() => PersonInformationDto)
  legalRepresentative: PersonInformationDto;

  @ApiProperty({ type: BusinessInformationDto })
  @ValidateNested()
  @Type(() => BusinessInformationDto)
  business: BusinessInformationDto;

  @ApiProperty({ type: FinancialInformationDto })
  @ValidateNested()
  @Type(() => FinancialInformationDto)
  financial: FinancialInformationDto;

  @ApiProperty({ type: [ShareholderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ShareholderItemDto)
  shareholders: ShareholderItemDto[];
}
