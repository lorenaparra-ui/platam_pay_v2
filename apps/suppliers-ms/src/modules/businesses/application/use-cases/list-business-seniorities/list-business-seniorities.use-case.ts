import { Inject, Injectable } from '@nestjs/common';
import { BUSINESS_SENIORITY_REPOSITORY } from '@modules/businesses/businesses.tokens';
import { BusinessSeniorityRepository } from '@modules/businesses/domain/repositories/business-seniority.repository';
import { ListBusinessSenioritiesItemResponse } from './list-business-seniorities.response';

@Injectable()
export class ListBusinessSenioritiesUseCase {
  constructor(
    @Inject(BUSINESS_SENIORITY_REPOSITORY)
    private readonly business_seniority_repository: BusinessSeniorityRepository,
  ) {}

  async execute(): Promise<ListBusinessSenioritiesItemResponse[]> {
    const rows = await this.business_seniority_repository.find_all();
    return rows.map((row) => new ListBusinessSenioritiesItemResponse(row));
  }
}
