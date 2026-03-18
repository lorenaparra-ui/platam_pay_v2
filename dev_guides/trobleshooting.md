# Troubleshooting rapido (NestJS + TypeScript)

Guia corta para errores comunes que aparecen despues de renombrar/mover archivos o cambiar configuracion de entorno.

## 1) TS1240 en decorators sobre archivo eliminado

### Sintoma
- Error en Problems similar a:
  - `TS1240: Unable to resolve signature of property decorator...`
- Referencia a una ruta que ya no existe, por ejemplo:
  - `src/credit-applications/dto/credit-application-bnpl-response.dto.ts`

### Causa raiz
- Diagnostico obsoleto del TypeScript Server (cache del editor), no error real del codigo actual.

### Solucion
1. `Ctrl+Shift+P` -> `TypeScript: Restart TS Server`
2. Si persiste: `Ctrl+Shift+P` -> `Developer: Reload Window`
3. Cerrar tabs huérfanos de archivos eliminados.

### Verificacion
- Confirmar que la ruta vieja no existe.
- Ejecutar:
  - `npx tsc --noEmit`

---

## 2) "Cannot find module './app.service'" en tests

### Sintoma
- En `app.controller.spec.ts` aparece:
  - `Cannot find module './app.service'...`

### Causa raiz
- Test desalineado con el controlador actual (plantilla vieja).
- El spec usa `AppService/getHello()` pero el controller expone `healthCheck()`.

### Solucion
- Actualizar el spec para:
  - remover `AppService`
  - probar `healthCheck()`

### Verificacion
- `npm run test -- src/app.controller.spec.ts`
- `npx tsc --noEmit`

---

## 3) `ENOTFOUND postgres` al ejecutar `npm run start:dev`

### Sintoma
- Error en runtime:
  - `Error: getaddrinfo ENOTFOUND postgres`

### Causa raiz
- Se ejecuta localmente, pero variables de entorno apuntan al host Docker `postgres`.

### Solucion
- Si corres local:
  - usar `POSTGRES_HOST=localhost` (o host real de tu DB).
- Si corres con Docker Compose:
  - mantener `POSTGRES_HOST=postgres` y levantar con compose.

### Verificacion
- Revisar logs de Nest/TypeORM.
- Probar endpoint health una vez arriba:
  - `GET /health`

---

## 4) Errores fantasma despues de renombrar carpetas (feature/module)

### Sintoma
- Problems muestra errores de imports viejos, pero build/test pasan.

### Causa raiz
- Cache de TS/IDE + referencias indexadas de rutas antiguas.

### Solucion
1. `TypeScript: Restart TS Server`
2. `Developer: Reload Window`
3. Reindexar y validar con:
   - `npx tsc --noEmit`
   - `npm run test`

---

## Checklist corto despues de cada cambio

En `platam_pay_users`:

1. `npx tsc --noEmit`
2. `npm run test -- src/app.controller.spec.ts` (o suite afectada)
3. `npm run start:dev` (si pruebas local)
4. Si usas Docker: `docker-compose up -d --build users-service`

