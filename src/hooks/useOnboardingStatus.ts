import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

import { storageKeys } from "@/utils/storageKeys";

type UseOnboardingStatus = {
  completed: boolean | null;
  markCompleted: () => Promise<void>;
  reset: () => Promise<void>;
};

export function useOnboardingStatus(): UseOnboardingStatus {
  const [completed, setCompleted] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadStatus = async () => {
      try {
        const stored = await AsyncStorage.getItem(storageKeys.onboarding);
        if (isMounted) {
          setCompleted(stored === "true");
        }
      } catch (error) {
        console.warn("Não foi possível carregar o status do onboarding", error);
        if (isMounted) {
          setCompleted(false);
        }
      }
    };

    void loadStatus();

    return () => {
      isMounted = false;
    };
  }, []);

  const markCompleted = useCallback(async () => {
    await AsyncStorage.setItem(storageKeys.onboarding, "true");
    setCompleted(true);
  }, []);

  const reset = useCallback(async () => {
    await AsyncStorage.removeItem(storageKeys.onboarding);
    setCompleted(false);
  }, []);

  return { completed, markCompleted, reset };
}
