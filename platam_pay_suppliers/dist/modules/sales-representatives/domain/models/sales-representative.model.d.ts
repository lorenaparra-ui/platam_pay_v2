export declare class SalesRepresentative {
    readonly id: number;
    readonly externalId: string;
    readonly partnerId: number;
    readonly userId: number | null;
    readonly name: string;
    readonly role: string;
    readonly statusId: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    constructor(id: number, externalId: string, partnerId: number, userId: number | null, name: string, role: string, statusId: number, createdAt: Date, updatedAt: Date);
}
