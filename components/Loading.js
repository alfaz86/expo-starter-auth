import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Spinner } from './ui/spinner';
import { useActiveTheme } from '@/hooks/useActiveTheme';

function Loading() {
  const insets = useSafeAreaInsets();
  const activeTheme = useActiveTheme();
  const spinnerColor = activeTheme === 'dark' ? '#ffffff' : 'black';

  return (
    <View style={[styles.container, { paddingBottom: -insets.bottom }]}>
      <Spinner size="large" color={spinnerColor} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading