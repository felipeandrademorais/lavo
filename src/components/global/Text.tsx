import type { TextProps as RNTextProps } from "react-native";
import { StyleSheet, Text as RNText } from "react-native";

import {
  typography,
  type ThemeColors,
  type TypographyToken,
} from "@/designSystem";
import { useThemeContext } from "@/contexts/ThemeContext";

type ColorToken = keyof ThemeColors;
type Tone = "default" | "secondary" | "primary" | "success" | "error";

export interface TextProps extends RNTextProps {
  variant?: TypographyToken;
  color?: ColorToken | string;
  tone?: Tone;
  align?: "left" | "center" | "right";
}

const toneColorMap: Record<Tone, ColorToken> = {
  default: "text",
  secondary: "textSecondary",
  primary: "primary",
  success: "success",
  error: "error",
};

export function Text({
  variant = "body",
  tone = "default",
  color,
  align = "left",
  style,
  children,
  ...rest
}: TextProps): JSX.Element {
  const { theme } = useThemeContext();
  const textStyles = typography[variant];

  const resolvedColor = (() => {
    if (color) {
      if (color in theme.colors) {
        return theme.colors[color as ColorToken];
      }
      return color;
    }
    const mappedTone = toneColorMap[tone];
    return theme.colors[mappedTone];
  })();

  return (
    <RNText
      style={StyleSheet.flatten([
        {
          color: resolvedColor,
          textAlign: align,
          fontSize: textStyles.fontSize,
          fontWeight: textStyles.fontWeight,
          lineHeight: textStyles.lineHeight,
        },
        style,
      ])}
      {...rest}
    >
      {children}
    </RNText>
  );
}
