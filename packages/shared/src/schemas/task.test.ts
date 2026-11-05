import { describe, expect, it } from "vitest";
import { MAX_PAGE_SIZE } from "../constants/pagination.js";
import { paginationQuerySchema } from "./pagination.js";
import { createTaskSchema, updateTaskSchema } from "./task.js";

describe("createTaskSchema", () => {
  it("accepts a minimal task and applies the default priority", () => {
    const result = createTaskSchema.parse({ title: "Buy groceries" });
    expect(result.priority).toBe("medium");
  });

  it("trims whitespace from the title", () => {
    expect(createTaskSchema.parse({ title: "  Read  " }).title).toBe("Read");
  });

  it("rejects an empty or whitespace-only title", () => {
    expect(createTaskSchema.safeParse({ title: "   " }).success).toBe(false);
  });

  it("rejects a client-supplied userId (ownership comes from the session)", () => {
    const result = createTaskSchema.safeParse({ title: "Hack", userId: "someone-else" });
    expect(result.success).toBe(false);
  });

  it("rejects a malformed due date", () => {
    expect(createTaskSchema.safeParse({ title: "A", dueAt: "tomorrow" }).success).toBe(
      false,
    );
  });

  it("accepts an ISO due date with a time-zone offset", () => {
    const result = createTaskSchema.safeParse({
      title: "A",
      dueAt: "2026-11-06T09:00:00+02:00",
    });
    expect(result.success).toBe(true);
  });
});

describe("updateTaskSchema", () => {
  it("allows a partial update", () => {
    expect(updateTaskSchema.safeParse({ status: "completed" }).success).toBe(true);
  });

  it("rejects an unknown status", () => {
    expect(updateTaskSchema.safeParse({ status: "done" }).success).toBe(false);
  });

  it("does not inject defaults into a partial update", () => {
    const result = updateTaskSchema.parse({ status: "completed" });
    expect(result).toEqual({ status: "completed" });
  });

  it("rejects unknown keys", () => {
    expect(updateTaskSchema.safeParse({ userId: "x" }).success).toBe(false);
  });
});

describe("paginationQuerySchema", () => {
  it("uses the default page size when none is given", () => {
    expect(paginationQuerySchema.parse({}).limit).toBe(25);
  });

  it("coerces a text limit from the query string", () => {
    expect(paginationQuerySchema.parse({ limit: "10" }).limit).toBe(10);
  });

  it("rejects a limit above the server maximum", () => {
    expect(paginationQuerySchema.safeParse({ limit: MAX_PAGE_SIZE + 1 }).success).toBe(
      false,
    );
  });
});
