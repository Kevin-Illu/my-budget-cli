CREATE TABLE IF NOT EXISTS expense (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name TEXT NOT NULL,
    amount_cents INTEGER NOT NULL,
    billing_cycle_rule INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS funding_source (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name TEXT NOT NULL,
    initial_amount_cents INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS expense_source (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    expense_id INTEGER NOT NULL,
    funding_source_id INTEGER NOT NULL,
    FOREIGN KEY (expense_id) REFERENCES expense(id) ON DELETE CASCADE,
    FOREIGN KEY (funding_source_id) REFERENCES funding_source(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS budget (
	id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
	name TEXT NOT NULL,
	start_date DATETIME NOT NULL,
	end_date DATETIME NOT NULL,
	initial_amount_cents INTEGER NOT NULL,
	current_remaining_cents INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS budget_item (
	id INTEGER PRIMARY KEY NOT NULL,
    budget_id INTEGER NOT NULL,
    expense_id INTEGER NULL, -- Opcional
    name TEXT NOT NULL,
    expected_amount_cents INTEGER NOT NULL,
    actual_amount_cents INTEGER NOT NULL DEFAULT 0,
    is_paid INTEGER NOT NULL DEFAULT 0, -- 0 = false, 1 = true
    billing_cycle_rule INTEGER,
    
    FOREIGN KEY (expense_id) REFERENCES expense(id) ON DELETE SET NULL,
    FOREIGN KEY (budget_id) REFERENCES budget(id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS budget_source (
	id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
	budget_id INTEGER NOT NULL,
	funding_source_id INTEGER NOT NULL,
	FOREIGN KEY (budget_id) REFERENCES budget(id) ON DELETE CASCADE,
	FOREIGN KEY (funding_source_id) REFERENCES funding_source(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS funding_source_transaction (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    funding_source_id INTEGER NOT NULL,
    budget_item_id INTEGER, -- Optional: link to a specific budget payment
    
    amount_cents INTEGER NOT NULL, -- Negative for expenses, positive for income/adjustments
    type TEXT NOT NULL, -- e.g., 'EXPENSE', 'INCOME', 'ADJUSTMENT', 'TRANSFER'
    description TEXT,
    occurred_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (funding_source_id) REFERENCES funding_source(id) ON DELETE CASCADE,
    FOREIGN KEY (budget_item_id) REFERENCES budget_item(id) ON DELETE SET NULL
);