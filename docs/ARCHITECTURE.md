# 🧠 Arquitetura do Projeto Lavo

## 🧭 Visão Geral

O **Lavo** segue uma arquitetura modular e simples, organizada por responsabilidades:

```
src/
 ├── api/              # Clientes de API
 │    ├── openai.ts    # Cliente OpenAI
 │    └── supabase.ts  # Cliente Supabase
 ├── services/         # Lógica de integração
 │    ├── chatgptService.ts    # Análise de imagem
 │    └── supabaseService.ts   # Autenticação
 ├── screens/          # Telas do app
 │    ├── onboarding/
 │    ├── auth/
 │    ├── home/
 │    ├── camera/
 │    └── settings/
 ├── components/       # Componentes reutilizáveis
 ├── contexts/         # Estado global
 │    ├── AuthContext.tsx
 │    └── ThemeContext.tsx
 ├── types/            # Tipagens
 └── utils/            # Funções auxiliares
```

---

## 🔄 Fluxo Principal

### Autenticação
```
Onboarding → Login/SignUp → Supabase Auth → Home
```

### Análise de Etiqueta
```
Home → Camera → Captura Imagem → ChatGPT API → 
Parser → Instruções → ResultScreen
```

---

## 🧩 Componentes Principais

### Services

**`chatgptService.ts`**: Envia imagem para ChatGPT e parseia a resposta

**`supabaseService.ts`**: Gerencia autenticação via Supabase

### Contexts

**`AuthContext.tsx`**: Estado de autenticação global

**`ThemeContext.tsx`**: Gerenciamento de temas

---

## 📝 Princípios

- **Separação de responsabilidades**: Cada módulo tem uma função clara
- **Reutilização**: Componentes e hooks reutilizáveis
- **Simplicidade**: Código limpo e fácil de entender
