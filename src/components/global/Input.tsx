import { forwardRef, useMemo, useState } from "react";
import type { TextInputProps } from "react-native";
import { StyleSheet, TextInput, View } from "react-native";

import { spacing, type AppTheme } from "@/designSystem";
import { useTheme } from "@/contexts/ThemeContext";

import { Text } from "./Text";

export interface InputProps extends TextInputProps {
  label: string;
  helperText?: string;
  error?: string;
  secureToggle?: boolean;
}

export const Input = forwardRef<TextInput, InputProps>(function Input(
  {
    label,
    helperText,
    error,
    secureTextEntry,
    secureToggle = false,
    style,
    ...rest
  },
  ref,
) {
  const { theme } = useTheme();
  const [isSecure, setIsSecure] = useState(Boolean(secureTextEntry));

  const styles = useMemo(
    () => createStyles(theme, Boolean(error)),
    [theme, error],
  );

  return (
    <View style={styles.wrapper}>
      <Text variant="bodySmall" tone="secondary" style={styles.label}>
        {label}
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          ref={ref}
          placeholderTextColor={theme.colors.textSecondary}
          secureTextEntry={secureToggle ? isSecure : secureTextEntry}
          style={[styles.input, style]}
          {...rest}
        />
        {secureToggle ? (
          <Text
            variant="bodySmall"
            tone="primary"
            onPress={() => setIsSecure((prev) => !prev)}
          >
            {isSecure ? "Mostrar" : "Ocultar"}
          </Text>
        ) : null}
      </View>
      {error ? (
        <Text variant="caption" tone="error" style={styles.helper}>
          {error}
        </Text>
      ) : helperText ? (
        <Text variant="caption" tone="secondary" style={styles.helper}>
          {helperText}
        </Text>
      ) : null}
    </View>
  );
});

Input.displayName = "Input";

const createStyles = (theme: AppTheme, hasError: boolean) =>
  StyleSheet.create({
    wrapper: {
      width: "100%",
      marginBottom: theme.spacing.md,
    },
    label: {
      marginBottom: spacing.xs,
    },
    inputContainer: {
      borderWidth: 1,
      borderColor: hasError ? theme.colors.error : theme.colors.border,
      borderRadius: theme.radii.md,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      backgroundColor: theme.colors.surface,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      columnGap: theme.spacing.sm,
    },
    input: {
      flex: 1,
      color: theme.colors.text,
      fontSize: theme.typography.body.fontSize,
    },
    helper: {
      marginTop: theme.spacing.xs,
    },
  });
