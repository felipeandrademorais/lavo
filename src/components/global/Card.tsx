import type { PropsWithChildren } from "react";
import { StyleSheet, View, type ViewProps } from "react-native";

import { spacing } from "@/designSystem";
import { useThemeContext } from "@/contexts/ThemeContext";

export interface CardProps extends ViewProps {
  elevated?: boolean;
}

export function Card({
  children,
  elevated = false,
  style,
  ...rest
}: PropsWithChildren<CardProps>): JSX.Element {
  const { theme } = useThemeContext();

  return (
    <View
      style={StyleSheet.flatten([
        styles.base,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
        elevated && styles.elevated,
        style,
      ])}
      {...rest}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: spacing.lg,
    padding: spacing.lg,
    borderWidth: 1,
  },
  elevated: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
  },
});
