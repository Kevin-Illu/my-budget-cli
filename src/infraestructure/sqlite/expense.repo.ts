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
  CreateExpenseSchemaDTOToRow,
  ExpenseSchemaDTO,
  UpdateExpenseSchemaDTOToRow,
} from "@budget/types/expense.schema";

export class ExpenseRepository implements IExpenseRepository {
  constructor(private db: TDatabase) {}

  async save(expense: CreateExpenseDTO): Promise<ExpenseResponseDTO> {
    return (
      await TryCatch.run(() =>
        this.db.execute(async (s) => {
          const row = CreateExpenseSchemaDTOToRow.parse(expense);

          const result =
            await s.query`INSERT INTO expense ${sql(row)} RETURNING *`;
          const savedExpense = result[0];

          if (!savedExpense) {
            throw new Error("Failed to save the expense");
          }

          return ExpenseSchemaDTO.parse(savedExpense);
        }),
      )
    ).unwrap();
  }

  async findAll(): Promise<ExpenseResponseDTO[]> {
    return (
      await TryCatch.run<ExpenseResponseDTO[]>(() =>
        this.db.execute(async (s) => {
          const result = (await s.query`SELECT * FROM expense`) as ExpenseRow[];
          return result.map((e) => ExpenseSchemaDTO.parse(e));
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
          const result =
            await s.query`SELECT * FROM expense AS e WHERE e.id = ${id}`;

          const expenseFounded = result[0];

          if (!expenseFounded) return null;

          return ExpenseSchemaDTO.parse(expenseFounded);
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

          return ExpenseSchemaDTO.parse(updatedExpense);
        });
      })
    ).unwrap();
  }
}
