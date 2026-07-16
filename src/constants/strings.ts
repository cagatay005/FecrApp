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
    permissions: {
      title: 'We need your tools to secure your morning.',
      subtitle:
        'Location permission allows for automatic local prayer time sync. Notifications and Critical Alerts ensure your morning alarm bypasses silent mode.',
      cta: 'Grant Permissions',
      skip: 'Skip',
      locationLabel: 'Location Access',
      notificationsLabel: 'Notifications & Critical Alerts',
      blockedSuffix: 'is turned off',
      blockedMessage:
        'It looks like this permission was declined earlier. Please enable it in Settings to continue.',
      notNow: 'Not now',
      openSettings: 'Open Settings',
    },
    setAlarm: {
      title: 'Set your first un-snoozable alarm.',
      subtitle:
        'Calculated automatically based on your location and chosen method to ensure a precise dawn alarm for a purposeful start to your day.',
      cta: 'Set First Alarm',
      tasks: {
        qibla: 'Qibla Compass (Free)',
        rug: 'Prayer Rug AI',
        surah: 'Surah Recitation AI',
      },
      premiumTitle: 'Premium Task',
      premiumMessage:
        'Prayer Rug AI and Surah Recitation AI unlock with Premium after your free days. Qibla Compass stays free forever.',
      ok: 'OK',
      picker: {
        title: 'Choose your wake-up time',
        save: 'Save Alarm',
        cancel: 'Cancel',
      },
      confirmTitle: 'Alarm set for',
      confirmScheduled:
        'Your un-snoozable dawn alarm is ready. Sleep early tonight — tomorrow starts with purpose.',
      confirmNoPermission:
        'Your alarm time is saved, but notifications are off. Enable them in Settings so the alarm can ring.',
      done: 'Done',
    },
  },
  home: {
    streakLabel: 'Days Streak',
    nextPrefix: 'Next',
    nextInfix: 'in',
    fallbackAlarmName: 'Alarm',
    noAlarmTitle: 'No alarm set yet.',
    noAlarmSubtitle: 'Set your dawn alarm to start your streak.',
    setAlarmCta: 'Set Alarm',
    addAlarm: '+ Add Alarm',
    defaultTask: 'Qibla Compass',
  },
} as const;
