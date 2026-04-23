import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PostgresTypeOrmConfigService } from './database/services/postgres-type-orm-config.service';
import { SqsModule } from './messaging/sqs/sqs.module';
import { ProductsDataModule } from '@app/products-data';
import { TypeormCategoryRepository } from '@infrastructure/database/repositories/typeorm-category.repository';
import { TypeormCreditFacilityRepository } from '@infrastructure/database/repositories/typeorm-credit-facility.repository';
import { TypeormCreditApplicationRepository } from '@infrastructure/database/repositories/typeorm-credit-application.repository';
import { TypeormCreditApplicationJobRepository } from '@infrastructure/database/repositories/typeorm-credit-application-job.repository';
import { TypeormSarlaftCheckRepository } from '@infrastructure/database/repositories/typeorm-sarlaft-check.repository';
import { TypeormWebQueryRepository } from '@infrastructure/database/repositories/typeorm-web-query.repository';
import { TypeormExperianQueryRepository } from '@infrastructure/database/repositories/typeorm-experian-query.repository';
import { TypeormAiAgentAnalysisRepository } from '@infrastructure/database/repositories/typeorm-ai-agent-analysis.repository';
import { CATEGORY_REPOSITORY } from '@modules/categories/categories.tokens';
import { CREDIT_FACILITY_REPOSITORY } from '@modules/credit-facilities/credit-facilities.tokens';
import {
  CREDIT_APPLICATION_REPOSITORY,
  CREDIT_APPLICATION_JOB_REPOSITORY,
  SARLAFT_CHECK_REPOSITORY,
  WEB_QUERY_REPOSITORY,
  EXPERIAN_QUERY_REPOSITORY,
  AI_AGENT_ANALYSIS_REPOSITORY,
} from '@modules/credit-applications/credit-applications.tokens';
import { CLIENT_REGISTRATION_PORT } from '@modules/credit-applications/application/ports/client-registration.port';
import { CREDIT_APPLICATION_DOCUMENT_STORAGE } from '@modules/credit-applications/application/ports/credit-application-document-storage.port';
import { PRODUCTS_REFERENCE_LOOKUP } from '@common/ports/products-reference-lookup.port';
import { TypeormProductsReferenceLookupAdapter } from '@infrastructure/database/common/typeorm-products-reference-lookup.adapter';
import { TypeormClientRegistrationAdapter } from '@infrastructure/database/adapters/typeorm-client-registration.adapter';
import { StubCreditApplicationDocumentStorageAdapter } from '@infrastructure/database/adapters/stub-credit-application-document-storage.adapter';
import { EventBridgeSchedulerAdapter } from '@infrastructure/scheduler/eventbridge-scheduler.adapter';
import { REMINDER_SCHEDULER_PORT } from '@modules/credit-applications/credit-applications.tokens';
import { PartnerCreateUserSqsIdempotencyEntity } from '@app/transversal-data';
import { ConfigTransversalCreatePersonQueueUrlAdapter } from '@infrastructure/messaging/sqs/adapters/config-transversal-create-person-queue-url.adapter';
import { TRANSVERSAL_CREATE_PERSON_QUEUE_URL_PORT } from '@messaging/domain/ports/transversal-create-person-queue-url.port';
import { PublishCreatePersonCommandUseCase } from '@messaging/application/use-cases/publish-create-person-command.use-case';
import { TypeormCreatePersonSqsResultPollAdapter } from '@infrastructure/database/adapters/typeorm-create-person-sqs-result-poll.adapter';
import { CREATE_PERSON_SQS_RESULT_READER_PORT } from '@modules/credit-applications/application/ports/create-person-sqs-result-reader.port';
import { CognitoAuthAdapter } from '@infrastructure/http/cognito/cognito-auth.adapter';
import { HttpSarlaftServiceAdapter } from '@infrastructure/http/sarlaft/http-sarlaft-service.adapter';
import { HttpWebScrapingServiceAdapter } from '@infrastructure/http/web-scraping/http-bdme-service.adapter';
import { HttpExperianHcpnAdapter } from '@infrastructure/http/experian/http-experian-hcpn.adapter';
import { StubAiAgentAdapter } from '@infrastructure/http/ai-agent/stub-ai-agent.adapter';
import { HttpGoogleChatNotifierAdapter } from '@infrastructure/http/notifications/google-chat/http-google-chat-notifier.adapter';
import {
  SARLAFT_SERVICE,
  WEB_SCRAPING_SERVICE,
  EXPERIAN_SERVICE,
  AI_AGENT_SERVICE,
  GOOGLE_CHAT_NOTIFIER,
} from '@modules/credit-applications/credit-applications.tokens';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: PostgresTypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([PartnerCreateUserSqsIdempotencyEntity]),
    ProductsDataModule,
    SqsModule,
  ],
  providers: [
    TypeormProductsReferenceLookupAdapter,
    {
      provide: PRODUCTS_REFERENCE_LOOKUP,
      useExisting: TypeormProductsReferenceLookupAdapter,
    },
    {
      provide: CATEGORY_REPOSITORY,
      useClass: TypeormCategoryRepository,
    },
    {
      provide: CREDIT_FACILITY_REPOSITORY,
      useClass: TypeormCreditFacilityRepository,
    },
    {
      provide: CREDIT_APPLICATION_REPOSITORY,
      useClass: TypeormCreditApplicationRepository,
    },
    TypeormCreditApplicationJobRepository,
    {
      provide: CREDIT_APPLICATION_JOB_REPOSITORY,
      useExisting: TypeormCreditApplicationJobRepository,
    },
    TypeormSarlaftCheckRepository,
    {
      provide: SARLAFT_CHECK_REPOSITORY,
      useExisting: TypeormSarlaftCheckRepository,
    },
    TypeormWebQueryRepository,
    {
      provide: WEB_QUERY_REPOSITORY,
      useExisting: TypeormWebQueryRepository,
    },
    TypeormExperianQueryRepository,
    {
      provide: EXPERIAN_QUERY_REPOSITORY,
      useExisting: TypeormExperianQueryRepository,
    },
    TypeormAiAgentAnalysisRepository,
    {
      provide: AI_AGENT_ANALYSIS_REPOSITORY,
      useExisting: TypeormAiAgentAnalysisRepository,
    },
    TypeormClientRegistrationAdapter,
    {
      provide: CLIENT_REGISTRATION_PORT,
      useExisting: TypeormClientRegistrationAdapter,
    },
    StubCreditApplicationDocumentStorageAdapter,
    {
      provide: CREDIT_APPLICATION_DOCUMENT_STORAGE,
      useExisting: StubCreditApplicationDocumentStorageAdapter,
    },
    EventBridgeSchedulerAdapter,
    {
      provide: REMINDER_SCHEDULER_PORT,
      useExisting: EventBridgeSchedulerAdapter,
    },
    ConfigTransversalCreatePersonQueueUrlAdapter,
    {
      provide: TRANSVERSAL_CREATE_PERSON_QUEUE_URL_PORT,
      useExisting: ConfigTransversalCreatePersonQueueUrlAdapter,
    },
    PublishCreatePersonCommandUseCase,
    TypeormCreatePersonSqsResultPollAdapter,
    {
      provide: CREATE_PERSON_SQS_RESULT_READER_PORT,
      useExisting: TypeormCreatePersonSqsResultPollAdapter,
    },
    CognitoAuthAdapter,
    HttpSarlaftServiceAdapter,
    {
      provide: SARLAFT_SERVICE,
      useExisting: HttpSarlaftServiceAdapter,
    },
    HttpWebScrapingServiceAdapter,
    {
      provide: WEB_SCRAPING_SERVICE,
      useExisting: HttpWebScrapingServiceAdapter,
    },
    HttpExperianHcpnAdapter,
    {
      provide: EXPERIAN_SERVICE,
      useExisting: HttpExperianHcpnAdapter,
    },
    StubAiAgentAdapter,
    {
      provide: AI_AGENT_SERVICE,
      useExisting: StubAiAgentAdapter,
    },
    HttpGoogleChatNotifierAdapter,
    {
      provide: GOOGLE_CHAT_NOTIFIER,
      useExisting: HttpGoogleChatNotifierAdapter,
    },
  ],
  exports: [
    CATEGORY_REPOSITORY,
    CREDIT_FACILITY_REPOSITORY,
    CREDIT_APPLICATION_REPOSITORY,
    CREDIT_APPLICATION_JOB_REPOSITORY,
    SARLAFT_CHECK_REPOSITORY,
    WEB_QUERY_REPOSITORY,
    EXPERIAN_QUERY_REPOSITORY,
    AI_AGENT_ANALYSIS_REPOSITORY,
    CLIENT_REGISTRATION_PORT,
    CREDIT_APPLICATION_DOCUMENT_STORAGE,
    PRODUCTS_REFERENCE_LOOKUP,
    REMINDER_SCHEDULER_PORT,
    PublishCreatePersonCommandUseCase,
    CREATE_PERSON_SQS_RESULT_READER_PORT,
    SARLAFT_SERVICE,
    WEB_SCRAPING_SERVICE,
    EXPERIAN_SERVICE,
    AI_AGENT_SERVICE,
    GOOGLE_CHAT_NOTIFIER,
  ],
})
export class InfrastructureModule {}
