export interface VisionStrategy {
  readonly providerName: string;
  isAvailable(): boolean;
  detectSymbols(base64Image: string): Promise<string[]>;
}

export type SymbolDetectionResponse = {
  symbols?: string[];
};

export const ALLOWED_CARE_SYMBOL_IDS: readonly string[] = [
  "WASH_30",
  "WASH_40",
  "WASH_60",
  "WASH_95",
  "WASH_HAND",
  "NO_WASH",
  "BLEACH_ANY",
  "BLEACH_NON_CHLORINE",
  "NO_BLEACH",
  "TUMBLE_NORMAL",
  "TUMBLE_LOW",
  "NO_TUMBLE",
  "LINE_DRY",
  "FLAT_DRY",
  "DRIP_DRY",
  "DRY_IN_SHADE",
  "IRON_110",
  "IRON_150",
  "IRON_200",
  "NO_IRON",
  "DRY_CLEAN_P",
  "DRY_CLEAN_F",
  "WET_CLEAN",
  "NO_DRY_CLEAN",
];

export const VISION_DETECTION_PROMPT = `You are a computer vision assistant that detects clothing care label symbols (ISO 3758).
Identify all care symbols present in the clothing label image.
Select only from the allowed symbol IDs:
${ALLOWED_CARE_SYMBOL_IDS.join(", ")}

Respond with valid JSON only in this exact format:
{"symbols": ["WASH_40", "NO_BLEACH"]}

If no symbols are clearly recognized or the image is not a care label, respond with:
{"symbols": []}`;
