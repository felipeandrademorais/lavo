# 🧱 Estrutura de Código — Projeto Lavo

## 📁 Estrutura de Pastas

```
src/
 ├── api/                  # Clientes de API
 │    ├── openai.ts
 │    └── supabase.ts
 ├── services/             # Lógica de integração
 │    ├── chatgptService.ts
 │    └── supabaseService.ts
 ├── screens/              # Telas
 │    ├── onboarding/OnboardingScreen.tsx
 │    ├── auth/LoginScreen.tsx
 │    ├── auth/SignUpScreen.tsx
 │    ├── home/HomeScreen.tsx
 │    ├── camera/CameraScreen.tsx
 │    ├── camera/ResultScreen.tsx
 │    └── settings/SettingsScreen.tsx
 ├── components/           # Componentes reutilizáveis
 │    ├── ui/Button.tsx
 │    ├── CameraButton.tsx
 │    └── ThemeToggle.tsx
 ├── contexts/             # Context API
 │    ├── AuthContext.tsx
 │    └── ThemeContext.tsx
 ├── types/                # Tipagens
 │    ├── User.ts
 │    └── WashingInstructions.ts
 └── utils/                # Funções auxiliares
      ├── parseInstructions.ts
      └── imageUtils.ts
```

---

## 🧩 Componentes Principais

### HomeScreen

```tsx
import { CameraButton } from "@/components/CameraButton";

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Bem-vindo ao Lavo</Text>
      <CameraButton onPress={() => navigation.navigate("Camera")} />
    </View>
  );
}
```

### CameraScreen

```tsx
import { CameraView } from "expo-camera";
import { analyzeClothingLabel } from "@/services/chatgptService";

export default function CameraScreen({ navigation }) {
  const handleCapture = async (photo) => {
    const instructions = await analyzeClothingLabel(photo.base64);
    navigation.navigate("Result", { instructions });
  };

  return <CameraView onPictureSaved={handleCapture} />;
}
```

---

## 📘 Navegação

Utilize **Expo Router**:

```
app/
 ├── (auth)/
 │    ├── onboarding.tsx
 │    ├── login.tsx
 │    └── signup.tsx
 ├── (tabs)/
 │    ├── index.tsx      # HomeScreen
 │    └── settings.tsx
 └── camera/
      ├── index.tsx      # CameraScreen
      └── result.tsx     # ResultScreen
```

---

## 🎯 Boas Práticas

- Use **TypeScript** com tipagem rigorosa
- Componentes pequenos e focados
- Separação de lógica de negócio (services) e UI (screens)
- Reutilize componentes e hooks
