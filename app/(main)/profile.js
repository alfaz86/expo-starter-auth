import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@store/authSlice';

export default function ProfileScreen() {
  const { role, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.infoBox}>
          <Text>Name: {user?.name}</Text>
          <Text>Email: {user?.email}</Text>
          <Text>Role: {role}</Text>
        </View>
        <Button title="Logout" onPress={handleLogout} color="#d9534f" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 100,
  },
  card: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoBox: {
    marginBottom: 30,
  },
});
