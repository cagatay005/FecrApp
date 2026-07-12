import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import PrimaryButton from '../../components/PrimaryButton';
import SunriseIllustration from '../../components/illustrations/SunriseIllustration';
import { strings } from '../../constants/strings';
import { colors, spacing, typography } from '../../theme';

type Props = {
  onNext: () => void;
};

/**
 * Onboarding page 1 — Welcome & Hook (content only).
 * Layout is owned by this page; the surrounding gradient, pagination and
 * skip control live in OnboardingCarousel so pages can swipe freely.
 */
export default function WelcomePage({ onNext }: Props) {
  const copy = strings.onboarding.welcome;

  return (
    <View style={styles.content}>
      <View style={styles.illustration}>
        <SunriseIllustration />
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
  illustration: {
    alignItems: 'center',
    marginTop: spacing.xxl * 2,
    marginBottom: spacing.xxl,
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
