import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '../theme';
import PaginationDots from './PaginationDots';

type Props = {
  totalPages: number;
  activeIndex: number;
  skipLabel: string;
  onSkip: () => void;
};

/**
 * Bottom bar shared by all onboarding pages:
 * muted "Skip" on the left, centred pagination dots.
 */
export default function OnboardingFooter({
  totalPages,
  activeIndex,
  skipLabel,
  onSkip,
}: Props) {
  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        onPress={onSkip}
        hitSlop={12}
        style={({ pressed }) => [styles.skip, pressed && styles.skipPressed]}
      >
        <Text style={styles.skipText}>{skipLabel}</Text>
      </Pressable>

      <View style={styles.dots} pointerEvents="none">
        <PaginationDots total={totalPages} activeIndex={activeIndex} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  skip: {
    alignSelf: 'flex-start',
  },
  skipPressed: {
    opacity: 0.6,
  },
  skipText: {
    ...typography.caption,
    color: colors.textMuted,
  },
  dots: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
