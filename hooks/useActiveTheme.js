import { useEffect } from "react";
import { Appearance } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTheme } from "@/store/themeSlice";

export function useActiveTheme() {
  const { mode, activeTheme } = useSelector((state) => state.theme);
  const systemTheme = Appearance.getColorScheme();
  const dispatch = useDispatch();

  useEffect(() => {
    const next = mode === "system" ? systemTheme || "light" : mode;
    dispatch(setActiveTheme(next));
  }, [mode, systemTheme, dispatch]);

  return activeTheme;
}
