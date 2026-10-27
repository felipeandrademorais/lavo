import { useState } from "react";
import { Switch, View } from "react-native";

import { Button, Card, Screen, Text } from "@/components";
import { useAuth, useTheme } from "@/contexts";
import { useOnboardingStatus } from "@/hooks";

export function SettingsScreen() {
  const { user, signOut } = useAuth();
  const { name, setTheme, toggleTheme, theme } = useTheme();
  const { reset: resetOnboarding } = useOnboardingStatus();
  const [signingOut, setSigningOut] = useState(false);

  const isDark = name === "dark";

  const handleThemeToggle = async () => {
    await toggleTheme();
  };

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await signOut();
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <Screen scrollable style={{ gap: theme.spacing.lg }}>
      <Card>
        <Text variant="h2" style={{ marginBottom: theme.spacing.md }}>
          Conta
        </Text>
        <Text tone="secondary">E-mail</Text>
        <Text style={{ marginBottom: theme.spacing.md }}>{user?.email}</Text>
        <Button
          label="Sair"
          variant="secondary"
          onPress={handleSignOut}
          loading={signingOut}
        />
      </Card>

      <Card>
        <Text variant="h2" style={{ marginBottom: theme.spacing.md }}>
          Aparência
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text variant="h3">Tema escuro</Text>
            <Text tone="secondary">Alterna entre tema claro e escuro</Text>
          </View>
          <Switch
            value={isDark}
            onValueChange={(value) => {
              void setTheme(value ? "dark" : "light");
            }}
            trackColor={{
              true: theme.colors.primary,
              false: theme.colors.border,
            }}
            thumbColor={theme.colors.surface}
          />
        </View>
        <Button
          label="Alternar tema"
          variant="ghost"
          onPress={handleThemeToggle}
          style={{ marginTop: theme.spacing.md, alignSelf: "flex-start" }}
          fullWidth={false}
        />
      </Card>

      <Card>
        <Text variant="h2" style={{ marginBottom: theme.spacing.md }}>
          Experiência
        </Text>
        <Text tone="secondary" style={{ marginBottom: theme.spacing.md }}>
          Refaça o onboarding para rever as instruções iniciais.
        </Text>
        <Button
          label="Reiniciar onboarding"
          variant="ghost"
          onPress={() => resetOnboarding()}
          fullWidth={false}
        />
      </Card>
    </Screen>
  );
}
