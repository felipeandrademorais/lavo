export type WashingStep = {
  title: string;
  description: string;
};

export type WashingInstructions = {
  allowed: string[];
  forbidden: string[];
  steps: WashingStep[];
  raw: string;
  createdAt: string;
};
