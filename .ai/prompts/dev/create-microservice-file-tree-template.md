# CONTEXTO
Monorepo backend con microservicios NestJS + TypeScript + TypeORM bajo arquitectura hexagonal.
El repositorio usa:
- `docker-compose.yml` en raíz para orquestación.
- Un servicio base de referencia (`platam_pay_users`) con estructura estándar.
- Convención de módulos por feature en `src/modules/<feature>/`.
- Infraestructura compartida por servicio en `src/infrastructure/`.

Este prompt crea la **plantilla exacta de árbol de archivos (archivo por archivo)** para un microservicio nuevo, reusable para cualquier dominio, y con ejemplo aplicado a `platam_pay_partners`.

# OBJETIVO
Crear un nuevo microservicio clonando la convención de `platam_pay_users`, con:
1) estructura base completa de proyecto,
2) wiring mínimo para arrancar (`main`, `app.module`, config, infraestructura),
3) árbol de archivos exacto para implementar features hexagonales,
4) actualización de `docker-compose.yml` para levantar el servicio nuevo.

# IDENTIFICADORES (REEMPLAZAR)
- MicroserviceFolderName: `<REEMPLAZAR>` (kebab_case con prefijo `platam_pay_`; ej: `platam_pay_partners`)
- ComposeServiceName: `<REEMPLAZAR>` (ej: `partners-service`)
- ContainerName: `<REEMPLAZAR>` (ej: `platam_partners`)
- DomainName: `<REEMPLAZAR>` (ej: `partners`)
- DomainNameSingular: `<REEMPLAZAR>` (ej: `partner`)
- ModuleClassName: `<REEMPLAZAR>` (ej: `PartnersModule`)
- HostPort: `<REEMPLAZAR>` (ej: `3001`)
- InternalPort: `<REEMPLAZAR>` (ej: `3000`)
- TsPathAlias: `<REEMPLAZAR>` (ej: `@partners/*`)

# EJEMPLO APLICADO (platam_pay_partners)
- MicroserviceFolderName: `platam_pay_partners`
- ComposeServiceName: `partners-service`
- ContainerName: `platam_partners`
- DomainName: `partners`
- DomainNameSingular: `partner`
- ModuleClassName: `PartnersModule`
- HostPort: `3001`
- InternalPort: `3000`
- TsPathAlias: `@partners/*`

# ÁRBOL DE ARCHIVOS OBLIGATORIO (GENÉRICO, REUTILIZABLE)
> Crear **archivo por archivo** en estas rutas exactas (ajustando placeholders):

```txt
<repo-root>/
├─ docker-compose.yml                              (actualizar: agregar <ComposeServiceName>)
├─ .env.docker                                     (reusar o extender variables globales)
└─ <MicroserviceFolderName>/
   ├─ package.json
   ├─ package-lock.json
   ├─ Dockerfile
   ├─ README.md
   ├─ nest-cli.json
   ├─ tsconfig.json
   ├─ tsconfig.build.json
   ├─ .env
   └─ src/
      ├─ main.ts
      ├─ app.module.ts
      ├─ app.controller.ts
      ├─ app.controller.spec.ts
      ├─ common/
      │  └─ common.module.ts
      ├─ config/
      │  ├─ app.config.ts
      │  ├─ dotenv.config.ts
      │  └─ typeorm.config.ts
      ├─ infrastructure/
      │  ├─ infrastructure.module.ts
      │  └─ database/
      │     ├─ entities/
      │     │  └─ base-external-id.entity.ts
      │     ├─ mappers/
      │     ├─ repositories/
      │     └─ services/
      │        └─ postgres-type-orm-config.service.ts
      └─ modules/
         ├─ transversal/
         │  ├─ transversal.module.ts
         │  ├─ domain/
         │  │  ├─ models/
         │  │  └─ ports/
         │  ├─ application/
         │  │  ├─ dto/
         │  │  └─ use-cases/
         │  └─ presentation/
         └─ <DomainName>/
            ├─ <DomainName>.module.ts
            ├─ domain/
            │  ├─ models/
            │  └─ ports/
            ├─ application/
            │  ├─ dto/
            │  │  ├─ <DomainNameSingular>-response.dto.ts
            │  │  ├─ create-<DomainNameSingular>-request.dto.ts
            │  │  └─ update-<DomainNameSingular>-request.dto.ts
            │  └─ use-cases/
            └─ presentation/
               └─ <DomainName>.controller.ts
```

