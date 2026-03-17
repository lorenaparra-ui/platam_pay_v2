import { ApiProperty } from '@nestjs/swagger';
import { Business } from '../../domain/models/business.model';

export class BusinessResponseDto {
  @ApiProperty({ description: 'UUID público del negocio' })
  externalId: string;

  @ApiProperty({ example: 1, description: 'ID del usuario asociado' })
  userId: number;

  @ApiProperty({ example: 1, nullable: true, description: 'ID de la ciudad' })
  cityId: number | null;

  @ApiProperty({ example: 'PJ', enum: ['PN', 'PJ'] })
  entityType: string;

  @ApiProperty({ nullable: true })
  businessName: string | null;

  @ApiProperty({ nullable: true })
  businessAddress: string | null;

  @ApiProperty({ nullable: true })
  businessType: string | null;

  @ApiProperty({ nullable: true })
  relationshipToBusiness: string | null;

  @ApiProperty({ nullable: true })
  legalName: string | null;

  @ApiProperty({ nullable: true })
  tradeName: string | null;

  @ApiProperty({ nullable: true })
  taxId: string | null;

  @ApiProperty({ nullable: true })
  yearOfEstablishment: number | null;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  static fromDomain(model: Business): BusinessResponseDto {
    const dto = new BusinessResponseDto();
    dto.externalId = model.externalId;
    dto.userId = model.userId;
    dto.cityId = model.cityId;
    dto.entityType = model.entityType;
    dto.businessName = model.businessName;
    dto.businessAddress = model.businessAddress;
    dto.businessType = model.businessType;
    dto.relationshipToBusiness = model.relationshipToBusiness;
    dto.legalName = model.legalName;
    dto.tradeName = model.tradeName;
    dto.taxId = model.taxId;
    dto.yearOfEstablishment = model.yearOfEstablishment;
    dto.createdAt = model.createdAt.toISOString();
    dto.updatedAt = model.updatedAt.toISOString();
    return dto;
  }
}
