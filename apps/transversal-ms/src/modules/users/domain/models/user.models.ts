export type UserState = 'active' | 'inactive';

export class User {
  constructor(
    readonly internal_id: number,
    readonly external_id: string,
    readonly cognito_sub: string,
    readonly email: string,
    readonly role_id: number | null,
    readonly state: UserState,
    readonly last_login_at: Date | null,
    readonly created_at: Date,
    readonly updated_at: Date,
  ) {}
}

export interface CreateUserProps {
  cognito_sub: string;
  email: string;
  role_id: number | null;
  state: UserState;
  last_login_at: Date | null;
}

export type UpdateUserProps = Partial<CreateUserProps>;
