import { BaseExternalIdEntity } from '../../../products-data/src/entities/base-external-id.entity';
export declare class CityEntity extends BaseExternalIdEntity {
    countryName: string;
    countryCode: string;
    stateName: string;
    stateCode: string | null;
    cityName: string;
    currencyId: number;
}
