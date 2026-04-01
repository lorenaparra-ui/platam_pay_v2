import { BaseExternalIdEntity } from '../../../products-data/src/entities/base-external-id.entity';
export declare class CurrencyEntity extends BaseExternalIdEntity {
    code: string;
    name: string;
    symbol: string | null;
    decimalPlaces: number;
    thousandSeparator: string | null;
    decimalSeparator: string | null;
    isActive: boolean;
}
