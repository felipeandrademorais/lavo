import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "expo-router";
import { View } from "react-native";

import { Button, Input, Screen, Text } from "@/components";
import { useAuth } from "@/contexts";

import { LoginFormValues, loginSchema } from "./validation";

export function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const [authError, setAuthError] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (values) => {
    setAuthError(null);
    try {
      await signIn(values);
      router.replace("/(tabs)");
    } catch (error) {
      setAuthError(getErrorMessage(error));
    }
  });

  return (
    <Screen scrollable>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text variant="h1" style={{ marginBottom: 8 }}>
          Bem-vindo de volta
        </Text>
        <Text tone="secondary" style={{ marginBottom: 24 }}>
          Acesse sua conta para continuar cuidando das suas roupas.
        </Text>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.email?.message}
              textContentType="emailAddress"
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Senha"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.password?.message}
              textContentType="password"
            />
          )}
        />

        {authError ? (
          <Text tone="error" style={{ marginBottom: 16 }}>
            {authError}
          </Text>
        ) : null}

        <Button label="Entrar" onPress={onSubmit} loading={isSubmitting} />

        <View
          style={{
            flexDirection: "row",
            marginTop: 24,
            justifyContent: "center",
          }}
        >
          <Text tone="secondary">Ainda não tem conta? </Text>
          <Link href="/(auth)/signup">
            <Text tone="primary" style={{ textDecorationLine: "underline" }}>
              Criar conta
            </Text>
          </Link>
        </View>
      </View>
    </Screen>
  );
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Não foi possível realizar o login. Tente novamente.";
}
