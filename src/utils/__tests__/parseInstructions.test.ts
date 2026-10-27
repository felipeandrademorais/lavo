import { parseChatGPTResponse } from "@/utils/parseInstructions";

const SAMPLE_RESPONSE = `✅ Pode fazer:
- Lavar na máquina a até 40°C
- Usar sabão neutro

❌ Não pode fazer:
- Não usar alvejante
- Não torcer

🧺 Passo a passo:
1. Lavagem: Utilize o ciclo delicado com água fria.
2. Alvejamento: Evite alvejantes com cloro.
3. Secagem: Seque à sombra, sem torcer.
4. Passar: Passe em temperatura baixa.`;

describe("parseChatGPTResponse", () => {
  it("should parse sections correctly", () => {
    const result = parseChatGPTResponse(SAMPLE_RESPONSE);

    expect(result.allowed).toEqual([
      "Lavar na máquina a até 40°C",
      "Usar sabão neutro",
    ]);

    expect(result.forbidden).toEqual(["Não usar alvejante", "Não torcer"]);

    expect(result.steps).toEqual([
      {
        title: "Lavagem",
        description: "Utilize o ciclo delicado com água fria.",
      },
      {
        title: "Alvejamento",
        description: "Evite alvejantes com cloro.",
      },
      {
        title: "Secagem",
        description: "Seque à sombra, sem torcer.",
      },
      {
        title: "Passar",
        description: "Passe em temperatura baixa.",
      },
    ]);

    expect(result.raw).toBe(SAMPLE_RESPONSE);
    expect(result.createdAt).toBeDefined();
  });

  it("should handle missing sections gracefully", () => {
    const result = parseChatGPTResponse("Resposta sem formatação adequada");

    expect(result.allowed).toEqual([]);
    expect(result.forbidden).toEqual([]);
    expect(result.steps).toEqual([]);
  });
});
