import { describe, expect, it } from "vitest";
import { cardImages } from "./productVisuals";

describe("cardImages", () => {
  it("uses an explicit product visual pair before storefront media", () => {
    expect(cardImages("serum", ["storefront.jpg"], { serum: ["one.jpg", "two.jpg"] }, ["fallback.jpg"]))
      .toEqual(["one.jpg", "two.jpg"]);
  });

  it("falls back to storefront media and then the provided card fallback", () => {
    expect(cardImages("other", ["storefront.jpg"], {}, ["fallback.jpg"]))
      .toEqual(["storefront.jpg", "fallback.jpg"]);
  });
});
