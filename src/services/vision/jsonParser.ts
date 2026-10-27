import { SymbolDetectionResponse } from "./types";

export function extractSymbolsFromRawJson(rawText: string): string[] {
  try {
    const cleaned = rawText
      .replace(/```(?:json)?/gi, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned) as SymbolDetectionResponse;
    if (!Array.isArray(parsed.symbols)) {
      return [];
    }

    return parsed.symbols.filter(
      (item): item is string => typeof item === "string",
    );
  } catch {
    return [];
  }
}