# ÁRBOL DE ARCHIVOS OBLIGATORIO (EJEMPLO EXACTO: platam_pay_partners)
```txt
platam_pay_partners/
├─ package.json
├─ package-lock.json
├─ Dockerfile
├─ README.md
├─ nest-cli.json
├─ tsconfig.json
├─ tsconfig.build.json
├─ .env
└─ src/
   ├─ main.ts
   ├─ app.module.ts
   ├─ app.controller.ts
   ├─ app.controller.spec.ts
   ├─ common/common.module.ts
   ├─ config/
   │  ├─ app.config.ts
   │  ├─ dotenv.config.ts
   │  └─ typeorm.config.ts
   ├─ infrastructure/
   │  ├─ infrastructure.module.ts
   │  └─ database/
   │     ├─ entities/base-external-id.entity.ts
   │     ├─ mappers/
   │     ├─ repositories/
   │     └─ services/postgres-type-orm-config.service.ts
   └─ modules/
      ├─ transversal/
      │  ├─ transversal.module.ts
      │  ├─ domain/models/
      │  ├─ domain/ports/
      │  ├─ application/dto/
      │  ├─ application/use-cases/
      │  └─ presentation/
      └─ partners/
         ├─ partners.module.ts
         ├─ domain/models/
         ├─ domain/ports/
         ├─ application/dto/
         │  ├─ partner-response.dto.ts
         │  ├─ create-partner-request.dto.ts
         │  └─ update-partner-request.dto.ts
         ├─ application/use-cases/
         └─ presentation/partners.controller.ts
```

# REGLAS OBLIGATORIAS
- Mantener la misma convención de `platam_pay_users` para scripts, Dockerfile y bootstrap Nest.
- No mover infraestructura ORM fuera de `src/infrastructure/database/`.
- Usar `external_id` UUID para exposición pública; no exponer `id` incremental en APIs.
- En features con CRUD, usar `src/modules/<DomainName>/domain|application|presentation`.
- Mantener `ValidationPipe` global en `main.ts`.
- Swagger en `/docs` y healthcheck en `/health`.
- No usar `console.log` en producción; usar `Logger` de NestJS.

# DO (PASOS DE IMPLEMENTACIÓN)
1. Copiar base de `platam_pay_users` a `<MicroserviceFolderName>`.
2. Renombrar metadatos (`package.json`, nombre de servicio, README, puertos y tags Swagger).
3. Actualizar `tsconfig.json` agregando alias del nuevo dominio (`<TsPathAlias>`).
4. Crear carpeta `src/modules/<DomainName>/` con árbol completo `domain/application/presentation`.
5. Registrar `<ModuleClassName>` en `src/app.module.ts`.
6. Ajustar `docker-compose.yml` con `<ComposeServiceName>`:
   - `build.context: ./<MicroserviceFolderName>`
   - `container_name: <ContainerName>`
   - `ports: "<HostPort>:<InternalPort>"`
   - conexión DB vía host `postgres`.
7. Verificar que `main.ts` publique Swagger en `/docs` y endpoint `/health`.

# DON'T
- No crear microservicio sin `Dockerfile`, `nest-cli.json`, `tsconfig.build.json` o `.env`.
- No mezclar DTOs/controladores de un feature en raíz de `src/`.
- No duplicar lógica de mapeo ORM dentro de controladores.
- No hardcodear secretos ni credenciales en código.

# CRITERIOS DE ACEPTACIÓN
- [ ] Existe carpeta `./<MicroserviceFolderName>/` con el árbol exacto definido.
- [ ] `docker-compose.yml` tiene `<ComposeServiceName>` operativo.
- [ ] El servicio responde `/health` y expone Swagger en `/docs`.
- [ ] Build y lint del nuevo microservicio pasan.
- [ ] Estructura hexagonal por feature (`domain/application/presentation`) implementada.

# DEFINITION OF DONE (DoD)
- [ ] Plantilla creada y aplicada para `platam_pay_partners`.
- [ ] Plantilla documentada y reusable para futuros servicios (cambiando solo identificadores).
- [ ] Checklist de puertos, compose y configuración validado.
- [ ] Resumen final incluye riesgos y próximos pasos (migraciones, seeds, e2e, CI/CD).

# FORMATO DE RESPUESTA OBLIGATORIO
1) Decisiones clave (4-6 bullets)  
2) Árbol de archivos generado (genérico + aplicado)  
3) Archivos creados/modificados  
4) Wiring Docker/Compose/configuración  
5) Validación (build/lint/health/docs) y siguientes pasos
