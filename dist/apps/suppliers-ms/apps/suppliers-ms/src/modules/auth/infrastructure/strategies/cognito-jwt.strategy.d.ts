import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { RoleEntity, UserEntity } from '@app/transversal-data';
import type { RequestContext } from '@modules/auth/application/request-context.interface';
interface CognitoAccessPayload {
    sub?: string;
    token_use?: string;
    client_id?: string;
    email?: string;
}
declare const CognitoJwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class CognitoJwtStrategy extends CognitoJwtStrategy_base {
    private readonly config_service;
    private readonly user_repository;
    private readonly role_repository;
    private readonly logger;
    constructor(config_service: ConfigService, user_repository: Repository<UserEntity>, role_repository: Repository<RoleEntity>);
    validate(payload: CognitoAccessPayload): Promise<RequestContext>;
    private reject;
}
export {};
