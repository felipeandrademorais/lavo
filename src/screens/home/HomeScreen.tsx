import { useCallback, useState } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import { View } from "react-native";

import { Button, Card, Screen, Text } from "@/components";
import { useAuth, useTheme } from "@/contexts";
import { getLastInstructions } from "@/features/history";
import { WashingInstructions } from "@/types";

export function HomeScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { user } = useAuth();
  const [lastInstructions, setLastInstructions] =
    useState<WashingInstructions | null>(null);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const load = async () => {
        const data = await getLastInstructions();
        if (isActive) {
          setLastInstructions(data);
        }
      };

      void load();

      return () => {
        isActive = false;
      };
    }, []),
  );

  return (
    <Screen scrollable>
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View>
          <Text variant="h2" style={{ marginBottom: theme.spacing.sm }}>
            Olá, {user?.email?.split("@")[0] ?? "bem-vindo"}
          </Text>
          <Text tone="secondary" style={{ marginBottom: theme.spacing.lg }}>
            Prepare-se para traduzir símbolos de lavagem em cuidados
            personalizados.
          </Text>

          <Card style={{ marginBottom: theme.spacing.lg }}>
            <Text variant="h3" style={{ marginBottom: theme.spacing.md }}>
              Última análise
            </Text>
            {lastInstructions ? (
              <View>
                <Text
                  tone="secondary"
                  style={{ marginBottom: theme.spacing.sm }}
                >
                  {new Date(lastInstructions.createdAt).toLocaleDateString()}
                </Text>
                <Text style={{ marginBottom: theme.spacing.sm }}>
                  ✅ Pode fazer:
                </Text>
                {renderList(lastInstructions.allowed)}
                <Text
                  style={{
                    marginTop: theme.spacing.md,
                    marginBottom: theme.spacing.sm,
                  }}
                >
                  ❌ Não pode fazer:
                </Text>
                {renderList(lastInstructions.forbidden)}
                <Button
                  label="Ver instruções completas"
                  variant="secondary"
                  fullWidth={false}
                  style={{
                    marginTop: theme.spacing.lg,
                    alignSelf: "flex-start",
                  }}
                  onPress={() =>
                    router.push({
                      pathname: "/camera/result",
                      params: { source: "history" },
                    })
                  }
                />
              </View>
            ) : (
              <Text tone="secondary">
                Ainda não analisamos nenhuma etiqueta. Toque abaixo para
                começar.
              </Text>
            )}
          </Card>
        </View>

        <View style={{ alignItems: "center" }}>
          <Button
            label="Escanear etiqueta"
            onPress={() => router.push("/camera")}
            fullWidth
          />
        </View>
      </View>
    </Screen>
  );
}

function renderList(items: string[]) {
  if (!items.length) {
    return <Text tone="secondary">Sem informações salvas.</Text>;
  }

  return (
    <View>
      {items.slice(0, 3).map((item) => (
        <Text key={item} tone="secondary" style={{ marginBottom: 4 }}>
          • {item}
        </Text>
      ))}
    </View>
  );
}
