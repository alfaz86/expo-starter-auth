import { useActiveTheme } from "@/hooks/useActiveTheme";
import { colors } from "@/theme/colors";
import { Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RouteWithLoadingLayout from "./RouteWithLoadingLayout";
import { useEffect } from "react";
import * as NavigationBar from 'expo-navigation-bar';
import * as StatusBar from 'expo-status-bar';
import { useSocket } from "@/hooks/useSocket";

function BaseLayout() {
  useSocket();
  const theme = useActiveTheme();

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync(
        theme === 'dark'
          ? colors.dark.backgroundColor
          : colors.light.backgroundColor
      );
      NavigationBar.setButtonStyleAsync(theme === 'dark' ? 'light' : 'dark');
      StatusBar.setStatusBarBackgroundColor(
        theme === 'dark'
          ? colors.dark.backgroundColor
          : colors.light.backgroundColor
      );
      StatusBar.setStatusBarStyle(theme === 'dark' ? 'light' : 'dark');
    }
  }, [theme]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme === 'dark'
          ? colors.dark.backgroundColor
          : colors.light.backgroundColor,
      }}
      edges={Platform.OS === "android" ? ["bottom"] : []}
    >
      <RouteWithLoadingLayout delayMs={500} />
    </SafeAreaView>
  );
}

export default BaseLayout;