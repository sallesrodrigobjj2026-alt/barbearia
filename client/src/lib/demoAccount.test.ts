import { describe, expect, it } from "vitest";
import { accountDisplayName, isValidDemoLogin } from "./demoAccount";

describe("demo account helpers", () => {
  it("accepts an email plus a minimum six-character password", () => {
    expect(isValidDemoLogin("cliente@exemplo.com", "navalha")).toBe(true);
    expect(isValidDemoLogin("cliente", "navalha")).toBe(false);
    expect(isValidDemoLogin("cliente@exemplo.com", "12345")).toBe(false);
  });

  it("creates a readable display name from the email prefix", () => {
    expect(accountDisplayName("joao.almeida@exemplo.com")).toBe("joao almeida");
  });
});
