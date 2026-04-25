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
export const ExpenseSchemaDTO = ExpenseRowSchema.transform((row) => ({
  id: row.id,
  name: row.name,
  amountCents: row.amount_cents,
  createdAt: row.created_at,
}));

/**
 * Validates the fields supplied by the user to create an expense.
 */
export const CreateExpenseDTOSchema = z.object({
  name: z.string().min(1),
  amountCents: z.number().int().positive(),
});

/**
 * Validates the fields supplied by the user but for insert into the database
 */
export const CreateExpenseSchemaDTOToRow = CreateExpenseDTOSchema.transform(
  (expense) => ({
    name: expense.name,
    amount_cents: expense.amountCents,
  }),
);

/**
 * Validates the fields supplied by the user
 * but for update into the database
 */
export const UpdateExpenseDTOSchema = CreateExpenseDTOSchema.partial();

/**
 * Validates the fields supplied by the user to update an expense.
 * All properties are optional.
 */
export const UpdateExpenseSchemaDTOToRow =
  CreateExpenseDTOSchema.partial().transform((expense) => ({
    name: expense.name,
    amount_cents: expense.amountCents,
  }));

/**
 * Validates a paginated list of expenses returned by the service.
 */
export const ExpenseListResponseSchema = z.object({
  data: z.array(ExpenseSchemaDTO),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
});
