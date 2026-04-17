import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { CreditApplicationsApplicationModule } from '@modules/credit-applications/credit-applications-application.module';
import { CreditApplicationsPublicController } from './presentation/controllers/credit-applications-public.controller';
import { CreditApplicationsPrivateController } from './presentation/controllers/credit-applications-private.controller';

@Module({
  imports: [
    CreditApplicationsApplicationModule,
    MulterModule.register({
      storage: memoryStorage(),
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  ],
  controllers: [CreditApplicationsPublicController, CreditApplicationsPrivateController],
  exports: [CreditApplicationsApplicationModule],
})
export class CreditApplicationsModule {}
