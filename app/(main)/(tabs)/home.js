import React from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import Dashboard from '@components/admin/Dashboard';

export default function HomeScreen() {
  const { role, user } = useSelector((state) => state.auth);

  return (
    <>
      {role === 'admin' || role === 1 ? (
        <Dashboard />
      ) : (
        <Text>Welcome {user?.name}! Dashboard content here.</Text>
      )}
    </>
  );
}
