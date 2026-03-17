import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/models/user.model';
import {
  USERS_REPOSITORY,
  type UserRepositoryPort,
} from '../../domain/ports/user.repository.port';

@Injectable()
export class GetUsersUseCase {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
