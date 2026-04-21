import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PERSON_REPOSITORY } from '@modules/persons/persons.tokens';
import { CITY_REPOSITORY } from '@modules/transversal/transversal.tokens';
import type { CityRepository } from '@modules/transversal/domain/ports/catalog/city.repository.port';
import { PersonRepository } from '@modules/persons/domain/ports/person.ports';
import { build_person_public_fields } from '@modules/persons/application/mapping/person-public-fields.builder';
import { CreatePersonRequest } from './create-person.request';
import { CreatePersonResponse } from './create-person.response';

@Injectable()
export class CreatePersonUseCase {
  constructor(
    @Inject(PERSON_REPOSITORY)
    private readonly person_repository: PersonRepository,
    @Inject(CITY_REPOSITORY)
    private readonly city_repository: CityRepository,
  ) {}

  async execute(req: CreatePersonRequest): Promise<CreatePersonResponse> {
    let city_id: number | null = null;
    if (req.city_external_id !== null) {
      const city = await this.city_repository.find_by_external_id(
        req.city_external_id,
      );
      if (city === null) {
        throw new NotFoundException('city not found');
      }
      city_id = city.id;
    }

    const created = await this.person_repository.create({
      first_name: req.first_name,
      last_name: req.last_name,
      doc_type: req.doc_type,
      doc_number: req.doc_number,
      doc_issue_date: req.doc_issue_date,
      birth_date: req.birth_date,
      gender: req.gender,
      phone: req.phone,
      residential_address: req.residential_address,
      city_id,
    });

    const fields = await build_person_public_fields(created, this.city_repository);
    return new CreatePersonResponse(fields);
  }
}
