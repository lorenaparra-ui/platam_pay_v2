---
name: git-workflow
description: Convenciones de Git para Platam Pay: formato de commits (Conventional Commits), naming de branches (feature/HU-XX-Descripcion), proceso de PR y branching strategy. Usar al crear commits, nombrar branches, hacer PRs o revisar si un mensaje de commit cumple las convenciones.
---

# Git Workflow — Platam Pay V2

## Branch Strategy

Branch principal: `main`
Branch de integración: `develop` (cuando existe)

### Nomenclatura de Branches

```
feature/HU-{número}-{descripcion-kebab-case}
```

Ejemplos reales del repo:
- `feature/HU-06-Backend-Process-PN`
- `feature/HU-05-Auth-Client`
- `feature/HU-01-Self-Service`

Para bugs: `fix/HU-{número}-{descripcion}` o `fix/{descripcion-corta}`
Para chores: `chore/{descripcion-corta}`

## Formato de Commits — Conventional Commits

```
{tipo}({scope}): {descripción en inglés, minúsculas}
```

### Tipos observados en el repo

| Tipo | Cuándo usarlo |
|------|--------------|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `chore` | Mantenimiento, configuración, infraestructura |
| `docs` | Documentación |
| `refactor` | Refactoring sin cambio de comportamiento |
| `test` | Agregar o modificar tests |
| `merge` | Commits de merge explícitos |

### Ejemplos reales del repo

```
feat(partner-link): implement partner link reader and integrate into user context
docs(ai): move guides to .ai/context/guides and add HU-05 artifacts
chore(git): ignore dist outputs and drop tracked build artifacts
merge: integrate origin/develop into feature/HU-05-Auth-Client
```

### Scopes comunes

Usar el nombre del módulo o servicio afectado:
- `transversal-ms`, `suppliers-ms`, `products-ms`, `contracts-ms`, `notifications-ms`
- `partner-link`, `auth`, `partners`, `contracts`, `roles`
- `git`, `docker`, `ci`, `deps`, `ai`

## Proceso de PR

1. Branch desde `main` (o `develop` si existe): `git checkout -b feature/HU-XX-nombre`
2. Commits atómicos siguiendo Conventional Commits
3. PR title = primer commit o resumen del HU: `feat(módulo): descripción`
4. Incluir en la descripción del PR:
   - HU relacionada (ej: HU-06)
   - Cambios principales
   - Cómo testear

## Archivos que NO commitear

Ver `.gitignore` — los más críticos:
- `.env` (solo `.env.example`)
- `dist/`, `node_modules/`
- `*.js.map`
- Archivos de build de webpack

## Hooks Pre-commit

No hay hooks pre-commit configurados actualmente. Al crear commits asegurarse de:
- Que TypeScript compile sin errores
- Que los tests pasen
- Que el linting no tenga errores bloqueantes
