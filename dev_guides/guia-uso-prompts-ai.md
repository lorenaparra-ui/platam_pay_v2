# Guia de uso de prompts (`.ai/prompts`)

Esta guia explica **cuando** y **como** usar cada prompt disponible en `.ai/prompts`, con foco en el flujo real del monorepo Platam Pay.

## Estructura actual de prompts

- `dev/`
  - `hexagonal-typeorm-ddl-entity.md`
  - `hexagonal-typeorm-ddl-entity-internal.md`
  - `create-endpoint-swagger.md`
  - `create-safe-typeorm-migration.md`
  - `create-microservice-file-tree-template.md`
- `git/`
  - `senior_staff_engineer.md`
- `linear/`
  - `linear-mcp-agent-issues-hu.md`

---

## Regla rapida de seleccion

- Si vas a crear/alinear **dominio + repo TypeORM** -> `hexagonal-typeorm-ddl-entity.md`
- Si es **logica interna sin controller** -> `hexagonal-typeorm-ddl-entity-internal.md`
- Si solo necesitas **capa HTTP (DTO + controller + Swagger)** -> `create-endpoint-swagger.md`
- Si cambia el esquema de DB -> `create-safe-typeorm-migration.md`
- Si crearas un **microservicio nuevo** desde plantilla -> `create-microservice-file-tree-template.md`
- Si necesitas operacion Git de alto riesgo/controlada -> `git/senior_staff_engineer.md`
- Si necesitas crear/actualizar issues de HU en Linear -> `linear/linear-mcp-agent-issues-hu.md`

## Tabla comparativa rapida

| Prompt | Entrada minima | Resultado esperado | Riesgo/Complejidad |
|---|---|---|---|
| `dev/hexagonal-typeorm-ddl-entity.md` | Entidad + DDL + token DI + feature | Dominio + repo TypeORM + mapper + DI + (feature completo) | Medio/Alto |
| `dev/hexagonal-typeorm-ddl-entity-internal.md` | Entidad + DDL + token DI + use-case interno | Capa interna sin controller (`domain/application/infra`) | Medio |
| `dev/create-endpoint-swagger.md` | Feature existente + port/token + rutas | DTOs + controller + Swagger + validaciones | Medio |
| `dev/create-safe-typeorm-migration.md` | Cambio de esquema + tablas + riesgo | Migracion segura (`up/down`) + pre/post-check + rollback | Alto |
| `dev/create-microservice-file-tree-template.md` | Nombre servicio + puertos + dominio | Arbol base de microservicio + wiring compose | Alto |
| `git/senior_staff_engineer.md` | Objetivo Git + ramas/SHAs | Plan y ejecucion segura con rollback auditable | Alto |
| `linear/linear-mcp-agent-issues-hu.md` | HU en markdown + epica/proyecto | Issue padre + sub-issues + labels/dependencias | Bajo/Medio |

---

## 1) `dev/hexagonal-typeorm-ddl-entity.md`

**Cuando usarlo**
- Crear una nueva entidad backend con arquitectura hexagonal.
- Corregir desalineacion entre DDL y entidad/repositorio.
- Crear puerto de dominio + adapter TypeORM + mapper + DI por token.

**Cuando NO usarlo**
- Si solo necesitas endpoints HTTP (usa `create-endpoint-swagger.md`).
- Si el caso es interno sin API (usa `hexagonal-typeorm-ddl-entity-internal.md`).

**Salida esperada**
- Archivos en `src/modules/<feature>/domain|application|presentation` + `src/infrastructure/database/*`.
- Explicacion ToT breve y validacion build/lint.

---

## 2) `dev/hexagonal-typeorm-ddl-entity-internal.md`

**Cuando usarlo**
- Servicio/capacidad interna consumida por otros modulos.
- Jobs, workers, eventos o procesos sin endpoint REST.

**Cuando NO usarlo**
- Si debes exponer rutas Swagger/REST (usa `create-endpoint-swagger.md`).

**Salida esperada**
- Dominio + repositorio + use-case interno + DI.
- **Sin** carpeta `presentation` ni controller.

---

## 3) `dev/create-endpoint-swagger.md`

**Cuando usarlo**
- Ya existe dominio/puerto/repositorio (hecho con hexa).
- Falta exponer API publica: DTOs, controller y documentacion Swagger.

**Cuando NO usarlo**
- Si aun no existe la base hexagonal (primero usar uno de los prompts hexa).

**Salida esperada**
- DTOs request/response con validaciones.
- Controller con `ParseUUIDPipe`, codigos HTTP correctos y Swagger completo.

---

## 4) `dev/create-safe-typeorm-migration.md`

**Cuando usarlo**
- Cualquier cambio de esquema SQL con riesgo de datos.
- Cambios de columna, indices, constraints, FKs, renames.

**Cuando NO usarlo**
- Cambios puramente de capa API sin impacto en DB.

**Salida esperada**
- Plan `expand -> backfill -> enforce`.
- SQL de pre-check y post-check.
- Migracion `up/down` en `migrations-runner/src/infrastructure/database/migrations/`.

---

## 5) `dev/create-microservice-file-tree-template.md`

**Cuando usarlo**
- Crear un nuevo microservicio desde cero en el monorepo.
- Necesitas estructura base + wiring de compose/config.

**Cuando NO usarlo**
- Si solo agregas un feature a un servicio existente.

**Salida esperada**
- Arbol de archivos completo.
- Integracion en `docker-compose.yml`.
- Consideraciones de `@libs/database` cuando aplique.

---

## 6) `git/senior_staff_engineer.md`

**Cuando usarlo**
- Operaciones Git sensibles: merge/rebase/cherry-pick/revert con riesgo.
- Necesitas plan de rollback auditable.

**Cuando NO usarlo**
- Cambios simples sin riesgo (status/add/commit normales).

**Salida esperada**
- Diagnostico inicial de riesgos.
- Plan A/B/C antes de ejecutar.
- Ejecucion segura por fases y rollback rapido/quirurgico.

---

## 7) `linear/linear-mcp-agent-issues-hu.md`

**Cuando usarlo**
- Convertir una HU en estructura compacta de Linear (padre + sub-issues).
- Estandarizar naming, labels, responsables y dependencias.

**Cuando NO usarlo**
- Si solo buscas analisis tecnico sin crear/actualizar issues.

**Salida esperada**
- Issue padre `🔵[HU-XX][COMPACTA] ...`
- 3 sub-issues definidos por rol (Coord, Backend+DB, Frontend).
- Resumen final de puntos/riesgos.

---

## Flujo recomendado (end-to-end)

1. **Modelado backend**: `hexagonal-typeorm-ddl-entity.md` o `...-internal.md`
2. **Exponer API**: `create-endpoint-swagger.md` (si aplica)
3. **Cambios DB**: `create-safe-typeorm-migration.md`
4. **Nuevo servicio**: `create-microservice-file-tree-template.md` (si aplica)
5. **Planificacion HU**: `linear-mcp-agent-issues-hu.md`
6. **Operacion Git controlada**: `git/senior_staff_engineer.md`

---

## Checklist antes de elegir prompt

- [ ] El cambio requiere API publica o solo uso interno.
- [ ] El dominio/puerto ya existe o hay que crearlo.
- [ ] Hay cambios de DB involucrados.
- [ ] Es un servicio nuevo o feature en servicio existente.
- [ ] Se requiere operacion Git/Linear estructurada.

Con estas respuestas, selecciona el prompt correspondiente sin mezclar responsabilidades.
