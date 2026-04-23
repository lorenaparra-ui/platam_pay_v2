import { Inject, Injectable } from '@nestjs/common';
import { CreditApplicationStatus } from '@platam/shared';
import { CREDIT_APPLICATION_REPOSITORY } from '@modules/credit-applications/credit-applications.tokens';
import { CreditApplicationRepository } from '@modules/credit-applications/domain/ports/credit-application.ports';
import {
  CLIENT_REGISTRATION_PORT,
  ClientRegistrationPort,
} from '@modules/credit-applications/application/ports/client-registration.port';
import { build_credit_application_public_fields } from '@modules/credit-applications/application/mapping/credit-application-public-fields.builder';
import { PublishAuthorizationNotificationUseCase } from '../publish-authorization-notification/publish-authorization-notification.use-case';
import { RegisterClientCreditApplicationRequest } from './register-client-credit-application.request';
import { RegisterClientCreditApplicationResponse } from './register-client-credit-application.response';

@Injectable()
export class RegisterClientCreditApplicationUseCase {
  constructor(
    @Inject(CREDIT_APPLICATION_REPOSITORY)
    private readonly credit_application_repository: CreditApplicationRepository,
    @Inject(CLIENT_REGISTRATION_PORT)
    private readonly client_registration: ClientRegistrationPort,
    private readonly publish_authorization_notification: PublishAuthorizationNotificationUseCase,
  ) {}

  async execute(
    req: RegisterClientCreditApplicationRequest,
  ): Promise<RegisterClientCreditApplicationResponse> {
    let city_id: number | null = null;
    if (req.cityExternalId) {
      city_id = await this.client_registration.resolve_city_internal_id(req.cityExternalId);
    }

    let person_id = await this.client_registration.find_person_by_doc_number(req.docNumber);
    if (person_id === null) {
      person_id = await this.client_registration.create_person({
        first_name: req.firstName,
        last_name: req.lastName,
        doc_type: req.docType,
        doc_number: req.docNumber,
        phone: req.phone,
        email: req.email,
        city_id,
      });
    }

    let business_id = await this.client_registration.find_business_by_person_id(person_id);
    if (business_id === null) {
      business_id = await this.client_registration.create_business({
        person_id,
        entity_type: req.businessType,
        business_name: req.businessName,
        business_address: req.businessAddress,
        business_type: req.businessType,
        relationship_to_business: req.relationshipToBusiness,
        city_id,
      });
    }

    const resolved_status = req.status ?? CreditApplicationStatus.IN_PROGRESS;
    const is_pending_auth = resolved_status === CreditApplicationStatus.PENDING_AUTHORIZATION;

    const created = await this.credit_application_repository.create({
      person_id,
      business_id,
      partner_id: null,
      partner_category_id: null,
      sales_representative_id: null,
      status: resolved_status,
      is_current_client: req.isCurrentClient,
      privacy_policy_accepted: is_pending_auth ? false : req.privacyPolicyAccepted,
      privacy_policy_date: is_pending_auth ? null : (req.privacyPolicyAccepted ? new Date() : null),
      submission_date: new Date(),
      business_seniority: req.businessSeniority,
      number_of_employees: req.numberOfEmployees,
      number_of_locations: req.numberOfLocations,
      business_flagship_m2: req.businessFlagshipM2,
      business_has_rent: req.businessHasRent,
      business_rent_amount: req.businessRentAmount,
      requested_credit_line: req.requestedCreditLine,
      monthly_purchases: req.monthlyPurchases,
      current_purchases: req.currentPurchases,
      total_assets: req.totalAssets,
      monthly_income: req.monthlyIncome,
      monthly_expenses: req.monthlyExpenses,
    });

    if (is_pending_auth) {
      await this.publish_authorization_notification.execute({
        credit_application_external_id: created.external_id,
        client_type: req.clientType ?? 'pn',
        client_phone_e164: req.phone,
        client_email: req.email,
        client_first_name: req.firstName,
        partner_name: req.partnerName ?? null,
        business_legal_name: req.businessLegalName,
      });
    }

    return new RegisterClientCreditApplicationResponse(
      build_credit_application_public_fields(created),
    );
  }
}
