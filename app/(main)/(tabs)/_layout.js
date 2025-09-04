import { Feather } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { Text, Image, TouchableOpacity, Platform, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function BrandHeader() {
  return <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Expo Template</Text>;
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
        },
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
          headerTitle: 'Notifications',
          tabBarIcon: ({ color, size }) => (
            <Feather name='bell' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          tabBarLabel: 'Settings',
          headerTitle: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Feather name='settings' size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
