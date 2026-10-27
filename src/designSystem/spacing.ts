export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export type SpacingScale = typeof spacing;
export type SpacingToken = keyof SpacingScale;

export const getSpacing = (token: SpacingToken): number => spacing[token];
