import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, spacing, typography } from '../theme';

type Props = {
  icon: string;
  label: string;
  selected?: boolean;
  locked?: boolean;
  onPress: () => void;
};

/**
 * Pill-shaped wake-up task selector chip. The free task can be selected
 * (gold outline); premium tasks render with a lock badge.
 */
export default function TaskChip({ icon, label, selected, locked, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: !!selected, disabled: !!locked }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        selected && styles.chipSelected,
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.icon}>{icon}</Text>
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
      {locked && <Text style={styles.lock}>🔒</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1.5,
    borderColor: colors.chipBorder,
    backgroundColor: colors.chipBackground,
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
  },
  chipSelected: {
    borderColor: colors.chipSelectedBorder,
    backgroundColor: colors.chipSelectedBackground,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    fontSize: 16,
  },
  label: {
    ...typography.caption,
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  labelSelected: {
    color: colors.accent,
  },
  lock: {
    fontSize: 13,
  },
});
