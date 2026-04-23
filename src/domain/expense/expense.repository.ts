import {
  CreateExpenseDTO,
  ExpenseResponseDTO,
  UpdateExpenseDTO,
} from "@budget/types/expense.types";

export interface IExpenseRepository {
  /**
   * Find all the expenses saved
   */
  findAll(): Promise<ExpenseResponseDTO[]>;

  /**
   * Find an especific expense by its ID
   * @param id number
   */
  findById(id: number): Promise<ExpenseResponseDTO | null>;

  /**
   * Save the user expense
   * @param expense ExpenseResponseDTO
   */
  save(expense: CreateExpenseDTO): Promise<ExpenseResponseDTO>;

  /**
   * Update an especific expense
   *
   * @param id number
   * @param data UpdateExpenseDTO
   */
  update(id: number, data: UpdateExpenseDTO): Promise<ExpenseResponseDTO>;

  /**
   * Delete an especific expense
   * @param id number
   */
  delete(id: number): Promise<void>;
}
