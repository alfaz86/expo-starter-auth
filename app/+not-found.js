import { useRouter } from "expo-router";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function NotFoundScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: Platform.OS === "android" ? -insets.bottom : 0, }}>
      <Text>This screen doesn't exist.</Text>
      <TouchableOpacity onPress={() => router.push('/home')}>
        <Text>Go back!</Text>
      </TouchableOpacity>
    </View>
  );
}