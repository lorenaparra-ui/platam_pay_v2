import { CanActivate, ExecutionContext } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
export declare class BackofficeAuthGuard implements CanActivate {
    private readonly dataSource;
    private readonly configService;
    constructor(dataSource: DataSource, configService: ConfigService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
