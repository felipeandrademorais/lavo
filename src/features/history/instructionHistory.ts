import AsyncStorage from "@react-native-async-storage/async-storage";

import { WashingInstructions } from "@/types";
import { storageKeys } from "@/utils/storageKeys";

const HISTORY_KEY = storageKeys.lastInstructions;

export async function saveLastInstructions(instructions: WashingInstructions) {
  try {
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(instructions));
  } catch (error) {
    console.warn("Não foi possível salvar as instruções recentes", error);
  }
}

export async function getLastInstructions(): Promise<WashingInstructions | null> {
  try {
    const stored = await AsyncStorage.getItem(HISTORY_KEY);
    if (!stored) {
      return null;
    }

    return JSON.parse(stored) as WashingInstructions;
  } catch (error) {
    console.warn("Não foi possível recuperar as instruções recentes", error);
    return null;
  }
}

export async function clearLastInstructions() {
  try {
    await AsyncStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.warn("Não foi possível remover as instruções recentes", error);
  }
}
