import axios from "axios";
import { extractSymbolsFromRawJson } from "../jsonParser";
import { VISION_DETECTION_PROMPT, VisionStrategy } from "../types";

const GEMINI_MODEL = "gemini-1.5-flash";
const BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";

type GeminiPart = { text?: string };
type GeminiCandidate = { content?: { parts?: GeminiPart[] } };
type GeminiResponse = { candidates?: GeminiCandidate[] };

export class GeminiVisionStrategy implements VisionStrategy {
  public readonly providerName = "Google Gemini";
  private readonly apiKey: string | undefined;

  constructor(apiKey?: string) {
    this.apiKey = apiKey ?? process.env.EXPO_PUBLIC_GEMINI_API_KEY;
  }

  public isAvailable(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim().length > 0);
  }

  public async detectSymbols(base64Image: string): Promise<string[]> {
    if (!this.apiKey) {
      throw new Error("Chave da API do Google Gemini não configurada.");
    }

    const endpoint = `${BASE_URL}/${GEMINI_MODEL}:generateContent?key=${this.apiKey}`;
    const payload = buildGeminiPayload(base64Image);

    const { data } = await axios.post<GeminiResponse>(endpoint, payload, {
      headers: { "Content-Type": "application/json" },
      timeout: 15000,
    });

    const rawContent = extractCandidateText(data);
    return extractSymbolsFromRawJson(rawContent);
  }
}

function buildGeminiPayload(base64Image: string) {
  return {
    contents: [
      {
        parts: [
          { text: VISION_DETECTION_PROMPT },
          {
            inline_data: {
              mime_type: "image/jpeg",
              data: base64Image,
            },
          },
        ],
      },
    ],
    generationConfig: {
      response_mime_type: "application/json",
      temperature: 0.1,
    },
  };
}

function extractCandidateText(response: GeminiResponse): string {
  const candidates = response.candidates;
  if (!candidates || candidates.length === 0) {
    return "{}";
  }

  const parts = candidates[0].content?.parts;
  if (!parts || parts.length === 0) {
    return "{}";
  }

  return parts[0].text ?? "{}";
}
