---
name: testing-patterns
description: Cómo escribir tests en Platam Pay V2 con Jest y NestJS Testing: estructura de unit tests para use cases, mocking de repositorios y dependencias AWS. Usar cuando se necesita escribir o revisar un test unitario, entender cómo mockear el repositorio, o saber qué escenarios debe cubrir un test.
---

# Testing Patterns — Platam Pay V2 (Jest + NestJS Testing)

## Ubicación

- Tests junto al código: `create-role.use-case.spec.ts` en la misma carpeta que `create-role.use-case.ts`
- No hay carpeta `__tests__/` separada

## Estructura de Test de Use Case

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { CreateRoleUseCase } from './create-role.use-case';
import { ROLE_REPOSITORY } from '../../domain/ports/role.repository';

describe('CreateRoleUseCase', () => {
  let use_case: CreateRoleUseCase;
  let role_repository: jest.Mocked<RoleRepository>;

  beforeEach(async () => {
    const mock_repository = {
      create: jest.fn(),
      findByExternalId: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateRoleUseCase,
        { provide: ROLE_REPOSITORY, useValue: mock_repository },
      ],
    }).compile();

    use_case = module.get<CreateRoleUseCase>(CreateRoleUseCase);
    role_repository = module.get(ROLE_REPOSITORY);
  });

  afterEach(() => jest.clearAllMocks());

  describe('execute', () => {
    it('should create a role successfully', async () => {
      // Arrange
      const payload = { name: 'ADMIN', description: 'Admin role' };
      const expected = { id: 'uuid-123', name: 'ADMIN', createdAt: '2024-01-01T00:00:00.000Z' };
      role_repository.create.mockResolvedValue(expected);

      // Act
      const result = await use_case.execute(payload);

      // Assert
      expect(role_repository.create).toHaveBeenCalledWith(payload);
      expect(result).toEqual(expected);
    });

    it('should throw ConflictException on unique violation', async () => {
      // Arrange
      role_repository.create.mockRejectedValue(new Error('duplicate key'));
      jest.mock('@platam/shared', () => ({ is_pg_unique_violation: () => true }));

      // Act & Assert
      await expect(use_case.execute({ name: 'ADMIN' })).rejects.toThrow(ConflictException);
    });

    it('should rethrow unknown errors', async () => {
      // Arrange
      role_repository.create.mockRejectedValue(new Error('DB connection lost'));

      // Act & Assert
      await expect(use_case.execute({ name: 'ADMIN' })).rejects.toThrow('DB connection lost');
    });
  });
});
```

## Mockear Módulos Externos

```typescript
// AWS SDK
jest.mock('@aws-sdk/client-sqs', () => ({
  SQSClient: jest.fn(() => ({ send: jest.fn() })),
  SendMessageCommand: jest.fn(),
}));

// Función utilitaria de @platam/shared
jest.mock('@platam/shared', () => ({
  ...jest.requireActual('@platam/shared'),
  is_pg_unique_violation: jest.fn(),
}));
```

## Qué Cubrir Obligatoriamente por Use Case

1. ✅ Happy path (éxito)
2. ✅ `ConflictException` en violación de unicidad (si el use case llama a create)
3. ✅ `NotFoundException` cuando el recurso no existe (si busca por ID)
4. ✅ Que errores desconocidos se relancen sin silenciar
5. ✅ Que el repositorio sea llamado con los parámetros correctos

## Comandos

```bash
npm test                                                    # Todos los tests
npm test -- --testPathPattern=create-role                  # Filtrar por nombre
npm test -- --watch --testPathPattern=transversal-ms       # Watch mode
npm test -- --coverage --testPathPattern=apps/suppliers-ms # Coverage
```

## Anti-patterns

- ❌ No testear la implementación de TypeORM — testear el use case con repositorio mockeado
- ❌ No usar `any` en los mocks — usar `jest.Mocked<InterfazRepositorio>`
- ❌ No dejar `console.log` en los tests
