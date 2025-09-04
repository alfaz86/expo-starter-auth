import { Feather } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { Image, TouchableOpacity, Platform, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Heading } from '@/components/ui/heading';

function BrandHeader() {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image
        source={require("@/assets/favicon.png")}
        style={{ width: 32, height: 32, marginRight: 8 }}
      />
      <Heading>Expo Template</Heading>
    </View>
  );
}

function AvatarHeader() {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  const avatarUrl = user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name)}&background=random&color=fff&size=200`;

  return (
    <TouchableOpacity onPress={() => router.push('/profile')}>
      <Image
        source={{ uri: avatarUrl }}
        style={{ width: 32, height: 32, borderRadius: 16, marginRight: 12 }}
      />
    </TouchableOpacity>
  );
}

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          marginBottom: Platform.OS === 'android' ? -insets.bottom : 0,
          ...(Platform.OS === 'web' && { height: 56 }),
        },
        tabBarActiveTintColor: '#171717',
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          tabBarLabel: 'Home',
          headerTitle: () => <BrandHeader />,
          headerRight: () => <AvatarHeader />,
          tabBarIcon: ({ color, size }) => (
            <Feather name='home' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='notifications'
        options={{
          tabBarLabel: 'Notifications',
          headerTitle: () => <Heading>Notifications</Heading>,
          tabBarIcon: ({ color, size }) => (
            <Feather name='bell' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          tabBarLabel: 'Settings',
          headerTitle: () => <Heading>Settings</Heading>,
          tabBarIcon: ({ color, size }) => (
            <Feather name='settings' size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
