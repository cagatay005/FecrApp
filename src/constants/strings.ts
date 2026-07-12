/**
 * Centralised copy so screens stay layout-only.
 * Swap this module for an i18n layer later without touching components.
 */
export const strings = {
  onboarding: {
    welcome: {
      title: 'How many mornings have you promised yourself to wake up, only to fail?',
      subtitle:
        'Fecr helps you finally follow through, build lasting habits, and greet each day with purpose.',
      cta: 'Break the Cycle',
      skip: 'Skip',
    },
    sleepInertia: {
      title: 'It’s not lack of willpower. It’s Sleep Inertia.',
      subtitle:
        'Sleep Inertia is the groggy transition from sleep to wakefulness. It temporarily impairs cognitive function and physical activation, making it hard to think and move.',
      cta: 'See How It Works',
      skip: 'Skip',
      chart: {
        yAxis: 'Brain Activity Level',
        xAxis: 'Time (min) After Waking',
        fullAlert: 'Full-Alert Level',
        zone: 'Sleep Inertia Zone',
      },
    },
  },
} as const;
