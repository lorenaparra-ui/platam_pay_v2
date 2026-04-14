# Schema Pendiente — Cambios para Lorena

> Este documento registra los cambios de schema identificados al cruzar las historias de usuario
> con las entidades en `libs/`. Todos los ítems aquí son responsabilidad de Lorena para implementar.
> Una vez resuelto cada ítem, marcarlo como `[x]` e indicar el número de migración.

---

## 1. `credit_applications` — columna `partner_category_ids` (jsonb)

**Entidad:** `libs/products-data/src/entities/credit-application.entity.ts`

**Estado actual:** Columna `partner_category_id bigint FK → categories.id` (una sola categoría).

**Cambio requerido:** Reemplazar por `partner_category_ids jsonb` para soportar múltiples categorías por solicitud.

**Razón:** Los clientes pueden tener más de una categoría asignada a su solicitud. En self-service se asigna el default `[partners.default_category_id]`. Los SR pueden seleccionar múltiples categorías en HU-02 y HU-04.

**Formato esperado:** Array de IDs internos de categorías: `[1, 3, 7]`

**Historias afectadas:** HU-01, HU-02, HU-03, HU-04

- [ ] Migración ejecutada: ___

---

## 2. `partners` — campos `default_rep_id` y `default_category_id`

**Entidad:** `libs/suppliers-data/src/entities/partners.entity.ts`

**Estado actual:** Estos campos no existen en `PartnersEntity`.

**Cambio requerido:**

```typescript
@ManyToOne(() => SalesRepresentativeEntity, { nullable: true, onDelete: 'SET NULL' })
@JoinColumn({ name: 'default_rep_id', referencedColumnName: 'id' })
defaultRep: SalesRepresentativeEntity | null;

@ManyToOne(() => CategoryEntity, { nullable: true, onDelete: 'SET NULL' })
@JoinColumn({ name: 'default_category_id', referencedColumnName: 'id' })
defaultCategory: CategoryEntity | null;
```

**Razón:** Son necesarios para:
- Self-service PN/PJ (HU-01, HU-03): asignar automáticamente el SR y la categoría default cuando el cliente no los selecciona.
- Backend: poblar `partner_category_ids` con `[default_category_id]` en el momento de crear la solicitud.

**Historias afectadas:** HU-01, HU-02, HU-03, HU-04

- [ ] Migración ejecutada: ___

---

## 3. `ai_agent_analysis` — campos faltantes

**Entidad:** `libs/products-data/src/entities/ai-agent-analysis.entity.ts`

**Estado actual:** Faltan dos campos que vienen en el payload de respuesta de n8n.

**Cambio requerido:**

```typescript
@Column({ name: 'html_url_agent_analysis', type: 'text', nullable: true })
htmlUrlAgentAnalysis: string | null;

@Column({
  name: 'agent_recommended_loc',
  type: 'decimal',
  precision: 18,
  scale: 4,
  nullable: true,
})
agentRecommendedLoc: string | null;
```

**Razón:** El agente AI de n8n retorna estos dos valores en su respuesta. `html_url_agent_analysis` es la URL del análisis detallado en HTML guardado en S3. `agent_recommended_loc` es el monto de línea de crédito recomendado por el agente, usado para pre-llenar la decisión del analista.

**Historias afectadas:** HU-06, HU-07

- [ ] Migración ejecutada: ___

---

## 4. Enum `AiAgentAnalysisRecommendation` — agregar `INTERVIEW`

**Archivo:** `libs/shared/src/domain/types.enum.ts`

**Estado actual:**
```typescript
export enum AiAgentAnalysisRecommendation {
  HITL = 'hitl',
  AUTO_APPROVE = 'auto_approve',
  AUTO_REJECT = 'auto_reject',
}
```

**Cambio requerido:** Agregar `INTERVIEW = 'interview'`.

**Razón:** El agente n8n puede retornar `interview` cuando necesita validar datos adicionales con el cliente antes de emitir una recomendación final. Este caso se maneja en HU-06 como paso previo al resultado HITL/auto_approve/auto_reject.

**Historias afectadas:** HU-06

- [ ] Valor agregado al enum
- [ ] Enum de BD actualizado (migración): ___

---

