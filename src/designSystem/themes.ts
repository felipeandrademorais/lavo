import { spacing, type SpacingScale } from "./spacing";
import { typography, type TypographyScale } from "./typography";

export type ThemeName = "light" | "dark";

export type ThemeColors = {
  primary: string;
  background: string;
  surface: string;
  surfaceSecondary: string;
  text: string;
  textSecondary: string;
  success: string;
  error: string;
  border: string;
  overlay: string;
};

export type ThemeRadii = {
  sm: number;
  md: number;
  lg: number;
  pill: number;
  full: number;
};

export type ThemeElevation = {
  none: number;
  sm: number;
  md: number;
  lg: number;
};

export type AppTheme = {
  name: ThemeName;
  colors: ThemeColors;
  spacing: SpacingScale;
  typography: TypographyScale;
  radii: ThemeRadii;
  elevation: ThemeElevation;
};

const baseTheme = {
  spacing,
  typography,
  radii: {
    sm: 8,
    md: 16,
    lg: 24,
    pill: 999,
    full: 9999,
  },
  elevation: {
    none: 0,
    sm: 2,
    md: 4,
    lg: 8,
  },
} satisfies Omit<AppTheme, "name" | "colors">;

export const lightTheme: AppTheme = {
  name: "light",
  colors: {
    primary: "#4A90E2",
    background: "#FFFFFF",
    surface: "#F5F9FC",
    surfaceSecondary: "#EEF4FA",
    text: "#2C3E50",
    textSecondary: "#7F8C8D",
    success: "#27AE60",
    error: "#E74C3C",
    border: "#E1E8F0",
    overlay: "rgba(41, 65, 92, 0.08)",
  },
  ...baseTheme,
};

export const darkTheme: AppTheme = {
  name: "dark",
  colors: {
    primary: "#5FB3D3",
    background: "#1A1F2E",
    surface: "#252A3A",
    surfaceSecondary: "#2F384D",
    text: "#ECF0F1",
    textSecondary: "#BDC3C7",
    success: "#2ECC71",
    error: "#E74C3C",
    border: "#3A4460",
    overlay: "rgba(9, 17, 30, 0.32)",
  },
  ...baseTheme,
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
} satisfies Record<ThemeName, AppTheme>;

export const createTheme = (name: ThemeName): AppTheme => themes[name];

export type Theme = AppTheme;
