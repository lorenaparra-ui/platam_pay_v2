import { Inject, Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreditApplicationStatus, new_uuid } from '@platam/shared';
import { CREDIT_APPLICATION_REPOSITORY } from '@modules/credit-applications/credit-applications.tokens';
import { CreditApplicationRepository } from '@modules/credit-applications/domain/ports/credit-application.ports';
import {
  CLIENT_REGISTRATION_PORT,
  ClientRegistrationPort,
} from '@modules/credit-applications/application/ports/client-registration.port';
import {
  CREATE_PERSON_SQS_RESULT_READER_PORT,
  type CreatePersonSqsResultReaderPort,
} from '@modules/credit-applications/application/ports/create-person-sqs-result-reader.port';
import { PRODUCTS_REFERENCE_LOOKUP } from '@common/ports/products-reference-lookup.port';
import type { ProductsReferenceLookupPort } from '@common/ports/products-reference-lookup.port';
import { PublishCreatePersonCommandUseCase } from '@messaging/application/use-cases/publish-create-person-command.use-case';
import { ValidationFailedError } from '@messaging/application/exceptions/validation-failed.error';
import { build_credit_application_public_fields } from '@modules/credit-applications/application/mapping/credit-application-public-fields.builder';
import { RegisterNaturalPersonCreditApplicationRequest } from './register-natural-person-credit-application.request';
import { RegisterClientCreditApplicationResponse } from '@modules/credit-applications/application/use-cases/register-client-credit-application/register-client-credit-application.response';

@Injectable()
export class RegisterNaturalPersonCreditApplicationUseCase {
  constructor(
    @Inject(CREDIT_APPLICATION_REPOSITORY)
    private readonly credit_application_repository: CreditApplicationRepository,
    @Inject(CLIENT_REGISTRATION_PORT)
    private readonly client_registration: ClientRegistrationPort,
    @Inject(PRODUCTS_REFERENCE_LOOKUP)
    private readonly products_lookup: ProductsReferenceLookupPort,
    @Inject(CREATE_PERSON_SQS_RESULT_READER_PORT)
    private readonly create_person_sqs_result: CreatePersonSqsResultReaderPort,
    private readonly publish_create_person: PublishCreatePersonCommandUseCase,
    private readonly config_service: ConfigService,
  ) {}

  async execute(
    req: RegisterNaturalPersonCreditApplicationRequest,
  ): Promise<RegisterClientCreditApplicationResponse> {
    const partner_internal_id = await this.products_lookup.get_partner_internal_id_by_external_id(
      req.partnerId,
    );
    if (partner_internal_id === null) {
      throw new NotFoundException('partner no encontrado');
    }

    const sales_representative_internal_id =
      await this.products_lookup.get_sales_representative_internal_id_by_external_id(
        req.salesRepId,
        partner_internal_id,
      );
    if (sales_representative_internal_id === null) {
      throw new NotFoundException(
        'representante de ventas no encontrado o no pertenece al partner indicado',
      );
    }

    let city_id: number | null = null;
    if (req.cityId) {
      city_id = await this.client_registration.resolve_city_internal_id(req.cityId);
    }

    let person_id = await this.client_registration.find_person_by_doc_number(req.docNumber);
    if (person_id === null) {
      const correlation_id = new_uuid();
      const idempotency_key = `${correlation_id}__natural_person_credit_application`;
      const default_country =
        (this.config_service.get<string>('config.natural_person_onboarding.default_country_code') ??
          'CO') ||
        'CO';

      try {
        await this.publish_create_person.execute({
          correlation_id,
          idempotency_key,
          country_code: default_country,
          first_name: req.firstName,
          last_name: req.lastName,
          doc_type: req.docType,
          doc_number: req.docNumber,
          phone: req.phone,
          city_external_id: req.cityId ?? null,
        });
      } catch (e: unknown) {
        if (e instanceof ValidationFailedError) {
          throw new ServiceUnavailableException(e.message);
        }
        throw e;
      }

      const sqs_result = await this.create_person_sqs_result.wait_for_completed_result(
        idempotency_key,
      );
      person_id = await this.client_registration.get_person_internal_id_by_external_id(
        sqs_result.person_external_id,
      );
      if (person_id === null) {
        throw new ServiceUnavailableException(
          'No se pudo resolver la persona creada vía SQS (person_external_id)',
        );
      }
    }

    const birth_iso = req.birthDate?.trim().length ? req.birthDate.trim() : null;
    await this.client_registration.patch_person_email_and_birth_date(
      person_id,
      req.email,
      birth_iso,
    );

    let business_id = await this.client_registration.find_business_by_person_id(person_id);
    if (business_id === null) {
      business_id = await this.client_registration.create_business({
        person_id,
        entity_type: req.businessType,
        business_name: req.businessName,
        business_address: req.businessAddress ?? null,
        business_type: req.businessType,
        relationship_to_business: req.relationshipToBusiness ?? null,
        city_id,
      });
    }

    const business_has_rent =
      req.businessRentAmount !== undefined && req.businessRentAmount > 0 ? true : null;

    const created = await this.credit_application_repository.create({
      person_id,
      business_id,
      partner_id: partner_internal_id,
      partner_category_id: null,
      sales_representative_id: sales_representative_internal_id,
      status: CreditApplicationStatus.IN_PROGRESS,
      is_current_client: false,
      privacy_policy_accepted: req.privacyPolicyAccepted,
      privacy_policy_date: req.privacyPolicyAccepted ? new Date() : null,
      submission_date: new Date(),
      business_seniority: req.businessSeniority ?? null,
      number_of_employees: req.numberOfEmployees ?? null,
      number_of_locations: req.numberOfLocations ?? null,
      business_flagship_m2: req.businessFlagshipM2 ?? null,
      business_has_rent,
      business_rent_amount: req.businessRentAmount ?? null,
      requested_credit_line: req.requestedCreditLine,
      monthly_purchases: req.monthlyPurchases ?? null,
      current_purchases: req.currentPurchases ?? null,
      total_assets: req.totalAssets ?? null,
      monthly_income: req.monthlyIncome ?? null,
      monthly_expenses: req.monthlyExpenses ?? null,
    });

    return new RegisterClientCreditApplicationResponse(
      build_credit_application_public_fields(created),
    );
  }
}
