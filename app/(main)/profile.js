import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/store/authSlice';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';

export default function ProfileScreen() {
  const { role, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleLogout = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      dispatch(logout());
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Heading style={styles.title}>Profile</Heading>
        <View style={styles.infoBox}>
          <Text>Name: {user?.name}</Text>
          <Text>Email: {user?.email}</Text>
          <Text>Role: {role}</Text>
        </View>
        <Button onPress={handleLogout} isDisabled={isSubmitting}>
          <ButtonText>{isSubmitting ? "Logging out..." : "Logout"}</ButtonText>
        </Button>
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
