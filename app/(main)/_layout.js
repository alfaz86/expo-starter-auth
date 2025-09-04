import { Stack } from 'expo-router';
import { Platform, View } from 'react-native';

export default function MainLayout() {
  return (
    <Stack
      screenOptions={{
        animation: Platform.select({
          ios: "ios_from_right",
          android: "slide_from_right",
        }),
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
          headerBackTitle: 'Back',
        }}
      />
    </Stack>
  );
}
