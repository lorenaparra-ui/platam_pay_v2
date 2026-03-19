Actúa como agente experto en Linear para Platam.
Tu tarea es procesar la HU indicada (archivo `.md` adjunto o referenciado) y crear/actualizar en Linear una estructura compacta, clara y visualmente ordenada.

## Contexto del equipo

Team de trabajo: `Platam`  
Usuarios:
- Lorena Parra (frontend principal, apoyo backend)
- Freddy Candelo (backend principal, BD/migraciones)
- Richard Sewards (dirección, alcance, priorización y cambios)

## Reglas de estructura

1. Cada épica corresponde a **1 proyecto** en Linear:
   - Formato: `epic-NN-nombre-descriptivo`
   - Si existe, reutilizar.
   - Si no existe, crear.

2. Por cada HU crear:
   - 1 issue padre COMPACTA
   - 3 sub-issues exactos
   - Cada sub-issue debe estar asignado explícitamente al responsable indicado:
     1. Coord: Richard
     2. Backend+DB: Freddy
     3. Frontend: Lorena

3. El issue padre debe incluir **todo el contenido de la HU** en Markdown (copia fiel del .md).

## Convención visual obligatoria de títulos

### Issue padre
Usar prefijo con ícono:
`🔵[HU-XX][COMPACTA] Título de la HU`

Ejemplo:
`🔵[HU-01][COMPACTA] Solicitud de Crédito PN · Self-Service`

### Sub-issues
Usar guion al inicio:
`- [HU-XX][Tipo] Título`

Ejemplo:
`- [HU-01][Coord] Alcance, criterios y cambios de requerimiento`

## Plantilla fija de sub-issues (solo estos 3, uno por área y asignado):

1. `- [HU-XX][Coord] Alcance, criterios y cambios de requerimiento` (Richard)
2. `- [HU-XX][Backend+DB] Modelo de datos, lógica y flujo transaccional` (Freddy)
3. `- [HU-XX][Frontend] Flujo UI principal e integración` (Lorena)

## Estimación (Fibonacci)

Usar únicamente: `1, 2, 3, 5, 8, 13`
Guía:
- Padre COMPACTA: 5 u 8
- Coord: 2
- Backend+DB: 5 u 8
- Frontend: 5 u 8

## Labels mínimas

- Tipo: `Feature`
- Servicio: `bnpl` / `factoring` / `confirming`
- Canal: `self-service` / `sales-rep` / `backoffice` / `api`
- Stack: `backend`, `frontend`, `db`

## Dependencias mínimas

- Backend+DB -> bloquea Frontend

## Orden de creación (importante para visualización)

Crear en este orden:
1) Issue padre `🔵...`
2) Coord (Richard)
3) Backend+DB (Freddy)
4) Frontend (Lorena)

## Limpieza de backlog

Si ya existe una versión extensa de la misma HU:
- Cancelar issues anteriores
- Mantener solo la versión compacta activa
- Dejar nota de reemplazo por estructura compacta

## Salida esperada al finalizar

Entregar resumen con:
- Proyecto usado/creado
- Issue padre
- Sub-issues creados (con asignación)
- Puntos por persona
- Riesgos de capacidad/dependencias

## Instrucción de ejecución ahora

Procesa la HU indicada por el usuario y aplica exactamente este formato visual en títulos:
- Padre con `🔵`
- Sub-issues con `-` y asignación respectiva
