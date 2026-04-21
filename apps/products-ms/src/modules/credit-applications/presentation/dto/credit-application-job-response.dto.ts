import { ApiProperty } from '@nestjs/swagger';
import type { AsyncJobStatus } from '@platam/shared';

export class EnqueueCreditApplicationResponseDto {
  @ApiProperty({ description: 'UUID del job asíncrono creado' })
  job_id: string;

  constructor(job_id: string) {
    this.job_id = job_id;
  }
}

export class CreditApplicationJobStatusResponseDto {
  @ApiProperty()
  job_id: string;

  @ApiProperty({ enum: ['PENDING', 'RUNNING', 'COMPLETED', 'FAILED'] })
  status: AsyncJobStatus;

  @ApiProperty()
  step: string;

  @ApiProperty({ nullable: true })
  credit_application_id: string | null;

  @ApiProperty({ nullable: true })
  error_message: string | null;

  constructor(
    job_id: string,
    status: AsyncJobStatus,
    step: string,
    credit_application_id: string | null,
    error_message: string | null,
  ) {
    this.job_id = job_id;
    this.status = status;
    this.step = step;
    this.credit_application_id = credit_application_id;
    this.error_message = error_message;
  }
}
