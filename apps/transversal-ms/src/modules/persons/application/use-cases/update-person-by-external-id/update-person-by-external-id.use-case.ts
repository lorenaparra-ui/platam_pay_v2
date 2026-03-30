import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PERSON_REPOSITORY } from '@modules/persons/persons.tokens';
import {
  PERSON_REFERENCE_LOOKUP,
  PersonReferenceLookupPort,
} from '@modules/persons/domain/ports/person-reference-lookup.port';
import { PersonRepository } from '@modules/persons/domain/ports/person.ports';
import { UpdatePersonProps } from '@modules/persons/domain/models/person.models';
import { build_person_public_fields } from '@modules/persons/application/mapping/person-public-fields.builder';
import { UpdatePersonByExternalIdRequest } from './update-person-by-external-id.request';
import { UpdatePersonByExternalIdResponse } from './update-person-by-external-id.response';

@Injectable()
export class UpdatePersonByExternalIdUseCase {
  constructor(
    @Inject(PERSON_REPOSITORY)
    private readonly person_repository: PersonRepository,
    @Inject(PERSON_REFERENCE_LOOKUP)
    private readonly reference_lookup: PersonReferenceLookupPort,
  ) {}

  async execute(
    req: UpdatePersonByExternalIdRequest,
  ): Promise<UpdatePersonByExternalIdResponse> {
    const patch: UpdatePersonProps = {};

    if (req.user_external_id !== undefined) {
      const user_id =
        await this.reference_lookup.get_user_internal_id_by_external_id(
          req.user_external_id,
        );
      if (user_id === null) {
        throw new NotFoundException('user not found');
      }
      patch.user_id = user_id;
    }
    if (req.country_code !== undefined) {
      patch.country_code = req.country_code;
    }
    if (req.first_name !== undefined) {
      patch.first_name = req.first_name;
    }
    if (req.last_name !== undefined) {
      patch.last_name = req.last_name;
    }
    if (req.doc_type !== undefined) {
      patch.doc_type = req.doc_type;
    }
    if (req.doc_number !== undefined) {
      patch.doc_number = req.doc_number;
    }
    if (req.doc_issue_date !== undefined) {
      patch.doc_issue_date = req.doc_issue_date;
    }
    if (req.birth_date !== undefined) {
      patch.birth_date = req.birth_date;
    }
    if (req.gender !== undefined) {
      patch.gender = req.gender;
    }
    if (req.phone !== undefined) {
      patch.phone = req.phone;
    }
    if (req.residential_address !== undefined) {
      patch.residential_address = req.residential_address;
    }
    if (req.business_address !== undefined) {
      patch.business_address = req.business_address;
    }
    if (req.city_external_id !== undefined) {
      if (req.city_external_id === null) {
        patch.city_id = null;
      } else {
        const city_id =
          await this.reference_lookup.get_city_internal_id_by_external_id(
            req.city_external_id,
          );
        if (city_id === null) {
          throw new NotFoundException('city not found');
        }
        patch.city_id = city_id;
      }
    }

    const updated = await this.person_repository.update_by_external_id(
      req.external_id,
      patch,
    );
    if (updated === null) {
      throw new NotFoundException('person not found');
    }

    const fields = await build_person_public_fields(
      updated,
      this.reference_lookup,
    );
    return new UpdatePersonByExternalIdResponse(fields);
  }
}
