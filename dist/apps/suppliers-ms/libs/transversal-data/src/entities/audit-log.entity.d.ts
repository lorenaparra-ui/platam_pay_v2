import { ActionType, EntityType } from '@platam/shared';
import { UserEntity } from './user.entity';
export declare class AuditLogEntity {
    id: number;
    externalId: string;
    entityType: EntityType;
    entityId: number;
    action: ActionType;
    fieldName: string | null;
    oldValue: unknown | null;
    newValue: unknown | null;
    reasonCode: string | null;
    notes: string | null;
    performedBy: UserEntity;
    performedById: number;
    performedAt: Date;
}
