import { Link, LinkText } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function NotFoundScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      router.replace("/home");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: Platform.OS === "android" ? -insets.bottom : 0,
      }}
    >
      <Text>This screen doesn't exist.</Text>
      <Link onPress={handleBack}>
        <LinkText>Go back!</LinkText>
      </Link>
    </View>
  );
}
