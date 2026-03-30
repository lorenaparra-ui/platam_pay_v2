import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PERSON_REPOSITORY } from '@modules/persons/persons.tokens';
import {
  PERSON_REFERENCE_LOOKUP,
  PersonReferenceLookupPort,
} from '@modules/persons/domain/ports/person-reference-lookup.port';
import { PersonRepository } from '@modules/persons/domain/ports/person.ports';
import { build_person_public_fields } from '@modules/persons/application/mapping/person-public-fields.builder';
import { CreatePersonRequest } from './create-person.request';
import { CreatePersonResponse } from './create-person.response';

@Injectable()
export class CreatePersonUseCase {
  constructor(
    @Inject(PERSON_REPOSITORY)
    private readonly person_repository: PersonRepository,
    @Inject(PERSON_REFERENCE_LOOKUP)
    private readonly reference_lookup: PersonReferenceLookupPort,
  ) {}

  async execute(req: CreatePersonRequest): Promise<CreatePersonResponse> {
    const user_id =
      await this.reference_lookup.get_user_internal_id_by_external_id(
        req.user_external_id,
      );
    if (user_id === null) {
      throw new NotFoundException('user not found');
    }

    let city_id: number | null = null;
    if (req.city_external_id !== null) {
      city_id = await this.reference_lookup.get_city_internal_id_by_external_id(
        req.city_external_id,
      );
      if (city_id === null) {
        throw new NotFoundException('city not found');
      }
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
      this.reference_lookup,
    );
    return new CreatePersonResponse(fields);
  }
}
