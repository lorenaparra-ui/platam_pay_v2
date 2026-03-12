import { Inject, Injectable } from '@nestjs/common';
import { Person } from '../../../domain/models/person.model';
import type { CreatePersonPayload } from '../../../domain/ports/person.repository.port';
import {
  PERSONS_REPOSITORY,
  type PersonRepositoryPort,
} from '../../../domain/ports/person.repository.port';
import type { CreatePersonsRequestDto } from '../../dto/create-persons-request.dto';

@Injectable()
export class CreatePersonUseCase {
  constructor(
    @Inject(PERSONS_REPOSITORY)
    private readonly personRepository: PersonRepositoryPort,
  ) {}

  async execute(dto: CreatePersonsRequestDto): Promise<Person> {
    const payload = this.toPayload(dto);
    return this.personRepository.create(payload);
  }

  private toPayload(dto: CreatePersonsRequestDto): CreatePersonPayload {
    return {
      userId: dto.userId,
      countryCode: dto.countryCode,
      firstName: dto.firstName,
      lastName: dto.lastName,
      docType: dto.docType,
      docNumber: dto.docNumber,
      docIssueDate: dto.docIssueDate ? new Date(dto.docIssueDate) : undefined,
      birthDate: dto.birthDate ? new Date(dto.birthDate) : undefined,
      gender: dto.gender,
      phone: dto.phone,
      residentialAddress: dto.residentialAddress,
      businessAddress: dto.businessAddress,
      cityId: dto.cityId,
    };
  }
}
