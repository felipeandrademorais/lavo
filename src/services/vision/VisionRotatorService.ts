import { DeterministicCareEngine } from "@/features/careSymbols";
import { WashingInstructions } from "@/types";
import { ProviderPool } from "./providerPool";
import {
  GeminiVisionStrategy,
  GithubModelsStrategy,
  GroqVisionStrategy,
} from "./strategies";
import { VisionStrategy } from "./types";

export class VisionRotatorService {
  private readonly pool: ProviderPool;
  private cursor = 0;

  constructor(strategies?: readonly VisionStrategy[]) {
    const configuredStrategies = strategies ?? createDefaultStrategies();
    this.pool = new ProviderPool(configuredStrategies);
  }

  public async analyzeLabel(base64Image: string): Promise<WashingInstructions> {
    if (!this.pool.hasAvailableProviders()) {
      throw new Error(
        "Nenhum provedor de visão gratuito está configurado. Configure ao menos uma chave de API no .env.",
      );
    }

    const detectedSymbols = await this.executeWithFailover(base64Image);
    return DeterministicCareEngine.buildInstructions(detectedSymbols);
  }

  private async executeWithFailover(base64Image: string): Promise<string[]> {
    const strategiesToTry = this.selectPrioritizedStrategies();
    let lastError: unknown;

    for (const strategy of strategiesToTry) {
      try {
        return await strategy.detectSymbols(base64Image);
      } catch (error) {
        lastError = error;
        this.handleProviderFailure(strategy.providerName, error);
      }
    }

    throw (
      lastError ??
      new Error("Falha ao analisar a etiqueta com os provedores disponíveis.")
    );
  }

  private selectPrioritizedStrategies(): VisionStrategy[] {
    const healthyStrategies = this.pool.getHealthyStrategies();
    const candidateList =
      healthyStrategies.length > 0
        ? healthyStrategies
        : [...this.pool.getAllConfiguredStrategies()];

    const startingIndex = this.cursor % candidateList.length;
    this.cursor = (this.cursor + 1) % candidateList.length;

    const reordered: VisionStrategy[] = [];
    for (let i = 0; i < candidateList.length; i += 1) {
      const index = (startingIndex + i) % candidateList.length;
      reordered.push(candidateList[index]);
    }

    return reordered;
  }

  private handleProviderFailure(providerName: string, error: unknown): void {
    const isRateLimited = checkIfRateLimited(error);
    const cooldownDuration = isRateLimited ? 60000 : 30000;
    this.pool.markCooldown(providerName, cooldownDuration);
  }
}

function checkIfRateLimited(error: unknown): boolean {
  if (!error || typeof error !== "object") {
    return false;
  }

  const maybeAxiosError = error as { response?: { status?: number } };
  return maybeAxiosError.response?.status === 429;
}

function createDefaultStrategies(): VisionStrategy[] {
  return [
    new GeminiVisionStrategy(),
    new GroqVisionStrategy(),
    new GithubModelsStrategy(),
  ];
}

export const defaultVisionRotator = new VisionRotatorService();
