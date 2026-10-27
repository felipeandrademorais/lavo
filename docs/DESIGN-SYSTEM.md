# 🎨 Design System — Projeto Lavo

## 🎨 Paleta de Cores

### Tema Claro

```ts
export const lightTheme = {
  primary: "#4A90E2",        // Azul principal
  background: "#FFFFFF",     // Branco
  surface: "#F5F9FC",        // Azul muito claro
  text: "#2C3E50",           // Cinza escuro
  textSecondary: "#7F8C8D",  // Cinza médio
  success: "#27AE60",        // Verde
  error: "#E74C3C",          // Vermelho
};
```

### Tema Escuro

```ts
export const darkTheme = {
  primary: "#5FB3D3",        // Azul turquesa
  background: "#1A1F2E",     // Azul muito escuro
  surface: "#252A3A",        // Azul escuro
  text: "#ECF0F1",           // Branco suave
  textSecondary: "#BDC3C7",  // Cinza claro
  success: "#2ECC71",        // Verde claro
  error: "#E74C3C",          // Vermelho
};
```

---

## 🔤 Tipografia

```ts
export const typography = {
  h1: { fontSize: 32, fontWeight: "bold" },
  h2: { fontSize: 24, fontWeight: "bold" },
  h3: { fontSize: 20, fontWeight: "600" },
  body: { fontSize: 16, fontWeight: "normal" },
  bodySmall: { fontSize: 14 },
  caption: { fontSize: 12 },
};
```

---

## 🧩 Componentes

### Botão de Câmera (Circular Central)

```ts
const cameraButtonStyle = {
  width: 70,
  height: 70,
  borderRadius: 35,
  backgroundColor: theme.primary,
  elevation: 8,
};
```

---

## 🎯 Espaçamento

```ts
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};
```

---

## 🖼️ Ícones

Use `@expo/vector-icons` (Ionicons):

- Câmera: `camera-outline`, `camera`
- Configurações: `settings-outline`
- Lavagem: `water`, `shirt-outline`
- Sucesso: `checkmark-circle`
