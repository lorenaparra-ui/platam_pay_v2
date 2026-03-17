export interface UserProps {
  id: number;
  externalId: string;
  cognitoSub: string;
  email: string;
  phone: string | null;
  roleId: number | null;
  statusId: number;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  public readonly id: number;
  public readonly externalId: string;
  public readonly cognitoSub: string;
  public readonly email: string;
  public readonly phone: string | null;
  public readonly roleId: number | null;
  public readonly statusId: number;
  public readonly lastLoginAt: Date | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(props: UserProps) {
    this.id = props.id;
    this.externalId = props.externalId;
    this.cognitoSub = props.cognitoSub;
    this.email = props.email;
    this.phone = props.phone;
    this.roleId = props.roleId;
    this.statusId = props.statusId;
    this.lastLoginAt = props.lastLoginAt;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
