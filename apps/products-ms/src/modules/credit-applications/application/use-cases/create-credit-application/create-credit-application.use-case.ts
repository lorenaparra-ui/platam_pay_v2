import { Inject, Injectable } from '@nestjs/common';
import { CREDIT_APPLICATION_REPOSITORY } from '@modules/credit-applications/credit-applications.tokens';
import { CreditApplicationRepository } from '@modules/credit-applications/domain/ports/credit-application.ports';
import { build_credit_application_public_fields } from '@modules/credit-applications/application/mapping/credit-application-public-fields.builder';
import { CreateCreditApplicationRequest } from './create-credit-application.request';
import { CreateCreditApplicationResponse } from './create-credit-application.response';

@Injectable()
export class CreateCreditApplicationUseCase {
  constructor(
    @Inject(CREDIT_APPLICATION_REPOSITORY)
    private readonly credit_application_repository: CreditApplicationRepository,
  ) {}

  async execute(
    req: CreateCreditApplicationRequest,
  ): Promise<CreateCreditApplicationResponse> {
    const created = await this.credit_application_repository.create({
      external_id: req.externalId,
      person_id: req.personId,
      partner_id: req.partnerId,
      partner_category_id: req.partnerCategoryId,
      business_id: req.businessId,
      sales_representative_id: req.salesRepresentativeId,
      status: req.status,
      is_current_client: req.isCurrentClient,
      privacy_policy_accepted: req.privacyPolicyAccepted,
      number_of_locations: req.numberOfLocations,
      number_of_employees: req.numberOfEmployees,
      business_seniority: req.businessSeniority,
      sector_experience: req.sectorExperience,
      business_flagship_m2: req.businessFlagshipM2,
      business_has_rent: req.businessHasRent,
      business_rent_amount: req.businessRentAmount,
      monthly_income: req.monthlyIncome,
      monthly_expenses: req.monthlyExpenses,
      monthly_purchases: req.monthlyPurchases,
      current_purchases: req.currentPurchases,
      total_assets: req.totalAssets,
      requested_credit_line: req.requestedCreditLine,
      submission_date: req.submissionDate,
      privacy_policy_date: req.privacyPolicyDate,
    });

    const fields = build_credit_application_public_fields(created);
    return new CreateCreditApplicationResponse(fields);
  }
}
