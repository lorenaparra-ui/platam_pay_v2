import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AsyncJobStatus, AsyncJobStep, new_uuid } from '@platam/shared';
import { CREDIT_APPLICATION_JOB_REPOSITORY } from '@modules/credit-applications/credit-applications.tokens';
import type { CreditApplicationJobRepository } from '@modules/credit-applications/domain/ports/credit-application-job.port';
import { PRODUCTS_REFERENCE_LOOKUP } from '@common/ports/products-reference-lookup.port';
import type { ProductsReferenceLookupPort } from '@common/ports/products-reference-lookup.port';
import {
  CLIENT_REGISTRATION_PORT,
  ClientRegistrationPort,
} from '@modules/credit-applications/application/ports/client-registration.port';
import { PublishCreatePersonCommandUseCase } from '@messaging/application/use-cases/publish-create-person-command.use-case';
import { PublishCreateBusinessJobUseCase } from '@messaging/application/use-cases/publish-create-business-job.use-case';
import { ValidationFailedError } from '@messaging/application/exceptions/validation-failed.error';
import { EnqueueNaturalPersonCreditApplicationRequest } from './enqueue-natural-person-credit-application.request';
import { EnqueueNaturalPersonCreditApplicationResponse } from './enqueue-natural-person-credit-application.response';

@Injectable()
export class EnqueueNaturalPersonCreditApplicationUseCase {
  constructor(
    @Inject(CREDIT_APPLICATION_JOB_REPOSITORY)
    private readonly job_repository: CreditApplicationJobRepository,
    @Inject(PRODUCTS_REFERENCE_LOOKUP)
    private readonly products_lookup: ProductsReferenceLookupPort,
    @Inject(CLIENT_REGISTRATION_PORT)
    private readonly client_registration: ClientRegistrationPort,
    private readonly publish_create_person: PublishCreatePersonCommandUseCase,
    private readonly publish_create_business_job: PublishCreateBusinessJobUseCase,
  ) {}

  async execute(
    req: EnqueueNaturalPersonCreditApplicationRequest,
  ): Promise<EnqueueNaturalPersonCreditApplicationResponse> {
    if (req.idempotencyKey) {
      const existing = await this.job_repository.find_by_idempotency_key(req.idempotencyKey);
      if (existing) {
        return new EnqueueNaturalPersonCreditApplicationResponse(existing.externalId);
      }
    }

    const partner_internal_id = await this.products_lookup.get_partner_internal_id_by_external_id(
      req.partnerId,
    );
    if (partner_internal_id === null) {
      throw new NotFoundException('partner no encontrado');
    }

    const sales_rep_internal_id =
      await this.products_lookup.get_sales_representative_internal_id_by_external_id(
        req.salesRepId,
        partner_internal_id,
      );
    if (sales_rep_internal_id === null) {
      throw new NotFoundException(
        'representante de ventas no encontrado o no pertenece al partner indicado',
      );
    }

    let city_internal_id: number | null = null;
    if (req.cityId) {
      city_internal_id = await this.client_registration.resolve_city_internal_id(req.cityId);
    }

    const job = await this.job_repository.create({
      status: AsyncJobStatus.RUNNING,
      step: AsyncJobStep.ENQUEUED,
      payload: {
        partner_id: req.partnerId,
        sales_rep_id: req.salesRepId,
        doc_number: req.docNumber,
        doc_type: req.docType,
        first_name: req.firstName,
        last_name: req.lastName,
        phone: req.phone ?? null,
        email: req.email ?? null,
        city_id: req.cityId ?? null,
        birth_date: req.birthDate ?? null,
        business_type: req.businessType,
        business_name: req.businessName ?? null,
        business_address: req.businessAddress ?? null,
        relationship_to_business: req.relationshipToBusiness ?? null,
        business_seniority: req.businessSeniority ?? null,
        number_of_employees: req.numberOfEmployees ?? null,
        number_of_locations: req.numberOfLocations ?? null,
        business_flagship_m2: req.businessFlagshipM2 ?? null,
        business_has_rent: req.businessHasRent ?? null,
        business_rent_amount: req.businessRentAmount ?? null,
        requested_credit_line: req.requestedCreditLine,
        monthly_purchases: req.monthlyPurchases ?? null,
        current_purchases: req.currentPurchases ?? null,
        total_assets: req.totalAssets ?? null,
        monthly_income: req.monthlyIncome ?? null,
        monthly_expenses: req.monthlyExpenses ?? null,
        privacy_policy_accepted: req.privacyPolicyAccepted ?? false,
      },
      resolvedIds: {
        partner_internal_id,
        sales_rep_internal_id,
        city_internal_id: city_internal_id ?? null,
      },
      idempotency_key: req.idempotencyKey ?? null,
    });

    const person_id = await this.client_registration.find_person_by_doc_number(req.docNumber);

    if (person_id !== null) {
      const business_id = await this.client_registration.find_business_by_person_id(person_id);
      if (business_id !== null) {
        try {
          await this.publish_create_business_job.execute_already_resolved(
            job.externalId,
            person_id,
            business_id,
          );
        } catch {
          // Non-blocking; worker will retry
        }
        await this.job_repository.update_status_and_step(
          job.id,
          AsyncJobStatus.RUNNING,
          AsyncJobStep.AWAITING_BUSINESS_CREATION,
          { person_internal_id: person_id, business_internal_id: business_id },
        );
      } else {
        try {
          await this.publish_create_business_job.execute(job.externalId, person_id, {
            city_internal_id: city_internal_id ?? null,
            entity_type: req.businessType,
            business_name: req.businessName ?? null,
            business_address: req.businessAddress ?? null,
            business_type: req.businessType ?? null,
            relationship_to_business: req.relationshipToBusiness ?? null,
          });
        } catch {
          // Non-blocking; worker will retry
        }
        await this.job_repository.update_status_and_step(
          job.id,
          AsyncJobStatus.RUNNING,
          AsyncJobStep.AWAITING_BUSINESS_CREATION,
          { person_internal_id: person_id },
        );
      }
    } else {
      const correlation_id = new_uuid();
      const sqs_idempotency_key = `job_create_person_${job.externalId}`;
      try {
        await this.publish_create_person.execute({
          correlation_id,
          idempotency_key: sqs_idempotency_key,
          first_name: req.firstName,
          last_name: req.lastName,
          doc_type: req.docType,
          doc_number: req.docNumber,
          phone: req.phone ?? null,
          city_external_id: req.cityId ?? null,
        });
      } catch (e: unknown) {
        if (e instanceof ValidationFailedError) {
          await this.job_repository.update_failed(job.id, 'Cola create-person no configurada');
          throw new ConflictException(e.message);
        }
        throw e;
      }
      await this.job_repository.update_status_and_step(
        job.id,
        AsyncJobStatus.RUNNING,
        AsyncJobStep.AWAITING_PERSON_CREATION,
      );
    }

    return new EnqueueNaturalPersonCreditApplicationResponse(job.externalId);
  }
}
