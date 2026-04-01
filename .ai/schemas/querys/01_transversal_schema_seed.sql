-- =============================================================================
-- SEED: transversal_schema
-- Orden de ejecución: 1 de 3
-- Dependencias: ninguna (debe ejecutarse primero)
-- Tablas: statuses, roles, permissions, role_permissions,
--         currencies, cities, users, persons
-- =============================================================================

BEGIN;

-- ---------------------------------------------------------------------------
-- 1.1  statuses — catálogo maestro de estados
-- ---------------------------------------------------------------------------
INSERT INTO transversal_schema.statuses (entity_type, code, display_name, description)
VALUES
  -- Usuarios
  ('users',                'active',                    'Activo',               'Usuario activo en la plataforma'),
  ('users',                'inactive',                  'Inactivo',             'Usuario desactivado'),

  -- Contratos
  ('contracts',            'pending',                   'Pendiente',            'Contrato pendiente de firma'),
  ('contracts',            'signed',                    'Firmado',              'Contrato firmado por todas las partes'),
  ('contracts',            'cancelled',                 'Cancelado',            'Contrato cancelado'),

  -- Plantillas de contrato
  ('contract_templates',   'active',                    'Activo',               'Plantilla vigente'),
  ('contract_templates',   'inactive',                  'Inactivo',             'Plantilla fuera de vigencia'),

  -- Solicitudes de crédito
  ('credit_applications',  'in_study',                  'En estudio',           'Solicitud en proceso de análisis crediticio'),
  ('credit_applications',  'authorized',                'Autorizado',           'Solicitud aprobada'),
  ('credit_applications',  'rejected',                  'Rechazado',            'Solicitud rechazada'),
  ('credit_applications',  'cancelled',                 'Cancelado',            'Solicitud cancelada por el solicitante'),
  ('credit_applications',  'delinquent',                'En mora',              'Cartera en mora'),
  ('credit_applications',  'closed',                    'Cerrado',              'Línea cerrada'),

  -- Representantes de ventas (columna status_id no mapeada en TypeORM aún)
  ('sales_representatives', 'active',                   'Activo',               'Representante activo'),
  ('sales_representatives', 'inactive',                  'Inactivo',             'Representante inactivo'),
  ('sales_representatives', 'blocked',                   'Bloqueado',            'Representante bloqueado'),

  -- Documentos (uso futuro)
  ('documents',            'pending',                   'Pendiente',            'Documento pendiente de verificación'),
  ('documents',            'verified',                  'Verificado',           'Documento verificado'),
  ('documents',            'rejected',                  'Rechazado',            'Documento rechazado')

ON CONFLICT (entity_type, code) DO NOTHING;


-- ---------------------------------------------------------------------------
-- 1.2  roles RBAC
-- ---------------------------------------------------------------------------
INSERT INTO transversal_schema.roles (name, description)
VALUES
  ('admin',                   'Administrador de plataforma'),
  ('back_officer',            'Back officer — análisis y decisión crediticia'),
  ('partner_operations',      'Operaciones del partner — gestión de categorías y reps'),
  ('customer',                'Cliente BNPL — solicitante de crédito'),
  ('sales_representative',    'Representante de ventas del partner')
ON CONFLICT (name) DO NOTHING;


-- ---------------------------------------------------------------------------
-- 1.3  permissions (ejemplos mínimos RBAC)
-- ---------------------------------------------------------------------------
INSERT INTO transversal_schema.permissions (code, description)
VALUES
  ('credit_applications:read',    'Ver solicitudes de crédito'),
  ('credit_applications:write',   'Crear y editar solicitudes de crédito'),
  ('credit_applications:approve', 'Aprobar solicitudes de crédito'),
  ('partners:read',               'Ver partners'),
  ('partners:write',              'Crear y editar partners'),
  ('users:read',                  'Ver usuarios'),
  ('users:write',                 'Crear y editar usuarios'),
  ('reports:read',                'Ver reportes')
ON CONFLICT (code) DO NOTHING;


-- ---------------------------------------------------------------------------
-- 1.4  role_permissions — asignación de permisos a roles
-- ---------------------------------------------------------------------------
INSERT INTO transversal_schema.role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM transversal_schema.roles r
CROSS JOIN transversal_schema.permissions p
WHERE (r.name = 'admin')  -- admin tiene todos los permisos
ON CONFLICT (role_id, permission_id) DO NOTHING;

INSERT INTO transversal_schema.role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM transversal_schema.roles r
JOIN transversal_schema.permissions p ON p.code IN (
  'credit_applications:read',
  'credit_applications:write',
  'credit_applications:approve',
  'partners:read',
  'reports:read'
)
WHERE r.name = 'back_officer'
ON CONFLICT (role_id, permission_id) DO NOTHING;

INSERT INTO transversal_schema.role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM transversal_schema.roles r
JOIN transversal_schema.permissions p ON p.code IN (
  'credit_applications:read',
  'partners:read',
  'partners:write'
)
WHERE r.name = 'partner_operations'
ON CONFLICT (role_id, permission_id) DO NOTHING;


-- ---------------------------------------------------------------------------
-- 1.5  currencies
-- ---------------------------------------------------------------------------
INSERT INTO transversal_schema.currencies (
  code, name, symbol, decimal_places, thousand_separator, decimal_separator, is_active
)
VALUES
  ('COP', 'Peso colombiano', '$',  2, '.', ',', TRUE),
  ('USD', 'Dólar estadounidense', '$', 2, ',', '.', TRUE),
  ('MXN', 'Peso mexicano',   '$',  2, ',', '.', TRUE)
