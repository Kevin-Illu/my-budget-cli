import z from "zod";

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
export const CreateExpensechemaDTOToRow =
  CreateExpenseSchema.partial().transform((expense) => ({
    name: expense.name,
    amount_cents: expense.amountCents,
  }));

export const UpdateExpenseSchema = CreateExpenseSchema.partial();

/**
 * Validates the fields supplied by the user to update an expense.
 * All properties are optional.
 */
export const UpdateExpenseSchemaDTOToRow =
  CreateExpenseSchema.partial().transform((expense) => ({
    name: expense.name,
    amount_cents: expense.amountCents,
  }));

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
