import axios from "axios";
import { extractSymbolsFromRawJson } from "../jsonParser";
import { VISION_DETECTION_PROMPT, VisionStrategy } from "../types";

const GROQ_MODEL = "llama-3.2-11b-vision-preview";
const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";

type ChatChoice = { message?: { content?: string } };
type ChatResponse = { choices?: ChatChoice[] };

export class GroqVisionStrategy implements VisionStrategy {
  public readonly providerName = "Groq Cloud";
  private readonly apiKey: string | undefined;

  constructor(apiKey?: string) {
    this.apiKey = apiKey ?? process.env.EXPO_PUBLIC_GROQ_API_KEY;
  }

  public isAvailable(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim().length > 0);
  }

  public async detectSymbols(base64Image: string): Promise<string[]> {
    if (!this.apiKey) {
      throw new Error("Chave da API do Groq não configurada.");
    }

    const payload = buildGroqPayload(base64Image);

    const { data } = await axios.post<ChatResponse>(GROQ_ENDPOINT, payload, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      timeout: 15000,
    });

    const rawContent = extractContent(data);
    return extractSymbolsFromRawJson(rawContent);
  }
}

function buildGroqPayload(base64Image: string) {
  return {
    model: GROQ_MODEL,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: VISION_DETECTION_PROMPT },
          {
            type: "image_url",
            image_url: { url: `data:image/jpeg;base64,${base64Image}` },
          },
        ],
      },
    ],
    response_format: { type: "json_object" },
    temperature: 0.1,
    max_tokens: 300,
  };
}

function extractContent(response: ChatResponse): string {
  const choices = response.choices;
  if (!choices || choices.length === 0) {
    return "{}";
  }

  return choices[0].message?.content ?? "{}";
}
