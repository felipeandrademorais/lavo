import { VisionStrategy } from "./types";

export class ProviderPool {
  private readonly strategies: readonly VisionStrategy[];
  private readonly cooldowns: Map<string, number>;

  constructor(strategies: readonly VisionStrategy[]) {
    this.strategies = strategies.filter((strategy) => strategy.isAvailable());
    this.cooldowns = new Map<string, number>();
  }

  public getHealthyStrategies(): VisionStrategy[] {
    const now = Date.now();
    return this.strategies.filter(
      (strategy) => !this.isStrategyInCooldown(strategy.providerName, now),
    );
  }

  public getAllConfiguredStrategies(): readonly VisionStrategy[] {
    return this.strategies;
  }

  public markCooldown(
    providerName: string,
    durationMilliseconds = 60000,
  ): void {
    const expiryTimestamp = Date.now() + durationMilliseconds;
    this.cooldowns.set(providerName, expiryTimestamp);
  }

  public isStrategyInCooldown(
    providerName: string,
    currentTimestamp = Date.now(),
  ): boolean {
    const cooldownExpiry = this.cooldowns.get(providerName);
    if (!cooldownExpiry) {
      return false;
    }

    if (currentTimestamp > cooldownExpiry) {
      this.cooldowns.delete(providerName);
      return false;
    }

    return true;
  }

  public hasAvailableProviders(): boolean {
    return this.strategies.length > 0;
  }
}
