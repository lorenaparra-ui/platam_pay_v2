import { Person } from '@persons/domain/models/person.model';
import {
  CreatePersonPayload,
  UpdatePersonPayload,
} from '@persons/domain/ports/person.repository.port';
import { PersonEntity } from '../entities/person.entity';

export class PersonMapper {
  static toDomain(entity: PersonEntity): Person {
    return new Person({
      id: entity.id,
      externalId: entity.externalId,
      userId: entity.userId,
      countryCode: entity.countryCode,
      firstName: entity.firstName,
      lastName: entity.lastName,
      docType: entity.docType,
      docNumber: entity.docNumber,
      docIssueDate: entity.docIssueDate,
      birthDate: entity.birthDate,
      gender: entity.gender,
      phone: entity.phone,
      residentialAddress: entity.residentialAddress,
      businessAddress: entity.businessAddress,
      cityId: entity.cityId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  static toEntity(domain: Person): PersonEntity {
    const entity = new PersonEntity();
    entity.id = domain.id;
    entity.userId = domain.userId;
    entity.countryCode = domain.countryCode;
    entity.firstName = domain.firstName;
    entity.lastName = domain.lastName;
    entity.docType = domain.docType;
    entity.docNumber = domain.docNumber;
    entity.docIssueDate = domain.docIssueDate;
    entity.birthDate = domain.birthDate;
    entity.gender = domain.gender;
    entity.phone = domain.phone;
    entity.residentialAddress = domain.residentialAddress;
    entity.businessAddress = domain.businessAddress;
    entity.cityId = domain.cityId;
    return entity;
  }

  static toCreateEntity(payload: CreatePersonPayload): PersonEntity {
    const entity = new PersonEntity();
    return this.applyMutableFields(entity, payload);
  }

  static applyUpdate(
    entity: PersonEntity,
    payload: UpdatePersonPayload,
  ): PersonEntity {
    return this.applyMutableFields(entity, payload);
  }

  private static applyMutableFields(
    entity: PersonEntity,
    payload: UpdatePersonPayload,
  ): PersonEntity {
    if (payload.userId !== undefined) entity.userId = payload.userId;
    if (payload.countryCode !== undefined)
      entity.countryCode = payload.countryCode;
    if (payload.firstName !== undefined) entity.firstName = payload.firstName;
    if (payload.lastName !== undefined) entity.lastName = payload.lastName;
    if (payload.docType !== undefined) entity.docType = payload.docType;
    if (payload.docNumber !== undefined) entity.docNumber = payload.docNumber;
    if (payload.docIssueDate !== undefined)
      entity.docIssueDate = payload.docIssueDate;
    if (payload.birthDate !== undefined) entity.birthDate = payload.birthDate;
    if (payload.gender !== undefined) entity.gender = payload.gender;
    if (payload.phone !== undefined) entity.phone = payload.phone;
    if (payload.residentialAddress !== undefined)
      entity.residentialAddress = payload.residentialAddress;
    if (payload.businessAddress !== undefined)
      entity.businessAddress = payload.businessAddress;
    if (payload.cityId !== undefined) entity.cityId = payload.cityId;
    return entity;
  }
}
