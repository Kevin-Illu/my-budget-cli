import z from "zod";
import {
  CreateFundingSourceDTOSchema,
  CreateFundingSourceSchemaDTOToRow,
  FundingSourceListResponseSchema,
  FundingSourceRowSchema,
  FundingSourceSchemaDTO,
  UpdateFundingSourceDTOSchema,
} from "./funding-source.schema";

/**
 * Represents the raw DB row for an expense.
 * This is the shape the repository receives from the database.
 */
export type FundingSourceRow = z.infer<typeof FundingSourceRowSchema>;

/**
 * Represents the JS-friendly version of an expense (camelCase).
 * This is what the repository should return to the service layer.
 * Note: uses `z.output<>` because `ExpenseSchema` has a `.transform()`.
 */
export type FundingSourceEntity = z.output<typeof FundingSourceSchemaDTO>;

/**
 * Represents the fields supplied by the user to create an expense.
 */
export type CreateFundingSourceDTO = z.infer<
  typeof CreateFundingSourceDTOSchema
>;

/**
 * Represents the fields supplied by the user to update an expense.
 * All properties are optional.
 */
export type UpdateFundingSourceDTO = z.infer<
  typeof UpdateFundingSourceDTOSchema
>;

/**
 * Represents the object the service returns to the UI.
 * Equivalent to a readonly ExpenseEntity.
 */
export type FundingSourceResponseDTO = Readonly<FundingSourceEntity>;

/**
 * Represents a paginated list of expenses.
 */
export type FundingSourceListResponseDTO = z.infer<
  typeof FundingSourceListResponseSchema
>;

/**
 * Represents the expense that will be inserted into
 * the database
 */
export type FundingSourceToDTO = z.infer<
  typeof CreateFundingSourceSchemaDTOToRow
>;
