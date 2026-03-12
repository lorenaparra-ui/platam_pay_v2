import { PartialType } from '@nestjs/swagger';
import { CreateCreditApplicationBnplRequestDto } from './create-credit-application-bnpl-request.dto';

export class UpdateCreditApplicationBnplRequestDto extends PartialType(
  CreateCreditApplicationBnplRequestDto,
) {}
