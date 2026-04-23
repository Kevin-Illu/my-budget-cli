import { describe, it, expect, beforeAll } from "bun:test";
import ServiceLocator from "@budget/core/locator";
import { TOKENS } from "@budget/core/locator.keys";
import type { IExpenseRepository } from "@budget/domain/expense/expense.repository";
import type { TDatabase } from "@budget/types/database.types";

let repo: IExpenseRepository;
let db: TDatabase;

beforeAll(async () => {
  db = ServiceLocator.get(TOKENS.db);
  repo = ServiceLocator.get(TOKENS.expenseRepo);
});

// Prefix all test data so afterAll can cleanly wipe only test rows
const testExpense = (overrides = {}) => ({
  name: "TEST_Groceries",
  amountCents: 5000,
  ...overrides,
});

describe("ExpenseRepository (integration)", () => {
  describe("save", () => {
    it("inserts an expense and returns it with an id", async () => {
      const result = await repo.save(testExpense());

      expect(result.id).toBeNumber();
      expect(result.name).toBe("TEST_Groceries");
      expect(result.amountCents).toBe(5000);
      expect(result.createdAt).toBeInstanceOf(Date);
    });

    it("throws on invalid data (amountCents = 0)", async () => {
      // Zod validation inside the schema should reject this
      expect(repo.save(testExpense({ amountCents: 0 }))).rejects.toThrow();
    });
  });

  describe("findAll", () => {
    it("returns at least the expense we just inserted", async () => {
      await repo.save(testExpense({ name: "TEST_FindAll" }));

      const results = await repo.findAll();

      expect(results.length).toBeGreaterThan(0);
      expect(results.some((e) => e.name === "TEST_FindAll")).toBeTrue();
    });

    it("returns expenses with the correct shape", async () => {
      const results = await repo.findAll();
      const first = results[0];

      expect(first).toHaveProperty("id");
      expect(first).toHaveProperty("name");
      expect(first).toHaveProperty("amountCents");
      expect(first).toHaveProperty("createdAt");
    });
  });

  describe("findById", () => {
    it("returns the expense when it exists", async () => {
      const saved = await repo.save(testExpense({ name: "TEST_FindById" }));

      const found = await repo.findById(saved.id);

      expect(found).not.toBeNull();
      expect(found?.id).toBe(saved.id);
      expect(found?.name).toBe("TEST_FindById");
    });

    it("returns null for a non-existent id", async () => {
      const result = await repo.findById(999_999_999);

      expect(result).toBeNull();
    });
  });

  describe("update", () => {
    it("updates name and amountCents", async () => {
      const saved = await repo.save(
        testExpense({ name: "TEST_Update_Before" }),
      );

      const updated = await repo.update(saved.id, {
        name: "TEST_Update_After",
        amountCents: 9999,
      });

      expect(updated.id).toBe(saved.id);
      expect(updated.name).toBe("TEST_Update_After");
      expect(updated.amountCents).toBe(9999);
    });

    it("updates only name when amountCents is omitted", async () => {
      const saved = await repo.save(
        testExpense({ name: "TEST_PartialUpdate", amountCents: 1000 }),
      );

      const updated = await repo.update(saved.id, {
        name: "TEST_PartialUpdate_Renamed",
      });

      expect(updated.name).toBe("TEST_PartialUpdate_Renamed");
      expect(updated.amountCents).toBe(1000); // unchanged
    });

    it("throws when no fields are provided", async () => {
      const saved = await repo.save(testExpense());

      expect(repo.update(saved.id, {})).rejects.toThrow(
        "No fields provided for update",
      );
    });

    it("throws when the expense does not exist", async () => {
      expect(repo.update(999_999_999, { name: "TEST_Ghost" })).rejects.toThrow(
        "Expense with id 999999999 not found",
      );
    });
  });
  //
  // describe("delete", () => {
  //   it("deletes an existing expense", async () => {
  //     const saved = await repo.save(testExpense({ name: "TEST_Delete" }));
  //
  //     await repo.delete(saved.id);
  //
  //     const found = await repo.findById(saved.id);
  //     expect(found).toBeNull();
  //   });
  //
  //   it("throws when the expense does not exist", async () => {
  //     expect(repo.delete(999_999_999)).rejects.toThrow(
  //       "Expense with id 999999999 not found",
  //     );
  //   });
  // });
});
