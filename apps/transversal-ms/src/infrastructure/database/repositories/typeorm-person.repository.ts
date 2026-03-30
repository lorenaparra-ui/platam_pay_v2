import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonEntity } from '@app/transversal-data';
import { PersonRepository } from '@modules/persons/domain/ports/person.ports';
import {
  Person,
  CreatePersonProps,
  UpdatePersonProps,
} from '@modules/persons/domain/models/person.models';
import { PersonMapper } from '@infrastructure/database/mappers/person.mapper';

const PERSON_SELECT = {
  id: true,
  externalId: true,
  userId: true,
  countryCode: true,
  firstName: true,
  lastName: true,
  docType: true,
  docNumber: true,
  docIssueDate: true,
  birthDate: true,
  gender: true,
  phone: true,
  residentialAddress: true,
  businessAddress: true,
  cityId: true,
  createdAt: true,
  updatedAt: true,
} as const;

@Injectable()
export class TypeormPersonRepository implements PersonRepository {
  constructor(
    @InjectRepository(PersonEntity)
    private readonly repo: Repository<PersonEntity>,
  ) {}

  async find_by_external_id(external_id: string): Promise<Person | null> {
    const row = await this.repo.findOne({
      where: { externalId: external_id },
      select: PERSON_SELECT,
    });
    return row ? PersonMapper.to_domain(row) : null;
  }

  async find_all(): Promise<Person[]> {
    const rows = await this.repo.find({
      select: PERSON_SELECT,
      order: { id: 'ASC' },
    });
    return rows.map((r) => PersonMapper.to_domain(r));
  }

  async create(props: CreatePersonProps): Promise<Person> {
    const rows = await this.repo.query(
      `INSERT INTO transversal_schema.persons (
        external_id, user_id, country_code, first_name, last_name, doc_type, doc_number,
        doc_issue_date, birth_date, gender, phone, residential_address, business_address, city_id
      ) VALUES (
        gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
      )
      RETURNING id, external_id, created_at, updated_at, user_id, country_code, first_name, last_name,
        doc_type, doc_number, doc_issue_date, birth_date, gender, phone, residential_address,
        business_address, city_id`,
      [
        props.user_id,
        props.country_code,
        props.first_name,
        props.last_name,
        props.doc_type,
        props.doc_number,
        props.doc_issue_date,
        props.birth_date,
        props.gender,
        props.phone,
        props.residential_address,
        props.business_address,
        props.city_id,
      ],
    );
    return PersonMapper.from_raw_row(rows[0] as Record<string, unknown>);
  }

  async update_by_external_id(
    external_id: string,
    patch: UpdatePersonProps,
  ): Promise<Person | null> {
    const existing = await this.repo.findOne({
      where: { externalId: external_id },
      select: { id: true },
    });
    if (!existing) {
      return null;
    }

    const columns: string[] = [];
    const values: unknown[] = [];
    let i = 1;

    const add = (col: string, val: unknown) => {
      columns.push(`"${col}" = $${i}`);
      values.push(val);
      i += 1;
    };

    if (patch.user_id !== undefined) {
      add('user_id', patch.user_id);
    }
    if (patch.country_code !== undefined) {
      add('country_code', patch.country_code);
    }
    if (patch.first_name !== undefined) {
      add('first_name', patch.first_name);
    }
    if (patch.last_name !== undefined) {
      add('last_name', patch.last_name);
    }
    if (patch.doc_type !== undefined) {
      add('doc_type', patch.doc_type);
    }
    if (patch.doc_number !== undefined) {
      add('doc_number', patch.doc_number);
    }
    if (patch.doc_issue_date !== undefined) {
      add('doc_issue_date', patch.doc_issue_date);
    }
    if (patch.birth_date !== undefined) {
      add('birth_date', patch.birth_date);
    }
    if (patch.gender !== undefined) {
      add('gender', patch.gender);
    }
    if (patch.phone !== undefined) {
      add('phone', patch.phone);
    }
    if (patch.residential_address !== undefined) {
      add('residential_address', patch.residential_address);
    }
    if (patch.business_address !== undefined) {
      add('business_address', patch.business_address);
    }
    if (patch.city_id !== undefined) {
      add('city_id', patch.city_id);
    }

    if (columns.length === 0) {
      return this.find_by_external_id(external_id);
    }

    columns.push(`"updated_at" = now()`);
    values.push(existing.id);
    await this.repo.query(
      `UPDATE transversal_schema.persons SET ${columns.join(', ')} WHERE id = $${i}`,
      values,
    );

    return this.find_by_external_id(external_id);
  }

  async delete_by_external_id(external_id: string): Promise<boolean> {
    const result = await this.repo.delete({ externalId: external_id });
    return (result.affected ?? 0) > 0;
  }
}
