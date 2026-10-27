import { useEffect, useState } from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

import { Button, Card, Screen, Text } from "@/components";
import { useTheme } from "@/contexts";
import { clearLastInstructions, getLastInstructions } from "@/features/history";
import { WashingInstructions } from "@/types";
import { AppTheme } from "@/designSystem";

type Params = {
  source?: string;
};

export function ResultScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<Params>();
  const { theme } = useTheme();
  const [instructions, setInstructions] = useState<WashingInstructions | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadInstructions = async () => {
      try {
        const data = await getLastInstructions();
        if (isMounted) {
          setInstructions(data);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadInstructions();

    return () => {
      isMounted = false;
    };
  }, [params.source]);

  if (loading) {
    return (
      <Screen>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text tone="secondary">Carregando instruções...</Text>
        </View>
      </Screen>
    );
  }

  if (!instructions) {
    return (
      <Screen>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text variant="h3" style={{ marginBottom: theme.spacing.md }}>
            Não encontramos instruções.
          </Text>
          <Text
            tone="secondary"
            style={{ marginBottom: theme.spacing.lg, textAlign: "center" }}
          >
            Capture uma nova etiqueta para gerar orientações de lavagem.
          </Text>
          <Button label="Escanear" onPress={() => router.replace("/camera")} />
        </View>
      </Screen>
    );
  }

  const formattedDate = new Date(instructions.createdAt).toLocaleString();

  return (
    <Screen scrollable style={{ gap: theme.spacing.lg }}>
      <View>
        <Text variant="h2" style={{ marginBottom: theme.spacing.sm }}>
          Instruções de lavagem
        </Text>
        <Text tone="secondary">Gerado em {formattedDate}</Text>
      </View>

      <Card>
        <SectionHeader
          icon="checkmark-circle"
          title="Pode fazer"
          description="Atividades liberadas para a peça"
          color={theme.colors.success}
        />
        {renderItems(instructions.allowed, theme)}
      </Card>

      <Card>
        <SectionHeader
          icon="close-circle"
          title="Não pode fazer"
          description="Evite estes cuidados"
          color={theme.colors.error}
        />
        {renderItems(instructions.forbidden, theme)}
      </Card>

      <Card>
        <SectionHeader
          icon="list-outline"
          title="Passo a passo"
          description="Siga estes passos na ordem"
          color={theme.colors.primary}
        />
        {instructions.steps.length ? (
          <View style={{ gap: theme.spacing.sm }}>
            {instructions.steps.map((step, index) => (
              <View key={`${step.title}-${index}`}>
                <Text variant="h3" style={{ marginBottom: 4 }}>
                  {index + 1}. {step.title}
                </Text>
                <Text tone="secondary">{step.description}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text tone="secondary">Nenhum passo detalhado informado.</Text>
        )}
      </Card>

      <Button label="Nova análise" onPress={() => router.replace("/camera")} />
      <Button
        label="Limpar histórico"
        variant="ghost"
        onPress={async () => {
          await clearLastInstructions();
          setInstructions(null);
        }}
      />
    </Screen>
  );
}

type SectionHeaderProps = {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
};

function SectionHeader({
  title,
  description,
  icon,
  color,
}: SectionHeaderProps) {
  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}
    >
      <Ionicons
        name={icon}
        size={24}
        color={color}
        style={{ marginRight: 12 }}
      />
      <View style={{ flex: 1 }}>
        <Text variant="h3" style={{ marginBottom: 2 }}>
          {title}
        </Text>
        <Text tone="secondary">{description}</Text>
      </View>
    </View>
  );
}

function renderItems(items: string[], theme: AppTheme) {
  if (!items.length) {
    return <Text tone="secondary">Nenhuma informação disponível.</Text>;
  }

  return (
    <View style={{ gap: theme.spacing.sm }}>
      {items.map((item) => (
        <Text key={item}>{`• ${item}`}</Text>
      ))}
    </View>
  );
}
