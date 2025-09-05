import { Image, View } from "react-native";
import { Heading } from "@/components/ui/heading";

function BrandHeader() {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image
        source={require("@/assets/favicon.png")}
        style={{ width: 32, height: 32, marginRight: 8 }}
      />
      <Heading>Expo Starter Auth</Heading>
    </View>
  );
}

export default BrandHeader;