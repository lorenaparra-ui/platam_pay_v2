# Platam Pay Users

> Módulo de gestión de usuarios de la plataforma **Platam Pay** bajo arquitectura hexagonal, enfocado en BNPL (Buy Now Pay Later).

## Características

- API RESTful para administración y autenticación de usuarios.
- Integración con PostgreSQL y TypeORM (sin `SELECT *`, siguiendo mejores prácticas de seguridad Fintech).
- Soporte para control de estados vía la entidad `statuses` y funciones avanzadas de validación.
- Soporte completo para múltiple tipos de usuario y manejo seguro de credenciales (no se almacenan contraseñas planas).

## Comenzar rápido

```bash
# Requisitos
- Node.js >= 20.x
- Docker y Docker Compose

# Levantar stack localmente
cp .env.example .env
docker-compose up -d

# Ejecución de migraciones
npm run typeorm:migration:run
```

El API escucha en [http://localhost:3000](http://localhost:3000).

## Entorno y configuración

Las variables principales están en `.env` y puedes revisarlas/adaptarlas. Ejemplo de conexión PostgreSQL:
```
POSTGRES_HOST=localhost
POSTGRES_USERNAME=admin
POSTGRES_PASSWORD=postgres
POSTGRES_DATABASE=platam_pay
```

## Estructura principal

- `src/domain` – Interfaces y entidades del dominio de usuario.
- `src/application` – Casos de uso y lógica de negocio.
- `src/infrastructure` – Persistencia, entidades TypeORM, migraciones y adaptadores de terceros.
- `src/config` – Configuración general (TypeORM, entorno, seguridad).

## ⚠️ Seguridad y mejores prácticas

- Evitar `console.log` en producción, usar siempre Logger de NestJS.
- Nunca exponer secretos, credenciales o datos personales en logs o mensajes de error.
- Prohibido el uso de tipos `number` flotante para cálculos financieros; utilizar enteros (centavos) o librerías de decimales.

## Licencia

Privado – Equipo Platam Pay.

