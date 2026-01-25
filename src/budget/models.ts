export module Models {
  export class Categoria {
    id!: number;
    nombre!: string;
    color!: string;

    get tag() {
      return `[${this.nombre}]`;
    }
  }

  export class Presupuesto {
    id!: number;
    nombre!: string;
    limite_total!: number;
    fecha_inicio!: string;
    fecha_fin!: string;

    get diasRestantes(): number {
      const fin = new Date(this.fecha_fin);
      const hoy = new Date();
      const diff = fin.getTime() - hoy.getTime();
      return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    }
  }

  export class Gasto {
    id!: number;
    nombre!: string;
    monto!: number;
    fecha!: string;

    categorias?: Categoria[] = [];
    presupuestos?: Presupuesto[];

    get totalCategorias(): number {
      return this.categorias?.length || 0;
    }

    set categorias_raw(value: string | null) {
      if (!value) {
        this.categorias = [];
        return;
      }

      this.categorias = value.split(",").map((nombre) => {
        const cat = new Categoria();
        cat.nombre = nombre;
        return cat;
      });
    }
  }
}

export interface IGastoCategoria {
  gasto_id: number;
  categoria_id: number;
}

export interface IGastoPresupuesto {
  gasto_id: number;
  presupuesto_id: number;
}
