import { Inject, Injectable } from '@nestjs/common';
import { PERSON_REPOSITORY } from '@modules/persons/persons.tokens';
import { CITY_REPOSITORY } from '@modules/transversal/transversal.tokens';
import type { CityRepository } from '@modules/transversal/domain/ports/catalog/city.repository.port';
import { PersonRepository } from '@modules/persons/domain/ports/person.ports';
import { build_person_public_fields } from '@modules/persons/application/mapping/person-public-fields.builder';
import { ListPersonsItemResponse } from './list-persons.response';

@Injectable()
export class ListPersonsUseCase {
  constructor(
    @Inject(PERSON_REPOSITORY)
    private readonly person_repository: PersonRepository,
    @Inject(CITY_REPOSITORY)
    private readonly city_repository: CityRepository,
  ) {}

  async execute(): Promise<ListPersonsItemResponse[]> {
    const rows = await this.person_repository.find_all();
    const out: ListPersonsItemResponse[] = [];
    for (const row of rows) {
      const fields = await build_person_public_fields(row, this.city_repository);
      out.push(new ListPersonsItemResponse(fields));
    }
    return out;
  }
}
