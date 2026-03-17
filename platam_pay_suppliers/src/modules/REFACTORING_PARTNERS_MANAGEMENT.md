# Refactorización: unificación partners / management

## 1. Análisis del estado actual

Antes de la refactorización existían dos módulos con responsabilidades solapadas:

| Módulo      | Ubicación   | Contenido |
|------------|-------------|-----------|
| **management** | `modules/management/` | Contenía toda la lógica de partners: controlador, use cases, DTOs, dominio (eventos, puertos), infraestructura (event bus, handlers, storage, stubs). El path `@partners/*` apuntaba aquí. |
| **partners**   | `modules/partners/`   | Módulo paralelo con los mismos use cases básicos (CRUD + change status), mismo dominio (model, repository port), mismos DTOs y su propio controlador bajo la ruta `partners` (sin event-driven). |

Problemas:
- Duplicación de use cases, DTOs, dominio y repositorio entre ambos módulos.
- Lógica de negocio repartida entre management y partners.
- Dos controladores con rutas distintas (`partners/register` vs `partners`) y comportamientos similares.
- Path `@partners` asociado a management, generando confusión sobre la ubicación real del dominio “partners”.

## 2. Identificación de duplicidades

- **Use cases**: CreatePartner, FindAll, FindByExternalId, Update, Delete, ChangeStatus (y CreatePartnerEventDriven solo en management).
- **DTOs**: CreatePartnerRequest, UpdatePartnerRequest, PartnerResponse, PartnerListQuery, ChangePartnerStatusRequest (y Category, CreatePartnerFull en management).
- **Dominio**: Partner model, PartnerRepositoryPort, y en management además EventBusPort, PartnerLogoStoragePort, eventos de dominio.
- **Infraestructura**: Solo en management (event bus, handlers, storage, stubs).
- **Controladores**: Dos controladores con mapeo a DTO y manejo de errores muy similar.

## 3. Código refactorizado

### Módulo `partners` (lógica centralizada)

- **application**: DTOs (incl. category, create-partner-full), use cases (CRUD + event-driven).
- **domain**: model, ports (partner.repository, event-bus, partner-logo-storage), events.
- **infrastructure**: event bus adapter, handlers (logo, categories, user), storage adapter, file uploader, stubs de integración.
- **partners.module.ts**: Sin controladores. Declara todos los providers y **exporta** los use cases y el repositorio para que otros módulos los inyecten.

### Módulo `management` (solo capa HTTP)

- **management.module.ts**: Importa `PartnersModule` y declara únicamente `PartnersController`.
- **presentation/partners.controller.ts**: Controlador delgado que solo recibe request, llama al use case correspondiente del módulo partners y mapea a DTO de respuesta; manejo de errores de constraint en capa HTTP (`runWithConstraintHandling`).

### Configuración

- **tsconfig.json**: `"@partners/*": ["src/modules/partners/*"]` para que toda la lógica de partners resuelva al módulo `partners`.
- **app.module.ts**: Importa `ManagementModule` (que a su vez importa `PartnersModule`). No se importa directamente un “PartnersModule” desde management.

## 4. Ejemplo de delegación correcta

El controlador en management no contiene lógica de negocio; solo orquesta y adapta HTTP:

```typescript
// management/presentation/partners.controller.ts

@Get(":externalId")
async findByExternalId(
  @Param("externalId", ParseUUIDPipe) externalId: string,
): Promise<PartnerResponseDto> {
  const partner = await this.findPartnerByExternalIdUseCase.execute(externalId);
  if (!partner) throw new NotFoundException("Partner not found");
  return toResponseDto(partner);
}
```

- **Controller**: Obtiene `externalId`, llama a un use case exportado por `PartnersModule`, traduce “no encontrado” a 404 y dominio a DTO.
- **Use case** (en partners): Obtiene el partner del repositorio; no conoce HTTP ni DTOs de presentación.

Creación con flujo event-driven:

```typescript
@Post("full")
async createFull(...): Promise<PartnerResponseDto> {
  const dto = JSON.parse(dataJson || "{}") as CreatePartnerFullRequestDto;
  // validación mínima de archivos
  const created = await this.runWithConstraintHandling(() =>
    this.createPartnerEventDrivenUseCase.execute(dto, { logo: ..., coBrandingLogo: ... }),
  );
  return toResponseDto(created);
}
```

Toda la orquestación (business, logos, partner, eventos) vive en `CreatePartnerEventDrivenUseCase` dentro del módulo partners.

## 5. Buenas prácticas aplicadas

- **Separación de responsabilidades**: Partners = dominio + aplicación + infraestructura; Management = solo entrada HTTP y mapeo a DTO.
- **Controllers sin lógica de negocio**: Solo validación de entrada, llamada a use case y mapeo dominio → DTO; errores de constraint traducidos a excepciones HTTP.
- **Uso de casos de uso**: Toda la lógica en use cases inyectados desde `PartnersModule`.
- **Bajo acoplamiento**: Management depende solo de la interfaz pública de PartnersModule (use cases y DTOs); no conoce repositorios ni handlers.
- **Alta cohesión en partners**: Un solo módulo con todo lo relativo a partners (entidades, puertos, eventos, handlers, integraciones).
- **Código mantenible**: Un único lugar para cambiar reglas de negocio (partners); management se mantiene estable salvo cambios de contrato HTTP.
