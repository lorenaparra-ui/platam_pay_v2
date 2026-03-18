# Guía completa: Inicializar PostgreSQL con DDL usando Docker Compose

## Objetivo

Montar e inicializar la base de datos PostgreSQL con el archivo DDL:

- `.ai/schemas/database-schema.sql`

al levantar el stack con Docker por primera vez, usando el mecanismo estándar del contenedor oficial de Postgres (`/docker-entrypoint-initdb.d`).

---

## Contexto del proyecto

Este repositorio ya tiene:

- Servicio `postgres` en `docker-compose.yml`
- Variables de entorno en `platam_pay_users/.env.docker`
- Servicio `users-service` con TypeORM apuntando a PostgreSQL

Puntos importantes actuales:

- `TYPEORM_SYNC=false` ya está configurado en `platam_pay_users/.env.docker` (correcto para no romper un esquema DDL manual).
- El script DDL existe en `.ai/schemas/database-schema.sql`.

---

## Cómo funciona el init de Postgres en Docker

La imagen oficial de Postgres ejecuta automáticamente archivos `.sql`, `.sql.gz` o `.sh` dentro de:

- `/docker-entrypoint-initdb.d`

**solo cuando el directorio de datos está vacío** (primera creación del volumen).

Si el volumen ya existe, el script **no se vuelve a ejecutar**.

---

## Paso 1: montar el DDL en el servicio `postgres`

Edita `docker-compose.yml` y agrega el mount del DDL en `services.postgres.volumes`.

Referencia de cómo debe quedar la sección:

```yaml
services:
  postgres:
    image: postgres:15-alpine
    container_name: platam_db
    restart: always
    env_file:
      - ./platam_pay_users/.env.docker
    environment:
      POSTGRES_USER: ${POSTGRES_USERNAME:-admin}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-postgres}
      POSTGRES_DB: ${POSTGRES_DATABASE:-platam_pay}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./.ai/schemas/database-schema.sql:/docker-entrypoint-initdb.d/01-database-schema.sql:ro
    networks:
      - backend-network
```

Recomendaciones:

- Usa prefijo numérico en el nombre (`01-...`) para orden explícito.
- Usa `:ro` para montar en solo lectura.

---

## Paso 2: validar variables de entorno

Confirma en `platam_pay_users/.env.docker`:

- `POSTGRES_USERNAME`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`
- `POSTGRES_HOST=postgres`
- `TYPEORM_SYNC=false`

Ejemplo actual válido:

```env
POSTGRES_HOST=postgres
POSTGRES_USERNAME=admin
POSTGRES_PASSWORD=postgres
POSTGRES_DATABASE=platam_pay
TYPEORM_SYNC=false
TYPEORM_TYPE=postgres
TYPEORM_PORT=5432
```

---

## Paso 3: levantar el stack con inicialización limpia

Como el init SQL solo corre con volumen vacío, en la primera carga del DDL haz:

```powershell
docker compose down -v
docker compose up --build
```

Notas:

- `down -v` elimina el volumen `postgres_data`.
- `up --build` reconstruye `users-service` y levanta `postgres` + servicio de app.

Si no quieres reconstruir imágenes:

```powershell
docker compose down -v
docker compose up
```

---

## Paso 4: verificar que el DDL se ejecutó

### 4.1 Revisar logs de Postgres

```powershell
docker logs -f platam_db
```

Debes ver mensajes de inicialización y ejecución de scripts en `/docker-entrypoint-initdb.d`.

### 4.2 Verificar tablas principales

```powershell
docker exec -it platam_db psql -U admin -d platam_pay -c "\dt"
```

Si usas otro usuario o base, reemplaza `admin` y `platam_pay`.

### 4.3 Verificar datos sembrados del DDL

```powershell
docker exec -it platam_db psql -U admin -d platam_pay -c "SELECT entity_type, code FROM statuses LIMIT 10;"
```

Si devuelve filas, el bloque inicial de inserts se aplicó.

---

## Paso 5: comprobar conectividad desde `users-service`

### 5.1 Health endpoint

```powershell
Invoke-WebRequest http://localhost:3000/health
```

Respuesta esperada: estado OK.

### 5.2 Logs del microservicio

```powershell
docker logs -f platam_users
```

Si hay errores de conexión, normalmente serán por:

- host/puerto incorrecto
- credenciales distintas entre compose y env
- esquema esperado por TypeORM que no coincide con el DDL real

---

## Paso 6: comportamiento en reinicios posteriores

Cuando reinicias sin borrar volumen:

```powershell
docker compose down
docker compose up
```

el SQL de `/docker-entrypoint-initdb.d` **no** se ejecuta de nuevo, porque la base ya existe.

Esto es normal y esperado.

---

## Troubleshooting (problemas comunes)

## 1) "No veo tablas nuevas después de cambiar el SQL"

Causa:

- El volumen ya estaba creado.

Solución:

```powershell
docker compose down -v
docker compose up
```

## 2) "El contenedor postgres arranca pero falla el script"

Causa:

- Error de sintaxis SQL, dependencia de orden, o conflicto de constraints.

Solución:

- Revisar logs de `platam_db`.
- Validar el SQL manualmente en `psql`.
- Partir el DDL en múltiples scripts (`01-`, `02-`, `03-`) si necesitas orden más estricto.

## 3) "users-service conecta, pero falla al consultar entidades"

Causa probable en este proyecto:

- Desalineación entre entidades TypeORM y tablas reales del DDL.

Ejemplo observado:

- Entidad: `business_seniorities`
- DDL: `business_seniority`

Solución:

- Alinear entidades/repositorios al DDL, o
- Ajustar el DDL para incluir exactamente las tablas/columnas que espera la app.

## 4) "Quiero rerun del DDL sin perder todo el volumen"

Opciones:

- Ejecutar cambios incrementales con migraciones SQL/TypeORM.
- Aplicar scripts manuales con `psql` dentro del contenedor.

No recomendado:

- Depender siempre de `down -v` en ambientes compartidos.

---

## Buenas prácticas recomendadas

- Mantener `TYPEORM_SYNC=false` en cualquier ambiente con DDL/migraciones controladas.
- No mezclar creación de esquema por `synchronize` y por SQL manual al mismo tiempo.
- Versionar cambios de esquema como migraciones incrementales después del baseline inicial.
- Mantener seeds separados del schema si el volumen de datos crece.

---

## Flujo recomendado para este repo

1. Montar `database-schema.sql` en `/docker-entrypoint-initdb.d/01-database-schema.sql`.
2. Ejecutar `docker compose down -v` y luego `docker compose up --build`.
3. Verificar tablas e inserts en `statuses`.
4. Levantar `users-service` y validar `/health`.
5. Corregir desalineaciones entidad <-> DDL antes de exponer endpoints de negocio.

---

## Comandos rápidos (chuleta)

```powershell
# Levantar limpio (re-ejecuta init SQL)
docker compose down -v
docker compose up --build