## 5. Enum `CreditApplicationStatus` — agregar `APPROVED_PENDING_SIGNATURE`

**Archivo:** `libs/shared/src/domain/statuses.enum.ts`

**Estado actual:** No existe un estado para "aprobado, en proceso de firma de contrato".

**Cambio requerido:** Agregar:
```typescript
APPROVED_PENDING_SIGNATURE = 'approved_pending_signature',
```

**Razón:** Cuando el agente AI retorna `auto_approve` o el analista aprueba la solicitud desde el backoffice, la solicitud entra en el flujo de firma de contrato vía ZapSign. Este estado representa ese momento intermedio entre la decisión de aprobación y la firma efectiva del contrato.

**Historias afectadas:** HU-06, HU-07, HU-B08-PN, HU-B08-PJ (flujo de decisión del backoffice)

- [ ] Valor agregado al enum
- [ ] Enum de BD actualizado (migración): ___

---

## 6. `SarlaftCheckEntity` — cambiar enum del campo `status`

**Entidad:** `libs/products-data/src/entities/sarlaft-check.entity.ts`

**Estado actual:** El campo `status` usa `SarlaftCheckStatus` (valores: `pending`, `completed`, `error`) — esto es el lifecycle de la query, no el resultado de negocio.

**Cambio requerido:** Cambiar a `SarlaftCheckStatuses` (ya existe en `libs/shared/src/domain/types.enum.ts`, valores: `clean`, `alert`, `blocked`).

```typescript
// Antes:
import { SarlaftCheckStatus } from '@platam/shared';
@Column({ name: 'status', type: 'enum', enum: SarlaftCheckStatus, enumName: 'sarlaft_check_status', ... })
status: SarlaftCheckStatus;

// Después:
import { SarlaftCheckStatuses } from '@platam/shared';
@Column({ name: 'status', type: 'enum', enum: SarlaftCheckStatuses, enumName: 'sarlaft_check_status', ... })
status: SarlaftCheckStatuses;
```

**Razón:** Las historias (HU-06, HU-07) necesitan guardar el resultado del check como `clean`, `alert` o `blocked`. El enum `SarlaftCheckStatuses` con estos valores ya existe en shared pero por error no está siendo usado en la entidad.

**Notas adicionales:**
- El enum `SarlaftCheckStatus` (PENDING/COMPLETED/ERROR) puede eliminarse si no se usa en otro lugar.
- El campo `has_match: boolean` se conserva — es útil para queries rápidas (`WHERE has_match = true`).
- `clean` → `has_match = false`
- `alert` o `blocked` → `has_match = true`

**Historias afectadas:** HU-06, HU-07

- [ ] Entidad actualizada
- [ ] Enum de BD actualizado (migración): ___

---

## 7. `partners` — campo `company_name` para notificaciones

**Entidad:** `libs/suppliers-data/src/entities/partners.entity.ts`

**Estado actual:** `PartnersEntity` no tiene un campo `company_name` directo. El nombre comercial del partner está en `partner.business.businessName` (via relación con `BusinessEntity`).

**Contexto:** HU-05 usa `partners.company_name` en las plantillas de WhatsApp y correo electrónico de autorización (variables `{{partner_name}}`).

**Opciones a decidir:**
1. Agregar columna `company_name varchar(255)` directamente en `partners` (más simple para notificaciones).
2. Confirmar que el backend use `partner.business.businessName` en el código de notificaciones.

**Acción requerida:** Coordinar con Freddy/equipo la opción elegida y documentar el campo fuente para las notificaciones.

**Historias afectadas:** HU-05

- [ ] Decisión tomada: ___
- [ ] Implementado: ___

---

## 8. Enum `CreditApplicationStatus` — agregar `APPROVED_SIGNED`

**Archivo:** `libs/shared/src/domain/statuses.enum.ts`

**Estado actual:** No existe un estado para "aprobado, contrato firmado, línea activa".

**Cambio requerido:** Agregar:
```typescript
APPROVED_SIGNED = 'approved_signed',
```

**Razón:** Una vez que todos los firmantes han completado la firma en ZapSign, la solicitud pasa a este estado y la línea de crédito se activa. Este estado es el destino final del flujo de aprobación, distinto de `approved_pending_signature` (en proceso de firma).

