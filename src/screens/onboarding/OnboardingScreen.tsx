import { useRef, useState } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { Button, Card, Screen, Text } from "@/components";
import { useTheme } from "@/contexts";
import { useOnboardingStatus } from "@/hooks";

type Slide = {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const slides: Slide[] = [
  {
    id: "capture",
    title: "Decode Etiquetas",
    description:
      "Fotografe a etiqueta da roupa e receba instruções claras do que pode ou não fazer.",
    icon: "camera",
  },
  {
    id: "assist",
    title: "Assistente Inteligente",
    description:
      "O Lavo interpreta símbolos e traduz em passos simples de lavagem.",
    icon: "bulb-outline",
  },
  {
    id: "organize",
    title: "Cuidados Personalizados",
    description:
      "Salve instruções recentes e acompanhe o histórico do que já foi analisado.",
    icon: "shirt-outline",
  },
];

export function OnboardingScreen() {
  const router = useRouter();
  const listRef = useRef<FlatList<Slide>>(null);
  const { theme } = useTheme();
  const { markCompleted } = useOnboardingStatus();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleMomentumEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const nextIndex = Math.round(
      event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width,
    );
    setCurrentIndex(nextIndex);
  };

  const handleNext = async () => {
    if (currentIndex < slides.length - 1) {
      const next = currentIndex + 1;
      setCurrentIndex(next);
      listRef.current?.scrollToIndex({ index: next, animated: true });
      return;
    }

    await markCompleted();
    router.replace("/(auth)/login");
  };

  return (
    <Screen scrollable={false}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <FlatList
          ref={listRef}
          data={slides}
          keyExtractor={(slide) => slide.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleMomentumEnd}
          renderItem={({ item }) => (
            <View style={{ width: "100%", paddingVertical: theme.spacing.xl }}>
              <Card style={{ alignItems: "center" }}>
                <View
                  style={{
                    width: 96,
                    height: 96,
                    borderRadius: 48,
                    backgroundColor: theme.colors.surfaceSecondary,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: theme.spacing.lg,
                  }}
                >
                  <Ionicons
                    name={item.icon}
                    size={44}
                    color={theme.colors.primary}
                  />
                </View>
                <Text
                  variant="h2"
                  align="center"
                  style={{ marginBottom: theme.spacing.md }}
                >
                  {item.title}
                </Text>
                <Text align="center" tone="secondary">
                  {item.description}
                </Text>
              </Card>
            </View>
          )}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: theme.spacing.lg,
          }}
        >
          {slides.map((slide, index) => (
            <View
              key={slide.id}
              style={{
                width: index === currentIndex ? 24 : 8,
                height: 8,
                borderRadius: 4,
                backgroundColor:
                  index === currentIndex
                    ? theme.colors.primary
                    : theme.colors.border,
                marginHorizontal: 4,
              }}
            />
          ))}
        </View>
        <Button
          label={currentIndex === slides.length - 1 ? "Começar" : "Próximo"}
          onPress={handleNext}
        />
      </View>
    </Screen>
  );
}