ON CONFLICT (code) DO NOTHING;


-- ---------------------------------------------------------------------------
-- 1.6  cities (ciudades de prueba — Colombia)
-- ---------------------------------------------------------------------------
INSERT INTO transversal_schema.cities (
  country_name, country_code, state_name, state_code, city_name, currency_id
)
SELECT 'Colombia', 'CO', 'Cundinamarca', 'DC', 'Bogotá',
       (SELECT id FROM transversal_schema.currencies WHERE code = 'COP' LIMIT 1)
ON CONFLICT (country_code, state_name, city_name) DO NOTHING;

INSERT INTO transversal_schema.cities (
  country_name, country_code, state_name, state_code, city_name, currency_id
)
SELECT 'Colombia', 'CO', 'Antioquia', 'ANT', 'Medellín',
       (SELECT id FROM transversal_schema.currencies WHERE code = 'COP' LIMIT 1)
ON CONFLICT (country_code, state_name, city_name) DO NOTHING;

INSERT INTO transversal_schema.cities (
  country_name, country_code, state_name, state_code, city_name, currency_id
)
SELECT 'Colombia', 'CO', 'Valle del Cauca', 'VAL', 'Cali',
       (SELECT id FROM transversal_schema.currencies WHERE code = 'COP' LIMIT 1)
ON CONFLICT (country_code, state_name, city_name) DO NOTHING;


-- ---------------------------------------------------------------------------
-- 1.7  users de prueba
-- ---------------------------------------------------------------------------
INSERT INTO transversal_schema.users (cognito_sub, email, role_id, state)
VALUES (
  gen_random_uuid(),
  'admin@platampay.test',
  (SELECT id FROM transversal_schema.roles WHERE name = 'admin' LIMIT 1),
  'active'
)
ON CONFLICT (email) DO NOTHING;

INSERT INTO transversal_schema.users (cognito_sub, email, role_id, state)
VALUES (
  gen_random_uuid(),
  'back.officer@platampay.test',
  (SELECT id FROM transversal_schema.roles WHERE name = 'back_officer' LIMIT 1),
  'active'
)
ON CONFLICT (email) DO NOTHING;

INSERT INTO transversal_schema.users (cognito_sub, email, role_id, state)
VALUES (
  gen_random_uuid(),
  'cliente.demo@platampay.test',
  (SELECT id FROM transversal_schema.roles WHERE name = 'customer' LIMIT 1),
  'active'
)
ON CONFLICT (email) DO NOTHING;

INSERT INTO transversal_schema.users (cognito_sub, email, role_id, state)
VALUES (
  gen_random_uuid(),
  'codeudor.demo@platampay.test',
  (SELECT id FROM transversal_schema.roles WHERE name = 'customer' LIMIT 1),
  'active'
)
ON CONFLICT (email) DO NOTHING;

INSERT INTO transversal_schema.users (cognito_sub, email, role_id, state)
VALUES (
  gen_random_uuid(),
  'vendedor.demo@platampay.test',
  (SELECT id FROM transversal_schema.roles WHERE name = 'sales_representative' LIMIT 1),
  'active'
)
ON CONFLICT (email) DO NOTHING;


-- ---------------------------------------------------------------------------
-- 1.8  persons (datos de prueba — NO usar en producción)
-- ---------------------------------------------------------------------------
INSERT INTO transversal_schema.persons (
  country_code, first_name, last_name,
  doc_type, doc_number, doc_issue_date, birth_date,
  gender, phone, residential_address, business_address, city_id
)
SELECT
  'CO', 'Juan', 'Pérez',
  'CC', '900000001', DATE '2012-01-10', DATE '1990-03-20',
  'M', '3000000001', 'Calle 1 # 10-10', 'Cra 15 # 90-30',
  (SELECT id FROM transversal_schema.cities WHERE country_code = 'CO' AND city_name = 'Bogotá' LIMIT 1)
ON CONFLICT (doc_number) DO NOTHING;

INSERT INTO transversal_schema.persons (
  country_code, first_name, last_name,
  doc_type, doc_number, doc_issue_date, birth_date,
  gender, phone, residential_address, city_id
)
SELECT
  'CO', 'María', 'Gómez',
  'CC', '900000002', DATE '2011-06-08', DATE '1989-07-11',
  'F', '3000000002', 'Calle 2 # 20-20',
  (SELECT id FROM transversal_schema.cities WHERE country_code = 'CO' AND city_name = 'Bogotá' LIMIT 1)
ON CONFLICT (doc_number) DO NOTHING;

COMMIT;

-- ---------------------------------------------------------------------------
-- Verificación post-seed
-- ---------------------------------------------------------------------------
SELECT 'statuses'  AS tabla, COUNT(*) AS filas FROM transversal_schema.statuses
UNION ALL
SELECT 'roles',      COUNT(*) FROM transversal_schema.roles
UNION ALL
SELECT 'permissions', COUNT(*) FROM transversal_schema.permissions
UNION ALL
SELECT 'currencies', COUNT(*) FROM transversal_schema.currencies
UNION ALL
SELECT 'cities',     COUNT(*) FROM transversal_schema.cities
UNION ALL
SELECT 'users',      COUNT(*) FROM transversal_schema.users
UNION ALL
SELECT 'persons',    COUNT(*) FROM transversal_schema.persons
ORDER BY tabla;
