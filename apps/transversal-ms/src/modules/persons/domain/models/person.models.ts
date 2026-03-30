export class Person {
  constructor(
    readonly internal_id: number,
    readonly external_id: string,
    readonly user_id: number,
    readonly country_code: string | null,
    readonly first_name: string,
    readonly last_name: string,
    readonly doc_type: string,
    readonly doc_number: string,
    readonly doc_issue_date: Date | null,
    readonly birth_date: Date | null,
    readonly gender: string | null,
    readonly phone: string | null,
    readonly residential_address: string | null,
    readonly business_address: string | null,
    readonly city_id: number | null,
    readonly created_at: Date,
    readonly updated_at: Date,
  ) {}
}

export interface CreatePersonProps {
  user_id: number;
  country_code: string | null;
  first_name: string;
  last_name: string;
  doc_type: string;
  doc_number: string;
  doc_issue_date: Date | null;
  birth_date: Date | null;
  gender: string | null;
  phone: string | null;
  residential_address: string | null;
  business_address: string | null;
  city_id: number | null;
}

export type UpdatePersonProps = Partial<CreatePersonProps>;
