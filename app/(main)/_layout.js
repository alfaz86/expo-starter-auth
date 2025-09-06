import { Heading } from '@/components/ui/heading';
import { useActiveTheme } from '@/hooks/useActiveTheme';
import { colors } from '@/theme/colors';
import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function MainLayout() {
  const activeTheme = useActiveTheme();

  return (
    <Stack
      screenOptions={{
        animation: Platform.select({
          ios: "ios_from_right",
          android: "slide_from_right",
        }),
        contentStyle: {
          backgroundColor: activeTheme === 'dark'
            ? colors.darkContent.backgroundColor
            : colors.lightContent.backgroundColor,
        },
        headerStyle: {
          backgroundColor: activeTheme === 'dark'
            ? colors.dark.backgroundColor
            : colors.light.backgroundColor,
        },
        headerTitleStyle: {
          color: activeTheme === 'dark'
            ? colors.dark.text
            : colors.light.text,
        },
        headerTintColor: activeTheme === 'dark'
          ? colors.dark.text
          : colors.light.text,
      }}
    >
      {/* Tabs jadi satu screen */}
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />

      {/* Profile di luar Tabs */}
      <Stack.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerTitle: () => <Heading>Profile</Heading>,
        }}
      />

      {/* Notification Detail di luar Tabs */}
      <Stack.Screen
        name="notifications/[id]"
        options={{
          title: 'Notification Detail',
          headerTitle: () => <Heading>Notification Detail</Heading>,
        }}
      />
    </Stack>
  );
}
