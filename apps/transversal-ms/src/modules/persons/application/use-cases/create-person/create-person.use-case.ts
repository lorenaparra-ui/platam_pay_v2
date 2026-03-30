import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PERSON_REPOSITORY } from '@modules/persons/persons.tokens';
import { USER_REPOSITORY } from '@modules/users/users.tokens';
import { CITY_REPOSITORY } from '@modules/transversal/catalog.tokens';
import type { CityRepository } from '@modules/transversal/catalog/domain/ports/city.repository.port';
import { UserRepository } from '@modules/users/domain/ports/user.ports';
import { PersonRepository } from '@modules/persons/domain/ports/person.ports';
import { build_person_public_fields } from '@modules/persons/application/mapping/person-public-fields.builder';
import { CreatePersonRequest } from './create-person.request';
import { CreatePersonResponse } from './create-person.response';

@Injectable()
export class CreatePersonUseCase {
  constructor(
    @Inject(PERSON_REPOSITORY)
    private readonly person_repository: PersonRepository,
    @Inject(USER_REPOSITORY)
    private readonly user_repository: UserRepository,
    @Inject(CITY_REPOSITORY)
    private readonly city_repository: CityRepository,
  ) {}

  async execute(req: CreatePersonRequest): Promise<CreatePersonResponse> {
    const user_id = await this.user_repository.find_internal_id_by_external_id(
      req.user_external_id,
    );
    if (user_id === null) {
      throw new NotFoundException('user not found');
    }

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
      user_id,
      country_code: req.country_code,
      first_name: req.first_name,
      last_name: req.last_name,
      doc_type: req.doc_type,
      doc_number: req.doc_number,
      doc_issue_date: req.doc_issue_date,
      birth_date: req.birth_date,
      gender: req.gender,
      phone: req.phone,
      residential_address: req.residential_address,
      business_address: req.business_address,
      city_id,
    });

    const fields = await build_person_public_fields(
      created,
      this.user_repository,
      this.city_repository,
    );
    return new CreatePersonResponse(fields);
  }
}
