import { WashingInstructions } from "@/types";
import { CARE_SYMBOLS_CATALOG } from "./catalog";
import { SymbolCollection } from "./symbolCollection";
import { CareSymbolDefinition, CareSymbolId } from "./types";

export class DeterministicCareEngine {
  public static buildInstructions(
    detectedSymbolIds: readonly string[],
  ): WashingInstructions {
    const validDefinitions = resolveDefinitions(detectedSymbolIds);
    const collection = new SymbolCollection(validDefinitions);

    return {
      allowed: collection.getAllowedRules(),
      forbidden: collection.getForbiddenRules(),
      steps: collection.getOrderedSteps(),
      raw: JSON.stringify(detectedSymbolIds),
      createdAt: new Date().toISOString(),
    };
  }
}

function resolveDefinitions(
  candidateIds: readonly string[],
): CareSymbolDefinition[] {
  const result: CareSymbolDefinition[] = [];

  for (const candidateId of candidateIds) {
    const normalizedId = normalizeSymbolId(candidateId);
    const definition = CARE_SYMBOLS_CATALOG[normalizedId as CareSymbolId];
    if (!definition) {
      continue;
    }
    result.push(definition);
  }

  return result;
}

function normalizeSymbolId(rawId: string): string {
  return rawId.trim().toUpperCase().replace(/[-\s]/g, "_");
}
