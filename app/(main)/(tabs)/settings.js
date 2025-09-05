import ThemeSwitcher from '@/components/ThemeSwitcher';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { useActiveTheme } from '@/hooks/useActiveTheme';
import { colors } from '@/theme/colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Constants from "expo-constants";
import { dependencies } from "@/package.json";

export default function SettingsScreen() {
  const activeTheme = useActiveTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.card, colors[activeTheme]]}>
        <Heading style={styles.title}>Theme</Heading>
        <ThemeSwitcher />
      </View>
      <View style={[styles.card, colors[activeTheme]]}>
        <Heading style={styles.title}>App Info</Heading>
        <View style={styles.infoBox}>
          <Text>App Version: {Constants.expoConfig.version}</Text>
          <Text>Expo SDK: {Constants.expoConfig.sdkVersion}</Text>
          <Text>Expo Package: {dependencies.expo}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  card: {
    padding: 20,
    borderWidth: 0.2,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});