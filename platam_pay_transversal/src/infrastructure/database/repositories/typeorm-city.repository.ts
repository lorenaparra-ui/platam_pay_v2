import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityEntity } from '@libs/database';
import { CityRepositoryPort, CountryItem } from '@transversal/domain/ports/repository/city.repository.port';
import { City } from '../../../modules/transversal/domain/models/city.model';
import { CityMapper } from '../mappers/city.mapper';

@Injectable()
export class TypeOrmCityRepository implements CityRepositoryPort {
  constructor(
    @InjectRepository(CityEntity)
    private readonly repository: Repository<CityEntity>,
  ) {}

  async findAll(): Promise<City[]> {
    const entities = await this.repository.find({
      order: { countryName: 'ASC', stateName: 'ASC', cityName: 'ASC' },
    });
    return entities.map(CityMapper.toDomain);
  }

  async findById(id: number): Promise<City | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? CityMapper.toDomain(entity) : null;
  }

  async findByExternalId(externalId: string): Promise<City | null> {
    const entity = await this.repository.findOne({ where: { externalId } });
    return entity ? CityMapper.toDomain(entity) : null;
  }

  async findByCountryCode(countryCode: string): Promise<City[]> {
    const entities = await this.repository.find({
      where: { countryCode },
      order: { stateName: 'ASC', cityName: 'ASC' },
    });
    return entities.map(CityMapper.toDomain);
  }

  async findByCountryName(countryName: string): Promise<City[]> {
    const entities = await this.repository.find({
      where: { countryName },
      order: { stateName: 'ASC', cityName: 'ASC' },
    });
    return entities.map(CityMapper.toDomain);
  }

  async findByCountryCodeAndName(countryCode: string, countryName: string): Promise<City[]> {
    const entities = await this.repository.find({
      where: { countryCode, countryName },
      order: { stateName: 'ASC', cityName: 'ASC' },
    });
    return entities.map(CityMapper.toDomain);
  }

  async findByCountryAndState(countryCode: string, stateName: string): Promise<City[]> {
    const entities = await this.repository.find({
      where: { countryCode, stateName },
      order: { cityName: 'ASC' },
    });
    return entities.map(CityMapper.toDomain);
  }

  async findDistinctCountries(): Promise<CountryItem[]> {
    const rows = await this.repository
      .createQueryBuilder('city')
      .select('city.countryCode', 'countryCode')
      .addSelect('city.countryName', 'countryName')
      .distinctOn(['city.countryCode'])
      .orderBy('city.countryCode')
      .addOrderBy('city.countryName')
      .getRawMany<CountryItem>();
    return rows;
  }
}
