import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import type {
  ClientRegistrationPort,
  CreatePersonData,
  CreateBusinessData,
  PersonPipelineData,
} from '@modules/credit-applications/application/ports/client-registration.port';

@Injectable()
export class TypeormClientRegistrationAdapter implements ClientRegistrationPort {
  constructor(
    @InjectDataSource()
    private readonly data_source: DataSource,
  ) {}

  async resolve_city_internal_id(city_external_id: string): Promise<number | null> {
    const rows: Array<{ id: number }> = await this.data_source.query(
      `SELECT id FROM transversal_schema.cities WHERE external_id = $1 LIMIT 1`,
      [city_external_id],
    );
    return rows[0]?.id ?? null;
  }

  async find_person_by_doc_number(doc_number: string): Promise<number | null> {
    const rows: Array<{ id: number }> = await this.data_source.query(
      `SELECT id FROM transversal_schema.persons WHERE doc_number = $1 LIMIT 1`,
      [doc_number],
    );
    return rows[0]?.id ?? null;
  }

  async get_person_internal_id_by_external_id(external_id: string): Promise<number | null> {
    const rows: Array<{ id: number }> = await this.data_source.query(
      `SELECT id FROM transversal_schema.persons WHERE external_id = $1::uuid LIMIT 1`,
      [external_id],
    );
    return rows[0]?.id ?? null;
  }

  /**
   * Campos no cubiertos por el contrato SQS create-person (email, fecha nacimiento).
   */
  async patch_person_email_and_birth_date(
    person_id: number,
    email: string | null,
    birth_date_iso: string | null,
  ): Promise<void> {
    await this.data_source.query(
      `UPDATE transversal_schema.persons
       SET email = COALESCE($2, email),
           birth_date = COALESCE($3::date, birth_date)
       WHERE id = $1`,
      [person_id, email, birth_date_iso],
    );
  }

  async create_person(data: CreatePersonData): Promise<number> {
    const rows: Array<{ id: number }> = await this.data_source.query(
      `INSERT INTO transversal_schema.persons
         (external_id, first_name, last_name, doc_type, doc_number, phone, email, city_id)
       VALUES
         (gen_random_uuid(), $1, $2, $3::transversal_schema.persons_doc_type_enum, $4, $5, $6, $7)
       RETURNING id`,
      [
        data.first_name,
        data.last_name,
        data.doc_type,
        data.doc_number,
        data.phone ?? null,
        data.email ?? null,
        data.city_id ?? null,
      ],
    );
    return rows[0].id;
  }

  async find_business_by_person_id(person_id: number): Promise<number | null> {
    const rows: Array<{ id: number }> = await this.data_source.query(
      `SELECT id FROM suppliers_schema.businesses WHERE person_id = $1 ORDER BY id DESC LIMIT 1`,
      [person_id],
    );
    return rows[0]?.id ?? null;
  }

  async get_person_for_pipeline(person_id: number): Promise<PersonPipelineData | null> {
    const rows: Array<{
      id: number;
      doc_number: string;
      doc_type: string;
      first_name: string;
      last_name: string;
      phone: string | null;
      email: string | null;
    }> = await this.data_source.query(
      `SELECT id, doc_number, doc_type, first_name, last_name, phone, email
       FROM transversal_schema.persons
       WHERE id = $1 LIMIT 1`,
      [person_id],
    );
    const row = rows[0];
    if (!row) return null;
    return {
      internal_id: row.id,
      doc_number: row.doc_number,
      doc_type: row.doc_type,
      first_name: row.first_name,
      last_name: row.last_name,
      phone: row.phone,
      email: row.email,
    };
  }

  async create_business(data: CreateBusinessData): Promise<number> {
    const rows: Array<{ id: number }> = await this.data_source.query(
      `INSERT INTO suppliers_schema.businesses
         (external_id, person_id, entity_type, business_name, business_address,
          business_type, relationship_to_business, city_id)
       VALUES
         (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7)
       RETURNING id`,
      [
        data.person_id,
        data.entity_type,
        data.business_name ?? null,
        data.business_address ?? null,
        data.business_type ?? null,
        data.relationship_to_business ?? null,
        data.city_id ?? null,
      ],
    );
    return rows[0].id;
  }
}
