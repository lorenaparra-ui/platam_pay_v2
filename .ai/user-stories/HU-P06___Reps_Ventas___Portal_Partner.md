# HU-P06 — Rep. de Ventas · Portal Partner

**Épica:** epic-06-portal-partner  
**Actor:** Usuario operativo del partner  
**Última actualización:** Marzo 2026  
**Estado:** En revisión

---

## Contexto

> ⚠️ **Nota:** Las URLs y dominios usados en este documento (`partners.platam.co`, etc.) son ejemplos de referencia. Los dominios finales se definen en una etapa posterior.

El partner puede gestionar su propio equipo de Sales Reps desde el portal — crear, editar y activar/desactivar. Platam también puede hacer lo mismo desde el backoffice (HU-B05). Ambos canales escriben la misma tabla `sales_representatives` usando el mismo endpoint.

> ⚠️ **Nota para Freddy:** el endpoint de creación/edición de SRs debe ser único y compartido entre el backoffice y el portal partner. No duplicar lógica.

El partner solo puede gestionar los SRs de su propio `partner_id`. No tiene visibilidad sobre SRs de otros partners.

---

## Historia de Usuario

**Como** usuario operativo de un partner,  
**quiero** gestionar mi equipo de Sales Reps desde el portal,  
**para** mantener mi fuerza de ventas actualizada sin depender del equipo de Platam.

---

## Flujo Principal — Lista

```
1. Usuario navega a /reps-ventas

2. Sistema carga los SRs del partner autenticado

3. Usuario puede buscar, filtrar y ordenar

4. Usuario puede crear un nuevo SR
   → Botón "Añadir Rep. de Ventas"

5. Usuario hace clic en un SR
   → Abre el perfil del SR (solo lectura con opción de editar)
```

---

## Pantalla — Lista de Reps de Ventas

### Controles superiores

| Elemento | Detalle |
|---|---|
| Buscador | Nombre, teléfono |
| Filtro: Rol | Todos / Líder / Vendedor (según `sales_rep_role_name` del partner) |
| Filtro: Estado | Todos / Activo / Inactivo |
| Botón | "Añadir Rep. de Ventas" |

### Campos por SR

| Campo | Fuente |
|---|---|
| ID | `sales_representatives.id` |
| Nombre | `sales_representatives.name` |
| Teléfono | `users.phone` ⚠️ campo pendiente (Lorena ítem 13) |
| Rol | `sales_representatives.role` |
| Líder asignado | Nombre del líder vía `teams.leader_id` |
| Estado | Badge: Activo / Inactivo |
| Acciones | Ver · Editar · Activar/Desactivar |

---

## Formulario — Crear / Editar SR

Mismos campos que el backoffice (HU-B05), con la diferencia de que el `partner_id` se toma automáticamente del usuario autenticado — el partner no puede asignar un SR a otro partner.

| Campo | Tipo | Requerido | Notas |
|---|---|---|---|
| Nombre completo | Texto | Sí | |
| Rol | Texto | Sí | Pre-sugerido con `partners.sales_rep_role_name` |
| Teléfono | Selector país + numérico | Sí | Identificador en WhatsApp — no editable tras creación |
| Email | Email | No | Opcional |
| ¿Es líder? | Toggle | Sí | Si activo: no se le asigna líder |
| Líder asignado | Dropdown | Condicional | Solo si no es líder. Muestra únicamente SRs líder activos del mismo partner |

> El teléfono no es editable una vez creado el SR — es su identificador en WhatsApp.

---

## Flujo de Creación

```
1. Usuario completa el formulario y presiona "Guardar"

2. Sistema valida campos requeridos

3. Crea registro en users (phone ⚠️, email si aplica, state = UserState.ACTIVE)

4. Crea registro en sales_representatives (partner_id, user_id, name, role, state = SalesRepresentativeRecordState.ACTIVE)

5. Crea registro en teams (member_id, leader_id o null si es líder)

6. Envía mensaje de bienvenida por WhatsApp al número registrado
   (mismo template que backoffice — ver HU-B05)

7. Toast: "Rep. de ventas creado exitosamente"
```

---

## Flujo de Edición

```
1. Usuario abre el perfil de un SR y presiona "Editar"

2. Formulario pre-llenado con datos actuales
   → Teléfono aparece como solo lectura (no editable)

3. Usuario modifica y guarda

4. Sistema actualiza sales_representatives y teams

5. Toast: "Rep. de ventas actualizado correctamente"
```

---

## Flujo de Activar / Desactivar

### Activar
```
1. Usuario presiona "Activar" en un SR inactivo
2. Modal: "¿Confirmas que quieres activar a [nombre SR]?"
3. Confirma → sales_representatives.state → SalesRepresentativeRecordState.ACTIVE ('active')
4. Toast: "Rep. de ventas activado"
```

