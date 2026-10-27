import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useRouter } from "expo-router";

import { Text } from "@/components";
import { useAuth, useTheme } from "@/contexts";
import { useOnboardingStatus } from "@/hooks";

export default function Index() {
  const router = useRouter();
  const { status } = useAuth();
  const { completed } = useOnboardingStatus();
  const { theme } = useTheme();

  useEffect(() => {
    if (completed === null || status === "loading") {
      return;
    }

    const target = !completed
      ? "/(auth)/onboarding"
      : status === "authenticated"
        ? "/(tabs)"
        : "/(auth)/login";

    router.replace(target);
  }, [completed, router, status]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.background,
      }}
    >
      <ActivityIndicator
        color={theme.colors.primary}
        style={{ marginBottom: theme.spacing.md }}
      />
      <Text tone="secondary">Preparando sua experiência...</Text>
    </View>
  );
}
