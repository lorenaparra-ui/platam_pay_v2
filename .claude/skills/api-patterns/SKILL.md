---
name: api-patterns
description: Patrones de Clean Architecture + DDD para crear endpoints en los microservicios NestJS de Platam Pay. Usar al crear un nuevo endpoint REST, use case, repositorio, DTO o al entender cómo fluye una request desde el controlador hasta la base de datos. También documenta autenticación JWT/Cognito y manejo de errores.
---

# API Patterns — Platam Pay V2 (NestJS Clean Architecture)

## Flujo de una Request

```
HTTP Request
  → Controller (presentation/) — valida DTOs, orquesta use cases
  → UseCase (application/use-cases/) — lógica de negocio
  → Repository Port (domain/ports/) — interfaz abstracta
  → RepositoryImpl (infrastructure/repositories/) — TypeORM
  → PostgreSQL
```

## Crear un Nuevo Endpoint — Checklist

**1. Domain Port** (`domain/ports/{entidad}.repository.ts`):
```typescript
export const {ENTIDAD}_REPOSITORY = '{ENTIDAD}_REPOSITORY';

export interface {Entidad}Repository {
  create(data: Create{Entidad}Payload): Promise<{Entidad}>;
  findById(id: string): Promise<{Entidad} | null>;
}
```

**2. Use Case** (`application/use-cases/{accion}-{entidad}.use-case.ts`):
```typescript
@Injectable()
export class Create{Entidad}UseCase {
  private readonly logger = new Logger(Create{Entidad}UseCase.name);

  constructor(
    @Inject({ENTIDAD}_REPOSITORY)
    private readonly {entidad}_repository: {Entidad}Repository,
  ) {}

  async execute(body: Create{Entidad}Payload): Promise<{Entidad}> {
    try {
      return await this.{entidad}_repository.create(body);
    } catch (err: unknown) {
      if (is_pg_unique_violation(err)) {
        throw new ConflictException('{entidad} already exists');
      }
      this.logger.error('create {entidad} failed');
      throw err;
    }
  }
}
```

**3. Repository Impl** (`infrastructure/repositories/{entidad}.repository.impl.ts`):
```typescript
@Injectable()
export class {Entidad}RepositoryImpl implements {Entidad}Repository {
  constructor(
    @InjectRepository({Entidad}Entity)
    private readonly repo: Repository<{Entidad}Entity>,
  ) {}

  async create(data: Create{Entidad}Payload): Promise<{Entidad}> {
    const entity = this.repo.create({ externalId: uuid(), ...data });
    const saved = await this.repo.save(entity);
    return this.to_domain(saved);
  }

  private to_domain(entity: {Entidad}Entity): {Entidad} {
    return { id: entity.externalId, ... };
  }
}
```

**4. Controller** (`presentation/controllers/{entidad}s.controller.ts`):
```typescript
@ApiTags('{entidades}')
@Controller('{entidades}')
@UseGuards(JwtAuthGuard)
export class {Entidad}sController {
  constructor(private readonly create_{entidad}: Create{Entidad}UseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear {entidad}' })
  @ApiCreatedResponse({ type: {Entidad}ResponseDto })
  async create(@Body() body: Create{Entidad}BodyDto): Promise<{Entidad}ResponseDto> {
    const {entidad} = await this.create_{entidad}.execute({ name: body.name });
    return to_{entidad}_response_dto({entidad});
  }
}
```

**5. Registrar en el módulo NestJS**:
```typescript
providers: [
  Create{Entidad}UseCase,
  { provide: {ENTIDAD}_REPOSITORY, useClass: {Entidad}RepositoryImpl },
],
controllers: [{Entidad}sController],
```

## DTOs con Validación y Swagger

```typescript
export class Create{Entidad}BodyDto {
  @ApiProperty({ description: 'Nombre', example: 'ADMIN' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;
}
```

## Paginación (patrón estándar)

```typescript
@Get()
async list(@Query() query: List{Entidad}sQueryDto): Promise<Paginated{Entidad}sResponseDto> {
  const result = await this.list_{entidades}.execute({
    page: query.page,
    limit: query.limit,
  });
  return {
    items: result.items.map((r) => to_{entidad}_response_dto(r)),
    total: result.total,
    page: result.page,
    limit: result.limit,
  };
}
```

## Manejo de Errores

Formato de respuesta de error (del `AllExceptionsFilter`):
```json
{ "status_code": 409, "message": "role already exists" }
```

Detectar violación de unique constraint PostgreSQL (código 23505):
```typescript
import { is_pg_unique_violation } from '@platam/shared';
if (is_pg_unique_violation(err)) throw new ConflictException('ya existe');
```

Excepciones HTTP a usar: `NotFoundException`, `ConflictException`, `BadRequestException`, `ForbiddenException`.

## Autenticación y Autorización

```typescript
@UseGuards(JwtAuthGuard)       // JWT de Cognito en Authorization: Bearer <token>
@RequireRoles(Roles.ADMIN)     // Roles del dominio (decorator custom)
```

Los headers `x-user-id` y `x-user-roles` son eliminados por middleware antes de llegar al servicio — no confiar en ellos de clientes externos.

## Multipart + Saga (operaciones async)

```typescript
@Post()
@HttpCode(HttpStatus.ACCEPTED)   // 202, no 201 — la operación es asíncrona
@UseInterceptors(FileFieldsInterceptor([
  { name: 'bankCertification', maxCount: 1 },
  { name: 'logo', maxCount: 1 },
]))
async create(
  @Body('payload') payload_raw: string,   // JSON como string en el form
  @UploadedFiles() files: PartnerMultipartFiles,
): Promise<{ saga_id: string; status: string; message: string }> {
  const saga_id = await this.orchestrator.start_async(command, files);
  return { saga_id, status: 'RUNNING', message: `GET /partners/sagas/${saga_id}` };
}
```
