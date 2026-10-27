import { Link, Stack } from "expo-router";
import { View } from "react-native";

import { Button, Screen, Text } from "@/components";
import { useTheme } from "@/contexts";

export default function NotFoundScreen() {
  const { theme } = useTheme();

  return (
    <Screen>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text variant="h2" style={{ marginBottom: theme.spacing.md }}>
          Tela não encontrada
        </Text>
        <Text
          tone="secondary"
          style={{ marginBottom: theme.spacing.lg, textAlign: "center" }}
        >
          O caminho acessado não existe. Volte para a página inicial e tente
          novamente.
        </Text>
        <Link href="/(tabs)" asChild>
          <Button label="Voltar para início" />
        </Link>
      </View>
    </Screen>
  );
}
