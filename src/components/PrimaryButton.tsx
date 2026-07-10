import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, typography } from '../theme';

type Props = {
  label: string;
  onPress: () => void;
};

/**
 * Golden pill-shaped CTA button — the single strong action on each
 * onboarding page.
 */
export default function PrimaryButton({ label, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.accent,
    borderRadius: 999,
    paddingVertical: 20,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.accent,
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  label: {
    ...typography.button,
    color: colors.onAccent,
  },
});