**Historias afectadas:** HU-B08-PN, HU-B08-PJ

- [ ] Valor agregado al enum
- [ ] Enum de BD actualizado (migración): ___

---

## 9. `contract_signers` — entidad y tabla faltante

**Archivo esperado:** `libs/products-data/src/entities/contract-signer.entity.ts` (no existe aún)

**Estado actual:** La entidad `ContractEntity` existe pero no existe ninguna entidad `ContractSignerEntity`. Las historias HU-B08-PN y HU-B08-PJ la referencian extensamente.

**Cambio requerido:** Crear entidad y tabla:

```typescript
@Entity('contract_signers')
export class ContractSignerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'contract_id' })
  contractId: number;

  @ManyToOne(() => ContractEntity)
  @JoinColumn({ name: 'contract_id' })
  contract: ContractEntity;

  @Column({ name: 'person_id' })
  personId: number;

  @ManyToOne(() => PersonEntity)
  @JoinColumn({ name: 'person_id' })
  person: PersonEntity;

  @Column({ name: 'zapsign_signer_token', type: 'varchar', nullable: true })
  zapsignSignerToken: string | null;

  @Column({ name: 'sign_url', type: 'text', nullable: true })
  signUrl: string | null;

  @Column({ name: 'state', type: 'enum', enum: ContractSignerState })
  state: ContractSignerState;

  @Column({ name: 'signed_at', type: 'timestamptz', nullable: true })
  signedAt: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
```

Nuevo enum en `statuses.enum.ts`:
```typescript
export enum ContractSignerState {
  PENDING = 'pending',
  SIGNED = 'signed',
  CANCELLED = 'cancelled',
}
```

**Razón:** Las historias del backoffice (HU-B07, HU-B08) necesitan almacenar un firmante por participante del contrato (rep. legal, codeudores en PJ). La URL de firma y el estado de firma son por firmante, no por contrato.

**Historias afectadas:** HU-B07-PN, HU-B07-PJ, HU-B08-PN, HU-B08-PJ

- [ ] Entidad creada
- [ ] Migración ejecutada: ___

---

## 10. `documents` — campo `uploaded_by`

**Entidad:** `libs/products-data/src/entities/document.entity.ts`

**Estado actual:** No existe campo `uploaded_by` en `DocumentEntity`.

**Cambio requerido:**
```typescript
@Column({ name: 'uploaded_by', type: 'bigint', nullable: true })
uploadedBy: number | null;

@ManyToOne(() => UserEntity, { nullable: true })
@JoinColumn({ name: 'uploaded_by', referencedColumnName: 'id' })
uploadedByUser: UserEntity | null;
```

**Razón:** El tab Docs en HU-B07-PN/PJ necesita mostrar quién subió cada documento (analista o sistema). Sin este campo no es posible distinguir documentos subidos por el analista vs. documentos migrados automáticamente por el pipeline.

**Historias afectadas:** HU-B07-PN, HU-B07-PJ

- [ ] Campo agregado
- [ ] Migración ejecutada: ___

---

## 11. `sarlaft_checks` — campos de revisión manual

**Entidad:** `libs/products-data/src/entities/sarlaft-check.entity.ts`

**Estado actual:** No existen campos `reviewed_by`, `reviewed_at`, `analyst_notes` en `SarlaftCheckEntity`.

**Cambio requerido:**
```typescript
@Column({ name: 'reviewed_by', type: 'bigint', nullable: true })
reviewedBy: number | null;

@ManyToOne(() => UserEntity, { nullable: true })
@JoinColumn({ name: 'reviewed_by', referencedColumnName: 'id' })
reviewedByUser: UserEntity | null;

@Column({ name: 'reviewed_at', type: 'timestamptz', nullable: true })
reviewedAt: Date | null;

@Column({ name: 'analyst_notes', type: 'text', nullable: true })
analystNotes: string | null;
```

**Razón:** Cuando hay una coincidencia SARLAFT (`has_match = true`), el analista debe revisar manualmente si es un homónimo o una coincidencia real. La resolución requiere registrar quién revisó, cuándo y con qué conclusión. Estos campos permiten auditar las revisiones y desbloquear el pipeline.

**Historias afectadas:** HU-B07-PN, HU-B07-PJ

