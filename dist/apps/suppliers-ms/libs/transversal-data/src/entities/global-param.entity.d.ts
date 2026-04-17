import { UserEntity } from './user.entity';
export declare class GlobalParamEntity {
    id: number;
    externalId: string;
    code: string;
    value: unknown;
    description: string | null;
    validFrom: string;
    createdBy: UserEntity;
    createdById: number;
    createdAt: Date;
}
