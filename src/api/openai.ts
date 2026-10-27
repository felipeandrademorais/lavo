import axios from "axios";

const OPENAI_BASE_URL = "https://models.github.ai/inference";

let hasWarnedAboutMissingKey = false;

const getApiKey = () => {
  const key = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
  if (!key && !hasWarnedAboutMissingKey) {
    console.warn(
      "Missing EXPO_PUBLIC_OPENAI_API_KEY. OpenAI requests will fail until it is set.",
    );
    hasWarnedAboutMissingKey = true;
  }
  return key;
};

export const openaiClient = axios.create({
  baseURL: OPENAI_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

openaiClient.interceptors.request.use((config) => {
  const apiKey = getApiKey();
  if (apiKey) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    };
  }
  return config;
});

export type ChatContentPart =
  | { type: "text"; text: string }
  | { type: "image_url"; image_url: { url: string } };

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: ChatContentPart[];
};

export type ChatCompletionRequest = {
  model: string;
  messages: ChatMessage[];
  max_tokens?: number;
};

export type ChatCompletionResponse = {
  choices: {
    index: number;
    finish_reason: string;
    message: {
      role: string;
      content: string;
    };
  }[];
};

export async function createChatCompletion(payload: ChatCompletionRequest) {
  const { data } = await openaiClient.post<ChatCompletionResponse>(
    "/chat/completions",
    payload,
  );
  return data;
}
