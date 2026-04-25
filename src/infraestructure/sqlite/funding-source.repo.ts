import TryCatch from "@budget/core/result";
import { IFundingSourceRepository } from "@budget/domain/funding-source/funding-source.repository";
import { TDatabase } from "@budget/types/database.types";
import {
  CreateFundingSourceSchemaDTOToRow,
  FundingSourceSchemaDTO,
  UpdateFundingSourceSchemaDTOToRow,
} from "@budget/types/funding-source.schema";
import {
  CreateFundingSourceDTO,
  FundingSourceResponseDTO,
  FundingSourceRow,
  UpdateFundingSourceDTO,
} from "@budget/types/funding-source.types";
import { sql } from "bun";

export class FundingSourceRepository implements IFundingSourceRepository {
  constructor(private db: TDatabase) {}

  async save(
    fundingSource: CreateFundingSourceDTO,
  ): Promise<FundingSourceResponseDTO> {
    return (
      await TryCatch.run(() =>
        this.db.execute(async (s) => {
          const row = CreateFundingSourceSchemaDTOToRow.parse(fundingSource);

          const result =
            await s.query`INSERT INTO funding_source ${sql(row)} RETURNING *`;
          const savedFundingSource = result[0];

          if (!savedFundingSource) {
            throw new Error("Failed to save the funding source");
          }

          return FundingSourceSchemaDTO.parse(savedFundingSource);
        }),
      )
    ).unwrap();
  }

  async findAll(): Promise<FundingSourceResponseDTO[]> {
    return (
      await TryCatch.run(() =>
        this.db.execute(async (s) => {
          const result =
            (await s.query`SELECT * FROM funding_source`) as FundingSourceRow[];
          return result.map((f) => FundingSourceSchemaDTO.parse(f));
        }),
      )
    ).unwrap();
  }

  async delete(id: number): Promise<void> {
    return (
      await TryCatch.run(() =>
        this.db.execute(async (s) => {
          const result =
            await s.query`DELETE FROM funding_source WHERE id = ${id} RETURNING *`;
          const deletedFundingSource = result[0];

          if (!deletedFundingSource) {
            throw new Error(`Funding source with id ${id} not found`);
          }
        }),
      )
    ).unwrap();
  }

  async findById(id: number): Promise<FundingSourceResponseDTO | null> {
    return (
      await TryCatch.run(() =>
        this.db.execute(async (s) => {
          const result =
            await s.query`SELECT * FROM funding_source AS fs WHERE fs.id = ${id}`;
          const fundingSourceFounded = result[0];

          if (!fundingSourceFounded) return null;

          return FundingSourceSchemaDTO.parse(fundingSourceFounded);
        }),
      )
    ).unwrap();
  }

  async update(
    id: number,
    data: UpdateFundingSourceDTO,
  ): Promise<FundingSourceResponseDTO> {
    return (
      await TryCatch.run(() => {
        if (!data || JSON.stringify(data) === "{}") {
          throw new Error("No fields provided for update");
        }

        return this.db.execute(async (s) => {
          const row = UpdateFundingSourceSchemaDTOToRow.parse(data);
          const updated =
            await s.query`UPDATE funding_source as fs SET ${sql(row, "name", "initial_amount_cents")} WHERE fs.id = ${id} RETURNING *`;
          const updatedFundingSource = updated[0];

          if (!updatedFundingSource) {
            throw new Error(`Funding source with ${id} not found`);
          }

          return FundingSourceSchemaDTO.parse(updatedFundingSource);
        });
      })
    ).unwrap();
  }
}
