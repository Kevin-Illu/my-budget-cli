import ServiceLocator from "@budget/core/locator";
import { TOKENS } from "@budget/core/locator.keys";
import { IFundingSourceRepository } from "@budget/domain/funding-source/funding-source.repository";
import { TDatabase } from "@budget/types/database.types";
import { beforeAll, afterAll, describe, it, expect } from "bun:test";

let repo: IFundingSourceRepository;
let db: TDatabase;

beforeAll(async () => {
  db = ServiceLocator.get(TOKENS.db);
  repo = ServiceLocator.get(TOKENS.fundingSourceRepo);
});

afterAll(async () => {
  await db.execute(async (s) => {
    await s.query`DELETE FROM funding_source WHERE name LIKE 'TEST_%'`;
  });
});

const testFundingSource = (overrides = {}) => ({
  name: "TEST_Salary",
  initialAmountCents: 100_000,
  ...overrides,
});

describe("FundingSourceRepository (integration)", () => {
  describe("save", () => {
    it("inserts a funding source and returns it with an id", async () => {
      const result = await repo.save(testFundingSource());

      expect(result.id).toBeNumber();
      expect(result.name).toBe("TEST_Salary");
      expect(result.initialAmountCents).toBe(100_000);
      expect(result.createdAt).toBeInstanceOf(Date);
    });

    it("throws on invalid data (initialAmountCents = 0)", async () => {
      expect(
        repo.save(testFundingSource({ initialAmountCents: 0 })),
      ).rejects.toThrow();
    });

    it("throws on missing name", async () => {
      expect(repo.save(testFundingSource({ name: "" }))).rejects.toThrow();
    });
  });

  describe("findAll", () => {
    it("returns at least the funding source we inserted", async () => {
      await repo.save(testFundingSource({ name: "TEST_FindAll" }));

      const results = await repo.findAll();

      expect(results.length).toBeGreaterThan(0);
      expect(results.some((f) => f.name === "TEST_FindAll")).toBeTrue();
    });

    it("returns funding sources with the correct shape", async () => {
      const results = await repo.findAll();
      const first = results[0];

      expect(first).toHaveProperty("id");
      expect(first).toHaveProperty("name");
      expect(first).toHaveProperty("initialAmountCents");
      expect(first).toHaveProperty("createdAt");
    });
  });

  describe("findById", () => {
    it("returns the funding source when it exists", async () => {
      const saved = await repo.save(
        testFundingSource({ name: "TEST_FindById" }),
      );

      const found = await repo.findById(saved.id);

      expect(found).not.toBeNull();
      expect(found?.id).toBe(saved.id);
      expect(found?.name).toBe("TEST_FindById");
      expect(found?.initialAmountCents).toBe(100_000);
    });

    it("returns null for a non-existent id", async () => {
      const result = await repo.findById(999_999_999);

      expect(result).toBeNull();
    });
  });

  describe("update", () => {
    it("updates name and initialAmountCents", async () => {
      const saved = await repo.save(
        testFundingSource({ name: "TEST_Update_Before" }),
      );

      const updated = await repo.update(saved.id, {
        name: "TEST_Update_After",
        initialAmountCents: 200_000,
      });

      expect(updated.id).toBe(saved.id);
      expect(updated.name).toBe("TEST_Update_After");
      expect(updated.initialAmountCents).toBe(200_000);
    });

    it("updates only name when initialAmountCents is omitted", async () => {
      const saved = await repo.save(
        testFundingSource({ name: "TEST_Partial", initialAmountCents: 50_000 }),
      );

      const updated = await repo.update(saved.id, {
        name: "TEST_Partial_Renamed",
      });

      expect(updated.name).toBe("TEST_Partial_Renamed");
      expect(updated.initialAmountCents).toBe(50_000); // sin cambios
    });

    it("throws when no fields are provided", async () => {
      const saved = await repo.save(testFundingSource());

      expect(repo.update(saved.id, {})).rejects.toThrow(
        "No fields provided for update",
      );
    });

    it("throws when the funding source does not exist", async () => {
      expect(repo.update(999_999_999, { name: "TEST_Ghost" })).rejects.toThrow(
        "Funding source with 999999999 not found",
      );
    });
  });

  describe("delete", () => {
    it("deletes an existing funding source", async () => {
      const saved = await repo.save(testFundingSource({ name: "TEST_Delete" }));

      await repo.delete(saved.id);

      const found = await repo.findById(saved.id);
      expect(found).toBeNull();
    });

    it("throws when the funding source does not exist", async () => {
      expect(repo.delete(999_999_999)).rejects.toThrow(
        "Funding source with id 999999999 not found",
      );
    });
  });
});
