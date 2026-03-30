import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PERSON_REPOSITORY } from '@modules/persons/persons.tokens';
import { PersonRepository } from '@modules/persons/domain/ports/person.ports';
import { DeletePersonByExternalIdRequest } from './delete-person-by-external-id.request';

@Injectable()
export class DeletePersonByExternalIdUseCase {
  constructor(
    @Inject(PERSON_REPOSITORY)
    private readonly person_repository: PersonRepository,
  ) {}

  async execute(req: DeletePersonByExternalIdRequest): Promise<void> {
    const ok = await this.person_repository.delete_by_external_id(
      req.external_id,
    );
    if (!ok) {
      throw new NotFoundException('person not found');
    }
  }
}