### Desactivar
```
1. Usuario presiona "Desactivar" en un SR activo

2. Sistema verifica si tiene clientes o solicitudes asignadas

3a. Si NO tiene asignaciones:
    Modal simple: "¿Confirmas que quieres desactivar a [nombre SR]?"
    Confirma → sales_representatives.state → SalesRepresentativeRecordState.INACTIVE ('inactive')

3b. Si SÍ tiene asignaciones:
    Modal de herencia (ver sección siguiente)
```

---

## Modal de Herencia

Cuando el SR a desactivar tiene clientes u operaciones asignadas:

```
Título: "Antes de desactivar a [nombre SR]"

Resumen de lo que quedará huérfano:
  → X clientes activos asignados
  → Y solicitudes de cupo en proceso

Dropdown: "Transferir todo a:" 
  → SRs activos del mismo partner (excluye el que se desactiva)

Botón: "Transferir y desactivar"
Botón secundario: "Cancelar"
```

Al confirmar:
- `businesses.sales_rep_id` → SR destino
- `credit_applications.sales_rep_id` → SR destino
- `sales_representatives.state` → SalesRepresentativeRecordState.INACTIVE ('inactive')

> ⚠️ No se puede desactivar un SR con asignaciones sin completar la herencia.

---

## Perfil del SR (solo lectura)

Al hacer clic en un SR de la lista:

| Sección | Contenido |
|---|---|
| Cabecera | Nombre, ID, teléfono, email, rol, líder, estado |
| Tab Registros | Solicitudes de cupo registradas por este SR |
| Tab Clientes | Clientes activos asignados |
| Botón editar | Abre el formulario de edición |

> Los tabs de Solicitudes de préstamo, Préstamos y Reporte no se muestran en el portal del partner en esta versión — el partner no tiene visibilidad del detalle financiero por SR.

---

## Criterios de Aceptación

```gherkin
Scenario: Lista de SRs
  Given un partner con SRs en distintos estados
  When navega a /reps-ventas
  Then ve solo los SRs de su partner_id

Scenario: Crear SR exitoso
  Given el formulario completado con datos válidos
  When presiona Guardar
  Then el SR queda creado y activo
  And recibe el mensaje de bienvenida por WhatsApp

Scenario: Teléfono no editable
  Given un SR existente
  When el usuario abre el formulario de edición
  Then el campo teléfono aparece en solo lectura

Scenario: Desactivar sin asignaciones
  Given un SR sin clientes ni solicitudes
  When el usuario desactiva y confirma el modal simple
  Then el SR queda inactivo

Scenario: Desactivar con asignaciones — herencia completa
  Given un SR con clientes y solicitudes asignadas
  When el usuario inicia la desactivación
  Then se muestra el modal de herencia con el resumen
  When selecciona un SR destino y confirma
  Then todos los clientes y solicitudes se transfieren al SR destino
  And el SR queda inactivo

Scenario: Intentar desactivar sin seleccionar SR destino
  Given el modal de herencia abierto
  When el usuario intenta confirmar sin seleccionar SR destino
  Then no se puede confirmar — el botón está deshabilitado

Scenario: SR lider — sin líder asignado
  Given el toggle "¿Es líder?" activo
  Then el dropdown de líder no se muestra

Scenario: SR no líder — líder requerido
  Given el toggle "¿Es líder?" inactivo
  Then el dropdown de líder es obligatorio
  And solo muestra SRs líder activos del mismo partner
```

---

## Impacto en Schema

Sin cambios adicionales a los ya definidos en HU-B05:
- Tabla `teams` (nueva — definida en HU-B05)
- Campo `sales_rep_id` en `businesses` (definido en HU-B05)

---

## Consideraciones Técnicas

| Tema | Decisión |
|---|---|
| Endpoint compartido | Creación y edición de SRs usa el mismo endpoint que el backoffice — `partner_id` se infiere del token en el portal partner, se pasa explícitamente desde el backoffice |
| Scope | El partner solo ve y gestiona SRs de su `partner_id` |
| WhatsApp bienvenida | Mismo template y lógica que backoffice (HU-B05) |
| Tabs financieros | No se muestran en el portal partner — el partner no tiene acceso al detalle de préstamos por SR |

---

## Dependencias

| Historia | Relación |
|---|---|
| HU-P01 (Login) | Requiere sesión activa |
| HU-B05 (Gestión SRs Backoffice) | Misma lógica de negocio y endpoint — esta HU solo documenta la capa UI del portal |
| HU-SR01 (Login Portal SR) | El SR creado aquí accede al portal SR con su número de celular |
