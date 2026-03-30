import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PERSON_REPOSITORY } from '@modules/persons/persons.tokens';
import { USER_REPOSITORY } from '@modules/users/users.tokens';
import { CITY_REPOSITORY } from '@modules/transversal/catalog.tokens';
import type { CityRepository } from '@modules/transversal/catalog/domain/ports/city.repository.port';
import { UserRepository } from '@modules/users/domain/ports/user.ports';
import { PersonRepository } from '@modules/persons/domain/ports/person.ports';
import { build_person_public_fields } from '@modules/persons/application/mapping/person-public-fields.builder';
import { GetPersonByExternalIdRequest } from './get-person-by-external-id.request';
import { GetPersonByExternalIdResponse } from './get-person-by-external-id.response';

@Injectable()
export class GetPersonByExternalIdUseCase {
  constructor(
    @Inject(PERSON_REPOSITORY)
    private readonly person_repository: PersonRepository,
    @Inject(USER_REPOSITORY)
    private readonly user_repository: UserRepository,
    @Inject(CITY_REPOSITORY)
    private readonly city_repository: CityRepository,
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
    const fields = await build_person_public_fields(
      row,
      this.user_repository,
      this.city_repository,
    );
    return new GetPersonByExternalIdResponse(fields);
  }
}
