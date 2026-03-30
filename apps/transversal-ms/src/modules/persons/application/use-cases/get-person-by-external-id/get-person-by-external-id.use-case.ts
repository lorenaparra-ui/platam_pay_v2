import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PERSON_REPOSITORY } from '@modules/persons/persons.tokens';
import {
  PERSON_REFERENCE_LOOKUP,
  PersonReferenceLookupPort,
} from '@modules/persons/domain/ports/person-reference-lookup.port';
import { PersonRepository } from '@modules/persons/domain/ports/person.ports';
import { build_person_public_fields } from '@modules/persons/application/mapping/person-public-fields.builder';
import { GetPersonByExternalIdRequest } from './get-person-by-external-id.request';
import { GetPersonByExternalIdResponse } from './get-person-by-external-id.response';

@Injectable()
export class GetPersonByExternalIdUseCase {
  constructor(
    @Inject(PERSON_REPOSITORY)
    private readonly person_repository: PersonRepository,
    @Inject(PERSON_REFERENCE_LOOKUP)
    private readonly reference_lookup: PersonReferenceLookupPort,
  ) {}

  async execute(
    req: GetPersonByExternalIdRequest,
  ): Promise<GetPersonByExternalIdResponse> {
    const row = await this.person_repository.find_by_external_id(
      req.external_id,
    );
    if (row === null) {
      throw new NotFoundException('person not found');
    }
    const fields = await build_person_public_fields(row, this.reference_lookup);
    return new GetPersonByExternalIdResponse(fields);
  }
}
