# 🧺 Lavo — App de Cuidados com Roupas

O **Lavo** é um aplicativo mobile desenvolvido em **Expo (React Native)** que permite escanear **etiquetas de roupas** e receber **instruções detalhadas de lavagem**, utilizando a **API do ChatGPT (GPT-4-Vision)**.

## 🚀 Visão Geral

O usuário tira uma foto da etiqueta da roupa → o app envia a imagem para o ChatGPT → o modelo reconhece os símbolos e devolve uma explicação em linguagem natural.

## 🧩 Tecnologias Principais

- **Expo SDK 52+**
- **React Native + TypeScript**
- **expo-camera** – captura da imagem
- **expo-image-picker** – alternativa para escolher foto da galeria
- **Supabase** – autenticação de usuários
- **Axios** – comunicação HTTP com a API do ChatGPT
- **OpenAI GPT-4-Vision** – análise da imagem e geração de instruções
- **AsyncStorage** – persistência local de preferências (tema, onboarding visto)

## 🧱 Arquitetura

O projeto segue uma arquitetura modular e limpa:
```
src/
 ├── api/              # Clientes de API (OpenAI, Supabase)
 ├── components/       # Componentes globais e compostos
 ├── contexts/         # Providers (auth, tema)
 ├── designSystem/     # Tokens de tema, tipografia e espaçamento
 ├── features/         # Casos de uso (ex.: histórico de instruções)
 ├── hooks/            # Hooks personalizados
 ├── providers/        # Providers de alto nível
 ├── screens/          # Telas segmentadas por domínio
 ├── services/         # Lógica de integração com APIs
 ├── types/            # Tipagens compartilhadas
 └── utils/            # Funções auxiliares e testes unitários
```

## ⚙️ Configuração do Projeto

```bash
npx create-expo-app lavo --template expo-template-blank-typescript
cd lavo
npm install axios expo-camera expo-image-picker @supabase/supabase-js @react-native-async-storage/async-storage
```

### Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz:

```
EXPO_PUBLIC_OPENAI_API_KEY=sk-xxxxxx
EXPO_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=xxxxx
```

**Nota**: As variáveis `EXPO_PUBLIC_*` ficam acessíveis no runtime Expo Go.

---

## ▶️ Execução

```bash
npx expo start
```

Abra o app no **Expo Go** e teste o fluxo completo.

---

## 🧪 Qualidade

```bash
npm test              # executa testes unitários (ex.: parser de instruções)
npx expo lint --fix   # aplica correções automáticas de lint
```

> Sempre execute `npx expo lint --fix` após alterações para manter o padrão do projeto.

---

## 📸 Fluxo de Uso Completo

### Primeiro Acesso
1. **Telas de apresentação (Onboarding)**: Exibe informações sobre o app
2. **Tela de login/cadastro**: Autenticação via Supabase
3. **Tela inicial**: Botão central para capturar foto

### Uso Diário
1. **Tela inicial**: Botão redondo central na parte inferior
   - Ao clicar: abre a câmera para capturar etiqueta
2. **Captura de imagem**: Permissão de câmera → tirar foto
3. **Processamento**: Envio da imagem à API do ChatGPT
4. **Resultado**: Exibição das instruções de lavagem
5. **Configurações**: Acesso a temas (claro/escuro e cores relacionadas a lavanderia)

---

## 💬 Exemplo de resposta do ChatGPT

```
✅ Pode fazer:
- Lavar na máquina a até 40°C
- Usar sabão neutro
- Secar na máquina em temperatura baixa

❌ Não pode fazer:
- Não usar alvejante
- Não passar a ferro em temperatura alta

🧺 Passo a passo:
1. Lavagem: Coloque a peça na máquina com temperatura máxima de 40°C
2. Alvejamento: Não usar alvejante
3. Secagem: Seque na máquina em temperatura baixa
4. Passar: Passe a ferro em temperatura baixa
```

## 🎨 Identidade Visual

O app possui uma identidade visual relacionada com **lavanderia e limpeza**:
- **Cores principais**: Tons de azul claro, branco e azul-água (relacionados à água e limpeza)
- **Temas disponíveis**: Claro, Escuro e temas personalizados relacionados a lavanderia
- **Ícones**: Sabão, água, roupas, etc.
- **Tipografia**: Limpa e legível, priorizando clareza nas instruções

---


## 📄 Licença

MIT © 2025 Lavo