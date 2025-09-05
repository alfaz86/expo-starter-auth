import { useActiveTheme } from "@/hooks/useActiveTheme";
import { colors } from "@/theme/colors";
import { Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RouteWithLoadingLayout from "./RouteWithLoadingLayout";

function BaseLayout() {
  return (
    <SafeAreaView
      style={{
        flex: 1, backgroundColor: useActiveTheme() === 'dark'
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