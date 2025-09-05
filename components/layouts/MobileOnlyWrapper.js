import { useEffect, useState } from "react";
import { Dimensions, Platform, View } from "react-native";
import { Text } from "@/components/ui/text";
import { overlay } from "@/theme/overlay";

function MobileOnlyWrapper({ children }) {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    if (Platform.OS !== "web") return; // hanya jalan di web

    function handleResize() {
      const { width } = Dimensions.get("window");
      setIsMobile(width <= 600);
    }

    handleResize(); // check saat mount
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (Platform.OS === "web" && !isMobile) {
    return (
      <View style={overlay.content}>
        <Text style={overlay.text}>
          Please use a mobile device or resize your window to portrait mode
        </Text>
      </View>
    );
  }

  return children;
}

export default MobileOnlyWrapper;