---
name: database-patterns
description: Patrones de TypeORM para Platam Pay: entidades, migraciones, repositorios y queries. Usar al crear entidades TypeORM, generar migraciones, escribir queries complejas o entender cómo está configurada la base de datos. Incluye el patrón de BaseExternalIdEntity y la organización por schemas de PostgreSQL.
---

# Database Patterns — Platam Pay V2 (TypeORM + PostgreSQL)

## Configuración

- **ORM:** TypeORM 0.3.20
- **DB:** PostgreSQL (Docker en `docker/`)
- **CLI centralizado:** workspace `database/` con `database/src/data-source.ts`
- **Entidades:** en `libs/*-data/src/entities/`, agregadas en `ALL_DATA_ENTITIES`

## BaseExternalIdEntity — Obligatoria para Todas las Entidades

```typescript
// libs/transversal-data/src/entities/base-external-id.entity.ts
export abstract class BaseExternalIdEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;             // PK interna — NUNCA exponer en la API

  @Column({ name: 'external_id', type: 'uuid', unique: true })
  externalId: string;     // UUID expuesto en la API (evita enumeración)

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
```

## Crear una Entidad TypeORM

```typescript
// libs/{dominio}-data/src/entities/{entidad}.entity.ts
@Entity({ name: '{entidades}', schema: '{dominio}_schema' })
export class {Entidad}Entity extends BaseExternalIdEntity {
  @Column({
    name: 'name',
    type: 'enum',
    enum: NombreEnum,
    enumName: '{entidades}_name',    // Nombre explícito para evitar colisiones en PG
    unique: true,
  })
  name: NombreEnum;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string | null;

  // FK con nombre de columna explícito:
  @ManyToOne(() => OtraEntidadEntity, { nullable: false })
  @JoinColumn({ name: 'otra_entidad_id' })
  otraEntidad: OtraEntidadEntity;

  @Column({ name: 'otra_entidad_id', type: 'bigint' })
  otraEntidadId: number;
}
```

## Schemas de PostgreSQL por Dominio

| Microservicio | Schema PostgreSQL |
|---|---|
| transversal-ms | `transversal_schema` |
| suppliers-ms | `suppliers_schema` |
| products-ms | `products_schema` |
| contracts-ms | `contracts_schema` |

## Registrar Entidades

En `libs/{dominio}-data/src/index.ts`:
```typescript
export const ALL_{DOMINIO}_ENTITIES = [{Entidad1}Entity, {Entidad2}Entity];
```

En `database/src/data-source.ts` (ya configurado — solo agregar el nuevo array):
```typescript
entities: [...ALL_TRANSVERSAL_ENTITIES, ...ALL_SUPPLIERS_ENTITIES, ...],
```

## Migraciones

```bash
# Generar desde cambios en entidades
cd database
npx typeorm migration:generate src/migrations/{timestamp}-{NombrePascalCase} -d src/data-source.ts

# Correr pendientes
npm run migration:run        # desde raíz del monorepo

# Revertir última
npm run migration:revert

# Ver estado
npm run migration:show
```

Convención de nombre: `{timestamp_unix_ms}-{DescripcionPascalCase}`
```
1770000000000-PartnerCreateUserSqsIdempotency
1760000000000-TransversalSchemaStates
```

## Patrón de Repositorio

```typescript
// infrastructure/repositories/{entidad}.repository.impl.ts
@Injectable()
export class RoleRepositoryImpl implements RoleRepository {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly repo: Repository<RoleEntity>,
  ) {}

  async create(data: CreateRoleData): Promise<Role> {
    const entity = this.repo.create({ externalId: uuid(), ...data });
    return this.to_domain(await this.repo.save(entity));
  }

  async findByExternalId(externalId: string): Promise<Role | null> {
    const entity = await this.repo.findOne({ where: { externalId } });
    return entity ? this.to_domain(entity) : null;
  }

  async findAll({ page, limit, name_contains }: RoleFilters): Promise<PaginatedResult<Role>> {
    const qb = this.repo.createQueryBuilder('role');
    if (name_contains) {
      qb.where('role.name ILIKE :name', { name: `%${name_contains}%` });
    }
    const [items, total] = await qb.skip((page - 1) * limit).take(limit).getManyAndCount();
    return { items: items.map(this.to_domain), total, page, limit };
  }

  private to_domain(entity: RoleEntity): Role {
    return {
      id: entity.externalId,          // Exponer externalId como "id"
      name: entity.name,
      description: entity.description,
      createdAt: entity.createdAt.toISOString(),
    };
  }
}
```

## Errores de PostgreSQL

```typescript
import { is_pg_unique_violation } from '@platam/shared';
// Detecta error code 23505 (unique_violation)
if (is_pg_unique_violation(err)) throw new ConflictException('ya existe');
```

## Idempotencia en Mensajes SQS

Las tablas que procesan mensajes SQS tienen columna `sqs_message_id` (unique) para detectar duplicados y retornar resultado cacheado sin reprocesar.
