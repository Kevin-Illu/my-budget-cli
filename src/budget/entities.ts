import DB from "../db";
import { Models } from "./models";

export module Entities {
  export class Gastos {
    obtenerGastoCompleto(id: number): Models.Gasto | null {
      const gasto = DB.db
        .query("SELECT * FROM gastos WHERE id = ?")
        .as(Models.Gasto)
        .get(id);

      if (gasto) {
        gasto.categorias = DB.db
          .query(
            `
      SELECT c.* FROM categorias c
      JOIN gastos_categorias gc ON c.id = gc.categoria_id
      WHERE gc.gasto_id = ?
    `,
          )
          .as(Models.Categoria)
          .all(id);

        // Buscamos sus presupuestos
        gasto.presupuestos = DB.db
          .query(
            `
          SELECT p.* FROM presupuestos p
          JOIN gastos_presupuestos gp ON p.id = gp.presupuesto_id
          WHERE gp.gasto_id = ?
        `,
          )
          .as(Models.Presupuesto)
          .all(id);
      }

      return gasto;
    }

    crearGasto(data: {
      nombre: string;
      monto: number;
      fecha: string;
      categoriaIds: number[];
      presupuestoIds: number[];
    }) {
      const transaction = DB.db.transaction((g) => {
        const insertGasto = DB.db
          .prepare(
            "INSERT INTO gastos (nombre, monto, fecha) VALUES ($nombre, $monto, $fecha)",
          )
          .run({
            $nombre: g.nombre,
            $monto: g.monto,
            $fecha: g.fecha,
          });

        const gastoId = insertGasto.lastInsertRowid as number;

        // vincular categoria
        const vincularCat = DB.db.prepare(
          "INSERT INTO gastos_categorias (gasto_id, categoria_id) VALUES (?, ?)",
        );

        for (const catId of g.categoriaIds) {
          vincularCat.run(gastoId, catId);
        }

        // 3. Vincular con presupuestos
        const vincularPres = DB.db.prepare(
          "INSERT INTO gastos_presupuestos (gasto_id, presupuesto_id) VALUES (?, ?)",
        );

        for (const presId of g.presupuestoIds) {
          vincularPres.run(gastoId, presId);
        }

        return gastoId;
      });

      return transaction(data);
    }

    listarGastos(): Models.Gasto[] {
      const sql = `
      SELECT 
        g.*, 
        GROUP_CONCAT(c.nombre) as categorias_raw
      FROM gastos g
      LEFT JOIN gastos_categorias gc ON g.id = gc.gasto_id
      LEFT JOIN categorias c ON gc.categoria_id = c.id
      GROUP BY g.id
      ORDER BY g.fecha DESC
    `;
      return DB.db.query(sql).as(Models.Gasto).all();
    }

    actualizarGasto(
      id: number,
      data: {
        nombre: string;
        monto: number;
        fecha: string;
        categoriaIds: number[];
        presupuestoIds: number[];
      },
    ) {
      const operacion = DB.db.transaction((g) => {
        DB.db
          .prepare(
            `
        UPDATE gastos 
        SET nombre = $nombre, monto = $monto, fecha = $fecha 
        WHERE id = $id
      `,
          )
          .run({
            $id: id,
            $nombre: g.nombre,
            $monto: g.monto,
            $fecha: g.fecha,
          });

        DB.db
          .prepare("DELETE FROM gastos_categorias WHERE gasto_id = ?")
          .run(id);
        DB.db
          .prepare("DELETE FROM gastos_presupuestos WHERE gasto_id = ?")
          .run(id);

        const vincularCat = DB.db.prepare(
          "INSERT INTO gastos_categorias (gasto_id, categoria_id) VALUES (?, ?)",
        );
        g.categoriaIds.forEach((catId) => vincularCat.run(id, catId));

        const vincularPres = DB.db.prepare(
          "INSERT INTO gastos_presupuestos (gasto_id, presupuesto_id) VALUES (?, ?)",
        );
        g.presupuestoIds.forEach((presId) => vincularPres.run(id, presId));

        return true;
      });

      return operacion(data);
    }

    eliminarGasto(id: number) {
      return DB.db
        .prepare("DELETE FROM gastos WHERE id = $id")
        .run({ $id: id });
    }
  }

  export class Presupuesto {
    listarPresupuestos(): Models.Presupuesto[] {
      const query = DB.db
        .query("SELECT * FROM presupuestos")
        .as(Models.Presupuesto);
      return query.all();
    }
  }
}
