import { Global, Module } from '@nestjs/common';
import { SqsModule } from './messaging/sqs/sqs.module';

@Global()
@Module({
  imports: [SqsModule],
  exports: [SqsModule],
})
export class InfrastructureModule {}
