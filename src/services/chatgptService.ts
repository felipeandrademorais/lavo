import { WashingInstructions } from "@/types";
import { defaultVisionRotator } from "./vision";

export async function analyzeClothingLabel(
  base64Image: string,
): Promise<WashingInstructions> {
  if (!base64Image) {
    throw new Error("A imagem da etiqueta é obrigatória para a análise.");
  }

  return defaultVisionRotator.analyzeLabel(base64Image);
}
