import type { Theme, ThemeName } from "@/designSystem";

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme(): Promise<void>;
  setTheme(name: ThemeName): Promise<void>;
  loading: boolean;
  name: ThemeName;
}
