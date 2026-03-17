export type BusinessEntityType = 'PN' | 'PJ';

export interface BusinessProps {
  id: number;
  externalId: string;
  userId: number;
  cityId: number | null;
  entityType: BusinessEntityType;
  businessName: string | null;
  businessAddress: string | null;
  businessType: string | null;
  relationshipToBusiness: string | null;
  legalName: string | null;
  tradeName: string | null;
  taxId: string | null;
  yearOfEstablishment: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Business {
  public readonly id: number;
  public readonly externalId: string;
  public readonly userId: number;
  public readonly cityId: number | null;
  public readonly entityType: BusinessEntityType;
  public readonly businessName: string | null;
  public readonly businessAddress: string | null;
  public readonly businessType: string | null;
  public readonly relationshipToBusiness: string | null;
  public readonly legalName: string | null;
  public readonly tradeName: string | null;
  public readonly taxId: string | null;
  public readonly yearOfEstablishment: number | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(props: BusinessProps) {
    this.id = props.id;
    this.externalId = props.externalId;
    this.userId = props.userId;
    this.cityId = props.cityId;
    this.entityType = props.entityType;
    this.businessName = props.businessName;
    this.businessAddress = props.businessAddress;
    this.businessType = props.businessType;
    this.relationshipToBusiness = props.relationshipToBusiness;
    this.legalName = props.legalName;
    this.tradeName = props.tradeName;
    this.taxId = props.taxId;
    this.yearOfEstablishment = props.yearOfEstablishment;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
