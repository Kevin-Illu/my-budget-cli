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
  CreateExpenseSchema,
  CreateExpenseToDTOSchema,
  ExpenseSchema,
} from "@budget/types/expense.schema";
import { StringModule } from "@budget/shared/string";

export class ExpenseRepository implements IExpenseRepository {
  constructor(private db: TDatabase) {}

  async save(expense: CreateExpenseDTO): Promise<ExpenseResponseDTO> {
    const newExpense = CreateExpenseToDTOSchema.parse(expense);

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
          const result = await s.query`SELECT * FROM expense`;
          return result.map((e) => ExpenseSchema.parse(e));
        }),
      )
    ).unwrap();
  }

  async delete(id: number): Promise<void> {}

  async findById(id: number): Promise<ExpenseResponseDTO | null> {
    return null;
  }

  async update(
    id: number,
    data: UpdateExpenseDTO,
  ): Promise<ExpenseResponseDTO> {
    return {} as ExpenseResponseDTO;
  }
}
