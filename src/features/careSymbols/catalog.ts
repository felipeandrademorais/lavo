import { CareSymbolDefinition, CareSymbolId } from "./types";

export const CARE_SYMBOLS_CATALOG: Readonly<
  Record<CareSymbolId, CareSymbolDefinition>
> = {
  WASH_30: {
    id: "WASH_30",
    category: "wash",
    label: "Lavar a até 30°C",
    allowed: [
      "Lavar na máquina ou à mão com água até 30°C",
      "Usar sabão suave",
    ],
    forbidden: ["Não usar água quente acima de 30°C"],
    stepTitle: "Lavagem",
    stepDescription:
      "Lave a peça com água fria ou morna (máximo 30°C) em ciclo delicado.",
  },
  WASH_40: {
    id: "WASH_40",
    category: "wash",
    label: "Lavar a até 40°C",
    allowed: [
      "Lavar na máquina em ciclo normal a até 40°C",
      "Usar sabão comum",
    ],
    forbidden: ["Não ferver ou usar temperaturas acima de 40°C"],
    stepTitle: "Lavagem",
    stepDescription:
      "Lave na máquina com temperatura da água de no máximo 40°C.",
  },
  WASH_60: {
    id: "WASH_60",
    category: "wash",
    label: "Lavar a até 60°C",
    allowed: [
      "Lavar na máquina com água quente até 60°C",
      "Ciclo normal de lavagem",
    ],
    forbidden: ["Não usar água fervente acima de 60°C"],
    stepTitle: "Lavagem",
    stepDescription:
      "Lave na máquina com água quente a até 60°C para higienização profunda.",
  },
  WASH_95: {
    id: "WASH_95",
    category: "wash",
    label: "Lavar a até 95°C",
    allowed: [
      "Lavar com água muito quente (até 95°C)",
      "Ciclo pesado de higienização",
    ],
    forbidden: ["Evitar lavar com peças delicadas"],
    stepTitle: "Lavagem",
    stepDescription: "Lave com água em temperatura de fervura (máximo 95°C).",
  },
  WASH_HAND: {
    id: "WASH_HAND",
    category: "wash",
    label: "Lavar somente à mão",
    allowed: [
      "Lavar exclusivamente à mão",
      "Usar sabão neutro",
      "Manusear suavemente",
    ],
    forbidden: ["Não lavar na máquina", "Não centrifugar"],
    stepTitle: "Lavagem",
    stepDescription:
      "Lave a peça suavemente à mão em bacia com água fria e sabão neutro.",
  },
  NO_WASH: {
    id: "NO_WASH",
    category: "wash",
    label: "Não lavar com água",
    allowed: ["Utilizar higienização a seco profissional"],
    forbidden: ["Não lavar em água (nem na máquina nem à mão)", "Não molhar"],
    stepTitle: "Lavagem",
    stepDescription:
      "Não molhe esta peça. Encaminhe para uma lavanderia profissional.",
  },
  BLEACH_ANY: {
    id: "BLEACH_ANY",
    category: "bleach",
    label: "Permitido qualquer alvejante",
    allowed: ["Usar alvejante com ou sem cloro quando necessário"],
    forbidden: [],
    stepTitle: "Alvejamento",
    stepDescription:
      "É permitido o uso de alvejante comum com ou sem cloro conforme a necessidade.",
  },
  BLEACH_NON_CHLORINE: {
    id: "BLEACH_NON_CHLORINE",
    category: "bleach",
    label: "Alvejante sem cloro apenas",
    allowed: ["Usar somente alvejante à base de oxigênio (sem cloro)"],
    forbidden: ["Não usar alvejante com cloro ou água sanitária"],
    stepTitle: "Alvejamento",
    stepDescription:
      "Utilize apenas alvejante oxigenado sem cloro para não desbotar o tecido.",
  },
  NO_BLEACH: {
    id: "NO_BLEACH",
    category: "bleach",
    label: "Não alvejar",
    allowed: ["Usar apenas sabão neutro ou sabão para roupas coloridas"],
    forbidden: [
      "Não usar alvejante de nenhum tipo",
      "Não usar água sanitária",
      "Não usar tira-manchas à base de cloro",
    ],
    stepTitle: "Alvejamento",
    stepDescription:
      "Não utilize nenhum tipo de alvejante, cloro ou água sanitária.",
  },
  TUMBLE_NORMAL: {
    id: "TUMBLE_NORMAL",
    category: "dry",
    label: "Secagem em tambor permitida",
    allowed: ["Secar na máquina secadora em temperatura normal"],
    forbidden: [],
    stepTitle: "Secagem",
    stepDescription: "Seque na secadora automática em temperatura regular.",
  },
  TUMBLE_LOW: {
    id: "TUMBLE_LOW",
    category: "dry",
    label: "Secagem em tambor suave",
    allowed: ["Secar na máquina secadora em temperatura baixa"],
    forbidden: ["Não secar em temperatura alta"],
    stepTitle: "Secagem",
    stepDescription:
      "Seque na secadora utilizando ciclo delicado e temperatura baixa.",
  },
  NO_TUMBLE: {
    id: "NO_TUMBLE",
    category: "dry",
    label: "Não secar em tambor",
    allowed: ["Secar naturalmente no varal"],
    forbidden: ["Não usar máquina secadora"],
    stepTitle: "Secagem",
    stepDescription:
      "Não coloque na máquina de secar. Deixe secar naturalmente.",
  },
  LINE_DRY: {
    id: "LINE_DRY",
    category: "dry",
    label: "Secagem em varal",
    allowed: ["Secar pendurado em varal"],
    forbidden: ["Evitar torcer com força antes de pendurar"],
    stepTitle: "Secagem",
    stepDescription: "Pendure a peça em varal para secagem natural.",
  },
  FLAT_DRY: {
    id: "FLAT_DRY",
    category: "dry",
    label: "Secagem na horizontal",
    allowed: ["Secar na horizontal sobre superfície plana"],
    forbidden: ["Não pendurar no varal para não deformar a peça"],
    stepTitle: "Secagem",
    stepDescription:
      "Estenda a peça sobre uma superfície plana e horizontal para secar sem deformar.",
  },
  DRIP_DRY: {
    id: "DRIP_DRY",
    category: "dry",
    label: "Secagem por gotejamento",
    allowed: ["Pendurar ainda molhado sem centrifugar ou torcer"],
    forbidden: ["Não torcer", "Não centrifugar"],
    stepTitle: "Secagem",
    stepDescription:
      "Pendure a peça sem torcer e deixe a água escorrer naturalmente.",
  },
  DRY_IN_SHADE: {
    id: "DRY_IN_SHADE",
    category: "dry",
    label: "Secar à sombra",
    allowed: ["Secar em local ventilado e protegido do sol"],
    forbidden: ["Não expor diretamente ao sol"],
    stepTitle: "Secagem",
    stepDescription:
      "Mantenha a peça à sombra durante a secagem para preservar as cores.",
  },
  IRON_110: {
    id: "IRON_110",
    category: "iron",
    label: "Passar a ferro até 110°C",
    allowed: [
      "Passar a ferro em temperatura baixa (máximo 110°C)",
      "Ideal para seda, poliéster e tecidos sintéticos",
    ],
    forbidden: ["Não usar vapor a ferro", "Não usar temperaturas altas"],
    stepTitle: "Passadoria",
    stepDescription:
      "Passe o ferro em temperatura baixa (máximo 110°C) e sem vapor.",
  },
  IRON_150: {
    id: "IRON_150",
    category: "iron",
    label: "Passar a ferro até 150°C",
    allowed: [
      "Passar a ferro em temperatura média (máximo 150°C)",
      "Ideal para lã e misturas de algodão",
    ],
    forbidden: ["Não passar em temperatura máxima"],
    stepTitle: "Passadoria",
    stepDescription: "Passe o ferro em temperatura média (máximo 150°C).",
  },
  IRON_200: {
    id: "IRON_200",
    category: "iron",
    label: "Passar a ferro até 200°C",
    allowed: [
      "Passar a ferro em temperatura alta (máximo 200°C)",
      "Uso de vapor liberado",
      "Ideal para algodão e linho",
    ],
    forbidden: [],
    stepTitle: "Passadoria",
    stepDescription:
      "Passe a ferro quente (máximo 200°C) utilizando vapor se desejar.",
  },
  NO_IRON: {
    id: "NO_IRON",
    category: "iron",
    label: "Não passar a ferro",
    allowed: ["Deixar desamassar naturalmente no vapor do banho"],
    forbidden: ["Não passar a ferro", "Não usar vaporizadores quentes"],
    stepTitle: "Passadoria",
    stepDescription:
      "Não passe a peça a ferro para não queimar ou danificar o tecido.",
  },
  DRY_CLEAN_P: {
    id: "DRY_CLEAN_P",
    category: "dryClean",
    label: "Limpeza a seco com percloroetileno",
    allowed: ["Lavagem a seco profissional permitida"],
    forbidden: [],
    stepTitle: "Limpeza Profissional",
    stepDescription:
      "Encaminhe para lavanderia profissional para higienização a seco.",
  },
  DRY_CLEAN_F: {
    id: "DRY_CLEAN_F",
    category: "dryClean",
    label: "Limpeza a seco com hidrocarboneto",
    allowed: ["Lavagem a seco suave profissional"],
    forbidden: [],
    stepTitle: "Limpeza Profissional",
    stepDescription:
      "Encaminhe para lavanderia profissional com solventes de hidrocarboneto.",
  },
  WET_CLEAN: {
    id: "WET_CLEAN",
    category: "dryClean",
    label: "Limpeza úmida profissional",
    allowed: ["Higienização profissional a úmido (Wet Cleaning)"],
    forbidden: [],
    stepTitle: "Limpeza Profissional",
    stepDescription: "Lavagem profissional com sistema wet cleaning liberada.",
  },
  NO_DRY_CLEAN: {
    id: "NO_DRY_CLEAN",
    category: "dryClean",
    label: "Não lavar a seco",
    allowed: ["Lavar com água conforme instruções"],
    forbidden: ["Não submeter a lavagem a seco química"],
    stepTitle: "Limpeza Profissional",
    stepDescription:
      "Não lave a seco profissionalmente. Solventes químicos danificam a peça.",
  },
};
