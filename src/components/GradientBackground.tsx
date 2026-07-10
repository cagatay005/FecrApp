import React, { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors } from '../theme';

/**
 * Full-screen dark-teal "night to dawn" gradient used across onboarding.
 * Children are rendered inside a SafeAreaView on top of the gradient.
 */
export default function GradientBackground({ children }: PropsWithChildren) {
  return (
    <LinearGradient
      colors={colors.backgroundGradient}
      locations={[0, 0.55, 1]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
});
