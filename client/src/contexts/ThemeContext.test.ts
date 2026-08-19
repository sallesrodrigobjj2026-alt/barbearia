import { describe, expect, it } from "vitest";
import { resolveTheme } from "./ThemeContext";

describe("resolveTheme", () => {
  it("restores a valid saved theme", () => {
    expect(resolveTheme("light")).toBe("light");
    expect(resolveTheme("dark")).toBe("dark");
  });

  it("uses the configured fallback for missing or invalid values", () => {
    expect(resolveTheme(null, "dark")).toBe("dark");
    expect(resolveTheme("system", "light")).toBe("light");
  });

  it("accepts a valid preview theme in the same way as a saved preference", () => {
    expect(resolveTheme("light", "dark")).toBe("light");
  });
});
