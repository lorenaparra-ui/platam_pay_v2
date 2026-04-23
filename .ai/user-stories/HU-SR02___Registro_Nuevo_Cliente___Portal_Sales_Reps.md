# HU-SR02 — Registro de Nuevo Cliente · Portal Sales Reps

**Épica:** epic-04-portal-sales-reps  
**Actor:** Sales Representative (SR) autenticado  
**Última actualización:** Marzo 2026  
**Estado:** En revisión

---

## Historia de Usuario

**Como** Sales Rep autenticado en el portal,  
**quiero** iniciar el registro de un nuevo cliente eligiendo si es 
Persona Natural o Persona Jurídica,  
**para** ser dirigido al formulario correspondiente y radicar su 
solicitud de crédito.

---

## Flujo

```
1. SR hace clic en "Registrar nuevo cliente"
   (desde dashboard o desde lista de clientes)

2. Modal/pantalla de selección
   → Opción A: Persona Natural
   → Opción B: Persona Jurídica

3. SR selecciona tipo
   → Persona Natural → flujo HU-02
   → Persona Jurídica → flujo HU-04

4. Al completar el formulario, el SR regresa al portal
   (no a una landing externa)
```

---

## Criterios de Aceptación

```gherkin
Scenario: Selección PN
  Given un SR autenticado
  When selecciona "Persona Natural"
  Then accede al formulario de HU-02 dentro del portal

Scenario: Selección PJ
  Given un SR autenticado
  When selecciona "Persona Jurídica"
  Then accede al formulario de HU-04 dentro del portal

Scenario: partner_id y sales_rep_id
  Given cualquier selección
  Then ambos valores se resuelven automáticamente desde la sesión
  And no son campos visibles para el SR
```

---

## Dependencias

| Historia | Relación |
|---|---|
| HU-SR01 | SR debe estar autenticado |
| HU-02 | Formulario PN por SR |
| HU-04 | Formulario PJ por SR |
