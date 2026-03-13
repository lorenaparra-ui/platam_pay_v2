import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

interface RoleRow {
  role_name: string | null;
  status_code: string;
}

function extractBearerToken(
  authorizationHeader: string | undefined,
): string | null {
  if (!authorizationHeader) return null;
  const [scheme, token] = authorizationHeader.split(" ");
  if (!scheme || !token) return null;
  if (scheme.toLowerCase() !== "bearer") return null;
  return token;
}

@Injectable()
export class BackofficeAuthGuard implements CanActivate {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<{ headers: Record<string, string> }>();
    const userExternalId = request.headers["x-user-external-id"];
    if (!userExternalId) {
      throw new UnauthorizedException(
        "Header x-user-external-id es requerido para acceder al backoffice",
      );
    }

    const expectedToken = this.configService
      .get<string>("config.backoffice.authToken")
      ?.trim();
    const incomingToken = extractBearerToken(request.headers.authorization);
    if (expectedToken && incomingToken !== expectedToken) {
      throw new UnauthorizedException("Token de autenticacion invalido");
    }

    const rows = ensureArray<RoleRow>(
      await this.dataSource.query(
        `
        SELECT r.name AS role_name, st.code AS status_code
        FROM "users" u
        LEFT JOIN "roles" r ON r.id = u.role_id
        LEFT JOIN "statuses" st ON st.id = u.status_id
        WHERE u.external_id = $1::uuid
        LIMIT 1
      `,
        [userExternalId],
      ),
    );

    const user = rows[0] as RoleRow | undefined;
    if (!user) {
      throw new UnauthorizedException(
        "Usuario no encontrado para x-user-external-id",
      );
    }

    if (user.status_code !== "active") {
      throw new ForbiddenException("Usuario sin estado activo");
    }

    const allowedRoles = this.configService
      .get<string[]>("config.backoffice.allowedRoles")
      ?.map((role) => role.toLowerCase().trim()) ?? ["admin", "analista"];

    const roleName = user.role_name?.toLowerCase().trim() ?? "";
    if (!allowedRoles.includes(roleName)) {
      throw new ForbiddenException("Rol no autorizado para backoffice");
    }

    return true;
  }
}

function ensureArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}
