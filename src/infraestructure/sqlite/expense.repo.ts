import { sql } from "bun";

import TryCatch from "@budget/core/result";
import { TDatabase } from "@budget/types/database.types";
import { IExpenseRepository } from "@budget/domain/expense/expense.repository";
import type {
  CreateExpenseDTO,
  ExpenseResponseDTO,
  ExpenseRow,
  UpdateExpenseDTO,
} from "@budget/types/expense.types";
import {
  ExpenseSchema,
  UpdateExpenseSchemaDTOToRow,
} from "@budget/types/expense.schema";

export class ExpenseRepository implements IExpenseRepository {
  constructor(private db: TDatabase) {}

  async save(expense: CreateExpenseDTO): Promise<ExpenseResponseDTO> {
    const newExpense = UpdateExpenseSchemaDTOToRow.parse(expense);

    const result = await TryCatch.run<ExpenseRow>(async () =>
      this.db.execute(async (service) => {
        const result =
          await service.query`INSERT INTO expense ${sql(newExpense)} RETURNING *`;
        return result[0];
      }),
    );

    if (result.isError()) {
      throw result.error;
    }

    return ExpenseSchema.parse(result.value);
  }

  async findAll(): Promise<ExpenseResponseDTO[]> {
    return (
      await TryCatch.run<ExpenseResponseDTO[]>(() =>
        this.db.execute(async (s) => {
          const result = (await s.query`SELECT * FROM expense`) as ExpenseRow[];
          return result.map((e) => ExpenseSchema.parse(e));
        }),
      )
    ).unwrap();
  }

  async delete(id: number): Promise<void> {
    return (
      await TryCatch.run(() =>
        this.db.execute(async (s) => {
          const result =
            await s.query`DELETE FROM expense WHERE id = ${id} RETURNING *`;
          const deletedExpense = result[0];

          if (!deletedExpense) {
            throw new Error(`Expense with id ${id} not found`);
          }
        }),
      )
    ).unwrap();
  }

  async findById(id: number): Promise<ExpenseResponseDTO | null> {
    return (
      await TryCatch.run<ExpenseResponseDTO>(() =>
        this.db.execute(async (s) => {
          const founded =
            await s.query`SELECT * FROM expense AS e WHERE e.id = ${id}`;

          const expenseFounded = founded[0];

          if (!expenseFounded) return null;

          return ExpenseSchema.parse(expenseFounded);
        }),
      )
    ).unwrap();
  }

  async update(
    id: number,
    data: UpdateExpenseDTO,
  ): Promise<ExpenseResponseDTO> {
    return (
      await TryCatch.run(() => {
        if (!data || JSON.stringify(data) === "{}") {
          throw new Error("No fields provided for update");
        }

        return this.db.execute(async (s) => {
          const row = UpdateExpenseSchemaDTOToRow.parse(data);
          const updated =
            await s.query`UPDATE expense SET ${sql(row, "name", "amount_cents")} WHERE id = ${id} RETURNING *`;

          const updatedExpense = updated[0];

          if (!updatedExpense) {
            throw new Error(`Expense with id ${id} not found`);
          }

          return ExpenseSchema.parse(updated[0]);
        });
      })
    ).unwrap();
  }
}
