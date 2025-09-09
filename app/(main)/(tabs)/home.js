import React from 'react';
import { ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';
import Dashboard from '@/components/admin/Dashboard';
import { Text } from '@/components/ui/text';
import { useActiveTheme } from '@/hooks/useActiveTheme';
import { colors } from '@/theme/colors';

export default function HomeScreen() {
  const { role, user } = useSelector((state) => state.auth);
  const activeTheme = useActiveTheme();

  return (
    <>
      {role === 'admin' ? (
        <Dashboard />
      ) : (
        <ScrollView>
          <View style={{
            marginBottom: 10,
            marginTop: 10,
            backgroundColor: activeTheme === 'dark'
              ? colors.dark.backgroundColor
              : colors.light.backgroundColor,
            padding: 20
          }}>
            <Text>Welcome {user?.name}! Dashboard content here.</Text>
          </View>
        </ScrollView>
      )
      }
    </>
  );
}