- [ ] Campos agregados
- [ ] Migración ejecutada: ___

---

## 12. `application_edit_logs` — tabla de auditoría de ediciones

**Estado actual:** No existe esta tabla ni entidad en `libs/`.

**Cambio requerido:** Crear entidad y tabla:

```typescript
@Entity('application_edit_logs')
export class ApplicationEditLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'external_id', type: 'uuid', generated: 'uuid' })
  externalId: string;

  @Column({ name: 'application_id' })
  applicationId: number;

  @ManyToOne(() => CreditApplicationEntity)
  @JoinColumn({ name: 'application_id' })
  application: CreditApplicationEntity;

  @Column({ name: 'edited_by' })
  editedBy: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'edited_by' })
  editor: UserEntity;

  @CreateDateColumn({ name: 'edited_at' })
  editedAt: Date;

  @Column({ name: 'changes', type: 'jsonb' })
  changes: object; // Array de {field, table, old_value, new_value}
}
```

**Razón:** El modal de edición en HU-B07-PN/PJ requiere registrar cada cambio que el analista hace a los datos de la solicitud, para auditoría y trazabilidad. El log no es visible en la UI actual pero se almacena para acceso futuro del equipo de Admin.

**Historias afectadas:** HU-B07-PN, HU-B07-PJ

- [ ] Entidad creada
- [ ] Migración ejecutada: ___

---

## 13. `users` — campo `phone`

**Entidad:** `libs/transversal-data/src/entities/user.entity.ts`

**Estado actual:** `UserEntity` tiene `email` pero NO tiene `phone`. El teléfono actualmente vive solo en `PersonEntity.phone`.

**Cambio requerido:**
```typescript
@Column({ name: 'phone', type: 'varchar', length: 20, nullable: true })
phone: string | null;
```

**Razón:** Los flujos de login OTP (HU-SR01 portal SR, HU-CL01 portal clientes) necesitan buscar un usuario por número de celular. Los SRs pueden no tener un `PersonEntity` asociado. Almacenar el teléfono directamente en `users` permite el lookup eficiente por índice sin JOIN a `persons`. También es referenciado en HU-B05 (creación de SR), HU-P06 (portal partner) y HU-CL07 (edición de perfil).

**Historias afectadas:** HU-SR01, HU-CL01, HU-CL07, HU-B05, HU-P06

- [ ] Campo agregado
- [ ] Migración ejecutada: ___

---

## 14. `users` — campo `full_name`

**Entidad:** `libs/transversal-data/src/entities/user.entity.ts`

**Estado actual:** `UserEntity` no tiene campo `full_name`. Para clientes (PN/PJ) el nombre completo se construye desde `persons.first_name + last_name` o `businesses.legal_name`. Para usuarios del portal partner, no hay nombre directamente en `users`.

**Cambio requerido:**
```typescript
@Column({ name: 'full_name', type: 'varchar', length: 255, nullable: true })
fullName: string | null;
```

**Razón:** El portal partner (HU-P03, HU-P04), el backoffice (HU-B09) y el perfil del portal partner (HU-P07) referencian `users.full_name` como el nombre del usuario operativo del partner. Para estos usuarios no hay `PersonEntity` asociado, por lo que el nombre debe almacenarse directamente en `users`.

**Nota:** Para clientes PN/PJ, el nombre se sigue obteniendo de `persons`. El campo `full_name` aplica principalmente para usuarios con rol `partner_admin`, `partner_ops` y similares.

**Historias afectadas:** HU-B09, HU-P03, HU-P04, HU-P07

- [ ] Campo agregado
- [ ] Migración ejecutada: ___

---

## 15. `partners` — campo `country_code`

**Entidad:** `libs/suppliers-data/src/entities/partners.entity.ts`

**Estado actual:** `PartnersEntity` no tiene campo `country_code`.

**Cambio requerido:**
```typescript
@Column({ name: 'country_code', type: 'varchar', length: 10, nullable: true })
countryCode: string | null;
```

**Razón:** El formulario de creación de partners en HU-B03 (Tab General) incluye un campo "País" que se almacena en `partners.country_code`. Es necesario para operaciones multi-país en el futuro.

**Historias afectadas:** HU-B03

- [ ] Campo agregado
- [ ] Migración ejecutada: ___
