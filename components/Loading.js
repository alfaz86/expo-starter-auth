import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function Loading() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: -insets.bottom }]}>
      <ActivityIndicator size="large" color="#000" />
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