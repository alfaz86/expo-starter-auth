import { useActiveTheme } from "@/hooks/useActiveTheme";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import MobileOnlyWrapper from "./MobileOnlyWrapper";
import BaseLayout from "./BaseLayout";

function GlueStackUILayout() {
  const activeTheme = useActiveTheme();

  return (
    <GluestackUIProvider mode={activeTheme}>
      <MobileOnlyWrapper>
        <BaseLayout />
      </MobileOnlyWrapper>
    </GluestackUIProvider>
  );
}

export default GlueStackUILayout;