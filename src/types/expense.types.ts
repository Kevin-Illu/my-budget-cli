import { z } from "zod";

/**
 * Validates the raw DB row for an expense (snake_case columns).
 */
export const ExpenseRowSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  amount_cents: z.number().int().positive(),
  created_at: z.coerce.date(),
});

/**
 * Validates and transforms a raw DB row into a JS-friendly entity (camelCase).
 * Use `z.output<>` to infer the post-transform type.
 */
export const ExpenseSchema = ExpenseRowSchema.transform((row) => ({
  id: row.id,
  name: row.name,
  amountCents: row.amount_cents,
  createdAt: row.created_at,
}));

/**
 * Validates the fields supplied by the user to create an expense.
 */
export const CreateExpenseSchema = z.object({
  name: z.string().min(1),
  amountCents: z.number().int().positive(),
});

/**
 * Validates the fields supplied by the user but for insert into the database
 */
export const ExpenseToRowSchema = CreateExpenseSchema.partial().transform(
  (expense) => ({
    name: expense.name,
    amount_cents: expense.amountCents,
  }),
);

/**
 * Validates the fields supplied by the user to update an expense.
 * All properties are optional.
 */
export const UpdateExpenseSchema = CreateExpenseSchema.partial();

/**
 * Validates a paginated list of expenses returned by the service.
 */
export const ExpenseListResponseSchema = z.object({
  data: z.array(ExpenseSchema),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
});

/**
 * Validates raw user input from an expense form (pre-parse strings).
 */
export const ExpenseFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount"),
});

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
export type ExpenseEntity = z.output<typeof ExpenseSchema>;

/**
 * Represents the fields supplied by the user to create an expense.
 */
export type CreateExpenseDTO = z.infer<typeof CreateExpenseSchema>;

/**
 * Represents the fields supplied by the user to update an expense.
 * All properties are optional.
 */
export type UpdateExpenseDTO = z.infer<typeof UpdateExpenseSchema>;

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
 * Represents raw user input from an expense form (pre-parse strings).
 * Amount is a string (e.g. "12.50") and must be converted to cents before sending.
 */
export type ExpenseFormValues = z.infer<typeof ExpenseFormSchema>;

/**
 * Represents the expense that will be inserted into
 * the database
 */
export type ExpenseToRow = z.infer<typeof ExpenseInsertSchema>;
