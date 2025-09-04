import React from 'react';
import { ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';
import Dashboard from '@/components/admin/Dashboard';
import { Text } from '@/components/ui/text';

export default function HomeScreen() {
  const { role, user } = useSelector((state) => state.auth);

  return (
    <>
      {role === 'admin' || role === 2 ? (
        <Dashboard />
      ) : (
        <ScrollView>
          <View style={{ marginBottom: 10, marginTop: 10, backgroundColor: '#fff', padding: 20 }}>
            <Text>Welcome {user?.name}! Dashboard content here.</Text>
          </View>
        </ScrollView>
      )}
    </>
  );
}
