import type { ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  type PressableProps,
  View,
} from "react-native";

import { spacing, type ThemeColors } from "@/designSystem";
import { useThemeContext } from "@/contexts/ThemeContext";

import { Text } from "./Text";

type ButtonVariant = "primary" | "secondary" | "ghost";

export interface ButtonProps extends PressableProps {
  label: string;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  trailingIcon?: ReactNode;
}

export function Button({
  label,
  variant = "primary",
  fullWidth = true,
  loading = false,
  disabled,
  icon,
  trailingIcon,
  style,
  ...rest
}: ButtonProps): JSX.Element {
  const { theme } = useThemeContext();

  const { backgroundColor, borderColor, textColorKey } = getVariantTokens(
    theme.colors,
    variant,
  );

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor,
          borderColor,
          opacity: pressed || loading ? 0.9 : 1,
          alignSelf: fullWidth ? "stretch" : "flex-start",
        },
        style,
      ]}
      {...rest}
    >
      <View style={styles.content}>
        {icon ? <View style={styles.icon}>{icon}</View> : null}
        <Text variant="body" color={textColorKey} align="center">
          {label}
        </Text>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={theme.colors[textColorKey]}
            style={styles.loader}
          />
        ) : trailingIcon ? (
          <View style={styles.icon}>{trailingIcon}</View>
        ) : null}
      </View>
    </Pressable>
  );
}

const getVariantTokens = (colors: ThemeColors, variant: ButtonVariant) => {
  switch (variant) {
    case "secondary":
      return {
        backgroundColor: colors.surface,
        borderColor: colors.border,
        textColorKey: "text" as const,
      };
    case "ghost":
      return {
        backgroundColor: "transparent",
        borderColor: "transparent",
        textColorKey: "primary" as const,
      };
    default:
      return {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
        textColorKey: "background" as const,
      };
  }
};

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: spacing.lg,
    borderWidth: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minHeight: 52,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: spacing.sm,
  },
  icon: {
    marginHorizontal: spacing.xs,
  },
  loader: {
    marginLeft: spacing.xs,
  },
});
