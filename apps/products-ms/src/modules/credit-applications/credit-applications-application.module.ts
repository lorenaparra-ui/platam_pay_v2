import { Module } from '@nestjs/common';
import { CreateCreditApplicationUseCase } from '@modules/credit-applications/application/use-cases/create-credit-application/create-credit-application.use-case';
import { GetCreditApplicationByExternalIdUseCase } from '@modules/credit-applications/application/use-cases/get-credit-application-by-external-id/get-credit-application-by-external-id.use-case';
import { ListCreditApplicationsUseCase } from '@modules/credit-applications/application/use-cases/list-credit-applications/list-credit-applications.use-case';
import { UpdateCreditApplicationByExternalIdUseCase } from '@modules/credit-applications/application/use-cases/update-credit-application-by-external-id/update-credit-application-by-external-id.use-case';
import { DeleteCreditApplicationByExternalIdUseCase } from '@modules/credit-applications/application/use-cases/delete-credit-application-by-external-id/delete-credit-application-by-external-id.use-case';
import { RegisterClientCreditApplicationUseCase } from '@modules/credit-applications/application/use-cases/register-client-credit-application/register-client-credit-application.use-case';
import { ListCreditApplicationsByPartnerUseCase } from '@modules/credit-applications/application/use-cases/list-credit-applications-by-partner/list-credit-applications-by-partner.use-case';
import { ListCreditApplicationsBySalesRepUseCase } from '@modules/credit-applications/application/use-cases/list-credit-applications-by-sales-rep/list-credit-applications-by-sales-rep.use-case';
import { ApproveCreditApplicationUseCase } from '@modules/credit-applications/application/use-cases/approve-credit-application/approve-credit-application.use-case';
import { RejectCreditApplicationUseCase } from '@modules/credit-applications/application/use-cases/reject-credit-application/reject-credit-application.use-case';
import { SaveCreditApplicationPreStudyUseCase } from '@modules/credit-applications/application/use-cases/save-credit-application-pre-study/save-credit-application-pre-study.use-case';
import { UploadCreditApplicationDocumentUseCase } from '@modules/credit-applications/application/use-cases/upload-credit-application-document/upload-credit-application-document.use-case';
import { GetCreditApplicationAuthorizationDataUseCase } from '@modules/credit-applications/application/use-cases/get-credit-application-authorization-data/get-credit-application-authorization-data.use-case';
import { AuthorizeCreditApplicationUseCase } from '@modules/credit-applications/application/use-cases/authorize-credit-application/authorize-credit-application.use-case';
import { PublishAuthorizationNotificationUseCase } from '@modules/credit-applications/application/use-cases/publish-authorization-notification/publish-authorization-notification.use-case';
import { RegisterNaturalPersonCreditApplicationUseCase } from '@modules/credit-applications/application/use-cases/register-natural-person-credit-application/register-natural-person-credit-application.use-case';
import { EnqueueNaturalPersonCreditApplicationUseCase } from '@modules/credit-applications/application/use-cases/enqueue-natural-person-credit-application/enqueue-natural-person-credit-application.use-case';
import { EnqueueLegalEntityCreditApplicationUseCase } from '@modules/credit-applications/application/use-cases/enqueue-legal-entity-credit-application/enqueue-legal-entity-credit-application.use-case';
import { GetCreditApplicationJobUseCase } from '@modules/credit-applications/application/use-cases/get-credit-application-job/get-credit-application-job.use-case';
import { CreditApplicationJobWorkerService } from '@modules/credit-applications/infrastructure/workers/credit-application-job.worker';

const USE_CASES = [
  CreateCreditApplicationUseCase,
  GetCreditApplicationByExternalIdUseCase,
  ListCreditApplicationsUseCase,
  UpdateCreditApplicationByExternalIdUseCase,
  DeleteCreditApplicationByExternalIdUseCase,
  RegisterClientCreditApplicationUseCase,
  ListCreditApplicationsByPartnerUseCase,
  ListCreditApplicationsBySalesRepUseCase,
  ApproveCreditApplicationUseCase,
  RejectCreditApplicationUseCase,
  SaveCreditApplicationPreStudyUseCase,
  UploadCreditApplicationDocumentUseCase,
  GetCreditApplicationAuthorizationDataUseCase,
  AuthorizeCreditApplicationUseCase,
  PublishAuthorizationNotificationUseCase,
  RegisterNaturalPersonCreditApplicationUseCase,
  EnqueueNaturalPersonCreditApplicationUseCase,
  EnqueueLegalEntityCreditApplicationUseCase,
  GetCreditApplicationJobUseCase,
  CreditApplicationJobWorkerService,
];

@Module({
  providers: USE_CASES,
  exports: USE_CASES,
})
export class CreditApplicationsApplicationModule {}
