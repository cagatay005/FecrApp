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
  },
} as const;
