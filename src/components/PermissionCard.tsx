import React, { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '../theme';

type Props = {
  icon: ReactNode;
  label: string;
  granted: boolean;
  onPress: () => void;
};

/**
 * Tappable permission card (icon + label). Tapping triggers the native OS
 * permission request; once granted the border and background turn gold.
 */
export default function PermissionCard({ icon, label, granted, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: granted }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        granted && styles.cardGranted,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.icon}>{icon}</View>
      <Text style={styles.label}>{label}</Text>
      {granted && <Text style={styles.check}>✓</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    aspectRatio: 0.86,
    borderWidth: 1.5,
    borderColor: colors.cardBorder,
    borderRadius: 18,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardGranted: {
    borderColor: colors.cardBorderActive,
    backgroundColor: colors.cardBackgroundActive,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.button,
    fontSize: 18,
    lineHeight: 24,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  check: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.md,
    color: colors.accent,
    fontSize: 18,
    fontWeight: '700',
  },
});
