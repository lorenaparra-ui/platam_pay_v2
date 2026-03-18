import { Inject, Injectable } from '@nestjs/common';
import { Person } from '../../../domain/models/person.model';
import {
  PERSONS_REPOSITORY,
  type PersonRepositoryPort,
} from '../../../domain/ports/person.repository.port';

@Injectable()
export class GetPersonsUseCase {
  constructor(
    @Inject(PERSONS_REPOSITORY)
    private readonly personRepository: PersonRepositoryPort,
  ) {}

  async execute(): Promise<Person[]> {
    return this.personRepository.findAll();
  }
}
