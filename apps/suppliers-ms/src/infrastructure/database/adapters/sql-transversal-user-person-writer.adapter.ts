import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { randomUUID } from 'crypto';
import type { TransversalUserPersonWriterPort } from '@modules/partners/application/ports/transversal-user-person-writer.port';

@Injectable()
export class SqlTransversalUserPersonWriterAdapter
  implements TransversalUserPersonWriterPort
{
  private readonly logger = new Logger(SqlTransversalUserPersonWriterAdapter.name);

  constructor(@InjectDataSource() private readonly data_source: DataSource) {}

  async create_user_and_person(input: Readonly<{
    email: string;
    country_code: string | null;
    first_name: string;
    last_name: string;
    doc_type: string;
    doc_number: string;
    phone: string | null;
    city_external_id: string | null;
  }>): Promise<Readonly<{ user_external_id: string; person_external_id: string }>> {
    const user_external_id = randomUUID();
    const person_external_id = randomUUID();
    const cognito_sub = randomUUID();

    let city_id: number | null = null;
    if (input.city_external_id !== null && input.city_external_id.length > 0) {
      const city_rows = (await this.data_source.query(
        `SELECT id FROM transversal_schema.cities WHERE external_id = $1::uuid LIMIT 1`,
        [input.city_external_id],
      )) as Array<{ id: string | number }>;
      if (!city_rows?.length) {
        throw new NotFoundException('city not found');
      }
      city_id = Number(city_rows[0].id);
    }

    const query_runner = this.data_source.createQueryRunner();
    await query_runner.connect();
    await query_runner.startTransaction();
    try {
      const user_rows = (await query_runner.query(
        `INSERT INTO transversal_schema.users (
          external_id, cognito_sub, email, role_id, status_id, last_login_at
        ) VALUES (
          $1::uuid, $2::uuid, $3, NULL,
          (SELECT get_status_id('users', 'active')),
          NULL
        )
        RETURNING id, external_id`,
        [user_external_id, cognito_sub, input.email],
      )) as Array<{ id: string | number; external_id: string }>;

      const user_id = Number(user_rows[0].id);

      await query_runner.query(
        `INSERT INTO transversal_schema.persons (
          external_id, user_id, country_code, first_name, last_name, doc_type, doc_number,
          doc_issue_date, birth_date, gender, phone, residential_address, business_address, city_id
        ) VALUES (
          $1::uuid, $2, $3, $4, $5, $6, $7,
          NULL, NULL, NULL, $8, NULL, NULL, $9
        )`,
        [
          person_external_id,
          user_id,
          input.country_code,
          input.first_name,
          input.last_name,
          input.doc_type,
          input.doc_number,
          input.phone,
          city_id,
        ],
      );

      await query_runner.commitTransaction();
    } catch (err: unknown) {
      await query_runner.rollbackTransaction();
      const code =
        err && typeof err === 'object' && 'code' in err
          ? String((err as { code: unknown }).code)
          : '';
      if (code === '23505') {
        throw new ConflictException('user or person already exists');
      }
      const message = err instanceof Error ? err.message : String(err);
      this.logger.error(`transversal user/person tx failed: ${message}`);
      throw err;
    } finally {
      await query_runner.release();
    }

    return { user_external_id, person_external_id };
  }
}
