import { describe, expect, it } from "vitest";
import { canAddToCart, cartLabel, formatBRL } from "./storefront";

describe("storefront presentation helpers", () => {
  it("formats Brazilian reais consistently", () => {
    expect(formatBRL("39.9")).toBe("R$ 39,90");
  });

  it("uses singular and plural cart labels", () => {
    expect(cartLabel(1)).toBe("1 item");
    expect(cartLabel(3)).toBe("3 itens");
  });

  it("only enables product add actions when an item is available and idle", () => {
    expect(canAddToCart(true, false)).toBe(true);
    expect(canAddToCart(false, false)).toBe(false);
    expect(canAddToCart(true, true)).toBe(false);
  });
});

