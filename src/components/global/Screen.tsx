import type { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, type ViewProps, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { spacing } from "@/designSystem";
import { useThemeContext } from "@/contexts/ThemeContext";

export interface ScreenProps extends ViewProps {
  scrollable?: boolean;
  safeAreaEdges?: Parameters<typeof SafeAreaView>[0]["edges"];
}

export function Screen({
  children,
  style,
  scrollable = false,
  safeAreaEdges = ["top", "bottom"],
  ...rest
}: PropsWithChildren<ScreenProps>): JSX.Element {
  const { theme } = useThemeContext();

  const containerStyles = StyleSheet.flatten([
    styles.container,
    { backgroundColor: theme.colors.background },
    style,
  ]);

  const content = scrollable ? (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      {...rest}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={styles.content} {...rest}>
      {children}
    </View>
  );

  return (
    <SafeAreaView edges={safeAreaEdges} style={containerStyles}>
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
});
