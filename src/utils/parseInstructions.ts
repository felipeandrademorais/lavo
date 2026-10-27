import { WashingInstructions, WashingStep } from "@/types";

const SECTION_REGEX = {
  allowed: /✅\s*Pode\s*fazer:\s*([\s\S]*?)(?:❌|🧺|$)/i,
  forbidden: /❌\s*Não\s*pode\s*fazer:\s*([\s\S]*?)(?:🧺|$)/i,
  steps: /🧺\s*Passo\s*a\s*passo:\s*([\s\S]*)/i,
};

export function parseChatGPTResponse(text: string): WashingInstructions {
  const allowed = extractList(text, SECTION_REGEX.allowed);
  const forbidden = extractList(text, SECTION_REGEX.forbidden);
  const steps = extractSteps(text, SECTION_REGEX.steps);

  return {
    allowed,
    forbidden,
    steps,
    raw: text,
    createdAt: new Date().toISOString(),
  };
}

function extractList(text: string, regex: RegExp): string[] {
  const match = text.match(regex);
  if (!match?.[1]) {
    return [];
  }

  return match[1]
    .split("\n")
    .map((line) => line.replace(/^[-•\s]+/, "").trim())
    .filter(Boolean);
}

function extractSteps(text: string, regex: RegExp): WashingStep[] {
  const match = text.match(regex);
  if (!match?.[1]) {
    return [];
  }

  const lines = match[1]
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return lines.map(parseStep).filter(Boolean) as WashingStep[];
}

function parseStep(line: string): WashingStep | null {
  const numberedMatch = line.match(/^(\d+)\.\s*(.*)$/);
  const labeledMatch = line.match(/^(\d+)\.\s*([^:]+):\s*(.*)$/);

  if (labeledMatch) {
    return {
      title: capitalize(labeledMatch[2].trim()),
      description: labeledMatch[3].trim(),
    };
  }

  if (numberedMatch) {
    return {
      title: `Passo ${numberedMatch[1]}`,
      description: numberedMatch[2].trim(),
    };
  }

  if (!line) {
    return null;
  }

  return {
    title: "Passo",
    description: line.trim(),
  };
}

function capitalize(value: string) {
  if (!value) {
    return value;
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}
