import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "expo-router";
import { View } from "react-native";

import { Button, Input, Screen, Text } from "@/components";
import { useAuth } from "@/contexts";

import { SignUpFormValues, signUpSchema } from "./validation";

export function SignUpScreen() {
  const router = useRouter();
  const { signUp } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const [authError, setAuthError] = useState<string | null>(null);
  const [pendingConfirmation, setPendingConfirmation] = useState(false);

  const onSubmit = handleSubmit(async ({ email, password }) => {
    setAuthError(null);
    setPendingConfirmation(false);
    try {
      const session = await signUp({ email, password });
      if (session) {
        router.replace("/(tabs)");
        return;
      }
      setPendingConfirmation(true);
    } catch (error) {
      setAuthError(getErrorMessage(error));
    }
  });

  return (
    <Screen scrollable>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text variant="h1" style={{ marginBottom: 8 }}>
          Crie sua conta
        </Text>
        <Text tone="secondary" style={{ marginBottom: 24 }}>
          Comece a usar o Lavo em poucos passos.
        </Text>

        <Controller
          control={control}
          name="email"
          render={({ field: { onBlur, onChange, value } }) => (
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
          render={({ field: { onBlur, onChange, value } }) => (
            <Input
              label="Senha"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.password?.message}
              textContentType="newPassword"
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onBlur, onChange, value } }) => (
            <Input
              label="Confirmar senha"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.confirmPassword?.message}
              textContentType="newPassword"
            />
          )}
        />

        {authError ? (
          <Text tone="error" style={{ marginBottom: 16 }}>
            {authError}
          </Text>
        ) : null}

        {pendingConfirmation ? (
          <Text tone="success" style={{ marginBottom: 16 }}>
            Confirme seu e-mail para finalizar o cadastro.
          </Text>
        ) : null}

        <Button label="Criar conta" onPress={onSubmit} loading={isSubmitting} />

        <View
          style={{
            flexDirection: "row",
            marginTop: 24,
            justifyContent: "center",
          }}
        >
          <Text tone="secondary">Já tem conta? </Text>
          <Link href="/(auth)/login">
            <Text tone="primary" style={{ textDecorationLine: "underline" }}>
              Entrar
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

  return "Não foi possível criar sua conta. Tente novamente.";
}
