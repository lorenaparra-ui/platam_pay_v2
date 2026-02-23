import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@infrastructure/database/entities/user.entity';
import { TypeOrmUserRepository } from '@infrastructure/database/repositories/typeorm-user.repository';
import { USERS_REPOSITORY } from './domain/ports/user.repository.port';
import { UsersController } from './presentation/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    {
      provide: USERS_REPOSITORY,
      useClass: TypeOrmUserRepository,
    },
  ],
  exports: [USERS_REPOSITORY],
})
export class UsersModule {}
