import { WashingStep } from "@/types";
import { CareSymbolCategory, CareSymbolDefinition } from "./types";

const CATEGORY_ORDER: readonly CareSymbolCategory[] = [
  "wash",
  "bleach",
  "dry",
  "iron",
  "dryClean",
];

export class SymbolCollection {
  private readonly definitions: readonly CareSymbolDefinition[];

  constructor(definitions: readonly CareSymbolDefinition[]) {
    this.definitions = deduplicateDefinitions(definitions);
  }

  public getAllowedRules(): string[] {
    const rules = this.definitions.flatMap(
      (definition) => definition.allowed as string[],
    );
    return Array.from(new Set(rules));
  }

  public getForbiddenRules(): string[] {
    const rules = this.definitions.flatMap(
      (definition) => definition.forbidden as string[],
    );
    return Array.from(new Set(rules));
  }

  public getOrderedSteps(): WashingStep[] {
    const sorted = [...this.definitions].sort(compareCategoryOrder);
    return sorted.map(toWashingStep);
  }

  public isEmpty(): boolean {
    return this.definitions.length === 0;
  }
}

function deduplicateDefinitions(
  items: readonly CareSymbolDefinition[],
): readonly CareSymbolDefinition[] {
  const seenIds = new Set<string>();
  const result: CareSymbolDefinition[] = [];

  for (const item of items) {
    if (seenIds.has(item.id)) {
      continue;
    }
    seenIds.add(item.id);
    result.push(item);
  }

  return result;
}

function compareCategoryOrder(
  first: CareSymbolDefinition,
  second: CareSymbolDefinition,
): number {
  const firstIndex = CATEGORY_ORDER.indexOf(first.category);
  const secondIndex = CATEGORY_ORDER.indexOf(second.category);
  return firstIndex - secondIndex;
}

function toWashingStep(definition: CareSymbolDefinition): WashingStep {
  return {
    title: definition.stepTitle,
    description: definition.stepDescription,
  };
}
