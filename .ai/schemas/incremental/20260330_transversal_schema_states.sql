-- Expand: catálogo de departamentos/estados (transversal_schema).
-- Aplicar con el proceso de migraciones del equipo; no ejecutar en producción sin revisión DBA.

CREATE TABLE IF NOT EXISTS transversal_schema.states (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  external_id UUID NOT NULL DEFAULT gen_random_uuid(),
  country_code varchar(2) NOT NULL,
  state_name varchar(120) NOT NULL,
  state_code varchar(3),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT chk_states_country_code CHECK (country_code ~ '^[A-Z]{2}$'),
  CONSTRAINT chk_states_state_code CHECK (state_code IS NULL OR state_code ~ '^[A-Z0-9]{2,3}$'),
  CONSTRAINT uq_states_country_state UNIQUE (country_code, state_name)
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_states_external_id
  ON transversal_schema.states (external_id);
