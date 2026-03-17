export interface PersonProps {
  id: number;
  externalId: string;
  userId: number;
  countryCode: string | null;
  firstName: string;
  lastName: string;
  docType: string;
  docNumber: string;
  docIssueDate: Date | null;
  birthDate: Date | null;
  gender: string | null;
  phone: string | null;
  residentialAddress: string | null;
  businessAddress: string | null;
  cityId: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Person {
  public readonly id: number;
  public readonly externalId: string;
  public readonly userId: number;
  public readonly countryCode: string | null;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly docType: string;
  public readonly docNumber: string;
  public readonly docIssueDate: Date | null;
  public readonly birthDate: Date | null;
  public readonly gender: string | null;
  public readonly phone: string | null;
  public readonly residentialAddress: string | null;
  public readonly businessAddress: string | null;
  public readonly cityId: number | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(props: PersonProps) {
    this.id = props.id;
    this.externalId = props.externalId;
    this.userId = props.userId;
    this.countryCode = props.countryCode;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.docType = props.docType;
    this.docNumber = props.docNumber;
    this.docIssueDate = props.docIssueDate;
    this.birthDate = props.birthDate;
    this.gender = props.gender;
    this.phone = props.phone;
    this.residentialAddress = props.residentialAddress;
    this.businessAddress = props.businessAddress;
    this.cityId = props.cityId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
