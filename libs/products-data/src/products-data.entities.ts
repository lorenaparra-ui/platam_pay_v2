import { CategoryEntity } from './entities/category.entity';
import { ContractEntity } from './entities/contract.entity';
import { ContractTemplateEntity } from './entities/contract-template.entity';
import { CreditApplicationEntity } from './entities/credit-application.entity';
import { CreditApplicationJobEntity } from './entities/credit-application-job.entity';
import { CreditFacilityEntity } from './entities/credit-facility.entity';
import { DocumentEntity } from './entities/document.entity';
import { ExperianQueryEntity } from './entities/experian-query.entity';
import { SarlaftCheckEntity } from './entities/sarlaft-check.entity';
import { WebQueryEntity } from './entities/web-query.entity';
import { AiAgentAnalysisEntity } from './entities/ai-agent-analysis.entity';
import { LoanRequestEntity } from './entities/loan-request.entity';
import { UsuraRateEntity } from './entities/usura-rate.entity';

/** Lista de entidades TypeORM (sin Nest); usada por `ProductsDataModule` y por la CLI de migraciones. */
export const PRODUCTS_DATA_ENTITIES = [
  CreditFacilityEntity,
  CategoryEntity,
  CreditApplicationEntity,
  CreditApplicationJobEntity,
  ContractEntity,
  ContractTemplateEntity,
  DocumentEntity,
  ExperianQueryEntity,
  SarlaftCheckEntity,
  WebQueryEntity,
  AiAgentAnalysisEntity,
  LoanRequestEntity,
  UsuraRateEntity,
] as const;
