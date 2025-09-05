import { useSafeNavigation } from "@/hooks/useSafeNavigation";
import { Image, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

function AvatarHeader() {
  const { user } = useSelector((state) => state.auth);
  const { safePush } = useSafeNavigation();
  const avatarUrl = user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name)}&background=random&color=fff&size=200`;

  return (
    <TouchableOpacity onPress={() => safePush('/profile')}>
      <Image
        source={{ uri: avatarUrl }}
        style={{ width: 32, height: 32, borderRadius: 16, marginRight: 12 }}
      />
    </TouchableOpacity>
  );
}

export default AvatarHeader;