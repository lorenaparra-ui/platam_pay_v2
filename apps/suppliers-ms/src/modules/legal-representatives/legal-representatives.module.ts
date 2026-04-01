import { Module } from '@nestjs/common';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { TypeormLegalRepresentativeRepository } from '@infrastructure/database/repositories/typeorm-legal-representative.repository';
import { LEGAL_REPRESENTATIVE_REPOSITORY } from './legal-representatives.tokens';
import { CreateLegalRepresentativeUseCase } from './application/use-cases/create-legal-representative/create-legal-representative.use-case';

@Module({
  imports: [InfrastructureModule],
  providers: [
    {
      provide: LEGAL_REPRESENTATIVE_REPOSITORY,
      useExisting: TypeormLegalRepresentativeRepository,
    },
    CreateLegalRepresentativeUseCase,
  ],
  exports: [LEGAL_REPRESENTATIVE_REPOSITORY, CreateLegalRepresentativeUseCase],
})
export class LegalRepresentativesModule {}
