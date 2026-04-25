import z from "zod";

/**
 * Validates the raw DB row for a funding source
 */
export const FundingSourceRowSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  initial_amount_cents: z.number().int().positive(),
  created_at: z.coerce.date(),
});

/**
 * Validates and transforms a raw DB row into a JS-friendly entity (camelCase).
 * Use `z.output<>` to infer the post-transform type.
 */
export const FundingSourceSchemaDTO = FundingSourceRowSchema.transform((f) => ({
  id: f.id,
  name: f.name,
  initialAmountCents: f.initial_amount_cents,
  createdAt: f.created_at,
}));

/**
 * Validates the fields supplied by the user
 * to create a new Funding source
 */
export const CreateFundingSourceDTOSchema = z.object({
  name: z.string().min(1),
  initialAmountCents: z.number().int().positive(),
});

/**
 * Validates the field supplied by the user for insert
 * into the database
 */
export const CreateFundingSourceSchemaDTOToRow =
  CreateFundingSourceDTOSchema.transform((f) => ({
    name: f.name,
    initial_amount_cents: f.initialAmountCents,
  }));

/**
 * Validates the fields supplied by the user
 * but for update into the database
 */
export const UpdateFundingSourceDTOSchema =
  CreateFundingSourceDTOSchema.partial();

/**
 * Validates the fields supplied by the user to update
 * a funding source.
 *
 * All the properties are optional.
 */
export const UpdateFundingSourceSchemaDTOToRow =
  CreateFundingSourceDTOSchema.partial().transform((f) => ({
    name: f.name,
    initial_amount_cents: f.initialAmountCents,
  }));

/**
 * Validates a paginated list
 * of funding source returned by the service.
 */
export const FundingSourceListResponseSchema = z.object({
  data: z.array(FundingSourceSchemaDTO),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
});
