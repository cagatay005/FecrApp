import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import PrimaryButton from '../../components/PrimaryButton';
import SleepInertiaChart from '../../components/illustrations/SleepInertiaChart';
import { strings } from '../../constants/strings';
import { colors, spacing, typography } from '../../theme';

type Props = {
  onNext: () => void;
};

/**
 * Onboarding page 2 — Data & Proof (content only).
 * Reframes the struggle as Sleep Inertia with a static brain-activity chart.
 */
export default function SleepInertiaPage({ onNext }: Props) {
  const copy = strings.onboarding.sleepInertia;

  return (
    <View style={styles.content}>
      <View style={styles.chart}>
        <SleepInertiaChart />
      </View>

      <Text style={styles.title}>{copy.title}</Text>
      <Text style={styles.subtitle}>{copy.subtitle}</Text>

      <View style={styles.spacer} />

      <PrimaryButton label={copy.cta} onPress={onNext} />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  chart: {
    alignItems: 'center',
    marginTop: spacing.xxl,
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.headline,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: spacing.sm,
  },
  spacer: {
    flex: 1,
  },
});
