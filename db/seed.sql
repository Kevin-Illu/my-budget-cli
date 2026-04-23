-- ==========================================================
-- SEED DATA: 20+ REGISTROS PARA APP DE PRESUPUESTO
-- ==========================================================

-- Limpieza previa
PRAGMA foreign_keys = OFF;
DELETE FROM expense_source;
DELETE FROM expense;
DELETE FROM source_funding;
PRAGMA foreign_keys = ON;

-- 1. FUENTES DE FINANCIAMIENTO
INSERT INTO source_funding (id, name, initial_amount_cents) VALUES (1, 'Cuenta Principal (Banco)', 2500.00);
INSERT INTO source_funding (id, name, initial_amount_cents) VALUES (2, 'Efectivo (Billetera)', 300.00);
INSERT INTO source_funding (id, name, initial_amount_cents) VALUES (3, 'Tarjeta de Crédito Oro', 5000.00);
INSERT INTO source_funding (id, name, initial_amount_cents) VALUES (4, 'Ahorros Emergencia', 1000.00);

-- 2. GASTOS
INSERT INTO expense (id, name, amount_cents) VALUES (1, 'Suscripción Netflix', 15.99);
INSERT INTO expense (id, name, amount_cents) VALUES (2, 'Almuerzo Ejecutivo', 12.50);
INSERT INTO expense (id, name, amount_cents) VALUES (3, 'Gasolina Semana 1', 45.00);
INSERT INTO expense (id, name, amount_cents) VALUES (4, 'Supermercado Mensual', 185.20);
INSERT INTO expense (id, name, amount_cents) VALUES (5, 'Café con Amigos', 6.50);
INSERT INTO expense (id, name, amount_cents) VALUES (6, 'Gimnasio Mensualidad', 40.00);
INSERT INTO expense (id, name, amount_cents) VALUES (7, 'Factura de Internet', 55.00);
INSERT INTO expense (id, name, amount_cents) VALUES (8, 'Cena Cumpleaños', 92.00);
INSERT INTO expense (id, name, amount_cents) VALUES (9, 'Spotify Familiar', 9.99);
INSERT INTO expense (id, name, amount_cents) VALUES (10, 'Uber al Trabajo', 8.50);
INSERT INTO expense (id, name, amount_cents) VALUES (11, 'Compra Amazon (Teclado)', 65.00);
INSERT INTO expense (id, name, amount_cents) VALUES (12, 'Factura de Electricidad', 78.40);
INSERT INTO expense (id, name, amount_cents) VALUES (13, 'Seguro de Auto', 120.00);
INSERT INTO expense (id, name, amount_cents) VALUES (14, 'Cine + Palomitas', 22.00);
INSERT INTO expense (id, name, amount_cents) VALUES (15, 'Mantenimiento Bicicleta', 35.00);
INSERT INTO expense (id, name, amount_cents) VALUES (16, 'Curso de Next.js', 19.99);
INSERT INTO expense (id, name, amount_cents) VALUES (17, 'Frutas y Verduras', 15.30);
INSERT INTO expense (id, name, amount_cents) VALUES (18, 'Cervezas Artesanales', 18.00);
INSERT INTO expense (id, name, amount_cents) VALUES (19, 'Farmacia (Vitaminas)', 25.00);
INSERT INTO expense (id, name, amount_cents) VALUES (20, 'Donación Caridad', 10.00);

-- 3. RELACIONES (Gasto -> Fuente)
INSERT INTO expense_source (expense_id, source_funding_id) VALUES (1, 3);
INSERT INTO expense_source (expense_id, source_funding_id) VALUES (2, 2);
INSERT INTO expense_source (expense_id, source_funding_id) VALUES (3, 1);
INSERT INTO expense_source (expense_id, source_funding_id) VALUES (4, 1);
INSERT INTO expense_source (expense_id, source_funding_id) VALUES (5, 2);
INSERT INTO expense_source (expense_id, source_funding_id) VALUES (6, 3);
INSERT INTO expense_source (expense_id, source_funding_id) VALUES (7, 1);
INSERT INTO expense_source (expense_id, source_funding_id) VALUES (8, 3);
INSERT INTO expense_source (expense_id, source_funding_id) VALUES (9, 3);
INSERT INTO expense_source (expense_id, source_funding_id) VALUES (10, 1);
INSERT INTO expense_source (expense_id, source_funding_id) VALUES (11, 3);
INSERT INTO expense_source (expense_id, source_funding_id) VALUES (12, 1);
INSERT INTO expense_source (expense_id, source_funding_id) VALUES (13, 1);
INSERT INTO expense_source (expense_id, source_funding_id) VALUES (14, 2);
INSERT INTO expense_source (expense_id, source_funding_id) VALUES (15, 2);
INSERT INTO expense_source (expense_id, source_funding_id) VALUES (16, 1);
INSERT INTO expense_source (expense_id, source_funding_id) VALUES (17, 2);
INSERT INTO expense_source (expense_id, source_funding_id) VALUES (18, 2);
INSERT INTO expense_source (expense_id, source_funding_id) VALUES (19, 1);
INSERT INTO expense_source (expense_id, source_funding_id) VALUES (20, 1);
INSERT INTO expense_source (expense_id, source_funding_id) VALUES (4, 2);
