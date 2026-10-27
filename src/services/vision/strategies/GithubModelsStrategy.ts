import axios from "axios";
import { extractSymbolsFromRawJson } from "../jsonParser";
import { VISION_DETECTION_PROMPT, VisionStrategy } from "../types";

const GITHUB_MODEL = "gpt-4o-mini";
const GITHUB_ENDPOINT = "https://models.github.ai/inference/chat/completions";

type ChatChoice = { message?: { content?: string } };
type ChatResponse = { choices?: ChatChoice[] };

export class GithubModelsStrategy implements VisionStrategy {
  public readonly providerName = "GitHub Models";
  private readonly token: string | undefined;

  constructor(token?: string) {
    this.token =
      token ??
      process.env.EXPO_PUBLIC_GITHUB_TOKEN ??
      process.env.EXPO_PUBLIC_OPENAI_API_KEY;
  }

  public isAvailable(): boolean {
    return Boolean(this.token && this.token.trim().length > 0);
  }

  public async detectSymbols(base64Image: string): Promise<string[]> {
    if (!this.token) {
      throw new Error("Token de acesso do GitHub Models não configurado.");
    }

    const payload = buildGithubPayload(base64Image);

    const { data } = await axios.post<ChatResponse>(GITHUB_ENDPOINT, payload, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      timeout: 15000,
    });

    const rawContent = extractContent(data);
    return extractSymbolsFromRawJson(rawContent);
  }
}

function buildGithubPayload(base64Image: string) {
  return {
    model: GITHUB_MODEL,
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
