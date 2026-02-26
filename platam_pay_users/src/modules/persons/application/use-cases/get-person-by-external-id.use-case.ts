import { Inject, Injectable } from '@nestjs/common';
import { Person } from '../../domain/models/person.model';
import {
  PERSONS_REPOSITORY,
  type PersonRepositoryPort,
} from '../../domain/ports/person.repository.port';

@Injectable()
export class GetPersonByExternalIdUseCase {
  constructor(
    @Inject(PERSONS_REPOSITORY)
    private readonly personRepository: PersonRepositoryPort,
  ) {}

  async execute(externalId: string): Promise<Person | null> {
    return this.personRepository.findByExternalId(externalId);
  }
}
