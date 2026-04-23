import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CREDIT_APPLICATION_REPOSITORY } from '@modules/credit-applications/credit-applications.tokens';
import { CreditApplicationRepository } from '@modules/credit-applications/domain/ports/credit-application.ports';
import { UpdateCreditApplicationProps } from '@modules/credit-applications/domain/models/credit-application.models';
import { build_credit_application_public_fields } from '@modules/credit-applications/application/mapping/credit-application-public-fields.builder';
import { UpdateCreditApplicationByExternalIdRequest } from './update-credit-application-by-external-id.request';
import { UpdateCreditApplicationByExternalIdResponse } from './update-credit-application-by-external-id.response';

@Injectable()
export class UpdateCreditApplicationByExternalIdUseCase {
  constructor(
    @Inject(CREDIT_APPLICATION_REPOSITORY)
    private readonly credit_application_repository: CreditApplicationRepository,
  ) {}

  async execute(
    req: UpdateCreditApplicationByExternalIdRequest,
  ): Promise<UpdateCreditApplicationByExternalIdResponse> {
    const patch: UpdateCreditApplicationProps = {};

    if (req.status !== undefined) patch.status = req.status;
    if (req.personId !== undefined) patch.person_id = req.personId;
    if (req.partnerId !== undefined) patch.partner_id = req.partnerId;
    if (req.partnerCategoryId !== undefined) patch.partner_category_id = req.partnerCategoryId;
    if (req.businessId !== undefined) patch.business_id = req.businessId;
    if (req.salesRepresentativeId !== undefined) patch.sales_representative_id = req.salesRepresentativeId;
    if (req.isCurrentClient !== undefined) patch.is_current_client = req.isCurrentClient;
    if (req.privacyPolicyAccepted !== undefined) patch.privacy_policy_accepted = req.privacyPolicyAccepted;
    if (req.numberOfLocations !== undefined) patch.number_of_locations = req.numberOfLocations;
    if (req.numberOfEmployees !== undefined) patch.number_of_employees = req.numberOfEmployees;
    if (req.businessSeniority !== undefined) patch.business_seniority = req.businessSeniority;
    if (req.sectorExperience !== undefined) patch.sector_experience = req.sectorExperience;
    if (req.businessFlagshipM2 !== undefined) patch.business_flagship_m2 = req.businessFlagshipM2;
    if (req.businessHasRent !== undefined) patch.business_has_rent = req.businessHasRent;
    if (req.businessRentAmount !== undefined) patch.business_rent_amount = req.businessRentAmount;
    if (req.monthlyIncome !== undefined) patch.monthly_income = req.monthlyIncome;
    if (req.monthlyExpenses !== undefined) patch.monthly_expenses = req.monthlyExpenses;
    if (req.monthlyPurchases !== undefined) patch.monthly_purchases = req.monthlyPurchases;
    if (req.currentPurchases !== undefined) patch.current_purchases = req.currentPurchases;
    if (req.totalAssets !== undefined) patch.total_assets = req.totalAssets;
    if (req.requestedCreditLine !== undefined) patch.requested_credit_line = req.requestedCreditLine;
    if (req.submissionDate !== undefined) patch.submission_date = req.submissionDate;
    if (req.approvalDate !== undefined) patch.approval_date = req.approvalDate;
    if (req.rejectionReason !== undefined) patch.rejection_reason = req.rejectionReason;
    if (req.creditStudyDate !== undefined) patch.credit_study_date = req.creditStudyDate;
    if (req.creditScore !== undefined) patch.credit_score = req.creditScore;
    if (req.creditDecision !== undefined) patch.credit_decision = req.creditDecision;
    if (req.approvedCreditLine !== undefined) patch.approved_credit_line = req.approvedCreditLine;
    if (req.analystReport !== undefined) patch.analyst_report = req.analystReport;
    if (req.riskProfile !== undefined) patch.risk_profile = req.riskProfile;
    if (req.privacyPolicyDate !== undefined) patch.privacy_policy_date = req.privacyPolicyDate;

    const updated = await this.credit_application_repository.update_by_external_id(
      req.externalId,
      patch,
    );
    if (updated === null) {
      throw new NotFoundException('credit application not found');
    }

    const fields = build_credit_application_public_fields(updated);
    return new UpdateCreditApplicationByExternalIdResponse(fields);
  }
}
