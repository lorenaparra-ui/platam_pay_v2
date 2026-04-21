# Diagrama de Estados — Job de Solicitud de Crédito (`credit_application_jobs`)

## Estados del job

```mermaid
stateDiagram-v2
    [*] --> ENQUEUED : POST /natural-person/async\nJob creado en BD

    state "RUNNING" as RUNNING {
        [*] --> ENQUEUED_STEP

        ENQUEUED_STEP --> AWAITING_PERSON_CREATION : Persona no existe\nPublica create_person_command\na transversal-ms vía SQS

        ENQUEUED_STEP --> AWAITING_BUSINESS_CREATION : Persona ya existe\nPublica business_requested\na suppliers-ms vía SQS

        AWAITING_PERSON_CREATION --> AWAITING_BUSINESS_CREATION : Worker detecta resultado\nen partner_create_user_sqs_idempotency\nPublica business_requested

        AWAITING_BUSINESS_CREATION --> AWAITING_BUSINESS_CREATION : suppliers-ms aún\nno respondió
    }

    ENQUEUED --> RUNNING : Inicia procesamiento

    RUNNING --> COMPLETED : suppliers-ms crea negocio\nproducts-ms crea credit_application\nstep = COMPLETED

    RUNNING --> FAILED : Error irrecuperable\n(ej: sales_rep no resuelto)

    COMPLETED --> [*]
    FAILED --> [*]
```

## Detalle de transiciones por step

```mermaid
stateDiagram-v2
    direction LR

    [*] --> ENQUEUED

    ENQUEUED --> AWAITING_PERSON_CREATION : Persona inexistente\nmsg → transversal-ms\nvia TRANSVERSAL_SQS_CREATE_PERSON

    ENQUEUED --> AWAITING_BUSINESS_CREATION : Persona ya existe\nmsg → suppliers-ms\nvia SUPPLIERS_SQS_INBOUND

    AWAITING_PERSON_CREATION --> AWAITING_BUSINESS_CREATION : Worker (polling 5s)\nlee idempotency table\nencuentra person_external_id\npublica business_requested

    AWAITING_BUSINESS_CREATION --> COMPLETED : suppliers-ms\npublica business_created\nproducts-ms crea\ncredit_application

    AWAITING_PERSON_CREATION --> FAILED : Error irrecuperable

    AWAITING_BUSINESS_CREATION --> FAILED : Error irrecuperable\n(sales_rep no resuelto)

    COMPLETED --> [*]
    FAILED --> [*]
```

## Eventos que disparan transiciones

```mermaid
stateDiagram-v2
    state "ENQUEUED" as S1
    state "AWAITING_PERSON_CREATION" as S2
    state "AWAITING_BUSINESS_CREATION" as S3
    state "COMPLETED" as S4
    state "FAILED" as S5

    [*] --> S1 : HTTP POST recibido\nEnqueueNaturalPersonCreditApplicationUseCase

    S1 --> S2 : [persona no existe en DB]\n→ SQS: create_person_command\nActor: EnqueueUseCase

    S1 --> S3 : [persona ya existe]\n→ SQS: business_requested\nActor: EnqueueUseCase

    S2 --> S3 : [idempotency table tiene resultado]\n→ SQS: business_requested\nActor: CreditApplicationJobWorkerService

    S3 --> S4 : [suppliers-ms respondió]\nSQS: business_created\nActor: ProcessProductsInboundMessageUseCase\nEfecto: INSERT credit_applications

    S3 --> S5 : [sales_rep_internal_id null]\nActor: ProcessProductsInboundMessageUseCase

    S2 --> S5 : [error no manejado]\nActor: EnqueueUseCase o Worker
```

## Estados del `status` vs `step` en la tabla

| `status`    | `step`                        | Descripción                                                   |
|-------------|-------------------------------|---------------------------------------------------------------|
| `RUNNING`   | `ENQUEUED`                    | Job creado, aún no procesado (transitorio, milisegundos)     |
| `RUNNING`   | `AWAITING_PERSON_CREATION`    | Esperando que transversal-ms cree la persona vía SQS          |
| `RUNNING`   | `AWAITING_BUSINESS_CREATION`  | Esperando que suppliers-ms cree el negocio vía SQS            |
| `COMPLETED` | `COMPLETED`                   | `credit_application` creada exitosamente                      |
| `FAILED`    | `FAILED`                      | Error irrecuperable; ver campo `error_message`                |
