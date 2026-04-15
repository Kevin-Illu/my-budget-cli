-- ==========================================================
-- SEED DATA: 20+ REGISTROS PARA APP DE PRESUPUESTO
-- ==========================================================

-- Limpieza previa con desactivación de constraints
PRAGMA foreign_keys = OFF;
DELETE FROM expense_source;
DELETE FROM expense;
DELETE FROM source_funding;
PRAGMA foreign_keys = ON;

-- 1. FUENTES DE FINANCIAMIENTO (4 Fuentes)
INSERT INTO source_funding (id, name, initial_amount) VALUES 
(1, 'Cuenta Principal (Banco)', 2500.00),
(2, 'Efectivo (Billetera)', 300.00),
(3, 'Tarjeta de Crédito Oro', 5000.00),
(4, 'Ahorros Emergencia', 1000.00);

-- 2. GASTOS (20 Gastos)
INSERT INTO expense (id, name, amount) VALUES 
(1, 'Suscripción Netflix', 15.99),
(2, 'Almuerzo Ejecutivo', 12.50),
(3, 'Gasolina Semana 1', 45.00),
(4, 'Supermercado Mensual', 185.20),
(5, 'Café con Amigos', 6.50),
(6, 'Gimnasio Mensualidad', 40.00),
(7, 'Factura de Internet', 55.00),
(8, 'Cena Cumpleaños', 92.00),
(9, 'Spotify Familiar', 9.99),
(10, 'Uber al Trabajo', 8.50),
(11, 'Compra Amazon (Teclado)', 65.00),
(12, 'Factura de Electricidad', 78.40),
(13, 'Seguro de Auto', 120.00),
(14, 'Cine + Palomitas', 22.00),
(15, 'Mantenimiento Bicicleta', 35.00),
(16, 'Curso de Next.js', 19.99),
(17, 'Frutas y Verduras', 15.30),
(18, 'Cervezas Artesanales', 18.00),
(19, 'Farmacia (Vitaminas)', 25.00),
(20, 'Donación Caridad', 10.00);

-- 3. RELACIONES (Asignación de gastos a fuentes)
-- He distribuido los gastos entre las diferentes fuentes para que los balances varíen
INSERT INTO expense_source (expense_id, source_funding_id) VALUES 
(1, 3), -- Netflix -> Tarjeta
(2, 2), -- Almuerzo -> Efectivo
(3, 1), -- Gasolina -> Banco
(4, 1), -- Supermercado -> Banco
(5, 2), -- Café -> Efectivo
(6, 3), -- Gimnasio -> Tarjeta
(7, 1), -- Internet -> Banco
(8, 3), -- Cena -> Tarjeta
(9, 3), -- Spotify -> Tarjeta
(10, 1), -- Uber -> Banco
(11, 3), -- Amazon -> Tarjeta
(12, 1), -- Electricidad -> Banco
(13, 1), -- Seguro -> Banco
(14, 2), -- Cine -> Efectivo
(15, 2), -- Bici -> Efectivo
(16, 1), -- Curso -> Banco
(17, 2), -- Frutas -> Efectivo
(18, 2), -- Cervezas -> Efectivo
(19, 1), -- Farmacia -> Banco
(20, 1); -- Donación -> Banco

-- Caso especial: Gasto compartido (El Supermercado #4 se pagó con Banco y Efectivo)
-- Esto demuestra la flexibilidad de tu tabla N:N
INSERT INTO expense_source (expense_id, source_funding_id) VALUES (4, 2);
