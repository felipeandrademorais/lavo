import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

import { AppTheme } from "@/designSystem";
import { useTheme } from "@/contexts/ThemeContext";

type Props = {
  onPress: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
};

export function CameraCaptureButton({
  onPress,
  disabled = false,
  variant = "primary",
}: Props) {
  const { theme } = useTheme();
  const styles = getStyles(theme, variant, disabled);

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <View style={styles.innerRing}>
        <View style={styles.iconContainer}>
          <Ionicons name="camera" size={28} color={styles.iconColor} />
        </View>
      </View>
    </Pressable>
  );
}

function getStyles(
  theme: AppTheme,
  variant: "primary" | "secondary",
  disabled: boolean,
) {
  const baseColor =
    variant === "primary" ? theme.colors.primary : theme.colors.surface;
  const iconColor =
    variant === "primary" ? theme.colors.background : theme.colors.text;

  return {
    container: {
      width: 88,
      height: 88,
      borderRadius: 44,
      backgroundColor: baseColor,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      elevation: theme.elevation.lg,
      shadowColor: theme.colors.overlay,
      shadowOpacity: 0.2,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 8 },
      opacity: disabled ? 0.6 : 1,
    },
    innerRing: {
      width: 78,
      height: 78,
      borderRadius: 39,
      borderWidth: 2,
      borderColor:
        variant === "primary" ? "rgba(255,255,255,0.35)" : theme.colors.border,
      alignItems: "center" as const,
      justifyContent: "center" as const,
    },
    iconContainer: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor:
        variant === "primary"
          ? "rgba(255,255,255,0.2)"
          : theme.colors.surfaceSecondary,
      alignItems: "center" as const,
      justifyContent: "center" as const,
    },
    iconColor,
    pressed: {
      transform: [{ scale: 0.97 }],
    },
  } as const;
}
