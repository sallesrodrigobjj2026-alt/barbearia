import { describe, expect, it } from "vitest";
import { totalPendingItems } from "./CartContext";

describe("totalPendingItems", () => {
  it("counts optimistic cart additions while the storefront confirms them", () => {
    expect(totalPendingItems({ variantA: 1, variantB: 2 })).toBe(3);
  });

  it("returns zero when no add action is pending", () => {
    expect(totalPendingItems({})).toBe(0);
  });
});
