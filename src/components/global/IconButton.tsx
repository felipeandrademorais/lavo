import type { ReactNode } from "react";
import { Pressable, StyleSheet, type PressableProps } from "react-native";

import { spacing, type ThemeColors } from "@/designSystem";
import { useThemeContext } from "@/contexts/ThemeContext";

export interface IconButtonProps extends PressableProps {
  icon: ReactNode;
  size?: number;
  variant?: "primary" | "surface" | "transparent";
}

export function IconButton({
  icon,
  size = 48,
  variant = "primary",
  style,
  ...rest
}: IconButtonProps): JSX.Element {
  const { theme } = useThemeContext();

  const { backgroundColor, borderColor } = getVariantTokens(
    theme.colors,
    variant,
  );

  return (
    <Pressable
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.base,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
          borderColor,
          opacity: pressed ? 0.9 : 1,
        },
        style,
      ]}
      {...rest}
    >
      {icon}
    </Pressable>
  );
}

const getVariantTokens = (
  colors: ThemeColors,
  variant: IconButtonProps["variant"],
) => {
  switch (variant) {
    case "surface":
      return {
        backgroundColor: colors.surface,
        borderColor: colors.border,
      };
    case "transparent":
      return {
        backgroundColor: "transparent",
        borderColor: "transparent",
      };
    default:
      return {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
      };
  }
};

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    borderWidth: 1,
    justifyContent: "center",
    padding: spacing.sm,
  },
});