# Ver logs de postgres
docker logs -f platam_db

# Ver tablas
docker exec -it platam_db psql -U admin -d platam_pay -c "\dt"

# Ver datos seed de statuses
docker exec -it platam_db psql -U admin -d platam_pay -c "SELECT entity_type, code FROM statuses;"

# Ver logs de users-service
docker logs -f platam_users
```

---

## Acceso web con pgAdmin (Docker)

Si quieres inspeccionar la base de datos con interfaz gráfica, puedes levantar pgAdmin como contenedor adicional y abrirlo en el navegador.

### Paso A: asegurar que PostgreSQL esté levantado

Desde la raíz del proyecto:

```powershell
docker compose up -d postgres
```

### Paso B: levantar pgAdmin en la misma red Docker

Usa este comando (funciona en Git Bash y PowerShell):

```bash
docker run -d \
  --name platam_pgadmin \
  --restart unless-stopped \
  -p 5050:80 \
  --network platam_backend_net \
  -e PGADMIN_DEFAULT_EMAIL=admin@platam.dev \
  -e PGADMIN_DEFAULT_PASSWORD=admin123 \
  dpage/pgadmin4
```

Notas:

- `--network platam_backend_net` permite que pgAdmin alcance el host `postgres` por nombre de servicio.
- Si ya existe el contenedor, elimínalo antes:

```bash
docker rm -f platam_pgadmin
```

### Paso C: abrir pgAdmin en navegador

Abre:

- `http://localhost:5050`

Credenciales iniciales:

- Email: `admin@platam.dev`
- Password: `admin123`

### Paso D: registrar el servidor PostgreSQL en pgAdmin

Dentro de pgAdmin:

1. Click en **Add New Server**.
2. En **General**:
   - Name: `platam-db`
3. En **Connection**:
   - Host name/address: `postgres`
   - Port: `5432`
   - Maintenance database: valor de `POSTGRES_DATABASE` en `platam_pay_users/.env.docker` (por ejemplo `platam_pay_dev`)
   - Username: valor de `POSTGRES_USERNAME` (por ejemplo `admin`)
   - Password: valor de `POSTGRES_PASSWORD` (por ejemplo `postgres_dev_123`)
4. Marcar **Save password** y guardar.

### Paso E: navegar tablas y validar DDL

Ruta de navegación en pgAdmin:

- `Servers > platam-db > Databases > <tu_db> > Schemas > public > Tables`

Query rápida de validación:

```sql
SELECT entity_type, code
FROM statuses
LIMIT 10;
```

### Troubleshooting de pgAdmin

## 1) "Could not connect to server"

- Confirmar que `platam_db` está arriba (`docker ps`).
- Confirmar que pgAdmin está en red `platam_backend_net`.
- Verificar que el host configurado sea `postgres` (no `localhost`).

## 2) "database does not exist"

- Usar como `Maintenance database` una DB existente.
- Revisar el valor actual de `POSTGRES_DATABASE` en `platam_pay_users/.env.docker`.
- Si cambiaste nombre de DB, recrear volumen o crear DB manualmente.

## 3) Puerto 5050 ocupado

Cambiar mapeo de puertos:

```bash
docker rm -f platam_pgadmin
docker run -d --name platam_pgadmin --restart unless-stopped -p 5051:80 --network platam_backend_net -e PGADMIN_DEFAULT_EMAIL=admin@platam.dev -e PGADMIN_DEFAULT_PASSWORD=admin123 dpage/pgadmin4
```

Luego abrir `http://localhost:5051`.

---

## Siguiente paso sugerido

Después del baseline con DDL, crear una guía adicional de "alineación TypeORM vs DDL" para:

- nombres de tablas,
- nombres de columnas,
- tipos,
- relaciones.

Eso evita errores de runtime cuando el microservicio consulte tablas que aún no coinciden con el esquema real.
