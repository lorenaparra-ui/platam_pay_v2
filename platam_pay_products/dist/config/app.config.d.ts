declare const _default: (() => {
    environment: string;
    port: number;
    backoffice: {
        queueWarningDays: number;
        queueCriticalDays: number;
        authToken: string;
        allowedRoles: string[];
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    environment: string;
    port: number;
    backoffice: {
        queueWarningDays: number;
        queueCriticalDays: number;
        authToken: string;
        allowedRoles: string[];
    };
}>;
export default _default;
