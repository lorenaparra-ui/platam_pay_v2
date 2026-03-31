import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { QueryFailedError } from 'typeorm';
import type { UseCase } from '@platam/shared';
import { CreatePersonUseCase } from '@modules/persons/application/use-cases/create-person/create-person.use-case';
import { CreatePersonRequest } from '@modules/persons/application/use-cases/create-person/create-person.request';
import { CreateUserUseCase } from '@modules/users/application/use-cases/create-user/create-user.use-case';
import { CreateUserRequest } from '@modules/users/application/use-cases/create-user/create-user.request';
import { USER_REPOSITORY } from '@modules/users/users.tokens';
import type { UserRepository } from '@modules/users/domain/ports/user.ports';
import {
  PARTNER_CREATE_USER_SQS_IDEMPOTENCY_PORT,
  ROLE_REPOSITORY,
  STATUS_REPOSITORY,
} from '@modules/transversal/transversal.tokens';
import type { RoleRepository } from '@modules/transversal/domain/ports/catalog/role.repository.port';
import type { StatusRepository } from '@modules/transversal/domain/ports/catalog/status.repository.port';

import { CreatePartnerUserInboundEventDto } from '../../../../transversal/application/dto/create-partner-user-inbound.dto';
import { CreatePartnerUserSqsValidationError } from '../../../../transversal/application/exceptions/create-partner-user-sqs.validation.error';
import { PartnerCreateUserSqsIdempotencyPort } from '@modules/users/domain/ports/partner-create-user-sqs-idempotency.port';
import { RoleName } from '../../enums/role.enum';


const USERS_STATUS_ENTITY = 'users';
const USER_ACTIVE_CODE = 'active';

export type IngestPartnerCreateUserSqsCommand = Readonly<{
  body: string;
  delete_on_validation_error: boolean;
}>;

const PG_UNIQUE_VIOLATION = '23505';

@Injectable()
export class IngestPartnerCreateUserSqsMessageUseCase
  implements UseCase<IngestPartnerCreateUserSqsCommand, boolean>
{
  private readonly logger = new Logger(IngestPartnerCreateUserSqsMessageUseCase.name);

  constructor(
    @Inject(PARTNER_CREATE_USER_SQS_IDEMPOTENCY_PORT)
    private readonly idempotency: PartnerCreateUserSqsIdempotencyPort,
    @Inject(ROLE_REPOSITORY)
    private readonly role_repository: RoleRepository,
    @Inject(STATUS_REPOSITORY)
    private readonly status_repository: StatusRepository,
    @Inject(USER_REPOSITORY)
    private readonly user_repository: UserRepository,
    private readonly create_user: CreateUserUseCase,
    private readonly create_person: CreatePersonUseCase,
  ) {}

  async execute(command: IngestPartnerCreateUserSqsCommand): Promise<boolean> {
    let parsed: unknown;
    try {
      parsed = JSON.parse(command.body) as unknown;
    } catch {
      this.logger.warn(
        '[CreatePartnerUser][correlationId=unknown][step=parse] cuerpo no es JSON válido.',
      );
      return command.delete_on_validation_error;
    }

    const correlation_for_log = this.try_correlation_id(parsed) ?? 'unknown';
    const dto = plainToInstance(CreatePartnerUserInboundEventDto, parsed as object, {
      enableImplicitConversion: true,
    });
    const errors = validateSync(dto as object, { forbidUnknownValues: false });
    if (errors.length > 0) {
      const message = errors
        .map((e) => Object.values(e.constraints ?? {}).join(', '))
        .join('; ');
      this.logger.warn(
        `[CreatePartnerUser][correlationId=${correlation_for_log}][step=validation] ${message}`,
      );
      return command.delete_on_validation_error;
    }

    const begin = await this.idempotency.begin(dto.idempotency_key, dto.correlation_id);
    if (begin.status === 'duplicate') {
      this.logger.log(
        `[CreatePartnerUser][correlationId=${dto.correlation_id}][step=idempotent_hit]`,
      );
      return true;
    }
    if (begin.status === 'conflict') {
      this.logger.warn(
        `[CreatePartnerUser][correlationId=${dto.correlation_id}][step=idempotency_conflict]`,
      );
      return false;
    }

    const payload = dto.payload;
    const email_trimmed = payload.email.trim();

    try {
      const status_ref = await this.status_repository.find_by_entity_type_and_code(
        USERS_STATUS_ENTITY,
        USER_ACTIVE_CODE,
      );
      if (status_ref === null) {
        throw new CreatePartnerUserSqsValidationError('users/active status not found in catalog');
      }

      const role_ref = await this.role_repository.find_by_name(RoleName.PARTNER_OPERATIONS);
      if (role_ref === null) {
        throw new CreatePartnerUserSqsValidationError(
          `role ${RoleName.PARTNER_OPERATIONS} not found in catalog`,
        );
      }

      const cognito_sub = randomUUID();
      let user_external_id: string;
      try {
        const created_user = await this.create_user.execute(
          new CreateUserRequest(
            cognito_sub,
            email_trimmed,
            status_ref.external_id,
            role_ref.external_id,
            null,
          ),
        );
        user_external_id = created_user.external_id;
      } catch (err: unknown) {
        if (this.is_unique_violation(err)) {
          const existing = await this.user_repository.find_by_email(email_trimmed);
          if (existing === null) {
            throw err;
          }
          user_external_id = existing.external_id;
          this.logger.log(
            `[CreatePartnerUser][correlationId=${dto.correlation_id}][step=user_dedup_email]`,
          );
        } else {
          throw err;
        }
      }

      const created_person = await this.create_person.execute(
        new CreatePersonRequest(
          user_external_id,
          payload.country_code,
          payload.first_name.trim(),
          payload.last_name.trim(),
          payload.doc_type.trim(),
          payload.doc_number.trim(),
          null,
          null,
          null,
          payload.phone,
          null,
          null,
          payload.city_external_id,
        ),
      );

      await this.idempotency.complete(dto.idempotency_key, {
        user_external_id,
        person_external_id: created_person.external_id,
      });

      this.logger.log(
        `[CreatePartnerUser][correlationId=${dto.correlation_id}][step=completed]`,
      );
      return true;
    } catch (err: unknown) {
      await this.idempotency.release(dto.idempotency_key);

      if (err instanceof CreatePartnerUserSqsValidationError) {
        this.logger.warn(
          `[CreatePartnerUser][correlationId=${dto.correlation_id}][step=rejected] ${err.message}`,
        );
        return command.delete_on_validation_error;
      }
      if (err instanceof NotFoundException) {
        this.logger.warn(
          `[CreatePartnerUser][correlationId=${dto.correlation_id}][step=not_found] ${err.message}`,
        );
        return command.delete_on_validation_error;
      }
      if (this.is_unique_violation(err)) {
        this.logger.warn(
          `[CreatePartnerUser][correlationId=${dto.correlation_id}][step=unique_violation]`,
        );
        return command.delete_on_validation_error;
      }
      const text = err instanceof Error ? err.message : String(err);
      this.logger.error(
        `[CreatePartnerUser][correlationId=${dto.correlation_id}][step=failed] ${text}`,
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
}
