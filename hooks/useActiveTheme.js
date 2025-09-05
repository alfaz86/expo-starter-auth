import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTheme } from "@/store/themeSlice";

export function useActiveTheme() {
  const { mode, activeTheme } = useSelector((state) => state.theme);
  const systemTheme = useColorScheme();
  const dispatch = useDispatch();

  useEffect(() => {
    const next = mode === "system" ? systemTheme || "light" : mode;
    dispatch(setActiveTheme(next));
  }, [mode, systemTheme, dispatch]);

  return activeTheme;
}
