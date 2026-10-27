export type CareSymbolCategory =
  | "wash"
  | "bleach"
  | "dry"
  | "iron"
  | "dryClean";

export type CareSymbolId =
  | "WASH_30"
  | "WASH_40"
  | "WASH_60"
  | "WASH_95"
  | "WASH_HAND"
  | "NO_WASH"
  | "BLEACH_ANY"
  | "BLEACH_NON_CHLORINE"
  | "NO_BLEACH"
  | "TUMBLE_NORMAL"
  | "TUMBLE_LOW"
  | "NO_TUMBLE"
  | "LINE_DRY"
  | "FLAT_DRY"
  | "DRIP_DRY"
  | "DRY_IN_SHADE"
  | "IRON_110"
  | "IRON_150"
  | "IRON_200"
  | "NO_IRON"
  | "DRY_CLEAN_P"
  | "DRY_CLEAN_F"
  | "WET_CLEAN"
  | "NO_DRY_CLEAN";

export type CareSymbolDefinition = {
  readonly id: CareSymbolId;
  readonly category: CareSymbolCategory;
  readonly label: string;
  readonly allowed: readonly string[];
  readonly forbidden: readonly string[];
  readonly stepTitle: string;
  readonly stepDescription: string;
};
