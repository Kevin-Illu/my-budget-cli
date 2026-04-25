import { z } from "zod";
import {
  CreateExpenseSchemaDTOToRow,
  CreateExpenseDTOSchema,
  ExpenseListResponseSchema,
  ExpenseRowSchema,
  ExpenseSchemaDTO,
  UpdateExpenseDTOSchema,
} from "./expense.schema";

/**
 * Represents the raw DB row for an expense.
 * This is the shape the repository receives from the database.
 */
export type ExpenseRow = z.infer<typeof ExpenseRowSchema>;

/**
 * Represents the JS-friendly version of an expense (camelCase).
 * This is what the repository should return to the service layer.
 * Note: uses `z.output<>` because `ExpenseSchema` has a `.transform()`.
 */
export type ExpenseEntity = z.output<typeof ExpenseSchemaDTO>;

/**
 * Represents the fields supplied by the user to create an expense.
 */
export type CreateExpenseDTO = z.infer<typeof CreateExpenseDTOSchema>;

/**
 * Represents the fields supplied by the user to update an expense.
 * All properties are optional.
 */
export type UpdateExpenseDTO = z.infer<typeof UpdateExpenseDTOSchema>;

/**
 * Represents the object the service returns to the UI.
 * Equivalent to a readonly ExpenseEntity.
 */
export type ExpenseResponseDTO = Readonly<ExpenseEntity>;

/**
 * Represents a paginated list of expenses.
 */
export type ExpenseListResponseDTO = z.infer<typeof ExpenseListResponseSchema>;

/**
 * Represents the expense that will be inserted into
 * the database
 */
export type ExpenseToDTO = z.infer<typeof CreateExpenseSchemaDTOToRow>;
