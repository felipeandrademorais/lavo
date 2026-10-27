import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  type PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { createTheme, type Theme, type ThemeName } from "@/designSystem";
import type { ThemeContextValue } from "@/types";
import { storageKeys } from "@/utils/storageKeys";

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: PropsWithChildren): JSX.Element {
  const [themeName, setThemeName] = useState<ThemeName>("light");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadPersistedTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem(storageKeys.theme);
        if (
          storedTheme &&
          (storedTheme === "light" || storedTheme === "dark")
        ) {
          if (isMounted) {
            setThemeName(storedTheme);
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadPersistedTheme();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(storageKeys.theme, themeName).catch(() => {
      /* no-op */
    });
  }, [themeName]);

  const toggleTheme = useCallback(async () => {
    setThemeName((previous) => (previous === "light" ? "dark" : "light"));
  }, []);

  const setTheme = useCallback(async (name: ThemeName) => {
    setThemeName(name);
  }, []);

  const theme = useMemo(() => createTheme(themeName), [themeName]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      toggleTheme,
      setTheme,
      loading,
      name: themeName,
    }),
    [loading, setTheme, theme, themeName, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useThemeContext = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

export const useAppTheme = (): Theme => {
  const { theme } = useThemeContext();
  return theme;
};

export const useThemeColors = () => useThemeContext().theme.colors;

export const useThemeLoading = () => useThemeContext().loading;

export const useToggleTheme = () => useThemeContext().toggleTheme;

export const useSetTheme = () => useThemeContext().setTheme;

export const useTheme = useThemeContext;
