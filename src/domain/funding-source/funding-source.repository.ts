import {
  CreateFundingSourceDTO,
  FundingSourceResponseDTO,
  UpdateFundingSourceDTO,
} from "@budget/types/funding-source.types";

export interface IFundingSourceRepository {
  /**
   * Find all the FundingSources saved
   */
  findAll(): Promise<FundingSourceResponseDTO[]>;

  /**
   * Find an especific funding source by its ID
   *
   * @param id the id of the funding source
   */
  findById(id: number): Promise<FundingSourceResponseDTO | null>;

  /**
   * Save the user funding source
   *
   * @param fundingSource the saved source
   */
  save(
    fundingSource: CreateFundingSourceDTO,
  ): Promise<FundingSourceResponseDTO>;

  /**
   * Update an especific funding source
   *
   * @param id the id of the funding source
   * @param data the new object with new values
   */
  update(
    id: number,
    data: UpdateFundingSourceDTO,
  ): Promise<FundingSourceResponseDTO>;

  /**
   * Delete an especific funding source.
   *
   * @param id the funding source id
   */
  delete(id: number): Promise<void>;
}
