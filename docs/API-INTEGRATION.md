# 🔌 Integração com APIs — Projeto Lavo

## 🤖 Integração com OpenAI

### 📝 Prompt

O prompt enviado ao ChatGPT junto com a imagem:

```
Você é um assistente especializado em lavanderia e cuidados com roupas.

Analise a imagem da etiqueta de roupa e forneça:

1. ✅ Pode fazer: (ações permitidas)
2. ❌ Não pode fazer: (ações proibidas)
3. 🧺 Passo a passo: (como lavar a peça)

Formato:
✅ Pode fazer:
- ...

❌ Não pode fazer:
- ...

🧺 Passo a passo:
1. Lavagem: ...
2. Alvejamento: ...
3. Secagem: ...
4. Passar: ...
```

### 🔧 Implementação

```ts
// services/chatgptService.ts
import axios from "axios";

const PROMPT = `Você é um assistente especializado em lavanderia...`;

export async function analyzeClothingLabel(base64Image: string) {
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: PROMPT },
            {
              type: "image_url",
              image_url: { url: `data:image/jpeg;base64,${base64Image}` },
            },
          ],
        },
      ],
      max_tokens: 1000,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].message.content;
}
```

### 📨 Formato de Resposta

O ChatGPT retorna um **texto formatado**:

```
✅ Pode fazer:
- Lavar na máquina a até 40°C
- Usar sabão neutro

❌ Não pode fazer:
- Não usar alvejante

🧺 Passo a passo:
1. Lavagem: Coloque na máquina a 40°C
2. Alvejamento: Não usar alvejante
...
```

### 🔄 Parser

```ts
// utils/parseInstructions.ts

export interface ParsedInstructions {
  allowed: string[];
  forbidden: string[];
  steps: Array<{ number: number; title: string; description: string }>;
}

export function parseChatGPTResponse(text: string): ParsedInstructions {
  // Implementação do parser
  // Extrai seções: ✅, ❌, 🧺
  // ...
}
```

---

## ☁️ Integração com Supabase

### 🔐 Autenticação

```ts
// services/supabaseService.ts
import { supabase } from "@/api/supabase";

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
```

### ⚙️ Configuração

```ts
// api/supabase.ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
);
```

---

## 🧱 Variáveis de Ambiente

`.env`:
```
EXPO_PUBLIC_OPENAI_API_KEY=sk-xxxxxx
EXPO_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=xxxxx
```
