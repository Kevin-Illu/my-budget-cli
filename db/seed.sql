-- ==========================================================
-- SEED DATA: 20+ REGISTROS PARA APP DE PRESUPUESTO
-- ==========================================================

-- Limpieza previa
PRAGMA foreign_keys = OFF;
DELETE FROM expense_source;
DELETE FROM expense;
DELETE FROM funding_source;
PRAGMA foreign_keys = ON;

-- 1. FUENTES DE FINANCIAMIENTO
INSERT INTO funding_source (id, name, initial_amount_cents) VALUES (1, 'Cuenta Principal (Banco)', 250000);
INSERT INTO funding_source (id, name, initial_amount_cents) VALUES (2, 'Efectivo (Billetera)', 30000);
INSERT INTO funding_source (id, name, initial_amount_cents) VALUES (3, 'Tarjeta de Crédito Oro', 500000);
INSERT INTO funding_source (id, name, initial_amount_cents) VALUES (4, 'Ahorros Emergencia', 100000);

-- 2. GASTOS
INSERT INTO expense (id, name, amount_cents) VALUES (1, 'Suscripción Netflix', 1599);
INSERT INTO expense (id, name, amount_cents) VALUES (2, 'Almuerzo Ejecutivo', 1250);
INSERT INTO expense (id, name, amount_cents) VALUES (3, 'Gasolina Semana 1', 4500);
INSERT INTO expense (id, name, amount_cents) VALUES (4, 'Supermercado Mensual', 18520);
INSERT INTO expense (id, name, amount_cents) VALUES (5, 'Café con Amigos', 650);
INSERT INTO expense (id, name, amount_cents) VALUES (6, 'Gimnasio Mensualidad', 4000);
INSERT INTO expense (id, name, amount_cents) VALUES (7, 'Factura de Internet', 5500);
INSERT INTO expense (id, name, amount_cents) VALUES (8, 'Cena Cumpleaños', 9200);
INSERT INTO expense (id, name, amount_cents) VALUES (9, 'Spotify Familiar', 999);
INSERT INTO expense (id, name, amount_cents) VALUES (10, 'Uber al Trabajo', 850);
INSERT INTO expense (id, name, amount_cents) VALUES (11, 'Compra Amazon (Teclado)', 6500);
INSERT INTO expense (id, name, amount_cents) VALUES (12, 'Factura de Electricidad', 7840);
INSERT INTO expense (id, name, amount_cents) VALUES (13, 'Seguro de Auto', 12000);
INSERT INTO expense (id, name, amount_cents) VALUES (14, 'Cine + Palomitas', 2200);
INSERT INTO expense (id, name, amount_cents) VALUES (15, 'Mantenimiento Bicicleta', 3500);
INSERT INTO expense (id, name, amount_cents) VALUES (16, 'Curso de Next.js', 1999);
INSERT INTO expense (id, name, amount_cents) VALUES (17, 'Frutas y Verduras', 1530);
INSERT INTO expense (id, name, amount_cents) VALUES (18, 'Cervezas Artesanales', 1800);
INSERT INTO expense (id, name, amount_cents) VALUES (19, 'Farmacia (Vitaminas)', 2500);
INSERT INTO expense (id, name, amount_cents) VALUES (20, 'Donación Caridad', 1000);

-- 3. RELACIONES (Gasto -> Fuente)
INSERT INTO expense_source (expense_id, funding_source_id) VALUES (1, 3);
INSERT INTO expense_source (expense_id, funding_source_id) VALUES (2, 2);
INSERT INTO expense_source (expense_id, funding_source_id) VALUES (3, 1);
INSERT INTO expense_source (expense_id, funding_source_id) VALUES (4, 1);
INSERT INTO expense_source (expense_id, funding_source_id) VALUES (5, 2);
INSERT INTO expense_source (expense_id, funding_source_id) VALUES (6, 3);
INSERT INTO expense_source (expense_id, funding_source_id) VALUES (7, 1);
INSERT INTO expense_source (expense_id, funding_source_id) VALUES (8, 3);
INSERT INTO expense_source (expense_id, funding_source_id) VALUES (9, 3);
INSERT INTO expense_source (expense_id, funding_source_id) VALUES (10, 1);
INSERT INTO expense_source (expense_id, funding_source_id) VALUES (11, 3);
INSERT INTO expense_source (expense_id, funding_source_id) VALUES (12, 1);
INSERT INTO expense_source (expense_id, funding_source_id) VALUES (13, 1);
INSERT INTO expense_source (expense_id, funding_source_id) VALUES (14, 2);
INSERT INTO expense_source (expense_id, funding_source_id) VALUES (15, 2);
INSERT INTO expense_source (expense_id, funding_source_id) VALUES (16, 1);
INSERT INTO expense_source (expense_id, funding_source_id) VALUES (17, 2);
INSERT INTO expense_source (expense_id, funding_source_id) VALUES (18, 2);
INSERT INTO expense_source (expense_id, funding_source_id) VALUES (19, 1);
INSERT INTO expense_source (expense_id, funding_source_id) VALUES (20, 1);
INSERT INTO expense_source (expense_id, funding_source_id) VALUES (4, 2);
