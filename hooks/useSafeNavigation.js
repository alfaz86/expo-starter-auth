import { useState, useCallback } from "react";
import { useRouter } from "expo-router";

export function useSafeNavigation(timeout = 500) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const safePush = useCallback(
    (path) => {
      if (isNavigating) return;
      setIsNavigating(true);
      router.push(path);
      setTimeout(() => setIsNavigating(false), timeout);
    },
    [isNavigating, router, timeout]
  );

  const safeReplace = useCallback(
    (path) => {
      if (isNavigating) return;
      setIsNavigating(true);
      router.replace(path);
      setTimeout(() => setIsNavigating(false), timeout);
    },
    [isNavigating, router, timeout]
  );

  return { safePush, safeReplace };
}
