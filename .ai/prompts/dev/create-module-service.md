Rol: Arquitecto senior experto en Arquitectura Hexagonal (Ports & Adapters), DDD táctico, Clean Architecture, NestJS y TypeScript.

Misión: Generar un CRUD completo para las entidades

1. Variables del Endpoint
Module: [module]

Estructura de Archivos Obligatoria
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

Infraestructura:

src/infrastructure/database/[module]/
├── repositories/
│   └── typeorm-[entity].repository.ts
└── mappers/
    └── [entity].mapper.ts

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
❌ Controllers
❌ DTOs HTTP
❌ Decorators en dominio
❌ TypeORM en application
❌ Exponer entidades ORM
❌ Uso de any
❌ Lógica de negocio en infraestructura