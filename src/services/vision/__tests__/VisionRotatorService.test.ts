import { VisionRotatorService } from "../VisionRotatorService";
import { VisionStrategy } from "../types";

class MockVisionStrategy implements VisionStrategy {
  public callCount = 0;
  public shouldFail = false;
  public failStatus = 500;

  constructor(
    public readonly providerName: string,
    private readonly symbolsToReturn: string[] = ["WASH_40", "NO_BLEACH"],
  ) {}

  public isAvailable(): boolean {
    return true;
  }

  public async detectSymbols(): Promise<string[]> {
    this.callCount += 1;
    if (this.shouldFail) {
      const error = new Error(
        `Falha no provedor ${this.providerName}`,
      ) as Error & {
        response?: { status?: number };
      };
      error.response = { status: this.failStatus };
      throw error;
    }
    return this.symbolsToReturn;
  }
}

describe("VisionRotatorService", () => {
  it("rotates providers sequentially in round-robin fashion", async () => {
    const providerA = new MockVisionStrategy("ProviderA", ["WASH_30"]);
    const providerB = new MockVisionStrategy("ProviderB", ["WASH_40"]);
    const service = new VisionRotatorService([providerA, providerB]);

    const result1 = await service.analyzeLabel("base64_image_1");
    expect(providerA.callCount).toBe(1);
    expect(providerB.callCount).toBe(0);
    expect(result1.steps[0].description).toContain("30°C");

    const result2 = await service.analyzeLabel("base64_image_2");
    expect(providerA.callCount).toBe(1);
    expect(providerB.callCount).toBe(1);
    expect(result2.steps[0].description).toContain("40°C");

    await service.analyzeLabel("base64_image_3");
    expect(providerA.callCount).toBe(2);
    expect(providerB.callCount).toBe(1);
  });

  it("fails over transparently to next provider when current provider encounters rate limit 429", async () => {
    const providerA = new MockVisionStrategy("ProviderA");
    providerA.shouldFail = true;
    providerA.failStatus = 429;

    const providerB = new MockVisionStrategy("ProviderB", ["IRON_110"]);
    const service = new VisionRotatorService([providerA, providerB]);

    const result = await service.analyzeLabel("base64_image");

    expect(providerA.callCount).toBe(1);
    expect(providerB.callCount).toBe(1);
    expect(result.steps[0].title).toBe("Passadoria");

    // Second call should skip providerA because it was put on cooldown
    await service.analyzeLabel("base64_image_next");
    expect(providerA.callCount).toBe(1);
    expect(providerB.callCount).toBe(2);
  });

  it("throws error when all providers fail", async () => {
    const providerA = new MockVisionStrategy("ProviderA");
    providerA.shouldFail = true;

    const service = new VisionRotatorService([providerA]);

    await expect(service.analyzeLabel("base64_image")).rejects.toThrow();
  });

  it("throws error when no provider is configured", async () => {
    const service = new VisionRotatorService([]);

    await expect(service.analyzeLabel("base64_image")).rejects.toThrow(
      "Nenhum provedor de visão gratuito está configurado",
    );
  });
});
