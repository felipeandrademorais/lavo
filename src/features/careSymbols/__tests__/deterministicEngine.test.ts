import { DeterministicCareEngine } from "../deterministicEngine";

describe("DeterministicCareEngine", () => {
  it("builds empty instructions when no symbols provided", () => {
    const instructions = DeterministicCareEngine.buildInstructions([]);

    expect(instructions.allowed).toEqual([]);
    expect(instructions.forbidden).toEqual([]);
    expect(instructions.steps).toEqual([]);
    expect(instructions.raw).toBe("[]");
    expect(instructions.createdAt).toBeDefined();
  });

  it("resolves valid symbols and categorizes allowed and forbidden rules", () => {
    const symbols = ["WASH_40", "NO_BLEACH", "IRON_110"];
    const instructions = DeterministicCareEngine.buildInstructions(symbols);

    expect(instructions.allowed).toContain(
      "Lavar na máquina em ciclo normal a até 40°C",
    );
    expect(instructions.allowed).toContain(
      "Passar a ferro em temperatura baixa (máximo 110°C)",
    );
    expect(instructions.forbidden).toContain(
      "Não usar alvejante de nenhum tipo",
    );
  });

  it("orders steps logically from wash to iron", () => {
    const symbols = ["IRON_110", "WASH_30", "TUMBLE_LOW"];
    const instructions = DeterministicCareEngine.buildInstructions(symbols);

    expect(instructions.steps).toHaveLength(3);
    expect(instructions.steps[0].title).toBe("Lavagem");
    expect(instructions.steps[1].title).toBe("Secagem");
    expect(instructions.steps[2].title).toBe("Passadoria");
  });

  it("ignores invalid or unknown symbol IDs safely", () => {
    const symbols = ["UNKNOWN_SYMBOL_123", "WASH_HAND", "INVALID"];
    const instructions = DeterministicCareEngine.buildInstructions(symbols);

    expect(instructions.steps).toHaveLength(1);
    expect(instructions.steps[0].title).toBe("Lavagem");
    expect(instructions.allowed).toContain("Lavar exclusivamente à mão");
  });

  it("deduplicates repeated symbols", () => {
    const symbols = ["NO_BLEACH", "NO_BLEACH", "NO_BLEACH"];
    const instructions = DeterministicCareEngine.buildInstructions(symbols);

    expect(instructions.steps).toHaveLength(1);
    expect(instructions.steps[0].title).toBe("Alvejamento");
  });

  it("normalizes lowercase and hyphenated symbol IDs", () => {
    const symbols = ["wash-40", "no_bleach", " iron 110 "];
    const instructions = DeterministicCareEngine.buildInstructions(symbols);

    expect(instructions.steps).toHaveLength(3);
  });
});
