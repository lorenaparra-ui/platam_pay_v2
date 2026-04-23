import { Inject, Injectable, Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { QueryFailedError } from 'typeorm';
import type { UseCase } from '@platam/shared';
import { PERSON_REPOSITORY } from '@modules/persons/persons.tokens';
import { CITY_REPOSITORY, PARTNER_CREATE_USER_SQS_IDEMPOTENCY_PORT } from '@modules/transversal/transversal.tokens';
import type { CityRepository } from '@modules/transversal/domain/ports/catalog/city.repository.port';
import type { PartnerCreateUserSqsIdempotencyPort } from '@modules/users/domain/ports/partner-create-user-sqs-idempotency.port';
import type { PersonRepository } from '@modules/persons/domain/ports/person.ports';
import { CreatePersonUseCase } from '@modules/persons/application/use-cases/create-person/create-person.use-case';
import { CreatePersonRequest } from '@modules/persons/application/use-cases/create-person/create-person.request';
import { CreatePersonInboundEventDto } from '@modules/transversal/application/dto/create-person-inbound.dto';

export type IngestCreatePersonSqsCommand = Readonly<{
  body: string;
  delete_on_validation_error: boolean;
}>;

const PG_UNIQUE_VIOLATION = '23505';

@Injectable()
export class IngestCreatePersonSqsMessageUseCase
  implements UseCase<IngestCreatePersonSqsCommand, boolean>
{
  private readonly logger = new Logger(IngestCreatePersonSqsMessageUseCase.name);

  constructor(
    @Inject(PARTNER_CREATE_USER_SQS_IDEMPOTENCY_PORT)
    private readonly idempotency: PartnerCreateUserSqsIdempotencyPort,
    @Inject(PERSON_REPOSITORY)
    private readonly person_repository: PersonRepository,
    @Inject(CITY_REPOSITORY)
    private readonly city_repository: CityRepository,
    private readonly create_person: CreatePersonUseCase,
  ) {}

  async execute(command: IngestCreatePersonSqsCommand): Promise<boolean> {
    let parsed: unknown;
    try {
      parsed = JSON.parse(command.body) as unknown;
    } catch {
      this.logger.warn('[CreatePerson][step=parse] cuerpo no es JSON válido.');
      return command.delete_on_validation_error;
    }

    const correlation_for_log = this.try_correlation_id(parsed) ?? 'unknown';
    const dto = plainToInstance(CreatePersonInboundEventDto, parsed as object, {
      enableImplicitConversion: true,
    });
    const errors = validateSync(dto as object, { forbidUnknownValues: false });
    if (errors.length > 0) {
      const message = errors
        .map((e) => Object.values(e.constraints ?? {}).join(', '))
        .join('; ');
      this.logger.warn(
        `[CreatePerson][correlationId=${correlation_for_log}][step=validation] ${message}`,
      );
      return command.delete_on_validation_error;
    }

    const begin = await this.idempotency.begin(dto.idempotency_key, dto.correlation_id);
    if (begin.status === 'duplicate') {
      this.logger.log(
        `[CreatePerson][correlationId=${dto.correlation_id}][step=idempotent_hit]`,
      );
      return true;
    }
    if (begin.status === 'conflict') {
      this.logger.warn(
        `[CreatePerson][correlationId=${dto.correlation_id}][step=idempotency_conflict]`,
      );
      return false;
    }

    const payload = dto.payload;

    try {
      const city_external_id = await this.resolve_city_external_id_lenient(
        dto.correlation_id,
        payload.city_external_id,
      );

      const created = await this.create_person.execute(
        new CreatePersonRequest(
          payload.first_name.trim(),
          payload.last_name.trim(),
          payload.doc_type.trim(),
          payload.doc_number.trim(),
          null,
          null,
          null,
          payload.phone ?? null,
          null,
          city_external_id,
        ),
      );

      await this.idempotency.complete(dto.idempotency_key, {
        user_external_id: 'n/a',
        person_external_id: created.external_id,
      });

      this.logger.log(
        `[CreatePerson][correlationId=${dto.correlation_id}][step=completed] person_external_id=${created.external_id}`,
      );
      return true;
    } catch (err: unknown) {
      if (this.is_unique_violation(err)) {
        // La persona ya existe (doc_number único violado). Recuperamos la existente
        // y completamos la idempotencia como si hubiera sido creada ahora.
        // No llamamos release(): el registro de idempotencia permanece válido.
        const existing = await this.person_repository.find_by_doc_number(
          payload.doc_number.trim(),
        );
        if (existing !== null) {
          await this.idempotency.complete(dto.idempotency_key, {
            user_external_id: 'n/a',
            person_external_id: existing.external_id,
          });
          this.logger.log(
            `[CreatePerson][correlationId=${dto.correlation_id}][step=dedup_completed] person_external_id=${existing.external_id}`,
          );
          return true;
        }
        // Persona no encontrada tras violación única (raza extrema): liberar y reintentar
        await this.idempotency.release(dto.idempotency_key);
        this.logger.warn(
          `[CreatePerson][correlationId=${dto.correlation_id}][step=unique_violation_no_record]`,
        );
        return false;
      }

      await this.idempotency.release(dto.idempotency_key);
      const text = err instanceof Error ? err.message : String(err);
      this.logger.error(
        `[CreatePerson][correlationId=${dto.correlation_id}][step=failed] ${text}`,
      );
      return false;
    }
  }

  private try_correlation_id(parsed: unknown): string | undefined {
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'correlationId' in parsed &&
      typeof (parsed as { correlationId: unknown }).correlationId === 'string'
    ) {
      return (parsed as { correlationId: string }).correlationId;
    }
    return undefined;
  }

  private is_unique_violation(err: unknown): boolean {
    return err instanceof QueryFailedError && err.driverError !== undefined
      ? String((err.driverError as { code?: string }).code) === PG_UNIQUE_VIOLATION
      : false;
  }

  /**
   * Si viene ciudad en el payload pero no existe en catálogo, no falla (solo log):
   * se crea la persona sin ciudad, igual que el flujo previo a delegar en CreatePersonUseCase.
   */
  private async resolve_city_external_id_lenient(
    correlation_id: string,
    city_external_id: string | null | undefined,
  ): Promise<string | null> {
    if (city_external_id === null || city_external_id === undefined) {
      return null;
    }
    const city = await this.city_repository.find_by_external_id(city_external_id);
    if (city === null) {
      this.logger.warn(
        `[CreatePerson][correlationId=${correlation_id}][step=city_not_found] city_external_id=${city_external_id}`,
      );
      return null;
    }
    return city_external_id;
  }
}
