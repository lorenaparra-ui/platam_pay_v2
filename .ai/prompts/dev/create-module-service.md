Rol: Arquitecto senior experto en Arquitectura Hexagonal (Ports & Adapters), DDD táctico, Clean Architecture, NestJS y TypeScript.

Misión: Generar un CRUD completo para las entidades en un microservicio concreto (`apps/<ms>/`).

1. Variables del Endpoint
Module: [module]
Microservicio: [ms] (ej: `suppliers-ms`, `transversal-ms`)

Estructura de Archivos Obligatoria (rutas relativas a `apps/<ms>/src/`)
src/modules/[module]/
├── domain/
│   ├── models/
│   │   └── [entity].models.ts
│   ├── value-objects/
│   ├── ports/
│   │   └── [entity].ports.ts
│   └── exceptions/
│
├── application/
│   └── use-cases/
│       ├── create-[entity]/
│       ├── get-[entity]/
│       ├── list-[entity]/
│       ├── update-[entity]/
│       └── delete-[entity]/

Infraestructura (en cada microservicio; seguir el MS de referencia):

`apps/<ms>/src/infrastructure/database/`
├── repositories/
│   └── typeorm-[entity].repository.ts
└── mappers/
    └── [entity].mapper.ts

**Entidades TypeORM:** si la tabla pertenece a un contexto ya cubierto por `libs/*-data`, la `@Entity` vive en esa lib (ver `@.ai/prompts/dev/hexa-typeorm-ddl-entity.md`), no en `infrastructure/database/entities/` del app salvo excepción acordada.

Capa de Dominio (DDD - Obligatoria)
1. Entidades de dominio
Clases puras (sin decorators)
Encapsulan reglas de negocio
No exponen setters públicos innecesarios
Validan su propio estado

2.Value Objects (cuando aplique)

3.ports (Puerto)
4.Domain Exceptions

Application Layer

Cada caso de uso debe:

Orquestar lógica
Usar el repositorio (port)
No depender de frameworks
DTOs internos (Application) Input, Output

Reglas Clave
Identificadores
Usar external_id (UUID)
Nunca exponer id incremental
Desacoplamiento
Domain → no depende de nada
Application → depende de Domain
Infrastructure → depende de Application/Domain


Anti-patrones prohibidos
❌ Lógica de negocio en controllers (la presentación solo orquesta / valida entrada HTTP)
❌ TypeORM o `@Entity` en dominio o casos de uso
❌ Decorators de framework en modelos de dominio
❌ Exponer entidades ORM en la API o en casos de uso
❌ Uso de `any`
❌ Duplicar reglas de negocio en mappers o repositorios (pertenecen al dominio / orquestación en application)

**Nota:** Los **controllers** y **DTOs HTTP** sí existen en la capa `presentation/` y DTOs de aplicación en `application/` cuando el módulo expone API; lo prohibido es mezclar capas o acoplar dominio a Nest/TypeORM.