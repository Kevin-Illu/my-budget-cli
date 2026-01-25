import { Database } from "bun:sqlite";
import { appconfig } from "./config/app";
import Logger from "./logger";
import { Models } from "./budget/models";
const { FILE_PATHS } = appconfig;

export default abstract class DB {
  static db: Database;

  static {
    this.db = new Database(FILE_PATHS.databasepath, {
      strict: true,
      create: true,
    });
  }

  async init() {
    Logger.info("Initializing database...");
    DB.db.run("PRAGMA foreign_keys = ON;");
    await this.createSchema();
  }

  async createSchema() {
    const schema = `
      CREATE TABLE IF NOT EXISTS categorias (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        color TEXT DEFAULT '#000000'
      ) STRICT;

      CREATE TABLE IF NOT EXISTS presupuestos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        limite_total REAL NOT NULL,
        fecha_inicio TEXT NOT NULL,
        fecha_fin TEXT NOT NULL
      ) STRICT;

      CREATE TABLE IF NOT EXISTS gastos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        monto REAL NOT NULL,
        fecha TEXT NOT NULL
      ) STRICT;

      -- 4. Tabla de Unión: Gastos <-> Presupuestos (Muchos a Muchos)
      CREATE TABLE IF NOT EXISTS gastos_presupuestos (
        gasto_id INTEGER NOT NULL,
        presupuesto_id INTEGER NOT NULL,
        PRIMARY KEY (gasto_id, presupuesto_id),
        FOREIGN KEY (gasto_id) REFERENCES gastos(id) ON DELETE CASCADE,
        FOREIGN KEY (presupuesto_id) REFERENCES presupuestos(id) ON DELETE CASCADE
      ) STRICT;
      
      -- 5. Tabla de Unión: Gastos <-> Categorías (Muchos a Muchos)
      CREATE TABLE IF NOT EXISTS gastos_categorias (
        gasto_id INTEGER NOT NULL,
        categoria_id INTEGER NOT NULL,
        PRIMARY KEY (gasto_id, categoria_id),
        FOREIGN KEY (gasto_id) REFERENCES gastos(id) ON DELETE CASCADE,
        FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE CASCADE
      ) STRICT;
    `;

    DB.db.run(schema);
    Logger.info("The database is ready");
  }

  listarPresupuestos(): Models.Presupuesto[] {
    const query = DB.db
      .query("SELECT * FROM presupuestos")
      .as(Models.Presupuesto);
    return query.all();
  }
}
