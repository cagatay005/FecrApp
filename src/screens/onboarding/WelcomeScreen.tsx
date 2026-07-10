import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import GradientBackground from '../../components/GradientBackground';
import OnboardingFooter from '../../components/OnboardingFooter';
import PrimaryButton from '../../components/PrimaryButton';
import SunriseIllustration from '../../components/illustrations/SunriseIllustration';
import { strings } from '../../constants/strings';
import { colors, spacing, typography } from '../../theme';

const ONBOARDING_PAGE_COUNT = 4;

type Props = {
  onContinue: () => void;
  onSkip: () => void;
};

/**
 * Onboarding 1.1 — Welcome & Hook.
 * Confronts the user with the failed-promise question and offers
 * a single golden way forward: "Break the Cycle".
 */
export default function WelcomeScreen({ onContinue, onSkip }: Props) {
  const copy = strings.onboarding.welcome;

  return (
    <GradientBackground>
      <View style={styles.content}>
        <View style={styles.illustration}>
          <SunriseIllustration />
        </View>

        <Text style={styles.title}>{copy.title}</Text>
        <Text style={styles.subtitle}>{copy.subtitle}</Text>

        <View style={styles.spacer} />

        <PrimaryButton label={copy.cta} onPress={onContinue} />
      </View>

      <OnboardingFooter
        totalPages={ONBOARDING_PAGE_COUNT}
        activeIndex={0}
        skipLabel={copy.skip}
        onSkip={onSkip}
      />
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
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
