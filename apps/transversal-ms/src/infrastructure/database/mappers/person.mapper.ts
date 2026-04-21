import { PersonEntity } from '@app/transversal-data';
import { Person } from '@modules/persons/domain/models/person.models';

function parse_date_only(value: unknown): Date | null {
  if (value === null || value === undefined) {
    return null;
  }
  if (value instanceof Date) {
    return value;
  }
  const s = String(value);
  return s.length >= 10 ? new Date(s.slice(0, 10)) : new Date(s);
}

export class PersonMapper {
  static to_domain(row: PersonEntity): Person {
    return new Person(
      row.id,
      row.externalId,
      row.firstName,
      row.lastName,
      row.docType,
      row.docNumber,
      row.docIssueDate ? parse_date_only(row.docIssueDate) : null,
      row.birthDate ? parse_date_only(row.birthDate) : null,
      row.gender ?? null,
      row.phone ?? null,
      row.residentialAddress ?? null,
      row.cityId ?? null,
      row.createdAt,
      row.updatedAt,
    );
  }

  static from_raw_row(row: Record<string, unknown>): Person {
    return new Person(
      Number(row['id']),
      String(row['external_id']),
      String(row['first_name']),
      String(row['last_name']),
      String(row['doc_type']),
      String(row['doc_number']),
      parse_date_only(row['doc_issue_date']),
      parse_date_only(row['birth_date']),
      row['gender'] === null || row['gender'] === undefined
        ? null
        : String(row['gender']),
      row['phone'] === null || row['phone'] === undefined
        ? null
        : String(row['phone']),
      row['residential_address'] === null ||
      row['residential_address'] === undefined
        ? null
        : String(row['residential_address']),
      row['city_id'] === null || row['city_id'] === undefined
        ? null
        : Number(row['city_id']),
      new Date(String(row['created_at'])),
      new Date(String(row['updated_at'])),
    );
  }
}
