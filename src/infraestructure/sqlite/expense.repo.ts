import { sql } from "bun";

import { IExpenseRepository } from "@budget/domain/expense/expense.repository";
import TryCatch from "@budget/core/result";
import { TDatabase } from "@budget/types/database.types";
import {
  CreateExpenseDTO,
  ExpenseToRowSchema,
  ExpenseResponseDTO,
  ExpenseRow,
  ExpenseSchema,
  UpdateExpenseDTO,
} from "@budget/types/expense.types";

export class ExpenseRepository implements IExpenseRepository {
  constructor(private db: TDatabase) {}

  async findAll(): Promise<ExpenseResponseDTO[]> {
    const queryResult = await TryCatch.run<ExpenseResponseDTO[]>(async () => {
      return this.db.execute(async (service) => {
        const expenses: ExpenseRow[] =
          await service.query`select * from expense`.values();
        return expenses.map((e) => ExpenseSchema.parse(e));
      });
    });

    if (queryResult.isError()) {
      throw queryResult.error;
    }

    return queryResult.value;
  }

  async findById(id: number): Promise<ExpenseResponseDTO | null> {
    const queryResult = await TryCatch.run<ExpenseResponseDTO>(async () => {
      return this.db.execute(async (service) => {
        const expense: ExpenseRow =
          await service.query`select * from expense as e where e.id = ${id}`.values();

        if (!expense[0]) {
          return null;
        }

        return ExpenseSchema.parse(expense[0]);
      });
    });

    if (queryResult.isError()) {
      throw queryResult.error;
    }

    return queryResult.value;
  }

  async update(
    id: number,
    data: UpdateExpenseDTO,
  ): Promise<ExpenseResponseDTO> {
    const queryResult = await TryCatch.run<ExpenseResponseDTO>(() => {
      return this.db.execute(async (service) => {
        const row = ExpenseToRowSchema.parse(data);
        const updatedExpense: ExpenseRow =
          await service.query`UPDATE expense SET ${sql(row, "name", "amount_cents")} WHERE id = ${id} RETURNING *`.values();
        return ExpenseSchema.parse(updatedExpense[0]);
      });
    });

    if (queryResult.isError()) {
      throw queryResult.error;
    }

    return queryResult.value;
  }

  async save(expense: CreateExpenseDTO): Promise<ExpenseResponseDTO> {
    const queryResult = await TryCatch.run<ExpenseResponseDTO>(() => {
      return this.db.execute(async (service) => {
        const row = ExpenseToRowSchema.parse(expense);
        const inserted =
          await service.query`INSERT INTO expense ${row} RETURNING *`.values();
        return ExpenseSchema.parse(inserted[0]);
      });
    });

    if (queryResult.isError()) {
      throw queryResult.error;
    }

    return queryResult.value;
  }

  async delete(id: number): Promise<void> {
    const result = await TryCatch.run(() => {
      return this.db.execute(
        async (service) =>
          await service.query`DELETE FROM expense WHERE id = ${id}`,
      );
    });

    if (result.isError()) {
      throw result.error;
    }
  }
}
