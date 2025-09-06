import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonText } from '@/components/ui/button';
import { openClearAllModal } from '@/store/modalSlice';
import { useActiveTheme } from '@/hooks/useActiveTheme';
import { colors } from '@/theme/colors';
import AnimatedBadge from '@/components/tabs/AnimatedBadge';
import BrandHeader from '@/components/tabs/BrandHeader';
import AvatarHeader from '@/components/tabs/AvatarHeader';

export default function TabsLayout() {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const notifications = useSelector(state => state.notifications.list);
  const unreadCount = notifications.filter(n => !n.read).length;
  const activeTheme = useActiveTheme();

  const handleClearAll = () => {
    if (notifications.length > 0) {
      dispatch(openClearAllModal());
    }
  };

  return (
    <Tabs
      initialRouteName='home'
      screenOptions={{
        lazy: true,
        tabBarStyle: {
          marginBottom: Platform.OS === 'android' ? -insets.bottom : 0,
          ...(Platform.OS === 'web' && { height: 56 }),
          backgroundColor: activeTheme === 'dark'
            ? colors.dark.backgroundColor
            : colors.light.backgroundColor,
        },
        tabBarActiveTintColor: activeTheme === 'dark'
          ? colors.light.backgroundColor
          : colors.dark.backgroundColor,
        sceneStyle: {
          backgroundColor: activeTheme === 'dark'
            ? colors.darkContent.backgroundColor
            : colors.lightContent.backgroundColor,
        },
        headerStyle: {
          backgroundColor: activeTheme === 'dark'
            ? colors.dark.backgroundColor
            : colors.light.backgroundColor,
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
          headerShadowVisible: false,
        }}
      />
      <Tabs.Screen
        name='notifications'
        options={{
          tabBarLabel: 'Notifications',
          headerTitle: () => <Heading>Notifications</Heading>,
          headerRight: () => {
            return (
              <Button onPress={handleClearAll} variant="outline" size="xs" action="secondary" className="mr-4">
                <ButtonText className='text-typography-900'>Clear All</ButtonText>
              </Button>
            );
          },
          tabBarIcon: ({ color, size }) => (
            <View>
              <Feather name="bell" size={size} color={color} />
              <AnimatedBadge count={unreadCount} />
            </View>
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
