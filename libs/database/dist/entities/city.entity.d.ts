import { BaseExternalIdEntity } from './base-external-id.entity';
export declare class CityEntity extends BaseExternalIdEntity {
    countryName: string;
    countryCode: string;
    stateName: string;
    stateCode: string | null;
    cityName: string;
    currencyId: number;
}
